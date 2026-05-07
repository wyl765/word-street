# Gender Rebalance & Deduplication Fix Report — 2026-05-04

## Summary

All 3 critical/important issues from MEGA-AUDIT-2 have been fixed.

---

## FIX 1: Gender Rebalance ✅

**Before:** 384 male-only / 843 female-only sentences (31% male / 69% female — over-corrected from prior fix)

**Action:** Converted ~25% of female-only examples back to male using pronoun/name swaps (she→he, her→his/him, mother→father, etc.)

**After:** 589 male-only / 632 female-only sentences (**48.2% male / 51.8% female**)

✅ Within 45-55% target range.

---

## FIX 2: L5 Definition Disambiguation ✅

**Before:** 28 nominalization pairs (verb + noun form with near-identical definitions)

**Action:** Removed 25 nominalization forms (Option A — keep the verb/adjective, remove derived noun). Removed:
- conviction, arbitration, fabrication, immigration, domestication, annotation, augmentation, coercion, confiscation, corrosion, culmination, dissemination, emancipation, evasion, exasperation, retaliation, transgression, deference, abdication, apprehension, improvisation, divergence, annexation, endowment, agility

**Kept (both forms useful):** benevolence/benevolent, competent/competence, despotism/despot

**After:** 0 problematic nominalization pairs remain (2 kept pairs have sufficiently different usage contexts).

---

## FIX 3: L2 Example Vocabulary ✅

**Before:** 26 L2 examples using L4/L5 vocabulary (recess, ceremony, assembly, attic, portfolio, network, algorithm, coral, membrane, allegiance, etc.)

**Action:** Rewrote all 26 examples using only L1-L2 vocabulary while preserving meaning.

**After:** 1 technical "violation" remaining — `cell membrane` example uses "membrane" but that IS the target word itself. Not a real violation.

---

## Verification

| Metric | Value |
|--------|-------|
| Total words | 5,222 |
| Duplicates | 0 |
| Valid JS | All 18 files ✓ |
| Gender balance | 48.2% male / 51.8% female ✓ |
| L5 nomination pairs | 0 problematic ✓ |
| L2 vocab violations | 0 real violations ✓ |

### Word counts per file:
- words-level1.js: 604
- words-level2.js: 548
- words-level2a.js: 400
- words-level2b.js: 383
- words-level2c.js: 219
- words-level2d.js: 258
- words-level3.js: 3
- words-level3a.js: 231
- words-level3b.js: 315
- words-level3c.js: 198
- words-level4.js: 2
- words-level4a.js: 301
- words-level4b.js: 311
- words-level4c.js: 344
- words-level5a.js: 232
- words-level5b.js: 251
- words-level5c.js: 334
- words-level5d.js: 288

**Net words removed:** 25 (all L5 nominalizations — learners can derive these from the base forms)

---

## Status: ✅ SHIP-READY

All 3 critical/important audit issues resolved.
