// Gate 4: Back-Translation (Definition → Guess Word)
// Method: Give AI ONLY the definition. AI guesses the word.
// If AI can't guess → definition is vague or wrong.
// If AI guesses a different word → definition matches another word better (ambiguous).
//
// Usage: node gate4-backtranslate.mjs <file>
// Output: verify/GATE4-backtranslate-<file>.json

import fs from 'fs';
import path from 'path';

const WORD_DIR = path.resolve(import.meta.dirname, '..');
const file = process.argv[2];

if (!file) { console.error('Usage: node gate4-backtranslate.mjs <words-file.js>'); process.exit(1); }

const raw = fs.readFileSync(path.join(WORD_DIR, file), 'utf8');
const bank = JSON.parse(raw.match(/\[[\s\S]*\]/)[0]);

const results = bank.map(w => ({
  word: w.word,
  definition: w.definition,
  level: w.level,
  status: 'PENDING'
}));

const outPath = path.join(WORD_DIR, 'verify', `GATE4-bt-${file.replace('.js', '')}.json`);
fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
console.log(`Generated ${results.length} back-translation items → ${outPath}`);
