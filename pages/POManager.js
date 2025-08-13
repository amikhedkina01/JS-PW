// // pages/POManager.js
// import { LoginPage } from './LoginPage.js';
// import { ProductsPage } from './ProductsPage.js';
// import { ItemPage } from './ItemPage.js';

// export class POManager {
//     constructor(page) {
//         this.page = page;
//         this.loginPage = new LoginPage(page);  // Ініціалізація сторінки логіну
//         this.productsPage = new ProductsPage(page);  // Ініціалізація сторінки продуктів
//         this.itemPage = new ItemPage(page);  // Ініціалізація сторінки товару
//     }

//     getLoginPage() {
//         return this.loginPage;
//     }

//     getProductsPage() {
//         return this.productsPage;
//     }

//     getItemPage() {
//         return this.itemPage;
//     }
// }


// перевірки
import { LoginPage } from './LoginPage.js';
import { ProductsPage } from './ProductsPage.js';

export class POManager {
    constructor(page) {
        console.log("Initializing POManager...");
        if (!page) {
            throw new Error('Page is not defined');
        }

        this.page = page;
        this.loginPage = new LoginPage(page);  // Ініціалізація сторінки логіну
        this.productsPage = new ProductsPage(page);  // Ініціалізація сторінки продуктів

        console.log("POManager initialized successfully:");
    }

    getLoginPage() {
        if (this.loginPage) {
            console.log("Returning LoginPage...");
            return this.loginPage;
        }
        throw new Error('LoginPage is not initialized');
    }

    getProductsPage() {
        if (this.productsPage) {
            console.log("Returning ProductsPage...");
            return this.productsPage;
        }
        throw new Error('ProductsPage is not initialized');
    }
}
