import { useEffect, useState } from 'react';
import { CheckCircle2, Eye } from 'lucide-react';
import clsx from 'clsx';
import { Reveal } from './motion';
import { DECOR, Shape, Wave } from './decor';
import { TONE } from './tone';
import { ABOUT, DISTRICT, HERO_SLIDES } from './media';
import {
  MISSION,
  STAFF_CAPTION,
  STAFF_NOTE,
  STAFF_POINTS,
  VALUES,
  VISION,
} from './aboutContent';
import { Backdrop, PageBanner, Section, SectionHeading } from './PublicLayout';

const OBJECTIVES = [
  'Bring a full subject curriculum within reach of every participating school',
  'Let one specialist teacher reach many classrooms in the same period',
  'Keep the timetable, register, results and certificates in a single record',
  'Give each school its own view, and the division office the whole picture',
  'Degrade gracefully on weak rural connections rather than failing outright',
  'Make every issued certificate publicly verifiable',
];

export function AboutPage() {
  // The staff panel walks through the roles until the visitor picks one.
  const [staff, setStaff] = useState(0);
  const [staffAuto, setStaffAuto] = useState(true);
  useEffect(() => {
    if (!staffAuto) return;
    const t = setInterval(() => setStaff((n) => (n + 1) % STAFF_POINTS.length), 4500);
    return () => clearInterval(t);
  }, [staffAuto]);

  return (
    <>
      <PageBanner
        title="About Us"
        subtitle="Government schools across Anantnag, committed to inclusive, quality education — and to every student who walks through the gate."
        image={DISTRICT.amarnathApproach.src}
        imageAlt={DISTRICT.amarnathApproach.alt}
      />

      {/* ══ OUR VISION — a single statement, given the whole width ═════ */}
      <section className="relative overflow-hidden bg-accent-sky-soft">
        <Wave className="block h-12 w-full rotate-180 sm:h-16" fill="#ffffff" />
        <Shape
          kind="triangle"
          className="absolute left-[7%] top-[34%] hidden h-11 w-11 opacity-60 lg:block"
          color={DECOR.green}
        />
        <Shape
          kind="waves"
          className="absolute right-[6%] top-[30%] hidden h-16 w-16 opacity-50 lg:block"
          color={DECOR.blue}
        />
        <div className="relative mx-auto max-w-4xl px-5 pb-16 pt-8 text-center sm:px-8">
          <Reveal>
            <span className="float-y inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-amber text-ink shadow-lg">
              <Eye className="h-7 w-7" aria-hidden />
            </span>
            <p className="mt-7 text-[12px] font-extrabold uppercase tracking-[0.18em] text-accent-sky-deep">
              Our Vision
            </p>
            <blockquote className="mt-6 text-[21px] font-semibold leading-[1.45] tracking-[-0.015em] text-brand-800 sm:text-[27px]">
              {VISION}
            </blockquote>
            <span className="rule-grow is-in mx-auto mt-8 block h-1 w-20 rounded-full bg-gradient-to-r from-accent-amber to-accent-mint" />
          </Reveal>
        </div>
        <Wave className="block h-12 w-full sm:h-16" fill="#f7fafd" />
      </section>

      {/* ══ OUR MISSION — a numbered rail, not a grid ══════════════════ */}
      <Section className="relative overflow-hidden !pb-10 !pt-4 lg:!pb-12 lg:!pt-6">
        <Backdrop variant="warm" grid />
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal variant="left">
              <SectionHeading kicker="Our Mission" title="What we set out to do" align="left" />
              <p className="mt-5 text-[15px] leading-relaxed text-muted">
                Seven commitments that shape how the schools in this programme are run.
              </p>
              <img
                src={ABOUT.computerLab.src}
                alt={ABOUT.computerLab.alt}
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
      <Section className="relative overflow-hidden bg-surface !py-12 lg:!py-14">
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

      {/* ══ TEACHERS & STAFF — pick a role, the panel changes ═══════════ */}
      <Section className="bg-paper !py-16 lg:!py-20">
        <Reveal>
          <SectionHeading kicker="Teachers & Staff" title="Who teaches here" description={STAFF_NOTE} />
        </Reveal>

        <div className="mt-12 overflow-hidden rounded-3xl bg-surface shadow-xl ring-1 ring-rule lg:grid lg:grid-cols-[300px_1fr]">
          {/* The selector. Numbers on the left, a bar slides to the active one. */}
          <div
            role="tablist"
            aria-label="Staff roles"
            className="flex overflow-x-auto border-b border-rule lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r"
            onMouseEnter={() => setStaffAuto(false)}
          >
            {STAFF_POINTS.map((p, i) => {
              const active = i === staff;
              return (
                <button
                  key={p.title}
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setStaffAuto(false);
                    setStaff(i);
                  }}
                  className={clsx(
                    'relative flex shrink-0 items-center gap-3 px-6 py-5 text-left transition-colors lg:py-7',
                    active ? 'bg-brand-700 text-white' : 'text-ink hover:bg-brand-50',
                  )}
                >
                  <span
                    className={clsx(
                      'font-mono text-[12px] font-bold tabular-nums',
                      active ? 'text-white/60' : 'text-faint',
                    )}
                  >
                    0{i + 1}
                  </span>
                  <span className="text-[15px] font-extrabold tracking-[-0.01em]">{p.title}</span>
                  {active && (
                    <span className="absolute inset-y-0 left-0 w-1 bg-accent-amber lg:inset-y-auto lg:bottom-0 lg:h-1 lg:w-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* The panel. One photograph on top; the role beneath it fades on change. */}
          <div>
            <figure className="relative h-64 overflow-hidden sm:h-80">
              <img
                src="/images/classroom-lesson.jpg"
                alt="A teacher at the lectern in front of a full classroom"
                loading="lazy"
                className="h-full w-full object-cover object-top"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-900/80 to-transparent px-8 pb-5 pt-16 text-[13px] text-white/85">
                {STAFF_CAPTION}
              </figcaption>
            </figure>
            <div key={staff} className="reveal is-in flex items-start gap-5 p-8 sm:p-10">
              {(() => {
                const P = STAFF_POINTS[staff];
                return (
                  <>
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <P.icon className="h-6 w-6" aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-[22px] font-extrabold tracking-[-0.01em] text-ink">{P.title}</h3>
                      <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-muted">{P.body}</p>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>

        <Reveal delay={200}>
          <p className="mt-6 text-center text-[12.5px] leading-relaxed text-faint">
            Individual names, photographs and contact details are not published on this site. Each
            school provides them to its own families directly.
          </p>
        </Reveal>
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

    </>
  );
}
