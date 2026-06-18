import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F9F6F2",
        cream2: "#F2ECE3",
        ink: "#2A211B",
        inkSoft: "#6B5D50",
        brown: "#8B6F47",
        brownDark: "#6E5535",
        terra: "#CC7755",
        sage: "#B5B5A0",
        orange: "#F4A460",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(155,230,160,0.7)" },
          "70%": { boxShadow: "0 0 0 7px rgba(155,230,160,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(155,230,160,0)" },
        },
        "slow-zoom": {
          "0%": { transform: "scale(1.12)" },
          "100%": { transform: "scale(1)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-rev": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "pulse-ring": "pulse-ring 2s infinite",
        "slow-zoom": "slow-zoom 18s ease-out forwards",
        "fade-in": "fade-in 0.4s ease both",
        marquee: "marquee 42s linear infinite",
        "marquee-rev": "marquee-rev 42s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
