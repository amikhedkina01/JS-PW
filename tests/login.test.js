import { test, expect } from '../utils/fixture.js';
import * as allure from 'allure-playwright';
import { loadEnvData } from '../utils/env.js';
const { negativeCases, expectedErrors } = await loadEnvData();



test.describe('Login Tests', () => {
    let loginPage;

    test.beforeEach(async ({ poManager }, testInfo) => {
        await poManager.basePage.goToBasePage();
        loginPage = poManager.loginPage;
        // Парсимо @tags з назви тесту і додаємо в Allure
        const tags = testInfo.title.match(/@\w+/g) ?? [];
        tags.forEach(t => allure.tag(t.slice(1))); // -> smoke, regression, etc
    });

    test('UI smoke: login form is correct', { tag: ['@smoke', '@regression'] }, async () => {

        await test.step('Key elements check', async () => {
            await loginPage.verifyLoginPageElements();
        });
    });

    // positive
    test('Successful login', { tag: '@smoke' }, async ({ envData }) => {
        const { username, password } = envData.auth;

        await test.step('login with standart user', async () => {
            await loginPage.login(username, password);
        });

        await test.step('Header validation', async () => {
            await loginPage.verifyHeaderAfterLogin();
        });
    });

    for (const tc of negativeCases) {
        test(`Negative: ${tc.name}`, { tag: '@regression' }, async () => {

            await test.step('Attempt to login with invalid creds', async () => {
                await loginPage.login(tc.username, tc.password);
            });

            await test.step('Expected error Icons', async () => {
                await loginPage.verifyErrorIcons()
            });

            await test.step('Error message validation', async () => {
                await loginPage.assertErrorByKey(expectedErrors, tc.expectedErrorKey);
            });

            await test.step('Attempt to close error message banner', async () => {
                await loginPage.verifyErrorIcons()
                await loginPage.verifyHiddenBanner()
            });
        });
    }
})

