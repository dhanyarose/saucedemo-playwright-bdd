import { After, Before, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { TestWorld } from "./world";

setDefaultTimeout(45_000);

Before(async function (this: TestWorld) {
  this.browser = await chromium.launch({ headless: process.env.HEADLESS == "false"});
  this.context = await this.browser.newContext({ acceptDownloads: true });
  await this.context.tracing.start({ screenshots: true, snapshots: true, sources: true });
  this.page = await this.context.newPage();
});

After(async function (this: TestWorld, scenario) {
  try {
    if (scenario.result?.status === Status.FAILED && this.page && this.context) {
      const screenshot = await this.page.screenshot({ fullPage: true });
      await this.attach(screenshot, "image/png");

      const traceDirectory = path.resolve("reports", "traces");
      await mkdir(traceDirectory, { recursive: true });
      const safeName = scenario.pickle.name.replace(/[^a-zA-Z0-9-_]+/g, "_");
      const tracePath = path.join(traceDirectory, `${safeName}.zip`);
      await this.context.tracing.stop({ path: tracePath });
    } else if (this.context) {
      await this.context.tracing.stop();
    }
  } finally {
    await this.context?.close();
    await this.browser?.close();
  }
});
