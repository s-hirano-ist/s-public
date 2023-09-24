import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/static";
import { defineConfig } from "astro/config";
import { SITE } from "./src/config";

const IS_DEV = import.meta.env.MODE === "development";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    react({
      include: ["**/react/*"],
    }),
    sitemap(),
    partytown({
      // Adds dataLayer.push as a forwarding-event.
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
    extendDefaultPlugins: true,
  },
  // not necessary for static sites. Only for SSR.
  output: "static",
  adapter: vercel({
    webAnalytics: {
      enabled: !IS_DEV,
    },
    speedInsights: {
      enabled: true,
    },
  }),
});
