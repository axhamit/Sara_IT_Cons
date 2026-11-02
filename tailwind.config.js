/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0F1A3D", soft: "#44507A" },
        paper: "#F5F7FB",
        cobalt: { DEFAULT: "#2B4BFF", dark: "#1B33CC" },
        teal: { DEFAULT: "#0FB5A5" },
        amber: { DEFAULT: "#FFB84D" },
        line: "#DDE3F0",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      keyframes: {
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        step: { "0%": { opacity: 0, transform: "translateY(8px)" }, "100%": { opacity: 1, transform: "none" } },
      },
      animation: { marquee: "marquee 40s linear infinite", step: "step .55s ease-out both" },
    },
  },
  plugins: [],
};
