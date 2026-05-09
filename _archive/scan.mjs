import fs from 'fs';
import path from 'path';

const dir = '/Users/percy/.openclaw/workspace/projects/word-street/';
const files = fs.readdirSync(dir).filter(f => f.startsWith('words-level') && f.endsWith('.js'));

let report = [];

files.forEach(file => {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  // Extract the array of objects using a regex or simple eval if safe
  // Since they are js modules exporting default array or just arrays
  // let's parse using regex to be safe
  
  const wordMatches = content.matchAll(/\{[^}]*?word:\s*['"`](.*?)['"`][^}]*?\}/gs);
  for (const match of wordMatches) {
    const block = match[0];
    const wordMatch = block.match(/word:\s*['"`](.*?)['"`]/);
    const defMatch = block.match(/definition:\s*['"`](.*?)['"`]/);
    const enMatch = block.match(/en:\s*['"`](.*?)['"`]/);
    const imgMatch = block.match(/imageKeyword:\s*['"`](.*?)['"`]/);
    
    if (!wordMatch) continue;
    const word = wordMatch[1];
    
    let isCritical = false;
    let isMajor = false;
    let reasons = [];
    
    if (!defMatch) {
        isCritical = true;
        reasons.push('Definition missing (空字段)');
    } else {
        const def = defMatch[1];
        if (def.split(' ').length > 12) {
             isMajor = true;
             reasons.push(`Definition too long/complex: "${def}"`);
        }
        if (def.includes(word)) {
             isMajor = true;
             reasons.push(`Definition circular (contains word itself): "${def}"`);
        }
        if (def === '') {
             isCritical = true;
             reasons.push('Definition empty');
        }
    }
    
    if (!enMatch) {
         // Some might not have en sentence if it's a different format, but checking anyway
         isMajor = true;
         reasons.push('Example sentence missing');
    } else {
        const en = enMatch[1];
        if (!en.toLowerCase().includes(word.toLowerCase()) && !en.toLowerCase().includes(word.toLowerCase().replace(/s$/, '')) && !en.toLowerCase().includes(word.toLowerCase().replace(/ed$/, ''))) {
             isMajor = true;
             reasons.push(`Example missing target word: "${en}"`);
        }
        if (en.toLowerCase().includes('kill') || en.toLowerCase().includes('murder') || en.toLowerCase().includes('blood') || en.toLowerCase().includes('sex')) {
             isCritical = true;
             reasons.push(`Potentially inappropriate content in example: "${en}"`);
        }
    }
    
    if (isCritical || isMajor) {
        report.push(`- **${file}** | \`${word}\` | [${isCritical ? 'CRITICAL' : 'MAJOR'}] ${reasons.join('; ')}`);
    }
  }
});

fs.writeFileSync('/Users/percy/.openclaw/workspace/projects/word-street/VERIFY-GEMINI-R13-2026-05-08.md', '# 审校报告\n\n' + report.join('\n') + '\n\n## 建议固化项\n- 🔧 [proofcheck规则] 检查例句是否包含目标词的正则（考虑形态变化）\n- 🔧 [禁词] 将 kill, murder 等暴力词汇加入 BANNED_WORDS\n');
console.log('Done');