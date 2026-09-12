/**
 * Artwork for the public site.
 *
 * Drawn rather than photographed, for three reasons: a stock photograph of
 * somebody else's classroom would misrepresent the division's own schools,
 * an SVG costs nothing to load over a thin connection, and it can be drawn to
 * show the thing that actually distinguishes this programme — one studio
 * reaching many valley schools at once.
 *
 * Every scene is decorative and marked aria-hidden; the surrounding copy
 * carries the meaning.
 */

const C = {
  ink: '#1b1d3a',
  b500: '#514c99',
  b600: '#3d3a8c',
  b700: '#2f2c6e',
  b800: '#25234f',
  coral: '#f2789f',
  coralDeep: '#c93567',
  mint: '#3bc9a0',
  mintDeep: '#0b7f66',
  sky: '#56b8e8',
  skyDeep: '#1470a8',
  amber: '#f5a623',
  violet: '#8b7cf6',
  violetDeep: '#5638d6',
  cream: '#fff8ec',
  white: '#ffffff',
};

/* ── Playful shapes, scattered behind sections ─────────────────────────── */

/** A soft organic blob that slowly changes shape. */
export function Blob({
  className,
  color = C.coral,
  opacity = 0.5,
}: {
  className?: string;
  color?: string;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden
      className={`anim-blob pointer-events-none absolute ${className ?? ''}`}
      style={{ background: color, opacity }}
    />
  );
}

/** A ring, a plus, a squiggle, a star — confetti for a section corner. */
export function Doodle({
  kind,
  className,
  color = C.amber,
}: {
  kind: 'ring' | 'plus' | 'squiggle' | 'star' | 'arc' | 'dots';
  className?: string;
  color?: string;
}) {
  const shapes = {
    ring: (
      <circle cx="24" cy="24" r="17" fill="none" stroke={color} strokeWidth="6" />
    ),
    plus: (
      <path
        d="M24 8 V40 M8 24 H40"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
      />
    ),
    squiggle: (
      <path
        d="M4 32 Q 14 12, 24 32 T 44 32"
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
      />
    ),
    star: (
      <path
        d="M24 4 L29 18 L44 20 L33 30 L36 44 L24 37 L12 44 L15 30 L4 20 L19 18 Z"
        fill={color}
      />
    ),
    arc: (
      <path
        d="M6 38 A 20 20 0 0 1 42 38"
        fill="none"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
      />
    ),
    dots: (
      <g fill={color}>
        {[10, 24, 38].map((x) =>
          [10, 24, 38].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" />),
        )}
      </g>
    ),
  };
  return (
    <svg viewBox="0 0 48 48" className={className} role="presentation" aria-hidden>
      {shapes[kind]}
    </svg>
  );
}

/* ── Scenes ────────────────────────────────────────────────────────────── */

/**
 * The hero scene: a broadcast studio on the valley floor, its signal carried
 * over the ridgelines to panels in three schools.
 */
export function ValleyBroadcastScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 780 540"
      className={className}
      role="presentation"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="vb-card" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fffdf8" />
          <stop offset="100%" stopColor="#f4f1ff" />
        </linearGradient>
        <linearGradient id="vb-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.violet} stopOpacity="0.42" />
          <stop offset="100%" stopColor={C.violet} stopOpacity="0.10" />
        </linearGradient>
        <linearGradient id="vb-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.sky} stopOpacity="0.55" />
          <stop offset="100%" stopColor={C.sky} stopOpacity="0.16" />
        </linearGradient>
        <linearGradient id="vb-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={C.sky} />
          <stop offset="100%" stopColor={C.violet} />
        </linearGradient>
      </defs>

      {/* The whole scene sits on a warm card, so it reads as an object */}
      <rect x="6" y="6" width="768" height="500" rx="40" fill="url(#vb-card)" />

      {/* Sun */}
      <circle cx="640" cy="118" r="40" fill={C.amber} className="anim-float" />
      <circle cx="640" cy="118" r="62" fill={C.amber} opacity="0.22" />

      {/* Ridgelines */}
      <path
        d="M6 268 L96 190 L146 226 L216 148 L284 222 L344 178 L400 242 L462 192 L530 254 L590 206 L654 256 L722 210 L774 252 L774 460 L6 460 Z"
        fill="url(#vb-far)"
      />
      <path d="M216 148 L190 176 L205 181 L219 171 L233 183 L248 173 Z" fill={C.white} opacity="0.85" />
      <path d="M96 190 L76 212 L89 216 L100 207 L112 217 L124 209 Z" fill={C.white} opacity="0.7" />
      <path
        d="M6 340 L102 284 L180 326 L268 274 L352 334 L444 288 L528 340 L622 292 L708 338 L774 302 L774 460 L6 460 Z"
        fill="url(#vb-near)"
      />

      {/* ── Studio ─────────────────────────────────────────────────── */}
      <g transform="translate(74 316)">
        {[0, 1.1, 2.2].map((d, i) => (
          <circle
            key={i}
            cx="38"
            cy="-6"
            r="34"
            fill="none"
            stroke={C.mint}
            strokeWidth="3"
            style={{
              transformBox: 'fill-box',
              transformOrigin: 'center',
              animation: `ping-ring 3.3s ${d}s ease-out infinite`,
            }}
          />
        ))}
        <rect x="4" y="10" width="68" height="52" rx="14" fill={C.b700} />
        <rect x="14" y="20" width="48" height="26" rx="7" fill={C.mint} />
        <rect x="34" y="-32" width="9" height="42" rx="4.5" fill={C.b700} />
        <circle cx="38" cy="-36" r="9" fill={C.mint} />
        <text x="38" y="82" textAnchor="middle" fill={C.b700} fontSize="14" fontWeight="800">
          Studio
        </text>
      </g>

      {/* ── Signal paths ───────────────────────────────────────────── */}
      {[
        'M150 312 C 250 216, 330 226, 382 282',
        'M150 316 C 310 250, 440 228, 540 274',
        'M150 322 C 350 322, 570 288, 676 300',
      ].map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={[C.coral, C.violet, C.mint][i]}
          strokeOpacity="0.85"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="9 13"
          style={{ animation: `dash-flow ${5 + i * 1.4}s linear infinite` }}
        />
      ))}

      {/* ── Schools ────────────────────────────────────────────────── */}
      {[
        { x: 344, y: 282, roof: C.coral },
        { x: 502, y: 274, roof: C.violet },
        { x: 640, y: 300, roof: C.mint },
      ].map((sc, i) => (
        <g key={i} transform={`translate(${sc.x} ${sc.y})`}>
          <rect x="0" y="20" width="86" height="70" rx="14" fill={C.white} />
          <path d="M-8 22 L43 -8 L94 22 Z" fill={sc.roof} />
          <rect x="41" y="-36" width="3" height="30" fill={C.b700} />
          <path d="M44 -34 L64 -27 L44 -20 Z" fill={C.amber} />
          <rect x="11" y="33" width="64" height="38" rx="7" fill="url(#vb-screen)" />
          <rect x="16" y="38" width="34" height="4" rx="2" fill={C.white} opacity="0.95" />
          <rect x="16" y="47" width="50" height="4" rx="2" fill={C.white} opacity="0.7" />
          <rect x="16" y="56" width="26" height="4" rx="2" fill={C.white} opacity="0.5" />
          {[22, 43, 64].map((cx) => (
            <circle key={cx} cx={cx} cy="82" r="6" fill={C.b600} />
          ))}
          <circle
            cx="78"
            cy="30"
            r="5"
            fill={C.mint}
            style={{ animation: `ping-ring 2.6s ${i * 0.5}s ease-out infinite` }}
          />
          <circle cx="78" cy="30" r="3.5" fill={C.mintDeep} />
        </g>
      ))}

      {/* Trees */}
      {[
        [226, 404],
        [284, 420],
        [470, 412],
        [606, 426],
        [724, 404],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <rect x="-3" y="0" width="6" height="24" rx="3" fill={C.b600} opacity="0.5" />
          <circle cx="0" cy="-10" r="17" fill={C.mint} opacity="0.85" />
          <circle cx="-11" cy="1" r="11" fill={C.mint} opacity="0.6" />
          <circle cx="11" cy="0" r="10" fill={C.mintDeep} opacity="0.35" />
        </g>
      ))}

      <path d="M6 436 Q 390 404 774 436 L774 506 L6 506 Z" fill={C.mint} opacity="0.16" />
    </svg>
  );
}

/** A teacher at the panel — bolder, for the "how it runs" band. */
export function ClassroomScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 420" className={className} role="presentation" aria-hidden>
      <defs>
        <linearGradient id="cs-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={C.b600} />
          <stop offset="100%" stopColor={C.violetDeep} />
        </linearGradient>
      </defs>

      <rect x="10" y="10" width="540" height="360" rx="36" fill={C.cream} />
      <circle cx="480" cy="76" r="46" fill={C.violet} opacity="0.25" className="anim-float" />
      <circle cx="64" cy="322" r="30" fill={C.coral} opacity="0.3" />

      <rect x="66" y="62" width="330" height="208" rx="20" fill="url(#cs-screen)" />
      {/* a lesson on screen */}
      <rect x="92" y="94" width="112" height="9" rx="4.5" fill={C.white} opacity="0.95" />
      <rect x="92" y="113" width="168" height="6" rx="3" fill={C.white} opacity="0.5" />
      {[
        [0, 52, C.coral],
        [34, 78, C.amber],
        [68, 40, C.sky],
        [102, 92, C.mint],
        [136, 64, C.violet],
      ].map(([dx, h, fill], i) => (
        <rect
          key={i}
          x={94 + Number(dx)}
          y={238 - Number(h)}
          width="22"
          height={Number(h)}
          rx="7"
          fill={String(fill)}
        />
      ))}
      <rect x="286" y="150" width="86" height="86" rx="18" fill={C.white} opacity="0.14" />
      <circle cx="329" cy="182" r="17" fill={C.white} opacity="0.6" />
      <rect x="303" y="208" width="52" height="7" rx="3.5" fill={C.white} opacity="0.4" />

      {/* LIVE pill */}
      <g transform="translate(318 78)">
        <rect x="0" y="0" width="66" height="26" rx="13" fill={C.coralDeep} />
        <circle cx="16" cy="13" r="5" fill={C.white}>
          <animate attributeName="opacity" values="1;0.2;1" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <text x="40" y="18" textAnchor="middle" fill={C.white} fontSize="12" fontWeight="800">
          LIVE
        </text>
      </g>

      {/* teacher */}
      <g transform="translate(432 166)">
        <circle cx="0" cy="0" r="24" fill={C.amber} />
        <path d="M-30 88 C -30 46, 30 46, 30 88 Z" fill={C.b600} />
      </g>

      {/* desks */}
      {[
        [110, 318, C.coral],
        [230, 318, C.sky],
        [350, 318, C.mint],
      ].map(([x, y, c], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <circle cx="0" cy="-18" r="15" fill={String(c)} />
          <rect x="-34" y="2" width="68" height="11" rx="5.5" fill={C.b600} opacity="0.25" />
        </g>
      ))}
    </svg>
  );
}

/** A soft wave, for meeting a full-bleed colour band. */
export function WaveDivider({
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
        d="M0 48 C 240 112, 480 0, 720 40 C 960 80, 1200 24, 1440 64 L1440 120 L0 120 Z"
        fill={fill}
      />
    </svg>
  );
}
