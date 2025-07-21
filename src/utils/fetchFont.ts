export const fetchFont = async (api: string) => {
  const css: string = await (
    await fetch(api, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
      },
    })
  ).text();
  // eslint-disable-next-line redos/no-vulnerable -- Font URL regex is necessary for parsing CSS
  const resource = /src: url\((.+)\) format\('(opentype|truetype)'\)/.exec(css);
  if (!resource?.[1]) return;
  return await fetch(resource[1]).then(res => res.arrayBuffer());
};
