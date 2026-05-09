const fs = require('fs');
const vm = require('vm');

function loadWords(path) {
  const content = fs.readFileSync(path, 'utf8');
  // Simple extraction assuming it's a module exporting an array or declaring a const array
  const match = content.match(/const\s+\w+\s*=\s*(\[\s*\{[\s\S]*\}\s*\]);/);
  if (match) {
    return eval(match[1]);
  }
  return [];
}

const level1 = loadWords('/Users/percy/.openclaw/workspace/projects/word-street/words-level1.js');
const level2 = loadWords('/Users/percy/.openclaw/workspace/projects/word-street/words-level2.js');

const allWords = [...level1, ...level2];

// Simple readability check: look for words in definitions that might be too hard for MAP 197 (2nd grade)
// List of potentially hard words (this is a heuristic, real check needs AI evaluation)
const hardWords = [
  'especially', 'creature', 'hollow', 'protect', 'bristles', 'temperature', 
  'valley', 'arc', 'pointed', 'fungus', 'structure', 'instrument', 'liquid',
  'transparent', 'solid', 'surface', 'material', 'equipment', 'appliance'
];

const issues = [];

allWords.forEach(w => {
  if (!w.definition) return;
  const defWords = w.definition.toLowerCase().replace(/[.,]/g, '').split(' ');
  
  // Check for hard words in definition
  const foundHardWords = defWords.filter(dw => hardWords.includes(dw));
  if (foundHardWords.length > 0) {
    issues.push({
      word: w.word,
      level: w.level,
      definition: w.definition,
      issue: `Contains potentially hard word(s): ${foundHardWords.join(', ')}`,
      type: 'hard_definition'
    });
  }
});

console.log(JSON.stringify(issues, null, 2));
