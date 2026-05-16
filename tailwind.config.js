/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070809",
        graphite: "#0d0f12",
        steel: "#15181d",
        silver: "#c9ced6",
        glow: "#5aa9ff",
        gold: "#d6b56a",
      },
      fontFamily: {
        display: ['"Inter"', "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(ellipse at top, rgba(90,169,255,0.18), transparent 60%)",
        "gold-grad":
          "linear-gradient(135deg, #f4e4b3 0%, #d6b56a 45%, #8a6a2e 100%)",
      },
    },
  },
  plugins: [],
};
