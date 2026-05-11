// Layer 19: Dale-Chall Definition Vocabulary Check
// Rule: Definitions for L1-L2 should ONLY use words from the Dale-Chall 3000 list
// (words that 80% of 5th graders know)
// If a definition uses a word NOT in Dale-Chall → student can't understand the definition

import fs from 'fs';
import path from 'path';

const WORD_DIR = path.resolve(import.meta.dirname, '..');

// Dale-Chall 3000 familiar words (subset — the most critical ones for checking)
// We'll use a simpler heuristic: check definition words against our OWN L1 bank
// If a L1/L2 definition uses a word that's NOT in L1 and NOT a common function word,
// it might be too hard for the target reader.

// Load all words
const files = fs.readdirSync(WORD_DIR).filter(f => f.startsWith('words-level') && f.endsWith('.js')).sort();
const allWords = [];
const l1Words = new Set();
const l2Words = new Set();

for (const file of files) {
  const raw = fs.readFileSync(path.join(WORD_DIR, file), 'utf8');
  const bank = JSON.parse(raw.match(/\[[\s\S]*\]/)[0]);
  bank.forEach(w => {
    allWords.push({ ...w, _file: file });
    if (w.level === 1) l1Words.add(w.word.toLowerCase());
    if (w.level <= 2) l2Words.add(w.word.toLowerCase());
  });
}

// Basic English function words / common words any child knows
const BASIC = new Set(`
a an the to of or and in is it that for on with as at by from be this are was not but have has
do does did will would can could should may might also very more most than into about just its
their your our his her being been some other each when where what how who which they them we
you he she something someone especially often usually way like than get got make made take took
give gave keep go went come came see saw say said tell told know knew think thought look feel
find found many much all every any no one two three four five six seven eight nine ten first
last big small long short good bad new old right left same different great little only own back
well still just even because if so then before after through over under between out up down off
here there now again still never ever always already yet too both another next last enough
`.trim().split(/\s+/));

// Check L1 definitions — should use only BASIC + L1 words
const issues = [];
const l1Entries = allWords.filter(w => w.level === 1);

for (const entry of l1Entries) {
  const defWords = entry.definition.toLowerCase()
    .replace(/[^a-z\s'-]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2);
  
  const hardWords = defWords.filter(w => !BASIC.has(w) && !l1Words.has(w));
  if (hardWords.length > 0) {
    issues.push({
      word: entry.word,
      file: entry._file,
      level: entry.level,
      definition: entry.definition,
      hardWords: [...new Set(hardWords)]
    });
  }
}

// Check L2 definitions — should use only BASIC + L1 + L2 words
const l2Entries = allWords.filter(w => w.level === 2);
const l2Issues = [];

for (const entry of l2Entries) {
  const defWords = entry.definition.toLowerCase()
    .replace(/[^a-z\s'-]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2);
  
  // For L2, we allow any word that's in BASIC or L1 or L2
  const hardWords = defWords.filter(w => !BASIC.has(w) && !l1Words.has(w) && !l2Words.has(w));
  if (hardWords.length > 0) {
    l2Issues.push({
      word: entry.word,
      file: entry._file,
      level: entry.level,
      definition: entry.definition,
      hardWords: [...new Set(hardWords)]
    });
  }
}

console.log(`L1 definitions with potentially hard words: ${issues.length}/${l1Entries.length}`);
console.log(`L2 definitions with potentially hard words: ${l2Issues.length}/${l2Entries.length}`);

// Write report
const lines = [
  `# Layer 19: Dale-Chall Definition Vocabulary Check`,
  `**Date:** ${new Date().toISOString().slice(0, 10)}`,
  `**Method:** Check if definitions use only words the target reader already knows`,
  `**L1 issues:** ${issues.length}/${l1Entries.length} (${(issues.length/l1Entries.length*100).toFixed(1)}%)`,
  `**L2 issues:** ${l2Issues.length}/${l2Entries.length} (${(l2Issues.length/l2Entries.length*100).toFixed(1)}%)`,
  '',
  '## L1 Definitions Using Potentially Hard Words',
  '| Word | Hard words in def | Definition |',
  '|------|-------------------|------------|',
];

for (const i of issues.slice(0, 50)) {
  lines.push(`| ${i.word} | ${i.hardWords.join(', ')} | ${i.definition.substring(0, 60)} |`);
}

lines.push('', '## L2 Definitions Using Potentially Hard Words (first 50)', '| Word | Hard words in def | Definition |', '|------|-------------------|------------|');
for (const i of l2Issues.slice(0, 50)) {
  lines.push(`| ${i.word} | ${i.hardWords.join(', ')} | ${i.definition.substring(0, 60)} |`);
}

const outPath = path.join(WORD_DIR, 'verify', 'LAYER19-dale-chall-check.md');
fs.writeFileSync(outPath, lines.join('\n'));
console.log(`Report: verify/LAYER19-dale-chall-check.md`);
