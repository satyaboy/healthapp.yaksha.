import { test, expect } from '@playwright/test';


test('first playwright test', async({page})=>{

    const userName=page.locator('#username');
    const passWord=page.locator('#password');
    const signBtn= page.locator('#signInBtn');
    const cardTitles=page.locator('.card-body a');
    // const context = await browser.newContext();
    // const page = await context.newPage();      
    //await page.goto('https://rahulshettyacademy.com/client'); 
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());

    await userName.fill('rahulshettya');
    await passWord.fill('learning');
    await signBtn.click();

    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password.');

    await userName.fill("");
    await userName.fill('rahulshettyacademy');
    await signBtn.click();

    console.log(await cardTitles.first().textContent());

    const alltitles=await cardTitles.allTextContents();
    console.log(alltitles);



    //await page.pause();

})