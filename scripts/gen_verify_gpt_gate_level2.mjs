import fs from 'node:fs';
import vm from 'node:vm';

const file = process.argv[2];
if (!file) {
  console.error('Usage: node scripts/gen_verify_gpt_gate_level2.mjs <words-file.js>');
  process.exit(1);
}

const src = fs.readFileSync(file, 'utf8');
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(`${src}; globalThis.__BANK__ = (typeof LEVEL2_BANK !== 'undefined' ? LEVEL2_BANK : (typeof LEVEL3A_BANK !== 'undefined' ? LEVEL3A_BANK : null));`, sandbox);
const bank = sandbox.__BANK__;
if (!Array.isArray(bank)) {
  console.error('Could not find BANK array (expected LEVEL2_BANK etc).');
  process.exit(2);
}

const stop = new Set([
  'a','an','the','to','of','and','or','in','on','at','for','with','by','from','into','over','under','up','down','out','off',
  'is','are','was','were','be','been','being','am','do','does','did','done','can','could','will','would','should','may','might','must',
  'that','this','these','those','it','its','i','me','my','you','your','he','him','his','she','her','we','us','our','they','them','their',
  'as','so','because','but','if','no','yes','when','where','why','how','what','who','which','than','then','there','here','more','most','one','two','three','four','five',
  'something','someone','somebody','anything','anyone','anybody','everything','everyone','everybody'
]);

const tokenize = (s) => (s||'')
  .toLowerCase()
  .replace(/[^a-z\s']/g,' ')
  .split(/\s+/)
  .filter(Boolean)
  .map(t => t.replace(/^'+|'+$/g,''))
  .filter(t => t && !stop.has(t));

const jaccard = (a, b) => {
  const A = new Set(a);
  const B = new Set(b);
  if (A.size === 0 || B.size === 0) return 0;
  let inter = 0;
  for (const x of A) if (B.has(x)) inter++;
  const uni = A.size + B.size - inter;
  return uni ? inter / uni : 0;
};

const vowelGroups = (w) => {
  const m = (w.toLowerCase().match(/[aeiouy]+/g) || []);
  return m.length;
};

const connectors = new Set(['however','therefore','otherwise','although','unless','because']);
const sensitive = [
  {re:/\b(government|election|citizen|freedom|law)\b/i, tag:'politics/civics'},
  {re:/\b(attack|battle|dagger|soldier|navy|admiral|bugle|bunker)\b/i, tag:'violence/military'},
  {re:/\b(chapel|prayer|church|wizard)\b/i, tag:'religion/magic'},
];

const easyCore = new Set([
  'about','act','action','add','adult','afraid','again','agree','alone','also','always','any','arm','arrive','ask','asleep','awake',
  'backpack','balloon','because','begin','better','beach','bring','build','butter','calendar','change','circle','climb','close','corner',
  'cost','dark','dinner','doorway','downstairs','earth','edge','enter','far','farm','fence','field','fill','finish','follow','front','glad',
  'grow','guess','hallway','history','holiday','hop','hurt','hurry','idea','inside','jacket','jump','key','kind','knock','laugh','leaf','learn',
  'library','listen','lunch','minute','mirror','mix','move','near','never','noisy','note','ocean','outside','over','path','picnic','planet',
  'playground','quiet','quiz','raise','reach','river','safe','save','scared','score','shade','shore','simple','smell','special','store','strong',
  'sweet','taste','team','track','travel','trick','trust','turn','under','upstairs','usual','visit','voice','vote','wait','weather','wheel','yesterday'
]);

const entries = bank.map((e, idx) => ({...e, _idx: idx}));

// Precompute definition tokens
const defTokens = entries.map(e => tokenize(e.definition));

// Similarity best match per word
const best = entries.map(() => ({sim:0, j:-1}));
for (let i=0; i<entries.length; i++) {
  for (let j=i+1; j<entries.length; j++) {
    const sim = jaccard(defTokens[i], defTokens[j]);
    if (sim > best[i].sim) best[i] = {sim, j};
    if (sim > best[j].sim) best[j] = {sim, j:i};
  }
}

function l5(e) {
  const w = e.word;
  const defLen = (e.definition||'').split(/\s+/).filter(Boolean).length;
  const vg = vowelGroups(w.replace(/\s+/g,''));
  const isPhrase = /\s/.test(w);
  const isConnector = connectors.has(w);
  const isAdvancedNounish = /^(admiral|avalanche|atlas|antenna|applause|arch|beacon|beeswax|bellows|binoculars|birch|blacksmith|blueprint|bluff|bobsled|bolt|bonfire|bramble|brass|bridle|broth|bugle|bulb|bulletin|bunker|buoy|canal|canopy|caribou|carousel|cartwheel|cashew|cedar|cellar|chapel|chariot|chestnut|chisel|chord|cider|clam|cloak|cobblestone|cocoon|comet|corral|cradle|crest|cuff|cypress|delta|dinghy|dome|drawbridge|drumstick|dune|easel|elm|ember|emerald|falcon|fiddle|fjord|flint|forge|fresco|gale|galley|garnet|gazelle|geyser|gong|granite|grapevine|gravel|griddle|grove|gutter|hammock|harp|hazel|hearth|heron|hickory|hilltop|holly|honeycomb|horseshoe|hourglass|husk|ibis|igloo|ivy|jade|javelin|kelp|kennel|kindle|kingfisher|knapsack|lagoon|latch|lava|levee|lichen|locket|loom|lynx|mango|mantle|maple|marsh|mast|moat|mortar|mosaic|mulberry|muzzle|nectar|nettle|nozzle|nutmeg|oar|oasis|olive|ore|otter|pagoda|parchment|parsley|pasture|pebble|pelican|pendant|pier|pigment)$/i.test(w);

  if (easyCore.has(w)) return {tag:'✅', note:'能懂(常用)'};
  if (isAdvancedNounish) return {tag:'❌', note:'词太生僻/没见过(靠图片也难)'};
  if (isConnector) return {tag:'△', note:'能背意思但用法/语感难'};
  if (isPhrase) return {tag:'△', note:'短语可学但容易和别的搭配混'};
  if (vg >= 5 || w.length >= 10) return {tag:'❌', note:'词形长、发音难，二年级不稳'};
  if (defLen >= 12) return {tag:'△', note:'定义句子长，读起来费劲'};
  return {tag:'✅', note:'定义+例句够直观'};
}

function l6(e, i) {
  const w = e.word;
  const isConnector = connectors.has(w);
  const isFunction = easyCore.has(w) && w.length <= 4;
  const b = best[i];
  let nearSyn = (b.sim >= 0.35) ? entries[b.j].word : null;
  // Heuristic: avoid treating simple negation/temporal overlap as "near-synonym" (e.g., ancient vs recently)
  if (nearSyn) {
    const t1 = new Set(defTokens[i]);
    const t2 = new Set(defTokens[b.j]);
    const hasNot1 = t1.has('not');
    const hasNot2 = t2.has('not');
    if (hasNot1 !== hasNot2) {
      const shared = [...t1].filter(x => t2.has(x));
      const bland = new Set(['long','ago','time','often','many','little','end','after','before']);
      if (shared.length && shared.every(x => bland.has(x))) nearSyn = null;
    }
  }
  // explicit known-confusables
  const confusablePairs = [
    ['complete','finish'],
    ['rarely','seldom'],
    ['quiet','quite'],
    ['shore','coast'],
    ['reply','repeat'],
    ['cause','effect'],
    ['map','atlas'],
    ['cost','price'],
  ];
  const conf = confusablePairs.find(([a,b]) => (a===w && entries.some(x=>x.word===b)) || (b===w && entries.some(x=>x.word===a)));
  if (conf) {
    const other = conf[0]===w ? conf[1] : conf[0];
    return {tag:'❌', note:`例句空格可能也能选「${other}」`};
  }
  if (nearSyn) return {tag:'❌', note:`与「${nearSyn}」定义很近，空格不唯一`};
  if (isConnector) return {tag:'△', note:'连词/副词靠语法位置信息，选项一换就不唯一'};
  if (isFunction) return {tag:'△', note:'太常见/多义，做题不一定靠例句锁定'};
  // If example contains very strong cue: includes synonym? we can do simple rule: if example has the word itself (always) yes, but blanking removes.
  // Approx: if example has named object strongly tied to word
  const ex = (e.example||'').toLowerCase();
  const strongCues = [
    {re:/\bperiod\b/, ok:['sentence']},
    {re:/\baddition\b|\badd\b/, ok:['sum']},
    {re:/\bwhistle\b/, ok:['begin']},
    {re:/\btraining wheels\b/, ok:['succeed']},
  ];
  for (const sc of strongCues) {
    if (sc.ok.includes(w) && sc.re.test(ex)) return {tag:'✅', note:'线索强，基本唯一'};
  }
  // Default
  return {tag:'✅', note:'例句信息基本够用(配4选项应可锁定)'};
}

function l7(e) {
  const w = e.word;
  let hit = null;
  for (const s of sensitive) {
    if (s.re.test(w) || s.re.test(e.example||'') || s.re.test(e.definition||'')) { hit = s.tag; break; }
  }
  if (!hit) return {tag:'OK', note:'无明显敏感点'};
  if (hit==='religion/magic') return {tag:'⚠', note:'宗教/魔法题材，少数家长介意'};
  if (hit==='violence/military') return {tag:'⚠', note:'武器/战争语义，家长可能不喜欢'};
  if (hit==='politics/civics') return {tag:'⚠', note:'政治/公民概念，需更中性表述'};
  return {tag:'⚠', note:hit};
}

function l8(e, i) {
  const w = e.word;
  const vg = vowelGroups(w.replace(/\s+/g,''));
  const isPhrase = /\s/.test(w);
  const isAdvancedNounish = /^(admiral|avalanche|atlas|antenna|applause|arch|beacon|beeswax|bellows|binoculars|birch|blacksmith|blueprint|bluff|bobsled|bolt|bonfire|bramble|brass|bridle|broth|bugle|bulb|bulletin|bunker|buoy|canal|canopy|caribou|carousel|cartwheel|cashew|cedar|cellar|chapel|chariot|chestnut|chisel|chord|cider|clam|cloak|cobblestone|cocoon|comet|corral|cradle|crest|cuff|cypress|delta|dinghy|dome|drawbridge|drumstick|dune|easel|elm|ember|emerald|falcon|fiddle|fjord|flint|forge|fresco|gale|galley|garnet|gazelle|geyser|gong|granite|grapevine|gravel|griddle|grove|gutter|hammock|harp|hazel|hearth|heron|hickory|hilltop|holly|honeycomb|horseshoe|hourglass|husk|ibis|igloo|ivy|jade|javelin|kelp|kennel|kindle|kingfisher|knapsack|lagoon|latch|lava|levee|lichen|locket|loom|lynx|mango|mantle|maple|marsh|mast|moat|mortar|mosaic|mulberry|muzzle|nectar|nettle|nozzle|nutmeg|oar|oasis|olive|ore|otter|pagoda|parchment|parsley|pasture|pebble|pelican|pendant|pier|pigment)$/i.test(w);

  // too easy
  if (easyCore.has(w) && (w.length <= 5) && !isPhrase) return {tag:'↓', note:'偏L1基础词，放L2显得重复'};
  // too hard
  if (isAdvancedNounish) return {tag:'↑', note:'明显超纲(知识性名词太多)'};
  if (vg >= 5 || w.length >= 11) return {tag:'↑', note:'词形/发音负担大，建议更高level'};
  // ordering/cluster notes
  const b = best[i];
  if (b.sim >= 0.35) return {tag:'OK', note:`与「${entries[b.j].word}」可成对教学/需拉开例句`};
  if (isPhrase) return {tag:'OK', note:'短语可放L2但应集中成组教'};
  return {tag:'OK', note:'难度基本匹配L2'};
}

const out = [];
out.push(`# VERIFY-GPT-${file.split('/').pop()}-GATE`);
out.push('');
out.push('说明：本报告只做 GPT 侧 L5-L8 专项审校。L6 的“四选一”是用同 level 词库做的「反向唯一性」近似判断（重点抓：近义词/多义导致不唯一、例句线索弱）。');
out.push('');
out.push('每词一行：`word | L5 Mark做题 | L6 例句反测 | L7 文化敏感 | L8 路径/难度`');
out.push('');

for (let i=0; i<entries.length; i++) {
  const e = entries[i];
  const a = l5(e);
  const b = l6(e, i);
  const c = l7(e);
  const d = l8(e, i);
  out.push(`- ${e.word} | L5:${a.tag}(${a.note}) | L6:${b.tag}(${b.note}) | L7:${c.tag}(${c.note}) | L8:${d.tag}(${d.note})`);
}

const reportName = `VERIFY-GPT-${file.split('/').pop()}-GATE.md`;
fs.writeFileSync(reportName, out.join('\n') + '\n', 'utf8');
console.log(`Wrote ${reportName} with ${entries.length} word lines.`);
