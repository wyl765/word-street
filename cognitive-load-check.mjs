#!/usr/bin/env node
/**
 * Word Street — Cognitive Load Check
 * Detects "超纲词" in definitions: words not in level ≤ current word's level
 */
import fs from 'fs';
import path from 'path';

const DIR = path.dirname(new URL(import.meta.url).pathname);

const FUNCTION_WORDS = new Set([
  'a','the','is','are','to','of','in','on','at','for','with','and','or','but','not',
  'it','this','that','an','by','from','as','has','have','be','been','was','were','do',
  'does','did','can','will','would','could','should','may','might','shall','must','its',
  'their','they','them','he','she','him','her','his','we','us','our','you','your','my',
  'me','i','who','what','when','where','how','which','if','than','so','very','more',
  'most','much','many','some','any','no','all','each','every','other','another','also',
  'too','just','only','even','still','already','about','after','before','between',
  'during','through','into','out','up','down','over','under','again','then','there',
  'here','now','well','like','made','make','thing','things','something','someone',
  'way','because','without','within','become','used'
]);

// Load all entries
const entries = [];
const files = fs.readdirSync(DIR).filter(f => f.match(/^words-level.*\.js$/)).sort();
for (const file of files) {
  const content = fs.readFileSync(path.join(DIR, file), 'utf8');
  const re = /\{"word":"([^"]+)","level":(\d+),"definition":"([^"]+)","example":"([^"]+)","imageKeyword":"([^"]+)"\}/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    entries.push({ word: m[1], level: parseInt(m[2]), definition: m[3], example: m[4], imageKeyword: m[5], file });
  }
}
console.log(`📚 Loaded ${entries.length} entries\n`);

// Build word sets per level
const wordsByMaxLevel = {};
const allWords = new Set();
for (const e of entries) {
  allWords.add(e.word.toLowerCase());
}

// Build cumulative sets: words available at each level
const maxLevel = Math.max(...entries.map(e => e.level));
const cumulativeWords = {};
for (let l = 1; l <= maxLevel; l++) {
  cumulativeWords[l] = new Set(l > 1 ? cumulativeWords[l-1] : []);
  for (const e of entries) {
    if (e.level === l) cumulativeWords[l].add(e.word.toLowerCase());
  }
}

function extractWords(text) {
  return text.toLowerCase().replace(/[^a-z\s'-]/g, '').split(/\s+/).filter(w => w.length > 1);
}

const issues = [];
let criticalCount = 0, majorCount = 0, minorCount = 0;

for (const e of entries) {
  const defWords = extractWords(e.definition);
  const available = cumulativeWords[e.level] || new Set();
  const overLevel = [];
  
  for (const w of defWords) {
    if (FUNCTION_WORDS.has(w)) continue;
    if (available.has(w)) continue;
    // Also skip if it's a common simple word not in our vocab (e.g. "big", "small")
    overLevel.push(w);
  }
  
  const unique = [...new Set(overLevel)];
  if (unique.length >= 3) {
    const severity = unique.length >= 5 ? 'CRITICAL' : 'MAJOR';
    if (severity === 'CRITICAL') criticalCount++;
    else majorCount++;
    issues.push({ ...e, overLevelWords: unique, severity });
  }
}

// Sort by severity then level
issues.sort((a, b) => {
  if (a.severity !== b.severity) return a.severity === 'CRITICAL' ? -1 : 1;
  return a.level - b.level;
});

console.log(`🧠 Cognitive Load Check`);
console.log(`${'='.repeat(50)}`);
console.log(`CRITICAL (≥5 超纲词): ${criticalCount}`);
console.log(`MAJOR (≥3 超纲词): ${majorCount}`);
console.log(`Total issues: ${issues.length}\n`);

for (const i of issues) {
  console.log(`${i.severity === 'CRITICAL' ? '🔴' : '🟡'} [${i.severity}] ${i.word} (L${i.level})`);
  console.log(`  Definition: "${i.definition}"`);
  console.log(`  超纲词 (${i.overLevelWords.length}): ${i.overLevelWords.join(', ')}`);
}

// Write report
const report = `# Cognitive Load Report — ${new Date().toISOString().slice(0,10)}

## Summary
- Total entries: ${entries.length}
- CRITICAL (≥5 超纲词 in definition): ${criticalCount}
- MAJOR (≥3 超纲词 in definition): ${majorCount}

## Issues

${issues.map(i => `### ${i.severity === 'CRITICAL' ? '🔴' : '🟡'} [${i.severity}] ${i.word} (L${i.level})
- **Definition:** "${i.definition}"
- **超纲词 (${i.overLevelWords.length}):** ${i.overLevelWords.join(', ')}
`).join('\n')}

## Methodology
- For each word at level N, check all content words in its definition
- If a word in the definition is NOT in level ≤ N vocabulary → it's "超纲"
- Function words (${FUNCTION_WORDS.size} common words) are excluded
- CRITICAL: ≥5 超纲词, MAJOR: ≥3 超纲词
`;

fs.writeFileSync(path.join(DIR, 'COGNITIVE-LOAD-REPORT.md'), report);
console.log(`\n📄 Report written to COGNITIVE-LOAD-REPORT.md`);
