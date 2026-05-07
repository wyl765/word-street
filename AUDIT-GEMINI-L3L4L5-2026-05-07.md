# Vocabulary Audit Report — Levels 3-5
**Date:** 2026-05-07  
**Auditor:** Gemini (AI vocabulary auditor)  
**Target audience:** 10-year-old ESL student

---

## Summary

Files audited: 10 (words-level3a through words-level5d)  
Total words: ~2,830  
Issues found: 28

---

## Issues

| FILE | WORD | SEVERITY | PROBLEM | SUGGESTED FIX |
|------|------|----------|---------|---------------|
| words-level3a.js | "key" (in definition of "principal") | minor | Definition uses "main" which is correct here — no "key→important" bug found in this word | N/A (false alarm on check) |
| words-level3b.js | filly | critical | Definition says "a young female horse" but example says "kicking **his** legs" — pronoun mismatch, filly is female | Change "kicking his legs" → "kicking her legs" |
| words-level3a.js | naked | major | Word "naked" with definition "not wearing any clothes or covering" — potentially inappropriate/awkward for 10-year-old ESL children's app, even though example uses trees | Consider replacing with "bare" or removing from children's vocabulary list |
| words-level3a.js | grave | minor | Definition "very serious and key" — uses "key" where "important" is likely intended | Change "very serious and key" → "very serious and important" |
| words-level3c.js | insolvent | major | "unable to pay the money you owe" — financial/business concept too complex and inappropriate for 10-year-old | Consider removing or replacing with age-appropriate word |
| words-level3c.js | lien | major | "a legal claim on property until a debt is paid" — complex financial/legal term inappropriate for 10-year-old | Remove from Level 3 |
| words-level3a.js | commode | minor | Definition "a piece of furniture with drawers, or a toilet" — mentioning toilet is slightly awkward for children's app | Change to "a piece of furniture with drawers for storing things" |
| words-level4a.js | annihilate | minor | Definition "to destroy something completely" — appropriately defined but example "The hurricane threatened to annihilate the small coastal village" is fairly intense for 10-year-old | Consider softening example |
| words-level3a.js | crone | minor | "an old woman, often in fairy tales" — potentially perceived as ageist/sexist | Add context: "an old woman character in fairy tales, usually with magic powers" |
| words-level3b.js | dragnet | minor | "a wide search by police to find criminals" — example mentions "thieves who robbed the bank", somewhat intense for 10yo | Consider gentler example |
| words-level3a.js | hostile | minor | imageKeyword "hostile cat" — example uses "stray cat gave us a hostile hiss" which is fine but imageKeyword could show a hissing cat rather than generic "hostile cat" | Minor, acceptable |
| words-level4a.js | culpability | minor | Definition "duty for doing something wrong" — should be "responsibility" not "duty" | Change "duty for doing something wrong" → "responsibility for doing something wrong" |
| words-level4a.js | nascent | minor | Definition "just start to develop" — grammar error, missing "starting" | Change "just start to develop" → "just starting to develop" |
| words-level4b.js | obstinate | minor | Definition uses word without clear child-friendly framing — fine as-is | N/A |
| words-level4c.js | genocide | critical | "the deliberate killing of a large group of people based on their identity" — extremely heavy/inappropriate topic for a 10-year-old ESL vocabulary game | Remove from children's vocabulary app entirely |
| words-level5c.js | carnage | critical | "the killing of many people" — graphic violence, inappropriate for 10-year-old | Remove from children's vocabulary app |
| words-level5c.js | massacre | critical | "the killing of many people at once" — graphic violence, inappropriate for 10-year-old | Remove from children's vocabulary app |
| words-level5c.js | homicide | critical | "the killing of one person by another" — inappropriate for children's app | Remove |
| words-level5c.js | autopsy | major | "an examination of a dead body to find the cause of death" — disturbing content for 10-year-old | Remove |
| words-level5d.js | subjugate | major | Word is fine but appears alongside many dark political/violence words that collectively create inappropriate density | Flag for review |
| words-level5c.js | assassination | critical | "the murder of an important person for political reasons" — inappropriate for 10-year-old | Remove |
| words-level5c.js | brutality | major | "very cruel and violent behavior" — too intense for children's vocabulary game | Remove or replace |
| words-level4b.js | turpitude | major | "very immoral behavior" — abstract adult concept, inappropriate complexity for 10yo | Remove |
| words-level3a.js | buoyancy | minor | Example says "kept the swimmer floating **covering** the water" — should be "above" the water | Change "floating covering the water" → "floating above the water" |
| words-level3c.js | citadel (entry for "crouton" in 3a) | minor | Example says "sprinkled crunchy croutons **covering** his Caesar salad" — should be "on" or "over" | Change "covering his Caesar salad" → "on his Caesar salad" |
| words-level4a.js | extraneous | minor | Example has grammar error: "it were extraneous details" | Change "it were extraneous details" → "it included extraneous details" |
| words-level4b.js | media | minor | Definition says "ways of talking info to many people" — awkward phrasing | Change to "ways of communicating information to many people" |
| words-level4c.js | humanitarian | minor | Definition says "sent food, water, and drug to earthquake survivors" — should be "medicine" | Change "drug" → "medicine" |

---

## Pattern: "key" → "important" Bug

Searched all definitions for the word "key" used where "important" was likely intended:

| FILE | WORD | TEXT | VERDICT |
|------|------|------|---------|
| words-level3a.js | grave | "very serious and key" | **BUG CONFIRMED** — should be "very serious and important" |
| words-level4a.js | culpability | "duty for doing something wrong" | Related pattern — "duty" likely should be "responsibility" |

Only 1 clear instance of the "key→important" pattern found.

---

## Overall Assessment

- **Levels 3a-3c:** Generally well-crafted for ESL learners. Some rare/archaic words (baroque, bivouac, buccaneer) are ambitious but acceptable. A few grammar errors in examples.
- **Levels 4a-4c:** Good vocabulary progression. Many SAT-level words (laconic, mendacious, pugnacious) push complexity but definitions are clear. `genocide` must be removed.
- **Levels 5a-5d:** Heavy political/military/violence vocabulary (assassination, massacre, homicide, carnage) is inappropriate for a 10-year-old's vocabulary game regardless of difficulty level. These should be replaced with challenging but age-appropriate words.

---

## Recommendations

1. **Immediate removal (critical):** genocide, carnage, massacre, homicide, assassination
2. **Review for removal (major):** autopsy, brutality, turpitude, naked, insolvent, lien
3. **Fix grammar/typos:** filly (his→her), buoyancy (covering→above), extraneous (it were→it included), nascent (start→starting), humanitarian (drug→medicine), media (talking→communicating)
4. **Fix "key→important" bug:** grave definition
