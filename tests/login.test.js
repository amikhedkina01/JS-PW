import { test, expect } from '@playwright/test';
import { CONFIG } from '../utils/config.js';


test.describe('Login Tests', () => {
    test.beforeEach(async ({ page }) => {

        await page.goto(CONFIG.baseURL);
    });

    test('Successful login with valid credentials', async ({ page }) => {

        const usernameField = await page.locator(CONFIG.selectors.loginPage.usernameField);
        const passwordField = await page.locator(CONFIG.selectors.loginPage.passwordField);
        const loginButton = await page.locator(CONFIG.selectors.loginPage.loginButton);

        await usernameField.fill(CONFIG.credentials.valid.username);
        await passwordField.fill(CONFIG.credentials.valid.password);
        await loginButton.click();


        const pageTitle = await page.locator('.title').textContent();
        expect(pageTitle).toBe('Products');
    });

    test('Login with invalid username', async ({ page }) => {

        const usernameField = await page.locator('#user-name');
        const passwordField = await page.locator('#password');
        const loginButton = await page.locator('#login-button');

        await usernameField.fill('invalid_user');
        await passwordField.fill('wrong_password');
        await loginButton.click();


        const errorMessage = await page.locator('[data-test="error"]').textContent();
        expect(errorMessage).toBe('Epic sadface: Username and password do not match any user in this service');
    });

    test('Login with empty fields', async ({ page }) => {
        const usernameField = page.locator('#user-name');
        const passwordField = page.locator('#password');
        const loginButton = page.locator('#login-button');

        await usernameField.fill('');
        await passwordField.fill('');
        await loginButton.click();

        const errorMessage = await page.locator('[data-test="error"]').textContent();
        expect(errorMessage).toBe('Epic sadface: Username is required');
    });
});







// // непрацюючий PO MANAGER AND FIXTURES
// import { test, expect } from '@playwright/test';
// import { poManagerFixture } from '../utils/fixture.js';  // Імпортуємо фікстуру

// // Використовуємо test.extend() для додавання фікстури
// const extendedTest = test.extend({
//     poManager: poManagerFixture  // Включаємо фікстуру poManager для доступу в тестах
// });

// extendedTest.describe('Login Tests', () => {

//     // Мінімальний тест для перевірки ініціалізації poManager
//     extendedTest('Check POManager initialization', async ({ poManager }) => {
//         console.log('POManager initialized:');  // Лог для перевірки ініціалізації
//         expect(poManager).toBeDefined();  // Перевірка, чи poManager ініціалізується
//     });

//     // Перевірка переходу на сторінку
//     // extendedTest('Check page navigation', async ({ page }) => {
//     //     console.log('Navigating to page...');
//     //     try {
//     //         console.log('About to go to the page');
//     //         await page.goto('https://www.saucedemo.com/', { timeout: 60000 });
//     //         console.log('Page navigated successfully!');
//     //     } catch (error) {
//     //         console.error('Error during page navigation:', error);  // Лог для перевірки помилок
//     //         throw error;  // Пропускаємо помилку для подальшої перевірки
//     //     }
//     // });

//     // Додатковий тест для перевірки POManager ініціалізації в тесті
//     extendedTest('Initialize POManager and check its methods', async ({ poManager }) => {
//         console.log('Initializing POManager in test...');
//         try {
//             // console.log('POManager object:', poManager);  // Лог для перевірки обʼєкта poManager

//             // Перевірка, чи методи poManager доступні
//             const loginPage = poManager.getLoginPage();
//             const productsPage = poManager.getProductsPage();
//             console.log('loginPage:', loginPage);  // Лог для перевірки
//             console.log('productsPage:', productsPage);  // Лог для перевірки

//             expect(loginPage).toBeDefined();
//             expect(productsPage).toBeDefined();
//         } catch (error) {
//             console.error('Error during POManager method call:', error);  // Лог для перевірки помилок
//             throw error;
//         }
//     });

// });
