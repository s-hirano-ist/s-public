# アニメーションライブラリの統合検討

## ステータス: 未着手

## 優先度: 低

## 難易度: 低

## 概要

現在使用している2つのTailwind CSSアニメーションライブラリ（`tailwindcss-animated` と `tailwindcss-motion`）の統合または整理を検討する。

## 現状

### tailwindcss-animated

- **用途**: h2 タグの `animate-wiggle` アニメーション
- **使用箇所**: `src/components/Heading.astro`

### tailwindcss-motion

- **用途**: BentoTile の `motion-preset-pulse` アニメーション
- **使用箇所**: `src/components/BentoTile.astro`

## 提案内容

### 推奨: 現状維持

以下の理由から、現時点では両ライブラリを維持することを推奨する。

1. **実使用中**: 両ライブラリともサイトで実際に使用されている
2. **パフォーマンス影響**: Tailwind プラグインはビルド時のみ影響し、ランタイムへの影響なし
3. **機能の違い**: 各ライブラリが提供するアニメーションは異なる
   - `tailwindcss-animated`: 基本的な CSS アニメーション（wiggle 等）
   - `tailwindcss-motion`: より高度なモーション効果（pulse プリセット等）

### 代替案: 統合する場合

もし統合を行う場合は以下の選択肢がある。

#### A. tailwindcss-motion に統一

```javascript
// tailwind.config.mjs
export default {
  plugins: [require("tailwindcss-motion")],
};
```

- `animate-wiggle` を `motion-` クラスで代替
- 移行コスト: 低

#### B. カスタム CSS に移行

```css
/* src/styles/base.css */
@keyframes wiggle {
  0%,
  100% {
    transform: rotate(-3deg);
  }
  50% {
    transform: rotate(3deg);
  }
}
.animate-wiggle {
  animation: wiggle 1s ease-in-out infinite;
}
```

- 外部依存の完全な削除
- 移行コスト: 中

## 変更対象ファイル（統合する場合）

- `tailwind.config.mjs` - プラグイン設定変更
- `src/components/Heading.astro` - クラス名変更（必要に応じて）
- `src/components/BentoTile.astro` - クラス名変更（必要に応じて）
- `package.json` - 不要なパッケージ削除

## 結論

現時点では対応不要。将来的にアニメーション要件が増えた場合や、いずれかのライブラリがメンテナンス停止した場合に再検討する。

## 参考

- [tailwindcss-animated](https://github.com/new-data-services/tailwindcss-animated)
- [tailwindcss-motion](https://github.com/romboHQ/tailwindcss-motion)
