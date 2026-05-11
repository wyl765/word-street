// Fetch dictionary definitions for blind A/B comparison
// Pulls from Free Dictionary API, saves pairs for blind judging
import fs from 'fs';
import path from 'path';

const WORD_DIR = path.resolve(import.meta.dirname, '..');
const API = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

// Load our words
const files = fs.readdirSync(WORD_DIR).filter(f => f.startsWith('words-level') && f.endsWith('.js')).sort();
const allWords = [];
for (const file of files) {
  const raw = fs.readFileSync(path.join(WORD_DIR, file), 'utf8');
  const bank = JSON.parse(raw.match(/\[[\s\S]*\]/)[0]);
  bank.forEach(w => allWords.push({ ...w, _file: file }));
}

// Sample strategically: 50 from each level = 250 words
const byLevel = {};
allWords.forEach(w => { if (!byLevel[w.level]) byLevel[w.level] = []; byLevel[w.level].push(w); });

const sample = [];
for (const [level, words] of Object.entries(byLevel)) {
  const shuffled = words.sort(() => Math.random() - 0.5);
  sample.push(...shuffled.slice(0, 50));
}

async function fetchDef(word) {
  if (word.includes(' ')) return null;
  try {
    const res = await fetch(API + encodeURIComponent(word));
    if (!res.ok) return null;
    const data = await res.json();
    const defs = [];
    for (const entry of data) {
      for (const meaning of (entry.meanings || [])) {
        for (const def of (meaning.definitions || [])) {
          defs.push(def.definition);
        }
      }
    }
    return defs[0] || null; // Take first/primary definition
  } catch { return null; }
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  const pairs = [];
  console.log(`Fetching dictionary defs for ${sample.length} words...`);
  
  for (let i = 0; i < sample.length; i++) {
    const w = sample[i];
    const dictDef = await fetchDef(w.word);
    if (dictDef) {
      // Randomize which is A and which is B
      const oursFirst = Math.random() > 0.5;
      pairs.push({
        word: w.word,
        level: w.level,
        file: w._file,
        defA: oursFirst ? w.definition : dictDef,
        defB: oursFirst ? dictDef : w.definition,
        sourceA: oursFirst ? 'ours' : 'dictionary',
        sourceB: oursFirst ? 'dictionary' : 'ours',
        ourDef: w.definition,
        dictDef: dictDef
      });
    }
    if (i % 20 === 0) process.stdout.write(`  ${i}/${sample.length}\r`);
    await sleep(150);
  }
  
  const outPath = path.join(WORD_DIR, 'verify', 'blind-pairs.json');
  fs.writeFileSync(outPath, JSON.stringify(pairs, null, 2));
  console.log(`\n${pairs.length} blind pairs saved to verify/blind-pairs.json`);
}

main();
