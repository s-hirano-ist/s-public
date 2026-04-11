import eslintCss from "@eslint/css";
import { FlatCompat } from "@eslint/eslintrc";
import eslintJs from "@eslint/js";
import eslintMarkdown from "@eslint/markdown";
import tsParser from "@typescript-eslint/parser";
import { configs as eslintPluginAstro } from "eslint-plugin-astro";
import { flatConfigs as eslintPluginImportX } from "eslint-plugin-import-x";
import { configs as jsoncConfigs } from "eslint-plugin-jsonc";
import perfectionistPlugin from "eslint-plugin-perfectionist";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
// import tailwind from "eslint-plugin-tailwindcss"; // eslint-plugin-tailwindcss は Tailwind v3 のみ対応。v4 では使用不可
import unicornPlugin from "eslint-plugin-unicorn";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import { configs as ymlConfigs } from "eslint-plugin-yml";
import { configs as eslintTypeScript } from "typescript-eslint";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: eslintJs.configs.recommended,
  allConfig: eslintJs.configs.all,
});

export default [
  {
    ignores: [
      ".astro/",
      "dist/",
      "src/env.d.ts",
      ".stylelintrc.mjs",
      "terraform/",
      "public/",
      "assets/",
      "src/data/assets/",
      "pnpm-lock.yaml",
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
    ...eslintPluginImportX.recommended,
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx,astro}"],
  },
  {
    ...eslintPluginImportX.typescript,
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx,astro}"],
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx,astro}"],
    ignores: ["eslint.config.js"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },

  {
    ...eslintPluginPrettierRecommended,
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx,astro}"],
  },
  ...eslintPluginAstro.recommended,
  // ...tailwind.configs["flat/recommended"], // eslint-plugin-tailwindcss は Tailwind v3 のみ対応
  ...compat.extends("plugin:redos/recommended").map(config => ({
    ...config,
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx,astro}"],
  })),
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
    },
  },

  {
    // eslint-plugin-unused-imports
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx,astro}"],
    plugins: { "unused-imports": unusedImportsPlugin },
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // 重複エラーを防ぐため typescript-eslint の方を無効化
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },

  // yaml
  ...ymlConfigs["flat/recommended"].map(config =>
    config.rules && !config.files
      ? { ...config, files: ["**/*.yml", "**/*.yaml"] }
      : config,
  ),
  {
    files: ["**/*.yml", "**/*.yaml"],
    rules: {
      "yml/no-empty-mapping-value": "off", // GitHub Actions の `on: push:` 等で一般的なパターン
    },
  },

  // jsonc
  ...jsoncConfigs["flat/recommended-with-jsonc"].map(config =>
    config.rules && !config.files
      ? { ...config, files: ["**/*.json", "**/*.jsonc", "**/*.json5"] }
      : config,
  ),
  {
    files: ["**/*.json5"],
    rules: {
      "jsonc/quote-props": "off", // JSON5 ではプロパティのクォートは不要
    },
  },

  // markdown
  ...eslintMarkdown.configs.recommended,
  {
    files: ["**/*.md"],
    rules: {
      "markdown/no-missing-label-refs": "off", // GitHub admonition ([!IMPORTANT]) や脚注参照で誤検知
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

  // css (not in use)
  {
    files: ["**/*.css"],
    ignores: ["**/base.css"], // Tailwind CSS 4の新しい構文のため除外
    plugins: {
      css: eslintCss,
    },
    language: "css/css",
    rules: {
      "css/use-baseline": ["error", { available: "widely" }],
    },
  },

  // unicorn
  {
    ...unicornPlugin.configs["recommended"],
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx,astro}"],
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx,astro}"],
    rules: {
      "unicorn/prevent-abbreviations": "off",
      "unicorn/no-await-expression-member": "off",
      "unicorn/no-null": "off",
      "unicorn/prefer-code-point": "off",
      "unicorn/no-abusive-eslint-disable": "off",
      "unicorn/prefer-global-this": "off",
      "unicorn/consistent-function-scoping": "off",
      "unicorn/no-new-array": "off",
      "unicorn/no-useless-spread": "off",
      "unicorn/filename-case": "off",
      "unicorn/numeric-separators-style": "off",
      "unicorn/no-console-spaces": "off",
      "unicorn/prefer-single-call": "off",
      "unicorn/no-useless-undefined": "off",
      "unicorn/prefer-logical-operator-over-ternary": "off",
      "unicorn/no-array-reduce": "off",
      "unicorn/text-encoding-identifier-case": "off",
      "unicorn/new-for-builtins": "off",
      "unicorn/new-for-builtins": "off",
      "unicorn/prefer-array-some": "off",
      "unicorn/prefer-array-flat-map": "off",
      "unicorn/no-for-loop": "off",
      "unicorn/no-process-exit": "off",
      "no-dupe-keys": "off",
    },
  },

  {
    // eslint-plugin-perfectionist
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx,astro}"],
    plugins: { perfectionist: perfectionistPlugin },
    rules: {
      "perfectionist/sort-interfaces": "warn", // interface のプロパティの並び順をアルファベット順に統一
      "perfectionist/sort-object-types": "warn", // Object 型のプロパティの並び順をアルファベット順に統一
    },
  },

  // script/**
  { files: ["script/**.ts"], rules: { "no-console": "off" } },
];

// TODO: plugin import or plugin boundaries

// import importPlugin from "eslint-plugin-import";
// {
// 	// eslint-plugin-import の設定
// 	plugins: { import: importPlugin },
// 	rules: {
// 		"import/order": [
// 			// import の並び順を設定
// 			"warn",
// 			{
// 				groups: [
// 					"builtin",
// 					"external",
// 					"internal",
// 					["parent", "sibling"],
// 					"object",
// 					"type",
// 					"index",
// 				],
// 				"newlines-between": "always",
// 				pathGroupsExcludedImportTypes: ["builtin"],
// 				alphabetize: { order: "asc", caseInsensitive: true },
// 				pathGroups: [
// 					{
// 						pattern: "react",
// 						group: "external",
// 						position: "before",
// 					},
// 				],
// 			},
// 		],
// 	},
// },

// 	// Boundaries plugin configuration for strict dependencies
// {
// 	plugins: { boundaries: boundariesPlugin },

// 	// チェック対象は features 配下のみ（テストは除外）
// 	files: ["src/features/**/*"],
// 	ignores: ["src/features/**/*.test.ts?(x)"],

// 	settings: {
// 		"boundaries/elements": [
// 			{
// 				type: "feature",
// 				pattern: "src/features/*/**", // features/<feature>/以下（深さは任意）
// 				mode: "full",
// 				capture: ["feature"], // <feature> 部分を保存
// 			},
// 			// もし features/<feature> 直下のファイルもあり得るなら追加
// 			{
// 				type: "feature",
// 				pattern: "src/features/*/*",
// 				mode: "full",
// 				capture: ["feature"],
// 			},
// 		],
// 	},

// 	rules: {
// 		// デフォルトは「別 feature への import は禁止」
// 		"boundaries/element-types": [
// 			"error",
// 			{
// 				default: "disallow",
// 				rules: [
// 					{
// 						// 自分と同じ feature への import だけ許可
// 						from: "feature",
// 						allow: [["feature", { feature: "${from.feature}" }]],
// 					},
// 				],
// 				message:
// 					"features間のimportは禁止。同一feature内のみimport可能です。",
// 			},
// 		],
// 	},
// },
