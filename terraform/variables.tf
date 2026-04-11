variable "node_version" {
  description = "Node.js version for Cloudflare Pages build environment (keep in sync with mise.toml)"
  type        = string
  default     = "24.14.1"
}

variable "ga_measurement_id" {
  description = "Google Analytics Measurement ID"
  type        = string
  default     = "G-E84VM45L0L"
}
