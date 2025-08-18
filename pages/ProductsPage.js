import { BasePage } from './BasePage.js';

export class ProductsPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.pageTitle = page.getByText('Products'); // заголовок
        this.productList = page.locator('.inventory_list'); // список товарів
        this.productNames = page.locator('.inventory_item_name');
        this.productPrices = page.locator('.inventory_item_price');
        this.menuButton = page.locator('#react-burger-menu-btn'); // кнопка меню
        this.menuItems = page.locator('.bm-item-list a'); // пункти меню
        this.priceFilter = page.locator('.product_sort_container'); // селектор сортування
    }

    async getProductNames() {
        return await this.productNames.allTextContents();
    }

    async getProductPrices() {
        return await this.productPrices.allTextContents();
    }

    async sortProductsLowToHigh() {
        await this.priceFilter.selectOption({ label: 'Price (low to high)' });
    }

    async sortProductsHighToLow() {
        await this.priceFilter.selectOption({ label: 'Price (high to low)' });
    }

    async openMenu() {
        await this.menuButton.click();
    }

    async getMenuItems() {
        return await this.menuItems.allTextContents();
    }
}
