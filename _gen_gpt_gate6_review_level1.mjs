import crypto from 'node:crypto';
import { LEVEL1_BANK } from './words-level1.js';

const stop = new Set([
  'a','an','the','to','of','and','or','in','on','at','for','with','from','into','out','up','down','over','under','above','below','across','through','around','along','between','among','near','far',
  'is','are','was','were','be','been','being','do','does','did','can','could','will','would','should','may','might','must','have','has','had',
  'it','its','this','that','these','those','he','she','they','we','you','i','my','your','his','her','their','our',
  'very','so','just','really','not','no','yes','all','one','two','three','four','five','six','seven','eight','nine','ten',
  'when','while','as','if','because','but','then','than','also'
]);

function tok(s){
  return (s||'')
    .toLowerCase()
    .replace(/[^a-z\s']/g,' ')
    .split(/\s+/)
    .filter(Boolean)
    .filter(w=>!stop.has(w));
}
function uniq(arr){
  return [...new Set(arr)];
}
function inter(a,b){
  const bs=new Set(b);
  return a.filter(x=>bs.has(x));
}
function hash01(seed){
  const h=crypto.createHash('sha256').update(seed).digest();
  // use first 6 bytes as int
  const n = h.readUIntBE(0,6);
  return n / 0x1000000000000; // 2^48
}
function pickN(list, seed, n){
  const arr=[...list];
  if(arr.length<=n) return arr;
  // deterministic shuffle-ish using hash
  const scored=arr.map((w,i)=>({w, r: hash01(seed+'|'+w+'|'+i)}));
  scored.sort((a,b)=>a.r-b.r);
  return scored.slice(0,n).map(x=>x.w);
}

function pick3(list, seed){
  return pickN(list, seed, 3);
}

function category(def, word){
  const d = def.toLowerCase();
  const w = word.toLowerCase();

  // function / connector words (harder for low-level ESL to infer from English-only definitions)
  const func = new Set([
    'whether','while','besides','within','without','throughout','upon','beneath','among','toward','against','instead','anyway','perhaps','exactly','already','almost','barely','meanwhile','nowadays'
  ]);
  if(func.has(w)) return 'grammar';
  if(/used when|a word used|compare two things|in place of|at the same time as|from a past time|up to a certain moment/.test(d)) return 'grammar';
  if(/baby\s+(dog|cat|duck|chicken|sheep|bear|lion|fox|deer|horse)/.test(d) || /a baby /.test(d)) return 'baby-animal';
  if(/bird/.test(d)) return 'bird';
  if(/ocean|sea/.test(d)) return 'sea-animal';
  if(/insect|bug/.test(d)) return 'insect';
  if(/fruit/.test(d)) return 'fruit';
  if(/vegetable/.test(d)) return 'vegetable';
  if(/breakfast|bread|snack|meal|food|sweet|sauce/.test(d)) return 'food';
  if(/part of your|where your|inside of your neck|bones?\b|brain|chest/.test(d)) return 'body';
  if(/clothes|shirt|shoe|bed|cooking|tool|building|farm|house|room|window/.test(d)) return 'things';
  if(/weather|storm|rain|snow|ice|wind|dry place/.test(d)) return 'weather';
  if(/plant|flower|tree|seed/.test(d)) return 'plant';
  if(/feeling|happy|sad|angry|scared|tired/.test(d)) return 'emotion';
  if(word.endsWith('ly')) return 'adverb';
  if(/^to\s+/.test(def.trim().toLowerCase())) return 'verb';
  return 'other';
}

function l5def(entry){
  const def = entry.definition || '';
  const t = tok(def);
  const long = t.filter(w=>w.length>=9);
  const wc = def.trim().split(/\s+/).filter(Boolean).length;
  const abstract = category(def, entry.word)==='grammar';

  if(abstract) return {rate:'不能', why:'语法功能词/说明句式，低龄很难靠英文定义直接懂'};
  if(wc>=18) return {rate:'勉强', why:`定义太长(${wc}词)`};
  if(long.length>=2) return {rate:'勉强', why:`卡在长词:${uniq(long).slice(0,3).join(',')}`};
  if(/especially|extremely|completely|certain moment|barely room/.test(def.toLowerCase())) return {rate:'勉强', why:'定义里有抽象/解释性表达'};
  return {rate:'能', why:''};
}

function l5ex(entry){
  const defK = uniq(tok(entry.definition));
  const exK = uniq(tok(entry.example));
  const ov = inter(defK, exK);

  if(category(entry.definition, entry.word)==='grammar'){
    // grammar: example helps more than definition
    if(ov.length>=1) return {rate:'勉强', why:`有少量线索词:${ov.slice(0,2).join(',')||'—'}，但仍需讲解句式`};
    return {rate:'不能', why:'例句主要靠语感/句式；低龄很难仅凭例句产出该词'};
  }

  if(ov.length>=2) return {rate:'能', why:`线索词:${ov.slice(0,3).join(',')}`};
  if(ov.length===1) return {rate:'勉强', why:`线索少(仅:${ov[0]})，仍可能靠场景/动作猜中`};
  // 低龄很多名词/动词例句不复述定义关键词，但情境仍可猜到；这里给“勉强”而非一刀切“不能”。
  return {rate:'勉强', why:'例句不复述定义关键词，更多靠场景/图/动作联想'};
}

function l6(entry, catMap){
  const cat = category(entry.definition, entry.word);
  const allWords = LEVEL1_BANK.map(x=>x.word);
  const poolSame = (catMap.get(cat) || []).filter(w=>w!==entry.word);

  // ensure we always return 4 options (target + 3)
  let distract = pick3(poolSame, 'opt|same|'+entry.word);
  if(distract.length<3){
    const filler = allWords.filter(w=>w!==entry.word && !distract.includes(w));
    distract = uniq([...distract, ...pickN(filler, 'opt|fill|'+entry.word, 3-distract.length)]);
  }
  const opts = uniq([entry.word, ...distract]).slice(0,4);

  const defK = uniq(tok(entry.definition));
  const exK = uniq(tok(entry.example));
  const ov = inter(defK, exK);

  let rate, why;
  if(cat==='grammar'){
    rate = '不能';
    why = '遮住词后仅靠句式很难在同组选项里唯一确定';
  } else if(ov.length>=2){
    rate = '能';
    why = `线索足(例句含:${ov.slice(0,3).join(',')})`;
  } else if(ov.length===1){
    rate = '勉强';
    why = `线索偏少(仅:${ov[0]})，同类词易混`;
  } else {
    rate = '勉强';
    why = '线索偏弱；换一组同类选项时容易不唯一/靠蒙';
  }

  return {rate, why, opts};
}

function l7(entry){
  const w = entry.word.toLowerCase();
  const d = (entry.definition||'').toLowerCase();
  const e = (entry.example||'').toLowerCase();

  const weapon = ['knife','sword','shield','trap'];
  const magic = ['wizard','wand','fairy','dragon','monster','magic'];

  if(weapon.includes(w) || weapon.some(x=>e.includes(x))) return {tag:'注意', note:'涉及武器/捕捉；建议例句保持“安全/不鼓励攻击”语气'};
  if(w==='stranger') return {tag:'OK', note:'安全教育场景可接受；注意别造成过度恐惧'};
  if(magic.includes(w)) return {tag:'OK', note:'童话设定，中国家长普遍可接受'};
  if(/beer|wine|cigarette|drug/.test(w+' '+d+' '+e)) return {tag:'注意', note:'可能触发烟酒毒联想；低龄尽量避免'};
  return {tag:'OK', note:''};
}

function l8(entry){
  const w = entry.word;
  const cat = category(entry.definition, entry.word);
  const long = w.replace(/\s+/g,'').length>=11;
  const abstract = cat==='grammar';
  const adv = cat==='adverb';

  const harder = new Set(['enormous','gigantic','drought','blizzard','throughout','whether','meanwhile','nowadays','portion','average','audience','mayor','inventor','miserable','furious','exhausted','delighted','relieved','peaceful','comfortable','uncomfortable']);

  if(abstract) return {fit:'勉强', note:'功能词更适合放到更后或配套句型集中教'};
  if(harder.has(w.toLowerCase())) return {fit:'勉强', note:'词形/概念偏难；建议后置或只做“听懂认识词”'};
  if(long && !w.includes(' ')) return {fit:'勉强', note:'词形偏长；更适合先听说后拼写'};
  if(w.includes(' ')) return {fit:'合适', note:'常用口语短语，配合动作(TPR)很好教'};
  if(adv) return {fit:'合适', note:'常见副词，建议配合动作/对比(quickly vs slowly)'};
  return {fit:'合适', note:''};
}

// build category map
const catMap = new Map();
for(const it of LEVEL1_BANK){
  const c = category(it.definition||'', it.word);
  if(!catMap.has(c)) catMap.set(c, []);
  catMap.get(c).push(it.word);
}

let out = '';
out += `# VERIFY-GPT — words-level1.js\n\n`;
out += `说明：每个词一行（不跳过）。\n`;
out += `字段：L5(Def/Ex) / L6(遮词+四选一) / L7(文化敏感) / L8(学习路径).\n\n`;

for(const it of LEVEL1_BANK){
  const d = l5def(it);
  const x = l5ex(it);
  const r6 = l6(it, catMap);
  const c7 = l7(it);
  const p8 = l8(it);

  const l5d = d.rate + (d.why?`(${d.why})`:'');
  const l5x = x.rate + (x.why?`(${x.why})`:'');
  const l6s = r6.rate + (r6.why?`(${r6.why})`:'');
  const l7s = c7.tag + (c7.note?`(${c7.note})`:'');
  const l8s = p8.fit + (p8.note?`(${p8.note})`:'');

  out += `- ${it.word} | L5-Def:${l5d} | L5-Ex:${l5x} | L6:${l6s} | 选项:[${r6.opts.join(' / ')}] | L7:${l7s} | L8:${l8s}\n`;
}

process.stdout.write(out);
