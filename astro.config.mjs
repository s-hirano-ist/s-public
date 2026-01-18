import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";
import { SITE } from "./src/config";

// https://astro.build/config
export default defineConfig({
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
      theme: "one-dark-pro",
      wrap: true,
    },
    rehypePlugins: [
      rehypeSlug,
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
    remarkPlugins: [[remarkToc, { heading: "目次" }]],
  },
});
