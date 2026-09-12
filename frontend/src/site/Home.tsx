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
  Sparkles,
  Users,
  Video,
  Wifi,
} from 'lucide-react';
import { DIVISION, FIGURES, Section } from './PublicLayout';
import { CountUp, Marker, Reveal } from './motion';
import {
  Blob,
  ClassroomScene,
  Doodle,
  ValleyBroadcastScene,
  WaveDivider,
} from './illustrations';

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

const VALLEY = [
  {
    icon: Mountain,
    tone: 'violet',
    title: 'Schools far apart',
    body: 'Anantnag’s schools sit across mountainous ground. Moving a specialist teacher between them costs hours of the school day. Moving the lesson costs nothing.',
  },
  {
    icon: Snowflake,
    tone: 'sky',
    title: 'Teaching that survives winter',
    body: 'When weather keeps a class from the classroom, the session is still recorded and the timetable still stands — so the year is not lost to the hardest months.',
  },
  {
    icon: Wifi,
    tone: 'mint',
    title: 'One good link per room',
    body: 'A panel carries the lesson for the whole class, so a school needs one connection — not a device and a connection for every learner in it.',
  },
] as const;

type Tone = 'coral' | 'mint' | 'sky' | 'amber' | 'violet' | 'brand';

const CAPABILITIES: Array<{
  icon: typeof Video;
  tone: Tone;
  title: string;
  body: string;
  /** Spans two columns in the grid, for the one that carries the most weight. */
  big?: boolean;
}> = [
  {
    icon: Video,
    tone: 'coral',
    title: 'Live & broadcast classes',
    body: 'A lesson taught once in a studio reaches every panel scheduled to receive it, and is recorded for whoever could not attend.',
    big: true,
  },
  {
    icon: CalendarDays,
    tone: 'violet',
    title: 'One official timetable',
    body: 'Each period names its class, its subject and who takes it.',
  },
  {
    icon: ListChecks,
    tone: 'mint',
    title: 'Daily attendance',
    body: 'Taken by the class teacher. Guardians alerted below 75%.',
  },
  {
    icon: ClipboardList,
    tone: 'sky',
    title: 'Assignments & grading',
    body: 'Set against a class, submitted in the portal, graded where it was set — late work marked late.',
  },
  {
    icon: LibraryBig,
    tone: 'amber',
    title: 'Shared library',
    body: 'Material published once, drawn on by every school.',
  },
  {
    icon: BarChart3,
    tone: 'brand',
    title: 'Reports & oversight',
    body: 'Progress, attendance and panel use, rolled up by class and school.',
  },
];

const AUDIENCES = [
  {
    icon: Users,
    tone: 'coral',
    role: 'Teachers',
    body: 'Their own classes and subjects — and nothing belonging to another teacher.',
    points: ['Mark the daily register', 'Set and grade work', 'Request cover for a period'],
  },
  {
    icon: Video,
    tone: 'violet',
    role: 'Learners',
    body: 'Today’s lessons with the time and the teacher who takes them.',
    points: ['Join the live class', 'See their own attendance', 'Submit work and sit quizzes'],
  },
  {
    icon: ShieldCheck,
    tone: 'mint',
    role: 'Academic office',
    body: 'The whole school year, set up in the order it has to be built.',
    points: ['Publish the timetable', 'Assign class & subject teachers', 'Read division reports'],
  },
] as const;

const STEPS = [
  {
    n: '01',
    tone: 'coral',
    title: 'The office sets the school up',
    body: 'Schools, the academic year, classes, the subjects each class studies, and the teachers and learners in them.',
  },
  {
    n: '02',
    tone: 'violet',
    title: 'A timetable is published',
    body: 'Each period names its class and subject, so the portal knows which teacher takes it and which learners should be there.',
  },
  {
    n: '03',
    tone: 'mint',
    title: 'Lessons run and are recorded',
    body: 'Studios broadcast to the panels. Registers are taken, work is graded, and all of it lands in one record.',
  },
] as const;

/** Tailwind needs whole class names, so each tone is spelled out. */
const TONE = {
  coral: { soft: 'bg-accent-coral-soft', solid: 'bg-accent-coral', text: 'text-accent-coral-deep' },
  mint: { soft: 'bg-accent-mint-soft', solid: 'bg-accent-mint', text: 'text-accent-mint-deep' },
  sky: { soft: 'bg-accent-sky-soft', solid: 'bg-accent-sky', text: 'text-accent-sky-deep' },
  amber: { soft: 'bg-accent-amber-soft', solid: 'bg-accent-amber', text: 'text-accent-amber-deep' },
  violet: {
    soft: 'bg-accent-violet-soft',
    solid: 'bg-accent-violet',
    text: 'text-accent-violet-deep',
  },
  brand: { soft: 'bg-tint-brand', solid: 'bg-brand-600', text: 'text-brand-600' },
} as const;

const HEX = {
  coral: '#f2789f',
  mint: '#3bc9a0',
  sky: '#56b8e8',
  amber: '#f5a623',
  violet: '#8b7cf6',
};

export function HomePage() {
  return (
    <>
      {/* ══ HERO ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#fffaf2] via-paper to-paper">
        <Blob className="-left-40 -top-32 h-[30rem] w-[30rem] blur-2xl" color="#ffe3ee" opacity={0.9} />
        <Blob
          className="-right-32 top-10 h-[26rem] w-[26rem] blur-2xl"
          color="#e6e1ff"
          opacity={0.9}
        />
        <Doodle kind="star" className="anim-wiggle absolute left-[6%] top-[22%] h-9 w-9" color={HEX.amber} />
        <Doodle kind="ring" className="anim-float absolute right-[8%] bottom-[18%] h-12 w-12" color={HEX.mint} />
        <Doodle kind="plus" className="anim-wiggle absolute left-[44%] top-[8%] h-7 w-7" color={HEX.coral} />

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-10 pt-14 sm:px-8 lg:grid-cols-[1.02fr_1fr] lg:pt-20">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[12.5px] font-bold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <Sparkles className="h-3.5 w-3.5 text-accent-amber" aria-hidden />
                {DIVISION.department}
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-7 text-[44px] font-extrabold leading-[1.02] tracking-[-0.04em] text-ink sm:text-[62px] lg:text-[72px]">
                One classroom.
                <br />
                The whole{' '}
                <Marker color="#ffd27a">
                  <span>valley</span>
                </Marker>{' '}
                in it.
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-ink-soft sm:text-[18px]">
                Lessons taught from two broadcast studios, received on interactive panels in
                schools right across {DIVISION.division} — with the timetable, the register and
                the results for every one of them kept in a single record.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  to="/login"
                  className="group inline-flex items-center gap-2 rounded-full bg-brand-700 px-7 py-3.5 text-[15px] font-bold text-white shadow-pill transition-all hover:-translate-y-0.5 hover:bg-brand-600"
                >
                  <LogIn className="h-4 w-4" aria-hidden />
                  Sign in to the portal
                </Link>
                <Link
                  to="/platform"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-bold text-ink shadow-sm ring-1 ring-rule transition-all hover:-translate-y-0.5 hover:shadow"
                >
                  See what it does
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={180}>
            <ValleyBroadcastScene className="h-auto w-full drop-shadow-xl" />
          </Reveal>
        </div>

        {/* Figures, as big colour blocks */}
        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-6 sm:px-8">
          <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {FIGURES.map((f, i) => {
              const tones = ['coral', 'violet', 'mint', 'amber'] as const;
              const t = TONE[tones[i]];
              return (
                <Reveal key={f.label} delay={i * 90}>
                  <div className={`block-card ${t.soft} h-full`}>
                    <dd className={`num text-[42px] font-extrabold leading-none ${t.text}`}>
                      <CountUp value={f.value} />
                    </dd>
                    <dt className="mt-3 text-[13px] font-bold text-ink-soft">{f.label}</dt>
                  </div>
                </Reveal>
              );
            })}
          </dl>
        </div>
      </section>

      {/* ══ FULL-BLEED CORAL BAND ══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-accent-coral-deep">
        <Doodle kind="dots" className="absolute left-[4%] top-[18%] h-16 w-16 opacity-30" color="#ffffff" />
        <Doodle kind="arc" className="anim-float absolute right-[6%] bottom-[16%] h-16 w-16 opacity-40" color="#ffffff" />
        <div className="relative mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 lg:py-24">
          <Reveal>
            <p className="text-[13px] font-extrabold uppercase tracking-[0.18em] text-white/60">
              The whole idea
            </p>
            <h2 className="mt-5 text-[32px] font-extrabold leading-[1.1] tracking-[-0.03em] text-white sm:text-[46px] lg:text-[54px]">
              Teach it once.
              <br />
              Twenty-one schools receive it.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-white/75 sm:text-[17px]">
              A specialist teacher cannot stand in twenty-one classrooms at nine in the morning.
              The lesson can.
            </p>
          </Reveal>
        </div>
        <WaveDivider className="block h-16 w-full sm:h-24" fill="#f5f6fb" />
      </section>

      {/* ══ WHY HERE ═══════════════════════════════════════════════════ */}
      <Section className="!pt-4">
        <Reveal>
          <p className="eyebrow mb-4 !text-accent-violet-deep">Why hybrid, here</p>
          <h2 className="max-w-3xl text-[32px] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[44px]">
            Built for the district it{' '}
            <Marker color="#a6f0d8">
              <span>actually serves</span>
            </Marker>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {VALLEY.map((v, i) => {
            const t = TONE[v.tone];
            return (
              <Reveal key={v.title} delay={i * 110}>
                <article className={`block-card ${t.soft} h-full`}>
                  <span
                    className={`inline-flex h-14 w-14 items-center justify-center rounded-[18px] ${t.solid} text-white shadow-sm`}
                  >
                    <v.icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="mt-6 text-[21px] font-extrabold tracking-[-0.02em] text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">{v.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ══ SUBJECTS MARQUEE ═══════════════════════════════════════════ */}
      <section className="overflow-hidden bg-surface py-16 lg:py-20">
        <div className="mx-auto mb-10 max-w-4xl px-5 text-center sm:px-8">
          <Reveal>
            <p className="eyebrow mb-4 !text-accent-sky-deep">The curriculum</p>
            <h2 className="text-[30px] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[40px]">
              Twelve subjects, taught and recorded the same way
            </h2>
          </Reveal>
        </div>

        {/* Two rows sliding, each duplicated so the loop is seamless */}
        {[0, 1].map((row) => (
          <div key={row} className="marquee-mask mt-4 overflow-hidden">
            <div
              className="marquee-track gap-4"
              style={{
                animationDuration: `${row === 0 ? 44 : 58}s`,
                animationDirection: row === 1 ? 'reverse' : 'normal',
              }}
            >
              {[...SUBJECTS, ...SUBJECTS].map((s, i) => {
                const tones = ['coral', 'violet', 'mint', 'amber', 'sky'] as const;
                const t = TONE[tones[i % tones.length]];
                return (
                  <span
                    key={`${row}-${s}-${i}`}
                    className={`shrink-0 rounded-full ${t.soft} px-7 py-4 text-[16px] font-extrabold ${t.text}`}
                  >
                    {s}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* ══ CAPABILITIES BENTO ═════════════════════════════════════════ */}
      <Section>
        <Reveal>
          <p className="eyebrow mb-4 !text-accent-coral-deep">What the portal does</p>
          <h2 className="max-w-3xl text-[32px] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[44px]">
            Everything a hybrid school day needs
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c, i) => {
            const t = TONE[c.tone];
            return (
              <Reveal key={c.title} delay={(i % 3) * 100} className={c.big ? 'md:col-span-2' : ''}>
                <article
                  className={`block-card h-full bg-surface shadow ring-1 ring-rule ${
                    c.big ? 'md:flex md:items-center md:gap-8' : ''
                  }`}
                >
                  <span
                    className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] ${t.solid} text-white shadow-sm`}
                  >
                    <c.icon className="h-6 w-6" aria-hidden />
                  </span>
                  <div className={c.big ? 'mt-6 md:mt-0' : 'mt-6'}>
                    <h3
                      className={`font-extrabold tracking-[-0.02em] text-ink ${
                        c.big ? 'text-[24px]' : 'text-[19px]'
                      }`}
                    >
                      {c.title}
                    </h3>
                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">{c.body}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ══ HOW IT RUNS ════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-surface">
        <Blob className="-right-24 top-20 h-96 w-96 blur-2xl" color="#eeeafe" opacity={0.9} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-24">
          <Reveal>
            <ClassroomScene className="h-auto w-full" />
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow mb-4 !text-accent-amber-deep">How it runs</p>
              <h2 className="text-[30px] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[40px]">
                Set up once, then the day takes care of itself
              </h2>
            </Reveal>

            <ol className="mt-10 space-y-7">
              {STEPS.map((s, i) => {
                const t = TONE[s.tone];
                return (
                  <Reveal key={s.n} delay={i * 110}>
                    <li className="flex gap-5">
                      <span
                        className={`num flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] ${t.solid} text-[16px] font-extrabold text-white shadow-sm`}
                      >
                        {s.n}
                      </span>
                      <div className="min-w-0 pt-1.5">
                        <h3 className="text-[18px] font-extrabold tracking-[-0.02em] text-ink">
                          {s.title}
                        </h3>
                        <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{s.body}</p>
                      </div>
                    </li>
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* ══ ROLES ══════════════════════════════════════════════════════ */}
      <Section>
        <Reveal>
          <p className="eyebrow mb-4 !text-accent-mint-deep">Who signs in</p>
          <h2 className="max-w-3xl text-[32px] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[44px]">
            Each role sees its own work, and{' '}
            <Marker color="#ffc9dd">
              <span>only its own</span>
            </Marker>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {AUDIENCES.map((a, i) => {
            const t = TONE[a.tone];
            return (
              <Reveal key={a.role} delay={i * 110}>
                <article className={`block-card ${t.soft} flex h-full flex-col`}>
                  <span
                    className={`inline-flex h-14 w-14 items-center justify-center rounded-[18px] ${t.solid} text-white shadow-sm`}
                  >
                    <a.icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="mt-6 text-[22px] font-extrabold tracking-[-0.02em] text-ink">
                    {a.role}
                  </h3>
                  <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-ink-soft">
                    {a.body}
                  </p>
                  <ul className="mt-6 space-y-2.5 border-t border-ink/10 pt-5">
                    {a.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-[13.5px] font-semibold text-ink-soft">
                        <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${t.solid}`} aria-hidden />
                        {p}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ══ CERTIFICATES ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-accent-violet-deep">
        <Doodle kind="squiggle" className="anim-float absolute left-[5%] top-[20%] h-14 w-14 opacity-35" color="#ffffff" />
        <Doodle kind="star" className="anim-wiggle absolute right-[7%] top-[24%] h-10 w-10 opacity-40" color="#ffd27a" />
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="flex flex-wrap items-center justify-between gap-10">
            <Reveal>
              <div className="max-w-xl">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-[18px] bg-white/15 text-white">
                  <FileBadge className="h-6 w-6" aria-hidden />
                </span>
                <h2 className="mt-6 text-[30px] font-extrabold leading-[1.1] tracking-[-0.03em] text-white sm:text-[40px]">
                  Every certificate can be checked
                </h2>
                <p className="mt-4 text-[16px] leading-relaxed text-white/75">
                  A certificate issued by the portal carries a verification code. An employer, a
                  college or another department can confirm it is genuine — no account needed.
                </p>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <Link
                to="/verify"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-bold text-accent-violet-deep shadow-lg transition-all hover:-translate-y-0.5"
              >
                Verify a certificate
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ CTA ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-paper">
        <Blob className="-left-28 bottom-0 h-80 w-80 blur-2xl" color="#ffe3ee" opacity={0.9} />
        <Blob className="-right-24 top-0 h-80 w-80 blur-2xl" color="#e0f7f0" opacity={0.9} />
        <div className="relative mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 lg:py-28">
          <Reveal>
            <h2 className="text-[34px] font-extrabold leading-[1.06] tracking-[-0.035em] text-ink sm:text-[46px]">
              Ready when you are
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-muted">
              Accounts are issued by your school or the division office. Forgotten your password?
              The sign-in page can send a reset.
            </p>
            <Link
              to="/login"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-brand-700 px-8 py-4 text-[15px] font-bold text-white shadow-pill transition-all hover:-translate-y-0.5 hover:bg-brand-600"
            >
              <LogIn className="h-4 w-4" aria-hidden />
              Sign in to the portal
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
