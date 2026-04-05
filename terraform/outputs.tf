output "doppler_project" {
  description = "Doppler project name"
  value       = doppler_project.s_public.name
}

output "doppler_ci_service_token" {
  description = "Service token for GitHub Actions (set as DOPPLER_TOKEN secret)"
  value       = doppler_service_token.ci.key
  sensitive   = true
}
