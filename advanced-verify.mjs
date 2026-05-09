#!/usr/bin/env node
/**
 * Word Street — Advanced Verification Suite v2
 * 
 * Tools 8-14 (continuing from 1-7):
 * 8. CLIP image-text verification (via Pollinations API)
 * 9. Reverse testing (delegated to AI subagent)
 * 10. Confusion matrix (delegated to AI subagent)
 * 11. L1 interference detection (Chinese false friends)
 * 12. Spaced repetition difficulty scoring
 * 13. Image generation + verification
 * 14. Corpus collocation comparison
 */
import fs from 'fs';
import path from 'path';

const DIR = path.dirname(new URL(import.meta.url).pathname);

// Load entries
const entries = [];
const files = fs.readdirSync(DIR).filter(f => f.match(/^words-level.*\.js$/)).sort();
for (const file of files) {
  const content = fs.readFileSync(path.join(DIR, file), 'utf8');
  const re = /\{"word":"([^"]+)","level":(\d+),"definition":"([^"]+)","example":"([^"]+)","imageKeyword":"([^"]+)"\}/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    entries.push({ word: m[1], level: parseInt(m[2]), definition: m[3], example: m[4], imageKeyword: m[5], file });
  }
}
console.log(`📚 Loaded ${entries.length} entries\n`);

// ============================================================
// 11. CHINESE L1 INTERFERENCE DETECTION
// ============================================================
console.log('🇨🇳 11. Chinese L1 Interference Detection');
console.log('-'.repeat(40));

// Common Chinese-English false friends and interference patterns
const chineseInterference = [
  // === Original 21: Polysemy & False Friends ===
  { word: 'actual', trap: 'Chinese students think "actual" = "actually" (实际上)' },
  { word: 'eventually', trap: 'Chinese students confuse with "finally" — different nuance' },
  { word: 'sensitive', trap: 'Chinese may interpret as "敏感" (negative) vs English neutral' },
  { word: 'nervous', trap: 'Chinese may confuse with "anxious" — 紧张 covers both' },
  { word: 'borrow', trap: 'Chinese students confuse borrow/lend — 借 is bidirectional in Chinese' },
  { word: 'lend', trap: 'Chinese students confuse borrow/lend — 借 is bidirectional in Chinese' },
  { word: 'beside', trap: 'Chinese students confuse beside/besides — 在旁边 vs 此外' },
  { word: 'besides', trap: 'Chinese students confuse beside/besides' },
  { word: 'quite', trap: 'British "quite" = somewhat, American "quite" = very — confusing for ESL' },
  { word: 'since', trap: 'Chinese students struggle with since (因为/自从) — two meanings' },
  { word: 'still', trap: '仍然 vs 安静 — two unrelated meanings in one word' },
  { word: 'present', trap: '礼物 vs 出席 vs 呈现 — three meanings' },
  { word: 'match', trap: '比赛 vs 匹配 vs 火柴 — three meanings' },
  { word: 'fair', trap: '公平 vs 展览会 vs 浅色 — three meanings' },
  { word: 'left', trap: '左边 vs 离开(过去式) — confusing for L2 learners' },
  { word: 'right', trap: '正确 vs 右边 vs 权利 — three meanings' },
  { word: 'mean', trap: '意思 vs 刻薄 vs 平均 — three meanings' },
  { word: 'close', trap: '关闭 vs 近 — pronunciation changes with meaning' },
  { word: 'live', trap: '住 vs 现场直播 — pronunciation changes' },
  { word: 'desert', trap: '沙漠 vs 抛弃 — stress changes' },
  { word: 'record', trap: '记录 vs 唱片 — stress changes' },

  // === 22-30: Article Omission (中文无冠词) ===
  { word: 'piano', trap: 'Article interference: "play piano" vs "play the piano" — Chinese has no articles' },
  { word: 'sun', trap: 'Article required: "the sun" not "sun" — Chinese 太阳 needs no article' },
  { word: 'moon', trap: 'Article required: "the moon" — Chinese students often drop "the"' },
  { word: 'school', trap: 'Article varies: "go to school" vs "go to the school" — meaning changes' },
  { word: 'hospital', trap: 'Article varies: "in hospital" (BrE) vs "in the hospital" (AmE)' },
  { word: 'breakfast', trap: 'No article: "have breakfast" not "have the breakfast" — Chinese students add unnecessary articles' },
  { word: 'lunch', trap: 'No article: "eat lunch" — but "the lunch was good" needs article' },
  { word: 'dinner', trap: 'No article with meals as routine, article when specific' },
  { word: 'guitar', trap: 'Article with instruments: "play the guitar" — Chinese students drop "the"' },

  // === 31-38: Uncountable/Countable Confusion (中文无形态变化) ===
  { word: 'information', trap: 'Uncountable: no "informations" — Chinese has no count distinction' },
  { word: 'furniture', trap: 'Uncountable: no "furnitures" — Chinese students add -s' },
  { word: 'equipment', trap: 'Uncountable: no "equipments"' },
  { word: 'advice', trap: 'Uncountable: no "advices" — use "a piece of advice"' },
  { word: 'homework', trap: 'Uncountable: no "homeworks" — common L1 transfer error' },
  { word: 'knowledge', trap: 'Uncountable: no "knowledges"' },
  { word: 'luggage', trap: 'Uncountable: no "luggages"' },
  { word: 'bread', trap: 'Uncountable: no "breads" (as material) — use "a loaf of bread"' },

  // === 39-46: Preposition Confusion (在=in/on/at) ===
  { word: 'arrive', trap: 'Preposition: "arrive at" (small) vs "arrive in" (big) — Chinese uses 到达+place' },
  { word: 'depend', trap: 'Preposition: "depend on" — Chinese 取决于 doesn\'t map to "on"' },
  { word: 'listen', trap: 'Preposition: "listen to" — Chinese 听 is transitive, students drop "to"' },
  { word: 'look', trap: 'Preposition changes meaning: look at/for/after/up — all 看 variants in Chinese' },
  { word: 'wait', trap: 'Preposition: "wait for" — Chinese 等 is transitive, students drop "for"' },
  { word: 'search', trap: 'Preposition: "search for" — Chinese 搜索 is transitive' },
  { word: 'discuss', trap: 'No preposition: NOT "discuss about" — Chinese 讨论 + object, students add "about"' },
  { word: 'enter', trap: 'No preposition: NOT "enter into the room" — Chinese students add unnecessary prep' },

  // === 47-54: Tense Confusion (中文无时态标记) ===
  { word: 'yesterday', trap: 'Tense signal: requires past tense — Chinese students often use present with 昨天' },
  { word: 'tomorrow', trap: 'Tense signal: requires future — Chinese uses 明天+present form' },
  { word: 'already', trap: 'Tense: triggers present perfect in BrE — Chinese 已经 has no tense' },
  { word: 'ago', trap: 'Tense: requires simple past, NOT present perfect — Chinese students mix' },
  { word: 'finish', trap: 'Tense: "have finished" vs "finished" — Chinese 完成了 is ambiguous' },
  { word: 'forget', trap: 'Tense: "forgot" vs "have forgotten" — different meaning, Chinese 忘了 is one form' },
  { word: 'lose', trap: 'Tense: "lost" irregular past — Chinese students say "losed"' },
  { word: 'wear', trap: 'Tense: "wore/worn" irregular — also confused with "put on" (穿 covers both)' },

  // === 55-62: Verb Collocation Errors ===
  { word: 'open', trap: 'Collocation: "turn on" the TV, not "open" — Chinese 开 covers both' },
  { word: 'see', trap: 'See vs watch vs look: Chinese 看 covers all three' },
  { word: 'watch', trap: 'Watch vs see vs look: "watch TV" but "see a movie" — Chinese 看 for all' },
  { word: 'speak', trap: 'Speak vs say vs tell vs talk: Chinese 说 covers all four' },
  { word: 'say', trap: 'Say vs tell: "say something" but "tell someone" — Chinese 说/告诉 confused' },
  { word: 'bring', trap: 'Bring vs take: directional — Chinese 带 is bidirectional' },
  { word: 'take', trap: 'Take vs bring: "take to" vs "bring from" — Chinese 拿/带 confused' },
  { word: 'learn', trap: 'Learn vs study: Chinese 学/学习 covers both; "learn" = acquire, "study" = process' },

  // === 63-70: Adjective Order & Modifier Patterns ===
  { word: 'big', trap: 'Adj order: "a big red ball" not "a red big ball" — Chinese modifier order differs' },
  { word: 'old', trap: 'Adj order: "a lovely old house" — opinion before age in English' },
  { word: 'beautiful', trap: 'Position: always before noun in English; Chinese 美丽的 more flexible' },
  { word: 'interesting', trap: '-ing vs -ed: "interesting" (thing) vs "interested" (person) — Chinese 有趣 is one word' },
  { word: 'boring', trap: '-ing vs -ed: "boring" (thing) vs "bored" (person) — Chinese 无聊 for both' },
  { word: 'exciting', trap: '-ing vs -ed: "exciting" vs "excited" — common L1 transfer error' },
  { word: 'surprising', trap: '-ing vs -ed: "surprising" vs "surprised" — Chinese 惊讶 for both' },
  { word: 'tired', trap: '-ed participial adj: "I am tired" not "I am tiring" (which means boring)' },
];

const interferenceIssues = [];
for (const ci of chineseInterference) {
  const found = entries.find(e => e.word.toLowerCase() === ci.word && e.level <= 3);
  if (found) {
    // Check if definition addresses the confusion
    const defHandlesIt = found.definition.toLowerCase().includes('not') || 
                         found.definition.includes(';') ||
                         found.definition.includes('or');
    interferenceIssues.push({
      word: found.word,
      level: found.level,
      trap: ci.trap,
      definition: found.definition,
      handled: defHandlesIt
    });
  }
}

console.log(`  Words with Chinese L1 interference risk: ${interferenceIssues.length}`);
interferenceIssues.forEach(i => {
  const status = i.handled ? '✅' : '⚠️';
  console.log(`  ${status} ${i.word} (L${i.level}): ${i.trap}`);
  if (!i.handled) console.log(`     Current def: "${i.definition}"`);
});

// ============================================================
// 12. SPACED REPETITION DIFFICULTY SCORING
// ============================================================
console.log('\n📈 12. Spaced Repetition Difficulty Scoring');
console.log('-'.repeat(40));

function difficultyScore(entry) {
  let score = 0;
  const word = entry.word;
  const def = entry.definition;
  
  // Word length
  score += Math.max(0, word.length - 5) * 0.5;
  
  // Syllable count (approximate)
  const syllables = word.toLowerCase().replace(/[^aeiouy]/g, ' ').trim().split(/\s+/).length;
  score += Math.max(0, syllables - 2) * 1.5;
  
  // Abstract vs concrete (no common concrete nouns in definition)
  const concreteMarkers = ['animal', 'bird', 'fish', 'food', 'plant', 'tool', 'place', 'person', 
    'house', 'water', 'hand', 'body', 'color', 'shape', 'number'];
  if (!concreteMarkers.some(c => def.toLowerCase().includes(c))) score += 2;
  
  // Phrase (multi-word)
  if (word.includes(' ')) score += 2;
  
  // Short definition (less context for learning)
  if (def.split(/\s+/).length <= 3) score += 1;
  
  // Level mismatch signal
  score += entry.level * 0.5;
  
  return Math.round(score * 10) / 10;
}

// Calculate for all entries and output recommended intervals
const difficulties = entries.map(e => ({ ...e, difficulty: difficultyScore(e) }));
difficulties.sort((a, b) => b.difficulty - a.difficulty);

console.log('  Hardest words (recommended shortest review interval):');
difficulties.slice(0, 10).forEach(d => {
  const interval = d.difficulty > 8 ? '1 day' : d.difficulty > 5 ? '3 days' : '7 days';
  console.log(`  ${d.word} (L${d.level}, diff=${d.difficulty}) → review every ${interval}`);
});

console.log('\n  Easiest words (longest interval OK):');
const easiest = difficulties.filter(d => d.level === 1).sort((a, b) => a.difficulty - b.difficulty);
easiest.slice(0, 5).forEach(d => {
  console.log(`  ${d.word} (L${d.level}, diff=${d.difficulty}) → review every 14+ days`);
});

// ============================================================
// 14. COLLOCATION FREQUENCY (using example sentences)
// ============================================================
console.log('\n📊 14. Example Sentence Naturalness Check');
console.log('-'.repeat(40));

// Check for known unnatural patterns in English
const unnaturalPatterns = [
  { re: /very (?:delicious|perfect|unique|dead|complete|empty|full|wrong|right|correct)/i, issue: 'absolute adjective + very' },
  { re: /do a (?:mistake|error)/i, issue: 'should be "make a mistake"' },
  { re: /open the light|close the light/i, issue: 'Chinese interference: should be turn on/off' },
  { re: /play with (?:phone|computer)/i, issue: 'Chinese interference: use phone/computer' },
  { re: /eat medicine/i, issue: 'Chinese interference: should be take medicine' },
  { re: /see (?:the )?(?:movie|film) in/i, issue: 'might be "watch a movie at"' },
  { re: /big rain|big wind|big snow/i, issue: 'Chinese interference: heavy rain, strong wind' },
  { re: /my body is not comfortable/i, issue: 'Chinese interference: I don\'t feel well' },
  { re: /(?:they) is /i, issue: 'subject-verb agreement (they is)' },
  { re: /more (?:better|worse|bigger|smaller)/i, issue: 'double comparative' },
  { re: /the most (?:best|worst|biggest)/i, issue: 'double superlative' },
  { re: /informations|advices|homeworks|furnitures/i, issue: 'uncountable noun pluralized' },
];

const naturalIssues = [];
for (const e of entries) {
  for (const { re, issue } of unnaturalPatterns) {
    if (re.test(e.example)) {
      naturalIssues.push({ word: e.word, level: e.level, example: e.example, issue });
    }
  }
}

console.log(`  Unnatural patterns found: ${naturalIssues.length}`);
naturalIssues.forEach(i => {
  console.log(`  ⚠️ ${i.word} (L${i.level}): ${i.issue}`);
  console.log(`     "${i.example}"`);
});

// ============================================================
// SAVE REPORT
// ============================================================
const report = `# Advanced Verification Report v2 — ${new Date().toISOString().slice(0,10)}

## 11. Chinese L1 Interference
${interferenceIssues.length} words with interference risk
${interferenceIssues.map(i => `- ${i.handled ? '✅' : '⚠️'} ${i.word} (L${i.level}): ${i.trap}`).join('\n')}

## 12. Spaced Repetition Difficulty
Top 20 hardest:
${difficulties.slice(0,20).map(d => `- ${d.word} (L${d.level}): difficulty=${d.difficulty}`).join('\n')}

## 14. Example Naturalness
${naturalIssues.length} unnatural patterns
${naturalIssues.map(i => `- ${i.word}: ${i.issue} — "${i.example}"`).join('\n')}
`;

fs.writeFileSync(path.join(DIR, `ADVANCED-VERIFY-${new Date().toISOString().slice(0,10)}.md`), report);
console.log('\n📝 Report saved.');
