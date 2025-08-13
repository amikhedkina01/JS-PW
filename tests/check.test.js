import { test, expect } from '@playwright/test';
import { poManagerFixture } from '../utils/fixture';

test('Simple Test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const title = await page.title();
    expect(title).toBe('Swag Labs');
});

