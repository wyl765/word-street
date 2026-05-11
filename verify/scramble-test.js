const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.match(/^words-level.*\.js$/)).sort();

let allWords = [];
for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  // Extract array between first [ and last ]
  const start = content.indexOf('[');
  const end = content.lastIndexOf(']');
  if (start === -1 || end === -1) { console.error('NO MATCH:', f); continue; }
  const arr = JSON.parse(content.substring(start, end + 1));
  arr.forEach(w => allWords.push({...w, file: f}));
}

console.log('Total words loaded:', allWords.length);

// Group by file for sampling
const byFile = {};
allWords.forEach(w => {
  if (!byFile[w.file]) byFile[w.file] = [];
  byFile[w.file].push(w);
});

// Deterministic shuffle with seed
function seededShuffle(arr, seed) {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Sample ~13 words per file (200 / 16 ≈ 12.5), take 13 from each, trim to 200
let sampled = [];
const fileNames = Object.keys(byFile).sort();
const perFile = Math.ceil(200 / fileNames.length);

for (const f of fileNames) {
  const shuffled = seededShuffle(byFile[f], 42 + f.length);
  sampled.push(...shuffled.slice(0, perFile));
}
sampled = sampled.slice(0, 200);

console.log('Sampled:', sampled.length, 'from', fileNames.length, 'files');

// For each sampled word, create a pool of 10 words from the same level
// Then see if example+imageKeyword alone can identify the correct word
const results = [];

for (const target of sampled) {
  // Get same-level words
  const sameLevel = allWords.filter(w => w.level === target.level && w.word !== target.word);
  const distractors = seededShuffle(sameLevel, target.word.length * 7 + target.level).slice(0, 9);
  const pool = seededShuffle([target, ...distractors], 99);
  
  // Analysis: can we identify the word from example + imageKeyword alone?
  const example = target.example;
  const imageKw = target.imageKeyword;
  const word = target.word;
  
  // Check if the word itself appears in the example (most common case - very identifiable)
  const wordInExample = example.toLowerCase().includes(word.toLowerCase());
  
  // Check if imageKeyword contains the word
  const wordInImage = imageKw.toLowerCase().includes(word.toLowerCase());
  
  // Check if imageKeyword is too generic (doesn't contain the word or a close variant)
  // A word is "identifiable" if example or imageKeyword directly contain it
  // It's "weak" if neither contains the word
  
  let canMatch = true;
  let confidence = 'high';
  let reason = '';
  
  if (wordInExample && wordInImage) {
    confidence = 'high';
  } else if (wordInExample) {
    confidence = 'high';
  } else if (wordInImage) {
    confidence = 'medium';
  } else {
    // Neither contains the word - check if example is distinctive enough
    // Look for unique contextual clues
    canMatch = false;
    confidence = 'low';
    
    // But some examples are highly specific even without the word
    // e.g., "a baby dog" example might say "wagged its tail" which is generic
    // We'll flag these as failures
    reason = `Example doesn't contain "${word}" and imageKeyword "${imageKw}" doesn't either`;
  }
  
  results.push({
    word,
    file: target.file,
    level: target.level,
    imageKeyword: imageKw,
    example,
    definition: target.definition,
    wordInExample,
    wordInImage,
    canMatch,
    confidence,
    reason,
    pool: pool.map(p => p.word)
  });
}

// Now do a more nuanced analysis for the "failures" - some may actually be identifiable
// through strong contextual clues even without the literal word
const failures = results.filter(r => !r.canMatch);
const successes = results.filter(r => r.canMatch);

// Further analyze failures: check if any pool word appears in the example
for (const f of failures) {
  const otherPoolWords = f.pool.filter(w => w !== f.word);
  const otherInExample = otherPoolWords.filter(w => f.example.toLowerCase().includes(w.toLowerCase()));
  if (otherInExample.length > 0) {
    f.reason += ` | Other pool words found in example: ${otherInExample.join(', ')}`;
  }
}

// Generate report
let report = `# Layer 11: Red Team Scramble Test

## Methodology
For each of 200 sampled words (across all 16 level files), we:
1. Hide the definition
2. Look at ONLY the example sentence and imageKeyword
3. Try to identify the correct word from a pool of 10 same-level words
4. A word is "matchable" if the word itself appears in the example sentence OR imageKeyword
5. A word is a "failure" if neither the example nor imageKeyword contain the word - meaning a student would need the definition to identify it

## Summary
- Words tested: ${results.length}
- Successfully re-matched: ${successes.length} (example+imageKeyword sufficient)
- Failed to re-match: ${failures.length} (weak redundancy - word not in example or imageKeyword)
- Match rate: ${(successes.length / results.length * 100).toFixed(1)}%

### Breakdown by confidence
- High confidence (word in example): ${results.filter(r => r.wordInExample).length}
- Medium confidence (word in imageKeyword only): ${results.filter(r => !r.wordInExample && r.wordInImage).length}
- Low/no confidence (word in neither): ${failures.length}

## Failures
| word | file | level | imageKeyword | why_cant_rematch |
|------|------|-------|-------------|-----------------|
`;

for (const f of failures) {
  const shortFile = f.file.replace('words-', '').replace('.js', '');
  const escapedReason = `Example: "${f.example.substring(0, 60)}..." / imageKw: "${f.imageKeyword}" - word "${f.word}" absent from both`;
  report += `| ${f.word} | ${shortFile} | ${f.level} | ${f.imageKeyword} | ${escapedReason} |\n`;
}

report += `
## Analysis

### Why Most Words Pass
The vast majority of entries include the target word directly in the example sentence (e.g., "The little **puppy** wagged its tail"). This means even without the definition, a student can trivially identify which word the entry belongs to.

### Failure Patterns
Words that fail tend to have:
1. **Example sentences that use pronouns or synonyms** instead of the target word
2. **Generic imageKeywords** that describe a concept rather than naming the word
3. **Abstract concepts** where the example demonstrates the meaning without using the word

### Recommendations for Failed Entries
For entries where the word doesn't appear in the example:
- Revise the example to include the target word naturally
- Make the imageKeyword more specific to the target word
- Or ensure the example is distinctive enough that only one word could fit
`;

fs.mkdirSync(path.join(__dirname), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'LAYER11-redteam-scramble.md'), report);
console.log('Report written. Failures:', failures.length);
console.log('\nSample failures:');
failures.slice(0, 10).forEach(f => {
  console.log(`  ${f.word} (${f.file}): imageKw="${f.imageKeyword}", example="${f.example.substring(0, 80)}..."`);
});
