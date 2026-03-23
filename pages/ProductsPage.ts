import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly productList: Locator;
  readonly cartIcon: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page         = page;
    this.productList  = page.locator('.inventory_list');
    this.cartIcon     = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product_sort_container"]');
  }

  async addProductToCart(productName: string) {
    await this.page
      .locator(`.inventory_item:has-text("${productName}")`)
      .locator('button')
      .click();
  }

  async sortBy(option: string) {
    await this.sortDropdown.selectOption(option);
  }
}