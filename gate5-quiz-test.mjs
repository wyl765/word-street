#!/usr/bin/env node
/**
 * Gate 5: Real Quiz Test with 3-AI Cross-Simulation
 * 
 * For each sampled word, constructs two 4-choice quizzes (definition→word, fill-in-blank)
 * and has 3 AI models answer as Mark (10yo Chinese boy, ~2nd grade English).
 * 
 * Usage: node gate5-quiz-test.mjs <file> [--sample N]
 */

import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { basename } from 'path';

const file = process.argv[2];
if (!file) { console.error('Usage: node gate5-quiz-test.mjs <file> [--sample N]'); process.exit(1); }

const sampleIdx = process.argv.indexOf('--sample');
const sampleN = sampleIdx >= 0 ? parseInt(process.argv[sampleIdx + 1]) : 30;

// Load word bank
const src = readFileSync(file, 'utf8');
const match = src.match(/const (\w+)=(\[.*\]);/s);
if (!match) { console.error('Cannot parse word bank'); process.exit(1); }
const bank = JSON.parse(match[2]);

// Shuffle and sample
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const sampled = shuffle(bank).slice(0, Math.min(sampleN, bank.length));

const MODELS = [
  'github-copilot/gpt-4o',
  'github-copilot/gpt-4.1',
  'github-copilot/gemini-2.5-pro'
];

function askAI(model, prompt) {
  try {
    const escaped = prompt.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\$/g, '\\$').replace(/`/g, '\\`');
    const result = execSync(
      `openclaw infer model run --model "${model}" --prompt "${escaped}"`,
      { timeout: 90000, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }
    );
    const lines = result.split('\n');
    const outputIdx = lines.findIndex(l => l.startsWith('outputs:'));
    const text = outputIdx >= 0 ? lines.slice(outputIdx + 1).join('\n').trim() : result.trim();
    // Extract just the letter
    const letterMatch = text.match(/\b([ABCD])\b/);
    return letterMatch ? letterMatch[1] : text.slice(0, 20);
  } catch(e) { return 'ERROR'; }
}

// Pick distractors: same-level words that are somewhat related (same first letter or similar length)
function pickDistractors(targetWord, allWords, count = 3) {
  const candidates = allWords.filter(w => w.word !== targetWord.word);
  const shuffled = shuffle(candidates);
  return shuffled.slice(0, count);
}

function buildTestA(word, distractors) {
  // Definition → pick the word
  const options = shuffle([word, ...distractors]);
  const labels = ['A', 'B', 'C', 'D'];
  const correctLabel = labels[options.findIndex(o => o.word === word.word)];
  const optionText = options.map((o, i) => `${labels[i]}) ${o.word}`).join('  ');
  
  const prompt = `You are Mark, a 10-year-old Chinese boy. Your English is about 2nd grade level.
Read this definition and pick the word it describes:
"${word.definition}"
${optionText}
Reply with ONLY the letter.`;
  
  return { prompt, correctLabel, type: 'definition→word' };
}

function buildTestB(word, distractors) {
  // Fill in blank from example
  const example = word.example.replace(new RegExp(`\\b${word.word}\\b`, 'gi'), '___');
  if (example === word.example) {
    // Word not found literally in example, use simpler blank
    return null;
  }
  const options = shuffle([word, ...distractors]);
  const labels = ['A', 'B', 'C', 'D'];
  const correctLabel = labels[options.findIndex(o => o.word === word.word)];
  const optionText = options.map((o, i) => `${labels[i]}) ${o.word}`).join('  ');
  
  const prompt = `You are Mark, a 10-year-old Chinese boy. Your English is about 2nd grade level.
Fill in the blank:
"${example}"
${optionText}
Reply with ONLY the letter.`;
  
  return { prompt, correctLabel, type: 'fill-in-blank' };
}

// Run tests
const results = [];
let passCount = 0, marginalCount = 0, failCount = 0;

for (let i = 0; i < sampled.length; i++) {
  const word = sampled[i];
  const distractors = pickDistractors(word, bank);
  
  console.log(`[${i+1}/${sampled.length}] Testing: ${word.word}`);
  
  const testA = buildTestA(word, distractors);
  const testB = buildTestB(word, distractors);
  
  // Run Test A across 3 models
  const resultsA = MODELS.map(m => {
    const ans = askAI(m, testA.prompt);
    const correct = ans === testA.correctLabel;
    console.log(`  TestA ${m.split('/')[1]}: ${ans} (correct: ${testA.correctLabel}) ${correct ? '✓' : '✗'}`);
    return { model: m.split('/')[1], answer: ans, correct };
  });
  
  // Run Test B if available
  let resultsB = [];
  if (testB) {
    resultsB = MODELS.map(m => {
      const ans = askAI(m, testB.prompt);
      const correct = ans === testB.correctLabel;
      console.log(`  TestB ${m.split('/')[1]}: ${ans} (correct: ${testB.correctLabel}) ${correct ? '✓' : '✗'}`);
      return { model: m.split('/')[1], answer: ans, correct };
    });
  }
  
  // Scoring: take worst across tests
  const aCorrect = resultsA.filter(r => r.correct).length;
  const bCorrect = testB ? resultsB.filter(r => r.correct).length : 3; // skip if no testB
  const worstScore = Math.min(aCorrect, bCorrect);
  
  let status;
  if (worstScore >= 3) { status = 'PASS'; passCount++; }
  else if (worstScore >= 2) { status = 'MARGINAL'; marginalCount++; }
  else { status = 'FAIL'; failCount++; }
  
  console.log(`  → ${status} (A: ${aCorrect}/3, B: ${testB ? bCorrect + '/3' : 'N/A'})`);
  
  results.push({
    word: word.word,
    definition: word.definition,
    example: word.example,
    status,
    testA: { correct: testA.correctLabel, results: resultsA },
    testB: testB ? { correct: testB.correctLabel, results: resultsB } : null,
    distractors: distractors.map(d => d.word)
  });
}

// Generate report
const fname = basename(file, '.js');
const report = [];
report.push(`# Gate 5 Quiz Test: ${fname}`);
report.push(`\nDate: ${new Date().toISOString()}`);
report.push(`Sample: ${sampled.length} / ${bank.length} words`);
report.push(`Models: ${MODELS.map(m => m.split('/')[1]).join(', ')}`);
report.push(`\n## Summary`);
report.push(`- **PASS:** ${passCount} (${(passCount/sampled.length*100).toFixed(1)}%)`);
report.push(`- **MARGINAL:** ${marginalCount} (${(marginalCount/sampled.length*100).toFixed(1)}%)`);
report.push(`- **FAIL:** ${failCount} (${(failCount/sampled.length*100).toFixed(1)}%)`);

if (failCount > 0 || marginalCount > 0) {
  report.push(`\n## Issues`);
  for (const r of results.filter(r => r.status !== 'PASS')) {
    report.push(`\n### ${r.word} [${r.status}]`);
    report.push(`- **Definition:** ${r.definition}`);
    report.push(`- **Example:** ${r.example}`);
    report.push(`- **Distractors:** ${r.distractors.join(', ')}`);
    report.push(`- **Test A (def→word):** correct=${r.testA.correct} | ${r.testA.results.map(x => `${x.model}=${x.answer}${x.correct?'✓':'✗'}`).join(', ')}`);
    if (r.testB) {
      report.push(`- **Test B (fill-blank):** correct=${r.testB.correct} | ${r.testB.results.map(x => `${x.model}=${x.answer}${x.correct?'✓':'✗'}`).join(', ')}`);
    }
  }
}

report.push(`\n## All Results`);
report.push(`| Word | Status | TestA | TestB |`);
report.push(`|------|--------|-------|-------|`);
for (const r of results) {
  const a = r.testA.results.map(x => x.correct ? '✓' : '✗').join('');
  const b = r.testB ? r.testB.results.map(x => x.correct ? '✓' : '✗').join('') : 'N/A';
  report.push(`| ${r.word} | ${r.status} | ${a} | ${b} |`);
}

const reportPath = `GATE5-QUIZ-${fname}.md`;
writeFileSync(reportPath, report.join('\n'));
console.log(`\n=== DONE ===`);
console.log(`PASS: ${passCount}  MARGINAL: ${marginalCount}  FAIL: ${failCount}`);
console.log(`Report: ${reportPath}`);

// Also output JSON for programmatic use
writeFileSync(`gate5-quiz-${fname}.json`, JSON.stringify({ file: fname, total: bank.length, sampled: sampled.length, pass: passCount, marginal: marginalCount, fail: failCount, results }, null, 2));
