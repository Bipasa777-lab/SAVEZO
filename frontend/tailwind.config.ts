import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class", // ✅ cleaner than ["class"]

  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],

  theme: {
    extend: {

      /* ===== COLORS USING CSS VARIABLES ===== */
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        card: "hsl(var(--card))",
        muted: "hsl(var(--muted))",

        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        accent: "hsl(var(--accent))",

        safe: "#10b981",
        warning: "#f59e0b",
        danger: "#ef4444",
      },

      /* ===== BORDER RADIUS ===== */
      borderRadius: {
        xl: "16px",
        lg: "12px",
        md: "10px",
      },

      /* ===== SHADOWS ===== */
      boxShadow: {
        glow: "0 0 40px rgba(59,130,246,0.15)",
        card: "0 8px 32px rgba(0,0,0,0.4)",
      },

      /* ===== BACKDROP BLUR ===== */
      backdropBlur: {
        xs: "2px",
      },

      /* ===== GRADIENTS ===== */
      backgroundImage: {
        "accent-gradient":
          "linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #8b5cf6 100%)",
      },

      /* ===== FONT ===== */
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },

  plugins: [],
}

export default config