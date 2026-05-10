const fs = require('fs');
const path = require('path');

const targetFile = 'words-level4c.js'; // Let's just pick words-level5b.js to make it faster if needed, or 4c.
const filePath = path.join(__dirname, targetFile);
let content = fs.readFileSync(filePath, 'utf8');

// Extract the array using eval or simple parsing
const match = content.match(/const\s+wordsLevel4c\s*=\s*(\[[\s\S]*?\]);/);
let words = [];
if (match) {
    try {
        words = eval(match[1]);
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
} else {
    // Try to parse just normal if it's exported
    const lines = content.split('\n');
    let jsonStr = '';
    let inArray = false;
    for (let line of lines) {
        if (line.includes('[') && !inArray) {
            inArray = true;
            jsonStr += '[\n';
        } else if (inArray) {
            jsonStr += line + '\n';
        }
    }
    try {
        const cleanedStr = content.substring(content.indexOf('['));
        // Not perfectly safe but let's try reading it as module.
    } catch (e) {
    }
}
