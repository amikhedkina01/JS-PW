import { defineConfig, devices } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { envConfig, testEnv } from './utils/env.js';

export default defineConfig(
  {
    testDir: './tests',
    fullyParallel: true,
    retries: process.env.CI ? 2 : 0,
    reporter: [
      ['list'],
      ['allure-playwright']
    ],
    use: {
      baseURL: envConfig.baseURL, // <- береться з обраного env
      testIdAttribute: 'data-test',
      trace: 'always',  // Збираємо трасування на перших повторних спробах
      screenshot: 'only-on-failure',  // Зберігаємо скріншоти лише на невдачі тесту
      video: 'on-first-retry',  // Записуємо відео при першому повторі тесту
    },
    // projects: [
    //   { name: `chromium-${envName}`, use: { ...devices['Desktop Chrome'] } },
    //   // { name: `firefox-${envName}`, use: { ...devices['Desktop Firefox'] } },
    // ],
    metadata: { env: testEnv },
  });



