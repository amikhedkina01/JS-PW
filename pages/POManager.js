import { LoginPage } from './LoginPage.js';
import { ProductsPage } from './ProductsPage.js';
import { ItemPage } from './ItemPage.js';
import { BasePage } from './BasePage.js';
import { CartPage } from './CartPage.js';

export const POManager = class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.productsPage = new ProductsPage(this.page);
        this.itemPage = new ItemPage(this.page);
        this.basePage = new BasePage(this.page);
        this.cartPage = new CartPage(this.page);
    }


}


