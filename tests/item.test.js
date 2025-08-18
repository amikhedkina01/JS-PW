import { test, expect } from '../utils/fixture.js';

test.describe('Item Page Tests', () => {

    test.beforeEach(async ({ poManager }) => {
        await poManager.basePage.goToBasePage();
        await poManager.loginPage.login('standard_user', 'secret_sauce');
    });

    test('@smoke Add item to cart', async ({ poManager }) => {
        const itemName = 'sauce-labs-backpack';                        // hardcoded for now
        await poManager.itemPage.addItemToCart(itemName);

        const cartCount = await poManager.itemPage.getCartItemCount();
        expect(cartCount).toBe(1);
    });

    test('@smoke Remove item from cart', async ({ poManager }) => {
        const itemName = 'sauce-labs-backpack';                          // hardcoded for now
        await poManager.itemPage.addItemToCart(itemName);

        let cartCount = await poManager.itemPage.getCartItemCount();
        expect(cartCount).toBe(1);

        await poManager.itemPage.removeItemFromCart(itemName);
        cartCount = await poManager.itemPage.getCartItemCount();
        expect(cartCount).toBe(0);
    });

    test('@smoke Navigate to cart', async ({ poManager }) => {
        await poManager.itemPage.goToCart();

        const pageTitle = poManager.productsPage.page.locator('span.title');
        await expect(pageTitle).toHaveText('Your Cart');
    });
});



