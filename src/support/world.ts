import { World, setWorldConstructor } from "@cucumber/cucumber";
import type { Browser, BrowserContext, Page } from "playwright";
import { getEnvironment } from "../../config/environments";

export class TestWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;

  get baseURL(): string {
    return getEnvironment().baseURL;
  }

  getPage(): Page {
    if (!this.page) {
      throw new Error("The scenario browser page has not been initialized.");
    }
    return this.page;
  }
}

setWorldConstructor(TestWorld);
