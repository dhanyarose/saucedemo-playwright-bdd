import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CartPage } from "../pages/CartPage";
import { InventoryPage } from "../pages/InventoryPage";
import { TestWorld } from "../support/world";
import { openInventoryWithProducts } from "../support/e2e-journeys";
import { getProductData } from "../utils/test-data";

Given("I am authenticated with the configured backpack in the cart", async function (this: TestWorld) {
  await openInventoryWithProducts(this);
});

Given("I am authenticated with the configured sample products in the cart", async function (this: TestWorld) {
  await openInventoryWithProducts(this, true);
});

When("I add the configured backpack to the cart", async function (this: TestWorld) {
  await new InventoryPage(this.getPage()).addProduct(getProductData().backpack);
});

Then("the cart should show the backpack with quantity {string} and a currency price", async function (
  this: TestWorld,
  quantity: string
) {
  const cart = new CartPage(this.getPage());
  const backpack = getProductData().backpack;
  await expect(cart.itemNamed(backpack)).toHaveCount(1);
  await expect(cart.quantityFor(backpack)).toHaveText(quantity);
  await expect(cart.priceFor(backpack)).toHaveText(/^\$\d+\.\d{2}$/);
});

When("I remove the configured backpack from inventory", async function (this: TestWorld) {
  await new InventoryPage(this.getPage()).removeProduct(getProductData().backpack);
});

When("I remove the configured backpack from the cart", async function (this: TestWorld) {
  await new CartPage(this.getPage()).removeProduct(getProductData().backpack);
});

When("I continue shopping from the cart", async function (this: TestWorld) {
  await new CartPage(this.getPage()).continueShopping();
});
