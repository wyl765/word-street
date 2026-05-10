#!/usr/bin/env node
// dict-verify.mjs — Definition quality checker

import { readFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';

const DIR = new URL('.', import.meta.url).pathname;

function loadWords(filePath) {
  const src = readFileSync(filePath, 'utf-8');
  // Extract the array from: const LEVELX_BANK=[...];
  const match = src.match(/=\s*(\[[\s\S]*\])\s*;?\s*$/);
  if (!match) throw new Error(`Cannot parse ${filePath}`);
  return JSON.parse(match[1]);
}

function verify(word, definition) {
  const issues = [];
  const defWords = definition.trim().split(/\s+/);
  const w = word.toLowerCase();

  // 1. TOO_SHORT
  if (defWords.length < 4) {
    issues.push({ check: 'TOO_SHORT', severity: 'MINOR', msg: `definition has only ${defWords.length} words` });
  }
  // 2. TOO_LONG
  if (defWords.length > 25) {
    issues.push({ check: 'TOO_LONG', severity: 'MINOR', msg: `definition has ${defWords.length} words` });
  }
  // 3. STARTS_WITH_WORD
  if (definition.toLowerCase().startsWith(w + ' ') || definition.toLowerCase() === w) {
    issues.push({ check: 'STARTS_WITH_WORD', severity: 'MAJOR', msg: 'def starts with target word' });
  }
  // 4. CONTAINS_WORD (check all occurrences, not just start)
  const defLower = definition.toLowerCase();
  const wordRegex = new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
  if (wordRegex.test(defLower) && !defLower.startsWith(w)) {
    issues.push({ check: 'CONTAINS_WORD', severity: 'MAJOR', msg: 'definition contains the target word' });
  }

  return issues;
}

function severityRank(s) {
  return s === 'MAJOR' ? 0 : 1;
}

// Determine files
const args = process.argv.slice(2);
let files;
if (args.length > 0) {
  files = args.map(f => f.startsWith('/') ? f : join(DIR, f));
} else {
  files = readdirSync(DIR)
    .filter(f => f.match(/^words-level.*\.js$/))
    .sort()
    .map(f => join(DIR, f));
}

let totalEntries = 0;
const allIssues = [];

for (const file of files) {
  const fname = basename(file);
  const words = loadWords(file);
  totalEntries += words.length;
  for (const entry of words) {
    const issues = verify(entry.word, entry.definition);
    for (const iss of issues) {
      allIssues.push({ file: fname, word: entry.word, ...iss });
    }
  }
}

// Sort: MAJOR first, then MINOR
allIssues.sort((a, b) => severityRank(a.severity) - severityRank(b.severity));

const major = allIssues.filter(i => i.severity === 'MAJOR').length;
const minor = allIssues.filter(i => i.severity === 'MINOR').length;

console.log(`=== Dict Verify ===`);
console.log(`Entries: ${totalEntries}`);
console.log(`Results: ${major} MAJOR | ${minor} MINOR`);
console.log();

for (const iss of allIssues) {
  const tag = iss.severity === 'MAJOR' ? 'HIGH' : 'MEDIUM';
  console.log(`[${tag}] ${iss.file} | ${iss.word} | ${iss.check} — ${iss.msg}`);
}
