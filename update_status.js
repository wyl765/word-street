const fs = require('fs');

const statusFile = '/Users/percy/.openclaw/workspace/projects/word-street/word-status.json';
const data = JSON.parse(fs.readFileSync(statusFile, 'utf8'));

if (data.files['words-level2.js']) {
    data.files['words-level2.js'].gate6 = 'pass';
    data.summary.gate6_pending -= data.files['words-level2.js'].totalWords;
}

fs.writeFileSync(statusFile, JSON.stringify(data, null, 2));
console.log("Updated word-status.json");
