# Shiki デュアルテーマ導入

## ステータス: 未着手

## 優先度: 中

## 難易度: 低

## 概要

現在 `one-dark-pro` のみを使用しているシンタックスハイライトに、ライト/ダークテーマの両方に対応したデュアルテーマを導入する。サイトのテーマ切替に連動してコードブロックの見た目も変更されるようにする。

## 現状

```javascript
// astro.config.mjs
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
    },
  },
});
```

- ダークテーマのみ対応
- ライトモードでもダークテーマのコードブロックが表示される

## 提案内容

### 1. astro.config.mjs の変更

```javascript
// astro.config.mjs
export default defineConfig({
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "one-dark-pro",
      },
    },
  },
});
```

### 2. CSS の追加

```css
/* src/styles/base.css */

/* デフォルト（ダークモード） */
.shiki,
.shiki span {
  color: var(--shiki-dark) !important;
  background-color: var(--shiki-dark-bg) !important;
}

/* ライトモード */
[data-theme="light"] .shiki,
[data-theme="light"] .shiki span {
  color: var(--shiki-light) !important;
  background-color: var(--shiki-light-bg) !important;
}
```

### 3. テーマの選択肢

#### ダークテーマ候補

- `one-dark-pro`（現在使用中）
- `github-dark`
- `dracula`
- `tokyo-night`

#### ライトテーマ候補

- `github-light`（推奨）
- `one-light`
- `min-light`

## 変更対象ファイル

- `astro.config.mjs` - themes 設定追加
- `src/styles/base.css` - テーマ切替 CSS 追加

## 検証手順

1. `astro.config.mjs` を更新
2. CSS を追加
3. `pnpm build && pnpm preview`
4. 以下を確認:
   - ダークモードでのコードブロック表示
   - ライトモードでのコードブロック表示
   - テーマ切替時のスムーズな遷移

## 備考

- DaisyUI のテーマ切替と連動させる
- `data-theme` 属性の値に応じて CSS を適用
- View Transitions でのテーマ切替にも対応

## 参考

- [Astro Shiki - Dual Themes](https://docs.astro.build/en/guides/syntax-highlighting/#dual-themes)
- [Shiki Themes](https://shiki.style/themes)
