import { Page, Locator } from '@playwright/test';
import { CheckoutSelectors } from '../selectors/CheckoutSelectors';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page             = page;
    this.firstNameInput   = page.locator(CheckoutSelectors.INPUT_FIRST_NAME);
    this.lastNameInput    = page.locator(CheckoutSelectors.INPUT_LAST_NAME);
    this.postalCodeInput  = page.locator(CheckoutSelectors.INPUT_POSTAL_CODE);
    this.continueButton   = page.locator(CheckoutSelectors.BUTTON_CONTINUE);
    this.finishButton     = page.locator(CheckoutSelectors.BUTTON_FINISH);
    this.successMessage   = page.locator(CheckoutSelectors.TEXT_SUCCESS);
  }

  async fillForm(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill('Jorge Fernando');
    await this.lastNameInput.fill('Toledo');
    await this.postalCodeInput.fill('37245-000');
  }

  async continue() {
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }
}