#!/usr/bin/env node
/**
 * Word Street — Automated Proofcheck Engine
 * Rule-based checks that AI cannot reliably do.
 * Run: node proofcheck.mjs
 */

import fs from 'fs';
import path from 'path';

const DIR = path.dirname(new URL(import.meta.url).pathname);
const issues = [];

// ============ CONFIGURATION ============

// Words that must NEVER appear in a 10-year-old's vocabulary game
const BANNED_WORDS = [
  // Violence/death — exact word match only
  'genocide', 'carnage', 'massacre', 'homicide', 'assassination',
  'slaughter', 'execution', 'decapitate', 'mutilate', 'dismember',
  // Adult/inappropriate
  'autopsy', 'prostitution', 'pornography', 'obscenity', 'orgasm',
  'erotic', 'fornicate', 'sodomy',
  // Too dark for kids
  'suicide', 'self-harm', 'torture', 'ethnic cleansing',
];

// Phrases that should NOT appear in L1-L3 examples
const BANNED_EXAMPLE_PHRASES_L1_L3 = [
  'stock market', 'stock price', 'savings account',
  'investor', 'compound interest',
  'bet against', 'hedge fund', 'bull market', 'bear market',
  'neural network', 'machine learning', 'deep learning',
  'compile the c++', 'source code',
  'mortgage', 'foreclosure', 'bankruptcy',
];

// Known global-replace accident patterns — only flag if NOT a natural use
const REPLACE_ACCIDENTS = [
  { find: /\bthe important(?! (?:thing|point|part|detail|fact|role|step|lesson|rule|idea|reason|message|letter|news|decision|event|question|person|people|moment|day))/i, label: 'key→important replace accident' },
  { find: /\ba important\b/i, label: 'key→important replace accident' },
  { find: /\bspare important\b/i, label: 'key→important replace accident' },
  { find: /\bhidden important\b/i, label: 'key→important replace accident' },
];

// ============ LOAD FILES ============

function loadWords() {
  const files = fs.readdirSync(DIR)
    .filter(f => f.match(/^words-level.*\.js$/))
    .sort();
  
  const allEntries = [];
  
  for (const file of files) {
    const content = fs.readFileSync(path.join(DIR, file), 'utf8');
    // Extract the array
    const match = content.match(/\[(.+)\]/s);
    if (!match) continue;
    
    try {
      const arr = JSON.parse('[' + match[1] + ']');
      arr.forEach((entry, idx) => {
        allEntries.push({ ...entry, _file: file, _line: idx + 1 });
      });
    } catch (e) {
      // Parse line by line
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        const m = line.match(/\{[^}]+\}/g);
        if (m) {
          m.forEach(jsonStr => {
            try {
              const entry = JSON.parse(jsonStr);
              if (entry.word) {
                allEntries.push({ ...entry, _file: file, _line: idx + 1 });
              }
            } catch (_) {}
          });
        }
      });
    }
  }
  return allEntries;
}

function addIssue(severity, file, word, check, detail, fix) {
  issues.push({ severity, file, word, check, detail, fix });
}

// ============ CHECKS ============

function checkBannedWords(entries) {
  for (const e of entries) {
    const wordLower = e.word.toLowerCase();
    for (const banned of BANNED_WORDS) {
      // Exact match only — not substring
      if (wordLower === banned) {
        addIssue('CRITICAL', e._file, e.word, 'BANNED_WORD',
          `Word "${e.word}" is on the banned list`,
          'Remove this entry entirely');
      }
    }
  }
}

function checkBannedExamplePhrases(entries) {
  for (const e of entries) {
    const level = e.level || 0;
    if (level > 3) continue; // Only check L1-L3
    const example = (e.example || '').toLowerCase();
    for (const phrase of BANNED_EXAMPLE_PHRASES_L1_L3) {
      if (example.includes(phrase.toLowerCase())) {
        addIssue('CRITICAL', e._file, e.word, 'BANNED_EXAMPLE',
          `L${level} example contains inappropriate phrase: "${phrase}"`,
          'Replace with age-appropriate example');
      }
    }
  }
}

function checkReplaceAccidents(entries) {
  for (const e of entries) {
    const text = `${e.definition || ''} ${e.example || ''} ${e.imageKeyword || ''}`;
    for (const { find, label } of REPLACE_ACCIDENTS) {
      if (find.test(text)) {
        addIssue('CRITICAL', e._file, e.word, 'REPLACE_ACCIDENT',
          `${label} detected in: "${text.substring(0, 80)}..."`,
          'Restore original word');
      }
    }
  }
}

function checkDuplicates(entries) {
  const seen = new Map();
  for (const e of entries) {
    const key = e.word.toLowerCase().trim();
    if (seen.has(key)) {
      const prev = seen.get(key);
      addIssue('MAJOR', e._file, e.word, 'DUPLICATE',
        `Duplicate of entry in ${prev._file}`,
        'Remove duplicate');
    } else {
      seen.set(key, e);
    }
  }
}

function checkCircularDefinition(entries) {
  for (const e of entries) {
    const word = e.word.toLowerCase();
    const def = (e.definition || '').toLowerCase();
    // Only check single words (skip phrases/idioms)
    if (word.includes(' ')) continue;
    if (word.length <= 3) continue;
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    if (regex.test(def)) {
      addIssue('MAJOR', e._file, e.word, 'CIRCULAR_DEF',
        `Definition contains the word itself: "${e.word}" in "${e.definition}"`,
        'Rewrite definition without using the target word');
    }
  }
}

function checkEmptyFields(entries) {
  for (const e of entries) {
    if (!e.word || e.word.trim() === '') {
      addIssue('CRITICAL', e._file, '(empty)', 'EMPTY_FIELD', 'Empty word field', 'Fix or remove');
    }
    if (!e.definition || e.definition.trim() === '') {
      addIssue('CRITICAL', e._file, e.word, 'EMPTY_FIELD', 'Empty definition', 'Add definition');
    }
    if (!e.example || e.example.trim() === '') {
      addIssue('CRITICAL', e._file, e.word, 'EMPTY_FIELD', 'Empty example', 'Add example');
    }
    if (!e.imageKeyword || e.imageKeyword.trim() === '') {
      addIssue('MAJOR', e._file, e.word, 'EMPTY_FIELD', 'Empty imageKeyword', 'Add imageKeyword');
    }
  }
}

function checkArticleErrors(entries) {
  for (const e of entries) {
    const text = `${e.definition || ''} ${e.example || ''}`;
    // "a" before vowel sound (rough check)
    const matches = text.match(/\ba ([aeiou]\w+)/gi);
    if (matches) {
      for (const m of matches) {
        const word = m.split(' ')[1].toLowerCase();
        // Exceptions: words that sound like consonants
        const exceptions = ['unit', 'united', 'uniform', 'unique', 'union', 'university',
          'useful', 'used', 'user', 'usual', 'usually', 'u-shaped', 'european',
          'one', 'once', 'unicorn', 'universal'];
        if (!exceptions.some(ex => word.startsWith(ex))) {
          addIssue('MINOR', e._file, e.word, 'ARTICLE_ERROR',
            `Possible "a/an" error: "${m}"`,
            `Consider "an ${word}"`);
        }
      }
    }
  }
}

function checkExampleWordUsage(entries) {
  for (const e of entries) {
    const word = e.word.toLowerCase();
    const example = (e.example || '').toLowerCase();
    // Only single words, skip phrases
    if (word.includes(' ') || word.length <= 2) continue;
    // Generate possible forms
    const forms = [word];
    // Remove common suffixes to get root
    const root = word.replace(/(ing|ed|s|es|ly|er|est|tion|sion|ment|ness|ful|less|ous|ive|ble|ify|ise|ize|al|ial)$/i, '');
    if (root.length > 2) forms.push(root);
    // Add common inflections
    forms.push(word + 's', word + 'es', word + 'ed', word + 'ing');
    forms.push(word + 'd');
    // handle -e words: stare→stared, staring
    if (word.endsWith('e')) {
      forms.push(word.slice(0,-1) + 'ed', word.slice(0,-1) + 'ing');
      forms.push(word.slice(0,-1) + 'ation');
    }
    // handle -y words: clarify→clarified, certify→certified
    if (word.endsWith('y')) {
      forms.push(word.slice(0,-1) + 'ied', word.slice(0,-1) + 'ies');
    }
    // handle doubling: occur→occurred
    const last = word.slice(-1);
    forms.push(word + last + 'ed', word + last + 'ing');
    // handle became/become, overcame/overcome
    if (word.startsWith('be')) forms.push(word.replace('be','ba'));
    if (word.startsWith('over')) forms.push(word.replace('come','came'));
    if (word.endsWith('draw')) forms.push(word.replace('draw','drew'), word.replace('draw','drawn'));
    
    const found = forms.some(f => {
      if (f.length < 3) return false;
      const re = new RegExp(`\\b${f}`, 'i');
      return re.test(example);
    });
    if (!found) {
      addIssue('MAJOR', e._file, e.word, 'WORD_NOT_IN_EXAMPLE',
        `The word "${e.word}" doesn't appear in any form in the example: "${e.example.substring(0,60)}..."`,
        'Rewrite example to include the target word');
    }
  }
}

function checkImageKeywordMismatch(entries) {
  for (const e of entries) {
    const ik = (e.imageKeyword || '').toLowerCase();
    const word = e.word.toLowerCase();
    const def = (e.definition || '').toLowerCase();
    
    // Check if imageKeyword contains "important" (replace accident residue)
    if (ik.includes('important lock') || ik.includes('important under')) {
      addIssue('CRITICAL', e._file, e.word, 'IK_REPLACE_ACCIDENT',
        `imageKeyword "${e.imageKeyword}" contains replace accident residue`,
        'Fix imageKeyword');
    }
  }
}

function checkDefinitionComplexity(entries) {
  for (const e of entries) {
    const level = e.level || 0;
    if (level > 2) continue;
    const def = (e.definition || '');
    // Check if definition has words longer than 10 chars (rough complexity check)
    const longWords = def.split(/\s+/).filter(w => w.replace(/[^a-z]/gi, '').length > 10);
    if (longWords.length > 0) {
      addIssue('MINOR', e._file, e.word, 'COMPLEX_DEFINITION',
        `L${level} definition uses complex word(s): ${longWords.join(', ')}`,
        'Simplify definition for young learners');
    }
  }
}

function checkBritishSpellings(entries) {
  const british = ['colour', 'favour', 'honour', 'behaviour', 'organise', 'realise',
    'analyse', 'centre', 'theatre', 'licence', 'defence', 'cancelled', 'labelled',
    'travelled', 'judgement', 'recognise', 'apologise', 'practise'];
  for (const e of entries) {
    const text = `${e.definition || ''} ${e.example || ''}`.toLowerCase();
    for (const word of british) {
      if (text.includes(word)) {
        addIssue('MINOR', e._file, e.word, 'BRITISH_SPELLING',
          `British spelling detected: "${word}"`,
          `Use American spelling`);
      }
    }
  }
}

function checkGrammarPatterns(entries) {
  for (const e of entries) {
    const example = e.example || '';
    const def = e.definition || '';
    const text = `${def} ${example}`;
    
    // "it were" → "it was"
    if (/\bit were\b/i.test(text)) {
      addIssue('MAJOR', e._file, e.word, 'GRAMMAR',
        `"it were" should be "it was"`,
        'Fix grammar');
    }
    // "he/she don't" 
    if (/\b(he|she|it) don't\b/i.test(text)) {
      addIssue('MAJOR', e._file, e.word, 'GRAMMAR',
        `"${RegExp.$1} don't" should be "${RegExp.$1} doesn't"`,
        'Fix grammar');
    }
    // double period
    if (/\.\./g.test(text) && !/\.\.\./g.test(text)) {
      addIssue('MINOR', e._file, e.word, 'GRAMMAR',
        'Double period detected',
        'Remove extra period');
    }
  }
}

// ============ MAIN ============

console.log('🔍 Word Street Proofcheck Engine v1.0');
console.log('=====================================\n');

const entries = loadWords();
console.log(`📚 Loaded ${entries.length} entries from ${new Set(entries.map(e => e._file)).size} files\n`);

// Run all checks
checkBannedWords(entries);
checkBannedExamplePhrases(entries);
checkReplaceAccidents(entries);
checkDuplicates(entries);
checkCircularDefinition(entries);
checkEmptyFields(entries);
checkArticleErrors(entries);
checkExampleWordUsage(entries);
checkImageKeywordMismatch(entries);
checkDefinitionComplexity(entries);
checkBritishSpellings(entries);
checkGrammarPatterns(entries);

// Sort by severity
const severityOrder = { CRITICAL: 0, MAJOR: 1, MINOR: 2 };
issues.sort((a, b) => (severityOrder[a.severity] || 99) - (severityOrder[b.severity] || 99));

// Count
const critical = issues.filter(i => i.severity === 'CRITICAL').length;
const major = issues.filter(i => i.severity === 'MAJOR').length;
const minor = issues.filter(i => i.severity === 'MINOR').length;

console.log(`\n📊 Results: ${critical} CRITICAL | ${major} MAJOR | ${minor} MINOR | Total: ${issues.length}\n`);

if (issues.length === 0) {
  console.log('✅ ALL CHECKS PASSED — CLEAN');
} else {
  console.log('❌ Issues found:\n');
  for (const i of issues) {
    const icon = i.severity === 'CRITICAL' ? '🔴' : i.severity === 'MAJOR' ? '🟡' : '🟢';
    console.log(`${icon} [${i.severity}] ${i._file || i.file} | ${i.word} | ${i.check}`);
    console.log(`   ${i.detail}`);
    console.log(`   → ${i.fix}\n`);
  }
}

// Write report
const report = `# Proofcheck Report — ${new Date().toISOString().slice(0,10)}

**Engine:** proofcheck.mjs v1.0
**Entries:** ${entries.length}
**Results:** ${critical} CRITICAL | ${major} MAJOR | ${minor} MINOR

${issues.length === 0 ? '## ✅ ALL CHECKS PASSED — CLEAN' : '## Issues\n\n' + issues.map(i => 
  `### [${i.severity}] ${i.file} — "${i.word}" (${i.check})\n${i.detail}\n**Fix:** ${i.fix}\n`
).join('\n')}
`;

fs.writeFileSync(path.join(DIR, `PROOFCHECK-${new Date().toISOString().slice(0,10)}.md`), report);
console.log(`\n📝 Report saved to PROOFCHECK-${new Date().toISOString().slice(0,10)}.md`);
