import { test as base, expect } from '@playwright/test';
import { POManager } from '../pages/POManager.js';
import { envConfig, negativeCases, expectedErrors } from './env.js';

export const test = base.extend({
    // page: async ({ page }, use) => {
    //     const po = new POManager(page);
    //     await use(page);
    // }
    poManager: async ({ page }, use) => {
        await use(new POManager(page));
    },

    // env data fixture
    envData: async ({ }, use) => {
        await use({
            auth: envConfig.auth,
            items: envConfig.items,
            featureFlags: envConfig.featureFlags ?? {},
            negativeCases,
            expectedErrors,
            raw: envConfig, // full raw config
        });
    },
});

export { expect };


