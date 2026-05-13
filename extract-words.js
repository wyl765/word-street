const fs = require('fs');
const path = require('path');
const glob = require('child_process').execSync('ls words-level*.js', {cwd: __dirname, encoding:'utf8'}).trim().split('\n');

const allWords = new Map(); // word -> level(s)

for (const file of glob) {
  const content = fs.readFileSync(path.join(__dirname, file), 'utf8');
  // Extract the array using regex - find everything between [ and ];
  const match = content.match(/\[[\s\S]*\]/);
  if (!match) { console.error('No array found in', file); continue; }
  
  let arr;
  try { arr = JSON.parse(match[0]); } catch(e) {
    // Try eval approach
    const m2 = content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);/);
    if (m2) {
      try { arr = eval(m2[1]); } catch(e2) { console.error('Parse failed for', file, e2.message); continue; }
    } else { console.error('Could not parse', file); continue; }
  }
  
  const levelMatch = file.match(/level(\d+\w?)/i);
  const level = levelMatch ? levelMatch[1] : 'unknown';
  
  for (const item of arr) {
    if (item.word) {
      const w = item.word.toLowerCase().trim();
      if (!allWords.has(w)) allWords.set(w, []);
      allWords.get(w).push(level);
    }
  }
  console.log(`${file}: ${arr.length} words, level ${level}`);
}

// Write all words
const words = [...allWords.keys()].sort();
fs.writeFileSync(path.join(__dirname, 'all-words.txt'), words.join('\n') + '\n');

// Write word-to-level mapping
const mapping = {};
for (const [w, levels] of allWords) mapping[w] = levels;
fs.writeFileSync(path.join(__dirname, 'word-level-map.json'), JSON.stringify(mapping, null, 2));

console.log(`\nTotal unique words: ${words.length}`);
