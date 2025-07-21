import tailwindTypography from "@tailwindcss/typography";
import daisyui from "daisyui";
import tailwindcssAnimated from "tailwindcss-animated";
import tailwindcssMotion from "tailwindcss-motion";

/** @type {import('tailwindcss').Config} */

export default {
  content: {
    relative: true,
    files: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  },
  theme: {
    fontFamily: {
      custom: ["Noto Sans JP Variable", "sans-serif"],
    },
  },
  plugins: [
    tailwindTypography,
    daisyui,
    tailwindcssAnimated,
    tailwindcssMotion,
  ],
  daisyui: {
    themes: [
      {
        myDark: {
          primary: "#77a2c0",
          secondary: "#885d3f",
          accent: "#FFF",
          neutral: "#3F9900",
          "base-100": "#141314",
          info: "#778899",
          success: "#426f8f",
          warning: "#b0c24a",
          error: "#ff6347",
        },
        myLight: {
          primary: "#426f8f",
          secondary: "#885d3f",
          accent: "#000",
          neutral: "#3F9900",
          "base-100": "#fff",
          info: "#778899",
          success: "#77a2c0",
          warning: "#b0c24a",
          error: "#ff6347",
        },
        noTheme: {
          primary: "#77a2c0",
          secondary: "#885d3f",
          accent: "#FFF",
          neutral: "#3F9900",
          "base-100": "#141314",
          info: "#778899",
          success: "#426f8f",
          warning: "#b0c24a",
          error: "#ff6347",
        },
      },
    ],
    darkTheme: "myDark",
    base: true,
    styled: true,
    utils: true,
    logs: false,
  },
};
