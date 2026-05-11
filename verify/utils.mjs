// Shared utilities for verification gates
import fs from 'fs';
import path from 'path';

const WORD_DIR = path.resolve(import.meta.dirname, '..');

export function loadAllWords() {
  const files = fs.readdirSync(WORD_DIR)
    .filter(f => f.startsWith('words-level') && f.endsWith('.js'))
    .sort();
  
  const allWords = [];
  for (const file of files) {
    const raw = fs.readFileSync(path.join(WORD_DIR, file), 'utf8');
    const match = raw.match(/\[[\s\S]*\]/);
    if (!match) continue;
    const words = JSON.parse(match[0]);
    words.forEach(w => allWords.push({ ...w, _file: file }));
  }
  return allWords;
}

// Flesch-Kincaid Grade Level
export function fkGradeLevel(text) {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = text.split(/\s+/).filter(w => w.match(/[a-zA-Z]/));
  const syllables = words.reduce((sum, w) => sum + countSyllables(w), 0);
  
  if (words.length === 0 || sentences.length === 0) return 0;
  
  const avgWordsPerSentence = words.length / sentences.length;
  const avgSyllablesPerWord = syllables / words.length;
  
  return 0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;
}

export function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (word.length <= 2) return 1;
  
  // Remove trailing silent e
  word = word.replace(/e$/, '');
  
  // Count vowel groups
  const matches = word.match(/[aeiouy]+/g);
  let count = matches ? matches.length : 1;
  
  return Math.max(1, count);
}

// Check article correctness (a/an)
export function checkArticle(text) {
  const issues = [];
  // "a" before vowel sound
  const aVowel = text.match(/\ba\s+([aeiou]\w*)/gi);
  if (aVowel) {
    for (const m of aVowel) {
      const nextWord = m.split(/\s+/)[1].toLowerCase();
      // Exceptions: words starting with vowel letter but consonant sound (/j/, /w/)
      if (/^(uni|use|usu|eur|one|once|u$|u[^aeiou]|u[bcdfghjklmnpqrstvwxyz])/.test(nextWord)) continue;
      issues.push(`"a" before vowel: "${m.trim()}"`);
    }
  }
  // "an" before consonant sound  
  const anCons = text.match(/\ban\s+([bcdfgjklmnpqrstvwxyz]\w*)/gi);
  if (anCons) {
    for (const m of anCons) {
      const nextWord = m.split(/\s+/)[1].toLowerCase();
      // Exceptions: "an hour", "an honest", "an heir", "an honor", "an herb"
      if (/^(hour|hone|heir|hono|herb)/.test(nextWord)) continue;
      issues.push(`"an" before consonant: "${m.trim()}"`);
    }
  }
  return issues;
}

export function writeReport(name, lines) {
  const outPath = path.join(WORD_DIR, 'verify', `${name}.md`);
  fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
  console.log(`Report written to verify/${name}.md`);
}
