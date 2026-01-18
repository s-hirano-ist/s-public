# tsconfig.json の更新

## 概要

Astro v5 では `.astro/types.d.ts` に自動生成される型定義ファイルを `tsconfig.json` の `include` に追加することが推奨されています。

## 現状

```json
{
  "extends": "astro/tsconfigs/strictest",
  "compilerOptions": {
    // ... 設定
  },
  "exclude": ["node_modules", "dist"]
}
```

`include` が明示的に指定されていないため、デフォルトの動作に依存しています。

## 変更後

```json
{
  "extends": "astro/tsconfigs/strictest",
  "compilerOptions": {
    // ... 設定
  },
  "include": [".astro/types.d.ts", "src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## 背景

Astro は開発時およびビルド時に `.astro/types.d.ts` ファイルを自動生成します。このファイルには：

- Content Collections の型定義
- 環境変数の型定義
- その他 Astro 固有の型

が含まれています。これを明示的に include することで、IDE での型補完が向上します。

## .gitignore の確認

`.astro/` ディレクトリは自動生成されるため、`.gitignore` に追加されていることを確認してください：

```
# Astro
.astro/
```

## 優先度

低：IDE での開発体験向上のための変更

## 影響範囲

- `tsconfig.json`

## 検証方法

1. `pnpm tsc` で型チェックが通ること
2. `pnpm check` で Astro の型チェックが通ること
3. IDE で Content Collections の型補完が正常に動作すること

## 参考

- [Astro TypeScript Guide](https://docs.astro.build/en/guides/typescript/)
- [Astro v5 Upgrade Guide](https://docs.astro.build/en/guides/upgrade-to/v5/)
