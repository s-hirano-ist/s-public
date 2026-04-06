output "doppler_project" {
  description = "Doppler project name"
  value       = doppler_project.s_public.name
}

output "doppler_ci_service_token" {
  description = "Service token for GitHub Actions (set as DOPPLER_TOKEN secret)"
  value       = doppler_service_token.ci.key
  sensitive   = true
}

output "doppler_dev_ai_agent_service_token" {
  description = "Service token for AI agent (read-only access to dev config)"
  value       = doppler_service_token.dev_ai_agent.key
  sensitive   = true
}

output "cloudflare_pages_url" {
  description = "Cloudflare Pages default URL"
  value       = "https://${cloudflare_pages_project.s_public.name}.pages.dev"
}
