const {test, expect} = require('@playwright/test'); //we imported playwright tests
const { skip } = require('node:test');

//test syntax
test.skip('UI Basics', async({browser})=>{
//playwright code
//JavaScript is async, codes will not be run sequencially.
//Before every step use keyword >>await<< to previous steps have been finished
//when you use >>await<< within code, you should use asny keyword for function like >>>>>> async function(){} <<<<<<<<<<<<<<
//whenever we start using playwright there are some fixtures available for using within our code I.E >>>>>>>>>>> {browser}<<<<<<<<<<<<
//Fixtures are global variables

//chrome browser -plugins/cookies
const context =await browser.newContext();
const page =await context.newPage();
const errorMessage=page.locator("[style*='block']")
const username=page.locator('#username')
const pwd=page.locator("input[id='password']")
const signIn=page.locator("input[type='submit']")
const titles=page.locator(".card-body a")
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
//css selector locators
await username.fill('rahulshetty')
await pwd.fill('Learning@830$3mK2')
await signIn.click()
console.log(await (errorMessage).textContent()) //partial css
await expect(errorMessage).toHaveText("Incorrect username/password.")

await username.fill("rahulshettyacademy")
await signIn.click()
await expect(titles.nth(0)).toHaveText("iphone X")

//nth() method helping us to select intended item from multi element css
console.log(await titles.nth(0).textContent())
console.log(await titles.allTextContents()) // this will return all the titles this locator has, 
                                            // however this dont have auto wait mechanism


});

test.skip('UI  Controls', async({page})=>{
const username=page.locator('#username')
const pwd=page.locator("input[id='password']")
const dropdown=page.locator("select[class='form-control']")
const signIn=page.locator("input[type='submit']")
const radiobtn=page.locator(".radiotextsty")
const checkedRadio=page.locator("input[type='radio']:checked")
const terms=page.locator("#terms")
const blinkingText=page.locator("a[class='blinkingText']:first-child")

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
await dropdown.selectOption("Consultant")
await radiobtn.last().click()
await page.locator('#okayBtn').click()
await expect(page.locator("input[value='user']")).toBeChecked()
console.log(await checkedRadio.inputValue())
await terms.check()
//this will check Terms checkbox is checked
await expect(terms).toBeChecked()

await terms.uncheck()
//Playwright doesnt have built in isUnchecked method. Sho with this workaround we are able to check wherther it is checked or unchecked
expect(await terms.isChecked()).toBeFalsy()

await expect(blinkingText).toHaveAttribute('class','blinkingText')


})

test("Child window handling", async ({browser})=>{
const context=await browser.newContext()
const page=await context.newPage()
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

const docPage=page.locator("a[class='blinkingText']:first-child")

const [newPage]=await Promise.all([//This will help promises will be run paralely
context.waitForEvent('page'), //listen for any new page opening
await docPage.click() //this click event will open a new page
])
const redText=await newPage.locator(".red")
console.log(await redText.textContent())
const arrayText=(await redText.textContent()).split("@") //this will divide 2 the whole text around "@" symbol
//array[0] is everything before @ symbol, array[1] is everything after @ symbol
const domain=arrayText[1].split(" ")[0]
const usernameVal=domain.split(".")[0]
console.log(usernameVal)
await expect(redText).toContainText("mentor@rahulshettyacademy.com")




})







;