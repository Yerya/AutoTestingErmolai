import { test, expect } from '@playwright/test';

test.describe('Checkout Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
    });

    test('Verify Checkout Process', async ({ page }) => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.click('.shopping_cart_link');
        await page.click('#checkout');
        await page.fill('#first-name', 'John');
        await page.fill('#last-name', 'Dou');
        await page.fill('#postal-code', '12345');
        await page.click('#continue');
        const summaryTotal = await page.locator('.summary_total_label');
        await summaryTotal.waitFor({ state: 'visible' });
        await expect(summaryTotal).toHaveText(/Total:\s+\$32.39/);
        await page.click('#finish');
        const completeHeader = await page.locator('.complete-header');
        await completeHeader.waitFor({ state: 'visible' });
        await expect(completeHeader).toHaveText('Thank you for your order!');
    });

    test('Verify Checkout Process for Multiple Items', async ({ page }) => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await page.click('.shopping_cart_link');
        await page.click('#checkout');
        await page.fill('#first-name', 'John');
        await page.fill('#last-name', 'Dou');
        await page.fill('#postal-code', '12345');
        await page.click('#continue');
        const summaryTotal = await page.locator('.summary_total_label');
        await summaryTotal.waitFor({ state: 'visible' });
        await expect(summaryTotal).toHaveText(/Total:\s+\$43.18/);
        await page.click('#finish');
        const completeHeader = await page.locator('.complete-header');
        await completeHeader.waitFor({ state: 'visible' });
        await expect(completeHeader).toHaveText('Thank you for your order!');
    });
});
