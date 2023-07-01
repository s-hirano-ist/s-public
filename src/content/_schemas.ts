import { z } from "astro:content";

export const blogSchema = z
  .object({
    author: z.string().optional(),
    title: z.string(),
    draft: z.boolean().optional(),
    description: z.string(),
  })
  .strict();

export type BlogFrontmatter = z.infer<typeof blogSchema>;
