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

console.log('Target file:', targetFile);
const wordsContent = fs.readFileSync(targetFile, 'utf8');

// The file format might be a JS module export or similar.
// We'll extract words using a regex if it's not strictly JSON.
// If it's pure JSON, we could parse it, but it ends with .js.
