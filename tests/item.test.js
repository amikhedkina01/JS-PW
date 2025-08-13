import { test, expect } from '@playwright/test';
import { CONFIG } from '../utils/config.js';

test.describe('Item Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(CONFIG.baseURL);
        const usernameField = page.locator(CONFIG.selectors.loginPage.usernameField);
        const passwordField = page.locator(CONFIG.selectors.loginPage.passwordField);
        const loginButton = page.locator(CONFIG.selectors.loginPage.loginButton);

        await usernameField.fill(CONFIG.credentials.valid.username);
        await passwordField.fill(CONFIG.credentials.valid.password);
        await loginButton.click();
    });

    test('Add item to cart', async ({ page }) => {
        const addToCartButton = page.locator(CONFIG.selectors.itemPage.addToCartButton);
        await addToCartButton.click();

        const cartItemCount = page.locator(CONFIG.selectors.productsPage.shoppingCartBadge);
        const cartItemCountText = await cartItemCount.textContent();
        expect(cartItemCountText).toBe('1');
    });

    test('Remove item from cart', async ({ page }) => {
        const addToCartButton = page.locator(CONFIG.selectors.itemPage.addToCartButton);
        await addToCartButton.click();

        const cartItemCount = page.locator(CONFIG.selectors.productsPage.shoppingCartBadge);
        const cartItemCountText = await cartItemCount.textContent();
        expect(cartItemCountText).toBe('1');

        const removeButton = page.locator(CONFIG.selectors.itemPage.removeButton);
        await removeButton.click();

        const cartItemCountAfterRemoval = await page.locator(CONFIG.selectors.productsPage.shoppingCartBadge).count();
        expect(cartItemCountAfterRemoval).toBe(0);
    });

    test('Navigate to cart', async ({ page }) => {
        const cartIcon = page.locator(CONFIG.selectors.productsPage.shoppingCartLink);
        await cartIcon.click();

        const pageTitle = page.locator(CONFIG.selectors.productsPage.pageTitle);
        const pageTitleText = await pageTitle.textContent();
        expect(pageTitleText).toBe('Your Cart');
    });
});
