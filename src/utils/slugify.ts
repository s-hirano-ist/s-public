import type { JsonFrontmatter, MarkdownFrontmatter } from "@content/_schemas";
import { slug as slugger } from "github-slugger";

const slugify = (post: MarkdownFrontmatter | JsonFrontmatter) =>
  slugger(post.heading);

export default slugify;
