import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "color-text": "var(--dark-text-color)",
        "light-color-text": "var(--light-text-color)",
        "dark-bg": "var(--background-color)",
        "light-bg": "var(--light-background-color)",
        "other-bg": "var(--other-background-color)",
        "other-text": "var(--other-text-color)",
      },
      boxShadow: {
        "custom-dark": "0 1px 2px rgba(0, 0, 0, 0.15)",
        "custom-light": "0 1px 2px rgba(0, 0, 0, 0.08)",
      },
      screens: {
        "extra-lg": { min: "1400px" },
        "large-md": { min: "1400px" },
        "max-sm": { max: "500px" },
      },
    },
    borderRadius: {
      DEFAULT: "7px",
    },
  },
  plugins: [],
};
export default config;
