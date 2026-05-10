#!/usr/bin/env node
// Gate 5: Score Mark's test answers and analyze stuck points
// Usage: node score-mark-test.mjs mark-test-L1-batch1.md --answers "B,B,C,B,..."

import { readFileSync, writeFileSync, existsSync } from 'fs';

const args = process.argv.slice(2);
const testFile = args[0];
if (!testFile) { console.error('Usage: node score-mark-test.mjs <test.md> --answers "A,B,C,..."'); process.exit(1); }

let answersStr = '';
for (let i = 1; i < args.length; i++) {
  if (args[i] === '--answers' && args[i+1]) { answersStr = args[i+1]; i++; }
}
if (!answersStr) { console.error('Error: --answers required'); process.exit(1); }

const markAnswers = answersStr.split(',').map(a => a.trim().toUpperCase());

// Parse the test file to extract correct answers and question metadata
const testContent = readFileSync(testFile, 'utf-8');

// Extract answer key from <details> block
const keyMatch = testContent.match(/<summary>.*答案.*<\/summary>\s*([\s\S]*?)<\/details>/);
if (!keyMatch) { console.error('Cannot find answer key in test file'); process.exit(1); }

const keyLines = keyMatch[1].trim().split('\n').filter(l => l.trim());
const correctAnswers = [];
keyLines.forEach(line => {
  const m = line.match(/Q(\d+):\s*([A-D])\s*\((.+?)\)/);
  if (m) correctAnswers.push({ qNum: parseInt(m[1]), answer: m[2], word: m[3] });
});

if (correctAnswers.length === 0) { console.error('No answers parsed from key'); process.exit(1); }
if (markAnswers.length !== correctAnswers.length) {
  console.error(`Answer count mismatch: ${markAnswers.length} given, ${correctAnswers.length} expected`);
  process.exit(1);
}

// Extract question types and options from the test
const questionBlocks = [];
const qRegex = /### Q(\d+) \[(.+?)\]\n([\s\S]*?)(?=### Q\d+|---)/g;
let qm;
while ((qm = qRegex.exec(testContent)) !== null) {
  const qNum = parseInt(qm[1]);
  const qType = qm[2];
  const block = qm[3];
  // Extract options
  const opts = {};
  const optRegex = /([A-D])\)\s*(\S+)/g;
  let om;
  while ((om = optRegex.exec(block)) !== null) { opts[om[1]] = om[2]; }
  questionBlocks.push({ qNum, qType, options: opts });
}

// Score
let correct = 0;
const wrong = [];

correctAnswers.forEach((ca, i) => {
  const markAnswer = markAnswers[i];
  if (markAnswer === ca.answer) {
    correct++;
  } else {
    const qBlock = questionBlocks.find(q => q.qNum === ca.qNum);
    const markChoice = qBlock?.options?.[markAnswer] || markAnswer;
    wrong.push({
      qNum: ca.qNum,
      word: ca.word,
      correctAnswer: ca.answer,
      markAnswer,
      markChoice,
      qType: qBlock?.qType || '?'
    });
  }
});

const total = correctAnswers.length;
const pct = Math.round((correct / total) * 100);

// Output
console.log('=== Mark Test Results ===');
console.log(`Total: ${total} questions`);
console.log(`Correct: ${correct} (${pct}%)`);
console.log(`Wrong: ${total - correct} (${100 - pct}%)`);
console.log('');

if (wrong.length > 0) {
  console.log('Stuck points:');
  wrong.forEach(w => {
    console.log(`  Q${w.qNum}: ${w.word} — Mark选了${w.markChoice}（${w.qType}）`);
  });
  console.log('');
  console.log('Action items:');
  wrong.forEach(w => {
    console.log(`  ${w.word}: 需要review定义/例句，Mark在[${w.qType}]题型犯错`);
  });
}

// Save to mark-test-results.json (append)
const resultsFile = 'mark-test-results.json';
let results = [];
if (existsSync(resultsFile)) {
  try { results = JSON.parse(readFileSync(resultsFile, 'utf-8')); } catch(e) { results = []; }
}
results.push({
  testFile,
  date: new Date().toISOString().slice(0, 10),
  total,
  correct,
  pct,
  wrong: wrong.map(w => ({ qNum: w.qNum, word: w.word, markChoice: w.markChoice, qType: w.qType }))
});
writeFileSync(resultsFile, JSON.stringify(results, null, 2));
console.log(`\n📝 Results saved to ${resultsFile}`);
