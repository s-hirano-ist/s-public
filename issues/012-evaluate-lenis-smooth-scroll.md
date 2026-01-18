# Lenis スムーススクロールの評価

## ステータス: 未着手

## 優先度: 中

## 難易度: 低

## 概要

現在使用している `lenis` ライブラリを CSS ネイティブの `scroll-behavior: smooth` に置き換えることを検討する。View Transitions との相性や、バンドルサイズ削減の観点から評価を行う。

## 現状

### 使用ライブラリ

- `lenis`: スムーススクロールライブラリ（約 15KB gzipped）

### 使用箇所

- `src/layouts/Layout.astro` - グローバルに適用

### 現在の実装

```astro
<script>
  import Lenis from "lenis";

  const lenis = new Lenis();

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // View Transitions 後の再初期化
  document.addEventListener("astro:after-swap", () => {
    lenis.destroy();
    const newLenis = new Lenis();
    // ...
  });
</script>
```

### 問題点

1. View Transitions 後に再初期化が必要
2. 約 15KB のバンドルサイズ追加
3. `requestAnimationFrame` の継続的な実行

## 提案内容

### CSS scroll-behavior への移行

#### 1. CSS の変更

```css
/* src/styles/base.css */
html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

#### 2. Layout.astro からの削除

Lenis 関連のスクリプトをすべて削除する。

#### 3. package.json からの削除

```bash
pnpm remove lenis
```

## メリット

| 項目                  | Lenis                  | CSS scroll-behavior             |
| --------------------- | ---------------------- | ------------------------------- |
| バンドルサイズ        | ~15KB                  | 0KB                             |
| View Transitions 対応 | 再初期化必要           | 自動対応                        |
| アクセシビリティ      | 手動対応               | prefers-reduced-motion 自動対応 |
| ブラウザサポート      | 全ブラウザ             | モダンブラウザ（IE11 非対応）   |
| スクロール品質        | 高（カスタマイズ可能） | 標準                            |

## デメリット・注意点

1. **スクロールの滑らかさ**: Lenis はより滑らかなスクロール体験を提供
2. **カスタマイズ性**: CSS は duration や easing のカスタマイズが限定的
3. **スクロールジャック**: Lenis は慣性スクロールなど高度な制御が可能

## 変更対象ファイル

- `src/layouts/Layout.astro` - Lenis スクリプト削除
- `src/styles/base.css` - scroll-behavior 追加
- `package.json` - lenis 削除

## 検証手順

1. `pnpm remove lenis`
2. CSS に `scroll-behavior: smooth` を追加
3. `pnpm build && pnpm preview`
4. 以下を確認:
   - ページ内リンクのスムーススクロール
   - View Transitions 後のスクロール動作
   - `prefers-reduced-motion` 設定時の動作

## 結論

バンドルサイズ削減と View Transitions との相性改善のため、CSS への移行を推奨する。ただし、スクロール体験の質を重視する場合は Lenis 維持も選択肢。

## 参考

- [CSS scroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior)
- [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [Lenis](https://lenis.darkroom.engineering/)
