/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // A soft, lit workspace: content floats on a tinted canvas.
        paper: '#f5f6fb',
        surface: '#ffffff',
        ink: { DEFAULT: '#1b1d3a', soft: '#4b4e6d' },
        slate: {
          ...{ 50: '#f7f8fc', 100: '#f0f1f8', 200: '#e6e7f2', 300: '#cfd1e2' },
          400: '#a0a3bd',
          500: '#71748f',
          600: '#5a5d7a',
          700: '#4b4e6d',
          800: '#2c2e4f',
          900: '#1b1d3a',
        },
        muted: '#71748f',
        faint: '#a0a3bd',
        rule: '#ececf4',
        // Reserved for the two things a record can be: sealed, or attained.
        seal: '#e5537b',
        attained: '#1eab8a',
        // The primary voice of the interface — a deep indigo.
        brand: {
          50: '#f2f2fb',
          100: '#e7e6f7',
          200: '#cfcded',
          300: '#a5a1d5',
          400: '#7873b8',
          500: '#514c99',
          600: '#3d3a8c',
          700: '#2f2c6e',
          800: '#25234f',
          900: '#1b1a3d',
        },
        // Pastel accents, used to tell categories apart at a glance.
        accent: {
          coral: '#f2789f',
          mint: '#3bc9a0',
          sky: '#56b8e8',
          amber: '#f5a623',
          violet: '#8b7cf6',
        },
        // The soft tints those accents sit on inside icon tiles.
        tint: {
          coral: '#fdeef3',
          mint: '#e6f8f2',
          sky: '#e8f5fd',
          amber: '#fef4e4',
          violet: '#f0edfe',
          brand: '#eeedf9',
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
        sm: '0 1px 2px rgba(27, 29, 58, 0.04)',
        DEFAULT: '0 1px 2px rgba(27, 29, 58, 0.04), 0 6px 16px -8px rgba(27, 29, 58, 0.10)',
        md: '0 2px 4px rgba(27, 29, 58, 0.04), 0 10px 24px -10px rgba(27, 29, 58, 0.14)',
        lg: '0 4px 8px rgba(27, 29, 58, 0.05), 0 18px 40px -14px rgba(27, 29, 58, 0.18)',
        xl: '0 8px 16px rgba(27, 29, 58, 0.06), 0 30px 60px -20px rgba(27, 29, 58, 0.22)',
        pill: '0 6px 16px -6px rgba(47, 44, 110, 0.45)',
        none: 'none',
      },
    },
  },
  plugins: [],
};
