// import { test, expect } from '../utils/fixture.js';

// test.describe('Login Tests', () => {

//     test.beforeEach(async ({ poManager }) => {
//         await poManager.basePage.goToBasePage();
//     });


//     test(' Successful login with valid credentials', async ({ poManager }) => {
//         const loginPage = poManager.loginPage; // added for more readable code 

//         // i would make for this a separate UI test
//         await expect(loginPage.titleText).toBeVisible();
//         await expect(loginPage.loginContainer).toBeVisible();
//         await expect(loginPage.credentialsContainer).toBeVisible();
//         await expect(loginPage.acceptedUsersHeading).toBeVisible();
//         await expect(loginPage.passwordHeading).toBeVisible();
//         await expect(loginPage.loginForm).toBeVisible();
//         await expect(loginPage.usernameField).toBeVisible();
//         await expect(loginPage.passwordField).toBeVisible();
//         await expect(loginPage.loginButton).toBeVisible();

//         await poManager.loginPage.login('standard_user', 'secret_sauce');
//         const pageTitle = await loginPage.getPageTitle();
//         await expect(pageTitle).toBe('Products');
//     });

//     test(' Login with invalid username', async ({ poManager }) => {
//         await poManager.loginPage.login('invalid_user', 'wrong_password');

//         await expect(poManager.loginPage.errorIconUsername).toBeVisible();
//         await expect(poManager.loginPage.errorIconPassword).toBeVisible();
//         const errorMessage = await poManager.loginPage.getErrorMessage();
//         await expect(errorMessage).toBe(poManager.loginPage.expectedErrors.invalidCredentials);
//         await expect(poManager.loginPage.errorCancelIcon).toBeVisible();
//         await poManager.loginPage.errorCancelIcon.click();
//         await expect(poManager.loginPage.errorMessage).toBeHidden();

//     });

//     test(' Login with empty fields', async ({ poManager }) => {
//         const loginPage = poManager.loginPage;
//         await loginPage.login('', '');
//         await expect(poManager.loginPage.errorIconUsername).toBeVisible();
//         await expect(poManager.loginPage.errorIconPassword).toBeVisible();
//         const errorMessage = await poManager.loginPage.getErrorMessage();
//         await expect(errorMessage).toBe(poManager.loginPage.expectedErrors.emptyUsername);
//         await poManager.loginPage.errorCancelIcon.click();
//         await expect(poManager.loginPage.errorMessage).toBeHidden();

//     });

//     test(' Login with empty Password', async ({ poManager }) => {
//         const loginPage = poManager.loginPage;
//         await loginPage.login('test', '');
//         await expect(poManager.loginPage.errorIconUsername).toBeVisible();
//         await expect(poManager.loginPage.errorIconPassword).toBeVisible();
//         const errorMessage = await poManager.loginPage.getErrorMessage();
//         await expect(errorMessage).toBe(poManager.loginPage.expectedErrors.emptyPassword);
//         await poManager.loginPage.errorCancelIcon.click();
//         await expect(poManager.loginPage.errorMessage).toBeHidden();

//     });
//     test(' Login with empty Username', async ({ poManager }) => {
//         const loginPage = poManager.loginPage;
//         await loginPage.login('', 'test');
//         await expect(poManager.loginPage.errorIconUsername).toBeVisible();
//         await expect(poManager.loginPage.errorIconPassword).toBeVisible();
//         const errorMessage = await poManager.loginPage.getErrorMessage();
//         await expect(errorMessage).toBe(poManager.loginPage.expectedErrors.emptyUsername);
//         await poManager.loginPage.errorCancelIcon.click();
//         await expect(poManager.loginPage.errorMessage).toBeHidden();

//     });
// });


import { test, expect } from '../utils/fixture.js';

test.describe.parallel('Login', () => {
    let loginPage;

    test.beforeEach(async ({ poManager }) => {
        await poManager.basePage.goToBasePage();
        loginPage = poManager.loginPage;
    });

    // SMOKE: перевірка UI окремо від функціоналу логіну
    test('UI smoke: login form is correct', async ({ }, testInfo) => {

        // Allure annotations
        testInfo.annotations.push({ type: 'epic', description: 'Login Feature' });
        testInfo.annotations.push({ type: 'feature', description: 'UI Validation' });
        testInfo.annotations.push({ type: 'severity', description: 'minor' });
        testInfo.annotations.push({ type: 'tag', description: '@smoke' });

        await test.step('Key elements check', async () => {
            await expect(loginPage.titleText).toBeVisible();
            await expect(loginPage.loginContainer).toBeVisible();
            await expect(loginPage.credentialsContainer).toBeVisible();
            await expect(loginPage.acceptedUsersHeading).toBeVisible();
            await expect(loginPage.passwordHeading).toBeVisible();
            await expect(loginPage.loginForm).toBeVisible();
            await expect(loginPage.usernameField).toBeVisible();
            await expect(loginPage.passwordField).toBeVisible();
            await expect(loginPage.loginButton).toBeVisible();
        });
    });

    // positive
    test('Successful login', async ({ page }, testInfo) => {

        testInfo.annotations.push({ type: 'epic', description: 'Login Feature' });
        testInfo.annotations.push({ type: 'feature', description: 'Positive Login' });
        testInfo.annotations.push({ type: 'severity', description: 'blocker' });
        testInfo.annotations.push({ type: 'tag', description: '@smoke' });

        await test.step('login with standart user', async () => {
            await loginPage.login('standard_user', 'secret_sauce');
        });

        await test.step('Header validation', async () => {
            await expect(page).toHaveURL(/inventory/i);
            if (loginPage.productsTitle) {
                await expect(loginPage.productsTitle).toHaveText(/Products/i);
            }
        });
    });

    // negative cases - there is 2 ver of improvement 
    // 1) adding it to the LoginPage.js - but it will contain test cases logic.
    // 2) add it to the separate file as test data - separate file should be managed too.
    const negativeCases = [
        {
            name: 'Invalid username and password',
            username: 'invalid_user',
            password: 'wrong_password',
            expectedErrorKey: 'invalidCredentials',
        },
        {
            name: 'Empty inputs',
            username: '',
            password: '',
            expectedErrorKey: 'emptyUsername',
        },
        {
            name: 'Empty Password',
            username: 'test',
            password: '',
            expectedErrorKey: 'emptyPassword',
        },
        {
            name: 'Empty username',
            username: '',
            password: 'test',
            expectedErrorKey: 'emptyUsername',
        },
    ];

    for (const tc of negativeCases) {
        test(`Negative: ${tc.name}`, async ({ }, testInfo) => {

            testInfo.annotations.push({ type: 'epic', description: 'Login Feature' });
            testInfo.annotations.push({ type: 'feature', description: 'Negative Login' });
            testInfo.annotations.push({ type: 'severity', description: 'critical' });
            testInfo.annotations.push({ type: 'tag', description: '@regression' });

            await test.step('Attempt to login with invalid creds', async () => {
                await loginPage.login(tc.username, tc.password);
            });

            await test.step('Expected error Icons', async () => {
                await expect(loginPage.errorIconUsername).toBeVisible();
                await expect(loginPage.errorIconPassword).toBeVisible();
            });

            await test.step('Error message validation', async () => {
                await assertLoginError(loginPage, tc.expectedErrorKey);
            });

            await test.step('Attempt to close error message banner', async () => {
                await expect(loginPage.errorCancelIcon).toBeVisible();
                await loginPage.errorCancelIcon.click();
                await expect(loginPage.errorMessage).toBeHidden();
            });
        });
    }
});

async function assertLoginError(loginPage, expectedErrorKey) {
    const msg = await loginPage.getErrorMessage();
    await expect(loginPage.errorMessage).toHaveText(loginPage.expectedErrors[expectedErrorKey]);

}

