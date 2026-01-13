import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#135bec",
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#135bec",
          600: "#1048c4",
          700: "#0d369c",
          800: "#0a2474",
          900: "#07124c",
        },
        background: {
          light: "#f6f6f8",
          dark: "#101622",
          darker: "#0b0f1a",
        },
        surface: {
          light: "#ffffff",
          dark: "#1a2233",
          darker: "#131b2d",
        },
        border: {
          light: "#e2e8f0",
          dark: "#232f48",
          darker: "#1e293b",
        },
        text: {
          muted: "#92a4c9",
        },
        status: {
          expected: "#135bec",
          dock: "#facc15",
          unloading: "#fb923c",
          received: "#4ade80",
          closed: "#22c55e",
          blocked: "#ef4444",
          available: "#10b981",
          committed: "#f59e0b",
          pending: "#6366f1",
          picking: "#8b5cf6",
          packing: "#ec4899",
          ready: "#14b8a6",
          dispatched: "#06b6d4",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
      },
      boxShadow: {
        primary: "0 4px 14px 0 rgba(19, 91, 236, 0.25)",
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;