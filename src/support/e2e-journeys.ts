import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutInformationPage } from "../pages/CheckoutInformationPage";
import { CheckoutOverviewPage } from "../pages/CheckoutOverviewPage";
import { OrderCompletePage } from "../pages/OrderCompletePage";
import { TestWorld } from "./world";
import { getCheckoutData, getLoginData, getPassword, getProductData } from "../utils/test-data";

export async function loginAsConfiguredUser(world: TestWorld): Promise<void> {
  const login = getLoginData();
  const loginPage = new LoginPage(world.getPage());
  await loginPage.open(world.baseURL);
  await loginPage.login(login.validUsername, getPassword());
}

export async function openInventoryWithProducts(world: TestWorld, multiple = false): Promise<void> {
  await loginAsConfiguredUser(world);
  const products = getProductData();
  const inventory = new InventoryPage(world.getPage());
  await inventory.addProduct(products.backpack);
  if (multiple) {
    await inventory.addProduct(products.bikeLight);
  }
}

export async function openCheckoutInformation(world: TestWorld): Promise<void> {
  await new InventoryPage(world.getPage()).openCart();
  await new CartPage(world.getPage()).checkout();
}

export async function submitConfiguredCheckoutInformation(world: TestWorld): Promise<void> {
  await openCheckoutInformation(world);
  await new CheckoutInformationPage(world.getPage()).fillInformation(getCheckoutData());
  await new CheckoutInformationPage(world.getPage()).continue();
}

export async function completeConfiguredOrder(world: TestWorld): Promise<void> {
  await openInventoryWithProducts(world);
  await finishCurrentCheckout(world);
}

export async function finishCurrentCheckout(world: TestWorld): Promise<void> {
  await submitConfiguredCheckoutInformation(world);
  await new CheckoutOverviewPage(world.getPage()).finish();
}

export function getOrderCompletePage(world: TestWorld): OrderCompletePage {
  return new OrderCompletePage(world.getPage());
}
