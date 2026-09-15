import { Link } from 'react-router-dom';
import { BookOpen, FileCheck2, Info, LogIn } from 'lucide-react';
import { Reveal } from './motion';
import { DECOR, Shape, Wave } from './decor';
import { TONE } from './tone';
import { ABOUT, GALLERY } from './media';
import {
  ASSESSMENT,
  CURRICULUM_STATEMENT,
  DIGITAL_ITEMS,
  DIGITAL_STATEMENT,
  STAGES,
  STRUCTURE_NOTE,
  SUBJECT_STREAMS,
  TEACHING,
} from './academicsContent';
import { Backdrop, PageBanner, Section, SectionHeading } from './PublicLayout';

export function AcademicsPage() {
  return (
    <>
      <PageBanner
        title="Academics"
        subtitle="The curriculum, how it is taught, how learning is assessed, and the year it runs across."
        image={GALLERY[5].src}
        imageAlt={GALLERY[5].alt}
      />

      {/* ══ ACADEMIC STRUCTURE — a progression, not four boxes ═════════ */}
      <Section className="relative overflow-hidden">
        <Backdrop variant="warm" grid />
        <SectionHeading
          kicker="Academic structure"
          title="Learning at every stage"
          description="From the first years of school through to the examination classes."
        />

        {/* A rail the stages sit along, so they read as a sequence. */}
        <div className="relative mt-16">
          <span
            className="absolute inset-x-0 top-7 hidden h-0.5 bg-gradient-to-r from-accent-coral via-accent-mint to-accent-amber lg:block"
            aria-hidden
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STAGES.map((st, i) => {
              const t = TONE[st.tone];
              return (
                <Reveal key={st.stage} variant="zoom" delay={i * 110}>
                  <div className="group relative text-center">
                    <span
                      className={`num relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full ${t.solid} ${t.on} text-[15px] font-extrabold shadow-pill ring-4 ring-paper transition-transform duration-300 group-hover:scale-110`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-6 text-[19px] font-extrabold tracking-[-0.02em] text-ink">
                      {st.stage}
                    </h3>
                    <span
                      className={`mt-2.5 inline-block rounded-full ${t.soft} px-3 py-1 text-[11.5px] font-extrabold uppercase tracking-[0.08em] ${t.text}`}
                    >
                      {st.grades}
                    </span>
                    <p className="mt-4 text-[13.5px] leading-relaxed text-muted">{st.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal delay={200}>
          <p className="mx-auto mt-14 flex max-w-2xl items-start gap-3 rounded-xl bg-accent-amber-soft p-5 text-[13.5px] leading-relaxed text-ink-soft">
            <Info className="mt-0.5 h-4.5 w-4.5 shrink-0 text-accent-amber-deep" aria-hidden />
            {STRUCTURE_NOTE}
          </p>
        </Reveal>
      </Section>

      {/* ══ CURRICULUM — one statement, then the subjects ══════════════ */}
      <section className="relative overflow-hidden bg-accent-sky-soft">
        <Wave className="block h-12 w-full rotate-180 sm:h-16" fill="#ffffff" />
        <Shape
          kind="triangle"
          className="absolute left-[5%] top-[22%] hidden h-10 w-10 opacity-60 lg:block"
          color={DECOR.green}
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-6 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="float-y inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-amber text-ink shadow-lg">
                <BookOpen className="h-7 w-7" aria-hidden />
              </span>
              <p className="mt-7 text-[12px] font-extrabold uppercase tracking-[0.18em] text-accent-sky-deep">
                Curriculum
              </p>
              <blockquote className="mt-6 text-[20px] font-semibold leading-[1.45] tracking-[-0.015em] text-brand-800 sm:text-[26px]">
                {CURRICULUM_STATEMENT}
              </blockquote>
              <span className="rule-grow is-in mx-auto mt-8 block h-1 w-20 rounded-full bg-gradient-to-r from-accent-amber to-accent-coral" />
            </Reveal>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {SUBJECT_STREAMS.map((s, i) => {
              const t = TONE[s.tone];
              return (
                <Reveal key={s.title} variant="zoom" delay={i * 110}>
                  <article className="h-full rounded-2xl bg-surface p-7 shadow-sm ring-1 ring-rule transition-shadow hover:shadow-lg">
                    <span
                      className={`inline-block rounded-lg ${t.solid} ${t.on} px-4 py-1.5 text-[11.5px] font-extrabold uppercase tracking-[0.08em]`}
                    >
                      {s.title}
                    </span>
                    <ul className="mt-6 space-y-3">
                      {s.subjects.map((sub) => (
                        <li
                          key={sub}
                          className="flex items-center gap-3 text-[15px] font-semibold text-ink-soft"
                        >
                          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${t.solid}`} aria-hidden />
                          {sub}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
        <Wave className="block h-12 w-full sm:h-16" fill="#ffffff" />
      </section>

      {/* ══ TEACHING & LEARNING — a bento of unequal tiles ═════════════ */}
      <Section className="relative overflow-hidden bg-surface">
        <Backdrop variant="mint" />
        <SectionHeading
          kicker="Teaching & learning"
          title="How lessons are actually taught"
          description="Seven approaches used side by side, rather than one method applied to everything."
        />

        <div className="mt-14 grid auto-rows-[176px] grid-cols-2 gap-4 lg:grid-cols-4">
          {TEACHING.map((a, i) => {
            const t = TONE[a.tone];
            const shape =
              i === 0 ? 'row-span-2' : i === 3 ? 'lg:col-span-2' : i === 6 ? 'col-span-2 lg:col-span-1' : '';
            return (
              <Reveal key={a.title} variant="zoom" delay={(i % 4) * 90} className={shape}>
                <article
                  className={`group flex h-full flex-col justify-end overflow-hidden rounded-2xl ${t.soft} p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
                >
                  <span
                    className={`icon-pop mb-auto inline-flex h-12 w-12 items-center justify-center rounded-xl ${t.solid} ${t.on} shadow-sm`}
                  >
                    <a.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-[16.5px] font-extrabold tracking-[-0.02em] text-ink">
                    {a.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{a.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ══ DIGITAL LEARNING — split, with a way into the portal ═══════ */}
      <Section className="relative overflow-hidden">
        <Backdrop variant="cool" />
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal variant="left">
            <img
              src={ABOUT.welcome.src}
              alt={ABOUT.welcome.alt}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-xl ring-1 ring-rule"
            />
          </Reveal>

          <Reveal variant="right" delay={120}>
            <SectionHeading
              kicker="Digital learning"
              title="Learning that continues outside the lesson"
              align="left"
            />
            <p className="mt-6 text-[15.5px] leading-relaxed text-muted">{DIGITAL_STATEMENT}</p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {DIGITAL_ITEMS.map((d, i) => (
                <Reveal key={d.label} variant="right" delay={i * 60} as="li">
                  <li className="group flex items-center gap-3 rounded-xl bg-surface p-3.5 ring-1 ring-rule transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <span className="icon-pop inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-tint-brand text-brand-600">
                      <d.icon className="h-4.5 w-4.5" aria-hidden />
                    </span>
                    <span className="text-[13.5px] font-bold text-ink">{d.label}</span>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Link
              to="/login"
              className="btn-sheen group mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-700 px-7 py-3.5 text-[14.5px] font-bold text-white shadow-pill transition-all hover:-translate-y-0.5 hover:bg-brand-600"
            >
              <LogIn className="h-4 w-4" aria-hidden />
              Access the learning platform
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* ══ ASSESSMENT — a numbered rail ═══════════════════════════════ */}
      <Section className="relative overflow-hidden bg-surface">
        <Backdrop variant="warm" grid />
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal variant="left">
              <SectionHeading kicker="Assessment" title="How progress is measured" align="left" />
              <p className="mt-5 text-[15px] leading-relaxed text-muted">
                Five kinds of check, running through the year rather than gathering at the end of
                it.
              </p>
              <div className="mt-8 rounded-2xl bg-accent-amber-soft p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-amber text-ink">
                    <FileCheck2 className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="text-[16px] font-extrabold text-ink">Attendance requirement</h3>
                </div>
                <p className="mt-3.5 text-[13.5px] leading-relaxed text-ink-soft">
                  Learners are expected to maintain <strong>75% attendance</strong>. The portal
                  calculates it continuously and alerts guardians automatically when a learner
                  falls below it.
                </p>
              </div>
            </Reveal>
          </div>

          <ol className="relative space-y-1 border-l-2 border-rule pl-8">
            {ASSESSMENT.map((a, i) => (
              <Reveal key={a.title} variant="right" delay={i * 70} as="li">
                <li className="group relative py-5">
                  <span
                    className="num absolute -left-[45px] flex h-8 w-8 items-center justify-center rounded-full bg-paper text-[11px] font-extrabold text-brand-400 ring-2 ring-rule transition-all duration-300 group-hover:bg-brand-700 group-hover:text-white group-hover:ring-brand-700"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex items-start gap-4">
                    <span className="icon-pop mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-tint-brand text-brand-600 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                      <a.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[17px] font-extrabold tracking-[-0.02em] text-ink">
                        {a.title}
                      </h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{a.body}</p>
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

    </>
  );
}
