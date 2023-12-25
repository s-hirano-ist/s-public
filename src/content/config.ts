import { bookSchema, newsSchema, markdownSchema } from "@content/_schemas";
import { defineCollection } from "astro:content";

const summaryCollection = defineCollection({
  type: "content",
  schema: markdownSchema,
});

const newsCollection = defineCollection({
  type: "data",
  schema: newsSchema,
});

const bookCollection = defineCollection({
  type: "data",
  schema: bookSchema,
});

export const collections = {
  summary: summaryCollection,
  news: newsCollection,
  book: bookCollection,
};
