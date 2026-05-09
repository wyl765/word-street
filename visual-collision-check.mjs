#!/usr/bin/env node
/**
 * Word Street — Visual Collision Check
 * Detects imageKeyword collisions within same level
 */
import fs from 'fs';
import path from 'path';

const DIR = path.dirname(new URL(import.meta.url).pathname);
const STOP_WORDS = new Set(['a','an','the','of','in','on','at','to','for','with','and','or','is','are','its','that','this']);

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

// Group by level
const byLevel = {};
for (const e of entries) {
  (byLevel[e.level] = byLevel[e.level] || []).push(e);
}

function getContentWords(text) {
  return text.toLowerCase().split(/\s+/).filter(w => !STOP_WORDS.has(w) && w.length > 1);
}

function jaccard(a, b) {
  const setA = new Set(a), setB = new Set(b);
  const inter = [...setA].filter(x => setB.has(x)).length;
  const union = new Set([...setA, ...setB]).size;
  return union === 0 ? 0 : inter / union;
}

const issues = [];
let critical = 0, major = 0, minor = 0;

for (const [level, words] of Object.entries(byLevel)) {
  for (let i = 0; i < words.length; i++) {
    for (let j = i + 1; j < words.length; j++) {
      const a = words[i], b = words[j];
      const ikA = a.imageKeyword.toLowerCase();
      const ikB = b.imageKeyword.toLowerCase();

      if (ikA === ikB) {
        issues.push({ a: a.word, b: b.word, level, ikA: a.imageKeyword, ikB: b.imageKeyword, severity: 'CRITICAL', reason: 'identical imageKeyword' });
        critical++;
      } else if (ikA.includes(ikB) || ikB.includes(ikA)) {
        issues.push({ a: a.word, b: b.word, level, ikA: a.imageKeyword, ikB: b.imageKeyword, severity: 'MAJOR', reason: 'one contains the other' });
        major++;
      } else {
        const wordsA = getContentWords(a.imageKeyword);
        const wordsB = getContentWords(b.imageKeyword);
        const j = jaccard(wordsA, wordsB);
        if (j >= 0.5) {
          issues.push({ a: a.word, b: b.word, level, ikA: a.imageKeyword, ikB: b.imageKeyword, severity: 'MINOR', reason: `${(j*100).toFixed(0)}% word overlap` });
          minor++;
        }
      }
    }
  }
}

console.log(`👁️ Visual Collision Check`);
console.log(`${'='.repeat(50)}`);
console.log(`CRITICAL (identical): ${critical}`);
console.log(`MAJOR (containment): ${major}`);
console.log(`MINOR (≥50% overlap): ${minor}\n`);

for (const i of issues) {
  const icon = i.severity === 'CRITICAL' ? '🔴' : i.severity === 'MAJOR' ? '🟡' : '🔵';
  console.log(`${icon} [${i.severity}] L${i.level}: ${i.a} ↔ ${i.b}`);
  console.log(`  "${i.ikA}" vs "${i.ikB}" — ${i.reason}`);
}

const report = `# Visual Collision Report — ${new Date().toISOString().slice(0,10)}

## Summary
- CRITICAL (identical imageKeyword): ${critical}
- MAJOR (containment): ${major}
- MINOR (≥50% word overlap): ${minor}

## Issues

${issues.map(i => `- **[${i.severity}]** L${i.level}: **${i.a}** ↔ **${i.b}** — "${i.ikA}" vs "${i.ikB}" (${i.reason})`).join('\n')}
`;

fs.writeFileSync(path.join(DIR, 'VISUAL-COLLISION-REPORT.md'), report);
console.log(`\n📄 Report written to VISUAL-COLLISION-REPORT.md`);
