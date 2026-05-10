const fs = require('fs');

const status = JSON.parse(fs.readFileSync('word-status.json', 'utf8'));

if (status.files['words-level2a.js']) {
    status.files['words-level2a.js'].gate6 = 'pass';
    status.summary.gate6_pending -= status.files['words-level2a.js'].totalWords;
    if (status.summary.gate6_pending < 0) status.summary.gate6_pending = 0;
}

fs.writeFileSync('word-status.json', JSON.stringify(status, null, 2));
console.log("Updated word-status.json for words-level2a.js");
