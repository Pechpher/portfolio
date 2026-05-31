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
        deep: "#0a0015",
        "card-bg": "#1a0533",
        gold: "#d4af37",
        "gold-light": "#f0d060",
        "purple-dark": "#6b21a8",
        "purple-mid": "#7c3aed",
        "purple-light": "#a78bfa",
        mystic: "#2d1b4e",
      },
      fontFamily: {
        cinzel: ["var(--font-cinzel)", "serif"],
        sarabun: ["var(--font-sarabun)", "sans-serif"],
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "0.2", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.3)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 10px #d4af37, 0 0 20px #d4af37" },
          "50%": { boxShadow: "0 0 20px #d4af37, 0 0 40px #d4af37, 0 0 60px #d4af37" },
        },
      },
      animation: {
        twinkle: "twinkle 3s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        glow: "glow 2s ease-in-out infinite",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #d4af37, #f0d060, #d4af37)",
        "purple-gradient": "linear-gradient(135deg, #6b21a8, #9333ea, #6b21a8)",
        "card-gradient": "linear-gradient(180deg, #1a0533 0%, #0a0015 100%)",
        "hero-gradient": "radial-gradient(ellipse at center, #1a0533 0%, #0a0015 70%)",
      },
    },
  },
  plugins: [],
};
export default config;
