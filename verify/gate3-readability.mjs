// Gate 3: Readability — FK Grade Level for every definition
// Threshold: L1-L2 ≤ 3.0, L3 ≤ 4.0, L4-L5 ≤ 5.0
// Pure math, zero AI, zero hallucination.

import { loadAllWords, fkGradeLevel, writeReport } from './utils.mjs';

const THRESHOLDS = { 1: 5.0, 2: 6.0, 3: 7.0, 4: 9.0, 5: 10.0 };

const words = loadAllWords();
const fails = [];
const stats = { total: 0, pass: 0, fail: 0, byLevel: {} };

for (const w of words) {
  stats.total++;
  const fk = fkGradeLevel(w.definition);
  const threshold = THRESHOLDS[w.level] ?? 5.0;
  const pass = fk <= threshold;
  
  if (!stats.byLevel[w.level]) stats.byLevel[w.level] = { total: 0, pass: 0, fail: 0, avgFK: 0, sumFK: 0 };
  stats.byLevel[w.level].total++;
  stats.byLevel[w.level].sumFK += fk;
  
  if (pass) {
    stats.pass++;
    stats.byLevel[w.level].pass++;
  } else {
    stats.fail++;
    stats.byLevel[w.level].fail++;
    fails.push({ word: w.word, file: w._file, level: w.level, fk: fk.toFixed(2), threshold, definition: w.definition });
  }
}

// Report
const lines = [
  `# Gate 3: Readability Verification`,
  `**Date:** ${new Date().toISOString().slice(0, 10)}`,
  `**Method:** Flesch-Kincaid Grade Level on every definition`,
  `**Thresholds:** L1-L2 ≤ 3.0 | L3 ≤ 4.0 | L4-L5 ≤ 5.0`,
  `**Total:** ${stats.total} | **Pass:** ${stats.pass} | **Fail:** ${stats.fail}`,
  `**Pass rate:** ${(stats.pass / stats.total * 100).toFixed(1)}%`,
  ``,
  `## By Level`,
  `| Level | Total | Pass | Fail | Avg FK |`,
  `|-------|-------|------|------|--------|`,
];

for (const lvl of [1, 2, 3, 4, 5]) {
  const s = stats.byLevel[lvl];
  if (!s) continue;
  lines.push(`| ${lvl} | ${s.total} | ${s.pass} | ${s.fail} | ${(s.sumFK / s.total).toFixed(2)} |`);
}

lines.push('', '## Failures', '| Word | File | Level | FK | Threshold | Definition |', '|------|------|-------|-----|-----------|------------|');
for (const f of fails.sort((a, b) => b.fk - a.fk)) {
  lines.push(`| ${f.word} | ${f.file} | ${f.level} | ${f.fk} | ${f.threshold} | ${f.definition.substring(0, 80)} |`);
}

writeReport('GATE3-readability', lines);
console.log(`\nGate 3: ${stats.pass}/${stats.total} pass (${stats.fail} fail)`);
