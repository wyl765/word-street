#!/usr/bin/env node
/**
 * verify-review.mjs — 审校报告自动核查脚本
 * 
 * cron跑完后自动执行，检查报告是否造假/敷衍。
 * 不依赖agent自报的任何数据。
 * 
 * 用法: node verify-review.mjs <report-file> <word-file> [actual-duration-seconds]
 * 
 * 检查项:
 * 1. 报告行数 ≥ 词数
 * 2. 报告里提到的词数 ≥ 实际词数的90%
 * 3. 每个✅行不能是模板式复制（检查重复率）
 * 4. git diff确认有实际修改（如果有❌）
 * 5. 如果提供actual-duration，检查报告里声称的时间是否虚报
 */

import { readFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';

const [,, reportFile, wordFile, actualDurationStr] = process.argv;

if (!reportFile || !wordFile) {
  console.log('用法: node verify-review.mjs <report-file> <word-file> [actual-duration-seconds]');
  process.exit(1);
}

if (!existsSync(reportFile)) {
  console.log(`❌ FAIL: 报告文件不存在: ${reportFile}`);
  process.exit(1);
}

if (!existsSync(wordFile)) {
  console.log(`❌ FAIL: 词库文件不存在: ${wordFile}`);
  process.exit(1);
}

const report = readFileSync(reportFile, 'utf-8');
const reportLines = report.split('\n');

// 读词库获取所有词
const wordContent = readFileSync(wordFile, 'utf-8');
const wordMatches = wordContent.match(/"word"\s*:\s*"([^"]+)"/g) || [];
const allWords = wordMatches.map(m => m.match(/"word"\s*:\s*"([^"]+)"/)[1].toLowerCase());
const totalWords = allWords.length;

console.log(`\n📋 审校报告核查: ${reportFile}`);
console.log(`📁 词库文件: ${wordFile} (${totalWords}词)`);
console.log('─'.repeat(50));

let passed = 0;
let failed = 0;
const issues = [];

// 检查1: 报告行数 ≥ 词数
const reportLineCount = reportLines.length;
if (reportLineCount >= totalWords) {
  console.log(`✅ 报告行数: ${reportLineCount} ≥ ${totalWords}词`);
  passed++;
} else {
  console.log(`❌ 报告行数不足: ${reportLineCount} < ${totalWords}词`);
  failed++;
  issues.push(`报告行数${reportLineCount}不足${totalWords}`);
}

// 检查2: 报告里提到的词数
const reportLower = report.toLowerCase();
let mentionedWords = 0;
const missingWords = [];
for (const word of allWords) {
  if (reportLower.includes(word)) {
    mentionedWords++;
  } else {
    missingWords.push(word);
  }
}
const coverage = (mentionedWords / totalWords * 100).toFixed(1);
if (mentionedWords >= totalWords * 0.9) {
  console.log(`✅ 词覆盖率: ${coverage}% (${mentionedWords}/${totalWords})`);
  passed++;
} else {
  console.log(`❌ 词覆盖率不足: ${coverage}% (${mentionedWords}/${totalWords}), 要求≥90%`);
  failed++;
  issues.push(`词覆盖率${coverage}%不足90%`);
  if (missingWords.length <= 20) {
    console.log(`   遗漏: ${missingWords.join(', ')}`);
  } else {
    console.log(`   遗漏${missingWords.length}个词，前20个: ${missingWords.slice(0, 20).join(', ')}`);
  }
}

// 检查3: ✅行的重复率（检测模板式复制）
const checkLines = reportLines.filter(l => l.includes('✅'));
if (checkLines.length > 10) {
  // 去掉词名后看描述部分是否大量重复
  const descriptions = checkLines.map(l => {
    // 去掉 "✅ wordname — " 前缀，只看描述
    const match = l.match(/✅\s+\S+\s+[—\-–]\s*(.*)/);
    return match ? match[1].trim().toLowerCase() : l.toLowerCase();
  });
  
  const descCount = {};
  for (const d of descriptions) {
    // 取前30字符作为特征
    const key = d.substring(0, 30);
    descCount[key] = (descCount[key] || 0) + 1;
  }
  
  const maxRepeat = Math.max(...Object.values(descCount));
  const repeatRate = (maxRepeat / checkLines.length * 100).toFixed(1);
  
  if (maxRepeat <= checkLines.length * 0.3) {
    console.log(`✅ 审查多样性: 最大重复${maxRepeat}/${checkLines.length} (${repeatRate}%), 无模板式复制`);
    passed++;
  } else {
    const topRepeats = Object.entries(descCount).sort((a,b) => b[1]-a[1]).slice(0, 3);
    console.log(`❌ 疑似模板式复制: 最大重复${maxRepeat}/${checkLines.length} (${repeatRate}%)`);
    for (const [desc, count] of topRepeats) {
      console.log(`   "${desc}..." 出现${count}次`);
    }
    failed++;
    issues.push(`✅行重复率${repeatRate}%疑似模板复制`);
  }
} else {
  console.log(`⚠️ ✅行太少(${checkLines.length})，无法检测重复率`);
}

// 检查4: ❌数量和是否有对应修复
const fixLines = reportLines.filter(l => l.includes('❌'));
const fixCount = fixLines.length;
console.log(`📊 发现问题: ${fixCount}个❌`);
if (fixCount > 0) {
  // 检查git diff是否有实际修改
  try {
    const diff = execSync(`git log --oneline -1 -- ${wordFile} 2>/dev/null || echo "NO_DIFF"`, { cwd: process.cwd() }).toString();
    if (diff.includes('NO_DIFF') || diff.trim().length < 10) {
      console.log(`❌ 有${fixCount}个问题但git无对应修改`);
      failed++;
      issues.push(`${fixCount}个问题未修复`);
    } else {
      console.log(`✅ git确认有修改: ${diff.trim()}`);
      passed++;
    }
  } catch (e) {
    console.log(`⚠️ 无法检查git diff: ${e.message}`);
  }
}

// 检查5: 时间虚报（如果提供了实际时长）
if (actualDurationStr) {
  const actualDuration = parseInt(actualDurationStr);
  const actualMinutes = Math.round(actualDuration / 60);
  
  // 从报告里提取声称的时间
  const timeMatch = report.match(/(?:运行时间|耗时|用时)[约大]?(\d+)\s*分钟/);
  if (timeMatch) {
    const claimedMinutes = parseInt(timeMatch[1]);
    const ratio = claimedMinutes / actualMinutes;
    if (ratio <= 1.5) {
      console.log(`✅ 时间诚实: 声称${claimedMinutes}分钟, 实际${actualMinutes}分钟 (比值${ratio.toFixed(1)})`);
      passed++;
    } else {
      console.log(`❌ 时间虚报: 声称${claimedMinutes}分钟, 实际${actualMinutes}分钟 (虚报${ratio.toFixed(1)}倍)`);
      failed++;
      issues.push(`时间虚报${ratio.toFixed(1)}倍`);
    }
  } else {
    console.log(`⚠️ 报告中未找到时间声明`);
  }
}

// 汇总
console.log('\n' + '─'.repeat(50));
if (failed === 0) {
  console.log(`🟢 全部通过 (${passed}项检查)`);
} else {
  console.log(`🔴 ${failed}项不通过 / ${passed}项通过`);
  console.log(`问题: ${issues.join('; ')}`);
}

console.log(`\n结果: ${failed === 0 ? 'PASS' : 'FAIL'}`);
process.exit(failed > 0 ? 1 : 0);
