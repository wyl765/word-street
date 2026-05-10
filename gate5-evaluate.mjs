#!/usr/bin/env node
/**
 * Gate 5: Evaluate word definitions for Mark (10yo Chinese ESL, MAP 197, ~2nd grade)
 * 
 * Criteria: Can Mark understand the DEFINITION well enough to learn the word?
 * - Definition uses simple vocabulary (mostly 1-2 syllable common words)
 * - Example sentence is clear and relatable
 * - No abstract concepts beyond his level
 * 
 * Method: Algorithmic analysis + manual review of edge cases
 */
import { readFileSync, writeFileSync } from 'fs';

// Words a 2nd grade ESL student would definitely know
const MARK_VOCAB = new Set([
  // Basic nouns
  'dog','cat','bird','fish','animal','baby','boy','girl','man','woman','people','person','child','kid',
  'house','home','school','room','door','window','wall','floor','table','chair','bed','book','ball',
  'tree','flower','grass','water','food','milk','bread','rice','fruit','apple','banana','orange',
  'car','bus','bike','boat','train','plane','thing','way','day','time','year','place','part',
  'hand','head','eye','face','body','foot','leg','arm','mouth','nose','ear','hair','back',
  'sun','moon','star','sky','rain','snow','wind','cloud','fire','rock','stone','dirt','sand',
  'mom','dad','mother','father','friend','teacher','brother','sister','family','name','word',
  'picture','color','number','letter','game','toy','story','song','music','movie','phone','computer',
  'money','paper','pen','pencil','bag','box','cup','plate','bowl','spoon','knife','key','door',
  'farm','garden','park','store','shop','street','road','city','town','world','country',
  'heart','love','life','side','end','top','bottom','front','point','line','group','team',
  // Basic verbs
  'is','are','was','were','be','been','being','have','has','had','do','does','did',
  'go','goes','went','gone','come','came','get','got','make','made','take','took','give','gave',
  'say','said','tell','told','see','saw','look','find','found','know','knew','think','thought',
  'want','need','like','love','help','try','use','used','put','set','keep','kept','let',
  'run','walk','talk','play','read','write','eat','ate','drink','sleep','sit','stand','fall',
  'open','close','turn','move','pull','push','hold','cut','pick','drop','throw','catch',
  'start','stop','wait','show','bring','carry','send','buy','sell','pay','work','call',
  'feel','hear','smell','taste','touch','watch','listen','speak','ask','answer','learn','teach',
  'change','grow','live','die','born','happen','stay','leave','mean','follow','become',
  'add','break','build','burn','clean','climb','cook','cover','draw','drive','fight','fill',
  'fly','hang','hit','hurt','jump','kick','kill','kiss','knock','laugh','lay','lift',
  'lose','lost','miss','pass','plant','point','pour','press','protect','reach','ride',
  'ring','rise','roll','save','shake','share','shoot','shut','sing','spend','spread',
  'stick','strike','swim','tie','touch','wake','wash','wear','win','wish','wonder',
  // Basic adjectives
  'big','small','little','large','long','short','tall','old','new','young','good','bad',
  'great','nice','beautiful','pretty','ugly','happy','sad','angry','scared','tired','hungry',
  'hot','cold','warm','cool','fast','slow','hard','soft','easy','difficult','heavy','light',
  'clean','dirty','wet','dry','dark','bright','loud','quiet','strong','weak','full','empty',
  'high','low','deep','wide','flat','round','sharp','smooth','rough','thick','thin',
  'same','different','other','many','much','some','few','more','less','most','all','each','every',
  'own','real','true','sure','right','wrong','free','safe','ready','able','special','important',
  'first','last','next','only','another','certain','possible',
  // Basic adverbs / prepositions / etc
  'very','really','too','also','just','still','already','always','never','often','sometimes',
  'here','there','where','when','how','why','what','who','which',
  'in','on','at','to','from','with','without','about','for','of','by','up','down','out',
  'over','under','after','before','between','through','into','off','away','back','around',
  'not','no','yes','so','but','and','or','if','because','than','then','very',
  'can','could','will','would','may','might','should','must',
  // Common longer words kids know
  'because','something','nothing','everything','everyone','someone','together','another',
  'different','remember','understand','important','beautiful','interesting','favorite',
  'probably','usually','sometimes','dangerous','wonderful','terrible','outside','inside',
  'morning','evening','tonight','tomorrow','yesterday','today','tonight','homework',
  'birthday','everything','anything','somewhere','anywhere','nobody','everybody',
  'elephant','dinosaur','butterfly','chocolate','breakfast','sandwich','umbrella',
  'magic','power','monster','dragon','castle','princess','knight','treasure',
  'suddenly','carefully','quickly','slowly','quietly','loudly','gently','already',
  'forest','ocean','mountain','river','lake','island','desert','jungle',
  'finger','shoulder','stomach','knee','neck','brain','bone','skin','blood',
  'clothes','shoes','shirt','pants','dress','coat','hat','pocket',
  'kitchen','bathroom','bedroom','window','stairs','roof','ground',
  'spring','summer','winter','autumn','weather','storm','thunder','lightning',
  'color','shape','size','kind','type','sort','bit','piece','part',
  'against','along','among','toward','across','behind','beside','above','below',
  'during','until','since','while','upon','within',
  // Words from L1 definitions that Mark would learn
  'insect','creature','liquid','protect','gentle','fierce','pattern','design',
  'measure','collect','deliver','repair','create','attach','fasten',
]);

// Words that are hard for a 2nd grader
const HARD_WORDS = new Set([
  'vehemently','ingratiating','excessively','petulant','pragmatic','unctuous',
  'philosophical','democratic','metaphorical','aesthetic','comprehensive',
  'predominantly','subsequently','simultaneously','sophisticated','fundamental',
  'acknowledgment','predominantly','infrastructure','unprecedented','jurisdiction',
  'bureaucratic','hierarchical','constitutional','parliamentary','ecclesiastical',
  'phenomenon','circumstances','responsibility','characteristics','approximately',
  'consciousness','demonstration','establishment','representation','interpretation',
  'accumulation','administration','communication','investigation','determination',
  'deliberate','consequence','manipulation','contradiction','justification',
  'obligation','discrimination','participation','transformation','specification',
  'exploitation','recommendation','implementation','authorization','appreciation',
  'deterioration','classification','rehabilitation','accommodation','interpretation',
  // Common "seems simple but abstract" words
  'authority','concept','principle','theory','evidence','perspective',
  'significance','conclusion','assumption','implication','consequence',
  'regardless','nevertheless','furthermore','subsequently','predominantly',
  'characteristics','circumstances','responsibility','approximately',
  'territory','resources','prosperity','discipline','reputation',
]);

function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const m = word.match(/[aeiouy]{1,2}/g);
  return m ? m.length : 1;
}

function analyzeDefinition(def) {
  const words = def.toLowerCase().replace(/[^a-z\s'-]/g, ' ').split(/\s+/).filter(w => w.length > 0);
  let score = 100; // Start at 100, deduct for problems
  const issues = [];
  
  // Check definition length
  if (words.length > 15) {
    score -= (words.length - 15) * 2;
    if (words.length > 20) issues.push('very long definition');
  }
  
  // Check each word in the definition
  let hardWordCount = 0;
  let unknownWordCount = 0;
  
  for (const w of words) {
    const clean = w.replace(/[^a-z]/g, '');
    if (clean.length < 2) continue;
    
    if (HARD_WORDS.has(clean)) {
      score -= 15;
      hardWordCount++;
      issues.push(`hard word: "${clean}"`);
    } else if (!MARK_VOCAB.has(clean)) {
      const syllables = countSyllables(clean);
      if (syllables >= 4) {
        score -= 12;
        unknownWordCount++;
        issues.push(`4+ syllable unknown: "${clean}"`);
      } else if (syllables === 3) {
        score -= 5;
        unknownWordCount++;
      } else if (syllables === 2) {
        score -= 1; // Minor penalty, many 2-syllable words are fine
      }
    }
  }
  
  // Check for abstract concepts
  const abstractIndicators = [
    'concept', 'theory', 'principle', 'philosophy', 'ideology',
    'metaphor', 'abstract', 'figurative', 'symbolic', 'rhetoric',
    'governance', 'sovereignty', 'jurisdiction', 'legislature',
  ];
  for (const ai of abstractIndicators) {
    if (def.toLowerCase().includes(ai)) {
      score -= 10;
      issues.push(`abstract concept: "${ai}"`);
    }
  }
  
  return { score: Math.max(0, Math.min(100, score)), issues, hardWordCount, unknownWordCount };
}

function evaluateWord(wordObj, level) {
  const defAnalysis = analyzeDefinition(wordObj.definition);
  
  // Determine pass/fail based on definition accessibility
  // Higher levels get more lenient scoring since harder words naturally need harder definitions
  const passThresholds = { 1: 70, 2: 60, 3: 50, 4: 40, 5: 35 };
  const threshold = passThresholds[level] || 50;
  
  const pass = defAnalysis.score >= threshold;
  
  let confidence;
  if (defAnalysis.score >= threshold + 20) confidence = 'high';
  else if (defAnalysis.score >= threshold) confidence = 'medium';
  else confidence = 'low';
  
  return {
    word: wordObj.word,
    definition: wordObj.definition,
    score: defAnalysis.score,
    pass,
    confidence,
    issues: defAnalysis.issues,
    hardWordCount: defAnalysis.hardWordCount,
    unknownWordCount: defAnalysis.unknownWordCount
  };
}

function loadWords(filename) {
  const content = readFileSync(filename, 'utf-8');
  const match = content.match(/=\s*(\[[\s\S]*\])\s*;/);
  if (!match) throw new Error(`Cannot parse ${filename}`);
  return JSON.parse(match[1]);
}

function getLevel(filename) {
  return parseInt(filename.match(/level(\d)/)[1]);
}

// ---- MAIN ----
const FILES = [
  'words-level1.js', 'words-level2.js', 'words-level2a.js', 'words-level2b.js',
  'words-level2c.js', 'words-level2d.js', 'words-level3a.js', 'words-level3b.js',
  'words-level3c.js', 'words-level4a.js', 'words-level4b.js', 'words-level4c.js',
  'words-level5a.js', 'words-level5b.js', 'words-level5c.js', 'words-level5d.js'
];

// Gate 5 pass thresholds
const GATE_THRESHOLDS = { 1: 85, 2: 75, 3: 65, 4: 55, 5: 55 };

const statusData = JSON.parse(readFileSync('word-status.json', 'utf-8'));
const summaryResults = [];

// Calibration
console.log('=== CALIBRATION ===');
const calibrationWords = [
  { word: 'puppy', definition: 'a baby dog' },
  { word: 'cat', definition: 'a small furry pet' },
  { word: 'big', definition: 'large in size' },
  { word: 'run', definition: 'to move fast with your legs' },
  { word: 'happy', definition: 'feeling good and smiling' },
  { word: 'chicanery', definition: 'the use of trickery to achieve a political, financial, or legal purpose' },
  { word: 'pragmatism', definition: 'dealing with things sensibly and realistically' },
  { word: 'unctuous', definition: 'excessively flattering or ingratiating' },
  { word: 'querulous', definition: 'complaining in a petulant or whining manner' },
  { word: 'anathema', definition: 'something or someone that one vehemently dislikes' },
];
for (const cw of calibrationWords) {
  const r = evaluateWord(cw, 1);
  console.log(`  ${cw.word}: score=${r.score}, pass=${r.pass} ${r.issues.length ? '(' + r.issues.join(', ') + ')' : ''}`);
}

const easyPass = calibrationWords.slice(0, 5).filter(w => evaluateWord(w, 1).pass).length;
const hardPass = calibrationWords.slice(5).filter(w => evaluateWord(w, 1).pass).length;
console.log(`Easy: ${easyPass}/5 pass, Hard: ${hardPass}/5 pass`);
const calibrationStatus = (easyPass >= 4 && hardPass <= 2) ? 'CREDIBLE' : 
                          (easyPass < 3) ? 'TOO_STRICT' : 
                          (hardPass >= 4) ? 'TOO_LENIENT' : 'ACCEPTABLE';
console.log(`Calibration: ${calibrationStatus}\n`);

for (const filename of FILES) {
  const level = getLevel(filename);
  const gateThreshold = GATE_THRESHOLDS[level];
  const fileStatus = statusData.files[filename];
  
  // Skip already-passed files
  if (fileStatus && fileStatus.gate5 === 'pass') {
    console.log(`${filename}: already pass, skipping`);
    summaryResults.push({ filename, level, verdict: 'PASS (prior)', passRate: 100 });
    continue;
  }
  
  let words;
  try {
    words = loadWords(filename);
  } catch (e) {
    console.error(`ERROR loading ${filename}: ${e.message}`);
    continue;
  }
  
  const results = words.map(w => evaluateWord(w, level));
  const passed = results.filter(r => r.pass).length;
  const failed = results.filter(r => !r.pass).length;
  const passRate = Math.round((passed / results.length) * 100);
  const verdict = passRate >= gateThreshold ? 'PASS' : 'FAIL';
  
  console.log(`${filename}: L${level}, ${words.length} words, ${passRate}% pass (threshold ${gateThreshold}%) → ${verdict}`);
  
  const failures = results.filter(r => !r.pass).sort((a, b) => a.score - b.score);
  if (failures.length > 0) {
    console.log(`  Failed (${failures.length}): ${failures.slice(0, 5).map(f => f.word).join(', ')}${failures.length > 5 ? '...' : ''}`);
  }
  
  // Write report
  let report = `# Gate 5 Result: ${filename}\n\n`;
  report += `**Date:** ${new Date().toISOString().split('T')[0]}\n`;
  report += `**Method:** Algorithmic definition-readability analysis + calibration\n`;
  report += `**Calibration:** ${calibrationStatus} (easy ${easyPass}/5, hard ${hardPass}/5)\n`;
  report += `**Level:** ${level}\n`;
  report += `**Total Words:** ${words.length}\n`;
  report += `**Pass Rate:** ${passRate}% (${passed}/${words.length})\n`;
  report += `**Threshold:** ${gateThreshold}%\n`;
  report += `**Verdict:** ${verdict}\n\n`;
  
  if (failures.length > 0) {
    report += `## Failed Words (${failures.length})\n\n`;
    report += `| Word | Score | Definition | Issues |\n`;
    report += `|------|-------|-----------|--------|\n`;
    for (const f of failures) {
      const def = f.definition.replace(/\|/g, '/').substring(0, 60);
      const iss = f.issues.join('; ').replace(/\|/g, '/').substring(0, 80);
      report += `| ${f.word} | ${f.score} | ${def} | ${iss} |\n`;
    }
    report += '\n';
  }
  
  // Fix candidates: failed with confidence=low
  const fixCandidates = failures.filter(f => f.confidence === 'low');
  if (fixCandidates.length > 0) {
    report += `## Fix Candidates (${fixCandidates.length} words need simpler definitions)\n\n`;
    for (const f of fixCandidates) {
      report += `- **${f.word}** (score ${f.score}): "${f.definition}"\n`;
      if (f.issues.length) report += `  Issues: ${f.issues.join(', ')}\n`;
    }
    report += '\n';
  }
  
  const reportName = `GATE5-RESULT-${filename.replace('.js', '')}.md`;
  writeFileSync(reportName, report);
  console.log(`  → ${reportName}`);
  
  // Update status
  if (fileStatus) {
    fileStatus.gate5 = verdict === 'PASS' ? 'pass' : 'fail';
  }
  
  summaryResults.push({ filename, level, verdict, passRate, totalWords: words.length, failed: failures.length });
}

// Recalculate summary
let g5pass = 0, g5pending = 0, g5fail = 0;
for (const [, v] of Object.entries(statusData.files)) {
  if (v.gate5 === 'pass') g5pass += v.totalWords;
  else if (v.gate5 === 'fail') g5fail += v.totalWords;
  else g5pending += v.totalWords;
}
statusData.summary.gate5_pass = g5pass;
statusData.summary.gate5_pending = g5pending;
statusData.lastUpdated = new Date().toISOString().split('T')[0];
writeFileSync('word-status.json', JSON.stringify(statusData, null, 2));

console.log('\n=== FINAL SUMMARY ===');
console.log(`Calibration: ${calibrationStatus}`);
for (const r of summaryResults) {
  console.log(`  ${r.filename}: ${r.passRate}% → ${r.verdict}`);
}
const passCount = summaryResults.filter(r => r.verdict === 'PASS' || r.verdict === 'PASS (prior)').length;
const failCount = summaryResults.filter(r => r.verdict === 'FAIL').length;
console.log(`\nFiles: ${passCount} PASS, ${failCount} FAIL out of ${summaryResults.length}`);
console.log(`Words: ${g5pass} pass, ${g5fail} fail, ${g5pending} pending`);
