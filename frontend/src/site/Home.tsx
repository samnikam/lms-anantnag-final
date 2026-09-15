import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  CalendarDays,
  ChevronRight,
  ExternalLink,
  ListChecks,
  MonitorPlay,
  Quote,
  Video,
} from 'lucide-react';
import clsx from 'clsx';
import { Backdrop, DIVISION, FIGURES, Section, SectionHeading } from './PublicLayout';
import { CountUp, Reveal } from './motion';
import { TONE } from './tone';
import { CirclePhoto, DECOR, DoubleWave, Shape, Wave } from './decor';
import { ABOUT, GALLERY, HERO_SLIDES, ROLE_PHOTOS } from './media';
import {
  FACILITY_CARDS,
  HEAD_MESSAGE,
  HEAD_OF_INSTITUTION,
  INITIATIVES,
  QUICK_INFO,
  WHY_US,
} from './homeContent';

/** The four things a visitor most often arrives wanting. */
const QUICK_LINKS = [
  { icon: Video, title: 'Live Classes', body: 'Join today’s broadcast', to: '/login' },
  { icon: CalendarDays, title: 'Timetable', body: 'Periods, subjects, teachers', to: '/login' },
  { icon: ListChecks, title: 'Attendance', body: 'Daily register & alerts', to: '/login' },
  { icon: Award, title: 'Certificates', body: 'Download & verify', to: '/verify' },
];

/** The strip that reads across under the hero. */
const TICKER = [
  `Admissions for session ${DIVISION.session} are handled by your school office`,
  'Live lessons are recorded and available for catch-up in the portal',
  'Guardians are alerted automatically below 75% attendance',
  'Certificates can be verified by anyone, without an account',
  'The portal is available in English, Hindi, Urdu and Kashmiri',
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
      <section className="relative overflow-hidden bg-brand-900">
        <div className="relative h-[520px] sm:h-[580px] lg:h-[640px]">
          {HERO_SLIDES.map((sl, i) => (
            <div
              key={sl.src}
              className={clsx(
                'absolute inset-0 transition-opacity duration-1000',
                i === slide ? 'opacity-100' : 'pointer-events-none opacity-0',
              )}
              aria-hidden={i !== slide}
            >
              <img
                key={`${sl.src}-${i === slide}`}
                src={sl.src}
                alt={sl.alt}
                className={clsx(
                  'h-full w-full object-cover',
                  sl.focus ?? 'object-center',
                  i === slide && 'ken-burns',
                )}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
              {/* Weighted to the left, and clear of the subject on the right. */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-900/72 via-brand-900/38 via-42% to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-900/35 to-transparent" />
            </div>
          ))}

          <div className="relative mx-auto flex h-full max-w-6xl items-center px-5 pb-16 sm:px-8">
            <div className="max-w-xl" key={slide}>
              <p
                className="over-photo reveal is-in text-[12px] font-extrabold uppercase tracking-[0.18em] text-accent-amber"
                style={{ animationDelay: '80ms' }}
              >
                {HERO_SLIDES[slide].kicker}
              </p>

              {/* Three parts: a quiet line, the word, a quiet line. */}
              <p
                className="over-photo reveal is-in mt-6 text-[20px] font-medium leading-snug text-white sm:text-[24px]"
                style={{ animationDelay: '180ms' }}
              >
                {HERO_SLIDES[slide].lead}
              </p>
              <h1
                className="over-photo reveal is-in mt-1 text-[40px] font-extrabold leading-[1.05] tracking-[0.12em] text-white sm:text-[58px] lg:text-[66px]"
                style={{ animationDelay: '260ms' }}
              >
                {HERO_SLIDES[slide].word}
              </h1>
              <p
                className="over-photo reveal is-in mt-2 max-w-md text-[16px] font-medium leading-snug text-white sm:text-[19px]"
                style={{ animationDelay: '340ms' }}
              >
                {HERO_SLIDES[slide].tail}
              </p>

              <div
                className="reveal is-in mt-9 flex flex-wrap items-center gap-3"
                style={{ animationDelay: '440ms' }}
              >
                <Link
                  to="/login"
                  className="btn-sheen group inline-flex items-center gap-2 rounded-lg bg-brand-700 px-7 py-3.5 text-[14px] font-extrabold uppercase tracking-[0.06em] text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-brand-600"
                >
                  Access the Portal
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-900/70 px-7 py-3.5 text-[14px] font-bold text-white ring-1 ring-white/30 backdrop-blur-md transition-colors hover:bg-brand-900/85"
                >
                  About the Programme
                </Link>
              </div>
            </div>
          </div>

          {/* The single control sits on the edge, as the reference's does. */}
          <button
            type="button"
            onClick={() => go(slide + 1)}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-700 shadow-lg transition-transform hover:scale-110 sm:flex lg:right-8"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <DoubleWave
            className="pointer-events-none absolute inset-x-0 bottom-0 h-14 w-full sm:h-20"
            fill="#e8f2fb"
            behind="#ffffff"
          />
        </div>

        {/* The pale strip the wave lands on, carrying the two first steps. */}
        <div className="bg-accent-sky-soft">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-12 gap-y-3 px-5 py-5 sm:px-8">
            {[
              { to: '/about', label: 'New to the Programme' },
              { to: '/login', label: 'Sign in to the Portal' },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="group inline-flex items-center gap-2 text-[15px] font-bold text-brand-700 transition-colors hover:text-accent-sky-deep"
              >
                {l.label}
                <ChevronRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            ))}
          </div>
        </div>

        {/* The dots stay, so all three frames are still reachable. */}
        <div className="bg-accent-sky-soft pb-4">
          <div className="mx-auto flex max-w-6xl justify-center gap-2 px-5 sm:px-8">
            {HERO_SLIDES.map((sl, i) => (
              <button
                key={sl.src}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === slide}
                className={clsx(
                  'h-1.5 rounded-full transition-all',
                  i === slide ? 'w-8 bg-brand-700' : 'w-4 bg-brand-200 hover:bg-brand-400',
                )}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══ QUICK LINKS ════════════════════════════════════════════════ */}
      <section className="mx-auto mt-6 max-w-6xl px-5 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_LINKS.map((q, i) => (
            <Reveal key={q.title} delay={i * 80}>
              <Link
                to={q.to}
                className="lift-card group flex h-full items-center gap-4 rounded-xl bg-surface p-5 shadow-md ring-1 ring-rule hover:shadow-xl"
              >
                <span className="icon-pop flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-pill">
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

      {/* ══ NOTICE TICKER ══════════════════════════════════════════════ */}
      <div className="mt-6 border-y border-brand-800 bg-brand-700">
        <div className="mx-auto flex max-w-6xl items-stretch">
          <span className="flex shrink-0 items-center gap-2 bg-accent-amber px-5 py-3 text-[12px] font-extrabold uppercase tracking-[0.1em] text-ink">
            <span className="pulse-ring h-2 w-2 rounded-full bg-accent-coral-deep" aria-hidden />
            Notices
          </span>
          {/* Duplicated so the loop meets itself; hovering pauses it. */}
          <div className="relative flex-1 overflow-hidden">
            <div className="ticker-track items-center">
              {[...TICKER, ...TICKER].map((t, i) => (
                <span
                  key={i}
                  className="flex shrink-0 items-center gap-3 px-7 py-3 text-[13.5px] text-white/85"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-amber" aria-hidden />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══ QUICK INFORMATION ══════════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-5 pt-8 sm:px-8">
        <Reveal>
          <div className="grid overflow-hidden rounded-2xl bg-surface shadow-md ring-1 ring-rule sm:grid-cols-2 lg:grid-cols-4">
            {QUICK_INFO.map((q, i) => {
              const t = TONE[q.tone];
              return (
                <div
                  key={q.title}
                  className="group relative p-7 transition-colors hover:bg-paper sm:[&:not(:nth-child(2n))]:border-r lg:[&:not(:last-child)]:border-r [&:not(:last-child)]:border-b sm:[&:nth-last-child(-n+2)]:border-b-0 lg:[&:not(:last-child)]:border-b-0 border-rule"
                >
                  {/* The colour belongs to the column, not to a card. */}
                  <span
                    className={`absolute inset-x-0 top-0 h-1 ${t.solid} origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100`}
                    aria-hidden
                  />
                  <span className={`icon-pop inline-flex h-11 w-11 items-center justify-center rounded-xl ${t.soft} ${t.text}`}>
                    <q.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-[16px] font-extrabold tracking-[-0.02em] text-ink">
                    {q.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">{q.body}</p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* ══ WELCOME ════════════════════════════════════════════════════ */}
      <Section className="relative overflow-hidden">
        <Backdrop variant="warm" />
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal variant="left">
            <div className="group relative">
              <CirclePhoto src={ABOUT.welcome.src} alt={ABOUT.welcome.alt} />
              <div className="absolute bottom-2 right-0 rounded-xl bg-accent-amber px-5 py-3 shadow-lg">
                <span className="num block text-[26px] font-extrabold leading-none text-ink">
                  <CountUp value="21" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink/70">
                  School sites
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal variant="right" delay={120}>
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

      {/* ══ MESSAGE FROM THE HEAD OF INSTITUTION ═══════════════════════ */}
      <Section className="bg-surface">
        <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr]">
          <Reveal variant="left">
            <img
              src={ROLE_PHOTOS.teacher.src}
              alt={ROLE_PHOTOS.teacher.alt}
              loading="lazy"
              className="mx-auto aspect-square w-48 rounded-2xl object-cover object-[center_28%] shadow-lg lg:w-60"
            />
          </Reveal>

          <Reveal variant="right" delay={120}>
            <SectionHeading
              kicker="Message from the Head of Institution"
              title="Learning that builds the whole person"
              align="left"
            />
            <Quote className="mt-7 h-8 w-8 text-accent-amber" aria-hidden />
            <blockquote className="mt-4 text-[17px] font-medium italic leading-relaxed text-ink-soft sm:text-[19px]">
              {HEAD_MESSAGE}
            </blockquote>
            <div className="mt-7 border-l-4 border-accent-coral pl-5">
              <p className="text-[15px] font-extrabold text-ink">{HEAD_OF_INSTITUTION.name}</p>
              <p className="text-[12.5px] font-semibold uppercase tracking-[0.08em] text-muted">
                {HEAD_OF_INSTITUTION.role}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ══ FIGURES ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-accent-sky-soft">
        <Wave className="block h-12 w-full rotate-180 sm:h-16" fill="#ffffff" />
        <Shape
          kind="triangle"
          className="absolute left-[6%] top-[28%] hidden h-10 w-10 opacity-70 lg:block"
          color={DECOR.green}
        />
        <Shape
          kind="waves"
          className="absolute right-[5%] top-[30%] hidden h-14 w-14 opacity-60 lg:block"
          color={DECOR.blue}
        />
        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {FIGURES.map((f, i) => (
              <Reveal key={f.label} delay={i * 90}>
                <div className="group rounded-2xl px-4 py-6 text-center transition-colors hover:bg-white/60">
                  <dd className="num text-[46px] font-extrabold leading-none text-brand-700 sm:text-[56px]">
                    <CountUp value={f.value} />
                  </dd>
                  <span className="mx-auto mt-3 block h-0.5 w-8 rounded-full bg-brand-200 transition-all duration-300 group-hover:w-14 group-hover:bg-accent-mint" />
                  <dt className="mt-3 text-[12.5px] font-bold uppercase tracking-[0.12em] text-brand-600">
                    {f.label}
                  </dt>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
        <Wave className="block h-12 w-full sm:h-16" fill="#f7fafd" />
      </section>

      {/* ══ WHY CHOOSE US ══════════════════════════════════════════════ */}
      <Section className="relative overflow-hidden">
        <Backdrop variant="cool" grid />
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal variant="left">
              <SectionHeading
                kicker="Why choose our schools"
                title="What a government school here offers"
                align="left"
              />
              <p className="mt-5 text-[15px] leading-relaxed text-muted">
                Six things the district commits to for every learner it enrols.
              </p>
              <img
                src={ABOUT.smartClassroom.src}
                alt={ABOUT.smartClassroom.alt}
                loading="lazy"
                className="mt-9 hidden aspect-[4/3] w-full rounded-2xl object-cover shadow-xl ring-1 ring-rule lg:block"
              />
            </Reveal>
          </div>

          {/* A single rail down the list, rather than six separate cards. */}
          <ol className="relative space-y-1 border-l-2 border-rule pl-8">
            {WHY_US.map((w, i) => (
              <Reveal key={w.title} variant="right" delay={i * 70} as="li">
                <li className="group relative py-5">
                  <span
                    className="absolute -left-[41px] top-6 flex h-6 w-6 items-center justify-center rounded-full bg-surface ring-2 ring-rule transition-all duration-300 group-hover:scale-125 group-hover:bg-brand-700 group-hover:ring-brand-700"
                    aria-hidden
                  >
                    <span className="h-2 w-2 rounded-full bg-brand-300 transition-colors group-hover:bg-white" />
                  </span>
                  <div className="flex items-start gap-4">
                    <span className="icon-pop mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-tint-brand text-brand-600 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                      <w.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[17px] font-extrabold tracking-[-0.02em] text-ink">
                        {w.title}
                      </h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{w.body}</p>
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* ══ DIGITAL & HYBRID LEARNING ══════════════════════════════════ */}
      <section className="relative overflow-hidden bg-accent-mint-deep">
        <img
          src={GALLERY[5].src}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.13]"
        />
        <Wave
          className="relative block h-12 w-full rotate-180 sm:h-16"
          fill="#ffffff"
        />
        <Shape
          kind="dots"
          className="absolute left-[7%] top-[34%] hidden h-16 w-16 opacity-25 lg:block"
          color="#ffffff"
        />
        <div className="relative mx-auto max-w-5xl px-5 pb-20 pt-10 text-center sm:px-8">
          <Reveal>
            <span className="float-y inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-amber text-ink shadow-lg">
              <MonitorPlay className="h-7 w-7" aria-hidden />
            </span>
            <h2 className="mt-7 text-[28px] font-extrabold leading-[1.12] tracking-[-0.03em] text-white sm:text-[38px]">
              Learning beyond the classroom
            </h2>
            <span className="mx-auto mt-5 block h-1 w-16 rounded-full bg-accent-amber" />
            <p className="mx-auto mt-6 max-w-2xl text-[15.5px] leading-relaxed text-white/90">
              Our schools are embracing digital and hybrid learning, giving students access to
              interactive lessons, digital resources, live sessions and recorded educational
              content. Technology complements the teacher in the room and helps learning continue
              beyond the traditional classroom.
            </p>
            <Link
              to="/login"
              className="btn-sheen mt-9 inline-flex items-center gap-2 rounded-lg bg-accent-amber px-8 py-4 text-[15px] font-extrabold text-ink shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Access Learning Portal
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
        <Wave className="relative block h-12 w-full sm:h-16" fill="#f7fafd" />
      </section>

      {/* ══ FACILITIES — colour-blocked tiles, deliberately unequal ════ */}
      <Section className="relative overflow-hidden">
        <Backdrop variant="warm" />
        <SectionHeading
          kicker="Infrastructure"
          title="What has been installed"
          description="Equipment funded under the programme and deployed across the district's classrooms."
        />

        {/* The first tile is tall, the fourth wide; the rest fill around them. */}
        <div className="mt-14 grid auto-rows-[188px] grid-cols-2 gap-4 lg:grid-cols-4">
          {FACILITY_CARDS.map((f, i) => {
            const t = TONE[f.tone];
            const shape =
              i === 0 ? 'row-span-2' : i === 3 ? 'lg:col-span-2' : i === 5 ? 'col-span-2 lg:col-span-1' : '';
            return (
              <Reveal key={f.title} variant="zoom" delay={(i % 4) * 90} className={shape}>
                <article
                  className={`group flex h-full flex-col justify-end overflow-hidden rounded-2xl ${t.soft} p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
                >
                  <span
                    className={`icon-pop mb-auto inline-flex h-12 w-12 items-center justify-center rounded-xl ${t.solid} ${t.on} shadow-sm`}
                  >
                    <f.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-[17px] font-extrabold tracking-[-0.02em] text-ink">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{f.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/facilities"
            className="btn-sheen group inline-flex items-center gap-2 rounded-lg bg-brand-700 px-6 py-3 text-[14px] font-bold text-white shadow-pill transition-all hover:-translate-y-0.5 hover:bg-brand-600"
          >
            See all facilities
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </Section>

      {/* ══ GOVERNMENT INITIATIVES — light, on pale blue ═══════════════ */}
      <section className="relative overflow-hidden bg-accent-sky-soft">
        <Wave className="block h-12 w-full rotate-180 sm:h-16" fill="#f7fafd" />
        <Shape
          kind="triangle"
          className="absolute left-[5%] top-[24%] hidden h-11 w-11 opacity-50 lg:block"
          color={DECOR.green}
        />
        <Shape
          kind="dots"
          className="absolute right-[5%] top-[20%] hidden h-16 w-16 opacity-40 lg:block"
          color={DECOR.blue}
        />
        <Shape
          kind="waves"
          className="absolute bottom-[14%] left-[8%] hidden h-14 w-14 opacity-40 lg:block"
          color={DECOR.blue}
        />

        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-8 sm:px-8">
          <SectionHeading
            kicker="Government initiatives"
            title="Schemes supporting our students"
            description="National and Union Territory programmes that government schools in the district come under."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INITIATIVES.map((g, i) => {
              const tones = ['coral', 'mint', 'sky', 'amber', 'violet', 'coral'] as const;
              const t = TONE[tones[i]];
              return (
                <Reveal key={g.title} variant="zoom" delay={(i % 3) * 100}>
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-surface p-7 shadow-md ring-1 ring-rule transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    {/* A band of the card's colour along the top, and a large
                        numeral faded into the corner. */}
                    <span className={`absolute inset-x-0 top-0 h-1.5 ${t.solid}`} aria-hidden />
                    <span
                      className={`num absolute -right-2 -top-3 text-[88px] font-extrabold leading-none opacity-[0.07] ${t.text}`}
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <span
                      className={`icon-pop relative inline-flex h-14 w-14 items-center justify-center rounded-2xl ${t.soft} ${t.text}`}
                    >
                      <g.icon className="h-6 w-6" aria-hidden />
                    </span>
                    <h3 className="relative mt-6 text-[19px] font-extrabold tracking-[-0.02em] text-ink">
                      {g.title}
                    </h3>
                    <span className={`relative mt-3 block h-1 w-10 rounded-full ${t.solid}`} aria-hidden />
                    <p className="relative mt-4 flex-1 text-[14px] leading-relaxed text-muted">{g.body}</p>

                    {'href' in g && g.href ? (
                      <a
                        href={g.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className={`relative mt-6 inline-flex w-fit items-center gap-2 rounded-lg ${t.soft} px-4 py-2.5 text-[13px] font-bold ${t.text} transition-all group-hover:gap-3`}
                      >
                        Official information
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                      </a>
                    ) : (
                      <span className="relative mt-6 inline-flex w-fit items-center rounded-lg bg-slate-100 px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.08em] text-muted">
                        Through your school
                      </span>
                    )}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

    </>
  );
}
