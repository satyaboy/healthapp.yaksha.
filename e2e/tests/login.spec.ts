import { test, expect } from '@playwright/test';
import loginData from '../Utils/login.json'
import { LoginPage } from '../Page/login.page';
import { PastDaysRecordsPage } from '../Page/pastDaysRecords.page';
import { NursingPage } from '../Page/nursingPage.page'
import { AccountingPage } from '../Page/accountingPage.page'
import { SubStorePage } from '../Page/subStorePage.page'
import { ProcurementPage } from '../Page/procurementPage.Page'
import { LaboratoryPage } from '../Page/laboratoryPage.page'
import { PharmacyPage } from "../Page/pharmacyPage.page";
import { MaternityPage } from "../Page/maternityPage.page";
import { UtilityPage } from "../Page/utilityPage.page";
import { SettingsPage } from "../Page/settingsPage.page"

test.describe('Login Functionality', () => {

    //Test 1
    test('user should be able to login useing credentials from login.json', async ({ page }) => {
        const loginpage = new LoginPage(page);
        await page.goto('https://healthapp.yaksha.com/')

        await loginpage.performLogin(loginData);
        await expect(page.locator('//*[text()=" admin "]')).toBeVisible();
    })

    // //Test 2
    test('user willverify the overview from out patient ', async ({ page }) => {
        const loginpage = new LoginPage(page);
        await page.goto('https://healthapp.yaksha.com/')
        await loginpage.performLogin(loginData);
        const pastDaysRecordsPage = new PastDaysRecordsPage(page);
        await pastDaysRecordsPage.verifyPatientOverviewFromPastDaysRecords('Deepika Rani', '01-01-2020');
    })

    // //Test 3
    test('Verify File Upload ', async ({ page }) => {
        const loginpage = new LoginPage(page);
        await page.goto('https://healthapp.yaksha.com/')
        await loginpage.performLogin(loginData);
        const nurshingPage = new NursingPage(page);
        await nurshingPage.verifyfileupload();
    })

    // //Test 4&5
    test('Verify Activation of BANK A/C #Ledger ', async ({ page }) => {
        const loginpage = new LoginPage(page);
        await page.goto('https://healthapp.yaksha.com/')
        // await page.setViewportSize({ width: 1728, height: 972 }); // 90% of 1920x1080
        await loginpage.performLogin(loginData);
        const accountPage = new AccountingPage(page);
        await accountPage.verifyActivationLedger();

    })

    //Test 6
    test('Verify All SubModule Displayed Correctly ', async ({ page }) => {
        const loginpage = new LoginPage(page);
        await page.goto('https://healthapp.yaksha.com/')
        // await page.setViewportSize({ width: 1728, height: 972 }); // 90% of 1920x1080
        await loginpage.performLogin(loginData);
        const subStorePage = new SubStorePage(page);
        await subStorePage.verifySubModulesDisplay();
    })

    // Test 7
    test('Verify tooltip and its text present on hover the mouse on Star ', async ({ page }) => {
        const loginpage = new LoginPage(page);
        await page.goto('https://healthapp.yaksha.com/')
        await loginpage.performLogin(loginData);
        const maternityPage = new MaternityPage(page);
        await maternityPage.getTooltipTextFromStar();
    })

    // Test 8
    test('Verify All SubModule Displayed Correctly  verifyRequestForQuotationGeneration', async ({ page }) => {
        const loginpage = new LoginPage(page);
        await page.goto('https://healthapp.yaksha.com/')
        await loginpage.performLogin(loginData);
        const procurementPage = new ProcurementPage(page);
        await procurementPage.verifyRequestForQuotationGeneration();
    })

    // Test 9
    test('Verify table filtering for Male Ward', async ({ page }) => {
        const loginpage = new LoginPage(page);
        await page.goto('https://healthapp.yaksha.com/')
        await loginpage.performLogin(loginData);
        const laboratoryPage = new LaboratoryPage(page);
        await laboratoryPage.verifyTableFiltering();
    })

    //Test 10
    test('Verify to export the order section data', async ({ page }) => {
        const loginpage = new LoginPage(page);
        await page.goto('https://healthapp.yaksha.com/')
        await loginpage.performLogin(loginData);
        const pharmacyPage = new PharmacyPage(page);
        await pharmacyPage.verifyExportOrderSectionData();

    })

    //Test 11
    test('Please fill all mendatory field', async ({ page }) => {
        const loginpage = new LoginPage(page);
        await page.goto('https://healthapp.yaksha.com/')
        await loginpage.performLogin(loginData);
        const uilityPage = new UtilityPage(page);
        await uilityPage.verifyWarningPopupForMandatoryFields()
    })

    //Test 12
    test('Verify Price Category Enable/Disable', async ({ page }) => {
        const loginpage = new LoginPage(page);
        await page.goto('https://healthapp.yaksha.com/')
        // await page.setViewportSize({ width: 1728, height: 972 }); // 90% of 1920x1080
        await loginpage.performLogin(loginData);
        const settingsPage = new SettingsPage(page);
        await settingsPage.verifyDisablePriceCategory();
        await settingsPage.verifyEnablePriceCategory();

    })
})