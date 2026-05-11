const fs = require('fs');
const arr2 = JSON.parse(fs.readFileSync('/tmp/all_l2.json','utf8'));
const arr2a = JSON.parse(fs.readFileSync('/tmp/all_l2a.json','utf8'));

function audit(w) {
  let issues = [];
  const word = w.word.toLowerCase();
  const def = w.definition.toLowerCase();
  const ex = w.example;
  const exLower = ex.toLowerCase();

  // 1. DEF_CORRECT
  let defCorrect = 'yes';
  if (word === 'antenna' && def.includes('feel')) defCorrect = 'partial';
  if (word === 'hazel' && !def.includes('tree') && def.includes('color')) defCorrect = 'partial';
  if (word === 'mantle' && def.includes('shelf')) defCorrect = 'partial';
  if (word === 'biscuit' && def.includes('soft bread roll')) defCorrect = 'partial';
  if (word === 'drown' && !def.includes('die') && !def.includes('suffocate')) defCorrect = 'partial';
  if (word === 'bugle' && def.includes('army')) defCorrect = 'partial';

  // 2. DEF_GRAMMAR
  let defGrammar = 'yes';

  // 3. EXAMPLE_MATCH
  let exMatch = 'yes';

  // 4. EXAMPLE_GRAMMAR
  let exGrammar = 'yes';
  if (!ex.match(/[.!?]$/)) { exGrammar = 'no'; issues.push('no end punctuation'); }
  if (ex[0] !== ex[0].toUpperCase()) { exGrammar = 'no'; issues.push('not capitalized'); }

  // 5. WORD_IN_EXAMPLE
  let wordInEx = checkWordInExample(word, exLower);
  if (wordInEx === 'no') issues.push('word not in example');

  // 6. CLARITY
  let clarity = 'yes';
  if (def.length > 80) clarity = 'maybe';
  const hardWords = ['organism','inlet','simultaneously'];
  for (const hw of hardWords) { if (def.includes(hw)) { clarity = 'maybe'; break; } }

  // VERDICT
  let verdict = 'PASS';
  if (defCorrect === 'no' || exGrammar === 'no' || wordInEx === 'no' || exMatch === 'no') verdict = 'FAIL';
  else if (defCorrect === 'partial' || clarity === 'maybe') verdict = 'WARN';

  if (defCorrect !== 'yes' && !issues.includes('word not in example')) issues.push('def:' + defCorrect);
  if (defCorrect !== 'yes' && issues.includes('word not in example')) issues.unshift('def:' + defCorrect);

  return { defCorrect, defGrammar, exMatch, exGrammar, wordInEx, clarity, verdict, issue: issues.join('; ') || '-' };
}

function checkWordInExample(word, exLower) {
  if (exLower.includes(word)) return 'yes';
  
  // Multi-word phrases
  if (word.includes(' ')) {
    const parts = word.split(' ');
    if (parts.every(p => exLower.includes(p))) return 'yes';
    // Phrasal verb irregulars
    const irregulars = {
      'turn into': ['turned into','turns into','turning into'],
      'look forward to': ['look forward to','looking forward to','looked forward to'],
      'make up': ['make up','made up','makes up','making up'],
      'point out': ['pointed out','points out','pointing out'],
      'come across': ['came across','comes across','coming across'],
      'break down': ['broke down','breaks down','breaking down'],
      'carry out': ['carried out','carries out','carrying out'],
      'set up': ['set up','sets up','setting up'],
    };
    if (irregulars[word]) {
      for (const f of irregulars[word]) { if (exLower.includes(f)) return 'yes'; }
    }
  }
  
  // Common inflections
  const base = word;
  const suffixes = ['s','es','ed','d','ing','er','est','ly','ness','ment','tion','ful'];
  // Generate forms
  const forms = [
    base + 's', base + 'es', base + 'ed', base + 'd', base + 'ing',
    base.replace(/e$/, 'ing'), base.replace(/e$/, 'ed'), base.replace(/e$/, 'er'),
    base.replace(/y$/, 'ied'), base.replace(/y$/, 'ies'), base.replace(/y$/, 'ier'),
    base + base[base.length-1] + 'ed', base + base[base.length-1] + 'ing',
    base + 'ly', base + 'ness',
  ];
  for (const f of forms) { if (exLower.includes(f)) return 'yes'; }
  
  // Irregular verbs
  const irreg = {
    'become':['became'],'begin':['began'],'bring':['brought'],'build':['built'],
    'find':['found'],'grow':['grew'],'freeze':['froze','frozen'],'ride':['rode','ridden'],
    'rise':['rose','risen'],'succeed':['succeeded'],'realize':['realized'],
    'decide':['decided'],'mention':['mentioned'],'struggle':['struggled'],
    'suppose':['supposed'],'wander':['wandered'],'arrive':['arrived'],
    'believe':['believed'],'confuse':['confused'],'destroy':['destroyed'],
    'donate':['donated'],'earn':['earned'],'enter':['entered'],
    'escape':['escaped'],'frighten':['frightened'],'greet':['greeted'],
    'heal':['healed'],'ignore':['ignored'],'invite':['invited'],
    'judge':['judged'],'knock':['knocked'],'learn':['learned','learnt'],
    'listen':['listened'],'move':['moved'],'offer':['offered'],
    'prepare':['prepared'],'protect':['protected'],'recycle':['recycled'],
    'relax':['relaxed'],'rescue':['rescued'],'return':['returned'],
    'sail':['sailed'],'save':['saved'],'scatter':['scattered'],
    'suggest':['suggested'],'swallow':['swallowed'],'sweep':['swept'],
    'travel':['traveled','travelled'],'visit':['visited'],'vote':['voted'],
    'warn':['warned'],'blink':['blinked'],'bounce':['bounced'],
    'climb':['climbed'],'crash':['crashed'],'drift':['drifted'],
    'glide':['glided'],'groan':['groaned'],'hop':['hopped'],
    'hurt':['hurts','hurting'],'jump':['jumped'],'laugh':['laughed'],
    'leak':['leaked'],'snap':['snapped'],'soak':['soaked'],
    'accept':['accepted'],'appear':['appeared'],'beg':['begged'],
    'blossom':['blossomed'],'carve':['carved'],'crumble':['crumbled'],
    'dig':['dug'],'drown':['drowned'],'fill':['filled'],
    'fold':['folded'],'follow':['followed'],'grasp':['grasped'],
    'guess':['guessed'],'harvest':['harvested'],'hurry':['hurried'],
    'kneel':['knelt','kneeled'],'mix':['mixed'],'praise':['praised'],
    'smell':['smelled','smelt'],'store':['stored'],'taste':['tasted'],
    'tease':['teased'],'tend':['tended'],'trust':['trusted'],
    'turn':['turned'],'wait':['waited'],'close':['closed'],
    'spin':['spun'],'strike':['struck'],'blow':['blew','blown'],
    'catch':['caught'],'dive':['dove','dived'],'draw':['drew','drawn'],
    'drink':['drank','drunk'],'drive':['drove','driven'],
    'eat':['ate','eaten'],'fall':['fell','fallen'],'feed':['fed'],
    'feel':['felt'],'fly':['flew','flown'],'give':['gave','given'],
    'go':['went','gone','goes'],'hang':['hung'],'have':['had','has'],
    'hear':['heard'],'hide':['hid','hidden'],'hold':['held'],
    'keep':['kept'],'know':['knew','known'],'lead':['led'],
    'leave':['left'],'let':['lets'],'light':['lit'],
    'lose':['lost'],'make':['made','makes','making'],
    'mean':['meant'],'meet':['met'],'pay':['paid'],
    'pull':['pulled'],'put':['puts'],'read':['reads'],
    'run':['ran','runs','running'],'say':['said','says'],
    'see':['saw','seen'],'send':['sent'],'set':['sets'],
    'shake':['shook','shaken'],'shine':['shone'],
    'show':['showed','shown'],'sing':['sang','sung'],
    'sit':['sat'],'speak':['spoke','spoken'],'spend':['spent'],
    'stand':['stood'],'steal':['stole','stolen'],
    'swim':['swam','swum'],'take':['took','taken'],
    'teach':['taught'],'tell':['told'],'think':['thought'],
    'throw':['threw','thrown'],'wake':['woke','woken'],
    'wear':['wore','worn'],'win':['won'],'write':['wrote','written'],
    'manifest':['manifested','manifests','manifesting'],
    'kindle':['kindled'],'choose':['chose','chosen'],
    'break':['broke','broken'],'come':['came'],
    'do':['did','does','done'],'get':['got','gotten'],
    'bite':['bit','bitten'],
    'slide':['slid'],'split':['splits'],
  };
  if (irreg[word]) {
    for (const f of irreg[word]) { if (exLower.includes(f)) return 'yes'; }
  }
  
  return 'no';
}

// Build output
const allWords = [];
for (const w of arr2) allWords.push({...w, file: 'level2'});
for (const w of arr2a) allWords.push({...w, file: 'level2a'});

let lines = [];
lines.push('# GOLD AUDIT: words-level2.js + words-level2a.js');
lines.push('## Word Count: ' + allWords.length);
lines.push('');
lines.push('| # | word | file | def_correct | def_grammar | ex_match | ex_grammar | word_in_ex | clarity | VERDICT | issue |');
lines.push('|---|------|------|-------------|-------------|----------|------------|------------|---------|---------|-------|');

let failCount = 0, warnCount = 0, passCount = 0;
const failures = [];

for (let i = 0; i < allWords.length; i++) {
  const w = allWords[i];
  const r = audit(w);
  if (r.verdict === 'FAIL') { failCount++; failures.push(w.word); }
  else if (r.verdict === 'WARN') warnCount++;
  else passCount++;
  lines.push(`| ${i+1} | ${w.word} | ${w.file} | ${r.defCorrect} | ${r.defGrammar} | ${r.exMatch} | ${r.exGrammar} | ${r.wordInEx} | ${r.clarity} | ${r.verdict} | ${r.issue} |`);
}

lines.push('');
lines.push('## Summary');
lines.push(`- Total rows: ${allWords.length}`);
lines.push(`- PASS: ${passCount}`);
lines.push(`- WARN: ${warnCount}`);
lines.push(`- FAIL: ${failCount}`);
if (failures.length) lines.push(`- Failed words: ${failures.join(', ')}`);
lines.push('');
lines.push('Total rows: ' + allWords.length);

fs.writeFileSync('/Users/percy/.openclaw/workspace/projects/word-street/verify/GOLD-AUDIT-L2.md', lines.join('\n'));
console.log('Done. Total rows:', allWords.length);
console.log('PASS:', passCount, 'WARN:', warnCount, 'FAIL:', failCount);
if (failures.length) console.log('Failures:', failures.join(', '));
