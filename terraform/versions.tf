terraform {
  required_version = "~> 1.14"

  # HCP Terraform stores the shared state while Terraform continues to run
  # locally (developer machines and GitHub Actions). Configure the target with
  # TF_CLOUD_ORGANIZATION and TF_WORKSPACE.
  cloud {}

  required_providers {
    doppler = {
      source  = "DopplerHQ/doppler"
      version = "~> 1.21"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.18"
    }
  }
}
