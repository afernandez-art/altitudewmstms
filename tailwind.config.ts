import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#06b6d4",
        "primary-hover": "#0891b2",
        success: "#22c55e",
        warning: "#f59e0b",
        danger: "#ef4444",
        "surface-dark": "#1e293b",
        "background-dark": "#0f172a",
        "border-dark": "#334155",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;