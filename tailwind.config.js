const { fontFamily } = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/icons/**/*.{js,ts,jsx,tsx}'
  ],
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
        'profile-aside': '72px 1fr',
        profile: '164px 1fr'
      },
      keyframes: {
        overlayShow: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        contentShow: {
          '0%': { opacity: '0', transform: 'translate(-50%, -48%) scale(.96)' },
          '100%': { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' }
        },
        slideDownAndFade: {
          '0%': { transform: 'translateY(-15px)' },
          '100%': { transform: 'translateY(0)' }
        }
      },
      animation: {
        overlayShow: 'overlayShow 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)'
      }
    }
  },
  plugins: []
};
