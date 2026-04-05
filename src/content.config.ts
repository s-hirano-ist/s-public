import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    heading: z.string(),
    slug: z.string(),
    description: z.string(),
    draft: z.boolean(),
    date: z.coerce.date(),
  }),
});

export const collections = {
  blog,
};
