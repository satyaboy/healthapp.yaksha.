import { Locator,Page } from "@playwright/test";

export class LoginPage 
{
    readonly page:Page
    private usernameInput :Locator;
    private passwordInput :Locator;
    private loginButton :Locator;
    private errorMessage:Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.usernameInput= page.locator('input[id="username_id"]');
        this.passwordInput= page.locator('input[id="password"]');
        this.loginButton = page.locator('button[type="submit"]');
        this.errorMessage = page.locator('.error-message');
    }

    async performLogin(loginData:Record<string,string>)
    {
        await this.usernameInput.fill(loginData.username);
        await this.passwordInput.fill(loginData.password);
        await this.loginButton.click();
    }

    async getErrorMessage(){
        return await this.errorMessage.textContent();
    }

}