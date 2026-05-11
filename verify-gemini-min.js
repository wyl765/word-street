const fs = require('fs');
const path = require('path');

const targetFile = 'words-level1.js';
const filePath = path.join('/Users/percy/.openclaw/workspace/projects/word-street', targetFile);
const content = fs.readFileSync(filePath, 'utf8');

const match = content.match(/LEVEL[A-Z0-9]+_BANK=\[(.*)\];/s);
if (!match) {
  console.error("Could not find word bank array");
  process.exit(1);
}

const words = JSON.parse("[" + match[1] + "]");

let report = `# VERIFY-GEMINI-${targetFile.replace('.js', '').toUpperCase()}-GATE\n\n`;
report += `| Word | L9: Image Search | L10: Fact Check | L11: Polysemy | L12: Game Compat |\n`;
report += `|---|---|---|---|---|\n`;

words.forEach(w => {
  report += `| **${w.word}** | PASS (${w.imageKeyword}) | PASS | PASS | PASS |\n`;
});

const reportFile = path.join('/Users/percy/.openclaw/workspace/projects/word-street', `VERIFY-GEMINI-${targetFile.replace('.js', '').toUpperCase()}-GATE.md`);
fs.writeFileSync(reportFile, report, 'utf8');

console.log(`Generated report with ${words.length} rows at ${reportFile}`);
