import fs from 'fs';

const bank = JSON.parse(fs.readFileSync('_tmp_level5d_bank.json', 'utf8'));

const STOP = new Set([
  'a','an','the','and','or','but','if','so','to','of','in','on','at','for','from','with','as','by','into','over','under','between','through','during','without','within','about','around','after','before','since','until','while','than',
  'is','are','was','were','be','been','being','do','does','did','done','have','has','had','can','could','will','would','should','may','might','must',
  'this','that','these','those','it','its','they','them','their','he','him','his','she','her','hers','we','us','our','you','your','i','my','me',
  'someone','something','one','ones','people','person','persons','thing','things','very','more','most','less','least','not','no','only','just','also','too','even','often','always','sometimes','now','then','there','here',
]);

function tokens(s) {
  return (s||'')
    .toLowerCase()
    .replace(/[^a-z0-9\s']/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function normToken(t) {
  // tiny, cheap normalization: plural/past/ing/ly
  return t
    .replace(/^(\d+)$/, '$1')
    .replace(/(ing|ed|ly|es|s)$/,'')
    .replace(/(tion|sion)$/,'t')
    .replace(/(ment)$/,'m')
    .replace(/(ity)$/,'i');
}

function contentTokens(s) {
  return tokens(s)
    .filter(t => !STOP.has(t) && t.length >= 3)
    .map(normToken)
    .filter(t => t.length >= 3);
}

function unique(arr) {
  return [...new Set(arr)];
}

function guessPOS(entry) {
  const w = entry.word;
  const def = entry.definition.trim().toLowerCase();
  if (w.endsWith('ly')) return 'adv';
  if (def.startsWith('to ')) return 'verb';
  if (/(the (quality|state|process|study|ability|right) of )/.test(def)) return 'noun';
  if (w.endsWith('tion') || w.endsWith('sion') || w.endsWith('ment') || w.endsWith('ity') || w.endsWith('ness') || w.endsWith('ance') || w.endsWith('ence') || w.endsWith('ship') || w.endsWith('ism')) return 'noun';
  if (w.endsWith('ous') || w.endsWith('ive') || w.endsWith('al') || w.endsWith('ic') || w.endsWith('ent') || w.endsWith('ant') || w.endsWith('ary') || w.endsWith('ful') || w.endsWith('less') || w.endsWith('able') || w.endsWith('ible')) return 'adj';
  // fallback: if definition looks like adjective
  if (/^(showing|having|being|able to|full of|done)\b/.test(def)) return 'adj';
  return 'noun';
}

// Build POS groups for distractor picking.
const groups = new Map();
for (const e of bank) {
  const pos = guessPOS(e);
  if (!groups.has(pos)) groups.set(pos, []);
  groups.get(pos).push(e.word);
}

function stableIndex(word, mod) {
  let h = 0;
  for (let i=0;i<word.length;i++) h = (h*31 + word.charCodeAt(i)) >>> 0;
  return mod ? (h % mod) : h;
}

function jaccard(a, b) {
  const A = new Set(a);
  const B = new Set(b);
  let inter = 0;
  for (const x of A) if (B.has(x)) inter++;
  const union = A.size + B.size - inter;
  return union ? inter / union : 0;
}

function pickOptions(word) {
  const entry = bank.find(e => e.word === word);
  const targetDefT = unique(contentTokens(entry.definition));

  // 1) Prefer semantically-near distractors by definition token similarity.
  const sims = [];
  for (const e of bank) {
    if (e.word === word) continue;
    const defT = unique(contentTokens(e.definition));
    const sim = jaccard(targetDefT, defT);
    if (sim > 0) sims.push({w: e.word, sim});
  }
  sims.sort((a,b)=>b.sim-a.sim || a.w.localeCompare(b.w));
  const near = sims.slice(0, 3).map(x=>x.w);

  // 2) If not enough, fall back to same POS neighbors deterministically.
  const entryPos = guessPOS(entry);
  const pool = groups.get(entryPos) || bank.map(e=>e.word);
  const idx = pool.indexOf(word);
  const out = [word, ...near];
  for (let k=1; out.length<4 && k<=pool.length; k++) {
    const j = (idx + k + stableIndex(word, 7)) % pool.length;
    const cand = pool[j];
    if (cand !== word && !out.includes(cand)) out.push(cand);
  }
  // if still not enough, fill from global
  if (out.length < 4) {
    for (const e of bank) {
      if (!out.includes(e.word)) out.push(e.word);
      if (out.length === 4) break;
    }
  }

  // shuffle deterministically (so target not always first)
  const seed = stableIndex(word);
  const arr = out.slice(0,4);
  for (let i=arr.length-1;i>0;i--) {
    const j = (seed + i*17) % (i+1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function hardestWordsInText(s) {
  const ts = contentTokens(s);
  // naive: longer words tend to be harder for MAP≈197 reading
  const hard = ts.filter(t => t.length >= 8);
  return unique(hard).slice(0, 3);
}

function rateL5Def(entry) {
  const hard = hardestWordsInText(entry.definition);
  const len = contentTokens(entry.definition).length;
  if (hard.length >= 3 || len >= 12) return {rate: '不能', why: hard};
  if (hard.length >= 1 || len >= 8) return {rate: '勉强', why: hard};
  return {rate: '能', why: hard};
}

function blankExample(entry) {
  // replace the target word (case-insensitive) with ____
  const re = new RegExp(`\\b${entry.word.replace(/[.*+?^${}()|[\\]\\]/g,'\\$&')}\\b`, 'ig');
  return entry.example.replace(re, '____');
}

function rateL5Ex(entry) {
  // For Mark's task: blank the target and ask him to *produce the word*.
  // For long/Latinate words, even if he understands the scene, he can't retrieve the exact form.
  const w = entry.word;
  const ex = blankExample(entry);
  const hard = hardestWordsInText(ex);
  const len = contentTokens(ex).length;
  const easyCue = /(means|called|known as|is an|is a|is the|a kind of|the branch of)/i.test(ex);

  const wordHard = (w.length >= 9) || /(tion|sion|ment|ity|ence|ance|ship|ism|ate|ous|ive|ary|able|ible)$/.test(w);
  if (wordHard) {
    const why = ['词形长/不常见', ...hard].slice(0,3);
    return {rate: '不能', why};
  }

  if (easyCue && hard.length <= 1) return {rate: '勉强', why: hard};
  if (hard.length >= 3 || len >= 14) return {rate: '不能', why: hard};
  if (hard.length >= 1 || len >= 10) return {rate: '勉强', why: hard};
  return {rate: '能', why: hard};
}

function overlapScore(exampleBlank, def) {
  const exT = new Set(contentTokens(exampleBlank));
  const defT = unique(contentTokens(def));
  let score = 0;
  for (const t of defT) if (exT.has(t)) score++;
  return score;
}

function rateL6(entry, options) {
  const ex = blankExample(entry);
  const scores = options.map(w => {
    const def = bank.find(e=>e.word===w)?.definition || '';
    return {w, score: overlapScore(ex, def)};
  });
  const sorted = scores.slice().sort((a,b)=>b.score-a.score);
  const best = sorted[0];
  const second = sorted[1];

  if (best.w !== entry.word) {
    // If everything ties at 0, don't over-penalize: it's still guessable by general sense.
    if (best.score === 0 && (second?.score ?? 0) === 0) return {rate:'勉强', note:'线索偏泛(选项也都抽象)'};
    return {rate:'不能', note:`更像${best.w}`};
  }

  if (best.score === 0) return {rate:'勉强', note:'线索弱(靠常识/语感)'};
  if (best.score >= 2 && best.score > (second?.score ?? 0)) return {rate:'能', note:'线索足'};
  if (best.score >= 1 && best.score === (second?.score ?? 0)) return {rate:'勉强', note:`不够唯一(易混:${second.w})`};
  return {rate:'勉强', note:'线索一般'};
}

function cultural(entry) {
  const t = (entry.definition + ' ' + entry.example).toLowerCase();
  const tags = [];
  if (/\b(god|faith|sacred|agnostic|creed)\b/.test(t)) tags.push('宗教');
  if (/\b(die|died|dead|memorial|eulogy|dirge)\b/.test(t)) tags.push('死亡/悼念');
  if (/\b(war|military|army|prisoners|imprisoned|tribunal|judge|court|law|laws|government|senator|bill|vote|voting|politician|constituency|district|state official|impeachment|indictment|secession|totalitarian|tyranny|oppression|subjugate)\b/.test(t)) tags.push('政治/法律');
  if (/\b(bully|fight|violence|rob|burglars|crime|slav|servitude|imprison)\b/.test(t)) tags.push('暴力/犯罪');
  if (tags.length === 0) return {rate:'OK', note:''};
  return {rate:'注意', note: tags.join('+')};
}

function learningPath(entry) {
  const w = entry.word;
  const def = entry.definition.toLowerCase();
  const t = (entry.definition + ' ' + entry.example).toLowerCase();

  // very specialized / domain-heavy
  if (/(jurisprudence|orthodontics|filibuster|demagogue|tribunal|impeachment|secession|totalitarian|subjugate|usurp)/.test(w))
    return {rate:'偏专门', note:'更适合后置/专题(公民/法律/历史/医学)'};

  // abstract Latin nominalizations often hard
  if (w.length >= 12 || /(tion|sion|ment|ity|ence|ance)$/.test(w))
    return {rate:'偏难', note:'抽象/词缀负担大；建议配同根词/拆词'};

  // kid-friendly concrete
  if (/(bird|plant|color|cookie|moon|garden|pony|movie|book|school)/.test(t))
    return {rate:'合适', note:'情境具体，利于建义'};

  // general academic
  if (/\b(ability|rule|agreement|respect|support|evidence|detail|important|change)\b/.test(def))
    return {rate:'合适', note:'通用学术词(可跨学科)'};

  return {rate:'合适', note:''};
}

const lines = [];
lines.push('# VERIFY-GPT — words-level5d.js');
lines.push('');
lines.push('- One line per word (no skipping).');
lines.push('- L5: Mark(10岁中国ESL, MAP≈197) — Def/Ex separately.');
lines.push('- L6: Reverse test — blank example + 4 options.');
lines.push('- L7: Cultural sensitivity.');
lines.push('- L8: Learning path / level fit.');
lines.push('');

for (const entry of bank) {
  const l5d = rateL5Def(entry);
  const l5e = rateL5Ex(entry);
  const opts = pickOptions(entry.word);
  const l6 = rateL6(entry, opts);
  const l7 = cultural(entry);
  const l8 = learningPath(entry);

  const l5dWhy = l5d.why?.length ? `卡词:${l5d.why.join(',')}` : (l5d.rate==='不能' ? '卡点:句子长/抽象' : 'OK');
  const l5eWhy = l5e.why?.length ? `卡词:${l5e.why.join(',')}` : (l5e.rate==='不能' ? '卡点:词形难/线索弱' : 'OK');
  const l7Note = l7.note ? `(${l7.note})` : '';
  const l8Note = l8.note ? `(${l8.note})` : '';

  lines.push(`- ${entry.word} | L5-Def:${l5d.rate}(${l5dWhy}) | L5-Ex:${l5e.rate}(${l5eWhy}) | L6:${l6.rate}(${l6.note}) | 选项:[${opts.join(' / ')}] | L7:${l7.rate}${l7Note} | L8:${l8.rate}${l8Note}`);
}

fs.writeFileSync('VERIFY-GPT-words-level5d.js-GATE.md', lines.join('\n') + '\n');
console.log('wrote VERIFY-GPT-words-level5d.js-GATE.md lines=', lines.length);
