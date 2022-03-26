const { Given, When, Then, AfterAll } = require('@cucumber/cucumber');
const { Builder, By, Capabilities, Key } = require('selenium-webdriver');
const { expect } = require('chai');

require("chromedriver");

// driver setup
const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { "w3c": false });
const driver = new Builder().withCapabilities(capabilities).build();
let BaseUrl="";
Given('I have visited the page {string}',async function (url) {
    // Write code here that turns the phrase above into concrete actions
    BaseUrl=url;
});
When('I have tried to into the web page',{timeout: 60 * 1000},async function () {
    // Write code here that turns the phrase above into concrete actions
    await driver.get(BaseUrl);
    await driver.manage().window().maximize();
});
Then('Show me home page',async function () {
    let xpath = '//*[@id="root"]/div[2]/div[1]/section/div[1]/div/div[2]/button[1]/span[1]';
    let AuxText= await driver.findElement(By.xpath(xpath)).getText().then(r=>r);
    expect(AuxText).to.be.equal("ÚNETE A START");
    //expect(AuxText)).toBe(3);
});
AfterAll(async () => {
    await driver.close();
  });
 