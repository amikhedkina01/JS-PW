import { LoginPage } from './LoginPage';
import { ProductsPage } from './ProductsPage';
// import { ItemPage } from './ItemPage';

export class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.productsPage = new ProductsPage(page);
        // this.itemPage = new ItemPage(page)
    }

    getLoginPage() {
        return this.loginPage;
    }

    getProductsPage() {
        return this.productsPage;
    }

    // getItemPage() {
    //     return this.itemPage
    // }
}
