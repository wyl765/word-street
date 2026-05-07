# Word Street Vocabulary Bank — Clean Check

**Date:** 2026-05-04  
**Files checked:** 18 (words-level1.js through words-level5d.js)  
**Total words:** 5,257

---

## ✅ CHECK 1: Duplicates
**PASS** — Zero duplicate words across all files.

## ✅ CHECK 2: Required Fields
**PASS** — All 5,257 entries have all 5 non-empty fields (word, level, definition, example, imageKeyword).

## ✅ CHECK 3: Valid JavaScript
**PASS** — All 18 files parse successfully with `node -e "require('./<file>')"`.

## ✅ CHECK 4: A/An Grammar
**PASS** — No "a [vowel-sound word]" errors found. Two matches ("a U-shaped") are correct (U sounds like "yoo").

## ⚠️ CHECK 5: Circular Definitions
**1 issue found:**
- `words-level1.js`: **before** → definition: "it comes first, before the next one"

*Severity: Minor — the word "before" is used in its own definition.*

## ✅ CHECK 6: Duplicate Examples
**PASS** — Zero duplicate example sentences.

## ❌ CHECK 7: SAT/GRE/College-Level Words
**19 words inappropriate for a 10-year-old:**

| File | Word |
|------|------|
| words-level4a.js | obsequious, obfuscate |
| words-level4b.js | sycophant, perfunctory, recalcitrant, perspicacious, prevaricate, vicissitude, parsimonious, circumlocution, equivocate |
| words-level4c.js | enervate, verisimilitude, ameliorate, supercilious |
| words-level5b.js | juxtapose |
| words-level5d.js | ubiquitous, ephemeral, magnanimous |

*These are SAT/GRE prep words that no typical 10-year-old would encounter.*

## ⚠️ CHECK 8: Spelling
**No obvious misspellings detected** via pattern matching.

## ⚠️ CHECK 9: British Spelling
**Minor:** 3 instances of "cancelled" (in example sentences/imageKeywords). American preferred spelling is "canceled" but "cancelled" is widely accepted in American English.

---

## Verdict: **NOT CLEAN**

### Blocking Issues:
1. **19 SAT/GRE words** that are inappropriate for a 10-year-old audience (Check 7)

### Non-blocking Issues (fix recommended):
2. 1 circular definition: "before" (Check 5)
3. 3 instances of "cancelled" → "canceled" (Check 9, debatable)
