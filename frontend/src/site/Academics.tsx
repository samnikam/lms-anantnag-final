import { Link } from 'react-router-dom';
import { useState } from 'react';
import { BookOpen, ChevronDown, Info, LogIn } from 'lucide-react';
import clsx from 'clsx';
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
  // Which assessment is open in the accordion; -1 closes them all.
  const [check, setCheck] = useState(0);
  return (
    <>
      <PageBanner
        title="Academics"
        subtitle="The curriculum, how it is taught, how learning is assessed, and the year it runs across."
        image={GALLERY[5].src}
        imageAlt={GALLERY[5].alt}
      />

      {/* ══ ACADEMIC STRUCTURE — a progression, not four boxes ═════════ */}
      <Section className="relative overflow-hidden bg-gradient-to-b from-accent-amber-soft/50 to-white">
        <Backdrop variant="warm" grid />
        <SectionHeading
          kicker="Academic structure"
          title="Learning at every stage"
          description="From the first years of school through to the examination classes."
        />

        {/* A rail the stages sit along, so they read as a sequence. */}
        <div className="relative mt-16">
          <span
            className="absolute inset-x-0 top-7 hidden h-0.5 bg-gradient-to-r from-accent-coral via-accent-violet via-accent-mint to-accent-amber lg:block"
            aria-hidden
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STAGES.map((st, i) => {
              const t = TONE[st.tone];
              return (
                <Reveal key={st.stage} variant="zoom" delay={i * 110}>
                  <div className="group relative text-center">
                    <span
                      className={`num relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full ${t.solid} ${t.on} text-[15px] font-extrabold shadow-lg ring-4 ring-white transition-transform duration-300 group-hover:scale-110`}
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
      <section className="relative overflow-hidden bg-accent-mint-soft">
        <Wave className="block h-12 w-full rotate-180 sm:h-16" fill="#ffffff" />
        <Shape
          kind="triangle"
          className="absolute left-[5%] top-[22%] hidden h-10 w-10 opacity-60 lg:block"
          color={DECOR.gold}
        />
        <Shape
          kind="dots"
          className="absolute right-[4%] top-[14%] hidden h-24 w-24 opacity-50 lg:block"
          color={DECOR.blue}
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-6 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="float-y inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-amber text-ink shadow-lg">
                <BookOpen className="h-7 w-7" aria-hidden />
              </span>
              <p className="mt-7 text-[12px] font-extrabold uppercase tracking-[0.18em] text-accent-mint-deep">
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
                  <article className="lift-card h-full rounded-2xl bg-surface p-7 shadow-md ring-1 ring-rule">
                    <span className={`mb-6 block h-1.5 w-full rounded-full ${t.solid}`} aria-hidden />
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
        <Wave className="block h-12 w-full sm:h-16" fill="#f7fafd" />
      </section>

      {/* ══ TEACHING & LEARNING — ruled columns, a coloured rule over each ═ */}
      <Section className="relative overflow-hidden bg-paper">
        <Backdrop variant="cool" />
        <SectionHeading
          kicker="Teaching & learning"
          title="How lessons are actually taught"
          description="Seven approaches used side by side, rather than one method applied to everything."
        />

        {/* Nothing filled: a thick rule in the approach's colour, then the text.
            The rule lengthens on hover and the icon takes the same colour. */}
        <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {TEACHING.map((a, i) => {
            const t = TONE[a.tone];
            return (
              <Reveal key={a.title} delay={(i % 4) * 80}>
                <article className="group">
                  <span className={`block h-1 w-10 rounded-full ${t.solid} transition-all duration-500 group-hover:w-full`} />
                  <span
                    className={`mt-6 inline-flex h-12 w-12 items-center justify-center rounded-full ${t.soft} ${t.text} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <a.icon className="h-5.5 w-5.5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className="mt-4 text-[17px] font-extrabold tracking-[-0.02em] text-ink">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{a.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ══ DIGITAL LEARNING — a green band, with a way into the portal ═ */}
      <Section className="relative overflow-hidden bg-gradient-to-br from-accent-mint-deep to-[#125f3a] text-white">
        <Shape kind="ring" className="absolute -right-16 -top-16 h-64 w-64 opacity-20" color="#ffffff" />
        <Shape
          kind="plus"
          className="absolute bottom-10 left-[4%] hidden h-10 w-10 opacity-30 lg:block"
          color="#ffffff"
        />
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal variant="left">
            <img
              src={ABOUT.welcome.src}
              alt={ABOUT.welcome.alt}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-2xl ring-4 ring-white/15"
            />
          </Reveal>

          <Reveal variant="right" delay={120}>
            <SectionHeading
              kicker="Digital learning"
              title="Learning that continues outside the lesson"
              align="left"
              light
            />
            <p className="mt-6 text-[15.5px] leading-relaxed text-white/85">{DIGITAL_STATEMENT}</p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {DIGITAL_ITEMS.map((d, i) => (
                <Reveal key={d.label} variant="right" delay={i * 60} as="li">
                  <li className="group flex items-center gap-3 rounded-xl bg-white/10 p-3.5 ring-1 ring-white/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/15">
                    <span className="icon-pop inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-amber text-ink">
                      <d.icon className="h-4.5 w-4.5" aria-hidden />
                    </span>
                    <span className="text-[13.5px] font-bold text-white">{d.label}</span>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Link
              to="/login"
              className="btn-sheen group mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3.5 text-[14.5px] font-bold text-accent-mint-deep shadow-lg transition-all hover:-translate-y-0.5 hover:bg-accent-amber-soft"
            >
              <LogIn className="h-4 w-4" aria-hidden />
              Access the learning platform
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* ══ ASSESSMENT — a large figure beside an accordion ════════════ */}
      <Section className="relative overflow-hidden bg-surface">
        <Backdrop variant="warm" grid />
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal variant="left">
              <SectionHeading kicker="Assessment" title="How progress is measured" align="left" />
              <p className="mt-5 text-[15px] leading-relaxed text-muted">
                Five kinds of check, running through the year rather than gathering at the end of
                it.
              </p>
              {/* The one number a family needs to know, set large. */}
              <div className="mt-10 flex items-end gap-5 border-l-4 border-accent-amber pl-6">
                <span className="num bg-gradient-to-br from-brand-700 to-accent-sky bg-clip-text text-[64px] font-extrabold leading-none tracking-[-0.04em] text-transparent sm:text-[80px]">
                  75%
                </span>
                <div className="pb-2">
                  <p className="text-[15px] font-extrabold text-ink">Attendance required</p>
                  <p className="mt-1 max-w-[16rem] text-[13px] leading-relaxed text-muted">
                    Calculated continuously by the portal, which alerts guardians when a learner
                    falls below it.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* One check open at a time; the rest sit as single ruled lines. */}
          <div className="divide-y divide-rule border-y border-rule">
            {ASSESSMENT.map((a, i) => {
              const open = i === check;
              return (
                <Reveal key={a.title} variant="right" delay={i * 60}>
                  <div>
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setCheck(open ? -1 : i)}
                      className="flex w-full items-center gap-4 py-5 text-left"
                    >
                      <span
                        className={clsx(
                          'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors',
                          open ? 'bg-accent-amber text-ink shadow-md' : 'bg-tint-brand text-brand-600',
                        )}
                      >
                        <a.icon className="h-5 w-5" aria-hidden />
                      </span>
                      <span className="flex-1 text-[17px] font-extrabold tracking-[-0.02em] text-ink">
                        {a.title}
                      </span>
                      <ChevronDown
                        className={clsx(
                          'h-5 w-5 shrink-0 text-faint transition-transform duration-300',
                          open && 'rotate-180 text-accent-amber-deep',
                        )}
                        aria-hidden
                      />
                    </button>
                    <div
                      className={clsx(
                        'grid transition-[grid-template-rows] duration-300 ease-out',
                        open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                      )}
                    >
                      <p className="overflow-hidden pl-14 text-[14.5px] leading-relaxed text-muted">
                        <span className="block pb-5">{a.body}</span>
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

    </>
  );
}
