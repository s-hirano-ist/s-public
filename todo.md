# Doppler + Terraform セットアップ手順

## 事前準備

- [ ] Doppler アカウント作成 (<https://doppler.com>)
- [ ] Doppler CLI インストール (`brew install dopplerhq/cli/doppler`)
- [ ] Doppler にログイン (`doppler login`)

## Step 1: Terraform apply（プロジェクト + シークレットエントリ + service token 作成）

```bash
cd terraform/
export DOPPLER_TOKEN=$(doppler configure get token --plain)
terraform init
terraform apply
```

- [ ] `terraform init` 実行
- [ ] `terraform apply` 実行

## Step 2: Doppler ダッシュボードでシークレット値を設定

- [ ] dev config に `GOOGLE_BOOKS_API_KEY` を設定
- [ ] ci config に `GOOGLE_BOOKS_API_KEY` を設定
- [ ] ci config に `LHCI_GITHUB_APP_TOKEN` を設定

## Step 3: Service token を GitHub secrets に登録

```bash
terraform output -raw doppler_ci_service_token | gh secret set DOPPLER_TOKEN
```

- [ ] `DOPPLER_TOKEN` を GitHub secrets に登録

## Step 4: ローカル開発環境セットアップ（mise + Doppler）

```bash
mise install
cd terraform
echo "DOPPLER_TOKEN=$(DOPPLER_TOKEN=$(doppler configure get token --plain) terraform output -raw doppler_dev_ai_agent_service_token)" > ../.env.local
cd ..
```

- [ ] `mise install` でツールインストール
- [ ] `.env.local` にサービストークンを設定

## 動作確認

- [ ] CI ワークフローが正常に動作する（`pnpm build` が成功する）
- [ ] `pnpm generate:book` がローカルで動作する（mise 経由で secrets 自動注入）

## Vercel

- [ ] Vercel project settings で `GA_MEASUREMENT_ID=G-E84VM45L0L` を環境変数に設定
