import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetFile = process.argv[2] || 'words-level1.js';

// Prefer importing the module (works for ESM exports / CommonJS module.exports).
// Fallback: parse the source file directly for projects that define LEVEL*_BANK but forget to export it.
let mod = null;
try{
  mod = await import(pathToFileUrl(path.join(__dirname, targetFile)).href);
}catch(e){
  mod = null;
}

function pathToFileUrl(p){
  const u = new URL('file://');
  u.pathname = p;
  return u;
}

function extractBank(mod){
  if(!mod) return null;
  if(Array.isArray(mod)) return mod;
  if(Array.isArray(mod.default)) return mod.default;
  // direct named export like LEVEL2_BANK
  for(const k of Object.keys(mod)){
    if(k.endsWith('_BANK') && Array.isArray(mod[k])) return mod[k];
  }
  // CommonJS imported via ESM => default is module.exports
  if(mod.default && typeof mod.default === 'object'){
    for(const k of Object.keys(mod.default)){
      if(k.endsWith('_BANK') && Array.isArray(mod.default[k])) return mod.default[k];
    }
  }
  return null;
}

function extractArrayLiteralByBracketScan(src){
  const bankAssign = src.search(/_BANK\s*=/);
  if(bankAssign < 0) return null;
  const start = src.indexOf('[', bankAssign);
  if(start < 0) return null;
  let depth = 0;
  for(let i = start; i < src.length; i++){
    const ch = src[i];
    if(ch === '[') depth++;
    else if(ch === ']'){
      depth--;
      if(depth === 0) return src.slice(start, i+1);
    }
  }
  return null;
}

function extractBankFromSourceFile(filePath){
  const src = fs.readFileSync(filePath, 'utf8');
  const lit = extractArrayLiteralByBracketScan(src);
  if(!lit) return null;
  try{ return JSON.parse(lit); }catch(e){
    try{ return new Function(`return ${lit};`)(); }catch(e2){
      return null;
    }
  }
}

let bank = extractBank(mod);
if(!Array.isArray(bank)){
  const filePath = path.join(__dirname, targetFile);
  bank = extractBankFromSourceFile(filePath);
}

if(!Array.isArray(bank)){
  const keys = mod ? Object.keys(mod) : [];
  const defaultKeys = (mod && mod.default && typeof mod.default==='object') ? Object.keys(mod.default) : null;
  console.error('Could not load bank array from', targetFile, 'keys:', keys, 'defaultKeys:', defaultKeys);
  process.exit(1);
}

const stop = new Set([
  'a','an','the','to','of','and','or','in','on','at','with','for','from','into','out','up','down','over','under','near','by','when','while','after','before','because','so','that','this','it','its','is','are','was','were','be','been','being','as','but','not','no','yes','do','does','did','can','could','will','would','should','may','might','must','very','really','just','like','about','than','then','there','here','they','them','their','she','he','his','her','you','your','we','our','i','my','me','him','hers','ours','yours','had','has','have','got','get','gets','went','go','goes','come','comes','came','make','made','made','made'
]);

function tokenize(s){
  return (s||'')
    .toLowerCase()
    .replace(/[^a-z\s']/g,' ')
    .split(/\s+/)
    .filter(Boolean)
    .map(t=>t.replace(/^'+|'+$/g,''))
    .filter(t=>t && !stop.has(t));
}

const advancedWords = new Set([
  'especially','protect','platform','measure','direction','throughout','whether','during','meanwhile','nowadays','portion','average','audience','inventor','enormous','gigantic','thermometer','drought','blizzard','curved','curve','exactly','probably','perhaps','instead','anyway','forever','beneath','besides','within','without','attach','repair','design','deliver','vanish','fierce','generous','patient','stubborn','graceful','embarrassed','disappointed','frustrated','terrified','furious','miserable','relieved','peaceful','comfortable','uncomfortable','exhausted','delighted','gloomy','hopeful','homesick','ashamed'
]);

const sensitiveWords = new Set([
  'sword','shield','trap','monster','dragon','wizard','fairy','magic','throne','crown'
]);

const grammarHeavy = new Set([
  'than','whether','while','during','until','since','besides','within','without','throughout','upon','meanwhile','nowadays','perhaps','instead','anyway','already','almost','barely','exactly','toward','against','through','across','along','around','beyond','beneath','among','between'
]);

function vowelGroups(word){
  const w = word.toLowerCase().replace(/[^a-z]/g,'');
  const m = w.match(/[aeiouy]+/g);
  return m ? m.length : 1;
}

function difficulty(entry){
  const w = entry.word;
  const def = entry.definition;
  const ex = entry.example;
  const wLen = w.replace(/[^a-z]/gi,'').length;
  const vg = vowelGroups(w);
  const defTokens = tokenize(def);
  const advCount = defTokens.filter(t=>advancedWords.has(t)).length + tokenize(ex).filter(t=>advancedWords.has(t)).length;
  let score = 0;
  if(w.includes(' ')) score += 2;
  if(wLen >= 9) score += 2;
  else if(wLen >= 7) score += 1;
  if(vg >= 3) score += 1;
  score += Math.min(2, advCount);
  if(grammarHeavy.has(w.toLowerCase())) score += 2;
  return {score, advCount, wLen, vg};
}

function l5(entry){
  const d = difficulty(entry);
  const defTokens = tokenize(entry.definition);
  // pick one likely blocker word
  const blocker = defTokens.find(t=>advancedWords.has(t) && t !== entry.word.toLowerCase());
  if(d.score <= 1) return {verdict:'能', why:'直观具体'};
  if(d.score <= 3) return {verdict:'勉强', why:blocker?`definition里有“${blocker}”可能不懂`:'需要靠图片/语境'};
  return {verdict:'不能', why:blocker?`definition/例句里有“${blocker}”，二年级很可能卡住`:'概念偏抽象/词形偏长'};
}

function category(entry){
  const t = (entry.word+' '+entry.definition+' '+entry.example).toLowerCase();
  const has = (k)=>t.includes(k);
  if(/\b(baby|dog|cat|rabbit|duck|chicken|sheep|bear|lion|fox|deer|horse|bird|fish|whale|dolphin|shark|turtle|lizard|frog|toad|snail|worm|spider|beetle|ladybug|butterfly|caterpillar|ant|bee|squirrel|raccoon|skunk|beaver|moose)\b/.test(t)) return 'animals';
  if(/\b(bread|breakfast|milk|bowl|cake|cookie|fruit|vegetable|salad|cheese|sugar|honey|syrup|pizza|tea|soup|meal|snack)\b/.test(t)) return 'food';
  if(/\b(arm|hand|foot|face|mouth|neck|back|brain|finger|thumb|wrist|ankle|elbow|chin|cheek|forehead|eyebrow|eyelash|tongue|throat|shoulder|hip|spine|rib|skull|muscle)\b/.test(t)) return 'body';
  if(/\b(shirt|shoe|dress|coat|jacket|belt|pants|skirt|pajamas|blanket|scarf|hoodie|vest|apron|sleeve|pocket|zipper|button|buckle|lace|slipper|sandal|sneaker|boot|collar|hem|uniform|costume)\b/.test(t)) return 'clothes';
  if(/\b(bucket|broom|soap|sponge|lamp|candle|vase|frame|envelope|stamp|package|scissors|glue|tape|crayon|chalk|eraser|ruler|thermometer|battery|switch|drawer|shelf|closet|curtain|rug|pillow|towel)\b/.test(t)) return 'household';
  if(/\b(barn|stable|cabin|cottage|castle|tower|bridge|tunnel|harbor|island|forest|meadow|pond|stream|cliff|cave|desert|jungle|swamp|valley)\b/.test(t)) return 'places';
  if(/\b(storm|thunder|lightning|rainbow|breeze|frost|icicle|puddle|mud|dust|dew|fog|hail|blizzard|drought|flood)\b/.test(t)) return 'weather';
  if(/\b(petal|stem|root|thorn|vine|moss|acorn|pinecone|seed|bloom|sprout|wilt)\b/.test(t)) return 'plants';
  if(/\b(crawl|leap|skip|stomp|tiptoe|march|dash|chase|grab|toss|catch|squeeze|stretch|bend|twist|shake|stir|pour|spill|drip|splash|float|sink|melt|freeze|peel|chop|grate|spread|sprinkle|scoop|whisper|shout|giggle|howl|roar|hum|clap|wave|nod|peek|stare|glance|search|discover|notice|wonder|imagine|pretend|promise|remind|forget|belong|share|trade|borrow|lend|gather|collect|stack|wrap|unwrap|tug|drag|shove|tuck|hang|fasten|attach|repair|create|design|measure|weigh|count|sort|match|deliver|fetch|vanish)\b/.test(t)) return 'actions';
  if(/\b(tiny|huge|enormous|narrow|wide|steep|shallow|deep|thick|thin|smooth|rough|sharp|dull|shiny|damp|soaking|dry|sticky|slimy|fluffy|fuzzy|cozy|chilly|freezing|boiling|warm|fierce|gentle|brave|shy|proud|curious|grumpy|cheerful|lonely|calm|wild|tame|plain|fancy|ripe|rotten|fresh|stale|bitter|sour|salty|juicy|crunchy|creamy|silent|loud|hollow|solid|loose|tight|crooked|straight|crowded|empty|whole|spare|certain|strange|wonderful|terrible|perfect|ugly|beautiful|clever|foolish|greedy|generous|patient|stubborn|lazy|busy|clumsy|graceful|excited|nervous|frightened|surprised|confused|disappointed|frustrated|jealous|embarrassed|worried|grateful|annoyed|bored|amazed|terrified|furious|miserable|relieved|peaceful|comfortable|uncomfortable|exhausted|delighted|gloomy|hopeful|cranky|content|eager|homesick|ashamed)\b/.test(t)) return 'describing';
  if(/\b(before|after|next|then|finally|meanwhile|soon|later|early|late|beginning|middle|ending|moment|sudden|recent|daily|weekly|whenever|once|twice|often|nowadays|dozen|half|pair|entire|double|single|plenty|several|few|many|none|bunch|pile|heap|piece|portion|amount|total|extra|enough|less|more|quarter|equal|average)\b/.test(t)) return 'time_quantity';
  if(/\b(princess|knight|wizard|giant|dwarf|monster|dragon|fairy|shield|sword|wand|throne|crown|legend|tale|riddle|poem|author|chapter|title|character|treasure|adventure|journey)\b/.test(t)) return 'story';
  if(/\b(passenger|neighbor|stranger|parade|audience|crew|coach|chef|mayor|inventor)\b/.test(t)) return 'people';
  return 'other';
}

// Build indices by category
const byCat = new Map();
bank.forEach((e, i)=>{
  const c = category(e);
  if(!byCat.has(c)) byCat.set(c, []);
  byCat.get(c).push(i);
});

function pickDistractors(i){
  const c = category(bank[i]);
  const idxs = byCat.get(c) || [];
  const pos = idxs.indexOf(i);
  const picks = [];
  // pick near neighbors in category list
  for(let step=1; picks.length<3 && step<50; step++){
    const left = idxs[pos-step];
    const right = idxs[pos+step];
    if(left!==undefined) picks.push(left);
    if(picks.length>=3) break;
    if(right!==undefined) picks.push(right);
  }
  // fallback: global neighbors
  for(let step=1; picks.length<3 && step<50; step++){
    const left = i-step;
    const right = i+step;
    if(left>=0) picks.push(left);
    if(picks.length>=3) break;
    if(right<bank.length) picks.push(right);
  }
  return picks.slice(0,3).map(j=>bank[j].word);
}

function signatureTokens(candidate){
  const w = (candidate.word||'').toLowerCase();
  const defTokens = tokenize(candidate.definition);
  const exNoWord = (candidate.example||'').toLowerCase().replaceAll(w, '_____');
  const exTokens = tokenize(exNoWord);
  return new Set([...defTokens, ...exTokens]);
}

function overlapScore(exampleTokens, candidate){
  const sig = signatureTokens(candidate);
  let s = 0;
  for(const t of exampleTokens){
    if(sig.has(t)) s++;
  }
  return s;
}

function l6(entry, i){
  const exNoTarget = (entry.example||'').toLowerCase().replaceAll(entry.word.toLowerCase(), '_____');
  const exTokens = tokenize(exNoTarget);
  const distractWords = pickDistractors(i);
  const options = [entry.word, ...distractWords];
  const scored = options.map(w=>{
    const cand = bank.find(x=>x.word===w);
    return {w, s: overlapScore(exTokens, cand||{word:w,definition:''})};
  });
  scored.sort((a,b)=>b.s-a.s);
  const top = scored[0];
  const second = scored[1];
  const targetScore = scored.find(x=>x.w===entry.word)?.s ?? 0;
  const unique = (top.w===entry.word) && ((top.s >= (second.s + 2) && top.s>=2) || top.s>=3);
  if(unique){
    return {verdict:'唯一', why:`线索够(分数${targetScore}领先)` , options};
  }
  // If target not top, or margin small
  const why = (top.w!==entry.word)
    ? `例句线索更像“${top.w}”(分数${targetScore}<=${top.s})`
    : `线索不够独特(分数${targetScore}接近${second.s})`;
  return {verdict:'不唯一', why, options};
}

function l7(entry){
  const w = entry.word.toLowerCase();
  if(sensitiveWords.has(w)){
    if(['sword','shield','trap'].includes(w)) return {verdict:'注意', why:'涉及武器/捕捉，家长可能偏敏感；建议强调故事/安全'};
    if(['wizard','fairy','dragon','monster','wand','magic'].includes(w)) return {verdict:'注意', why:'魔法/怪物题材少数家长介意；可保留但避免恐怖表述'};
    return {verdict:'注意', why:'题材可能触发部分家长偏好'};
  }
  if(w==='stranger') return {verdict:'OK', why:'安全教育用词，语气合适'};
  if(w==='ashamed') return {verdict:'注意', why:'例句“lied to mom”可能引发家长情绪；可换更轻的错误场景'};
  return {verdict:'OK', why:'无明显文化冲突'};
}

function l8(entry){
  const w = entry.word.toLowerCase();
  const d = difficulty(entry);
  if(grammarHeavy.has(w) || ['throughout','meanwhile','nowadays','portion','average','audience','inventor','thermometer','drought','blizzard','enormous','gigantic'].includes(w) || d.score>=4){
    return {verdict:'偏难', why:'抽象/学科词/语法功能词，建议后移或给更多支架(图片+对比)'};
  }
  if(d.score<=1) return {verdict:'合适', why:'高频具体、可图像化'};
  return {verdict:'合适', why:'略有挑战但可通过例句+图片掌握'};
}

function fmtLine(entry, i){
  const r5 = l5(entry);
  const r6 = l6(entry, i);
  const r7 = l7(entry);
  const r8 = l8(entry);
  const opt = r6.options.map(x=>x).join('/');
  return `${entry.word} — L5:${r5.verdict}(${r5.why}) | L6:${r6.verdict}(${r6.why}; 选项:${opt}) | L7:${r7.verdict}(${r7.why}) | L8:${r8.verdict}(${r8.why})`;
}

const outName = `VERIFY-GPT-${path.basename(targetFile)}-GATE.md`;
const header = `# GPT Gate Review: ${targetFile}\n\n说明：逐词 L5-L8 专项审校；每词一行。\n`;
const lines = bank.map((e,i)=>fmtLine(e,i));
fs.writeFileSync(path.join(__dirname, outName), header + lines.join('\n') + '\n', 'utf8');
console.log('Wrote', outName, 'lines:', lines.length);
