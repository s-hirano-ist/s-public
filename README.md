# Blog

## Known issues

- [ ] X (Twitter) links in `src/content/news` will not render due to auto redirect feature on X.
- [ ] yarn build will return a lot of logs on note.com.
- [ ] IT media NEWS links in `src/content/news` will be garbled characters.
- [ ] Search feature may not work properly.

## ✅ Lighthouse Score

https://pagespeed.web.dev/analysis/https-www-s-hirano-com/3ppgzcnip3?form_factor=desktop

## 💻 Tech Stack

**Main Framework** - [Astro](https://astro.build/)  
**Type Checking** - [TypeScript](https://www.typescriptlang.org/)  
**Component Framework** - [ReactJS](https://reactjs.org/)  
**Styling** - [TailwindCSS](https://tailwindcss.com/)  
**Fuzzy Search** - [FuseJS](https://fusejs.io/)  
**Icons** - [Boxicons](https://boxicons.com/) | [Tablers](https://tabler-icons.io/)  
**Code Formatting** - [Prettier](https://prettier.io/)  
**Linting** - [ESLint](https://eslint.org)

## 💲 Google Site Verification (optional)

TODO:

You can easily add your [Google Site Verification HTML tag](https://support.google.com/webmasters/answer/9008080#meta_tag_verification&zippy=%2Chtml-tag) in AstroPaper using environment variable. This step is optional. If you don't add the following env variable, the google-site-verification tag won't appear in the html `<head>` section.

```bash
# in your environment variable file (.env)
PUBLIC_GOOGLE_SITE_VERIFICATION=your-google-site-verification-value
```

## 🍾 Initial setups

```bash
git clone https://github.com/s-hirano-ist/blog.git
echo IS_DEV=true > .env
yarn
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command        | Action                                                                                                                           |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| `yarn`         | Installs dependencies                                                                                                            |
| `yarn dev`     | Starts local dev server at `localhost:3000`                                                                                      |
| `yarn build`   | Build your production site to `./dist/`                                                                                          |
| `yarn preview` | Preview your build locally, before deploying                                                                                     |
| `yarn fmt`     | Check code format with Prettier                                                                                                  |
| `yarn fmt:fix` | Format codes with Prettier                                                                                                       |
| `yarn sync`    | Generates TypeScript types for all Astro modules. [Learn more](https://docs.astro.build/en/reference/cli-reference/#astro-sync). |
| `yarn lint`    | Lint with ESLint                                                                                                                 |

## 📜 License

Licensed under the MIT License, Copyright © 2023
