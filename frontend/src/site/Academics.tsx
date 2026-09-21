import { Link } from "react-router-dom";
import { ArrowRight, Info } from "lucide-react";
import clsx from "clsx";
import { Reveal } from "./motion";
import { ABOUT, HERO_SLIDES, ROLE_PHOTOS, type Photo } from "./media";
import {
  ASSESSMENT,
  CURRICULUM_STATEMENT,
  DIGITAL_ITEMS,
  DIGITAL_STATEMENT,
  STAGES,
  STRUCTURE_NOTE,
  SUBJECT_STREAMS,
  TEACHING,
} from "./academicsContent";
import { PageBanner, Section, SectionHeading } from "./PublicLayout";

/* ── The pieces every section is built from ─────────────────────────────── */

/** A heading with the short accent rule beneath it. */
function RowHeading({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <div className={clsx(align === "right" && "lg:text-right")}>
      <h3 className="text-[24px] font-extrabold leading-[1.2] tracking-[-0.02em] text-brand-700 sm:text-[30px]">
        {children}
      </h3>
      <span
        className={clsx(
          "rule-grow is-in mt-3 block h-[3px] w-24 bg-accent-amber",
          align === "right" && "lg:ml-auto",
        )}
      />
    </div>
  );
}

/** A plain bulleted list, set in the running text size. */
function Bullets({
  items,
  align = "left",
}: {
  items: readonly string[];
  align?: "left" | "right";
}) {
  return (
    <ul
      className={clsx(
        "mt-4 space-y-1.5 text-[15.5px] text-ink-soft",
        align === "right" && "lg:text-right",
      )}
    >
      {items.map((it) => (
        <li
          key={it}
          className={clsx(
            "flex gap-2.5",
            align === "right" && "lg:flex-row-reverse",
          )}
        >
          <span
            className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-ink-soft"
            aria-hidden
          />
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
        "grid items-center gap-10 lg:grid-cols-[400px_1fr] lg:gap-16",
        flip && "lg:grid-cols-[1fr_400px]",
      )}
    >
      <Reveal
        variant={flip ? "right" : "left"}
        className={clsx(flip && "lg:order-2")}
      >
        <figure className="relative mx-auto max-w-[400px]">
          {/* The slab behind, offset down and to the right. */}
          <span
            aria-hidden
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-xl bg-slate-200"
          />
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            className="relative aspect-[4/3] w-full rounded-xl object-cover"
          />
        </figure>
      </Reveal>
      <Reveal
        variant={flip ? "left" : "right"}
        delay={120}
        className={clsx(flip && "lg:order-1")}
      >
        {children}
      </Reveal>
    </div>
  );
}

/* ── The page ──────────────────────────────────────────────────────────── */

export function AcademicsPage() {
  return (
    <>
      <PageBanner
        title="Academics"
        subtitle="The curriculum, how it is taught, how learning is assessed, and the year it runs across."
        image="/images/school-building-wide.jpg"
        imageAlt="A school building with a green roof behind tall trees and a lawn"
      />

      {/* ══ ONE ROW PER TOPIC — a photograph, a heading, a few lines ═══ */}
      <Section className="!pb-16">
        <SectionHeading
          kicker="Academics"
          title="Our approach"
          description="What is taught, how it is taught, and how learning is checked."
        />

        <div className="mt-12 space-y-16 sm:mt-16 sm:space-y-24">
          <EditorialRow photo={ABOUT.welcome}>
            <RowHeading>Academic structure</RowHeading>
            <p className="mt-5 text-[15.5px] leading-relaxed text-ink-soft">
              From the first years of school through to the examination classes. {STRUCTURE_NOTE}
            </p>
            <Bullets items={STAGES.map((s) => `${s.stage} — ${s.grades}`)} />
          </EditorialRow>

          <EditorialRow photo={ABOUT.projectorLesson} flip>
            <RowHeading align="right">Curriculum</RowHeading>
            <p className="mt-5 text-[15.5px] leading-relaxed text-ink-soft lg:text-right">
              {CURRICULUM_STATEMENT}
            </p>
            <Bullets
              items={SUBJECT_STREAMS.map((s) => `${s.title}: ${s.subjects.join(', ')}`)}
              align="right"
            />
          </EditorialRow>

          <EditorialRow photo={CLASSROOM}>
            <RowHeading>Teaching &amp; learning</RowHeading>
            <p className="mt-5 text-[15.5px] leading-relaxed text-ink-soft">
              Seven approaches used side by side, rather than one method applied to everything.
              The teacher in the room remains the centre of the school day.
            </p>
            <Bullets items={TEACHING.map((t) => t.title)} />
          </EditorialRow>

          <EditorialRow photo={ABOUT.computerClass} flip>
            <RowHeading align="right">Digital learning</RowHeading>
            <p className="mt-5 text-[15.5px] leading-relaxed text-ink-soft lg:text-right">
              {DIGITAL_STATEMENT}
            </p>
            <Bullets items={DIGITAL_ITEMS.map((d) => d.label)} align="right" />
            <div className="mt-7 lg:text-right">
              <Link
                to="/login"
                className="btn-sheen group inline-flex items-center gap-2 rounded-lg bg-brand-700 px-6 py-3 text-[14px] font-bold text-white shadow-pill transition-all hover:-translate-y-0.5 hover:bg-brand-600"
              >
                Access the learning platform
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
          </EditorialRow>

          <EditorialRow photo={HERO_SLIDES[1]}>
            <RowHeading>Assessment</RowHeading>
            <p className="mt-5 text-[15.5px] leading-relaxed text-ink-soft">
              Five kinds of check, running through the year rather than gathering at the end of it.
              Learners are expected to maintain <strong className="text-ink">75% attendance</strong>;
              the portal calculates it continuously and alerts guardians when a learner falls below it.
            </p>
            <Bullets items={ASSESSMENT.map((a) => a.title)} />
          </EditorialRow>
        </div>
      </Section>

    </>
  );
}
