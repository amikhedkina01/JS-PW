import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { CONFIG } from '../utils/config';


test.describe('Products Page Tests', () => {
    let productsPage;

    test.beforeEach(async ({ page }) => {
        productsPage = new ProductsPage(page);
        await page.goto(CONFIG.baseURL);
        await page.locator(CONFIG.selectors.login.username).fill(CONFIG.credentials.valid.username);
        await page.locator(CONFIG.selectors.login.password).fill(CONFIG.credentials.valid.password);
        await page.locator(CONFIG.selectors.login.loginButton).click();
    });

    test('Verify page title and products', async () => {
        const pageTitle = await productsPage.getPageTitle();
        expect(pageTitle).toBe('PRODUCTS');
        const productCount = await productsPage.getProductCount();
        expect(productCount).toBeGreaterThan(0);
    });

    test('Check menu button visibility', async () => {
        const menuButton = await productsPage.menuButton.isVisible();
        expect(menuButton).toBeTruthy();
    });
});
