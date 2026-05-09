#!/usr/bin/env node
/**
 * Word Street — Prototype Effect Check
 * Checks if imageKeyword uses prototypical instances for concrete nouns
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

// Concrete noun indicators in definitions
const CONCRETE_INDICATORS = [
  /^a (kind|type|sort) of/i,
  /^a (small|large|big|tiny|long|round|flat|soft|hard)/i,
  /^an? [a-z]+ (animal|bird|fish|plant|fruit|food|tool|machine|device|instrument|vehicle)/i,
  /^an? (animal|bird|fish|plant|fruit|food|tool|machine|device|instrument|vehicle)/i,
  /^an? [a-z]+ that/i,
  /^something (you|that)/i,
];

// Obscure/rare modifiers that kids wouldn't know
const OBSCURE_MODIFIERS = [
  'ornate', 'pristine', 'elegant', 'exquisite', 'ornamental', 'decorative',
  'translucent', 'iridescent', 'ethereal', 'whimsical', 'intricate',
  'rustic', 'baroque', 'vintage', 'antique', 'miniature', 'colossal',
  'majestic', 'regal', 'grandiose', 'elaborate', 'sophisticated',
];

const issues = [];

for (const e of entries) {
  const ik = e.imageKeyword;
  const ikWords = ik.toLowerCase().split(/\s+/);
  const isConcrete = CONCRETE_INDICATORS.some(p => p.test(e.definition));
  
  // Check 1: Too abstract (fewer than 2 words for concrete nouns)
  if (isConcrete && ikWords.length < 2) {
    // Single word imageKeyword for a concrete noun — might be too abstract
    // But if the word itself IS the concrete noun (e.g. "apple" → "apple"), that's fine
    if (ik.toLowerCase() !== e.word.toLowerCase()) {
      issues.push({
        word: e.word, level: e.level, imageKeyword: ik,
        severity: 'MINOR', reason: 'imageKeyword may be too abstract for concrete noun (single word, not the word itself)'
      });
    }
  }

  // Check 2: Too generic (just repeating the word)
  if (ikWords.length === 1 && ik.toLowerCase() === e.word.toLowerCase() && isConcrete) {
    // For very common concrete nouns this is fine, but for less common ones, a scene helps
    if (e.level >= 3) {
      issues.push({
        word: e.word, level: e.level, imageKeyword: ik,
        severity: 'MINOR', reason: 'L3+ concrete noun uses bare word as imageKeyword — consider adding scene context'
      });
    }
  }

  // Check 3: Obscure modifiers in imageKeyword
  for (const mod of OBSCURE_MODIFIERS) {
    if (ik.toLowerCase().includes(mod)) {
      issues.push({
        word: e.word, level: e.level, imageKeyword: ik,
        severity: 'MINOR', reason: `imageKeyword contains obscure modifier "${mod}"`
      });
    }
  }

  // Check 4: imageKeyword too long (>6 words might confuse image generation)
  if (ikWords.length > 6) {
    issues.push({
      word: e.word, level: e.level, imageKeyword: ik,
      severity: 'MINOR', reason: `imageKeyword too verbose (${ikWords.length} words)`
    });
  }
}

console.log(`🎯 Prototype Effect Check`);
console.log(`${'='.repeat(50)}`);
console.log(`Total issues: ${issues.length}\n`);

for (const i of issues) {
  console.log(`🔵 [MINOR] ${i.word} (L${i.level}): "${i.imageKeyword}"`);
  console.log(`  ${i.reason}`);
}

const report = `# Prototype Effect Report — ${new Date().toISOString().slice(0,10)}

## Summary
- Total issues: ${issues.length}

## Issues

${issues.map(i => `- **${i.word}** (L${i.level}): "${i.imageKeyword}" — ${i.reason}`).join('\n')}

## What This Checks
1. Concrete nouns with too-abstract imageKeyword (single word, not descriptive enough)
2. L3+ words using bare word as imageKeyword (could benefit from scene context)
3. Obscure modifiers in imageKeyword that image generators may misinterpret
4. Overly verbose imageKeywords (>6 words)
`;

fs.writeFileSync(path.join(DIR, 'PROTOTYPE-CHECK-REPORT.md'), report);
console.log(`\n📄 Report written to PROTOTYPE-CHECK-REPORT.md`);
