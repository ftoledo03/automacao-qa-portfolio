import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { allure } from 'allure-playwright';

test.describe('Authentication', () => {

  test('login com credenciais válidas', async ({ page }) => {
    await allure.feature('Login');
    await allure.story('Usuário válido');

    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL('/inventory.html');
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('erro com credenciais inválidas', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('usuario_errado', 'senha_errada');

    await expect(login.errorMessage).toContainText(
      'Username and password do not match'
    );
  });

  test('usuário bloqueado não consegue logar', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('locked_out_user', 'secret_sauce');

    await expect(login.errorMessage).toContainText(
      'Sorry, this user has been locked out'
    );
  });

});
