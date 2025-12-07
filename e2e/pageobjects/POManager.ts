import { Page } from '@playwright/test';
import {LoginPage} from '../models/loginPage/LoginPage';
import {DashboardPage} from '../models/dashboardPage/DashboardPage';
import {OrdersHistoryPage} from '../models/orderHistory/OrdersHistoryPage';
import {OrdersReviewPage} from '../models/orderReview/OrdersReviewPage';
import {CartPage} from '../models/cartPage/CartPage';
import {ExcelValidation } from '../models/ExcelCheck/ExcelValidation';



export class POManager
{
    private page: Page;
    private loginPage: LoginPage;
    private dashboardPage: DashboardPage;
    private ordersHistoryPage: OrdersHistoryPage;
    private ordersReviewPage: OrdersReviewPage;
    private cartPage: CartPage;
    private excelvalidation:ExcelValidation;

constructor(page:Page)
{
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.ordersHistoryPage = new OrdersHistoryPage(this.page);
    this.ordersReviewPage = new OrdersReviewPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.excelvalidation= new ExcelValidation(this.page);
}

getLoginPage():LoginPage 
{
    return this.loginPage;
}

getCartPage():CartPage 
{
    return this.cartPage;
}

getDashboardPage():DashboardPage 
{
    return this.dashboardPage;
}
getOrdersHistoryPage():OrdersHistoryPage 
{
    return this.ordersHistoryPage;
}

getOrdersReviewPage():OrdersReviewPage 
{
    return this.ordersReviewPage;
}

getExcelValidation() :ExcelValidation
{
    return this.excelvalidation;
}

}



module.exports = {POManager};