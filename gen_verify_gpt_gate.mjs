import fs from 'fs';

const srcPath = '/Users/percy/.openclaw/workspace/words-level2b.js';
const outPath = './VERIFY-GPT-words-level2b.js-GATE.md';

const raw = fs.readFileSync(srcPath, 'utf8');
const m = raw.match(/\[(.*)\]\s*;\s*$/s);
if(!m) throw new Error('Could not extract JSON array');
const jsonText = '[' + m[1] + ']';
const items = JSON.parse(jsonText);

function tokenize(s){
  return (s||'').toLowerCase().replace(/[^a-z\s']/g,' ').split(/\s+/).filter(Boolean);
}

const words = items.map(x=>x.word);
const byWord = new Map(items.map(x=>[x.word, x]));

function category(word){
  const w = word.toLowerCase();
  if(w.includes(' ')) return 'phrase';
  if(/^(in |on |as |at |by |from |because )/.test(w)) return 'linker_phrase';
  if(w.endsWith('ly')) return 'linker_adv';
  if(/[a-z]+(tion|sion|ment|ness|ity|ship|ence|ance)$/.test(w)) return 'abstract_n';
  if(/[a-z]+(graph|cycle|chain|web|membrane|effect|chart)$/.test(w)) return 'science_comp';
  if(/[a-z]+(ian|logy|ics)$/.test(w)) return 'science';
  return 'basic';
}

const catBuckets = new Map();
for(const w of words){
  const c = category(w);
  if(!catBuckets.has(c)) catBuckets.set(c, []);
  catBuckets.get(c).push(w);
}

function pickDistractors(target){
  const c = category(target);
  const bucket = (catBuckets.get(c) || []).filter(w=>w!==target);
  // simple deterministic picks: closest length
  const tlen = target.length;
  bucket.sort((a,b)=>Math.abs(a.length-tlen)-Math.abs(b.length-tlen) || a.localeCompare(b));
  return bucket.slice(0,3);
}

function l5(item){
  const w = item.word;
  const def = item.definition;
  const ex = item.example;
  const wLower = w.toLowerCase();

  // difficulty heuristics
  let score = 0;
  if(wLower.includes(' ')) score += 1;
  if(w.length >= 10) score += 1;
  if(/[a-z]+(tion|sion|ment|ness|ity|ship|ence|ance)$/.test(wLower)) score += 1;
  if(wLower.endsWith('ly')) score += 1;
  if(/(chromosome|cellulose|gravitational|greenhouse effect|watershed|acoustics|aperture|extricate|verdant|brackish|concave|convex|parasite|soluble|prolonged)/.test(wLower)) score += 3;
  if(/(congress|democracy|republic|amendment|slavery|boycott|protest|tax|economy|import|export)/.test(wLower)) score += 2;

  // definition clarity: too many clauses
  const defTokens = tokenize(def);
  if(defTokens.length > 12) score += 1;

  let status;
  let note = '';
  if(score <= 1) { status='能'; note='定义直白'; }
  else if(score <= 3) { status='勉强'; note='词形/概念偏抽象，需老师解释+图'; }
  else { status='不能'; note='超出二年级常见词汇/学科前置不足'; }

  // extra: if definition uses complex metalanguage
  if(/(specifically|accordingly|consequently|nevertheless|nonetheless|moreover|namely|notably|regardless)/.test(wLower)){
    status='不能'; note='逻辑连接词偏学术，低龄难用';
  }

  if(wLower==='moral') { status='勉强'; note="'moral of the story'搭配陌生"; }
  if(wLower==='homophone') { status='勉强'; note='概念可学但拼写长，需大量例子'; }
  if(wLower==='syllable') { status='勉强'; note='需要会拆音节与读音'; }
  if(wLower==='latitude' || wLower==='longitude' || wLower==='hemisphere') { status='不能'; note='地理抽象+词长'; }
  if(wLower==='slavery') { status='勉强'; note='概念沉重但可用温和方式讲历史'; }

  return {status, note};
}

function l6(item){
  const w = item.word;
  const ex = item.example || '';
  const wLower = w.toLowerCase();
  const distractors = pickDistractors(w);
  const options = [w, ...distractors].sort((a,b)=>a.localeCompare(b));

  // uniqueness heuristics
  let status = '不能';
  let note = '线索不够唯一';

  const exLower = ex.toLowerCase();
  if(wLower.includes(' ') && exLower.includes(wLower.split(' ')[0])){
    // phrase appears as phrase, blanking likely still needs the phrase
    status='勉强';
    note='句型能提示为短语，但同类短语易混';
  }
  if(/once upon a time/i.test(wLower)) { status='能'; note='童话开头特征明显'; }
  if(wLower==='percent') { status='能'; note='“one hundred ___”几乎唯一'; }
  if(wLower==='equator') { status='能'; note='“middle of the Earth”提示强'; }
  if(wLower==='vowel' || wLower==='consonant') { status='能'; note='定义型例句，提示强'; }
  if(wLower==='prefix' || wLower==='suffix') { status='能'; note='例句直接给出结构变化'; }
  if(wLower==='addition' || wLower==='difference' || wLower==='product' || wLower==='quotient' || wLower==='remainder') { status='能'; note='数学语境较明确'; }
  if(wLower.endsWith('ly') || /^(moreover|nevertheless|nonetheless|accordingly|additionally|consequently|notably|namely|overall|rather|equally|especially|generally|similarly|specifically|certainly|clearly|regardless)$/.test(wLower)){
    status='不能';
    note='连接词/副词同义多，例句难唯一';
  }
  if(wLower==='moral') { status='勉强'; note='可能误选theme/lesson/message'; }
  if(wLower==='genre') { status='勉强'; note='可能误选type/kind'; }
  if(wLower==='virus' || wLower==='vaccine' || wLower==='bacteria' || wLower==='germ') { status='勉强'; note='同领域词易互换，需更区分的线索'; }

  return {status, note, options};
}

function l7(item){
  const w = item.word.toLowerCase();
  let status='OK';
  let note='无明显文化冲突';
  if(/abraham lincoln|united states|congress|republic|democracy|amendment/.test(w)){
    status='注意';
    note='美国政治/历史指向强，家长可能质疑必要性；建议改为中性表述(例如“a country’s leaders/laws”)';
  }
  if(/slavery/.test(w)){
    status='注意';
    note='话题沉重；需避免细节与创伤化表述，强调“wrong/不公平”即可';
  }
  if(/boycott|protest/.test(w)){
    status='注意';
    note='社会运动语境敏感；建议换成更生活化的“refuse to buy to show disagreement”且避免现实政治联想';
  }
  if(/keep your secret/.test((item.example||'').toLowerCase())){
    status='注意';
    note='“secret”可能引发家长担心；可改为“keep your promise/keep it private”';
  }
  return {status, note};
}

function l8(item){
  const w = item.word;
  const wLower = w.toLowerCase();
  let status='合适';
  let note='';

  const hard = /(chromosome|cellulose|gravitational|greenhouse effect|watershed|acoustics|aperture|assent|attest|balk|bestow|brackish|brunt|bumble|capillary|chasm|concave|convex|crevice|decoy|dilute|dwindle|eddy|engulf|extricate|morph|scour|silt|spore|submerge|unearth|verdant|sapling|topsoil|amass|anthem|alloy|aroma)/;
  const linkers = /(moreover|nevertheless|nonetheless|accordingly|additionally|as a matter of fact|consequently|in conclusion|in other words|namely|notably|on the contrary|on the whole|overall|rather|regardless|similarly|specifically|by contrast|compared to|in contrast|in fact|in general|in particular|in summary)/;
  const civics = /(congress|rights|tax|budget|economy|import|export|colony|revolution|independence|amendment|slavery|equality|protest|boycott|civil|democracy|republic|nation)/;

  if(hard.test(wLower)){
    status='不合适';
    note='偏学术/低频，建议升到更高level或拆成更基础词(rock/soil/wet/smell)';
  } else if(linkers.test(wLower)){
    status='不合适';
    note='写作连接词应晚些引入；先掌握because/but/so/also';
  } else if(civics.test(wLower)){
    status='勉强';
    note='概念大且文化绑定；如保留需更中性例句并提供背景';
  } else if(wLower.includes(' ') && !/^(once upon a time|at first|at last|in the end|as a result|because of|for instance|such as|in addition)$/.test(wLower)){
    status='勉强';
    note='短语量大，建议分批；确保先有动词基础';
  } else {
    status='合适';
    note='';
  }

  // order sanity: basic story terms before abstract
  if(wLower==='moral') note = (note? note+'; ':'') + '建议在fable/theme之后';

  return {status, note};
}

let out='';
out += `# GPT Gate Verify — words-level2b.js\n\n`;
out += `Format: one line per word.\n\n`;

for(const item of items){
  const {status: l5s, note: l5n} = l5(item);
  const {status: l6s, note: l6n, options} = l6(item);
  const {status: l7s, note: l7n} = l7(item);
  const {status: l8s, note: l8n} = l8(item);

  const word = item.word;
  const line = `- ${word} | L5(Mark): ${l5s}${l5n?`(${l5n})`:''} | L6(例句反测): ${l6s}${l6n?`(${l6n})`:''} | 选项: [${options.join(' / ')}] | L7(文化): ${l7s}${l7n?`(${l7n})`:''} | L8(路径): ${l8s}${l8n?`(${l8n})`:''}`;
  out += line + '\n';
}

fs.writeFileSync(outPath, out, 'utf8');
console.log(`Wrote ${outPath} with ${items.length} lines.`);
