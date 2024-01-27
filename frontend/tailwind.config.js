/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3bb19b",
        secondary: "#f5f5f5",
        mintPrimary: "#28747a",
        darkPrimary: "#22675b",
      },
      backgroundImage: {
        backgroundPhoto: 'url("/background-image-2.jpg")',
      },
    },
  },
  plugins: [],
};
