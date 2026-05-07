# Cross-Review: Round 2 Verification

**Reviewer:** Claude (Round 2 Cross-Auditor)  
**Date:** 2026-05-08  
**Scope:** words-level1.js + words-level2.js

---

## 1. False Positives in GPT/Gemini Findings

### GPT — Mostly Valid
- **imageKeyword duplicates (rule/raise, message/note):** Valid finding, correctly fixed.
- **"magic" example not using target word:** Valid, correctly fixed.
- **Definition simplification reducing distinction (rule, citizen, action, choice, cause):** Partially a false alarm. Looking at the current file: `rule` ("something you must follow") and `law` ("an official rule") are actually distinct enough for a child. `citizen` is fine. `cause`/`effect` pair is clear. This was more of a subjective concern than a real bug.

### Gemini — Some Overcalls
- **6 abstract words don't belong in Level 1 (although, whether, unless, seldom, eventually, throughout):** **Partially valid, partially overcall.** `while`, `until`, `since`, `during` are already in Level 1 and are equally abstract connectors. The real issue is `seldom` and `eventually` — these are legitimately rare/advanced for a Level 1 learner (6-7 year old). But `although`, `whether`, `unless` are used in children's speech by age 6-7 and are fine in Level 1. **Verdict: seldom + eventually are valid flags; the other 4 are overcalls.**
- **Definitions using words Mark doesn't know (fungus, gracefully, inlet, plaster, grinding):** Looking at the actual file:
  - `mushroom` = "a type of fungus that grows in damp places" → **Valid!** Still in the file. "Fungus" is not a word a Level 1 kid knows.
  - `swan` = "swims gracefully" → **Valid!** Still there. "Gracefully" is Level 1 vocabulary itself (word #265 in the file), so it's circular.
  - `fjord` = "a long narrow inlet of sea between cliffs" → This is Level 2; "inlet" is reasonable for L2 definitions. **Overcall.**
  - `plaster`, `grinding` — I don't see these in current definitions. May have been fixed or was a false positive.
- **Homophone confusion pairs (whether/weather, heal/heel, tale/tail, loose/lose):** These are all present across both levels. But this is NOT a problem — it's actually **good pedagogy** to include homophones. The app teaches reading; encountering both forms is intentional exposure. **Overcall — these are features, not bugs.**
- **Near-synonym overload (beneath/below/under, huge/enormous/gigantic):** Looking at Level 1: `beneath`, `below`, `above` are all there. `huge`, `enormous`, `gigantic` are all there. For a vocabulary app this IS potentially confusing to a young learner who can't distinguish them. **Valid concern for huge/enormous/gigantic** (three words with near-identical definitions and overlapping imageKeywords). `beneath`/`below` is less of an issue since they have slightly different usage patterns shown in examples.

---

## 2. Shared Blind Spots (What Both Missed)

### A. Definition Circularity
Neither reviewer caught definitions that use words from the SAME level that the learner hasn't necessarily learned yet:
- `swan`: "swims **gracefully**" — `graceful` is word #265 in L1; learner may not have encountered it yet
- `toad`: "like a **frog** but with rough dry skin" — relies on knowing `frog` (fine if sequenced, but no guarantee)
- `foal`: defined as "a baby horse" but `pony` is defined as "a small horse" — a child might confuse foal/pony

### B. Inconsistent Definition Style for Similar Categories
- Animal babies: `puppy` = "a baby dog", `kitten` = "a baby cat", `cub` = "a baby bear **or lion**" — why does cub get two animals?
- `fawn` = "a baby deer" vs `foal` = "a baby horse" — consistent ✓
- But `chick` = "a baby chicken" while we also have `hen` ("a female chicken") and `rooster` ("a male chicken") — the parent terms use "chicken" but there's no "chicken" entry. Fine for context, but slightly odd.

### C. imageKeyword Issues Neither Caught
1. **Vague/generic imageKeywords that would return bad results:**
   - `"dripping water"`, `"shaking salt shaker"`, `"loudly"`, `"quickly fast"`, `"slowly turtle"`, `"perhaps maybe"`, `"cozy fireplace room"` — many of these won't find good images
   - `"against wall"`, `"apart separate"`, `"along path"` — too abstract for image search
   
2. **imageKeyword doesn't match the word's primary meaning:**
   - `bark` → imageKeyword is "dog barking" ✓ (but the word also means tree bark — no disambiguation note)
   - `palm` → "palm hand" ✓ (but also a palm tree — same issue)
   - `scale` → "fish scale" ✓ (but also weighing scale, which is `weigh`'s keyword)

### D. Level Assignment Issues Neither Caught
- **Level 1 has phrasal verbs** (`pick up`, `put down`, `look at`, etc. — 25+ entries). Phrasal verbs are multi-word items that require understanding of verb+particle semantics. These are arguably harder than many Level 2 single words like `bicycle`, `breakfast`, `balloon`. Neither reviewer questioned this.
- **Level 2 includes words simpler than many Level 1 words:** `arm`, `jump`, `make`, `find`, `little`, `under`, `near`, `dark`, `lunch`, `dinner`, `breakfast`, `bicycle`, `balloon` — these are all basic sight words / high-frequency vocabulary that most English-speaking 5-year-olds know. They should be Level 1 or pre-Level 1, not Level 2. **This is a significant structural problem.**

### E. Example Sentence Issues
1. **Several Level 2 examples use past tense of the word rather than the headword form:**
   - `realize`: "I **realized** my mittens…" (not "realize")
   - `decide`: "I **decided** to bring…" 
   - `arrive`: example uses present tense ✓, but definition pattern is inconsistent with others
   
   This isn't necessarily wrong (natural usage), but it's inconsistent — some entries use base form, others use inflected forms.

2. **Level 1 word `hear`**: "You can hear the crowd cheering at the basketball game from outside." — This is oddly specific/complex for a Level 1 sentence. Compare to `bark`: "The dog would bark when someone knocked on the door." Much simpler.

3. **Level 1 word `than`**: The example and imageKeyword are basketball-themed, suggesting it was added in a batch with `hear` and `lose`. The definition is fine but the imageKeyword "basketball scoreboard comparing two numbers" is unlikely to clearly teach the word "than."

### F. Missing Reciprocal/Logical Pairs
- Level 1 has `lend` and `borrow` ✓
- Level 1 has `before` and `after` ✓  
- But: `buy` is missing (while `store`, `cost`, `price`, `bargain`, `refund` are in Level 2)
- `sell` is missing
- `give` is missing (while `share`, `trade`, `lend` are all present)
- `open` is missing (while `close` is in Level 2)

### G. Duplicate Concepts Across Levels
- Level 1 `scared` (not present as standalone, but covered by `frightened`, `terrified`) + Level 2 `scared` + Level 2 `afraid` — three words for the same concept across two levels
- Level 1 `discover` + Level 2 `find` — `find` is simpler and should come first
- Level 1 `cheerful` + Level 2 `glad` — again, `glad` is simpler

---

## 3. New Issues Found (Missed by Both)

### Critical
| # | Issue | Word(s) | Details |
|---|-------|---------|---------|
| 1 | **Level misassignment (L2 too easy)** | arm, jump, make, find, little, under, near, dark, lunch, dinner, breakfast, balloon, bicycle, key, knee, laugh, learn, listen | These are top-500 English frequency words. A child who needs Level 2 vocabulary instruction already knows these. They inflate the word count without teaching anything. |
| 2 | **mushroom def uses "fungus"** | mushroom (L1) | Definition: "a type of fungus that grows in damp places." A 6-year-old doesn't know "fungus." Should be: "a living thing shaped like a small umbrella that grows in wet places." |
| 3 | **swan def uses "gracefully"** | swan (L1) | "gracefully" is itself a vocabulary word in this level. Circular. |
| 4 | **Phrasal verbs mixed with single words** | pick up, put down, look at, etc. (25 entries in L1) | These should be a separate category or clearly flagged. Image search for "picking up" won't help a child distinguish "pick up" from "pick." |

### Moderate
| # | Issue | Word(s) | Details |
|---|-------|---------|---------|
| 5 | **imageKeyword too abstract** | perhaps, anyway, instead, already, barely, exactly, apart, forward, backward, during, although, whether, unless, eventually, seldom | Abstract concepts don't have searchable images. These need custom illustrations or metaphorical keywords. |
| 6 | **L2 "main idea" is a two-word term** | main idea (L2) | Only phrasal verbs were intended as multi-word entries. "Main idea" is a reading comprehension term, not vocabulary. |
| 7 | **Potential cultural issue** | knight, princess, wizard, fairy, dragon, castle, throne, crown, sword, shield, wand | 11 words in L1 are European fantasy vocabulary. For ESL learners in non-Western contexts, these may lack contextual grounding. Not wrong, but worth noting. |
| 8 | **"cocoon" definition is wrong** | cocoon (L2) | Definition says "the wrap a caterpillar makes around itself before it becomes a moth." Butterflies also make chrysalises (not cocoons), but the app has `caterpillar` defined as becoming "a butterfly or moth." The distinction is muddled. |

### Minor
| # | Issue | Word(s) | Details |
|---|-------|---------|---------|
| 9 | **Inconsistent article usage in definitions** | Various | Some defs start with "a/an" (e.g., "a baby dog"), others don't (e.g., "bread that is cooked until brown"). Should standardize. |
| 10 | **imageKeyword format inconsistency** | Various | Some use noun only ("puppy"), some use adjective+noun ("baby deer"), some use full phrases ("child whispering in ear"), some use action ("stomping foot"). No clear standard. |
| 11 | **"citizen" moved to L2 but definition assumes understanding of "votes"** | citizen (L2) | Example: "As a citizen, my mom votes in our town." This requires understanding `vote` — which is also L2. Fine if encountered in sequence, risky if random. |

---

## Summary

**GPT false positives:** 1 (the "definition distinction" concern was mostly subjective)  
**Gemini false positives:** 2 (homophones are features; 4 of 6 "too abstract" words are fine)  
**Gemini valid finds still unfixed:** mushroom "fungus" definition, swan "gracefully"  
**Biggest blind spot both missed:** Level 2 contains ~20 words that are simpler than Level 1 words, suggesting the level assignment was done inconsistently or in batches with different criteria.

---

*Claude, Round 2. QED.*
