import { test, expect } from '../utils/fixture.js';

test.describe('Login Tests', () => {

    test.beforeEach(async ({ poManager }) => {
        await poManager.basePage.goToBasePage();
    });

    test('@smoke Successful login with valid credentials', async ({ poManager }) => {
        await poManager.loginPage.login('standard_user', 'secret_sauce');

        const pageTitle = await poManager.basePage.page.locator('.title').textContent();
        expect(pageTitle).toBe('Products');
    });

    test('@regression Login with invalid username', async ({ poManager }) => {
        await poManager.loginPage.login('invalid_user', 'wrong_password');

        const errorMessage = await poManager.loginPage.getErrorMessage();
        expect(errorMessage).toBe('Epic sadface: Username and password do not match any user in this service');
    });

    test('@regression Login with empty fields', async ({ poManager }) => {
        await poManager.loginPage.login('', '');

        const errorMessage = await poManager.loginPage.getErrorMessage();
        expect(errorMessage).toBe('Epic sadface: Username is required');
    });
});
