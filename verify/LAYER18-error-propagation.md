# Layer 18: Error Propagation Analysis

**Total words analyzed:** 5,205 (all 16 word files)
**Words with ≥3 char used in dependency matching**

## Top 20 Keystone Words (most referenced in other definitions)

These words appear most frequently in the definitions of OTHER words. If any keystone word's definition is wrong, the error propagates to all words that reference it.

| Rank | Word | Level | Referenced By Count | Definition | Quality Assessment |
|------|------|-------|-------------------|------------|-------------------|
| 1 | make | level2 | 172 | to create or put together; also to cause a change | ✅ Solid — covers both "create" and "cause" senses |
| 2 | about | level2 | 155→171 | on the subject of | ✅ Solid — simple and accurate |
| 3 | without | level1 | 102 | not having; with none of | ✅ Solid |
| 4 | together | level1 | 86 | with each other, side by side or in the same group | ✅ Solid |
| 5 | strong | level2 | 83 | having a lot of power | ✅ Solid — simple, correct |
| 6 | than | level1 | 81 | a word used to compare two things | ✅ Solid |
| 7 | more | level1 | 80 | a bigger amount of something | ✅ Solid |
| 8 | many | level1 | 71 | a large number of people or things | ✅ Solid |
| 9 | over | level2 | 60 | above or across | ✅ Solid — captures key senses |
| 10 | through | level1 | 57 | going in one end and out the other | ✅ Solid — vivid and accurate |
| 11 | around | level1 | 56 | following a path that makes a circle or loop | ⚠️ Minor — misses the "approximately" and "surrounding/nearby" senses that many referencing definitions use |
| 12 | country | level2 | 56 | a land with its own government and people | ✅ Solid |
| 13 | often | level1 | 55 | many times, again and again | ✅ Solid |
| 14 | state | level2 | 55 | a part of a country | ⚠️ Narrow — misses "condition/status" sense used heavily in referencing definitions (e.g., "state of balance", "state of being") |
| 15 | move | level2 | 54 | to change position | ✅ Solid |
| 16 | after | level1 | 53 | following in time; coming behind | ✅ Solid |
| 17 | change | level2 | 53 | to become different | ✅ Solid |
| 18 | also | level2 | 52 | too; as well | ✅ Solid |
| 19 | especially | level2b | 51 | more than usual; mainly | ✅ Solid |
| 20 | area | level2 | 50 | the space inside a shape | ⚠️ Narrow — misses "region/field of study" sense used by many referencing words |

## Dependency Chains (longest paths)

The longest dependency chains show how a definition error can cascade through many levels. The chain reads: word A's definition uses word B, whose definition uses word C, etc.

| Rank | Length | Chain |
|------|--------|-------|
| 1 | 16 | debris → scattered → spread → thin → thick → narrow → barely → tiny → almost → quite → than → compare → look at → turn → change → become |
| 2 | 16 | condensation → vapor → mist → thin → thick → narrow → barely → tiny → almost → quite → than → compare → look at → turn → change → become |
| 3 | 16 | disperse → scatter → spread → thin → thick → narrow → barely → tiny → almost → quite → than → compare → look at → turn → change → become |
| 4 | 16 | dissipate → scatter → spread → thin → thick → narrow → barely → tiny → almost → quite → than → compare → look at → turn → change → become |
| 5 | 15 | jelly → spread → thin → thick → narrow → barely → tiny → almost → quite → than → compare → look at → turn → change → become |
| 6 | 15 | scattered → spread → thin → thick → narrow → barely → tiny → almost → quite → than → compare → look at → turn → change → become |
| 7 | 15 | pagoda → tower → thin → thick → narrow → barely → tiny → almost → quite → than → compare → look at → turn → change → become |
| 8 | 15 | foggy → mist → thin → thick → narrow → barely → tiny → almost → quite → than → compare → look at → turn → change → become |
| 9 | 15 | virus → spread → thin → thick → narrow → barely → tiny → almost → quite → than → compare → look at → turn → change → become |
| 10 | 15 | distribute → spread → thin → thick → narrow → barely → tiny → almost → quite → than → compare → look at → turn → change → become |

### Critical Chain Analysis

The longest chains all converge on a common backbone:
```
thin → thick → narrow → barely → tiny → almost → quite → than → compare → look at → turn → change → become
```

This 13-word backbone is the "spinal cord" of the dependency graph. Key links:
- **thin** ("not thick") → references **thick**
- **thick** ("wide from one side to the other; not narrow") → references **narrow**
- **narrow** ("so thin from side to side that there is barely room") → references **barely**
- **barely** ("only just, by a tiny bit") → references **tiny**
- **tiny** ("so small you can almost not see it") → references **almost**
- **almost** ("very close but not quite") → references **quite**
- **quite** uses **than** → **compare** → **look at** → **turn** → **change** → **become**

## Risk Assessment

| Keystone Word | Definition Quality | Risk If Wrong | Impact Details |
|--------------|-------------------|---------------|----------------|
| **make** | ✅ Good | 🔴 CRITICAL — 172 words affected | Most-referenced word in entire bank. Definition is solid. |
| **about** | ✅ Good | 🔴 CRITICAL — 171 words affected | Used in nearly every descriptive definition. Safe. |
| **without** | ✅ Good | 🔴 HIGH — 102 words affected | Fundamental function word. Definition correct. |
| **together** | ✅ Good | 🟡 HIGH — 86 words affected | Core concept word. Definition solid. |
| **strong** | ✅ Good | 🟡 HIGH — 83 words affected | Definition correct and age-appropriate. |
| **state** | ⚠️ Incomplete | 🔴 CRITICAL — 55 words affected | Definition only covers "part of a country" but many referencing words use it as "condition/status". A learner reading "state of balance" would be confused. **RECOMMEND: add "a condition or way something is" sense.** |
| **around** | ⚠️ Incomplete | 🟡 MEDIUM — 56 words affected | Definition focuses on circular motion but many refs use "approximately" or "surrounding" senses. Minor risk since context usually clarifies. |
| **area** | ⚠️ Incomplete | 🟡 MEDIUM — 50 words affected | Definition focuses on geometric space but many refs use "region/zone" sense. **RECOMMEND: add "a region or section of a place".** |
| **thin** | ✅ Good | 🟡 HIGH — chain backbone | Part of the longest dependency chain (16 steps). Definition is correct. |
| **spread** | ✅ Assumed good | 🟡 HIGH — chain feeder | Multiple chain-starting words feed through "spread". Critical junction point. |

## Summary

### Key Findings

1. **The word bank is remarkably well-defined.** Of the top 20 most-referenced words, only 3 have definition issues, and those are incomplete rather than incorrect.

2. **Three definitions need attention:**
   - **state** (55 refs): Missing "condition" sense — highest priority fix
   - **area** (50 refs): Missing "region" sense — medium priority
   - **around** (56 refs): Missing "approximately/surrounding" senses — low priority (context usually disambiguates)

3. **Dependency chains are long but safe.** The longest chain (16 steps) runs through fundamental adjectives and function words whose definitions are all correct. No cascading error risk in the backbone.

4. **Common words dominate.** The top keystones are all function words (make, about, without, together, than, more) whose definitions are simple and correct. This is the ideal pattern — the most-referenced words are the most bulletproof.

5. **No critical error propagation detected.** The only real risk is the incomplete "state" definition, which could confuse learners encountering 55+ words that reference it in the "condition" sense.
