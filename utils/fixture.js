import { test as base, expect as baseExpect } from '@playwright/test';   //revrited fixture, added expect so it will be possible to use in tests expctations 
import { POManager } from '../pages/POManager';


export const test = base.extend({

    // page: async ({ page }, use) => {
    //     const po = new POManager(page);
    //     await use(page);
    // }

    poManager: async ({ page }, use) => {
        await use(new POManager(page));
    }
})
export { baseExpect as expect };
