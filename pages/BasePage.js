export class BasePage {
    constructor(page) {
        this.page = page;
    }

    async waitForElement(selector) {
        await this.page.waitForSelector(selector, { state: 'visible' });
    }
}
export class BasePage {
    constructor(page) {
        this.page = page;
    }

    // Common method to wait for an element
    async waitForElement(selector) {
        await this.page.waitForSelector(selector, { state: 'visible' });
    }

    // Additional common methods can be added here (e.g., logging, screenshots)

}
