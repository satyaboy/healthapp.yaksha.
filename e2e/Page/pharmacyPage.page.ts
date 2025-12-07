import { expect, Locator, Page } from "@playwright/test";
import { verify } from "crypto";

export class PharmacyPage {
    
    readonly page: Page;
    private clickPharmacy: Locator
    private clickOrderTab: Locator
    private clickExport: Locator

    constructor(page: Page) {
        this.page = page;
        this.clickPharmacy = page.locator('a[href="#/Pharmacy"]');
        this.clickOrderTab = page.locator('ul[class="page-breadcrumb"] li:nth-child(2) > a:nth-child(1)');
        this.clickExport = page.locator('button[title="Export To Excel"]');
    }


    async verifyExportOrderSectionData() {
        await this.clickPharmacy.click();
        await this.page.waitForTimeout(3000);

        await this.clickOrderTab.click();
        await this.page.waitForTimeout(3000);

        await this.clickExport.click();
        await this.page.waitForTimeout(3000);

    }


}