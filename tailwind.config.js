/** @type {import('tailwindcss').Config} */
// Design tokens map to the official Xebia brand palette (single source of truth).
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        night: {
          bg: "#1b1b1d", // page background (dark)
          surface: "#242426", // cards / panels (dark)
          line: "#3a3a3d", // borders (dark)
        },
        velvet: {
          DEFAULT: "#6C1D5F", // Tranquil Velvet
          dark: "#4A1E47", // Tranquil Velvet Dark
          bright: "#84117C", // Bright Tr. Velvet
          soft: "#EDEAF4",
        },
        emerald: { brand: "#01AC9F" },
        cta: { orange: "#FF6200" },
        ink: "#241026",
        muted: "#5A5A5A",
        line: "#DADCEA",
        canvas: "#F7F8FC",
      },
      fontFamily: {
        // Professional geometric sans for all content.
        sans: ["'Plus Jakarta Sans'", "system-ui", "-apple-system", "sans-serif"],
        // Serif reserved for italic display accents (e.g. "Boundaries").
        serif: ["'PT Serif'", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 10px 30px rgba(108, 29, 95, 0.10)",
        panel: "0 20px 60px rgba(36, 16, 38, 0.25)",
      },
      keyframes: {
        "fade-in": { from: { opacity: 0 }, to: { opacity: 1 } },
      },
      animation: { "fade-in": "fade-in 0.4s ease both" },
    },
  },
  plugins: [],
};
