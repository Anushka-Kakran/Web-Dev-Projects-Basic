/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",           
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        // Custom branding colors
        primary: {
          light: '#60a5fa', // blue-400
          DEFAULT: '#2563eb', // blue-600
          dark: '#1e40af', // blue-800
        },
        secondary: {
          light: '#f472b6', // pink-400
          DEFAULT: '#db2777', // pink-600
          dark: '#9d174d', // pink-800
        },
        accent: '#f59e0b', // amber-500
        success: '#10b981', // emerald-500
        danger: '#ef4444', // red-500
        background: '#f8fafc', // slate-50
        surface: '#ffffff', // white
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
