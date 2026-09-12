import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  BookOpen,
  CalendarDays,
  ClipboardList,
  FileCheck2,
  Languages,
  LibraryBig,
  ListChecks,
  Video,
} from 'lucide-react';
import { Reveal } from './motion';
import { ABOUT, GALLERY } from './media';
import { PageBanner, Section, SectionHeading } from './PublicLayout';

/** The curriculum, grouped as a school prospectus would group it. */
const STREAMS = [
  {
    title: 'Core subjects',
    tone: 'bg-accent-coral-soft text-accent-coral-deep',
    dot: 'bg-accent-coral',
    subjects: ['Mathematics', 'Science', 'Social Science'],
  },
  {
    title: 'Languages',
    tone: 'bg-accent-violet-soft text-accent-violet-deep',
    dot: 'bg-accent-violet',
    subjects: ['English', 'Urdu', 'Kashmiri', 'Hindi', 'Arabic', 'Persian'],
  },
  {
    title: 'Skills & wellbeing',
    tone: 'bg-accent-mint-soft text-accent-mint-deep',
    dot: 'bg-accent-mint',
    subjects: ['Computer Science', 'Art Education', 'Health & Physical Education'],
  },
];

/** How a subject is actually delivered, start to finish. */
const JOURNEY = [
  {
    icon: CalendarDays,
    title: 'Timetabled',
    body: 'The academic office publishes the timetable. Every period names its class, its subject and the teacher who takes it — clashes are reported, not silently allowed.',
  },
  {
    icon: Video,
    title: 'Taught',
    body: 'Lessons run live from a studio to the classroom panels scheduled to receive them, or in the room by the school’s own teacher. Either way the session is recorded.',
  },
  {
    icon: LibraryBig,
    title: 'Resourced',
    body: 'Video, PDF, presentation and document material is prepared, reviewed and published centrally, then drawn on by every school in the programme.',
  },
  {
    icon: ListChecks,
    title: 'Registered',
    body: 'The class teacher marks the daily register. Corrections need a reason and keep the original, and guardians are alerted below the 75% requirement.',
  },
  {
    icon: ClipboardList,
    title: 'Assessed',
    body: 'Work is set against a class, submitted in the portal and graded where it was set. Quizzes and examinations draw on a question bank and mark themselves where the format allows.',
  },
  {
    icon: Award,
    title: 'Certified',
    body: 'On completion a certificate is issued with a unique number and a verification code that anyone can check without an account.',
  },
];

const LANGUAGES = ['English', 'हिन्दी (Hindi)', 'اردو (Urdu)', 'کٲشُر (Kashmiri)'];

export function AcademicsPage() {
  return (
    <>
      <PageBanner
        title="Academics"
        subtitle="Twelve subjects, one timetable, and a record that follows each learner from the first period to the certificate."
        image={GALLERY[5].src}
        imageAlt={GALLERY[5].alt}
      />

      {/* ══ CURRICULUM ═════════════════════════════════════════════════ */}
      <Section>
        <SectionHeading
          kicker="Curriculum"
          title="Subjects offered across the programme"
          description="Each class studies a set of subjects, and each subject has a teacher answerable for it at that class."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {STREAMS.map((s, i) => (
            <Reveal key={s.title} delay={i * 110}>
              <article className="h-full rounded-2xl bg-surface p-7 shadow ring-1 ring-rule">
                <span
                  className={`inline-block rounded-lg px-4 py-2 text-[12.5px] font-extrabold uppercase tracking-[0.08em] ${s.tone}`}
                >
                  {s.title}
                </span>
                <ul className="mt-6 space-y-3.5">
                  {s.subjects.map((sub) => (
                    <li key={sub} className="flex items-center gap-3 text-[15px] font-semibold text-ink">
                      <span className={`h-2 w-2 shrink-0 rounded-full ${s.dot}`} aria-hidden />
                      {sub}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ══ HOW A SUBJECT RUNS ═════════════════════════════════════════ */}
      <Section className="bg-surface">
        <SectionHeading
          kicker="From timetable to certificate"
          title="How a subject runs, end to end"
          description="Each stage assumes the one before it — which is why the portal is set up in the same order a school year is built."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {JOURNEY.map((j, i) => (
            <Reveal key={j.title} delay={(i % 3) * 100}>
              <article className="group relative h-full overflow-hidden rounded-2xl bg-paper p-7 transition-all hover:-translate-y-1 hover:shadow-lg">
                <span className="num absolute right-6 top-5 text-[36px] font-extrabold leading-none text-brand-100 transition-colors group-hover:text-accent-amber/50">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand-700 text-white shadow-pill">
                  <j.icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="relative mt-5 text-[18px] font-extrabold tracking-[-0.02em] text-ink">
                  {j.title}
                </h3>
                <p className="relative mt-2.5 text-[13.5px] leading-relaxed text-muted">{j.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ══ ASSESSMENT & LANGUAGES ═════════════════════════════════════ */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <img
              src={ABOUT.welcome.src}
              alt={ABOUT.welcome.alt}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg"
            />
          </Reveal>

          <Reveal delay={120}>
            <SectionHeading kicker="Assessment" title="Examinations and results" align="left" />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted">
              <p>
                Quizzes and examinations are built from a question bank organised by subject and
                topic, with configurable duration, attempt limits, pass marks and randomisation.
                Objective questions mark themselves; anything needing judgement goes to the
                teacher.
              </p>
              <p>
                For higher-stakes papers the portal applies basic integrity controls — a timer
                lock and detection of switching away from the window — and results are published
                with a full attempt history behind them.
              </p>
            </div>

            <div className="mt-8 rounded-2xl bg-accent-amber-soft p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-amber text-ink">
                  <FileCheck2 className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="text-[16px] font-extrabold text-ink">Attendance requirement</h3>
              </div>
              <p className="mt-3.5 text-[14px] leading-relaxed text-ink-soft">
                Learners are expected to maintain <strong>75% attendance</strong>. The portal
                calculates this continuously and alerts guardians automatically when a learner
                falls below it — by in-app notice, email, and SMS where families have no reliable
                data connection.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ══ LANGUAGES ══════════════════════════════════════════════════ */}
      <Section className="bg-surface" width="narrow">
        <div className="rounded-2xl bg-brand-800 p-9 text-center sm:p-12">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/15 text-white">
            <Languages className="h-6 w-6" aria-hidden />
          </span>
          <h2 className="mt-6 text-[24px] font-extrabold tracking-[-0.025em] text-white sm:text-[30px]">
            Available in the languages of the valley
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/65">
            The portal interface is planned in four languages, so a parent or learner is never
            held back by the language a screen happens to be written in.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {LANGUAGES.map((l) => (
              <span
                key={l}
                className="rounded-lg bg-white/10 px-5 py-2.5 text-[14px] font-bold text-white ring-1 ring-white/15"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* ══ CTA ════════════════════════════════════════════════════════ */}
      <Section width="narrow" className="text-center">
        <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-pill">
          <BookOpen className="h-7 w-7" aria-hidden />
        </span>
        <h2 className="mt-7 text-[26px] font-extrabold tracking-[-0.03em] text-ink sm:text-[32px]">
          See your own timetable and results
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-muted">
          Students, teachers and parents each get their own view of the academic record.
        </p>
        <Link
          to="/login"
          className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-700 px-7 py-3.5 text-[14.5px] font-bold text-white shadow-pill transition-all hover:-translate-y-0.5 hover:bg-brand-600"
        >
          Login to the portal
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      </Section>
    </>
  );
}
