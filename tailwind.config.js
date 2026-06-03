/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0B",
        graphite: "#111114",
        steel: "#1A1A1F",
        silver: "#A1A1AA",
        snow: "#F5F5F7",
        glow: "#2D7FFF",
        gold: "#C9A84C",
      },
      fontFamily: {
        display: ['"Space Grotesk"', '"Inter"', "system-ui", "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      fontSize: {
        hero: ["clamp(52px, 8vw, 96px)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
      },
      backgroundImage: {
        "gradient-hero":
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(45,127,255,0.18) 0%, transparent 60%)",
        "gradient-gold":
          "linear-gradient(135deg, #C9A84C, #F5E09A 50%, #C9A84C)",
        "gradient-card":
          "linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))",
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out both",
        "fade-up": "fade-up 0.8s cubic-bezier(0.22,1,0.36,1) both",
        "shimmer": "shimmer 3s linear infinite",
        "float": "floaty 6s ease-in-out infinite",
        "orbit-slow": "orbit 28s linear infinite",
        "orbit-med": "orbit 20s linear infinite",
        "orbit-fast": "orbit 14s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "marquee": "marquee 40s linear infinite",
      },
      keyframes: {
        "fade-in": { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        "fade-up": { "0%": { opacity: 0, transform: "translateY(24px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
        "shimmer": { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        "floaty": { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        "orbit": { "0%": { transform: "rotate(0) translateX(var(--r)) rotate(0)" }, "100%": { transform: "rotate(360deg) translateX(var(--r)) rotate(-360deg)" } },
        "pulse-glow": { "0%,100%": { opacity: 0.6 }, "50%": { opacity: 1 } },
        "marquee": { "0%": { transform: "translateY(0)" }, "100%": { transform: "translateY(-50%)" } },
      },
    },
  },
  plugins: [],
};
