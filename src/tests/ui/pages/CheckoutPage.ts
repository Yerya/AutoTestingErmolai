import { Page } from '@playwright/test';

export class CheckoutPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async checkout(firstName: string, lastName: string, postalCode: string) {
        await this.page.click('#checkout');
        await this.page.fill('#first-name', firstName);
        await this.page.fill('#last-name', lastName);
        await this.page.fill('#postal-code', postalCode);
        await this.page.click('#continue');
    }

    async getTotal() {
        const totalLabel = await this.page.locator('.summary_total_label');
        return await totalLabel.textContent();
    }

    async finishCheckout() {
        await this.page.click('#finish');
    }

    async isOrderComplete() {
        return await this.page.isVisible('.complete-header');
    }
}
