import { Locator, Page } from '@playwright/test';

export class cartPageLocators {
    readonly cartProducts: Locator;
    readonly productsText: Locator;
    readonly cart: Locator;
    readonly orders: Locator;
    readonly checkout: Locator;
    private page: Page;

    constructor(page: Page) {
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
        this.checkout = page.locator("text=Checkout");
    }


    getProductLocator(productName:string):Locator 
    {
        return  this.page.locator("h3:has-text('"+productName+"')");
    }
}