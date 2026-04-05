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

## 動作確認

- [ ] CI ワークフローが正常に動作する（`pnpm build` が成功する）
- [ ] `doppler run -- pnpm generate:book` がローカルで動作する

## Vercel

- [ ] Vercel project settings で `GA_MEASUREMENT_ID=G-E84VM45L0L` を環境変数に設定
