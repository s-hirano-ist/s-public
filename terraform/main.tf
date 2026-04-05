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
