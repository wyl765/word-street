#!/usr/bin/env node
/**
 * Gate 3: 8-Attribute Tests (AI-enhanced for Tests 1,2,5,6; rule-based for 3,4,7,8)
 * 
 * Usage: node gate3-attribute-test.mjs words-level1.js [--sample 50]
 */

import { readFileSync } from 'fs';
import { basename } from 'path';
import { execSync } from 'child_process';

// --- AI helper ---
function askAI(prompt) {
  try {
    const escaped = prompt.replace(/"/g, '\\"').replace(/\n/g, '\\n');
    const result = execSync(
      `openclaw infer model run --model "github-copilot/gpt-5.2" --prompt "${escaped}"`,
      { timeout: 30000 }
    ).toString();
    const lines = result.split('\n');
    const outputIdx = lines.findIndex(l => l.startsWith('outputs:'));
    return outputIdx >= 0 ? lines.slice(outputIdx + 1).join('\n').trim() : result.trim();
  } catch (e) {
    return null;
  }
}

function sleep(ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) { /* busy wait */ }
}

// --- Word bank loader ---
function loadBank(filePath) {
  const src = readFileSync(filePath, 'utf-8');
  const match = src.match(/=\s*(\[[\s\S]*\])\s*;/);
  if (!match) throw new Error('Cannot parse word bank array from ' + filePath);
  return new Function('return ' + match[1])();
}

const STOP_WORDS = new Set([
  'the', 'that', 'this', 'with', 'from', 'have', 'has', 'had',
  'are', 'was', 'were', 'been', 'being', 'for', 'and', 'not',
  'but', 'you', 'your', 'they', 'them', 'their', 'its',
  'can', 'could', 'would', 'should', 'will', 'may', 'might',
  'very', 'much', 'more', 'most', 'some', 'any', 'all',
  'also', 'just', 'than', 'then', 'when', 'where', 'how',
  'what', 'which', 'who', 'whom', 'whose', 'other', 'each',
  'about', 'into', 'over', 'after', 'before', 'between',
  'under', 'above', 'through', 'during', 'often', 'something',
  'thing', 'things', 'like', 'used', 'make', 'made', 'one',
  'two', 'three', 'four'
]);

function getContentWords(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOP_WORDS.has(w));
}

function jaccard(a, b) {
  const sa = new Set(a), sb = new Set(b);
  let inter = 0;
  for (const w of sa) if (sb.has(w)) inter++;
  const union = new Set([...sa, ...sb]).size;
  return union === 0 ? 0 : inter / union;
}

// Pick N random distractors from bank (different from target)
function pickDistractors(target, bank, n = 3) {
  const others = bank.filter(e => e.word !== target.word);
  const shuffled = others.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

// ==== TEST 1: Definition Uniqueness (AI-powered) ====
// Give AI the definition + 4 word choices, see if it picks the right word
function test1_definitionUniqueness(entry, bank) {
  const distractors = pickDistractors(entry, bank, 3);
  const options = [entry, ...distractors].sort(() => Math.random() - 0.5);
  const correctIdx = options.findIndex(o => o.word === entry.word);

  const optionList = options.map((o, i) => `${i + 1}. ${o.word}`).join('\\n');
  const prompt = `Here is a definition for a word: "${entry.definition}"\\nWhich word does this definition describe?\\n${optionList}\\nReply with ONLY the number (1, 2, 3, or 4).`;

  const result = askAI(prompt);
  sleep(150);

  if (result) {
    const chosen = parseInt(result.trim().replace(/[^0-9]/g, ''));
    if (chosen === correctIdx + 1) {
      return { pass: true };
    }
    const chosenWord = options[chosen - 1]?.word || '?';
    return { pass: false, detail: `AI chose "${chosenWord}" instead of "${entry.word}"` };
  }

  // Fallback to rule-based
  return test1_fallback(entry, bank);
}

function test1_fallback(entry, bank) {
  const defWords = getContentWords(entry.definition);
  let maxSim = 0, mostSimilar = null;
  for (const other of bank) {
    if (other.word === entry.word) continue;
    const sim = jaccard(defWords, getContentWords(other.definition));
    if (sim > maxSim) { maxSim = sim; mostSimilar = other.word; }
  }
  if (maxSim > 0.6) return { pass: false, detail: `too similar to "${mostSimilar}" (${(maxSim*100).toFixed(0)}%)` };
  return { pass: true };
}

// ==== TEST 2: Example Cloze (AI-powered) ====
// Mask the word in the example, give 4 choices, see if AI picks correctly
function test2_exampleCloze(entry, bank) {
  const wordLower = entry.word.toLowerCase();
  const exLower = entry.example.toLowerCase();

  // Create masked example
  let masked = entry.example;
  const regex = new RegExp(entry.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  masked = masked.replace(regex, '___');
  // Also try common inflections
  for (const suffix of ['s', 'es', 'ed', 'd', 'ing', 'er', 'est']) {
    const inflected = new RegExp(wordLower.replace(/e$/, '') + suffix, 'gi');
    masked = masked.replace(inflected, '___');
  }

  if (!masked.includes('___')) {
    // Can't mask — word not in example
    return { pass: false, detail: `word "${entry.word}" not found in example` };
  }

  const distractors = pickDistractors(entry, bank, 3);
  const options = [entry, ...distractors].sort(() => Math.random() - 0.5);
  const correctIdx = options.findIndex(o => o.word === entry.word);

  const optionList = options.map((o, i) => `${i + 1}. ${o.word}`).join('\\n');
  const prompt = `Fill in the blank: "${masked}"\\nWhich word best fits?\\n${optionList}\\nReply with ONLY the number (1, 2, 3, or 4).`;

  const result = askAI(prompt);
  sleep(150);

  if (result) {
    const chosen = parseInt(result.trim().replace(/[^0-9]/g, ''));
    if (chosen === correctIdx + 1) {
      return { pass: true };
    }
    const chosenWord = options[chosen - 1]?.word || '?';
    return { pass: false, detail: `AI chose "${chosenWord}" for cloze instead of "${entry.word}"` };
  }

  // Fallback
  return test2_fallback(entry);
}

function test2_fallback(entry) {
  const exLower = entry.example.toLowerCase();
  const wordLower = entry.word.toLowerCase();
  if (!exLower.includes(wordLower) && !exLower.includes(wordLower + 's') &&
      !exLower.includes(wordLower + 'ed') && !exLower.includes(wordLower + 'ing')) {
    const stem = wordLower.replace(/e$/, '');
    if (stem.length > 2 && (exLower.includes(stem + 'ing') || exLower.includes(stem + 'ed'))) {
      return { pass: true };
    }
    return { pass: false, detail: `word "${entry.word}" not found in example` };
  }
  return { pass: true };
}

// ==== TEST 3: imageKeyword Relevance (rule-based) ====
function test3_imageKeyword(entry) {
  const ikLower = (entry.imageKeyword || '').toLowerCase();
  const wordLower = entry.word.toLowerCase();
  const defWords = getContentWords(entry.definition);
  if (!ikLower) return { pass: false, detail: 'no imageKeyword' };
  const ikWords = getContentWords(ikLower);
  const wordParts = wordLower.split(' ');
  const hasWord = wordParts.some(p => ikLower.includes(p));
  const hasDefWord = defWords.some(w => ikLower.includes(w));
  if (!hasWord && !hasDefWord) {
    return { pass: false, detail: `imageKeyword "${entry.imageKeyword}" unrelated` };
  }
  return { pass: true };
}

// ==== TEST 4: Definition Readability (rule-based) ====
function test4_readability(entry) {
  const words = entry.definition.toLowerCase().replace(/[^a-z\s'-]/g, '').split(/\s+/).filter(w => w.length > 0);
  const longWords = words.filter(w => w.length > 10);
  if (longWords.length > 0) return { pass: false, detail: `complex words: ${longWords.join(', ')}` };
  if (words.length > 25) return { pass: false, detail: `definition too long (${words.length} words)` };
  return { pass: true };
}

// ==== TEST 5: Distractor Discrimination (AI-powered) ====
// Give AI 4 words' definitions shuffled, ask it to match each def to a word
function test5_distractorDiscrim(entry, bank) {
  const distractors = pickDistractors(entry, bank, 3);
  const group = [entry, ...distractors].sort(() => Math.random() - 0.5);

  const defList = group.map((e, i) => `Definition ${i + 1}: "${e.definition}"`).join('\\n');
  const wordList = group.map(e => e.word).sort(() => Math.random() - 0.5);
  const wordStr = wordList.join(', ');

  const prompt = `Match each definition to the correct word.\\n${defList}\\nWords: ${wordStr}\\nFor the word "${entry.word}", which definition number matches it? Reply with ONLY the number.`;

  const result = askAI(prompt);
  sleep(150);

  if (result) {
    const chosen = parseInt(result.trim().replace(/[^0-9]/g, ''));
    const correctIdx = group.findIndex(e => e.word === entry.word) + 1;
    if (chosen === correctIdx) return { pass: true };
    return { pass: false, detail: `AI matched "${entry.word}" to wrong definition (chose ${chosen}, correct ${correctIdx})` };
  }

  // Fallback
  return test5_fallback(entry, bank);
}

function test5_fallback(entry, bank) {
  const defWords = getContentWords(entry.definition);
  const confusables = [];
  for (const other of bank) {
    if (other.word === entry.word) continue;
    if (jaccard(defWords, getContentWords(other.definition)) > 0.5) confusables.push(other.word);
  }
  if (confusables.length > 0) return { pass: false, detail: `confusable with: ${confusables.slice(0,3).join(', ')}` };
  return { pass: true };
}

// ==== TEST 6: Collocation Naturalness (AI-powered) ====
function test6_collocation(entry) {
  const prompt = `Is this sentence natural English that a native speaker would say?\\n"${entry.example}"\\nReply with ONLY YES or NO.`;
  const result = askAI(prompt);
  sleep(150);

  if (result) {
    const upper = result.toUpperCase().trim();
    if (upper.includes('YES')) return { pass: true };
    if (upper.includes('NO')) return { pass: false, detail: `AI says example is unnatural: "${entry.example}"` };
  }

  // Fallback
  return test6_fallback(entry);
}

function test6_fallback(entry) {
  const ex = entry.example;
  if (!ex.match(/^[A-Z]/)) return { pass: false, detail: 'no capital start' };
  if (!ex.match(/[.!?]$/)) return { pass: false, detail: 'no end punctuation' };
  const wc = ex.split(/\s+/).length;
  if (wc < 4) return { pass: false, detail: 'too short' };
  if (wc > 25) return { pass: false, detail: 'too long for ESL child' };
  return { pass: true };
}

// ==== TEST 7: Reverse Validation (rule-based) ====
function test7_reverseValidation(entry) {
  const defWords = getContentWords(entry.definition.toLowerCase());
  if (defWords.length < 2) return { pass: false, detail: 'definition lacks specificity' };
  return { pass: true };
}

// ==== TEST 8: Game Compatibility (rule-based) ====
function test8_gameCompatibility(entry) {
  const issues = [];
  if (!entry.imageKeyword || entry.imageKeyword.length < 2) issues.push('no imageKeyword');
  if (entry.word.replace(/\s+/g, '').length > 15) issues.push('word too long for spelling');
  if (entry.example.split(/\s+/).length < 5) issues.push('example too short for context-select');
  if (entry.definition.toLowerCase().trim() === entry.word.toLowerCase().trim()) issues.push('definition equals word');
  if (issues.length > 0) return { pass: false, detail: issues.join('; ') };
  return { pass: true };
}

// --- Main ---
function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('Usage: node gate3-attribute-test.mjs <words-file.js> [--sample 50]');
    process.exit(1);
  }

  const filePath = args[0];
  let sampleSize = null;
  const sIdx = args.indexOf('--sample');
  if (sIdx !== -1 && args[sIdx + 1]) sampleSize = parseInt(args[sIdx + 1]);

  const bank = loadBank(filePath);
  let words = bank;
  if (sampleSize && sampleSize < words.length) {
    words = [...words].sort(() => Math.random() - 0.5).slice(0, sampleSize);
  }

  const tests = [
    { name: 'Definition Uniqueness (AI)', fn: (e) => test1_definitionUniqueness(e, bank) },
    { name: 'Example Cloze (AI)',         fn: (e) => test2_exampleCloze(e, bank) },
    { name: 'imageKeyword Relevance',     fn: (e) => test3_imageKeyword(e) },
    { name: 'Definition Readability',     fn: (e) => test4_readability(e) },
    { name: 'Distractor Discrim (AI)',    fn: (e) => test5_distractorDiscrim(e, bank) },
    { name: 'Collocation Natural (AI)',   fn: (e) => test6_collocation(e) },
    { name: 'Reverse Validation',         fn: (e) => test7_reverseValidation(e) },
    { name: 'Game Compatibility',         fn: (e) => test8_gameCompatibility(e) },
  ];

  const total = words.length;
  const testResults = tests.map(() => ({ pass: 0, fails: [] }));
  let allPass = 0;

  for (let wi = 0; wi < words.length; wi++) {
    const entry = words[wi];
    console.log(`[${wi + 1}/${total}] Testing: ${entry.word}`);
    let entryAllPass = true;
    for (let i = 0; i < tests.length; i++) {
      const r = tests[i].fn(entry);
      if (r.pass) {
        testResults[i].pass++;
      } else {
        testResults[i].fails.push({ word: entry.word, detail: r.detail });
        entryAllPass = false;
      }
    }
    if (entryAllPass) allPass++;
  }

  console.log(`\n=== Gate 3: Attribute Tests (AI-enhanced) ===`);
  console.log(`File: ${basename(filePath)} (${bank.length} words, tested ${total})\n`);

  for (let i = 0; i < tests.length; i++) {
    const t = tests[i];
    const r = testResults[i];
    const pct = (r.pass / total * 100).toFixed(1);
    console.log(`Test ${i + 1} (${t.name}): ${r.pass}/${total} pass (${pct}%)`);
  }

  console.log(`\nOVERALL: ${allPass}/${total} all-pass (${(allPass / total * 100).toFixed(1)}%)`);

  let hasFails = false;
  for (let i = 0; i < tests.length; i++) {
    const fails = testResults[i].fails;
    if (fails.length > 0) {
      if (!hasFails) { console.log(`\nFAIL details:`); hasFails = true; }
      for (const f of fails.slice(0, 10)) {
        console.log(`  ${f.word} — Test ${i + 1} FAIL: ${f.detail}`);
      }
      if (fails.length > 10) console.log(`  ... and ${fails.length - 10} more Test ${i + 1} failures`);
    }
  }
  console.log('');
}

main();
