/** @type {import('tailwindcss').Config} */
export default {
   darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors:{
        basicRed:"#DB4444",
        basicGreen:"#00FF66",
        darkPrimary:"hsl(235, 21%, 11%)",
        darkSecondary:"hsl(235, 24%, 19%)",
        lightSecondary:"#F5F5F5",
      },
    
    },
  },
  plugins: [],
}