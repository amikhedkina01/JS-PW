import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;

        // locators
        this.usernameField = page.getByPlaceholder('Username');
        this.passwordField = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.getByText('Epic sadface');

        //additional locators
        this.titleText = page.getByText('Swag Labs');
        this.loginContainer = page.locator('[data-test="login-container"] div').filter({ hasText: 'Login' }).first();
        this.credentialsContainer = page.locator('[data-test="login-credentials-container"] div').first();
        this.acceptedUsersHeading = page.getByRole('heading', { name: 'Accepted usernames are:' });
        this.passwordHeading = page.getByRole('heading', { name: 'Password for all users:' });
        this.loginForm = page.locator('form');

        //title check
        this.productsTitle = page.locator('.title');

        // error icons check
        this.errorIconUsername = page.locator('svg').first();
        this.errorIconPassword = page.locator('svg').nth(1);
        this.errorCancelIcon = page.locator('[data-test="error-button"]');

    }


    async login(username, password) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }

    expectedErrors = {
        invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
        emptyUsername: 'Epic sadface: Username is required',
        emptyPassword: 'Epic sadface: Password is required'
    }


}

