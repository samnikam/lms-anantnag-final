import { Info } from 'lucide-react';
import { CountUp, Reveal } from './motion';
import { Wave } from './decor';
import { TONE } from './tone';
import { GALLERY, HERO_SLIDES } from './media';
import { CAMPUS, CAMPUS_NOTE, CAMPUS_PHOTO, FACILITY_BLOCKS } from './facilitiesContent';
import { Backdrop, PageBanner, Section, SectionHeading } from './PublicLayout';

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
                    {/* Creative Commons requires the photographer to be named. */}
                    {f.credit && (
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-900/85 to-transparent px-5 pb-3 pt-8 text-[10.5px] text-white/70">
                        Photo: {f.credit.author} · {f.credit.license}
                      </figcaption>
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
      <section className="relative overflow-hidden bg-accent-sky-soft">
        <Wave className="block h-12 w-full rotate-180 sm:h-16" fill="#f7fafd" />
        <img
          src={CAMPUS_PHOTO.src}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.06]"
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-6 sm:px-8">
          <SectionHeading
            kicker="Campus"
            title="Around the classroom"
            description="What a school site provides beyond the teaching rooms themselves."
          />

          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CAMPUS.map((c, i) => (
              <Reveal key={c.label} variant="zoom" delay={(i % 3) * 90} as="li">
                <li className="group flex h-full items-center gap-4 rounded-xl bg-surface p-5 shadow-sm ring-1 ring-rule transition-all hover:-translate-y-1 hover:shadow-md">
                  <span className="icon-pop inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-tint-brand text-brand-600">
                    <c.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-bold text-ink">{c.label}</span>
                    {c.varies && (
                      <span className="mt-0.5 block text-[11.5px] font-semibold uppercase tracking-[0.06em] text-accent-coral-deep">
                        Varies by school
                      </span>
                    )}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={200}>
            <p className="mt-10 flex items-start gap-3.5 rounded-2xl bg-accent-amber-soft p-6 text-[14px] leading-relaxed text-ink-soft">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent-amber-deep" aria-hidden />
              {CAMPUS_NOTE}
            </p>
          </Reveal>
        </div>
        <Wave className="block h-12 w-full sm:h-16" fill="#ffffff" />
      </section>

    </>
  );
}
