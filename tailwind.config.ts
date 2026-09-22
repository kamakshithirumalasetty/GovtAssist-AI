import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
          DEFAULT: "#1e40af",
          light: "#3b82f6",
          dark: "#1e3a8a",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#0f766e",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#f59e0b",
          foreground: "#ffffff",
        },
        gov: {
          blue: "#0284c7",
          navy: "#0f172a",
          gold: "#d97706",
          light: "#f8fafc",
          slate: "#334155",
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};
export default config;
