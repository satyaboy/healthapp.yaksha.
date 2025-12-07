import { expect, Locator, Page } from "@playwright/test";
import { verify } from "crypto";

export class LaboratoryPage {
    readonly page: Page;
    private clickLaboratory: Locator;
    private clickCollectionTab: Locator;
    private giveDate: Locator;
    private clickOkButton:Locator;
    private clickHanburger:Locator;
    private fillTextField:Locator;


    constructor(page: Page) {
        this.page = page;
        this.clickLaboratory = page.locator('a[href="#/Lab"]');
        this.clickCollectionTab = page.locator('ul[class="page-breadcrumb"] li:nth-child(3) > a:nth-child(1)');
        this.giveDate = page.locator('en-calendar:nth-child(1) > div:nth-child(1) > div:nth-child(1) > input:nth-child(1)');
        this.clickOkButton= page.locator('button[class="btn green btn-success"]');
        this.clickHanburger = page.locator('span[class="ag-header-icon ag-header-cell-menu-button"] span[class="ag-icon ag-icon-menu"]');
        this.fillTextField = page.locator('#filterText');
    
    }

    
    async verifyTableFiltering() 
    {
        await this.clickLaboratory.click();
        await this.clickCollectionTab.click();
        await this.page.waitForTimeout(3000);
        await this.giveDate.nth(0).type('01-01-2020',{delay:100});
        await this.page.waitForTimeout(3000);
        await this.clickOkButton.click();
        await this.page.waitForTimeout(3000);
        await this.clickHanburger.nth(5).hover()
        await this.clickHanburger.nth(5).click();
        await this.page.waitForTimeout(3000);
        await this.fillTextField.fill('Male Ward');
        await this.page.waitForTimeout(4000);
    }


}