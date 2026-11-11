import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { InventoryPage } from "../pages/InventoryPage";
import { OrderCompletePage } from "../pages/OrderCompletePage";
import { TestWorld } from "../support/world";
import { completeConfiguredOrder, finishCurrentCheckout } from "../support/e2e-journeys";

Given("I have completed an order with the configured backpack", async function (this: TestWorld) {
  await completeConfiguredOrder(this);
});

When("I complete checkout using the configured customer information", async function (this: TestWorld) {
  await finishCurrentCheckout(this);
});

Then("the order confirmation page should be displayed", async function (this: TestWorld) {
  await expect(new OrderCompletePage(this.getPage()).heading()).toHaveText("Checkout: Complete!");
});

Then("the confirmation should show the success and dispatch messages", async function (this: TestWorld) {
  const complete = new OrderCompletePage(this.getPage());
  await expect(complete.successMessage()).toBeVisible();
  await expect(complete.dispatchMessage()).toContainText("will arrive just as fast as the pony can get there");
});

When("I refresh the order confirmation page", async function (this: TestWorld) {
  await this.getPage().reload();
});

Then("the confirmation remains visible and the cart remains empty", async function (this: TestWorld) {
  const complete = new OrderCompletePage(this.getPage());
  await expect(complete.successMessage()).toBeVisible();
  await expect(new InventoryPage(this.getPage()).cartBadge()).toHaveCount(0);
});

When("I generate the order PDF", async function (this: TestWorld) {
  this.orderDownload = await new OrderCompletePage(this.getPage()).generatePdf();
});

Then("a non-empty PDF download should be available", async function (this: TestWorld) {
  if (!this.orderDownload) {
    throw new Error("The order PDF download event was not captured.");
  }
  const downloadPath = await this.orderDownload.path();
  if (!downloadPath) {
    throw new Error("The browser did not provide a readable path for the order PDF download.");
  }

  const contents = await readFile(downloadPath);
  expect(this.orderDownload.suggestedFilename()).toMatch(/\.pdf$/i);
  expect(contents.byteLength).toBeGreaterThan(0);
  expect(contents.subarray(0, 5).toString("ascii")).toBe("%PDF-");
});

When("I navigate home from order completion", async function (this: TestWorld) {
  await new OrderCompletePage(this.getPage()).backHome();
});
