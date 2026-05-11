const words = require('./all-words.json');

// As Mark (10yo, MAP 197), I read the definition and try to use the word.
// I need to find cases where the definition itself would MISLEAD me.
// Not cases where the word has other meanings I don't know about -
// that's expected in vocabulary teaching.
// 
// REAL failures are:
// 1. Definition is factually WRONG
// 2. Definition describes the word as wrong part of speech
// 3. Definition is so vague/wrong that my sentence would be incorrect
// 4. Definition describes a different word entirely
// 5. Key information is WRONG (not just missing)

const failures = [];

for (const {word, definition, example, file} of words) {
  const def = definition.toLowerCase();
  const w = word.toLowerCase();
  let fail = null;

  // ===== SPECIFIC CHECKS =====
  
  // "cleave" - has two opposite meanings: to split apart AND to cling to
  // If defined only as "to split" a student might use it correctly for splitting.
  // That's fine - one valid meaning taught.
  
  // "comprise" - "to be made up of several parts; to include"
  // Tricky: "The zoo comprises many animals" is correct.
  // "Many animals comprise the zoo" is WRONG but commonly used.
  // The definition "to be made up of" could lead a student to write:
  // "The class is comprised of 20 students" - which is technically debated
  // But the definition itself is correct. PASS.
  
  // "barbecue" - defined as "cooking food over a fire or grill outdoors"
  // This is a gerund/verb form but barbecue is also a noun (the grill, the event).
  // A student writing "We had a barbecue" based on this def might think barbecue 
  // means the ACT of cooking, not the event. But "We had a barbecue" still works.
  // PASS.
  
  // "batter" - defined as "a mixture of flour, eggs, and milk used for cooking"
  // Batter is also a verb (to hit repeatedly) and a noun (baseball player).
  // But teaching ONE meaning is fine. The taught meaning is correct. PASS.
  
  // "buffet" - "a meal where food is set out and people serve themselves"
  // Also means to strike repeatedly (buff-ET vs BUFF-ay). Teaching one meaning is fine. PASS.
  
  // "correct" (level 3a) - defined as "to fix a mistake" (verb)
  // "correct" is commonly used as an adjective ("the correct answer").
  // If a student ONLY knows the verb meaning, they might write:
  // "That is correct" thinking it means "That has been fixed" - WAIT, no.
  // A student would write "I need to correct my homework" which is fine.
  // The adjective use is different but the verb definition is valid. PASS.
  
  // "grave" - "very serious and important" (adjective)
  // Also a noun (burial place). Teaching adjective is fine. 
  // Definition is correct for that meaning. PASS.
  
  // "principal" - "the most important or main one"  
  // Also means head of a school. The adjective definition is correct.
  // But a student might write "The principal of the school is nice" 
  // and think "principal" means "main one" which... actually still kinda works.
  // PASS.
  
  // "partial" - "not complete, only part of the whole"
  // Also means biased/favoring. Teaching one meaning is fine. 
  // The taught meaning is correct. PASS.
  
  // "due" - "expected at a certain time"
  // Correct for "The homework is due tomorrow." PASS.
  
  // "settle" - "to decide or agree on something after talking"
  // Also: to settle down, to settle in a place. 
  // The taught meaning is valid. PASS.
  
  // "favor" - "to like or support one thing over another"
  // Also a noun (a kind act). Verb definition is correct. PASS.
  
  // "commode" - "a piece of furniture with drawers for storing things"
  // In modern American English, "commode" commonly means a toilet.
  // A student using this definition might write: "I put my clothes in the commode"
  // In historical/furniture contexts this is correct, but most Americans would 
  // think of a toilet. Could be MISLEADING for American students.
  // However, the definition IS one valid meaning. Borderline.
  
  // "buggy" - "a small, light vehicle pulled by a horse"
  // Also means a baby stroller, or full of bugs, or having software bugs.
  // The horse-drawn definition is historically correct. PASS.
  
  // Let me check for genuinely WRONG definitions...
  
  // "immune" - "protected from getting sick"
  // More broadly, immune means protected from something (immune to criticism).
  // But for a child, the disease meaning is primary and correct. PASS.
  
  // "conifer" - "a tree that has cones and keeps its leaves all year"
  // Some conifers are deciduous (larches/tamaracks lose their needles).
  // A student writing "All conifers keep their leaves" would be wrong.
  // But the definition says "a tree that has cones and keeps its leaves" - 
  // it's describing the typical case, not saying ALL do.
  // Still, this could mislead: "The larch is not a conifer because it loses leaves."
  // POTENTIAL ISSUE but very edge case for a 10-year-old.
  
  // "coral" - let me check if it's here
  // "starfish" - if present, check if called "fish"
  
  // Let me check for whales being called fish, or other common errors
  // "whale" - "a very large animal that lives in the ocean and breathes air" - CORRECT, not called fish. PASS.
  
  // "mushroom" - "a type of fungus with a cap and stem that grows in damp places"
  // Good - correctly identified as fungus, not a plant. PASS.
  
  // "peanut" - "a small nut-like seed that grows in a shell underground" 
  // Good - says "nut-like seed" not "nut." Technically a legume. PASS.
  
  // "tomato" - check if called vegetable
  // Let me search for it
  
  // Let me look for specific factual issues in all definitions
  
  // "koala" - if present, check if called "bear"
  // "panda" - check classification
  
  // Check all animal definitions for common misconceptions
  
  // Let me search for specific words
  const wordMap = {};
  for (const w of words) {
    wordMap[w.word.toLowerCase()] = w;
  }
  
  // Words to specifically check:
  const checksNeeded = [
    'koala', 'panda', 'starfish', 'jellyfish', 'seahorse', 'coral',
    'tomato', 'strawberry', 'banana', 'avocado',
    'penguin', 'ostrich', 'bat', 'spider',
    'decimate', 'peruse', 'nonplussed', 'bemused', 'enormity',
    'fortuitous', 'fulsome', 'penultimate', 'travesty',
    'disinterested', 'literally', 'ironic', 'ambivalent',
    'nauseous', 'comprise', 'refute', 'precipitous',
    'infer', 'imply', 'emigrate', 'immigrate',
    'flaunt', 'flout', 'adverse', 'averse',
    'allusion', 'illusion', 'elicit', 'illicit',
    'complement', 'compliment', 'eminent', 'imminent',
    'continuous', 'continual', 'farther', 'further'
  ];
  
  for (const check of checksNeeded) {
    if (wordMap[check]) {
      const entry = wordMap[check];
      console.log(`CHECK: ${check} => "${entry.definition}" [${entry.file}]`);
    }
  }
}
