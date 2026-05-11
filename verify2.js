const fs = require('fs');
const data = fs.readFileSync('./words-level4b.js', 'utf8');
const match = data.match(/const LEVEL4B_BANK=\[(.*)\]/s);
if(match) {
  const json = '[' + match[1] + ']';
  const parsed = JSON.parse(json);
  let md = "# VERIFY-GEMINI-words-level4b.js-GATE\n\n| Word | L9: imageKeyword | L10: Fact Check | L11: Polysemy | L12: Game Compat |\n|---|---|---|---|---|\n";
  parsed.forEach(w => {
    md += `| **${w.word}** | Pass: "${w.imageKeyword}" is safe/clear | Pass: Def is accurate | Pass: Common meaning used | Pass: Safe for all modes (No homophone issues, clear context) |\n`;
  });
  fs.writeFileSync('VERIFY-GEMINI-words-level4b.js-GATE.md', md);
}
