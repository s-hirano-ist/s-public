import { test, expect } from "@playwright/test";

const pagePath = [
  {
    name: "root",
    path: "/",
    fullPage: true,
  },
  {
    name: "news",
    path: "/news",
    fullPage: true,
  },
  {
    name: "news/[slug]",
    path: "/news/artificial-intelligence",
    fullPage: false,
  },
  {
    name: "summary",
    path: "/summary",
    fullPage: true,
  },
  {
    name: "summary/[slug]",
    path: "/summary/architecture",
    fullPage: true,
  },
  {
    name: "book",
    path: "/book",
    fullPage: false,
  },
  {
    name: "blog",
    path: "/blog",
    fullPage: true,
  },
  {
    name: "blog/[slug]",
    path: "/blog/d-plan",
    fullPage: true,
  },
  {
    name: "tech-stack",
    path: "/tech-stack",
    fullPage: false,
  },
  {
    name: "photo",
    path: "/photo",
    fullPage: false,
  },
  {
    name: "diy",
    path: "/diy",
    fullPage: false,
  },
];

test.describe.parallel("Visual regression testing of page", () => {
  pagePath.map(item => {
    test(`snapshot test ${item.name}`, async ({ page }) => {
      await page.goto(`${item.path}`);
      await expect(page).toHaveScreenshot({
        fullPage: item.fullPage,
        animations: "disabled",
      });
      // if you want to save the screenshot and compare with it.
      // await expect(page).toHaveScreenshot(`${item.name}.png`, {
      //   fullPage: item.fullPage,
      //   animations: "disabled",
      // });
    });
  });
});
