import { test, expect } from '@playwright/test';
import { CONFIG } from '../utils/config.js';

test.describe('Products Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(CONFIG.baseURL);
        // Логін до системи
        const usernameField = await page.locator(CONFIG.selectors.loginPage.usernameField);
        const passwordField = await page.locator(CONFIG.selectors.loginPage.passwordField);
        const loginButton = await page.locator(CONFIG.selectors.loginPage.loginButton);

        await usernameField.fill(CONFIG.credentials.valid.username);
        await passwordField.fill(CONFIG.credentials.valid.password);
        await loginButton.click();
    });

    test('Check page elements on Products page', async ({ page }) => {
        const pageTitle = await page.locator('.title').textContent();
        const productList = await page.locator('.inventory_list');
        const menuButton = await page.locator('#react-burger-menu-btn');

        expect(pageTitle).toBe('Products');
        expect(await productList.count()).toBeGreaterThan(0);
        expect(menuButton).toBeVisible();
        const productNames = await page.locator('.inventory_item_name').allTextContents();
        const productPrices = await page.locator('.inventory_item_price').allTextContents();

        expect(productNames.length).toBeGreaterThan(0);
        expect(productPrices.length).toBeGreaterThan(0);
    });

    test('Filter products by price (low to high)', async ({ page }) => {
        const priceFilter = page.locator('.product_sort_container');
        await priceFilter.selectOption({ label: 'Price (low to high)' });

        const productPrices = await page.locator('.inventory_item_price').allTextContents();
        const sortedPrices = [...productPrices].sort((a, b) => parseFloat(a.slice(1)) - parseFloat(b.slice(1)));

        expect(productPrices).toEqual(sortedPrices);
    });

    test('Filter products by price (high to low)', async ({ page }) => {
        const priceFilter = page.locator('.product_sort_container');
        await priceFilter.selectOption({ label: 'Price (high to low)' });

        const productPrices = await page.locator('.inventory_item_price').allTextContents();
        const sortedPrices = [...productPrices].sort((a, b) => parseFloat(b.slice(1)) - parseFloat(a.slice(1)));

        expect(productPrices).toEqual(sortedPrices);
    });

    test('Check menu button functionality', async ({ page }) => {
        // Натискання на кнопку меню
        const menuButton = await page.locator(CONFIG.selectors.productsPage.menuButton);
        await menuButton.click();

        // Отримуємо всі пункти меню окремо
        const menuItems = await page.locator('.bm-item-list').locator('a').allTextContents();

        // Перевірка, чи містить список очікувані елементи
        expect(menuItems).toContain('All Items');
        expect(menuItems).toContain('About');
        expect(menuItems).toContain('Logout');
    });
});