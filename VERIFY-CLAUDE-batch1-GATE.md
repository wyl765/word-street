# Gate 6 Review — Batch 1 (Claude)

**Files reviewed:** words-level1.js, words-level2.js, words-level2a.js, words-level2b.js  
**Total words reviewed:** 1,934  
**Date:** 2026-05-11

## Issues Found

| word | file | gate | issue | severity |
|------|------|------|-------|----------|
| fit | words-level2.js | L8 | Common sight word placed at level 2. While the "right size" meaning is valid, students likely know this word already. | NOTE |
| take into account | words-level2b.js | L8 | Idiom is grade 5+ usage; too advanced for level 2 | HIGH |
| account for | words-level2b.js | L8 | Phrasal verb is grade 5+ usage; too advanced for level 2 | HIGH |
| boil down to | words-level2b.js | L8 | Idiom is grade 5+ usage; too advanced for level 2 | HIGH |
| live up to | words-level2b.js | L8 | Phrasal verb is grade 4-5 usage; borderline for level 2 | HIGH |
| rule out | words-level2b.js | L8 | Phrasal verb is grade 4-5 usage; borderline for level 2 | HIGH |
| bail out | words-level2b.js | L8 | Phrasal verb is grade 5+ usage; too advanced for level 2 | HIGH |
| back down | words-level2b.js | L8 | Phrasal verb is grade 4-5 usage; borderline for level 2 | HIGH |
| blot out | words-level2b.js | L8 | Phrasal verb is uncommon; grade 5+ usage | HIGH |
| jelly | words-level1.js | L6 | Example "I like grape jelly on my toast" is too generic — "jelly" could be replaced by many food words without losing meaning | HIGH |
| hazel | words-level2.js | L6 | Example "She has beautiful hazel eyes" — student can't infer meaning of "hazel" from context alone | HIGH |
| especially | words-level2b.js | L6 | Example "I love all fruits, especially strawberries" — limited context clues for fill-in-blank | NOTE |

## Notes (minor, not actionable)

- **Phrasal verb conjugation in examples:** Many phrasal verbs (end up, show up, work out, call off, deal with, hand out, etc.) use conjugated forms in examples (e.g., "ended up", "shows up", "worked out"). This is correct and natural — no issue here, but the game's fill-in-blank logic must handle inflected forms.
- **Body science vocabulary (heart, organ, blood, artery, vein, pulse, capillary, life cycle):** These use words like "blood" in definitions/examples but in a purely scientific/educational context. No cultural sensitivity issue.
- **Level 1 long words (caterpillar, thermometer, disappointed, embarrassed, comfortable, uncomfortable):** These are multi-syllable but are commonly taught in grades 2-3. Acceptable for level 1 given the target learner (MAP 197 ≈ grade 2 reading).
- **"fresco" example mentions "church":** Purely architectural context, no religious teaching. Fine.

## Summary

| Severity | Count |
|----------|-------|
| CRITICAL | 0 |
| HIGH | 10 |
| NOTE | 2 |

**Key finding:** The main issue is ~8 advanced phrasal verbs/idioms in `words-level2b.js` that are likely grade 4-5+ vocabulary, above the target learner's level. Consider moving these to a future level 3 file.

No CRITICAL issues found. All examples contain the target word (in conjugated form where appropriate). Definitions are generally clear and age-appropriate. No cultural sensitivity concerns.
