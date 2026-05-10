#!/usr/bin/env node
/**
 * Gate 5: AI-simulated Mark test for all word files
 * Uses openclaw infer to simulate a 10-year-old ESL learner
 */
import { execSync, execFileSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const FILES = [
  'words-level1.js', 'words-level2.js', 'words-level2a.js', 'words-level2b.js',
  'words-level2c.js', 'words-level2d.js', 'words-level3a.js', 'words-level3b.js',
  'words-level3c.js', 'words-level4a.js', 'words-level4b.js', 'words-level4c.js',
  'words-level5a.js', 'words-level5b.js', 'words-level5c.js', 'words-level5d.js'
];

// Pass thresholds by level
const THRESHOLDS = { 1: 85, 2: 75, 3: 65, 4: 55, 5: 55 };

// Sample sizes per level
const SAMPLE_SIZES = { 1: 50, 2: 40, 3: 35, 4: 30, 5: 30 };

function loadWords(filename) {
  const content = readFileSync(filename, 'utf-8');
  // Extract the array from "const XXX_BANK=[...]" format
  const match = content.match(/=\s*(\[[\s\S]*\])\s*;/);
  if (!match) throw new Error(`Cannot parse ${filename}`);
  return JSON.parse(match[1]);
}

function getLevel(filename) {
  const m = filename.match(/level(\d)/);
  return m ? parseInt(m[1]) : 1;
}

function askAI(prompt) {
  try {
    // Write prompt to temp file to avoid argument length limits
    const tmpFile = '/tmp/gate5-prompt-' + Date.now() + '.txt';
    writeFileSync(tmpFile, prompt);
    const result = execSync(
      `openclaw infer model run --model github-copilot/gpt-4.1-mini --prompt-file "${tmpFile}"`,
      { timeout: 120000, maxBuffer: 2 * 1024 * 1024 }
    ).toString();
    try { require('fs').unlinkSync(tmpFile); } catch(_) {}
    // Extract output after "outputs:" line
    const lines = result.split('\n');
    const outputIdx = lines.findIndex(l => l.startsWith('outputs:') || l.startsWith('Output:'));
    return outputIdx >= 0 ? lines.slice(outputIdx + 1).join('\n').trim() : result.trim();
  } catch (e) {
    return 'ERROR: ' + (e.message || '').slice(0, 200);
  }
}

function buildMarkPrompt(words) {
  // Batch multiple words into one prompt for efficiency
  let prompt = `You are Mark, a 10-year-old Chinese boy learning English. Your English reading level is about 2nd grade (MAP score 197).

What you know well:
- Basic everyday words (dog, cat, big, small, run, eat, happy, sad, house, school)
- Simple 1-2 syllable words used in daily life
- Words a Chinese 4th grader would learn in English class

What you struggle with:
- Words with 3+ syllables unless very common (like "elephant" is OK, "magnificent" is hard)
- Abstract concepts (democracy, philosophy, integrity)
- Uncommon/literary English words
- Words whose definitions use hard vocabulary

For each word below, read the definition and example sentence. Rate whether you (as Mark) would UNDERSTAND the definition well enough to use/recognize the word correctly.

Reply in this EXACT format for each word, one per line:
WORD | PASS or FAIL | CONFIDENCE: high/medium/low | REASON: brief explanation

Words to evaluate:
`;

  for (const w of words) {
    prompt += `\n- "${w.word}" — Definition: "${w.definition}" — Example: "${w.example}"`;
  }

  prompt += `\n\nRemember: You are a 10-year-old Chinese ESL student. Be honest about what Mark would and wouldn't understand. Simple definitions with simple words = PASS. Definitions using hard vocabulary or abstract concepts = FAIL.`;

  return prompt;
}

function parseResults(response, words) {
  const results = [];
  const lines = response.split('\n').filter(l => l.includes('|'));
  
  for (const word of words) {
    const line = lines.find(l => l.toLowerCase().includes(word.word.toLowerCase()));
    if (line) {
      const parts = line.split('|').map(s => s.trim());
      const pass = parts.some(p => p.toUpperCase().includes('PASS'));
      const fail = parts.some(p => p.toUpperCase().includes('FAIL'));
      const confMatch = line.match(/CONFIDENCE:\s*(high|medium|low)/i);
      const reasonMatch = line.match(/REASON:\s*(.+?)(?:\||$)/i);
      results.push({
        word: word.word,
        definition: word.definition,
        pass: pass && !fail,
        confidence: confMatch ? confMatch[1].toLowerCase() : 'unknown',
        reason: reasonMatch ? reasonMatch[1].trim() : ''
      });
    } else {
      // If not found in response, mark as needs-review
      results.push({
        word: word.word,
        definition: word.definition,
        pass: null,
        confidence: 'unknown',
        reason: 'Not found in AI response'
      });
    }
  }
  return results;
}

function selectSample(words, sampleSize) {
  // Stratified sample: prioritize words with longer definitions or complex vocabulary
  const scored = words.map(w => ({
    ...w,
    complexity: w.definition.split(' ').length + (w.definition.match(/[,;]/g) || []).length
  }));
  
  // Sort by complexity descending, take top portion + random from rest
  scored.sort((a, b) => b.complexity - a.complexity);
  
  const topN = Math.min(Math.ceil(sampleSize * 0.6), scored.length);
  const top = scored.slice(0, topN);
  const rest = scored.slice(topN);
  
  // Shuffle rest and take remaining
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]];
  }
  const remaining = Math.min(sampleSize - topN, rest.length);
  const sample = [...top, ...rest.slice(0, Math.max(0, remaining))];
  
  return sample.slice(0, sampleSize);
}

async function runCalibration() {
  console.log('=== CALIBRATION ===');
  const calibrationWords = [
    { word: 'puppy', definition: 'a baby dog', example: 'The little puppy wagged its tail.' },
    { word: 'cat', definition: 'a small furry pet', example: 'The cat sat on the mat.' },
    { word: 'big', definition: 'large in size', example: 'The elephant is very big.' },
    { word: 'run', definition: 'to move fast with your legs', example: 'I like to run in the park.' },
    { word: 'happy', definition: 'feeling good and smiling', example: 'She was happy to see her friend.' },
    { word: 'chicanery', definition: 'the use of trickery to achieve a political, financial, or legal purpose', example: 'The chicanery of the politician was finally exposed.' },
    { word: 'pragmatism', definition: 'dealing with things sensibly and realistically', example: 'His pragmatism helped the team solve the problem.' },
    { word: 'unctuous', definition: 'excessively flattering or ingratiating', example: 'His unctuous manner made everyone uncomfortable.' },
    { word: 'querulous', definition: 'complaining in a petulant or whining manner', example: 'The querulous old man complained about everything.' },
    { word: 'anathema', definition: 'something or someone that one vehemently dislikes', example: 'Violence was anathema to him.' }
  ];

  const prompt = buildMarkPrompt(calibrationWords);
  const response = askAI(prompt);
  console.log('Calibration response:\n', response);
  
  const results = parseResults(response, calibrationWords);
  const easyCorrect = results.slice(0, 5).filter(r => r.pass === true).length;
  const hardCorrect = results.slice(5).filter(r => r.pass === true).length;
  
  console.log(`\nEasy words correct: ${easyCorrect}/5`);
  console.log(`Hard words correct: ${hardCorrect}/5`);
  
  let calibrationStatus;
  if (easyCorrect >= 4 && hardCorrect <= 2) {
    calibrationStatus = 'CREDIBLE';
    console.log('✅ Simulation is CREDIBLE');
  } else if (easyCorrect < 3) {
    calibrationStatus = 'TOO_STRICT';
    console.log('⚠️ Simulation is TOO STRICT');
  } else if (hardCorrect >= 4) {
    calibrationStatus = 'TOO_LENIENT';
    console.log('⚠️ Simulation is TOO LENIENT');
  } else {
    calibrationStatus = 'ACCEPTABLE';
    console.log('✅ Simulation is ACCEPTABLE');
  }
  
  return { calibrationStatus, easyCorrect, hardCorrect, results };
}

async function processFile(filename) {
  console.log(`\n=== Processing ${filename} ===`);
  const level = getLevel(filename);
  const threshold = THRESHOLDS[level];
  const sampleSize = SAMPLE_SIZES[level];
  
  let words;
  try {
    words = loadWords(filename);
  } catch (e) {
    console.error(`Failed to load ${filename}: ${e.message}`);
    return null;
  }
  
  console.log(`  Level: ${level}, Words: ${words.length}, Sample: ${sampleSize}, Threshold: ${threshold}%`);
  
  const sample = selectSample(words, sampleSize);
  console.log(`  Selected ${sample.length} words for testing`);
  
  // Process in batches of 15 to avoid prompt length issues
  const BATCH = 15;
  const allResults = [];
  
  for (let i = 0; i < sample.length; i += BATCH) {
    const batch = sample.slice(i, i + BATCH);
    console.log(`  Batch ${Math.floor(i/BATCH)+1}/${Math.ceil(sample.length/BATCH)} (${batch.length} words)...`);
    
    const prompt = buildMarkPrompt(batch);
    const response = askAI(prompt);
    const results = parseResults(response, batch);
    allResults.push(...results);
    
    // Small delay between batches
    if (i + BATCH < sample.length) {
      await new Promise(r => setTimeout(r, 2000));
    }
  }
  
  const passed = allResults.filter(r => r.pass === true).length;
  const failed = allResults.filter(r => r.pass === false).length;
  const unknown = allResults.filter(r => r.pass === null).length;
  const total = allResults.length;
  const passRate = Math.round((passed / (total - unknown)) * 100) || 0;
  
  const verdict = passRate >= threshold ? 'PASS' : 'FAIL';
  
  console.log(`  Results: ${passed}/${total} pass (${passRate}%) — ${verdict} (threshold: ${threshold}%)`);
  
  // Collect failures
  const failures = allResults.filter(r => r.pass === false);
  
  return {
    filename,
    level,
    totalWords: words.length,
    sampleSize: total,
    passed,
    failed,
    unknown,
    passRate,
    threshold,
    verdict,
    failures,
    allResults
  };
}

async function main() {
  const mode = process.argv[2]; // 'calibrate', 'file:xxx', or 'all'
  const startTime = Date.now();
  
  // Step 1: Calibration
  console.log('Starting Gate 5 AI Simulation...\n');
  const calibration = await runCalibration();
  
  if (calibration.calibrationStatus === 'TOO_STRICT' || calibration.calibrationStatus === 'TOO_LENIENT') {
    console.log('\n⚠️ Calibration shows potential issues, but proceeding anyway with noted bias.');
  }
  
  // Step 2: Process files
  const statusData = JSON.parse(readFileSync('word-status.json', 'utf-8'));
  const filesToProcess = FILES.filter(f => {
    const fileStatus = statusData.files[f];
    return fileStatus && fileStatus.gate5 !== 'pass';
  });
  
  console.log(`\nFiles needing gate5: ${filesToProcess.length}`);
  console.log(filesToProcess.join(', '));
  
  const allFileResults = [];
  
  for (const file of filesToProcess) {
    const result = await processFile(file);
    if (result) {
      allFileResults.push(result);
      
      // Write individual report
      const reportName = `GATE5-RESULT-${file.replace('.js', '')}.md`;
      let report = `# Gate 5 Result: ${file}\n\n`;
      report += `**Date:** ${new Date().toISOString().split('T')[0]}\n`;
      report += `**Calibration:** ${calibration.calibrationStatus}\n`;
      report += `**Level:** ${result.level}\n`;
      report += `**Total Words:** ${result.totalWords}\n`;
      report += `**Sample Tested:** ${result.sampleSize}\n`;
      report += `**Pass Rate:** ${result.passRate}% (${result.passed}/${result.sampleSize - result.unknown})\n`;
      report += `**Threshold:** ${result.threshold}%\n`;
      report += `**Verdict:** ${result.verdict}\n\n`;
      
      if (result.failures.length > 0) {
        report += `## Failed Words (${result.failures.length})\n\n`;
        report += `| Word | Definition | Confidence | Reason |\n`;
        report += `|------|-----------|------------|--------|\n`;
        for (const f of result.failures) {
          report += `| ${f.word} | ${f.definition.replace(/\|/g, '/')} | ${f.confidence} | ${f.reason.replace(/\|/g, '/')} |\n`;
        }
        report += '\n';
      }
      
      if (result.failures.filter(f => f.confidence === 'low').length > 0) {
        report += `## Fix Candidates (FAIL + low confidence)\n\n`;
        for (const f of result.failures.filter(f => f.confidence === 'low')) {
          report += `- **${f.word}**: "${f.definition}" → Needs simpler definition\n`;
        }
        report += '\n';
      }
      
      writeFileSync(reportName, report);
      console.log(`  Wrote ${reportName}`);
    }
  }
  
  // Step 3: Update word-status.json
  for (const result of allFileResults) {
    if (result.verdict === 'PASS') {
      statusData.files[result.filename].gate5 = 'pass';
    } else {
      statusData.files[result.filename].gate5 = 'fail';
    }
  }
  
  // Recalculate summary
  let gate5Pass = 0;
  let gate5Pending = 0;
  for (const [, v] of Object.entries(statusData.files)) {
    if (v.gate5 === 'pass') gate5Pass += v.totalWords;
    else gate5Pending += v.totalWords;
  }
  statusData.summary.gate5_pass = gate5Pass;
  statusData.summary.gate5_pending = gate5Pending;
  statusData.lastUpdated = new Date().toISOString().split('T')[0];
  
  writeFileSync('word-status.json', JSON.stringify(statusData, null, 2));
  console.log('\nUpdated word-status.json');
  
  // Summary
  const elapsed = Math.round((Date.now() - startTime) / 1000);
  console.log(`\n=== SUMMARY (${elapsed}s) ===`);
  console.log(`Calibration: ${calibration.calibrationStatus}`);
  for (const r of allFileResults) {
    console.log(`  ${r.filename}: ${r.passRate}% (${r.verdict}) [threshold: ${r.threshold}%]`);
  }
  const passCount = allFileResults.filter(r => r.verdict === 'PASS').length;
  const failCount = allFileResults.filter(r => r.verdict === 'FAIL').length;
  console.log(`\nTotal: ${passCount} PASS, ${failCount} FAIL out of ${allFileResults.length} files`);
}

main().catch(console.error);
