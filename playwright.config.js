import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',  // Вказуємо директорію з тестами
  fullyParallel: true,  // Запуск тестів в паралельному режимі
  forbidOnly: !!process.env.CI,  // Забороняє використання test.only в коді на CI
  retries: process.env.CI ? 2 : 0,  // Повторення тестів тільки на CI
  workers: process.env.CI ? 1 : undefined,  // Лише один процес тестів на CI
  reporter: 'html',  // Репортер для тестів

  use: {
    baseURL: 'https://www.saucedemo.com/',  // Вказуємо базовий URL для всіх тестів
    trace: 'on-first-retry',  // Збираємо трасування на перших повторних спробах
    screenshot: 'only-on-failure',  // Зберігаємо скріншоти лише на невдачі тесту
    video: 'on-first-retry',  // Записуємо відео при першому повторі тесту
  },
});
