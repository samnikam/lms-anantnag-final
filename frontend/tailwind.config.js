/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // An official-record palette: paper, ink, and a rule between them.
        paper: '#fbfbfa',
        surface: '#ffffff',
        ink: { DEFAULT: '#101828', soft: '#344054' },
        slate: {
          ...{ 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1' },
          400: '#98a2b3',
          500: '#667085',
          600: '#475467',
          700: '#344054',
          800: '#1d2939',
          900: '#101828',
        },
        muted: '#667085',
        faint: '#98a2b3',
        rule: '#e4e7ec',
        // Reserved for the two things a record can be: sealed, or attained.
        seal: '#9b2c2c',
        attained: '#12705b',
        brand: {
          50: '#f2f4f7',
          100: '#e4e7ec',
          200: '#d0d5dd',
          300: '#98a2b3',
          400: '#667085',
          500: '#475467',
          600: '#344054',
          700: '#101828',
          800: '#101828',
          900: '#101828',
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"IBM Plex Serif"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        // A record has corners, not pills.
        DEFAULT: '2px',
        md: '2px',
        lg: '2px',
        xl: '2px',
      },
      boxShadow: {
        // Nothing floats. Depth is carried by rules, not by shadow.
        none: 'none',
        sm: 'none',
        DEFAULT: 'none',
        md: 'none',
        lg: 'none',
        xl: 'none',
      },
    },
  },
  plugins: [],
};
