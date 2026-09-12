import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import clsx from 'clsx';
import { Reveal } from './motion';
import { CREDITED, GALLERY } from './media';
import { PageBanner, Section, SectionHeading } from './PublicLayout';

export function GalleryPage() {
  // The index of the photograph shown full-screen, or null for the grid.
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen((i) => ((i ?? 0) + 1) % GALLERY.length);
      if (e.key === 'ArrowLeft') setOpen((i) => ((i ?? 0) - 1 + GALLERY.length) % GALLERY.length);
    };
    window.addEventListener('keydown', onKey);
    // The page behind must not scroll while the viewer is up.
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <PageBanner
        title="Gallery"
        subtitle="Classrooms, learners and the district the programme serves."
        image={GALLERY[1].src}
        imageAlt={GALLERY[1].alt}
      />

      <Section>
        <SectionHeading
          kicker="Photo gallery"
          title="Scenes from the programme"
          description="Select any photograph to view it larger."
        />

        {/* A mosaic rather than a plain grid — every fourth frame is taller. */}
        <div className="mt-14 grid auto-rows-[190px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {GALLERY.map((g, i) => (
            <Reveal
              key={g.src + i}
              variant="zoom"
              delay={(i % 4) * 80}
              className={clsx(i % 7 === 0 && 'row-span-2', i % 5 === 0 && 'sm:col-span-2')}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group h-full w-full overflow-hidden rounded-xl shadow-sm ring-1 ring-rule transition-all hover:shadow-lg"
                aria-label={`View: ${g.alt}`}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </button>
            </Reveal>
          ))}
        </div>

        <p className="mt-12 rounded-xl bg-accent-amber-soft p-5 text-center text-[13.5px] leading-relaxed text-ink-soft">
          The photographs of Anantnag — Amarnath, Pahalgam, the Lidder, Betaab, Aru,
          Chandanwari and Kokernag — are real pictures of those places. The classroom
          photographs are stand-ins until the division supplies its own.
        </p>

        {/* Creative Commons requires the photographer to be named. */}
        <div className="mt-10 rounded-2xl bg-surface p-7 ring-1 ring-rule">
          <h2 className="text-[15px] font-extrabold uppercase tracking-[0.1em] text-ink">
            Photograph credits
          </h2>
          <p className="mt-2 text-[13px] text-muted">
            District photographs are used under Creative Commons licences, with thanks to their
            photographers.
          </p>
          <ul className="mt-5 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {CREDITED.map((c) => (
              <li key={c.src} className="text-[12.5px] text-muted">
                <a
                  href={c.credit!.page}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-semibold text-brand-700 underline-offset-2 hover:underline"
                >
                  {c.alt}
                </a>{' '}
                — {c.credit!.author}, {c.credit!.license}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ══ LIGHTBOX ═══════════════════════════════════════════════════ */}
      {open !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/92 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Photograph viewer"
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            onClick={() => setOpen(null)}
            aria-label="Close"
            className="absolute right-5 top-5 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            aria-label="Previous photograph"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((i) => ((i ?? 0) - 1 + GALLERY.length) % GALLERY.length);
            }}
            className="absolute left-4 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 sm:left-8"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <figure className="max-h-[85vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={GALLERY[open].src}
              alt={GALLERY[open].alt}
              className="max-h-[76vh] w-auto rounded-xl object-contain shadow-2xl"
            />
            <figcaption className="mt-4 text-center text-[13.5px] text-white/70">
              {GALLERY[open].alt}
              <span className="ml-3 text-white/40">
                {open + 1} / {GALLERY.length}
              </span>
              {GALLERY[open].credit && (
                <span className="mt-1.5 block text-[11.5px] text-white/40">
                  Photo: {GALLERY[open].credit!.author} · {GALLERY[open].credit!.license}
                </span>
              )}
            </figcaption>
          </figure>

          <button
            type="button"
            aria-label="Next photograph"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((i) => ((i ?? 0) + 1) % GALLERY.length);
            }}
            className="absolute right-4 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 sm:right-8"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </>
  );
}
