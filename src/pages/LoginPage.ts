import type { Page } from "playwright";

export class LoginPage {
  constructor(private readonly page: Page) {}

  async open(baseURL: string): Promise<void> {
    await this.page.goto(baseURL);
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.getByPlaceholder("Username").fill(username);
    await this.page.getByPlaceholder("Password").fill(password);
    await this.page.getByRole("button", { name: "Login" }).click();
  }

  async submit(username: string, password: string): Promise<void> {
    if (username) {
      await this.page.getByPlaceholder("Username").fill(username);
    }
    if (password) {
      await this.page.getByPlaceholder("Password").fill(password);
    }
    await this.page.getByRole("button", { name: "Login" }).click();
  }

  errorMessage() {
    return this.page.locator('[data-test="error"]');
  }

  async logout(): Promise<void> {
    await this.page.getByRole("button", { name: "Open Menu" }).click();
    await this.page.getByRole("button", { name: "Logout" }).click();
  }
}
