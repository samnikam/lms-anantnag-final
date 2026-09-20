import { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import clsx from 'clsx';

/** True once the element has been scrolled into view. It does not go back. */
export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    // Without the API — or with motion turned down — show everything at once
    // rather than leaving the page blank.
    if (typeof IntersectionObserver === 'undefined') {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen, threshold]);

  return { ref, seen };
}

const VARIANTS = {
  up: '',
  left: 'reveal-left',
  right: 'reveal-right',
  zoom: 'reveal-zoom',
} as const;

/**
 * Brings its children in as they are scrolled to. `delay` staggers a row of
 * cards so they arrive one after another, and `variant` decides the
 * direction — a left-hand column entering from the left reads better than
 * everything on the page rising from below.
 */
export function Reveal({
  children,
  delay = 0,
  variant = 'up',
  className,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  delay?: number;
  variant?: keyof typeof VARIANTS;
  className?: string;
  as?: 'div' | 'li' | 'article' | 'section';
}) {
  const { ref, seen } = useInView<HTMLDivElement>();
  return (
    <Tag
      ref={ref as any}
      className={clsx('reveal', VARIANTS[variant], seen && 'is-in', className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/**
 * Counts up to a figure the first time it is seen. Non-numeric values (a
 * session like "2026–27") are printed as they are.
 */
export function CountUp({
  value,
  duration = 1400,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const { ref, seen } = useInView<HTMLSpanElement>(0.4);
  const target = Number(value);
  const numeric = Number.isFinite(target) && value.trim() !== '';
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!seen || !numeric) return;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setN(target);
      return;
    }
    let raf = 0;
    const started = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / duration);
      // Ease out, so it settles rather than stopping dead.
      setN(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, numeric, target, duration]);

  // Keep the written width, so "02" does not become "2" mid-count.
  const shown = numeric ? String(n).padStart(value.trim().length, '0') : value;
  return (
    <span ref={ref} className={className}>
      {shown}
    </span>
  );
}

/** How far down the page the reader is, drawn as a bar across the very top. */
export function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]" aria-hidden>
      <div
        className="h-full bg-gradient-to-r from-accent-amber via-accent-coral to-accent-violet"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

/** Appears once the reader is well down the page, and takes them back up. */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={clsx(
        'fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full',
        'bg-brand-700 text-white shadow-lg transition-all duration-300 hover:bg-brand-600',
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <ArrowUp className="h-5 w-5" aria-hidden />
    </button>
  );
}

/**
 * Leans a card toward the cursor as it moves across it — a few degrees, no
 * more — and settles back when the cursor leaves. Does nothing for anyone
 * who has asked for reduced motion, and nothing on a touch screen, where
 * there is no cursor to follow.
 */
export function Tilt({
  children,
  className,
  max = 6,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg) translateY(-4px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = '';
  };

  return (
    <div ref={ref} className={clsx('tilt', className)} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}

/**
 * Moves a background a fraction of the scroll, so a section's photograph
 * drifts more slowly than the page over it. Returns a style to spread onto
 * the element; empty when motion is reduced.
 */
export function useParallax(strength = 0.18) {
  const ref = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const centre = r.top + r.height / 2 - window.innerHeight / 2;
      setOffset(-centre * strength);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [strength]);

  return { ref, style: { transform: `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.15)` } };
}
