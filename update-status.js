const fs = require('fs');
let data = JSON.parse(fs.readFileSync('word-status.json'));

data.files['words-level2c.js'].currentGate = 13;
data.files['words-level2d.js'].currentGate = 13;

fs.writeFileSync('word-status.json', JSON.stringify(data, null, 2));
