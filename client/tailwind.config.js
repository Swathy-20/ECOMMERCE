// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
    },
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'], // ✅ custom font
      },
    },
  },
  plugins: [],
}
