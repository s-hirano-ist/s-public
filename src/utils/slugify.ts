import type { NewsFrontmatter, SummaryFrontmatter } from "@content/_schemas";
import { slug as slugger } from "github-slugger";

const slugify = (post: SummaryFrontmatter | NewsFrontmatter) =>
  slugger(post.heading);

export default slugify;
