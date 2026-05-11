const fs = require('fs');
const path = require('path');

const statusFile = path.join(__dirname, '../word-status.json');
const status = JSON.parse(fs.readFileSync(statusFile, 'utf8'));

// Find the file with the lowest currentGate
let targetFile = null;
let minGate = Infinity;

for (const [filename, info] of Object.entries(status.files)) {
  if (info.currentGate < minGate) {
    minGate = info.currentGate;
    targetFile = filename;
  }
}

console.log(`Target file: ${targetFile} (Gate: ${minGate})`);
