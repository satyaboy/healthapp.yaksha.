import { test, expect } from '@playwright/test';


test('Contect Validation error login', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('anshika@gmail.com');
    await page.locator('#userPassword').fill('Iamking@000');
    await page.locator('#login').click();

    await page.waitForLoadState('networkidle');
    const title = await page.locator('.card-body b').allTextContents();
    console.log(title);

 

    //await page.pause();

})