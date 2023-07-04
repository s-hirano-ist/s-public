import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { toc } from "mdast-util-toc";

const getToc: any = (options: any) => {
  return (node: any) => {
    const result = toc(node, options);
    node.children = [result.map];
  };
};

export default async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(getToc, {
      heading: "目次",
      tight: true,
    })
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}
