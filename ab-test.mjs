#!/usr/bin/env node
/**
 * Word Street — A/B Test Data Collection Framework
 * Embeds tracking hooks into the game to measure:
 * - Which words Mark gets wrong consistently (error rate > 50%)
 * - Which definitions take too long to understand (response time > 10s)
 * - Which imageKeywords fail (wrong answer selected despite correct image)
 * 
 * This generates a tracking config that the game frontend can use.
 * Results feed back into the QA pipeline.
 */
import fs from 'fs';
import path from 'path';

const DIR = path.dirname(new URL(import.meta.url).pathname);

// Generate tracking configuration
const trackingConfig = {
  version: "1.0",
  enabled: true,
  metrics: {
    errorRate: {
      description: "Percentage of wrong answers per word",
      threshold: 0.5,  // Flag if >50% error rate
      minAttempts: 3   // Need at least 3 attempts before flagging
    },
    responseTime: {
      description: "Time to select answer after seeing definition",
      threshold: 10000, // Flag if >10 seconds average
      unit: "ms"
    },
    skipRate: {
      description: "How often word is skipped/passed",
      threshold: 0.3   // Flag if >30% skip rate
    }
  },
  dataSchema: {
    event: "quiz_answer",
    fields: {
      wordId: "string",
      word: "string", 
      level: "number",
      gameMode: "string (image_to_word | audio_to_image | image_to_spell | context_select)",
      correct: "boolean",
      responseTimeMs: "number",
      selectedAnswer: "string",
      correctAnswer: "string",
      timestamp: "ISO-8601"
    }
  },
  analysis: {
    autoFlag: "Words with error_rate > 50% after 5+ attempts get auto-flagged for definition review",
    report: "Weekly summary of flagged words sent to QA pipeline",
    feedback_loop: "Flagged words → definition simplified → re-test → measure improvement"
  }
};

// Write config
fs.writeFileSync(
  path.join(DIR, 'tracking-config.json'),
  JSON.stringify(trackingConfig, null, 2)
);

console.log('📊 A/B Test Tracking Config Generated');
console.log('');
console.log('To integrate with game frontend:');
console.log('1. Load tracking-config.json');
console.log('2. On each quiz answer, log event matching dataSchema');
console.log('3. After 50+ events, run analysis to flag problem words');
console.log('4. Flagged words feed back to QA pipeline for review');
console.log('');
console.log('File: tracking-config.json');

// Also generate a "problem word prediction" based on current tools
// Words most likely to have high error rates (based on our QA findings)
const predictedProblems = [];

// Load entries and predict which ones will have highest error rates
const files = fs.readdirSync(DIR).filter(f => f.match(/^words-level[12]\.js$/)).sort();
for (const file of files) {
  const content = fs.readFileSync(path.join(DIR, file), 'utf8');
  const re = /\{"word":"([^"]+)","level":(\d+),"definition":"([^"]+)"/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    const word = m[1];
    const level = parseInt(m[2]);
    const def = m[3];
    
    let riskScore = 0;
    let reasons = [];
    
    // Short definition = less info to distinguish
    if (def.split(/\s+/).length <= 3) { riskScore += 2; reasons.push('very short def'); }
    
    // Abstract word (no concrete noun in definition)
    const concreteWords = ['animal','bird','fish','food','plant','tool','place','person','thing','color'];
    if (!concreteWords.some(c => def.toLowerCase().includes(c))) { riskScore += 1; reasons.push('abstract'); }
    
    // Multi-word phrase (harder to learn)
    if (word.includes(' ')) { riskScore += 1; reasons.push('phrase'); }
    
    // Long word (>8 chars)
    if (word.length > 8) { riskScore += 1; reasons.push('long word'); }
    
    if (riskScore >= 3) {
      predictedProblems.push({ word, level, riskScore, reasons, definition: def });
    }
  }
}

predictedProblems.sort((a, b) => b.riskScore - a.riskScore);

console.log(`\n🔮 Predicted high-error-rate words: ${predictedProblems.length}`);
predictedProblems.slice(0, 10).forEach((p, i) => {
  console.log(`  ${i+1}. "${p.word}" (L${p.level}, risk=${p.riskScore}): ${p.reasons.join(', ')}`);
});

fs.writeFileSync(
  path.join(DIR, 'predicted-problems.json'),
  JSON.stringify(predictedProblems, null, 2)
);
console.log('\nPredictions saved to predicted-problems.json');
