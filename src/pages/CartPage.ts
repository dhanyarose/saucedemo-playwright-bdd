import type { Locator, Page } from "playwright";

export class CartPage {
  constructor(private readonly page: Page) {}

  items(): Locator {
    return this.page.locator('[data-test="inventory-item"]');
  }

  productNames(): Locator {
    return this.page.locator('[data-test="inventory-item-name"]');
  }

  itemNamed(name: string): Locator {
    return this.items().filter({ has: this.page.getByText(name, { exact: true }) });
  }

  quantityFor(name: string): Locator {
    return this.itemNamed(name).locator('[data-test="item-quantity"]');
  }

  priceFor(name: string): Locator {
    return this.itemNamed(name).locator('[data-test="inventory-item-price"]');
  }

  checkoutButton(): Locator {
    return this.page.getByRole("button", { name: "Checkout" });
  }

  async removeProduct(name: string): Promise<void> {
    const item = this.itemNamed(name);
    await item.getByRole("button", { name: "Remove" }).click();
  }

  async continueShopping(): Promise<void> {
    await this.page.getByRole("button", { name: "Continue Shopping" }).click();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton().click();
  }
}
