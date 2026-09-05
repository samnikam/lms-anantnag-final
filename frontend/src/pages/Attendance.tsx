import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, PencilLine, Save } from 'lucide-react';
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
  ProgressBar,
  StatCard,
  StatusBadge,
  Table,
} from '../components/ui';

const STATUSES = ['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'] as const;

export function AttendancePage() {
  const { user } = useAuth();
  return user!.role === 'STUDENT' ? <StudentAttendance /> : <TeacherAttendance />;
}

function StudentAttendance() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['attendance', 'mine'],
    queryFn: async () => (await api.get<any>('/attendance/my-summary')).data,
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorState message={errorMessage(error)} onRetry={refetch} />;

  return (
    <>
      <PageHeader title="My Attendance" description="Your attendance record across all sessions." />

      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <StatCard
          label="Attendance"
          value={`${data.percentage}%`}
          tone={data.percentage >= 75 ? 'good' : 'bad'}
          hint={data.percentage < 75 ? 'Below the 75% requirement' : 'Meets the requirement'}
        />
        <StatCard label="Sessions" value={data.total} />
        <StatCard label="Present" value={data.present} tone="good" />
        <StatCard label="Absent" value={data.absent} tone={data.absent > 0 ? 'warn' : 'good'} />
      </div>

      <Card title="Recent sessions">
        {data.recent?.length ? (
          <Table headers={['Date', 'Status']}>
            {data.recent.map((r: any, i: number) => (
              <tr key={i}>
                <td className="td">{format(new Date(r.date), 'dd MMM yyyy')}</td>
                <td className="td">
                  <StatusBadge status={r.status} />
                </td>
              </tr>
            ))}
          </Table>
        ) : (
          <EmptyState title="No attendance recorded yet" />
        )}
      </Card>
    </>
  );
}

/** Teacher and admin register: pick a day, then a period, then mark it. */
function TeacherAttendance() {
  const { user } = useAuth();
  const canCorrect = ['SUPER_ADMIN', 'ACADEMIC_ADMIN'].includes(user!.role);
  // The daily class register is what a school actually takes; period-by-period
  // marking is the exception, not the rule, so it is no longer the only way in.
  const [view, setView] = useState<'classes' | 'mark' | 'corrections'>('classes');
  const [params, setParams] = useSearchParams();
  const qc = useQueryClient();

  const dateParam = params.get('date') ?? format(new Date(), 'yyyy-MM-dd');
  const selectedKind = params.get('kind') as 'session' | 'event' | null;
  const selectedId = params.get('id');
  const [marks, setMarks] = useState<Record<string, string>>({});

  const setDate = (d: string) => setParams({ date: d });
  const pick = (kind: string, id: string) => setParams({ date: dateParam, kind, id });

  const { data: register, isLoading: loadingDay } = useQuery({
    queryKey: ['attendance', 'day', dateParam],
    queryFn: async () =>
      (await api.get<any[]>('/attendance/day', { params: { date: dateParam } })).data,
  });

  const { data: roster, isLoading, error, refetch } = useQuery({
    queryKey: ['roster', selectedKind, selectedId],
    queryFn: async () =>
      (
        await api.get<any>(
          selectedKind === 'event'
            ? `/attendance/events/${selectedId}/roster`
            : `/attendance/sessions/${selectedId}/roster`,
        )
      ).data,
    enabled: !!selectedId,
  });

  // Seed the form from whatever is already saved for this period.
  useEffect(() => {
    if (!roster) return;
    setMarks(
      Object.fromEntries(
        roster.individual.map((row: any) => [row.studentId, row.status ?? 'PRESENT']),
      ),
    );
  }, [roster]);

  const save = useMutation({
    mutationFn: async () =>
      (
        await api.post(
          selectedKind === 'event'
            ? `/attendance/events/${selectedId}/mark`
            : `/attendance/sessions/${selectedId}/mark`,
          { entries: Object.entries(marks).map(([studentId, status]) => ({ studentId, status })) },
        )
      ).data,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['roster'] });
      qc.invalidateQueries({ queryKey: ['attendance', 'day'] });
      qc.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const shiftDay = (days: number) => {
    const d = new Date(dateParam);
    d.setDate(d.getDate() + days);
    setDate(format(d, 'yyyy-MM-dd'));
  };

  const setAll = (status: string) =>
    setMarks((m) => Object.fromEntries(Object.keys(m).map((k) => [k, status])));

  return (
    <>
      <PageHeader
        title="Attendance"
        description="Take the daily register for a class, or mark a single period. Room headcounts from classroom panels appear alongside."
        actions={
          selectedId && (
            <button
              type="button"
              className="btn-primary"
              onClick={() => save.mutate()}
              disabled={save.isPending || !Object.keys(marks).length}
            >
              <Save className="h-4 w-4" aria-hidden />
              {save.isPending ? 'Saving…' : 'Save attendance'}
            </button>
          )
        }
      />

      {canCorrect && (
        <div className="mb-4 flex gap-2 border-b border-slate-200">
          {(
            [
              ['classes', 'Class register'],
              ['mark', 'By period'],
              ['corrections', 'Corrections'],
            ] as const
          ).map(([k, l]) => (
            <button
              key={k}
              type="button"
              onClick={() => setView(k)}
              className={
                view === k
                  ? 'border-b-2 border-brand-700 px-4 py-2 text-sm font-medium text-brand-800'
                  : 'px-4 py-2 text-sm font-medium text-ink-soft hover:text-ink'
              }
            >
              {l}
            </button>
          ))}
        </div>
      )}

      {view === 'classes' ? (
        <ClassRegister />
      ) : view === 'corrections' ? (
        <AttendanceCorrections />
      ) : (
        <>
          <Card className="mb-6">
            <div className="flex flex-wrap items-end gap-3">
              <button type="button" className="btn-secondary" onClick={() => shiftDay(-1)}>
                <ChevronLeft className="h-4 w-4" aria-hidden />
                Previous day
              </button>

              <div>
                <label className="label" htmlFor="att-date">
                  Date
                </label>
                <input
                  id="att-date"
                  className="input"
                  type="date"
                  value={dateParam}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <button type="button" className="btn-secondary" onClick={() => shiftDay(1)}>
                Next day
                <ChevronRight className="h-4 w-4" aria-hidden />
              </button>

              <button
                type="button"
                className="btn-secondary"
                onClick={() => setDate(format(new Date(), 'yyyy-MM-dd'))}
              >
                Today
              </button>
            </div>
          </Card>

          <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
            <Card title={format(new Date(dateParam), 'EEEE, dd MMMM yyyy')}>
              {loadingDay ? (
                <Loading />
              ) : !register?.length ? (
                <EmptyState
                  title="Nothing scheduled"
                  description="No classes or sessions on this day. Add them on the Timetable."
                />
              ) : (
                <ul className="divide-y divide-slate-100">
                  {register.map((item) => (
                    <li key={`${item.kind}-${item.id}`}>
                      <button
                        type="button"
                        onClick={() => pick(item.kind, item.id)}
                        className={clsx(
                          'w-full rounded-md px-2 py-3 text-left transition-colors',
                          selectedId === item.id ? 'bg-brand-50' : 'hover:bg-slate-50',
                        )}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p
                              className={clsx(
                                'truncate text-sm',
                                selectedId === item.id
                                  ? 'font-semibold text-brand-800'
                                  : 'font-medium text-ink',
                              )}
                            >
                              {item.title}
                            </p>
                            <p className="truncate text-xs text-slate-500">
                              {[item.course?.title, item.group].filter(Boolean).join(' · ') ||
                                'Everyone'}
                            </p>
                          </div>
                          <div className="shrink-0 text-right">
                            <p className="text-xs tabular-nums text-slate-600">
                              {format(new Date(item.startAt), 'HH:mm')}
                            </p>
                            {item.marked > 0 ? (
                              <Badge tone="good">{item.marked} marked</Badge>
                            ) : (
                              <Badge>not marked</Badge>
                            )}
                          </div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </Card>

            <div>
              {save.isSuccess && (
                <div className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                  Attendance saved. Guardians of learners below the threshold have been alerted.
                </div>
              )}
              {save.isError && (
                <div className="mb-4">
                  <ErrorState message={errorMessage(save.error)} />
                </div>
              )}

              {!selectedId ? (
                <EmptyState
                  title="Select a period"
                  description="Pick a class from the day on the left to mark its attendance."
                />
              ) : isLoading ? (
                <Loading />
              ) : error ? (
                <ErrorState message={errorMessage(error)} onRetry={refetch} />
              ) : (
                <div className="space-y-6">
                  <Card
                    title={`Learners — ${roster.individual.length}`}
                    action={
                      roster.individual.length > 0 && (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className="text-xs text-brand-700 hover:underline"
                            onClick={() => setAll('PRESENT')}
                          >
                            All present
                          </button>
                          <button
                            type="button"
                            className="text-xs text-brand-700 hover:underline"
                            onClick={() => setAll('ABSENT')}
                          >
                            All absent
                          </button>
                        </div>
                      )
                    }
                  >
                    {roster.individual.length ? (
                      <Table headers={['Learner', 'Status']}>
                        {roster.individual.map((row: any) => (
                          <tr key={row.studentId}>
                            <td className="td font-medium">{row.fullName}</td>
                            <td className="td">
                              <div className="flex flex-wrap gap-1.5">
                                {STATUSES.map((status) => (
                                  <button
                                    key={status}
                                    type="button"
                                    onClick={() =>
                                      setMarks((m) => ({ ...m, [row.studentId]: status }))
                                    }
                                    className={clsx(
                                      'rounded-md border px-3 py-1 text-xs font-medium transition-colors',
                                      marks[row.studentId] === status
                                        ? 'border-brand-600 bg-brand-600 text-white'
                                        : 'border-slate-300 bg-white text-ink-soft hover:bg-slate-50',
                                    )}
                                  >
                                    {status.toLowerCase()}
                                  </button>
                                ))}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </Table>
                    ) : (
                      <EmptyState
                        title="No learners"
                        description="Nobody is enrolled for this period yet. Enrol learners into the class first."
                      />
                    )}
                  </Card>

                  {roster.rooms?.length > 0 && (
                    <Card title="Room headcounts (classroom panels)">
                      <Table headers={['Classroom', 'Headcount', 'Status']}>
                        {roster.rooms.map((room: any) => (
                          <tr key={room.classroomId}>
                            <td className="td">
                              {room.name}
                              <p className="text-xs text-slate-500">{room.code}</p>
                            </td>
                            <td className="td tabular-nums">{room.headcount ?? 'Not recorded'}</td>
                            <td className="td">
                              {room.status ? <StatusBadge status={room.status} /> : '—'}
                            </td>
                          </tr>
                        ))}
                      </Table>
                    </Card>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

/**
 * Attendance corrections — the academic office's supervisory job. A teacher
 * marks; an admin corrects a mistake afterwards, and every correction keeps
 * the previous value, the reason and the actor.
 */
function AttendanceCorrections() {
  const qc = useQueryClient();
  const [studentId, setStudentId] = useState('');
  const [correcting, setCorrecting] = useState<any | null>(null);
  const [status, setStatus] = useState('PRESENT');
  const [reason, setReason] = useState('');

  const { data: students } = useQuery({
    queryKey: ['users', 'students', 'correction'],
    queryFn: async () =>
      (await api.get<any>('/users', { params: { role: 'STUDENT', limit: 200 } })).data,
  });

  const { data: rows, isLoading } = useQuery({
    queryKey: ['attendance', 'records', studentId],
    queryFn: async () =>
      (await api.get<any[]>('/attendance', { params: { studentId: studentId || undefined } })).data,
  });

  const correct = useMutation({
    mutationFn: async () =>
      (await api.patch(`/attendance/${correcting.id}/correct`, { status, reason })).data,
    onSuccess: () => {
      setCorrecting(null);
      setReason('');
      qc.invalidateQueries({ queryKey: ['attendance'] });
    },
  });

  return (
    <>
      <Card className="mb-6">
        <label className="label" htmlFor="student-filter">
          Learner
        </label>
        <select
          id="student-filter"
          className="input max-w-md"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        >
          <option value="">All learners</option>
          {students?.items?.map((s: any) => (
            <option key={s.id} value={s.id}>
              {s.fullName}
            </option>
          ))}
        </select>
      </Card>

      <Card title="Attendance records">
        {isLoading ? (
          <Loading />
        ) : !rows?.length ? (
          <EmptyState
            title="No attendance recorded yet"
            description="Records appear once a teacher marks a session."
          />
        ) : (
          <Table headers={['Date', 'Learner', 'Session', 'Kind', 'Status', 'Corrections', '']}>
            {rows.slice(0, 100).map((r) => (
              <tr key={r.id}>
                <td className="td whitespace-nowrap text-slate-600">
                  {format(new Date(r.date), 'dd MMM yyyy')}
                </td>
                <td className="td font-medium">
                  {r.student?.fullName ?? r.classroom?.name ?? '—'}
                </td>
                <td className="td text-slate-600">{r.session?.title ?? '—'}</td>
                <td className="td text-xs text-slate-500">
                  {r.kind === 'ROOM_LEVEL' ? `room (${r.headcount ?? 0})` : 'individual'}
                </td>
                <td className="td">
                  <StatusBadge status={r.status} />
                </td>
                <td className="td tabular-nums">
                  {r.corrections?.length ? (
                    <span title={r.corrections.map((c: any) => c.reason).join(' · ')}>
                      {r.corrections.length}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">—</span>
                  )}
                </td>
                <td className="td text-right">
                  {r.studentId && (
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 text-sm text-brand-700 hover:underline"
                      onClick={() => {
                        setCorrecting(r);
                        setStatus(r.status);
                        setReason('');
                      }}
                    >
                      <PencilLine className="h-4 w-4" aria-hidden />
                      Correct
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </Table>
        )}
      </Card>

      <Modal
        open={!!correcting}
        title="Correct attendance"
        onClose={() => setCorrecting(null)}
        footer={
          <>
            <button type="button" className="btn-secondary" onClick={() => setCorrecting(null)}>
              Cancel
            </button>
            <button
              type="button"
              className="btn-primary"
              disabled={reason.trim().length < 5 || status === correcting?.status || correct.isPending}
              onClick={() => correct.mutate()}
            >
              Save correction
            </button>
          </>
        }
      >
        <p className="mb-4 text-sm text-ink-soft">
          {correcting?.student?.fullName} is currently marked{' '}
          <strong>{correcting?.status?.toLowerCase()}</strong>. The previous value, your reason and
          your name are all recorded against this change.
        </p>

        <Field label="Corrected status">
          <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.toLowerCase()}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Reason" hint="Required — at least 5 characters.">
          <input className="input" value={reason} onChange={(e) => setReason(e.target.value)} />
        </Field>

        {correct.isError && <p className="text-sm text-red-600">{errorMessage(correct.error)}</p>}
      </Modal>
    </>
  );
}

/**
 * The daily class register: pick a school, pick a class, mark its roll. This is
 * how a school takes attendance — against the class, on a date, whether or not
 * anything was scheduled that day.
 */
function ClassRegister() {
  const { user } = useAuth();
  const qc = useQueryClient();
  // Only a Super Admin chooses a school. An academic admin has one; a teacher
  // has the classes they were given, wherever those are.
  const scoped = user!.role !== 'SUPER_ADMIN';
  const isTeacher = user!.role === 'TEACHER';

  const [siteId, setSiteId] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [openClass, setOpenClass] = useState<string | null>(null);
  const [marks, setMarks] = useState<Record<string, string>>({});

  const { data: sites } = useQuery({
    queryKey: ['sites'],
    queryFn: async () => (await api.get<any[]>('/sites')).data,
    enabled: !scoped,
  });

  const { data: classes, isLoading } = useQuery({
    queryKey: ['attendance', 'classes', date, siteId],
    queryFn: async () =>
      (
        await api.get<any[]>('/attendance/classes', {
          params: { date, siteId: siteId || undefined },
        })
      ).data,
  });

  const { data: roster } = useQuery({
    queryKey: ['attendance', 'class-roster', openClass, date],
    queryFn: async () =>
      (await api.get<any>(`/attendance/classes/${openClass}/roster`, { params: { date } })).data,
    enabled: !!openClass,
  });

  // Start from what is already recorded, so re-opening a marked day shows it.
  useEffect(() => {
    if (!roster) return;
    setMarks(
      Object.fromEntries(roster.learners.map((l: any) => [l.studentId, l.status ?? 'PRESENT'])),
    );
  }, [roster]);

  const save = useMutation({
    mutationFn: async () =>
      (
        await api.post(`/attendance/classes/${openClass}/mark`, {
          date: new Date(date).toISOString(),
          entries: Object.entries(marks).map(([studentId, status]) => ({ studentId, status })),
        })
      ).data,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['attendance'] });
      setOpenClass(null);
    },
  });

  const setAll = (status: string) =>
    setMarks((m) => Object.fromEntries(Object.keys(m).map((k) => [k, status])));

  return (
    <>
      <Card className="mb-6">
        <div className="flex flex-wrap items-end gap-3">
          {!scoped && (
            <div>
              <label className="label" htmlFor="reg-site">
                School
              </label>
              <select
                id="reg-site"
                className="input max-w-[18rem]"
                value={siteId}
                onChange={(e) => {
                  setSiteId(e.target.value);
                  setOpenClass(null);
                }}
              >
                <option value="">All schools</option>
                {sites?.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="label" htmlFor="reg-date">
              Date
            </label>
            <input
              id="reg-date"
              className="input"
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setOpenClass(null);
              }}
            />
          </div>

          <button
            type="button"
            className="btn-secondary"
            onClick={() => setDate(format(new Date(), 'yyyy-MM-dd'))}
          >
            Today
          </button>

          {scoped && (
            <p className="pb-2 text-xs text-slate-500">
              {isTeacher
                ? 'Showing the classes you were assigned. Ask the academic admin to be added to another.'
                : 'Showing your school only — another school’s register is not yours to take.'}
            </p>
          )}
        </div>
      </Card>

      {isLoading ? (
        <Loading />
      ) : !classes?.length ? (
        <EmptyState
          title={isTeacher ? 'No classes assigned to you' : 'No classes at this school'}
          description={
            isTeacher
              ? 'The academic admin assigns you to a class, or to a subject on one.'
              : 'Add a class under Classes, then put its learners on the roll.'
          }
        />
      ) : (
        <Card>
          <Table headers={['Class', 'School', 'Class teacher', 'On roll', 'Marked', '']}>
            {classes.map((c) => (
              <tr key={c.id}>
                <td className="td font-medium">{c.name}</td>
                <td className="td text-slate-600">{c.site.name}</td>
                <td className="td text-slate-600">
                  {c.classTeacher?.fullName ?? (
                    <span className="text-xs text-amber-700">Not assigned</span>
                  )}
                </td>
                <td className="td tabular-nums">{c.learners}</td>
                <td className="td">
                  {c.learners === 0 ? (
                    <span className="text-xs text-slate-500">No learners yet</span>
                  ) : c.marked === 0 ? (
                    <Badge tone="warn">Not taken</Badge>
                  ) : (
                    <span className="text-sm tabular-nums text-slate-600">
                      {c.present} present · {c.absent} absent
                      {c.late ? ` · ${c.late} late` : ''}
                    </span>
                  )}
                </td>
                <td className="td text-right">
                  <button
                    type="button"
                    className="btn-secondary text-xs"
                    disabled={c.learners === 0}
                    onClick={() => setOpenClass(c.id)}
                  >
                    {c.marked ? 'Review' : 'Take register'}
                  </button>
                </td>
              </tr>
            ))}
          </Table>
        </Card>
      )}

      <Modal
        open={!!openClass}
        title={`${roster?.class?.name ?? 'Class'} — register for ${date}`}
        onClose={() => setOpenClass(null)}
        footer={
          <>
            <button type="button" className="btn-secondary" onClick={() => setOpenClass(null)}>
              Cancel
            </button>
            <button
              type="button"
              className="btn-primary"
              disabled={save.isPending || !Object.keys(marks).length}
              onClick={() => save.mutate()}
            >
              {save.isPending ? 'Saving…' : 'Save register'}
            </button>
          </>
        }
      >
        {roster && (
          <>
            <div className="mb-3 flex gap-2">
              <button
                type="button"
                className="btn-secondary text-xs"
                onClick={() => setAll('PRESENT')}
              >
                All present
              </button>
              <button
                type="button"
                className="btn-secondary text-xs"
                onClick={() => setAll('ABSENT')}
              >
                All absent
              </button>
            </div>

            <div className="max-h-80 divide-y divide-slate-100 overflow-y-auto rounded-md border border-slate-200">
              {roster.learners.map((l: any) => (
                <div key={l.studentId} className="flex items-center gap-3 px-3 py-2">
                  <span className="flex-1 text-sm">
                    <span className="font-medium">{l.fullName}</span>
                    {l.section ? <span className="text-slate-500"> · {l.section}</span> : null}
                  </span>
                  {(['PRESENT', 'ABSENT', 'LATE'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setMarks((m) => ({ ...m, [l.studentId]: st }))}
                      className={
                        marks[l.studentId] === st
                          ? 'rounded-md bg-brand-700 px-2 py-1 text-xs font-medium text-white'
                          : 'rounded-md border border-slate-300 px-2 py-1 text-xs text-ink-soft hover:bg-slate-50'
                      }
                    >
                      {st.toLowerCase()}
                    </button>
                  ))}
                </div>
              ))}
            </div>

            {save.isError && <p className="mt-3 text-sm text-red-600">{errorMessage(save.error)}</p>}
          </>
        )}
      </Modal>
    </>
  );
}
