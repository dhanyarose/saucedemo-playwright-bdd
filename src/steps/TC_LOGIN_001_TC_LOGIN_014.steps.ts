import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage";
import { LoginPage } from "../pages/LoginPage";
import { TestWorld } from "../support/world";
import { loginAsConfiguredUser } from "../support/e2e-journeys";
import { getInvalidLoginData, getLoginData, getPassword, getUserName } from "../utils/test-data";

Given("I am authenticated for the end-to-end suite", async function (this: TestWorld) {
  await loginAsConfiguredUser(this);
});

When("I sign in with the configured end-to-end user", async function (this: TestWorld) {
  const login = getLoginData();
  await new LoginPage(this.getPage()).login(login.validUsername, getPassword());
});

When("I submit the end-to-end login form with empty fields", async function (this: TestWorld) {
  await new LoginPage(this.getPage()).submit("", "");
});

When("I submit the end-to-end login form with username only", async function (this: TestWorld) {
  const login = getLoginData();
  await new LoginPage(this.getPage()).submit(login.validUsername, "");
});

When("I submit the end-to-end login form with password only", async function (this: TestWorld) {
  await new LoginPage(this.getPage()).submit("", getPassword());
});

When("I submit an invalid username with the configured password", async function (this: TestWorld) {
  const login = getLoginData();
  await new LoginPage(this.getPage()).login(login.invalidUsername, getPassword());
});

When("I submit the configured username with an invalid password", async function (this: TestWorld) {
  const login = getLoginData();
  const invalid = getInvalidLoginData();
  await new LoginPage(this.getPage()).login(login.validUsername, invalid.password);
});

When("I submit invalid end-to-end credentials", async function (this: TestWorld) {
  const invalid = getInvalidLoginData();
  await new LoginPage(this.getPage()).login(invalid.username, invalid.password);
});

When("I sign in using the configured {string} user", async function (this: TestWorld, kind: string) {
  const supportedKinds = ["locked", "problem", "performance", "error", "visual"] as const;
  if (!supportedKinds.includes(kind as (typeof supportedKinds)[number])) {
    throw new Error(`Unsupported configured SauceDemo user category: ${kind}`);
  }

  await new LoginPage(this.getPage()).login(getUserName(kind as (typeof supportedKinds)[number]), getPassword());
});

Then("the login page should show the username, password, and login controls", async function (this: TestWorld) {
  const login = new LoginPage(this.getPage());
  await expect(login.usernameField()).toBeVisible();
  await expect(login.passwordField()).toBeVisible();
  await expect(login.loginButton()).toBeVisible();
  await expect(login.loginButton()).toBeEnabled();
});

Then("the login error should contain {string}", async function (this: TestWorld, message: string) {
  await expect(new LoginPage(this.getPage()).errorMessage()).toContainText(message);
});

Then("the inventory layout should render its product cards and images", async function (this: TestWorld) {
  const inventory = new InventoryPage(this.getPage());
  await expect(inventory.items()).toHaveCount(6);
  const images = inventory.productImages();
  await expect(images).toHaveCount(6);
  const count = await images.count();
  for (let index = 0; index < count; index += 1) {
    await expect(images.nth(index)).toBeVisible();
    const box = await images.nth(index).boundingBox();
    expect(box?.width).toBeGreaterThan(0);
    expect(box?.height).toBeGreaterThan(0);
  }
});

When("I enter the configured password", async function (this: TestWorld) {
  await new LoginPage(this.getPage()).passwordField().fill(getPassword());
});

Then("the password field should use a masked input type", async function (this: TestWorld) {
  await expect(new LoginPage(this.getPage()).passwordField()).toHaveAttribute("type", "password");
});
