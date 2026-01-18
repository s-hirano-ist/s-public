# extendDefaultPlugins: true の削除

## 概要

`astro.config.mjs` に残っている `extendDefaultPlugins: true` は Astro v3 で非推奨となり、v5 では完全に不要になった設定です。この設定を削除する必要があります。

## 現状

```javascript
// astro.config.mjs:37-38
remarkPlugins: [[remarkToc, { heading: "目次" }]],
extendDefaultPlugins: true,
```

## 変更後

```javascript
// astro.config.mjs:37
remarkPlugins: [[remarkToc, { heading: "目次" }]],
```

`extendDefaultPlugins: true` の行を削除するだけで対応完了です。

## 背景

- Astro v2 以前: カスタムプラグインを追加するとデフォルトプラグインが無効化されていたため、`extendDefaultPlugins: true` でデフォルトプラグインを維持する必要があった
- Astro v3 以降: デフォルトプラグインは常に有効になり、カスタムプラグインは追加される形になった
- Astro v5: この設定は完全に無視されるため、削除すべき

## 影響範囲

- `astro.config.mjs`

## 検証方法

1. `pnpm build` でビルドが成功すること
2. ブログ記事のマークダウン処理が正常に動作すること（目次生成、見出しリンクなど）

## 参考

- [Astro v3 Upgrade Guide - Removed: extendDefaultPlugins](https://docs.astro.build/en/guides/upgrade-to/v3/#removed-markdown-extenddefaultplugins)
