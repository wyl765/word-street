// Gate 1: Dictionary Cross-Validation
// Check each word's definition against Free Dictionary API.
// Compare our simplified definition with the real dictionary definition.
// Flag cases where our definition doesn't match ANY dictionary sense.
//
// Usage: node gate1-dict.mjs <file> [batchSize]
// Rate-limited to avoid hammering the API.

import fs from 'fs';
import path from 'path';

const WORD_DIR = path.resolve(import.meta.dirname, '..');
const file = process.argv[2];
const batchSize = parseInt(process.argv[3] || '50');

if (!file) { console.error('Usage: node gate1-dict.mjs <words-file.js>'); process.exit(1); }

const raw = fs.readFileSync(path.join(WORD_DIR, file), 'utf8');
const bank = JSON.parse(raw.match(/\[[\s\S]*\]/)[0]);

const API = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const DELAY = 200; // ms between requests

async function lookupWord(word) {
  // Handle multi-word phrases — skip API lookup
  if (word.includes(' ')) return { status: 'SKIP', reason: 'multi-word phrase' };
  
  try {
    const res = await fetch(API + encodeURIComponent(word));
    if (res.status === 404) return { status: 'NOT_FOUND' };
    if (!res.ok) return { status: 'ERROR', code: res.status };
    const data = await res.json();
    
    // Extract all definitions from all meanings
    const defs = [];
    for (const entry of data) {
      for (const meaning of (entry.meanings || [])) {
        for (const def of (meaning.definitions || [])) {
          defs.push({
            partOfSpeech: meaning.partOfSpeech,
            definition: def.definition
          });
        }
      }
    }
    return { status: 'OK', definitions: defs };
  } catch (e) {
    return { status: 'ERROR', error: e.message };
  }
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// Simple word overlap check between our def and dictionary defs
function defOverlap(ourDef, dictDefs) {
  const ourWords = new Set(ourDef.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(w => w.length > 3));
  
  let bestScore = 0;
  let bestDef = '';
  
  for (const d of dictDefs) {
    const dictWords = new Set(d.definition.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(w => w.length > 3));
    const overlap = [...ourWords].filter(w => dictWords.has(w)).length;
    const score = ourWords.size > 0 ? overlap / ourWords.size : 0;
    if (score > bestScore) {
      bestScore = score;
      bestDef = d.definition;
    }
  }
  
  return { score: bestScore, bestMatch: bestDef };
}

async function main() {
  const results = [];
  const subset = bank.slice(0, batchSize);
  
  console.log(`Checking ${subset.length} words from ${file}...`);
  
  for (let i = 0; i < subset.length; i++) {
    const w = subset[i];
    const lookup = await lookupWord(w.word);
    
    if (lookup.status === 'SKIP' || lookup.status === 'NOT_FOUND') {
      results.push({ word: w.word, status: lookup.status, reason: lookup.reason || 'not in dictionary' });
    } else if (lookup.status === 'OK') {
      const { score, bestMatch } = defOverlap(w.definition, lookup.definitions);
      results.push({
        word: w.word,
        ourDef: w.definition,
        dictDef: bestMatch,
        overlapScore: score,
        status: score < 0.2 ? 'LOW_MATCH' : score < 0.4 ? 'PARTIAL' : 'MATCH',
        totalDictDefs: lookup.definitions.length
      });
    } else {
      results.push({ word: w.word, status: 'ERROR', error: lookup.error || lookup.code });
    }
    
    if (i % 10 === 0) process.stdout.write(`  ${i}/${subset.length}\r`);
    await sleep(DELAY);
  }
  
  // Summary
  const match = results.filter(r => r.status === 'MATCH').length;
  const partial = results.filter(r => r.status === 'PARTIAL').length;
  const low = results.filter(r => r.status === 'LOW_MATCH').length;
  const notFound = results.filter(r => r.status === 'NOT_FOUND').length;
  const skip = results.filter(r => r.status === 'SKIP').length;
  
  console.log(`\nResults: ${match} MATCH, ${partial} PARTIAL, ${low} LOW_MATCH, ${notFound} NOT_FOUND, ${skip} SKIP`);
  
  // Write low-match entries for review
  const outPath = path.join(WORD_DIR, 'verify', `GATE1-dict-${file.replace('.js', '')}.json`);
  fs.writeFileSync(outPath, JSON.stringify({
    file, total: subset.length, match, partial, low, notFound, skip,
    lowMatchEntries: results.filter(r => r.status === 'LOW_MATCH')
  }, null, 2));
  console.log(`Report: ${outPath}`);
}

main();
