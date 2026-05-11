// Gate 2: Reverse Cloze Test
// Method: Give AI the example sentence with the word blanked out + 4 options. 
// If AI can't pick the right answer → example is weak.
// If AI picks wrong → definition/example mismatch.
//
// Usage: node gate2-cloze.mjs <file> [startIdx] [count]
// Output: verify/GATE2-cloze-<file>.json

import fs from 'fs';
import path from 'path';

const WORD_DIR = path.resolve(import.meta.dirname, '..');
const file = process.argv[2];
const startIdx = parseInt(process.argv[3] || '0');
const count = parseInt(process.argv[4] || '9999');

if (!file) { console.error('Usage: node gate2-cloze.mjs <words-file.js>'); process.exit(1); }

const raw = fs.readFileSync(path.join(WORD_DIR, file), 'utf8');
const bank = JSON.parse(raw.match(/\[[\s\S]*\]/)[0]);
const subset = bank.slice(startIdx, startIdx + count);

// Build distractor pool per level from ALL files
const allFiles = fs.readdirSync(WORD_DIR).filter(f => f.startsWith('words-level') && f.endsWith('.js'));
const allWords = {};
for (const f of allFiles) {
  const r = fs.readFileSync(path.join(WORD_DIR, f), 'utf8');
  const b = JSON.parse(r.match(/\[[\s\S]*\]/)[0]);
  for (const w of b) {
    if (!allWords[w.level]) allWords[w.level] = [];
    allWords[w.level].push(w.word);
  }
}

function getDistractors(word, level) {
  const pool = allWords[level] || allWords[2];
  const filtered = pool.filter(w => w !== word);
  const shuffled = filtered.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

function blankWord(example, word) {
  // Handle multi-word phrases and inflected forms
  const stem = word.replace(/(e?s|ed|ing|ly)$/, '');
  const re = new RegExp(`\\b${stem.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}\\w*\\b`, 'gi');
  return example.replace(re, '______');
}

const results = [];
for (const w of subset) {
  const blanked = blankWord(w.example, w.word);
  if (blanked === w.example) {
    // Word not found in example — skip (Gate 6 catches this)
    results.push({ word: w.word, status: 'SKIP', reason: 'word not in example' });
    continue;
  }
  const distractors = getDistractors(w.word, w.level);
  const options = [w.word, ...distractors].sort(() => Math.random() - 0.5);
  
  results.push({
    word: w.word,
    definition: w.definition,
    blanked,
    options,
    correctAnswer: w.word,
    status: 'PENDING'
  });
}

const outPath = path.join(WORD_DIR, 'verify', `GATE2-cloze-${file.replace('.js', '')}.json`);
fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
console.log(`Generated ${results.length} cloze items → ${outPath}`);
console.log(`SKIP: ${results.filter(r => r.status === 'SKIP').length}`);
console.log(`PENDING: ${results.filter(r => r.status === 'PENDING').length}`);
