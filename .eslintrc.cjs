module.exports = {
  env: {
    node: true,
    es2022: true,
    browser: true,
  },
  root: true,
  settings: {
    "import/resolver": {
      typescript: { project: "./" },
    },
  },
  extends: [
    "eslint:recommended",
    // "plugin:@typescript-eslint/recommended",
    // "plugin:import/recommended",
    // "plugin:import/typescript",
    "plugin:astro/recommended",
    // "prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"],
  },
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {},
    },
  ],
};
