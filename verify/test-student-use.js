const fs = require('fs');
const path = require('path');

// Load all word files
const dir = path.join(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.match(/^words-level.*\.js$/)).sort();

const allWords = [];
for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const match = content.match(/=\s*(\[.*\])/s);
  if (match) {
    const arr = JSON.parse(match[1]);
    arr.forEach(w => allWords.push({ ...w, file: f }));
  }
}

// Categories of definition problems a 10-year-old would encounter:
const failures = [];

for (const entry of allWords) {
  const { word, definition, example, file } = entry;
  const defLow = definition.toLowerCase();
  const wordLow = word.toLowerCase();
  
  // Check various misleading patterns:
  
  // 1. Definition says "a type of X" but the word isn't actually that type
  // 2. Definition is too vague or circular
  // 3. Definition describes wrong part of speech
  // 4. Definition omits critical context leading to misuse
  // 5. Definition is factually wrong
  
  let problem = null;
  let studentSentence = null;
  let whyWrong = null;
  
  // --- Factual accuracy checks ---
  
  // "peanut" - definition says "nut-like seed" which is actually good
  // "dolphin" - "gray sea animal" - dolphins aren't always gray but close enough
  
  // Check if definition could mislead about part of speech
  // If word is commonly a verb but definition describes it as noun, or vice versa
  
  // "bark" - defined as "the short loud sound a dog makes" (noun) but word is also verb
  // The example uses it as noun which matches, so this is fine for the level
  
  // "crow" - defined as "a black bird that is very smart" - but crow is also a verb (to crow)
  // At level 1, noun definition is fine
  
  // "scale" - "one of the small hard flat pieces that cover a fish or snake's body"
  // A student might not know scale also means weighing device or musical scale
  // But the definition for THIS entry is correct for the meaning taught
  
  // "content" - defined as "happy with what you have" (adjective)
  // But pronounced differently as noun. At this level, adjective is fine.
  
  // Let me check for genuinely misleading definitions:
  
  // "mushroom" - "a type of fungus" - correct, but a kid might think all mushrooms are safe to eat
  // The definition says "grows in damp places" - not misleading for usage
  
  // "pepper" - "a crunchy vegetable that can be red, green, or yellow and is hollow inside"
  // This describes bell pepper specifically. A student writing "I put pepper on my food" 
  // thinking of the spice would be misled... but the definition says "crunchy vegetable"
  // so the student would write about the vegetable, which is correct for bell pepper.
  
  // "grate" - "to rub food on a tool to make tiny pieces" 
  // A student might confuse with "great" but that's spelling, not definition
  
  // "plain" - "not fancy, with nothing on it"
  // Could be confused with "plane" but that's homophone, not definition issue
  
  // "stale" - "old and not fresh anymore" - correct
  
  // "dull" - "not sharp enough to cut, with a flat worn edge"
  // A student might write "The movie was dull" but the definition only covers the "not sharp" meaning
  // However, the definition teaches ONE valid meaning. Using it for "boring" would be outside scope but not wrong.
  
  // "steep" - "going up very sharply, hard to climb"
  // Definition is about incline. Student might not know "steep tea" meaning. Fine for level.
  
  // "bat" - not in the list, but would be an example of ambiguity
  
  // "stable" - defined as "a building where horses live"
  // A student reading this would write "The horse lives in a stable" - correct!
  // They wouldn't know the adjective meaning, but the noun definition is valid.
  
  // "march" - "to walk with big strong steps"
  // Student: "I marched to school" - correct usage. Also a month but different meaning.
  
  // "trunk" - check if it's here
  // Not found in level 1
  
  // "ring" - check
  // Not obvious
  
  // "harbor" - "a safe place where boats stay" - correct
  
  // "toast" - "bread that is cooked until brown" - correct
  // A student wouldn't know "a toast" (drinking) meaning. Fine.
  
  // Let me look for actual problems more systematically
  // Focus on: wrong/incomplete definitions that lead to incorrect usage
}

// Actually, let me be more systematic. I need to check each word's definition
// against its ACTUAL meaning and see if a student using ONLY the definition
// would construct a wrong sentence.

// Let me output all words with their definitions for analysis
// and flag specific categories of problems

const issues = [];

for (const entry of allWords) {
  const { word, definition, example, file } = entry;
  const defLow = definition.toLowerCase();
  
  // Pattern 1: Definition uses "you" making it sound like instruction
  // e.g., "to X" for a noun - wrong part of speech signal
  
  // Pattern 2: Definition is circular (uses the word itself)
  if (defLow.includes(word.toLowerCase()) && word.length > 3) {
    // Check if it's truly circular
    const defWords = defLow.split(/\s+/);
    const isCircular = defWords.some(w => w.replace(/[^a-z]/g, '') === word.toLowerCase());
    if (isCircular) {
      // Some circularity is fine: "a baby dog" for puppy is not circular
      // "freezing: so cold like ice" - not circular
      // Check if the definition ONLY defines by referencing the word
    }
  }
  
  // Pattern 3: Overly narrow definition that excludes common usage
  // Pattern 4: Wrong factual information
  // Pattern 5: Missing critical info that changes meaning
  
  // Let me just output them all to a file and analyze manually
}

// Output all words to JSON for analysis
fs.writeFileSync(path.join(__dirname, 'all-words.json'), JSON.stringify(allWords, null, 2));
console.log(`Exported ${allWords.length} words to all-words.json`);
