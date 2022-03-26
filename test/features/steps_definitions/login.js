//cucumber
const { Given, When, Then, AfterAll } = require('@cucumber/cucumber');
const { Builder, By, Capabilities, Key } = require('selenium-webdriver');
const { expect } = require('chai'); 
const sleep = require('../support/sleep.js');

require("chromedriver");

// driver setup
const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { "w3c": false });
const driver = new Builder().withCapabilities(capabilities).build();
let BaseUrl="https://dev-front-startamericas.web.app/login"

Given('I have browsed to the Start Americas Together login page', async ()=> {
    await driver.get(BaseUrl);
    await driver.manage().window().maximize();
  });
Given('I have entered {string} into the email field',async (email)=> {
    await driver.findElement(By.name('email')).sendKeys(email);
});
Given('I have entered {string} into the password field', async  (password)=> {
    await driver.findElement(By.name('password')).sendKeys(password);
});
When('I press the {string} button',async (code)=> {
    let xpath=`//*[@id="root"]/div[2]/div[1]/div/div[2]/div[2]/div/form/div/button`;
    await driver.findElement(By.xpath(xpath)).click();
  });
Then('the welcome message should be dispayed on the screen',async ()=> {
  let xpath = '//*[@id="root"]/div[2]/div[1]/section/div[1]/div[1]/h2';
  await sleep(1000);
  let AuxText= await driver.findElement(By.xpath(xpath)).getText();
  expect(AuxText).to.be.equal("Tus Próximos Eventos");
});
AfterAll(async () => {
  await driver.close();
});