# entry.render() の移行

## 概要

Astro v5 の Content Layer API では、コンテンツのレンダリング方法が `entry.render()` から `render(entry)` に変更されました。

## 現状

```astro
---
// src/pages/blog/[slug].astro:25
const { Content } = await post.render();
---
```

## 変更後

```astro
---
// src/pages/blog/[slug].astro
import { render } from "astro:content";

const { Content } = await render(post);
---
```

## 主な変更点

1. `astro:content` から `render` 関数をインポート
2. `entry.render()` を `render(entry)` に変更

## なぜこの変更が必要か

Content Layer API では、コレクションエントリーがより汎用的なデータ構造となり、レンダリングはエントリーのメソッドではなく、独立した関数として提供されるようになりました。これにより：

- 型安全性の向上
- より明示的なインポート
- 将来の拡張性

## 影響範囲

- `src/pages/blog/[slug].astro`
- その他 `entry.render()` を使用しているファイル

## 調査コマンド

```bash
grep -r "\.render()" --include="*.astro" src/
```

## 検証方法

1. `pnpm check` で型エラーがないこと
2. `pnpm build` でビルドが成功すること
3. ブログ記事ページが正常に表示されること
4. マークダウンのレンダリング（見出し、リンク、コードブロックなど）が正常に動作すること

## 参考

- [Astro v5 Upgrade Guide - render()](https://docs.astro.build/en/guides/upgrade-to/v5/#changed-render-is-now-a-module)
- [Astro Content Collections - Rendering Content](https://docs.astro.build/en/guides/content-collections/#rendering-body-content)
