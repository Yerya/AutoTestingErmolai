import { test, expect } from '@playwright/test';

test.describe('Cart Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
    });

    test('Verify Adding Item to Cart', async ({ page }) => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        const cartBadge = await page.locator('.shopping_cart_badge');
        await cartBadge.waitFor({ state: 'visible' });
        await expect(cartBadge).toHaveText('1');
        await page.click('.shopping_cart_link');
        const cartItems = await page.locator('.cart_item');
        await expect(cartItems).toHaveCount(1);
        await expect(cartItems.first()).toContainText('Sauce Labs Backpack');
    });

    test('Verify Adding Multiple Items to Cart', async ({ page }) => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        const cartBadge = await page.locator('.shopping_cart_badge');
        await cartBadge.waitFor({ state: 'visible' });
        await expect(cartBadge).toHaveText('2');
        await page.click('.shopping_cart_link');
        const cartItems = await page.locator('.cart_item');
        await expect(cartItems).toHaveCount(2);

        // Проверяем текст для каждого элемента
        const firstItem = await cartItems.nth(0).locator('.inventory_item_name');
        const secondItem = await cartItems.nth(1).locator('.inventory_item_name');
        await expect(firstItem).toHaveText('Sauce Labs Backpack');
        await expect(secondItem).toHaveText('Sauce Labs Bike Light');
    });

    test('Verify Removing Item from Cart', async ({ page }) => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.click('.shopping_cart_link');
        const removeButton = await page.locator('[data-test="remove-sauce-labs-backpack"]');
        await removeButton.waitFor({ state: 'visible' });
        await removeButton.click();
        const cartItems = await page.locator('.cart_item');
        await expect(cartItems).toHaveCount(0);
        const cartBadge = await page.locator('.shopping_cart_badge');
        await expect(cartBadge).not.toBeVisible();
    });
});
