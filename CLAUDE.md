# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

このプロジェクトは s-hirano-ist のポートフォリオサイト（https://s-hirano.com/）のソースコードです。AstroベースのSSGとして構築されており、ReactコンポーネントとTailwindCSSを使用しています。

## よく使用されるコマンド

### 開発・ビルド関連

- `pnpm dev` - ローカル開発サーバーを起動（localhost:4321）
- `pnpm build` - 本番用ビルドを実行
- `pnpm preview` - ビルド結果をローカルでプレビュー
- `pnpm check` - Astroの型チェックを実行
- `pnpm tsc` - TypeScriptの型チェック（noEmit）

### リンティング・フォーマット関連

- `pnpm lint` - ESLintでコードチェック
- `pnpm lint:fix` - ESLintで自動修正
- `pnpm fmt` - Prettierでフォーマットチェック
- `pnpm fmt:fix` - Prettierで自動フォーマット
- `pnpm lint:css` - Stylelintでスタイルチェック
- `pnpm lint:css:fix` - Stylelintで自動修正
- `pnpm lint:mark` - markdownlint-cli2でマークダウンチェック
- `pnpm lint:mark:fix` - markdownlint-cli2で自動修正
- `pnpm lint:secret` - secretlintでシークレット情報チェック

### テスト・品質チェック

- `pnpm snapshots` - Playwrightでビジュアルリグレッションテスト
- `pnpm snapshots:update` - スナップショットの更新
- `pnpm security` - pnpm auditでセキュリティチェック

### データ生成・更新

- `pnpm generate:book` - 書籍データの生成（Google Books APIを使用）
- `pnpm generate:photo` - 写真パスの生成
- `pnpm license:summary` - ライセンス一覧の生成
- `pnpm license:json` - ライセンスJSONの生成

## アーキテクチャ概要

### フレームワーク構成

- **メインフレームワーク**: Astro（SSG）
- **UI コンポーネント**: React（`/react/`フォルダ内のみ）
- **スタイリング**: TailwindCSS + DaisyUI
- **型システム**: TypeScript
- **パッケージマネージャー**: pnpm

### ディレクトリ構造

```
src/
├── components/        # Astro コンポーネント
│   └── react/        # React コンポーネント（BookList, Rating等）
├── content/          # Astro Content Collections
│   └── blog/         # ブログ記事（Markdown）
├── data/             # 静的データとアセット
│   ├── assets/       # 画像・アイコン等
│   ├── book/         # 書籍データ（自動生成）
│   ├── license/      # ライセンス情報（自動生成）
│   └── portfolio/    # ポートフォリオ用JSON データ
├── layouts/          # ページレイアウト
├── pages/            # ルーティング（Astro）
├── schemas.ts        # Zod スキーマ定義
├── styles/           # グローバルCSS
└── utils/            # ユーティリティ関数
```

### 重要なファイル

- `src/config.ts` - サイト設定（URL、作者情報等）
- `src/content.config.ts` - Content Collections定義
- `astro.config.mjs` - Astro設定
- `src/schemas.ts` - データ型定義

### データ管理

- **ブログ**: Astro Content Collections（`src/content/blog/`）
- **書籍データ**: Google Books API経由で自動生成（`pnpm generate:book`）
- **写真**: 自動パス生成スクリプト（`pnpm generate:photo`）
- **ポートフォリオ**: JSON ファイルで管理（`src/data/portfolio/`）

### 品質管理

- Husky + lint-staged によるpre-commitフック
- 複数のlinter並行実行（ESLint, Stylelint, markdownlint, secretlint）
- Playwrightによるビジュアルリグレッションテスト
- Renovateによる依存関係自動更新

## 開発時の注意点

### スタイリング

- TailwindCSS + DaisyUI を使用
- `src/styles/base.css` でグローバルスタイル定義
- コンポーネントでは Tailwind クラスを使用

### 画像・アセット

- 画像は `src/data/assets/` 配下に配置
- 写真追加時は `pnpm generate:photo` を実行
- OG画像は動的生成（Satori使用）

### コンテンツ管理

- ブログ記事は `src/content/blog/` に Markdown で作成
- 各記事には heading, description, draft, date が必要
- ドラフトは `draft: true` で非公開

### コミット前の確認

lint-staged により以下が自動実行されます：

- 型チェック（pnpm check, pnpm tsc）
- フォーマット・リント（各種linter）
- ライセンスチェック（bash checkLicense.sh）
