#!/usr/bin/env node
// Extract sample words from each file for Gate 5 analysis
import { readFileSync } from 'fs';

const FILES = [
  'words-level1.js', 'words-level2.js', 'words-level2a.js', 'words-level2b.js',
  'words-level2c.js', 'words-level2d.js', 'words-level3a.js', 'words-level3b.js',
  'words-level3c.js', 'words-level4a.js', 'words-level4b.js', 'words-level4c.js',
  'words-level5a.js', 'words-level5b.js', 'words-level5c.js', 'words-level5d.js'
];

function loadWords(filename) {
  const content = readFileSync(filename, 'utf-8');
  const match = content.match(/=\s*(\[[\s\S]*\])\s*;/);
  if (!match) throw new Error(`Cannot parse ${filename}`);
  return JSON.parse(match[1]);
}

for (const f of FILES) {
  try {
    const words = loadWords(f);
    const level = f.match(/level(\d)/)[1];
    
    // Find potentially problematic words: long definitions, complex vocabulary in definitions
    const complex = words.filter(w => {
      const defWords = w.definition.split(/\s+/);
      // Flag if definition has words > 8 chars or definition > 12 words
      const hasLongWords = defWords.some(dw => dw.replace(/[^a-z]/gi, '').length > 8);
      const isLong = defWords.length > 12;
      return hasLongWords || isLong;
    });
    
    console.log(`\n### ${f} (L${level}, ${words.length} words, ${complex.length} complex defs)`);
    
    // Show complex definitions for review
    for (const w of complex) {
      console.log(`  - ${w.word}: "${w.definition}"`);
    }
  } catch(e) {
    console.error(`Error: ${f}: ${e.message}`);
  }
}
