# s-public

![License](https://img.shields.io/badge/license-MIT-blue)
![Build status](https://img.shields.io/github/actions/workflow/status/s-hirano-ist/s-public/ci.yaml?branch=main)
![GitHub stars](https://img.shields.io/github/stars/s-hirano-ist/s-public.svg)

> [!IMPORTANT]
> This is the source code of [s-hirano.com](https://s-hirano.com/).
> It consists of a portfolio and a blog which summarizes the knowledge I gained and the recent news.

## ✅ Lighthouse Score

![Lighthouse score: 100/100](lighthouse_score.png)

## 💻 Tech Stack

**Main Framework** - [Astro](https://astro.build/)  
**Type Checking** - [TypeScript](https://www.typescriptlang.org/)  
**Component Framework** - [ReactJS](https://reactjs.org/)  
**Package Manager** - [pnpm](https://pnpm.io/)  
**Styling** - [TailwindCSS](https://tailwindcss.com/) | [DaisyUI](https://daisyui.com/)  
**Fuzzy Search** - [FuseJS](https://fusejs.io/)  
**Icons** - [Boxicons](https://boxicons.com/) | [Tablers](https://tabler-icons.io/)  
**Fonts** - [Google Fonts](https://fonts.google.com/)  
**Code Formatting** - [Prettier](https://prettier.io/)  
**Linting** - [ESLint](https://eslint.org)  
**Markdown Linting** - [markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2)  
**CSS Linting** - [Stylelint](https://stylelint.io/)  
**Secret linting** - [secretlint](https://github.com/secretlint/secretlint)  
**Auto Commit Rejection** - [Husky](https://typicode.github.io/husky/)  
**Package updates** - [Renovate](https://www.mend.io/renovate/)  
**HTML checker** - [Nu Html Checker](https://github.com/validator/validator)  
**Lighthouse** - [LightHouse](https://developers.google.com/web/tools/lighthouse)  
**Visual regression** - [Playwright test](https://playwright.dev/docs/test-intro/)  
**SVG optimization** - [svgo](https://github.com/svg/svgo)  
**Vulnerabilities Check** - [npm-audit](https://docs.npmjs.com/cli/v10/commands/npm-audit) [Dependabot alert](https://docs.github.com/ja/code-security/dependabot/dependabot-alerts/about-dependabot-alerts)

### My infrastructure stack

**Version Management** - [GitHub](https://github.com/)  
**Deployment** - [Cloudflare Pages](https://www.cloudflare.com/ja-jp/developer-platform/products/pages/)  
**Analytics** - [Google Analytics](https://analytics.google.com/analytics/web/)  
**Search Console** - [Google Search Console](https://search.google.com/search-console)  
**Domain** - [Onamae.com](https://www.onamae.com/)

## 🍾 Setups

### Initial setups

```bash
git clone https://github.com/s-hirano-ist/s-public.git
pnpm install
```

### Update GitHub stars file

```bash
pnpm generate:gh-stars
```

### Adding photos

Run task.json to add photos to `./src/assets/photo`.

Instead, run the following command if you added photos to `./src/assets/photo`.

- if python installed

```bash
python script/generate_photo_path.py
```

- if docker installed

```bash
docker run -it --rm -v $(pwd):/usr/src/app -w /usr/src/app python:3.11 python3 script/generate_photo_path.py
```

### Update books at `src/content/book/original.json`

```bash
pnpm generate:book
```

### Update licenses

```bash
pnpm generate:license
pnpm generate:license:summary
```

### Check for inappropriate licenses

```bash
bash checkLicense.sh
```

### Cloudflare deployment

Add GitHub integration for auto-deployment on Cloudflare.

### Google Site Verification (optional)

Access [Google Search Console](https://search.google.com/search-console) and publish "google-site-verification" tag.
Access [Onamae.com](https://www.onamae.com/) to add DNS TXT record.

## ☀ Favicon

- Text: S
- Background: Rounded
- Font Family: Geostar Fill
- Font Variant: Regular 400 Normal
- Font Size: 110
- Font Color: #77A2C0

> <https://favicon.io/favicon-generator/>

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                 | Action                                         |
| :---------------------- | :--------------------------------------------- |
| `pnpm install`          | Installs dependencies                          |
| `pnpm check`            | Check types                                    |
| `pnpm dev`              | Starts local dev server at `localhost:4321`    |
| `pnpm build`            | Build production site to `./dist`              |
| `pnpm preview`          | Preview build locally                          |
| `pnpm sync`             | Generates TypeScript types                     |
| `pnpm tsc`              | Check types                                    |
| `pnpm fmt`              | Check code format with Prettier                |
| `pnpm fmt:fix`          | Format codes with Prettier                     |
| `pnpm lint`             | Lint with ESLint                               |
| `pnpm lint:fix`         | Fix lint with ESLint                           |
| `pnpm lint:mark`        | Lint markdown files with markdownlint-cli2     |
| `pnpm lint:mark:fix`    | Fix lint markdown files with markdownlint-cli2 |
| `pnpm lint:css`         | Lint css files with StyleLint                  |
| `pnpm lint:css:fix`     | Fix lint css files with StyleLint              |
| `pnpm lint:secret`      | Lint secrets files with secretLint             |
| `pnpm snapshots`        | Visual regression with existing screenshots    |
| `pnpm snapshots:update` | Visual regression but update snapshots         |

## 🪝 Tags & Realease

1. Update version in `package.json`

2. Run the following command

```bash
gh release create --generate-notes
```

## 📜 License

Licensed under the MIT License, Copyright © 2024

### Licenses of used libraries

See `license.summary.txt` for summary of used licenses.

## 🔒 Security

[s-hirano.com/summary/coding-security](https://s-hirano.com/summary/coding-security)を参照。
