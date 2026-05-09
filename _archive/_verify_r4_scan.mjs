import fs from 'fs';
import vm from 'vm';
import path from 'path';

const ROOT='/Users/percy/.openclaw/workspace/projects/word-street';
const files=['words-level1.js','words-level2.js','words-level2a.js','words-level2b.js','words-level2c.js','words-level2d.js'].map(f=>path.join(ROOT,f));

const riskyImageTerms=[
  'sex','sexy','nude','naked','porn','condom','lingerie','breast','bikini',
  'gun','pistol','rifle','shotgun','weapon','knife','blood','gore','corpse','dead body','murder','kill',
  'beer','wine','vodka','whiskey','cigarette','smoke','vape','drug','cocaine','heroin',
  'zombie','skull'
];

function norm(s){return String(s??'').trim();}
function escapeRegExp(s){return s.replace(/[.*+?^${}()|[\\]\\]/g,'\\$&');}

function containsWord(example, word){
  const w=word.toLowerCase();
  const e=example.toLowerCase();
  if (w.includes(' ')) return e.includes(w);
  const base=escapeRegExp(w);
  const patterns=[`\\b${base}\\b`,`\\b${base}s\\b`,`\\b${base}es\\b`,`\\b${base}ed\\b`,`\\b${base}ing\\b`];
  return patterns.some(p=>new RegExp(p,'i').test(example));
}

function exposeConstsToGlobal(code){
  // Replace only the first const assignment which defines the BANK.
  // Example: const LEVEL1_BANK=[...];
  return code.replace(/^\s*const\s+([A-Z0-9_]+BANK)\s*=/m,'globalThis.$1=');
}

function runFile(filePath){
  let code=fs.readFileSync(filePath,'utf8');
  code=exposeConstsToGlobal(code);

  const ctx={};
  vm.createContext(ctx);
  try{ vm.runInContext(code, ctx, {filename:path.basename(filePath)}); }
  catch(e){ return {filePath, error:`EVAL_FAIL: ${e.message}`}; }

  const bankVar=Object.keys(ctx).find(k=>/BANK$/.test(k));
  const bank=ctx[bankVar];
  if(!Array.isArray(bank)) return {filePath, error:`BANK_NOT_FOUND`};

  const flags=[];
  for(let i=0;i<bank.length;i++){
    const item=bank[i]||{};
    const word=norm(item.word);
    const def=norm(item.definition);
    const ex=norm(item.example);
    const img=norm(item.imageKeyword);

    if(!word) flags.push({severity:'CRITICAL',kind:'missing-word',idx:i});
    if(!def) flags.push({severity:'CRITICAL',kind:'missing-definition',word,idx:i});
    if(!ex) flags.push({severity:'MAJOR',kind:'missing-example',word,idx:i});
    if(!img) flags.push({severity:'MAJOR',kind:'missing-imageKeyword',word,idx:i});

    if(def && /\b(to|a|an|the|of|for|with|and|or)$/i.test(def)){
      flags.push({severity:'CRITICAL',kind:'definition-fragment',word,idx:i,def});
    }
    if(def && def.length<5){
      flags.push({severity:'MAJOR',kind:'definition-too-short',word,idx:i,def});
    }

    if(def && word && def.toLowerCase().includes(word.toLowerCase())){
      flags.push({severity:'MAJOR',kind:'definition-contains-headword',word,idx:i,def});
    }

    if(word && ex && !containsWord(ex,word)){
      flags.push({severity:'MAJOR',kind:'example-missing-word',word,idx:i,ex});
    }

    // Simple wrong-collocation seed list
    const collocBad=[
      ['paying focus','"pay attention"'],
      ['do a mistake','"make a mistake"'],
      ['strong rain','"heavy rain"'],
      ['make a photo','"take a photo"'],
    ];
    for(const [bad,fix] of collocBad){
      const re=new RegExp(`\\b${escapeRegExp(bad)}\\b`,'i');
      if(re.test(ex)||re.test(def)) flags.push({severity:'MAJOR',kind:'wrong-collocation',word,idx:i,bad,fix,ex,def});
    }

    if(img){
      const low=img.toLowerCase();
      const hit=riskyImageTerms.find(t=>low.includes(t));
      if(hit) flags.push({severity:'MAJOR',kind:'imageKeyword-risky-term',word,idx:i,img,term:hit});
    }

    if(def && /[.!?]$/.test(def)){
      flags.push({severity:'MINOR',kind:'definition-ends-with-punct',word,idx:i,def});
    }
  }
  return {filePath, bankVar, count:bank.length, flags};
}

const results=files.map(runFile);
fs.writeFileSync(path.join(ROOT,'_verify_r4_scan.json'),JSON.stringify(results,null,2));

for(const r of results){
  if(r.error){ console.log(path.basename(r.filePath), r.error); continue; }
  const by=r.flags.reduce((a,f)=>{a[f.severity]=(a[f.severity]||0)+1;return a;},{});
  console.log(path.basename(r.filePath), 'entries', r.count, 'flags', r.flags.length, by);
}
