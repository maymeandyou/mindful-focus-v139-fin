import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "system-ui", "sans-serif"],
        body: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
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
        // v49 Exact Color Palette
        sage: {
          DEFAULT: "#DDE5D4",
          50: "#f4f6f2",
          100: "#e8ebe4",
          200: "#DDE5D4",
          300: "#c5d1b8",
          400: "#a8b896",
          500: "#8fa077",
          600: "#738660",
          700: "#5d6d4f",
          800: "#4d5a42",
          900: "#424c39",
        },
        rose: {
          DEFAULT: "#F2D6D3",
          50: "#fdf5f4",
          100: "#fbeae8",
          200: "#F2D6D3",
          300: "#eab5b0",
          400: "#de8e86",
          500: "#d06b61",
          600: "#bc4f44",
          700: "#9d3f36",
          800: "#833530",
          900: "#6f302d",
        },
        amber: {
          DEFAULT: "#F9E6C3",
          50: "#fefbf0",
          100: "#fdf4d9",
          200: "#F9E6C3",
          300: "#f4d085",
          400: "#eeb347",
          500: "#e89b1f",
          600: "#d37e15",
          700: "#af5f14",
          800: "#8e4a17",
          900: "#743d16",
        },
        taupe: {
          DEFAULT: "#E9E3DF",
          50: "#f9f7f5",
          100: "#f2ede9",
          200: "#E9E3DF",
          300: "#d8cdc5",
          400: "#c4b3a6",
          500: "#b09a88",
          600: "#9d8370",
          700: "#836b5c",
          800: "#6d594e",
          900: "#5a4a42",
        },
        blue: {
          DEFAULT: "#DCE7EC",
          50: "#f4f8fa",
          100: "#e8f0f4",
          200: "#DCE7EC",
          300: "#bdd4dd",
          400: "#98bac9",
          500: "#7ba2b7",
          600: "#6689a4",
          700: "#587394",
          800: "#4d607a",
          900: "#425064",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
