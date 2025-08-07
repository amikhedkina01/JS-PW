import { LoginPage } from './LoginPage';
import { ProductsPage } from './ProductsPage';
// import { ItemPage } from './ItemPage';

exports.POManager = class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.productsPage = new ProductsPage(this.page);
        // this.itemPage = new ItemPage(this.page)
    }

}

