import { test, expect } from '@playwright/test';
import { poManagerFixture } from '../utils/fixture';  // Імпортуємо фікстуру

test.describe('Login Tests', () => {
    test.use({ poManager: poManagerFixture });

    // Використовуємо фікстуру для отримання POManager
    test.beforeEach(async ({ page }, { poManager }) => {
        this.loginPage = poManager.getLoginPage();
        this.productsPage = poManager.getProductsPage();
        await page.goto('https://www.saucedemo.com/');
    });

    test('Successful login with valid credentials', async () => {
        await this.loginPage.login(CONFIG.credentials.valid.username, CONFIG.credentials.valid.password);
        const pageTitle = await this.productsPage.getPageTitle();
        expect(pageTitle).toBe('PRODUCTS');
    });

    test('Login with invalid username', async () => {
        await this.loginPage.login(CONFIG.credentials.invalid.username, CONFIG.credentials.invalid.password);
        const errorMessage = await this.loginPage.getErrorMessage();
        expect(errorMessage).toBe('Epic sadface: Username and password do not match any user in this service');
    });

    test('Login with empty fields', async () => {
        await this.loginPage.login(CONFIG.credentials.empty.username, CONFIG.credentials.empty.password);
        const errorMessage = await this.loginPage.getErrorMessage();
        expect(errorMessage).toBe('Epic sadface: Username is required');
    });
});
