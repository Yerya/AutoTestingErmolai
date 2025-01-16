import { test, expect } from '@playwright/test';

test.describe('Login Tests', () => {
    test('Verify User Login', async ({ page }) => {
        await page.goto('/');
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        const appLogo = await page.locator('.app_logo');
        await expect(appLogo).toHaveText('Swag Labs');
    });

    test('Verify Non-Existing User Is not Able to Login', async ({ page }) => {
        await page.goto('/');
        await page.fill('#user-name', 'standard_user_123');
        await page.fill('#password', 'secret_sauce_123');
        await page.click('#login-button');
        const errorMessage = await page.locator('h3[data-test="error"]');
        await expect(errorMessage).toHaveText(
            'Epic sadface: Username and password do not match any user in this service'
        );
    });
});
