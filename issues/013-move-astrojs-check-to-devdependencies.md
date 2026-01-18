# @astrojs/check を devDependencies に移動

## ステータス: 未着手

## 優先度: 高

## 難易度: 低

## 概要

`@astrojs/check` パッケージが `dependencies` に配置されているが、開発時のみ使用するツールのため `devDependencies` に移動する。

## 現状

```json
// package.json
{
  "dependencies": {
    "@astrojs/check": "^0.9.4"
    // ...
  }
}
```

## 提案内容

### package.json の修正

```json
// package.json
{
  "devDependencies": {
    "@astrojs/check": "^0.9.4"
    // ...
  }
}
```

### 実行コマンド

```bash
pnpm remove @astrojs/check
pnpm add -D @astrojs/check
```

## 理由

1. **用途**: `@astrojs/check` は `pnpm check` コマンドで使用される型チェックツール
2. **ランタイム不要**: ビルド成果物には含まれない
3. **ベストプラクティス**: 開発ツールは `devDependencies` に配置すべき
4. **一貫性**: 他の開発ツール（ESLint, Prettier 等）は正しく `devDependencies` に配置されている

## 変更対象ファイル

- `package.json` - dependencies から devDependencies への移動

## 検証手順

1. `pnpm remove @astrojs/check`
2. `pnpm add -D @astrojs/check`
3. `pnpm check` が正常に動作することを確認
4. `pnpm build` が正常に完了することを確認

## 参考

- [npm dependencies vs devDependencies](https://docs.npmjs.com/specifying-dependencies-and-devdependencies-in-a-package-json-file)
- [@astrojs/check](https://www.npmjs.com/package/@astrojs/check)
