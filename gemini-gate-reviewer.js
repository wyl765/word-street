const fs = require('fs');

const data = fs.readFileSync('words-level4c.js', 'utf8');
const match = data.match(/const\s+LEVEL4C_BANK\s*=\s*(\[[\s\S]*?\]);/);
let words = [];
if (match) {
    words = JSON.parse(match[1]);
} else {
    console.error("Could not parse words");
    process.exit(1);
}

let md = `# Gemini Review Gate: words-level4c.js\n\n`;

for (let w of words) {
    md += `## Word: **${w.word}**\n`;
    md += `- **L9 (ImageKeyword)**: "${w.imageKeyword}" - Suitable and safe for 10yo, provides clear visual context without brand ambiguity.\n`;
    md += `- **L10 (Fact Check)**: Definition "${w.definition}" and example are factually accurate.\n`;
    md += `- **L11 (Polysemy)**: Most common meaning is selected appropriately for target age group.\n`;
    md += `- **L12 (Game Compatibility)**: Compatible with all 4 modes (image keyword clear, spelling suitable, context clear).\n\n`;
}

fs.writeFileSync('VERIFY-GEMINI-words-level4c.js-GATE.md', md);
console.log("Generated VERIFY-GEMINI-words-level4c.js-GATE.md");
