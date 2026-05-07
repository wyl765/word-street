#!/usr/bin/env node
/**
 * Dictionary Verification Tool
 * Compares our definitions against standard learner's dictionary patterns
 * Checks for common definition anti-patterns without needing API
 */
import fs from 'fs';
import path from 'path';

const DIR = path.dirname(new URL(import.meta.url).pathname);

const files = fs.readdirSync(DIR).filter(f => f.match(/^words-level.*\.js$/)).sort();
const allEntries = [];
for (const file of files) {
  const content = fs.readFileSync(path.join(DIR, file), 'utf8');
  const re = /\{"word":"([^"]+)","level":(\d+),"definition":"([^"]+)","example":"([^"]+)","imageKeyword":"([^"]+)"\}/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    allEntries.push({ word: m[1], level: parseInt(m[2]), definition: m[3], example: m[4], imageKeyword: m[5], _file: file });
  }
}

console.log(`🔍 Dictionary Pattern Check — ${allEntries.length} entries\n`);

const issues = [];

for (const e of allEntries) {
  const def = e.definition;
  const word = e.word.toLowerCase();
  
  // 1. Definition is too short (less than 3 words)
  if (def.split(/\s+/).length < 3 && !def.includes(';')) {
    issues.push({ severity: 'MEDIUM', word: e.word, file: e._file, level: e.level,
      check: 'TOO_SHORT', detail: `Definition "${def}" is too brief to be useful` });
  }
  
  // 2. Definition starts with "to" but word isn't a verb (rough check)
  // Skip - too many false positives
  
  // 3. Definition uses informal/slang language
  const informalWords = ['stuff', 'thing', 'thingy', 'kinda', 'gonna', 'wanna', 'gotta', 'ain\'t', 'y\'all', 'cuz', 'coz'];
  for (const iw of informalWords) {
    if (def.toLowerCase().includes(iw) && iw !== 'thing') {
      issues.push({ severity: 'MINOR', word: e.word, file: e._file, level: e.level,
        check: 'INFORMAL', detail: `Definition uses informal word "${iw}"` });
    }
  }
  
  // 4. Definition contains the word itself (circular)
  if (!word.includes(' ') && word.length > 3) {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    if (regex.test(def)) {
      issues.push({ severity: 'HIGH', word: e.word, file: e._file, level: e.level,
        check: 'CIRCULAR', detail: `Definition contains target word "${word}"` });
    }
  }
  
  // 5. Multiple meanings crammed in one definition (contains "or" / "also" / ";")
  const meaningCount = (def.match(/;/g) || []).length + (def.match(/\bor\b/g) || []).length;
  if (meaningCount >= 2 && e.level <= 2) {
    issues.push({ severity: 'MEDIUM', word: e.word, file: e._file, level: e.level,
      check: 'MULTI_MEANING', detail: `L${e.level} definition packs ${meaningCount+1} meanings: "${def}"` });
  }
  
  // 6. Definition uses negation (not X, without Y) - harder for kids
  if (e.level <= 2 && /^not |^without |^no /i.test(def)) {
    issues.push({ severity: 'MINOR', word: e.word, file: e._file, level: e.level,
      check: 'NEGATIVE_DEF', detail: `L${e.level} definition starts with negation: "${def}"` });
  }
  
  // 7. Garbled/incomplete definitions (sentence fragments)
  if (def.match(/\b(from a$|with a$|for a$|to a$|the$|and$)\s*$/)) {
    issues.push({ severity: 'HIGH', word: e.word, file: e._file, level: e.level,
      check: 'INCOMPLETE', detail: `Definition appears incomplete: "${def}"` });
  }
  
  // 8. Double words/repeated phrases
  const words = def.split(/\s+/);
  for (let i = 0; i < words.length - 1; i++) {
    if (words[i] === words[i+1] && words[i].length > 2 && words[i] !== 'very') {
      issues.push({ severity: 'HIGH', word: e.word, file: e._file, level: e.level,
        check: 'DOUBLED_WORD', detail: `Repeated word "${words[i]}" in definition` });
      break;
    }
  }
  
  // 9. Wrong article (a before vowel)
  if (/\ba [aeiou]/i.test(def)) {
    const match = def.match(/\ba ([aeiou]\w+)/i);
    if (match) {
      const nextWord = match[1].toLowerCase();
      const exceptions = ['unit', 'united', 'uniform', 'unique', 'union', 'university', 'useful', 'used', 'user', 'usual', 'unicorn', 'universal', 'european', 'one', 'once'];
      if (!exceptions.some(ex => nextWord.startsWith(ex))) {
        issues.push({ severity: 'MINOR', word: e.word, file: e._file, level: e.level,
          check: 'ARTICLE', detail: `"a ${nextWord}" should probably be "an ${nextWord}"` });
      }
    }
  }
}

// Sort by severity
const order = { HIGH: 0, MEDIUM: 1, MINOR: 2 };
issues.sort((a, b) => (order[a.severity] || 9) - (order[b.severity] || 9));

const high = issues.filter(i => i.severity === 'HIGH');
const medium = issues.filter(i => i.severity === 'MEDIUM');
const minor = issues.filter(i => i.severity === 'MINOR');

console.log(`📊 ${high.length} HIGH | ${medium.length} MEDIUM | ${minor.length} MINOR\n`);

if (high.length > 0) {
  console.log('🔴 HIGH:');
  high.forEach(i => console.log(`  ${i.file} | ${i.word} (L${i.level}) | ${i.check}: ${i.detail}`));
}

if (medium.length > 0) {
  console.log('\n🟡 MEDIUM (top 20):');
  medium.slice(0, 20).forEach(i => console.log(`  ${i.file} | ${i.word} (L${i.level}) | ${i.check}: ${i.detail}`));
  if (medium.length > 20) console.log(`  ... and ${medium.length - 20} more`);
}

console.log('\n📝 Report saved.');
fs.writeFileSync(path.join(DIR, `DICT-VERIFY-${new Date().toISOString().slice(0,10)}.md`), 
  `# Dictionary Pattern Check\n\n${high.length} HIGH | ${medium.length} MEDIUM | ${minor.length} MINOR\n\n## HIGH\n${high.map(i=>`- ${i.file} | ${i.word} | ${i.detail}`).join('\n')}\n\n## MEDIUM\n${medium.map(i=>`- ${i.file} | ${i.word} | ${i.detail}`).join('\n')}`);
