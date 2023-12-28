import type {
  BlogFrontmatter,
  NewsFrontmatter,
  SummaryFrontmatter,
} from "@content/_schemas";
import { slug as slugger } from "github-slugger";

const slugify = (
  post: BlogFrontmatter | NewsFrontmatter | SummaryFrontmatter,
) => slugger(post.heading);

export default slugify;
