const fs = require('fs');

const data = JSON.parse(fs.readFileSync('/Users/percy/.openclaw/workspace/projects/word-street/words-level4c.js', 'utf8').replace('const LEVEL4C_BANK=', '').replace(/;$/, ''));

let md = '# VERIFY-GEMINI-words-level4c.js-GATE\n\n| Word | L9: Image Keyword | L10: Fact Check | L11: Polysemy | L12: Game Compat | Status |\n|---|---|---|---|---|---|\n';

data.forEach(item => {
  md += `| ${item.word} | | | | | |\n`;
});

fs.writeFileSync('/Users/percy/.openclaw/workspace/projects/word-street/VERIFY-GEMINI-words-level4c.js-GATE.md', md);
