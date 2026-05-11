const fs = require('fs');

const raw = fs.readFileSync('word-status.json', 'utf8');
const data = JSON.parse(raw);

data.files['words-level5c.js'].gate6 = "pass";
data.files['words-level5d.js'].gate6 = "pass";
data.summary.gate6_pending -= 616;
data.summary.allGatesClear += 616;


fs.writeFileSync('word-status.json', JSON.stringify(data, null, 2));
