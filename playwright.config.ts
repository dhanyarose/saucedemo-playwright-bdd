import { defineConfig } from "@playwright/test";
import { getEnvironment } from "./config/environments";

const environment = getEnvironment();

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  retries: 0,
  workers: 1,
  use: {
    baseURL: environment.baseURL,
    headless: false,
    trace: "on",
    screenshot: "only-on-failure",
    video: 'retain-on-failure'
  }
});
