import { POManager } from '../pages/POManager.js';

export const poManagerFixture = async ({ page }) => {
    console.log('Starting POManager initialization...');
    const poManager = new POManager(page);

    console.log('POManager initialized:');

    // Додаємо перевірку на доступність методів poManager
    console.log('Checking POManager methods...');
    if (!poManager.getLoginPage || !poManager.getProductsPage) {
        throw new Error("Methods are missing in POManager.");
    }
};
