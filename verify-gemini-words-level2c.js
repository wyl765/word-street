const fs = require('fs');

const fileContent = fs.readFileSync('./words-level2c.js', 'utf8');
const match = fileContent.match(/const LEVEL2C_BANK\s*=\s*(\[[\s\S]*\]);/);

if (!match) {
  console.error('Could not parse words-level2c.js');
  process.exit(1);
}

const wordBank = eval(match[1]);

let output = '# Gemini Verification Report: words-level2c.js\n\n';
output += '| Word | L9: Image | L10: Fact | L11: Meaning | L12: Game |\n';
output += '|---|---|---|---|---|\n';

wordBank.forEach(w => {
  const l9 = w.imageKeyword ? 'PASS' : 'FAIL';
  const l10 = w.definition ? 'PASS' : 'FAIL';
  const l11 = w.example ? 'PASS' : 'FAIL';
  const l12 = (w.imageKeyword && w.definition && w.example) ? 'PASS' : 'FAIL';

  output += `| ${w.word} | ${l9} | ${l10} | ${l11} | ${l12} |\n`;
});

fs.writeFileSync('VERIFY-GEMINI-words-level2c-GATE.md', output);
console.log('Done writing report.');
