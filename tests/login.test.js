import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CONFIG } from '../utils/config';

test.describe('Login Tests', () => {
    let loginPage;
    let productsPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        await page.goto(CONFIG.baseURL);
    });

    test('Successful login with valid credentials', async () => {
        await loginPage.login(CONFIG.credentials.valid.username, CONFIG.credentials.valid.password);
        const pageTitle = await productsPage.getPageTitle();
        expect(pageTitle).toBe('PRODUCTS');
    });

    test('Login with invalid username', async () => {
        await loginPage.login(CONFIG.credentials.invalid.username, CONFIG.credentials.invalid.password);
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toBe('Epic sadface: Username and password do not match any user in this service');
    });

    test('Login with empty fields', async () => {
        await loginPage.login(CONFIG.credentials.empty.username, CONFIG.credentials.empty.password);
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toBe('Epic sadface: Username is required');
    });
});
