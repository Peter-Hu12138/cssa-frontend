import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

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
        "mist-white": "#F4F7F6", // Added Mist White
          background: "#F4F7F6", // Canvas White base
          canvas: "#F4F7F6",
          "page-background": "#F4F7F6",
        text: {
          DEFAULT: "#1A1A40", // Navy for text
          muted: "#64748B",
        },
          boundless: "#007FA3",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"], // Added Serif
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [typography],
};
export default config;
