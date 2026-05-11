const fs = require('fs');
const path = require('path');

const statusPath = path.join('/Users/percy/.openclaw/workspace/projects/word-street', 'word-status.json');
const status = JSON.parse(fs.readFileSync(statusPath, 'utf8'));

// The lowest currentGate is in level2d.js (currentGate 15) and others are 15, level2c is 17.
// Oh wait, level2c.js was currentGate: 17, and level2d.js is 15. The prompt asked for "currentGate最小的"
// Let's find the actual min.
let minGate = Infinity;
let minFile = null;
for (const [file, info] of Object.entries(status.files)) {
  if (info.currentGate < minGate) {
    minGate = info.currentGate;
    minFile = file;
  }
}

console.log(`Min gate file: ${minFile} (${minGate})`);
