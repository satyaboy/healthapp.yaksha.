import { expect, Locator, Page } from "@playwright/test";

export class DispenceryPage {
    readonly page: Page
    private clickDispencery: Locator;
    private clickMainDis: Locator;
    private starIcon: Locator;


    constructor(page: Page) {
        this.page = page;
        this.clickDispencery = page.locator('a[href="#/Dispensary"]');
        this.clickMainDis = page.locator('span:nth-child(2) i:nth-child(1)');
        this.starIcon = page.locator('.fa.fa-sign-out')

        //div[class='modal-content position-relative col-md-2 col-xs-2 col-lg-2'] h6
    }

    async verifyDescpencery(): Promise<string> {
        let tooltipText = "";
        try {
            await this.clickDispencery.click();
            await this.clickMainDis.click();
            // Hover over the star icon
            await this.starIcon.hover();
            await this.page.waitForTimeout(2000);
            await expect(this.starIcon).toBeVisible();
            tooltipText = (await this.starIcon.getAttribute("title")) || "";
            // Verify the search result contains the patient name
            expect(tooltipText).toEqual('Remember this Date');
            console.log(`Tooltip text: ${tooltipText}`);
        } catch (e) {
            console.error("Error retrieving tooltip text:", e);
            throw new Error("Tooltip text could not be retrieved");
        }

        // Return the tooltip text
        return tooltipText.trim();
    }



}