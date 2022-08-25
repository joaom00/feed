const { fontFamily } = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...fontFamily.sans]
      },
      colors: {
        gray: {
          1: '#121214',
          2: '#202024',
          3: '#323238',
          4: '#7C7C8A',
          5: '#8D8D99',
          6: '#C4C4CC',
          7: '#E1E1E6'
        },
        red: {
          danger: '#F75A68'
        },
        brand: {
          green: '#00875F',
          'green-light': '#00B37E'
        }
      },
      gridTemplateColumns: {
        main: '256px 1fr'
      },
      gridTemplateRows: {
        profile: '72px 1fr'
      }
    }
  },
  plugins: []
};
