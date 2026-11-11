import type { Locator, Page } from "playwright";

export class InventoryPage {
  constructor(private readonly page: Page) {}

  title() {
    return this.page.locator('[data-test="title"]');
  }

  items(): Locator {
    return this.page.locator('[data-test="inventory-item"]');
  }

  productNames(): Locator {
    return this.page.locator('[data-test="inventory-item-name"]');
  }

  productPrices(): Locator {
    return this.page.locator('[data-test="inventory-item-price"]');
  }

  productImages(): Locator {
    return this.items().locator("img");
  }

  sortControl(): Locator {
    return this.page.getByRole("combobox", { name: "Sort products" });
  }

  async addProduct(name: string): Promise<void> {
    const item = this.items().filter({ has: this.page.getByText(name, { exact: true }) });
    await item.getByRole("button", { name: "Add to cart" }).click();
  }

  async removeProduct(name: string): Promise<void> {
    const item = this.items().filter({ has: this.page.getByText(name, { exact: true }) });
    await item.getByRole("button", { name: "Remove" }).click();
  }

  async sortBy(label: string): Promise<void> {
    await this.sortControl().selectOption({ label });
  }

  cartBadge() {
    return this.page.locator('[data-test="shopping-cart-badge"]');
  }

  async openCart(): Promise<void> {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }
}
