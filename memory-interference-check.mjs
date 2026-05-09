#!/usr/bin/env node
/**
 * Word Street — Memory Interference Prediction
 * Detects word pairs within same level that may cause interference:
 * - Spelling similarity (edit distance ≤2)
 * - Phonetic similarity (same onset + similar length)
 * - Definition similarity (Jaccard > 40%)
 */
import fs from 'fs';
import path from 'path';

const DIR = path.dirname(new URL(import.meta.url).pathname);

const entries = [];
const files = fs.readdirSync(DIR).filter(f => f.match(/^words-level.*\.js$/)).sort();
for (const file of files) {
  const content = fs.readFileSync(path.join(DIR, file), 'utf8');
  const re = /\{"word":"([^"]+)","level":(\d+),"definition":"([^"]+)","example":"([^"]+)","imageKeyword":"([^"]+)"\}/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    entries.push({ word: m[1], level: parseInt(m[2]), definition: m[3], example: m[4], imageKeyword: m[5] });
  }
}
console.log(`📚 Loaded ${entries.length} entries\n`);

function editDistance(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({length: m+1}, () => Array(n+1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
}

function getOnset(word) {
  // Extract initial consonant cluster + first vowel
  const m = word.match(/^([^aeiou]*[aeiou]+)/i);
  return m ? m[1].toLowerCase() : word.slice(0, 2).toLowerCase();
}

const STOP = new Set(['a','an','the','of','in','on','at','to','for','with','and','or','is','are','that','this','it','its']);
function defWords(def) {
  return def.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(w => !STOP.has(w) && w.length > 2);
}

function jaccard(a, b) {
  const sa = new Set(a), sb = new Set(b);
  const inter = [...sa].filter(x => sb.has(x)).length;
  const union = new Set([...sa, ...sb]).size;
  return union === 0 ? 0 : inter / union;
}

// Group by level
const byLevel = {};
for (const e of entries) {
  (byLevel[e.level] = byLevel[e.level] || []).push(e);
}

const interferePairs = [];

for (const [level, words] of Object.entries(byLevel)) {
  for (let i = 0; i < words.length; i++) {
    for (let j = i + 1; j < words.length; j++) {
      const a = words[i], b = words[j];
      const reasons = [];

      // Spelling similarity
      const ed = editDistance(a.word.toLowerCase(), b.word.toLowerCase());
      if (ed <= 2 && ed > 0) reasons.push(`spelling (edit distance=${ed})`);

      // Phonetic similarity
      const onsetA = getOnset(a.word), onsetB = getOnset(b.word);
      const lenDiff = Math.abs(a.word.length - b.word.length);
      if (onsetA === onsetB && lenDiff <= 2) reasons.push(`phonetic (onset="${onsetA}")`);

      // Definition similarity
      const j_score = jaccard(defWords(a.definition), defWords(b.definition));
      if (j_score > 0.4) reasons.push(`definition (Jaccard=${(j_score*100).toFixed(0)}%)`);

      if (reasons.length > 0) {
        interferePairs.push({ a: a.word, b: b.word, level, reasons, riskScore: reasons.length + (ed <= 1 ? 1 : 0) + (j_score > 0.6 ? 1 : 0) });
      }
    }
  }
}

interferePairs.sort((a, b) => b.riskScore - a.riskScore);

const high = interferePairs.filter(p => p.riskScore >= 3).length;
const medium = interferePairs.filter(p => p.riskScore === 2).length;
const low = interferePairs.filter(p => p.riskScore === 1).length;

console.log(`🧠 Memory Interference Prediction`);
console.log(`${'='.repeat(50)}`);
console.log(`HIGH risk (3+ factors): ${high}`);
console.log(`MEDIUM risk (2 factors): ${medium}`);
console.log(`LOW risk (1 factor): ${low}`);
console.log(`Total pairs: ${interferePairs.length}\n`);

for (const p of interferePairs.slice(0, 50)) {
  const icon = p.riskScore >= 3 ? '🔴' : p.riskScore >= 2 ? '🟡' : '🔵';
  console.log(`${icon} L${p.level}: ${p.a} ↔ ${p.b} [risk=${p.riskScore}]`);
  console.log(`  ${p.reasons.join(', ')}`);
}

if (interferePairs.length > 50) console.log(`\n... and ${interferePairs.length - 50} more (see report)`);

const report = `# Memory Interference Report — ${new Date().toISOString().slice(0,10)}

## Summary
- HIGH risk (3+ factors): ${high}
- MEDIUM risk (2 factors): ${medium}
- LOW risk (1 factor): ${low}
- Total interference pairs: ${interferePairs.length}

## Recommendation
These word pairs should NOT appear in the same learning session.
Spaced repetition scheduler should keep ≥3 sessions gap between them.

## All Pairs (sorted by risk)

${interferePairs.map(p => `- **[risk=${p.riskScore}]** L${p.level}: **${p.a}** ↔ **${p.b}** — ${p.reasons.join(', ')}`).join('\n')}
`;

fs.writeFileSync(path.join(DIR, 'MEMORY-INTERFERENCE-REPORT.md'), report);
console.log(`\n📄 Report written to MEMORY-INTERFERENCE-REPORT.md`);
