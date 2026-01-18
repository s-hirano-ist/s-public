# schemas.ts の統合

## 概要

`src/schemas.ts` にブログ用の Zod スキーマと型定義が存在しますが、これは `src/content.config.ts` の Content Collections 定義と重複しています。Astro の推奨する `CollectionEntry<"blog">["data"]` 型を使用することで、この重複を解消できます。

## 現状

### src/schemas.ts

```typescript
import { z } from "astro:content";

export const blogSchema = z
  .object({
    heading: z.string(),
    draft: z.boolean(),
    description: z.string(),
    date: z.date(),
  })
  .strict();

export type BlogFrontmatter = z.infer<typeof blogSchema>;
```

### src/content.config.ts

```typescript
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

### src/schemas.ts を削除

このファイルは不要になるため削除します。

### 型を使用している箇所の修正

```typescript
// 変更前
import type { BlogFrontmatter } from "@schemas";

// 変更後
import type { CollectionEntry } from "astro:content";
type BlogFrontmatter = CollectionEntry<"blog">["data"];
```

## 影響範囲

1. `src/schemas.ts` - 削除
2. `src/schemas.ts` をインポートしている全ファイル（要調査）

## 調査コマンド

```bash
grep -r "schemas" --include="*.ts" --include="*.astro" src/
```

## 検証方法

1. `pnpm check` で型エラーがないこと
2. `pnpm tsc` で型チェックが通ること
3. `pnpm build` でビルドが成功すること

## 参考

- [Astro Content Collections - Querying Collections](https://docs.astro.build/en/guides/content-collections/#querying-collections)
- [Astro Content Collections - CollectionEntry Type](https://docs.astro.build/en/reference/modules/astro-content/#collectionentry)
