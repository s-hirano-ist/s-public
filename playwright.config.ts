import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "./e2e",
  fullyParallel: true,
  reporter: "html",
  use: {
    actionTimeout: 0,
    baseURL: "http://localhost:4321",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // FIXME: page crashes on other devices than chromium
    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },
    // {
    //   name: "iPhone 14 Pro",
    //   use: { ...devices["iPhone 14 Pro"] },
    // },
    // {
    //   name: "iPhone SE",
    //   use: { ...devices["iPhone SE"] },
    // },
    // {
    //   name: "iPad Mini",
    //   use: { ...devices["iPad Mini"] },
    // },
    // {
    //   name: "iPad Mini landscape",
    //   use: { ...devices["iPad Mini landscape"] },
    // },
    // {
    //   name: "Pixel 5",
    //   use: { ...devices["Pixel 5"] },
    // },
  ],
  webServer: {
    command: "pnpm preview",
    port: 4321,
    reuseExistingServer: true,
  },
};

export default config;
