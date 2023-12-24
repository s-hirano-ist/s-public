import { type CollectionEntry } from "astro:content";

export function jsonToToc(jsonData: CollectionEntry<"news">) {
  const titleArray = jsonData.data.body.map(d => d.title);
  const domTitleArray = titleArray.map(
    d => `<li><a href="#${d}">${d}</a></li>`,
  );
  return `<ul>${domTitleArray.join("")}</ul>`;
}
