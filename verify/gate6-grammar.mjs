// Gate 6: Enhanced Grammar Scanner
// Catches: article errors, double words, broken punctuation, circular defs, garble patterns
// Pure rules, zero AI.

import { loadAllWords, checkArticle, writeReport } from './utils.mjs';

const words = loadAllWords();
const issues = [];

const GARBLE_PATTERNS = [
  'from the people in charge', 'how good something is', 'a pushing force',
  'what you usually do', 'how someone or something looks',
  'where something comes from', 'a special event with rules',
  'things you pick after thinking', 'An old city in Italy',
  'a school after high school', 'having done something wrong',
  'telling what is true', 'being with other people', 'holding on tight',
  'not following the pattern', 'a strong, sharp liquid', 'a tie between people',
  'a bird that sings', 'said you will do something', 'about helping sick people',
  'stories of what happened', 'a big piece of work', 'had a fight to',
  'not true and right', 'a what you can do'
];

for (const w of words) {
  const def = w.definition;
  const ex = w.example;
  
  // 1. Circular definition
  const wordLower = w.word.toLowerCase();
  const defLower = def.toLowerCase();
  // Only flag if the exact word appears (not as part of another word)
  const circularRe = new RegExp(`\\b${wordLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
  if (circularRe.test(def)) {
    issues.push({ word: w.word, file: w._file, type: 'CIRCULAR_DEF', severity: 'CRITICAL', detail: def });
  }
  
  // 2. Article errors in definition and example
  for (const text of [def, ex]) {
    const artIssues = checkArticle(text);
    for (const a of artIssues) {
      issues.push({ word: w.word, file: w._file, type: 'ARTICLE_ERROR', severity: 'CRITICAL', detail: a });
    }
  }
  
  // 3. Double words: "to to", "the the", "a a", "is is", etc.
  // Check definition and example SEPARATELY to avoid cross-sentence false positives
  for (const text of [def, ex]) {
    const doubleWord = text.match(/\b(\w+)\s+\1\b/gi);
    if (doubleWord) {
      for (const d of doubleWord) {
        // Skip legitimate doubles: "very very", "had had", "day by day" fragments
        if (/^(very|had|that|so|day)\s/i.test(d)) continue;
        issues.push({ word: w.word, file: w._file, type: 'DOUBLE_WORD', severity: 'CRITICAL', detail: d });
      }
    }
  }
  
  // 4. Garble patterns
  for (const pattern of GARBLE_PATTERNS) {
    if (def.includes(pattern)) {
      issues.push({ word: w.word, file: w._file, type: 'GARBLE', severity: 'CRITICAL', detail: pattern });
    }
  }
  
  // 5. Unmatched quotes/parens
  const quoteCount = (def.match(/"/g) || []).length;
  if (quoteCount % 2 !== 0) {
    issues.push({ word: w.word, file: w._file, type: 'UNMATCHED_QUOTE', severity: 'HIGH', detail: def });
  }
  const openParen = (def.match(/\(/g) || []).length;
  const closeParen = (def.match(/\)/g) || []).length;
  if (openParen !== closeParen) {
    issues.push({ word: w.word, file: w._file, type: 'UNMATCHED_PAREN', severity: 'HIGH', detail: def });
  }
  
  // 6. Definition too short (< 3 words)
  const defWords = def.split(/\s+/).filter(w => w.length > 0);
  if (defWords.length < 3) {
    issues.push({ word: w.word, file: w._file, type: 'DEF_TOO_SHORT', severity: 'HIGH', detail: def });
  }
  
  // 7. Example doesn't contain the word (or its forms)
  const stem = wordLower.replace(/(e?s|ed|ing|ly|tion|ment|ness|ful|less|ity|ous|ive|al|er|est)$/, '');
  const wordInExample = new RegExp(stem.length >= 3 ? stem : `\\b${wordLower}\\b`, 'i');
  if (!wordInExample.test(ex)) {
    issues.push({ word: w.word, file: w._file, type: 'WORD_NOT_IN_EXAMPLE', severity: 'HIGH', detail: ex.substring(0, 80) });
  }
  
  // 8. Empty or whitespace-only fields
  if (!def.trim()) issues.push({ word: w.word, file: w._file, type: 'EMPTY_DEF', severity: 'CRITICAL', detail: '' });
  if (!ex.trim()) issues.push({ word: w.word, file: w._file, type: 'EMPTY_EXAMPLE', severity: 'CRITICAL', detail: '' });
}

// Deduplicate
const seen = new Set();
const unique = issues.filter(i => {
  const key = `${i.word}|${i.type}|${i.detail}`;
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

// Report
const critical = unique.filter(i => i.severity === 'CRITICAL');
const high = unique.filter(i => i.severity === 'HIGH');

const lines = [
  `# Gate 6: Enhanced Grammar Scan`,
  `**Date:** ${new Date().toISOString().slice(0, 10)}`,
  `**Total words scanned:** ${words.length}`,
  `**CRITICAL:** ${critical.length} | **HIGH:** ${high.length}`,
  '',
  '## CRITICAL',
  '| Word | File | Type | Detail |',
  '|------|------|------|--------|',
];
for (const i of critical) {
  lines.push(`| ${i.word} | ${i.file} | ${i.type} | ${i.detail.substring(0, 80)} |`);
}
lines.push('', '## HIGH', '| Word | File | Type | Detail |', '|------|------|------|--------|');
for (const i of high) {
  lines.push(`| ${i.word} | ${i.file} | ${i.type} | ${i.detail.substring(0, 80)} |`);
}

writeReport('GATE6-grammar', lines);
console.log(`\nGate 6: ${critical.length} CRITICAL, ${high.length} HIGH out of ${words.length} words`);
