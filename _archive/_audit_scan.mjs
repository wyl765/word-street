import fs from 'fs';

const files = process.argv.slice(2);
function parseFile(path){
  const lines = fs.readFileSync(path,'utf8').split(/\n/);
  const items=[];
  for (let i=0;i<lines.length;i++){
    const raw=lines[i].trim();
    if(!raw.startsWith('{"word"')) continue;
    let s=raw;
    if(s.endsWith('];')) s=s.slice(0,-2);
    if(s.endsWith('],')) s=s.slice(0,-2);
    if(s.endsWith(',')) s=s.slice(0,-1);
    try{
      const obj=JSON.parse(s);
      items.push({line:i+1,...obj});
    }catch(e){
      // ignore
    }
  }
  return items;
}

function scoreAdvanced(word){
  // crude heuristic: long/abstract morphology
  const w = word.toLowerCase();
  let score = 0;
  if(w.length>=9) score+=1;
  if(/(tion|sion|ment|ence|ance|ality|ivity|ology|archy|phobia|phile|metry|thesis|ic(al)?|ive|ize|ify|ous|ate|ent)$/.test(w)) score+=2;
  if(/^(co|con|com|de|dis|in|im|inter|pre|pro|re|sub|trans|uni|multi)/.test(w) && w.length>=8) score+=1;
  if(['empirical','hierarchy','hypothesis','ideology','implication','incentive','incorporate','inherent','inhibit','integral','intervene','invoke','levy','magnitude','manifest','extricate','verdant','capillary','brackish','concave','convex','botany','criteria','consolidate','contemplate','contradict','controversy','coincide','compensate','compile','constraint','currency','deficiency','denote','derive','deviate','domain','explicit','facilitate','finite','fluctuate','framework','furthermore','ambiguous','allocate','advocate'].includes(w)) score+=4;
  return score;
}

function flags(item){
  const f=[];
  const w=item.word||'';
  const ex=item.example||'';
  const def=item.definition||'';
  const kw=item.imageKeyword||'';
  const lcEx=ex.toLowerCase();
  const lcW=w.toLowerCase();
  if(lcW && !lcEx.includes(lcW)){
    // allow simple inflections by checking stem prefix
    if(!(lcW.length>4 && lcEx.includes(lcW.slice(0,-1)))) f.push('example_missing_word');
  }
  if(/\bAI\b|C\+\+|semicolon|stock prices|investor|neural network|model\b/.test(ex)) f.push('example_too_technical');
  if(/\bpolitical\b|party\b|government\b/.test(ex) && w.length>7) f.push('example_civics');
  if(def.split(/\s+/).length>12) f.push('definition_long');
  if(scoreAdvanced(w)>=5) f.push('word_probably_too_advanced');
  if(kw && /energy/.test(kw) && /generate/.test(w.toLowerCase())===false) f.push('image_kw_suspicious');
  return f;
}

for(const file of files){
  const items=parseFile(file);
  const out=[];
  for(const it of items){
    const fl=flags(it);
    if(fl.length) out.push({file,line:it.line,word:it.word,flags:fl.join(',')});
  }
  out.sort((a,b)=>a.line-b.line);
  console.log('\n#',file);
  for(const r of out.slice(0,120)){
    console.log(`${r.line}\t${r.word}\t${r.flags}`);
  }
  if(out.length>120) console.log(`... (${out.length-120} more flagged)`);
}
