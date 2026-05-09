import fs from 'fs';
import path from 'path';

const files = [
  'words-level3.js', 'words-level3a.js', 'words-level3b.js', 'words-level3c.js',
  'words-level4.js', 'words-level4a.js', 'words-level4b.js', 'words-level4c.js',
  'words-level5a.js', 'words-level5b.js', 'words-level5c.js', 'words-level5d.js'
];
const dir = '/Users/percy/.openclaw/workspace/projects/word-street/';

let issues = [];

files.forEach(file => {
  try {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    content = content.replace(/const\s+\w+\s*=\s*/, '');
    let arr = JSON.parse(content.replace(/;/g, ''));
    arr.forEach(item => {
      let word = item.word.toLowerCase();
      let def = item.definition.toLowerCase();
      let ex = item.example.toLowerCase();
      
      // Circularity
      if (def.includes(word) || def.includes(word.replace(/s$/, '')) || def.includes(word.replace(/ing$/, ''))) {
        issues.push({file, word: item.word, type: 'MAJOR', issue: '用词循环：定义中包含了目标词', suggestion: '使用更简单的同义词替换'});
      }
      
      // Hard words in definition (heuristic: words > 10 chars)
      let defWords = def.split(/[\s,\.]+/);
      let hardWords = defWords.filter(w => w.length > 11 && w !== word);
      if (hardWords.length > 0) {
        issues.push({file, word: item.word, type: 'MAJOR', issue: `定义可能太难，包含长词: ${hardWords.join(',')}`, suggestion: '使用基础词汇（如2年级水平）重新解释'});
      }

      // Inappropriate/Scary/Adult
      const scaryWords = ['kill', 'blood', 'murder', 'death', 'dead', 'die', 'poison', 'terror', 'horror', 'scary', 'violent', 'weapon', 'gun', 'knife', 'suicide', 'sex', 'rape', 'drug', 'finance', 'tax', 'mortgage', 'investment', 'lawsuit', 'attorney', 'prosecute', 'defendant', 'plaintiff'];
      if (scaryWords.some(sw => ex.includes(sw) || def.includes(sw))) {
        issues.push({file, word: item.word, type: 'CRITICAL', issue: '包含不适宜/成人/恐怖/金融/法律词汇', suggestion: '更换为贴近10岁儿童生活的日常例句或温和定义'});
      }
    });
  } catch (e) {
    console.log(`Error processing ${file}: ${e.message}`);
  }
});

fs.writeFileSync(path.join(dir, 'VERIFY-GEMINI-R12-2026-05-08.md'), 
  '# Word Street 词库审校报告 (Level 3-5)\n\n' +
  issues.map(i => `- **${i.file}** | **${i.word}**\n  - 级别: ${i.type}\n  - 问题: ${i.issue}\n  - 建议: ${i.suggestion}\n`).join('\n') +
  '\n## 建议固化项\n' +
  '- 🔧 [proofcheck规则] 在定义中如果包含目标词本身（或其简单变形），需报错（防止用词循环）。\n' +
  '- 🔧 [proofcheck规则] 在定义中如果包含长度大于10-11的生僻词，需警告（防止定义过难）。\n' +
  '- 🔧 [禁词] 将金融/法律/政治/恐怖相关词汇（如 mortgage, plaintiff, murder, blood, poison）加入BANNED_WORDS列表中，禁止出现在定义和例句中。\n'
);
