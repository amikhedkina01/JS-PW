// pages/CheckoutPage.js
import { expect } from '../utils/fixture.js';
import { BasePage } from './BasePage.js';

export class CheckoutPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;

        // Checkout step one (Your Information)
        // Use combined selectors (data-test, id, or common names) to be robust.
        this.firstName = page.locator('[data-test="firstName"], [data-test="first-name"], #first-name, input[name="firstName"]');
        this.lastName = page.locator('[data-test="lastName"], [data-test="last-name"], #last-name, input[name="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"], [data-test="postal-code"], #postal-code, input[name="postalCode"]');
        this.continueBtn = page.getByTestId('continue').or(page.getByRole('button', { name: 'Continue' }));
        this.cancelBtn = page.getByRole('button', { name: 'Cancel' }).or(page.getByTestId('cancel'));

        // Checkout step two (Overview)
        this.summaryContainer = page.getByTestId('checkout_summary_container');
        this.finishBtn = page.getByTestId('finish').or(page.getByRole('button', { name: 'Finish' }));
        this.backToProductsBtn = page.getByRole('button', { name: 'Back to products' });

        // Order complete
        this.completeHeader = page.getByText('THANK YOU FOR YOUR ORDER', { exact: false });
        this.orderCompleteContainer = page.getByTestId('checkout_complete_container');

        // Totals text (robust selectors)
        this.itemTotalText = page.locator('text=/Item total:/i');
        this.taxText = page.locator('text=/Tax:/i');
        this.totalText = page.locator('text=/Total:/i');

        // Generic item selectors on overview/cart
        this.summaryItem = (slugOrTitle) => page.getByText(slugOrTitle, { exact: false });
    }

    // --- helpers ---
    _parseCurrency(text) {
        if (!text) return 0;
        const m = text.replace(/\u00a0/g, ' ').match(/([\d,.]+)/);
        if (!m) return 0;
        // Normalize commas -> dots if needed, remove thousands separators
        const n = m[1].replace(/,/g, '');
        return Number.parseFloat(n);
    }

    // --- actions ---
    async fillInformation({ firstName, lastName, postalCode }) {
        if (firstName !== undefined) await this.firstName.fill(String(firstName));
        if (lastName !== undefined) await this.lastName.fill(String(lastName));
        if (postalCode !== undefined) await this.postalCode.fill(String(postalCode));
    }

    async continueToOverview() {
        await this.continueBtn.click();
        await expect(this.page).toHaveURL(/checkout-step-two\.html$/);
        await expect(this.summaryContainer).toBeVisible();
    }

    async finishOrder() {
        await this.finishBtn.click();
        await expect(this.page).toHaveURL(/checkout-complete\.html$/);
        await expect(this.orderCompleteContainer).toBeVisible();
        await expect(this.completeHeader).toBeVisible();
    }

    async cancelCheckout() {
        await this.cancelBtn.click();
    }

    // --- assertions / verifications ---
    async verifyOverviewHasItem(item) {
        // Accept item.title, slug, descContains or priceText
        if (item.title) {
            await expect(this.summaryItem(item.title)).toBeVisible();
        } else if (item.slug) {
            await expect(this.summaryItem(item.slug)).toBeVisible();
        } else if (item.descContains) {
            await expect(this.page.getByText(item.descContains, { exact: false })).toBeVisible();
        } else {
            throw new Error('verifyOverviewHasItem: pass item with title | slug | descContains');
        }
    }

    async getSummaryTotals() {
        const itemTotalText = (await this.itemTotalText.textContent()) || '';
        const taxText = (await this.taxText.textContent()) || '';
        const totalText = (await this.totalText.textContent()) || '';

        const itemTotal = this._parseCurrency(itemTotalText);
        const tax = this._parseCurrency(taxText);
        const total = this._parseCurrency(totalText);

        return { itemTotal, tax, total };
    }

    async verifyTotalsMatch(expectedItemTotal, tolerance = 0.01) {
        const totals = await this.getSummaryTotals();
        expect(Math.abs(totals.itemTotal - expectedItemTotal)).toBeLessThanOrEqual(tolerance);
        expect(Math.abs(totals.total - (totals.itemTotal + totals.tax))).toBeLessThanOrEqual(0.01);
    }

    async verifyOrderCompleteMessage() {
        await expect(this.completeHeader).toBeVisible();
        await expect(this.orderCompleteContainer).toBeVisible();
    }
}