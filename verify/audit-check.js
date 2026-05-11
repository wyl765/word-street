const fs = require('fs');
const files = ['words-level4b.js','words-level4c.js','words-level5a.js','words-level5b.js','words-level5c.js','words-level5d.js'];
let allWords = [];
files.forEach(f => {
  const content = fs.readFileSync(f,'utf8');
  const m = content.match(/\[(\{.*\})\]/s);
  if(m) {
    const arr = JSON.parse('[' + m[1] + ']');
    arr.forEach(w => { w._file = f; allWords.push(w); });
  }
});

// Comprehensive checks
const suspects = [];
allWords.forEach((w,i) => {
  const def = w.definition || '';
  const ex = w.example || '';
  const word = w.word || '';
  const issues = [];
  
  // Garble patterns
  if (/how someone acts/i.test(def)) issues.push('GARBLE:how someone acts');
  if (/from the people in charge/i.test(def)) issues.push('GARBLE:from the people in charge');
  if (/what you can do/i.test(def)) issues.push('GARBLE:what you can do');
  if (/what happens when/i.test(def)) issues.push('GARBLE:what happens when');
  if (/when someone does/i.test(def)) issues.push('GARBLE:when someone does');
  if (/the way someone/i.test(def)) issues.push('GARBLE:the way someone');
  if (/how you feel/i.test(def)) issues.push('GARBLE:how you feel');
  
  // Double words
  if (/\b(\w+)\s+\1\b/i.test(def)) issues.push('DOUBLE_WORD in def');
  if (/\b(\w+)\s+\1\b/i.test(ex)) issues.push('DOUBLE_WORD in ex');
  
  // Ex starts lowercase
  if (ex.length > 0 && /^[a-z]/.test(ex)) issues.push('ex starts lowercase');
  
  // Def starts uppercase
  if (def.length > 0 && /^[A-Z]/.test(def)) issues.push('def starts uppercase');
  
  // Repeated article
  if (/\b(a|an|the)\s+\1\b/i.test(def) || /\b(a|an|the)\s+\1\b/i.test(ex)) issues.push('repeated article');
  
  // Very short def
  if (def.split(' ').length < 3) issues.push('def very short');
  
  // Example no terminal punctuation
  const lastChar = ex.trim().slice(-1);
  if (lastChar && !/[.!?"'\u2019\u201D]/.test(lastChar)) issues.push('ex no terminal punct');
  
  // Word not in example (with inflections)
  const wordLower = word.toLowerCase();
  const exLower = ex.toLowerCase();
  const inflections = [wordLower, wordLower+'s', wordLower+'ed', wordLower+'ing', wordLower+'es', wordLower+'d'];
  if (wordLower.endsWith('e')) {
    inflections.push(wordLower.slice(0,-1)+'ing', wordLower+'d');
  }
  if (wordLower.endsWith('y')) {
    inflections.push(wordLower.slice(0,-1)+'ies', wordLower.slice(0,-1)+'ied');
  }
  const lc = wordLower[wordLower.length-1];
  if ('bcdfglmnprst'.includes(lc)) {
    inflections.push(wordLower+lc+'ed', wordLower+lc+'ing');
  }
  let found = false;
  for (const inf of inflections) {
    if (exLower.includes(inf)) { found = true; break; }
  }
  if (!found) issues.push('WORD_MISSING_FROM_EX');
  
  if (issues.length > 0) suspects.push({i: i+1, word, file: w._file.replace('words-','').replace('.js',''), issues});
});

console.log('Suspects found: ' + suspects.length);
suspects.forEach(s => console.log(s.i + ' | ' + s.file + ' | ' + s.word + ' | ' + s.issues.join('; ')));
