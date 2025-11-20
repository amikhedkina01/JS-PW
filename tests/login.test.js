import { test, expect } from '../utils/fixture.js';
import { loadEnvData } from '../utils/env.js';
const { negativeCases, expectedErrors } = await loadEnvData();
import { tags as tagNames } from '../data/tags.js';

test.describe('Login Tests', () => {
    let loginPage;

    test.beforeEach(async ({ poManager }, testInfo) => {
        await poManager.basePage.goToBasePage();
        loginPage = poManager.loginPage;
        // Playwright annotations are picked up by reporters (Allure reporter will convert them to labels)
        const tags = testInfo.title.match(/@\w+/g) ?? [];
        for (const t of tags) {
            testInfo.annotations.push({ type: 'tag', description: t.slice(1) });
        }
    });

    test(`${tagNames.smoke} UI smoke: login form is correct`, async () => {

        await test.step('Key elements check', async () => {
            await loginPage.verifyLoginPageElements();
        });
    });

    // positive
    test(`${tagNames.smoke} Successful login`, async ({ envData }) => {
        const { username, password } = envData.auth;

        await test.step('login with standart user', async () => {
            await loginPage.login(username, password);
        });

        await test.step('Header validation', async () => {
            await loginPage.verifyHeaderAfterLogin();
        });
    });

    for (const tc of negativeCases) {
        test(`${tagNames.regression} Negative: ${tc.name}`, async () => {

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
                await loginPage.verifyHiddenBanner()
            });
        });
    }
})

