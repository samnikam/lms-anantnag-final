import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Radio,
  ShieldCheck,
  Snowflake,
  Target,
  Wifi,
} from 'lucide-react';
import { CountUp, Reveal } from './motion';
import { ABOUT, DISTRICT, HERO_SLIDES } from './media';
import { DIVISION, FIGURES, PageBanner, Section, SectionHeading } from './PublicLayout';

const CHALLENGES = [
  {
    icon: Building2,
    title: 'A specialist cannot be everywhere',
    body: 'Subject teachers are scarce and spread thin across a division. A class without one simply went without that subject.',
  },
  {
    icon: Snowflake,
    title: 'Terrain and winter',
    body: 'Schools sit far apart across mountainous ground, and the hardest months to travel are also the months of the academic year that matter most.',
  },
  {
    icon: Wifi,
    title: 'Records in separate books',
    body: 'Attendance in one register, marks in another, the timetable on a noticeboard — no way to see a learner whole, or a school at a glance.',
  },
];

const OBJECTIVES = [
  'Bring a full subject curriculum within reach of every participating school',
  'Let one specialist teacher reach many classrooms in the same period',
  'Keep the timetable, register, results and certificates in a single record',
  'Give each school its own view, and the division office the whole picture',
  'Degrade gracefully on weak rural connections rather than failing outright',
  'Make every issued certificate publicly verifiable',
];

const APPROACH = [
  {
    icon: Radio,
    title: 'Teach once, receive everywhere',
    body: 'Two production studios — camera, lighting, green screen and acoustic treatment — broadcast to 42 interactive panels across the district, so a single lesson serves many classrooms at once.',
  },
  {
    icon: Building2,
    title: 'One record for the division',
    body: 'Timetable, attendance, assignments, examinations, results and certificates are held in one system, scoped so each school sees its own and the office sees all of them.',
  },
  {
    icon: ShieldCheck,
    title: 'Access decided on the server',
    body: 'Every request is checked against the signed-in role and the school it belongs to. A teacher cannot reach another teacher’s register; a parent sees only their own child.',
  },
  {
    icon: Target,
    title: 'Built for the connection available',
    body: 'Sessions record for catch-up, lessons cache on the classroom PC ahead of time, and panels sign in as shared devices rather than needing an account per learner.',
  },
];

export function AboutPage() {
  return (
    <>
      <PageBanner
        title="About Us"
        subtitle={`The ${DIVISION.programme} of the ${DIVISION.department}, delivered through the ${DIVISION.division}.`}
        image={DISTRICT.amarnathApproach.src}
        imageAlt={DISTRICT.amarnathApproach.alt}
      />

      {/* ══ INTRODUCTION ═══════════════════════════════════════════════ */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              kicker="Our Programme"
              title="A classroom that stretches across the district"
              align="left"
            />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted">
              <p>
                The {DIVISION.programme} was commissioned by the {DIVISION.department} under
                procurement {DIVISION.tender}, and is delivered through the {DIVISION.division} in{' '}
                {DIVISION.district}.
              </p>
              <p>
                It pairs classroom hardware with a purpose-built learning management portal. Two
                broadcast studios carry lessons to interactive panels installed in classrooms at
                schools across the district, while the portal holds everything that follows from
                those lessons — the timetable, the daily register, work set and graded,
                examinations, results and certificates.
              </p>
              <p>
                The structure of the programme follows directly from its hardware: two studios,
                forty-two classroom panels, twenty-one sites. That is a hub-and-spoke
                arrangement, not a set of independent virtual classrooms, and the portal is built
                around it.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-4">
              <img
                src={ABOUT.welcome.src}
                alt={ABOUT.welcome.alt}
                loading="lazy"
                className="col-span-2 aspect-[16/10] w-full rounded-2xl object-cover shadow-lg"
              />
              <figure className="relative overflow-hidden rounded-2xl shadow">
                <img
                  src={DISTRICT.amarnathCave.src}
                  alt={DISTRICT.amarnathCave.alt}
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-900/90 to-transparent px-4 pb-3 pt-8">
                  <span className="text-[13px] font-extrabold text-white">Amarnath</span>
                  <span className="block text-[10px] text-white/50">
                    {DISTRICT.amarnathCave.credit!.author} · {DISTRICT.amarnathCave.credit!.license}
                  </span>
                </figcaption>
              </figure>
              <div className="flex flex-col justify-center rounded-2xl bg-accent-amber p-6">
                <span className="num text-[38px] font-extrabold leading-none text-ink">
                  <CountUp value="42" />
                </span>
                <span className="mt-2 text-[12px] font-bold uppercase tracking-[0.1em] text-ink/70">
                  Smart classrooms
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ══ CHALLENGES ═════════════════════════════════════════════════ */}
      <Section className="bg-surface">
        <SectionHeading
          kicker="The need"
          title="What the division set out to solve"
          description="Three conditions shaped the programme, and all three are particular to a rural mountain district."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {CHALLENGES.map((c, i) => (
            <Reveal key={c.title} delay={i * 110}>
              <article className="h-full rounded-2xl border-t-4 border-accent-coral bg-paper p-7">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-accent-coral-soft text-accent-coral-deep">
                  <c.icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 text-[18px] font-extrabold tracking-[-0.02em] text-ink">
                  {c.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">{c.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ══ OBJECTIVES ═════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-brand-800">
        <img
          src={HERO_SLIDES[1].src}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.13]"
        />
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <SectionHeading
            kicker="Objectives"
            title="What the programme is meant to achieve"
            align="left"
            light
          />
          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {OBJECTIVES.map((o, i) => (
              <Reveal key={o} delay={(i % 2) * 90}>
                <li className="flex h-full items-start gap-3.5 rounded-xl bg-white/[0.07] p-5 ring-1 ring-white/10">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-amber" aria-hidden />
                  <span className="text-[14.5px] leading-relaxed text-white/80">{o}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ══ APPROACH ═══════════════════════════════════════════════════ */}
      <Section>
        <SectionHeading kicker="Our approach" title="How the portal answers it" />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {APPROACH.map((a, i) => (
            <Reveal key={a.title} delay={(i % 2) * 110}>
              <article className="flex h-full gap-5 rounded-2xl bg-surface p-7 shadow ring-1 ring-rule transition-all hover:-translate-y-1 hover:shadow-lg">
                <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-700 text-white shadow-pill">
                  <a.icon className="h-6 w-6" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[18px] font-extrabold tracking-[-0.02em] text-ink">
                    {a.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-muted">{a.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ══ AT A GLANCE ════════════════════════════════════════════════ */}
      <Section className="bg-surface">
        <SectionHeading kicker="At a glance" title="Programme details" />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <dl className="overflow-hidden rounded-2xl ring-1 ring-rule">
              {[
                ['Department', DIVISION.department],
                ['Division', DIVISION.division],
                ['District', DIVISION.district],
                ['Programme', DIVISION.programme],
                ['Procurement reference', DIVISION.tender],
                ['Academic session', DIVISION.session],
              ].map(([k, v], i) => (
                <div
                  key={k}
                  className={`flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-baseline sm:gap-6 ${
                    i % 2 === 0 ? 'bg-paper' : 'bg-surface'
                  }`}
                >
                  <dt className="w-52 shrink-0 text-[11.5px] font-bold uppercase tracking-[0.08em] text-faint">
                    {k}
                  </dt>
                  <dd className="text-[14.5px] font-bold text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid h-full grid-cols-2 gap-4">
              {FIGURES.map((f) => (
                <div
                  key={f.label}
                  className="flex flex-col justify-center rounded-2xl bg-paper p-6 text-center ring-1 ring-rule"
                >
                  <span className="num text-[34px] font-extrabold leading-none text-brand-700">
                    <CountUp value={f.value} />
                  </span>
                  <span className="mt-2.5 text-[11.5px] font-bold uppercase tracking-[0.1em] text-muted">
                    {f.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-lg bg-brand-700 px-7 py-3.5 text-[14.5px] font-bold text-white shadow-pill transition-all hover:-translate-y-0.5 hover:bg-brand-600"
          >
            Contact the division office
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </Section>
    </>
  );
}
