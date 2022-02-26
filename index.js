import puppeteer from "puppeteer";

console.log(-1);
const browser = await puppeteer.launch();

console.log(0);
const page = await browser.newPage();

console.log(1);
await page.goto('https://vimm.net/vault/?p=list&system=GB&section=number');

console.log(2);
await page.screenshot({ path: 'example.png' });

console.log(3);
await browser.close();
