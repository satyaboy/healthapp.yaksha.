import { Locator, Page } from "@playwright/test";
import { verify } from "crypto";

export class AccountingPage {
    readonly page: Page;
    private accountPage: Locator;
    private settingTab: Locator;
    private clickLedger: Locator;
    private searchInput: Locator;
    private clickActiveBtn: Locator;


    constructor(page: Page) {
        this.page = page;
        this.accountPage = page.locator('a[href="#/Accounting"]');
        this.settingTab = page.locator('ul[class="page-breadcrumb"] li:nth-child(2) a:nth-child(1)');
        this.clickLedger = page.locator('.nav-padding.a-tab-active');
        this.searchInput = page.locator('#quickFilterInput');
        this.clickActiveBtn = page.locator('a[danphe-grid-action="activateDeactivateBasedOnStatus"]');
    }

    async verifyActivationLedger() {
        await this.accountPage.click({ force: true });
        await this.page.waitForTimeout(3000);
        await this.settingTab.click({ force: true });
        await this.page.waitForTimeout(3000);
        await this.settingTab.click({force: true });
        await this.page.waitForTimeout(2000);
        await this.searchInput.type('BANK A/C #', { delay: 100 });
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000);
        await this.clickActiveBtn.click({ trial: true });
        await this.clickActiveBtn.waitFor({ state: 'visible' });
        await this.clickActiveBtn.click({force: true });
        await this.page.waitForTimeout(9000);
        // await this.page.waitForTimeout(3000);

    }


}