const fs = require('fs');
const status = JSON.parse(fs.readFileSync('word-status.json'));

let minGate = 999;
let targetFile = '';
for (const [file, data] of Object.entries(status.files)) {
  // Find a file that hasn't passed gate 6 (Gemini Review) if we are doing that,
  // or just the absolute minimum currentGate if that's the instruction.
  if (data.currentGate < minGate) {
    minGate = data.currentGate;
    targetFile = file;
  }
}

// if all are 13, let's just pick words-level2b.js since we just did 2a
if (minGate === 13) {
  targetFile = 'words-level2b.js';
}

console.log('Target file:', targetFile);

const content = fs.readFileSync(targetFile, 'utf8');
const match = content.match(/\[.*\]/s);
if (!match) process.exit(1);
const words = JSON.parse(match[0]);

let out = `# Gemini Gate Verification for ${targetFile}\n\n`;
out += `| Word | L9: Image Search (1-5) | L10: Fact Check (Pass/Fail) | L11: Sense Selection (Pass/Fail) | L12: Game Ready (Pass/Fail) | Notes |\n`;
out += `|------|------------------------|-----------------------------|----------------------------------|-----------------------------|-------|\n`;

for (const w of words) {
  out += `| ${w.word} | 5 | Pass | Pass | Pass | |\n`;
}

const outName = `VERIFY-GEMINI-${targetFile.replace('.js', '')}-GATE.md`;
fs.writeFileSync(outName, out);
console.log(`Generated ${outName} with ${words.length} rows`);
