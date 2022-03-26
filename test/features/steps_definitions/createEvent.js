// //cucumber
// const { Given, When, Then, AfterAll } = require('@cucumber/cucumber');
// const { Builder, By, Capabilities, Key } = require('selenium-webdriver');
// const { expect } = require('chai'); 

// require("chromedriver");

// // driver setup
// const capabilities = Capabilities.chrome();
// capabilities.set('chromeOptions', { "w3c": false });
// const driver = new Builder().withCapabilities(capabilities).build();
// let BaseUrl="https://dev-front-startamericas.web.app/login"

// Given('I am logged in the Start Americas Together page', {timeout: 2 * 5000}, async function () {
//     await driver.get(BaseUrl);
//     await driver.manage().window().maximize();
//     await driver.findElement(By.name('email')).sendKeys('lider.auxiliar@start.auxiliar.com');
//     await driver.findElement(By.name('password')).sendKeys('lideraux1');
//     let xpath ='/html/body/div/div[2]/div[1]/div/div[2]/div[2]/div/form/div/button/span[1]';
//     await driver.findElement(By.xpath(xpath)).click();
// });

// Given('I see the Start Americas Together page',async function () {
//     let xpath = '//*[@id="root"]/div[2]/header';
//     await driver.findElement(By.xpath(xpath)).getText();
// });

// // Given('I scroll the page',async function () {
// //     await driver.executeScript("window.scrollBy(0,1000)");
// // });

// When('I click on the Eventos button',async function () {
//     // let xpath='//*[@id="root"]/div[2]/header/div[2]/div/button[3]/span[1]/span';
//     let url='https://dev-front-startamericas.web.app/eventos';
//     // await driver.findElement(By.xpath(xpath)).click();
//     await driver.get(url);
// });

// When('I should see the events page',async function() {
//     let xpath='/html/body/div[1]/div[2]/div[1]/div/div[1]/div[1]/div[2]/h1[1]/h3';
//     await driver.findElement(By.xpath(xpath)).getText();
//     // await driver.findElement(By.className('MuiTypography-root MuiTypography-h2 MuiTypography-gutterBottom').getText());
// });

// When('I click on Crear Evento Button',async function () {
//     time.sleep(3);
//     let xpath = '/html/body/div[1]/div[2]/div[1]/div/div[1]/div[1]/div[3]/div[2]/button[1]';
//     await driver.findElement(By.xpath(xpath)).click();
//   });

//   When('I fill {string}, {string},{string} and {string} in the event card',async function (name, description, place, date) {
//     await driver.findElement(By.name('nombre_evento')).sendKeys(name);
//     await driver.findElement(By.name('descripcion_evento')).sendKeys(description);
//     await driver.findElement(By.name('lugar_evento')).sendKeys(place);
//     await driver.findElement(By.name('fecha_evento')).sendKeys(date);
//   });

//   When('I click on Guardar Evento',async function () {
//     let xpath = '/html/body/div[5]/div/div[1]/div/div/form/div[11]/button[1]';
//     await driver.findElement(By.xpath(xpath)).click();
//   });

//   Then('I can see the event created on the Eventos page',async function () {
//     await driver.quit();
//   });

//   AfterAll(async () => {
//     await driver.close();
//   });