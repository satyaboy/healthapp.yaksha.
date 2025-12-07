import { test, expect } from '@playwright/test';
import { POManager } from '../pageobjects/POManager';


test('Client App login', async ({ page }) => {

  // Define your file name and type
  const fileName = "Baseline.xlsx";  // The file name you want to pass
  const fileType = "Baseline";
  const compareFileName = '9583636_file.xlsx';
  //const xmlFile="E:\\DataFile\\BookDetails.xml";
  const xmlFile = "E:\\DataFile\\data.xml";
  // const File="E:\\DataFile\\

  const poManager = new POManager(page);
  const excelvalidation = poManager.getExcelValidation()
  // await excelvalidation.getValidationMessageFromBaseLineExcel("2397641.xlsx", "Baseline")
  console.log('\n');
  await excelvalidation.readXmlData(xmlFile);

  // await excelvalidation.compareBaselineAndLatestErrors()

  //js file- Login js, DashboardPage
  // const username = "satyatheone@gmail.com";
  // const password = "S@ty@1qq5"
  // const productName = 'ZARA COAT 3';

  // const products = page.locator(".card-body");

  // const loginPage = poManager.getLoginPage();
  // await loginPage.goTo();
  // await loginPage.validLogin(username, password);

  // const dashboardPage = poManager.getDashboardPage();
  // await dashboardPage.searchProductAddCart(productName);
  // await dashboardPage.navigateToCart();

  // const cartPage = poManager.getCartPage();
  // await cartPage.VerifyProductIsDisplayed(productName);
  // await cartPage.Checkout();

  // const ordersReviewPage = poManager.getOrdersReviewPage();
  // await ordersReviewPage.searchCountryAndSelect("ind", "India");
  // const orderId = await ordersReviewPage.SubmitAndGetOrderId();
  // console.log(orderId);

  // await dashboardPage.navigateToOrders();
  // const ordersHistoryPage = poManager.getOrdersHistoryPage();
  // await ordersHistoryPage.searchOrderAndSelect(orderId);
  // expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

  //Zara Coat 4

});








