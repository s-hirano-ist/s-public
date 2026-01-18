# output: "static" の削除

## 概要

`astro.config.mjs` に設定されている `output: "static"` は Astro のデフォルト値であるため、明示的に指定する必要がありません。コードの簡潔性のために削除を推奨します。

## 現状

```javascript
// astro.config.mjs:40-41
// not necessary for static sites. Only for SSR.
output: "static",
```

## 変更後

該当行とコメントを削除します。

```javascript
// astro.config.mjs
export default defineConfig({
  site: SITE.website,
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react({ include: ["**/react/*"] }), sitemap()],
  markdown: {
    // ... markdown 設定
  },
  // output: "static" は削除（デフォルト値のため不要）
});
```

## 背景

- Astro はデフォルトで静的サイト生成（SSG）を行う
- `output: "static"` はデフォルト値であり、明示的な指定は冗長
- コメントにも「not necessary for static sites」と記載されており、自明

## 優先度

低：機能に影響はなく、コードの簡潔性のための変更

## 影響範囲

- `astro.config.mjs`

## 検証方法

1. `pnpm build` でビルドが成功すること
2. ビルド成果物が `dist/` に静的ファイルとして出力されること

## 参考

- [Astro Configuration - output](https://docs.astro.build/en/reference/configuration-reference/#output)
