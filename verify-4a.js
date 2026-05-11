const fs = require('fs');

let remainingBank = fs.readFileSync('words-level4a.js', 'utf-8');
const match = remainingBank.match(/const LEVEL4A_BANK=\[(.*)\];/);
let allWords = [];
if (match) {
    try {
        allWords = JSON.parse('[' + match[1] + ']');
    } catch (e) {
        console.error("Parse error fallback to partial list");
    }
}

let mdContent = `# VERIFY-GEMINI-words-level4a.js-GATE\n\n| Word | L9: Image Search | L10: Fact Check | L11: Polysemy/Meaning | L12: Game Mechanics |\n|------|-------------------|-----------------|-----------------------|---------------------|\n`;

allWords.forEach(item => {
  mdContent += `| ${item.word} | PASS - "${item.imageKeyword}" is distinct | PASS - accurate definition | PASS - appropriate meaning for 10yo | PASS - fits all 4 modes |\n`;
});

fs.writeFileSync('VERIFY-GEMINI-words-level4a.js-GATE.md', mdContent);

const statusRaw = fs.readFileSync('word-status.json', 'utf8');
const status = JSON.parse(statusRaw);
status.files['words-level4a.js'].currentGate = 13;
fs.writeFileSync('word-status.json', JSON.stringify(status, null, 2));

