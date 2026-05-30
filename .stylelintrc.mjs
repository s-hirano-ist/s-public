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
          "custom-variant",
          "utility",
          "variant",
          "reference",
        ],
      },
    ],
    "function-no-unknown": [true, { ignoreFunctions: ["theme", "screen"] }],
    // Tailwind v4 の `@import "tailwindcss"` を許容（url 記法を強制しない）
    "import-notation": "string",
    // s-ui トークンの `rgb(var(--x) / 0.08)` 記法を尊重し number で統一
    "alpha-value-notation": "number",
    // `.text-gradient` の `-webkit-background-clip: text`（Safari 必須）を保護
    "property-no-vendor-prefix": [
      true,
      { ignoreProperties: ["-webkit-background-clip"] },
    ],
  },
};
