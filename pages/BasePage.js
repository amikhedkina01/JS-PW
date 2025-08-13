export class BasePage {
    constructor(page) {
        this.page = page;
    }

    async waitForElement(selector) {
        await this.page.waitForSelector(selector, { state: 'visible' });
    }
}
