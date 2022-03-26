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

Given('I am at the Start Americas Together page', function () {
    await driver.get(BaseUrl);
    await driver.manage().window().maximize();
});

Given('I have entered {string} into the email field',async (email)=> {
    await driver.findElement(By.name('email')).sendKeys(email);
});
Given('I have entered {string} into the password field', async  (password)=> {
    await driver.findElement(By.name('password')).sendKeys(password);
});

Given('I see the Start Americas Together page and events title', function () {
    let xpath = '//*[@id="root"]/div[2]/div[1]/section/div[1]/div[1]/h2';
    await sleep(1000);
    let AuxText= await driver.findElement(By.xpath(xpath)).getText();
    expect(AuxText).to.be.equal("Tus Próximos Eventos");
});

Given('I press the Proyectos button',async ()=>  {
    let xpath=` //*[@id="root"]/div[2]/header/div[2]/div/button[2]/span[1]`;
    await driver.findElement(By.xpath(xpath)).click();
});

Given('I press the Desarrollo Sostenible projects',async ()=>  {
    let xpath=`//*[@id="root"]/div[2]/div[1]/div/div[2]/div/div[2]/div/div/a/button/div`;
    await driver.findElement(By.xpath(xpath)).click();
});

Given('I see the diferent projects of Desarrollo Sostenible',async ()=> {
    let xpath=`//*[@id="root"]/div[2]/div[1]/div/div[1]/div[2]/div[1]/h3`;
    await sleep(1000);
    let AuxText= await driver.findElement(By.xpath(xpath)).getText();
    expect(AuxText).to.be.equal("Proyectos Desarrollo Sostenible");
  });

When('I choose Proyecto de demo project',async function () {
    let xpath = '/html/body/div/div[2]/div[1]/div/div[2]/div/div[1]/div[2]/div[2]/div/div/button/span[1]/div';
    await sleep(1000);
    let AuxText= await driver.findElement(By.xpath(xpath)).getText();
    expect(AuxText).to.be.equal("START Alimentacion");
});

When('I press the Unirme button',async function () {1
    let xpath=`//*[@id="479"]/button/span[1]/div`;
    await driver.findElement(By.xpath(xpath)).click();
});

Then('I should see Participando at the right corner of the project',async function () {
    // let xpath = '/html/body/div/div[2]/div[1]/div/div[2]/div/div[1]/div[2]/div[2]/div/div/button/span[1]/div';
    // await sleep(1000);
    // let AuxText= await driver.findElement(By.xpath(xpath)).getText();
    // expect(AuxText).to.be.equal("Participando");
});

AfterAll(async () => {
    await driver.close();
  });
