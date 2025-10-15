import { test, expect } from '../utils/fixture.js';
import * as allure from 'allure-playwright';
import { tags } from '../data/tags.js';

test.describe('Cart Tests', () => {
    let cartPage;
    let auth, items;

    test.beforeEach(async ({ poManager, envData }) => {
        ({ auth, items } = envData);

        await poManager.basePage.goToBasePage();
        await poManager.loginPage.login(auth.username, auth.password);
        cartPage = poManager.cartPage

    });


    test('Verify bage is changing', { tags: [tags.smoke] }, async ({ }) => {

        await test.step('Attempt to add 1 item to a cart', async () => {

            await cartPage.verifyAddItemToCart(items.backpack);
        });
        await test.step('Attempt to add 2+ items from a cart', async () => {
            await cartPage.verifyAddItemToCart(items.bikeLight);
            await cartPage.verifyAddItemToCart(items.boltTShirt);
            await cartPage.verifyAddItemToCart(items.fleeceJacket);
            await cartPage.getCartItemCount().then(count => expect(count).toBe(4));
        });

    });

    test('Navigate to cart from Inventory page', { tags: [tags.regression] }, async () => {

        await test.step('Attempt to open cart with item added', async () => {
            await cartPage.verifyAddItemToCart(items.bikeLight);
            await cartPage.getCartItemCount().then(count => expect(count).toBe(1));

        });

        await test.step('Attempt to open cart', async () => {
            await cartPage.verifyCartIconWorks();
        });
        await test.step('Verify item is in the cart', async () => {
            await cartPage.verifyItemAddedToCart(items.bikeLight);
        });
    });

    test('Verify item is added to cart', { tags: [tags.smoke] }, async () => {

        await test.step('Attempt to add item to a cart', async () => {

            await cartPage.verifyAddItemToCart(items.backpack);
        });
        await test.step('Attempt to open cart', async () => {
            await cartPage.verifyCartIconWorks();
        });
        await test.step('Verify item is in the cart', async () => {
            await cartPage.verifyItemAddedToCart(items.backpack);
        });
    });

    test('Verify items can be removed from cart', { tags: [tags.smoke] }, async () => {
        await test.step('Precondition. Attempt to add item to a cart', async () => {
            await cartPage.verifyAddItemToCart(items.backpack);
        });
        const item = items.backpack;
        await test.step('Attempt to open cart', async () => {
            await cartPage.verifyCartIconWorks();
        });

        await test.step('Attempt to remove item from a cart', async () => {
            await cartPage.verifyRemoveItemFromCart(item)
        });
        await test.step('Verify item is removed from the cart', async () => {
            const count = await cartPage.getCartItemCount();
            expect(count).toBe(0);
        });
    });

    test('Verify multiple items are removed from cart', { tags: [tags.regression] }, async () => {
        await test.step('Precondition. Attempt to add items to a cart', async () => {
            await cartPage.verifyAddItemToCart(items.backpack);
            await cartPage.verifyAddItemToCart(items.bikeLight);
            await cartPage.verifyAddItemToCart(items.boltTShirt);
        });
        await test.step('Attempt to open cart', async () => {
            await cartPage.verifyCartIconWorks();
        });
        await test.step('Attempt to remove items from a cart', async () => {
            await cartPage.verifyRemoveItemFromCart(items.backpack);
            let count = await cartPage.getCartItemCount();
            expect(count).toBe(2);

            await cartPage.verifyRemoveItemFromCart(items.bikeLight);
            count = await cartPage.getCartItemCount();
            expect(count).toBe(1);

            await cartPage.verifyRemoveItemFromCart(items.boltTShirt);
            count = await cartPage.getCartItemCount();
            expect(count).toBe(0);

        });

    });


});