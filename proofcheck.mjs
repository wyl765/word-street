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

// Culture-specific phrases that Chinese students may lack schema for
const CULTURE_SPECIFIC_PHRASES = [
  'thanksgiving', 'halloween', 'prom', 'yearbook', 'homecoming',
  'pledge of allegiance', 'fourth of july', 'trick or treat',
  'santa claus', 'easter bunny', 'groundhog day', 'super bowl',
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
    // Also scan definition, example, and imageKeyword for banned words
    const allText = `${e.definition || ''} ${e.example || ''} ${e.imageKeyword || ''}`.toLowerCase();
    for (const banned of BANNED_WORDS) {
      const re = new RegExp(`\\b${banned}\\b`, 'i');
      if (re.test(allText) && wordLower !== banned) {
        addIssue('CRITICAL', e._file, e.word, 'BANNED_WORD_IN_TEXT',
          `Banned word "${banned}" found in definition/example/imageKeyword`,
          'Remove banned word from all fields');
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
    // trailing ellipsis in example (mutation signature: appended "...")
    if (/\.\.\.$/.test(example.trim()) || /\.\.\.\.\./.test(example)) {
      addIssue('MAJOR', e._file, e.word, 'GRAMMAR',
        'Trailing ellipsis or extra periods at end of example',
        'Remove trailing dots');
    }
    // multiple conjugated verbs in sequence ("is goes began", "was runs")
    const verbSeqRe = /\b(is|are|was|were|am|has|have|had|goes|went|began|does|did)\s+(is|are|was|were|goes|went|began|does|did|runs|comes|gets|takes|makes)\b/i;
    if (verbSeqRe.test(text)) {
      addIssue('MAJOR', e._file, e.word, 'GRAMMAR',
        `Double/conflicting conjugated verbs detected: "${text.match(verbSeqRe)[0]}"`,
        'Fix garbled verb sequence');
    }
    // Irregular plural errors: "childrens", "mouses", "foots", "tooths", "sheeps" etc.
    const WRONG_PLURALS = [
      { wrong: /\bchildrens\b/i, fix: 'children' },
      { wrong: /\bpeoples\b/i, fix: 'people', validWords: ['peoples'] },
      { wrong: /\bmouses\b/i, fix: 'mice', validWords: ['mouses'] },
      { wrong: /\bfoots\b/i, fix: 'feet' },
      { wrong: /\btooths\b/i, fix: 'teeth' },
      { wrong: /\bsheeps\b/i, fix: 'sheep' },
      { wrong: /\bfishs\b/i, fix: 'fish' },
      { wrong: /\bgooses\b/i, fix: 'geese' },
      { wrong: /\bmans\b/i, fix: 'men' },
      { wrong: /\bwomans\b/i, fix: 'women' },
      { wrong: /\boxes\b/i, fix: 'oxen', validWords: ['boxes','foxes'] },
    ];
    for (const wp of WRONG_PLURALS) {
      if (wp.wrong.test(text)) {
        const matched = text.match(wp.wrong)?.[0];
        const wordLow = (e.word || '').toLowerCase();
        if (wp.validWords && wp.validWords.some(v => wordLow.includes(v))) continue;
        addIssue('MAJOR', e._file, e.word, 'GRAMMAR',
          `Wrong irregular plural "${matched}" should be "${wp.fix}"`,
          'Fix irregular plural');
      }
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
  { wrong: /\badmiral\b.*\b(sailed|steered|rowed)\b/i, fix: 'commanded/led', label: 'admiral commands, does not sail/steer' },
  { wrong: /\bdrink (soup|broth|stew)\b/i, fix: 'eat/have $1', label: 'drink→eat/have for soup' },
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
  { word: 'momentum', wrong: /\b(force|energy)\b/i, correct: 'mass × velocity', msg: 'Momentum is not a force or energy; it is mass × velocity' },
  { word: 'asteroid', wrong: /\bfloat/i, correct: 'orbit', msg: 'Asteroids orbit the Sun; they do not float' },
  { word: 'molecule', wrong: /\btiniest piece\b/i, correct: 'group of atoms', msg: 'Molecules are not the tiniest piece; atoms are smaller' },
  { word: 'coral', wrong: /\bplant\b/i, correct: 'animal', msg: 'Coral is an animal, not a plant' },
  { word: 'tomato', wrong: /\bvegetable\b/i, correct: 'fruit (botanically)', msg: 'Tomato is botanically a fruit' },
  { word: 'sound', wrong: /\bvacuum\b.*\btravel/i, correct: 'needs medium', msg: 'Sound cannot travel in a vacuum' },
  { word: 'insulator', wrong: /\bblocks? power\b/i, correct: 'blocks electricity', msg: 'Insulator blocks electricity, not "power" (too vague)' },
  { word: 'geothermal', wrong: /^(?:heat|energy) that/i, correct: 'adjective: using heat from Earth', msg: 'Geothermal is an adjective; definition should not start as a noun' },
  { word: 'sun', wrong: /\bstar that orbits\b/i, correct: 'star at center', msg: 'The Sun does not orbit; planets orbit it' },
  { word: 'penguin', wrong: /\bcan fly\b/i, correct: 'flightless', msg: 'Penguins cannot fly' },
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

// ============ R33 DEBATE-DERIVED RULES ============

// Rule 1: Definition should not misclassify structures as roads
const STRUCTURE_NOT_ROAD = ['bridge','tunnel','overpass','underpass','aqueduct','viaduct','causeway'];
function checkStructureAsRoad(entries) {
  for (const e of entries) {
    const def = (e.definition || '').toLowerCase();
    const word = (e.word || '').toLowerCase();
    if (STRUCTURE_NOT_ROAD.includes(word) && /^a road\b/.test(def)) {
      addIssue('MAJOR', e._file, e.word, 'STRUCTURE_AS_ROAD',
        `Definition starts with "a road" but ${e.word} is a structure/passage, not a road`,
        'Use "a structure" or "a path" or describe function instead');
    }
  }
}

// Rule 2: Subjective adjectives should not appear in definitions
const SUBJECTIVE_ADJS = /\b(pretty|beautiful|ugly|gorgeous|lovely|handsome|cute|hideous|stunning|attractive)\b/i;
const SUBJECTIVE_WORDS_OK = new Set(['pretty','beautiful','ugly','gorgeous','lovely','handsome','cute','hideous','stunning','attractive','fancy','elegant','graceful','grace','ghastly','grotto','beautify','glamorous','dainty','exquisite','splendid','magnificent','hideous']);
function checkSubjectiveDefinitions(entries) {
  for (const e of entries) {
    const word = (e.word || '').toLowerCase();
    if (SUBJECTIVE_WORDS_OK.has(word)) continue;
    const def = (e.definition || '');
    const m = def.match(SUBJECTIVE_ADJS);
    if (m) {
      addIssue('MINOR', e._file, e.word, 'SUBJECTIVE_DEF',
        `Definition contains subjective adjective "${m[0]}": "${def}"`,
        'Remove subjective adjectives from definitions');
    }
  }
}

// Rule 3: "boats park" — park should only collocate with vehicles, not boats
function checkBoatPark(entries) {
  for (const e of entries) {
    const def = (e.definition || '').toLowerCase();
    if (/\bboats?\s+(park|parks|parked|parking)\b/i.test(def) || /\b(park|parks|parked|parking)\s+boats?\b/i.test(def)) {
      addIssue('MINOR', e._file, e.word, 'BAD_COLLOCATION',
        `"park" does not collocate with "boat". Boats dock, moor, or stay.`,
        'Replace "park" with "stay" or "dock"');
    }
  }
}

// ============ NONSENSE / MUTATION INJECTION DETECTION ============
const NONSENSE_PATTERNS = [
  { re: /\btropical fruit\b/i, domain: 'fruit', validWords: ['mango','papaya','banana','pineapple','coconut','guava','passion','kiwi','lychee','dragonfruit','plantain','starfruit','jackfruit','durian','fig','pomegranate','citrus','fruit'] },
  { re: /\bgrows? underground\b/i, domain: 'underground plant', validWords: ['potato','carrot','onion','garlic','beet','turnip','radish','yam','ginger','turmeric','peanut','truffle','tuber','root','bulb','mushroom','fungus','worm','mole','burrow','tunnel','mine','cave','subway','groundhog','prairie'] },
  { re: /\bgrows? in caves?\b/i, domain: 'cave', validWords: ['stalactite','stalagmite','cave','mushroom','fungus','bat','moss','crystal','mineral'] },
  { re: /\bpurple seeds?\b/i, domain: 'purple seeds', validWords: ['pomegranate','passion','grape','fig','eggplant','berry','fruit'] },
];

function checkNonsenseInjection(entries) {
  for (const e of entries) {
    const def = (e.definition || '').toLowerCase();
    const word = (e.word || '').toLowerCase();
    for (const np of NONSENSE_PATTERNS) {
      if (np.re.test(def)) {
        if (!np.validWords.some(v => word.includes(v))) {
          addIssue('CRITICAL', e._file, e.word, 'NONSENSE_DEF',
            `Definition contains "${def.match(np.re)[0]}" but word "${e.word}" is not in ${np.domain} domain`,
            'Check for corrupted/injected definition content');
        }
      }
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

// ============ CROSS-DEFINITION CYCLE CHECK ============
// Detects same-level word pairs where A's definition contains B and B's definition contains A
function checkCrossDefinitionCycles(entries) {
  const byLevel = new Map();
  for (const e of entries) {
    const lvl = e.level;
    if (!byLevel.has(lvl)) byLevel.set(lvl, []);
    byLevel.get(lvl).push(e);
  }
  const reported = new Set();
  for (const [lvl, words] of byLevel) {
    for (let i = 0; i < words.length; i++) {
      const a = words[i];
      const aWord = a.word.toLowerCase();
      const aDef = (a.definition || '').toLowerCase();
      for (let j = i + 1; j < words.length; j++) {
        const b = words[j];
        const bWord = b.word.toLowerCase();
        const bDef = (b.definition || '').toLowerCase();
        const aRegex = new RegExp(`\\b${aWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`);
        const bRegex = new RegExp(`\\b${bWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`);
        if (bRegex.test(aDef) && aRegex.test(bDef)) {
          const key = [aWord, bWord].sort().join('|');
          if (!reported.has(key)) {
            reported.add(key);
            addIssue('MINOR', a._file, a.word, 'CROSS_DEF_CYCLE',
              `Cross-definition cycle: "${aWord}" def contains "${bWord}" and "${bWord}" def contains "${aWord}" (both L${lvl})`,
              'Break the cycle: at least one definition should not reference the other word');
          }
        }
      }
    }
  }
}
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
    // L1-L2: flag abstract/function words that use themselves as imageKeyword
    // Concrete nouns are fine, but adverbs, conjunctions, prepositions, abstract adjectives need scenes
    if (level <= 2 && ik === word && !word.includes(' ')) {
      const abstractPatterns = /^(while|since|during|although|because|after|before|until|unless|whether|however|therefore|nevertheless|meanwhile|furthermore|moreover|otherwise|besides|hence|thus|whereas|whereby|soon|moment|half|near|once|twice|single|still|even|already|almost|quite|rather|perhaps|maybe|often|never|always|seldom|rarely|merely)$/;
      if (abstractPatterns.test(word) || /ly$/.test(word)) {
        addIssue('MINOR', e._file, e.word, 'ABSTRACT_SELF_IMAGEKEYWORD',
          `Abstract/function word imageKeyword "${e.imageKeyword}" is just the word itself — won't return useful images`,
          'Use a specific scene description instead');
      }
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

// ============ INTRODUCTORY COMMA CHECK ============
function checkIntroductoryComma(entries) {
  const introStarters = /^(After|Before|When|While|Because|Because of|If|Once|Instead of|Until|Since|Although|Unless|Whenever|Wherever) /i;
  for (const e of entries) {
    const ex = e.example || '';
    if (introStarters.test(ex)) {
      // Check first 80 chars for a comma
      const first80 = ex.substring(0, 80);
      if (!first80.includes(',')) {
        addIssue('MAJOR', e._file, e.word, 'MISSING_INTRO_COMMA',
          `Example starts with subordinate clause but lacks introductory comma: "${ex.substring(0, 60)}..."`,
          'Add comma after the introductory clause');
      }
    }
  }
}

// ============ ADJECTIVE-AS-NOUN DEFINITION CHECK ============
function checkAdjectiveNounMismatch(entries) {
  // Words ending in adjective suffixes but defined as nouns
  const adjSuffixes = /(ous|ive|ful|less|able|ible|ic|ary|ory)$/;
  // Whitelist: words that end in adj suffix but ARE nouns
  const nounWhitelist = ['stable','fable','syllable','table','variable','gable','crucible','library','hickory','summary','boundary','territory','glossary','accessory','capillary','primary','category','quandary','beneficiary','inventory','repository','tributary','ivory','allegory','estuary','dormitory','conservatory','itinerary','mercenary','sanctuary','emissary','adversary','trajectory','theory','narrative','initiative','detective','locomotive','executive','perspective','objective','alternative','incentive','representative','collective','archive','derivative','fugitive','adjective','substantive','accusative','dative','infinitive','conservative','progressive','explosive','adhesive','abrasive','sedative','laxative','superlative','comparative','imperative','prerogative','negative','positive','creative','native','relative','massive','passive','active','motive','epic','magic','music','public','traffic','picnic','panic','plastic','fabric','attic','basic','classic','historic','electric','automatic','rhetoric','arithmetic','clinic','comic','mimic','topic','logic','lyric','metric','mystic','tactic','rustic','static','mosaic','ceramic','dynamic','organic','academic','republic','fantastic','domestic','epidemic','cosmetic','genetic','athletic','prosthetic','aesthetic','synthetic','pathetic','prophetic','diagnostic','statistic','characteristic','semantic','pandemic','polemic','enthusiastic','problematic','systematic','idiomatic','aromatic','dramatic','traumatic','democratic','bureaucratic','autocratic','fanatic','erratic','eclectic','heretic','skeptic','antiseptic','relic','garlic','turmeric','tunic','basilic'];
  for (const e of entries) {
    const word = (e.word || '').toLowerCase();
    const def = (e.definition || '');
    if (adjSuffixes.test(word) && !nounWhitelist.includes(word) && /^(a |an |the )/i.test(def)) {
      addIssue('MINOR', e._file, e.word, 'ADJ_NOUN_MISMATCH',
        `Word appears to be adjective but definition starts with article: "${def.substring(0, 50)}..."`,
        'Consider rephrasing definition to adjective form');
    }
  }
}

// ============ BETWEEN-COMMA CHECK ============
function checkBetweenComma(entries) {
  for (const e of entries) {
    const ex = e.example || '';
    if (/between [^,]{3,30}, and /i.test(ex)) {
      addIssue('MAJOR', e._file, e.word, 'BAD_BETWEEN_COMMA',
        `Example has incorrect comma in "between X, and Y" pattern`,
        'Remove comma: "between X and Y"');
    }
  }
}

// ============ DANGLING MODIFIER CHECK ============
function checkDanglingModifier(entries) {
  const danglingPattern = /^(Looking|Walking|Running|Sitting|Standing|Seeing|Hearing|Feeling|Hoping|Thinking|Watching|Eating|Drinking|Reading|Writing|Playing|Working|Trying|Having|Being|Getting) [^,]+, (it|they|there) /i;
  for (const e of entries) {
    const ex = e.example || '';
    if (danglingPattern.test(ex)) {
      addIssue('MAJOR', e._file, e.word, 'DANGLING_MODIFIER',
        `Example may have a dangling modifier: "${ex.substring(0, 60)}..."`,
        'Ensure the subject of the main clause matches the implied subject of the participle');
    }
  }
}

// ============ DEFINITION-EXAMPLE POS MISMATCH ============
function checkDefExampleMismatch(entries) {
  // If definition starts with "a/an/the" (noun-style) but example uses the word as a verb
  // Simple heuristic: def starts with article, but example has "to [word]" or "[subject] [word]ed/s"
  for (const e of entries) {
    const def = (e.definition || '');
    const ex = (e.example || '').toLowerCase();
    const word = (e.word || '').toLowerCase();
    if (word.includes(' ')) continue; // skip phrases
    // Only flag if definition is noun-style (starts with article)
    if (!/^(a |an |the )/i.test(def)) continue;
    // Check if example uses the word as a verb (word + ed/s/ing after subject)
    const verbPattern = new RegExp(`\\b(to ${word}|${word}ed|${word}s|${word}ing)\\b`);
    if (verbPattern.test(ex) && !ex.includes(`the ${word}`) && !ex.includes(`a ${word}`)) {
      addIssue('MINOR', e._file, e.word, 'DEF_EX_POS_MISMATCH',
        `Definition is noun-style but example uses word as verb`,
        'Align definition and example to same part of speech');
    }
  }
}

// ============ VERB_DEF_NOUN_EXAMPLE CHECK ============
function checkVerbDefNounExample(entries) {
  // Definition starts with "to " (verb-style) but example uses word as noun
  // Pattern: "made a [word]", "gave a [word]", "a big/quick/loud [word]"
  const nounPatterns = [
    /\b(made|gave|took|had|did|with)\s+(a|an|the|his|her|my|its|their)\s+/,
    /\b(a|an|the|his|her|my|its|their)\s+(big|quick|loud|small|long|short|great|little|huge|sharp|deep|soft|hard|strong|wild|gentle|sudden|slow|brief|final)\s+/,
  ];
  // Whitelist: causative "made X verb" patterns are fine
  const verbDefNounWhitelist = ['vanish','shiver','disappear','appease','acclimate'];
  for (const e of entries) {
    const def = (e.definition || '');
    const ex = (e.example || '');
    const word = (e.word || '').toLowerCase();
    if (word.includes(' ')) continue; // skip phrases
    if (verbDefNounWhitelist.includes(word)) continue;
    if (!/^to\s/i.test(def)) continue; // only verb-style definitions
    // Check if example uses the word as a noun
    const wordEsc = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const nounUse = new RegExp(`\\b(a|an|the|his|her|my|its|their|big|quick|loud|small|long|short|great|little|huge|sharp|deep|soft|hard|strong|wild|gentle|sudden|slow|brief|final)\\s+${wordEsc}\\b`, 'i');
    const madeGave = new RegExp(`\\b(made|gave|took|had|did)\\s+(a|an|the)\\s+\\w{0,10}\\s*${wordEsc}\\b`, 'i');
    if (nounUse.test(ex) || madeGave.test(ex)) {
      addIssue('MAJOR', e._file, e.word, 'VERB_DEF_NOUN_EXAMPLE',
        `Definition is verb ("${def.substring(0, 40)}...") but example uses word as noun`,
        'Align: change example to verb usage, or change definition to noun form');
    }
  }
}

// ============ COMPARISON_DEF CHECK ============
function checkComparisonDef(entries) {
  // Flag definitions that start with "like a [word]" — comparison-dependent
  for (const e of entries) {
    const def = (e.definition || '');
    if (/^like (a|an) \w+/i.test(def)) {
      addIssue('MINOR', e._file, e.word, 'COMPARISON_DEF',
        `Definition depends on comparison: "${def.substring(0, 50)}..."`,
        'Consider an independent definition that does not rely on knowing another word');
    }
  }
}

// ============ MULTI-MEANING CHECK (L1-L2) ============
function checkMultiMeaning(entries) {
  // L1-L2 definitions should have single meaning
  // Detect patterns: ", or to ", "or to " joining two verb phrases
  const multiMeaningPattern = /,?\s+or\s+to\s+|;\s*also\s+/i;
  // Whitelist: synonym paraphrases (same meaning expressed differently)
  const synonymWhitelist = ['depend','denote','cease','halt'];
  for (const e of entries) {
    const level = e.level || 0;
    if (level > 2) continue;
    if (synonymWhitelist.includes(e.word)) continue;
    const def = e.definition || '';
    if (multiMeaningPattern.test(def)) {
      // Whitelist: same-concept alternatives (e.g., "butterfly or moth", "bear or lion")
      const orSegments = def.split(/\s+or\s+/);
      if (orSegments.length === 2 && !orSegments[1].startsWith('to ')) continue;
      addIssue('HIGH', e._file, e.word, 'MULTI_MEANING',
        `L${level} definition has multiple distinct meanings: "${def}"`,
        'L1-L2 definitions should have a single meaning. Pick the most common/useful one.');
    }
  }
}

// ============ WHEN_DEFINITION CHECK ============
function checkWhenDefinition(entries) {
  // Flag verb-word definitions that start with "when" — suggests event description instead of verb definition
  const whitelist = ['dawn','dusk','noon','midnight','drought','flood','blizzard','sunset','sunrise'];
  for (const e of entries) {
    const def = (e.definition || '');
    const word = (e.word || '').toLowerCase();
    if (whitelist.includes(word)) continue;
    if (/^when\s/i.test(def)) {
      addIssue('MINOR', e._file, e.word, 'WHEN_DEFINITION',
        `Definition starts with "when": "${def.substring(0, 60)}..."`,
        'Use "to + verb" for verbs or "a/an + noun" for nouns instead of event description');
    }
  }
}

// ============ SAME_LEVEL_CIRCULAR CHECK ============
function checkSameLevelCircular(entries) {
  // Build word→level map (only words 5+ chars to avoid common words)
  const wordLevel = new Map();
  for (const e of entries) {
    const w = (e.word || '').toLowerCase();
    const lvl = e.level || 0;
    if (w.length >= 5 && !w.includes(' ')) wordLevel.set(w, lvl);
  }
  // Check if L1 definition uses another L1 word as a KEY definitional word
  // Only flag when the same-level word appears as a core part of the definition
  // (first 4 content words)
  const stopWords = new Set(['a','an','the','to','is','are','was','were','be','been','being','have','has','had','do','does','did','will','would','could','should','may','might','shall','can','must','that','this','with','from','they','them','their','than','what','when','where','which','who','whom','whose','how','not','very','much','more','most','only','also','just','still','even','about','after','before','into','over','under','between','through','during','until','upon','like','such','each','every','some','many','other','another','same','both','either','neither','few','all','your','his','her','its','our','your','my','and','but','for','nor','yet','because','since','while','though','although','if','unless','until','once','often','never','always','sometimes','usually','already','too','enough','really','quite','rather','almost','hardly','barely','of','in','on','at','by','up','down','out','off','away','back','here','there','then','now','well','good','great','small','big','long','short','high','low','old','new','first','last','next','hard','soft','full','empty','open','close','right','left','far','near','fast','slow','dark','light','hot','cold','warm','cool','wet','dry','part','way','time','day','thing','things','something','nothing','anything','everything','someone','anyone','everyone','no one','place','people','person','world','kind','sort','type','feel','make','give','take','keep','find','help','tell','look','come','going','want','need','know','think','mean','seem','show','turn','call','move','work','play','live','different','without','because','inside','outside','another','around']);
  for (const e of entries) {
    const def = (e.definition || '').toLowerCase();
    const word = (e.word || '').toLowerCase();
    const level = e.level || 0;
    if (level > 1) continue; // Only check L1 where this is most critical
    const defWords = def.split(/[\s,;.!?()]+/).filter(w => w.length >= 5 && !stopWords.has(w));
    // Only check first 2 content words (the absolute core)
    const coreWords = defWords.slice(0, 2);
    for (const dw of coreWords) {
      if (dw === word) continue;
      if (wordLevel.has(dw) && wordLevel.get(dw) === level) {
        addIssue('MINOR', e._file, e.word, 'SAME_LEVEL_DEF_REF',
          `L${level} definition uses "${dw}" which is also an L${level} word (core position)`,
          'Avoid using same-level vocabulary in the core of definitions');
        break;
      }
    }
  }
}

// ============ CULTURE-SPECIFIC CHECK ============
function checkCultureSpecific(entries) {
  for (const e of entries) {
    const level = e.level || 0;
    if (level > 2) continue; // Only check L1-L2
    const example = (e.example || '').toLowerCase();
    for (const phrase of CULTURE_SPECIFIC_PHRASES) {
      const phraseRegex = new RegExp(`\\b${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (phraseRegex.test(example)) {
        addIssue('MINOR', e._file, e.word, 'CULTURE_SPECIFIC',
          `L${level} example contains Western culture-specific phrase "${phrase}": "${e.example.substring(0, 60)}..."`,
          'Replace with a culturally neutral example or add an alternative example');
      }
    }
  }
}

// ============ BRAND NAME IMAGE COLLISION ============
const BRAND_COLLISION_WORDS = [
  'kindle', 'echo', 'alexa', 'siri', 'dash', 'prime', 'nest', 'bolt',
  'spark', 'pixel', 'edge', 'surface', 'iris', 'flame', 'halo'
];
function checkBrandImageCollision(entries) {
  for (const e of entries) {
    const ik = (e.imageKeyword || '').toLowerCase();
    for (const brand of BRAND_COLLISION_WORDS) {
      if (ik.includes(brand) && e.word.toLowerCase() === brand) {
        // Check if imageKeyword is just the brand word or brand+generic
        const words = ik.split(/\s+/);
        if (words.length <= 2) {
          addIssue('MINOR', e._file, e.word, 'BRAND_IMAGE_COLLISION',
            `imageKeyword "${e.imageKeyword}" may return brand/product images instead of the intended meaning`,
            'Add descriptive context to disambiguate from brand names');
        }
      }
    }
  }
}

// ============ MILITARY CONTEXT CHECK ============
const MILITARY_CONTEXT_WORDS = /\b(soldiers?|army|military|troops|warfare|barracks|combat)\b/i;
const MILITARY_TARGET_WORDS = ['soldier', 'army', 'military', 'troop', 'general', 'colonel', 'sergeant', 'admiral', 'navy', 'marine', 'battalion', 'regiment', 'infantry', 'artillery', 'bunker', 'barracks'];
function checkMilitaryContext(entries) {
  for (const e of entries) {
    const example = e.example || '';
    if (MILITARY_CONTEXT_WORDS.test(example)) {
      // Skip if the word itself is a military term
      const isMilitaryWord = MILITARY_TARGET_WORDS.some(mw => e.word.toLowerCase().includes(mw));
      if (!isMilitaryWord) {
        addIssue('MINOR', e._file, e.word, 'MILITARY_CONTEXT',
          `Example contains military context: "${example.match(MILITARY_CONTEXT_WORDS)[0]}"`,
          'Consider replacing with a neutral/civilian context');
      }
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
checkNonsenseInjection(entries);
checkSynonymCycles(entries);
checkStructureAsRoad(entries);
checkSubjectiveDefinitions(entries);
checkBoatPark(entries);
checkCrossDefinitionCycles(entries);
checkVagueDefinition(entries);
checkLazyImageKeyword(entries);
checkShortDefAdvanced(entries);
checkIntroductoryComma(entries);
checkAdjectiveNounMismatch(entries);
checkBetweenComma(entries);
checkDanglingModifier(entries);
checkMultiMeaning(entries);
checkVerbDefNounExample(entries);
checkComparisonDef(entries);
checkWhenDefinition(entries);
checkSameLevelCircular(entries);
checkCultureSpecific(entries);
checkBrandImageCollision(entries);
checkMilitaryContext(entries);

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
