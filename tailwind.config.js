/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff4e00", // orange
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), require("tailwindcss-animate")],
};
