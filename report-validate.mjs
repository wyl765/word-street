#!/usr/bin/env node
/**
 * Word Street — Report Validator v1.0
 * 
 * 硬保障：程序化验证审校报告是否符合可证伪性4要素。
 * 不符合的批评自动标记为INVALID，不进入修复流程。
 * 
 * 4要素（缺一不可）：
 * 1. 具体词条（word + field）
 * 2. 具体问题（不能是"不太精确"这种模糊描述）
 * 3. 测试用例（可验证的场景）
 * 4. 外部证据（至少一个权威来源引用）
 * 
 * Run: node report-validate.mjs <report-file.md>
 *      node report-validate.mjs VERIFY-*.md  (批量)
 * 
 * 输出：
 * - VALID findings with all 4 elements
 * - INVALID findings (missing elements, auto-rejected)
 * - Stats: validity rate
 */

import fs from 'fs';
import path from 'path';

const DIR = path.dirname(new URL(import.meta.url).pathname);

// ============ ARGS ============

const files = process.argv.slice(2).filter(f => !f.startsWith('--'));
if (files.length === 0) {
  console.log('Usage: node report-validate.mjs <report.md> [report2.md ...]');
  console.log('       node report-validate.mjs VERIFY-*.md');
  process.exit(0);
}

// ============ AUTHORITY SOURCES ============

const AUTHORITY_PATTERNS = [
  /merriam[\s-]?webster/i,
  /oxford/i,
  /cambridge/i,
  /\bCOCA\b/,
  /\bBNC\b/,
  /longman/i,
  /macmillan/i,
  /collins/i,
  /biemiller/i,
  /\bnation\b/i,
  /\bCCSS\b/,
  /\bdale[\s-]?chall\b/i,
  /\bfry\b.*\blist\b/i,
  /\bdolch\b/i,
  /dictionary\.com/i,
  /dictionaryapi/i,
  /wiktionary/i,
  /wordnet/i,
  /\bCorpus\b/,
  /academic\s+word\s+list/i,
  /\bAWL\b/,
  // Academic citations
  /\(\d{4}\)/,              // (2019) style
  /\d{4}\s*[,;.]\s*p\.\s*\d+/i,  // 2019, p. 42
  /et\s+al\./i,
];

// ============ VAGUE PATTERNS (reject these) ============

const VAGUE_PATTERNS = [
  /not?\s+(quite\s+)?(precise|accurate|clear|specific)\s+(enough)?/i,
  /could\s+be\s+(better|improved|clearer)/i,
  /slightly\s+(off|wrong|inaccurate)/i,
  /I\s+(think|feel|believe)\s+(this|it|the)/i,
  /might\s+confuse/i,
  /seems?\s+(a\s+bit\s+)?(off|wrong|vague|unclear)/i,
  /not\s+ideal/i,
  /could\s+use\s+(some\s+)?work/i,
];

// ============ WORD REFERENCE PATTERN ============

// Matches things like: "puppy", `kitten`, **lamb**, word: "frog", [word] turtle
const WORD_REF_PATTERNS = [
  /[""`](\w+)[""`]/,
  /\*\*(\w+)\*\*/,
  /\bword[:\s]+[""`]?(\w+)/i,
  /\[(\w+)\]/,
  /^[-*•]\s*(\w+)\s*[:\-—]/m,
  /\b(definition|example|imageKeyword)\b/i,
];

// ============ TEST CASE PATTERNS ============

const TEST_PATTERNS = [
  /if\s+(a\s+)?(student|child|kid|learner|mark)\s+(see|sees|saw|reads?|hear|hears)/i,
  /test[:\s]/i,
  /\bquiz\b/i,
  /would\s+(think|answer|choose|guess|say)/i,
  /\bask\b.*\bwhat\b/i,
  /\bshow\b.*\bdefinition\b/i,
  /given\s+this\s+definition/i,
  /could\s+not\s+distinguish/i,
  /cannot\s+tell\s+the\s+difference/i,
  /pick\s+(the\s+)?(wrong|right|correct)/i,
  /misunderstand/i,
  /误解|误判|混淆/,
];

// ============ PARSE REPORT ============

function parseFindings(content) {
  const findings = [];
  
  // Split by common finding delimiters
  // Look for numbered items, bullet points with word references, or ### headers
  const sections = content.split(/(?=^(?:\d+\.\s|\#{1,3}\s|[-*•]\s*(?:\*\*)?[A-Za-z]+(?:\*\*)?\s*[:\-—]))/m);
  
  for (const section of sections) {
    const trimmed = section.trim();
    if (trimmed.length < 20) continue; // too short to be a finding
    
    // Skip headers that are just structural
    if (/^#+\s*(summary|结|总|overview|methodology|背景|前置|方法|工具|建议固化|stats)/i.test(trimmed)) continue;
    
    // Check if this looks like a finding (must reference a specific word)
    let hasWord = false;
    for (const p of WORD_REF_PATTERNS) {
      if (p.test(trimmed)) { hasWord = true; break; }
    }
    if (!hasWord) continue;
    
    // Check 4 elements
    const hasSpecificProblem = !VAGUE_PATTERNS.some(p => p.test(trimmed)) && trimmed.length > 30;
    
    let hasTestCase = false;
    for (const p of TEST_PATTERNS) {
      if (p.test(trimmed)) { hasTestCase = true; break; }
    }
    
    let hasEvidence = false;
    let evidenceSource = '';
    for (const p of AUTHORITY_PATTERNS) {
      const m = trimmed.match(p);
      if (m) {
        hasEvidence = true;
        evidenceSource = m[0];
        break;
      }
    }
    
    // Check for vague language
    const isVague = VAGUE_PATTERNS.some(p => p.test(trimmed));
    
    findings.push({
      text: trimmed.slice(0, 200) + (trimmed.length > 200 ? '...' : ''),
      hasWord,
      hasSpecificProblem,
      hasTestCase,
      hasEvidence,
      evidenceSource,
      isVague,
      valid: hasWord && hasSpecificProblem && hasTestCase && hasEvidence && !isVague,
      missing: [
        !hasWord ? 'WORD' : null,
        !hasSpecificProblem ? 'SPECIFIC_PROBLEM' : null,
        !hasTestCase ? 'TEST_CASE' : null,
        !hasEvidence ? 'EVIDENCE' : null,
        isVague ? 'TOO_VAGUE' : null,
      ].filter(Boolean)
    });
  }
  
  return findings;
}

// ============ MAIN ============

let totalValid = 0;
let totalInvalid = 0;
let totalFindings = 0;

for (const file of files) {
  const filePath = path.resolve(file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${file}`);
    continue;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const findings = parseFindings(content);
  
  if (findings.length === 0) {
    console.log(`📄 ${path.basename(file)}: No findings detected (structural report only?)`);
    continue;
  }
  
  const valid = findings.filter(f => f.valid);
  const invalid = findings.filter(f => !f.valid);
  
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📄 ${path.basename(file)}`);
  console.log(`${'='.repeat(60)}`);
  console.log(`Findings: ${findings.length} | ✅ Valid: ${valid.length} | ❌ Invalid: ${invalid.length}`);
  console.log(`Validity rate: ${findings.length > 0 ? (valid.length / findings.length * 100).toFixed(0) : 0}%`);
  
  if (invalid.length > 0) {
    console.log(`\n❌ INVALID findings (auto-rejected):`);
    for (const f of invalid) {
      console.log(`  Missing: [${f.missing.join(', ')}]`);
      console.log(`    ${f.text.slice(0, 120)}`);
    }
  }
  
  if (valid.length > 0) {
    console.log(`\n✅ VALID findings:`);
    for (const f of valid) {
      console.log(`  [${f.evidenceSource}] ${f.text.slice(0, 120)}`);
    }
  }
  
  totalValid += valid.length;
  totalInvalid += invalid.length;
  totalFindings += findings.length;
}

// ============ SUMMARY ============

console.log(`\n${'='.repeat(60)}`);
console.log(`📋 REPORT VALIDATION SUMMARY`);
console.log(`${'='.repeat(60)}`);
console.log(`Total reports: ${files.length}`);
console.log(`Total findings: ${totalFindings}`);
console.log(`✅ Valid (all 4 elements): ${totalValid}`);
console.log(`❌ Invalid (missing elements): ${totalInvalid}`);
console.log(`Validity rate: ${totalFindings > 0 ? (totalValid / totalFindings * 100).toFixed(0) : 0}%`);

if (totalInvalid > 0) {
  console.log(`\n⚠️  ${totalInvalid} findings rejected — missing required elements`);
  console.log(`   Reminder: Each finding MUST have:`);
  console.log(`   1. Specific word + field`);
  console.log(`   2. Specific problem (no vague language)`);
  console.log(`   3. Test case (verifiable scenario)`);
  console.log(`   4. External evidence (dictionary/corpus citation)`);
}

const pass = totalFindings === 0 || (totalValid / totalFindings >= 0.5);
console.log(`\n${pass ? '✅ PASS' : '❌ FAIL'} — validity rate ${totalFindings > 0 ? (totalValid / totalFindings * 100).toFixed(0) : 'N/A'}% (threshold: 50%)`);
console.log(`${'='.repeat(60)}`);

process.exit(pass ? 0 : 1);
