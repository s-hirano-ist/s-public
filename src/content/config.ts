import { defineCollection } from "astro:content";
import { blogSchema } from "./_schemas";

// TODO: このファイルの意味を理解

const summary = defineCollection({
  schema: blogSchema,
});

export const collections = { summary };
