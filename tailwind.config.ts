import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gradientFrom: "var(--gradient-from)", // Gradient start color
        gradientTo: "var(--gradient-to)",   // Gradient end color
      },
      fontFamily: {
        sans: ["Poppins", "Arial", "sans-serif"], // Default sans-serif fonts
        mono: ["Courier New", "monospace"],      // Mono fonts for code blocks
      },
      spacing: {
        18: "4.5rem", // Custom spacing (optional)
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
      screens: {
        xs: "480px", // Custom breakpoint for extra small screens
      },
    },
  },
  plugins: [],
} satisfies Config;