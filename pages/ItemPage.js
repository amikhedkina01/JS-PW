// pages/ItemPage.js
import { BasePage } from './BasePage.js';
import { CONFIG } from '../utils/config.js';

export class ItemPage extends BasePage {
    constructor(page) {
        super(page);
        this.productName = page.locator(CONFIG.selectors.item.productName);  // Використовуємо селектор з config.js
        this.productDescription = page.locator(CONFIG.selectors.item.productDescription);  // Використовуємо селектор з config.js
    }

    async getProductName() {
        return await this.productName.textContent();
    }

    async getProductDescription() {
        return await this.productDescription.textContent();
    }
}
