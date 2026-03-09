import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primaryBg: "#080c14",
        cardBg: "rgba(255,255,255,0.04)",
        accent: "#3b82f6",
        accent2: "#8b5cf6",
        safe: "#10b981",
        warning: "#f59e0b",
        danger: "#ef4444"
      }
    }
  }
}

export default config
