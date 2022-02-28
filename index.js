// const consoles = ["GB", "GBC", "GBA", "DS", "PSP", "NES", "Genesis", "SNES", "Saturn", "PS1", "N64", "Dreamcast", "PS2", "Xbox", "GameCube", "PS3", "Wii", "WiiWare"];
// const categories = ["number", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

// Testing Data...
const consoles = ["GB", "GBC", "GBA"];
const categories = ["number", "A", "B", "C"];


const scrapePage = async (gameConsole, category) => {
  const res = await fetch(`https://vimm.net/vault/?p=list&system=${gameConsole}&section=${category}`);
  const html = await res.text();

  console.log(html);
};

console.log("Starting Vimm's Scraper...\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

// Ensuring a synchronous approach

for (const gameConsole of consoles) {
  console.log(`\nStarting ${gameConsole} Downloads...\n========================================`);
  for (const category of categories) {
    console.log(`\nStarting ${gameConsole} Category ${category} Downloads...\n========================================`);
    await scrapePage(gameConsole, category);
  }
}

console.log("\nFinished Scraping!");
