import { BasePage } from './BasePage';
import { CONFIG } from '../utils/config';

export class LoginPage extends BasePage {
    constructor(page) {
        super(page);  // Inherit methods from BasePage
        this.usernameField = page.locator(CONFIG.selectors.login.username);
        this.passwordField = page.locator(CONFIG.selectors.login.password);
        this.loginButton = page.locator(CONFIG.selectors.login.loginButton);
        this.errorMessage = page.locator(CONFIG.selectors.login.errorMessage);
    }

    async login(username, password) {
        await this.waitForElement(CONFIG.selectors.login.username); // Inherited method from BasePage
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }
}
