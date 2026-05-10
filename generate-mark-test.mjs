#!/usr/bin/env node
// Gate 5: Generate Mark's word test from a word bank file
// Usage: node generate-mark-test.mjs words-level1.js --count 30 --output mark-test-L1-batch1.md

import { readFileSync, writeFileSync } from 'fs';
import { basename, dirname, resolve } from 'path';
import { execSync } from 'child_process';

// --- Parse args ---
const args = process.argv.slice(2);
const wordFile = args[0];
if (!wordFile) { console.error('Usage: node generate-mark-test.mjs <wordfile> [--count N] [--output file.md]'); process.exit(1); }

let count = 30, output = null;
for (let i = 1; i < args.length; i++) {
  if (args[i] === '--count' && args[i+1]) { count = parseInt(args[i+1]); i++; }
  if (args[i] === '--output' && args[i+1]) { output = args[i+1]; i++; }
}

// --- Load words ---
function loadWords(filePath) {
  const absPath = resolve(filePath);
  const dir = dirname(new URL(import.meta.url).pathname);
  const result = execSync(`node "${dir}/parse-words.cjs" "${absPath}"`, { maxBuffer: 20*1024*1024 }).toString();
  return JSON.parse(result);
}

const words = loadWords(wordFile);
if (words.length < 4) { console.error('Need at least 4 words'); process.exit(1); }

// --- Helpers ---
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

function pick(arr, n) { return shuffle(arr).slice(0, n); }

function pickDistractors(allWords, correct, n = 3) {
  const pool = allWords.filter(w => w.word !== correct.word);
  return pick(pool, n);
}

function insertAnswer(distractors, correct) {
  const pos = Math.floor(Math.random() * 4);
  const opts = [...distractors];
  opts.splice(pos, 0, correct);
  return { opts, correctIdx: pos };
}

const LABELS = ['A', 'B', 'C', 'D'];

// Question type generators
const questionTypes = [
  // Type 1: 看定义选词
  (word, allWords) => {
    const dist = pickDistractors(allWords, word);
    const { opts, correctIdx } = insertAnswer(dist, word);
    return {
      type: '看定义选词',
      prompt: `"${word.definition}"`,
      options: opts.map(w => w.word),
      answer: LABELS[correctIdx],
      answerWord: word.word
    };
  },
  // Type 2: 例句填空
  (word, allWords) => {
    const dist = pickDistractors(allWords, word);
    const { opts, correctIdx } = insertAnswer(dist, word);
    // Replace the word in the example with ___
    const blank = word.example.replace(new RegExp(`\\b${word.word}\\b`, 'gi'), '___');
    return {
      type: '例句填空',
      prompt: `"${blank}"`,
      options: opts.map(w => w.word),
      answer: LABELS[correctIdx],
      answerWord: word.word
    };
  },
  // Type 3: 看图选词
  (word, allWords) => {
    const dist = pickDistractors(allWords, word);
    const { opts, correctIdx } = insertAnswer(dist, word);
    return {
      type: '看图选词',
      prompt: `[图片关键词: ${word.imageKeyword || word.word}]`,
      options: opts.map(w => w.word),
      answer: LABELS[correctIdx],
      answerWord: word.word
    };
  },
  // Type 4: 语境理解 — use the example as context with blank
  (word, allWords) => {
    const dist = pickDistractors(allWords, word);
    const { opts, correctIdx } = insertAnswer(dist, word);
    const blank = word.example.replace(new RegExp(`\\b${word.word}\\b`, 'gi'), '___');
    return {
      type: '语境理解',
      prompt: blank,
      options: opts.map(w => w.word),
      answer: LABELS[correctIdx],
      answerWord: word.word
    };
  }
];

// --- Generate questions ---
const selected = pick(words, Math.min(count, words.length));
const questions = selected.map((word, i) => {
  const typeIdx = i % 4; // even distribution
  return questionTypes[typeIdx](word, words);
});

// Shuffle questions so types are mixed
const shuffledQs = shuffle(questions);

// --- Format output ---
const levelMatch = basename(wordFile).match(/level(\d+\w?)/);
const levelLabel = levelMatch ? `Level ${levelMatch[1]}` : basename(wordFile, '.js');
const batchLabel = output ? basename(output, '.md').replace(/mark-test-/i, '') : 'Batch';

let md = `# Mark's Word Test — ${levelLabel} ${batchLabel}\n`;
md += `## 说明：让Mark独立完成，不要提示。记录他的答案和反应。\n`;
md += `## 共 ${shuffledQs.length} 题，4种题型混合\n\n`;

const answerKey = [];

shuffledQs.forEach((q, i) => {
  const num = i + 1;
  md += `### Q${num} [${q.type}]\n`;
  md += `${q.prompt}\n`;
  q.options.forEach((opt, j) => {
    md += `${LABELS[j]}) ${opt}  `;
  });
  md += `\n答案: ___\n\n`;
  answerKey.push(`Q${num}: ${q.answer} (${q.answerWord})`);
});

md += `---\n\n`;
md += `<details>\n<summary>📋 答案 Key（测试完成后打开）</summary>\n\n`;
answerKey.forEach(a => { md += `${a}\n`; });
md += `\n</details>\n`;

if (output) {
  writeFileSync(output, md);
  console.log(`✅ Generated ${shuffledQs.length} questions → ${output}`);
} else {
  process.stdout.write(md);
}
