/** @type {import('tailwindcss').Config} */

export default {
  content: {
    relative: true,
    transform: content => content.replace(/taos:/g, ""),
    files: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  },
  safelist: [
    "!duration-[0ms]",
    "!delay-[0ms]",
    'html.js :where([class*="taos:"]:not(.taos-init))',
  ],
  theme: {
    fontFamily: {
      custom: [
        "Hiragino Sans",
        "ヒラギノ角ゴシック",
        "メイリオ",
        "Meiryo",
        "sans-serif",
        "YuGothic",
        "Yu Gothic",
      ],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    require("taos/plugin"),
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
