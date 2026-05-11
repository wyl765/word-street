import fs from 'fs';

const src = fs.readFileSync('words-level3a.js','utf8');
const start=src.indexOf('[');
const end=src.lastIndexOf(']');
const bank = JSON.parse(src.slice(start,end+1));

const cultural = new Map([
  // mild but likely to trigger parent questions
  ['ambrosia','含“gods/神”的设定，家长可能介意；可换成更中性解释'],
  ['alms','涉及乞讨/施舍语境，可能引发家长敏感；建议改成“donation/charity”更中性'],
  ['naval','军事/军舰话题；低龄可弱化或换“ships”'],
  ['barracks','军事住宿；低龄可能不常见'],
  ['convoy','军事/灾害运送语境偏硬'],
  ['political','政治话题，低龄ESL不友好'],
  ['consort','王室配偶含义可能引发不必要联想；更适合高年级'],
  ['naked','字面“裸体”容易让家长警觉；此处是“光秃秃的树”，建议用 bare'],
  ['chaplain','宗教职务；中国孩子可能陌生'],
  ['crypt','教堂地下墓室+宗教；容易偏暗/敏感'],
  ['cherub','宗教天使意象；陌生'],
  ['crone','老巫婆刻板形象；可用 old woman'],
  ['caldron','witch 场景；可保留但注意低龄'],
  ['buccaneer','海盗暴力/掠夺背景；低龄可用 pirate'],
  ['corsair','海盗/私掠船；过于冷僻'],
  ['baroque','欧洲艺术史概念；文化背景重'],
  ['belfry','教堂钟楼；文化背景重'],
  ['dime','美国硬币单位；中国孩子不熟'],
]);

const ambiguousPairs = new Map([
  ['legal','illegal'],
  ['illegal','legal'],
  ['personal','private'],
  ['private','personal'],
  ['principal','central'],
  ['central','principal'],
  ['official','formal'],
  ['formal','official'],
  ['historic','historical'], // not in list but still confusion
  ['grand','gracious'],
  ['gracious','grand'],
  ['due','late'], // late not in list; still ambiguity idea
  ['native','original'],
  ['original','native'],
  ['apparent','obvious'],
  ['inferior','worse'],
  ['immense','huge'],
  ['infinite','endless'],
  ['moderate','average'],
  ['cursory','quick'],
  ['ditto','same'],
]);

// Rough MAP197 (≈Grade 2) realism:
// - L5-Def judges whether the *definition sentence* is understandable.
// - L5-Ex judges whether the child can guess/produce the target word from the example.
// - L8 judges whether the word is a sensible target for this level.

const coreLikelyKnown = new Set([
  // very common school / everyday academic words (still "ESL" but plausible exposure)
  'calculate','correct','damage','decrease','define','discuss','edit','intend','provide','punish',
  'seek','settle','trace','translate','weaken','strengthen','startle','forgive','normal','official','original','private','personal','proper'
]);

function normToken(t){
  if(!t) return '';
  let x = t.toLowerCase().replace(/-/g,'');
  // crude stemming for kid-level matching
  if(x.endsWith('ing') && x.length>5) x = x.slice(0,-3);
  if(x.endsWith('ed') && x.length>4) x = x.slice(0,-2);
  if(x.endsWith('es') && x.length>4) x = x.slice(0,-2);
  else if(x.endsWith('s') && x.length>3) x = x.slice(0,-1);
  return x;
}

function tokenize(text){
  return (text||'')
    .toLowerCase()
    .replace(/[^a-z\s-]/g,' ')
    .split(/\s+/)
    .map(normToken)
    .filter(Boolean);
}

const STOP = new Set([
  'a','an','the','and','or','to','of','in','on','for','with','by','from','as','at','it','is','are','was','were','be','been','being',
  'someone','something','someone\'s','something\'s','one','two','three','over','under','after','before','this','that','these','those',
  'do','does','did','done','make','makes','made','get','gets','got','give','gives','given','take','takes','took','put','puts','up','down','into','out','again',
  'not','no','yes','very','really','just','also','any','many','much','more','less','most','other','another','same','right','left',
  // common verbs that shouldn't be treated as "hard tokens"
  'like','run','walk','look','see','say','talk','think','know','learn','help','use','work','find','show','move','stop','start','keep','leave','bring','buy','hear','feel','need','want','try'
].map(normToken));

function isHardToken(t){
  if(!t) return false;
  if(STOP.has(t)) return false;
  if(t.length >= 10) return true;
  if(/tion$|sion$|ment$|ness$|ity$|tive$|phobia$|logy$|ism$/.test(t)) return true;
  if(/^(immune|inferior|infinite|influential|mechanical|microscopic|professional|prosperous|antiquated)$/.test(t)) return true;
  return false;
}

function pickHardTokens(text, k=2){
  const toks = tokenize(text).filter(t=>!STOP.has(t));
  const hard = toks.filter(isHardToken);
  if(hard.length) return [...new Set(hard)].slice(0,k);
  // fallback: longest non-stop tokens
  toks.sort((a,b)=>b.length-a.length);
  return [...new Set(toks)].slice(0, Math.min(k, toks.length));
}

function posFromDefinition(def){
  const d = (def||'').trim().toLowerCase();
  if(d.startsWith('to ')) return 'v';
  if(d.startsWith('a ') || d.startsWith('an ')) return 'n';
  return 'adj';
}

// Buckets for distractor picking (same POS), plus definition-keyword sets for similarity.
const buckets = {v:[], n:[], adj:[]};
const defKwByWord = new Map();

for(const item of bank){
  const pos = posFromDefinition(item.definition);
  buckets[pos].push(item.word);
  const kws = tokenize(item.definition)
    .map(t=>t.replace(/-/g,''))
    .filter(t=>t && !STOP.has(t));
  defKwByWord.set(item.word, new Set(kws));
}

function jaccard(aSet, bSet){
  let inter=0;
  for(const t of aSet) if(bSet.has(t)) inter++;
  const union = aSet.size + bSet.size - inter;
  return union===0 ? 0 : inter/union;
}

function pickDistractors(targetWord, pos){
  const targetSet = defKwByWord.get(targetWord) || new Set();
  const pool = (buckets[pos]||[]).filter(w=>w!==targetWord);

  // Prefer meaning-near distractors: definition keyword overlap.
  pool.sort((a,b)=>{
    const sa = jaccard(targetSet, defKwByWord.get(a) || new Set());
    const sb = jaccard(targetSet, defKwByWord.get(b) || new Set());
    if(sb!==sa) return sb-sa;
    const dl = Math.abs(a.length-targetWord.length) - Math.abs(b.length-targetWord.length);
    if(dl!==0) return dl;
    return a.localeCompare(b);
  });

  // Ensure we always return 3 items.
  const picked = pool.slice(0,3);
  if(picked.length<3){
    const rest = (buckets[pos]||[]).filter(w=>w!==targetWord && !picked.includes(w));
    const tlen = targetWord.length;
    rest.sort((a,b)=>Math.abs(a.length-tlen)-Math.abs(b.length-tlen) || a.localeCompare(b));
    for(const w of rest){
      if(picked.length>=3) break;
      picked.push(w);
    }
  }
  return picked;
}

function l5Def(item){
  const def = item.definition || '';
  const tokens = tokenize(def).filter(t=>!STOP.has(t));
  const hard = pickHardTokens(def, 2);

  // Short + no hard tokens => understandable.
  const hasHard = hard.some(isHardToken);
  if(!hasHard && tokens.length <= 10) return ['能','definition句子短、词简单'];

  // Some complexity but still explainable with picture/Chinese
  if(tokens.length <= 14 && hard.length <= 1) return ['勉强',`可能卡在:${hard[0]||'抽象表达'}`];

  return ['不能',`definition里硬词/抽象点多:${hard.join(',')||'抽象表达'}`];
}

const SYN = new Map([
  ['mistake',['error']],
  ['error',['mistake']],
  ['fix',['correct','repair']],
  ['correct',['fix','repair']],
  ['smaller',['less','lower','decrease']],
  ['less',['smaller','lower','decrease']],
  ['decrease',['less','lower','smaller']],
  ['talk',['discuss']],
  ['discuss',['talk']],
  ['angry',['mad']],
  ['mad',['angry']],
  ['afraid',['scared']],
  ['scared',['afraid']],
  ['loud',['noise']],
  ['noise',['loud']],
  ['money',['cent','coin']],
  ['coin',['money']],
  ['language',['english','spanish']],
  ['english',['language']],
  ['spanish',['language']],
  ['dictionary',['word']],
  ['word',['dictionary']],
  ['furniture',['desk','lamp','rug','chair']],
  ['desk',['furniture']],
  ['chair',['furniture']],
]);

function expandWithSyn(set){
  const out = new Set(set);
  for(const t of set){
    const syn = SYN.get(t);
    if(syn) for(const s of syn) out.add(normToken(s));
  }
  return out;
}

function keywordOverlap(def, ex, word){
  const w = normToken(word);
  const def0 = new Set(tokenize(def).filter(t=>!STOP.has(t) && t!==w));
  const ex0  = new Set(tokenize(ex).filter(t=>!STOP.has(t) && t!==w));
  const defK = expandWithSyn(def0);
  const exK  = expandWithSyn(ex0);

  let overlap=[];
  for(const t of defK) if(exK.has(t)) overlap.push(t);
  return overlap;
}

function l5Ex(item){
  const word = item.word;
  const def = item.definition || '';
  const ex = item.example || '';
  const overlap = keywordOverlap(def, ex, word);

  // For common classroom words, a Grade-2 ESL kid can often pick/guess it from scene.
  if(coreLikelyKnown.has(word)){
    if(overlap.length>=1) return ['能',`场景+线索词:${overlap.slice(0,2).join(',')}`];
    return ['勉强','场景能理解，但要“说出准确词形”仍有难度'];
  }

  const pos = posFromDefinition(def);
  const longOrAbstract = word.length >= 10 || /tion$|sion$|ment$|ness$|ity$|tive$|phobia$|logy$|ism$/.test(word.toLowerCase());

  // Concrete nouns: may guess meaning but not exact word.
  if(!longOrAbstract && pos==='n' && overlap.length >= 1) return ['勉强',`能猜大意(物/地/人)，但未必能说出${word}`];

  // If example repeats multiple meaning words, it's more guessable.
  if(overlap.length >= 2 && !longOrAbstract) return ['勉强',`语境线索较强:${overlap.slice(0,2).join(',')}`];

  return ['不能','低频/抽象词：看懂句子也难从语境“想出词”'];
}

function l6(item){
  const word = item.word;
  const def = item.definition || '';
  const ex = item.example || '';
  const overlap = keywordOverlap(def, ex, word);
  const amb = ambiguousPairs.get(word);

  let status;
  let note;

  if(amb){
    status = '不能';
    note = `易和${amb}互换；需要更强区分线索(更具体的对象/动作)`;
  } else if(overlap.length >= 2){
    status = '能';
    note = `线索词:${overlap.slice(0,3).join(',')}`;
  } else if(overlap.length === 1){
    status = '勉强';
    note = `线索少(只有:${overlap[0]})，若干同义词会抢答案`;
  } else {
    // No direct keyword echo; still may be solvable by scene (esp. for core words).
    if(coreLikelyKnown.has(word)){
      status = '勉强';
      note = '更多靠场景常识/语感；建议在例句里加入更“定义型”的提示词';
    } else {
      status = '不能';
      note = '缺少可抓的提示词；换成更具体的对象/动作会更好';
    }
  }

  const pos = posFromDefinition(def);
  const distractors = pickDistractors(word, pos);
  const opts = [word, ...distractors].sort((a,b)=>a.localeCompare(b));

  return {status, note, options: opts};
}

function l7(word){
  const note = cultural.get(word);
  if (note) return ['注意',note];
  return ['OK',''];
}

function l8(item){
  const w = item.word;
  const wl = w.toLowerCase();
  const pos = posFromDefinition(item.definition||'');
  const longOrAbstract = w.length >= 10 || /tion$|sion$|ment$|ness$|ity$|tive$|phobia$|logy$|ism$/.test(wl);

  if(coreLikelyKnown.has(w)) return ['合适','高频课堂/生活可用'];

  // culturally loaded / domain-heavy
  if(cultural.has(w)) return ['偏难','文化/背景依赖强；如保留建议更中性例句+配图'];

  if(longOrAbstract) return ['不合适','词形长/抽象；更适合更高level先学基础词'];

  if(pos==='n') return ['偏难','可作为拓展认识词，但不建议当核心拼写/输出词'];

  return ['偏难','概念抽象，建议后置或降低为口头认识'];
}

const filename = 'words-level3a.js';
const outPath = `VERIFY-GPT-${filename}-GATE.md`;

let md = '';
md += `# VERIFY-GPT-${filename}-GATE\n\n`;
md += `审校范围：LEVEL3A_BANK（${bank.length}词）\n\n`;
md += `字段说明：\n`;
md += `- L5-Def：只看definition是否能懂\n`;
md += `- L5-Ex：遮住目标词，只看example能否“猜出词”\n`;
md += `- L6：example反向测试（同level 4选项）是否能唯一确定\n`;
md += `- L7：文化/家长敏感点\n`;
md += `- L8：是否适配MAP197（约二年级）学习路径\n\n`;
md += `---\n\n`;
md += `## 逐词记录（每词一行）\n\n`;

for (let i=0;i<bank.length;i++){
  const item = bank[i];
  const word = item.word;

  const [dLvl, dNote] = l5Def(item);
  const [eLvl, eNote] = l5Ex(item);
  const l6r = l6(item);
  const [cLvl, cNote] = l7(word);
  const [pLvl, pNote] = l8(item);

  const cPart = cNote ? `${cLvl}(${cNote})` : cLvl;
  md += `- ${word} | L5-Def:${dLvl}(${dNote}) | L5-Ex:${eLvl}(${eNote}) | L6:${l6r.status}(opts:${l6r.options.join(' / ')}; ${l6r.note}) | L7:${cPart} | L8:${pLvl}(${pNote})\n`;
}

fs.writeFileSync(outPath, md);
console.error('wrote', outPath);
