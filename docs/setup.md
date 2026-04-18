# セットアップ・シークレット管理

## シークレット管理

- **Doppler** がシークレットの一元管理ツール（source of truth）
- **Terraform**（`terraform/`）で Doppler プロジェクトと Cloudflare Pages を IaC 管理
- プロジェクト: `s-public`、環境: `dev`（ローカル）/ `ci`（GitHub Actions）/ `infra`（Terraform 用）
- `GA_MEASUREMENT_ID`（`visibility=unmasked`）→ GitHub Actions **variable** として同期
- `GOOGLE_BOOKS_API_KEY`, `LHCI_GITHUB_APP_TOKEN`（`visibility=masked`）→ GitHub Actions **secret** として同期
- `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`（infra 環境のみ）→ Terraform が Doppler data source で直接取得
- ローカル開発時は `.env.local` に `DOPPLER_TOKEN` を保存し、mise が自動読み込み
- `pnpm dev` 等の secrets が必要なコマンドは `doppler run` 経由で自動注入

## ローカル開発環境セットアップ

`.env.local` に Doppler トークンを設定するだけで、`pnpm dev` 等が secrets 付きで動作する。mise が `.env.local` を自動読み込みし、package.json の scripts が `doppler run` 経由で secrets を注入する。

**管理ツール（`mise.toml`）:** `node`, `pnpm`, `doppler`, `terraform`

> `pnpm` は `mise.toml` と `package.json` の `packageManager` の 2 箇所に記載があるが、Renovate が同一 PR で同期して bump するため手動更新は不要（mise 非対応の Cloudflare Pages 等は `packageManager` 経由で `corepack` が解決する）。

**初回セットアップ（人間が実施）:**

```bash
# 1. mise でツールインストール
mise install

# 2. .env.local にサービストークンを設定（要: doppler login 済み）
echo "DOPPLER_TOKEN=$(DOPPLER_TOKEN=$(doppler configure get token --plain) terraform -chdir=terraform output -raw doppler_dev_ai_agent_service_token)" > .env.local
```

設定後は `pnpm dev` や `pnpm generate:book` を直接実行可能。

## Terraform 実行時の設定

Terraform は Doppler プロバイダー経由で環境・シークレット・サービストークンを管理するため、**個人トークン（CLI トークン）** が必要。サービストークンでは権限不足でエラーになる。Cloudflare 認証情報は Terraform が Doppler data source（`data "doppler_secrets" "infra"`）で直接取得するため、環境変数の手動設定は不要。

```bash
# .env.local を個人トークンに切り替え
echo "DOPPLER_TOKEN=$(doppler configure get token --plain)" > .env.local

# Terraform 実行
terraform -chdir=terraform plan
```
