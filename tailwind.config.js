/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkGray: "#1B1F1C",
        brightGreen: "#2BB52A",
        blackish: "#0A0A0B",
        lightWhite: "#D6D9D7",
        lightGray: "#424343",
      },
    },
  },
  plugins: [],
};
