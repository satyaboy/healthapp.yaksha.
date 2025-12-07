import { Locator,Page } from "@playwright/test";

export class SubStorePage 
{
    readonly page:Page
    private clickSubStore:Locator;
    private clickAccount:Locator;
    private clickPharmacy:Locator;
    private clickInventory:Locator;
   
    constructor(page:Page)
    {
        this.page=page;
        this.clickSubStore = page.locator('div:nth-child(1) > ul:nth-child(1) > li:nth-child(30) > a:nth-child(1) > span:nth-child(2)');
        this.clickAccount  = page.locator('div[class="row"] div:nth-child(1) a:nth-child(1) div:nth-child(1) span:nth-child(2) i:nth-child(2)');
        this.clickPharmacy = page.locator('ul[class="page-breadcrumb"] li:nth-child(1) > a:nth-child(1)');
        this.clickInventory= page.locator('ul[class="page-breadcrumb"] li:nth-child(2) > a:nth-child(1)')
    }

    async verifySubModulesDisplay()
    {
        await this.clickSubStore.click();
        await this.clickAccount.nth(0).click();
        await this.page.waitForTimeout(3000); 
        await this.clickPharmacy.click(); 
        await this.page.waitForTimeout(2000);
        await this.clickInventory.click();
        await this.page.waitForTimeout(2000);     
    }


}