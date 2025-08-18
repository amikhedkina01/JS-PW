import { test, expect } from '../utils/fixture.js';

test.describe('Products Page Tests', () => {

    test.beforeEach(async ({ poManager }) => {
        await poManager.basePage.goToBasePage();
        await poManager.loginPage.login('standard_user', 'secret_sauce');
    });

    test('@smoke Check page elements on Products page', async ({ poManager }) => {
        expect(await poManager.productsPage.pageTitle.isVisible()).toBeTruthy();
        expect(await poManager.productsPage.productList.count()).toBeGreaterThan(0);

        const productNames = await poManager.productsPage.getProductNames();
        const productPrices = await poManager.productsPage.getProductPrices();

        expect(productNames.length).toBeGreaterThan(0);
        expect(productPrices.length).toBeGreaterThan(0);
        expect(await poManager.productsPage.menuButton.isVisible()).toBeTruthy();
    });

    test('@regression Filter products by price (low to high)', async ({ poManager }) => {
        await poManager.productsPage.sortProductsLowToHigh();

        const productPrices = await poManager.productsPage.getProductPrices();
        const sortedPrices = [...productPrices].sort((a, b) => parseFloat(a.slice(1)) - parseFloat(b.slice(1)));

        expect(productPrices).toEqual(sortedPrices);

        // additional sequence check
        for (let i = 0; i < productPrices.length - 1; i++) {
            const currentPrice = parseFloat(productPrices[i].slice(1));
            const nextPrice = parseFloat(productPrices[i + 1].slice(1));
            expect(currentPrice).toBeLessThanOrEqual(nextPrice);
        }
    });

    test('@regression Filter products by price (high to low)', async ({ poManager }) => {
        await poManager.productsPage.sortProductsHighToLow();

        const productPrices = await poManager.productsPage.getProductPrices();
        const sortedPrices = [...productPrices].sort((a, b) => parseFloat(b.slice(1)) - parseFloat(a.slice(1)));

        expect(productPrices).toEqual(sortedPrices);

        for (let i = 0; i < productPrices.length - 1; i++) {
            const currentPrice = parseFloat(productPrices[i].slice(1));
            const nextPrice = parseFloat(productPrices[i + 1].slice(1));
            expect(currentPrice).toBeGreaterThanOrEqual(nextPrice);
        }
    });

    test('@regression Check menu button functionality', async ({ poManager }) => {
        await poManager.productsPage.openMenu();

        const menuItems = await poManager.productsPage.getMenuItems();
        expect(menuItems).toContain('All Items');
        expect(menuItems).toContain('About');
        expect(menuItems).toContain('Logout');
    });
});
