import { expect, Locator, Page } from "@playwright/test";
import { verify } from "crypto";

export class NursingPage {
    readonly page: Page;
    private clickNurshing: Locator;
    private clickPastDays: Locator;
    private giveDate: Locator;
    private clickOkButton:Locator;
    private searchName: Locator;
    private uploadFileBtn:Locator;
    private clickOnDropdown:Locator;
    private uploadImage: Locator;
    private submitButton:Locator;


    constructor(page: Page) {
        this.page = page;
        this.clickNurshing = page.locator('body > my-app:nth-child(24) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(25) > a:nth-child(1) > span:nth-child(2)');
        this.clickPastDays = page.locator('div[class="wrapper"] li:nth-child(2) a:nth-child(1)');
        this.giveDate = page.locator('en-calendar:nth-child(1) > div:nth-child(1) > div:nth-child(1) > input:nth-child(1)');
        this.clickOkButton= page.locator('.btn.green.btn-success')
        this.searchName = page.locator('#quickFilterInput');
        this.uploadFileBtn = page.locator('i[title="upload files"]');
        this.clickOnDropdown= page.locator('select[class="form-control ng-untouched ng-pristine ng-invalid"]');
        this.uploadImage = page.locator('input[type="file"]');
        this.submitButton = page.locator('input[value="Submit"]')

    }

    
    async verifyfileupload() 
    {
        await this.clickNurshing.click();
        await this.clickPastDays.click();
        await this.page.waitForTimeout(3000);
        await this.giveDate.nth(0).type('01-01-2020',{delay:100});
        await this.page.waitForTimeout(3000);
        await this.clickOkButton.click();
        await this.searchName.fill('Deepika rani');
        await this.searchName.press('Enter')
        await this.uploadFileBtn.nth(0).click();
        await this.page.waitForTimeout(1000);
        await expect(this.page.locator('div[class="caption custom-caption"] h3 span')).toBeVisible();
        await this.clickOnDropdown.selectOption('Pathology');
        await this.uploadImage.setInputFiles("C:\\Users\\satya\\Downloads\\t-shirt offer-02.png");
        await this.submitButton.click();
        await this.page.waitForTimeout(7000);
    }


}