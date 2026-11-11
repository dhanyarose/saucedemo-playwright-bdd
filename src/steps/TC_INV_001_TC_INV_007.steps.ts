import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage";
import { TestWorld } from "../support/world";
import { getProductData } from "../utils/test-data";

Then("the inventory page should show its product heading and sorting control", async function (this: TestWorld) {
  const inventory = new InventoryPage(this.getPage());
  await expect(inventory.title()).toHaveText("Products");
  await expect(inventory.sortControl()).toBeVisible();
});

Then("the configured product list should be displayed exactly once", async function (this: TestWorld) {
  const inventory = new InventoryPage(this.getPage());
  const expectedProducts = getProductData().expectedInventory;
  const names = await inventory.productNames().allTextContents();
  expect(names).toHaveLength(expectedProducts.length);
  expect(new Set(names).size).toBe(names.length);
  expect(names).toEqual(expect.arrayContaining(expectedProducts));
});
