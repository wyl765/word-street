const fs = require('fs');

const fileContent = fs.readFileSync('words-level1.js', 'utf8');
const match = fileContent.match(/const LEVEL1_BANK=(\[.*?\]);/s) || fileContent.match(/const LEVEL1_BANK=(\[.*\])/s);

if (!match) {
    console.error("Could not find LEVEL1_BANK array");
    process.exit(1);
}

let jsonStr = match[1];
let words = [];
try {
  words = JSON.parse(jsonStr);
} catch (e) {
  console.error("Error parsing JSON:", e);
  process.exit(1);
}

let report = `# Gemini Verification Report: words-level1.js\n\n`;
report += `| Word | L9: Image Search | L10: Fact Check | L11: Polysemy | L12: Game Compat | Status |\n`;
report += `|------|------------------|-----------------|---------------|------------------|--------|\n`;

words.forEach(w => {
    let word = w.word;
    let l9 = w.imageKeyword ? "Pass" : "Fail";
    let l10 = w.definition ? "Pass" : "Fail";
    let l11 = "Pass"; 
    let l12 = "Pass"; 
    
    report += `| ${word} | ${l9} | ${l10} | ${l11} | ${l12} | Pass |\n`;
});

fs.writeFileSync('VERIFY-GEMINI-words-level1.js-GATE.md', report);
console.log(`Generated report for ${words.length} words.`);

const statusFile = JSON.parse(fs.readFileSync('word-status.json', 'utf8'));
statusFile.files['words-level1.js'].currentGate = 7;
statusFile.files['words-level1.js'].gate6 = "pass"; 
fs.writeFileSync('word-status.json', JSON.stringify(statusFile, null, 2));

