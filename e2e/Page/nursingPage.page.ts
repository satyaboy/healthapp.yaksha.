import { expect, Locator, Page } from "@playwright/test";
import { verify } from "crypto";

export class NursingPage {
    readonly page: Page;
    private clickNurshing: Locator;
    private clickPastDays: Locator;
    private giveDate: Locator;
    private clickOkButton: Locator;
    private searchName: Locator;
    private uploadFileBtn: Locator;
    private clickOnDropdown: Locator;
    private uploadImage: Locator;
    private submitButton: Locator;
    private getTextMesage: Locator;


    constructor(page: Page) {
        this.page = page;
        this.clickNurshing = page.locator('a[href="#/Nursing"]');
        this.clickPastDays = page.locator('div[class="wrapper"] li:nth-child(2) a:nth-child(1)');
        this.giveDate = page.locator('en-calendar:nth-child(1) > div:nth-child(1) > div:nth-child(1) > input:nth-child(1)');
        this.clickOkButton = page.locator('.btn.green.btn-success')
        this.searchName = page.locator('#quickFilterInput');
        this.uploadFileBtn = page.locator('i[title="upload files"]');
        this.clickOnDropdown = page.locator('select[class="form-control ng-untouched ng-pristine ng-invalid"]');
        this.uploadImage = page.locator('input[type="file"]');
        this.submitButton = page.locator('input[value="Submit"]');
        this.getTextMesage = page.locator('.main-message');
    }

    async verifyfileupload(): Promise<string> {
        let actualMessage = "";
        try {
            await this.clickNurshing.click();
            await this.clickPastDays.click();
            await this.page.waitForTimeout(3000);
            await this.giveDate.nth(0).type('01-01-2020', { delay: 100 });
            await this.page.waitForTimeout(3000);
            await this.clickOkButton.click();
            await this.searchName.fill('Deepika rani');
            await this.searchName.press('Enter')
            await this.uploadFileBtn.nth(0).click();
            await this.page.waitForTimeout(1000);
            await expect(this.page.locator('div[class="caption custom-caption"] h3 span')).toBeVisible();
            await this.clickOnDropdown.selectOption('Pathology');
            await this.uploadImage.setInputFiles("C:\\Users\\satya\\Downloads\\t-shirt offer-02.png");
            await this.page.waitForTimeout(5000);
            await this.submitButton.click();

            const actualMessage = await this.getTextMesage.textContent();
            console.log(actualMessage);
            // // Verify the search result contains the patient name
            expect(actualMessage).toEqual(' File Uploded');
            console.log(`Tooltip text: ${actualMessage}`);
        } catch (e) {
            console.error("Error retrieving tooltip text:", e);
            throw new Error("Tooltip text could not be retrieved");
        }
        // Return the tooltip text
        return actualMessage.trim();
    }


}