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
