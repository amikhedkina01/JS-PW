import { test, expect } from '@playwright/test';

test('Simple Test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const title = await page.title();
    expect(title).toBe('Swag Labs');
});
