/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      padding: {
        "3by4": "75%", // Custom class for padding-bottom 75%
        "9by16": "177.78%" // Custom class for padding-bottom 177.78% (16/9 * 100)
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      keyframes: {
        shine: {
          "0%": { backgroundPosition: "-200%" },
          "100%": { backgroundPosition: "200%" }
        },
        rainbow: {
          "0%, 100%": { color: "#FF6347" }, // Tomato
          "16%": { color: "#FFA07A" }, // Light Salmon
          "32%": { color: "#FFD700" }, // Gold
          "48%": { color: "#ADFF2F" }, // Green Yellow
          "64%": { color: "#00BFFF" }, // Deep Sky Blue
          "80%": { color: "#BA55D3" }, // Medium Orchid
          "95%": { color: "#FF69B4" } // Hot Pink
        }
      },
      animation: {
        shine: "shine 5s linear infinite",
        rainbow: "rainbow 4s ease-in-out infinite"
      }
    }
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["cupcake"]
  }
};
