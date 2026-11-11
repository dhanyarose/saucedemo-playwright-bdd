import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage";
import { LoginPage } from "../pages/LoginPage";
import { TestWorld } from "../support/world";

When("I reset the application state from the navigation menu", async function (this: TestWorld) {
  await new LoginPage(this.getPage()).resetApplicationState();
});

Then("the cart should be empty and the inventory should remain available", async function (this: TestWorld) {
  const inventory = new InventoryPage(this.getPage());
  await expect(inventory.title()).toHaveText("Products");
  await expect(inventory.cartBadge()).toHaveCount(0);
  await expect(inventory.items()).toHaveCount(6);
});
