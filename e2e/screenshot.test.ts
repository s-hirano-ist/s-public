import { test, expect } from "@playwright/test";

test("メインページのスクリーンショットの差分比較", async ({
  page,
}, testInfo) => {
  await page.goto("https://s-hirano.com");
  await page.screenshot({
    path: `${testInfo.snapshotPath("result.png")}`,
    fullPage: true,
  });

  await page.goto("http://localhost:4321");
  expect(await page.screenshot({ fullPage: true })).toMatchSnapshot({
    name: "result.png",
  });
});
