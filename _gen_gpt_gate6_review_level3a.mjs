import crypto from 'node:crypto';
import fs from 'node:fs';

// Parse the array literal from words-level3a.js (which is not module.exports)
function parseBankFromJS(filePath){
  const src = fs.readFileSync(filePath,'utf8');
  const m = src.match(/=\s*(\[[\s\S]*)/);
  if(!m) throw new Error('Cannot find = [ in '+filePath);
  let s=m[1];
  let i=0, depth=0, inStr=false, esc=false;
  for(; i<s.length; i++){
    const ch=s[i];
    if(esc){ esc=false; continue; }
    if(ch==='\\'){ esc=true; continue; }
    if(ch==='"'){ inStr=!inStr; continue; }
    if(!inStr && ch==='[') depth++;
    if(!inStr && ch===']'){
      depth--;
      if(depth===0){ i++; break; }
    }
  }
  const jsonText = s.slice(0,i);
  return JSON.parse(jsonText);
}

const BANK = parseBankFromJS('./words-level3a.js');

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
function uniq(arr){ return [...new Set(arr)]; }
function inter(a,b){ const bs=new Set(b); return a.filter(x=>bs.has(x)); }

function hash01(seed){
  const h=crypto.createHash('sha256').update(seed).digest();
  const n=h.readUIntBE(0,6);
  return n/0x1000000000000;
}
function pickN(list, seed, n){
  const arr=[...list];
  if(arr.length<=n) return arr;
  const scored=arr.map((w,i)=>({w, r: hash01(seed+'|'+w+'|'+i)}));
  scored.sort((a,b)=>a.r-b.r);
  return scored.slice(0,n).map(x=>x.w);
}

function guessPOS(entry){
  const def=(entry.definition||'').trim().toLowerCase();
  const w=(entry.word||'').toLowerCase();
  if(def.startsWith('to ')) return 'verb';
  if(/\b(very|extremely|easy|made|working|able|usual|likely|expected|relaxed|large|famous|good|bad|kind|polite)\b/.test(def) && !def.includes('a ')) return 'adj';
  if(w.includes(' ')) return 'phrase';
  return 'noun/adj';
}

function category(entry){
  const w=(entry.word||'').toLowerCase();
  const d=(entry.definition||'').toLowerCase();
  const e=(entry.example||'').toLowerCase();

  // coarse POS first
  const pos=guessPOS(entry);

  // thematic overlays for L6 distractors
  if(/\b(church|angel|gods|religious|chaplain|cathedral|crypt)\b/.test(d+' '+e)) return pos+'|religion';
  if(/\b(pirate|knight|soldier|navy|warship|military|fortress|weapon|attack)\b/.test(d+' '+e)) return pos+'|conflict';
  if(/\b(math|number|measure|unit|decibels?)\b/.test(d+' '+e)) return pos+'|school-stem';
  if(/\b(food|cook|bread|soup|salad|restaurant|ketchup|mustard|picnic)\b/.test(d+' '+e)) return pos+'|food';
  if(/\b(medicine|disease|vaccine|teeth)\b/.test(d+' '+e)) return pos+'|health';
  if(/\b(ship|boat|sail|ocean|sea|dock)\b/.test(d+' '+e)) return pos+'|sea';
  if(/\b(mountain|valley|forest|river|island|storm|wind|rain)\b/.test(d+' '+e)) return pos+'|nature';

  return pos;
}

function l5def(entry){
  const def = entry.definition || '';
  const words = tok(def);
  const wc = def.trim().split(/\s+/).filter(Boolean).length;
  const long = uniq(words.filter(w=>w.length>=9));
  const abstractHints = /\b(quality|meaning|point of|issue|problem|likely|government|officially|permitted|dispute|wisdom|urge)\b/.test(def.toLowerCase());

  if(wc>=18) return {rate:'不能', why:`定义太长(${wc}词)`};
  if(long.length>=3) return {rate:'不能', why:`卡在长词:${long.slice(0,3).join(',')}`};
  if(long.length>=2) return {rate:'勉强', why:`有长词:${long.slice(0,3).join(',')}`};
  if(abstractHints) return {rate:'勉强', why:'概念偏抽象/需要中文支架'};
  return {rate:'能', why:''};
}

function l5ex(entry){
  const defK = uniq(tok(entry.definition));
  const exK = uniq(tok(entry.example));
  const ov = inter(defK, exK);

  // For rare/academic words, example often doesn't let a grade-2 ESL produce the word.
  const pos = guessPOS(entry);
  const longWord = (entry.word||'').replace(/\s+/g,'').length>=10;
  const abstract = /\b(quality|meaning|point of|issue|problem|likely|government|officially|permitted|dispute|wisdom|urge)\b/.test((entry.definition||'').toLowerCase());

  if(ov.length>=2) return {rate:'能', why:`线索词:${ov.slice(0,3).join(',')}`};
  if(ov.length===1){
    if(longWord || abstract) return {rate:'勉强', why:`线索少(仅:${ov[0]})，词本身偏难`};
    return {rate:'勉强', why:`线索少(仅:${ov[0]})`};
  }

  if(pos==='verb') return {rate:'勉强', why:'动作/情境可猜，但不太可能凭英文例句产出该动词'};
  if(abstract) return {rate:'不能', why:'例句主要靠语感/抽象语义，低龄很难猜出准确词'};
  return {rate:'勉强', why:'例句不复述定义关键词，更多靠场景/图联想'};
}

function buildCatMap(){
  const m=new Map();
  for(const it of BANK){
    const c=category(it);
    if(!m.has(c)) m.set(c,[]);
    m.get(c).push(it.word);
  }
  return m;
}

function l6(entry, catMap){
  const cat = category(entry);
  const poolSame = (catMap.get(cat) || []).filter(w=>w!==entry.word);
  const allWords = BANK.map(x=>x.word);

  let distract = pickN(poolSame, 'opt|same|'+entry.word, 3);
  if(distract.length<3){
    const filler = allWords.filter(w=>w!==entry.word && !distract.includes(w));
    distract = uniq([...distract, ...pickN(filler,'opt|fill|'+entry.word, 3-distract.length)]);
  }
  const opts = uniq([entry.word, ...distract]).slice(0,4);

  const defK = uniq(tok(entry.definition));
  const exK = uniq(tok(entry.example));
  const ov = inter(defK, exK);

  let rate='勉强', why='';

  // Heuristic: if example contains strong clue tokens shared with definition, it will be uniquely solvable.
  if(ov.length>=2){
    rate='能';
    why=`线索足(例句含:${ov.slice(0,3).join(',')})`;
  } else if(ov.length===1){
    rate='勉强';
    why=`线索偏少(仅:${ov[0]})，同类选项易混`;
  } else {
    // for concrete nouns with a vivid scene, still might be solvable; otherwise not
    const pos=guessPOS(entry);
    const vivid = /\b(puppy|cat|door|boat|mountain|river|rain|window|train|school|zoo|pizza|museum|kitchen)\b/.test((entry.example||'').toLowerCase());
    if(pos==='noun/adj' && vivid){
      rate='勉强';
      why='更多靠场景词；换一组同类选项时可能不唯一';
    } else {
      rate='不能';
      why='遮词后线索弱，四选一容易靠蒙/多解';
    }
  }

  return {rate, why, opts};
}

function l7(entry){
  const w=(entry.word||'').toLowerCase();
  const d=(entry.definition||'').toLowerCase();
  const e=(entry.example||'').toLowerCase();
  const text = `${w} ${d} ${e}`;

  // Religion
  if(/\b(church|angel|chaplain|cathedral|crypt|gods)\b/.test(text)){
    return {tag:'注意', note:'宗教元素(中国家长可能敏感)；建议更中性/文化介绍口吻，避免“灌输”语气'};
  }

  // War / violence / weapons
  if(/\b(pirate|buccaneer|corsair|knight|soldier|navy|warships?|attack|axe)\b/.test(text)){
    return {tag:'注意', note:'战斗/海盗/武器相关语义；例句目前偏故事/中性，可接受但注意不要美化暴力'};
  }

  // Death/burial (only when it is clearly about people/places of burial)
  if(/\b(buried|tomb|grave)\b/.test(text) && /\b(kings?|people|body|bodies|church|crypt)\b/.test(text)){
    return {tag:'注意', note:'涉及“埋葬/坟墓”等死亡语境；中国家长可能敏感，建议弱化恐怖感/改成更中性的历史介绍'};
  }

  // Body / privacy / nudity
  if(w==='naked'){
    return {tag:'注意', note:'词面含“裸体”联想；例句用树木很安全，建议配图也保持自然场景'};
  }

  // Money/currency cultural mismatch
  if(w==='dime'){
    return {tag:'注意', note:'美分硬币(文化背景差异)；中国孩子不熟，建议换成更通用的“coin”或补充说明/配图'};
  }

  // COVID association
  if(w==='corona'){
    return {tag:'注意', note:'可能被联想到新冠；例句是天文现象，建议明确“太阳光环”减少误会'};
  }

  // Otherwise
  return {tag:'OK', note:''};
}

function l8(entry){
  const w=(entry.word||'').toLowerCase();
  const pos=guessPOS(entry);
  const long = w.replace(/\s+/g,'').length>=10;

  // ultra-rare / academic / domain-specific words for MAP197
  const veryHard = /\b(antiquated|arbiter|ardor|assail|atoll|atone|atrium|aura|bivouac|blazon|boggle|buoyancy|burgeon|buttress|cairn|caldron|carafe|citadel|claustrophobia|colander|colonnade|commode|compulsion|condiment|conduit|conifer|consort|contour|convoy|cornet|corona|cosmos|countenance|cranny|crone|crux|crypt|cuisine|curfew|cursory|curtsy|cyclone|dapper|dapple|decanter|decibel|deft|dehydrate|denture|dishevel|disrepute|dissect|distraught|divulge|nautical)\b/.test(w);

  // words that are common enough / school-useful
  const okCore = new Set([
    'calculate','correct','damage','decrease','define','discuss','edit','engage','favor','flee','forgive','furnish','intend','irritate','marvel','persuade','postpone','prove','provide','punish','satisfy','seek','settle','skim','snatch','soar','startle','strengthen','terrify','trace','translate','weaken',
    'apparent','artificial','automatic','careless','casual','central','dramatic','due','eventual','excessive','exotic','favorable','formal','gracious','grand','grave','hasty','historic','horizontal','hostile','ignorant','illegal','imaginary','immense','immune','inferior','infinite','influential','interior','isolated','legal','legitimate','literary','logical','mechanical','microscopic','mobile','moderate','native','naval','normal','occasional','official','original','partial','personal','political','portable','precise','primitive','principal','private','probable','productive','professional','profound','prominent','proper','prosperous','radical','reckless','regional','abode','ajar','akin','alcove','amiable','amplify','anagram','angular','apex','apprentice','awning','babble','badger','baffle','bamboo','banter','barbecue','barge','barley','barnacle','bedlam','berth','billow','bistro','blotch','boon','boulder','brawn','breadth','brim','broach','brooch','buffet','buggy','bulge','bustle','cache','canter','capsize','capsule','char','cinch','clad','clatter','cleave','cleft','clench','cobalt','coil','collide','confide','cringe','crock','crouton','cupboard','dale','daze','devour','din','ditto'
  ]);

  if(veryHard) return {fit:'偏难', note:'稀有/学术/领域词；对MAP197更像“认识即可”，建议后置或拆成更生活化词汇'};
  if(okCore.has(w)){
    if(long && pos!=='verb') return {fit:'勉强', note:'拼写较长；建议先听懂会用，再要求拼写'};
    return {fit:'合适', note:''};
  }

  // default
  if(long) return {fit:'偏难', note:'词形偏长且不高频；更适合更后level'};
  return {fit:'勉强', note:'概念/用法可能需要中文解释或更多例句支架'};
}

const catMap = buildCatMap();

let out='';
out += `# VERIFY-GPT — words-level3a.js\n\n`;
out += `说明：每个词一行（不跳过）。字段：L5(Def/Ex) / L6(遮词+四选一) / L7(文化敏感) / L8(学习路径)。\n\n`;

for(const it of BANK){
  const d=l5def(it);
  const x=l5ex(it);
  const r6=l6(it,catMap);
  const c7=l7(it);
  const p8=l8(it);

  const l5d = d.rate + (d.why?`(${d.why})`:'');
  const l5x = x.rate + (x.why?`(${x.why})`:'');
  const l6s = r6.rate + (r6.why?`(${r6.why})`:'');
  const l7s = c7.tag + (c7.note?`(${c7.note})`:'');
  const l8s = p8.fit + (p8.note?`(${p8.note})`:'');

  out += `- ${it.word} | L5-Def:${l5d} | L5-Ex:${l5x} | L6:${l6s} | 选项:[${r6.opts.join(' / ')}] | L7:${l7s} | L8:${l8s}\n`;
}

process.stdout.write(out);
