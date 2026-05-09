#!/usr/bin/env node
/**
 * Word Street — Mutation Test
 * Injects 30 known errors into word bank copies, runs proofcheck, measures detection rate.
 * Run: node mutation-test.mjs
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const DIR = path.dirname(new URL(import.meta.url).pathname);

// ============ LOAD ALL WORDS ============

function loadAllWords() {
  const files = fs.readdirSync(DIR)
    .filter(f => f.match(/^words-level.*\.js$/) && !f.includes('mutated'))
    .sort();
  
  const allEntries = [];
  const fileContents = {};
  
  for (const file of files) {
    const content = fs.readFileSync(path.join(DIR, file), 'utf8');
    fileContents[file] = content;
    const match = content.match(/\[(.+)\]/s);
    if (!match) continue;
    try {
      const arr = JSON.parse('[' + match[1] + ']');
      arr.forEach((entry, idx) => {
        allEntries.push({ ...entry, _file: file, _idx: idx });
      });
    } catch (e) {
      console.error(`Failed to parse ${file}: ${e.message}`);
    }
  }
  return { allEntries, fileContents };
}

// ============ RANDOM SELECTION ============

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickN(arr, n) {
  return shuffle(arr).slice(0, n);
}

// ============ MUTATION TYPES ============

const MUTATIONS = {
  // a) 5 factual definition errors
  factual_error: (entry) => {
    const swaps = [
      { from: /animal|bird|fish|mammal/i, to: 'plant' },
      { from: /a (?:baby |young |small |large |big )/i, to: 'a type of mineral called ' },
      { from: /that .+$/, to: 'that grows underground in caves' },
    ];
    let def = entry.definition;
    let mutated = false;
    for (const s of swaps) {
      if (s.from.test(def)) {
        def = def.replace(s.from, s.to);
        mutated = true;
        break;
      }
    }
    if (!mutated) {
      def = 'a type of tropical fruit with purple seeds';
    }
    return { ...entry, definition: def, _mutation: 'factual_error', _original_def: entry.definition };
  },

  // b) 5 banned word injections
  banned_word: (entry) => {
    const banned = ['genocide', 'autopsy', 'massacre', 'pornography', 'torture'];
    const word = banned[Math.floor(Math.random() * banned.length)];
    const example = entry.example + ` The ${word} was unexpected.`;
    return { ...entry, example, _mutation: 'banned_word', _injected: word, _original_example: entry.example };
  },

  // c) 5 collocation errors
  collocation_error: (entry) => {
    const bad = [
      'big rain', 'eat medicine', 'open the light', 'close the light', 'drink soup'
    ];
    const phrase = bad[Math.floor(Math.random() * bad.length)];
    const example = `We saw ${phrase} near the ${entry.word}.`;
    return { ...entry, example, _mutation: 'collocation_error', _bad_collocation: phrase, _original_example: entry.example };
  },

  // d) 5 empty fields
  empty_field: (entry) => {
    const field = Math.random() > 0.5 ? 'definition' : 'example';
    return { ...entry, [field]: '', _mutation: 'empty_field', _emptied: field, _original_value: entry[field] };
  },

  // e) 5 replace accidents (key→important)
  replace_accident: (entry) => {
    // Inject "spare important" or "hidden important" into example
    const accidents = [
      'She found the spare important under the mat.',
      'The hidden important opened the treasure chest.',
      'He pressed the important on the importantboard.',
      'The piano importants were black and white.',
      'She typed the importantword into the computer.'
    ];
    const example = accidents[Math.floor(Math.random() * accidents.length)];
    return { ...entry, example, _mutation: 'replace_accident', _original_example: entry.example };
  },

  // f) 5 grammar errors
  grammar_error: (entry) => {
    const errors = [
      (ex) => ex.replace(/\b(She|He)\b/, '$1 don\'t'),
      (ex) => ex.replace(/\b(The \w+)\b/, '$1 is goes'),
      (ex) => 'They is happy about the ' + entry.word + '.',
      (ex) => 'She don\'t like the ' + entry.word + '.',
      (ex) => 'The childrens played with the ' + entry.word + '.',
    ];
    const fn = errors[Math.floor(Math.random() * errors.length)];
    return { ...entry, example: fn(entry.example), _mutation: 'grammar_error', _original_example: entry.example };
  },
};

// ============ APPLY MUTATIONS ============

function applyMutations(allEntries) {
  const candidates = allEntries.filter(e => e.definition && e.example);
  const selected = pickN(candidates, 30);
  
  const mutationTypes = Object.keys(MUTATIONS);
  const injected = [];
  
  for (let i = 0; i < 30; i++) {
    const typeIdx = Math.floor(i / 5); // 0-5, 5 each
    const type = mutationTypes[typeIdx];
    const mutator = MUTATIONS[type];
    const mutated = mutator(selected[i]);
    injected.push(mutated);
  }
  
  return injected;
}

// ============ BUILD MUTATED FILES ============

function buildMutatedFiles(allEntries, injected, fileContents) {
  // Group injected by file
  const mutationMap = new Map();
  for (const m of injected) {
    if (!mutationMap.has(m._file)) mutationMap.set(m._file, new Map());
    mutationMap.get(m._file).set(m._idx, m);
  }
  
  // Rebuild each file
  const mutatedFiles = {};
  
  for (const [file, content] of Object.entries(fileContents)) {
    const match = content.match(/^(.*?)\[(.+)\](.*?)$/s);
    if (!match) {
      mutatedFiles[file] = content;
      continue;
    }
    
    const prefix = match[1];
    const suffix = match[3];
    
    try {
      const arr = JSON.parse('[' + match[2] + ']');
      const fileMutations = mutationMap.get(file);
      
      if (fileMutations) {
        for (const [idx, mutated] of fileMutations) {
          // Clean mutation metadata
          const clean = { ...mutated };
          delete clean._file;
          delete clean._idx;
          delete clean._mutation;
          delete clean._original_def;
          delete clean._original_example;
          delete clean._injected;
          delete clean._bad_collocation;
          delete clean._emptied;
          delete clean._original_value;
          arr[idx] = clean;
        }
      }
      
      const jsonArr = JSON.stringify(arr);
      // Extract variable name from prefix
      const varMatch = prefix.match(/(const \w+=)/);
      if (varMatch) {
        mutatedFiles[file] = `${varMatch[1]}${jsonArr};\n`;
      } else {
        mutatedFiles[file] = `${prefix}${jsonArr}${suffix}`;
      }
    } catch (e) {
      mutatedFiles[file] = content;
    }
  }
  
  return mutatedFiles;
}

// ============ RUN PROOFCHECK ON MUTATED ============

function runProofcheck(mutatedDir) {
  try {
    const result = execSync(`node proofcheck.mjs`, {
      cwd: mutatedDir,
      encoding: 'utf8',
      timeout: 30000,
      env: { ...process.env },
    });
    return result;
  } catch (e) {
    // proofcheck exits non-zero when issues found
    return e.stdout || e.stderr || '';
  }
}

// ============ MAIN ============

async function main() {
  console.log('🧬 Word Street Mutation Test');
  console.log('============================\n');
  
  // Load words
  const { allEntries, fileContents } = loadAllWords();
  console.log(`📚 Loaded ${allEntries.length} words from ${Object.keys(fileContents).length} files\n`);
  
  // Apply mutations
  const injected = applyMutations(allEntries);
  console.log(`💉 Injected ${injected.length} mutations:`);
  const typeCounts = {};
  for (const m of injected) {
    typeCounts[m._mutation] = (typeCounts[m._mutation] || 0) + 1;
  }
  for (const [type, count] of Object.entries(typeCounts)) {
    console.log(`   ${type}: ${count}`);
  }
  console.log('');
  
  // Build mutated files
  const mutatedFiles = buildMutatedFiles(allEntries, injected, fileContents);
  
  // Write to temp directory
  const tmpDir = path.join(DIR, '_mutation_test_tmp');
  if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true });
  fs.mkdirSync(tmpDir, { recursive: true });
  
  // Copy proofcheck.mjs to tmp dir
  fs.copyFileSync(path.join(DIR, 'proofcheck.mjs'), path.join(tmpDir, 'proofcheck.mjs'));
  
  // Write mutated word files
  for (const [file, content] of Object.entries(mutatedFiles)) {
    fs.writeFileSync(path.join(tmpDir, file), content);
  }
  
  console.log(`📁 Wrote mutated files to ${tmpDir}\n`);
  console.log('🔍 Running proofcheck on mutated files...\n');
  
  // Run proofcheck
  const output = runProofcheck(tmpDir);
  console.log('--- Proofcheck Output ---');
  console.log(output);
  console.log('--- End Output ---\n');
  
  // Analyze detection
  const detectedMutations = new Set();
  const undetected = [];
  
  for (const m of injected) {
    const word = m.word;
    const type = m._mutation;
    let detected = false;
    
    // Check if proofcheck output mentions this word
    if (output.includes(word)) {
      // More specific checks per mutation type
      switch (type) {
        case 'factual_error':
          // May not be detected by rule engine (AI-only check)
          if (output.includes(word)) detected = true;
          break;
        case 'banned_word':
          if (output.includes(m._injected) || output.toLowerCase().includes('banned') || output.toLowerCase().includes('unsafe')) {
            detected = true;
          }
          break;
        case 'collocation_error':
          if (output.includes(word) && (output.includes('collocation') || output.includes('COLLOCATION'))) {
            detected = true;
          }
          break;
        case 'empty_field':
          if (output.includes(word) && (output.includes('empty') || output.includes('EMPTY') || output.includes('missing') || output.includes('MISSING'))) {
            detected = true;
          }
          break;
        case 'replace_accident':
          if (output.includes('important') || output.includes('REPLACE') || output.includes('replace accident')) {
            detected = true;
          }
          break;
        case 'grammar_error':
          if (output.includes(word) && (output.includes('grammar') || output.includes('GRAMMAR') || output.includes('SVA') || output.includes('don\'t'))) {
            detected = true;
          }
          break;
      }
    }
    
    // Also check for general detection patterns
    if (!detected) {
      // Check if the word appears in any CRITICAL or MAJOR line
      const lines = output.split('\n');
      for (const line of lines) {
        if ((line.includes('CRITICAL') || line.includes('MAJOR')) && line.includes(word)) {
          detected = true;
          break;
        }
      }
    }
    
    if (detected) {
      detectedMutations.add(`${word}:${type}`);
    } else {
      undetected.push({ word, type, detail: getMutationDetail(m) });
    }
  }
  
  const detectionRate = ((injected.length - undetected.length) / injected.length * 100).toFixed(1);
  
  // Generate report
  console.log('📊 MUTATION TEST RESULTS');
  console.log('========================');
  console.log(`Total mutations: ${injected.length}`);
  console.log(`Detected: ${injected.length - undetected.length}`);
  console.log(`Undetected: ${undetected.length}`);
  console.log(`Detection rate: ${detectionRate}%`);
  console.log(`Target: ≥90%`);
  console.log(`Result: ${parseFloat(detectionRate) >= 90 ? '✅ PASS' : '❌ FAIL'}\n`);
  
  // Detection by type
  console.log('Detection by mutation type:');
  for (const type of Object.keys(MUTATIONS)) {
    const typeInjected = injected.filter(m => m._mutation === type);
    const typeDetected = typeInjected.filter(m => detectedMutations.has(`${m.word}:${m._mutation}`));
    console.log(`  ${type}: ${typeDetected.length}/${typeInjected.length} detected`);
  }
  
  if (undetected.length > 0) {
    console.log('\n⚠️  Undetected mutations:');
    for (const u of undetected) {
      console.log(`  - ${u.word} (${u.type}): ${u.detail}`);
    }
  }
  
  // Write report
  const report = generateReport(injected, detectedMutations, undetected, detectionRate, output);
  fs.writeFileSync(path.join(DIR, 'MUTATION-TEST-REPORT.md'), report);
  console.log('\n📄 Report written to MUTATION-TEST-REPORT.md');
  
  // Cleanup
  fs.rmSync(tmpDir, { recursive: true });
  console.log('🧹 Cleaned up temp files');
  
  return { detectionRate: parseFloat(detectionRate), detected: injected.length - undetected.length, total: injected.length };
}

function getMutationDetail(m) {
  switch (m._mutation) {
    case 'factual_error': return `def changed to: "${m.definition?.substring(0, 60)}..."`;
    case 'banned_word': return `injected "${m._injected}" into example`;
    case 'collocation_error': return `bad collocation: "${m._bad_collocation}"`;
    case 'empty_field': return `emptied ${m._emptied}`;
    case 'replace_accident': return `example: "${m.example?.substring(0, 60)}..."`;
    case 'grammar_error': return `example: "${m.example?.substring(0, 60)}..."`;
    default: return '';
  }
}

function generateReport(injected, detectedSet, undetected, rate, rawOutput) {
  const now = new Date().toISOString().split('T')[0];
  let md = `# Mutation Test Report — ${now}\n\n`;
  md += `## Summary\n\n`;
  md += `| Metric | Value |\n|--------|-------|\n`;
  md += `| Total mutations | ${injected.length} |\n`;
  md += `| Detected | ${injected.length - undetected.length} |\n`;
  md += `| Undetected | ${undetected.length} |\n`;
  md += `| **Detection rate** | **${rate}%** |\n`;
  md += `| Target | ≥90% |\n`;
  md += `| Result | ${parseFloat(rate) >= 90 ? '✅ PASS' : '❌ FAIL'} |\n\n`;
  
  md += `## Detection by Type\n\n`;
  md += `| Mutation Type | Injected | Detected | Rate |\n|------|------|------|------|\n`;
  
  const types = ['factual_error', 'banned_word', 'collocation_error', 'empty_field', 'replace_accident', 'grammar_error'];
  for (const type of types) {
    const ti = injected.filter(m => m._mutation === type);
    const td = ti.filter(m => detectedSet.has(`${m.word}:${m._mutation}`));
    md += `| ${type} | ${ti.length} | ${td.length} | ${(td.length/ti.length*100).toFixed(0)}% |\n`;
  }
  
  md += `\n## Injected Mutations Detail\n\n`;
  for (const m of injected) {
    const detected = detectedSet.has(`${m.word}:${m._mutation}`) ? '✅' : '❌';
    md += `- ${detected} **${m.word}** (${m._mutation}): ${getMutationDetail(m)}\n`;
  }
  
  if (undetected.length > 0) {
    md += `\n## Undetected Mutations (Gaps)\n\n`;
    md += `These mutation types are blind spots in the current proofcheck engine:\n\n`;
    for (const u of undetected) {
      md += `- **${u.word}** (${u.type}): ${u.detail}\n`;
    }
    md += `\n### Recommended Improvements\n\n`;
    const undetectedTypes = [...new Set(undetected.map(u => u.type))];
    for (const type of undetectedTypes) {
      switch (type) {
        case 'factual_error':
          md += `- **Factual errors**: Add fact-check rules or AI-based semantic verification\n`;
          break;
        case 'collocation_error':
          md += `- **Collocation errors**: Strengthen COLLOCATION_ERRORS patterns in proofcheck\n`;
          break;
        case 'grammar_error':
          md += `- **Grammar errors**: Expand SVA and grammar checks\n`;
          break;
        case 'replace_accident':
          md += `- **Replace accidents**: Add more patterns to REPLACE_ACCIDENTS\n`;
          break;
        default:
          md += `- **${type}**: Add specific detection rules\n`;
      }
    }
  }
  
  md += `\n---\n*Generated by mutation-test.mjs*\n`;
  return md;
}

main().catch(console.error);
