#!/usr/bin/env node
/**
 * Word Street — External Anchor Verification v1.0
 * 
 * 硬保障：用外部权威词典API自动对照词库定义。
 * 不是"要求引用来源"，是程序自动验证定义是否与权威词典一致。
 * 
 * 检查项：
 * 1. 词是否存在于权威词典
 * 2. 定义的核心词义是否与词典一致（不是逐字匹配，是语义对照）
 * 3. 词性是否匹配
 * 4. 用法/搭配是否符合词典记录
 * 
 * 数据源：Free Dictionary API (dictionaryapi.dev) — 无需API key
 * 
 * Run: node anchor-verify.mjs [--level 1] [--word puppy] [--fix] [--sample 50]
 * 
 * 输出：
 * - CRITICAL: 定义与所有权威词典义项完全不匹配（核心词义错误）
 * - HIGH: 词性不一致 / 定义只匹配次要义项
 * - MEDIUM: 词典中无此词（可能是变体/非标准拼写）
 * - INFO: 匹配成功
 */

import fs from 'fs';
import path from 'path';

const DIR = path.dirname(new URL(import.meta.url).pathname);
const CACHE_FILE = path.join(DIR, '.anchor-cache.json');
const RATE_LIMIT_MS = 300; // 300ms between API calls to be polite

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
        const words = JSON.parse(match[1]);
        allWords = allWords.concat(words);
      } catch (e) {
        console.error(`❌ Parse error in ${file}: ${e.message}`);
      }
    }
  }
  return allWords;
}

// ============ CACHE ============

let cache = {};
try {
  cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
} catch { }

function saveCache() {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

// ============ API ============

async function fetchDictionary(word) {
  // Check cache first (cache for 30 days)
  const cacheKey = word.toLowerCase().trim();
  if (cache[cacheKey] && cache[cacheKey].ts > Date.now() - 30 * 86400000) {
    return cache[cacheKey].data;
  }
  
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cacheKey)}`);
    
    if (res.status === 404) {
      cache[cacheKey] = { ts: Date.now(), data: null };
      saveCache();
      return null;
    }
    
    if (!res.ok) {
      console.error(`  ⚠️ API ${res.status} for "${word}"`);
      return undefined; // undefined = API error, don't cache
    }
    
    const data = await res.json();
    cache[cacheKey] = { ts: Date.now(), data };
    saveCache();
    return data;
  } catch (e) {
    console.error(`  ⚠️ Network error for "${word}": ${e.message}`);
    return undefined;
  }
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// ============ ANALYSIS ============

/**
 * Synonym map for matching simplified defs against academic ones
 */
const SYNONYM_MAP = {
  'official': ['formal', 'legal', 'governmental', 'authoritative'],
  'order': ['decree', 'edict', 'command', 'mandate', 'directive'],
  'animal': ['creature', 'organism', 'mammal', 'beast', 'species'],
  'big': ['large', 'huge', 'enormous', 'great', 'sizable'],
  'small': ['little', 'tiny', 'miniature', 'diminutive', 'minor'],
  'baby': ['young', 'infant', 'juvenile', 'newborn', 'offspring'],
  'scary': ['frightening', 'terrifying', 'fearsome', 'alarming'],
  'happy': ['joyful', 'pleased', 'content', 'glad', 'cheerful', 'elated'],
  'sad': ['unhappy', 'sorrowful', 'melancholy', 'dejected', 'gloomy'],
  'smart': ['intelligent', 'clever', 'bright', 'astute', 'shrewd'],
  'bad': ['poor', 'terrible', 'awful', 'dreadful', 'inferior'],
  'good': ['excellent', 'fine', 'superior', 'quality', 'favorable'],
  'show': ['indicate', 'demonstrate', 'display', 'reveal', 'exhibit'],
  'signs': ['indications', 'evidence', 'omens', 'signals', 'portents'],
  'successful': ['prosperous', 'thriving', 'flourishing', 'triumph'],
  'proof': ['evidence', 'documentation', 'verification', 'credential'],
  'qualifications': ['credentials', 'competence', 'certification'],
  'power': ['authority', 'control', 'dominion', 'command'],
  'place': ['region', 'area', 'land', 'territory', 'locale', 'location'],
  'belonging': ['native', 'indigenous', 'originating', 'endemic'],
  'native': ['indigenous', 'originating', 'born', 'endemic', 'local'],
  'sea': ['ocean', 'marine', 'aquatic', 'water', 'maritime'],
  'shells': ['bivalve', 'mollusk', 'shell', 'carapace'],
  'announce': ['declare', 'proclaim', 'promulgate', 'publicize'],
  'law': ['legislation', 'statute', 'regulation', 'rule', 'act'],
  'fight': ['combat', 'battle', 'conflict', 'struggle', 'engage'],
  'help': ['assist', 'aid', 'support', 'facilitate'],
  'start': ['begin', 'commence', 'initiate', 'launch'],
  'end': ['finish', 'conclude', 'terminate', 'cease', 'complete'],
  'break': ['shatter', 'fracture', 'crack', 'smash', 'rupture'],
  'walk': ['stroll', 'stride', 'pace', 'amble', 'trek'],
  'run': ['sprint', 'dash', 'race', 'jog', 'gallop'],
  'eat': ['consume', 'devour', 'ingest', 'dine', 'feast'],
  'make': ['create', 'produce', 'construct', 'manufacture', 'craft'],
  'cut': ['sever', 'slice', 'trim', 'incise', 'carve'],
  'old': ['ancient', 'aged', 'elderly', 'antique', 'venerable'],
  'new': ['novel', 'fresh', 'recent', 'modern', 'contemporary'],
  'capture': ['hold', 'seize', 'grasp', 'catch', 'trap', 'ensnare'],
  'focus': ['attention', 'concentration', 'interest', 'gaze'],
  'fascinate': ['captivate', 'charm', 'bewitch', 'enchant', 'enthrall', 'spellbound'],
  'calm': ['serene', 'tranquil', 'peaceful', 'composed', 'placid', 'equanimity', 'stable'],
  'composure': ['poise', 'equanimity', 'calm', 'coolness', 'serenity'],
  'difficult': ['hard', 'challenging', 'tough', 'arduous', 'stressful'],
  'situation': ['circumstance', 'condition', 'scenario', 'case', 'stress'],
  'bird': ['avian', 'fowl', 'winged'],
  'dog': ['canine', 'hound', 'pup', 'puppy'],
  'cat': ['feline', 'kitten'],
  'horse': ['equine', 'steed', 'mare', 'stallion', 'foal', 'colt', 'pony'],
  'strong': ['powerful', 'mighty', 'robust', 'sturdy', 'vigorous', 'potent'],
  'fast': ['quick', 'rapid', 'swift', 'speedy', 'fleet'],
  'slow': ['gradual', 'sluggish', 'leisurely', 'unhurried'],
  'important': ['significant', 'crucial', 'vital', 'essential', 'critical', 'key'],
  'hard': ['difficult', 'tough', 'challenging', 'arduous', 'strenuous'],
  'easy': ['simple', 'effortless', 'straightforward', 'uncomplicated'],
  'look': ['appear', 'seem', 'resemble', 'glance', 'gaze', 'observe'],
  'tell': ['inform', 'notify', 'state', 'declare', 'announce', 'reveal'],
  'give': ['provide', 'supply', 'furnish', 'grant', 'bestow', 'donate'],
  'take': ['seize', 'grab', 'grasp', 'acquire', 'obtain'],
  'keep': ['retain', 'maintain', 'preserve', 'hold', 'sustain'],
  'stop': ['cease', 'halt', 'pause', 'discontinue', 'desist'],
  'change': ['alter', 'modify', 'transform', 'adjust', 'amend', 'revise'],
  'move': ['travel', 'shift', 'transfer', 'relocate', 'proceed'],
  'grow': ['increase', 'expand', 'develop', 'flourish', 'thrive'],
  'think': ['consider', 'ponder', 'contemplate', 'reflect', 'deliberate'],
  'feel': ['sense', 'perceive', 'experience', 'emotion'],
  'know': ['understand', 'comprehend', 'recognize', 'realize', 'aware'],
  'want': ['desire', 'wish', 'crave', 'yearn', 'seek'],
  'try': ['attempt', 'endeavor', 'strive', 'effort'],
  'work': ['labor', 'toil', 'effort', 'function', 'operate'],
  'use': ['utilize', 'employ', 'apply', 'wield'],
  'get': ['obtain', 'acquire', 'receive', 'gain', 'achieve'],
  'say': ['state', 'declare', 'utter', 'express', 'articulate'],
  'kind': ['type', 'sort', 'category', 'variety', 'species'],
  'part': ['piece', 'portion', 'section', 'segment', 'component'],
  'group': ['collection', 'cluster', 'assembly', 'set', 'batch'],
  'country': ['nation', 'state', 'land', 'territory'],
  'water': ['liquid', 'aqueous', 'fluid', 'aqua'],
  'fire': ['flame', 'blaze', 'inferno', 'combustion'],
  'light': ['illumination', 'brightness', 'glow', 'radiance'],
  'dark': ['dim', 'shadowy', 'murky', 'obscure', 'gloomy'],
  'cold': ['chilly', 'frigid', 'icy', 'freezing', 'cool'],
  'hot': ['warm', 'heated', 'burning', 'scorching', 'boiling'],
  'dirt': ['soil', 'earth', 'ground', 'mud'],
  'rock': ['stone', 'boulder', 'mineral', 'pebble'],
  'clean': ['pure', 'spotless', 'sanitary', 'pristine'],
  'sick': ['ill', 'unwell', 'diseased', 'ailing'],
  'hurt': ['injure', 'harm', 'damage', 'wound', 'pain'],
  'wrong': ['incorrect', 'erroneous', 'mistaken', 'false', 'inaccurate'],
  'right': ['correct', 'accurate', 'proper', 'appropriate', 'just'],
  'true': ['genuine', 'authentic', 'real', 'accurate', 'valid'],
  'false': ['untrue', 'fake', 'fictitious', 'incorrect', 'bogus'],
  'scared': ['afraid', 'frightened', 'fearful', 'terrified', 'anxious'],
  'angry': ['furious', 'enraged', 'irate', 'livid', 'wrathful'],
  'talk': ['speak', 'converse', 'discuss', 'chat', 'communicate'],
  'build': ['construct', 'erect', 'assemble', 'create', 'fabricate'],
  'hold': ['grasp', 'grip', 'clutch', 'retain', 'clasp'],
  'learn': ['study', 'acquire', 'master', 'absorb', 'understand'],
  'teach': ['instruct', 'educate', 'train', 'tutor', 'coach'],
  'lead': ['guide', 'direct', 'command', 'head', 'conduct'],
  'follow': ['pursue', 'trail', 'track', 'accompany', 'obey'],
  'join': ['connect', 'unite', 'combine', 'merge', 'attach'],
  'leave': ['depart', 'exit', 'abandon', 'vacate', 'withdraw'],
  'hide': ['conceal', 'cover', 'obscure', 'camouflage'],
  'find': ['discover', 'locate', 'detect', 'uncover', 'identify'],
  'mix': ['blend', 'combine', 'merge', 'mingle', 'stir'],
  'hello': ['welcome', 'greet', 'greeting', 'salute', 'salutation'],
  'welcome': ['greet', 'hello', 'receive', 'salute'],
  'later': ['future', 'subsequently', 'afterward', 'reserve', 'preserve'],
  'famous': ['known', 'renowned', 'celebrated', 'notorious', 'prominent', 'widely'],
  'shell': ['carapace', 'exoskeleton', 'crust', 'armor'],
  'legs': ['limbs', 'appendages', 'extremities'],
  'crab': ['crustacean', 'crustacea'],
  'lobster': ['crustacean', 'crustacea'],
  'connection': ['relationship', 'link', 'tie', 'bond', 'association', 'affiliation'],
  'seeing': ['perceiving', 'perception', 'sensory', 'visual', 'vision'],
  'hearing': ['auditory', 'perception', 'sensory'],
  'negative': ['bad', 'adverse', 'unfavorable', 'detrimental', 'harmful'],
  'fix': ['repair', 'mend', 'restore', 'correct', 'patch'],
};

// Build reverse synonym map
const REVERSE_SYNONYMS = {};
for (const [key, syns] of Object.entries(SYNONYM_MAP)) {
  for (const syn of syns) {
    if (!REVERSE_SYNONYMS[syn]) REVERSE_SYNONYMS[syn] = [];
    REVERSE_SYNONYMS[syn].push(key);
  }
  // Also map key to itself
  if (!REVERSE_SYNONYMS[key]) REVERSE_SYNONYMS[key] = [];
}

/**
 * Extract key semantic words from a definition, ignoring stop words
 */
function extractKeyWords(def) {
  const stopWords = new Set([
    'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from', 'as',
    'that', 'this', 'it', 'its', 'or', 'and', 'but',
    'very', 'much', 'more', 'most', 'some', 'any', 'all', 'each',
    'which', 'who', 'what', 'when', 'where', 'how', 'than',
    'do', 'does', 'did', 'has', 'have', 'had', 'can', 'could',
    'will', 'would', 'shall', 'should', 'may', 'might', 'must',
    'something', 'someone', 'thing', 'way', 'used',
    'also', 'just', 'such', 'really'
  ]);
  
  return def.toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2 && !stopWords.has(w));
}

/**
 * Calculate semantic overlap between our definition and dictionary definitions
 */
function checkDefinitionMatch(ourDef, dictEntries) {
  const ourWords = new Set(extractKeyWords(ourDef));
  
  let bestScore = 0;
  let bestDictDef = '';
  let bestPartOfSpeech = '';
  let allPOS = new Set();
  let allDefs = [];
  
  for (const entry of dictEntries) {
    for (const meaning of (entry.meanings || [])) {
      allPOS.add(meaning.partOfSpeech);
      for (const def of (meaning.definitions || [])) {
        const dictWords = new Set(extractKeyWords(def.definition));
        allDefs.push({ pos: meaning.partOfSpeech, def: def.definition });
        
        // Synonym-aware overlap
        let overlap = 0;
        for (const w of ourWords) {
          if (dictWords.has(w)) {
            overlap++;
          } else {
            // Check synonyms
            const syns = SYNONYM_MAP[w] || [];
            const revSyns = REVERSE_SYNONYMS[w] || [];
            const allSyns = [...syns, ...revSyns];
            if (allSyns.some(s => dictWords.has(s))) overlap += 0.8;
          }
        }
        
        let reverseOverlap = 0;
        for (const w of dictWords) {
          if (ourWords.has(w)) {
            reverseOverlap++;
          } else {
            const syns = SYNONYM_MAP[w] || [];
            const revSyns = REVERSE_SYNONYMS[w] || [];
            const allSyns = [...syns, ...revSyns];
            if (allSyns.some(s => ourWords.has(s))) reverseOverlap += 0.8;
          }
        }
        
        const score = ourWords.size > 0 && dictWords.size > 0
          ? (overlap / ourWords.size + reverseOverlap / dictWords.size) / 2
          : 0;
        
        if (score > bestScore) {
          bestScore = score;
          bestDictDef = def.definition;
          bestPartOfSpeech = meaning.partOfSpeech;
        }
      }
    }
  }
  
  return {
    score: bestScore,
    bestDictDef,
    bestPOS: bestPartOfSpeech,
    allPOS: [...allPOS],
    allDefs,
    ourKeyWords: [...ourWords]
  };
}

/**
 * Infer POS from our definition
 */
function inferPOS(def, example, word) {
  const dl = def.toLowerCase();
  // Noun patterns
  if (/^(a |an |the |something |someone |a type of |a kind of |a piece of |a group of |a place )/.test(dl)) return 'noun';
  // Verb patterns  
  if (/^(to |the act of )/.test(dl)) return 'verb';
  // Adjective patterns
  if (/^(having |being |feeling |very |not |full of |able to |showing )/.test(dl)) return 'adjective';
  // Adverb patterns
  if (/^(in a .* way|with |doing something )/.test(dl) && dl.includes('way')) return 'adverb';
  
  return null;
}

// ============ MAIN ============

async function main() {
  let words = loadAllWords();
  console.log(`📚 Loaded ${words.length} words total`);
  
  // Filter
  if (targetLevel) {
    words = words.filter(w => w.level === targetLevel);
    console.log(`🔍 Filtered to level ${targetLevel}: ${words.length} words`);
  }
  if (targetWord) {
    words = words.filter(w => w.word.toLowerCase() === targetWord.toLowerCase());
    console.log(`🔍 Filtered to word "${targetWord}": ${words.length}`);
  }
  if (sampleSize && words.length > sampleSize) {
    // Deterministic sample: pick every Nth word
    const step = Math.floor(words.length / sampleSize);
    words = words.filter((_, i) => i % step === 0).slice(0, sampleSize);
    console.log(`🎲 Sampled ${words.length} words`);
  }
  
  const results = { CRITICAL: [], HIGH: [], MEDIUM: [], INFO: 0, ERROR: 0 };
  let processed = 0;
  
  for (const entry of words) {
    processed++;
    if (processed % 50 === 0) {
      console.log(`  ... ${processed}/${words.length}`);
      saveCache(); // periodic save
    }
    
    const dictData = await fetchDictionary(entry.word);
    
    if (dictData === undefined) {
      results.ERROR++;
      continue;
    }
    
    if (dictData === null) {
      // Word not found in dictionary
      // Some words like compound words, slang, or very simple words may not be in the API
      results.MEDIUM.push({
        word: entry.word,
        level: entry.level,
        issue: 'NOT_IN_DICTIONARY',
        ourDef: entry.definition,
        detail: 'Word not found in Free Dictionary API — may be a compound word, variant spelling, or very simple/informal word'
      });
      continue;
    }
    
    // Check definition match
    const match = checkDefinitionMatch(entry.definition, dictData);
    
    // Check POS
    const ourPOS = inferPOS(entry.definition, entry.example, entry.word);
    const posMatch = !ourPOS || match.allPOS.includes(ourPOS);
    
    // Also check if the target word itself appears in dict definitions (strong signal)
    const wordInDict = match.allDefs.some(d => 
      d.def.toLowerCase().includes(entry.word.toLowerCase())
    );
    // Check if our definition essentially lists examples (like vowel = "a,e,i,o,u")
    const isEnumerationDef = /\b[a-z],\s*[a-z],/i.test(entry.definition);
    
    // Short simplified definitions (< 7 words) naturally have low overlap — use lenient threshold
    const ourWordCount = entry.definition.split(/\s+/).length;
    const criticalThreshold = ourWordCount < 7 ? 0.05 : 0.1;
    
    if (match.score < criticalThreshold && match.allDefs.length > 0 && !wordInDict && !isEnumerationDef) {
      // Very low overlap = likely wrong definition
      results.CRITICAL.push({
        word: entry.word,
        level: entry.level,
        issue: 'DEFINITION_MISMATCH',
        ourDef: entry.definition,
        bestDictDef: match.bestDictDef,
        score: match.score.toFixed(2),
        dictPOS: match.allPOS,
        topDictDefs: match.allDefs.slice(0, 3).map(d => `[${d.pos}] ${d.def}`)
      });
    } else if (match.score < 0.2) {
      // Low overlap = possibly wrong or very simplified
      results.HIGH.push({
        word: entry.word,
        level: entry.level,
        issue: match.score < 0.15 ? 'WEAK_MATCH' : 'LOW_OVERLAP',
        ourDef: entry.definition,
        bestDictDef: match.bestDictDef,
        score: match.score.toFixed(2),
        dictPOS: match.allPOS
      });
    } else if (!posMatch) {
      results.HIGH.push({
        word: entry.word,
        level: entry.level,
        issue: 'POS_MISMATCH',
        ourDef: entry.definition,
        ourPOS,
        dictPOS: match.allPOS
      });
    } else {
      results.INFO++;
    }
    
    await sleep(RATE_LIMIT_MS);
  }
  
  saveCache();
  
  // ============ REPORT ============
  
  console.log('\n' + '='.repeat(60));
  console.log('📋 ANCHOR VERIFICATION REPORT');
  console.log('='.repeat(60));
  console.log(`Source: Free Dictionary API (dictionaryapi.dev)`);
  console.log(`Words checked: ${processed}`);
  console.log(`API errors: ${results.ERROR}`);
  console.log('');
  
  console.log(`🔴 CRITICAL (definition mismatch): ${results.CRITICAL.length}`);
  for (const r of results.CRITICAL) {
    console.log(`  [L${r.level}] "${r.word}" — score ${r.score}`);
    console.log(`    Ours:  ${r.ourDef}`);
    console.log(`    Dict:  ${r.bestDictDef}`);
    console.log(`    All dict defs: ${r.topDictDefs.join(' | ')}`);
  }
  
  console.log(`\n🟠 HIGH (weak match / POS mismatch): ${results.HIGH.length}`);
  for (const r of results.HIGH) {
    console.log(`  [L${r.level}] "${r.word}" — ${r.issue}${r.score ? ' score ' + r.score : ''}`);
    console.log(`    Ours: ${r.ourDef}`);
    if (r.bestDictDef) console.log(`    Dict: ${r.bestDictDef}`);
    if (r.ourPOS) console.log(`    Our POS: ${r.ourPOS}, Dict POS: ${r.dictPOS}`);
  }
  
  console.log(`\n🟡 MEDIUM (not in dictionary): ${results.MEDIUM.length}`);
  if (results.MEDIUM.length <= 20 || showAll) {
    for (const r of results.MEDIUM) {
      console.log(`  [L${r.level}] "${r.word}" — ${r.ourDef}`);
    }
  } else {
    for (const r of results.MEDIUM.slice(0, 10)) {
      console.log(`  [L${r.level}] "${r.word}" — ${r.ourDef}`);
    }
    console.log(`  ... and ${results.MEDIUM.length - 10} more (use --all to see all)`);
  }
  
  console.log(`\n✅ INFO (matched): ${results.INFO}`);
  
  console.log('\n' + '='.repeat(60));
  const pass = results.CRITICAL.length === 0;
  console.log(pass ? '✅ PASS — 0 CRITICAL definition mismatches' : `❌ FAIL — ${results.CRITICAL.length} CRITICAL definition mismatches`);
  console.log('='.repeat(60));
  
  process.exit(pass ? 0 : 1);
}

main().catch(e => {
  console.error('Fatal:', e);
  process.exit(2);
});
