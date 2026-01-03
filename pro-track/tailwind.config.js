/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        // Custom branding colors
        brand: {
          light: '#3b82f6', // Bright Blue
          DEFAULT: '#1e40af', // Deep Blue
          dark: '#1e3a8a', // Navy
        },
        surface: {
          50: '#f8fafc', 
          100: '#f1f5f9',
          200: '#e2e8f0',
        }
      },
    },
  },
  plugins: [],
};