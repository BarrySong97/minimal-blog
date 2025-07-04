import type { Config } from "tailwindcss";
import motion from "tailwindcss-motion";
import typo from "@tailwindcss/typography";
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./blocks/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "move-background": "move-background 20s linear infinite",
        "slow-spin": "slow-spin 20s linear infinite",
        "float-dust": "float-dust 10s ease-in-out infinite",
        "fade-in": "fade-in 0.5s ease-out forwards",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(2deg)" },
          "75%": { transform: "rotate(-2deg)" },
        },
        "move-background": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "20px 20px" },
        },
        "slow-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "float-dust": {
          "0%, 100%": {
            transform: "translate(0, 0) rotate(0deg)",
            opacity: "0",
          },
          "25%": {
            transform: "translate(10px, 10px) rotate(5deg)",
            opacity: "1",
          },
          "50%": {
            transform: "translate(-5px, 20px) rotate(-5deg)",
            opacity: "0.8",
          },
          "75%": {
            transform: "translate(-10px, 15px) rotate(0deg)",
            opacity: "0.6",
          },
        },
      },
    },
  },
  plugins: [motion, typo],
} satisfies Config;
