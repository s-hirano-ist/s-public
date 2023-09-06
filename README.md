# Blog

## Known issues

- [ ] X (Twitter) links in `src/content/news` will not render due to auto redirect feature on X.
- [ ] yarn build will return a lot of logs on note.com.
- [ ] IT media NEWS links in `src/content/news` will be garbled characters.
- [ ] Search feature may not work properly.

## ✅ Lighthouse Score

https://pagespeed.web.dev/

## 💻 Tech Stack

**Main Framework** - [Astro](https://astro.build/)  
**Type Checking** - [TypeScript](https://www.typescriptlang.org/)  
**Component Framework** - [ReactJS](https://reactjs.org/)  
**Styling** - [TailwindCSS](https://tailwindcss.com/)  
**Fuzzy Search** - [FuseJS](https://fusejs.io/)  
**Icons** - [Boxicons](https://boxicons.com/) | [Tablers](https://tabler-icons.io/)  
**Code Formatting** - [Prettier](https://prettier.io/)  
**Linting** - [ESLint](https://eslint.org)  
**Auto commit rejection** - [Husky](https://typicode.github.io/husky/)  
**Package updates** - [Renovate](https://www.mend.io/renovate/)

### My infrastructure stack

**Version Management** - [Github](https://github.com/)  
**Deployment** - [Vercel Edge Networks](https://vercel.com/)  
**Analytics** - [Vercel Analytics](https://vercel.com/analytics)  
**Domain** - [Onamae.com](https://www.onamae.com/)

## 🍾 Initial setups

```bash
git clone https://github.com/s-hirano-ist/blog.git
echo IS_DEV=true > .env
yarn
```

### Vercel deployment

Add github integration for auto-deployment on vercel.

### Google Site Verification (optional)

Access [Google Search Console](https://search.google.com/search-console) and publish "google-site-verification" tag.
Access [Onamae.com](https://www.onamae.com/) to add DNS TXT record.

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

### 🪝 Tags

```bash
git tag vx.x.x
git push origin vx.x.x
```

## 📜 License

Licensed under the MIT License, Copyright © 2023
