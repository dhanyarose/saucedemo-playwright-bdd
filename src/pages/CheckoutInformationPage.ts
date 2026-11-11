import type { Locator, Page } from "playwright";

export interface CheckoutInformation {
  firstName: string;
  lastName: string;
  zipCode: string;
}

export class CheckoutInformationPage {
  constructor(private readonly page: Page) {}

  heading(): Locator {
    return this.page.locator('[data-test="title"]');
  }

  firstNameField(): Locator {
    return this.page.getByPlaceholder("First Name");
  }

  lastNameField(): Locator {
    return this.page.getByPlaceholder("Last Name");
  }

  zipCodeField(): Locator {
    return this.page.getByPlaceholder("Zip/Postal Code");
  }

  errorMessage(): Locator {
    return this.page.locator('[data-test="error"]');
  }

  async fillInformation(information: CheckoutInformation): Promise<void> {
    await this.firstNameField().fill(information.firstName);
    await this.lastNameField().fill(information.lastName);
    await this.zipCodeField().fill(information.zipCode);
  }

  async continue(): Promise<void> {
    await this.page.getByRole("button", { name: "Continue" }).click();
  }

  async cancel(): Promise<void> {
    await this.page.getByRole("button", { name: "Cancel" }).click();
  }
}
