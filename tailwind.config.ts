import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#09090b',
        card: '#101015',
        neon: '#43ffd1',
        neon2: '#8b5cf6'
      },
      boxShadow: { glow: '0 0 30px rgba(67,255,209,.25)' }
    }
  },
  plugins: []
} satisfies Config;
