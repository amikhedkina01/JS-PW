import { expect } from '../utils/fixture.js';
import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;

        // locators
        this.usernameField = page.getByPlaceholder('Username');
        this.passwordField = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.getByTestId('error');

        //additional locators
        this.titleText = page.getByText('Swag Labs');
        this.loginContainer = page.getByTestId('login-container').filter({ hasText: 'Login' }).first();
        this.credentialsContainer = page.getByTestId('login-credentials-container').first();
        this.acceptedUsersHeading = page.getByRole('heading', { name: 'Accepted usernames are:' });
        this.passwordHeading = page.getByRole('heading', { name: 'Password for all users:' });

        //title check
        this.productsTitle = page.getByTestId('title');

        // error icons check
        this.errorIconUsername = page.locator('svg').first(); //get by role = img
        this.errorIconPassword = page.locator('svg').nth(1); // хPath по ієрархіі. показати шлях
        this.errorCancelIcon = page.getByTestId('error-button');

    }


    async login(username, password) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }

    async verifyLoginPageElements() {
        await expect(this.titleText).toBeVisible();
        await expect(this.loginContainer).toBeVisible();
        await expect(this.credentialsContainer).toBeVisible();
        await expect(this.acceptedUsersHeading).toBeVisible();
        await expect(this.passwordHeading).toBeVisible();
        await expect(this.usernameField).toBeVisible();
        await expect(this.passwordField).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }
    async verifyHeaderAfterLogin() {
        await expect(this.page).toHaveURL(/inventory/i);
        if (this.productsTitle) {
            await expect(this.productsTitle).toHaveText(/Products/i);
        }
    }

    async verifyErrorIcons() {
        await expect(this.errorIconUsername).toBeVisible();
        await expect(this.errorIconPassword).toBeVisible();
        await expect(this.errorCancelIcon).toBeVisible();
    }

    async verifyHiddenBanner() {
        await this.errorCancelIcon.click();
        await expect(this.errorMessage).toBeHidden();
    }

    async assertErrorByKey(expectedErrors, expectedErrorKey) {
        const expected = expectedErrors?.[expectedErrorKey];
        if (!expected) {
            throw new Error(`No expected error message for key "${expectedErrorKey}". Check your data file.`);
        }
        await expect(this.errorMessage).toHaveText(expected);
    }
}

