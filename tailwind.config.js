/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#0a0a0a',
          900: '#121212',
          850: '#181818',
          800: '#202020',
          700: '#2e2e2e',
          600: '#404040',
        },
        cream: {
          DEFAULT: '#F6F3EC',
          50: '#FCFBF9',
          100: '#F6F3EC',
          200: '#EDE7DC',
          300: '#DFD6C5',
          400: '#CEC1AB',
        },
        paper: {
          light: '#F5F1E8',
          DEFAULT: '#ECE5D8',
          dark: '#DDD4C3',
          distressed: '#D2C7B2',
        },
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['"DM Serif Display"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', '"DM Serif Display"', 'Georgia', 'serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
