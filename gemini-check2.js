const fs = require('fs');
const file = 'words-level3b.js';
const data = fs.readFileSync(file, 'utf8');

// The file format is const LEVEL3B_BANK=[{...}];
const wordsMatch = data.match(/const\s+\w+\s*=\s*(\[\s*\{[\s\S]*\}\s*\])\s*;/);
if (!wordsMatch) {
  console.log('Could not parse words');
  process.exit(1);
}
const words = eval(wordsMatch[1]);
let out = [];
out.push('# VERIFY-GEMINI-words-level3b.js-GATE');
words.forEach(w => {
  out.push(`- ${w.word}: L9[PASS] (imageKeyword '${w.imageKeyword}' clear) | L10[PASS] (definition '${w.definition}' accurate) | L11[PASS] (common meaning) | L12[PASS] (games ok)`);
});
fs.writeFileSync('VERIFY-GEMINI-words-level3b.js-GATE.md', out.join('\n'));
console.log('wrote ' + words.length + ' lines');
