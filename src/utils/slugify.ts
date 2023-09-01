import { slug as slugger } from "github-slugger";
import type { JsonFrontmatter, MarkdownFrontmatter } from "@content/_schemas";

const slugify = (post: MarkdownFrontmatter | JsonFrontmatter) =>
  slugger(post.title);

export default slugify;
