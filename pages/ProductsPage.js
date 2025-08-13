// pages/ProductsPage.js
import { BasePage } from './BasePage.js';  // Імпортуємо базову сторінку

export class ProductsPage extends BasePage {  // Експортуємо клас ProductsPage
    constructor(page) {
        super(page);  // Ініціалізуємо базовий клас
        this.pageTitle = page.locator('.title');  // Локатор для заголовка
        this.productList = page.locator('.inventory_list');  // Локатор для списку продуктів
        this.addToCartButtons = page.locator('.btn_inventory');  // Локатор для кнопок додавання в кошик
    }

    async getPageTitle() {
        await this.waitForElement('.title');  // Чекаємо, поки заголовок стане видимим
        return await this.pageTitle.textContent();  // Повертаємо текст заголовка
    }

    async addProductToCart(index) {
        const button = this.addToCartButtons.nth(index);  // Отримуємо кнопку для конкретного продукту
        await button.click();  // Клікаємо на кнопку
    }
}
