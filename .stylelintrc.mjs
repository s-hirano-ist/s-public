export default {
  extends: ["stylelint-config-standard"],
  overrides: [
    {
      files: ["**/*.astro"],
      customSyntax: "postcss-html",
    },
  ],
  plugins: [
    "stylelint-declaration-block-no-ignored-properties",
    "stylelint-no-unsupported-browser-features",
    "stylelint-order",
  ],
  rules: {
    // "order/order": ["custom-properties", "declarations"],
    "order/properties-order": ["width", "height"],
    "plugin/declaration-block-no-ignored-properties": true,
    "plugin/no-unsupported-browser-features": [
      true,
      {
        browsers: [
          "last 2 Chrome versions",
          "last 2 Safari versions",
          "last 2 Firefox versions",
        ],
        ignorePartialSupport: true,
      },
    ],
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "layer",
          "apply",
          "plugin",
          "source",
          "theme",
        ],
      },
    ],
    "function-no-unknown": [true, { ignoreFunctions: ["theme", "screen"] }],
  },
};
