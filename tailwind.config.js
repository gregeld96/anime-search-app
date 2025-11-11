/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#9d25f4",
          "background-light": "#f7f5f8",
          "background-dark": "#1a1022",
        },
        fontFamily: {
          display: ["Be Vietnam Pro", "sans-serif"],
        },
        borderRadius: {
          DEFAULT: "0.25rem",
          lg: "0.5rem",
          xl: "0.75rem",
          full: "9999px",
        },
      },
    },
    plugins: [],
  };
  