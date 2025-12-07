import { Given, When, Then } from '@cucumber/cucumber';
import { POManager } from "../pageobjects/POManager";
import { expect } from "@playwright/test";

Given('User logs into the Ecommerce application with {string} and {string}', async function (username: string, password: string) {
  const loginPage = this.poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(username, password);
});

When('user add the item {string} to cart.', async function (productName: string) {
  const dashboardPage = this.poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(productName);
  await dashboardPage.navigateToCart();

});

Then('Varify {string} will be displayed in the cart.', async function (productName: string) {
  const cartPage = this.poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(productName);
  await cartPage.Checkout();

});

When('Enter valid details and place the order.', async function () {
  const ordersReviewPage = this.poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("ind", "India");
  const orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(orderId);

});


Then('Varify order is present in OrderHistory.', async function () {
  await this.dashboardPage.navigateToOrders();
  const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(this.orderId);
  expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

});
