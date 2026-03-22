import type { CollectionEntry } from "astro:content";

const slugify = (post: CollectionEntry<"blog">["data"]) => post.slug;

export default slugify;
