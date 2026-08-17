import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#000000",
          blue: "#ffffff",
          cyan: "#a3a3a3",
          gold: "#e5e5e5",
          green: "#d4d4d4",
        },
        glass: {
          border: "rgba(255, 255, 255, 0.12)",
          panel: "rgba(255, 255, 255, 0.05)",
          hover: "rgba(255, 255, 255, 0.1)",
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
