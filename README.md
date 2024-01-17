# Blog

![License](https://img.shields.io/badge/license-MIT-blue)
![Build status](https://img.shields.io/github/actions/workflow/status/s-hirano-ist/blog/build.yaml?branch=main)
![GitHub stars](https://img.shields.io/github/stars/s-hirano-ist/blog.svg)

This is the source code of [s-hirano.com](https://s-hirano.com/).

It consists of a portfolio and a blog which summarizes the knowledge I gained and the recent news.

## ✅ Lighthouse Score

<https://pagespeed.web.dev/analysis/https-s-hirano-com/iwo6u6jfy4?form_factor=desktop>

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
**CSS Linting** - [Stylelint](https://stylelint.io/)  
**Auto Commit Rejection** - [Husky](https://typicode.github.io/husky/)  
**Package updates** - [Renovate](https://www.mend.io/renovate/)  
**HTML checker** - [nu html checker](https://github.com/validator/validator)  
**Lighthouse** - [LightHouse](https://developers.google.com/web/tools/lighthouse)  
**Visual regression** - [Playwright test](https://playwright.dev/docs/test-intro/)

### My infrastructure stack

**Version Management** - [GitHub](https://github.com/)  
**Deployment** - [Vercel Edge Networks](https://vercel.com/)  
**Analytics** - [Google Analytics](https://analytics.google.com/analytics/web/)  
**Search Console** - [Google Search Console](https://search.google.com/search-console)  
**Domain** - [Onamae.com](https://www.onamae.com/)

## 🍾 Initial setups

```bash
git clone https://github.com/s-hirano-ist/blog.git
pnpm i
```

### Updating GitHub stars file

```bash
cd gh-export-stars
rye sync
rye run python src/main.py --user s-hirano-ist --output ../src/content/portfolio/gh-stars.json
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

### Updating books at `src/content/book/original.json`

```bash
pnpm generate:book
```

### Vercel deployment

Add GitHub integration for auto-deployment on vercel.

### Google Site Verification (optional)

Access [Google Search Console](https://search.google.com/search-console) and publish "google-site-verification" tag.
Access [Onamae.com](https://www.onamae.com/) to add DNS TXT record.

## Favicon

- Text: S
- Background: Circle
- Font Family: Babylonica
- Font Variant: Regular 400 Normal
- Font Size: 110
- Font Color: #77A2C0

> <https://favicon.io/favicon-generator/>

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                 | Action                                             |
| :---------------------- | :------------------------------------------------- |
| `pnpm i`                | Installs dependencies                              |
| `pnpm dev`              | Starts local dev server at `localhost:4321`        |
| `pnpm build`            | Build production site to `./.vercel/output/static` |
| `pnpm preview`          | Preview build locally                              |
| `pnpm sync`             | Generates TypeScript types                         |
| `pnpm fmt`              | Check code format with Prettier                    |
| `pnpm fmt:fix`          | Format codes with Prettier                         |
| `pnpm lint`             | Lint with ESLint                                   |
| `pnpm lint:fix`         | Fix lint with ESLint                               |
| `pnpm lint:mark`        | Lint markdown files with markdownlint-cli2         |
| `pnpm lint:mark:fix`    | Fix lint markdown files with markdownlint-cli2     |
| `pnpm lint:css`         | Lint css files with StyleLint                      |
| `pnpm lint:css:fix`     | Fix lint css files with StyleLint                  |
| `pnpm snapshots`        | Visual regression with existing screenshots        |
| `pnpm snapshots:update` | Visual regression but update snapshots             |

## 🪝 Tags & Realease

1. Update version in `package.json`

2. Run the following command

```bash
gh release create --generate-notes
```

We might introduce [standard-version](https://github.com/conventional-changelog/standard-version) and [git-cz](https://github.com/streamich/git-cz) in a future release.

## 📜 License

Licensed under the MIT License, Copyright © 2023
