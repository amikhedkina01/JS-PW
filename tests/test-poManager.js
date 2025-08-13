import { chromium } from 'playwright';  // Імпортуємо Playwright для створення браузера
import { POManager } from '../pages/POManager.js';  // Імпортуємо POManager

(async () => {
    try {
        // Створюємо браузер та контекст
        const browser = await chromium.launch({ headless: false });  // Запускаємо браузер (візуально)
        const context = await browser.newContext();
        const page = await context.newPage();  // Створюємо нову сторінку

        console.log("Starting POManager initialization...");

        // Ініціалізація POManager
        const poManager = new POManager(page);  // Ініціалізуємо POManager
        console.log("POManager initialized successfully:", poManager);

        // Виконуємо просту перевірку
        if (!poManager) {
            console.log("POManager is not initialized.");
        } else {
            console.log("POManager is initialized.");
        }

        // Закриваємо браузер після виконання тесту
        await browser.close();
        console.log("Browser closed successfully.");

    } catch (error) {
        console.error("Error during POManager initialization:", error);
    }
})();
