# astro:env による型安全な環境変数管理

## ステータス: 未着手

## 優先度: 中

## 難易度: 低

## 概要

Astro v5 で導入された `astro:env` 機能を活用し、環境変数を型安全に管理する。現在ハードコードされている Google Analytics ID などを環境変数化することで、環境ごとの設定切り替えを容易にする。

## 現状

- Google Analytics ID (`G-E84VM45L0L`) が `Layout.astro` にハードコード
- 環境ごとの切り替えが困難
- 開発環境でも Analytics スクリプトが読み込まれる

## 提案内容

### 1. astro.config.mjs での環境変数スキーマ定義

```javascript
// astro.config.mjs
import { defineConfig, envField } from "astro/config";

export default defineConfig({
  env: {
    schema: {
      GA_MEASUREMENT_ID: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
    },
  },
  // ... other config
});
```

### 2. Layout.astro での使用

```astro
---
import { GA_MEASUREMENT_ID } from "astro:env/client";
---

{
  GA_MEASUREMENT_ID && (
    <>
      <script
        is:inline
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script is:inline define:vars={{ GA_MEASUREMENT_ID }}>
        window.dataLayer = window.dataLayer || []; function gtag(){" "}
        {dataLayer.push(arguments)}
        gtag("js", new Date()); gtag("config", GA_MEASUREMENT_ID);
      </script>
    </>
  )
}
```

### 3. 環境変数ファイルの作成

```bash
# .env.example
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# .env.production
PUBLIC_GA_MEASUREMENT_ID=G-E84VM45L0L
```

## 変更対象ファイル

- `astro.config.mjs` - env スキーマ追加
- `src/layouts/Layout.astro` - 環境変数使用に変更
- `.env.example`（新規）- 環境変数テンプレート
- `.env.production`（新規）- 本番環境用設定
- `.gitignore` - `.env.production` の追加（任意）

## メリット

- 型安全な環境変数アクセス
- 開発環境での Analytics 無効化が容易
- 将来的な環境変数追加が容易
- Astro 公式の推奨パターンに準拠

## 参考

- [Astro Environment Variables](https://docs.astro.build/en/guides/environment-variables/)
- [Astro v5 - astro:env](https://docs.astro.build/en/reference/modules/astro-env/)
