import type { Page } from "playwright";

export class LoginPage {
  constructor(private readonly page: Page) {}

  usernameField() {
    return this.page.getByPlaceholder("Username");
  }

  passwordField() {
    return this.page.getByPlaceholder("Password");
  }

  loginButton() {
    return this.page.getByRole("button", { name: "Login" });
  }

  async open(baseURL: string): Promise<void> {
    await this.page.goto(baseURL);
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameField().fill(username);
    await this.passwordField().fill(password);
    await this.loginButton().click();
  }

  async loginUsingEnter(username: string, password: string): Promise<void> {
    await this.usernameField().fill(username);
    await this.passwordField().fill(password);
    await this.passwordField().press("Enter");
  }

  async submit(username: string, password: string): Promise<void> {
    await this.usernameField().fill(username);
    await this.passwordField().fill(password);
    await this.loginButton().click();
  }

  errorMessage() {
    return this.page.locator('[data-test="error"]');
  }

  async logout(): Promise<void> {
    await this.page.getByRole("button", { name: "Open Menu" }).click();
    await this.page.getByRole("button", { name: "Logout" }).click();
  }

  async resetApplicationState(): Promise<void> {
    await this.page.getByRole("button", { name: "Open Menu" }).click();
    await this.page.getByRole("button", { name: "Reset App State" }).click();
  }
}
