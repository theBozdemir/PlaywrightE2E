const {test, expect} = require('@playwright/test');

test("Login Test Assignment", async ({browser})=>{
    const context=await browser.newContext();
    const page=await context.newPage();
    const usrname= page.locator("#userEmail")
    const password=page.locator("#userPassword")
    const signInButton=page.locator("#login")
    const title=page.locator(".card-body b").nth(0)
    const titles=page.locator(".card-body b")
    const products= page.locator(".card-body")
    const prodName="ZARA COAT 3"
    const cartBtn=page.locator("[routerlink*='cart']")
    const checkoutBtn=page.locator("text=Checkout")
    const cardNumber=page.locator("input[value*='9292']")
    const expMonth=page.locator(".small select:nth-child(2)")
    const expYear=page.locator(".small select:nth-child(3)")
    const cvv=page.locator(".small:nth-child(2)>input")
    const nameOnCard=page.locator(".row:nth-child(3)>div:nth-child(1)>input")
    const countryDropdown=page.locator("input[placeholder*='Country']")
    const countryResults=page.locator(".list-group")
    const placeOrder=page.locator('text=PLACE ORDER')
    const orderValidation=page.locator(".hero-primary")
    const orderNumberLoc=page.locator("#htmlData>tbody>tr:nth-child(4)>td>table>tbody>tr>td>table>tbody>tr:nth-child(3)>td>label")
    const orderPageIDs=page.locator("table>tbody>tr")
    const ordersButton=page.locator("button[routerlink*='myorders']")
    
    

    

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    await usrname.fill("tarikbozdemir2602@gmail.com")
    await password.fill("Sevdis2602.")
    await signInButton.click()
    await titles.first().waitFor() // this will wait until the element is fully loaded
    //await page.waitForLoadState('networkidle') // This let us smartly wait until the page load complete and this will prevent flaky results 
    //console.log(await title.textContent())
    const count=await products.count()
    console.log(await titles.allTextContents())
    for(let i=0;i<count;i++){
        
        if(await products.nth(i).locator("b").textContent()===prodName){
            await products.nth(i).locator("text= Add To Cart").click()
            break;
        }

        
    }
    await cartBtn.click()
    await page.locator(".itemImg").first().waitFor() // this will wait until required elements to be loaded on the testing page
    const bool=await page.locator("h3:has-text('ZARA COAT 3')").isVisible()
    await expect(bool).toBeTruthy()
    await checkoutBtn.click()
    await cardNumber.fill("1234 4567 7890 1234")
    await expMonth.selectOption("11")
    await expYear.selectOption("27")
    await cvv.fill('123')
    await nameOnCard.fill("John Doe")
    await countryDropdown.pressSequentially("ca")
    await countryResults.waitFor()
    let countryCount = await countryResults.locator('button').count()
    for(let i=0;i<countryCount;i++){
        if(await countryResults.locator('button').nth(i).textContent()===' Canada'){
            await countryResults.locator('button').nth(i).click()
            break;
        }
    }
    await placeOrder.click()
    await expect(orderValidation).toBeVisible()
    const orderNo=(await orderNumberLoc.textContent()).split("|")[1].trim()

    await ordersButton.click()
    await orderPageIDs.first().waitFor()
    
    let orderCounter=await orderPageIDs.count()
    let flag=false
    for(let i=orderCounter-1;i>-1;i--){
        console.log(await orderPageIDs.nth(i).textContent())
        if((await orderPageIDs.locator("th").nth(i).textContent()).includes(orderNo)){
            console.log("ORDER FOUND!!!!! Expected order ID : "+orderNo+" Actual Order ID : "+await orderPageIDs.locator("th").nth(i).textContent())
            await orderPageIDs.locator("td:nth-child(6)>button").nth(i).click()
            flag=true;
            break;
        }
        }
        await page.pause()
        if(!flag) {
    console.log("Order number couldn't be verified");
        }








})