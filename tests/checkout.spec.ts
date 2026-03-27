import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout', () => {

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
  });

  test('checkout completo com sucesso', async ({ page }) => {
    const products = new ProductsPage(page);
    await products.addProductToCart('Sauce Labs Backpack');

    const cart = new CartPage(page);
    await cart.goto();
    await cart.checkout();

    const checkout = new CheckoutPage(page);
    await checkout.fillForm('Jorge', 'Toledo', '37245000');
    await checkout.continue();
    await checkout.finish();

    await expect(checkout.successMessage).toBeVisible();
  });

  test('formulário sem preencher os campos', async ({ page }) => {
    const products = new ProductsPage(page);
    await products.addProductToCart('Sauce Labs Backpack');

    const cart = new CartPage(page);
    await cart.goto();
    await cart.checkout();

    const checkout = new CheckoutPage(page);
    await checkout.continue();

    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
});

test('checkout com múltiplos produtos', async ({ page }) => {
    const products = new ProductsPage(page);
    await products.addProductToCart('Sauce Labs Backpack');
    await products.addProductToCart('Sauce Labs Bike Light');

    const cart = new CartPage(page);
    await cart.goto();
    await cart.checkout();

    const checkout = new CheckoutPage(page);
    await checkout.fillForm('Jorge', 'Toledo', '37245000');
    await checkout.continue();
    await checkout.finish();

    await expect(checkout.successMessage).toBeVisible();
});

test('cancelar o checkout', async ({ page }) => {
    const products = new ProductsPage(page);
    await products.addProductToCart('Sauce Labs Backpack');

    const cart = new CartPage(page);
    await cart.goto();
    await cart.checkout();

    const checkout = new CheckoutPage(page);
    await checkout.cancel();

    await expect(page).toHaveURL('/cart.html');
});

});