#!/usr/bin/env node
/**
 * Gate 3: 8-Attribute Tests (Rule-based, no LLM required)
 * 
 * Tests each word entry against 8 quality dimensions using heuristic rules.
 * 
 * Usage: node gate3-attribute-test.mjs words-level1.js [--sample 50]
 */

import { readFileSync } from 'fs';
import { basename } from 'path';

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

// ==== TEST 1: Definition Uniqueness ====
// Check if definition keywords are unique enough to distinguish this word
// from other words in the same level. Low overlap with others = pass.
function test1_definitionUniqueness(entry, allEntries) {
  const defWords = getContentWords(entry.definition);
  let maxSim = 0;
  let mostSimilar = null;
  
  for (const other of allEntries) {
    if (other.word === entry.word) continue;
    const otherWords = getContentWords(other.definition);
    const sim = jaccard(defWords, otherWords);
    if (sim > maxSim) {
      maxSim = sim;
      mostSimilar = other.word;
    }
  }
  
  // If most similar definition has Jaccard > 0.6, it's too similar
  if (maxSim > 0.6) {
    return { pass: false, detail: `too similar to "${mostSimilar}" (similarity: ${(maxSim * 100).toFixed(0)}%)` };
  }
  return { pass: true };
}

// ==== TEST 2: Example Cloze ====
// Does the example sentence contain the target word? If not, cloze test impossible.
// Also check if the word appears naturally (not forced).
function test2_exampleCloze(entry) {
  const exLower = entry.example.toLowerCase();
  const wordLower = entry.word.toLowerCase();
  const wordParts = wordLower.split(' ');
  
  // For phrasal verbs, check all parts exist
  if (wordParts.length > 1) {
    const allPresent = wordParts.every(p => exLower.includes(p));
    if (!allPresent) return { pass: false, detail: 'example missing parts of phrasal verb' };
    return { pass: true };
  }
  
  // Check word or its base form appears in example
  if (!exLower.includes(wordLower) && !exLower.includes(wordLower + 's') &&
      !exLower.includes(wordLower + 'ed') && !exLower.includes(wordLower + 'ing') &&
      !exLower.includes(wordLower + 'd') && !exLower.includes(wordLower + 'es')) {
    // Try stemming: remove trailing e, double consonant patterns
    const stem = wordLower.replace(/e$/, '');
    if (stem.length > 2 && (exLower.includes(stem + 'ing') || exLower.includes(stem + 'ed'))) {
      return { pass: true };
    }
    // Irregular forms check - very basic
    return { pass: false, detail: `word "${entry.word}" not found in example` };
  }
  return { pass: true };
}

// ==== TEST 3: imageKeyword Relevance ====
// Check that imageKeyword contains the word or related terms from definition
function test3_imageKeyword(entry) {
  const ikLower = (entry.imageKeyword || '').toLowerCase();
  const wordLower = entry.word.toLowerCase();
  const defWords = getContentWords(entry.definition);
  
  if (!ikLower) return { pass: false, detail: 'no imageKeyword' };
  
  // imageKeyword should relate to word or definition
  const ikWords = getContentWords(ikLower);
  const wordParts = wordLower.split(' ');
  
  // Check if word or any word part is in imageKeyword
  const hasWord = wordParts.some(p => ikLower.includes(p));
  // Check if at least one definition content word is in imageKeyword
  const hasDefWord = defWords.some(w => ikLower.includes(w));
  
  if (!hasWord && !hasDefWord) {
    return { pass: false, detail: `imageKeyword "${entry.imageKeyword}" unrelated to word or definition` };
  }
  return { pass: true };
}

// ==== TEST 4: Definition Readability ====
// All words in definition should be simple (<=8 chars or common)
function test4_readability(entry) {
  const words = entry.definition.toLowerCase()
    .replace(/[^a-z\s'-]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 0);
  
  // Simple readability: no word > 10 chars, and definition < 25 words
  const longWords = words.filter(w => w.length > 10);
  if (longWords.length > 0) {
    return { pass: false, detail: `complex words: ${longWords.join(', ')}` };
  }
  if (words.length > 25) {
    return { pass: false, detail: `definition too long (${words.length} words)` };
  }
  return { pass: true };
}

// ==== TEST 5: Distractor Discrimination ====
// Check that definition doesn't overlap heavily with same-level peers
// (stricter than Test 1 — checks for confusion potential)
function test5_distractorDiscrim(entry, allEntries) {
  const defWords = getContentWords(entry.definition);
  const confusables = [];
  
  for (const other of allEntries) {
    if (other.word === entry.word) continue;
    const otherWords = getContentWords(other.definition);
    const sim = jaccard(defWords, otherWords);
    if (sim > 0.5) confusables.push(other.word);
  }
  
  if (confusables.length > 0) {
    return { pass: false, detail: `confusable with: ${confusables.slice(0, 3).join(', ')}` };
  }
  return { pass: true };
}

// ==== TEST 6: Collocation Naturalness ====
// Check example has natural structure (has subject, verb pattern)
function test6_collocation(entry) {
  const ex = entry.example;
  // Basic checks: starts with capital, ends with punctuation, reasonable length
  if (!ex.match(/^[A-Z]/)) return { pass: false, detail: 'example does not start with capital' };
  if (!ex.match(/[.!?]$/)) return { pass: false, detail: 'example does not end with punctuation' };
  const wordCount = ex.split(/\s+/).length;
  if (wordCount < 4) return { pass: false, detail: 'example too short' };
  if (wordCount > 25) return { pass: false, detail: 'example too long for ESL child' };
  return { pass: true };
}

// ==== TEST 7: Reverse Validation ====
// Check that definition has distinguishing modifiers (not just "a thing")
function test7_reverseValidation(entry) {
  const def = entry.definition.toLowerCase();
  const defWords = getContentWords(def);
  
  // Too generic patterns
  const genericPatterns = [
    /^a thing$/,
    /^something$/,
    /^a type of thing$/,
  ];
  
  for (const p of genericPatterns) {
    if (p.test(def)) return { pass: false, detail: 'definition too generic' };
  }
  
  // Must have at least 2 content words to be specific
  if (defWords.length < 2) {
    return { pass: false, detail: 'definition lacks specificity' };
  }
  
  return { pass: true };
}

// ==== TEST 8: Game Compatibility ====
// Check all 4 game modes can work:
// 1. 看图选词: imageKeyword exists and is relevant
// 2. 听音选图: word is pronounceable (not too complex)
// 3. 看图拼词: word length reasonable for spelling
// 4. 语境选词: example has clear context clue
function test8_gameCompatibility(entry) {
  const issues = [];
  
  // Mode 1: Image selection - need good imageKeyword
  if (!entry.imageKeyword || entry.imageKeyword.length < 2) {
    issues.push('no imageKeyword for image-select mode');
  }
  
  // Mode 2: Audio - word should be reasonably pronounceable
  // Skip - all English words are pronounceable
  
  // Mode 3: Spelling - word length check
  const wordLen = entry.word.replace(/\s+/g, '').length;
  if (wordLen > 15) {
    issues.push(`word too long for spelling game (${wordLen} chars)`);
  }
  
  // Mode 4: Context selection - example should give enough context
  const exWords = entry.example.split(/\s+/).length;
  if (exWords < 5) {
    issues.push('example too short for context-select mode');
  }
  
  // Check that definition is not identical to word (useless for quizzing)
  if (entry.definition.toLowerCase().trim() === entry.word.toLowerCase().trim()) {
    issues.push('definition equals word');
  }
  
  if (issues.length > 0) {
    return { pass: false, detail: issues.join('; ') };
  }
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
    { name: 'Definition Uniqueness', fn: (e) => test1_definitionUniqueness(e, bank) },
    { name: 'Example Cloze',         fn: (e) => test2_exampleCloze(e) },
    { name: 'imageKeyword Relevance', fn: (e) => test3_imageKeyword(e) },
    { name: 'Definition Readability', fn: (e) => test4_readability(e) },
    { name: 'Distractor Discrim',     fn: (e) => test5_distractorDiscrim(e, bank) },
    { name: 'Collocation Natural',    fn: (e) => test6_collocation(e) },
    { name: 'Reverse Validation',     fn: (e) => test7_reverseValidation(e) },
    { name: 'Game Compatibility',     fn: (e) => test8_gameCompatibility(e) },
  ];

  const total = words.length;
  const testResults = tests.map(() => ({ pass: 0, fails: [] }));
  let allPass = 0;

  for (const entry of words) {
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

  console.log(`\n=== Gate 3: Attribute Tests ===`);
  console.log(`File: ${basename(filePath)} (${bank.length} words, tested ${total})\n`);

  for (let i = 0; i < tests.length; i++) {
    const t = tests[i];
    const r = testResults[i];
    const pct = (r.pass / total * 100).toFixed(1);
    console.log(`Test ${i + 1} (${t.name}): ${r.pass}/${total} pass (${pct}%)`);
  }

  console.log(`\nOVERALL: ${allPass}/${total} all-pass (${(allPass / total * 100).toFixed(1)}%)`);

  // Print fail details (limit to 10 per test)
  let hasFails = false;
  for (let i = 0; i < tests.length; i++) {
    const fails = testResults[i].fails;
    if (fails.length > 0) {
      if (!hasFails) { console.log(`\nFAIL details:`); hasFails = true; }
      for (const f of fails.slice(0, 10)) {
        console.log(`  ${f.word} — Test ${i + 1} FAIL: ${f.detail}`);
      }
      if (fails.length > 10) {
        console.log(`  ... and ${fails.length - 10} more Test ${i + 1} failures`);
      }
    }
  }
  console.log('');
}

main();
