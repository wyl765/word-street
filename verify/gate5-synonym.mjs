// Gate 5: Synonym Interference Test
// Find words in the same level with overlapping definitions.
// If two words have nearly identical definitions, students can't distinguish them in quizzes.
// Pure computation — uses Jaccard similarity on definition words.

import { loadAllWords, writeReport } from './utils.mjs';

const words = loadAllWords();

// Group by level
const byLevel = {};
for (const w of words) {
  if (!byLevel[w.level]) byLevel[w.level] = [];
  byLevel[w.level].push(w);
}

// Tokenize + stopword removal
const STOPWORDS = new Set(['a','an','the','to','of','or','and','in','is','it','that','for','on','with','as','at','by','from','be','this','are','was','not','but','have','has','do','does','did','will','would','can','could','should','may','might','also','very','more','most','than','into','about','just','its','their','your','our','his','her','being','been','some','other','each','when','where','what','how','who','which','they','them','we','you','he','she','something','someone','someone\'s','especially','often','usually','way','like']);

function tokenize(text) {
  return text.toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOPWORDS.has(w));
}

function jaccard(a, b) {
  const setA = new Set(a);
  const setB = new Set(b);
  const intersection = [...setA].filter(x => setB.has(x));
  const union = new Set([...setA, ...setB]);
  return union.size === 0 ? 0 : intersection.length / union.size;
}

const THRESHOLD = 0.5; // 50% overlap = suspicious
const pairs = [];

for (const [level, levelWords] of Object.entries(byLevel)) {
  const tokens = levelWords.map(w => ({
    word: w.word,
    file: w._file,
    defTokens: tokenize(w.definition)
  }));
  
  for (let i = 0; i < tokens.length; i++) {
    for (let j = i + 1; j < tokens.length; j++) {
      const sim = jaccard(tokens[i].defTokens, tokens[j].defTokens);
      if (sim >= THRESHOLD) {
        pairs.push({
          word1: tokens[i].word,
          word2: tokens[j].word,
          file1: tokens[i].file,
          file2: tokens[j].file,
          level: parseInt(level),
          similarity: sim,
          def1Tokens: tokens[i].defTokens,
          def2Tokens: tokens[j].defTokens
        });
      }
    }
  }
}

pairs.sort((a, b) => b.similarity - a.similarity);

// Build report
const lines = [
  `# Gate 5: Synonym Interference Test`,
  `**Date:** ${new Date().toISOString().slice(0, 10)}`,
  `**Method:** Jaccard similarity on definition tokens (stopwords removed)`,
  `**Threshold:** ≥ ${THRESHOLD * 100}% overlap`,
  `**Total pairs found:** ${pairs.length}`,
  '',
  '## High-Similarity Pairs (same level, confusable definitions)',
  '| Level | Word 1 | Word 2 | Similarity | Shared tokens |',
  '|-------|--------|--------|-----------|---------------|',
];

for (const p of pairs) {
  const shared = p.def1Tokens.filter(t => new Set(p.def2Tokens).has(t));
  lines.push(`| ${p.level} | ${p.word1} | ${p.word2} | ${(p.similarity * 100).toFixed(0)}% | ${shared.join(', ')} |`);
}

writeReport('GATE5-synonym-interference', lines);
console.log(`\nGate 5: ${pairs.length} confusable pairs found (≥${THRESHOLD * 100}% definition overlap)`);
