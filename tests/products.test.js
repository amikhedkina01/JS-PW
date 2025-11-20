import { test, expect } from '../utils/fixture.js';
// import * as allure from 'allure-playwright';
import { tags as tagNames } from '../data/tags.js';


test.describe('Product Page Tests', () => {
    let productsPage
    let auth;


    test.beforeEach(async ({ poManager, envData }, testInfo) => {
        ({ auth } = envData);

        await poManager.basePage.goToBasePage();
        await poManager.loginPage.login(auth.username, auth.password);
        productsPage = poManager.productsPage
        // Playwright annotations are picked up by reporters (Allure reporter will convert them to labels)
        const tags = testInfo.title.match(/@\w+/g) ?? [];
        for (const t of tags) {
            testInfo.annotations.push({ type: 'tag', description: t.slice(1) });
        }

    });

    test(`${tagNames.smoke} UI: check page elements on Products page`, async () => {

        await test.step('Title & header controls are visible', async () => {
            await productsPage.headerCheck();
        });

        await test.step('Inventory container & items', async () => {
            await productsPage.inventoryContainerCheck()
        });

        await test.step('Names & prices presence and format', async () => {
            await productsPage.productPricesCheck()
        });
    });

    test(`${tagNames.smoke} Filter products by price`, async () => {

        await test.step('Filtering. Low to High', async () => {
            await productsPage.verifyLowToHighFilter()
        })

        await test.step('Filtering. High to Low', async () => {
            await productsPage.verifyHighToLowFilter();
        })

    });


});
