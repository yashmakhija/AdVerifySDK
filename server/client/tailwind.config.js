/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0b10',
        surface: '#12141d',
        surface2: '#1a1d2b',
        border: '#252836',
        text: '#e8eaf0',
        text2: '#7c809a',
        primary: '#635bff',
        'primary-hover': '#7a73ff',
        success: '#00d4aa',
        danger: '#ff5c5c',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['SF Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
