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
        // Tailwind v4 公式ディレクティブを網羅して許容
        // https://tailwindcss.com/docs/functions-and-directives
        ignoreAtRules: [
          "tailwind", // legacy 互換
          "layer",
          "apply",
          "plugin", // legacy 互換（JS プラグイン読み込み、本プロジェクトで使用）
          "source",
          "theme",
          "custom-variant",
          "utility",
          "variant",
          "reference",
          "config", // legacy 互換（JS 設定読み込み）— 網羅性のため
        ],
      },
    ],
    // Tailwind v4 の組み込み関数を許容（--alpha/--spacing は v4 新関数、theme/screen は legacy）
    "function-no-unknown": [
      true,
      { ignoreFunctions: ["theme", "screen", "--alpha", "--spacing"] },
    ],
    // Tailwind v4 の build-time 関数（--spacing()/--alpha()）を値として使う宣言を許容
    // （declaration-property-value-no-unknown は値の CSS 文法まで検証するため別途必要）
    "declaration-property-value-no-unknown": [
      true,
      { ignoreProperties: { "/.+/": ["/^--(spacing|alpha)\\(/"] } },
    ],
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
