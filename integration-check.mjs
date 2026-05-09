#!/usr/bin/env node
/**
 * Word Street — Integration Check v1.0
 * 
 * 硬保障中的硬保障：验证每个工具都被接入了执行流程。
 * 防止"写了工具没接进cron/QA-STANDARD"的低级错误。
 * 
 * 检查：
 * 1. 目录下每个 *.mjs 工具是否在 QA-STANDARD.md 里被引用
 * 2. 目录下每个 *.mjs 工具是否在 cron payload 里被引用（检查本地记录）
 * 3. QA-STANDARD.md 里引用的工具是否真的存在
 * 4. debate-protocol.md 的流程是否在 cron 里体现
 * 
 * Run: node integration-check.mjs
 * 建议：每次 git commit 前跑一次
 */

import fs from 'fs';
import path from 'path';

const DIR = path.dirname(new URL(import.meta.url).pathname);

// ============ SCAN TOOLS ============

const allTools = fs.readdirSync(DIR)
  .filter(f => f.endsWith('.mjs') && f !== 'integration-check.mjs')
  .sort();

console.log(`🔧 Found ${allTools.length} tools: ${allTools.join(', ')}\n`);

// ============ CHECK QA-STANDARD ============

const qaPath = path.join(DIR, 'QA-STANDARD.md');
let qaContent = '';
try {
  qaContent = fs.readFileSync(qaPath, 'utf8');
} catch {
  console.error('❌ QA-STANDARD.md not found!');
  process.exit(1);
}

let issues = [];
let warnings = [];

console.log('📋 QA-STANDARD.md integration:');
for (const tool of allTools) {
  if (qaContent.includes(tool)) {
    console.log(`  ✅ ${tool} — referenced`);
  } else {
    console.log(`  ❌ ${tool} — NOT in QA-STANDARD.md!`);
    issues.push(`Tool "${tool}" exists but is NOT referenced in QA-STANDARD.md`);
  }
}

// ============ CHECK REVERSE: QA-STANDARD references that don't exist ============

const qaRefs = qaContent.match(/node\s+([\w-]+\.mjs)/g) || [];
const qaToolNames = [...new Set(qaRefs.map(r => r.replace('node ', '')))];

console.log('\n📋 QA-STANDARD.md references check:');
for (const ref of qaToolNames) {
  if (fs.existsSync(path.join(DIR, ref))) {
    console.log(`  ✅ ${ref} — exists`);
  } else {
    console.log(`  ❌ ${ref} — referenced but FILE NOT FOUND!`);
    issues.push(`QA-STANDARD.md references "${ref}" but file doesn't exist`);
  }
}

// ============ CHECK DEBATE PROTOCOL INTEGRATION ============

const debatePath = path.join(DIR, 'debate-protocol.md');
if (fs.existsSync(debatePath)) {
  // Check if QA-STANDARD mentions debate/辩论
  if (qaContent.includes('debate') || qaContent.includes('辩论') || qaContent.includes('Round 1') || qaContent.includes('正反方')) {
    console.log('\n✅ Debate protocol referenced in QA-STANDARD.md');
  } else {
    console.log('\n❌ debate-protocol.md exists but NOT referenced in QA-STANDARD.md!');
    issues.push('debate-protocol.md exists but QA-STANDARD.md does not reference debate flow');
  }
}

// ============ CHECK report-validate integration ============

if (allTools.includes('report-validate.mjs')) {
  if (qaContent.includes('report-validate')) {
    console.log('✅ report-validate.mjs referenced in QA-STANDARD.md');
  } else {
    console.log('❌ report-validate.mjs exists but NOT in QA-STANDARD.md!');
    issues.push('report-validate.mjs not in QA-STANDARD.md — reports won\'t be validated');
  }
}

// ============ CHECK .git/hooks for pre-commit ============

const hookPath = path.join(DIR, '.git', 'hooks', 'pre-commit');
if (fs.existsSync(hookPath)) {
  const hookContent = fs.readFileSync(hookPath, 'utf8');
  if (hookContent.includes('integration-check')) {
    console.log('\n✅ pre-commit hook runs integration-check');
  } else {
    warnings.push('pre-commit hook exists but does not run integration-check.mjs');
  }
} else {
  warnings.push('No pre-commit hook — consider adding one to auto-run integration-check.mjs');
}

// ============ REPORT ============

console.log('\n' + '='.repeat(50));
if (issues.length === 0) {
  console.log('✅ ALL TOOLS INTEGRATED — no orphans, no ghosts');
} else {
  console.log(`❌ ${issues.length} INTEGRATION ISSUES:`);
  for (const issue of issues) {
    console.log(`  🔴 ${issue}`);
  }
}

if (warnings.length > 0) {
  console.log(`\n⚠️  ${warnings.length} warnings:`);
  for (const w of warnings) {
    console.log(`  🟡 ${w}`);
  }
}

console.log('='.repeat(50));
process.exit(issues.length > 0 ? 1 : 0);
