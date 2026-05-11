# Layer 15: Chinese L1 Negative Transfer Check

**Scope:** All 16 words-level*.js files (5,205 words)
**Date:** 2026-05-11

## Summary

Remarkably clean. Only 2 actual issues found across 5,205 words.

## Issues Found

### 1. BORROW/LEND — Ambiguous Definition (words-level1.js)

**Word:** `borrow`
**Definition:** "to use something and give it back"
**Example:** "Can I borrow your pencil? I will return it soon."

**Problem:** Chinese 借 (jiè) covers both borrowing AND lending. The definition "to use something and give it back" doesn't clearly state the direction — that YOU take something FROM someone else. Compare with `lend` which clearly says "to let someone use YOUR thing." A Chinese-speaking child could still confuse the two because the borrow definition doesn't emphasize the FROM direction.

**Suggested fix:** "to take and use something that belongs to someone else, then give it back"

### 2. BECAUSE…SO — Chinese Transfer Pattern (words-level2d.js)

**Word:** `suspend`
**Example:** "The game was suspended because of rain, so they finished it the next day."

**Problem:** This sentence uses "because X, so Y" — a direct mirror of the Chinese 因为…所以 (yīnwèi…suǒyǐ) pattern. In English, you use one or the other, not both. This example could reinforce a very common Chinese L1 error.

**Suggested fix:** Either:
- "The game was suspended because of rain. They finished it the next day."
- "It rained, so the game was suspended until the next day."

## Checks That Passed Clean

| Transfer Trap | Result |
|---|---|
| look/see/watch confusion | ✅ All vision words use correct verb throughout |
| Countable/uncountable errors | ✅ No "a information", "furnitures", etc. |
| Article (a/an/the) errors | ✅ No missing or incorrect articles found |
| Tense/subject-verb agreement | ✅ All examples grammatically correct |
| Preposition errors | ✅ No "discuss about", "listen the", "enter into" etc. |
| make/do confusion | ✅ No crossover errors |
| say/tell/speak/talk confusion | ✅ No misuse found |
| open/close the light | ✅ Not present |
| although…but pattern | ✅ Not present |
| reason is because | ✅ Not present |

## Verdict

The materials are very safe for Chinese L1 learners. Only 2 items need attention, both minor.
