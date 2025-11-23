import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#CC232A", // Crimson Red (Action)
          dark: "#A00D25",
        },
        navy: {
          DEFAULT: "#1A1A40", // Dominant Navy
          light: "#2A2A55",
        },
        gold: {
          DEFAULT: "#CC9902", // Luxury Accent
          light: "#E5B80B",
        },
        background: "#FFFFFF", // Canvas White
        "page-background": "#F8F9FA",
        text: {
          DEFAULT: "#1A1A40", // Navy for text
          muted: "#64748B",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"], // Added Serif
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
