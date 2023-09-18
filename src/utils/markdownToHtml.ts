import { toc } from "mdast-util-toc";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getToc: any = (options: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (node: any) => {
    const result = toc(node, options);
    node.children = [result.map];
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
