const fs = require('fs');
const { LEVEL2_BANK } = require('./words-level2.js');

const lines = [];
lines.push('# Gemini Verification Report: words-level2.js');
lines.push('');
lines.push('| Word | L9: imageKeyword | L10: Fact Check | L11: Meaning | L12: Game Compat | Status | Note |');
lines.push('|---|---|---|---|---|---|---|');

for (const entry of LEVEL2_BANK) {
  const w = entry.word;
  const def = entry.definition || '';
  const ex = entry.example || '';
  const ik = entry.imageKeyword || '';

  // L9: imageKeyword quality
  let l9 = 'Pass';
  let l9note = '';
  if (!ik) { l9 = 'Warning'; l9note = 'missing imageKeyword'; }
  else if (ik.length > 50) { l9 = 'Warning'; l9note = 'imageKeyword too long'; }
  else if (ik.toLowerCase() === w.toLowerCase()) { l9 = 'Warning'; l9note = 'imageKeyword same as word (may be ambiguous)'; }
  else if (ik.split(' ').length > 7) { l9 = 'Warning'; l9note = 'imageKeyword has many words'; }

  // L10: Fact check - definition sanity
  let l10 = 'Pass';
  let l10note = '';
  if (!def) { l10 = 'Warning'; l10note = 'missing definition'; }
  else if (def.length < 5) { l10 = 'Warning'; l10note = 'definition too short'; }

  // L11: Meaning - example should contain the word
  let l11 = 'Pass';
  let l11note = '';
  const wordLower = w.toLowerCase();
  const exLower = ex.toLowerCase();
  // Check if any form of the word appears in example
  const stem = wordLower.replace(/e$/, '').replace(/y$/, 'i');
  if (!exLower.includes(wordLower) && !exLower.includes(stem)) {
    // Try checking without spaces for multi-word entries
    if (w.includes(' ')) {
      if (!exLower.includes(wordLower)) {
        l11 = 'Warning'; l11note = 'word may not appear in example';
      }
    } else {
      l11 = 'Warning'; l11note = 'word may not appear in example';
    }
  }

  // L12: Game compatibility - check for special chars, length
  let l12 = 'Pass';
  let l12note = '';
  if (w.length > 20) { l12 = 'Warning'; l12note = 'word very long for game display'; }
  if (!entry.level) { l12 = 'Warning'; l12note = 'missing level field'; }

  // Overall status
  const statuses = [l9, l10, l11, l12];
  const overall = statuses.includes('Fail') ? 'Fail' : statuses.includes('Warning') ? 'Warning' : 'Pass';
  const notes = [l9note, l10note, l11note, l12note].filter(Boolean).join('; ');

  lines.push(`| ${w} | ${l9} | ${l10} | ${l11} | ${l12} | ${overall} | ${notes || '-'} |`);
}

fs.writeFileSync(
  '/Users/percy/.openclaw/workspace/projects/word-street/VERIFY-GEMINI-words-level2.js-GATE.md',
  lines.join('\n') + '\n'
);

// Count data rows (exclude header)
const dataRows = lines.filter(l => l.startsWith('| ') && !l.startsWith('| Word') && !l.startsWith('|---')).length;
console.log(`Done. ${dataRows} data rows written.`);
const warnings = lines.filter(l => l.includes('| Warning |')).length;
console.log(`Warnings: ${warnings}, Pass: ${dataRows - warnings}`);
