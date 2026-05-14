import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17202A",
        muted: "#65717F",
        line: "#D8DEE6",
        canvas: "#F6F8FB",
        panel: "#FFFFFF",
        brand: "#2563EB",
        mint: "#0F9F7A",
        amber: "#C87D1D",
        rose: "#C2415D"
      },
      boxShadow: {
        panel: "0 14px 40px rgba(23, 32, 42, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
