# s-public

![License](https://img.shields.io/badge/license-MIT-blue)
![Build status](https://img.shields.io/github/actions/workflow/status/s-hirano-ist/s-public/ci.yaml?branch=main)
![GitHub stars](https://img.shields.io/github/stars/s-hirano-ist/s-public.svg)

> [!IMPORTANT]
> This is the source code of [s-hirano.com](https://s-hirano.com/).
> It consists of a portfolio and a blog which summarizes the knowledge I gained over the years.

## 💻 Tech Stack

**Main Framework** - [Astro](https://astro.build/)  
**Type Checking** - [TypeScript](https://www.typescriptlang.org/)  
**Component Framework** - [ReactJS](https://react.dev/)<br>
**Runtime / Package Manager** - [Bun](https://bun.sh/)<br>
**Styling** - [TailwindCSS](https://tailwindcss.com/)<br>
**Icons** - [Tabler Icons](https://tabler.io/icons)<br>
**Fonts** - [Astro Fonts](https://docs.astro.build/en/reference/experimental-flags/fonts/) + [Fontsource](https://fontsource.org/)<br>
**Code Formatting / Linting** - [Biome](https://biomejs.dev/)<br>
**Package updates** - [Renovate](https://www.mend.io/renovate/)  
**Performance and accessibility** - [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)<br>
**Vulnerabilities Check** - [Bun audit](https://bun.sh/docs/pm/cli/audit) | [OSV Scanner](https://github.com/google/osv-scanner) | [Dependency Review](https://github.com/actions/dependency-review-action)

### My infrastructure stack

**Version Management** - [GitHub](https://github.com/)  
**Deployment** - [Cloudflare Pages](https://www.cloudflare.com/ja-jp/developer-platform/products/pages/)  
**Analytics** - [Google Analytics](https://analytics.google.com/analytics/web/)  
**Search Console** - [Google Search Console](https://search.google.com/search-console)  
**Domain** - [Cloudflare](https://www.cloudflare.com/)

## 🍾 Setups

### Initial setups

```bash
git clone https://github.com/s-hirano-ist/s-public.git
mise install
bun install
mise run browser:setup
```

### Local development environment (mise + Doppler)

[mise](https://mise.jdx.dev/) manages dev tools (`bun`, `node`, `doppler`, `terraform`). Bun is the application runtime and package manager; Node.js remains available only for mise's `npm:agent-browser` tool. mise auto-loads `.env.local` and `doppler run` injects secrets into commands.

#### Prerequisites (human setup)

`.env.local` must be created by a human before AI agents can use this environment. This file is gitignored.

```bash
# 1. Login to Doppler (interactive browser auth)
doppler login

# 2. Install tools
mise install

# 3. Create .env.local with service token
echo "DOPPLER_TOKEN=$(DOPPLER_TOKEN=$(doppler configure get token --plain) terraform -chdir=terraform output -raw doppler_dev_ai_agent_service_token)" > .env.local
```

#### For AI agents (read-only access)

After `.env.local` is set up, commands work directly (secrets are injected via `doppler run` in package.json scripts):

```bash
bun run dev              # Astro dev server with secrets injected
bun run generate:book    # Book data generation (uses GITHUB_ACTION_TOKEN)
bun run build            # Production build (uses GA_MEASUREMENT_ID)
```

#### For Terraform changes (full access)

When modifying Terraform configurations (e.g. adding secrets, updating IaC), you need full Doppler access via personal login. Cloudflare credentials are fetched by Terraform directly from Doppler via `data "doppler_secrets"`.

Terraform is configured to store its state in the HCP Terraform `s-public` workspace. HCP Terraform uses local execution: pull requests run `terraform plan` in GitHub Actions, while `terraform apply` remains a local operation. Set the workspace for local commands before running Terraform:

```bash
export TF_CLOUD_ORGANIZATION="<HCP Terraform organization>"
export TF_WORKSPACE="s-public"
terraform login
```

```bash
# 1. Login to Doppler (one-time, interactive browser auth)
doppler login

# 2. Switch .env.local to personal token
echo "DOPPLER_TOKEN=$(doppler configure get token --plain)" > .env.local

# 3. Run Terraform commands
terraform -chdir=terraform init
terraform -chdir=terraform plan
terraform -chdir=terraform apply

# 4. If service tokens were regenerated, restore .env.local
echo "DOPPLER_TOKEN=$(terraform -chdir=terraform output -raw doppler_dev_ai_agent_service_token)" > .env.local
```

#### Terraform state migration and CI setup

The initial migration must be run once from the local clone that contains the existing `terraform/terraform.tfstate`. Do not create a new empty state from a fresh clone.

1. Create an HCP Terraform workspace named `s-public` and set its execution mode to **Local**.
2. Back up the existing local state outside the repository.
3. Set `TF_CLOUD_ORGANIZATION` and `TF_WORKSPACE`, run `terraform login`, then migrate and verify the state:

   ```bash
   terraform -chdir=terraform init -migrate-state
   terraform -chdir=terraform state list
   terraform -chdir=terraform plan
   ```

4. Add an HCP Terraform team token (or a dedicated automation-user token) to the Doppler `s-public/infra` config as `TF_TOKEN_app_terraform_io`.
5. Create a Doppler Service Account Identity for GitHub Actions. Restrict its GitHub OIDC claims to:
   - audience: `https://github.com/s-hirano-ist`
   - subject: `repo:s-hirano-ist/s-public:pull_request`
   - workflow: `terraform-plan`
6. Add these non-secret GitHub Actions repository variables:
   - `DOPPLER_SERVICE_IDENTITY_ID`: the Doppler identity ID
   - `TF_CLOUD_ORGANIZATION`: the HCP Terraform organization
   - `TF_WORKSPACE`: `s-public`

The `terraform-plan` workflow runs only for same-repository pull requests that change `terraform/**` or `package.json`. It uses GitHub OIDC to obtain a short-lived Doppler token, runs formatting and validation checks, and treats Terraform's exit code `2` as a successful plan with changes. Plan files are not uploaded or posted to pull requests because Terraform state and plans can contain secrets.

Keep Terraform changes separate from user-facing site changes. After a Terraform-only pull request is merged, update local `main` and run `terraform apply`. A failed Cloudflare Pages deployment for that Terraform-only merge is acceptable because the previous production deployment remains active. A subsequent site-only merge must deploy normally; if it does not, repair the Cloudflare GitHub App integration rather than treating the failure as expected.

### Adding photos

Add photos to `./src/data/assets/photo/`, then run `bun run generate:photo`.

### Updating books

Update book metadata in the private contents repository, then run `bun run generate:book`.

### Third-party licenses

The production client build generates `THIRD_PARTY_NOTICES.txt` from packages actually delivered to browsers. The published footer links directly to this file. Disallowed licenses (GPL / LGPL / AGPL family) are blocked on PRs by [`dependency-review.yaml`](.github/workflows/dependency-review.yaml).

> [!NOTE]
> `@img/sharp-libvips-*` is explicitly allowed in Dependency Review because it is a reviewed runtime artifact of `sharp`; new LGPL dependencies remain blocked by default.
> Book data is regenerated weekly by [`update-contents.yaml`](.github/workflows/update-contents.yaml), which opens a PR with the changes. Photo paths are generated locally when photo assets change.

### Cloudflare deployment

Add GitHub integration for auto-deployment on Cloudflare.

Cloudflare Pages builds with `bun ci && bun run astro build`. Because Terraform ignores remote changes to the environment-variable maps, keep the production and preview settings synchronized manually: set `BUN_VERSION` to the version in `package.json`, set `SKIP_DEPENDENCY_INSTALL=1`, and remove `NODE_VERSION`.

### Google Site Verification (optional)

Access [Google Search Console](https://search.google.com/search-console) and publish "google-site-verification" tag.
Access [Cloudflare](https://dash.cloudflare.com/) to add DNS TXT record.

## ☀ Favicon

- Text: S
- Background: Rounded
- Font Family: Geostar Fill
- Font Variant: Regular 400 Normal
- Font Size: 110
- Font Color: #77A2C0

> <https://favicon.io/favicon-generator/>

## 🧞 Commands

All scripts are defined in [`package.json`](package.json) — run them with `bun run <script>` from the project root.

CI also runs Lighthouse three times against representative production pages and reports every assertion failure and median report URL in an updatable PR comment. Lighthouse is informational and does not block merging. Thresholds are defined in [`lighthouserc.cjs`](lighthouserc.cjs); tighten them when the corresponding pages improve.

## 🪝 Tags & Release

1. Update version in `package.json`

2. Run the following command

```bash
gh release create --generate-notes
```

## 📜 License

Licensed under the MIT License, Copyright © 2024-2026

### Licenses of used libraries

See the generated [`THIRD_PARTY_NOTICES.txt`](https://s-hirano.com/THIRD_PARTY_NOTICES.txt) for software delivered to browsers and the [GitHub dependency graph](https://github.com/s-hirano-ist/s-public/network/dependencies) for repository dependencies.
