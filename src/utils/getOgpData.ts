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
    console.log("start JSDOM on URL:", url);
    const virtualConsole = new VirtualConsole();
    const dom = await JSDOM.fromURL(url, { virtualConsole });
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    virtualConsole.on("error", () => {
      console.log("error", url);
    });
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    virtualConsole.on("warn", () => {
      console.log("warn", url);
    });
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    virtualConsole.on("info", () => {
      console.log("info", url);
    });
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    virtualConsole.on("dir", () => {
      console.log("dir", url);
    });
    const meta = dom.window.document.head.querySelectorAll("meta");
    return extractOgpData([...meta]);
  } catch (e) {
    console.error(e);
    return;
  }
}
