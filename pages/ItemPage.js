
import { expect } from '../utils/fixture.js';
import { BasePage } from './BasePage.js';

export class ItemPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;

        // Cart / common
        this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
        this.cartLink = page.getByTestId('shopping-cart-link');
        this.pageTitle = page.getByTestId('title');

        // Item detail (універсальні, без хардкоду)
        this.pageItemtitle = page.getByTestId('inventory-item-name');
        this.pageItemDecr = page.getByTestId('inventory-item-desc');
        this.pageItemPrice = page.getByTestId('inventory-item-price');
        this.pageItemAddToCart = page.getByTestId('add-to-cart');
        this.pageItemRemove = page.getByTestId('remove');
        this.itemPageBackToProducts = page.getByRole('button', { name: 'Back to products' });
    }
    _lastItemSlug = null;


    // ---- допоміжні: дефолти + нормалізація параметра товару ----
    // getDefaultItem() {
    //     // дефолт з вашого .dev.js (backward-compat, якщо метод викликали без аргументів)
    //     return {
    //         slug: 'sauce-labs-backpack',
    //         id: 4,
    //         title: 'Sauce Labs Backpack',
    //         descContains: 'carry.allTheThings() with the',
    //         priceText: '$29.99',
    //     };
    // }

    normalizeItem(item) {
        if (typeof item === 'string') return { slug: item };      // дозволяємо передати тільки slug
        if (item && (item.slug || item.id)) return item;          // дозволяємо об'єкт з .dev.js
        throw new Error('ItemPage: item is required (pass slug or the item object from envData.items.*)');
    }


    // ---- builder-и локаторів під конкретний товар ----
    addToCartButton(slug) {
        return this.page.getByTestId(`add-to-cart-${slug}`);
    }
    removeButton(slug) {
        return this.page.getByTestId(`remove-${slug}`);
    }
    listItemTitleById(id) {
        return this.page.getByTestId(`item-${id}-title-link`);
    }
    listItemImageByTitle(title) {
        return this.page.getByAltText(title);
    }
    listItemDescBySnippet(snippet) {
        return this.page.getByText(snippet, { exact: false });
    }
    listItemPriceByText(priceText) {
        return this.page.getByText(priceText, { exact: false });
    }
    itemDetailImageBySlug(slug) {
        return this.page.getByTestId(`item-${slug}-img`);
    }

    async verifyItemElements(item) {
        const it = this.normalizeItem(item);
        if (it.id == null || !it.title || !it.descContains || !it.priceText || !it.slug) {
            throw new Error('verifyItemElements: expected item with {id,title,descContains,priceText,slug}');
        }
        await expect(this.listItemTitleById(it.id)).toBeVisible();
        await expect(this.listItemImageByTitle(it.title)).toBeVisible();
        await expect(this.listItemDescBySnippet(it.descContains)).toBeVisible();
        await expect(this.listItemPriceByText(it.priceText)).toBeVisible();
        await expect(this.addToCartButton(it.slug)).toBeVisible();
    }

    async verifyAddItemToCart(itemOrSlug) {
        const it = this.normalizeItem(itemOrSlug);
        await this.addToCartButton(it.slug).click();
        this._lastItemSlug = it.slug;            // ← запам'ятали
        const cartCount = await this.getCartItemCount();
        expect(cartCount).toBe(1);
    }

    async verifyRemoveItemFromCart(itemOrSlug) {
        const it = itemOrSlug ? this.normalizeItem(itemOrSlug)
            : { slug: this._lastItemSlug };

        if (!it.slug) {
            throw new Error('verifyRemoveItemFromCart: item is required (pass slug or add first via verifyAddItemToCart)');
        }

        await expect(this.removeButton(it.slug)).toBeVisible();
        await this.removeButton(it.slug).click();
        await expect(this.addToCartButton(it.slug)).toBeVisible();
        const cartCount = await this.getCartItemCount();
        expect(cartCount).toBe(0);
    }


    async verifyItemPageOpened(item) {
        const it = this.normalizeItem(item);
        if (it.id == null) throw new Error('verifyItemPageOpened: item.id is required');
        await this.listItemTitleById(it.id).click();
        await expect(this.page).toHaveURL(/inventory-item\.html\?id=\d+$/);
    }

    async verifyItemElementsPage(item) {
        const it = this.normalizeItem(item);
        await expect(this.pageItemtitle).toBeVisible();
        await expect(this.pageItemDecr).toBeVisible();
        await expect(this.pageItemPrice).toBeVisible();
        await expect(this.pageItemAddToCart).toBeVisible();
        await expect(this.itemPageBackToProducts).toBeVisible();
        if (!it.slug) throw new Error('verifyItemElementsPage: item.slug is required');
        await expect(this.itemDetailImageBySlug(it.slug)).toBeVisible();
    }

    async verifyAddToCartFromItemPage(item) {
        const it = this.normalizeItem(item);
        if (it.id == null) throw new Error('verifyAddToCartFromItemPage: item.id is required');
        await this.page.goto(`/inventory-item.html?id=${it.id}`);
        await this.pageItemAddToCart.click();
        const cartCount = await this.getCartItemCount();
        expect(cartCount).toBe(1);
    }

    async verifyCartIconWork() {
        await this.cartLink.click();
        await expect(this.pageTitle).toHaveText('Your Cart');
    }

    async getCartItemCount() {
        const countBadges = await this.shoppingCartBadge.count();
        if (countBadges === 0) return 0;
        const text = await this.shoppingCartBadge.textContent();
        return parseInt(text, 10);
    }

    async verifyRemoveFromCartItemPage() {
        await this.pageItemRemove.click();
        await expect(this.pageItemAddToCart).toBeVisible();
        const cartCount = await this.getCartItemCount();
        expect(cartCount).toBe(0); // якщо перед цим додавали рівно 1 товар
    }

    async verifyItemPageOpened(item) {
        const it = this.normalizeItem(item);

        // потрібен або testId заголовка, або id (для фолбеку)
        if (!it.itemLink && it.id == null) {
            throw new Error('verifyItemPageOpened: provide item.itemLink or item.id');
        }

        if (it.itemLink) {
            await this.page.getByTestId(it.itemLink).click();
        } else {
            // фолбек, якщо itemLink відсутній у даних
            await this.page.goto(`/inventory-item.html?id=${it.id}`);
        }

        await expect(this.page).toHaveURL(/inventory-item\.html\?id=\d+$/);

        if (!it.slug) throw new Error('verifyItemPageOpened: item.slug is required');
        await expect(this.itemDetailImageBySlug(it.slug)).toBeVisible();
    }
}