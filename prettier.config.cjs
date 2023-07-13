/** @type {import("prettier").Options} */

const config = {
  arrowParens: "avoid",
  semi: true,
  tabWidth: 2,
  printWidth: 80,
  singleQuote: false,
  jsxSingleQuote: false,
  trailingComma: "es5",
  bracketSpacing: true,
  endOfLine: "lf",
  plugins: [require.resolve('prettier-plugin-astro'), require('prettier-plugin-tailwindcss')],
  tailwindConfig: "./tailwind.config.cjs",
  overrides: [
    {
      files: '**/*.astro',
      options: { parser: 'astro' },
    },
  ],
};

module.exports = config;
