import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { TestWorld } from "../support/world";
import { getLoginData, getPassword } from "../utils/test-data";

Given("I open the SauceDemo login page", async function (this: TestWorld) {
  await new LoginPage(this.getPage()).open(this.baseURL);
});

When("I log in as the configured valid user", async function (this: TestWorld) {
  const login = getLoginData();
  await new LoginPage(this.getPage()).login(login.validUser, getPassword());
});

When("I submit the locked-out user credentials", async function (this: TestWorld) {
  const login = getLoginData();
  await new LoginPage(this.getPage()).login(login.lockedOutUser, getPassword());
});

When("I submit login with username {string} and password {string}", async function (
  this: TestWorld,
  username: string,
  password: string
) {
  await new LoginPage(this.getPage()).submit(username, password);
});

Then("I should be on the Products page", async function (this: TestWorld) {
  await expect(new InventoryPage(this.getPage()).title()).toHaveText("Products");
  await expect(this.getPage()).toHaveURL(/\/inventory\.html$/);
});

Then("I should see the login error {string}", async function (this: TestWorld, message: string) {
  await expect(new LoginPage(this.getPage()).errorMessage()).toContainText(message);
});

When("I log out from the navigation menu", async function (this: TestWorld) {
  await new LoginPage(this.getPage()).logout();
});

Then("I should return to the login page with empty fields", async function (this: TestWorld) {
  await expect(this.getPage().getByPlaceholder("Username")).toBeVisible();
  await expect(this.getPage().getByPlaceholder("Username")).toBeEmpty();
  await expect(this.getPage().getByPlaceholder("Password")).toBeEmpty();
});

Then("I should remain unauthenticated", async function (this: TestWorld) {
  await expect(this.getPage()).toHaveURL(/\/$/);
  await expect(this.getPage().getByPlaceholder("Username")).toBeVisible();
});

When("I navigate directly to the inventory page", async function (this: TestWorld) {
  await this.getPage().goto(`${this.baseURL}/inventory.html`);
});
