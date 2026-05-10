#!/usr/bin/env node
/**
 * Gate 2: N-version Consensus Validation (AI-powered)
 * 
 * For each word, asks AI to independently generate a definition,
 * then uses AI to compare it with our existing definition for semantic consistency.
 * 
 * Falls back to rule-based checks if AI calls fail.
 * 
 * Usage: node gate2-consensus.mjs words-level1.js [--sample N]
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

// --- AI-powered independent definition ---
function generateIndependentDefinition(word, level) {
  const prompt = `You are writing a children's dictionary for 10-year-old ESL students. Write a simple, clear definition for the word "${word}" (Level ${level}). Use only words a 2nd-3rd grader would know. Reply with ONLY the definition, nothing else.`;
  return askAI(prompt);
}

// --- AI-powered comparison ---
function compareDefinitions(word, ourDef, aiDef) {
  const prompt = `Compare these two definitions for "${word}":\nDefinition A: "${ourDef}"\nDefinition B: "${aiDef}"\nAre they semantically equivalent (same core meaning)?\nReply with ONLY one word: MATCH, PARTIAL, or MISMATCH`;
  const result = askAI(prompt);
  if (!result) return null;
  const upper = result.toUpperCase().trim();
  if (upper.includes('MATCH') && !upper.includes('MISMATCH') && !upper.includes('PARTIAL')) return 'MATCH';
  if (upper.includes('MISMATCH')) return 'MISMATCH';
  if (upper.includes('PARTIAL')) return 'PARTIAL';
  return 'PARTIAL'; // default if unclear
}

// --- Fallback rule-based checks ---
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
  'thing', 'things', 'like', 'used', 'make', 'made'
]);

function getContentWords(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOP_WORDS.has(w));
}

function ruleBasedAssess(entry) {
  const { word, definition, example } = entry;
  const defWords = getContentWords(definition);
  const exWords = getContentWords(example);
  const wordLower = word.toLowerCase();
  const issues = [];

  // Circular definition
  if (wordLower.length > 3 && definition.toLowerCase().includes(wordLower)) {
    if (!wordLower.includes(' ')) {
      issues.push(`circular: definition contains "${wordLower}"`);
    }
  }

  // Too short
  if (defWords.length < 2) {
    issues.push('definition too short');
  }

  // Complex words
  const hardWords = defWords.filter(w => w.length > 10);
  if (hardWords.length > 0) {
    issues.push(`complex words in definition: ${hardWords.join(', ')}`);
  }

  if (issues.length === 0) return { verdict: 'MATCH', issues: [] };
  const hasCritical = issues.some(i => i.startsWith('circular') || i === 'definition too short');
  if (hasCritical) return { verdict: 'MISMATCH', issues };
  return { verdict: 'PARTIAL', issues };
}

// --- Main ---
function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('Usage: node gate2-consensus.mjs <words-file.js> [--sample N]');
    process.exit(1);
  }

  const filePath = args[0];
  let sampleSize = null;
  const sampleIdx = args.indexOf('--sample');
  if (sampleIdx !== -1 && args[sampleIdx + 1]) {
    sampleSize = parseInt(args[sampleIdx + 1]);
  }

  const bank = loadBank(filePath);
  let words = bank;

  if (sampleSize && sampleSize < words.length) {
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    words = shuffled.slice(0, sampleSize);
  }

  // Extract level from filename
  const levelMatch = basename(filePath).match(/level(\w+)/i);
  const level = levelMatch ? levelMatch[1] : '?';

  const results = { MATCH: [], PARTIAL: [], MISMATCH: [] };

  for (let i = 0; i < words.length; i++) {
    const entry = words[i];
    console.log(`[${i + 1}/${words.length}] Testing: ${entry.word}...`);

    // Try AI-powered consensus
    const aiDef = generateIndependentDefinition(entry.word, level);
    sleep(200); // rate limit buffer

    if (aiDef) {
      const comparison = compareDefinitions(entry.word, entry.definition, aiDef);
      sleep(200);

      if (comparison) {
        const issues = comparison !== 'MATCH'
          ? [`AI def: "${aiDef}" → ${comparison}`]
          : [];
        results[comparison].push({ word: entry.word, definition: entry.definition, aiDef, issues });
        continue;
      }
    }

    // Fallback to rule-based
    console.log(`  (AI unavailable, using rule-based fallback)`);
    const { verdict, issues } = ruleBasedAssess(entry);
    results[verdict].push({ word: entry.word, definition: entry.definition, aiDef: null, issues });
  }

  const total = words.length;
  console.log(`\n=== Gate 2: N-version Consensus (AI-powered) ===`);
  console.log(`File: ${basename(filePath)} (${bank.length} words, tested ${total})`);
  console.log(`MATCH:    ${results.MATCH.length} (${(results.MATCH.length / total * 100).toFixed(1)}%)`);
  console.log(`PARTIAL:  ${results.PARTIAL.length} (${(results.PARTIAL.length / total * 100).toFixed(1)}%)`);
  console.log(`MISMATCH: ${results.MISMATCH.length} (${(results.MISMATCH.length / total * 100).toFixed(1)}%)`);

  if (results.MISMATCH.length > 0) {
    console.log(`\nMISMATCH details:`);
    for (const r of results.MISMATCH) {
      console.log(`  ${r.word} — ours: "${r.definition}"`);
      if (r.aiDef) console.log(`    AI def: "${r.aiDef}"`);
      if (r.issues.length) console.log(`    Issues: ${r.issues.join('; ')}`);
    }
  }

  if (results.PARTIAL.length > 0) {
    console.log(`\nPARTIAL details:`);
    for (const r of results.PARTIAL) {
      console.log(`  ${r.word} — ours: "${r.definition}"`);
      if (r.aiDef) console.log(`    AI def: "${r.aiDef}"`);
      if (r.issues.length) console.log(`    Issues: ${r.issues.join('; ')}`);
    }
  }

  console.log('');
}

main();
