import type { BlogFrontmatter } from "@content/_schemas";

export interface Props {
  href?: string;
  frontmatter: BlogFrontmatter;
}

export default function Card({ href, frontmatter }: Props) {
  const { title, description } = frontmatter;
  return (
    <li className="my-6">
      <a
        href={href}
        className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        <h2 className="text-lg font-medium decoration-dashed hover:underline">
          {title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()}
        </h2>
      </a>
      <p>{description}</p>
    </li>
  );
}
