# DOPPLER_TOKEN env var is read automatically
# Use: export DOPPLER_TOKEN=$(doppler configure get token --plain)
provider "doppler" {}

resource "doppler_project" "s_public" {
  name        = "s-public"
  description = "s-hirano.com portfolio site"
}

resource "doppler_environment" "dev" {
  project = doppler_project.s_public.name
  slug    = "dev"
  name    = "Development"
}

resource "doppler_environment" "ci" {
  project = doppler_project.s_public.name
  slug    = "ci"
  name    = "CI"
}

resource "doppler_environment" "infra" {
  project = doppler_project.s_public.name
  slug    = "infra"
  name    = "Infrastructure"
}

# Public value: synced as GitHub Actions variable (visibility = unmasked)
resource "doppler_secret" "ga_measurement_id_dev" {
  project    = doppler_project.s_public.name
  config     = doppler_environment.dev.slug
  name       = "GA_MEASUREMENT_ID"
  value      = var.ga_measurement_id
  visibility = "unmasked"
}

resource "doppler_secret" "ga_measurement_id_ci" {
  project    = doppler_project.s_public.name
  config     = doppler_environment.ci.slug
  name       = "GA_MEASUREMENT_ID"
  value      = var.ga_measurement_id
  visibility = "unmasked"
}

# Secrets: initial empty values, set actual values in Doppler dashboard
resource "doppler_secret" "google_books_api_key_dev" {
  project = doppler_project.s_public.name
  config  = doppler_environment.dev.slug
  name    = "GOOGLE_BOOKS_API_KEY"
  value   = ""

  lifecycle {
    ignore_changes = [value]
  }
}

resource "doppler_secret" "google_books_api_key_ci" {
  project = doppler_project.s_public.name
  config  = doppler_environment.ci.slug
  name    = "GOOGLE_BOOKS_API_KEY"
  value   = ""

  lifecycle {
    ignore_changes = [value]
  }
}

resource "doppler_secret" "lhci_github_app_token_ci" {
  project = doppler_project.s_public.name
  config  = doppler_environment.ci.slug
  name    = "LHCI_GITHUB_APP_TOKEN"
  value   = ""

  lifecycle {
    ignore_changes = [value]
  }
}

# Service token for GitHub Actions (read-only access to ci config)
resource "doppler_service_token" "ci" {
  project = doppler_project.s_public.name
  config  = doppler_environment.ci.slug
  name    = "github-actions"
  access  = "read"
}

# Service token for AI agent (read-only access to dev config)
resource "doppler_service_token" "dev_ai_agent" {
  project = doppler_project.s_public.name
  config  = doppler_environment.dev.slug
  name    = "ai-agent"
  access  = "read"
}

# Cloudflare credentials: set actual values in Doppler dashboard
# infra 環境に分離し、AI エージェントの dev サービストークンからアクセス不可にする
resource "doppler_secret" "cloudflare_api_token_infra" {
  project = doppler_project.s_public.name
  config  = doppler_environment.infra.slug
  name    = "CLOUDFLARE_API_TOKEN"
  value   = ""

  lifecycle {
    ignore_changes = [value]
  }
}

resource "doppler_secret" "cloudflare_account_id_infra" {
  project = doppler_project.s_public.name
  config  = doppler_environment.infra.slug
  name    = "CLOUDFLARE_ACCOUNT_ID"
  value   = ""

  lifecycle {
    ignore_changes = [value]
  }
}

# =============================================================================
# Cloudflare Pages
# =============================================================================

# CLOUDFLARE_API_TOKEN env var is read automatically
provider "cloudflare" {}

resource "cloudflare_pages_project" "s_public" {
  account_id        = var.cloudflare_account_id
  name              = "s-public"
  production_branch = "main"

  build_config = {
    build_command   = "pnpm build"
    destination_dir = "dist"
    build_caching   = true
    root_dir        = ""
  }

  source = {
    type = "github"
    config = {
      owner                          = "s-hirano-ist"
      repo_name                      = "s-public"
      production_branch              = "main"
      pr_comments_enabled            = true
      production_deployments_enabled = true
      preview_deployment_setting     = "all"
      path_includes                  = ["*"]
      preview_branch_includes        = ["*"]
    }
  }

  # Cloudflare プロバイダーがサーバー側で算出する読み取り専用フィールド
  # (owner_id, repo_id, deployments_enabled, web_analytics_*, env_vars value sensitivity)
  # ユーザーが制御可能な設定はすべて上記で明示的に定義済み
  lifecycle {
    ignore_changes = [
      source.config.owner_id,
      source.config.repo_id,
      source.config.deployments_enabled,
      source.config.path_excludes,
      source.config.preview_branch_excludes,
      build_config.web_analytics_tag,
      build_config.web_analytics_token,
      deployment_configs.production.env_vars,
      deployment_configs.preview.env_vars,
    ]
  }

  deployment_configs = {
    production = {
      env_vars = {
        GA_MEASUREMENT_ID = {
          type  = "plain_text"
          value = var.ga_measurement_id
        }
        NODE_VERSION = {
          type  = "plain_text"
          value = "24.14.1"
        }
      }
    }
    preview = {
      env_vars = {
        GA_MEASUREMENT_ID = {
          type  = "plain_text"
          value = var.ga_measurement_id
        }
        NODE_VERSION = {
          type  = "plain_text"
          value = "24.14.1"
        }
      }
    }
  }

}

resource "cloudflare_pages_domain" "s_hirano_com" {
  account_id   = var.cloudflare_account_id
  project_name = cloudflare_pages_project.s_public.name
  name         = "s-hirano.com"
}
