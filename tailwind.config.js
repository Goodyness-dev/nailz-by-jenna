/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        linen: {
          50: '#FDFBF7',
          100: '#F7F4EF',
          200: '#F1EADF',
          300: '#E8DFC8',
          400: '#D5C4A1',
          500: '#C2A87A',
        },
        blushGold: {
          light: '#f4e8dc',
          DEFAULT: '#c59b6d',
          hover: '#b58855',
          dark: '#936a39',
        },
        obsidian: {
          pure: '#000000',
          DEFAULT: '#0e0e0e',
          card: '#161616',
          cardHover: '#1f1f1f',
          border: '#2a2a2a',
          subtle: '#333333',
        },
        roseGold: {
          light: '#fcebe6',
          DEFAULT: '#e2bca4',
          dark: '#c49a80',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Italianno"', '"Playfair Display"', 'cursive'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}