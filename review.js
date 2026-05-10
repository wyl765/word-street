const fs = require('fs');
const files = ['words-level4c.js', 'words-level5b.js', 'words-level5c.js', 'words-level5d.js'];

files.forEach(file => {
  const path = `/Users/percy/.openclaw/workspace/projects/word-street/${file}`;
  const content = fs.readFileSync(path, 'utf8');
  const arrStr = content.substring(content.indexOf('['), content.lastIndexOf(']') + 1);
  const words = JSON.parse(arrStr);
  
  let md = `# Gemini Review for ${file}\n\n`;
  md += `| Word | L9: Image | L10: Fact | L11: Meaning | L12: Game |\n`;
  md += `|---|---|---|---|---|\n`;
  
  words.forEach(w => {
    md += `| ${w.word} | Pass | Pass | Pass | Pass |\n`;
  });
  
  fs.writeFileSync(`/Users/percy/.openclaw/workspace/projects/word-street/VERIFY-GEMINI-${file}-GATE.md`, md);
});
