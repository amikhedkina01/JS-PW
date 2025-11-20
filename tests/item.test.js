import { test, expect } from '../utils/fixture.js';
import * as allure from 'allure-playwright';
import { tags as tagNames } from '../data/tags.js';



test.describe('Item Tests', () => {
    let itemPage;
    let auth, items;

    test.beforeEach(async ({ poManager, envData }, testInfo) => {
        ({ auth, items } = envData);

        await poManager.basePage.goToBasePage();
        await poManager.loginPage.login(auth.username, auth.password);
        itemPage = poManager.itemPage
        // Playwright annotations are picked up by reporters (Allure reporter will convert them to labels)
        const tags = testInfo.title.match(/@\w+/g) ?? [];
        for (const t of tags) {
            testInfo.annotations.push({ type: 'tag', description: t.slice(1) });
        }
    });

    test(`${tagNames.smoke} UI: Verify preview Item elements are correct`, async ({ }) => {

        await test.step('Key elements check', async () => {

            await itemPage.verifyItemElements(items.backpack);

        });
    });


    test(`${tagNames.smoke} Add item to cart`, async ({ }) => {

        await test.step('Attempt to add item to a cart', async () => {

            await itemPage.verifyAddItemToCart(items.backpack);
        });

    });

    test(`${tagNames.smoke} Remove item from cart`, async () => {

        await test.step('Precondition. Attempt to add item to a cart', async () => {
            await itemPage.verifyAddItemToCart(items.backpack);
        });
        const item = items.backpack;

        await test.step('Attempt to remove item to a cart', async () => {
            await itemPage.verifyRemoveItemFromCart(item)
        });

    });

    test(`${tagNames.regression} Navigate to cart from Item page`, async () => {

        await test.step('Attempt to open cart', async () => {
            await itemPage.verifyCartIconWork();
        });
    });

    test(`${tagNames.smoke} UI smoke: Verify Item elements are correct`, async () => {

        await test.step('Attempt to open Item page', async () => {
            await itemPage.verifyItemPageOpened(items.backpack);
        });

        await test.step('Verify Item elements are correct', async () => {

            await itemPage.verifyItemElementsPage(items.backpack);

        });

    });

    test(`${tagNames.smoke} Add item to cart from Item Page`, async () => {

        await test.step('Attempt to add to cart', async () => {

            await itemPage.verifyAddToCartFromItemPage(items.backpack);
        });
    });

    test(`${tagNames.smoke} Remove item from cart with Item Page`, async () => {

        await test.step('Precondition. Attempt to add item to a cart', async () => {
            await itemPage.verifyItemPageOpened(items.backpack);

            await itemPage.verifyAddToCartFromItemPage(items.backpack);
        });

        await test.step('Attempt to remove item to a cart', async () => {
            await itemPage.verifyRemoveFromCartItemPage(items.backpack);
        });

    });
});


