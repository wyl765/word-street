# FINAL AUDIT REPORT — Word Street Vocabulary Bank
**Date:** 2026-05-04  
**Auditor:** Winston (AI QA)  
**Target:** All `words-level*.js` files in `/projects/word-street/`  
**Context:** Mark, 10yo Chinese boy, MAP 197 (~2nd grade English)

---

## FILE WORD COUNTS

| File | Words |
|------|-------|
| words-level1.js | 600 |
| words-level2.js | 545 |
| words-level2a.js | 400 |
| words-level2b.js | 383 |
| words-level2c.js | 219 |
| words-level2d.js | 258 |
| words-level3.js | 3 |
| words-level3a.js | 232 |
| words-level3b.js | 315 |
| words-level3c.js | 199 |
| words-level4.js | 0 (empty placeholder) |
| words-level4a.js | 302 |
| words-level4b.js | 320 |
| words-level4c.js | 349 |
| words-level5a.js | 247 |
| words-level5b.js | 276 |
| words-level5c.js | 342 |
| words-level5d.js | 324 |
| **GRAND TOTAL** | **5,314** |

---

## Pass 1: STRUCTURAL INTEGRITY — ✅ PASS (with minor notes)

### Duplicates Across Files
**Zero duplicated words found.** Deduplication was successful.

### Missing Fields
**Zero entries with missing fields.** Every entry has all 5 required fields (word, level, definition, example, imageKeyword) with non-empty values.

### JS Syntax
**All files parse correctly.** No trailing comma or bracket issues.

### Notes
- `words-level4.js` is empty (0 words) — appears to be a leftover placeholder
- `words-level3.js` has only 3 words — may be intentional stub

---

## Pass 2: DEFINITION QUALITY — ⚠️ FAIL

### Circular Definitions (word used in its own definition)

| Word | File | Severity | Problem | Fix |
|------|------|----------|---------|-----|
| before | words-level1.js | 🟡 | Def: "it comes first, **before** the next one" | Rewrite: "earlier in time; happening first" |
| let down | words-level2b.js | 🔴 | Def: "to make someone feel **let down**" | Rewrite: "to disappoint someone" |

### "a" → "an" Errors in Definitions

| Word | File | Severity | Problem | Fix |
|------|------|----------|---------|-----|
| document | words-level2c.js | 🟡 | Def: "**a important** piece of paper…" | → "**an important** piece of paper…" |
| feature | words-level2c.js | 🟡 | Def: "**a important** part or quality…" | → "**an important** part or quality…" |
| commemorate | words-level4c.js | 🟡 | Def: "to honor the memory of **a important** person…" | → "…of **an important** person…" |
| plebiscite | words-level4c.js | 🟡 | Def: "a direct vote by all citizens on **a important** public question" | → "…on **an important**…" |

**Total Definition Issues: 6**

---

## Pass 3: EXAMPLE SENTENCE QUALITY — ⚠️ FAIL

### Grammar Errors (a/an)

| Word | File | Severity | Problem | Fix |
|------|------|----------|---------|-----|
| ally | words-level4c.js | 🟡 | "France was **a important** ally…" | → "an important" |
| attribute | words-level5b.js | 🟡 | "Patience is **a important** attribute…" | → "an important" |

### Duplicate Sentences

| Word 1 | Word 2 | Severity | Problem | Fix |
|--------|--------|----------|---------|-----|
| run out (words-level1.js) | run out of (words-level3b.js) | 🟡 | Identical sentence: "We ran out of milk, so Dad went to the store." | Change one example to a different sentence |

**Total Example Issues: 3**

---

## Pass 4: LEVEL APPROPRIATENESS — ⚠️ FAIL

### College/SAT-Level Words Inappropriate for a 10-Year-Old

These 58 words are at Level 5 but represent vocabulary that a 10-year-old would essentially never encounter or need. They are GRE/SAT-prep words, not grade-school academic vocabulary:

| Word | File | Severity | Recommendation |
|------|------|----------|----------------|
| ablation | words-level5d.js | 🔴 | Remove — medical/scientific jargon |
| abeyance | words-level5d.js | 🔴 | Remove — legal/formal register |
| abstemious | words-level5d.js | 🔴 | Remove — GRE word |
| acquiescence | words-level5d.js | 🔴 | Remove — GRE word |
| aegis | words-level5d.js | 🔴 | Remove — archaic/formal |
| apropos | words-level5d.js | 🔴 | Remove — French loanword, adult register |
| assiduous | words-level5d.js | 🔴 | Remove — GRE word |
| beleaguer | words-level5d.js | 🔴 | Remove — rare literary |
| beseech | words-level5d.js | 🔴 | Remove — archaic |
| cadre | words-level5d.js | 🟡 | Remove — political/military jargon |
| castigate | words-level5d.js | 🔴 | Remove — formal/literary |
| dilatory | words-level5d.js | 🔴 | Remove — GRE word |
| ebullient | words-level5d.js | 🔴 | Remove — GRE word |
| incendiary | words-level5a.js | 🟡 | Remove — advanced |
| ineffable | words-level5a.js | 🔴 | Remove — GRE word |
| insidious | words-level5a.js | 🟡 | Borderline — could keep |
| intransigent | words-level5a.js | 🔴 | Remove — GRE word |
| inveterate | words-level5a.js | 🔴 | Remove — GRE word |
| languid | words-level5a.js | 🟡 | Borderline — literary but usable |
| lexicography | words-level5d.js | 🔴 | Remove — specialist term |
| libelous | words-level5a.js | 🔴 | Remove — legal jargon |
| litigious | words-level5a.js | 🔴 | Remove — legal jargon |
| marasmus | words-level5d.js | 🔴 | Remove — medical term, also disturbing |
| maudlin | words-level5a.js | 🔴 | Remove — GRE word |
| milieu | words-level5a.js | 🔴 | Remove — French loanword, adult register |
| moribund | words-level5a.js | 🔴 | Remove — GRE word |
| munificent | words-level5a.js | 🔴 | Remove — GRE word |
| orthodoxy | words-level5d.js | 🟡 | Remove — abstract adult concept |
| parlance | words-level5a.js | 🔴 | Remove — formal/literary |
| parochial | words-level5a.js | 🔴 | Remove — GRE word |
| parsimony | words-level5a.js | 🔴 | Remove — GRE word |
| pecuniary | words-level5a.js | 🔴 | Remove — legal/formal |
| polemical | words-level5b.js | 🔴 | Remove — academic adult |
| prodigal | words-level5b.js | 🟡 | Borderline — biblical context |
| proviso | words-level5b.js | 🔴 | Remove — legal term |
| quiescent | words-level5b.js | 🔴 | Remove — GRE word |
| recant | words-level5b.js | 🔴 | Remove — formal |
| recumbent | words-level5b.js | 🔴 | Remove — GRE word |
| remiss | words-level5b.js | 🔴 | Remove — formal register |
| replete | words-level5b.js | 🔴 | Remove — GRE word |
| sacrilege | words-level5b.js | 🟡 | Borderline |
| schism | words-level5b.js | 🔴 | Remove — GRE/religious |
| sedition | words-level5b.js | 🔴 | Remove — legal/political |
| sequester | words-level5b.js | 🔴 | Remove — legal |
| sobriquet | words-level5b.js | 🔴 | Remove — GRE word |
| specious | words-level5b.js | 🔴 | Remove — GRE word |
| strident | words-level5b.js | 🟡 | Borderline |
| subversive | words-level5b.js | 🟡 | Borderline |
| surfeit | words-level5b.js | 🔴 | Remove — GRE word |
| surreptitious | words-level5b.js | 🔴 | Remove — GRE word |
| temporize | words-level5b.js | 🔴 | Remove — GRE word |
| torpid | words-level5b.js | 🔴 | Remove — GRE word |
| travesty | words-level5b.js | 🟡 | Borderline — usable |
| tumult | words-level5b.js | 🟡 | Borderline |
| ulterior | words-level5b.js | 🟡 | Keep — common enough ("ulterior motive") |
| variegated | words-level5b.js | 🟡 | Remove — botanical/GRE |
| accession | words-level5d.js | 🔴 | Remove — formal/rare |
| acclimate | words-level5d.js | 🟡 | Keep — useful science word |

**Recommendation:** Remove ~40-45 of these 58 words and replace with age-appropriate Level 5 vocabulary that a 10-year-old might encounter in grade-level texts (e.g., *catastrophe, collaborate, predominant, skeptical, phenomenon*).

---

## Pass 5: CONTENT STANDARDS — ✅ PASS (with notes)

- **No offensive content found** in examples
- **No gender stereotypes detected** — good variety of male/female/neutral subjects
- **Context diversity is adequate** — examples span school, nature, sports, home, science
- **imageKeyword values are relevant** and would produce useful images
- **One concern:** "marasmus" definition references "malnourished child" as imageKeyword — potentially distressing image for a children's app

| Word | File | Severity | Problem | Fix |
|------|------|----------|---------|-----|
| marasmus | words-level5d.js | 🟡 | imageKeyword "malnourished child" could produce distressing images | Remove word entirely (also flagged as too advanced) |

---

## Pass 6: LINGUISTIC PRECISION — ✅ PASS (with notes)

- **Spelling:** All words correctly spelled
- **American English consistent:** No British spelling variants detected
- **Parts of speech:** Definitions match actual usage
- **Homophones/homographs:** Most common meaning chosen in all cases

| Word | File | Severity | Problem | Fix |
|------|------|----------|---------|-----|
| orthodontics | words-level5d.js | 🟢 | Example uses as plural noun ("orthodontics treatments") — slightly awkward | → "orthodontic treatments" |
| semantic | words-level5b.js | 🟢 | Extra period in example: "between. 'slim'" | Remove stray period |

---

## SUMMARY OF ALL ISSUES

| Category | Status | Critical (🔴) | Warning (🟡) | Minor (🟢) |
|----------|--------|---------------|--------------|-------------|
| Pass 1: Structure | ✅ PASS | 0 | 0 | 0 |
| Pass 2: Definitions | ⚠️ FAIL | 1 | 5 | 0 |
| Pass 3: Examples | ⚠️ FAIL | 0 | 3 | 0 |
| Pass 4: Level | ⚠️ FAIL | 42 | 16 | 0 |
| Pass 5: Content | ✅ PASS | 0 | 1 | 0 |
| Pass 6: Precision | ✅ PASS | 0 | 0 | 2 |
| **TOTALS** | | **43** | **25** | **2** |

---

## CRITICAL FIXES REQUIRED (before publication)

1. **Fix "let down" circular definition** → "to disappoint someone"
2. **Fix 4× "a important" → "an important"** in definitions (document, feature, commemorate, plebiscite)
3. **Fix 2× "a important" → "an important"** in examples (ally, attribute)
4. **Deduplicate example sentence** for "run out" vs "run out of"
5. **Remove or replace ~40-45 GRE/college-level words** that are inappropriate for a 10-year-old

---

## OVERALL VERDICT

# ❌ NOT CLEAN

**Reason:** While structural integrity is excellent (zero duplicates, zero missing fields, valid syntax across 5,314 words), the bank contains:
- 6 grammar/circular definition errors (easy fixes)
- ~40-45 words that are wildly inappropriate for the target learner (10yo, MAP 197)

**Path to CLEAN:**
1. Apply the 8 text fixes listed above (~5 min)
2. Remove/replace the flagged college-level words (~1-2 hours to select appropriate replacements)
3. Re-run audit

The structural quality is publisher-grade. The content selection for Level 5 needs one more curation pass to ensure every word serves a 10-year-old learner.
