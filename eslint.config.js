import eslintPluginAstro from "eslint-plugin-astro";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  { ignores: ["node_modules/**/*"] },
  ...eslintPluginAstro.configs.recommended,
  // eslintPluginPrettierRecommended,
  // "eslint:recommended",
  // "plugin:@typescript-eslint/recommended-type-checked",
  // "plugin:@typescript-eslint/stylistic-type-checked",
  // "plugin:tailwindcss/recommended",
  // "plugin:import/typescript",
  // "plugin:astro/recommended",
  // "plugin:redos/recommended",
  {
    rules: {
      // "astro/no-set-html-directive": "error", // do not use `<Fragment set:html={html} />` due to XSS
    },
  },
];
// module.exports = {
//   env: {
//     node: true,
//     es2022: true,
//     browser: true,
//   },
//   ignorePatterns: ["*.d.ts"],
//   root: true,
//   settings: {
//     "import/resolver": {
//       node: {
//         extensions: [".js", ".jsx", ".json", ".ts", ".tsx", ".astro"],
//         moduleDirectory: ["node_modules", "src/"],
//       },
//     },
//   },
//   parserOptions: {
//     ecmaVersion: "latest",
//     sourceType: "module",
//     project: true,
//   },
//   globals: {
//     astroHTML: true,
//   },
//   plugins: ["@typescript-eslint", "import", "tailwindcss"],
//   rules: {
//     "@typescript-eslint/consistent-type-imports": [
//       2,
//       {
//         prefer: "type-imports",
//       },
//     ],
//     "import/order": [
//       "error",
//       {
//         groups: ["builtin", "external", "parent", "sibling", "index"],
//         pathGroupsExcludedImportTypes: [],
//         alphabetize: { order: "asc" },
//         "newlines-between": "never",
//       },
//     ],
//     // "no-console": ["warn", { allow: ["error"] }],
//     "@typescript-eslint/no-unused-vars": [
//       "warn",
//       {
//         argsIgnorePattern: "^_",
//         varsIgnorePattern: "^_",
//         caughtErrorsIgnorePattern: "^_",
//       },
//     ],
//     "@typescript-eslint/no-unsafe-assignment": "off", // TODO: bug on <Fragment />
//     "@typescript-eslint/consistent-type-definitions": ["error", "type"],
//     "tailwindcss/no-custom-classname": "off",
//     "no-restricted-imports": ["error", { patterns: ["./", "../"] }],
//   },
// };
