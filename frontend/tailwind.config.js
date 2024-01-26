/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#146C94",
        secondary: "#19A7CE",
        tertiary: "#F6F1F1",
        fourth: "#000000",
      },
      backgroundImage: {
        "backgroundPhoto": 'url("./public/background-image-2.jpg")',
      },
    },
  },
  plugins: [],
};