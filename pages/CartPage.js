// CartPage.js
import { expect } from '../utils/fixture.js';
import { BasePage } from './BasePage.js';

export class CartPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;

        // Header / cart
        this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
        this.cartLink = page.getByTestId('shopping-cart-link');
        this.pageTitle = page.getByTestId('title');

        // Item detail (універсальні, без хардкоду)
        this.itemName = page.getByTestId('inventory-item-name');
        this.itemDesc = page.getByTestId('inventory-item-desc');
        this.itemPrice = page.getByTestId('inventory-item-price');
        this.itemAddToCart = page.getByTestId('add-to-cart');
        this.itemRemove = page.getByTestId('remove');
        this.backToProducts = page.getByRole('button', { name: 'Back to products' });
        this.continueShoppingBtn = page.getByTestId('continue-shopping');
        this.checkoutBtn = page.getByTestId('checkout');
    }

    // --- helpers ---
    normalizeItem(item) {
        if (typeof item === 'string') return { slug: item };
        if (item && (item.slug || item.id || item.title)) return item;
        throw new Error('CartPage: item is required (pass slug or an item object)');
    }

    // --- locator builders (list / detail) ---
    addToCartButton(slug) {
        return this.page.getByTestId(`add-to-cart-${slug}`);
    }
    removeButton(slug) {
        return this.page.getByTestId(`remove-${slug}`);
    }
    titleLinkById(id) {
        return this.page.getByTestId(`item-${id}-title-link`);
    }
    titleByText(text) {
        return this.page.getByText(text);
    }
    imageByTitle(title) {
        return this.page.getByAltText(title);
    }
    descBySnippet(snippet) {
        return this.page.getByText(snippet, { exact: false });
    }
    priceByText(priceText) {
        return this.page.getByText(priceText, { exact: false });
    }
    detailImageBySlug(slug) {
        return this.page.getByTestId(`item-${slug}-img`);
    }

    // --- actions / assertions ---
    async verifyAddItemToCart(itemOrSlug) {
        const it = this.normalizeItem(itemOrSlug);
        await this.addToCartButton(it.slug).click();
        this._lastItemSlug = it.slug;

        const count = await this.getCartItemCount();
        expect(count).toBeGreaterThan(0);
    }

    async getCartItemCount() {
        const countBadges = await this.shoppingCartBadge.count();
        if (countBadges === 0) return 0;
        const text = (await this.shoppingCartBadge.textContent())?.trim();
        const n = Number.parseInt(text, 10);
        return Number.isNaN(n) ? 0 : n;
    }

    async verifyCartIconWorks() {
        await this.cartLink.click();
        await expect(this.page).toHaveURL(/cart\.html$/);
        await expect(this.pageTitle).toHaveText('Your Cart');
    }

    async verifyItemAddedToCart(item) {
        const it = this.normalizeItem(item);
        await expect(this.page).toHaveURL(/cart\.html$/);

        if (it.title) {
            await expect(this.titleByText(it.title)).toBeVisible();
            return;
        }
        if (it.id) {
            await expect(this.titleLinkById(it.id)).toBeVisible();
            return;
        }
        if (it.slug) {
            await expect(this.removeButton(it.slug)).toBeVisible(); // виправлено назву
            return;
        }

        throw new Error('verifyItemAddedToCart: provide title | id | slug');
    }

    async verifyAddedItems(item) {
        const it = this.normalizeItem(item);
        await expect(this.page).toHaveURL(/cart\.html$/);

        // Перевіряємо тільки те, що передано — без зайвих залежностей
        if (it.id) await expect(this.titleLinkById(it.id)).toBeVisible();
        if (it.descContains) await expect(this.descBySnippet(it.descContains)).toBeVisible();
        if (it.priceText) await expect(this.priceByText(it.priceText)).toBeVisible();
        if (it.slug) await expect(this.removeButton(it.slug)).toBeVisible();
        if (it.title) await expect(this.titleByText(it.title)).toBeVisible();
    }

    async verifyRemoveItemFromCart(itemOrSlug) {
        const it = itemOrSlug ? this.normalizeItem(itemOrSlug)
            : { slug: this._lastItemSlug };

        if (!it.slug) {
            throw new Error('verifyRemoveItemFromCart: item is required (pass slug or add first via verifyAddItemToCart)');
        }

        await expect(this.removeButton(it.slug)).toBeVisible();
        await this.removeButton(it.slug).click();
        await expect(this.continueShoppingBtn).toBeVisible();
        await expect(this.checkoutBtn).toBeVisible();
    }

}
