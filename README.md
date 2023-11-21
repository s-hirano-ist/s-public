# Blog

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
**Auto Commit Rejection** - [Husky](https://typicode.github.io/husky/)  
**Package updates** - [Renovate](https://www.mend.io/renovate/)

### My infrastructure stack

**Version Management** - [Github](https://github.com/)  
**Deployment** - [Vercel Edge Networks](https://vercel.com/)  
**Analytics** - [Google Analytics](https://analytics.google.com/analytics/web/)  
**Search Console** - [Google Search Console](https://search.google.com/search-console)  
**Domain** - [Onamae.com](https://www.onamae.com/)

## 🍾 Initial setups

```bash
git clone https://github.com/s-hirano-ist/blog.git
pnpm i
```

### Adding photos

Run the following command if you added photos to `./src/assets/photo`.

- if python installed

```bash
python script/generate_photo_path.py
```

- if docker installed

```bash
docker run -it --rm -v $(pwd):/usr/src/app -w /usr/src/app python:3.11 python3 script/generate_photo_path.py
```

### Vercel deployment

Add github integration for auto-deployment on vercel.

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

> https://favicon.io/favicon-generator/

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command        | Action                                                                                                                           |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm i`       | Installs dependencies                                                                                                            |
| `pnpm dev`     | Starts local dev server at `localhost:4321`                                                                                      |
| `pnpm build`   | Build your production site to `./.vercel/output/static`                                                                          |
| `pnpm preview` | Preview your build locally, before deploying                                                                                     |
| `pnpm fmt`     | Check code format with Prettier                                                                                                  |
| `pnpm fmt:fix` | Format codes with Prettier                                                                                                       |
| `pnpm sync`    | Generates TypeScript types for all Astro modules. [Learn more](https://docs.astro.build/en/reference/cli-reference/#astro-sync). |
| `pnpm lint`    | Lint with ESLint                                                                                                                 |

### 🪝 Tags & Realease

```bash
git tag vx.x.x
git push origin vx.x.x
gh release create --generate-notes
```

## 📜 License

Licensed under the MIT License, Copyright © 2023
