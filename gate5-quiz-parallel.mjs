#!/usr/bin/env node
/**
 * Gate 5: Real Quiz Test with 3-AI Cross-Simulation (Parallel Version)
 * Runs all 6 AI calls per word in parallel for speed.
 * 
 * Usage: node gate5-quiz-parallel.mjs <file> [--sample N]
 */

import { readFileSync, writeFileSync } from 'fs';
import { execFile } from 'child_process';
import { basename } from 'path';

const file = process.argv[2];
if (!file) { console.error('Usage: node gate5-quiz-parallel.mjs <file> [--sample N]'); process.exit(1); }

const sampleIdx = process.argv.indexOf('--sample');
const sampleN = sampleIdx >= 0 ? parseInt(process.argv[sampleIdx + 1]) : 30;

const src = readFileSync(file, 'utf8');
const match = src.match(/const (\w+)=(\[.*\]);/s);
if (!match) { console.error('Cannot parse word bank'); process.exit(1); }
const bank = JSON.parse(match[2]);

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

function askAIAsync(model, prompt) {
  return new Promise((resolve) => {
    const escaped = prompt.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\$/g, '\\$').replace(/`/g, '\\`');
    execFile('openclaw', ['infer', 'model', 'run', '--model', model, '--prompt', prompt], 
      { timeout: 90000 },
      (err, stdout, stderr) => {
        if (err) { resolve('ERROR'); return; }
        const lines = stdout.split('\n');
        const outputIdx = lines.findIndex(l => l.startsWith('outputs:'));
        const text = outputIdx >= 0 ? lines.slice(outputIdx + 1).join('\n').trim() : stdout.trim();
        const letterMatch = text.match(/\b([ABCD])\b/);
        resolve(letterMatch ? letterMatch[1] : text.slice(0, 20));
      }
    );
  });
}

function pickDistractors(targetWord, allWords, count = 3) {
  const candidates = allWords.filter(w => w.word !== targetWord.word);
  return shuffle(candidates).slice(0, count);
}

function buildTestA(word, distractors) {
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
  const example = word.example.replace(new RegExp(`\\b${word.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi'), '___');
  if (example === word.example) return null;
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

// Process words one at a time, but parallelize the 6 AI calls per word
const BATCH_SIZE = 2;
const results = [];
let passCount = 0, marginalCount = 0, failCount = 0;

async function processWord(word, idx) {
  const distractors = pickDistractors(word, bank);
  const testA = buildTestA(word, distractors);
  const testB = buildTestB(word, distractors);
  
  // Run all AI calls in parallel
  const promises = MODELS.map(m => askAIAsync(m, testA.prompt));
  if (testB) promises.push(...MODELS.map(m => askAIAsync(m, testB.prompt)));
  
  const answers = await Promise.all(promises);
  
  const resultsA = MODELS.map((m, i) => {
    const ans = answers[i];
    const correct = ans === testA.correctLabel;
    return { model: m.split('/')[1], answer: ans, correct };
  });
  
  let resultsB = [];
  if (testB) {
    resultsB = MODELS.map((m, i) => {
      const ans = answers[3 + i];
      const correct = ans === testB.correctLabel;
      return { model: m.split('/')[1], answer: ans, correct };
    });
  }
  
  const aCorrect = resultsA.filter(r => r.correct).length;
  const bCorrect = testB ? resultsB.filter(r => r.correct).length : 3;
  const worstScore = Math.min(aCorrect, bCorrect);
  
  let status;
  if (worstScore >= 3) status = 'PASS';
  else if (worstScore >= 2) status = 'MARGINAL';
  else status = 'FAIL';
  
  const aStr = resultsA.map(r => `${r.model}=${r.answer}${r.correct?'✓':'✗'}`).join(' ');
  const bStr = testB ? resultsB.map(r => `${r.model}=${r.answer}${r.correct?'✓':'✗'}`).join(' ') : 'N/A';
  console.log(`[${idx+1}/${sampled.length}] ${word.word}: ${status} | A(${aCorrect}/3): ${aStr} | B(${testB?bCorrect+'/3':'N/A'}): ${bStr}`);
  
  return {
    word: word.word, definition: word.definition, example: word.example,
    status, testA: { correct: testA.correctLabel, results: resultsA },
    testB: testB ? { correct: testB.correctLabel, results: resultsB } : null,
    distractors: distractors.map(d => d.word)
  };
}

async function main() {
  for (let b = 0; b < sampled.length; b += BATCH_SIZE) {
    const batch = sampled.slice(b, b + BATCH_SIZE);
    const batchResults = await Promise.all(
      batch.map((word, i) => processWord(word, b + i))
    );
    results.push(...batchResults);
  }
  
  for (const r of results) {
    if (r.status === 'PASS') passCount++;
    else if (r.status === 'MARGINAL') marginalCount++;
    else failCount++;
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
  writeFileSync(`gate5-quiz-${fname}.json`, JSON.stringify({ file: fname, total: bank.length, sampled: sampled.length, pass: passCount, marginal: marginalCount, fail: failCount, results }, null, 2));
  
  console.log(`\n=== DONE: ${fname} ===`);
  console.log(`PASS: ${passCount}  MARGINAL: ${marginalCount}  FAIL: ${failCount}`);
  console.log(`Report: ${reportPath}`);
}

main().catch(e => { console.error(e); process.exit(1); });
