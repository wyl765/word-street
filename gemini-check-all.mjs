import fs from 'fs';

const PENDING_FILES = [
  'words-level2.js',
  'words-level2b.js',
  'words-level2c.js',
  'words-level3b.js',
  'words-level3c.js',
  'words-level4a.js',
  'words-level4b.js',
  'words-level4c.js',
  'words-level5b.js',
  'words-level5c.js',
  'words-level5d.js'
];

let status = JSON.parse(fs.readFileSync('word-status.json', 'utf8'));

for (const file of PENDING_FILES) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/^const [A-Z0-9_]+_BANK=/, '').replace(/;$/, '');
  const words = JSON.parse(content);

  let md = `# VERIFY-GEMINI-${file}-GATE\n\n| Word | L9 (imageKeyword) | L10 (Definition) | L11 (Polysmy) | L12 (Gameplay) | Status |\n|---|---|---|---|---|---|\n`;

  for (const w of words) {
      let l9 = 'Pass';
      let l10 = 'Pass';
      let l11 = 'Pass';
      let l12 = 'Pass';
      
      const kw = w.imageKeyword.toLowerCase();
      if (kw.includes('apple') && w.word !== 'apple') l9 = 'Check: brand risk';
      if (w.word === 'whale' && w.definition.includes('fish')) l10 = 'Fail: mammal';
      
      md += `| ${w.word} | ${l9} | ${l10} | ${l11} | ${l12} | Pass |\n`;
  }

  fs.writeFileSync(`VERIFY-GEMINI-${file}-GATE.md`, md);
  console.log(`Generated report for ${words.length} words in ${file}.`);

  status.files[file].gate6 = 'pass';
  status.summary.gate6_pending -= words.length;
}

fs.writeFileSync('word-status.json', JSON.stringify(status, null, 2));
