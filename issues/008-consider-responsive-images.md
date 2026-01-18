# Responsive Images 機能の活用検討

## 概要

Astro v5 で安定版となった Responsive Images 機能の導入を検討します。この機能により、画像の自動最適化とレスポンシブ対応が簡単になります。

## 機能概要

Astro の Responsive Images 機能は、`<Image />` コンポーネントを使用する際に自動的に：

1. 複数サイズの画像を生成
2. `srcset` と `sizes` 属性を自動設定
3. WebP/AVIF などのモダンフォーマットに変換
4. 遅延読み込み（lazy loading）を適用

## 導入方法

### 1. astro.config.mjs で有効化

```javascript
// astro.config.mjs
export default defineConfig({
  image: {
    experimentalLayout: "responsive", // または "fixed", "full-width"
  },
  // ... other config
});
```

### 2. Image コンポーネントの使用

```astro
---
import { Image } from "astro:assets";
import myImage from "../assets/my-image.jpg";
---

<Image src={myImage} alt="Description" />
```

### 3. レイアウトオプション

| レイアウト   | 説明                                           |
| ------------ | ---------------------------------------------- |
| `responsive` | コンテナに合わせてリサイズ（アスペクト比維持） |
| `fixed`      | 固定サイズ                                     |
| `full-width` | 常に親要素の幅いっぱい                         |

## 現状の画像使用箇所

このプロジェクトで画像が使用されている可能性のある箇所：

- `src/data/assets/photo/` - 写真データ
- OG画像 - Satori で動的生成
- アイコン・ロゴ

## 検討事項

### メリット

- パフォーマンス向上（Core Web Vitals 改善）
- 手動での画像最適化が不要
- モダンフォーマット（WebP/AVIF）の自動サポート

### デメリット・注意点

- ビルド時間の増加（画像処理）
- 既存の画像パイプラインとの互換性確認が必要
- `pnpm generate:photo` との統合検討

## 優先度

低：パフォーマンス改善のためのオプション機能

## 影響範囲

- `astro.config.mjs`
- 画像を表示している全コンポーネント

## 検証方法

1. 開発サーバーで画像が正常に表示されること
2. ビルド後の画像サイズが最適化されていること
3. Lighthouse でのパフォーマンススコアの確認
4. `pnpm generate:photo` との互換性確認

## 参考

- [Astro Images](https://docs.astro.build/en/guides/images/)
- [Astro v5 - Responsive Images](https://docs.astro.build/en/guides/images/#responsive-images)
- [Astro Image Configuration](https://docs.astro.build/en/reference/configuration-reference/#image-options)
