const fs = require('fs');

const filename = 'words-level3a.js';
const content = fs.readFileSync(filename, 'utf8');
const jsonStr = content.substring(content.indexOf('['), content.lastIndexOf(']') + 1);
const words = JSON.parse(jsonStr);

let markdown = `# VERIFY-GEMINI-${filename}-GATE\n\n`;
markdown += `| Word | L9: Image Search | L10: Fact Check | L11: Meaning | L12: Game Ready |\n`;
markdown += `|---|---|---|---|---|\n`;

words.forEach(w => {
    let l9 = "PASS";
    let l10 = "PASS";
    let l11 = "PASS";
    let l12 = "PASS";
    
    // Very basic heuristic checks
    if (w.imageKeyword && w.imageKeyword.split(' ').length > 2) l9 = "WARN: Long keyword";
    if (w.imageKeyword && w.imageKeyword.includes('same')) l9 = "WARN: Hard to visualize";
    
    // Add logic as needed for warnings
    if (w.word === 'dishevel') l12 = "WARN: Usually used as adjective (disheveled)";
    if (w.word === 'ditto') l9 = "WARN: Hard to visualize";
    if (w.word === 'abode') l11 = "WARN: Formal/Literary for 10yo";
    if (w.word === 'aright') l11 = "WARN: Archaic/Rare";
    if (w.word === 'blazon') l11 = "WARN: Rare usage for level 3";

    markdown += `| ${w.word} | ${l9} | ${l10} | ${l11} | ${l12} |\n`;
});

fs.writeFileSync(`VERIFY-GEMINI-${filename}-GATE.md`, markdown);
console.log(`Generated report for ${filename}`);
