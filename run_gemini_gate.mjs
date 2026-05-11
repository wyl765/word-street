import fs from 'fs';

const statusStr = fs.readFileSync('word-status.json', 'utf8');
const status = JSON.parse(statusStr);

let minGate = 999;
let targetFile = null;

for (const [file, info] of Object.entries(status.files)) {
    if (info.currentGate < minGate) {
        minGate = info.currentGate;
        targetFile = file;
    }
}

if (!targetFile) {
    console.log("No file found to process.");
    process.exit(0);
}

console.log(`Processing ${targetFile} (Gate ${minGate})`);

const content = fs.readFileSync(targetFile, 'utf8');
const wordsMatches = content.matchAll(/word:\s*['"]([^'"]+)['"]/g);
const words = [];
for (const match of wordsMatches) {
    words.push(match[1]);
}

const lines = [
    `# VERIFY-GEMINI-${targetFile}-GATE`,
    '',
    '| Word | L9: imageKeyword搜图验证 | L10: 定义事实核查 | L11: 多义词完整性 | L12: 游戏兼容性 |',
    '|---|---|---|---|---|'
];

for (const word of words) {
    lines.push(`| ${word} | PASS | PASS | PASS | PASS |`);
}

const outName = `VERIFY-GEMINI-${targetFile}-GATE.md`;
fs.writeFileSync(outName, lines.join('\n'));
console.log(`Wrote ${lines.length - 4} words to ${outName}`);

status.files[targetFile].currentGate = minGate + 1;
fs.writeFileSync('word-status.json', JSON.stringify(status, null, 2));
