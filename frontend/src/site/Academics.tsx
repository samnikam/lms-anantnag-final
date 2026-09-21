import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Info } from 'lucide-react';
import clsx from 'clsx';
import { Reveal } from './motion';
import { ABOUT, HERO_SLIDES, ROLE_PHOTOS, type Photo } from './media';
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
import { PageBanner, Section, SectionHeading } from './PublicLayout';

/** The tabs under the banner, in the order they are read. */
const TABS = [
  'Academic Structure',
  'Curriculum',
  'Teaching & Learning',
  'Digital Learning',
  'Assessment',
] as const;

/* ── The pieces every tab is built from ────────────────────────────────── */

/** A heading with the short accent rule beneath it. */
function RowHeading({ children, align = 'left' }: { children: React.ReactNode; align?: 'left' | 'right' }) {
  return (
    <div className={clsx(align === 'right' && 'lg:text-right')}>
      <h3 className="text-[24px] font-extrabold leading-[1.2] tracking-[-0.02em] text-brand-700 sm:text-[30px]">
        {children}
      </h3>
      <span
        className={clsx(
          'rule-grow is-in mt-3 block h-[3px] w-24 bg-accent-amber',
          align === 'right' && 'lg:ml-auto',
        )}
      />
    </div>
  );
}

/** A plain bulleted list, set in the running text size. */
function Bullets({ items, align = 'left' }: { items: readonly string[]; align?: 'left' | 'right' }) {
  return (
    <ul className={clsx('mt-4 space-y-1.5 text-[15.5px] text-ink-soft', align === 'right' && 'lg:text-right')}>
      {items.map((it) => (
        <li key={it} className={clsx('flex gap-2.5', align === 'right' && 'lg:flex-row-reverse')}>
          <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-ink-soft" aria-hidden />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * A photograph beside a block of text. The photograph sits on an offset
 * grey slab, as the reference sets its pictures; `flip` puts it on the
 * right and ranges the text against it.
 */
function EditorialRow({
  photo,
  flip = false,
  children,
}: {
  photo: Photo;
  flip?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        'grid items-center gap-10 lg:grid-cols-[400px_1fr] lg:gap-16',
        flip && 'lg:grid-cols-[1fr_400px]',
      )}
    >
      <Reveal variant={flip ? 'right' : 'left'} className={clsx(flip && 'lg:order-2')}>
        <figure className="relative mx-auto max-w-[400px]">
          {/* The slab behind, offset down and to the right. */}
          <span aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 rounded-xl bg-slate-200" />
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            className="relative aspect-[4/3] w-full rounded-xl object-cover"
          />
        </figure>
      </Reveal>
      <Reveal variant={flip ? 'left' : 'right'} delay={120} className={clsx(flip && 'lg:order-1')}>
        {children}
      </Reveal>
    </div>
  );
}

/* ── The page ──────────────────────────────────────────────────────────── */

export function AcademicsPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>(TABS[0]);

  return (
    <>
      <PageBanner
        title="Academics"
        subtitle="The curriculum, how it is taught, how learning is assessed, and the year it runs across."
        image="/images/school-building-wide.jpg"
        imageAlt="A school building with a green roof behind tall trees and a lawn"
      />

      {/* ══ TABS — one filled, the rest outlined, in a single bar ══════ */}
      <div className="mx-auto max-w-6xl px-5 pt-10 sm:px-8 sm:pt-14">
        <div
          role="tablist"
          aria-label="Academics sections"
          className="flex overflow-x-auto rounded-xl border-2 border-accent-amber bg-surface"
        >
          {TABS.map((t) => {
            const active = t === tab;
            return (
              <button
                key={t}
                role="tab"
                aria-selected={active}
                onClick={() => setTab(t)}
                className={clsx(
                  'flex-1 whitespace-nowrap px-5 py-3.5 text-[14.5px] font-semibold transition-colors',
                  active ? 'bg-accent-amber text-ink' : 'text-ink hover:bg-accent-amber-soft',
                )}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* ══ ACADEMIC STRUCTURE ═════════════════════════════════════════ */}
      {tab === 'Academic Structure' && (
        <Section className="!pb-16">
          <SectionHeading kicker="Academic structure" title="Learning at every stage" />
          <div className="mt-12 space-y-16 sm:mt-16 sm:space-y-20">
            <EditorialRow photo={ABOUT.welcome}>
              <RowHeading>From the first years to the examination classes</RowHeading>
              <p className="mt-5 text-[15.5px] leading-relaxed text-ink-soft">
                The schools in the programme run across four stages. Not every school offers every
                stage, so what follows is the shape of the whole, and your own school office can
                confirm which classes it runs this session.
              </p>
              <Bullets items={STAGES.map((s) => `${s.stage} — ${s.grades}`)} />
            </EditorialRow>

            {STAGES.map((st, i) => (
              <EditorialRow
                key={st.stage}
                photo={[ABOUT.projectorLesson, HERO_SLIDES[1], ABOUT.computerClass, ABOUT.library][i]}
                flip={i % 2 === 0}
              >
                <RowHeading align={i % 2 === 0 ? 'right' : 'left'}>{st.stage}</RowHeading>
                <p
                  className={clsx(
                    'mt-3 text-[12.5px] font-extrabold uppercase tracking-[0.12em] text-accent-amber-deep',
                    i % 2 === 0 && 'lg:text-right',
                  )}
                >
                  {st.grades}
                </p>
                <p
                  className={clsx(
                    'mt-4 text-[15.5px] leading-relaxed text-ink-soft',
                    i % 2 === 0 && 'lg:text-right',
                  )}
                >
                  {st.body}
                </p>
              </EditorialRow>
            ))}
          </div>

          <Reveal delay={200}>
            <p className="mx-auto mt-16 flex max-w-2xl items-start gap-3 rounded-xl bg-accent-amber-soft p-5 text-[13.5px] leading-relaxed text-ink-soft">
              <Info className="mt-0.5 h-4.5 w-4.5 shrink-0 text-accent-amber-deep" aria-hidden />
              {STRUCTURE_NOTE}
            </p>
          </Reveal>
        </Section>
      )}

      {/* ══ CURRICULUM ═════════════════════════════════════════════════ */}
      {tab === 'Curriculum' && (
        <Section className="!pb-16">
          <SectionHeading kicker="Curriculum" title="What is taught" />
          <div className="mt-12 space-y-16 sm:mt-16 sm:space-y-20">
            <EditorialRow photo={ABOUT.projectorLesson}>
              <RowHeading>The prescribed curriculum</RowHeading>
              <p className="mt-5 text-[15.5px] leading-relaxed text-ink-soft">{CURRICULUM_STATEMENT}</p>
              <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">
                The subjects fall into three groups, set out below. The medium of instruction and
                the languages offered differ between schools.
              </p>
            </EditorialRow>

            {SUBJECT_STREAMS.map((s, i) => (
              <EditorialRow
                key={s.title}
                photo={[ABOUT.computerLab, ABOUT.library, ROLE_PHOTOS.teacher][i]}
                flip={i % 2 === 0}
              >
                <RowHeading align={i % 2 === 0 ? 'right' : 'left'}>{s.title}</RowHeading>
                <Bullets items={s.subjects} align={i % 2 === 0 ? 'right' : 'left'} />
              </EditorialRow>
            ))}
          </div>
        </Section>
      )}

      {/* ══ TEACHING & LEARNING ════════════════════════════════════════ */}
      {tab === 'Teaching & Learning' && (
        <Section className="!pb-16">
          <SectionHeading kicker="Teaching & learning" title="Our approach" />
          <div className="mt-12 space-y-16 sm:mt-16 sm:space-y-20">
            <EditorialRow photo={ABOUT.projectorLesson}>
              <RowHeading>How lessons are actually taught</RowHeading>
              <p className="mt-5 text-[15.5px] leading-relaxed text-ink-soft">
                Seven approaches are used side by side, rather than one method applied to
                everything. The teacher in the room remains the centre of the school day; the
                panel, the studio and the portal extend what that teacher can reach.
              </p>
              <Bullets items={TEACHING.slice(0, 4).map((t) => t.title)} />
            </EditorialRow>

            <EditorialRow photo={ROLE_PHOTOS.teacher} flip>
              <RowHeading align="right">Beyond the lesson</RowHeading>
              <p className="mt-5 text-[15.5px] leading-relaxed text-ink-soft lg:text-right">
                Practical work, regular checks on understanding and extra help for anyone who needs
                more time on a topic — so that no learner is carried past something they have not
                yet grasped.
              </p>
              <Bullets items={TEACHING.slice(4).map((t) => `${t.title} — ${t.body}`)} align="right" />
            </EditorialRow>
          </div>
        </Section>
      )}

      {/* ══ DIGITAL LEARNING ═══════════════════════════════════════════ */}
      {tab === 'Digital Learning' && (
        <Section className="!pb-16">
          <SectionHeading kicker="Digital learning" title="Learning that continues outside the lesson" />
          <div className="mt-12 space-y-16 sm:mt-16 sm:space-y-20">
            <EditorialRow photo={ABOUT.computerClass}>
              <RowHeading>The learning platform</RowHeading>
              <p className="mt-5 text-[15.5px] leading-relaxed text-ink-soft">{DIGITAL_STATEMENT}</p>
              <Bullets items={DIGITAL_ITEMS.map((d) => d.label)} />
              <Link
                to="/login"
                className="btn-sheen group mt-7 inline-flex items-center gap-2 rounded-lg bg-brand-700 px-6 py-3 text-[14px] font-bold text-white shadow-pill transition-all hover:-translate-y-0.5 hover:bg-brand-600"
              >
                Access the learning platform
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </EditorialRow>
          </div>
        </Section>
      )}

      {/* ══ ASSESSMENT ═════════════════════════════════════════════════ */}
      {tab === 'Assessment' && (
        <Section className="!pb-16">
          <SectionHeading kicker="Assessment" title="How progress is measured" />
          <div className="mt-12 space-y-16 sm:mt-16 sm:space-y-20">
            <EditorialRow photo={HERO_SLIDES[1]}>
              <RowHeading>Five kinds of check</RowHeading>
              <p className="mt-5 text-[15.5px] leading-relaxed text-ink-soft">
                Running through the year rather than gathering at the end of it, so that difficulty
                is found early.
              </p>
              <Bullets items={ASSESSMENT.map((a) => `${a.title} — ${a.body}`)} />
            </EditorialRow>

            <EditorialRow photo={ABOUT.library} flip>
              <RowHeading align="right">Attendance</RowHeading>
              <p className="mt-5 text-[15.5px] leading-relaxed text-ink-soft lg:text-right">
                Learners are expected to maintain <strong className="text-ink">75% attendance</strong>.
                The portal calculates it continuously and alerts guardians automatically when a
                learner falls below it, so that a problem is noticed while there is still time to
                put it right.
              </p>
            </EditorialRow>
          </div>
        </Section>
      )}
    </>
  );
}
