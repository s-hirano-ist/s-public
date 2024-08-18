import globals from "globals";
import tailwind from "eslint-plugin-tailwindcss";
import eslint from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "typescript-eslint";
import path from "path";
import { fileURLToPath } from "url";
import pluginReact from "eslint-plugin-react";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...compat.extends("prettier"),
  ...tailwind.configs["flat/recommended"],
  //   ...compat.extends("plugin:@typescript-eslint/recommended-type-checked"),
  //   ...compat.extends("plugin:@typescript-eslint/stylistic-type-checked"),
  ...compat.extends("plugin:import/typescript"),
  ...compat.extends("plugin:astro/recommended"),
  ...compat.extends("plugin:redos/recommended"),
  pluginReact.configs.flat.recommended,
  {
    ignores: [
      "**/*.d.ts",
      ".husky/",
      ".vscode/",
      "public/",
      "script/",
      ".vercel/",
    ],
  },
  {
    // plugins: {
    //   "simple-import-sort": simple_import_sort,
    //   plugins: ["@typescript-eslint", "import", "tailwindcss"],
    // },
    languageOptions: {
      globals: {
        astroHTML: true,
        ...globals.node,
        ...globals.es2022,
        ...globals.browser,
      },
    },
    // root: true,
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".json", ".ts", ".tsx", ".astro"],
          moduleDirectory: ["node_modules", "src/"],
        },
      },
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
      //   "import/order": [
      //     "error",
      //     {
      //       groups: ["builtin", "external", "parent", "sibling", "index"],
      //       pathGroupsExcludedImportTypes: [],
      //       alphabetize: { order: "asc" },
      //       "newlines-between": "never",
      //     },
      //   ],
      "no-console": ["warn", { allow: ["error"] }],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-unsafe-assignment": "off", // TODO: bug on <Fragment />
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "tailwindcss/no-custom-classname": "off",
      "no-restricted-imports": ["error", { patterns: ["./", "../"] }],
    },
    // overrides: [
    //   {
    //     files: ["*.astro"],
    //     parser: "astro-eslint-parser",
    //     parserOptions: {
    //       parser: "@typescript-eslint/parser",
    //       extraFileExtensions: [".astro"],
    //     },
    //     rules: {
    //       // "astro/no-set-html-directive": "error", // do not use `<Fragment set:html={html} />` due to XSS
    //     },
    //   },
    //   {
    //     files: ["*.ts"],
    //     parser: "@typescript-eslint/parser",
    //   },
    // ],
  },
];
