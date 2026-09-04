import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addDays, endOfWeek, format, isSameDay, isToday, startOfWeek } from 'date-fns';
import { CalendarPlus, ChevronLeft, ChevronRight, LayoutGrid, List, Pencil, Plus, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import { api, errorMessage } from '../lib/api';
import { useAuth } from '../lib/auth';
import {
  Badge,
  Card,
  EmptyState,
  ErrorState,
  Field,
  Loading,
  Modal,
  PageHeader,
  StatusBadge,
  Table,
} from '../components/ui';

const EVENT_TYPES = ['CLASS', 'EXAM', 'DEADLINE', 'HOLIDAY', 'EVENT'] as const;

const TYPE_TONE: Record<string, 'info' | 'bad' | 'warn' | 'good' | 'neutral'> = {
  CLASS: 'info',
  EXAM: 'bad',
  DEADLINE: 'warn',
  HOLIDAY: 'good',
  EVENT: 'neutral',
};

/** What each role is told the screen is for. */
const ROLE_BLURB: Record<string, string> = {
  SUPER_ADMIN: 'Every timetable across all sites. You can create, edit and remove entries.',
  ACADEMIC_ADMIN: 'The official timetable for your school. You can create, edit and remove entries.',
  TEACHER: 'Your own teaching timetable — the classes and courses assigned to you.',
  STUDENT: 'Your class timetable, exams and deadlines.',
  PARENT: "Your child's timetable, exams and deadlines.",
  CONTENT_MANAGER: 'Scheduled academic events.',
  DEPT_OVERSIGHT: 'Scheduled academic events.',
};

/**
 * Holidays are all-day by nature: asking for a start and end time makes the
 * form unfillable for the one entry that has no clock times.
 */
const ALL_DAY_TYPES = ['HOLIDAY'];
const isAllDay = (type: string) => ALL_DAY_TYPES.includes(type);

const EMPTY = {
  title: '',
  type: 'CLASS' as string,
  date: '',
  endDate: '',
  startTime: '09:00',
  endTime: '10:00',
  courseId: '',
  // One value drives both: 'class:<id>' or 'batch:<id>'.
  audience: '',
  siteId: '',
};

export function TimetablePage() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [typeFilter, setTypeFilter] = useState('');
  const [view, setView] = useState<'week' | 'list'>('week');
  // Weeks start Monday: a school week does not begin on Sunday.
  const [weekStart, setWeekStart] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 1 }),
  );
  const [prefill, setPrefill] = useState<{ date: string; startTime: string } | null>(null);
  // A teacher cannot edit the timetable, so opening a period offers the one
  // thing they can do about it: ask for it to be covered.
  const [requestingCover, setRequestingCover] = useState<any | null>(null);
  const isTeacher = user?.role === 'TEACHER';
  const [editing, setEditing] = useState<any | null>(null);
  const [creating, setCreating] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<any | null>(null);

  const { data: perms } = useQuery({
    queryKey: ['calendar', 'permissions'],
    queryFn: async () => (await api.get<any>('/calendar/permissions')).data,
  });

  const range =
    view === 'week'
      ? {
          from: weekStart.toISOString(),
          to: endOfWeek(weekStart, { weekStartsOn: 1 }).toISOString(),
        }
      : {};

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['calendar', typeFilter, view, weekStart.toISOString()],
    queryFn: async () =>
      (
        await api.get<any[]>('/calendar', {
          params: { type: typeFilter || undefined, ...range },
        })
      ).data,
  });

  const remove = useMutation({
    mutationFn: async (id: string) => (await api.delete(`/calendar/${id}`)).data,
    onSuccess: () => {
      setConfirmDelete(null);
      qc.invalidateQueries({ queryKey: ['calendar'] });
    },
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorState message={errorMessage(error)} onRetry={refetch} />;

  const canManage = !!perms?.canCreate;

  // Group into days so it reads as an agenda rather than a flat list.
  const days = (data ?? []).reduce<Array<{ date: Date; events: any[] }>>((acc, event) => {
    const date = new Date(event.startAt);
    const day = acc.find((d) => isSameDay(d.date, date));
    if (day) day.events.push(event);
    else acc.push({ date, events: [event] });
    return acc;
  }, []);

  return (
    <>
      <PageHeader
        title="Timetable"
        description={ROLE_BLURB[user!.role] ?? 'Classes, exams and deadlines.'}
        actions={
          <>
            <div className="flex overflow-hidden rounded-md border border-slate-300">
              <button
                type="button"
                onClick={() => setView('week')}
                className={clsx(
                  'flex items-center gap-1.5 px-3 py-2 text-sm font-medium',
                  view === 'week' ? 'bg-brand-700 text-white' : 'bg-white text-ink-soft hover:bg-slate-50',
                )}
              >
                <LayoutGrid className="h-4 w-4" aria-hidden />
                Week
              </button>
              <button
                type="button"
                onClick={() => setView('list')}
                className={clsx(
                  'flex items-center gap-1.5 border-l border-slate-300 px-3 py-2 text-sm font-medium',
                  view === 'list' ? 'bg-brand-700 text-white' : 'bg-white text-ink-soft hover:bg-slate-50',
                )}
              >
                <List className="h-4 w-4" aria-hidden />
                Agenda
              </button>
            </div>

            {canManage && (
              <button type="button" className="btn-primary" onClick={() => setCreating(true)}>
                <CalendarPlus className="h-4 w-4" aria-hidden />
                Add entry
              </button>
            )}
          </>
        }
      />

      <Card className="mb-6">
        {view === 'week' && (
          <div className="mb-3 flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setWeekStart(addDays(weekStart, -7))}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
              Previous
            </button>
            <p className="px-2 text-sm font-medium text-ink">
              {format(weekStart, 'dd MMM')} – {format(endOfWeek(weekStart, { weekStartsOn: 1 }), 'dd MMM yyyy')}
            </p>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setWeekStart(addDays(weekStart, 7))}
            >
              Next
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }))}
            >
              This week
            </button>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setTypeFilter('')}
            className={typeFilter === '' ? 'btn-primary' : 'btn-secondary'}
          >
            All
          </button>
          {EVENT_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTypeFilter(t)}
              className={typeFilter === t ? 'btn-primary' : 'btn-secondary'}
            >
              {t.toLowerCase()}
            </button>
          ))}
        </div>
      </Card>

      {remove.isError && (
        <div className="mb-4">
          <ErrorState message={errorMessage(remove.error)} />
        </div>
      )}

      {view === 'week' ? (
        <WeekGrid
          weekStart={weekStart}
          events={data ?? []}
          canManage={canManage}
          canOpenEntry={canManage || isTeacher}
          onEdit={(e) => (canManage ? setEditing(e) : isTeacher ? setRequestingCover(e) : undefined)}
          onDelete={(e) => setConfirmDelete(e)}
          onAddAt={(day, hour) => {
            setPrefill({
              date: format(day, 'yyyy-MM-dd'),
              startTime: `${String(hour).padStart(2, '0')}:00`,
            });
            setCreating(true);
          }}
        />
      ) : !days.length ? (
        <EmptyState
          title="Nothing scheduled"
          description={
            canManage
              ? 'Add the first timetable entry — classes, exams, deadlines or holidays.'
              : 'Scheduled classes and deadlines appear here.'
          }
          action={
            canManage && (
              <button type="button" className="btn-primary" onClick={() => setCreating(true)}>
                Add entry
              </button>
            )
          }
        />
      ) : (
        <div className="space-y-4">
          {days.map((day) => (
            <Card
              key={day.date.toISOString()}
              title={`${format(day.date, 'EEEE, dd MMMM yyyy')}${isToday(day.date) ? ' · Today' : ''}`}
            >
              <ul className="divide-y divide-slate-100">
                {day.events.map((event) => (
                  <li key={event.id} className="flex flex-wrap items-start justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium text-ink">{event.title}</p>
                        <Badge tone={TYPE_TONE[event.type] ?? 'neutral'}>
                          {event.type.toLowerCase()}
                        </Badge>
                      </div>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {[event.course?.title, event.batch?.name ?? event.schoolClass?.name, event.site?.name]
                          .filter(Boolean)
                          .join(' · ') || 'Everyone'}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                      <span className="text-sm tabular-nums text-slate-600">
                        {format(new Date(event.startAt), 'HH:mm')} –{' '}
                        {format(new Date(event.endAt), 'HH:mm')}
                      </span>
                      {canManage && (
                        <div className="flex gap-1">
                          <button
                            type="button"
                            className="rounded p-1.5 text-brand-700 hover:bg-brand-50"
                            aria-label={`Edit ${event.title}`}
                            onClick={() => setEditing(event)}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            className="rounded p-1.5 text-red-600 hover:bg-red-50"
                            aria-label={`Delete ${event.title}`}
                            onClick={() => setConfirmDelete(event)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                      {/* A teacher cannot change the timetable, so the one
                          thing they can do about a period is offered here. */}
                      {!canManage && isTeacher && (
                        <button
                          type="button"
                          className="btn-secondary text-xs"
                          onClick={() => setRequestingCover(event)}
                        >
                          Request cover
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      )}

      <RequestCoverModal event={requestingCover} onClose={() => setRequestingCover(null)} />

      {(canManage || isTeacher) && <SubstitutionsPanel role={user!.role} />}

      <EntryModal
        open={creating || !!editing}
        event={editing}
        prefill={prefill}
        scopedSiteId={perms?.scopedToSiteId ?? null}
        onClose={() => {
          setCreating(false);
          setEditing(null);
          setPrefill(null);
        }}
        onDone={() => {
          setCreating(false);
          setEditing(null);
          setPrefill(null);
          qc.invalidateQueries({ queryKey: ['calendar'] });
        }}
      />

      <Modal
        open={!!confirmDelete}
        title={`Remove "${confirmDelete?.title ?? ''}"?`}
        onClose={() => setConfirmDelete(null)}
        footer={
          <>
            <button type="button" className="btn-secondary" onClick={() => setConfirmDelete(null)}>
              Cancel
            </button>
            <button
              type="button"
              className="btn-danger"
              disabled={remove.isPending}
              onClick={() => remove.mutate(confirmDelete.id)}
            >
              Remove entry
            </button>
          </>
        }
      >
        <p className="text-sm text-ink-soft">
          This removes the entry from every timetable that shows it. Entries created by a live
          session are removed by cancelling that session instead.
        </p>
      </Modal>
    </>
  );
}

function EntryModal({
  open,
  event,
  prefill,
  scopedSiteId,
  onClose,
  onDone,
}: {
  open: boolean;
  event: any | null;
  prefill?: { date: string; startTime: string } | null;
  scopedSiteId: string | null;
  onClose: () => void;
  onDone: () => void;
}) {
  const qc = useQueryClient();
  const [form, setForm] = useState(EMPTY);
  const [conflict, setConflict] = useState<string | null>(null);
  const isEdit = !!event;

  const { data: courses } = useQuery({
    queryKey: ['courses', 'picker'],
    queryFn: async () => (await api.get<any>('/courses', { params: { limit: 100 } })).data,
    enabled: open,
  });


  // Classes carry their sections, so one query drives the whole picker.
  const { data: classes } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => (await api.get<any[]>('/classes')).data,
    enabled: open,
  });

  // Sections with no class attached would otherwise be unreachable.
  const { data: batches } = useQuery({
    queryKey: ['batches'],
    queryFn: async () => (await api.get<any[]>('/batches')).data,
    enabled: open,
  });
  // Once a class is chosen, only what that class studies can be scheduled for
  // it — offering the whole catalogue invites a subject the class never takes.
  const selectedClassId = form.audience.startsWith('class:')
    ? form.audience.slice(6)
    : undefined;

  const selectedClass = (classes ?? []).find(
    (c: any) =>
      c.id === selectedClassId ||
      c.batches?.some((b: any) => `batch:${b.id}` === form.audience),
  );

  const subjectOptions = selectedClass?.subjects?.length
    ? selectedClass.subjects.map((s: any) => ({ id: s.course.id, label: s.course.title }))
    : (courses?.items ?? []).map((c: any) => ({ id: c.id, label: c.title }));

  const { data: years } = useQuery({
    queryKey: ['academic-years'],
    queryFn: async () => (await api.get<any[]>('/academic-years')).data,
    enabled: open,
  });

  const { data: sites } = useQuery({
    queryKey: ['sites'],
    queryFn: async () => (await api.get<any[]>('/sites')).data,
    enabled: open && !scopedSiteId,
  });

  useEffect(() => {
    if (!open) return;
    setConflict(null);
    if (event) {
      const start = new Date(event.startAt);
      const end = new Date(event.endAt);
      setForm({
        title: event.title ?? '',
        type: event.type ?? 'CLASS',
        date: format(start, 'yyyy-MM-dd'),
        endDate: format(end, 'yyyy-MM-dd'),
        startTime: format(start, 'HH:mm'),
        endTime: format(end, 'HH:mm'),
        courseId: event.courseId ?? '',
        audience: event.batchId
          ? `batch:${event.batchId}`
          : event.classId
            ? `class:${event.classId}`
            : '',
        siteId: event.siteId ?? '',
      });
    } else if (prefill) {
      // Opened by double-clicking a slot, so the day and hour are already known.
      const end = String(Number(prefill.startTime.slice(0, 2)) + 1).padStart(2, '0') + ':00';
      setForm({ ...EMPTY, date: prefill.date, startTime: prefill.startTime, endTime: end });
    } else {
      setForm({ ...EMPTY, date: format(new Date(), 'yyyy-MM-dd') });
    }
  }, [open, event, prefill]);

  const save = useMutation({
    mutationFn: async () => {
      const payload = {
        title: form.title,
        type: form.type,
        startAt: new Date(
          `${form.date}T${isAllDay(form.type) ? '00:00' : form.startTime}`,
        ).toISOString(),
        endAt: new Date(
          isAllDay(form.type)
            ? `${form.endDate || form.date}T23:59`
            : `${form.date}T${form.endTime}`,
        ).toISOString(),
        courseId: form.courseId || undefined,
        classId: form.audience.startsWith('class:') ? form.audience.slice(6) : undefined,
        batchId: form.audience.startsWith('batch:') ? form.audience.slice(6) : undefined,
        siteId: scopedSiteId ?? form.siteId ?? undefined,
      };
      return isEdit
        ? (await api.patch(`/calendar/${event.id}`, payload)).data
        : (await api.post('/calendar', payload)).data;
    },
    onSuccess: (result: any) => {
      // A clash is reported, not blocked — the office may intend it.
      if (result?.conflict) {
        setConflict(result.conflict.message);
        return;
      }
      onDone();
    },
  });

  // Creating a subject needs a code; derive one so the user never types it.
  const createSubject = useMutation({
    mutationFn: async (title: string) => {
      const code =
        title
          .toUpperCase()
          .replace(/[^A-Z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
          .slice(0, 12) || 'SUBJ';
      return (await api.post<any>('/courses', { code: `${code}-${Date.now() % 1000}`, title })).data;
    },
    onSuccess: (created) => {
      setForm((f) => ({ ...f, courseId: created.id }));
      qc.invalidateQueries({ queryKey: ['courses'] });
    },
  });

  const { data: sitesForCreate } = useQuery({
    queryKey: ['sites'],
    queryFn: async () => (await api.get<any[]>('/sites')).data,
    enabled: open,
  });

  const createGroup = useMutation({
    mutationFn: async (name: string) => {
      const year = years?.find((y: any) => y.isCurrent) ?? years?.[0];
      if (!year) throw new Error('Add an academic year first, under Academic Structure.');

      // A class belongs to one school, so fall back to the only one available
      // rather than failing on a field the user was never shown.
      const siteId = scopedSiteId ?? form.siteId ?? sitesForCreate?.[0]?.id;
      if (!siteId) throw new Error('Add a school first, under Sites & Devices.');

      return (await api.post<any>('/classes', { academicYearId: year.id, siteId, name })).data;
    },
    onSuccess: (created) => {
      setForm((f) => ({ ...f, audience: `class:${created.id}` }));
      qc.invalidateQueries({ queryKey: ['classes'] });
    },
  });

  // A subject left over from a previous class would be silently wrong.
  useEffect(() => {
    if (isAllDay(form.type) && form.courseId) setForm((f) => ({ ...f, courseId: '' }));
  }, [form.type, form.courseId]);

  useEffect(() => {
    if (!form.courseId) return;
    if (!selectedClass?.subjects?.length) return;
    const allowed = selectedClass.subjects.some((s: any) => s.course.id === form.courseId);
    if (!allowed) setForm((f) => ({ ...f, courseId: '' }));
  }, [form.audience, selectedClass, form.courseId]);

  const allDay = isAllDay(form.type);
  const timesValid = allDay
    ? !form.endDate || form.endDate >= form.date
    : form.startTime < form.endTime;

  return (
    <Modal
      open={open}
      title={isEdit ? 'Edit timetable entry' : 'Add to timetable'}
      onClose={onClose}
      footer={
        <>
          <button type="button" className="btn-secondary" onClick={conflict ? onDone : onClose}>
            {conflict ? 'Done' : 'Cancel'}
          </button>
          {!conflict && (
            <button
              type="button"
              className="btn-primary"
              disabled={!form.title || !form.date || !timesValid || save.isPending}
              onClick={() => save.mutate()}
            >
              {save.isPending ? 'Saving…' : isEdit ? 'Save changes' : 'Add to timetable'}
            </button>
          )}
        </>
      }
    >
      {conflict ? (
        <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-medium">Saved, but it overlaps something else</p>
          <p className="mt-1">{conflict}</p>
          <p className="mt-2 text-xs">
            The entry was added — review the timetable if this was not intended.
          </p>
        </div>
      ) : (
        <>
          <Field
            label="What is happening?"
            hint="Shown on the timetable, e.g. Mathematics — Period 1, or Half-yearly exam."
          >
            <input
              className="input"
              placeholder="Mathematics — Period 1"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </Field>

          <Field label="Kind of entry">
            <div className="flex flex-wrap gap-2">
              {EVENT_TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm({ ...form, type: t })}
                  className={clsx(
                    'rounded-md border px-3 py-1.5 text-xs font-medium transition-colors',
                    form.type === t
                      ? 'border-brand-600 bg-brand-600 text-white'
                      : 'border-slate-300 bg-white text-ink-soft hover:bg-slate-50',
                  )}
                >
                  {t.toLowerCase()}
                </button>
              ))}
            </div>
          </Field>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Date">
              <input
                className="input"
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </Field>
            {allDay ? (
              <Field
                label="Last day"
                hint="Leave empty for a single day."
                error={!timesValid ? 'Must be on or after the first day.' : undefined}
              >
                <input
                  className="input"
                  type="date"
                  min={form.date || undefined}
                  value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                />
              </Field>
            ) : (
              <>
                <Field label="From">
                  <input
                    className="input"
                    type="time"
                    value={form.startTime}
                    onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                  />
                </Field>
                <Field
                  label="To"
                  error={!timesValid ? 'Must be after the start time.' : undefined}
                >
                  <input
                    className="input"
                    type="time"
                    value={form.endTime}
                    onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                  />
                </Field>
              </>
            )}
          </div>

          {allDay && (
            <p className="-mt-2 mb-4 text-xs text-slate-500">
              A holiday runs all day, so there are no start and end times to fill in.
            </p>
          )}

          <p className="mb-3 mt-5 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Who is it for?
          </p>

          {!allDay && (
            <PickerWithCreate
              label="Subject"
            hint={
              selectedClass?.subjects?.length
                ? `Subjects ${selectedClass.name} studies. Leave as “Any subject” for a holiday or a general notice.`
                : 'The subject being taught. Leave as “Any subject” for a holiday or a general notice.'
            }
            emptyLabel="Any subject"
            value={form.courseId}
            onChange={(v) => setForm({ ...form, courseId: v })}
            options={subjectOptions}
            createLabel="New subject"
            createPlaceholder="e.g. Mathematics — Class 10"
            onCreate={(name) => createSubject.mutate(name)}
            creating={createSubject.isPending}
              createError={createSubject.isError ? errorMessage(createSubject.error) : undefined}
            />
          )}

          <ClassPicker
            value={form.audience}
            onChange={(v) => setForm({ ...form, audience: v })}
            classes={classes ?? []}
            looseBatches={(batches ?? []).filter((b: any) => !b.classId)}
            onCreateClass={(name) => createGroup.mutate(name)}
            creating={createGroup.isPending}
            createError={createGroup.isError ? errorMessage(createGroup.error) : undefined}
          />

          {scopedSiteId ? (
            <p className="text-xs text-slate-500">
              This entry is added to your school automatically.
            </p>
          ) : (
            <Field label="School" hint="Leave as “All schools” to publish everywhere.">
              <select
                className="input"
                value={form.siteId}
                onChange={(e) => setForm({ ...form, siteId: e.target.value })}
              >
                <option value="">All schools</option>
                {sites?.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </Field>
          )}

          {save.isError && <p className="mt-3 text-sm text-red-600">{errorMessage(save.error)}</p>}
        </>
      )}
    </Modal>
  );
}

/**
 * A dropdown that can also create the thing it is picking. Without this, an
 * empty list is a dead end — the user has to leave the form, create the record
 * elsewhere, and start over.
 */
function PickerWithCreate({
  label,
  hint,
  emptyLabel,
  value,
  onChange,
  options,
  createLabel,
  createPlaceholder,
  onCreate,
  creating,
  createError,
}: {
  label: string;
  hint: string;
  emptyLabel: string;
  value: string;
  onChange: (v: string) => void;
  options: Array<{ id: string; label: string }>;
  createLabel: string;
  createPlaceholder: string;
  onCreate: (name: string) => void;
  creating: boolean;
  createError?: string;
}) {
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState('');

  return (
    <Field label={label} hint={adding ? undefined : hint} error={createError}>
      {adding ? (
        <div className="flex flex-wrap gap-2">
          <input
            className="input flex-1"
            placeholder={createPlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <button
            type="button"
            className="btn-primary"
            disabled={!name.trim() || creating}
            onClick={() => {
              onCreate(name.trim());
              setName('');
              setAdding(false);
            }}
          >
            {creating ? 'Creating…' : 'Create'}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              setAdding(false);
              setName('');
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          <select
            className="input flex-1"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">{emptyLabel}</option>
            {options.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
          <button type="button" className="btn-secondary" onClick={() => setAdding(true)}>
            <Plus className="h-4 w-4" aria-hidden />
            {createLabel}
          </button>
        </div>
      )}
    </Field>
  );
}

/**
 * Who the entry is for: a whole class, or one section within it. Most school
 * timetable entries apply to the class, so that is the first option under each
 * heading rather than something to hunt for.
 */
function ClassPicker({
  value,
  onChange,
  classes,
  looseBatches,
  onCreateClass,
  creating,
  createError,
}: {
  value: string;
  onChange: (v: string) => void;
  classes: any[];
  looseBatches: any[];
  onCreateClass: (name: string) => void;
  creating: boolean;
  createError?: string;
}) {
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState('');

  return (
    <Field
      label="Class"
      hint={
        adding
          ? undefined
          : 'Pick a whole class, or one of its sections. Leave as “All students” for a holiday or a school-wide notice.'
      }
      error={createError}
    >
      {adding ? (
        <div className="flex flex-wrap gap-2">
          <input
            className="input flex-1"
            placeholder="e.g. Class 11"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <button
            type="button"
            className="btn-primary"
            disabled={!name.trim() || creating}
            onClick={() => {
              onCreateClass(name.trim());
              setName('');
              setAdding(false);
            }}
          >
            {creating ? 'Creating…' : 'Create'}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              setAdding(false);
              setName('');
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          <select className="input flex-1" value={value} onChange={(e) => onChange(e.target.value)}>
            <option value="">All students</option>

            {classes.map((c) => (
              <optgroup key={c.id} label={`${c.name}${c.site?.name ? ` · ${c.site.name}` : ''}`}>
                <option value={`class:${c.id}`}>{c.name} — whole class</option>
                {c.batches?.map((b: any) => (
                  <option key={b.id} value={`batch:${b.id}`}>
                    {b.name}
                  </option>
                ))}
              </optgroup>
            ))}

            {looseBatches.length > 0 && (
              <optgroup label="Other groups">
                {looseBatches.map((b) => (
                  <option key={b.id} value={`batch:${b.id}`}>
                    {b.name}
                  </option>
                ))}
              </optgroup>
            )}
          </select>

          <button type="button" className="btn-secondary" onClick={() => setAdding(true)}>
            <Plus className="h-4 w-4" aria-hidden />
            New class
          </button>
        </div>
      )}
    </Field>
  );
}

/** Colour per entry type, used by both the grid and the agenda. */
const TYPE_STYLE: Record<string, { block: string; dot: string }> = {
  CLASS: { block: 'bg-brand-50 border-brand-300 text-brand-900', dot: 'bg-brand-500' },
  EXAM: { block: 'bg-red-50 border-red-300 text-red-900', dot: 'bg-red-500' },
  DEADLINE: { block: 'bg-amber-50 border-amber-300 text-amber-900', dot: 'bg-amber-500' },
  HOLIDAY: { block: 'bg-emerald-50 border-emerald-300 text-emerald-900', dot: 'bg-emerald-500' },
  EVENT: { block: 'bg-slate-100 border-slate-300 text-slate-800', dot: 'bg-slate-400' },
};

const minutesOf = (d: Date) => d.getHours() * 60 + d.getMinutes();

/**
 * A week at a glance: days across, hours down. A school reads its timetable
 * this way — a vertical list hides the shape of the day, and free periods with
 * it.
 */
function WeekGrid({
  weekStart,
  events,
  canManage,
  canOpenEntry,
  onEdit,
  onDelete,
  onAddAt,
}: {
  weekStart: Date;
  events: any[];
  /** May author the timetable: add, edit, delete. */
  canManage: boolean;
  /** May open an entry — a teacher opens one to ask for cover. */
  canOpenEntry: boolean;
  onEdit: (e: any) => void;
  onDelete: (e: any) => void;
  onAddAt: (day: Date, hour: number) => void;
}) {
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const spansWholeDay = (e: any) =>
    isAllDay(e.type) || new Date(e.endAt).getTime() - new Date(e.startAt).getTime() >= 23 * 3600e3;

  const allDayEvents = events.filter(spansWholeDay);
  const timed = events.filter((e) => !spansWholeDay(e));

  // Fit the grid to the day actually taught, with a sensible school default.
  const starts = timed.map((e) => minutesOf(new Date(e.startAt)));
  const ends = timed.map((e) => minutesOf(new Date(e.endAt)));
  const from = Math.min(8 * 60, ...(starts.length ? starts : [8 * 60]));
  const to = Math.max(17 * 60, ...(ends.length ? ends : [17 * 60]));
  const startHour = Math.floor(from / 60);
  const endHour = Math.ceil(to / 60);
  const hours = Array.from({ length: endHour - startHour }, (_, i) => startHour + i);
  const span = (endHour - startHour) * 60;

  return (
    <Card className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <div className="min-w-[820px]">
          {/* Day headings */}
          <div className="grid grid-cols-[56px_repeat(7,1fr)] border-b border-slate-200 bg-slate-50">
            <div />
            {days.map((d) => (
              <div
                key={d.toISOString()}
                className={clsx(
                  'border-l border-slate-200 px-2 py-2 text-center',
                  isToday(d) && 'bg-brand-50',
                )}
              >
                <p className="text-[11px] uppercase tracking-wide text-slate-500">
                  {format(d, 'EEE')}
                </p>
                <p
                  className={clsx(
                    'text-sm tabular-nums',
                    isToday(d) ? 'font-semibold text-brand-800' : 'text-ink',
                  )}
                >
                  {format(d, 'd MMM')}
                </p>
              </div>
            ))}
          </div>

          {allDayEvents.length > 0 && (
            <div className="grid grid-cols-[56px_repeat(7,1fr)] border-b border-slate-200">
              <div className="py-1 pr-2 text-right text-[10px] uppercase tracking-wide text-slate-400">
                all day
              </div>
              {days.map((day) => {
                const onThisDay = allDayEvents.filter(
                  (e) =>
                    day >= new Date(new Date(e.startAt).setHours(0, 0, 0, 0)) &&
                    day <= new Date(new Date(e.endAt).setHours(23, 59, 59, 999)),
                );
                return (
                  <div key={day.toISOString()} className="space-y-1 border-l border-slate-200 p-1">
                    {onThisDay.map((e) => {
                      const style = TYPE_STYLE[e.type] ?? TYPE_STYLE.EVENT;
                      return (
                        <button
                          key={e.id}
                          type="button"
                          onClick={() => (canOpenEntry ? onEdit(e) : undefined)}
                          className={clsx(
                            'block w-full truncate rounded border px-1.5 py-0.5 text-left text-[11px] font-medium',
                            style.block,
                            canOpenEntry && 'hover:shadow',
                          )}
                          title={e.title}
                        >
                          {e.title}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}

          {/* Hour rows with entries laid over them */}
          <div className="relative grid grid-cols-[56px_repeat(7,1fr)]">
            <div>
              {hours.map((h) => (
                <div
                  key={h}
                  className="h-16 border-b border-slate-100 pr-2 text-right text-[11px] tabular-nums text-slate-400"
                >
                  {String(h).padStart(2, '0')}:00
                </div>
              ))}
            </div>

            {days.map((day) => {
              const dayEvents = timed.filter((e) => isSameDay(new Date(e.startAt), day));

              return (
                <div
                  key={day.toISOString()}
                  className={clsx(
                    'relative border-l border-slate-200',
                    isToday(day) && 'bg-brand-50/30',
                  )}
                >
                  {hours.map((h) => (
                    <div
                      key={h}
                      className="h-16 border-b border-slate-100"
                      onDoubleClick={canManage ? () => onAddAt(day, h) : undefined}
                      title={canManage ? 'Double-click to add an entry here' : undefined}
                    />
                  ))}

                  {dayEvents.map((e, i) => {
                    const s = new Date(e.startAt);
                    const en = new Date(e.endAt);
                    const top = ((minutesOf(s) - startHour * 60) / span) * 100;
                    const height = Math.max(
                      ((minutesOf(en) - minutesOf(s)) / span) * 100,
                      4.5,
                    );
                    // Overlapping entries share the column rather than hiding
                    // one another.
                    const clash = dayEvents.filter(
                      (o) =>
                        new Date(o.startAt) < en && new Date(o.endAt) > s,
                    );
                    const idx = clash.indexOf(e);
                    const width = 100 / Math.max(clash.length, 1);
                    const style = TYPE_STYLE[e.type] ?? TYPE_STYLE.EVENT;

                    return (
                      <button
                        key={e.id}
                        type="button"
                        onClick={() => (canOpenEntry ? onEdit(e) : undefined)}
                        className={clsx(
                          'absolute overflow-hidden rounded border px-1.5 py-1 text-left text-[11px] leading-tight transition-shadow',
                          style.block,
                          canOpenEntry && 'hover:shadow-md',
                        )}
                        style={{
                          top: `${top}%`,
                          height: `${height}%`,
                          left: `calc(${idx * width}% + 2px)`,
                          width: `calc(${width}% - 4px)`,
                        }}
                        title={`${e.title} · ${format(s, 'HH:mm')}–${format(en, 'HH:mm')}`}
                      >
                        <span className="block truncate font-semibold">{e.title}</span>
                        <span className="block truncate opacity-80">
                          {format(s, 'HH:mm')}
                          {e.schoolClass?.name ? ` · ${e.schoolClass.name}` : ''}
                          {e.batch?.name ? ` · ${e.batch.name}` : ''}
                        </span>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 border-t border-slate-200 px-4 py-2">
        {Object.entries(TYPE_STYLE).map(([type, style]) => (
          <span key={type} className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className={clsx('h-2 w-2 rounded-full', style.dot)} />
            {type.toLowerCase()}
          </span>
        ))}
        {canManage ? (
          <span className="ml-auto text-xs text-slate-400">
            Double-click an empty slot to add an entry
          </span>
        ) : canOpenEntry ? (
          <span className="ml-auto text-xs text-slate-400">
            Click one of your periods to ask for it to be covered
          </span>
        ) : null}
      </div>
    </Card>
  );
}

/**
 * Cover requests. The master timetable belongs to the academic office, so a
 * teacher who cannot take a period asks for it to be covered rather than
 * editing the schedule — and the office decides who takes it.
 */
function SubstitutionsPanel({ role }: { role: string }) {
  const qc = useQueryClient();
  const isTeacher = role === 'TEACHER';
  const [deciding, setDeciding] = useState<any | null>(null);
  const [coverId, setCoverId] = useState('');
  const [note, setNote] = useState('');

  const { data: requests, isLoading } = useQuery({
    queryKey: ['substitutions'],
    queryFn: async () => (await api.get<any[]>('/substitutions')).data,
  });

  const { data: teachers } = useQuery({
    queryKey: ['users', 'teachers'],
    queryFn: async () =>
      (await api.get<any>('/users', { params: { role: 'TEACHER', limit: 200 } })).data,
    enabled: !!deciding,
  });

  const done = () => {
    setDeciding(null);
    setCoverId('');
    setNote('');
    qc.invalidateQueries({ queryKey: ['substitutions'] });
  };

  const cancel = useMutation({
    mutationFn: async (id: string) => (await api.patch(`/substitutions/${id}/cancel`)).data,
    onSuccess: done,
  });

  const decide = useMutation({
    mutationFn: async (approve: boolean) =>
      (
        await api.patch(`/substitutions/${deciding.id}/decide`, {
          approve,
          coverId: approve ? coverId || undefined : undefined,
          note: note || undefined,
        })
      ).data,
    onSuccess: done,
  });

  const pending = (requests ?? []).filter((r: any) => r.status === 'PENDING');

  return (
    <>
      <Card
        className="mt-6"
        title={isTeacher ? 'My cover requests' : 'Cover requests'}
        action={
          pending.length > 0 ? (
            <Badge tone="warn">{pending.length} awaiting a decision</Badge>
          ) : undefined
        }
      >
        {isLoading ? (
          <Loading />
        ) : !requests?.length ? (
          <p className="text-sm text-slate-500">
            {isTeacher
              ? 'None yet. Open a period on your timetable to ask for it to be covered.'
              : 'No teacher has asked for a period to be covered.'}
          </p>
        ) : (
          <Table
            headers={
              isTeacher
                ? ['Period', 'When', 'Reason', 'Status', '']
                : ['Period', 'When', 'Teacher', 'Reason', 'Status', '']
            }
          >
            {requests.map((r: any) => (
              <tr key={r.id}>
                <td className="td font-medium">{r.event.title}</td>
                <td className="td text-slate-600">
                  {format(new Date(r.event.startAt), 'EEE d MMM, HH:mm')}
                </td>
                {!isTeacher && <td className="td text-slate-600">{r.teacher.fullName}</td>}
                <td className="td text-slate-600">{r.reason}</td>
                <td className="td">
                  <StatusBadge status={r.status} />
                  {r.cover && (
                    <span className="block text-xs text-slate-500">
                      covered by {r.cover.fullName}
                    </span>
                  )}
                </td>
                <td className="td text-right">
                  {r.status !== 'PENDING' ? null : isTeacher ? (
                    <button
                      type="button"
                      className="btn-secondary text-xs"
                      onClick={() => cancel.mutate(r.id)}
                    >
                      Withdraw
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn-secondary text-xs"
                      onClick={() => setDeciding(r)}
                    >
                      Decide
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </Table>
        )}
      </Card>

      <Modal
        open={!!deciding}
        title="Who covers this period?"
        onClose={() => setDeciding(null)}
        footer={
          <>
            <button
              type="button"
              className="btn-secondary"
              disabled={decide.isPending}
              onClick={() => decide.mutate(false)}
            >
              Decline
            </button>
            <button
              type="button"
              className="btn-primary"
              disabled={!coverId || decide.isPending}
              onClick={() => decide.mutate(true)}
            >
              {decide.isPending ? 'Saving…' : 'Approve cover'}
            </button>
          </>
        }
      >
        {deciding && (
          <>
            <p className="mb-4 text-sm text-ink-soft">
              <strong>{deciding.teacher.fullName}</strong> cannot take{' '}
              <strong>{deciding.event.title}</strong> on{' '}
              {format(new Date(deciding.event.startAt), 'EEEE d MMMM, HH:mm')}.
            </p>
            <p className="mb-4 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-ink-soft">
              {deciding.reason}
            </p>

            <Field label="Teacher covering" hint="Required to approve.">
              <select className="input" value={coverId} onChange={(e) => setCoverId(e.target.value)}>
                <option value="">Select a teacher…</option>
                {teachers?.items
                  ?.filter((t: any) => t.id !== deciding.teacher.id)
                  .map((t: any) => (
                    <option key={t.id} value={t.id}>
                      {t.fullName}
                    </option>
                  ))}
              </select>
            </Field>

            <Field label="Note" hint="Sent to the teacher. Useful when declining.">
              <textarea
                className="input"
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </Field>

            {decide.isError && (
              <p className="mt-2 text-sm text-red-600">{errorMessage(decide.error)}</p>
            )}
          </>
        )}
      </Modal>
    </>
  );
}

/** A teacher asks for one period to be covered. */
function RequestCoverModal({
  event,
  onClose,
}: {
  event: any | null;
  onClose: () => void;
}) {
  const qc = useQueryClient();
  const [reason, setReason] = useState('');

  const ask = useMutation({
    mutationFn: async () =>
      (await api.post('/substitutions', { eventId: event.id, reason })).data,
    onSuccess: () => {
      setReason('');
      qc.invalidateQueries({ queryKey: ['substitutions'] });
      onClose();
    },
  });

  return (
    <Modal
      open={!!event}
      title="Ask for this period to be covered"
      onClose={onClose}
      footer={
        <>
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn-primary"
            disabled={reason.trim().length < 4 || ask.isPending}
            onClick={() => ask.mutate()}
          >
            {ask.isPending ? 'Sending…' : 'Send request'}
          </button>
        </>
      }
    >
      {event && (
        <>
          <p className="mb-4 text-sm text-ink-soft">
            <strong>{event.title}</strong> —{' '}
            {format(new Date(event.startAt), 'EEEE d MMMM, HH:mm')}. The academic admin decides who
            takes it; the timetable is not changed until they do.
          </p>
          <Field label="Why can you not take it?" hint="The academic admin sees this.">
            <textarea
              className="input"
              rows={3}
              placeholder="e.g. Attending the district science fair"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </Field>
          {ask.isError && <p className="text-sm text-red-600">{errorMessage(ask.error)}</p>}
        </>
      )}
    </Modal>
  );
}
