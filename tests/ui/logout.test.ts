import { test, expect } from '@playwright/test';

test.describe('Logout Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
    });

    test('Verify User is Able to Logout', async ({ page }) => {
        await page.click('#react-burger-menu-btn');
        const menu = await page.locator('#inventory_sidebar_link');
        await expect(menu).toBeVisible();
        await page.click('#logout_sidebar_link');
        await expect(page.locator('#user-name')).toBeVisible();
        await expect(page.locator('#password')).toBeVisible();
        await expect(page.locator('#login-button')).toBeVisible();
    });
});
