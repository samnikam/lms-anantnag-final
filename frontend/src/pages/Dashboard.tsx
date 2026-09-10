import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { api, errorMessage } from '../lib/api';
import { ROLE_LABELS, useAuth } from '../lib/auth';
import {
  Card,
  EmptyState,
  ErrorState,
  Loading,
  PageHeader,
  ProgressBar,
  StatCard,
  StatusBadge,
  Table,
} from '../components/ui';

const CHART_COLORS = ['#1e4d8f', '#4f82c8', '#7ea7db', '#adc9ea', '#d6e5f5'];

export function DashboardPage() {
  const { user } = useAuth();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => (await api.get<any>('/dashboard')).data,
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorState message={errorMessage(error)} onRetry={refetch} />;

  return (
    <>
      <PageHeader
        title={`Welcome, ${user?.fullName.split(' ')[0]}`}
        description={`${ROLE_LABELS[user!.role]}${user?.site ? ` · ${user.site.name}` : ''}`}
      />
      {data?.role === 'SUPER_ADMIN' && <SuperAdminDashboard data={data} />}
      {data?.role === 'ACADEMIC_ADMIN' && <AcademicAdminDashboard data={data} />}
      {data?.role === 'TEACHER' && <TeacherDashboard data={data} />}
      {data?.role === 'STUDENT' && <StudentDashboard data={data} />}
      {data?.role === 'PARENT' && <ParentDashboard data={data} />}
      {data?.role === 'CONTENT_MANAGER' && <ContentManagerDashboard data={data} />}
      {data?.role === 'DEPT_OVERSIGHT' && <OversightDashboard data={data} />}
    </>
  );
}

function SuperAdminDashboard({ data }: { data: any }) {
  const roleRows = Object.entries(data.usersByRole ?? {}).map(([role, count]) => ({
    name: ROLE_LABELS[role as keyof typeof ROLE_LABELS] ?? role,
    count,
  }));
  const totalUsers = roleRows.reduce((s, r) => s + Number(r.count), 0);
  const deviceTotal = data.devices.online + data.devices.offline;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active users" value={totalUsers} />
        <StatCard label="Upcoming sessions" value={data.upcomingSessions} />
        <StatCard
          label="Panels online"
          value={`${data.devices.online}/${deviceTotal}`}
          tone={data.devices.offline > 0 ? 'warn' : 'good'}
          hint={data.devices.offline ? `${data.devices.offline} offline` : 'All devices reporting'}
        />
        <StatCard
          label="Open tickets"
          value={data.openTickets}
          tone={data.openTickets > 0 ? 'warn' : 'good'}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Users by role">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={roleRows} layout="vertical" margin={{ left: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={130} />
              <Tooltip />
              <Bar dataKey="count" fill="#1e4d8f" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Platform activity (last 30 days)">
          <div className="grid grid-cols-2 gap-4">
            <StatCard label="Active users" value={data.activity.activeUsers} />
            <StatCard label="Live sessions" value={data.activity.liveSessions} />
            <StatCard label="Submissions" value={data.activity.submissions} />
            <StatCard label="Quiz attempts" value={data.activity.quizAttempts} />
          </div>
        </Card>
      </div>

      <Card title="Recent privileged actions" action={<Link to="/audit" className="text-sm text-brand-700">View all</Link>}>
        {data.recentAudit?.length ? (
          <Table headers={['When', 'Actor', 'Action', 'Entity']}>
            {data.recentAudit.map((log: any) => (
              <tr key={log.id}>
                <td className="td whitespace-nowrap text-slate-500">
                  {format(new Date(log.at), 'dd MMM, HH:mm')}
                </td>
                <td className="td">{log.actor?.fullName ?? 'System'}</td>
                <td className="td font-mono text-xs">{log.action}</td>
                <td className="td text-slate-500">{log.entity}</td>
              </tr>
            ))}
          </Table>
        ) : (
          <EmptyState title="No audit entries yet" />
        )}
      </Card>
    </div>
  );
}

function AcademicAdminDashboard({ data }: { data: any }) {
  const t = data.totals ?? {};
  const pending = data.attendancePending ?? [];

  return (
    <div className="space-y-6">
      {/* The five figures the set-up sequence builds, in that order. */}
      <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-5">
        <StatCard label="Students" value={t.students ?? 0} />
        <StatCard label="Teachers" value={t.teachers ?? 0} />
        <StatCard label="Classes" value={t.classes ?? 0} />
        <StatCard label="Sections" value={t.sections ?? 0} />
        <StatCard label="Subjects taught" value={t.subjects ?? 0} />
      </div>

      {/* What needs attention before the day is out. */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Registers not yet taken"
          value={pending.length}
          tone={pending.length > 0 ? 'warn' : 'good'}
          hint={pending.length ? 'Today' : 'Every class is marked'}
        />
        <StatCard
          label="Classes without a class teacher"
          value={data.classesWithoutTeacher ?? 0}
          tone={data.classesWithoutTeacher > 0 ? 'warn' : 'good'}
        />
        <StatCard
          label="Cover requests"
          value={data.pendingCover ?? 0}
          tone={data.pendingCover > 0 ? 'warn' : 'good'}
          hint={data.pendingCover ? 'Awaiting your decision' : 'Nothing outstanding'}
        />
        <StatCard
          label="Parent links to approve"
          value={data.pendingParentLinks ?? 0}
          tone={data.pendingParentLinks > 0 ? 'warn' : 'good'}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card
          title="Today’s classes"
          action={
            <Link to="/calendar" className="text-sm text-brand-700">
              Timetable
            </Link>
          }
        >
          {data.todaysClasses?.length ? (
            <Table headers={['Time', 'Period', 'Class']}>
              {data.todaysClasses.map((c: any) => (
                <tr key={c.id}>
                  <td className="td whitespace-nowrap tabular-nums text-slate-500">
                    {format(new Date(c.startAt), 'HH:mm')}
                  </td>
                  <td className="td font-medium">{c.title}</td>
                  <td className="td text-slate-600">{c.className ?? '—'}</td>
                </tr>
              ))}
            </Table>
          ) : (
            <EmptyState
              title="Nothing scheduled today"
              description="Add periods on the Timetable."
            />
          )}
        </Card>

        <Card
          title="Registers still to take"
          action={
            <Link to="/attendance" className="text-sm text-brand-700">
              Attendance
            </Link>
          }
        >
          {pending.length ? (
            <Table headers={['Class', 'On roll', 'Class teacher']}>
              {pending.map((c: any) => (
                <tr key={c.id}>
                  <td className="td font-medium">{c.name}</td>
                  <td className="td tabular-nums">{c.learners}</td>
                  <td className="td text-slate-600">
                    {c.classTeacher ?? (
                      <span className="text-xs text-seal">Not assigned</span>
                    )}
                  </td>
                </tr>
              ))}
            </Table>
          ) : (
            <EmptyState
              title="Every register is taken"
              description="Nothing outstanding for today."
            />
          )}
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Exams in the next seven days">
          {data.upcomingExams?.length ? (
            <Table headers={['When', 'Exam', 'Class']}>
              {data.upcomingExams.map((e: any) => (
                <tr key={e.id}>
                  <td className="td whitespace-nowrap text-slate-500">
                    {format(new Date(e.startAt), 'EEE d MMM, HH:mm')}
                  </td>
                  <td className="td font-medium">{e.title}</td>
                  <td className="td text-slate-600">{e.className ?? '—'}</td>
                </tr>
              ))}
            </Table>
          ) : (
            <EmptyState
              title="No exams scheduled"
              description="Add one on the Timetable as an exam entry."
            />
          )}
        </Card>

        <Card
          title="Recent announcements"
          action={
            <Link to="/announcements" className="text-sm text-brand-700">
              View all
            </Link>
          }
        >
          {data.announcements?.length ? (
            <Table headers={['Notice', 'From', 'When']}>
              {data.announcements.map((a: any) => (
                <tr key={a.id}>
                  <td className="td font-medium">{a.title}</td>
                  <td className="td text-slate-600">{a.author}</td>
                  <td className="td whitespace-nowrap text-slate-500">
                    {format(new Date(a.publishedAt), 'dd MMM')}
                  </td>
                </tr>
              ))}
            </Table>
          ) : (
            <EmptyState title="No announcements yet" />
          )}
        </Card>
      </div>
    </div>
  );
}

function TeacherDashboard({ data }: { data: any }) {
  const classes = data.myClasses ?? [];
  const pending = data.attendancePending ?? [];

  return (
    <div className="space-y-6">
      {data.school && (
        <p className="text-sm text-ink-soft">
          Showing <strong>{data.school}</strong> only — your classes, your subjects, your periods.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="My classes" value={classes.length} />
        <StatCard label="My subjects" value={data.mySubjects?.length ?? 0} />
        <StatCard label="My students" value={data.totalStudents ?? 0} />
        <StatCard
          label="Registers to take"
          value={pending.length}
          tone={pending.length > 0 ? 'warn' : 'good'}
          hint={pending.length ? 'Today' : 'All marked'}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Submissions to grade"
          value={data.submissionsToGrade}
          tone={data.submissionsToGrade > 0 ? 'warn' : 'good'}
        />
        <StatCard
          label="Answers awaiting review"
          value={data.answersAwaitingReview}
          tone={data.answersAwaitingReview > 0 ? 'warn' : 'good'}
        />
        <StatCard label="Cover requested" value={data.pendingCoverRequests ?? 0} />
        <StatCard label="Upcoming live classes" value={data.upcomingSessions?.length ?? 0} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card
          title="Today’s periods"
          action={
            <Link to="/calendar" className="text-sm text-brand-700">
              My timetable
            </Link>
          }
        >
          {data.todaysPeriods?.length ? (
            <Table headers={['Time', 'Period', 'Class']}>
              {data.todaysPeriods.map((p: any) => (
                <tr key={p.id}>
                  <td className="td whitespace-nowrap tabular-nums text-slate-500">
                    {format(new Date(p.startAt), 'HH:mm')}
                  </td>
                  <td className="td font-medium">{p.title}</td>
                  <td className="td text-slate-600">{p.className ?? '—'}</td>
                </tr>
              ))}
            </Table>
          ) : (
            <EmptyState
              title="Nothing on your timetable today"
              description="The academic admin sets the timetable."
            />
          )}
        </Card>

        <Card
          title="Registers still to take"
          action={
            <Link to="/attendance" className="text-sm text-brand-700">
              Mark attendance
            </Link>
          }
        >
          {pending.length ? (
            <Table headers={['Class', 'On roll']}>
              {pending.map((c: any) => (
                <tr key={c.id}>
                  <td className="td font-medium">{c.name}</td>
                  <td className="td tabular-nums">{c.learners}</td>
                </tr>
              ))}
            </Table>
          ) : (
            <EmptyState
              title="Every register is taken"
              description="Nothing outstanding for today."
            />
          )}
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="My classes">
          {classes.length ? (
            <Table headers={['Class', 'School', 'My role', 'Students']}>
              {classes.map((c: any, i: number) => (
                <tr key={`${c.id}-${i}`}>
                  <td className="td font-medium">{c.name}</td>
                  <td className="td text-slate-600">{c.site}</td>
                  <td className="td text-slate-600">
                    {c.role}
                    {c.subject ? <span className="block text-xs">{c.subject}</span> : null}
                  </td>
                  <td className="td tabular-nums">{c.learners}</td>
                </tr>
              ))}
            </Table>
          ) : (
            <EmptyState
              title="No classes assigned yet"
              description="The academic admin assigns you to a class and its subjects."
            />
          )}
        </Card>

        <UpcomingSessions sessions={data.upcomingSessions} />
      </div>
    </div>
  );
}

function StudentDashboard({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Courses" value={data.courses.length} />
        <StatCard label="Overall completion" value={`${data.overallCompletionPct}%`} />
        <StatCard
          label="Attendance"
          value={`${data.attendancePct}%`}
          tone={data.attendancePct >= 75 ? 'good' : 'bad'}
          hint={data.attendancePct < 75 ? 'Below the 75% requirement' : undefined}
        />
        <StatCard label="Certificates" value={data.certificates} />
      </div>

      {data.resumeCourse && (
        <Card title="Resume learning">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="font-medium text-ink">{data.resumeCourse.title}</p>
              <div className="mt-2 max-w-md">
                <ProgressBar value={data.resumeCourse.completionPct} label="Progress" />
              </div>
            </div>
            <Link to={`/learn/${data.resumeCourse.courseId}`} className="btn-primary">
              Continue
            </Link>
          </div>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Assignments due" action={<Link to="/assignments" className="text-sm text-brand-700">All</Link>}>
          {data.assignmentsDue?.length ? (
            <ul className="divide-y divide-slate-100">
              {data.assignmentsDue.map((a: any) => (
                <li key={a.id} className="flex items-center justify-between py-3">
                  <div>
                    <Link to={`/assignments/${a.id}`} className="font-medium text-brand-800 hover:underline">
                      {a.title}
                    </Link>
                    <p className="text-xs text-slate-500">{a.course.title}</p>
                  </div>
                  <span className="text-xs text-slate-500">
                    Due {format(new Date(a.dueAt), 'dd MMM')}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState title="Nothing due" description="You are up to date on assignments." />
          )}
        </Card>

        <UpcomingSessions sessions={data.upcomingSessions} />
      </div>
    </div>
  );
}

/** Read-only guardian view: progress, attendance and results per linked child. */
function ParentDashboard({ data }: { data: any }) {
  if (!data.children?.length) {
    return (
      <EmptyState
        title="No linked learners yet"
        description="An administrator must link your account to a learner before their records appear here."
      />
    );
  }

  return (
    <div className="space-y-8">
      {data.children.map((child: any) => (
        <section key={child.student.id}>
          <h2 className="mb-3 text-lg font-semibold text-ink">{child.student.fullName}</h2>

          <div className="mb-4 grid gap-4 sm:grid-cols-3">
            <StatCard label="Course completion" value={`${child.completionPct}%`} />
            <StatCard
              label="Attendance"
              value={`${child.attendancePct}%`}
              tone={child.attendancePct >= 75 ? 'good' : 'bad'}
            />
            <StatCard label="Enrolled courses" value={child.courses.length} />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card title="Course progress">
              {child.courses.length ? (
                <ul className="space-y-4">
                  {child.courses.map((c: any) => (
                    <li key={c.courseId}>
                      <ProgressBar value={c.completionPct} label={c.title} />
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyState title="Not enrolled in any course yet" />
              )}
            </Card>

            <Card title="Recent results">
              {child.recentResults?.length ? (
                <Table headers={['Assignment', 'Marks']}>
                  {child.recentResults.map((r: any) => (
                    <tr key={r.id}>
                      <td className="td">{r.assignment.title}</td>
                      <td className="td tabular-nums">
                        {r.marks}/{r.assignment.maxMarks}
                      </td>
                    </tr>
                  ))}
                </Table>
              ) : (
                <EmptyState title="No graded work yet" />
              )}
            </Card>
          </div>

          <div className="mt-6">
            <UpcomingSessions sessions={child.upcomingSessions} />
          </div>
        </section>
      ))}
    </div>
  );
}

function ContentManagerDashboard({ data }: { data: any }) {
  const stateRows = Object.entries(data.coursesByState ?? {}).map(([name, value]) => ({
    name: name.replace(/_/g, ' ').toLowerCase(),
    value: Number(value),
  }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Library resources" value={data.libraryResources} />
        <StatCard label="Awaiting review" value={data.awaitingReview.length} tone="warn" />
        <StatCard label="Published courses" value={data.coursesByState?.PUBLISHED ?? 0} tone="good" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Courses by workflow state">
          {stateRows.length ? (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={stateRows} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} label>
                  {stateRows.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState title="No courses yet" />
          )}
        </Card>

        <Card title="Awaiting review">
          {data.awaitingReview.length ? (
            <ul className="divide-y divide-slate-100">
              {data.awaitingReview.map((c: any) => (
                <li key={c.id} className="flex items-center justify-between py-3">
                  <Link to={`/courses/${c.id}`} className="font-medium text-brand-800 hover:underline">
                    {c.title}
                  </Link>
                  <span className="text-xs text-slate-500">
                    {format(new Date(c.updatedAt), 'dd MMM yyyy')}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState title="Nothing waiting for review" />
          )}
        </Card>
      </div>
    </div>
  );
}

/** Department oversight: site rollups only, no individual learner records. */
function OversightDashboard({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Sites" value={data.totals.siteCount} />
        <StatCard label="Classrooms" value={data.totals.classrooms} />
        <StatCard
          label="Device uptime"
          value={`${data.totals.uptimePct}%`}
          tone={data.totals.uptimePct >= 90 ? 'good' : data.totals.uptimePct >= 70 ? 'warn' : 'bad'}
          hint={`${data.totals.devicesOnline} of ${data.totals.devicesTotal} online`}
        />
        <StatCard label="Average completion" value={`${data.averageCompletionPct}%`} />
      </div>

      <Card title="Site-wise utilization" action={<Link to="/reports" className="text-sm text-brand-700">Full report</Link>}>
        <Table headers={['Site', 'Classrooms', 'Learners', 'Sessions received', 'Avg. headcount', 'Device uptime']}>
          {data.sites.map((site: any) => (
            <tr key={site.siteId}>
              <td className="td">
                <p className="font-medium">{site.siteName}</p>
                <p className="text-xs text-slate-500">{site.siteCode}</p>
              </td>
              <td className="td tabular-nums">{site.classrooms}</td>
              <td className="td tabular-nums">{site.students}</td>
              <td className="td tabular-nums">
                {site.sessionsReceived}
                {site.sessionsDegraded > 0 && (
                  <span className="ml-2 text-xs text-seal">{site.sessionsDegraded} degraded</span>
                )}
              </td>
              <td className="td tabular-nums">{site.avgHeadcount}</td>
              <td className="td w-40">
                <ProgressBar value={site.deviceUptimePct} />
              </td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  );
}

function UpcomingSessions({ sessions }: { sessions?: any[] }) {
  return (
    <Card title="Upcoming live classes" action={<Link to="/live" className="text-sm text-brand-700">All sessions</Link>}>
      {sessions?.length ? (
        <ul className="divide-y divide-slate-100">
          {sessions.map((s: any) => (
            <li key={s.id} className="flex items-center justify-between gap-4 py-3">
              <div className="min-w-0">
                <Link to={`/live/${s.id}`} className="font-medium text-brand-800 hover:underline">
                  {s.title}
                </Link>
                <p className="truncate text-xs text-slate-500">
                  {s.course?.title ?? 'General'}
                  {s.host?.fullName ? ` · ${s.host.fullName}` : ''}
                  {s.targets?.length ? ` · ${s.targets.length} classrooms` : ''}
                </p>
              </div>
              <span className="shrink-0 text-xs text-slate-500">
                {format(new Date(s.scheduledStart), 'dd MMM, HH:mm')}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState title="No sessions scheduled" />
      )}
    </Card>
  );
}
