export class ItemPage {
    constructor(page) {
        this.page = page;
        this.addToCartButton = (itemName) => page.locator(`[data-test="add-to-cart-${itemName}"]`);
        this.removeButton = (itemName) => page.locator(`[data-test="remove-${itemName}"]`);
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.cartLink = page.locator('.shopping_cart_link');
    }

    async addItemToCart(itemName) {
        await this.addToCartButton(itemName).click();
    }

    async removeItemFromCart(itemName) {
        await this.removeButton(itemName).click();
    }

    async getCartItemCount() {
        const count = await this.shoppingCartBadge.count();
        if (count === 0) return 0;
        return parseInt(await this.shoppingCartBadge.textContent());
    }

    async goToCart() {
        await this.cartLink.click();
    }
}
