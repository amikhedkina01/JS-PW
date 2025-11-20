// tests/checkout.test.js
import { test, expect } from '../utils/fixture.js';
import { tags as tagNames } from '../data/tags.js';

/*
  Checkout Tests
  - Happy path: add item -> checkout -> fill info -> verify overview -> finish
  - Validation: missing required fields (postal code)
*/

test.describe('Checkout Tests', () => {
    let cartPage;
    let checkoutPage;
    let auth, items;

    test.beforeEach(async ({ poManager, envData }) => {
        ({ auth, items } = envData);

        await poManager.basePage.goToBasePage();
        await poManager.loginPage.login(auth.username, auth.password);

        cartPage = poManager.cartPage;
        checkoutPage = poManager.checkoutPage;
    });

    test(`${tagNames.smoke} Happy path — single item checkout`, async () => {
        // 1. Add a known item to cart (Sauce Labs Backpack)
        await test.step('Add one item (backpack) to cart', async () => {
            await cartPage.verifyAddItemToCart(items.backpack);
        });

        // 2. Open cart
        await test.step('Open cart', async () => {
            await cartPage.verifyCartIconWorks();
        });

        // 3. Click Checkout to go to "Your Information"
        await test.step('Click Checkout', async () => {
            await cartPage.checkoutBtn.click();
            await expect(checkoutPage.page).toHaveURL(/checkout-step-one\.html$/);
        });

        // 4. Fill checkout information
        await test.step('Fill checkout information and continue', async () => {
            await checkoutPage.fillInformation({ firstName: 'John', lastName: 'Doe', postalCode: '12345' });
            await checkoutPage.continueToOverview();
        });

        // 5. Verify overview item(s) and totals
        await test.step('Verify overview shows added item and valid totals', async () => {
            await checkoutPage.verifyOverviewHasItem(items.backpack);
            // derive expected item total from fixture priceText
            const priceText = items.backpack.priceText || '$0.00';
            const expectedItemTotal = Number.parseFloat(priceText.replace(/[^0-9.]/g, ''));
            await checkoutPage.verifyTotalsMatch(expectedItemTotal);
        });

        // 6. Finish order and verify completion
        await test.step('Finish checkout and verify order complete', async () => {
            await checkoutPage.finishOrder();
            await checkoutPage.verifyOrderCompleteMessage();
        });
    });

    test(`${tagNames.regression} Validation — missing postal code prevents continue`, async () => {
        // 1. Add item and open cart
        await test.step('Add an item and open cart', async () => {
            await cartPage.verifyAddItemToCart(items.bikeLight);
            await cartPage.verifyCartIconWorks();
        });

        // 2. Click Checkout
        await test.step('Navigate to checkout (Your Information)', async () => {
            await cartPage.checkoutBtn.click();
            await expect(checkoutPage.page).toHaveURL(/checkout-step-one\.html$/);
        });

        // 3. Fill first and last name only (postal code empty) and attempt to continue
        await test.step('Fill name only and try to continue', async () => {
            await checkoutPage.fillInformation({ firstName: 'Jane', lastName: 'Smith', postalCode: '' });
            await checkoutPage.continueBtn.click();
            // Expect to remain on same page or show validation
            await expect(checkoutPage.page).toHaveURL(/checkout-step-one\.html$/);
            // If app shows a visible error banner, assert common messages (soft check)
            const err = checkoutPage.page.getByText(/postal.*required|Postal Code.*required|is required/i);
            if (await err.count() > 0) {
                await expect(err.first()).toBeVisible();
            }
        });
    });
});