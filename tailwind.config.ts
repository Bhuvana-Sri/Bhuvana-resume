import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Jost Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
        serif: [
          '"Cormorant Garamond Variable"',
          "ui-serif",
          "Georgia",
          "serif",
        ],
        code: ['"JetBrains Mono Variable"', "ui-monospace", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        "border-strong": "hsl(var(--border-strong))",
        background: "hsl(var(--background))",
        elevated: "hsl(var(--elevated))",
        foreground: "hsl(var(--foreground))",
        subtle: "hsl(var(--subtle))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
      },
    },
  },
} satisfies Config;
