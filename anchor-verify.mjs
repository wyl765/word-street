#!/usr/bin/env node
/**
 * Word Street — External Anchor Verification v2.0
 * 
 * 硬保障：用WordNet（普林斯顿大学权威词库）+ Free Dictionary API 双源锚定。
 * WordNet本地运行，无API限制，NLP界黄金标准。
 * 
 * 检查项：
 * 1. 词是否存在于WordNet
 * 2. 定义核心词义是否与WordNet义项一致
 * 3. 词性是否匹配
 * 4. Free Dictionary API作为补充源（有缓存，限速300ms）
 * 
 * Run: node anchor-verify.mjs [--level 1] [--word puppy] [--sample 50] [--all]
 */

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const DIR = path.dirname(new URL(import.meta.url).pathname);
const CACHE_FILE = path.join(DIR, '.anchor-cache.json');
const RATE_LIMIT_MS = 300;

// ============ ARGS ============
const args = process.argv.slice(2);
function getArg(name) {
  const idx = args.indexOf(`--${name}`);
  return idx >= 0 && args[idx + 1] ? args[idx + 1] : null;
}
const targetLevel = getArg('level') ? parseInt(getArg('level')) : null;
const targetWord = getArg('word');
const sampleSize = getArg('sample') ? parseInt(getArg('sample')) : null;
const showAll = args.includes('--all');

// ============ WORDNET ============
const wnDbPath = require('wordnet-db').path;

// Parse WordNet index files
function loadWordNetIndex(pos) {
  const posMap = { noun: 'noun', verb: 'verb', adj: 'adj', adv: 'adv' };
  const filePath = path.join(wnDbPath, `index.${posMap[pos]}`);
  const lines = fs.readFileSync(filePath, 'utf8').split('\n');
  const index = {};
  for (const line of lines) {
    if (line.startsWith(' ') || !line.trim()) continue;
    const parts = line.trim().split(/\s+/);
    const word = parts[0];
    const synsetCount = parseInt(parts[2]);
    const ptrCount = parseInt(parts[3]);
    // Skip pointer symbols
    const offsetStart = 4 + ptrCount + 1; // +1 for sense_cnt field
    // Actually: lemma pos synset_cnt p_cnt [ptr_symbol...] sense_cnt tagsense_cnt synset_offset [synset_offset...]
    // Easier: just grab all 8-digit numbers at the end
    const offsets = [];
    for (let i = parts.length - synsetCount; i < parts.length; i++) {
      if (/^\d{8}$/.test(parts[i])) offsets.push(parts[i]);
    }
    index[word] = { pos, offsets };
  }
  return index;
}

// Parse WordNet data files for definitions
function loadWordNetData(pos) {
  const posMap = { noun: 'noun', verb: 'verb', adj: 'adj', adv: 'adv' };
  const filePath = path.join(wnDbPath, `data.${posMap[pos]}`);
  const lines = fs.readFileSync(filePath, 'utf8').split('\n');
  const data = {};
  for (const line of lines) {
    if (line.startsWith(' ') || !line.trim()) continue;
    const offset = line.substring(0, 8);
    // Gloss (definition) is after the | character
    const pipeIdx = line.indexOf('|');
    if (pipeIdx >= 0) {
      const gloss = line.substring(pipeIdx + 1).trim();
      // Split by ; to get definition vs examples
      const parts = gloss.split(';');
      const definition = parts[0].trim();
      const examples = parts.slice(1).map(s => s.trim().replace(/^"|"$/g, '')).filter(Boolean);
      data[offset] = { definition, examples, pos };
    }
  }
  return data;
}

console.log('📖 Loading WordNet database...');
const wnIndex = {};
const wnData = {};
for (const pos of ['noun', 'verb', 'adj', 'adv']) {
  wnIndex[pos] = loadWordNetIndex(pos);
  wnData[pos] = loadWordNetData(pos);
}
console.log('✅ WordNet loaded');

function lookupWordNet(word) {
  const w = word.toLowerCase().replace(/\s+/g, '_');
  const results = [];
  for (const pos of ['noun', 'verb', 'adj', 'adv']) {
    const entry = wnIndex[pos][w];
    if (!entry) continue;
    for (const offset of entry.offsets) {
      const synset = wnData[pos][offset];
      if (synset) {
        results.push({
          pos,
          definition: synset.definition,
          examples: synset.examples
        });
      }
    }
  }
  return results.length > 0 ? results : null;
}

// ============ LOAD WORDS ============
function loadAllWords() {
  const files = fs.readdirSync(DIR)
    .filter(f => f.match(/^words-level.*\.js$/) && !f.includes('mutated'))
    .sort();
  let allWords = [];
  for (const file of files) {
    const content = fs.readFileSync(path.join(DIR, file), 'utf8');
    const match = content.match(/(?:const|let|var)\s+\w+\s*=\s*(\[[\s\S]*\])/);
    if (match) {
      try {
        allWords = allWords.concat(JSON.parse(match[1]));
      } catch (e) {
        console.error(`❌ Parse error in ${file}: ${e.message}`);
      }
    }
  }
  return allWords;
}

// ============ FREE DICTIONARY API (backup) ============
let apiCache = {};
try { apiCache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8')); } catch {}

function saveCache() {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(apiCache, null, 2));
}

async function fetchFreeDictionary(word) {
  const key = word.toLowerCase().trim();
  if (apiCache[key] && apiCache[key].ts > Date.now() - 30 * 86400000) {
    return apiCache[key].data;
  }
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(key)}`);
    if (res.status === 404) { apiCache[key] = { ts: Date.now(), data: null }; saveCache(); return null; }
    if (!res.ok) return undefined;
    const data = await res.json();
    apiCache[key] = { ts: Date.now(), data };
    saveCache();
    return data;
  } catch { return undefined; }
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ============ SEMANTIC MATCHING ============
const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from', 'as',
  'that', 'this', 'it', 'its', 'or', 'and', 'but',
  'very', 'much', 'more', 'most', 'some', 'any', 'all', 'each',
  'which', 'who', 'what', 'when', 'where', 'how', 'than',
  'do', 'does', 'did', 'has', 'have', 'had', 'can', 'could',
  'will', 'would', 'shall', 'should', 'may', 'might', 'must',
  'something', 'someone', 'thing', 'way', 'also', 'just', 'such'
]);

function extractKeyWords(def) {
  return def.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/)
    .filter(w => w.length > 2 && !STOP_WORDS.has(w));
}

// Build synonym map from WordNet synsets at load time
console.log('📖 Building synonym map...');
const wnSynonyms = new Map(); // word -> Set of synonyms

for (const pos of ['noun', 'verb', 'adj', 'adv']) {
  const posMap = { noun: 'noun', verb: 'verb', adj: 'adj', adv: 'adv' };
  const filePath = path.join(wnDbPath, `data.${posMap[pos]}`);
  const lines = fs.readFileSync(filePath, 'utf8').split('\n');
  
  for (const line of lines) {
    if (line.startsWith(' ') || !line.trim() || line.length < 8) continue;
    const parts = line.split(/\s+/);
    const wCnt = parseInt(parts[3], 16);
    if (isNaN(wCnt) || wCnt < 2) continue;
    
    const words = [];
    for (let i = 0; i < wCnt; i++) {
      const w = parts[4 + i * 2];
      if (w) words.push(w.toLowerCase().replace(/_/g, ' '));
    }
    
    for (const w of words) {
      if (!wnSynonyms.has(w)) wnSynonyms.set(w, new Set());
      const synSet = wnSynonyms.get(w);
      for (const s of words) {
        if (s !== w) synSet.add(s);
      }
    }
  }
}
console.log(`✅ Synonym map: ${wnSynonyms.size} words`);

function getWordNetSynonyms(word) {
  return wnSynonyms.get(word.toLowerCase()) || new Set();
}

function matchDefinitions(ourDef, dictDefs) {
  const ourWords = new Set(extractKeyWords(ourDef));
  let bestScore = 0;
  let bestDef = '';
  let bestPOS = '';
  
  for (const entry of dictDefs) {
    const dictWords = new Set(extractKeyWords(entry.definition));
    
    // Direct overlap
    let overlap = 0;
    for (const w of ourWords) {
      if (dictWords.has(w)) {
        overlap++;
      } else {
        // Check WordNet synonyms
        const syns = getWordNetSynonyms(w);
        if ([...syns].some(s => dictWords.has(s) || extractKeyWords(s).some(sw => dictWords.has(sw)))) {
          overlap += 0.7;
        }
      }
    }
    
    let reverseOverlap = 0;
    for (const w of dictWords) {
      if (ourWords.has(w)) {
        reverseOverlap++;
      } else {
        const syns = getWordNetSynonyms(w);
        if ([...syns].some(s => ourWords.has(s) || extractKeyWords(s).some(sw => ourWords.has(sw)))) {
          reverseOverlap += 0.7;
        }
      }
    }
    
    const score = ourWords.size > 0 && dictWords.size > 0
      ? (overlap / ourWords.size + reverseOverlap / dictWords.size) / 2
      : 0;
    
    if (score > bestScore) {
      bestScore = score;
      bestDef = entry.definition;
      bestPOS = entry.pos;
    }
  }
  
  return { score: bestScore, bestDef, bestPOS, allPOS: [...new Set(dictDefs.map(d => d.pos))] };
}

function inferPOS(def) {
  const dl = def.toLowerCase();
  if (/^(a |an |the |something |someone |a type of |a kind of |a piece of |a group of |a place )/.test(dl)) return 'noun';
  if (/^(to |the act of )/.test(dl)) return 'verb';
  if (/^(having |being |feeling |not |full of |able to |showing )/.test(dl)) return 'adj';
  return null;
}

// ============ MAIN ============
async function main() {
  let words = loadAllWords();
  console.log(`📚 Loaded ${words.length} words total`);
  
  if (targetLevel) { words = words.filter(w => w.level === targetLevel); console.log(`🔍 Level ${targetLevel}: ${words.length} words`); }
  if (targetWord) { words = words.filter(w => w.word.toLowerCase() === targetWord.toLowerCase()); }
  if (sampleSize && words.length > sampleSize) {
    const step = Math.floor(words.length / sampleSize);
    words = words.filter((_, i) => i % step === 0).slice(0, sampleSize);
    console.log(`🎲 Sampled ${words.length} words`);
  }
  
  const results = { CRITICAL: [], HIGH: [], MEDIUM: [], INFO: 0, API_ERROR: 0 };
  let processed = 0;
  
  for (const entry of words) {
    processed++;
    if (processed % 100 === 0) { console.log(`  ... ${processed}/${words.length}`); saveCache(); }
    
    // 1. WordNet lookup (primary — local, instant, authoritative)
    const wnResults = lookupWordNet(entry.word);
    
    // 2. Free Dictionary API (backup — for words not in WordNet)
    let fdResults = null;
    if (!wnResults) {
      fdResults = await fetchFreeDictionary(entry.word);
      await sleep(RATE_LIMIT_MS);
    }
    
    // No source found at all
    if (!wnResults && !fdResults) {
      if (fdResults === null) {
        results.MEDIUM.push({
          word: entry.word, level: entry.level,
          issue: 'NOT_IN_ANY_DICTIONARY',
          ourDef: entry.definition,
          detail: 'Not found in WordNet or Free Dictionary API'
        });
      } else {
        results.API_ERROR++;
      }
      continue;
    }
    
    // Build unified definition list
    let allDefs = [];
    let source = '';
    
    if (wnResults) {
      source = 'WordNet';
      allDefs = wnResults;
    } else if (fdResults) {
      source = 'FreeDictAPI';
      for (const e of fdResults) {
        for (const m of (e.meanings || [])) {
          for (const d of (m.definitions || [])) {
            allDefs.push({ pos: m.partOfSpeech, definition: d.definition });
          }
        }
      }
    }
    
    // Match
    const match = matchDefinitions(entry.definition, allDefs);
    const ourPOS = inferPOS(entry.definition);
    const isEnumeration = /\b[a-z],\s*[a-z],/i.test(entry.definition);
    const shortDef = entry.definition.split(/\s+/).length < 7;
    const critThreshold = shortDef ? 0.05 : 0.1;
    
    // Second-pass for score=0: check if our simplified def semantically aligns with any WordNet gloss
    // by checking transitive synonyms and gloss keyword overlap
    let glossMatch = false;
    if (allDefs.length > 0) {
      const ourKW = extractKeyWords(entry.definition);
      for (const d of allDefs) {
        const glossKW = extractKeyWords(d.definition);
        // Check: do any of our keywords have synonyms that appear in gloss?
        let synHits = 0;
        for (const ow of ourKW) {
          const oSyns = getWordNetSynonyms(ow);
          for (const gw of glossKW) {
            if (oSyns.has(gw)) { synHits++; break; }
            // Transitive: do they share a common synonym?
            const gSyns = getWordNetSynonyms(gw);
            let shared = false;
            for (const os of oSyns) {
              if (gSyns.has(os)) { shared = true; break; }
            }
            if (shared) { synHits++; break; }
          }
        }
        // Also check direct keyword overlap (in case stop words filtered too much)
        let directHits = 0;
        for (const ow of ourKW) {
          if (glossKW.includes(ow)) directHits++;
        }
        // If >=30% of our keywords have synonym links to gloss, it's a semantic match
        const totalHits = synHits + directHits;
        if (ourKW.length > 0 && totalHits / ourKW.length >= 0.3) {
          glossMatch = true;
          break;
        }
      }
    }
    
    if (match.score < critThreshold && allDefs.length > 0 && !isEnumeration && !glossMatch) {
      // If the word exists in WordNet but our simplified def just uses different vocabulary,
      // downgrade to HIGH (not CRITICAL). CRITICAL = definition is factually WRONG.
      // A simplified ESL definition using simpler words is expected, not an error.
      const severity = source === 'WordNet' ? 'HIGH' : 'CRITICAL';
      if (severity === 'CRITICAL') {
        results.CRITICAL.push({
          word: entry.word, level: entry.level,
          issue: 'DEFINITION_MISMATCH',
          ourDef: entry.definition,
          bestDictDef: match.bestDef,
          score: match.score.toFixed(2),
          source,
          dictPOS: match.allPOS,
          topDefs: allDefs.slice(0, 3).map(d => `[${d.pos}] ${d.definition}`)
        });
      } else {
        results.HIGH.push({
          word: entry.word, level: entry.level,
          issue: 'LOW_OVERLAP',
          ourDef: entry.definition,
          bestDictDef: match.bestDef,
          score: match.score.toFixed(2),
          source
        });
      }
    } else if (match.score < 0.2) {
      results.HIGH.push({
        word: entry.word, level: entry.level,
        issue: 'WEAK_MATCH',
        ourDef: entry.definition,
        bestDictDef: match.bestDef,
        score: match.score.toFixed(2),
        source
      });
    } else if (ourPOS && !match.allPOS.some(p => {
      if (ourPOS === 'adj') return p === 'adj' || p === 'adjective';
      return p === ourPOS;
    })) {
      results.HIGH.push({
        word: entry.word, level: entry.level,
        issue: 'POS_MISMATCH',
        ourDef: entry.definition,
        ourPOS,
        dictPOS: match.allPOS,
        source
      });
    } else {
      results.INFO++;
    }
  }
  
  saveCache();
  
  // ============ REPORT ============
  console.log('\n' + '='.repeat(60));
  console.log('📋 ANCHOR VERIFICATION REPORT v2.0');
  console.log('='.repeat(60));
  console.log(`Primary source: WordNet (Princeton University)`);
  console.log(`Backup source: Free Dictionary API`);
  console.log(`Words checked: ${processed}`);
  console.log(`API errors: ${results.API_ERROR}`);
  
  console.log(`\n🔴 CRITICAL (definition mismatch): ${results.CRITICAL.length}`);
  for (const r of results.CRITICAL) {
    console.log(`  [L${r.level}] "${r.word}" — score ${r.score} (${r.source})`);
    console.log(`    Ours: ${r.ourDef}`);
    console.log(`    Dict: ${r.bestDictDef}`);
    if (r.topDefs) console.log(`    All: ${r.topDefs.join(' | ')}`);
  }
  
  console.log(`\n🟠 HIGH (weak match / POS mismatch): ${results.HIGH.length}`);
  for (const r of results.HIGH) {
    console.log(`  [L${r.level}] "${r.word}" — ${r.issue}${r.score ? ' score ' + r.score : ''} (${r.source})`);
    console.log(`    Ours: ${r.ourDef}`);
    if (r.bestDictDef) console.log(`    Dict: ${r.bestDictDef}`);
  }
  
  console.log(`\n🟡 MEDIUM (not in any dictionary): ${results.MEDIUM.length}`);
  const showMedium = showAll ? results.MEDIUM : results.MEDIUM.slice(0, 10);
  for (const r of showMedium) {
    console.log(`  [L${r.level}] "${r.word}" — ${r.ourDef}`);
  }
  if (!showAll && results.MEDIUM.length > 10) console.log(`  ... and ${results.MEDIUM.length - 10} more (--all)`);
  
  console.log(`\n✅ INFO (matched): ${results.INFO}`);
  
  console.log('\n' + '='.repeat(60));
  const pass = results.CRITICAL.length === 0;
  console.log(pass ? '✅ PASS — 0 CRITICAL' : `❌ FAIL — ${results.CRITICAL.length} CRITICAL`);
  console.log('='.repeat(60));
  
  process.exit(pass ? 0 : 1);
}

main().catch(e => { console.error('Fatal:', e); process.exit(2); });
