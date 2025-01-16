import { LoginPage } from '../ui/pages/LoginPage';
import { Page } from '@playwright/test';

export abstract class LoginStrategy {
    abstract login(page: Page, username: string, password: string): Promise<void>;
}

export class StandardLoginStrategy extends LoginStrategy {
    async login(page: Page, username: string, password: string) {
        const loginPage = new LoginPage(page);
        await loginPage.login(username, password);
    }
}
