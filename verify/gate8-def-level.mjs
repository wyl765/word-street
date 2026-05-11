// Gate 8: Definition Vocabulary Level Check
// Rule: A definition should NOT use words harder than the word being defined.
// Method: Check each definition's words against our own word bank levels.
// If a L2 word's definition uses a L4 word → problem.

import fs from 'fs';
import path from 'path';

const WORD_DIR = path.resolve(import.meta.dirname, '..');

// Load all words and build level lookup
const files = fs.readdirSync(WORD_DIR).filter(f => f.startsWith('words-level') && f.endsWith('.js')).sort();
const allWords = [];
const wordLevel = {}; // word → level

for (const file of files) {
  const raw = fs.readFileSync(path.join(WORD_DIR, file), 'utf8');
  const bank = JSON.parse(raw.match(/\[[\s\S]*\]/)[0]);
  bank.forEach(w => {
    allWords.push({ ...w, _file: file });
    wordLevel[w.word.toLowerCase()] = w.level;
  });
}

// Common words that are OK to use in any definition (not in our bank = assumed basic)
const STOPWORDS = new Set('a an the to of or and in is it that for on with as at by from be this are was not but have has do does did will would can could should may might also very more most than into about just its their your our his her being been some other each when where what how who which they them we you he she something someone especially often usually way like'.split(' '));

const issues = [];

for (const w of allWords) {
  const defWords = w.definition.toLowerCase()
    .replace(/[^a-z\s'-]/g, '')
    .split(/\s+/)
    .filter(dw => dw.length > 2 && !STOPWORDS.has(dw));
  
  const hardWordsInDef = [];
  
  for (const dw of defWords) {
    const dwLevel = wordLevel[dw];
    if (dwLevel && dwLevel > w.level) {
      hardWordsInDef.push({ defWord: dw, defWordLevel: dwLevel });
    }
  }
  
  if (hardWordsInDef.length > 0) {
    // Severity: using L5 word in L1 def = CRITICAL, L+1 = MINOR
    const maxGap = Math.max(...hardWordsInDef.map(h => h.defWordLevel - w.level));
    issues.push({
      word: w.word,
      level: w.level,
      file: w._file,
      definition: w.definition,
      hardWords: hardWordsInDef,
      maxGap,
      severity: maxGap >= 3 ? 'CRITICAL' : maxGap >= 2 ? 'HIGH' : 'MINOR'
    });
  }
}

issues.sort((a, b) => b.maxGap - a.maxGap);

// Report
const critical = issues.filter(i => i.severity === 'CRITICAL');
const high = issues.filter(i => i.severity === 'HIGH');
const minor = issues.filter(i => i.severity === 'MINOR');

const lines = [
  `# Gate 8: Definition Vocabulary Level Check`,
  `**Date:** ${new Date().toISOString().slice(0, 10)}`,
  `**Rule:** Definition words should not be harder than the word being defined`,
  `**Total words checked:** ${allWords.length}`,
  `**Issues found:** ${issues.length} (${critical.length} CRITICAL, ${high.length} HIGH, ${minor.length} MINOR)`,
  ``,
  `## CRITICAL (definition uses word 3+ levels harder)`,
  `| Word (L) | File | Hard word in def (L) | Gap | Definition |`,
  `|----------|------|---------------------|-----|------------|`,
];

for (const i of critical) {
  const hw = i.hardWords.map(h => `${h.defWord}(L${h.defWordLevel})`).join(', ');
  lines.push(`| ${i.word} (L${i.level}) | ${i.file} | ${hw} | +${i.maxGap} | ${i.definition.substring(0, 70)} |`);
}

lines.push('', `## HIGH (definition uses word 2 levels harder)`,
  `| Word (L) | File | Hard word in def (L) | Gap | Definition |`,
  `|----------|------|---------------------|-----|------------|`);
for (const i of high) {
  const hw = i.hardWords.map(h => `${h.defWord}(L${h.defWordLevel})`).join(', ');
  lines.push(`| ${i.word} (L${i.level}) | ${i.file} | ${hw} | +${i.maxGap} | ${i.definition.substring(0, 70)} |`);
}

lines.push('', `## MINOR (definition uses word 1 level harder) — ${minor.length} entries`,
  `(Omitted for brevity — L+1 is generally acceptable)`);

const outPath = path.join(WORD_DIR, 'verify', 'GATE8-def-level-check.md');
fs.writeFileSync(outPath, lines.join('\n'));
console.log(`Gate 8: ${critical.length} CRITICAL, ${high.length} HIGH, ${minor.length} MINOR out of ${allWords.length} words`);
console.log(`Report: verify/GATE8-def-level-check.md`);
