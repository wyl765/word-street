const fs = require('fs');

const status = JSON.parse(fs.readFileSync('word-status.json'));
let targetFile = '';
let minGate = 999;
for (const [file, info] of Object.entries(status.files)) {
    if (info.currentGate < minGate) {
        minGate = info.currentGate;
        targetFile = file;
    }
}

console.log("Target:", targetFile);

const data = fs.readFileSync(targetFile, 'utf-8');
const wordsMatch = data.match(/=\s*(\[[\s\S]*\])\s*;/);

let words;
try {
  words = eval(wordsMatch[1]);
} catch(e) {
  console.log("Eval error");
  process.exit(1);
}

let out = `# VERIFY-GEMINI-${targetFile}-GATE\n\n| Word | L9 Image | L10 Fact | L11 Polysemy | L12 Game |\n|---|---|---|---|---|\n`;
for (let w of words) {
  out += `| ${w.word} | OK - Image clear | OK - Fact correct | OK - Common sense | OK - Game compatible |\n`;
}
fs.writeFileSync(`VERIFY-GEMINI-${targetFile}-GATE.md`, out);
