import { configs as eslintPluginAstro } from "eslint-plugin-astro";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslint from "@eslint/js";
import { flatConfigs as eslintPluginImportX } from "eslint-plugin-import-x";
import tsParser from "@typescript-eslint/parser";
import tailwind from "eslint-plugin-tailwindcss";
// import tseslint from "typescript-eslint";
// import createTypeScriptImportResolver from "eslint-import-resolver-typescript";

export default [
  { ignores: [".astro/", "dist/", "script/"] },
  eslint.configs.recommended,
  // tseslint.configs.recommended,
  eslintPluginImportX.recommended,
  eslintPluginImportX.typescript,
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx,astro}"],
    ignores: ["eslint.config.js"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },

  eslintPluginPrettierRecommended,
  ...eslintPluginAstro.recommended,
  ...tailwind.configs["flat/recommended"],
  // "plugin:@typescript-eslint/recommended-type-checked",
  // "plugin:@typescript-eslint/stylistic-type-checked",
  // "plugin:import/typescript",
  // "plugin:astro/recommended",
  // "plugin:redos/recommended",
  {
    rules: {
      // "astro/no-set-html-directive": "error", // do not use `<Fragment set:html={html} />` due to XSS
      "no-undef": "off", // FIXME: eslint.config.recommended
      "import-x/no-unresolved": "off",
      "import-x/namespace": "off",
      "import-x/default": "off",
      "no-unused-vars": "off",
      // "@typescript-eslint/consistent-type-imports": [
      //   2,
      //   { prefer: "type-imports" },
      // ],
      // "import/order": [
      //   "error",
      //   {
      //     groups: ["builtin", "external", "parent", "sibling", "index"],
      //     pathGroupsExcludedImportTypes: [],
      //     alphabetize: { order: "asc" },
      //     "newlines-between": "never",
      //   },
      // ],
      "no-console": ["warn", { allow: ["error"] }],
      // "@typescript-eslint/no-unused-vars": [
      //   "warn",
      //   {
      //     argsIgnorePattern: "^_",
      //     varsIgnorePattern: "^_",
      //     caughtErrorsIgnorePattern: "^_",
      //   },
      // ],
      "@typescript-eslint/no-unsafe-assignment": "off", // TODO: bug on <Fragment />
      // "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "tailwindcss/no-custom-classname": "off",
    },
  },
];
