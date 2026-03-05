/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Assistant", "sans-serif"],
        barlev: ["Barlev", "sans-serif"],
      },
      colors: {
        navy: {
          900: "#0a0e1a",
          800: "#0f1629",
          700: "#151d35",
          600: "#1c2642",
        },
        gold: {
          400: "#f0c850",
          500: "#d4a832",
          600: "#b8922a",
        },
        accent: {
          red: "#c8102e",
        },
      },
    },
  },
  plugins: [],
};
