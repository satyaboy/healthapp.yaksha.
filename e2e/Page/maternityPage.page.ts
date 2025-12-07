import { Page, Locator } from "playwright";
import { expect } from "playwright/test";

export class MaternityPage {
    private page: Page;
    private maternityLink: Locator;
    private laboratoryDashboard: Locator;
    private starIcon: Locator;

    constructor(page: Page) {
        this.page = page;
        this.maternityLink = page.locator('a[href="#/Maternity"]');
        this.laboratoryDashboard = page.locator('a[href="#/Maternity/PatientList"]');
        this.starIcon = page.locator('i[title="Remember this Date"]');
    }

    public get getErrorMessageLocator() {
        return (errorMessage: string) => {
            return this.page.locator(`//p[contains(text(),"error")]/../p[contains(text(),"${errorMessage}")]`);
        };
    }

    async getTooltipTextFromStar(): Promise<string> {
        let tooltipText = "";
        try {
            await this.maternityLink.click();
            await this.laboratoryDashboard.nth(1).click();
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