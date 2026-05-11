const fs = require('fs');
const path = require('path');

const DIR = '/Users/percy/.openclaw/workspace/projects/word-street';

function extractArray(src, file) {
  // Expect: const LEVELX_BANK=[...]; if(typeof module...)
  // Find first '[' after '=[' and parse until the last closing ']'.
  // Some banks end with "];" + module.exports, others end with just "]".
  const eq = src.indexOf('=[');
  if (eq === -1) throw new Error(`Cannot find '=[' in ${file}`);
  const start = eq + 1; // points at '['
  const end = src.lastIndexOf(']');
  if (end === -1) throw new Error(`Cannot find closing ']' in ${file}`);
  const arrText = src.slice(start, end + 1);
  return JSON.parse(arrText);
}

const irregular = {
  be: ['am','is','are','was','were','been','being'],
  have: ['has','had','having'],
  do: ['does','did','doing','done'],
  go: ['goes','went','going','gone'],
  come: ['comes','came','coming'],
  get: ['gets','got','getting','gotten'],
  make: ['makes','made','making'],
  take: ['takes','took','taking','taken'],
  run: ['runs','ran','running'],
  say: ['says','said','saying'],
  see: ['sees','saw','seeing','seen'],
  eat: ['eats','ate','eating','eaten'],
  give: ['gives','gave','giving','given'],
  put: ['puts','putting'],
  sit: ['sits','sat','sitting'],
  stand: ['stands','stood','standing'],
  wake: ['wakes','woke','waking','woken'],
  fall: ['falls','fell','falling','fallen'],
  find: ['finds','found','finding'],
  hold: ['holds','held','holding'],
  throw: ['throws','threw','throwing','thrown'],
};

function escRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function wordRegex(word) {
  const w = word.toLowerCase().trim();
  if (!w) return null;

  const tokens = w.split(/\s+/).filter(Boolean);

  // Multi-word phrase: require the tokens in order, close-ish.
  if (tokens.length > 1) {
    const parts = tokens.map((t, idx) => {
      if (idx === 0 && irregular[t]) {
        const forms = [t, ...irregular[t]].map(escRe).join('|');
        return `(?:${forms})`;
      }
      // Allow gentle inflection on the first token (walk/walked/walking), but keep it loose.
      if (idx === 0 && /^[a-z]+$/.test(t) && t.length >= 3) {
        // handle verbs ending with e (e.g., squeeze -> squeezed/squeezing)
        const base = escRe(t);
        const dropE = t.endsWith('e') ? escRe(t.slice(0, -1)) : null;
        if (dropE) return `(?:${base}(?:s|es|d)?|${dropE}ing)`;
        return `${base}(?:s|es|ed|ing)?`;
      }
      return escRe(t);
    });
    return new RegExp(`\\b${parts.join('\\b.{0,20}\\b')}\\b`, 'i');
  }

  // Single token
  if (irregular[w]) {
    const forms = [w, ...irregular[w]].map(escRe).join('|');
    return new RegExp(`\\b(?:${forms})\\b`, 'i');
  }

  // General word: use substring matching for longer words to reduce inflection false-positives
  if (/^[a-z]+$/.test(w)) {
    if (w.length <= 3) {
      // short words: allow common inflections (hips, ribs, nodded, banned)
      const last = w[w.length - 1];
      const isCVC = w.length === 3 && /[aeiou]/.test(w[1]) && !/[aeiou]/.test(last);
      const doubled = isCVC ? `${escRe(w.slice(0, 2))}${escRe(last)}{2}` : null;
      const base = escRe(w);
      const inflect = `${base}(?:s|es|ed|d|ing)?`;
      const inflectDoubled = doubled ? `${doubled}(?:ed|ing)` : null;
      const body = inflectDoubled ? `(?:${inflect}|${inflectDoubled})` : inflect;
      return new RegExp(`\\b${body}\\b`, 'i');
    }
    // handle trailing -e (squeeze -> squeezed/squeezing)
    if (w.endsWith('e')) {
      const base = escRe(w);
      const dropE = escRe(w.slice(0, -1));
      return new RegExp(`(?:\\b${base}(?:s|es|d)?\\b|\\b${dropE}ing\\b)`, 'i');
    }
    // otherwise: accept word appearing inside a longer inflected form
    return new RegExp(escRe(w), 'i');
  }

  return new RegExp(escRe(w), 'i');
}

function endsWithPunct(s) {
  return /[.!?]$/.test(s.trim());
}

const badTokenRe = /(\bundefined\b|\bnull\b|\blorem\b|\bipsum\b|\bTODO\b|\bTBD\b|\bN\/A\b|\[.*?\]|\{.*?\}|<.*?>|\bINSERT\b)/i;


function checkEntry(entry, file) {
  const issues = [];
  const add = (severity, msg) => issues.push({ severity, msg, file, word: entry && entry.word });

  if (!entry || typeof entry !== 'object') {
    add('CRITICAL', 'entry is not an object');
    return issues;
  }

  const required = ['word','level','definition','example','imageKeyword'];
  for (const k of required) {
    if (!(k in entry)) add('CRITICAL', `missing field: ${k}`);
  }

  if (typeof entry.word !== 'string' || !entry.word.trim()) add('CRITICAL', 'word is empty or not a string');
  if (typeof entry.definition !== 'string' || !entry.definition.trim()) add('CRITICAL', 'definition is empty or not a string');
  if (typeof entry.example !== 'string' || !entry.example.trim()) add('CRITICAL', 'example is empty or not a string');
  if (typeof entry.imageKeyword !== 'string' || !entry.imageKeyword.trim()) add('CRITICAL', 'imageKeyword is empty or not a string');

  if (!Number.isInteger(entry.level) || entry.level < 1 || entry.level > 5) add('CRITICAL', `level out of range: ${entry.level}`);

  if (entry.definition && badTokenRe.test(entry.definition)) add('HIGH', 'definition contains placeholder/garbage tokens');
  if (entry.example && badTokenRe.test(entry.example)) add('HIGH', 'example contains placeholder/garbage tokens');

  if (entry.example && !endsWithPunct(entry.example)) add('HIGH', 'example missing ending punctuation');
  if (entry.example && /^[a-z]/.test(entry.example.trim())) add('HIGH', 'example should start with capital letter');

  if (entry.definition && entry.definition.trim().length < 3) add('CRITICAL', 'definition too short');

  // Example should use the word/phrase.
  if (entry.word && entry.example) {
    const re = wordRegex(entry.word);
    if (re && !re.test(entry.example)) {
      add('HIGH', 'example does not appear to use the target word/phrase');
    }
  }

  // Circular definition
  if (entry.word && entry.definition) {
    const w = entry.word.toLowerCase().trim();
    if (w) {
      const re = new RegExp(`\\b${escRe(w)}\\b`, 'i');
      if (re.test(entry.definition)) add('HIGH', 'definition contains the target word (circular)');
    }
  }


  return issues;
}

function main() {
  const files = fs.readdirSync(DIR).filter(f => /^words-level.*\.js$/.test(f)).sort();
  const issues = [];
  const seen = new Map();
  let total = 0;

  for (const f of files) {
    const full = path.join(DIR, f);
    const src = fs.readFileSync(full, 'utf8');
    const arr = extractArray(src, f);
    total += arr.length;
    for (const entry of arr) {
      const w = (entry.word || '').toLowerCase();
      if (w) {
        if (!seen.has(w)) seen.set(w, []);
        seen.get(w).push(f);
      }
      issues.push(...checkEntry(entry, f));
    }
  }

  // duplicates
  for (const [w, flist] of seen.entries()) {
    if (flist.length > 1) {
      // only flag duplicates where they appear in different banks
      const uniq = [...new Set(flist)];
      if (uniq.length > 1) {
        issues.push({ severity: 'HIGH', word: w, file: uniq.join(','), msg: `duplicate word appears in multiple banks: ${uniq.join(', ')}` });
      }
    }
  }

  const critical = issues.filter(i => i.severity === 'CRITICAL');
  const high = issues.filter(i => i.severity === 'HIGH');

  // de-dup same (word,file,msg)
  function dedup(list) {
    const out = [];
    const s = new Set();
    for (const i of list) {
      const key = `${i.word}@@${i.file}@@${i.msg}`;
      if (s.has(key)) continue;
      s.add(key);
      out.push(i);
    }
    return out;
  }

  const crit2 = dedup(critical);
  const high2 = dedup(high);

  const result = { total, critical: crit2.length, high: high2.length, criticalItems: crit2, highItems: high2 };
  fs.writeFileSync(path.join(DIR, 'verify/_independent_audit_findings.json'), JSON.stringify(result, null, 2));
  console.log(`Total entries: ${total}`);
  console.log(`CRITICAL issues: ${crit2.length}`);
  console.log(`HIGH issues: ${high2.length}`);
}

main();
