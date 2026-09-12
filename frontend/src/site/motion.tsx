import { useEffect, useRef, useState } from 'react';
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

/**
 * Fades its children up as they come into view. `delay` staggers a row of
 * cards so they arrive one after another rather than all at once.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'article' | 'section';
}) {
  const { ref, seen } = useInView<HTMLDivElement>();
  return (
    <Tag
      ref={ref as any}
      className={clsx('reveal', seen && 'is-in', className)}
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

/**
 * A phrase with a colour swipe drawn behind it once it is scrolled to. The
 * text sits above the swipe, so it stays readable before the swipe arrives
 * and wherever motion is switched off.
 */
export function Marker({
  children,
  color = '#f5a623',
  className,
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
}) {
  const { ref, seen } = useInView<HTMLSpanElement>(0.5);
  return (
    <span
      ref={ref}
      className={clsx('marker', seen && 'is-in', className)}
      style={{ ['--marker' as any]: color }}
    >
      <span>{children}</span>
    </span>
  );
}
