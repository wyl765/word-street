#!/usr/bin/env node
// Pronunciation Audit Anti-Cheat Verifier
// Checks that the report contains REAL data, not template garbage

import { readFileSync } from 'fs';

const reportPath = process.argv[2];
if (!reportPath) {
  console.error('Usage: node verify-pronunciation-audit.mjs <report.md>');
  process.exit(1);
}

const report = readFileSync(reportPath, 'utf8');
const lines = report.split('\n').filter(l => l.match(/^[✅⚠🔴]/));

console.log(`\n=== PRONUNCIATION AUDIT VERIFICATION ===\n`);
console.log(`Total audit lines: ${lines.length}`);

let fails = [];

// CHECK 1: Must have >= 5000 audit lines
if (lines.length < 5000) {
  fails.push(`FAIL: Only ${lines.length} audit lines, need >= 5000`);
}

// CHECK 2: IPA must not be placeholder
const placeholderIPA = lines.filter(l => l.includes('— /-/ —') || l.includes('— /—/ —') || l.includes('— // —'));
if (placeholderIPA.length > 10) {
  fails.push(`FAIL: ${placeholderIPA.length} lines have placeholder IPA (/-/ or empty). Must have real IPA for each word.`);
  console.log(`  Examples of placeholder IPA:`);
  placeholderIPA.slice(0, 5).forEach(l => console.log(`    ${l.slice(0, 120)}`));
}

// CHECK 3: Level must not be placeholder
const placeholderLevel = lines.filter(l => l.includes('level:X') || l.includes('level:?'));
if (placeholderLevel.length > 10) {
  fails.push(`FAIL: ${placeholderLevel.length} lines have placeholder level (level:X). Must have real level (1, 2, 2a, etc).`);
}

// CHECK 4: Must have some DANGER words (Claude found 19, GPT found 18)
const dangerLines = lines.filter(l => l.includes('DANGER'));
if (dangerLines.length === 0) {
  fails.push(`FAIL: 0 DANGER words found. Claude found 19, GPT found 18. Gemini finding 0 = didn't actually check.`);
}

// CHECK 5: IPA diversity - not all same
const ipas = lines.map(l => {
  const m = l.match(/— \/(.*?)\/ —/);
  return m ? m[1] : null;
}).filter(Boolean);
const uniqueIPAs = new Set(ipas);
if (uniqueIPAs.size < 500) {
  fails.push(`FAIL: Only ${uniqueIPAs.size} unique IPA transcriptions. With 5205 words there should be thousands of unique IPAs.`);
}

// CHECK 6: Source diversity - must have both freedictionary and macos-samantha
const hasFD = lines.some(l => l.includes('freedictionary'));
const hasSam = lines.some(l => l.includes('macos-samantha'));
if (!hasFD || !hasSam) {
  fails.push(`FAIL: Missing source types. freedictionary=${hasFD}, macos-samantha=${hasSam}. Both must appear.`);
}

// CHECK 7: Spot-check specific words that MUST be DANGER/WARN
// These are heteronyms that Claude and GPT both flagged
const mustFlag = ['appropriate', 'attribute', 'contrast', 'convict', 'delegate', 'deliberate', 'graduate', 'project', 'subordinate', 'transport'];
const reportLower = report.toLowerCase();
for (const w of mustFlag) {
  // Check if these heteronyms are flagged as WARN or DANGER
  const wordLine = lines.find(l => {
    const parts = l.split(' — ');
    return parts[0] && parts[0].replace(/^[✅⚠🔴]\s*/, '').trim().toLowerCase() === w;
  });
  if (wordLine && wordLine.startsWith('✅')) {
    fails.push(`FAIL: "${w}" marked SAFE but it's a heteronym (noun/verb have different pronunciation). Should be WARN or DANGER.`);
  }
}

// CHECK 8: Verify WARN reasons are diverse (not all identical)
const warnLines = lines.filter(l => l.includes('WARN'));
const warnReasons = warnLines.map(l => {
  const parts = l.split('WARN');
  return parts[1] ? parts[1].trim().slice(0, 60) : '';
}).filter(Boolean);
const uniqueReasons = new Set(warnReasons);
if (warnLines.length > 100 && uniqueReasons.size < 5) {
  fails.push(`FAIL: ${warnLines.length} WARN lines but only ${uniqueReasons.size} unique reasons. Template-copied.`);
}

// SUMMARY
console.log(`\nAudit lines: ${lines.length}`);
console.log(`Unique IPAs: ${uniqueIPAs.size}`);
console.log(`DANGER: ${dangerLines.length}`);
console.log(`WARN: ${warnLines.length}`);
console.log(`SAFE: ${lines.filter(l => l.includes('SAFE')).length}`);
console.log(`Placeholder IPA: ${placeholderIPA.length}`);
console.log(`Placeholder Level: ${placeholderLevel.length}`);
console.log(`Unique WARN reasons: ${uniqueReasons.size}`);

if (fails.length === 0) {
  console.log(`\n✅ PASS — Report looks genuine.\n`);
  process.exit(0);
} else {
  console.log(`\n🔴 FAILED — ${fails.length} checks failed:\n`);
  fails.forEach(f => console.log(`  ${f}`));
  console.log(`\nReport is REJECTED. Redo the audit with REAL data.\n`);
  process.exit(1);
}
