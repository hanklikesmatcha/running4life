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
      }
    }
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["cupcake"]
  }
};
