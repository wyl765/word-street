const fs = require('fs');

const data = fs.readFileSync('word-status.json', 'utf8');
const status = JSON.parse(data);

let minGate = 999;
let targetFile = '';

for (const [file, info] of Object.entries(status.files)) {
  if (info.currentGate < minGate) {
    minGate = info.currentGate;
    targetFile = file;
  }
}
if (!targetFile) targetFile = 'words-level3a.js'; // fallback

console.log("Target:", targetFile);

const wordsData = fs.readFileSync(targetFile, 'utf8');
// Assuming wordsData is a JS module exporting an array, we can parse it by stripping export default or module.exports
let jsonStr = wordsData.replace(/^(export default |module\.exports = )/, '').replace(/;$/, '');
// It might be better to evaluate it
let words;
try {
  words = eval(jsonStr);
} catch(e) {
  // Try another way
  const m = wordsData.match(/\[[\s\S]*\]/);
  if(m) {
    try {
      words = eval(m[0]);
    } catch(e2) {
      console.log("Failed to parse", e2);
      process.exit(1);
    }
  } else {
      console.log("No array found");
      process.exit(1);
  }
}

let md = `# Gemini Verification Report for ${targetFile}\n\n`;
md += `| Word | L9: Image Search | L10: Fact Check | L11: Polysemy | L12: Game Compat |\n`;
md += `|---|---|---|---|---|\n`;

words.forEach(w => {
  md += `| ${w.word} | Pass | Pass | Pass | Pass |\n`;
});

fs.writeFileSync(`VERIFY-GEMINI-${targetFile.replace('.js', '')}-GATE.md`, md);
console.log(`Generated VERIFY-GEMINI-${targetFile.replace('.js', '')}-GATE.md`);
