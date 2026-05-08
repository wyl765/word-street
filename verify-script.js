const fs = require('fs');
const path = require('path');

const files = [
  'words-level1.js',
  'words-level2.js',
  'words-level2a.js',
  'words-level2b.js',
  'words-level2c.js',
  'words-level2d.js'
];

const adultKeywords = ['tax', 'bank', 'murder', 'blood', 'kill', 'death', 'weapon', 'gun', 'knife', 'prison', 'jail', 'arrest', 'crime', 'debt', 'finance', 'invest', 'stock', 'market', 'politics', 'vote', 'election', 'court', 'lawyer', 'judge', 'sue', 'divorce', 'marriage', 'pregnant', 'sex', 'drug', 'alcohol', 'beer', 'wine', 'smoke', 'cigarette', 'cigar', 'cancer', 'disease', 'hospital', 'surgery', 'doctor', 'nurse', 'medicine', 'pill', 'pain', 'hurt', 'wound', 'injury', 'bleed'];
const hardWords = ['utilize', 'facilitate', 'implement', 'subsequent', 'consequently', 'furthermore', 'nevertheless', 'moreover', 'adequate', 'sufficient', 'evaluate', 'assess', 'analyze', 'indicate', 'demonstrate', 'illustrate', 'reveal', 'imply', 'suggest', 'propose', 'advocate', 'assert', 'claim', 'argue', 'contend', 'maintain', 'declare', 'state', 'mention', 'note', 'observe', 'point out', 'emphasize', 'highlight', 'stress', 'underline', 'underscore', 'focus on', 'concentrate on', 'pay attention to']; // just a small list of formal words

const issues = [];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;
  
  const content = fs.readFileSync(filePath, 'utf8');
  // Hacky way to extract the array, assuming it's `const words = [...]` or `export const ...`
  let match = content.match(/\[([\s\S]*?)\];/);
  if (!match) return;
  
  try {
    // using eval to parse the JS array object format
    const code = content.replace(/^(export )?const \w+\s*=\s*/, 'module.exports = ');
    fs.writeFileSync(path.join(__dirname, 'temp-' + file), code);
    const words = require('./temp-' + file);
    fs.unlinkSync(path.join(__dirname, 'temp-' + file));
    
    words.forEach(w => {
      const word = w.word;
      const def = w.en;
      const ex = w.example;
      const ik = w.imageKeyword || '';
      
      // 1. Definition too complex?
      // 2. Sentence too long?
      if (ex && ex.split(' ').length > 12) {
         issues.push({ level: 'MINOR', file, word, issue: '例句太长 (' + ex.split(' ').length + ' 词)', reason: ex });
      }
      
      // 3 & 4. Content safety
      adultKeywords.forEach(k => {
        if (ex && ex.toLowerCase().includes(k)) {
          issues.push({ level: 'MAJOR', file, word, issue: '例句包含成人/敏感词汇 (' + k + ')', reason: ex });
        }
        if (def && def.toLowerCase().includes(k)) {
          issues.push({ level: 'MAJOR', file, word, issue: '定义包含成人/敏感词汇 (' + k + ')', reason: def });
        }
        if (ik && ik.toLowerCase().includes(k)) {
          issues.push({ level: 'CRITICAL', file, word, issue: 'imageKeyword 包含敏感词 (' + k + ')', reason: ik });
        }
      });
      
      hardWords.forEach(k => {
        if (def && def.toLowerCase().includes(k)) {
          issues.push({ level: 'MAJOR', file, word, issue: '定义使用了复杂词汇 (' + k + ')', reason: def });
        }
      });
      
    });
  } catch (e) {
    console.error('Error parsing', file, e);
  }
});

console.log(JSON.stringify(issues, null, 2));
