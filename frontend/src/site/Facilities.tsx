import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bell,
  DownloadCloud,
  Gauge,
  Info,
  MonitorPlay,
  Radio,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import { CountUp, Reveal } from './motion';
import { TONE } from './tone';
import { GALLERY, HERO_SLIDES } from './media';
import { CAMPUS, CAMPUS_NOTE, CAMPUS_PHOTO, FACILITY_BLOCKS } from './facilitiesContent';
import { Backdrop, PageBanner, Section, SectionHeading } from './PublicLayout';

/** How the programme copes with the conditions of a rural mountain district. */
const RESILIENCE = [
  {
    icon: DownloadCloud,
    title: 'Offline lesson packs',
    body: 'A scheduled lesson can be cached on the classroom PC ahead of time, so a link that fails on the morning does not cost the class its period.',
  },
  {
    icon: Gauge,
    title: 'Adaptive streaming',
    body: 'Video quality adjusts to the connection available, so a school on a weaker rural link degrades gracefully instead of dropping out entirely.',
  },
  {
    icon: Radio,
    title: 'Recorded fallback',
    body: 'If a site loses its live feed mid-session, the recording stands in — and every broadcast is linked afterwards to each classroom scheduled to receive it.',
  },
  {
    icon: Bell,
    title: 'SMS alerts',
    body: 'Attendance warnings, results and session changes reach guardians by SMS where a family has no reliable data connection or smartphone.',
  },
  {
    icon: Smartphone,
    title: 'Installable app',
    body: 'The portal installs as a progressive web app on low-end phones, so parents and learners are not held back by an old handset.',
  },
  {
    icon: ShieldCheck,
    title: 'Monitored devices',
    body: 'Every panel reports a heartbeat. The division office can see which classrooms are online and which need attention, usually before a fault is reported.',
  },
];

export function FacilitiesPage() {
  return (
    <>
      <PageBanner
        title="Facilities"
        subtitle="The spaces and equipment supporting teaching across the district's schools."
        image={GALLERY[3].src}
        imageAlt={GALLERY[3].alt}
      />

      {/* ══ THE FACILITIES — alternating photo and text ════════════════ */}
      <Section className="relative overflow-hidden">
        <Backdrop variant="warm" />
        <SectionHeading
          kicker="Our facilities"
          title="Where learning happens"
          description="What the programme provides, and what each school adds around it."
        />

        <div className="mt-16 space-y-10">
          {FACILITY_BLOCKS.map((f, i) => {
            const t = TONE[f.tone];
            return (
              <Reveal key={f.title} variant={i % 2 === 1 ? 'right' : 'left'} delay={50}>
                <article
                  className={`group grid items-center gap-8 overflow-hidden rounded-[28px] bg-surface shadow ring-1 ring-rule transition-shadow hover:shadow-xl lg:grid-cols-2 ${
                    i % 2 === 1 ? 'lg:[&>figure]:order-2' : ''
                  }`}
                >
                  <figure className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[320px]">
                    <img
                      src={f.src}
                      alt={f.alt}
                      loading="lazy"
                      className="photo-zoom h-full w-full object-cover"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-brand-900/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    {f.count && (
                      <span className="num absolute left-5 top-5 rounded-xl bg-accent-amber px-4 py-2 text-[17px] font-extrabold text-ink shadow-lg">
                        <CountUp value={f.count} />
                      </span>
                    )}
                  </figure>

                  <div className="p-8 lg:p-12">
                    <span
                      className={`icon-pop inline-flex h-14 w-14 items-center justify-center rounded-2xl ${t.solid} ${t.on} shadow-pill`}
                    >
                      <f.icon className="h-6 w-6" aria-hidden />
                    </span>
                    <h3 className="mt-6 text-[24px] font-extrabold tracking-[-0.025em] text-ink">
                      {f.title}
                    </h3>
                    <span className="rule-grow is-in mt-4 block h-1 w-14 rounded-full bg-gradient-to-r from-accent-amber to-accent-coral" />
                    <p className="mt-5 text-[15px] leading-relaxed text-muted">{f.body}</p>
                    {/* Never state a facility as universal when it is not. */}
                    {f.varies && (
                      <span
                        className={`mt-6 inline-block rounded-full ${t.soft} px-4 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.08em] ${t.text}`}
                      >
                        Varies by school
                      </span>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ══ CAMPUS — a checklist over a photograph ═════════════════════ */}
      <section className="relative overflow-hidden bg-brand-800">
        <img
          src={CAMPUS_PHOTO.src}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.13]"
        />
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
          <SectionHeading
            kicker="Campus"
            title="Around the classroom"
            description="What a school site provides beyond the teaching rooms themselves."
            light
          />

          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CAMPUS.map((c, i) => (
              <Reveal key={c.label} variant="zoom" delay={(i % 3) * 90} as="li">
                <li className="group flex h-full items-center gap-4 rounded-xl bg-white/[0.07] p-5 ring-1 ring-white/10 transition-colors hover:bg-white/[0.13]">
                  <span className="icon-pop inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/15">
                    <c.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-bold text-white">{c.label}</span>
                    {c.varies && (
                      <span className="mt-0.5 block text-[11.5px] font-semibold uppercase tracking-[0.06em] text-accent-amber/80">
                        Varies by school
                      </span>
                    )}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={200}>
            <p className="mt-10 flex items-start gap-3.5 rounded-2xl bg-white/[0.07] p-6 text-[14px] leading-relaxed text-white/70 ring-1 ring-white/10">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent-amber" aria-hidden />
              {CAMPUS_NOTE}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ THE BROADCAST MODEL ════════════════════════════════════════ */}
      <Section className="relative overflow-hidden bg-surface">
        <Backdrop variant="cool" grid />
        <SectionHeading
          kicker="The broadcast model"
          title="Two studios, forty-two classrooms"
          description="That ratio is the single most important fact about this programme, and it shapes how every live class is run."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              n: '02',
              tone: 'coral' as const,
              label: 'Production studios',
              body: 'PTZ camera, green screen, softbox lighting and acoustic panelling — the hub the teaching originates from.',
            },
            {
              n: '21',
              tone: 'violet' as const,
              label: 'School sites',
              body: 'Each with its own internet connection and online UPS, so a site keeps running through a power cut.',
            },
            {
              n: '42',
              tone: 'mint' as const,
              label: 'Classroom endpoints',
              body: 'An interactive panel and OPS PC per classroom, signed in as a shared device rather than as a person.',
            },
          ].map((b, i) => {
            const t = TONE[b.tone];
            return (
              <Reveal key={b.label} variant="zoom" delay={i * 110}>
                <div
                  className={`h-full rounded-2xl ${t.soft} p-8 text-center transition-transform duration-300 hover:-translate-y-2`}
                >
                  <span className={`num block text-[52px] font-extrabold leading-none ${t.text}`}>
                    <CountUp value={b.n} />
                  </span>
                  <h3 className="mt-4 text-[15px] font-extrabold uppercase tracking-[0.08em] text-ink">
                    {b.label}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">{b.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <div className="mt-10 flex flex-wrap items-center gap-5 rounded-2xl bg-paper p-7 ring-1 ring-rule">
            <span className="float-y flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-700 text-white shadow-pill">
              <MonitorPlay className="h-6 w-6" aria-hidden />
            </span>
            <p className="min-w-[16rem] flex-1 text-[14.5px] leading-relaxed text-ink-soft">
              A studio session is scheduled once and relayed to every classroom set to receive it
              — not joined room by room. Questions from the classroom side come back on a
              moderated channel, so forty-two endpoints never compete on one call.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* ══ RESILIENCE — a ruled list, not more boxes ══════════════════ */}
      <Section>
        <SectionHeading
          kicker="Built for the valley"
          title="When the connection or the power gives way"
          description="A rural multi-site programme cannot assume a good link and mains power at nine every morning. These are the measures for when it does not get them."
        />

        <div className="mt-14 grid gap-x-12 sm:grid-cols-2">
          {RESILIENCE.map((r, i) => (
            <Reveal key={r.title} variant={i % 2 === 0 ? 'left' : 'right'} delay={(i % 2) * 80}>
              <div className="group flex items-start gap-5 border-b border-rule py-6">
                <span className="icon-pop inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-mint-soft text-accent-mint-deep">
                  <r.icon className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[16px] font-extrabold text-ink">{r.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{r.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ══ CTA ════════════════════════════════════════════════════════ */}
      <section className="bg-surface">
        <div className="mx-auto max-w-3xl px-5 pb-20 sm:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-[28px] bg-accent-coral-soft p-9 text-center sm:p-12">
              <img
                src={HERO_SLIDES[0].src}
                alt=""
                aria-hidden
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-[0.07]"
              />
              <div className="relative">
                <h2 className="text-[24px] font-extrabold tracking-[-0.025em] text-ink sm:text-[30px]">
                  A panel not working at your school?
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-ink-soft">
                  Report it through your school office. Panels report their own status to the
                  portal, so the division office can often see a fault before it is described.
                </p>
                <Link
                  to="/contact"
                  className="btn-sheen group mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-700 px-7 py-3.5 text-[14.5px] font-bold text-white shadow-pill transition-all hover:-translate-y-0.5 hover:bg-brand-600"
                >
                  Contact the office
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
