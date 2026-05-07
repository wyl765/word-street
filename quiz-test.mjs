#!/usr/bin/env node
/**
 * Word Street Quiz Simulator
 * Tests if definitions are clear enough for a student to select the correct word
 * If AI can't match definition to word, a child definitely can't
 */
import fs from 'fs';
import path from 'path';

const DIR = path.dirname(new URL(import.meta.url).pathname);

// Load all entries
const files = fs.readdirSync(DIR).filter(f => f.match(/^words-level.*\.js$/)).sort();
const allEntries = [];
for (const file of files) {
  const content = fs.readFileSync(path.join(DIR, file), 'utf8');
  const re = /\{"word":"([^"]+)","level":(\d+),"definition":"([^"]+)","example":"([^"]+)","imageKeyword":"([^"]+)"\}/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    allEntries.push({ word: m[1], level: parseInt(m[2]), definition: m[3], example: m[4], imageKeyword: m[5], _file: file });
  }
}

console.log(`📝 Quiz Simulator — ${allEntries.length} entries loaded`);
console.log('Testing: can the definition uniquely identify the word?\n');

// For each entry, check if definition + example together make the word obvious
// Simple test: does the definition overlap too much with other words at the same level?
const byLevel = {};
allEntries.forEach(e => {
  if (!byLevel[e.level]) byLevel[e.level] = [];
  byLevel[e.level].push(e);
});

const ambiguous = [];
for (const [level, entries] of Object.entries(byLevel)) {
  for (let i = 0; i < entries.length; i++) {
    const target = entries[i];
    const defWords = new Set(target.definition.toLowerCase().split(/\s+/).filter(w => w.length > 3));
    
    // Find words with very similar definitions at same level
    for (let j = i + 1; j < entries.length; j++) {
      const other = entries[j];
      const otherDefWords = new Set(other.definition.toLowerCase().split(/\s+/).filter(w => w.length > 3));
      
      // Count overlap
      let overlap = 0;
      for (const w of defWords) if (otherDefWords.has(w)) overlap++;
      const similarity = overlap / Math.min(defWords.size, otherDefWords.size);
      
      if (similarity >= 0.6 && defWords.size >= 3) {
        ambiguous.push({
          level,
          word1: target.word,
          def1: target.definition,
          word2: other.word,
          def2: other.definition,
          similarity: (similarity * 100).toFixed(0) + '%'
        });
      }
    }
  }
}

console.log(`🔴 Ambiguous pairs (definitions too similar within same level): ${ambiguous.length}\n`);
ambiguous.slice(0, 30).forEach(a => {
  console.log(`  L${a.level} | "${a.word1}" vs "${a.word2}" (${a.similarity} overlap)`);
  console.log(`    def1: ${a.def1}`);
  console.log(`    def2: ${a.def2}\n`);
});

if (ambiguous.length > 30) console.log(`  ... and ${ambiguous.length - 30} more pairs`);

// Save report
const report = `# Quiz Ambiguity Report — ${new Date().toISOString().slice(0,10)}\n\n${ambiguous.length} ambiguous pairs found.\n\n${ambiguous.map(a => `## L${a.level}: "${a.word1}" vs "${a.word2}" (${a.similarity})\n- ${a.word1}: ${a.def1}\n- ${a.word2}: ${a.def2}\n`).join('\n')}`;
fs.writeFileSync(path.join(DIR, `QUIZ-AMBIGUITY-${new Date().toISOString().slice(0,10)}.md`), report);
console.log('\n📝 Report saved.');
