#!/usr/bin/env node
/**
 * Gate 5 Runner: Runs quiz test on all word files
 * Priority: L5 > L4 > L3 > L2 (L1 excluded per original design, but level1 has no split files)
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const FILES = [
  // L5 files (highest priority, 30 samples each)
  { file: 'words-level5a.js', sample: 30 },
  { file: 'words-level5b.js', sample: 30 },
  { file: 'words-level5c.js', sample: 30 },
  { file: 'words-level5d.js', sample: 30 },
  // L4 files (30 samples each)
  { file: 'words-level4a.js', sample: 30 },
  { file: 'words-level4b.js', sample: 30 },
  { file: 'words-level4c.js', sample: 30 },
  // L3 files (30 samples each)
  { file: 'words-level3a.js', sample: 30 },
  { file: 'words-level3b.js', sample: 30 },
  { file: 'words-level3c.js', sample: 30 },
  // L2 files (20 samples each)
  { file: 'words-level2a.js', sample: 20 },
  { file: 'words-level2b.js', sample: 20 },
  { file: 'words-level2c.js', sample: 20 },
  { file: 'words-level2d.js', sample: 20 },
  // L1 files (20 samples each)
  { file: 'words-level1.js', sample: 20 },
  { file: 'words-level2.js', sample: 20 },
];

const allResults = [];

for (const { file, sample } of FILES) {
  if (!existsSync(file)) {
    console.log(`SKIP: ${file} not found`);
    continue;
  }
  
  const reportJson = `gate5-quiz-${file.replace('.js', '')}.json`;
  if (existsSync(reportJson)) {
    console.log(`SKIP: ${file} already tested (${reportJson} exists)`);
    const data = JSON.parse(readFileSync(reportJson, 'utf8'));
    allResults.push(data);
    continue;
  }
  
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Testing: ${file} (sample: ${sample})`);
  console.log('='.repeat(60));
  
  try {
    execSync(`node gate5-quiz-parallel.mjs ${file} --sample ${sample}`, {
      stdio: 'inherit',
      timeout: 1800000 // 30 min per file
    });
    
    if (existsSync(reportJson)) {
      const data = JSON.parse(readFileSync(reportJson, 'utf8'));
      allResults.push(data);
    }
  } catch (e) {
    console.error(`ERROR on ${file}: ${e.message}`);
  }
}

// Summary
console.log(`\n${'='.repeat(60)}`);
console.log('GATE 5 OVERALL SUMMARY');
console.log('='.repeat(60));

let totalPass = 0, totalMarginal = 0, totalFail = 0, totalSampled = 0;
for (const r of allResults) {
  totalPass += r.pass;
  totalMarginal += r.marginal;
  totalFail += r.fail;
  totalSampled += r.sampled;
  console.log(`${r.file}: ${r.pass}✓ ${r.marginal}~ ${r.fail}✗ / ${r.sampled}`);
}
console.log(`\nTOTAL: ${totalPass}✓ ${totalMarginal}~ ${totalFail}✗ / ${totalSampled}`);
console.log(`Pass rate: ${(totalPass/totalSampled*100).toFixed(1)}%`);

// Write overall summary
const summary = { date: new Date().toISOString(), files: allResults, totalPass, totalMarginal, totalFail, totalSampled, passRate: (totalPass/totalSampled*100).toFixed(1) + '%' };
writeFileSync('gate5-quiz-summary.json', JSON.stringify(summary, null, 2));
