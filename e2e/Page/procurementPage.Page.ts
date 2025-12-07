import { Locator,Page } from "@playwright/test";

export class ProcurementPage 
{
    readonly page:Page
    private  clickProcurement:Locator;
    private clickQuotation:Locator;
    private clickRequestQuotation:Locator;
    private fillSubject:Locator;
    private fillDescription:Locator;
    private selectVendor :Locator;
    private searchVendor :Locator;
    private chooseVendor :Locator;
    private giveItemName: Locator;
    private Quantity : Locator;
    private requestBtn:Locator;


    constructor(page:Page)
    {
        this.page=page;
        this.clickProcurement = page.locator('a[href="#/ProcurementMain"]');
        this.clickQuotation   = page.locator('ul[class="page-breadcrumb"] li:nth-child(4) > a:nth-child(1)');
        this.clickRequestQuotation = page.locator('input[value=" Request For Quotation"]');
        this.fillSubject = page.locator('#Subject');
        this.fillDescription = page.locator('#Description');
        this.selectVendor = page.locator('.c-btn');
        this.searchVendor = page.locator('input[placeholder="Search"]');
        this.chooseVendor = page.locator('li[class="pure-checkbox"] label')
        this.giveItemName = page.locator('#itemName0');
        this.Quantity     = page.locator('#qtyip0');
        this.requestBtn   = page.locator('#RequestButton')

    }

    async verifyRequestForQuotationGeneration(){
       await this.clickProcurement.click();
       await this.page.waitForTimeout(3000);
       await this.clickQuotation.click();
       await this.clickRequestQuotation.click();
       await this.page.waitForTimeout(3000);
       await this.fillSubject.fill('test subject');
       await this.fillDescription.fill('test description');
       await this.selectVendor.click();
       await this.page.waitForTimeout(2000);
       await this.searchVendor.fill('Ashar & Company')
       await this.page.waitForLoadState('networkidle');
       await this.page.waitForTimeout(2000);
       await this.chooseVendor.click({force:true});
       await this.page.waitForTimeout(2000);
       await this.giveItemName.fill('Soap');
       await this.Quantity.fill('');
       await this.Quantity.fill('2');
       await this.page.waitForTimeout(2000);
       await this.requestBtn.click();
       await this.page.waitForTimeout(3000);

    }

}