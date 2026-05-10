#!/usr/bin/env node
// anchor-verify.mjs — Authority dictionary semantic anchor verification

import { readFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';
import { execSync } from 'child_process';

const DIR = new URL('.', import.meta.url).pathname;

function loadWords(filePath) {
  const src = readFileSync(filePath, 'utf-8');
  const match = src.match(/=\s*(\[[\s\S]*\])\s*;?\s*$/);
  if (!match) throw new Error(`Cannot parse ${filePath}`);
  return JSON.parse(match[1]);
}

function askAI(prompt) {
  try {
    const escaped = prompt.replace(/"/g, '\\"').replace(/\n/g, '\\n');
    const result = execSync(
      `openclaw infer model run --model "github-copilot/gpt-5.2" --prompt "${escaped}"`,
      { timeout: 60000 }
    ).toString();
    const lines = result.split('\n');
    const outputIdx = lines.findIndex(l => l.startsWith('outputs:'));
    return outputIdx >= 0 ? lines.slice(outputIdx + 1).join('\n').trim() : result.trim();
  } catch (e) {
    return null;
  }
}

function checkWord(word, definition) {
  const prompt = `You are a lexicographer reviewing a children's dictionary for 10-year-old ESL learners.

Word: "${word}"
Our definition: "${definition}"

Compare with standard learner dictionary definitions (Oxford, Collins COBUILD, Longman):
1. Is the core meaning accurate?
2. Is anything misleading or factually wrong?
3. For this word's most common meaning, does our definition capture it?

Reply in this format:
VERDICT: ACCURATE / INACCURATE / PARTIAL
ISSUE: (only if not ACCURATE) brief description`;

  const response = askAI(prompt);
  if (!response) return { verdict: 'ERROR', issue: 'AI call failed' };

  const verdictMatch = response.match(/VERDICT:\s*(ACCURATE|INACCURATE|PARTIAL)/i);
  const issueMatch = response.match(/ISSUE:\s*(.+)/i);

  const verdict = verdictMatch ? verdictMatch[1].toUpperCase() : 'ERROR';
  const issue = issueMatch ? issueMatch[1].trim() : '';

  return { verdict, issue };
}

// Parse args
const args = process.argv.slice(2);
let files = [];
let sampleSize = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--sample' && args[i + 1]) {
    sampleSize = parseInt(args[i + 1]);
    i++;
  } else {
    files.push(args[i].startsWith('/') ? args[i] : join(DIR, args[i]));
  }
}

if (files.length === 0) {
  files = readdirSync(DIR)
    .filter(f => f.match(/^words-level.*\.js$/))
    .sort()
    .map(f => join(DIR, f));
}

for (const file of files) {
  const fname = basename(file);
  let words = loadWords(file);
  const total = words.length;

  if (sampleSize && sampleSize < words.length) {
    // Random sample
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    words = shuffled.slice(0, sampleSize);
  }

  const results = { ACCURATE: [], INACCURATE: [], PARTIAL: [], ERROR: [] };

  console.log(`=== Anchor Verify ===`);
  console.log(`File: ${fname} (${total} words${sampleSize ? `, sample ${words.length}` : ''})`);
  console.log();

  for (let i = 0; i < words.length; i++) {
    const entry = words[i];
    process.stderr.write(`  [${i + 1}/${words.length}] ${entry.word}...`);
    const result = checkWord(entry.word, entry.definition);
    results[result.verdict] = results[result.verdict] || [];
    results[result.verdict].push({ word: entry.word, issue: result.issue, def: entry.definition });
    process.stderr.write(` ${result.verdict}\n`);
  }

  const checked = words.length;
  const pct = (arr) => checked > 0 ? ((arr.length / checked) * 100).toFixed(1) : '0.0';

  console.log(`ACCURATE: ${results.ACCURATE.length} (${pct(results.ACCURATE)}%)`);
  console.log(`PARTIAL: ${results.PARTIAL.length} (${pct(results.PARTIAL)}%)`);
  console.log(`INACCURATE: ${results.INACCURATE.length} (${pct(results.INACCURATE)}%)`);
  if (results.ERROR.length) console.log(`ERROR: ${results.ERROR.length} (${pct(results.ERROR)}%)`);

  if (results.INACCURATE.length) {
    console.log(`\nINACCURATE:`);
    for (const r of results.INACCURATE) {
      console.log(`  ${r.word} — "${r.def}" → ${r.issue}`);
    }
  }
  if (results.PARTIAL.length) {
    console.log(`\nPARTIAL:`);
    for (const r of results.PARTIAL) {
      console.log(`  ${r.word} — ${r.issue}`);
    }
  }
  console.log();
}
