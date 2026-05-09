#!/usr/bin/env node
/**
 * COCA Level Check — verify word levels against COCA frequency ranks
 * L1 words should be in COCA top 2000
 * L2 words should be in COCA top 3000
 * L3 words should be in COCA top 5000
 * 
 * Run: node coca-level-check.mjs
 */

import fs from 'fs';
import path from 'path';

const DIR = path.dirname(new URL(import.meta.url).pathname);

// ============ LOAD COCA ============
function loadCoca() {
  const csvPath = path.join(DIR, 'coca_5000.csv');
  const content = fs.readFileSync(csvPath, 'utf8');
  const lines = content.trim().split('\n');
  const header = lines[0].split(',');
  const rankIdx = header.indexOf('rank');
  const lemmaIdx = header.indexOf('lemma');
  
  const cocaMap = new Map(); // lemma → rank
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',');
    const rank = parseInt(cols[rankIdx], 10);
    const lemma = (cols[lemmaIdx] || '').toLowerCase().trim();
    if (lemma && rank) {
      // Keep the best (lowest) rank for each lemma
      if (!cocaMap.has(lemma) || cocaMap.get(lemma) > rank) {
        cocaMap.set(lemma, rank);
      }
    }
  }
  return cocaMap;
}

// ============ LOAD WORD FILES ============
function loadWords() {
  const files = fs.readdirSync(DIR)
    .filter(f => f.match(/^words-level.*\.js$/))
    .sort();
  
  const allEntries = [];
  for (const file of files) {
    const content = fs.readFileSync(path.join(DIR, file), 'utf8');
    const match = content.match(/\[(.+)\]/s);
    if (!match) continue;
    try {
      const arr = JSON.parse('[' + match[1] + ']');
      arr.forEach(entry => {
        allEntries.push({ ...entry, _file: file });
      });
    } catch (e) {
      // Line-by-line fallback
      const lines = content.split('\n');
      for (const line of lines) {
        const m = line.match(/\{[^}]+\}/g);
        if (m) {
          for (const jsonStr of m) {
            try {
              const entry = JSON.parse(jsonStr);
              if (entry.word) allEntries.push({ ...entry, _file: file });
            } catch (_) {}
          }
        }
      }
    }
  }
  return allEntries;
}

// ============ THRESHOLDS ============
const THRESHOLDS = {
  1: 2000,
  2: 3000,
  3: 5000,
};

// ============ MAIN ============
const cocaMap = loadCoca();
const entries = loadWords();

console.log(`📊 COCA Level Check`);
console.log(`===================`);
console.log(`COCA entries loaded: ${cocaMap.size}`);
console.log(`Word entries loaded: ${entries.length}\n`);

const mismatches = [];
const notInCoca = [];

for (const e of entries) {
  const level = e.level || 0;
  const threshold = THRESHOLDS[level];
  if (!threshold) continue; // Only check L1-L3

  const word = e.word.toLowerCase().trim();
  const rank = cocaMap.get(word);

  if (!rank) {
    notInCoca.push({ word: e.word, level, file: e._file });
  } else if (rank > threshold) {
    mismatches.push({ word: e.word, level, rank, threshold, file: e._file });
  }
}

// Sort mismatches by severity (rank - threshold)
mismatches.sort((a, b) => (b.rank - b.threshold) - (a.rank - a.threshold));

console.log(`\n🔴 LEVEL MISMATCHES (${mismatches.length}):`);
console.log(`Word should be in COCA top N for its level, but ranks higher.\n`);

if (mismatches.length === 0) {
  console.log('  ✅ No mismatches found!\n');
} else {
  console.log(`${'Word'.padEnd(20)} ${'Level'.padEnd(6)} ${'COCA Rank'.padEnd(12)} ${'Threshold'.padEnd(12)} File`);
  console.log(`${'─'.repeat(20)} ${'─'.repeat(6)} ${'─'.repeat(12)} ${'─'.repeat(12)} ${'─'.repeat(20)}`);
  for (const m of mismatches) {
    console.log(`${m.word.padEnd(20)} L${m.level}    ${String(m.rank).padEnd(12)} <${String(m.threshold).padEnd(11)} ${m.file}`);
  }
}

console.log(`\n⚠️  NOT IN COCA TOP 5000 (${notInCoca.length} of L1-L3 words):`);
if (notInCoca.length > 0) {
  // Group by level
  for (const lvl of [1, 2, 3]) {
    const items = notInCoca.filter(n => n.level === lvl);
    if (items.length > 0) {
      console.log(`  L${lvl} (${items.length}): ${items.map(i => i.word).join(', ')}`);
    }
  }
}

// Summary
console.log(`\n📋 Summary:`);
console.log(`  L1-L3 words checked: ${entries.filter(e => e.level >= 1 && e.level <= 3).length}`);
console.log(`  LEVEL_MISMATCH: ${mismatches.length}`);
console.log(`  Not in COCA top 5000: ${notInCoca.length}`);

// Write report
const report = {
  date: new Date().toISOString(),
  totalChecked: entries.filter(e => e.level >= 1 && e.level <= 3).length,
  mismatches,
  notInCoca: notInCoca.length,
  notInCocaWords: notInCoca,
};
fs.writeFileSync(path.join(DIR, 'COCA-LEVEL-REPORT.json'), JSON.stringify(report, null, 2));
console.log(`\n📝 Report saved to COCA-LEVEL-REPORT.json`);
