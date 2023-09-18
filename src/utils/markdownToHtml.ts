import type { Root, RootContent } from "mdast";
import { toc } from "mdast-util-toc";
import type { Options } from "mdast-util-toc";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const getToc = (options: Options) => {
  return (node: Root) => {
    const result = toc(node, options);
    node.children = [result.map as RootContent];
  };
};

export async function markdownToToc(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(getToc, {
      heading: "",
      tight: true,
    })
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}
