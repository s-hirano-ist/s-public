import { JSDOM } from "jsdom";

// REF: https://zenn.dev/littleforest/articles/scrape-og-tags
function extractOgpData(metaElements: HTMLMetaElement[]) {
  return metaElements
    .filter((element: Element) => element.hasAttribute("property"))
    .reduce((previous: Record<string, string>, current: Element) => {
      const property = current.getAttribute("property")?.trim();
      const content = current.getAttribute("content");
      if (!property || !content) return previous;
      previous[property] = content;
      return previous;
    }, {});
}

export async function getOgpData(url: string) {
  try {
    const dom = await JSDOM.fromURL(url);
    const meta = dom.window.document.head.querySelectorAll("meta");
    return extractOgpData([...meta]);
  } catch (e) {
    console.error(e);
    return;
  }
}
