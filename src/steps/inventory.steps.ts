import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage";
import { LoginPage } from "../pages/LoginPage";
import { TestWorld } from "../support/world";
import { getLoginData, getPassword } from "../utils/test-data";

Given("I am logged in as the configured valid user", async function (this: TestWorld) {
  const login = getLoginData();
  await new LoginPage(this.getPage()).open(this.baseURL);
  await new LoginPage(this.getPage()).login(login.validUser, getPassword());
});

Then("the inventory should contain products", async function (this: TestWorld) {
  await expect(new InventoryPage(this.getPage()).items()).toHaveCount(6);
});

Then("the inventory heading should be {string}", async function (this: TestWorld, heading: string) {
  await expect(new InventoryPage(this.getPage()).title()).toHaveText(heading);
});

Then("each product card should display a name, description, price, and add-to-cart action", async function (this: TestWorld) {
  const inventory = new InventoryPage(this.getPage());
  const items = inventory.items();
  await expect(items).toHaveCount(6);

  const itemCount = await items.count();
  for (let index = 0; index < itemCount; index += 1) {
    const item = items.nth(index);
    await expect(item.locator('[data-test="inventory-item-name"]')).toBeVisible();
    await expect(item.locator('[data-test="inventory-item-desc"]')).toBeVisible();
    await expect(item.locator('[data-test="inventory-item-price"]')).toBeVisible();
    await expect(item.getByRole("button", { name: /add to cart/i })).toBeVisible();
  }
});

When("I sort products by {string}", async function (this: TestWorld, label: string) {
  await new InventoryPage(this.getPage()).sortBy(label);
});

Then("product names should be sorted {string}", async function (this: TestWorld, direction: string) {
  const names = await new InventoryPage(this.getPage()).productNames().allTextContents();
  const sorted = [...names].sort((left, right) => left.localeCompare(right));
  if (direction === "descending") {
    sorted.reverse();
  }
  expect(names).toEqual(sorted);
});

Then("prices should be sorted {string}", async function (this: TestWorld, direction: string) {
  const prices = await new InventoryPage(this.getPage()).productPrices().allTextContents();
  const values = prices.map((price) => Number(price.replace("$", "")));
  const sorted = [...values].sort((left, right) => left - right);
  if (direction === "descending") {
    sorted.reverse();
  }
  expect(values).toEqual(sorted);
});
