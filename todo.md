# Doppler + Terraform セットアップ手順

## 事前準備

- [ ] Doppler アカウント作成 (<https://doppler.com>)
- [ ] Doppler CLI インストール (`brew install dopplerhq/cli/doppler`)
- [ ] Doppler にログイン (`doppler login`)

## Step 1: Terraform 初回 apply（プロジェクト + シークレットエントリ作成）

```bash
cd terraform/
export DOPPLER_TOKEN=$(doppler configure get token --plain)
terraform init
terraform apply
```

- [ ] `terraform init` 実行
- [ ] `terraform apply` 実行（Doppler プロジェクト + シークレットエントリ作成、sync はまだ）

## Step 2: Doppler ダッシュボードでシークレット値を設定

- [ ] dev config に `GOOGLE_BOOKS_API_KEY` を設定
- [ ] ci config に `GOOGLE_BOOKS_API_KEY` を設定
- [ ] ci config に `LHCI_GITHUB_APP_TOKEN` を設定

## Step 3: Doppler ダッシュボードで GitHub integration 作成

- [ ] Settings > Integrations > GitHub を追加し `s-hirano-ist/s-public` を認可
- [ ] Integration slug をメモ

## Step 4: Terraform 2 回目 apply（GitHub sync 作成）

```bash
terraform apply -var="doppler_integration_id=<integration-slug>"
```

- [ ] `terraform apply` 実行（GitHub Actions への sync が作成される）

## 動作確認

- [ ] GitHub Settings > Secrets and variables > Actions で確認:
  - Variables に `GA_MEASUREMENT_ID` が存在する
  - Secrets に `GOOGLE_BOOKS_API_KEY` が存在する
  - Secrets に `LHCI_GITHUB_APP_TOKEN` が存在する
- [ ] CI ワークフローが正常に動作する（`pnpm build` が成功する）
- [ ] `doppler run -- pnpm generate:book` がローカルで動作する

## Vercel

- [ ] Vercel project settings で `GA_MEASUREMENT_ID=G-E84VM45L0L` を環境変数に設定
