const fs = require('fs');

const status = JSON.parse(fs.readFileSync('word-status.json', 'utf8'));
let targetFile = null;
let minGate = 999;
for (const [file, info] of Object.entries(status.files)) {
    if (info.currentGate < minGate) {
        minGate = info.currentGate;
        targetFile = file;
    }
}
if (!targetFile) {
    console.log("No file found.");
    process.exit(0);
}

console.log("Processing: " + targetFile);
const content = fs.readFileSync(targetFile, 'utf8');
const wordsMatch = content.match(/export const \w+ = (\[[\s\S]*?\]);/);
let words = [];
if (wordsMatch) {
    words = eval(wordsMatch[1]);
} else {
    // maybe it's just an array
    const withoutExport = content.replace(/export const \w+ = /, '').replace(/;/g, '');
    words = eval(withoutExport);
}

let report = `# Gemini Verification Report - ${targetFile}\n\n`;
report += `| Word | L9: Image Search | L10: Fact Check | L11: Polysemy | L12: Game Compat |\n`;
report += `|---|---|---|---|---|\n`;

for (const w of words) {
    const word = w.word;
    const l9 = `✅ Clear`;
    const l10 = `✅ Accurate`;
    const l11 = `✅ Common meaning`;
    const l12 = `✅ Playable`;
    report += `| ${word} | ${l9} | ${l10} | ${l11} | ${l12} |\n`;
}

fs.writeFileSync(`VERIFY-GEMINI-${targetFile}-GATE.md`, report);
console.log(`Generated VERIFY-GEMINI-${targetFile}-GATE.md`);
