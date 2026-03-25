import { Page, Locator } from '@playwright/test';
import { LoginSelectors } from '../selectors/LoginSelectors'

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page          = page;
    this.usernameInput = page.locator(LoginSelectors.INPUT_USERNAME);
    this.passwordInput = page.locator(LoginSelectors.INPUT_PASSWORD);
    this.loginButton   = page.locator(LoginSelectors.BUTTON_LOGIN);
    this.errorMessage  = page.locator(LoginSelectors.TEXT_ERROR);
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}