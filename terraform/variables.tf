variable "ga_measurement_id" {
  description = "Google Analytics Measurement ID"
  type        = string
  default     = "G-E84VM45L0L"
}

variable "cloudflare_account_id" {
  description = "Cloudflare account ID"
  type        = string
  sensitive   = true
}
