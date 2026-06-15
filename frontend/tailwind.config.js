/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Dark slate family — background is rgb(67,81,94) = #43515e
        brand: {
          950: '#0e1519',
          900: '#151f26',
          800: '#1c2a33',
          700: '#243340',
          600: '#2d3e4c',
          500: '#43515e', // given bg color — used for borders/dividers
          400: '#5a6e7d',
        },
        // Teal — primary accent from logo
        teal: {
          300: '#5dd8df',
          400: '#2dc5cd',
          500: '#1aabb3',
          600: '#148e96',
          700: '#0e7178',
        },
        // Lime green — secondary accent from logo
        lime: {
          400: '#bfe040',
          500: '#9dc922',
          600: '#7ea81b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-delay': 'float 10s ease-in-out 2s infinite',
        'float-slow': 'float 12s ease-in-out 4s infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-24px) scale(1.05)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
