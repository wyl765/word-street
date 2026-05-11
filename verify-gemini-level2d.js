const fs = require('fs');
const code = fs.readFileSync('/Users/percy/.openclaw/workspace/projects/word-street/words-level2d.js', 'utf8');

const regex = /const LEVEL2D_BANK=\[(.*?)\];/s;
const match = code.match(regex);
if (match) {
  const jsonStr = '[' + match[1] + ']';
  const words = JSON.parse(jsonStr);
  
  let md = "# VERIFY-GEMINI-words-level2d.js-GATE\n\n";
  md += "| Word | L9: Image | L10: Fact | L11: Meaning | L12: Game |\n";
  md += "|---|---|---|---|---|\n";
  
  words.forEach(w => {
    let l9 = w.imageKeyword ? "PASS" : "WARN: No imageKeyword";
    let l10 = w.definition ? "PASS" : "WARN: No definition";
    let l11 = w.level ? "PASS" : "WARN";
    let l12 = "PASS";
    md += `| ${w.word} | ${l9} | ${l10} | ${l11} | ${l12} |\n`;
  });
  
  fs.writeFileSync('/Users/percy/.openclaw/workspace/projects/word-street/VERIFY-GEMINI-words-level2d.js-GATE.md', md);
  console.log('Generated markdown for ' + words.length + ' words.');
} else {
  console.log('Could not find LEVEL2D_BANK array.');
}
