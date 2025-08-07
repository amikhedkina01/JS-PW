import { BasePage } from './BasePage';
import { CONFIG } from '../utils/config';

export class ProductsPage extends BasePage {
    constructor(page) {
        super(page);
        this.pageTitle = page.locator(CONFIG.selectors.products.pageTitle);
        this.productList = page.locator(CONFIG.selectors.products.productList);
        this.menuButton = page.locator(CONFIG.selectors.products.menuButton);
    }

    async getPageTitle() {
        await this.waitForElement(CONFIG.selectors.products.pageTitle);
        return await this.pageTitle.textContent();
    }

    async getProductCount() {
        await this.waitForElement(CONFIG.selectors.products.productList);
        return await this.productList.count();
    }
}
