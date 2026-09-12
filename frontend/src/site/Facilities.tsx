import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bell,
  DownloadCloud,
  Gauge,
  MonitorPlay,
  Radio,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import { CountUp, Reveal } from './motion';
import { FACILITIES, GALLERY, HERO_SLIDES } from './media';
import { PageBanner, Section, SectionHeading } from './PublicLayout';

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
        subtitle="Equipment funded under the programme and installed across the district's classrooms and studios."
        image={GALLERY[3].src}
        imageAlt={GALLERY[3].alt}
      />

      {/* ══ THE INSTALLATION ═══════════════════════════════════════════ */}
      <Section>
        <SectionHeading
          kicker="Infrastructure"
          title="What has been installed"
          description="The hardware behind the programme, and what each part of it is for."
        />

        <div className="mt-14 space-y-8">
          {FACILITIES.map((f, i) => (
            <Reveal key={f.title} variant={i % 2 === 1 ? 'right' : 'left'} delay={60}>
              <article
                className={`grid items-center gap-8 overflow-hidden rounded-2xl bg-surface shadow ring-1 ring-rule lg:grid-cols-2 ${
                  i % 2 === 1 ? 'lg:[&>figure]:order-2' : ''
                }`}
              >
                <figure className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[300px]">
                  <img
                    src={f.src}
                    alt={f.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </figure>
                <div className="p-8 lg:p-10">
                  {f.count && (
                    <div className="flex items-baseline gap-4">
                      <span className="num text-[46px] font-extrabold leading-none text-accent-coral-deep">
                        <CountUp value={f.count} />
                      </span>
                      <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-faint">
                        installed
                      </span>
                    </div>
                  )}
                  <h3 className="mt-4 text-[24px] font-extrabold tracking-[-0.025em] text-ink">
                    {f.title}
                  </h3>
                  <span className="mt-4 block h-1 w-14 rounded-full bg-accent-amber" />
                  <p className="mt-5 text-[15px] leading-relaxed text-muted">{f.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ══ THE BROADCAST MODEL ════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-brand-800">
        <img
          src={HERO_SLIDES[0].src}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.12]"
        />
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <SectionHeading
            kicker="The broadcast model"
            title="Two studios, forty-two classrooms"
            description="That ratio is the single most important fact about this programme, and it shapes how every live class is run."
            light
          />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                n: '02',
                label: 'Production studios',
                body: 'PTZ camera, green screen, softbox lighting and acoustic panelling — the hub the teaching originates from.',
              },
              {
                n: '21',
                label: 'School sites',
                body: 'Each with its own internet connection and online UPS, so a site keeps running through a power cut.',
              },
              {
                n: '42',
                label: 'Classroom endpoints',
                body: 'An interactive panel and OPS PC per classroom, signed in as a shared device rather than as a person.',
              },
            ].map((b, i) => (
              <Reveal key={b.label} variant="zoom" delay={i * 110}>
                <div className="h-full rounded-2xl bg-white/[0.07] p-8 text-center ring-1 ring-white/10">
                  <span className="num block text-[52px] font-extrabold leading-none text-accent-amber">
                    <CountUp value={b.n} />
                  </span>
                  <h3 className="mt-4 text-[16px] font-extrabold uppercase tracking-[0.08em] text-white">
                    {b.label}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-white/60">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-10 flex flex-wrap items-center gap-5 rounded-2xl bg-white/[0.07] p-7 ring-1 ring-white/10">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent-amber text-ink">
                <MonitorPlay className="h-6 w-6" aria-hidden />
              </span>
              <p className="min-w-[16rem] flex-1 text-[14.5px] leading-relaxed text-white/75">
                A studio session is scheduled once and relayed to every classroom set to receive
                it — not joined room by room. Questions from the classroom side come back on a
                moderated channel, so forty-two endpoints never compete on one call.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ RESILIENCE ═════════════════════════════════════════════════ */}
      <Section>
        <SectionHeading
          kicker="Built for the valley"
          title="When the connection or the power gives way"
          description="A rural multi-site programme cannot assume a good link and mains power at nine every morning. These are the measures for when it does not get them."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {RESILIENCE.map((r, i) => (
            <Reveal key={r.title} variant="zoom" delay={(i % 3) * 100}>
              <article className="h-full rounded-2xl border-l-4 border-accent-mint bg-surface p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                <span className="inline-flex h-13 w-13 items-center justify-center rounded-xl bg-accent-mint-soft p-3 text-accent-mint-deep">
                  <r.icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 text-[17px] font-extrabold tracking-[-0.02em] text-ink">
                  {r.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{r.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ══ CTA ════════════════════════════════════════════════════════ */}
      <Section className="bg-surface" width="narrow">
        <div className="rounded-2xl bg-accent-coral-soft p-9 text-center sm:p-12">
          <h2 className="text-[24px] font-extrabold tracking-[-0.025em] text-ink sm:text-[30px]">
            A panel not working at your school?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-ink-soft">
            Report it through your school office. Panels report their own status to the portal, so
            the division office can often see a fault before it is described.
          </p>
          <Link
            to="/contact"
            className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-700 px-7 py-3.5 text-[14.5px] font-bold text-white shadow-pill transition-all hover:-translate-y-0.5 hover:bg-brand-600"
          >
            Contact the office
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </Section>
    </>
  );
}
