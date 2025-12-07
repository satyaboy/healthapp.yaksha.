import { Page, Locator } from "@playwright/test";


export class OrdersHistoryPage {
    private page: Page;
    private ordersTable: Locator;
    private rows: Locator;
    private orderdIdDetails: Locator;

    constructor(page: Page) {
        this.page = page;
        this.ordersTable = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderdIdDetails = page.locator(".col-text");
    }
    async searchOrderAndSelect(orderId: string):Promise<void> {

        await this.ordersTable.waitFor();
        for (let i = 0; i < await this.rows.count(); ++i) {
            const rowOrderId = await this.rows.nth(i).locator("th").textContent();
            if (rowOrderId && orderId.includes(rowOrderId)) {
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        }

    }

    async getOrderId(): Promise<string> {
        const orderIdText= await this.orderdIdDetails.textContent();
        return orderIdText ?? '';
    }

}

