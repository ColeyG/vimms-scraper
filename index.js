import { JSDOM } from "jsdom";
import puppeteer from "puppeteer";

const browser = await puppeteer.launch({ headless: false });

// const consoles = ["GB", "GBC", "GBA", "DS", "PSP", "NES", "Genesis", "SNES", "Saturn", "PS1", "N64", "Dreamcast", "PS2", "Xbox", "GameCube", "PS3", "Wii", "WiiWare"];
// const categories = ["number", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

// Testing Data...
const consoles = ["GB", "GBC", "GBA"];
const categories = ["number", "A", "B", "C"];

const fetchAndDownload = async (vaultLink, gameConsole, category) => {
  const page = await browser.newPage();
  await page.goto(`https://vimm.net${vaultLink}`, { timeout: 0 });

  const form = await page.waitForSelector('#download_form');

  await page._client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: `./data/${gameConsole}/${category}`
  });

  // TODO: Set the form method to get and clear the on submit

  await page.click('#download_form button');

  // await page.close();
}

const scrapeCategoryPage = async (gameConsole, category) => {
  const res = await fetch(`https://vimm.net/vault/?p=list&system=${gameConsole}&section=${category}`);
  const html = await res.text();
  const dom = new JSDOM(html);

  for (const table of dom.window.document.querySelectorAll('.hovertable')) {
    for (const game of table.querySelectorAll("td:first-of-type a:first-of-type")) {
      console.log(`Downloading: ${game.innerHTML}`);
      await fetchAndDownload(game.href, gameConsole, category);
    }
  }
};

console.log("Starting Vimm's Scraper...\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

// Ensuring a synchronous approach
for (const gameConsole of consoles) {
  console.log(`\nStarting ${gameConsole} Downloads...\n========================================`);
  for (const category of categories) {
    console.log(`\nStarting ${gameConsole} Category ${category} Downloads...\n========================================`);
    await scrapeCategoryPage(gameConsole, category);
  }
}

console.log("\nFinished Scraping!");
