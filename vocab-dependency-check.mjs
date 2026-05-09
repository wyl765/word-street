#!/usr/bin/env node
/**
 * Word Street — Vocabulary Dependency Check
 * Detects:
 * 1. Dependency inversion: word A's definition uses word B, but B.level > A.level
 * 2. Morphological ordering: if add→addition, addition.level should ≥ add.level
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

// Build word→level map
const wordLevel = {};
for (const e of entries) {
  wordLevel[e.word.toLowerCase()] = e.level;
}

// Common morphological suffixes for derivation detection
const DERIVATIONS = [
  { suffix: 'tion', base: '', desc: 'nominalization' },
  { suffix: 'sion', base: '', desc: 'nominalization' },
  { suffix: 'ment', base: '', desc: 'nominalization' },
  { suffix: 'ness', base: '', desc: 'nominalization' },
  { suffix: 'ful', base: '', desc: 'adjective' },
  { suffix: 'less', base: '', desc: 'adjective' },
  { suffix: 'ly', base: '', desc: 'adverb' },
  { suffix: 'able', base: '', desc: 'adjective' },
  { suffix: 'ible', base: '', desc: 'adjective' },
  { suffix: 'ous', base: '', desc: 'adjective' },
  { suffix: 'ive', base: '', desc: 'adjective' },
  { suffix: 'er', base: '', desc: 'agent/comparative' },
  { suffix: 'est', base: '', desc: 'superlative' },
  { suffix: 'ing', base: '', desc: 'gerund' },
  { suffix: 'ed', base: '', desc: 'past' },
  { suffix: 'al', base: '', desc: 'adjective' },
];

function findBase(word) {
  const w = word.toLowerCase();
  for (const d of DERIVATIONS) {
    if (w.endsWith(d.suffix) && w.length > d.suffix.length + 2) {
      const base = w.slice(0, -d.suffix.length);
      // Try base directly, or base+e (e.g. "use" → "useful")
      if (wordLevel[base] !== undefined) return { base, type: d.desc };
      if (wordLevel[base + 'e'] !== undefined) return { base: base + 'e', type: d.desc };
      // For -tion: try base without final letter changes (e.g. "add" → "addition")
      if (d.suffix === 'tion' || d.suffix === 'sion') {
        const tryBases = [base, base.slice(0,-1), base + 'e', base.slice(0,-1) + 'e'];
        for (const tb of tryBases) {
          if (wordLevel[tb] !== undefined) return { base: tb, type: d.desc };
        }
      }
    }
  }
  return null;
}

// 1. Dependency inversion
const inversions = [];
for (const e of entries) {
  const defWords = e.definition.toLowerCase().replace(/[^a-z\s'-]/g, '').split(/\s+/).filter(w => w.length > 1);
  for (const w of defWords) {
    if (FUNCTION_WORDS.has(w)) continue;
    if (w === e.word.toLowerCase()) continue;
    const depLevel = wordLevel[w];
    if (depLevel !== undefined && depLevel > e.level) {
      inversions.push({ word: e.word, level: e.level, depWord: w, depLevel, definition: e.definition });
    }
  }
}

// 2. Morphological ordering
const morphIssues = [];
for (const e of entries) {
  const derived = findBase(e.word);
  if (derived) {
    const baseLevel = wordLevel[derived.base];
    if (baseLevel !== undefined && e.level < baseLevel) {
      morphIssues.push({ word: e.word, level: e.level, base: derived.base, baseLevel, type: derived.type });
    }
  }
}

console.log(`🔗 Vocabulary Dependency Check`);
console.log(`${'='.repeat(50)}`);
console.log(`Dependency inversions (def uses higher-level word): ${inversions.length}`);
console.log(`Morphological ordering issues: ${morphIssues.length}\n`);

// Deduplicate inversions by word (show worst)
const byWord = {};
for (const inv of inversions) {
  if (!byWord[inv.word]) byWord[inv.word] = [];
  byWord[inv.word].push(inv);
}

console.log(`--- Dependency Inversions (MAJOR) ---`);
const invEntries = Object.entries(byWord).sort((a,b) => b[1].length - a[1].length);
for (const [word, invs] of invEntries.slice(0, 30)) {
  const deps = invs.map(i => `${i.depWord}(L${i.depLevel})`).join(', ');
  console.log(`🟡 ${word} (L${invs[0].level}): uses ${deps}`);
  console.log(`  "${invs[0].definition}"`);
}
if (invEntries.length > 30) console.log(`... and ${invEntries.length - 30} more`);

console.log(`\n--- Morphological Ordering Issues ---`);
for (const m of morphIssues) {
  console.log(`🟡 ${m.word} (L${m.level}) < base "${m.base}" (L${m.baseLevel}) [${m.type}]`);
}

const report = `# Vocabulary Dependency Report — ${new Date().toISOString().slice(0,10)}

## Summary
- Dependency inversions: ${inversions.length} (${invEntries.length} unique words)
- Morphological ordering issues: ${morphIssues.length}

## Dependency Inversions
Word A's definition uses word B, but B.level > A.level — learner hasn't seen B yet.

${invEntries.map(([word, invs]) => `- **${word}** (L${invs[0].level}): uses ${invs.map(i => `${i.depWord}(L${i.depLevel})`).join(', ')}`).join('\n')}

## Morphological Ordering Issues
Derived word appears at lower level than its base form.

${morphIssues.map(m => `- **${m.word}** (L${m.level}) < base **${m.base}** (L${m.baseLevel}) [${m.type}]`).join('\n')}
`;

fs.writeFileSync(path.join(DIR, 'VOCAB-DEPENDENCY-REPORT.md'), report);
console.log(`\n📄 Report written to VOCAB-DEPENDENCY-REPORT.md`);
