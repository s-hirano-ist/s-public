import { z } from "astro:content";

export const blogSchema = z
  .object({
    title: z.string(),
    draft: z.boolean(),
    description: z.string(),
  })
  .strict();

export type BlogFrontmatter = z.infer<typeof blogSchema>;
