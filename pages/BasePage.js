export class BasePage {
    constructor(page) {
        this.page = page;
    }

    async waitForElement(selector) {
        await this.page.waitForSelector(selector, { state: 'visible' });
    }

    async goToBasePage() {
        await this.page.goto('https://www.saucedemo.com/');
    }
}
