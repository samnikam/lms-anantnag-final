/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* A warm, institutional ground: ivory paper and a near-black with a
           faint green cast, so nothing on the page reads cold or corporate. */
        paper: '#f5f7f4',
        surface: '#ffffff',
        ink: { DEFAULT: '#1b2420', soft: '#4a574f' },
        slate: {
          ...{ 50: '#f7f9f7', 100: '#eff2ef', 200: '#e4e9e4', 300: '#cbd3cc' },
          400: '#9aa39c',
          500: '#66726b',
          600: '#57635b',
          700: '#4a574f',
          800: '#2b3630',
          900: '#1b2420',
        },
        muted: '#66726b',
        faint: '#9aa39c',
        rule: '#e4e9e4',
        // Reserved for the two things a record can be: sealed, or attained.
        seal: '#b3402f',
        attained: '#1d7a57',
        /* The primary voice: a deep forest green, the colour Indian state
           education bodies most often use where a department is not blue. */
        brand: {
          50: '#f2f8f5',
          100: '#ddeee5',
          200: '#b9dcca',
          300: '#86c3a6',
          400: '#4f9f7c',
          500: '#2d8060',
          600: '#1e654b',
          700: '#154e3a',
          800: '#0f3a2b',
          900: '#0a2a1f',
        },
        /* The accent family, kept under the same names so no markup changes,
           but re-tinted earthier: gold, terracotta, sage, teal and plum in
           place of the amber, pink, mint, sky and violet they began as. */
        accent: {
          coral: { DEFAULT: '#d1714f', deep: '#a34527', soft: '#fbeee7' },
          mint: { DEFAULT: '#4aa17c', deep: '#1d6a4c', soft: '#e6f2ec' },
          sky: { DEFAULT: '#4f9aa8', deep: '#17616f', soft: '#e7f1f3' },
          amber: { DEFAULT: '#d9a52c', deep: '#8f6608', soft: '#fbf2dc' },
          violet: { DEFAULT: '#8c6a9e', deep: '#5d3f6e', soft: '#f1ebf4' },
        },
        // The soft tints those accents sit on inside icon tiles.
        tint: {
          coral: '#fbeee7',
          mint: '#e6f2ec',
          sky: '#e7f1f3',
          amber: '#fbf2dc',
          violet: '#f1ebf4',
          brand: '#e9f2ed',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Headings share the display face. Kept under the `serif` key so the
        // existing `font-serif` headings pick the new face up untouched.
        serif: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
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
        sm: '0 1px 2px rgba(15, 42, 31, 0.05)',
        DEFAULT: '0 1px 2px rgba(15, 42, 31, 0.05), 0 6px 16px -8px rgba(15, 42, 31, 0.12)',
        md: '0 2px 4px rgba(15, 42, 31, 0.05), 0 10px 24px -10px rgba(15, 42, 31, 0.16)',
        lg: '0 4px 8px rgba(15, 42, 31, 0.06), 0 18px 40px -14px rgba(15, 42, 31, 0.20)',
        xl: '0 8px 16px rgba(15, 42, 31, 0.07), 0 30px 60px -20px rgba(15, 42, 31, 0.24)',
        pill: '0 6px 16px -6px rgba(21, 78, 58, 0.42)',
        none: 'none',
      },
    },
  },
  plugins: [],
};
