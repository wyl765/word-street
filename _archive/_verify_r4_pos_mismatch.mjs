import fs from 'fs';
import vm from 'vm';
import path from 'path';

const ROOT='/Users/percy/.openclaw/workspace/projects/word-street';
const files=['words-level1.js','words-level2.js','words-level2a.js','words-level2b.js','words-level2c.js','words-level2d.js'];

function loadBank(file){
  let code=fs.readFileSync(path.join(ROOT,file),'utf8');
  code=code.replace(/^\s*const\s+([A-Z0-9_]+BANK)\s*=/m,'globalThis.$1=');
  const ctx={};
  vm.createContext(ctx);
  vm.runInContext(code, ctx);
  const bankVar=Object.keys(ctx).find(k=>/BANK$/.test(k));
  return ctx[bankVar];
}

function escapeRegExp(s){return s.replace(/[.*+?^${}()|[\\]\\]/g,'\\$&');}

const results=[];
for(const f of files){
  const bank=loadBank(f);
  for(const item of bank){
    const word=String(item.word).trim();
    const def=String(item.definition||'').trim();
    const ex=String(item.example||'').trim();
    if(!word||!def||!ex) continue;
    const defIsVerb=/^to\s+/i.test(def);
    // noun-ish usage: "a/an/the + word"; verb-ish usage: "to + word" or "word(s/ed/ing)" after subject pronoun
    const base=escapeRegExp(word.toLowerCase());
    const nounUse=new RegExp(`\\b(a|an|the)\\s+${base}\\b`,'i').test(ex);
    const verbUse=new RegExp(`\\b(i|you|we|they|he|she|it)\\s+${base}(s|ed|ing)?\\b`,'i').test(ex);
    // if def says verb but example uses noun (article before it) and not verb use -> flag
    if(defIsVerb && nounUse && !verbUse){
      results.push({file:f, word, def, ex, issue:'definition looks like VERB but example uses NOUN'});
    }
    // if def does NOT start with to (so likely noun/adj) but example uses verb form
    if(!defIsVerb && verbUse && !nounUse && !word.includes(' ')){
      // avoid common adjective predicates "is happy" etc where verbUse might match; still useful
      results.push({file:f, word, def, ex, issue:'definition looks like NON-VERB but example uses VERB'});
    }
  }
}

fs.writeFileSync(path.join(ROOT,'_verify_r4_pos_mismatch.json'), JSON.stringify(results,null,2));
console.log('pos-mismatch candidates', results.length);
console.log(results.slice(0,20));
