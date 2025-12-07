import { Page, Locator } from "playwright";
import { expect } from "playwright/test";

export class UtilityPage {
    private page: Page;
    private utilityLink: Locator;
    private schemeRefundlink: Locator;
    private selectCounter: Locator;
    private schemeRefundEntry: Locator;
    private saveButton: Locator;
    private getTextMesage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.utilityLink = page.locator('a[href="#/Utilities"]');
        this.schemeRefundlink = page.locator('a[href="#/Utilities/SchemeRefund"]');
        this.selectCounter = page.locator('div:nth-child(1) > h5:nth-child(2)')
        this.schemeRefundEntry = page.locator('a[class="btn green btn-success"]');
        this.saveButton = page.locator('#savebutton');
        this.getTextMesage = page.locator('.main-message')
    }

    public get getErrorMessageLocator() {
        return (errorMessage: string) => {
            return this.page.locator(`//p[contains(text(),"error")]/../p[contains(text(),"${errorMessage}")]`);
        };
    }

    async verifyWarningPopupForMandatoryFields(): Promise<string> {
        let actualErrorMessage = "";
        try {
            await this.utilityLink.click();
            await this.schemeRefundlink.nth(1).click();
            await this.selectCounter.nth(0).click();
            await this.schemeRefundEntry.click();
            await this.page.waitForTimeout(2000);
            await this.saveButton.click();

            const actualErrorMessage = await this.getTextMesage.nth(1).textContent();
            console.log(actualErrorMessage);
            // Verify the search result contains the patient name
            expect(actualErrorMessage).toEqual('Please fill all the mandatory fields.');
            console.log(`Tooltip text: ${actualErrorMessage}`);

        } catch (e) {
            console.error("Error retrieving tooltip text:", e);
            throw new Error("Tooltip text could not be retrieved");
        }

        // Return the tooltip text
        return actualErrorMessage.trim();
    }
}