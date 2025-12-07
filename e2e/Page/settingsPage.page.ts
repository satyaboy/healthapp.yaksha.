import { Page, Locator } from "playwright";
import { expect } from "playwright/test";

export class SettingsPage {
    private page: Page;
    private settingLink: Locator;
    private morelink: Locator;
    private clickPriceCategory: Locator;
    private clickDisable: Locator;
    private clickActivate: Locator
    private getTextMesage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.settingLink = page.locator('a[href="#/Settings"]');
        this.morelink = page.locator('.dropdown-toggle[aria-expanded="false"]');
        this.clickPriceCategory = page.locator('li[class="dropdown bil-hr-bar open"] li:nth-child(5) a:nth-child(1)')
        this.clickDisable = page.locator('a[class="grid-action-disable"]');
        this.clickActivate = page.locator(' a[class="grid-action blinking-btn-secondary"]')
        this.getTextMesage = page.locator('.main-message')
    }

    async verifyDisablePriceCategory(): Promise<string> {
        let actualErrorMessage = "";
        try {
            await this.settingLink.click();
            await this.morelink.click();
            await this.page.waitForTimeout(2000);
            await this.clickPriceCategory.click();
            await this.clickDisable.nth(0).click();
            await this.page.waitForTimeout(6000);

            const actualErrorMessage = await this.getTextMesage.textContent();
            console.log(actualErrorMessage);
            // // Verify the search result contains the patient name
            expect(actualErrorMessage).toEqual('Deactivated.');
            console.log(`Tooltip text: ${actualErrorMessage}`);

        } catch (e) {
            console.error("Error retrieving tooltip text:", e);
            throw new Error("Tooltip text could not be retrieved");
        }
        // Return the tooltip text
        return actualErrorMessage.trim();
    }

   async verifyEnablePriceCategory(): Promise<void> {
        await this.clickActivate.nth(0).click();
        await this.page.waitForTimeout(3000);
        const actualErrorMessage = await this.getTextMesage.textContent();
        console.log(actualErrorMessage);
        // // Verify the search result contains the patient name
        expect(actualErrorMessage).toEqual('Activated.');
        console.log(`Tooltip text: ${actualErrorMessage}`);
    }
}