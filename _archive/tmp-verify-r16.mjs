import fs from 'node:fs';
import path from 'node:path';

function loadBank(file){
  const src = fs.readFileSync(file,'utf8');
  const start = src.indexOf('[');
  const end = src.lastIndexOf(']');
  if(start<0||end<0||end<=start) throw new Error(`Cannot find array brackets in ${file}`);
  const jsonText = src.slice(start, end+1);
  let arr;
  try{
    arr = JSON.parse(jsonText);
  } catch(e){
    // try to remove trailing commas before ]
    const fixed = jsonText.replace(/,\s*]/g,']');
    arr = JSON.parse(fixed);
  }
  return arr;
}

function wordsIn(text){
  return (text.toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) ?? []);
}

const HARD_WORDS = new Set([
  'extremely','curved','contest','halfway','however','therefore','gradually','immediately','occasionally','frequently',
  'ancient','modern','brilliant','fragile','sturdy','citizen','government','election','continent','paragraph','nonfiction',
  'mammal','reptile','habitat','climate','energy','force','magnet','model','official','compare','comparison','percent',
  'practice','machine','protect','dragon','wizard','knight','armor','audience'
]);

const BANNED_SAFETY = [
  /\bblood\b/i,/\bgore\b/i,/\bsex\b/i,/\bnude\b/i,/\bweapon\b/i,/\bgun\b/i,/\bshoot\b/i,/\bkill\b/i,/\bstab\b/i
];

function analyzeItem(item, bankWordsSet){
  const issues=[];
  const {word, definition, example, imageKeyword} = item;
  if(!word || !definition || !example || !imageKeyword){
    issues.push({severity:'CRITICAL', type:'missing-field', note:`Missing one of word/definition/example/imageKeyword`});
    return issues;
  }

  for(const re of BANNED_SAFETY){
    if(re.test(definition) || re.test(example) || re.test(imageKeyword)){
      issues.push({severity:'CRITICAL', type:'safety-banned', note:`Contains banned/safety-sensitive term matching ${re}`});
      break;
    }
  }

  // multi-sense patterns
  if(/\bor to\b/i.test(definition)) issues.push({severity:'HIGH', type:'multi-sense', note:`Definition uses 'or to' (usually multiple senses)`});
  if(/\bmeans\s+'[^']+'\s+or\s+'[^']+'/i.test(definition) || /\bmeans\s+"[^"]+"\s+or\s+"[^"]+"/i.test(definition)){
    issues.push({severity:'HIGH', type:'multi-sense', note:`Definition gives two paraphrases with 'means "..." or "..."'`});
  }
  // “a/an ... or ...”
  if(/\b(a|an)\s+[^.]{0,50}\s+or\s+[^.]{0,50}/i.test(definition)){
    // allow color lists etc; still flag low-confidence
    issues.push({severity:'MEDIUM', type:'or-definition', note:`Definition includes 'a/an ... or ...' (often two different senses/categories)`});
  }

  if(/^like\b/i.test(definition.trim())) issues.push({severity:'MEDIUM', type:'vague-like', note:`Definition starts with 'like ...' (vague; relies on knowing another word)`});
  if(/\bsomething\b/i.test(definition) && definition.length < 25) issues.push({severity:'MEDIUM', type:'too-vague', note:`Very short 'something ...' style definition`});

  // definition harder than target: contains many words not in bank (rough) + hardword list
  const defWords = wordsIn(definition);
  const hardHits = defWords.filter(w=>HARD_WORDS.has(w));
  if(hardHits.length>=1) issues.push({severity:'MEDIUM', type:'hard-words-in-definition', note:`Definition contains potentially hard word(s): ${[...new Set(hardHits)].join(', ')}`});

  // Example contains hard content / too advanced: 'code', 'worksheet', etc.
  if(/\bcode\b/i.test(example)) issues.push({severity:'MEDIUM', type:'example-too-modern', note:`Example uses 'code' (may be too advanced/too specific)`});

  // image keyword generic
  if(imageKeyword.trim().length <= 4) issues.push({severity:'LOW', type:'imagekeyword-too-short', note:`imageKeyword very short/generic`});
  if(/\b(cartoon|clipart|fantasy)\b/i.test(imageKeyword)) issues.push({severity:'LOW', type:'imagekeyword-style', note:`imageKeyword includes style word (cartoon/fantasy). Might reduce search precision.`});

  // Example not containing target word (for inflections allow)
  const w = word.toLowerCase();
  const exLower = example.toLowerCase();
  if(!exLower.includes(w)){
    // allow multiword entries like 'main idea'
    const tokens = w.split(/\s+/);
    const ok = tokens.every(t => exLower.includes(t));
    if(!ok){
      issues.push({severity:'HIGH', type:'example-missing-word', note:`Example does not include the exact word/phrase`});
    }
  }

  // word appears in its own definition (circular)
  if(new RegExp(`\\b${w.replace(/[.*+?^${}()|[\\]\\]/g,'\\\\$&')}\\b`,'i').test(definition)){
    issues.push({severity:'MEDIUM', type:'circular', note:`Definition contains the target word`});
  }

  // overly long definition (may pack multiple ideas)
  if(definition.length > 80) issues.push({severity:'MEDIUM', type:'definition-too-long', note:`Definition is long (${definition.length} chars); may include extra clauses`});

  return issues;
}

function analyzeBank(arr){
  const bankWordsSet = new Set(arr.map(x=>String(x.word||'').toLowerCase()));
  const issuesByWord = [];
  const wordSeen = new Map();
  for(const item of arr){
    const w = String(item.word||'');
    if(wordSeen.has(w)){
      issuesByWord.push({word:w, severity:'CRITICAL', type:'duplicate-word', note:`Duplicate entry (previous index ${wordSeen.get(w)})`});
    } else {
      wordSeen.set(w, issuesByWord.length);
    }
    const issues = analyzeItem(item, bankWordsSet);
    for(const iss of issues){
      issuesByWord.push({word:w, ...iss, definition:item.definition, example:item.example, imageKeyword:item.imageKeyword});
    }
  }
  return issuesByWord;
}

const level1File = process.argv[2] ?? '/Users/percy/.openclaw/workspace/projects/word-street/words-level1.js';
const level2File = process.argv[3] ?? '/Users/percy/.openclaw/workspace/projects/word-street/words-level2.js';

const l1 = loadBank(level1File);
const l2 = loadBank(level2File);

console.log(JSON.stringify({counts:{level1:l1.length, level2:l2.length, total:l1.length+l2.length}}, null, 2));

const issues = [
  ...analyzeBank(l1).map(x=>({...x, level:1})),
  ...analyzeBank(l2).map(x=>({...x, level:2})),
];

// sort by severity
const sevRank = {CRITICAL:0,HIGH:1,MEDIUM:2,LOW:3};
issues.sort((a,b)=>sevRank[a.severity]-sevRank[b.severity] || a.level-b.level || a.word.localeCompare(b.word));

fs.writeFileSync('/Users/percy/.openclaw/workspace/projects/word-street/tmp-issues-r16.json', JSON.stringify(issues,null,2));
console.error(`Wrote ${issues.length} issues to tmp-issues-r16.json`);
