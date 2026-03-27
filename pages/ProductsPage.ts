import { Page, Locator } from '@playwright/test';
import { ProductsSelectors } from '../selectors/ProductsSelectors'

export class ProductsPage {
  readonly page: Page;
  readonly productList: Locator;
  readonly cartIcon: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page         = page;
    this.productList  = page.locator(ProductsSelectors.LIST_PRODUCTS);
    this.cartIcon     = page.locator(ProductsSelectors.LINK_CART);
    this.sortDropdown = page.locator(ProductsSelectors.SELECT_SORT);
    
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
  async getProductCount() {
    return await this.page.locator('.inventory_item').count();
  }


  
}