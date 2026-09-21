/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* A light blue-white ground, the way a school prospectus is printed:
           the page itself is never quite white. */
        paper: '#f7fafd',
        surface: '#ffffff',
        ink: { DEFAULT: '#33302f', soft: '#4d4a48' },
        slate: {
          ...{ 50: '#f6f9fc', 100: '#eef3f9', 200: '#e3eaf3', 300: '#c8d4e4' },
          400: '#93a1b8',
          500: '#5c6b85',
          600: '#4d5c77',
          700: '#44557a',
          800: '#24345a',
          900: '#16233f',
        },
        muted: '#5c6b85',
        faint: '#93a1b8',
        rule: '#e3eaf3',
        // Reserved for the two things a record can be: sealed, or attained.
        seal: '#c0392b',
        attained: '#1a7a4a',
        /* Navy carries the institution — masthead, footers, headings and
           every solid button. */
        brand: {
          50: '#eef1f9',
          100: '#dbe1f3',
          200: '#b9c4e6',
          300: '#8c9dd3',
          400: '#5d74bd',
          500: '#3a52a6',
          600: '#2a4499',
          700: '#203a8f',
          800: '#182c6e',
          900: '#101e4d',
        },
        /* Bright blue and fresh green do the accent work, gold and orange
           the warmth. The names are unchanged so no markup had to move. */
        accent: {
          sky: { DEFAULT: '#4a90d9', deep: '#15538f', soft: '#e8f2fb' },
          mint: { DEFAULT: '#2f9e63', deep: '#167a4a', soft: '#e3f5ea' },
          amber: { DEFAULT: '#f18723', deep: '#b34a00', soft: '#ffe9d3' },
          violet: { DEFAULT: '#2a8a9e', deep: '#125565', soft: '#e4f2f5' },
          coral: { DEFAULT: '#ec6607', deep: '#b34a00', soft: '#fdeadb' },
        },
        // The soft tints those accents sit on inside icon tiles.
        tint: {
          coral: '#fdeadb',
          mint: '#e3f5ea',
          sky: '#e8f2fb',
          amber: '#ffe9d3',
          violet: '#e4f2f5',
          brand: '#eef1f9',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Headings share the display face. Kept under the `serif` key so the
        // existing `font-serif` headings pick the new face up untouched.
        serif: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '10px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
      },
      boxShadow: {
        // Depth is carried by soft, wide light rather than by a hard edge.
        sm: '0 1px 2px rgba(16, 38, 87, 0.05)',
        DEFAULT: '0 1px 2px rgba(16, 38, 87, 0.05), 0 6px 16px -8px rgba(16, 38, 87, 0.12)',
        md: '0 2px 4px rgba(16, 38, 87, 0.05), 0 10px 24px -10px rgba(16, 38, 87, 0.16)',
        lg: '0 4px 8px rgba(16, 38, 87, 0.06), 0 18px 40px -14px rgba(16, 38, 87, 0.20)',
        xl: '0 8px 16px rgba(16, 38, 87, 0.07), 0 30px 60px -20px rgba(16, 38, 87, 0.24)',
        pill: '0 6px 16px -6px rgba(22, 53, 126, 0.42)',
        none: 'none',
      },
    },
  },
  plugins: [],
};
