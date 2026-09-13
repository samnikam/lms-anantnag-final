import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Eye,
  Quote,
  Radio,
  ShieldCheck,
  Snowflake,
  Target,
  Wifi,
} from 'lucide-react';
import { CountUp, Reveal } from './motion';
import { TONE } from './tone';
import { ABOUT, DISTRICT, HERO_SLIDES } from './media';
import {
  AT_A_GLANCE,
  HEAD_MESSAGE,
  HEAD_OF_INSTITUTION,
  MISSION,
  STAFF_NOTE,
  STAFF_POINTS,
  VALUES,
  VISION,
} from './aboutContent';
import {
  Backdrop,
  DIVISION,
  FIGURES,
  PageBanner,
  Section,
  SectionHeading,
} from './PublicLayout';

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
        subtitle={`A government school programme of the ${DIVISION.department}, run across ${DIVISION.district} by the ${DIVISION.division}.`}
        image={DISTRICT.amarnathApproach.src}
        imageAlt={DISTRICT.amarnathApproach.alt}
      />

      {/* ══ OUR VISION — a single statement, given the whole width ═════ */}
      <section className="relative overflow-hidden bg-brand-800">
        <span aria-hidden className="orb -left-24 -top-28 h-96 w-96 bg-accent-violet/25" />
        <span
          aria-hidden
          className="orb -bottom-24 -right-20 h-80 w-80 bg-accent-coral/20"
          style={{ animationDelay: '-8s' }}
        />
        <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 lg:py-24">
          <Reveal>
            <span className="float-y inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-amber text-ink shadow-lg">
              <Eye className="h-7 w-7" aria-hidden />
            </span>
            <p className="mt-7 text-[12px] font-extrabold uppercase tracking-[0.18em] text-accent-amber">
              Our Vision
            </p>
            <blockquote className="mt-6 text-[21px] font-semibold leading-[1.45] tracking-[-0.015em] text-white sm:text-[27px]">
              {VISION}
            </blockquote>
            <span className="rule-grow is-in mx-auto mt-8 block h-1 w-20 rounded-full bg-gradient-to-r from-accent-amber to-accent-coral" />
          </Reveal>
        </div>
      </section>

      {/* ══ OUR MISSION — a numbered rail, not a grid ══════════════════ */}
      <Section className="relative overflow-hidden">
        <Backdrop variant="warm" grid />
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal variant="left">
              <SectionHeading kicker="Our Mission" title="What we set out to do" align="left" />
              <p className="mt-5 text-[15px] leading-relaxed text-muted">
                Seven commitments that shape how the schools in this programme are run.
              </p>
              <img
                src={ABOUT.welcome.src}
                alt={ABOUT.welcome.alt}
                loading="lazy"
                className="mt-9 hidden aspect-[4/3] w-full rounded-2xl object-cover shadow-xl ring-1 ring-rule lg:block"
              />
            </Reveal>
          </div>

          <ol className="relative space-y-1 border-l-2 border-rule pl-8">
            {MISSION.map((m, i) => (
              <Reveal key={m.text} variant="right" delay={i * 60} as="li">
                <li className="group relative flex items-center gap-4 py-4">
                  <span
                    className="num absolute -left-[45px] flex h-8 w-8 items-center justify-center rounded-full bg-surface text-[11px] font-extrabold text-brand-400 ring-2 ring-rule transition-all duration-300 group-hover:bg-brand-700 group-hover:text-white group-hover:ring-brand-700"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="icon-pop inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-tint-brand text-brand-600 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                    <m.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <p className="text-[16px] font-bold text-ink">{m.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* ══ OUR VALUES — badges rather than cards ══════════════════════ */}
      <Section className="relative overflow-hidden bg-surface">
        <Backdrop variant="mint" />
        <SectionHeading
          kicker="Our Values"
          title="What we hold our schools to"
          description="Seven principles that sit behind every decision the programme takes."
        />

        <div className="mt-14 flex flex-wrap justify-center gap-4">
          {VALUES.map((v, i) => {
            const t = TONE[v.tone];
            return (
              <Reveal key={v.name} variant="zoom" delay={Math.min(i * 70, 400)}>
                <div
                  className={`group flex items-center gap-3.5 rounded-full ${t.soft} py-3 pl-3 pr-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg`}
                >
                  <span
                    className={`icon-pop inline-flex h-11 w-11 items-center justify-center rounded-full ${t.solid} ${t.on} shadow-sm`}
                  >
                    <v.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className={`text-[16px] font-extrabold ${t.text}`}>{v.name}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ══ HEAD OF INSTITUTION'S MESSAGE ══════════════════════════════ */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-[auto_1fr]">
          <Reveal variant="left">
            <div className="relative mx-auto w-52 lg:w-64">
              <img
                src={DISTRICT.pahalgamMeadow.src}
                alt={DISTRICT.pahalgamMeadow.alt}
                loading="lazy"
                className="aspect-square w-full rounded-2xl object-cover shadow-xl ring-1 ring-rule"
              />
              <span
                className="absolute -bottom-4 -right-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-amber text-ink shadow-lg"
                aria-hidden
              >
                <Quote className="h-6 w-6" />
              </span>
            </div>
          </Reveal>

          <Reveal variant="right" delay={120}>
            <SectionHeading
              kicker="Message from the Head of Institution"
              title="Learning that builds the whole person"
              align="left"
            />
            <blockquote className="mt-7 text-[18px] font-medium italic leading-relaxed text-ink-soft sm:text-[20px]">
              {HEAD_MESSAGE}
            </blockquote>
            <div className="mt-8 border-l-4 border-accent-coral pl-5">
              <p className="text-[15px] font-extrabold text-ink">{HEAD_OF_INSTITUTION.name}</p>
              <p className="text-[12.5px] font-semibold uppercase tracking-[0.08em] text-muted">
                {HEAD_OF_INSTITUTION.role}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ══ TEACHERS & STAFF ═══════════════════════════════════════════ */}
      <Section className="relative overflow-hidden bg-surface">
        <Backdrop variant="cool" />
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal variant="left">
            <SectionHeading kicker="Teachers & Staff" title="Teaching staff" align="left" />
            <p className="mt-6 text-[15.5px] leading-relaxed text-muted">{STAFF_NOTE}</p>
            <p className="mt-5 rounded-xl bg-accent-amber-soft p-5 text-[13.5px] leading-relaxed text-ink-soft">
              Individual names, photographs and contact details are not published on this site.
              Each school provides them to its own families directly.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {STAFF_POINTS.map((p, i) => (
              <Reveal key={p.title} variant="zoom" delay={(i % 2) * 100}>
                <article className="lift-card group h-full rounded-2xl bg-paper p-6 ring-1 ring-rule hover:shadow-xl">
                  <span className="icon-pop inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-pill">
                    <p.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-[16px] font-extrabold tracking-[-0.02em] text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">{p.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ══ SCHOOL AT A GLANCE — a ruled record, not boxes ═════════════ */}
      <Section>
        <SectionHeading
          kicker="School at a glance"
          title="The programme in summary"
          description="The essential facts about the schools this programme serves."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal variant="left">
            <dl className="divide-y divide-rule border-y border-rule">
              {AT_A_GLANCE.map((r) => (
                <div key={r.label} className="group flex items-center gap-5 py-5">
                  <span className="icon-pop inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-tint-brand text-brand-600">
                    <r.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <dt className="w-32 shrink-0 text-[12px] font-bold uppercase tracking-[0.1em] text-faint">
                    {r.label}
                  </dt>
                  <dd
                    className={
                      r.pending
                        ? 'text-[14.5px] font-medium italic text-faint'
                        : 'text-[15px] font-bold text-ink'
                    }
                  >
                    {r.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal variant="right" delay={120}>
            <div className="grid grid-cols-2 gap-4">
              {FIGURES.map((f, i) => {
                const tones = ['coral', 'violet', 'mint', 'amber'] as const;
                const t = TONE[tones[i]];
                return (
                  <div
                    key={f.label}
                    className={`flex flex-col justify-center rounded-2xl ${t.soft} p-6 text-center transition-transform duration-300 hover:-translate-y-1.5`}
                  >
                    <span className={`num text-[34px] font-extrabold leading-none ${t.text}`}>
                      <CountUp value={f.value} />
                    </span>
                    <span className="mt-2.5 text-[11.5px] font-bold uppercase tracking-[0.1em] text-ink-soft">
                      {f.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ══ ABOUT THE PROGRAMME ════════════════════════════════════════ */}
      <Section className="relative overflow-hidden bg-surface">
        <Backdrop variant="warm" />
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal variant="left">
            <SectionHeading
              kicker="Our Programme"
              title="A classroom that stretches across the district"
              align="left"
            />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted">
              <p>
                {DIVISION.programme} is a programme of the {DIVISION.department}, run across{' '}
                {DIVISION.district} by the {DIVISION.division}. It serves government schools in
                the district — the classrooms furthest from a specialist teacher first.
              </p>
              <p>
                It pairs classroom hardware with a purpose-built learning portal. Two broadcast
                studios carry lessons to interactive panels installed in classrooms at schools
                across the district, while the portal holds everything that follows from those
                lessons — the timetable, the daily register, work set and graded, examinations,
                results and certificates.
              </p>
              <p>
                The structure of the programme follows directly from its hardware: two studios,
                forty-two classroom panels, twenty-one sites. That is a hub-and-spoke
                arrangement, not a set of independent virtual classrooms, and the portal is built
                around it.
              </p>
            </div>
          </Reveal>

          <Reveal variant="right" delay={120}>
            <div className="grid grid-cols-2 gap-4">
              <img
                src={ABOUT.welcome.src}
                alt={ABOUT.welcome.alt}
                loading="lazy"
                className="col-span-2 aspect-[16/10] w-full rounded-2xl object-cover shadow-xl ring-1 ring-rule"
              />
              <figure className="group relative overflow-hidden rounded-2xl shadow ring-1 ring-rule">
                <img
                  src={DISTRICT.amarnathCave.src}
                  alt={DISTRICT.amarnathCave.alt}
                  loading="lazy"
                  className="photo-zoom aspect-square w-full object-cover"
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

      {/* ══ THE NEED ═══════════════════════════════════════════════════ */}
      <Section>
        <SectionHeading
          kicker="The need"
          title="What the division set out to solve"
          description="Three conditions shaped the programme, and all three are particular to a rural mountain district."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {CHALLENGES.map((c, i) => (
            <Reveal key={c.title} variant="zoom" delay={i * 110}>
              <article className="lift-card group h-full rounded-2xl bg-surface p-7 shadow-sm ring-1 ring-rule hover:shadow-xl">
                <span className="icon-pop inline-flex h-14 w-14 items-center justify-center rounded-xl bg-accent-coral-soft text-accent-coral-deep">
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
              <Reveal key={o} variant={i % 2 === 0 ? 'left' : 'right'} delay={(i % 2) * 90}>
                <li className="flex h-full items-start gap-3.5 rounded-xl bg-white/[0.07] p-5 ring-1 ring-white/10 transition-colors hover:bg-white/[0.12]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-amber" aria-hidden />
                  <span className="text-[14.5px] leading-relaxed text-white/80">{o}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ══ OUR APPROACH ═══════════════════════════════════════════════ */}
      <Section className="relative overflow-hidden bg-surface">
        <Backdrop variant="cool" grid />
        <SectionHeading kicker="Our approach" title="How the portal answers it" />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {APPROACH.map((a, i) => (
            <Reveal key={a.title} variant={i % 2 === 0 ? 'left' : 'right'} delay={(i % 2) * 110}>
              <article className="lift-card group flex h-full gap-5 rounded-2xl bg-paper p-7 ring-1 ring-rule hover:shadow-xl">
                <span className="icon-pop inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-pill">
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

        <div className="mt-12 text-center">
          <Link
            to="/contact"
            className="btn-sheen group inline-flex items-center gap-2 rounded-lg bg-brand-700 px-7 py-3.5 text-[14.5px] font-bold text-white shadow-pill transition-all hover:-translate-y-0.5 hover:bg-brand-600"
          >
            Contact the division office
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </Section>
    </>
  );
}
