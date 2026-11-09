import type { Locator, Page } from "playwright";

export class CartPage {
  constructor(private readonly page: Page) {}

  items(): Locator {
    return this.page.locator('[data-test="inventory-item"]');
  }

  productNames(): Locator {
    return this.page.locator('[data-test="inventory-item-name"]');
  }

  async removeProduct(name: string): Promise<void> {
    const item = this.items().filter({ has: this.page.getByText(name, { exact: true }) });
    await item.getByRole("button", { name: "Remove" }).click();
  }
}
