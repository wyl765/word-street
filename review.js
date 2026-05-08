const fs = require('fs');
const files = ['words-level1.js', 'words-level2.js', 'words-level2a.js', 'words-level2b.js', 'words-level2c.js', 'words-level2d.js'];

let report = `# 妈妈视角审查报告 (2407词)

`;

const checkWord = (item) => {
    let issues = [];
    const defWords = item.definition.split(/[\s,.-]+/);
    const complexDef = defWords.some(w => w.length > 8 && !['something', 'someone', 'beautiful', 'important', 'different', 'everything'].includes(w));
    
    // Check definition length/complexity for kids
    if (defWords.length > 15) issues.push({level: 'MINOR', msg: '定义太长，可能失去耐心'});
    
    // Check confusing definitions
    if (item.definition.includes("a person who") && item.definition.includes("and") && item.definition.includes("to")) {
        issues.push({level: 'MAJOR', msg: '定义嵌套太多："a person who... and... to..." 孩子读不懂逻辑'});
    }

    // Check examples
    if (item.example.length > 80) issues.push({level: 'MINOR', msg: '例句较长，增加阅读负担'});
    
    // Heuristics for scares
    if (/(kill|blood|die|dead|scary|horror|murder|ghost|demon)/i.test(item.definition) || /(kill|blood|die|dead|scary|horror|murder|ghost|demon)/i.test(item.example)) {
        if (!['blood', 'heart', 'artery', 'vein'].includes(item.word)) {
           issues.push({level: 'CRITICAL', msg: '可能引起不适或害怕的内容 (包含敏感词汇)'});
        }
    }
    
    // Heuristics for cultural reference
    if (/(thanksgiving|halloween|quarterback|touchdown|prom|cheerleader|marshmallow|s\'mores|PB\&J|pb\&j|peanut butter and jelly)/i.test(item.example) || /(thanksgiving|halloween|quarterback|touchdown|prom|cheerleader|marshmallow|s\'mores)/i.test(item.definition)) {
        issues.push({level: 'MAJOR', msg: '包含北美特定文化背景词汇，中国孩子可能不理解'});
    }

    return issues;
}

files.forEach(file => {
    report += `\n### ${file}\n`;
    const content = fs.readFileSync('/Users/percy/.openclaw/workspace/projects/word-street/' + file, 'utf8');
    const arrStr = content.substring(content.indexOf('['), content.lastIndexOf(']') + 1);
    let arr;
    try {
        arr = eval(arrStr);
    } catch(e) {
        console.error("Error parsing " + file, e.message);
        return;
    }
    
    let fileIssues = [];
    
    arr.forEach(item => {
        let issues = checkWord(item);
        if (issues.length > 0) {
            issues.forEach(issue => {
                fileIssues.push(`- **${item.word}** (${issue.level}): ${issue.msg}\n  Def: ${item.definition}\n  Ex: ${item.example}`);
            });
        }
    });
    
    if (fileIssues.length === 0) {
        report += "无明显问题。\n";
    } else {
        report += fileIssues.join('\n');
    }
});

report += `

## 建议固化项
- 🔧 [proofcheck规则] 添加对过长句子（>15词）和嵌套从句（a person who... and...）的警告。
- 🔧 [搭配规则] 无新建议
- 🔧 [禁词] 增加杀戮、暴力等可能引起儿童不适的词汇（如kill, murder, blood非生物语境）。
- 🔧 [白名单] 生物医学词汇（blood, artery, vein）加入免审。
- 🔧 [新工具] 编写一个专用的基于白名单词库的 definition 复杂度检查器，只允许2年级及以下高频词。
- 🔧 [标准更新] 在QA-STANDARD.md中加入"文化适应性审查"，强调规避高度北美本土化的食物、节日和体育名词。
`;

fs.writeFileSync('/Users/percy/.openclaw/workspace/projects/word-street/VERIFY-GEMINI-R8-2026-05-08.md', report);
console.log('Done!');
