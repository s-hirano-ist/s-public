module.exports = {
  env: {
    node: true,
    es2022: true,
    browser: true,
  },
  ignorePatterns: ["*.d.ts"],
  root: true,
  // settings: {
  //   "import/resolver": {
  //     typescript: { project: "./" },
  //   },
  // },
  extends: [
    "eslint:recommended",
    "plugin:import/typescript",
    "plugin:astro/recommended",
    // "plugin:@typescript-eslint/recommended",
    // "plugin:import/recommended",
    // "prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"],
  },
  globals: {
    astroHTML: true,
  },
  plugins: ["@typescript-eslint", "import"],
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      2,
      {
        prefer: "type-imports",
      },
    ],
    "import/order": [2, { alphabetize: { order: "asc" } }],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
  },
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {
        // "astro/no-set-html-directive": "error", // MEMO: do not use `<Fragment set:html={html} />` due to XSS
      },
    },
    {
      files: ["*.ts"],
      parser: "@typescript-eslint/parser",
    },
  ],
};
