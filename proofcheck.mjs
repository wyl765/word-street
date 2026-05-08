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

// Unsafe words in examples and imageKeywords (whole-word match)
const UNSAFE_EXAMPLE_WORDS = [
  'death', 'murder', 'stab', 'shoot', 'gun',
];

// Unsafe words in imageKeywords (whole-word match)
const UNSAFE_IMAGEKEYWORD_WORDS = [
  'blood', 'skull', 'naked', 'nude', 'weapon', 'weapons',
];

// Words banned in L1-L3 definitions (use safer alternatives)
const BANNED_DEF_WORDS_L1_L3 = [
  { word: 'drug', fix: 'medicine', label: 'Use "medicine" instead of "drug" for children' },
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

function checkUnsafeExampleWords(entries) {
  for (const e of entries) {
    const example = (e.example || '').toLowerCase();
    for (const word of UNSAFE_EXAMPLE_WORDS) {
      const re = new RegExp(`\\b${word}\\b`, 'i');
      if (re.test(example)) {
        addIssue('MAJOR', e._file, e.word, 'UNSAFE_EXAMPLE',
          `Example contains unsafe word "${word}": "${e.example.substring(0, 80)}..."`,
          'Replace with child-safe alternative');
      }
    }
    // Check imageKeyword
    const ik = (e.imageKeyword || '').toLowerCase();
    for (const word of UNSAFE_IMAGEKEYWORD_WORDS) {
      const re = new RegExp(`\\b${word}\\b`, 'i');
      if (re.test(ik)) {
        addIssue('MAJOR', e._file, e.word, 'UNSAFE_IMAGEKEYWORD',
          `imageKeyword contains unsafe word "${word}": "${e.imageKeyword}"`,
          'Replace with child-safe alternative');
      }
    }
  }
}

function checkBannedDefWords(entries) {
  for (const e of entries) {
    const level = e.level || 0;
    if (level > 3) continue;
    const def = (e.definition || '').toLowerCase();
    for (const { word, fix, label } of BANNED_DEF_WORDS_L1_L3) {
      const re = new RegExp(`\\b${word}\\b`, 'i');
      if (re.test(def)) {
        addIssue('MAJOR', e._file, e.word, 'BANNED_DEF_WORD',
          `L${level} definition contains "${word}": "${e.definition}"`,
          `${label}: use "${fix}"`);
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
          'one', 'once', 'unicorn', 'universal', 'utopia', 'utopian', 'unified',
          'unanim', 'unilatera', 'unilateral', 'uranium', 'urine', 'usurp', 'utilize'];
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
    if (!e.example) continue;
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
    // handle became/become, overcame/overcome, come→came
    if (word.endsWith('come')) forms.push(word.replace('come','came'));
    if (word.startsWith('over')) forms.push(word.replace('come','came'));
    if (word.endsWith('draw')) forms.push(word.replace('draw','drew'), word.replace('draw','drawn'));
    // Common irregular verbs
    const irregularMap = {
      'become': ['became','becomes','becoming'],
      'overcome': ['overcame','overcomes','overcoming'],
      'run': ['ran','runs','running'],
      'begin': ['began','begun','begins','beginning'],
      'swim': ['swam','swum','swims','swimming'],
      'grow': ['grew','grown','grows','growing'],
      'know': ['knew','known','knows','knowing'],
      'throw': ['threw','thrown','throws','throwing'],
      'fly': ['flew','flown','flies','flying'],
      'break': ['broke','broken','breaks','breaking'],
      'speak': ['spoke','spoken','speaks','speaking'],
      'choose': ['chose','chosen','chooses','choosing'],
      'freeze': ['froze','frozen','freezes','freezing'],
      'write': ['wrote','written','writes','writing'],
      'ride': ['rode','ridden','rides','riding'],
      'drive': ['drove','driven','drives','driving'],
      'rise': ['rose','risen','rises','rising'],
      'take': ['took','taken','takes','taking'],
      'give': ['gave','given','gives','giving'],
      'hide': ['hid','hidden','hides','hiding'],
      'bite': ['bit','bitten','bites','biting'],
      'tear': ['tore','torn','tears','tearing'],
      'wear': ['wore','worn','wears','wearing'],
      'think': ['thought','thinks','thinking'],
      'bring': ['brought','brings','bringing'],
      'buy': ['bought','buys','buying'],
      'catch': ['caught','catches','catching'],
      'teach': ['taught','teaches','teaching'],
      'fight': ['fought','fights','fighting'],
      'find': ['found','finds','finding'],
      'hold': ['held','holds','holding'],
      'keep': ['kept','keeps','keeping'],
      'lead': ['led','leads','leading'],
      'leave': ['left','leaves','leaving'],
      'lose': ['lost','loses','losing'],
      'make': ['made','makes','making'],
      'mean': ['meant','means','meaning'],
      'meet': ['met','meets','meeting'],
      'pay': ['paid','pays','paying'],
      'say': ['said','says','saying'],
      'sell': ['sold','sells','selling'],
      'send': ['sent','sends','sending'],
      'sit': ['sat','sits','sitting'],
      'sleep': ['slept','sleeps','sleeping'],
      'spend': ['spent','spends','spending'],
      'stand': ['stood','stands','standing'],
      'tell': ['told','tells','telling'],
      'win': ['won','wins','winning'],
    };
    if (irregularMap[word]) {
      forms.push(...irregularMap[word]);
    }
    // vertex→vertices, index→indices
    if (word.endsWith('ex')) forms.push(word.slice(0,-2) + 'ices');
    if (word.endsWith('x')) forms.push(word.slice(0,-1) + 'ces');
    // dike→dyke (alternate spelling)
    if (word === 'dike') forms.push('dyke');
    // Handle diacritical: communique→communiqué, cliche→cliché, resume→résumé, naive→naïve, cafe→café
    const diacriticalMap = {
      'communique': 'communiqué', 'cliche': 'cliché', 'resume': 'résumé',
      'naive': 'naïve', 'cafe': 'café', 'fiance': 'fiancé',
      'protege': 'protégé', 'souffle': 'soufflé',
    };
    if (diacriticalMap[word]) forms.push(diacriticalMap[word]);
    
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
  // Generic single-word imageKeywords that won't return useful search results
  const GENERIC_SINGLE_WORDS = new Set([
    'element', 'goal', 'start', 'show', 'point', 'form', 'state', 'action',
    'thing', 'way', 'place', 'time', 'change', 'move', 'feel', 'think',
    'help', 'work', 'look', 'group', 'part', 'end', 'turn', 'step', 'set',
    'type', 'level', 'line', 'side', 'case', 'plan', 'base', 'role', 'rule',
    'sign', 'view', 'mark', 'test', 'code', 'rate', 'area', 'fact', 'note'
  ]);

  for (const e of entries) {
    const ik = (e.imageKeyword || '').toLowerCase().trim();
    const word = e.word.toLowerCase();
    const def = (e.definition || '').toLowerCase();
    
    // Check if imageKeyword contains "important" (replace accident residue)
    if (ik.includes('important lock') || ik.includes('important under')) {
      addIssue('CRITICAL', e._file, e.word, 'IK_REPLACE_ACCIDENT',
        `imageKeyword "${e.imageKeyword}" contains replace accident residue`,
        'Fix imageKeyword');
    }

    // Check for generic single-word imageKeywords (too vague for image search)
    const ikWords = ik.split(/\s+/);
    if (ikWords.length === 1 && GENERIC_SINGLE_WORDS.has(ik) && ik !== word) {
      addIssue('MINOR', e._file, e.word, 'GENERIC_IMAGEKEYWORD',
        `imageKeyword "${e.imageKeyword}" is a single generic word that won't return useful images`,
        'Use a more specific, visual phrase (e.g., "carbon atom diagram" instead of "element")');
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
    // "no caring" pattern (should be "without caring" or "no care")
    // Only flag when the -ing word is clearly a gerund, not a noun
    if (/\bno \w+ing\b/i.test(def)) {
      const match = def.match(/\bno (\w+ing)\b/i);
      // Whitelist: words that are nouns/adjectives ending in -ing
      const ingNouns = ['nothing','morning','evening','flooring','roofing','clothing',
        'warning','meaning','wasting','building','feeling','opening','beginning',
        'setting','spelling','landing','trading','training','reading','writing',
        'standing','understanding','blessing','parking','meeting','wrestling',
        'covering','offering','hearing','clearing','stunning','winning','ending'];
      if (match && !ingNouns.includes(match[1].toLowerCase())) {
        addIssue('MAJOR', e._file, e.word, 'GRAMMAR',
          `"no ${match[1]}" should be "without ${match[1]}" or "no ${match[1].replace(/ing$/, '')}"`,
          'Fix grammar pattern');
      }
    }
    // double period
    if (/\.\./g.test(text) && !/\.\.\./g.test(text)) {
      addIssue('MINOR', e._file, e.word, 'GRAMMAR',
        'Double period detected',
        'Remove extra period');
    }
    // Subject-verb agreement: only flag plural subjects with singular verb
    if (/\bthey is\b/i.test(text)) {
      addIssue('MAJOR', e._file, e.word, 'SVA_ERROR',
        `"they is" should be "they are"`,
        'Fix subject-verb agreement');
    }
    if (/\bthey was\b/i.test(text)) {
      addIssue('MAJOR', e._file, e.word, 'SVA_ERROR',
        `"they was" should be "they were"`,
        'Fix subject-verb agreement');
    }
    // Skip "you is" when preceded by a word (likely part of "... you is" where subject is not "you")
    if (/(?:^|[.!?]\s+)(we|you) is\b/i.test(text)) {
      addIssue('MAJOR', e._file, e.word, 'SVA_ERROR',
        `"${RegExp.$1} is" should be "${RegExp.$1} are"`,
        'Fix subject-verb agreement');
    }
  }
}

// ============ COLLOCATION CHECK ============
const WRONG_COLLOCATIONS = [
  { wrong: /\bbig (snowstorm|rain|wind|storm|snow|fog)\b/i, fix: 'heavy $1', label: 'big→heavy for weather' },
  { wrong: /\bdo a (mistake|error)\b/i, fix: 'make a $1', label: 'do→make for mistakes' },
  { wrong: /\bmake (homework|research|exercise)\b/i, fix: 'do $1', label: 'make→do for tasks' },
  { wrong: /\bopen the (computer|TV|radio|light)\b/i, fix: 'turn on the $1', label: 'open→turn on for devices' },
  { wrong: /\bclose the (computer|TV|radio|light)\b/i, fix: 'turn off the $1', label: 'close→turn off for devices' },
  { wrong: /\bstrong (rain|snow)\b/i, fix: 'heavy $1', label: 'strong→heavy for precipitation' },
  { wrong: /\bbig (traffic|noise|voice)\b/i, fix: 'heavy traffic / loud noise / loud voice', label: 'big→heavy/loud' },
  { wrong: /\beat (medicine|drug)\b/i, fix: 'take $1', label: 'eat→take for medicine' },
  { wrong: /\bsee a (dream)\b/i, fix: 'have a $1', label: 'see→have for dreams' },
  { wrong: /\bat first from\b/i, fix: 'originally from', label: 'at first from→originally from' },
];

function checkCollocations(entries) {
  for (const e of entries) {
    const text = `${e.definition || ''} ${e.example || ''}`;
    for (const { wrong, fix, label } of WRONG_COLLOCATIONS) {
      if (wrong.test(text)) {
        const matched = text.match(wrong)[0];
        addIssue('MAJOR', e._file, e.word, 'COLLOCATION',
          `Wrong collocation: "${matched}" → ${fix}`,
          `Fix: ${label}`);
      }
    }
  }
}

// ============ FACT CHECKS ============
const FACT_CHECKS = [
  { word: 'mushroom', wrong: /\bplant\b/i, correct: 'fungus', msg: 'Mushroom is a fungus, not a plant' },
  { word: 'spider', wrong: /\binsect\b/i, correct: 'arachnid', msg: 'Spider is an arachnid, not an insect' },
  { word: 'whale', wrong: /\bfish\b/i, correct: 'mammal', msg: 'Whale is a mammal, not a fish' },
  { word: 'dolphin', wrong: /\bfish\b/i, correct: 'mammal', msg: 'Dolphin is a mammal, not a fish' },
  { word: 'bat', wrong: /\bbird\b/i, correct: 'mammal', msg: 'Bat is a mammal, not a bird' },
  { word: 'penguin', wrong: /\bthat flies\b/i, correct: 'flightless bird', msg: 'Penguins cannot fly' },
  { word: 'starfish', wrong: /\bfish\b/i, correct: 'echinoderm', msg: 'Starfish is not a fish' },
];

function checkFactErrors(entries) {
  for (const e of entries) {
    const fc = FACT_CHECKS.find(f => f.word === e.word.toLowerCase());
    if (fc && fc.wrong.test(e.definition)) {
      addIssue('CRITICAL', e._file, e.word, 'FACT_ERROR',
        `${fc.msg}. Current def: "${e.definition}"`,
        `Use "${fc.correct}" instead`);
    }
  }
}

// ============ SYNONYM CYCLE CHECK ============
function checkSynonymCycles(entries) {
  // Detect pairs where A's definition == B's word and B's definition == A's word
  const defMap = new Map();
  for (const e of entries) {
    const defWords = (e.definition || '').toLowerCase().trim().split(/\s+/);
    if (defWords.length === 1) {
      defMap.set(e.word.toLowerCase(), defWords[0]);
    }
  }
  for (const [wordA, defA] of defMap) {
    if (defMap.has(defA) && defMap.get(defA) === wordA) {
      addIssue('MAJOR', '', wordA, 'SYNONYM_CYCLE',
        `Circular definition: "${wordA}" = "${defA}" and "${defA}" = "${wordA}"`,
        'At least one must use a descriptive definition');
      defMap.delete(defA); // Don't report twice
    }
  }
}

// ============ VAGUE DEFINITION CHECK ============
function checkVagueDefinition(entries) {
  for (const e of entries) {
    const def = (e.definition || '').toLowerCase();
    const somethingCount = (def.match(/\bsomething\b/g) || []).length;
    if (somethingCount >= 2) {
      addIssue('MINOR', e._file, e.word, 'VAGUE_DEFINITION',
        `Definition uses "something" ${somethingCount} times: "${e.definition}"`,
        'Rephrase to be more specific');
    }
  }
}

// ============ LAZY IMAGEKEYWORD CHECK ============
function checkLazyImageKeyword(entries) {
  for (const e of entries) {
    const ik = (e.imageKeyword || '').toLowerCase().trim();
    const word = e.word.toLowerCase().trim();
    const level = e.level || 0;
    // Only flag L3+ where abstract words need descriptive imageKeywords
    // L1-L2 concrete nouns (puppy, eagle, etc.) are fine with word=imageKeyword
    if (level >= 3 && ik === word && !word.includes(' ')) {
      addIssue('MINOR', e._file, e.word, 'LAZY_IMAGEKEYWORD',
        `imageKeyword "${e.imageKeyword}" is just the word itself`,
        'Use a specific scene description instead');
    }
  }
}

// ============ SHORT DEF FOR ADVANCED LEVELS ============
function checkShortDefAdvanced(entries) {
  for (const e of entries) {
    const level = e.level || 0;
    if (level < 4) continue;
    const wordCount = (e.definition || '').split(/\s+/).filter(w => w.length > 0).length;
    if (wordCount <= 2) {
      addIssue('MINOR', e._file, e.word, 'SHORT_DEF_ADVANCED',
        `L${level} definition has only ${wordCount} word(s): "${e.definition}"`,
        'L4/L5 definitions should have at least 4 words');
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
checkUnsafeExampleWords(entries);
checkBannedDefWords(entries);
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
checkCollocations(entries);
checkFactErrors(entries);
checkSynonymCycles(entries);
checkVagueDefinition(entries);
checkLazyImageKeyword(entries);
checkShortDefAdvanced(entries);

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
