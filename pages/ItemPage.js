// import { BasePage } from './BasePage';
// import { CONFIG } from '../config';

// export class ItemPage extends BasePage {
//     constructor(page) {
//         super(page);
//         this.addToCartButton = page.locator(CONFIG.selectors.item.addToCartButton);
//         this.cartBadge = page.locator(CONFIG.selectors.item.cartBadge);
//     }

//     async addToCart() {
//         await this.waitForElement(CONFIG.selectors.item.addToCartButton);
//         await this.addToCartButton.click();
//     }

//     async getCartBadgeCount() {
//         await this.waitForElement(CONFIG.selectors.item.cartBadge);
//         return await this.cartBadge.textContent();
//     }
// }
