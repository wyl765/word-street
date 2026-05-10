#!/usr/bin/env node
// Gate 6: Generate J's confirmation dashboard
// Usage: node generate-dashboard.mjs [--output DASHBOARD.md]

import { readFileSync, readdirSync, existsSync } from 'fs';

const args = process.argv.slice(2);
let output = null;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--output' && args[i+1]) { output = args[i+1]; i++; }
}

// --- Load word-status.json ---
const status = JSON.parse(readFileSync('word-status.json', 'utf-8'));

// --- Load VERIFY reports ---
const verifyFiles = readdirSync('.').filter(f => f.startsWith('VERIFY-') && f.endsWith('.md'));

// Parse verify reports for fix counts and issues
function parseVerifyReport(filename) {
  try {
    const content = readFileSync(filename, 'utf-8');
    const critMatch = content.match(/CRITICAL[:\s]*(\d+)/i);
    const majorMatch = content.match(/MAJOR[:\s]*(\d+)/i);
    const minorMatch = content.match(/MINOR[:\s]*(\d+)/i);
    return {
      file: filename,
      critical: critMatch ? parseInt(critMatch[1]) : 0,
      major: majorMatch ? parseInt(majorMatch[1]) : 0,
      minor: minorMatch ? parseInt(minorMatch[1]) : 0
    };
  } catch(e) { return { file: filename, critical: 0, major: 0, minor: 0 }; }
}

const verifyResults = verifyFiles.map(parseVerifyReport);

// --- Load mark test results ---
let markResults = [];
if (existsSync('mark-test-results.json')) {
  try { markResults = JSON.parse(readFileSync('mark-test-results.json', 'utf-8')); } catch(e) {}
}

// --- Gate status icons ---
function gateIcon(val) {
  if (val === 'pass') return '✅';
  if (val === 'fail') return '❌';
  if (val === 'testing') return '🔄';
  return '⏳';
}

function gateStatus(fileInfo) {
  const gates = ['gate1','gate2','gate3','gate4','gate5','gate6'];
  const lastPass = gates.reduce((acc, g, i) => fileInfo[g] === 'pass' ? i + 1 : acc, 0);
  const firstPending = gates.findIndex(g => fileInfo[g] !== 'pass');
  if (firstPending === -1) return '✅ 全部通过';
  return `Gate ${firstPending + 1}进行中`;
}

// --- Compute gate-level summaries ---
const files = Object.entries(status.files);
const gateNames = ['gate1','gate2','gate3','gate4','gate5','gate6'];
const gateLabelsCN = ['门1 规则引擎','门2 共识验证','门3 属性测试','门4 红队攻击','门5 Mark测试','门6 J确认'];

const gateSummary = gateNames.map((g, idx) => {
  const passFiles = files.filter(([,v]) => v[g] === 'pass').length;
  const passWords = files.filter(([,v]) => v[g] === 'pass').reduce((s,[,v]) => s + v.totalWords, 0);
  return { label: gateLabelsCN[idx], passFiles, passWords };
});

const totalFiles = files.length;
const totalWords = status.summary.totalWords;

// --- Build markdown ---
const now = new Date().toISOString().slice(0, 10);
let md = `# Word Street 质量仪表盘\n## 生成时间: ${now}\n\n`;

// Overall progress
md += `### 总体进度\n`;
md += `| 门 | 通过文件 | 通过词数 | 百分比 |\n`;
md += `|---|---|---|---|\n`;
gateSummary.forEach(g => {
  const pct = Math.round(g.passWords / totalWords * 100);
  md += `| ${g.label} | ${g.passFiles}/${totalFiles} | ${g.passWords}/${totalWords} | ${pct}% |\n`;
});

// Per-file details
md += `\n### 各文件详情\n`;
md += `| 文件 | 词数 | G1 | G2 | G3 | G4 | G5 | G6 | 状态 |\n`;
md += `|---|---|---|---|---|---|---|---|---|\n`;
files.forEach(([name, info]) => {
  md += `| ${name} | ${info.totalWords} | ${gateIcon(info.gate1)} | ${gateIcon(info.gate2)} | ${gateIcon(info.gate3)} | ${gateIcon(info.gate4)} | ${gateIcon(info.gate5)} | ${gateIcon(info.gate6)} | ${gateStatus(info)} |\n`;
});

// Fix stats from verify reports
const totalCritical = verifyResults.reduce((s,r) => s + r.critical, 0);
const totalMajor = verifyResults.reduce((s,r) => s + r.major, 0);
const totalMinor = verifyResults.reduce((s,r) => s + r.minor, 0);

md += `\n### 当前质量指标（VERIFY报告汇总）\n`;
md += `- CRITICAL: ${totalCritical}\n`;
md += `- MAJOR: ${totalMajor}\n`;
md += `- MINOR: ${totalMinor}\n`;
md += `- VERIFY报告数: ${verifyFiles.length}\n`;

// Mark test results
if (markResults.length > 0) {
  md += `\n### Mark测试结果\n`;
  md += `| 测试文件 | 日期 | 总题 | 正确 | 正确率 | 卡点数 |\n`;
  md += `|---|---|---|---|---|---|\n`;
  markResults.forEach(r => {
    md += `| ${r.testFile} | ${r.date} | ${r.total} | ${r.correct} | ${r.pct}% | ${r.wrong.length} |\n`;
  });

  // Aggregate stuck words
  const stuckMap = {};
  markResults.forEach(r => {
    r.wrong.forEach(w => {
      stuckMap[w.word] = (stuckMap[w.word] || 0) + 1;
    });
  });
  const stuckWords = Object.entries(stuckMap).sort((a,b) => b[1] - a[1]);
  if (stuckWords.length > 0) {
    md += `\n### 累计卡点词（错误频次）\n`;
    md += `| 词 | 错误次数 |\n|---|---|\n`;
    stuckWords.forEach(([word, cnt]) => { md += `| ${word} | ${cnt} |\n`; });
  }
}

// Pending J confirmation
md += `\n### 待J确认的修改清单\n`;
md += `_(Gate 4红队攻击发现并修复的词，需要J过目确认)_\n\n`;
md += `> 运行 \`node generate-dashboard.mjs\` 时如有修复日志，将自动列出。\n`;
md += `> 目前请查看各 VERIFY-*-GATE.md 报告中标记为已修复的条目。\n`;

if (output) {
  const { writeFileSync } = await import('fs');
  writeFileSync(output, md);
  console.log(`✅ Dashboard generated → ${output}`);
} else {
  process.stdout.write(md);
}
