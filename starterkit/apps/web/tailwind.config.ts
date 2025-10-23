import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"]
      },
      colors: {
        surface: {
          base: "var(--color-surface-base)",
          card: "var(--color-surface-card)"
        },
        text: {
          primary: "var(--color-text-primary)",
          subtle: "var(--color-text-subtle)"
        },
        accent: {
          DEFAULT: "var(--color-accent-primary)",
          strong: "var(--color-accent-strong)"
        }
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)"
      },
      spacing: {
        gap: "var(--space-gap)",
        layout: "var(--space-layout)"
      }
    }
  },
  plugins: [animatePlugin]
};

export default config;
