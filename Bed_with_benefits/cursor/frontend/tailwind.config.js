/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff5f7',
          100: '#ffe4ea',
          500: '#ff3b6a',
          600: '#e02854',
          700: '#b81f45'
        }
      },
      boxShadow: {
        card: '0 20px 40px rgba(15, 23, 42, 0.15)'
      }
    }
  },
  plugins: []
};
