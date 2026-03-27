import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test.describe ('Products', () => {

    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);
        await login.goto();
        await login.login('standard_user', 'secret_sauce');
    });

    test('listar todos os produtos', async  ({page}) => {
        const products = new ProductsPage(page);
        const count = await products.getProductCount();
        await expect(count).toBe(6);

    });

   test('ordenar produtos por menor preço', async ({ page }) => {
    console.log('URL:', page.url());
    await page.locator('[data-test="product-sort-container"]').selectOption('Price (low to high)');
    
    const firstPrice = await page.locator('.inventory_item_price').first().textContent();
    await expect(firstPrice).toBe('$7.99');
});
test('ordenar produtos por nome A-Z', async ({ page }) => {
    const products = new ProductsPage(page);
    await products.sortBy('Name (A to Z)');
    
    const firstName = await page.locator('.inventory_item_name').first().textContent();
    await expect(firstName).toBe('Sauce Labs Backpack');
});

test('ver detalhes de um produto', async ({ page }) => {
    await page.locator('[data-test="item-4-title-link"]').click();
    
    await expect(page).toHaveURL('/inventory-item.html?id=4');
    await expect(page.locator('.inventory_details_name')).toBeVisible();
    await expect(page.locator('.inventory_details_price')).toBeVisible();
    await expect(page.locator('.inventory_details_desc')).toBeVisible();
});

    });




