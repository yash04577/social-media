/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'yellow': '#f5c32c',
      'orange': '#fca61f',
      'black': '#242d49',
      'gray': 'rgba(36, 45, 73, 0.65)',
      'profileShadow': '0px 4px 17px 2px rgba(0, 0, 0, 0.25)',
      'hrColor': '#cfcdcd',
      'cardColor': 'rgba(255, 255, 255, 0.64)',
      'buttonBg': 'linear-gradient(98.63deg, #f9a225 0%, #f95f35 100%)',
      'inputColor': 'rgba(40, 52, 62, 0.07)',
      'photo': '#4CB256',
      'video': '#4A4EB7',
      'location': '#EF5757',
      'shedule': '#E1AE4A'
    },
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }
    }
  },
  plugins: [],
}


// body{
//   font-family: 'Inter', sans-serif;
// }
