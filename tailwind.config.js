/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Vazirmatn', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          950: '#03060f',
          900: '#060b1a',
          850: '#0a1226',
          800: '#0e1730',
          750: '#121d3d',
          700: '#172547',
          600: '#1f3160',
          500: '#2a4080',
        },
        azure: {
          50: '#eaf3ff',
          100: '#cfe0ff',
          200: '#a3c2ff',
          300: '#6fa0ff',
          400: '#3d7df0',
          500: '#1d5fe0',
          600: '#1349b8',
          700: '#0f3790',
          800: '#0b2768',
          900: '#071944',
        },
        accent: {
          cyan: '#22d3ee',
          gold: '#fbbf24',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(34,211,238,0.25), 0 8px 30px -8px rgba(29,95,224,0.55)',
        card: '0 10px 30px -12px rgba(0,0,0,0.7)',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        pulseGlow: {
          '0%,100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
