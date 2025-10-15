import { test, expect } from '../utils/fixture.js';
import * as allure from 'allure-playwright';
import { tags } from '../data/tags.js';



test.describe('Item Tests', () => {
    let itemPage;
    let auth, items;

    test.beforeEach(async ({ poManager, envData }, testInfo) => {
        ({ auth, items } = envData);

        await poManager.basePage.goToBasePage();
        await poManager.loginPage.login(auth.username, auth.password);
        itemPage = poManager.itemPage
        // Парсимо @tags з назви тесту і додаємо в Allure
        const tags = testInfo.title.match(/@\w+/g) ?? [];
        tags.forEach(t => allure.tag(t.slice(1))); // -> smoke, regression, etc

    });

    test('UI: Verify preview Item elements are correct', { tags: [tags.smoke] }, async ({ }) => {

        await test.step('Key elements check', async () => {

            await itemPage.verifyItemElements(items.backpack);

        });
    });


    test('Add item to cart', { tags: [tags.smoke] }, async ({ }) => {

        await test.step('Attempt to add item to a cart', async () => {

            await itemPage.verifyAddItemToCart(items.backpack);
        });

    });

    test('Remove item from cart', { tags: [tags.smoke] }, async () => {

        await test.step('Precondition. Attempt to add item to a cart', async () => {
            await itemPage.verifyAddItemToCart(items.backpack);
        });
        const item = items.backpack;

        await test.step('Attempt to remove item to a cart', async () => {
            await itemPage.verifyRemoveItemFromCart(item)
        });

    });

    test('Navigate to cart from Item page', { tags: [tags.regression] }, async () => {

        await test.step('Attempt to open cart', async () => {
            await itemPage.verifyCartIconWork();
        });
    });

    test('UI smoke: Verify Item elements are correct', { tags: [tags.smoke] }, async () => {

        await test.step('Attempt to open Item page', async () => {
            await itemPage.verifyItemPageOpened(items.backpack);
        });

        await test.step('Verify Item elements are correct', async () => {

            await itemPage.verifyItemElementsPage(items.backpack);

        });

    });

    test('Add item to cart from Item Page', { tags: [tags.smoke] }, async () => {

        await test.step('Attempt to add to cart', async () => {

            await itemPage.verifyAddToCartFromItemPage(items.backpack);
        });
    });

    test('Remove item from cart with Item Page', { tags: [tags.smoke] }, async () => {


        await test.step('Precondition. Attempt to add item to a cart', async () => {
            await itemPage.verifyItemPageOpened(items.backpack);

            await itemPage.verifyAddToCartFromItemPage(items.backpack);
        });

        await test.step('Attempt to remove item to a cart', async () => {
            await itemPage.verifyRemoveFromCartItemPage(items.backpack);
        });

    });
});


