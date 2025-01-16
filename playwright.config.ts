import { defineConfig } from '@playwright/test';

export default defineConfig({
    use: {
        baseURL: 'https://www.saucedemo.com',
        headless: true,
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },
    timeout: 30000,
});
