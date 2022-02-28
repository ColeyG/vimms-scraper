import { JSDOM } from "jsdom";

// const consoles = ["GB", "GBC", "GBA", "DS", "PSP", "NES", "Genesis", "SNES", "Saturn", "PS1", "N64", "Dreamcast", "PS2", "Xbox", "GameCube", "PS3", "Wii", "WiiWare"];
// const categories = ["number", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

// Testing Data...
const consoles = ["GB", "GBC", "GBA"];
const categories = ["number", "A", "B", "C"];

// https://download2.vimm.net/download/?mediaId=38840&alt=0

const fetchAndDownload = async (vaultLink) => {
  const res = await fetch(`https://vimm.net${vaultLink}`);
  const html = await res.text();
  const dom = new JSDOM(html);

  const form = dom.window.document.querySelector('#download_form');

  // form.querySelector('button').click();
  console.log(form);
}

const scrapeCategoryPage = async (gameConsole, category) => {
  const res = await fetch(`https://vimm.net/vault/?p=list&system=${gameConsole}&section=${category}`);
  const html = await res.text();
  const dom = new JSDOM(html);

  for (const table of dom.window.document.querySelectorAll('.hovertable')) {
    for (const game of table.querySelectorAll("td:first-of-type a:first-of-type")) {
      console.log(`Downloading: ${game.innerHTML}`);
      await fetchAndDownload(game.href);
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
