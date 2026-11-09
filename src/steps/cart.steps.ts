import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CartPage } from "../pages/CartPage";
import { InventoryPage } from "../pages/InventoryPage";
import { LoginPage } from "../pages/LoginPage";
import { TestWorld } from "../support/world";
import { getLoginData, getPassword, getProductData } from "../utils/test-data";

Given("I am on the inventory page with an empty cart", async function (this: TestWorld) {
  const login = getLoginData();
  await new LoginPage(this.getPage()).open(this.baseURL);
  await new LoginPage(this.getPage()).login(login.validUser, getPassword());
});

When("I add {string} to the cart", async function (this: TestWorld, product: string) {
  await new InventoryPage(this.getPage()).addProduct(product);
});

When("I add the configured sample products to the cart", async function (this: TestWorld) {
  const products = getProductData();
  const inventory = new InventoryPage(this.getPage());
  await inventory.addProduct(products.backpack);
  await inventory.addProduct(products.bikeLight);
});

Then("the cart badge should show {string}", async function (this: TestWorld, count: string) {
  const badge = new InventoryPage(this.getPage()).cartBadge();
  if (count === "0") {
    await expect(badge).toHaveCount(0);
  } else {
    await expect(badge).toHaveText(count);
  }
});

Then("the product button should change to Remove for {string}", async function (
  this: TestWorld,
  product: string
) {
  const item = new InventoryPage(this.getPage()).items().filter({
    has: this.getPage().getByText(product, { exact: true })
  });
  await expect(item.getByRole("button", { name: "Remove" })).toBeVisible();
});

When("I open the cart", async function (this: TestWorld) {
  await new InventoryPage(this.getPage()).openCart();
});

When("I navigate back to the inventory page", async function (this: TestWorld) {
  await this.getPage().goBack();
  await expect(this.getPage()).toHaveURL(/\/inventory\.html$/);
});

Then("the cart should contain {string}", async function (this: TestWorld, product: string) {
  await expect(new CartPage(this.getPage()).productNames()).toContainText(product);
});

Then("the cart should contain both configured sample products", async function (this: TestWorld) {
  const products = getProductData();
  const names = await new CartPage(this.getPage()).productNames().allTextContents();
  expect(names).toEqual(expect.arrayContaining([products.backpack, products.bikeLight]));
});

When("I remove {string} from the inventory", async function (this: TestWorld, product: string) {
  await new InventoryPage(this.getPage()).removeProduct(product);
});

When("I remove {string} from the cart", async function (this: TestWorld, product: string) {
  await new CartPage(this.getPage()).removeProduct(product);
});

Then("the cart should be empty", async function (this: TestWorld) {
  await expect(new CartPage(this.getPage()).items()).toHaveCount(0);
});

Then("the cart should retain {string}", async function (this: TestWorld, product: string) {
  await expect(new CartPage(this.getPage()).productNames()).toContainText(product);
});

Then("the inventory price for {string} should match its cart price", async function (
  this: TestWorld,
  product: string
) {
  const cart = new CartPage(this.getPage());
  const cartItem = cart.items().filter({ has: this.getPage().getByText(product, { exact: true }) });
  const cartPrice = await cartItem.locator('[data-test="inventory-item-price"]').innerText();
  await this.getPage().goBack();
  const inventory = new InventoryPage(this.getPage());
  const inventoryItem = inventory.items().filter({ has: this.getPage().getByText(product, { exact: true }) });
  await expect(inventoryItem.locator('[data-test="inventory-item-price"]')).toHaveText(cartPrice);
});
