# Content Layer API への移行

## 概要

Astro v5 で安定版となった Content Layer API に移行します。現在の `type: "content"` 形式から新しい loader 形式への移行が必要です。

## 現状

```typescript
// src/content.config.ts
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    heading: z.string(),
    description: z.string(),
    draft: z.boolean(),
    date: z.coerce.date(),
  }),
});

export const collections = {
  blog,
};
```

## 変更後

```typescript
// src/content.config.ts
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    heading: z.string(),
    description: z.string(),
    draft: z.boolean(),
    date: z.coerce.date(),
  }),
});

export const collections = {
  blog,
};
```

## 主な変更点

1. `type: "content"` を `loader: glob(...)` に変更
2. `astro/loaders` から `glob` をインポート
3. `base` でコンテンツのディレクトリを指定

## API の変更

Content Layer API では一部の API が変更されています：

| 旧 API           | 新 API                            |
| ---------------- | --------------------------------- |
| `entry.slug`     | `entry.id` (スラッグとして使用)   |
| `entry.render()` | `render(entry)` (別 issue で対応) |

## 影響範囲

- `src/content.config.ts`
- Content Collections を使用している全ページ（`getCollection`, `getEntry` を使用している箇所）

## 検証方法

1. `pnpm check` で型エラーがないこと
2. `pnpm build` でビルドが成功すること
3. ブログ一覧ページ、個別記事ページが正常に表示されること

## 参考

- [Astro Content Layer API](https://docs.astro.build/en/guides/content-collections/)
- [Astro v5 Upgrade Guide - Content Collections](https://docs.astro.build/en/guides/upgrade-to/v5/#updating-existing-collections)
- [Built-in Loaders](https://docs.astro.build/en/reference/content-loader-reference/#built-in-loaders)
