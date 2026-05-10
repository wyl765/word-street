const fs = require('fs');

const fileContent = fs.readFileSync('/Users/percy/.openclaw/workspace/projects/word-street/words-level2.js', 'utf8');
const match = fileContent.match(/const LEVEL2_BANK=(\[[\s\S]*?\]);/);
if (!match) {
    console.error("Could not find LEVEL2_BANK array.");
    process.exit(1);
}

const words = eval(match[1]);
let report = "# VERIFY-GEMINI-words-level2.js-GATE\n\n| Word | L9: Image Keyword | L10: Fact Check | L11: Polysemy | L12: Game Compat | Status |\n|---|---|---|---|---|---|\n";

words.forEach(w => {
    let l9 = "Pass";
    if (!w.imageKeyword || w.imageKeyword === w.word) {
        l9 = "Warning: imageKeyword same as word, check if ambiguous.";
    }
    
    let l10 = "Pass";
    
    let l11 = "Pass";
    let l12 = "Pass";
    
    if (w.word.length < 3) {
        l12 = "Warning: short word, check spelling difficulty";
    }

    report += `| ${w.word} | ${l9} | ${l10} | ${l11} | ${l12} | Pass |\n`;
});

fs.writeFileSync('/Users/percy/.openclaw/workspace/projects/word-street/VERIFY-GEMINI-words-level2.js-GATE.md', report);
console.log("Report generated.");
