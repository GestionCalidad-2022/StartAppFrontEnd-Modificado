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

Given('I am logged in the Start Americas Together page', async ()=>{
    await driver.get(BaseUrl);
    await driver.manage().window().maximize();
    await driver.findElement(By.name('email')).sendKeys('lider.auxiliar@start.auxiliar.com');
    await driver.findElement(By.name('password')).sendKeys('lideraux1');
  });


  Given('I see the Start Americas Together page and events title',async ()=> {
    let xpath = '//*[@id="root"]/div[2]/div[1]/section/div[1]/div[1]/h2';
    await sleep(1000);
    let AuxText= await driver.findElement(By.xpath(xpath)).getText();
    expect(AuxText).to.be.equal("Tus Próximos Eventos");
  });

  Given('I scroll the page', function () {
    js.executeScript("window.scrollBy(0,1000)");
  });

  When('I click on the {string} button',async (event)=> {
    let xpath=`//*[@id="root"]/div[2]/div[1]/section/div[1]/div[1]/div/button/span[1]`;
    await driver.findElement(By.xpath(xpath)).click();
  });

  When('I should see the events page', function () {
   let xpath = ' //*[@id="root"]/div[2]/div[1]/div/div[1]/div[1]/div[2]/h1[1]/h3';
  await sleep(1000);
  let AuxText= await driver.findElement(By.xpath(xpath)).getText();
  expect(AuxText).to.be.equal("EVENTOS VIGENTES");
  });

When('I press the button of {string} in a test event',async (participate)=> {
    let xpath=`//*[@id="root"]/div[2]/div[1]/div/div[1]/div[2]/div[1]/div/div[2]/div/button[1]`;
    await driver.findElement(By.xpath(xpath)).click();
});

Then('I should see the {string} button',async (left)=> {
    let xpath=`//*[@id="root"]/div[2]/div[1]/div/div[1]/div[2]/div[1]/div/div[2]/div/button[1]`;
    await sleep(1000);
    let AuxText= await driver.findElement(By.xpath(xpath)).getText();
    expect(AuxText).to.be.equal("Dejar de Participar");
});

AfterAll(async () => {
    await driver.close();
});
