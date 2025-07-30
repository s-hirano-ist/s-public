import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import { configs as eslintPluginAstro } from "eslint-plugin-astro";
import { flatConfigs as eslintPluginImportX } from "eslint-plugin-import-x";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import spellcheckPlugin from "eslint-plugin-spellcheck";
import tailwind from "eslint-plugin-tailwindcss";
import { configs as eslintTypeScript } from "typescript-eslint";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default [
  {
    ignores: [".astro/", "dist/", "src/env.d.ts", ".stylelintrc.mjs"],
  },
  eslint.configs.recommended,
  ...eslintTypeScript.recommended,
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
  ...compat.extends("plugin:redos/recommended"),
  ...eslintTypeScript.recommendedTypeChecked.map(config => ({
    ...config,
    files: ["**/*.ts", "**/*.tsx"],
  })),
  ...eslintTypeScript.stylisticTypeChecked.map(config => ({
    ...config,
    files: ["**/*.ts", "**/*.tsx"],
  })),
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      // "astro/no-set-html-directive": "error", // do not use `<Fragment set:html={html} />` due to XSS
      "import-x/no-unresolved": "off",
      "@typescript-eslint/consistent-type-imports": [
        2,
        { prefer: "type-imports" },
      ],
      "import-x/order": [
        "error",
        {
          groups: ["builtin", "external", "parent", "sibling", "index"],
          pathGroupsExcludedImportTypes: [],
          alphabetize: { order: "asc" },
          "newlines-between": "never",
        },
      ],
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
    },
  },

  // spellcheck
  {
    plugins: { spellcheck: spellcheckPlugin },
    rules: {
      "spellcheck/spell-checker": [
        "error",
        {
          minLength: 5, // 5 文字以上の単語をチェック
          skipWords: [
            "astro",
            "tailwindcss",
            "daisyui",
            "frontmatter",
            "uint",
            "hirano",
            "slugify",
            "redos",
            "apochromat",
            "frontend",
            "swiper",
            "pathname",
            "favicon",
            "webmanifest",
            "sitemap",
            "toker",
            "bento",
            "semibold",
            "tabler",
            "noopener",
            "noreferrer",
            "dropdown",
            "rehype",
            "autolink",
            "integrations",
            "shiki",
            "checkbox",
            "undef",
            "nowrap",
            "whitespace",
            "mailto",
            "readdir",
            "pragma",
            "webkit",
            "firefox",
            "compat",
            "stylelintrc",
            "tsconfig",
            "lerna",
            "filepath",
            "parens",
            "sidenav",
          ], // チェックをスキップする単語の配列
        },
      ],
    },
  },

  // script/**
  { files: ["script/**.ts"], rules: { "no-console": "off" } },
];
