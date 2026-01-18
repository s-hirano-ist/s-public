# Responsive Images 機能の活用検討

## ステータス: 完了

Astro v5.10 で安定版となった Responsive Images 機能を導入しました。

## 実施内容

### astro.config.mjs での設定

```javascript
// astro.config.mjs
export default defineConfig({
  image: {
    layout: "constrained", // Astro 5.10+ の安定版 API
  },
  // ... other config
});
```

### 適用された画像コンポーネント

- `src/components/Top.astro` - トップページのアイコン
- `src/components/SwiperContainer.astro` - DIY プロジェクトの画像スライダー
- `src/pages/photo/index.astro` - フォトギャラリー
- `src/components/LinkCard.astro` - OGP 画像

### 生成結果

- 画像に `srcset` と `sizes` 属性が自動追加
- 複数サイズ（640w, 750w, 828w, 1080w, 1280w, 1440w, 1668w, 2048w）を自動生成
- WebP フォーマットで最適化

## レイアウトオプション

| レイアウト    | 説明                                           |
| ------------- | ---------------------------------------------- |
| `constrained` | コンテナに合わせてリサイズ（最大サイズを制限） |
| `fixed`       | 固定サイズ                                     |
| `full-width`  | 常に親要素の幅いっぱい                         |

## 備考

- ビルド時間は約 2.5 秒から約 27 秒に増加（初回ビルド時）
- キャッシュが効いている場合は通常のビルド時間に近い
- `pnpm generate:photo` との互換性は維持

## 参考

- [Astro Images](https://docs.astro.build/en/guides/images/)
- [Astro v5 - Responsive Images](https://docs.astro.build/en/guides/images/#responsive-images)
- [Astro 5.10 Release Blog](https://astro.build/blog/astro-5100/)
