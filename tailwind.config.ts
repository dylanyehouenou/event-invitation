import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  "#FDF8EE",
          100: "#F9EDD6",
          200: "#F2D9AB",
          300: "#E8C07A",
          400: "#DDA84D",
          500: "#C9A96E",
          600: "#B8922A",
          700: "#8B6914",
          800: "#5E470E",
          900: "#322508",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans:  ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "0.08" },
          "50%":       { opacity: "0.70" },
        },
        orb1: {
          "0%, 100%": { transform: "translate(0px,   0px)   scale(1)"    },
          "33%":      { transform: "translate(40px, -60px)  scale(1.06)" },
          "66%":      { transform: "translate(-30px, 40px)  scale(0.94)" },
        },
        orb2: {
          "0%, 100%": { transform: "translate(0px,   0px)   scale(1)"    },
          "33%":      { transform: "translate(-50px, 35px)  scale(0.94)" },
          "66%":      { transform: "translate(30px, -50px)  scale(1.06)" },
        },
        orb3: {
          "0%, 100%": { transform: "translate(0px,   0px)   scale(1)"    },
          "50%":      { transform: "translate(-40px,-25px)  scale(1.12)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition:  "200% center" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)"    },
        },
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
      },
      animation: {
        twinkle:   "twinkle var(--tw-duration, 3s) ease-in-out infinite",
        "orb-1":   "orb1 28s ease-in-out infinite",
        "orb-2":   "orb2 34s ease-in-out infinite",
        "orb-3":   "orb3 22s ease-in-out infinite",
        shimmer:   "shimmer 3s linear infinite",
        "fade-up": "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fadeIn 0.6s ease-out both",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
}

export default config
