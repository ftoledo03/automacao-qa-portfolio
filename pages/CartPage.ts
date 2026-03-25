import { Page, Locator } from '@playwright/test';
import { CartSelectors } from '../selectors/CartSelectors'

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page                   = page;
    this.cartItems              = page.locator(CartSelectors.LIST_CART_ITEMS);
    this.checkoutButton         = page.locator(CartSelectors.BUTTON_CHECKOUT);
    this.continueShoppingButton = page.locator(CartSelectors.BUTTON_CONTINUE_SHOP);
  }

  async goto() {
    await this.page.goto('/cart.html');
  }

  async removeItem(productName: string) {
    await this.page
      .locator(`.cart_item:has-text("${productName}")`)
      .locator('button')
      .click();
  }
}