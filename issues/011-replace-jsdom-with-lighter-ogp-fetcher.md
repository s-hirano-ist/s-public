# OGP 取得の軽量化検討

## ステータス: 未着手

## 優先度: 低

## 難易度: 中

## 概要

現在 OGP（Open Graph Protocol）情報の取得に使用している `jsdom` + `sanitize-html` の組み合わせを、より軽量な方法に置き換えることを検討する。

## 現状

### 使用ライブラリ

- `jsdom`: HTML パーシング（約 2.5MB のパッケージ）
- `sanitize-html`: HTML サニタイズ

### 使用箇所

- `src/utils/fetchOgp.ts` - OGP 情報取得ユーティリティ
- `src/components/LinkCard.astro` - リンクカード表示

### 現在の処理フロー

1. URL から HTML を fetch
2. `jsdom` で DOM をパース
3. meta タグから OGP 情報を抽出
4. `sanitize-html` でサニタイズ

## 提案内容

### 推奨: 現状維持

以下の理由から、現時点では現状維持を推奨する。

1. **SSG のためランタイム影響なし**: ビルド時のみ実行される
2. **動作の安定性**: `jsdom` は堅牢な DOM パーシングを提供
3. **移行リスク**: 軽量ライブラリへの移行でエッジケース対応が困難になる可能性

### 代替案: 軽量化する場合

#### A. cheerio への移行

```typescript
// src/utils/fetchOgp.ts
import * as cheerio from "cheerio";

export async function fetchOgp(url: string) {
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);

  return {
    title: $('meta[property="og:title"]').attr("content"),
    description: $('meta[property="og:description"]').attr("content"),
    image: $('meta[property="og:image"]').attr("content"),
  };
}
```

- パッケージサイズ: ~2MB（jsdom と同程度だが軽量）
- 移行コスト: 低

#### B. 正規表現での直接抽出

```typescript
export async function fetchOgp(url: string) {
  const res = await fetch(url);
  const html = await res.text();

  const getMetaContent = (property: string) => {
    const match = html.match(
      new RegExp(`<meta[^>]*property="${property}"[^>]*content="([^"]*)"`, "i"),
    );
    return match?.[1] || null;
  };

  return {
    title: getMetaContent("og:title"),
    description: getMetaContent("og:description"),
    image: getMetaContent("og:image"),
  };
}
```

- 外部依存なし
- 移行コスト: 中
- 注意: HTML の書式に依存するため脆弱

#### C. open-graph-scraper への移行

```typescript
import ogs from "open-graph-scraper";

export async function fetchOgp(url: string) {
  const { result } = await ogs({ url });
  return {
    title: result.ogTitle,
    description: result.ogDescription,
    image: result.ogImage?.[0]?.url,
  };
}
```

- OGP 取得に特化したライブラリ
- 移行コスト: 低

## 変更対象ファイル（移行する場合）

- `src/utils/fetchOgp.ts` - OGP 取得ロジック変更
- `package.json` - パッケージ変更

## 結論

SSG のためビルド時のみの影響であり、現状で問題なく動作している。ビルド時間の大幅な改善が必要になった場合に再検討する。

## 参考

- [cheerio](https://cheerio.js.org/)
- [open-graph-scraper](https://github.com/jshemas/openGraphScraper)
