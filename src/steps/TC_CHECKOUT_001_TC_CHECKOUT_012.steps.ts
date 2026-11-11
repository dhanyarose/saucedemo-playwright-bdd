import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CartPage } from "../pages/CartPage";
import { CheckoutInformationPage } from "../pages/CheckoutInformationPage";
import { CheckoutOverviewPage } from "../pages/CheckoutOverviewPage";
import { InventoryPage } from "../pages/InventoryPage";
import { TestWorld } from "../support/world";
import {
  openCheckoutInformation,
  openInventoryWithProducts,
  submitConfiguredCheckoutInformation
} from "../support/e2e-journeys";
import { getCheckoutData, getProductData } from "../utils/test-data";

Given("I have the configured backpack in the cart", async function (this: TestWorld) {
  await openInventoryWithProducts(this);
});

Given("I have the configured sample products in the cart", async function (this: TestWorld) {
  await openInventoryWithProducts(this, true);
});

When("I open the cart and proceed to checkout", async function (this: TestWorld) {
  await openCheckoutInformation(this);
});

When("I proceed through checkout using the configured customer information", async function (this: TestWorld) {
  await submitConfiguredCheckoutInformation(this);
});

When("I open checkout information and submit it empty", async function (this: TestWorld) {
  await openCheckoutInformation(this);
  await new CheckoutInformationPage(this.getPage()).continue();
});

When("I submit checkout information without a {string}", async function (this: TestWorld, missingField: string) {
  await openCheckoutInformation(this);
  const data = getCheckoutData();
  const information = {
    firstName: missingField === "first name" ? "" : data.firstName,
    lastName: missingField === "last name" ? "" : data.lastName,
    zipCode: missingField === "postal code" ? "" : data.zipCode
  };
  await new CheckoutInformationPage(this.getPage()).fillInformation(information);
  await new CheckoutInformationPage(this.getPage()).continue();
});

Then("the checkout information form should be displayed", async function (this: TestWorld) {
  const form = new CheckoutInformationPage(this.getPage());
  await expect(form.heading()).toHaveText("Checkout: Your Information");
  await expect(form.firstNameField()).toBeVisible();
  await expect(form.lastNameField()).toBeVisible();
  await expect(form.zipCodeField()).toBeVisible();
});

Then("the checkout error should contain {string}", async function (this: TestWorld, message: string) {
  await expect(new CheckoutInformationPage(this.getPage()).errorMessage()).toContainText(message);
});

When("I open checkout information and cancel", async function (this: TestWorld) {
  await openCheckoutInformation(this);
  await new CheckoutInformationPage(this.getPage()).cancel();
});

Then("I should return to the cart without completing an order", async function (this: TestWorld) {
  await expect(this.getPage()).toHaveURL(/\/cart\.html$/);
  await expect(new CartPage(this.getPage()).checkoutButton()).toBeVisible();
});

Then("the checkout overview should be displayed", async function (this: TestWorld) {
  await expect(new CheckoutOverviewPage(this.getPage()).heading()).toHaveText("Checkout: Overview");
});

Then("the checkout overview should show consistent product and price totals", async function (this: TestWorld) {
  const overview = new CheckoutOverviewPage(this.getPage());
  await expect(overview.heading()).toHaveText("Checkout: Overview");
  await expect(overview.items()).toHaveCount(1);
  await expect(overview.itemNames()).toContainText(getProductData().backpack);
  await expectConsistentTotals(overview);
});

Then("the checkout overview should show both products and consistent price totals", async function (
  this: TestWorld
) {
  const overview = new CheckoutOverviewPage(this.getPage());
  const products = getProductData();
  await expect(overview.heading()).toHaveText("Checkout: Overview");
  await expect(overview.items()).toHaveCount(2);
  const names = await overview.itemNames().allTextContents();
  expect(names).toEqual(expect.arrayContaining([products.backpack, products.bikeLight]));
  await expectConsistentTotals(overview);
});

When("I cancel checkout from the overview", async function (this: TestWorld) {
  await new CheckoutOverviewPage(this.getPage()).cancel();
});

Then("I should return to the inventory page without completing an order", async function (this: TestWorld) {
  await expect(this.getPage()).toHaveURL(/\/inventory\.html$/);
  await expect(new InventoryPage(this.getPage()).title()).toHaveText("Products");
});

async function expectConsistentTotals(overview: CheckoutOverviewPage): Promise<void> {
  const prices = await overview.itemPrices().allTextContents();
  const itemPrices = prices.map(parseCurrency);
  const itemTotal = parseCurrency(await overview.itemTotal().innerText());
  const tax = parseCurrency(await overview.tax().innerText());
  const total = parseCurrency(await overview.total().innerText());

  expect(itemPrices.reduce((sum, price) => sum + price, 0)).toBeCloseTo(itemTotal, 2);
  expect(itemTotal + tax).toBeCloseTo(total, 2);
}

function parseCurrency(text: string): number {
  const amount = text.match(/\$([0-9]+(?:\.[0-9]{1,2})?)/)?.[1];
  if (!amount) {
    throw new Error(`Expected currency amount in text, received: ${text}`);
  }
  return Number(amount);
}
