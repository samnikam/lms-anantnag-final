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
  b900: '#1b1a3d',
  coral: '#f2789f',
  mint: '#3bc9a0',
  sky: '#56b8e8',
  amber: '#f5a623',
  violet: '#8b7cf6',
  white: '#ffffff',
};

/**
 * The hero scene: a broadcast studio on the valley floor, its signal carried
 * over the ridgelines to panels in three schools.
 */
export function ValleyBroadcastScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 760 470"
      className={className}
      role="presentation"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="vb-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="vb-ridge-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.20" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="vb-ridge-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.10" />
        </linearGradient>
        <linearGradient id="vb-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={C.sky} />
          <stop offset="100%" stopColor={C.violet} />
        </linearGradient>
      </defs>

      {/* Sky wash and a low sun over the valley */}
      <rect width="760" height="470" fill="url(#vb-sky)" rx="24" />
      <circle cx="614" cy="96" r="34" fill={C.amber} opacity="0.55" className="anim-float" />
      <circle cx="614" cy="96" r="52" fill={C.amber} opacity="0.16" />

      {/* Ridgelines — the valley the division sits in */}
      <path
        d="M0 236 L86 168 L132 200 L198 132 L262 196 L318 158 L372 214 L430 170 L498 224 L556 182 L620 226 L688 186 L760 232 L760 470 L0 470 Z"
        fill="url(#vb-ridge-far)"
      />
      {/* Snow caps */}
      <path d="M198 132 L176 154 L188 158 L200 150 L212 160 L224 152 Z" fill={C.white} opacity="0.5" />
      <path d="M86 168 L70 186 L80 189 L90 182 L100 190 L110 183 Z" fill={C.white} opacity="0.38" />
      <path
        d="M0 306 L92 256 L164 292 L244 246 L322 300 L408 258 L486 306 L574 262 L654 304 L760 268 L760 470 L0 470 Z"
        fill="url(#vb-ridge-near)"
      />

      {/* ── The studio, left: signal origin ───────────────────────────── */}
      <g transform="translate(78 292)">
        {[0, 1.1, 2.2].map((d, i) => (
          <circle
            key={i}
            cx="34"
            cy="-4"
            r="30"
            fill="none"
            stroke={C.mint}
            strokeWidth="2"
            style={{
              transformBox: 'fill-box',
              transformOrigin: 'center',
              animation: `ping-ring 3.3s ${d}s ease-out infinite`,
            }}
          />
        ))}
        <rect x="4" y="8" width="60" height="46" rx="10" fill={C.white} opacity="0.95" />
        <rect x="12" y="16" width="44" height="24" rx="5" fill={C.b700} />
        <circle cx="34" cy="28" r="5" fill={C.mint} />
        <rect x="30" y="-26" width="8" height="34" rx="4" fill={C.white} opacity="0.9" />
        <circle cx="34" cy="-30" r="7" fill={C.mint} />
        <text x="34" y="70" textAnchor="middle" fill={C.white} fontSize="12" fontWeight="700" opacity="0.75">
          Studio
        </text>
      </g>

      {/* ── Signal paths to each school ───────────────────────────────── */}
      {[
        'M146 286 C 250 196, 320 208, 372 262',
        'M146 290 C 300 232, 430 210, 528 254',
        'M146 296 C 340 300, 560 268, 668 278',
      ].map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={C.white}
          strokeOpacity="0.55"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="7 11"
          style={{ animation: `dash-flow ${5 + i * 1.4}s linear infinite` }}
        />
      ))}

      {/* ── Three schools receiving, each with a panel ─────────────────── */}
      {[
        { x: 336, y: 262, s: 1, name: 'School' },
        { x: 492, y: 254, s: 0.9, name: 'School' },
        { x: 632, y: 278, s: 1.02, name: 'School' },
      ].map((sc, i) => (
        <g key={i} transform={`translate(${sc.x} ${sc.y}) scale(${sc.s})`}>
          {/* building */}
          <rect x="0" y="18" width="78" height="62" rx="9" fill={C.white} opacity="0.95" />
          <path d="M-6 20 L39 -6 L84 20 Z" fill={C.coral} opacity="0.92" />
          {/* a flag, because a school has one */}
          <rect x="38" y="-30" width="2.5" height="26" fill={C.white} opacity="0.8" />
          <path d="M40.5 -28 L58 -22 L40.5 -16 Z" fill={C.amber} />
          {/* the interactive panel inside */}
          <rect x="10" y="30" width="58" height="34" rx="5" fill="url(#vb-screen)" />
          <rect x="14" y="34" width="30" height="3.5" rx="1.75" fill={C.white} opacity="0.85" />
          <rect x="14" y="42" width="44" height="3.5" rx="1.75" fill={C.white} opacity="0.6" />
          <rect x="14" y="50" width="24" height="3.5" rx="1.75" fill={C.white} opacity="0.45" />
          {/* learners */}
          <circle cx="20" cy="74" r="5" fill={C.b800} opacity="0.75" />
          <circle cx="39" cy="74" r="5" fill={C.b800} opacity="0.75" />
          <circle cx="58" cy="74" r="5" fill={C.b800} opacity="0.75" />
          {/* live dot */}
          <circle
            cx="70"
            cy="26"
            r="4"
            fill={C.mint}
            style={{ animation: `ping-ring 2.6s ${i * 0.5}s ease-out infinite` }}
          />
          <circle cx="70" cy="26" r="3" fill={C.mint} />
        </g>
      ))}

      {/* Chinar-ish trees along the valley floor */}
      {[
        [214, 372],
        [268, 388],
        [452, 380],
        [592, 394],
        [706, 372],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`} opacity="0.5">
          <rect x="-2" y="0" width="4" height="20" rx="2" fill={C.white} opacity="0.7" />
          <circle cx="0" cy="-8" r="14" fill={C.mint} opacity="0.55" />
          <circle cx="-9" cy="0" r="9" fill={C.mint} opacity="0.4" />
          <circle cx="9" cy="-1" r="8" fill={C.mint} opacity="0.45" />
        </g>
      ))}

      {/* Valley floor */}
      <path d="M0 404 Q 380 372 760 404 L760 470 L0 470 Z" fill={C.white} opacity="0.10" />
    </svg>
  );
}

/** A teacher at the panel — used beside the "how it runs" copy. */
export function ClassroomScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 380" className={className} role="presentation" aria-hidden>
      <defs>
        <linearGradient id="cs-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={C.b600} />
          <stop offset="100%" stopColor={C.b800} />
        </linearGradient>
      </defs>

      <rect x="24" y="24" width="472" height="300" rx="22" fill="#eef0fa" />
      <circle cx="440" cy="70" r="40" fill={C.violet} opacity="0.16" className="anim-float" />

      {/* the panel */}
      <rect x="70" y="62" width="300" height="186" rx="14" fill="url(#cs-screen)" />
      <rect x="86" y="80" width="268" height="150" rx="8" fill={C.white} opacity="0.06" />
      {/* a lesson on screen: a chart and some lines */}
      <rect x="104" y="100" width="96" height="7" rx="3.5" fill={C.white} opacity="0.9" />
      <rect x="104" y="116" width="150" height="5" rx="2.5" fill={C.white} opacity="0.45" />
      {[
        [0, 44, C.coral],
        [30, 66, C.amber],
        [60, 34, C.sky],
        [90, 78, C.mint],
        [120, 56, C.violet],
      ].map(([dx, h, fill], i) => (
        <rect
          key={i}
          x={106 + Number(dx)}
          y={214 - Number(h)}
          width="18"
          height={Number(h)}
          rx="5"
          fill={String(fill)}
          opacity="0.95"
        />
      ))}
      <rect x="268" y="138" width="72" height="72" rx="12" fill={C.white} opacity="0.12" />
      <circle cx="304" cy="166" r="14" fill={C.white} opacity="0.5" />
      <rect x="282" y="188" width="44" height="6" rx="3" fill={C.white} opacity="0.35" />

      {/* live pill */}
      <g transform="translate(300 74)">
        <rect x="0" y="0" width="58" height="22" rx="11" fill={C.coral} />
        <circle cx="14" cy="11" r="4" fill={C.white}>
          <animate attributeName="opacity" values="1;0.25;1" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <text x="34" y="15" textAnchor="middle" fill={C.white} fontSize="10" fontWeight="800">
          LIVE
        </text>
      </g>

      {/* teacher */}
      <g transform="translate(396 150)">
        <circle cx="0" cy="0" r="20" fill={C.amber} opacity="0.9" />
        <path d="M-26 76 C -26 40, 26 40, 26 76 Z" fill={C.b600} />
      </g>

      {/* desks */}
      {[
        [104, 282],
        [212, 282],
        [320, 282],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <circle cx="0" cy="-16" r="13" fill={C.b700} opacity="0.85" />
          <rect x="-30" y="0" width="60" height="10" rx="5" fill={C.b500} opacity="0.35" />
        </g>
      ))}
    </svg>
  );
}

/** A soft dotted field, laid behind a section to stop it reading flat. */
export function DotField({ className }: { className?: string }) {
  return (
    <svg className={className} role="presentation" aria-hidden>
      <defs>
        <pattern id="dotfield" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.6" fill={C.b500} opacity="0.16" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dotfield)" />
    </svg>
  );
}

/** Ridgeline divider, so sections meet on a valley silhouette. */
export function RidgeDivider({
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
      viewBox="0 0 1440 110"
      className={className}
      role="presentation"
      aria-hidden
      preserveAspectRatio="none"
      style={flip ? { transform: 'scaleY(-1)' } : undefined}
    >
      <path
        d="M0 62 L120 30 L214 60 L318 18 L430 66 L534 34 L646 72 L764 38 L880 74 L994 40 L1106 70 L1218 36 L1330 66 L1440 34 L1440 110 L0 110 Z"
        fill={fill}
      />
    </svg>
  );
}
