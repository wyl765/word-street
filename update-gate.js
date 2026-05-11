const fs = require('fs');
const file = '/Users/percy/.openclaw/workspace/projects/word-street/word-status.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

['words-level2a.js', 'words-level2b.js', 'words-level2c.js', 'words-level2d.js'].forEach(k => {
  data.files[k].currentGate = 15;
});

fs.writeFileSync(file, JSON.stringify(data, null, 2));
