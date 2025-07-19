import type { BlogFrontmatter, SummaryFrontmatter } from "@content/_schemas";
import { slug as slugger } from "github-slugger";

const slugify = (post: BlogFrontmatter | SummaryFrontmatter) =>
  slugger(post.heading);

export default slugify;
