import { expect } from '../utils/fixture.js';
import { BasePage } from './BasePage.js';

export class ProductsPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.pageTitle = page.getByText('Products');
        this.productList = page.getByTestId('inventory-list');
        this.productNames = page.getByTestId('inventory-item-name');
        this.productPrices = page.getByTestId('inventory-item-price');
        this.priceFilter = page.getByTestId('product-sort-container');

        this.container = page.getByTestId('inventory-container').first();
        this.secondc
        this.items = page.getByTestId('inventory-item');

        this.menuButton = page.getByTestId('open-menu')
        // this.menuItems = page.getByTestId('inventory-sidebar-link');


    }

    async headerCheck() {
        await expect(this.pageTitle).toBeVisible();
        await expect(this.menuButton).toBeVisible();
    }

    async inventoryContainerCheck() {
        await expect(this.container).toBeVisible();
        await expect(this.items).toHaveCount(6);
        await expect(this.items.first()).toBeVisible();
    };

    async productPricesCheck() {
        let names = [];
        let pricesRaw = [];
        names = await this.productNames.allTextContents();
        pricesRaw = await this.productPrices.allTextContents();

        await expect(names.length).toBe(6);
        await expect(pricesRaw.length).toBe(6);
        await expect(names.every(n => n && n.trim().length > 0)).toBe(true);
        const priceFmt = /^\$\d+(\.\d{2})$/;
        await expect(pricesRaw.every(p => priceFmt.test(p))).toBe(true);
        const prices = pricesRaw.map(p => Number(p.replace('$', '')));
        await expect(prices.every(v => Number.isFinite(v) && v > 0)).toBe(true);
    }

    async verifyLowToHighFilter() {
        await this.priceFilter.selectOption({ label: 'Price (low to high)' });
        const prices = (await this.productPrices.allTextContents())
            .map(text => parseFloat(text.replace('$', '')));
        const sorted = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sorted);

        //detailed check all elements
        for (let i = 0; i < prices.length - 1; i++) {
            const current = prices[i];
            const next = prices[i + 1];
            expect(current).toBeLessThanOrEqual(next);
        }
    }


    async verifyHighToLowFilter() {
        await this.priceFilter.selectOption({ label: 'Price (high to low)' });
        const prices = (await this.productPrices.allTextContents())
            .map(text => parseFloat(text.replace('$', '')));
        const sorted = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sorted);

        //detailed check all elements
        for (let i = 0; i < prices.length - 1; i++) {
            const current = prices[i];
            const next = prices[i + 1];
            expect(current).toBeGreaterThanOrEqual(next);
        }
    }

    async openMenu() {
        await this.menuButton.click();
    }

    async getMenuItems() {
        return await this.menuItems.allTextContents();
    }
}
