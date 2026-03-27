import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

test.describe('Shopping Cart', () => {

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
  });

  test('adicionar produto ao carrinho', async ({ page }) => {
    const products = new ProductsPage(page);
    await products.addProductToCart('Sauce Labs Backpack');

    const badge = page.locator('.shopping_cart_badge');
    await expect(badge).toHaveText('1');
  });

  test('adicionar múltiplos produtos', async ({ page }) => {
    const products = new ProductsPage(page);
    await products.addProductToCart('Sauce Labs Backpack');
    await products.addProductToCart('Sauce Labs Bike Light');
    await products.addProductToCart('Sauce Labs Bolt T-Shirt');

    const badge = page.locator('.shopping_cart_badge');
    await expect(badge).toHaveText('3');
});

  test('remover produto do carrinho', async ({ page }) => {
    const products = new ProductsPage(page);
    await products.addProductToCart('Sauce Labs Backpack');

    const cart = new CartPage(page);
    await cart.goto();
    await cart.removeItem('Sauce Labs Backpack');
    await expect(cart.cartItems).toHaveCount(0);
  });

  test('carrinho vazio não tem itens', async ({ page }) => {
    const cart = new CartPage(page);
    await cart.goto();

    await expect(cart.cartItems).toHaveCount(0);
});

  test('carrinho persiste após navegar entre páginas', async ({ page }) => {
    const products = new ProductsPage(page);
    await products.addProductToCart('Sauce Labs Bike Light');
    await page.goto('/inventory.html');

    const badge = page.locator('.shopping_cart_badge');
    await expect(badge).toBeVisible();
  });

});
