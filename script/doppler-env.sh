#!/usr/bin/env bash
# Doppler secrets を環境変数に注入する
# 用途:
#   source script/doppler-env.sh              — .env.local のサービストークンで dev secrets を注入
#   source script/doppler-env.sh --terraform  — 個人トークンで Terraform 用環境を構築

set -euo pipefail

TERRAFORM_MODE=false
if [ "${1:-}" = "--terraform" ]; then
  TERRAFORM_MODE=true
fi

if [ "$TERRAFORM_MODE" = true ]; then
  # Terraform モード: 個人トークン（CLI トークン）を使用
  # Doppler プロバイダーが環境・シークレット・サービストークンを管理するため admin 権限が必要
  DOPPLER_TOKEN=$(doppler configure get token --plain)
  if [ -z "$DOPPLER_TOKEN" ]; then
    echo "[doppler-env] Doppler CLI token not found. Run 'doppler login' first." >&2
    exit 1
  fi
  export DOPPLER_TOKEN

  # infra config から Cloudflare 認証情報等を取得
  set -a
  eval "$(doppler secrets download --project s-public --config infra --format=env-no-quotes --no-file)"
  set +a
else
  # 通常モード: .env.local のサービストークンを使用
  ENV_FILE=".env.local"

  if [ ! -f "$ENV_FILE" ]; then
    echo "[doppler-env] $ENV_FILE not found. See README.md for setup instructions." >&2
    exit 1
  fi

  set -a
  # shellcheck source=/dev/null
  source "$ENV_FILE"
  set +a

  if [ -z "${DOPPLER_TOKEN:-}" ]; then
    echo "[doppler-env] DOPPLER_TOKEN not found in $ENV_FILE" >&2
    exit 1
  fi

  export DOPPLER_TOKEN

  set -a
  eval "$(doppler secrets download --format=env-no-quotes --no-file)"
  set +a
fi

# Map Doppler secrets to Terraform variable env vars (TF_VAR_*)
export TF_VAR_cloudflare_account_id="${CLOUDFLARE_ACCOUNT_ID:-}"
