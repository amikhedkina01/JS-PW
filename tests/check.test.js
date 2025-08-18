// import { test, expect } from '@playwright/test';
import { test } from '../utils/fixture.js';


test('Simple Test @check', async ({ poManager }) => {
    // const po = new POManager(page)
    await poManager.basePage.goToBasePage();
});

