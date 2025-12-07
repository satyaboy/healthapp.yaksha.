import { expect, Locator, Page } from '@playwright/test';
import { cartPageLocators } from '../cartPage/cartPageLocators';

export  class CartPage
{

    private page: Page;
    private cartProducts: Locator;
    private productsText: Locator;
    private cart: Locator;
    private orders: Locator;
    private checkout: Locator;
    readonly locators: cartPageLocators;


constructor(page:Page)
{
    this.page = page;
    this.locators = new cartPageLocators(page); // instance of PageLocagtors
    this.cartProducts = page.locator("div li").first();
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.locator("text=Checkout");
}

async VerifyProductIsDisplayed(productName:string): Promise<void>
{
    // await this.cartProducts.waitFor();
    // const bool =await this.getProductLocator(productName).isVisible();
    // expect(bool).toBeTruthy();
    await this.locators.cartProducts.waitFor();
    const productLocator = this.locators.getProductLocator(productName);
    const isVisible = await productLocator.isVisible();
    expect(isVisible).toBeTruthy();
}

async Checkout(): Promise<void> 
{
    await this.locators.checkout.click();
}

//  getProductLocator(productName:string):Locator 
// {
//     return  this.page.locator("h3:has-text('"+productName+"')");
// }

}
