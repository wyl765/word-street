import fs from 'fs';

const checkFile = (filename) => {
  const content = fs.readFileSync(filename, 'utf8');
  const match = content.match(/const LEVEL3[A-C]?_BANK\s*=\s*(\[[\s\S]*?\]);/);
  if (!match) return;
  const data = eval(match[1]);
  
  const issues = [];
  
  for (const item of data) {
    if (item.definition.includes('something') || item.definition.includes('someone')) {
       // potential abstract
    }
  }
}
