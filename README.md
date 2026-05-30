# s-public

![License](https://img.shields.io/badge/license-MIT-blue)
![Build status](https://img.shields.io/github/actions/workflow/status/s-hirano-ist/s-public/ci.yaml?branch=main)
![GitHub stars](https://img.shields.io/github/stars/s-hirano-ist/s-public.svg)

> [!IMPORTANT]
> This is the source code of [s-hirano.com](https://s-hirano.com/).
> It consists of a portfolio and a blog which summarizes the knowledge I gained over the years.

## ✅ Lighthouse Score

![Lighthouse score: 100/100](lighthouse_score.png)

## 💻 Tech Stack

**Main Framework** - [Astro](https://astro.build/)  
**Type Checking** - [TypeScript](https://www.typescriptlang.org/)  
**Component Framework** - [ReactJS](https://reactjs.org/)  
**Package Manager** - [pnpm](https://pnpm.io/)  
**Styling** - [TailwindCSS](https://tailwindcss.com/) | [DaisyUI](https://daisyui.com/)  
**Icons** - [Boxicons](https://boxicons.com/) | [Tablers](https://tabler-icons.io/)  
**Fonts** - [Google Fonts](https://fonts.google.com/)  
**Code Formatting** - [Prettier](https://prettier.io/)  
**Linting** - [ESLint](https://eslint.org)  
**Markdown Linting** - [markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2)  
**CSS Linting** - [Stylelint](https://stylelint.io/)  
**Secret linting** - [secretlint](https://github.com/secretlint/secretlint)  
**Auto Commit Rejection** - [Husky](https://typicode.github.io/husky/) | [lint-staged](https://github.com/lint-staged/lint-staged)  
**Package updates** - [Renovate](https://www.mend.io/renovate/)  
**HTML checker** - [Nu Html Checker](https://github.com/validator/validator)  
**Lighthouse** - [LightHouse](https://developers.google.com/web/tools/lighthouse)  
**SVG optimization** - [svgo](https://github.com/svg/svgo)  
**Vulnerabilities Check** - [pnpm audit](https://pnpm.io/cli/audit) | [OSV Scanner](https://github.com/google/osv-scanner) | [Dependency Review](https://github.com/actions/dependency-review-action)

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
pnpm install
```

### Local development environment (mise + Doppler)

[mise](https://mise.jdx.dev/) manages dev tools (`node`, `pnpm`, `doppler`, `terraform`). mise auto-loads `.env.local` and `doppler run` injects secrets into commands.

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
pnpm dev              # Astro dev server with secrets injected
pnpm generate:book    # Google Books API (uses GOOGLE_BOOKS_API_KEY)
pnpm build            # Production build (uses GA_MEASUREMENT_ID)
```

#### For Terraform changes (full access)

When modifying Terraform configurations (e.g. adding secrets, updating IaC), you need full Doppler access via personal login. Cloudflare credentials are fetched by Terraform directly from Doppler via `data "doppler_secrets"`.

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

### Adding photos

Add photos to `./src/data/assets/photo/`, then run `pnpm generate:photo`.

### Updating books

Edit ISBN / metadata in `src/data/book/_original.ts`, then run `pnpm generate:book` (Google Books API).

### Updating licenses

Run `pnpm license:json` and `pnpm license:summary`. Disallowed licenses (GPL / LGPL / AGPL family) are blocked on PRs by [`dependency-review.yaml`](.github/workflows/dependency-review.yaml).

> [!NOTE]
> Book, photo, and license data are also regenerated weekly by [`update-contents.yaml`](.github/workflows/update-contents.yaml), which opens a PR with the changes.

### Cloudflare deployment

Add GitHub integration for auto-deployment on Cloudflare.

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

All scripts are defined in [`package.json`](package.json) — run them with `pnpm <script>` from the project root.

## 🪝 Tags & Release

1. Update version in `package.json`

2. Run the following command

```bash
gh release create --generate-notes
```

## 📜 License

Licensed under the MIT License, Copyright © 2024-2026

### Licenses of used libraries

See `license.summary.txt` for summary of used licenses.
