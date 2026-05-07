#!/usr/bin/env node
/**
 * Distractor Generation Test
 * Tests: if we show a definition + 4 word choices, can the correct answer be clearly identified?
 * If the definition is ambiguous, multiple words could fit → problem.
 */
import fs from 'fs';
import path from 'path';

const DIR = path.dirname(new URL(import.meta.url).pathname);
const files = fs.readdirSync(DIR).filter(f => f.match(/^words-level[12]\.js$/)).sort();
const entries = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(DIR, file), 'utf8');
  const re = /\{"word":"([^"]+)","level":(\d+),"definition":"([^"]+)"/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    entries.push({ word: m[1], level: parseInt(m[2]), definition: m[3], file });
  }
}

console.log(`🎯 Distractor Test — ${entries.length} L1-L2 entries\n`);

// For each word, check if its definition could also match other words at the same level
// A good definition should ONLY match its target word
const byLevel = {};
entries.forEach(e => { if (!byLevel[e.level]) byLevel[e.level] = []; byLevel[e.level].push(e); });

const ambiguous = [];

for (const [level, levelEntries] of Object.entries(byLevel)) {
  for (const target of levelEntries) {
    const defWords = new Set(target.definition.toLowerCase().split(/\s+/).filter(w => w.length > 3));
    if (defWords.size < 2) continue;
    
    // How many OTHER words at this level could this definition plausibly describe?
    let confusableWith = [];
    for (const other of levelEntries) {
      if (other.word === target.word) continue;
      
      // Check if target's definition contains the other word or vice versa
      const otherWord = other.word.toLowerCase();
      const targetDef = target.definition.toLowerCase();
      
      // Does our definition accidentally describe the other word?
      // Check if other word's definition shares >60% content words with target's definition
      const otherDefWords = new Set(other.definition.toLowerCase().split(/\s+/).filter(w => w.length > 3));
      let shared = 0;
      for (const w of defWords) if (otherDefWords.has(w)) shared++;
      
      if (defWords.size > 0 && shared / defWords.size >= 0.6) {
        confusableWith.push(other.word);
      }
    }
    
    if (confusableWith.length >= 3) {
      ambiguous.push({
        word: target.word,
        level: parseInt(level),
        definition: target.definition,
        confusableWith: confusableWith.slice(0, 5),
        count: confusableWith.length
      });
    }
  }
}

ambiguous.sort((a, b) => b.count - a.count);

console.log(`⚠️ Words whose definitions could match 3+ other words: ${ambiguous.length}\n`);
ambiguous.slice(0, 20).forEach((a, i) => {
  console.log(`${i+1}. L${a.level} "${a.word}" (confusable with ${a.count} others)`);
  console.log(`   Def: "${a.definition}"`);
  console.log(`   Could also describe: ${a.confusableWith.join(', ')}\n`);
});

console.log(`\n📝 Total problematic: ${ambiguous.length} / ${entries.length} = ${(ambiguous.length/entries.length*100).toFixed(1)}%`);

// Save
const report = `# Distractor Test Report\n\n${ambiguous.length} words with weak definitions (confusable with 3+ others)\n\n${ambiguous.map((a,i) => `${i+1}. L${a.level} "${a.word}" → confusable with: ${a.confusableWith.join(', ')}\n   Def: "${a.definition}"`).join('\n\n')}`;
fs.writeFileSync(path.join(DIR, `DISTRACTOR-TEST-${new Date().toISOString().slice(0,10)}.md`), report);
console.log('Report saved.');
