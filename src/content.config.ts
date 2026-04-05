import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

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
