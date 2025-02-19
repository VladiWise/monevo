import type { Config } from "tailwindcss";

export default {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {

      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        darkMain: "#0B0C0F",
        darkGray: "#6B7280",
        lightMain: "#F9F9F9",
        primary: "#EF3226",

      },
      boxShadow: {
        own: "0 5px 25px 0px rgb(0 0 0 / 0.2), 0 8px 10px -2px rgb(0 0 0 / 0.1)",
        error:
          "0 5px 25px 0px rgb(185 28 28 / 0.5), 0 8px 10px -2px rgb(185 28 28 / 0.1)",
      },
      screens: {
        'hover-hover': { raw: '(hover: hover)' },
        'hover-none': { raw: '(pointer: coarse)' },
        "xs": "325px",
        "sm": "425px",
      },

    },
  },
  plugins: [],
  darkMode: "class",
} satisfies Config;
