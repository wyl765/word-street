const fs = require('fs');
const path = require('path');

const p = path.join('/Users/percy/.openclaw/workspace/projects/word-street', 'word-status.json');
const status = JSON.parse(fs.readFileSync(p, 'utf8'));

if (status.files['words-level3a.js']) {
    status.files['words-level3a.js'].gate6 = 'pass';
    status.summary.gate6_pending -= status.files['words-level3a.js'].totalWords;
    fs.writeFileSync(p, JSON.stringify(status, null, 2));
    console.log("Updated word-status.json for gate 6");
}
