# CLAUDE.md

s-hirano-ist のポートフォリオサイト（https://s-hirano.com/）のソースコード。AstroベースのSSGとして構築されており、ReactコンポーネントとTailwindCSSを使用。

## コマンド

主要コマンドは `package.json` の `scripts` を参照（重複記載による更新漏れを避けるため、ここでは列挙しない）。

## アーキテクチャ概要

### フレームワーク構成

- **メインフレームワーク**: Astro（SSG）
- **UI コンポーネント**: React（`src/components/react/` 内のみ有効、Astro設定で制限）
- **スタイリング**: TailwindCSS + DaisyUI
- **型システム**: TypeScript
- **パッケージマネージャー**: pnpm（バージョンは `mise.toml` で固定。`mise install` でセットアップ）

### ディレクトリ構造

```text
src/
├── components/        # Astro コンポーネント
│   └── react/        # React コンポーネント（BookList, Rating等）
├── content/          # Astro Content Collections
│   └── blog/         # ブログ記事（Markdown）
├── data/             # 静的データとアセット
│   ├── _diy/         # DIY作品データ
│   ├── _photo/       # 写真パスデータ（自動生成）
│   ├── assets/       # 画像・アイコン等
│   ├── book/         # 書籍データ（自動生成）
│   ├── external-articles.json  # 外部記事データ
│   ├── license/      # ライセンス情報（自動生成）
│   └── portfolio/    # ポートフォリオ用JSON データ
├── layouts/          # ページレイアウト
├── pages/            # ルーティング（Astro）
├── content.config.ts  # Content Collections定義（Zod スキーマ）
├── env.d.ts           # 型参照ファイル
├── styles/           # グローバルCSS
└── utils/            # ユーティリティ関数
```

### 重要なファイル

- `src/config.ts` - サイト設定（URL、作者情報、MAX_RATING等）
- `src/content.config.ts` - Content Collections定義（Zod スキーマ）
- `astro.config.mjs` - Astro設定（React は `**/react/*` パターンのみ有効）
- `src/data/book/_original.ts` - 書籍の ISBN・評価・タグ元データ

### データ管理

- **ブログ**: Astro Content Collections（`src/content/blog/`）
- **書籍データ**: `src/data/book/_original.ts` に ISBN とメタ情報を記載し、`pnpm generate:book` で Google Books API 経由で `data.gen.json` を生成
- **写真**: `src/data/assets/photo/` に画像を追加後、`pnpm generate:photo` で `src/data/_photo/data.ts` を自動生成
- **ポートフォリオ**: JSON ファイルで管理（`src/data/portfolio/`）
- **ライセンス**: `pnpm license:json` で `src/data/license/data.gen.json` を自動生成

### 品質管理

- Husky + lint-staged によるpre-commitフック
- 複数のlinter並行実行（ESLint, Stylelint, markdownlint, secretlint）
- Renovateによる依存関係自動更新

### シークレット管理・インフラ

- **Doppler** がシークレットの一元管理ツール（source of truth）。**Terraform**（`terraform/`）で Doppler プロジェクトと Cloudflare Pages を IaC 管理する
- プロジェクト: `s-public`、環境: `dev`（ローカル）/ `ci`（GitHub Actions）/ `infra`（Terraform 用）
- シークレットの同期先:
  - `GA_MEASUREMENT_ID`（`visibility=unmasked`）→ GitHub Actions **variable**
  - `GOOGLE_BOOKS_API_KEY`, `LHCI_GITHUB_APP_TOKEN`（`visibility=masked`）→ GitHub Actions **secret**
  - `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`（`infra` 環境のみ）→ Terraform が Doppler data source（`data "doppler_secrets" "infra"`）で直接取得
- ローカルでは `.env.local` に `DOPPLER_TOKEN` を保存し、mise が自動読み込み。secrets が必要な script は `doppler run` 経由で注入される（実践的なセットアップ手順は README を参照）
- Terraform は Doppler プロバイダー経由で環境・シークレット・サービストークンを管理するため、**個人トークン（CLI トークン）** が必要。サービストークンでは権限不足になる
- mise（`mise.toml`）の管理ツール: `node`, `pnpm`, `doppler`, `terraform`
- `pnpm` は `mise.toml` と `package.json` の `packageManager` の 2 箇所に記載があるが、Renovate が同一 PR で同期して bump するため手動更新は不要（mise 非対応の Cloudflare Pages 等は `packageManager` 経由で `corepack` が解決する）

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
- 各記事には heading, slug, description, draft, date が必要
- ドラフトは `draft: true` で非公開

### コミット前の確認

lint-staged により以下が自動実行されます：

- 型チェック（pnpm check, pnpm tsc）
- フォーマット・リント（各種linter）
- ライセンスチェック（bash checkLicense.sh）

### リリース手順

1. `package.json` の version を更新
2. `gh release create --generate-notes` を実行
