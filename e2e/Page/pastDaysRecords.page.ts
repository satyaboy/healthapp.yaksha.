import { Locator, Page } from "@playwright/test";
import { verify } from "crypto";

export class PastDaysRecordsPage {
    readonly page: Page;
    private clickNurshing: Locator;
    private clickPastDays: Locator;
    private giveDate: Locator;
    private clickOkButton:Locator;
    private searchName: Locator;
    private clickOverview: Locator;

    constructor(page: Page) {
        this.page = page;
        this.clickNurshing = page.locator('a[href="#/Nursing"]');
        this.clickPastDays = page.locator('div[class="wrapper"] li:nth-child(2) a:nth-child(1)');
        this.giveDate = page.locator('en-calendar:nth-child(1) > div:nth-child(1) > div:nth-child(1) > input:nth-child(1)');
        this.clickOkButton= page.locator('.btn.green.btn-success')
        this.searchName = page.locator('#quickFilterInput');
        this.clickOverview = page.locator('i[title="overview"]');

    }

    async verifyPatientOverviewFromPastDaysRecords(patientName: string, formDate :string= '01-01-2020') 
    {
        await this.clickNurshing.click();
        await this.clickPastDays.click();
        await this.page.waitForTimeout(3000);
        await this.giveDate.nth(0).type(formDate,{delay:100});
        await this.page.waitForTimeout(3000);
        await this.clickOkButton.click();
        await this.searchName.fill(patientName);
        await this.searchName.press('Enter')
        await this.clickOverview.nth(0).click();
        await this.page.waitForTimeout(2000);
    }


}