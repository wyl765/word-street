const fs = require('fs');
let s = JSON.parse(fs.readFileSync('word-status.json'));
s.files['words-level2b.js'].currentGate = 4;
fs.writeFileSync('word-status.json', JSON.stringify(s, null, 2));
