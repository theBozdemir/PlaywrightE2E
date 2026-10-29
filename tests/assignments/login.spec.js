const {test, expect} = require('@playwright/test');

test("Login Test Assignment", async ({browser})=>{
    const context=await browser.newContext();
    const page=await context.newPage();
    const usrname= page.locator("#userEmail")
    const password=page.locator("#userPassword")
    const signInButton=page.locator("#login")
    const title=page.locator(".card-body b").nth(0)
    const titles=page.locator(".card-body b")

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    await usrname.fill("tarikbozdemir2602@gmail.com")
    await password.fill("Sevdis2602.")
    await signInButton.click()
    await titles.first().waitFor() // this will wait until the element is fully loaded
    //await page.waitForLoadState('networkidle') // This let us smartly wait until the page load complete and this will prevent flaky results
    
    //console.log(await title.textContent())
    console.log(await titles.allTextContents())


})