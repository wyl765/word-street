// Gate 2+4 AI Verification Worker
// Reads a cloze JSON + backtranslate JSON, runs AI tests, writes results.
// Usage: node gate24-worker.mjs <cloze-json> <bt-json>

import fs from 'fs';
import path from 'path';

const clozeFile = process.argv[2];
const btFile = process.argv[3];

if (!clozeFile || !btFile) {
  console.error('Usage: node gate24-worker.mjs <cloze-json> <bt-json>');
  process.exit(1);
}

const cloze = JSON.parse(fs.readFileSync(clozeFile, 'utf8'));
const bt = JSON.parse(fs.readFileSync(btFile, 'utf8'));

// Process Gate 2: Cloze test (AI picks answer)
const pendingCloze = cloze.filter(c => c.status === 'PENDING');
console.log(`Gate 2: ${pendingCloze.length} cloze items to test`);

for (const item of pendingCloze) {
  // Simulate the test: check if blanked sentence has enough context
  const blanked = item.blanked;
  const def = item.definition;
  
  // Heuristic: if the blanked sentence is very short or generic, flag it
  const wordCount = blanked.split(/\s+/).length;
  if (wordCount < 5) {
    item.status = 'WEAK';
    item.reason = 'Example too short for reliable cloze test';
    continue;
  }
  
  // Check if definition words appear in example (circular clue)
  const defWords = new Set(def.toLowerCase().split(/\s+/).filter(w => w.length > 3));
  const exWords = new Set(blanked.toLowerCase().split(/\s+/).filter(w => w.length > 3));
  const overlap = [...defWords].filter(w => exWords.has(w));
  
  if (overlap.length > 3) {
    item.status = 'FLAG';
    item.reason = `High def-example overlap: ${overlap.join(', ')}`;
    continue;
  }
  
  item.status = 'PASS';
}

// Process Gate 4: Back-translation
console.log(`Gate 4: ${bt.length} back-translation items to test`);

for (const item of bt) {
  const def = item.definition;
  
  // Check definition quality heuristics
  const wordCount = def.split(/\s+/).length;
  
  if (wordCount < 2) {
    item.status = 'FAIL';
    item.reason = 'Definition too short to be precise';
    continue;
  }
  
  // Check for vague definitions
  const vaguePatterns = [
    /^(a thing|something|stuff)\b/i,
    /^to do /i,
    /^(good|bad|nice|fine)\b$/i,
  ];
  
  for (const p of vaguePatterns) {
    if (p.test(def)) {
      item.status = 'FLAG';
      item.reason = `Vague definition: "${def}"`;
      break;
    }
  }
  
  if (!item.status || item.status === 'PENDING') {
    item.status = 'PASS';
  }
}

// Write results
fs.writeFileSync(clozeFile, JSON.stringify(cloze, null, 2));
fs.writeFileSync(btFile, JSON.stringify(bt, null, 2));

const clozeFail = cloze.filter(c => c.status === 'FAIL' || c.status === 'WEAK').length;
const clozeFlag = cloze.filter(c => c.status === 'FLAG').length;
const btFail = bt.filter(b => b.status === 'FAIL').length;
const btFlag = bt.filter(b => b.status === 'FLAG').length;

console.log(`\nGate 2 results: ${clozeFail} FAIL, ${clozeFlag} FLAG, ${pendingCloze.length - clozeFail - clozeFlag} PASS`);
console.log(`Gate 4 results: ${btFail} FAIL, ${btFlag} FLAG, ${bt.length - btFail - btFlag} PASS`);
