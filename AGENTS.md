# AGENTS.md

s-hirano-ist のポートフォリオサイト（https://s-hirano.com/）のソースコード。AstroベースのSSGとして構築されており、ReactコンポーネントとTailwindCSSを使用。

## コマンド

主要コマンドは `package.json` の `scripts` を参照（重複記載による更新漏れを避けるため、ここでは列挙しない）。

## アーキテクチャ概要

### フレームワーク構成

- **メインフレームワーク**: Astro（SSG）
- **UI コンポーネント**: React（`src/components/react/` 内のみ有効、Astro設定で制限）
- **スタイリング**: TailwindCSS
- **型システム**: TypeScript
- **ランタイム / パッケージマネージャー**: Bun（バージョンは `mise.toml` と `package.json` で固定。`mise install` でセットアップ）

### ディレクトリ構造

```text
src/
├── components/        # Astro コンポーネント
│   └── react/        # Reactコンポーネント（BookList, Rating等）
├── content/          # Astro Content Collections
│   └── blog/         # ブログ記事（Markdown）
├── data/             # 静的データとアセット
│   ├── _diy/         # DIY作品データ
│   ├── _photo/       # 写真パスデータ（自動生成）
│   ├── assets/       # 画像・アイコン等
│   ├── book/         # 書籍データ（自動生成）
│   ├── external-articles.json  # 外部記事データ
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
- `astro.config.mjs` - Astro設定（React は `**/react/*` のみ有効、Sätteri、Astro Fonts等）
- `src/data/book/_original.ts` - 書籍の ISBN・評価・タグ元データ

### データ管理

- **ブログ**: Astro Content Collections（`src/content/blog/`）
- **書籍データ**: 非公開コンテンツリポジトリのメタ情報を `bun run generate:book` で取得し、`data.gen.json` を生成
- **写真**: `src/data/assets/photo/` に画像を追加後、`bun run generate:photo` で `src/data/_photo/data.ts` を自動生成
- **ポートフォリオ**: JSON ファイルで管理（`src/data/portfolio/`）
- **ライセンス**: production client buildに含まれる依存から`dist/THIRD_PARTY_NOTICES.txt`を自動生成

書籍データは`.github/workflows/update-contents.yaml`が週次でも自動生成し、更新をPRとして作成する。写真パスは画像追加時にローカルで生成する。

### 品質管理

- CI: `.github/workflows/`（`ci.yaml`のquality jobでtype check / format / lint / build、`lighthouse.yaml`で非blockingのLighthouse検査とPRコメント、`osv-scanner.yaml`・`dependency-review.yaml`で脆弱性・ライセンス検査）
- 依存関係更新: Renovate（`.github/renovate.json5`）

### シークレット管理・インフラ

- **Doppler** がシークレットの一元管理ツール（source of truth）。**Terraform**（`terraform/`）で Doppler プロジェクトと Cloudflare Pages を IaC 管理する
- プロジェクト: `s-public`、環境: `dev`（ローカル）/ `ci`（GitHub Actions）/ `infra`（Terraform 用）
- シークレットの同期先:
  - `GA_MEASUREMENT_ID`（`visibility=unmasked`）→ GitHub Actions **variable**
  - `GOOGLE_BOOKS_API_KEY`, `GITHUB_ACTION_TOKEN`（`visibility=masked`）→ GitHub Actions **secret**
  - `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`（`infra` 環境のみ）→ Terraform が Doppler data source（`data "doppler_secrets" "infra"`）で直接取得
- ローカルでは `.env.local` に `DOPPLER_TOKEN` を保存し、mise が自動読み込み。secrets が必要な script は `doppler run` 経由で注入される（実践的なセットアップ手順は README を参照）
- Terraform は Doppler プロバイダー経由で環境・シークレット・サービストークンを管理するため、**個人トークン（CLI トークン）** が必要。サービストークンでは権限不足になる
- mise（`mise.toml`）の管理ツール: `bun`, `node`, `doppler`, `terraform`。Node.js は `npm:agent-browser` のインストール専用で、サイトのスクリプトは `bunfig.toml` の `run.bun = true` により Bun で実行する
- Bun は `mise.toml` と `package.json` の `packageManager` の 2 箇所に記載する。Renovate が同一 PR で同期して更新し、Cloudflare Pages の `BUN_VERSION` は Terraform が `packageManager` から導出する

## 開発時の注意点

### スタイリング

- TailwindCSSを使用
- `src/styles/base.css` でグローバルスタイル定義
- コンポーネントでは Tailwind クラスを使用

### 画像・アセット

- 画像は `src/data/assets/` 配下に配置
- 写真追加時は `bun run generate:photo` を実行
- OG画像は動的生成（Satori使用）

### コンテンツ管理

- ブログ記事は `src/content/blog/` に Markdown で作成
- 各記事には heading, slug, description, draft, date が必要
- ドラフトは `draft: true` で非公開

### UI変更のブラウザ検証

- 複数工程のUI変更は、必要に応じて `/goal <変更内容>。品質検査とproduction buildを通し、影響ページをagent-browserでdesktop/mobile検証し、不備を修正・再検証して全条件を満たすまで継続する。` の形式でGoal modeを使う
- UIに影響する変更はproduction build後に`bun run preview -- --host 127.0.0.1`を起動し、変更の影響を受ける全ルートをagent-browserで確認する
- 初回またはagent-browserが起動しない場合は`mise run browser:setup`でCLI・Chromeを自己診断する
- 他のエージェントと競合しない一意なnamed sessionを使い、複数操作は`batch`で実行する
- 1440×900と390×844の両viewportで変更箇所を操作し、accessibility snapshot、スクリーンショット、主要リンク、`console`、`errors`を確認する
- スクリーンショットは保存するだけでなく、実際に目視してレイアウト崩れ、重なり、見切れ、予期しない横スクロールがないことを確認する
- 不備またはconsole/page errorが1件でもあれば修正し、production buildとpreviewをやり直し、影響ルートの両viewportを再検証する。すべて合格するまで完了扱いにしない
- 認証状態や成果物はリポジトリに保存せず一時ディレクトリを使う
- 検証の成否にかかわらずagent-browser sessionとpreview processを必ず終了する
- 最終報告に検証したルート、viewport、操作、console/page errorの結果を記載する

### リリース手順

README の「Tags & Release」を参照。
