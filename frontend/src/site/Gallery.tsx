import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import clsx from 'clsx';
import { Reveal } from './motion';
import { GALLERY } from './media';
import { Section, SectionHeading } from './PublicLayout';

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
      <Section className="!pt-8 sm:!pt-14 lg:!pt-20">
        <SectionHeading
          kicker="Photo gallery"
          title="Our schools in pictures"
          description="Photographs from the schools in the programme. Select any one to view it larger."
        />

        {/* A mosaic rather than a plain grid — every fourth frame is taller. */}
        <div className="mt-8 sm:mt-14 grid auto-rows-[190px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
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
