import { test, expect } from '../utils/fixture.js';
import * as allure from 'allure-playwright';
import { tags } from '../data/tags.js';


test.describe('Product Page Tests', () => {
    let productsPage
    let auth;


    test.beforeEach(async ({ poManager, envData }, testInfo) => {
        ({ auth } = envData);

        await poManager.basePage.goToBasePage();
        await poManager.loginPage.login(auth.username, auth.password);
        productsPage = poManager.productsPage

        // Парсимо @tags з назви тесту і додаємо в Allure
        const tags = testInfo.title.match(/@\w+/g) ?? [];
        tags.forEach(t => allure.tag(t.slice(1))); // -> smoke, regression, etc

    });

    test('UI: check page elements on Products page', { tags: [tags.smoke] }, async () => {

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

    test('Filter products by price', { tags: [tags.smoke] }, async () => {

        await test.step('Filtering. Low to High', async () => {
            await productsPage.verifyLowToHighFilter()
        })

        await test.step('Filtering. High to Low', async () => {
            await productsPage.verifyHighToLowFilter();
        })

    });


});
