const fs = require('fs');
const status = JSON.parse(fs.readFileSync('word-status.json', 'utf8'));

// Update all remaining files we processed to gate 14
['words-level4c.js', 'words-level5a.js', 'words-level5b.js', 'words-level5c.js', 'words-level5d.js'].forEach(file => {
  status.files[file].currentGate = 14;
});

fs.writeFileSync('word-status.json', JSON.stringify(status, null, 2));
