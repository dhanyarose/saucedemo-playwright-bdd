import type { Download, Locator, Page } from "playwright";

export class OrderCompletePage {
  constructor(private readonly page: Page) {}

  heading(): Locator {
    return this.page.locator('[data-test="title"]');
  }

  successMessage(): Locator {
    return this.page.getByRole("heading", { name: "Thank you for your order!" });
  }

  dispatchMessage(): Locator {
    return this.page.getByText(/Your order has been dispatched/);
  }

  async generatePdf(): Promise<Download> {
    const downloadReady = this.page.waitForEvent("download");
    await this.page.getByRole("button", { name: "Generate PDF order" }).click();
    return downloadReady;
  }

  async backHome(): Promise<void> {
    await this.page.getByRole("button", { name: "Back Home" }).click();
  }
}
