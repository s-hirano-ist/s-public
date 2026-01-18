import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { SITE } from "./src/config";

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      GA_MEASUREMENT_ID: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
    },
  },
  site: SITE.website,
  image: {
    layout: "constrained",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react({ include: ["**/react/*"] }), sitemap()],
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "one-dark-pro",
      },
      wrap: true,
    },
    rehypePlugins: [
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: {},
          content: {
            type: "element",
            tagName: "span",
            properties: { className: ["icon-header-link", "fa", "fa-link"] },
          },
        },
      ],
    ],
  },
});
