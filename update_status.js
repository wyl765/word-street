const fs = require('fs');
const data = JSON.parse(fs.readFileSync('word-status.json', 'utf8'));

if (data.files['words-level2c.js']) {
  data.files['words-level2c.js'].gate6 = 'pass';
  data.summary.gate6_pending -= data.files['words-level2c.js'].totalWords;
  data.summary.allGatesClear += data.files['words-level2c.js'].totalWords;
}

fs.writeFileSync('word-status.json', JSON.stringify(data, null, 2));
console.log('Status updated.');
