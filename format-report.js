const fs = require('fs');
const issues = require('./issues.json');

let md = `# Word Street L1/L2 词库审校报告\n\n`;

const critical = issues.filter(i => i.level === 'CRITICAL');
const major = issues.filter(i => i.level === 'MAJOR');
const minor = issues.filter(i => i.level === 'MINOR');

function formatIssues(title, list) {
  if (list.length === 0) return '';
  let res = `## ${title} (${list.length} 个问题)\n\n`;
  // Group by file
  const byFile = {};
  list.forEach(i => {
    byFile[i.file] = byFile[i.file] || [];
    byFile[i.file].push(i);
  });
  
  for (const [file, items] of Object.entries(byFile)) {
    items.forEach(i => {
      res += `- **${file} | ${i.word}**: ${i.issue}\n  - 建议修复: 修改内容避免该问题。当前内容: "${i.reason}"\n`;
    });
  }
  return res + '\n';
}

md += formatIssues('CRITICAL - 严重安全问题', critical);
md += formatIssues('MAJOR - 定义/例句不当', major);
md += formatIssues('MINOR - 长度或表达问题', minor.slice(0, 50)); // Limit minor issues to 50 for readability
if (minor.length > 50) md += `*... 等共 ${minor.length} 个次要问题，这里仅展示前50个。*\n\n`;

md += `## 建议固化项

- 🔧 [proofcheck规则] 增加对成人词汇（如 gun, murder, kill, tax, debt, crime 等）的正则拦截，防止出现在 L1-L3 词库中。
- 🔧 [搭配规则] 无新建议。
- 🔧 [禁词] 将极度敏感词（如 murder, rape, suicide 等）加入 BANNED_WORDS。
- 🔧 [白名单] 无新建议。
- 🔧 [新工具] 增加 \`check-sentence-length.js\` 工具，限制例句长度（建议L1不超过8词，L2不超过12词）。
- 🔧 [标准更新] QA-STANDARD.md 需要增加一条：定义和例句必须贴近 10 岁孩子的生活场景，避免涉及政治、法律、金融、暴力、成人疾病等话题。
`;

fs.writeFileSync('./VERIFY-GEMINI-R10-2026-05-08.md', md);
console.log('Report generated.');
