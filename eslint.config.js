import eslintJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import { configs as eslintPluginAstro } from "eslint-plugin-astro";
import {
  configs as eslintTypeScript,
  parser as tsParser,
} from "typescript-eslint";

export default [
  {
    ignores: [
      ".astro/",
      "dist/",
      "src/env.d.ts",
      "terraform/",
      "public/",
      "src/assets/",
      "src/data/assets/",
      "bun.lock",
      "**/*.gen.json",
    ],
  },
  {
    ...eslintJs.configs.recommended,
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx,astro}"],
  },
  ...eslintTypeScript.strict.map(config => ({
    ...config,
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx,astro}"],
  })),
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx,astro}"],
    ignores: ["eslint.config.js"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },

  ...eslintPluginAstro.recommended,
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
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx,astro}"],
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        2,
        { prefer: "type-imports" },
      ],
      "no-console": ["warn", { allow: ["error"] }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-unsafe-assignment": "off", // TODO: bug on <Fragment />
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    },
  },

  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx,astro}"],
    rules: {
      // Prevent relative imports that go up directories to enforce proper architecture
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../../../*", "../../../../*", "../../../../../**/*"],
              message:
                "Use absolute imports instead of relative imports that go up directories. This enforces proper architecture boundaries.",
            },
          ],
        },
      ],
    },
  },

  // script/**
  { files: ["script/**.ts"], rules: { "no-console": "off" } },

  eslintConfigPrettier,
];
