import fs from 'fs';
import path from 'path';

// Usage:
//   node gen_verify_gpt_gate_auto.mjs /abs/path/to/words-level2.js
// Writes:
//   ./VERIFY-GPT-<basename>-GATE.md

const srcPath = process.argv[2];
if (!srcPath) {
  console.error('Usage: node gen_verify_gpt_gate_auto.mjs <srcPath>');
  process.exit(1);
}

const base = path.basename(srcPath);
const outPath = `./VERIFY-GPT-${base}-GATE.md`;

const raw = fs.readFileSync(srcPath, 'utf8');

function extractItems(text) {
  // Supported formats:
  // 1) const LEVEL2_BANK=[{...}, ...]; if(typeof module...
  // 2) [{...}, ...];
  // 3) module.exports=[{...}, ...];

  let m;

  m = text.match(/LEVEL\d+_BANK\s*=\s*\[(.*)\]\s*;\s*if\(typeof module/s);
  if (m) return JSON.parse('[' + m[1] + ']');

  m = text.match(/const\s+[A-Z0-9_]+\s*=\s*\[(.*)\]\s*;\s*if\(typeof module/s);
  if (m) return JSON.parse('[' + m[1] + ']');

  // Common simple format: const LEVEL2A_BANK=[{...}, ...]; (EOF)
  m = text.match(/const\s+[A-Z0-9_]+\s*=\s*\[(.*)\]\s*;\s*$/s);
  if (m) return JSON.parse('[' + m[1] + ']');

  m = text.match(/module\.exports\s*=\s*\[(.*)\]\s*;\s*$/s);
  if (m) return JSON.parse('[' + m[1] + ']');

  m = text.match(/^\s*\[(.*)\]\s*;?\s*$/s);
  if (m) return JSON.parse('[' + m[1] + ']');

  throw new Error('Could not extract JSON array from source file');
}

const items = extractItems(raw);

function tokenize(s) {
  return (s || '')
    .toLowerCase()
    .replace(/[^a-z\s']/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

const STOP = new Set([
  'a','an','the','to','of','and','or','but','so','for','in','on','at','by','with','from','as','into','than','then','when','while','if','because','about','over','under','up','down','out','off','near','far','more','most','very','just','all','any','some','one','two','three','four','five','six','seven','eight','nine','ten',
  'is','am','are','was','were','be','been','being','do','does','did','done','have','has','had','can','could','will','would','shall','should','may','might','must',
  'i','you','he','she','it','we','they','me','him','her','us','them','my','your','his','their','our','this','that','these','those',
  'please','one','more','time'
]);

function normTokens(tokens) {
  return tokens.filter(t => !STOP.has(t));
}

// Build TF-IDF vectors for each item using (definition + example)
const docs = items.map(it => normTokens(tokenize(`${it.definition || ''} ${it.example || ''}`)));
const df = new Map();
for (const toks of docs) {
  const seen = new Set(toks);
  for (const t of seen) df.set(t, (df.get(t) || 0) + 1);
}

const N = items.length;
const idf = new Map();
for (const [t, c] of df.entries()) {
  idf.set(t, Math.log((N + 1) / (c + 1)) + 1);
}

function vectorize(tokens) {
  const tf = new Map();
  for (const t of tokens) tf.set(t, (tf.get(t) || 0) + 1);
  const v = new Map();
  let norm2 = 0;
  for (const [t, c] of tf.entries()) {
    const w = c * (idf.get(t) || 1);
    v.set(t, w);
    norm2 += w * w;
  }
  return { v, norm: Math.sqrt(norm2) || 1 };
}

const vecs = docs.map(vectorize);

// Inverted index for sparse cosine search
const inv = new Map(); // token -> array of [idx, weight]
for (let i = 0; i < vecs.length; i++) {
  for (const [t, w] of vecs[i].v.entries()) {
    if (!inv.has(t)) inv.set(t, []);
    inv.get(t).push([i, w]);
  }
}

function cosineSparse(queryVec, queryNorm, idx) {
  const { v, norm } = vecs[idx];
  let dot = 0;
  for (const [t, wq] of queryVec.entries()) {
    const wi = v.get(t);
    if (wi) dot += wq * wi;
  }
  return dot / (queryNorm * norm);
}

function bestMatches(queryTokens, excludeIdx = null, k = 10) {
  const { v: qv, norm: qn } = vectorize(normTokens(queryTokens));
  const scores = new Map();
  for (const [t, wq] of qv.entries()) {
    const postings = inv.get(t);
    if (!postings) continue;
    for (const [i, wi] of postings) {
      if (excludeIdx !== null && i === excludeIdx) continue;
      scores.set(i, (scores.get(i) || 0) + wq * wi);
    }
  }
  const arr = [];
  for (const [i, dot] of scores.entries()) {
    const s = dot / (qn * vecs[i].norm);
    arr.push([i, s]);
  }
  arr.sort((a, b) => b[1] - a[1] || a[0] - b[0]);
  return arr.slice(0, k);
}

function removeTargetFromExample(example, word) {
  const exToks = tokenize(example);
  const wToks = tokenize(word);
  if (wToks.length === 0) return exToks;
  // remove exact matches of any token of the target word/phrase
  const wSet = new Set(wToks);
  return exToks.filter(t => !wSet.has(t));
}

function l5Def(item) {
  const def = (item.definition || '').trim();
  const toks = normTokens(tokenize(def));
  const w = (item.word || '').toLowerCase();

  // Mark: 10岁中国ESL，MAP≈197（约二年级）——标准要更“苛刻”一点：
  // 只有非常具体、生活高频、词形不难的才算“能”。

  let score = 0;
  const reasons = [];

  if (/\s/.test(w)) {
    score += 2;
    reasons.push('多词短语');
  }

  if (w.length >= 12) {
    score += 3;
    reasons.push('词很长');
  } else if (w.length >= 9) {
    score += 2;
    reasons.push('词偏长');
  } else if (w.length >= 8) {
    score += 1;
    reasons.push('拼写有负担');
  }

  // 常见学术/拉丁词形特征（对低龄拼写与掌握都更难）
  if (/(tion|sion|ment|ness|ity|ence|ance|ism|cracy|nomy|logy|graphy|ative|ization|ify|ize|ous|ious|ible|able|ary|ate)$/.test(w)) {
    score += 2;
    reasons.push('词缀偏学术');
  }

  // 定义复杂度
  if (toks.length >= 12) {
    score += 2;
    reasons.push('定义太长');
  } else if (toks.length >= 9) {
    score += 1;
    reasons.push('定义偏长');
  }

  const abstractTokens = new Set([
    'process','relationship','system','practice','quality','state','transfer','evidence','effect','value','typical','pattern','structure','function','resource','requirement','agreement','officially','policy','regulation','illegal','element'
  ]);
  const absCount = toks.filter(t => abstractTokens.has(t)).length;
  if (absCount >= 2) {
    score += 2;
    reasons.push('抽象术语多');
  } else if (absCount === 1) {
    score += 1;
    reasons.push('有抽象术语');
  }

  // 连接词/元语言：低龄极难
  if (/^(moreover|nevertheless|nonetheless|accordingly|additionally|consequently|regardless|specifically|namely|notably|overall|similarly)$/i.test(item.word)) {
    return { status: '不能', note: '逻辑连接词偏写作；二年级ESL难掌握与产出' };
  }

  // “something…something”太泛
  if ((def.match(/\bsomething\b/gi) || []).length >= 2) {
    score += 1;
    reasons.push('定义太泛');
  }

  let status;
  if (score <= 1) status = '能';
  else if (score <= 4) status = '勉强';
  else status = '不能';

  let note = '';
  if (status === '勉强') note = '需要中文支架/图示；' + (reasons.slice(0, 2).join('、') || '概念不够直观');
  if (status === '不能') note = '超出二年级ESL可直接掌握；' + (reasons.slice(0, 2).join('、') || '概念抽象/词形难');

  return { status, note };
}

function l5Example(item, idx) {
  const ex = (item.example || '').trim();
  if (!ex) return { status: '不能', note: '缺例句' };

  const query = removeTargetFromExample(ex, item.word);
  const matches = bestMatches(query, null, 6); // includes self potentially
  const selfScore = cosineSparse(vectorize(normTokens(query)).v, vectorize(normTokens(query)).norm, idx);

  // Find best non-self match score
  const bestNonSelf = matches.find(([i]) => i !== idx);
  const secondScore = bestNonSelf ? bestNonSelf[1] : 0;

  const margin = selfScore - secondScore;

  let status = '勉强';
  let note = '';

  if (selfScore < 0.12) {
    status = '不能';
    note = '例句信息太少，难从情境猜词';
  } else if (margin >= 0.12) {
    status = '能';
    note = '';
  } else if (margin >= 0.05) {
    status = '勉强';
    note = '例句线索有，但容易被同类词替换';
  } else {
    status = '不能';
    note = '例句不够指向，猜词会跑偏';
  }

  // 对MAP≈197：即使语境能猜到意思，很多词也“拼不出/说不出目标词形”
  const w = (item.word || '').toLowerCase();
  const hardForm = w.length >= 9 || /(tion|sion|ment|ness|ity|ence|ance|ism|cracy|nomy|logy|graphy|ative|ization|ify|ize|ous|ious|ible|able|ary|ate)$/.test(w) || /\s/.test(w);
  if (hardForm && status !== '不能') {
    status = '不能';
    note = note || '能理解情境但难产出该词(词形长/学术词缀)';
  }

  // connection words tend to be ambiguous in example-guessing
  if (/^(however|therefore|moreover|nevertheless|nonetheless|instead|meanwhile|overall|rather|similarly|specifically|generally|usually|probably|certainly|clearly|especially)$/i.test(item.word)) {
    status = '不能';
    note = '副词/连接词需要更强对比结构，否则难猜';
  }

  return { status, note };
}

function pickDistractorsBySimilarity(item, idx) {
  const ex = item.example || '';
  const query = removeTargetFromExample(ex, item.word);
  const matches = bestMatches(query, idx, 12);
  const distractors = [];
  for (const [i] of matches) {
    if (i === idx) continue;
    const w = items[i].word;
    if (w === item.word) continue;
    // Avoid multiword phrases as distractors for single-word targets (and vice versa)
    const isPhrase = /\s/.test(w);
    const targetPhrase = /\s/.test(item.word);
    if (isPhrase !== targetPhrase) continue;
    distractors.push(w);
    if (distractors.length >= 3) break;
  }
  // Fallback: fill with nearest-length words
  if (distractors.length < 3) {
    const tlen = item.word.length;
    const pool = items.map(x => x.word).filter(w => w !== item.word);
    pool.sort((a, b) => Math.abs(a.length - tlen) - Math.abs(b.length - tlen) || a.localeCompare(b));
    for (const w of pool) {
      if (distractors.includes(w)) continue;
      const isPhrase = /\s/.test(w);
      const targetPhrase = /\s/.test(item.word);
      if (isPhrase !== targetPhrase) continue;
      distractors.push(w);
      if (distractors.length >= 3) break;
    }
  }
  return distractors.slice(0, 3);
}

function l6ReverseTest(item, idx) {
  const ex = (item.example || '').trim();
  if (!ex) return { status: '不能', note: '缺例句', options: [item.word] };

  const distractors = pickDistractorsBySimilarity(item, idx);
  const options = [item.word, ...distractors];

  const queryTokens = normTokens(removeTargetFromExample(ex, item.word));
  const qvec = vectorize(queryTokens);

  const scored = options.map(w => {
    const j = items.findIndex(it => it.word === w);
    if (j < 0) return { w, s: 0 };
    const s = cosineSparse(qvec.v, qvec.norm, j);
    return { w, s };
  }).sort((a, b) => b.s - a.s || a.w.localeCompare(b.w));

  const best = scored[0];
  const second = scored[1] || { s: 0 };
  const margin = best.s - second.s;

  let status = '勉强';
  let note = '';

  if (best.w !== item.word) {
    status = '不能';
    note = `例句更像在说“${best.w}”，目标词不唯一`;
  } else if (best.s < 0.12) {
    status = '不能';
    note = '例句线索太弱，选项里会靠蒙';
  } else if (margin >= 0.10) {
    status = '能';
    note = '';
  } else if (margin >= 0.04) {
    status = '勉强';
    note = '和近义/同类词差距小，可能二选一';
  } else {
    status = '不能';
    note = '多个选项都说得通，不能唯一确定';
  }

  // connection words are inherently harder
  if (/^(however|therefore|moreover|nevertheless|nonetheless|instead|meanwhile|overall|rather|similarly|specifically|generally|usually|probably|certainly|clearly|especially)$/i.test(item.word)) {
    status = '不能';
    note = note || '连接词/副词语义细，例句需更明确的对比/因果结构';
  }

  return { status, note, options: options.sort((a, b) => a.localeCompare(b)) };
}

function l7Culture(item) {
  const w = (item.word || '').toLowerCase();
  const ex = (item.example || '').toLowerCase();

  let status = 'OK';
  let note = '';

  const flags = [];
  if (/(slavery|weapon|gun|kill|murder|blood|annihilate|devastate)/.test(w + ' ' + ex)) flags.push('暴力/灾难(偏沉重)');
  if (/(religion|church|god|bible|pray|holy)/.test(w + ' ' + ex)) flags.push('宗教');
  if (/(alcohol|beer|wine|drunk|cigarette|smoke|drug)/.test(w + ' ' + ex)) flags.push('烟酒毒');
  if (/(protest|boycott|government|congress|republic|democracy|rights|tax|law|laws|illegal|vote|voting)/.test(w + ' ' + ex)) flags.push('政治/公民');
  if (/(discrimination|skin color|racism)/.test(w + ' ' + ex)) flags.push('歧视/种族(需措辞谨慎)');
  if (/(poverty|destitution|homeless)/.test(w + ' ' + ex)) flags.push('贫困议题(避免“卖惨”)');
  if (/(gulf of mexico|yellowstone|california|texas|louisiana|pacific ocean|college|baseball)/.test(w + ' ' + ex)) flags.push('美式语境/地名');
  if (/(secret)\b/.test(w) && /(don\x27t tell|keep.*secret)/.test(ex)) flags.push('“保密”表达');

  if (flags.length) {
    status = '注意';
    note = `可能引发家长顾虑或需要解释：${flags.join('、')}；建议例句更中性/更普适`;
  }

  return { status, note };
}

function l8Path(item) {
  const w = (item.word || '').toLowerCase();

  // L8要以“MAP≈197 二年级ESL能否形成可用学习路径”为准：
  // - 学科词/制度词/抽象名词/长词形：大多应后移

  const academic = /(atom|aviation|biome|ecology|element|emission|genetic|frequency|exponent|exponentiation|cortex)/;
  const heavyLinkers = /^(moreover|nevertheless|nonetheless|accordingly|consequently|therefore|namely|notably|overall|similarly|specifically|by contrast|in contrast|in fact|in general|in particular|in summary|in conclusion|on the contrary|on the whole)$/;
  const civics = /(federal|civic|council|conference|consensus|enfranchisement|rights|government|law|laws|illegal|diplomat|devolution|contract)/;

  let score = 0;
  const reasons = [];

  if (/\s/.test(w)) {
    score += 2;
    reasons.push('短语');
  }
  if (w.length >= 12) {
    score += 3;
    reasons.push('词形很长');
  } else if (w.length >= 9) {
    score += 2;
    reasons.push('词形偏长');
  } else if (w.length >= 8) {
    score += 1;
    reasons.push('拼写负担');
  }
  if (/(tion|sion|ment|ness|ity|ence|ance|ism|cracy|nomy|logy|graphy|ative|ization|ify|ize|ous|ious|ible|able|ary|ate)$/.test(w)) {
    score += 2;
    reasons.push('学术词缀');
  }

  let status = '合适';
  let note = '';

  if (heavyLinkers.test(w)) {
    status = '不合适';
    note = '写作连接词应更晚；先稳 because/but/so/also';
  } else if (academic.test(w)) {
    status = '不合适';
    note = '学科词偏硬；需更基础概念铺垫(可改为识别词)';
  } else if (civics.test(w)) {
    status = '不合适';
    note = '制度/公民概念大且文化依赖；低龄不宜作为核心词';
  } else if (score >= 4) {
    status = '不合适';
    note = '对MAP≈197明显超纲；' + (reasons.slice(0, 2).join('、') || '抽象/词形难');
  } else if (score >= 2) {
    status = '勉强';
    note = '可作为“认识词”或后置；' + (reasons.slice(0, 2).join('、') || '需要支架');
  }

  return { status, note };
}

let out = '';
out += `# VERIFY-GPT — ${base}\n\n`;
out += `- One line per word (no skipping).\n`;
out += `- L5: Mark(10岁中国ESL, MAP≈197) — Def/Ex separately.\n`;
out += `- L6: Reverse test — blank example + 4 options.\n`;
out += `- L7: Cultural sensitivity.\n`;
out += `- L8: Learning path / level fit.\n\n`;

for (let idx = 0; idx < items.length; idx++) {
  const item = items[idx];

  const { status: l5dS, note: l5dN } = l5Def(item);
  const { status: l5eS, note: l5eN } = l5Example(item, idx);
  const { status: l6S, note: l6N, options } = l6ReverseTest(item, idx);
  const { status: l7S, note: l7N } = l7Culture(item);
  const { status: l8S, note: l8N } = l8Path(item);

  const word = item.word;
  const parts = [
    `- ${word}`,
    `L5-Def:${l5dS}${l5dN ? `(${l5dN})` : ''}`,
    `L5-Ex:${l5eS}${l5eN ? `(${l5eN})` : ''}`,
    `L6:${l6S}${l6N ? `(${l6N})` : ''}`,
    `选项:[${options.join(' / ')}]`,
    `L7:${l7S}${l7N ? `(${l7N})` : ''}`,
    `L8:${l8S}${l8N ? `(${l8N})` : ''}`
  ];

  out += parts.join(' | ') + '\n';
}

fs.writeFileSync(outPath, out, 'utf8');
console.log(`Wrote ${outPath} with ${items.length} lines.`);
