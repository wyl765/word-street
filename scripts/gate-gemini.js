const fs = require('fs');

const status = JSON.parse(fs.readFileSync('word-status.json', 'utf8'));

let targetFile = null;
let minGate = 999;

for (const file in status.files) {
  if (status.files[file].currentGate < minGate) {
    minGate = status.files[file].currentGate;
    targetFile = file;
  }
}

console.log(targetFile);
