import { JSDOM, VirtualConsole } from "jsdom";

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
    // REF: https://github.com/jsdom/jsdom#virtual-consoles
    const virtualConsole = new VirtualConsole();
    const dom = await JSDOM.fromURL(url, { virtualConsole });
    // eslint-disable-next-line @typescript-eslint/no-empty-function -- Intentionally suppressing console output
    virtualConsole.on("error", () => {});
    // eslint-disable-next-line @typescript-eslint/no-empty-function -- Intentionally suppressing console output
    virtualConsole.on("warn", () => {});
    // eslint-disable-next-line @typescript-eslint/no-empty-function -- Intentionally suppressing console output
    virtualConsole.on("info", () => {});
    // eslint-disable-next-line @typescript-eslint/no-empty-function -- Intentionally suppressing console output
    virtualConsole.on("dir", () => {});
    const meta = dom.window.document.head.querySelectorAll("meta");
    return extractOgpData([...meta]);
  } catch (error) {
    console.error(`Error on page: ${url} with error.`, error);
    return;
  }
}
