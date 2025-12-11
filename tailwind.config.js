import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // .dark class’ı ile kontrol
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "var(--color-brand)",
          soft: "var(--color-brand-soft)",
          strong: "var(--color-brand-strong)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          soft: "var(--color-accent-soft)",
        },
        ink: {
          DEFAULT: "var(--color-ink)",
          soft: "var(--color-ink-soft)",
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          soft: "var(--color-surface-soft)",
        },
        border: {
          DEFAULT: "var(--color-border)",
          soft: "var(--color-border-soft)",
        },
        textc: {
          DEFAULT: "var(--color-text)",
          soft: "var(--color-text-soft)",
        },
        bgc: "var(--color-bg)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        pill: "var(--radius-pill)",
      },
    },
  },
  plugins: [],
};

export default config;
