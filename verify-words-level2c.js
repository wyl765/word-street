const fs = require('fs');

const data = require('./words-level2c.js'); // Assuming we can just read it if we strip the const
const lines = fs.readFileSync('/Users/percy/.openclaw/workspace/projects/word-street/words-level2c.js', 'utf8');
const match = lines.match(/const LEVEL2C_BANK=\[(.*)\];/s);
if (match) {
    const words = JSON.parse('[' + match[1] + ']');
    console.log(`Found ${words.length} words.`);
}
