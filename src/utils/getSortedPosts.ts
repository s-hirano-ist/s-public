import type { CollectionEntry } from "astro:content";

const getSortedPosts = (posts: CollectionEntry<"summary" | "blog">[]) =>
  posts.filter(({ data }) => !data.draft);

export default getSortedPosts;
