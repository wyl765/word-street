# Vocabulary Audit: Level 1 & Level 2
**Date:** 2026-05-07  
**Auditor:** Gemini (subagent)  
**Target:** 10-year-old ESL student, MAP 197, ~2nd grade English

---

## 🐛 Bug: "key" globally replaced with "important"

| FILE | LINE | WORD | SEVERITY | PROBLEM | SUGGESTED FIX |
|------|------|------|----------|---------|---------------|
| words-level1.js | 339 | spare | critical | Example reads "Mom keeps a spare important under the mat." — "key" was replaced with "important" | Change to "Mom keeps a spare key under the mat." |
| words-level2.js | 217 | fit | critical | Example reads "The important did not fit the lock, so we tried another." imageKeyword is also "important lock" | Change example to "The key did not fit the lock, so we tried another." imageKeyword → "key lock" |
| words-level2.js | 245 | hidden | critical | Example reads "The hidden important was under the mat." imageKeyword is "important under mat" | Change to "The hidden key was under the mat." imageKeyword → "key under mat" |
| words-level2.js | 261 | key | critical | Example reads "The important turned, and the door opened." — the word's own example is broken | Change to "The key turned, and the door opened." |

---

## 📚 Examples using financial/adult vocabulary inappropriate for Level 1–2 kids

| FILE | LINE | WORD | SEVERITY | PROBLEM | SUGGESTED FIX |
|------|------|------|----------|---------|---------------|
| words-level1.js | 383 | against | critical | Example: "He bet against the stock market and actually made money when prices fell." — stock market betting is adult/financial content | Change to "He leaned against the wall and waited." |
| words-level1.js | 511 | adventure | major | Example: "Starting his first lemonade stand was an adventure in learning how money works." — financial literacy framing, doesn't match imageKeyword "adventure" | Change to "Going into the dark cave was a real adventure." |
| words-level2.js | 103 | again | critical | Example: "He checked his savings account balance again to make sure the deposit went through." — banking terminology (savings account, balance, deposit) completely inappropriate for L2 kids. imageKeyword is "poem" (mismatched) | Change to "He read his favorite poem again before bed." (matches imageKeyword) |
| words-level2.js | 139 | blossom | critical | Example: "His small savings began to blossom into a nice amount after a few months." — financial metaphor about savings growth | Change to "The apple tree began to blossom in the warm spring sun." |
| words-level2.js | 548 | rise | major | Example: "We watched the stock price rise higher and higher on the chart." — stock price chart is adult financial content | Change to "We watched the sun rise higher and higher in the sky." |

---

## 🎯 Examples that don't help understand word meaning

| FILE | LINE | WORD | SEVERITY | PROBLEM | SUGGESTED FIX |
|------|------|------|----------|---------|---------------|
| words-level1.js | 202 | dash | major | Example: "He made a quick dash down the court for a fast-break layup." — "fast-break layup" is basketball jargon a 10yo ESL student won't know | Change to "He made a quick dash to the door before it closed." |
| words-level1.js | 304 | fierce | major | Example: "The fierce competition between the two basketball teams made every game exciting." — uses abstract "competition" sense, not the primary "dangerously strong" definition given | Change to "The fierce lion roared and showed its sharp teeth." |
| words-level1.js | 566 | coach | minor | Example: "The basketball coach taught them a new play during halftime." — "halftime" and "a new play" are sports jargon | Change to "The coach showed us how to kick the ball." |
| words-level2.js | 340 | score | minor | Example: "She managed to score the winning basket just as the buzzer sounded." — "buzzer" is unexplained jargon | Change to "She managed to score the winning point for her team." |

---

## 🔀 Level misplacement

| FILE | LINE | WORD | SEVERITY | PROBLEM | SUGGESTED FIX |
|------|------|------|----------|---------|---------------|
| words-level1.js | 384 | through | minor | Function word — already known well before MAP 197; occupies a Level 1 slot that could be a more challenging word | Keep but note it's very easy for the target student |
| words-level1.js | 393 | although | major | A subordinating conjunction that is Level 1 but is harder than many Level 2 words (e.g., "jump", "near", "dark") | Move to Level 2 |
| words-level1.js | 394 | whether | major | Abstract conditional conjunction in Level 1 — harder than L2 words like "beach", "balloon", "bring" | Move to Level 2 |
| words-level1.js | 395 | unless | major | Complex conditional word in Level 1 — requires understanding negation + condition | Move to Level 2 |
| words-level1.js | 174 | drought | major | Relatively advanced concept for Level 1; most L1 words are concrete everyday items | Consider moving to Level 2 |
| words-level2.js | 424 | admiral | major | Rare word — most native 2nd graders don't know this. More appropriate for Level 3 if it existed | Flag as potentially too hard for L2 |
| words-level2.js | 498 | fjord | major | Geographic term most English-speaking adults can't define; way too hard for L2 ESL | Remove or move to advanced level |
| words-level2.js | 462 | bellows | major | Archaic tool — most kids have never seen one | Flag as potentially too hard for L2 |
| words-level2.js | 455 | bagpipe | minor | Uncommon cultural instrument; acceptable but borderline | Keep with note |

---

## 🖼️ imageKeyword producing wrong/ambiguous images

| FILE | LINE | WORD | SEVERITY | PROBLEM | SUGGESTED FIX |
|------|------|------|----------|---------|---------------|
| words-level2.js | 103 | again | major | imageKeyword is "poem" but example is about banking — complete mismatch (see financial fix above) | Fix with example; imageKeyword "poem" works if example is about reading a poem |
| words-level2.js | 217 | fit | critical | imageKeyword is "important lock" — nonsensical due to key→important bug | Fix to "key lock" |
| words-level2.js | 245 | hidden | critical | imageKeyword is "important under mat" — nonsensical due to key→important bug | Fix to "key under mat" |
| words-level1.js | 383 | against | minor | imageKeyword "against wall" is fine, but example is about stock market — mismatch | Fix example to match imageKeyword |
| words-level1.js | 304 | fierce | minor | imageKeyword "fierce tiger" but example talks about basketball competition — mismatch between image and example | Fix example to use a tiger/animal context |
| words-level2.js | 139 | blossom | minor | imageKeyword "cherry blossoms" but example is about savings growing — mismatch | Fix example to actual blossoms |

---

## 🔊 Phonetic confusion potential

| FILE | LINE | WORD | SEVERITY | PROBLEM | SUGGESTED FIX |
|------|------|------|----------|---------|---------------|
| words-level1.js | — | hear / here | minor | "hear" is in L1; if "here" appears in listening games, students may confuse them | Ensure listening games provide sentence context |
| words-level1.js | — | tail / tale | minor | Both "tail" (L1 line ~555) and "tale" (L1 line ~525) exist — homophones in same level | Ensure they don't appear in same listening round; add note |
| words-level1.js | — | flower / flour | minor | "flour" is in L2; "flower" implied by petal/bloom in L1 — homophones across levels | Minor risk; note for listening game design |
| words-level1.js | — | pair / pear | minor | "pair" is in L1; if "pear" is added later they're homophones | Preventive note |
| words-level1.js | — | bare / bear | minor | L2 has "bare"; L1 has "cub" (bear context) — potential confusion | Note for listening game |

---

## Summary

| Severity | Count |
|----------|-------|
| Critical | 9 |
| Major | 13 |
| Minor | 10 |
| **Total** | **32** |

**Top priority fixes:**
1. Fix all 4 "key" → "important" corrupted entries (trivial find-replace)
2. Replace 5 financial/adult examples with age-appropriate ones
3. Review level placement of abstract conjunctions (although, whether, unless)
