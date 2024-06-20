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
      screens: {
        // max-width
        "max-2xl": { max: "1367px" },
        "max-xl": { max: "1280px" },
        "max-lg": { max: "1024px" },
        "max-md": { max: "768px" },
        "max-sm": { max: "640px" },

        //min-width
        sm: "641px",
        md: "769px",
        lg: "1025px",
        xl: "1281px",
        "2xl": "1537px",
      },
    },
  },
  plugins: [],
};
export default config;
