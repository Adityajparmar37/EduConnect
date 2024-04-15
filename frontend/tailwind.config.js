/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3bb19b",
        secondary: "#f5f5f5",
        mintPrimary: "#89d0c3",
        darkPrimary: "#22675b",
        loadingCol: "#e90c59",
        WhiteLoading: "rgb(255, 255, 255, 0.918)",
      },
      backgroundImage: {
        backgroundPhoto: 'url("/background-image-2.jpg")',
      },
    },
  },
  plugins: [],
};
