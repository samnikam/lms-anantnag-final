/**
 * Decorative shapes for the public site.
 *
 * A school prospectus rarely butts one flat band against another — it breaks
 * them with a curve, and scatters a little geometry in the margins. These are
 * those pieces. All are marked aria-hidden: the surrounding copy carries the
 * meaning, and the page reads identically with every one of them removed.
 */

const C = {
  navy: '#16357e',
  blue: '#4a90d9',
  green: '#2f9e63',
  mint: '#8fd4a8',
  gold: '#f5b731',
  paleBlue: '#e8f2fb',
};

/**
 * The soft S-curve that separates two bands. `fill` is the colour of the
 * section arriving below it; `flip` turns the curve over for the top edge.
 */
export function Wave({
  className,
  fill = '#ffffff',
  flip = false,
}: {
  className?: string;
  fill?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 1440 120"
      className={className}
      role="presentation"
      aria-hidden
      preserveAspectRatio="none"
      style={flip ? { transform: 'scaleY(-1)' } : undefined}
    >
      <path
        d="M0 54 C 220 118, 430 6, 660 44 C 890 82, 1120 26, 1290 58 C 1360 71, 1410 78, 1440 74 L1440 120 L0 120 Z"
        fill={fill}
      />
    </svg>
  );
}

/** Two curves layered, so the edge reads as water rather than a single arc. */
export function DoubleWave({
  className,
  fill = '#ffffff',
  behind = '#e8f2fb',
  flip = false,
}: {
  className?: string;
  fill?: string;
  behind?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 1440 140"
      className={className}
      role="presentation"
      aria-hidden
      preserveAspectRatio="none"
      style={flip ? { transform: 'scaleY(-1)' } : undefined}
    >
      <path
        d="M0 44 C 240 116, 470 2, 720 46 C 970 90, 1200 22, 1440 62 L1440 140 L0 140 Z"
        fill={behind}
        opacity="0.85"
      />
      <path
        d="M0 70 C 250 132, 480 24, 730 66 C 980 108, 1210 44, 1440 82 L1440 140 L0 140 Z"
        fill={fill}
      />
    </svg>
  );
}

/* ── Marginal geometry ─────────────────────────────────────────────────── */

type ShapeKind = 'triangle' | 'triangle-fill' | 'waves' | 'dots' | 'ring' | 'plus';

/** A single piece of confetti — an outlined triangle, a wave group, a dot field. */
export function Shape({
  kind,
  className,
  color = C.green,
}: {
  kind: ShapeKind;
  className?: string;
  color?: string;
}) {
  const shapes: Record<ShapeKind, React.ReactNode> = {
    triangle: (
      <path
        d="M24 6 L43 40 H5 Z"
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinejoin="round"
      />
    ),
    'triangle-fill': <path d="M24 6 L43 40 H5 Z" fill={color} />,
    waves: (
      <g fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round">
        <path d="M3 12 Q 12 3, 21 12 T 39 12" />
        <path d="M3 24 Q 12 15, 21 24 T 39 24" />
        <path d="M3 36 Q 12 27, 21 36 T 39 36" />
      </g>
    ),
    dots: (
      <g fill={color}>
        {[8, 20, 32, 44].map((x) =>
          [8, 20, 32, 44].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.4" />),
        )}
      </g>
    ),
    ring: <circle cx="24" cy="24" r="17" fill="none" stroke={color} strokeWidth="4.5" />,
    plus: (
      <path d="M24 8 V40 M8 24 H40" stroke={color} strokeWidth="5" strokeLinecap="round" />
    ),
  };

  return (
    <svg viewBox="0 0 48 48" className={className} role="presentation" aria-hidden>
      {shapes[kind]}
    </svg>
  );
}

/** The palette the shapes draw from, so pages need not repeat the hexes. */
export const DECOR = C;

/**
 * A photograph masked into a circle, set on a coloured disc with a dotted
 * field behind it and geometry scattered around — the treatment the
 * reference uses for its "about" portrait.
 */
export function CirclePhoto({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className ?? ''}`}>
      {/* The disc the portrait sits on, offset so it reads as a backdrop. */}
      <span
        className="absolute right-[4%] top-[6%] aspect-square w-[88%] rounded-full bg-accent-mint-soft"
        aria-hidden
      />
      <Shape
        kind="dots"
        className="absolute right-[10%] top-[14%] h-16 w-16 opacity-70"
        color={C.green}
      />

      {/* The margin geometry. */}
      <Shape kind="triangle" className="absolute -left-1 top-[10%] h-9 w-9" color={C.green} />
      <Shape
        kind="triangle-fill"
        className="absolute left-[12%] top-[2%] h-6 w-6 opacity-80"
        color={C.mint}
      />
      <Shape kind="triangle" className="absolute left-[6%] top-[26%] h-14 w-14" color={C.green} />
      <Shape
        kind="waves"
        className="absolute -left-2 bottom-[18%] h-16 w-16"
        color={C.blue}
      />

      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="photo-zoom relative aspect-square w-[82%] rounded-full object-cover shadow-xl"
      />
    </div>
  );
}
