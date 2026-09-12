import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  ListChecks,
  MonitorPlay,
  Quote,
  Radio,
  ShieldCheck,
  Users,
  Video,
} from 'lucide-react';
import clsx from 'clsx';
import { DIVISION, FIGURES, Section, SectionHeading } from './PublicLayout';
import { CountUp, Reveal } from './motion';
import { ABOUT, FACILITIES, GALLERY, HERO_SLIDES, LANDMARKS, ROLE_PHOTOS } from './media';

/** The four things a visitor most often arrives wanting. */
const QUICK_LINKS = [
  { icon: Video, title: 'Live Classes', body: 'Join today’s broadcast', to: '/login' },
  { icon: CalendarDays, title: 'Timetable', body: 'Periods, subjects, teachers', to: '/login' },
  { icon: ListChecks, title: 'Attendance', body: 'Daily register & alerts', to: '/login' },
  { icon: Award, title: 'Certificates', body: 'Download & verify', to: '/verify' },
];

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

const HOW = [
  {
    icon: Radio,
    n: '01',
    title: 'Taught from the studio',
    body: 'A specialist teacher delivers the lesson once from one of two production studios, with camera, lighting and acoustic treatment.',
  },
  {
    icon: MonitorPlay,
    n: '02',
    title: 'Received on the panel',
    body: 'The session relays simultaneously to every classroom scheduled to receive it. The panel opens the day’s lesson on its own — no learner signs in on a shared screen.',
  },
  {
    icon: ClipboardList,
    n: '03',
    title: 'Recorded in the register',
    body: 'The class teacher marks the roll, the session records for catch-up, and progress, attendance and results land in one place.',
  },
];

const AUDIENCE = [
  {
    key: 'student',
    icon: BookOpen,
    title: 'For Students',
    points: [
      'Today’s lessons with time and teacher',
      'Join the live class from the portal',
      'Assignments, quizzes and results',
      'Your own attendance record',
      'Certificates on completion',
    ],
  },
  {
    key: 'teacher',
    icon: Users,
    title: 'For Teachers',
    points: [
      'Your classes, subjects and timetable',
      'Mark the daily register',
      'Set, collect and grade work',
      'Question bank and examinations',
      'Learner progress at a glance',
    ],
  },
  {
    key: 'parent',
    icon: ShieldCheck,
    title: 'For Parents',
    points: [
      'Your child’s attendance and results',
      'Assignment deadlines and status',
      'Timetable and upcoming classes',
      'Alerts below the 75% requirement',
      'Certificates to view and download',
    ],
  },
] as const;

/** Standing notices. Live announcements sit inside the portal once signed in. */
const NOTICES = [
  {
    tag: 'Admissions',
    date: 'Session ' + DIVISION.session,
    text: 'Enrolment for the current session is handled by your school office. Accounts for the portal are issued once a learner is enrolled.',
  },
  {
    tag: 'Attendance',
    date: 'Standing rule',
    text: 'Guardians are alerted automatically when a learner’s attendance falls below the 75% requirement.',
  },
  {
    tag: 'Certificates',
    date: 'Always open',
    text: 'Certificates issued by the portal carry a verification code and can be checked by anyone, without an account.',
  },
];

export function HomePage() {
  const [slide, setSlide] = useState(0);

  // The hero advances on its own, and stops the moment anyone steers it.
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto) return;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 6500);
    return () => clearInterval(t);
  }, [auto]);

  const go = (n: number) => {
    setAuto(false);
    setSlide((n + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <>
      {/* ══ HERO CAROUSEL ══════════════════════════════════════════════ */}
      <section className="relative h-[520px] overflow-hidden bg-brand-900 sm:h-[600px] lg:h-[660px]">
        {HERO_SLIDES.map((s, i) => (
          <div
            key={s.src}
            className={clsx(
              'absolute inset-0 transition-opacity duration-1000',
              i === slide ? 'opacity-100' : 'pointer-events-none opacity-0',
            )}
            aria-hidden={i !== slide}
          >
            <img
              src={s.src}
              alt={s.alt}
              className="h-full w-full object-cover"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
            {/* A readable ground for the type, whatever the photograph is. */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-900/95 via-brand-900/75 to-brand-900/30" />
          </div>
        ))}

        <div className="relative mx-auto flex h-full max-w-6xl items-center px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-accent-amber">
              {HERO_SLIDES[slide].kicker}
            </p>
            <h1
              key={slide}
              className="reveal is-in mt-5 text-[32px] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-[46px] lg:text-[56px]"
            >
              {HERO_SLIDES[slide].heading}
            </h1>
            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/75 sm:text-[17px]">
              {HERO_SLIDES[slide].sub}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-lg bg-accent-amber px-7 py-3.5 text-[14.5px] font-extrabold text-ink shadow-lg transition-transform hover:-translate-y-0.5"
              >
                Access the Portal
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-7 py-3.5 text-[14.5px] font-bold text-white ring-1 ring-white/25 backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                About the Programme
              </Link>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-7 left-0 right-0">
          <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 sm:px-8">
            <button
              type="button"
              onClick={() => go(slide - 1)}
              aria-label="Previous slide"
              className="rounded-full bg-white/15 p-2 text-white ring-1 ring-white/20 backdrop-blur-sm transition-colors hover:bg-white/25"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => go(slide + 1)}
              aria-label="Next slide"
              className="rounded-full bg-white/15 p-2 text-white ring-1 ring-white/20 backdrop-blur-sm transition-colors hover:bg-white/25"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <div className="ml-2 flex gap-2">
              {HERO_SLIDES.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === slide}
                  className={clsx(
                    'h-1.5 rounded-full transition-all',
                    i === slide ? 'w-8 bg-accent-amber' : 'w-4 bg-white/40 hover:bg-white/70',
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ QUICK LINKS ════════════════════════════════════════════════ */}
      <section className="relative z-10 mx-auto -mt-14 max-w-6xl px-5 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_LINKS.map((q, i) => (
            <Reveal key={q.title} delay={i * 80}>
              <Link
                to={q.to}
                className="group flex h-full items-center gap-4 rounded-xl bg-surface p-5 shadow-md ring-1 ring-rule transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-700 text-white transition-colors group-hover:bg-accent-coral-deep">
                  <q.icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-[15px] font-extrabold text-ink">{q.title}</span>
                  <span className="block text-[12.5px] text-muted">{q.body}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ WELCOME ════════════════════════════════════════════════════ */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <img
                src={ABOUT.welcome.src}
                alt={ABOUT.welcome.alt}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg"
              />
              {/* A small second frame, the way a school site layers two. */}
              <img
                src={ABOUT.valley.src}
                alt={ABOUT.valley.alt}
                loading="lazy"
                className="absolute -bottom-8 -right-4 hidden aspect-square w-40 rounded-2xl object-cover shadow-xl ring-4 ring-paper sm:block lg:w-48"
              />
              <div className="absolute -left-4 -top-4 rounded-xl bg-accent-amber px-5 py-3 shadow-lg">
                <span className="num block text-[26px] font-extrabold leading-none text-ink">
                  <CountUp value="21" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink/70">
                  School sites
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <SectionHeading
              kicker="Welcome"
              title="Learning that reaches every school in the valley"
              align="left"
            />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted">
              <p>
{DIVISION.programme} is a government school initiative in {DIVISION.district},
                run by the {DIVISION.division}. It began with a simple observation: a specialist
                teacher cannot stand in twenty-one classrooms at nine in the morning — but the
                lesson can.
              </p>
              <p>
                Two broadcast studios carry lessons to 42 interactive panels installed in
                classrooms across the district. Behind them sits a single portal that holds the
                timetable, the daily register, assignments, examinations and certificates for
                every school in the programme.
              </p>
            </div>

            <div className="mt-8 flex items-start gap-4 rounded-xl border-l-4 border-accent-coral bg-accent-coral-soft p-5">
              <Quote className="h-6 w-6 shrink-0 text-accent-coral-deep" aria-hidden />
              <p className="text-[14.5px] font-semibold italic leading-relaxed text-ink">
                A class that could not staff a subject alone no longer goes without it.
              </p>
            </div>

            <Link
              to="/about"
              className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-700 px-6 py-3 text-[14px] font-bold text-white shadow-pill transition-all hover:-translate-y-0.5 hover:bg-brand-600"
            >
              Read more about us
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* ══ FIGURES ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-brand-800">
        <img
          src={ABOUT.campus.src}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.12]"
        />
        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {FIGURES.map((f, i) => (
              <Reveal key={f.label} delay={i * 90}>
                <div className="text-center">
                  <dd className="num text-[44px] font-extrabold leading-none text-accent-amber sm:text-[52px]">
                    <CountUp value={f.value} />
                  </dd>
                  <dt className="mt-3 text-[12.5px] font-bold uppercase tracking-[0.12em] text-white/65">
                    {f.label}
                  </dt>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* ══ HOW IT WORKS ═══════════════════════════════════════════════ */}
      <Section className="bg-surface">
        <SectionHeading
          kicker="How a lesson reaches you"
          title="One lesson, taught once, received everywhere"
          description="Two studios feed forty-two classrooms. That ratio shapes everything about how the programme runs."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {HOW.map((h, i) => (
            <Reveal key={h.n} delay={i * 120}>
              <article className="relative h-full rounded-2xl bg-paper p-7 text-center">
                <span className="num absolute right-5 top-4 text-[40px] font-extrabold leading-none text-brand-100">
                  {h.n}
                </span>
                <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-pill">
                  <h.icon className="h-7 w-7" aria-hidden />
                </span>
                <h3 className="relative mt-6 text-[19px] font-extrabold tracking-[-0.02em] text-ink">
                  {h.title}
                </h3>
                <p className="relative mt-3 text-[14px] leading-relaxed text-muted">{h.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ══ FACILITIES ═════════════════════════════════════════════════ */}
      <Section>
        <SectionHeading
          kicker="Infrastructure"
          title="What has been installed"
          description="Equipment funded under the programme and deployed across the district's classrooms."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FACILITIES.slice(0, 3).map((f, i) => (
            <Reveal key={f.title} delay={i * 110}>
              <article className="group h-full overflow-hidden rounded-2xl bg-surface shadow ring-1 ring-rule transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={f.src}
                    alt={f.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="num absolute left-4 top-4 rounded-lg bg-accent-amber px-3 py-1.5 text-[15px] font-extrabold text-ink shadow">
                    {f.count}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-[18px] font-extrabold tracking-[-0.02em] text-ink">
                    {f.title}
                  </h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{f.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/facilities"
            className="group inline-flex items-center gap-2 rounded-lg bg-brand-700 px-6 py-3 text-[14px] font-bold text-white shadow-pill transition-all hover:-translate-y-0.5 hover:bg-brand-600"
          >
            See all facilities
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </Section>

      {/* ══ SUBJECTS ═══════════════════════════════════════════════════ */}
      <Section className="bg-surface">
        <SectionHeading
          kicker="Academics"
          title="Twelve subjects across the curriculum"
          description="Every subject a class studies is taught, timetabled and recorded the same way."
        />
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {SUBJECTS.map((s, i) => (
            <Reveal key={s} delay={Math.min(i * 45, 400)}>
              <span className="inline-block rounded-lg bg-paper px-5 py-3 text-[14px] font-bold text-ink-soft ring-1 ring-rule transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:text-white hover:ring-brand-700">
                {s}
              </span>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/academics"
            className="group inline-flex items-center gap-2 text-[14px] font-extrabold text-brand-700 transition-colors hover:text-accent-coral-deep"
          >
            Explore academics
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </Section>

      {/* ══ FOR STUDENTS / TEACHERS / PARENTS ══════════════════════════ */}
      <Section>
        <SectionHeading
          kicker="Who the portal is for"
          title="Each role sees its own work"
          description="Access is decided on the server — a teacher cannot reach another teacher's register, and a parent sees only their own child."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {AUDIENCE.map((a, i) => (
            <Reveal key={a.key} delay={i * 110}>
              <article className="h-full overflow-hidden rounded-2xl bg-surface shadow ring-1 ring-rule">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={ROLE_PHOTOS[a.key].src}
                    alt={ROLE_PHOTOS[a.key].alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900/85 to-transparent" />
                  <div className="absolute bottom-4 left-5 flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-amber text-ink">
                      <a.icon className="h-4.5 w-4.5" aria-hidden />
                    </span>
                    <h3 className="text-[18px] font-extrabold text-white">{a.title}</h3>
                  </div>
                </div>
                <ul className="space-y-3 p-6">
                  {a.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-[13.5px] text-ink-soft">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-coral" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ══ NOTICES ════════════════════════════════════════════════════ */}
      <Section className="bg-surface">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading kicker="Notice board" title="Information for families" align="left" />
            <p className="mt-6 text-[14.5px] leading-relaxed text-muted">
              Live announcements from your school and the division office appear inside the portal
              once you sign in. The notices here stand all year.
            </p>
            <Link
              to="/login"
              className="group mt-7 inline-flex items-center gap-2 rounded-lg bg-brand-700 px-6 py-3 text-[14px] font-bold text-white shadow-pill transition-all hover:-translate-y-0.5 hover:bg-brand-600"
            >
              Sign in for announcements
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>

          <div className="space-y-4">
            {NOTICES.map((n, i) => (
              <Reveal key={n.tag} delay={i * 100}>
                <article className="flex gap-5 rounded-xl bg-paper p-5 transition-transform hover:-translate-x-1">
                  <div className="shrink-0 rounded-lg bg-brand-700 px-3 py-2 text-center text-white">
                    <span className="block text-[11px] font-extrabold uppercase tracking-[0.08em]">
                      {n.tag}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11.5px] font-bold uppercase tracking-[0.08em] text-faint">
                      {n.date}
                    </p>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">{n.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ══ THE DISTRICT ═══════════════════════════════════════════════ */}
      <Section className="bg-surface">
        <SectionHeading
          kicker="Anantnag District"
          title="The valley these schools sit in"
          description="From the Lidder at Pahalgam up to Amarnath, the district covers ground that makes reaching every classroom in person impossible. That is the problem this programme was built to answer."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LANDMARKS.map((l, i) => (
            <Reveal key={l.name} delay={(i % 3) * 100}>
              <figure className="group relative h-72 overflow-hidden rounded-2xl shadow ring-1 ring-rule">
                <img
                  src={l.src}
                  alt={l.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/92 via-brand-900/35 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-[21px] font-extrabold tracking-[-0.02em] text-white">
                    {l.name}
                  </h3>
                  <span className="mt-2 block h-0.5 w-10 rounded-full bg-accent-amber" />
                  <p className="mt-3 text-[13px] leading-relaxed text-white/75">{l.note}</p>
                  {l.credit && (
                    <p className="mt-2.5 text-[10.5px] text-white/45">
                      Photo: {l.credit.author} · {l.credit.license}
                    </p>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ══ GALLERY STRIP ══════════════════════════════════════════════ */}
      <Section>
        <SectionHeading
          kicker="Gallery"
          title="Life in the classrooms"
          description="Photographs from the programme's classrooms and the district it serves."
        />
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {GALLERY.slice(0, 8).map((g, i) => (
            <Reveal key={g.src + i} delay={(i % 4) * 80}>
              <div className="group aspect-square overflow-hidden rounded-xl">
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/gallery"
            className="group inline-flex items-center gap-2 rounded-lg bg-brand-700 px-6 py-3 text-[14px] font-bold text-white shadow-pill transition-all hover:-translate-y-0.5 hover:bg-brand-600"
          >
            View full gallery
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </Section>

      {/* ══ CLOSING CTA ════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-brand-900">
        <img
          src={HERO_SLIDES[0].src}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="relative mx-auto max-w-3xl px-5 py-20 text-center sm:px-8">
          <Reveal>
            <h2 className="text-[30px] font-extrabold leading-[1.1] tracking-[-0.03em] text-white sm:text-[40px]">
              Already have an account?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[15.5px] leading-relaxed text-white/70">
              Accounts are issued by your school or the division office. Students, teachers and
              parents all sign in here.
            </p>
            <Link
              to="/login"
              className="mt-9 inline-flex items-center gap-2 rounded-lg bg-accent-amber px-8 py-4 text-[15px] font-extrabold text-ink shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Login to the Portal
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
