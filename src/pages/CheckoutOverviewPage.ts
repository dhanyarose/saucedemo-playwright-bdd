import type { Locator, Page } from "playwright";

export class CheckoutOverviewPage {
  constructor(private readonly page: Page) {}

  heading(): Locator {
    return this.page.locator('[data-test="title"]');
  }

  items(): Locator {
    return this.page.locator('[data-test="inventory-item"]');
  }

  itemNames(): Locator {
    return this.page.locator('[data-test="inventory-item-name"]');
  }

  itemPrices(): Locator {
    return this.page.locator('[data-test="inventory-item-price"]');
  }

  itemTotal(): Locator {
    return this.page.locator('[data-test="subtotal-label"]');
  }

  tax(): Locator {
    return this.page.locator('[data-test="tax-label"]');
  }

  total(): Locator {
    return this.page.locator('[data-test="total-label"]');
  }

  async cancel(): Promise<void> {
    await this.page.getByRole("button", { name: "Cancel" }).click();
  }

  async finish(): Promise<void> {
    await this.page.getByRole("button", { name: "Finish" }).click();
  }
}
