import { satteri, satteriHeadingIdsPlugin } from "@astrojs/markdown-satteri";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField, fontProviders } from "astro/config";
import { thirdPartyNotices } from "./script/third-party-notices.mjs";
import { SITE } from "./src/config";

const headingLinksPlugin = {
  name: "heading-links",
  element: {
    filter: ["h2", "h3"],
    visit(node, context) {
      const id = node.properties?.id;
      if (typeof id !== "string") return;

      context.appendChild(node, {
        type: "element",
        tagName: "a",
        properties: {
          ariaLabel: "この見出しへのリンク",
          className: ["icon-header-link"],
          href: `#${id}`,
        },
        children: [
          {
            type: "element",
            tagName: "svg",
            properties: {
              ariaHidden: "true",
              fill: "none",
              focusable: "false",
              height: 16,
              stroke: "currentColor",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              viewBox: "0 0 24 24",
              width: 16,
            },
            children: [
              {
                type: "element",
                tagName: "path",
                properties: {
                  d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71 M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
                },
                children: [],
              },
            ],
          },
        ],
      });
    },
  },
};

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
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Noto Sans JP",
      cssVariable: "--font-noto-sans-jp",
      weights: [400, 500, 600, 700],
      styles: ["normal"],
      subsets: ["japanese", "latin"],
      fallbacks: ["sans-serif"],
    },
  ],
  image: {
    layout: "constrained",
  },
  vite: {
    plugins: [tailwindcss(), thirdPartyNotices()],
  },
  integrations: [react({ include: ["**/react/*"] }), sitemap()],
  markdown: {
    processor: satteri({
      hastPlugins: [satteriHeadingIdsPlugin(), headingLinksPlugin],
    }),
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "one-dark-pro",
      },
      wrap: true,
    },
  },
});
