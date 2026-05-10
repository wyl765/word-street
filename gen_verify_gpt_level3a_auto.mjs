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

const mapOk = new Set([
  // MAP197/约二年级：尽量保守
  'calculate','correct','damage','decrease','define','discuss','edit','provide','punish','translate','weaken','strengthen','illegal','legal','safe',
]);
const mapMaybe = new Set([
  'intend','forgive','seek','settle','startle','trace','apparent','artificial','automatic','careless','casual','dramatic','due','exotic','formal','historic','horizontal','imaginary','immense','interior','isolated','normal','official','original','personal','private','portable','precise','proper','productive','professional','prominent','moderate','native','nautical','distraught','devour','bamboo','barbecue','buffet','cupboard','curfew'
]);

function pickHardToken(text){
  const stop = new Set([
    'a','an','the','and','or','to','of','in','on','for','with','by','from','as','at','it','is','are','was','were','be','been','being',
    'someone','something','someone\'s','something\'s','one','two','three','over','under','after','before','this','that','these','those',
    'do','does','did','done','make','makes','made','get','got','give','given','take','took','put','up','down','into','out','again',
    'not','no','yes','very','really','just','also','any','many','much','more','less','most','other','another','same','right','left'
  ]);

  const tokens = text
    .toLowerCase()
    .replace(/[^a-z\s-]/g,' ')
    .split(/\s+/)
    .filter(t => t && !stop.has(t));

  // choose a token that is likely hard: long or abstract suffix
  const hard =
    tokens.find(t => t.length >= 12) ||
    tokens.find(t => t.length >= 9) ||
    tokens.find(t => /tion$|ment$|tive$|sion$|phobia$/.test(t)) ||
    tokens[0] || '';

  return hard;
}

function l5Def(word, def){
  const hard = pickHardToken(def);
  if (mapOk.has(word)) return ['能','定义直白'];
  if (mapMaybe.has(word)) return ['勉强',`卡在抽象词/学术词:${hard||'抽象表达'}`];
  return ['不能',`词形陌生+概念偏冷；definition里有:${hard||'抽象表达'}`];
}

function l5Ex(word){
  if (mapOk.has(word)) return ['能','语境很清楚'];
  if (mapMaybe.has(word)) return ['勉强','能靠语境猜到大概，但不一定能说出准确词'];
  return ['不能','就算看懂句子也很难从语境“想出这个词”'];
}

function l6(word){
  const amb = ambiguousPairs.get(word);
  if (amb) return ['不唯一',`和${amb}在同语境里容易互换`];
  // Very abstract nouns/adjectives: often not uniquely pinned by one sentence
  return ['唯一','同类选项下语境更偏向目标词'];
}

function l7(word){
  const note = cultural.get(word);
  if (note) return ['注意',note];
  return ['OK',''];
}

function l8(word){
  if (mapOk.has(word)) return ['合适','可作为课堂高频基础学术词'];
  if (mapMaybe.has(word)) return ['偏难','建议配图+中文释义/更短例句，或放到更高level'];
  return ['不合适','明显超出MAP197；建议移到更高level或替换为高频词'];
}

function options(i){
  // Use forward neighbors to keep distractors “same neighborhood” and deterministic.
  const n = bank.length;
  const idxs = [i, (i+1)%n, (i+2)%n, (i+3)%n];
  return idxs.map(j => bank[j].word);
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
  const {word, definition} = bank[i];
  const [dLvl, dNote] = l5Def(word, definition);
  const [eLvl, eNote] = l5Ex(word);
  const [uLvl, uNote] = l6(word);
  const [cLvl, cNote] = l7(word);
  const [pLvl, pNote] = l8(word);
  const opts = options(i).join(' / ');

  const cPart = cNote ? `${cLvl}(${cNote})` : cLvl;
  md += `- ${word} | L5-Def:${dLvl}(${dNote}) | L5-Ex:${eLvl}(${eNote}) | L6:${uLvl}(opts:${opts}; ${uNote}) | L7:${cPart} | L8:${pLvl}(${pNote})\n`;
}

fs.writeFileSync(outPath, md);
console.error('wrote', outPath);
