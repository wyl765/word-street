#!/usr/bin/env node
/**
 * Word Street — Spelling Difficulty Scorer
 * Scores each word's spelling difficulty for "看图拼词" mode
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

// Patterns
const DOUBLE_LETTERS = /(.)\1/g;
const SILENT_PATTERNS = [
  /\bkn/i,    // know, knee, knight
  /\bwr/i,    // write, wrong
  /\bgn/i,    // gnaw, gnat
  /\bps/i,    // psychology, psalm
  /mb$/i,     // climb, lamb, comb
  /mn$/i,     // autumn, column
  /e$/i,      // silent e (approximate)
  /ght/i,     // night, fight (the gh is silent)
];
const IRREGULAR_PATTERNS = [
  /ough/i, /ight/i, /ph/i, /tion/i, /sion/i,
  /ious/i, /eous/i, /ough/i, /augh/i,
  /wr/i, /kn/i, /gn/i, /ps/i,
  /eigh/i, /ough/i,
];
const CONFUSING_COMBOS = [
  /ei/i, /ie/i, /tion/i, /sion/i, /cion/i,
  /ance/i, /ence/i, /able/i, /ible/i,
  /ous/i, /ious/i, /eous/i,
  /cede/i, /ceed/i, /sede/i,
];

function scoreWord(word) {
  const w = word.toLowerCase();
  let score = w.length; // base = letter count
  const bonuses = [];

  // Double letters
  const doubles = w.match(DOUBLE_LETTERS);
  if (doubles) {
    score += doubles.length;
    bonuses.push(`double letters(+${doubles.length})`);
  }

  // Silent letters
  let silentCount = 0;
  for (const p of SILENT_PATTERNS) {
    if (p.test(w)) silentCount++;
  }
  if (silentCount > 0) {
    score += silentCount * 2;
    bonuses.push(`silent letters(+${silentCount * 2})`);
  }

  // Irregular spelling
  let irregCount = 0;
  for (const p of IRREGULAR_PATTERNS) {
    if (p.test(w)) irregCount++;
  }
  if (irregCount > 0) {
    score += irregCount;
    bonuses.push(`irregular(+${irregCount})`);
  }

  // Confusing combos
  let confuseCount = 0;
  for (const p of CONFUSING_COMBOS) {
    if (p.test(w)) confuseCount++;
  }
  if (confuseCount > 0) {
    score += confuseCount;
    bonuses.push(`confusing(+${confuseCount})`);
  }

  return { score, bonuses };
}

// Level thresholds for WARNING (spelling too hard for level)
const LEVEL_THRESHOLDS = { 1: 10, 2: 12, 3: 14, 4: 16, 5: 20 };

const scored = entries.map(e => {
  const { score, bonuses } = scoreWord(e.word);
  const threshold = LEVEL_THRESHOLDS[e.level] || 20;
  const warning = score > threshold;
  return { ...e, spellScore: score, bonuses, warning };
});

const warnings = scored.filter(s => s.warning);
warnings.sort((a, b) => b.spellScore - a.spellScore);

console.log(`✍️ Spelling Difficulty Check`);
console.log(`${'='.repeat(50)}`);
console.log(`Total words scored: ${scored.length}`);
console.log(`WARNING (difficulty too high for level): ${warnings.length}\n`);

// Stats by level
const levels = [...new Set(scored.map(s => s.level))].sort((a,b) => a-b);
for (const l of levels) {
  const lw = scored.filter(s => s.level === l);
  const avg = (lw.reduce((s,w) => s + w.spellScore, 0) / lw.length).toFixed(1);
  const max = Math.max(...lw.map(w => w.spellScore));
  const warns = lw.filter(w => w.warning).length;
  console.log(`  L${l}: avg=${avg}, max=${max}, warnings=${warns}`);
}

console.log(`\n--- Top 30 Warnings ---`);
for (const w of warnings.slice(0, 30)) {
  console.log(`⚠️ ${w.word} (L${w.level}, score=${w.spellScore}): ${w.bonuses.join(', ')}`);
}

const report = `# Spelling Difficulty Report — ${new Date().toISOString().slice(0,10)}

## Summary
- Total words: ${scored.length}
- Warnings (too hard for level): ${warnings.length}

## Level Stats
${levels.map(l => {
  const lw = scored.filter(s => s.level === l);
  const avg = (lw.reduce((s,w) => s + w.spellScore, 0) / lw.length).toFixed(1);
  return `- L${l}: avg=${avg}, warnings=${lw.filter(w => w.warning).length}/${lw.length}`;
}).join('\n')}

## Scoring Method
- Base score = letter count
- +1 per double letter pair
- +2 per silent letter pattern (kn, wr, mb, silent e, etc.)
- +1 per irregular spelling pattern (ough, ight, ph, etc.)
- +1 per confusing combination (ei/ie, tion/sion, ance/ence, etc.)

## Warnings (score too high for level)

${warnings.map(w => `- **${w.word}** (L${w.level}, score=${w.spellScore}): ${w.bonuses.join(', ')}`).join('\n')}

## All Scores (top 50 hardest)
${scored.sort((a,b) => b.spellScore - a.spellScore).slice(0, 50).map(w => `- ${w.word} (L${w.level}): ${w.spellScore}`).join('\n')}
`;

fs.writeFileSync(path.join(DIR, 'SPELLING-DIFFICULTY-REPORT.md'), report);
console.log(`\n📄 Report written to SPELLING-DIFFICULTY-REPORT.md`);
