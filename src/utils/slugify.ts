import type { NewsFrontmatter, MarkdownFrontmatter } from "@content/_schemas";
import { slug as slugger } from "github-slugger";

const slugify = (post: MarkdownFrontmatter | NewsFrontmatter) =>
  slugger(post.heading);

export default slugify;
