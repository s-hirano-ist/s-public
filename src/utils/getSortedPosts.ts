import type { CollectionEntry } from "astro:content";

const getSortedPosts = (posts: CollectionEntry<"blog">[]) =>
  posts.filter(({ data }) => !data.draft);

export default getSortedPosts;
