import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  ClipboardList,
  FileBadge,
  LibraryBig,
  ListChecks,
  LogIn,
  Mountain,
  ShieldCheck,
  Snowflake,
  Users,
  Video,
  Wifi,
} from 'lucide-react';
import { IconTile, type Accent } from '../components/ui';
import { DIVISION, FIGURES, Section, SectionHeading } from './PublicLayout';
import { CountUp, Reveal } from './motion';
import { ClassroomScene, DotField, RidgeDivider, ValleyBroadcastScene } from './illustrations';

/** The curriculum the division's classes actually study. */
const SUBJECTS = [
  'Mathematics',
  'Science',
  'Social Science',
  'English',
  'Urdu',
  'Kashmiri',
  'Hindi',
  'Computer Science',
  'Arabic',
  'Persian',
  'Art Education',
  'Health & Physical Education',
];

/** Why a hybrid classroom suits this district in particular. */
const VALLEY: Array<{ icon: typeof Mountain; accent: Accent; title: string; body: string }> = [
  {
    icon: Mountain,
    accent: 'violet',
    title: 'Schools spread across the valley',
    body: 'Anantnag’s schools sit far apart across mountainous ground. Moving a specialist teacher between them costs hours of the school day; moving the lesson costs nothing.',
  },
  {
    icon: Snowflake,
    accent: 'sky',
    title: 'Teaching that survives winter',
    body: 'When weather keeps a class from the classroom, the session is still recorded and the timetable still stands — so the year is not lost to the months it is hardest to teach in.',
  },
  {
    icon: Wifi,
    accent: 'mint',
    title: 'Built for the connection available',
    body: 'A panel in the room carries the lesson for the whole class, so a school needs one good link rather than a device and a connection for every learner.',
  },
];

const CAPABILITIES: Array<{
  icon: typeof Video;
  accent: Accent;
  title: string;
  body: string;
}> = [
  {
    icon: Video,
    accent: 'coral',
    title: 'Live & broadcast classes',
    body: 'A lesson taught once in a studio reaches every panel scheduled to receive it, and is recorded for the learners who could not attend.',
  },
  {
    icon: CalendarDays,
    accent: 'violet',
    title: 'One official timetable',
    body: 'The academic office authors it. Teachers, learners and guardians each read their own slice — the period, the subject, and who takes it.',
  },
  {
    icon: ListChecks,
    accent: 'mint',
    title: 'Daily attendance',
    body: 'The class teacher takes the register for their own class. Guardians are alerted when a learner falls below the 75% requirement.',
  },
  {
    icon: ClipboardList,
    accent: 'sky',
    title: 'Assignments & grading',
    body: 'Work is set against a class, submitted in the portal and graded where it was set, with late submissions marked as late.',
  },
  {
    icon: LibraryBig,
    accent: 'amber',
    title: 'Shared content library',
    body: 'Material is prepared, reviewed and published once, then drawn on by every school rather than rebuilt at each of them.',
  },
  {
    icon: BarChart3,
    accent: 'brand',
    title: 'Reports & oversight',
    body: 'Progress, attendance and panel utilisation roll up by class and by school, so the division office can see where support is needed.',
  },
];

const AUDIENCES = [
  {
    icon: Users,
    accent: 'brand' as Accent,
    role: 'Teachers',
    body: 'Their own classes and subjects, their timetable, their registers and their grading — and nothing belonging to another teacher.',
    points: ['Mark the daily register', 'Set and grade work', 'Request cover for a period'],
  },
  {
    icon: Video,
    accent: 'violet' as Accent,
    role: 'Learners',
    body: 'Today’s lessons with the time and the teacher, their own attendance, assignments due, quizzes and the certificates they have earned.',
    points: ['Join the live class', 'See their own attendance', 'Submit work and sit quizzes'],
  },
  {
    icon: ShieldCheck,
    accent: 'mint' as Accent,
    role: 'Academic office',
    body: 'Schools, the academic year, classes, subjects and people — set up in that order, then the timetable and registers that build on them.',
    points: ['Publish the timetable', 'Assign class and subject teachers', 'Read division-wide reports'],
  },
];

const STEPS = [
  {
    n: '01',
    title: 'The office sets the school up',
    body: 'Schools, the academic year, classes, the subjects each class studies, and the teachers and learners in them.',
  },
  {
    n: '02',
    title: 'A timetable is published',
    body: 'Each period names its class and its subject, so the portal knows which teacher takes it and which learners should be there.',
  },
  {
    n: '03',
    title: 'Lessons run and are recorded',
    body: 'Studios broadcast to the panels. Registers are taken, work is set and graded, and all of it lands in one record.',
  },
];

export function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 anim-sheen">
        <div
          aria-hidden
          className="anim-drift pointer-events-none absolute -right-32 -top-40 h-[26rem] w-[26rem] rounded-full bg-accent-violet/25 blur-3xl"
        />
        <div
          aria-hidden
          className="anim-drift pointer-events-none absolute -bottom-40 -left-28 h-[26rem] w-[26rem] rounded-full bg-accent-coral/20 blur-3xl"
          style={{ animationDelay: '-6s' }}
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-24 pt-16 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:pb-28 lg:pt-20">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[12px] font-semibold text-white/80 ring-1 ring-white/15 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-mint" aria-hidden />
                {DIVISION.department}
              </span>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="mt-6 text-[34px] font-extrabold leading-[1.1] tracking-[-0.03em] text-white sm:text-[44px] lg:text-[52px]">
                One classroom,
                <br />
                <span className="bg-gradient-to-r from-accent-sky via-white to-accent-coral bg-clip-text text-transparent">
                  the whole valley
                </span>{' '}
                in it.
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/70 sm:text-[17px]">
                The {DIVISION.programme} carries lessons from two broadcast studios to interactive
                panels in schools across {DIVISION.division} — and keeps the timetable, the
                register and the results for every one of them in a single official record.
              </p>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  to="/login"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-bold text-brand-700 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <LogIn className="h-4 w-4" aria-hidden />
                  Sign in to the portal
                </Link>
                <Link
                  to="/platform"
                  className="group inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-[14px] font-semibold text-white ring-1 ring-white/20 backdrop-blur-sm transition-colors hover:bg-white/15"
                >
                  Explore the platform
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <ValleyBroadcastScene className="h-auto w-full" />
          </Reveal>
        </div>

        {/* Counting figures, on the ridgeline */}
        <div className="relative mx-auto max-w-6xl px-5 pb-20 sm:px-8">
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {FIGURES.map((f, i) => (
              <Reveal key={f.label} delay={i * 90}>
                <div className="rounded-2xl bg-white/10 px-5 py-4 ring-1 ring-white/10 backdrop-blur-sm transition-colors hover:bg-white/15">
                  <dd className="num text-[28px] font-extrabold leading-none text-white">
                    <CountUp value={f.value} />
                  </dd>
                  <dt className="mt-2 text-[12px] font-medium text-white/55">{f.label}</dt>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>

        <RidgeDivider className="block h-14 w-full sm:h-20" fill="#f5f6fb" />
      </section>

      {/* ── Why here ─────────────────────────────────────────────────── */}
      <Section>
        <SectionHeading
          eyebrow="Why hybrid, here"
          title="Built for the district it serves"
          description="Anantnag is not a city campus. The programme is shaped around the distances, the winters and the connectivity the division actually works with."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {VALLEY.map((v, i) => (
            <Reveal key={v.title} delay={i * 110} as="article">
              <article className="card-interactive h-full p-7">
                <IconTile icon={v.icon} accent={v.accent} />
                <h3 className="mt-5 text-[16px] font-bold tracking-[-0.01em] text-ink">
                  {v.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{v.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Subjects ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-surface px-5 py-16 sm:px-8 lg:py-20">
        <DotField className="pointer-events-none absolute inset-0 h-full w-full opacity-60" />
        <div className="relative mx-auto max-w-5xl text-center">
          <Reveal>
            <p className="eyebrow mb-3 !text-brand-500">The curriculum</p>
            <h2 className="text-[24px] font-extrabold tracking-[-0.025em] text-ink sm:text-[28px]">
              Every subject a class studies, taught and recorded the same way
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-9 flex flex-wrap justify-center gap-2.5">
              {SUBJECTS.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-paper px-4 py-2 text-[13px] font-semibold text-ink-soft ring-1 ring-rule transition-all hover:-translate-y-0.5 hover:bg-tint-brand hover:text-brand-600 hover:ring-brand-200"
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── What it does ─────────────────────────────────────────────── */}
      <Section>
        <SectionHeading
          eyebrow="What the portal does"
          title="Everything a hybrid school day needs, in one place"
          description="Each part assumes the one before it — a timetable means something only once classes and subjects exist, and a register only once there are learners to mark."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 100}>
              <article className="card-interactive group h-full p-6">
                <IconTile icon={c.icon} accent={c.accent} />
                <h3 className="mt-5 text-[16px] font-bold tracking-[-0.01em] text-ink">
                  {c.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{c.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── How it runs, beside the classroom ────────────────────────── */}
      <Section className="bg-surface">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <ClassroomScene className="h-auto w-full" />
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="How it runs"
              title="Set up once, then the day takes care of itself"
              align="left"
            />
            <ol className="mt-10 space-y-6">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 110} as="li">
                  <li className="flex gap-5">
                    <span className="num flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-tint-brand text-[13px] font-extrabold text-brand-600">
                      {s.n}
                    </span>
                    <div className="min-w-0 pt-1">
                      <h3 className="text-[15.5px] font-bold tracking-[-0.01em] text-ink">
                        {s.title}
                      </h3>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{s.body}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* ── Who signs in ─────────────────────────────────────────────── */}
      <Section>
        <SectionHeading
          eyebrow="Who signs in"
          title="Each role sees its own work, and only its own"
          description="Access is decided on the server, not hidden in the interface — a teacher cannot reach another teacher's register by guessing a link."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {AUDIENCES.map((a, i) => (
            <Reveal key={a.role} delay={i * 110}>
              <article className="card-interactive flex h-full flex-col p-7">
                <IconTile icon={a.icon} accent={a.accent} />
                <h3 className="mt-5 text-[16px] font-bold tracking-[-0.01em] text-ink">
                  {a.role}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{a.body}</p>
                <ul className="mt-5 space-y-2 border-t border-rule pt-5">
                  {a.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-[13px] text-ink-soft">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-mint"
                        aria-hidden
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Certificates ─────────────────────────────────────────────── */}
      <Section className="bg-surface">
        <Reveal>
          <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-brand-600 to-brand-800 px-8 py-12 sm:px-12">
            <div
              aria-hidden
              className="anim-drift pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-accent-amber/20 blur-3xl"
            />
            <div className="relative flex flex-wrap items-center justify-between gap-8">
              <div className="max-w-xl">
                <IconTile icon={FileBadge} className="!bg-white/15 !text-white" />
                <h2 className="mt-5 text-[24px] font-extrabold tracking-[-0.02em] text-white sm:text-[28px]">
                  Every certificate can be checked
                </h2>
                <p className="mt-3 text-[14.5px] leading-relaxed text-white/70">
                  A certificate issued by the portal carries a verification code. Anyone — an
                  employer, a college, another department — can confirm it is genuine without an
                  account.
                </p>
              </div>
              <Link
                to="/verify"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-bold text-brand-700 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                Verify a certificate
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── Sign in ──────────────────────────────────────────────────── */}
      <Section width="narrow" className="text-center">
        <Reveal>
          <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-ink sm:text-[30px]">
            Already have an account?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
            Use the credentials issued by your school or the division office. If you have
            forgotten them, the sign-in page can send a reset.
          </p>
          <Link to="/login" className="btn-primary mt-8 !rounded-full !px-7 !py-3 !text-[14px]">
            <LogIn className="h-4 w-4" aria-hidden />
            Sign in to the portal
          </Link>
        </Reveal>
      </Section>
    </>
  );
}
