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
  MonitorPlay,
  ShieldCheck,
  Users,
  Video,
} from 'lucide-react';
import { IconTile, type Accent } from '../components/ui';
import { DIVISION, FIGURES, Section, SectionHeading } from './PublicLayout';

/** What the portal actually does, named the way the sidebar names it. */
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
    body: 'A lesson taught once in a studio reaches every panel that is scheduled to receive it, and is recorded for the learners who could not attend.',
  },
  {
    icon: CalendarDays,
    accent: 'violet',
    title: 'One official timetable',
    body: 'The academic office authors the timetable. Teachers, learners and guardians each read their own slice of it, with the period, the subject and who takes it.',
  },
  {
    icon: ListChecks,
    accent: 'mint',
    title: 'Daily attendance',
    body: 'A class teacher takes the register for their own class. Guardians are alerted when a learner falls below the 75% requirement.',
  },
  {
    icon: ClipboardList,
    accent: 'sky',
    title: 'Assignments & grading',
    body: 'Work is set against a class, submitted in the portal, and graded where it was set — with late submissions marked as such.',
  },
  {
    icon: LibraryBig,
    accent: 'amber',
    title: 'Content library',
    body: 'Lesson material is prepared, reviewed and published once, then drawn on by every school in the division rather than rebuilt at each.',
  },
  {
    icon: BarChart3,
    accent: 'brand',
    title: 'Reports & oversight',
    body: 'Progress, attendance and panel utilisation roll up by class and by school, so the division office can see where support is needed.',
  },
];

/** Who signs in, and what the portal is for them. */
const AUDIENCES = [
  {
    icon: Users,
    accent: 'brand' as Accent,
    role: 'Teachers',
    body: 'Their own classes and subjects, their timetable, their registers and their grading — and nothing belonging to another teacher.',
  },
  {
    icon: MonitorPlay,
    accent: 'violet' as Accent,
    role: 'Learners',
    body: 'Today’s lessons with the time and the teacher, their own attendance record, assignments due, quizzes and certificates earned.',
  },
  {
    icon: ShieldCheck,
    accent: 'mint' as Accent,
    role: 'Academic office',
    body: 'Schools, the academic year, classes, subjects and people — set up in that order, then the timetable and registers that build on them.',
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
    body: 'Each period names its class and subject, so the portal knows which teacher takes it and which learners should be there.',
  },
  {
    n: '03',
    title: 'Lessons run and are recorded',
    body: 'Studios broadcast to the panels. Registers are taken, work is set and graded, and everything lands in one record.',
  },
];

export function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-40 h-[26rem] w-[26rem] rounded-full bg-accent-violet/25 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-28 h-[26rem] w-[26rem] rounded-full bg-accent-coral/20 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[12px] font-semibold text-white/80 ring-1 ring-white/15 backdrop-blur-sm">
            {DIVISION.department}
          </span>

          <h1 className="mt-6 max-w-3xl text-[34px] font-extrabold leading-[1.12] tracking-[-0.03em] text-white sm:text-[46px] lg:text-[54px]">
            One classroom, taught across the whole division.
          </h1>

          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/70 sm:text-[17px]">
            The {DIVISION.programme} carries lessons from two broadcast studios to interactive
            panels at schools across {DIVISION.division} — and keeps the timetable, the register
            and the results for all of them in a single official record.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-bold text-brand-700 shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <LogIn className="h-4 w-4" aria-hidden />
              Sign in to the portal
            </Link>
            <Link
              to="/platform"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-[14px] font-semibold text-white ring-1 ring-white/20 backdrop-blur-sm transition-colors hover:bg-white/15"
            >
              Explore the platform
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <dl className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {FIGURES.map((f) => (
              <div
                key={f.label}
                className="rounded-2xl bg-white/10 px-5 py-4 ring-1 ring-white/10 backdrop-blur-sm"
              >
                <dd className="num text-[26px] font-extrabold leading-none text-white">
                  {f.value}
                </dd>
                <dt className="mt-2 text-[12px] font-medium text-white/55">{f.label}</dt>
              </div>
            ))}
          </dl>
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
          {CAPABILITIES.map((c) => (
            <article key={c.title} className="card-interactive p-6">
              <IconTile icon={c.icon} accent={c.accent} />
              <h3 className="mt-5 text-[16px] font-bold tracking-[-0.01em] text-ink">{c.title}</h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{c.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* ── How it runs ──────────────────────────────────────────────── */}
      <Section className="bg-surface">
        <SectionHeading
          eyebrow="How it runs"
          title="Set up once, then the day takes care of itself"
        />

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.n} className="relative rounded-[20px] bg-paper p-7">
              <span className="num text-[13px] font-extrabold text-brand-300">{s.n}</span>
              <h3 className="mt-3 text-[16px] font-bold tracking-[-0.01em] text-ink">{s.title}</h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── Who it is for ────────────────────────────────────────────── */}
      <Section>
        <SectionHeading
          eyebrow="Who signs in"
          title="Each role sees its own work, and only its own"
          description="Access is decided on the server, not hidden in the interface — a teacher cannot reach another teacher's register by guessing a link."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {AUDIENCES.map((a) => (
            <article key={a.role} className="card p-7">
              <IconTile icon={a.icon} accent={a.accent} />
              <h3 className="mt-5 text-[16px] font-bold tracking-[-0.01em] text-ink">{a.role}</h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{a.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* ── Certificates ─────────────────────────────────────────────── */}
      <Section className="bg-surface">
        <div className="overflow-hidden rounded-[24px] bg-gradient-to-br from-brand-600 to-brand-800 px-8 py-12 sm:px-12">
          <div className="flex flex-wrap items-center justify-between gap-8">
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
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-bold text-brand-700 shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Verify a certificate
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </Section>

      {/* ── Sign-in call to action ───────────────────────────────────── */}
      <Section width="narrow" className="text-center">
        <h2 className="text-[26px] font-extrabold tracking-[-0.025em] text-ink sm:text-[30px]">
          Already have an account?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
          Use the credentials issued by your school or the division office. If you have forgotten
          them, the sign-in page can send a reset.
        </p>
        <Link to="/login" className="btn-primary mt-8 !rounded-full !px-7 !py-3 !text-[14px]">
          <LogIn className="h-4 w-4" aria-hidden />
          Sign in to the portal
        </Link>
      </Section>
    </>
  );
}
