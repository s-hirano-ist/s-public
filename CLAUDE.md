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
- **UI コンポーネント**: React（`src/components/react/` 内のみ有効、Astro設定で制限）
- **スタイリング**: TailwindCSS + DaisyUI
- **型システム**: TypeScript
- **パッケージマネージャー**: pnpm

### ディレクトリ構造

```text
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

- `src/config.ts` - サイト設定（URL、作者情報、MAX_RATING等）
- `src/content.config.ts` - Content Collections定義（Zod スキーマ）
- `astro.config.mjs` - Astro設定（React は `**/react/*` パターンのみ有効）
- `src/schemas.ts` - ブログ frontmatter 型定義
- `src/data/book/_original.ts` - 書籍の ISBN・評価・タグ元データ

### データ管理

- **ブログ**: Astro Content Collections（`src/content/blog/`）
- **書籍データ**: `src/data/book/_original.ts` に ISBN とメタ情報を記載し、`pnpm generate:book` で Google Books API 経由で `data.gen.json` を生成
- **写真**: `src/data/assets/photo/` に画像を追加後、`pnpm generate:photo` で `src/data/_photo/data.ts` を自動生成
- **ポートフォリオ**: JSON ファイルで管理（`src/data/portfolio/`）
- **ライセンス**: `pnpm license:json` で `src/data/license/data.gen.json` を自動生成

### シークレット管理

- **Doppler** がシークレットの一元管理ツール（source of truth）
- **Terraform**（`terraform/`）で Doppler プロジェクトと Cloudflare Pages を IaC 管理
- プロジェクト: `s-public`、環境: `dev`（ローカル）/ `ci`（GitHub Actions）/ `infra`（Terraform 用）
- `GA_MEASUREMENT_ID`（`visibility=unmasked`）→ GitHub Actions **variable** として同期
- `GOOGLE_BOOKS_API_KEY`, `LHCI_GITHUB_APP_TOKEN`（`visibility=masked`）→ GitHub Actions **secret** として同期
- `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`（infra 環境のみ）→ Terraform が Doppler data source で直接取得
- ローカル開発時は `.env.local` に `DOPPLER_TOKEN` を保存し、mise が自動読み込み
- `pnpm dev` 等の secrets が必要なコマンドは `doppler run` 経由で自動注入

### ローカル開発環境セットアップ

`.env.local` に Doppler トークンを設定するだけで、`pnpm dev` 等が secrets 付きで動作する。mise が `.env.local` を自動読み込みし、package.json の scripts が `doppler run` 経由で secrets を注入する。

**管理ツール（`mise.toml`）:** `doppler`, `terraform`

**初回セットアップ（人間が実施）:**

```bash
# 1. mise でツールインストール
mise install

# 2. .env.local にサービストークンを設定（要: doppler login 済み）
echo "DOPPLER_TOKEN=$(DOPPLER_TOKEN=$(doppler configure get token --plain) terraform -chdir=terraform output -raw doppler_dev_ai_agent_service_token)" > .env.local
```

設定後は `pnpm dev` や `pnpm generate:book` を直接実行可能。

**Terraform 実行時の設定:**

Terraform は Doppler プロバイダー経由で環境・シークレット・サービストークンを管理するため、**個人トークン（CLI トークン）** が必要。サービストークンでは権限不足でエラーになる。Cloudflare 認証情報は Terraform が Doppler data source（`data "doppler_secrets" "infra"`）で直接取得するため、環境変数の手動設定は不要。

```bash
# .env.local を個人トークンに切り替え
echo "DOPPLER_TOKEN=$(doppler configure get token --plain)" > .env.local

# Terraform 実行
terraform -chdir=terraform plan
```

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

### リリース手順

1. `package.json` の version を更新
2. `gh release create --generate-notes` を実行
