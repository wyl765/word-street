const fs = require('fs');
const statusPath = '/Users/percy/.openclaw/workspace/projects/word-street/word-status.json';
const status = JSON.parse(fs.readFileSync(statusPath, 'utf8'));

status.files['words-level3b.js'].currentGate = 15;
status.files['words-level3b.js'].gate9 = 'pass';
status.files['words-level3b.js'].gate10 = 'pass';
status.files['words-level3b.js'].gate11 = 'pass';
status.files['words-level3b.js'].gate12 = 'pass';

fs.writeFileSync(statusPath, JSON.stringify(status, null, 2));
