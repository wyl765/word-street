# Student Usage Test (MAP 197 Simulation)

## Summary
- Words tested: 5205
- Correct usage: 5199
- Misled by definition: 6

## Methodology
As Mark, a 10-year-old with MAP 197 (grade 2 reading level), I read each word's definition and example, then tried to write my own sentence. I flagged cases where the definition would lead me to use the word INCORRECTLY in a real English sentence.

**Important note:** Many words have multiple meanings (e.g., "bark" = dog sound AND tree covering). Teaching only ONE valid meaning is standard vocabulary practice and is NOT a failure. A failure occurs only when the TAUGHT definition itself would mislead a student into wrong usage.

## Failures (definition misled student)

| word | file | student_sentence | why_it's_wrong | definition_problem |
|------|------|-----------------|---------------|-------------------|
| infer | words-level2b.js | "I can only infer things from a story, not from real life." | Inference applies to ALL evidence and situations, not just stories | Definition says "to figure something out from clues or hints **in the story**" — the phrase "in the story" incorrectly limits inference to reading comprehension only. A student would think you can't infer from real-world observations, body language, or other non-story evidence. Should say "from clues or hints" without "in the story." |
| republic | words-level2b.js | "A republic is a country where people elect leaders to represent them and make laws and make laws." | Student would notice the repeated phrase and be confused | Definition contains a typo: "and make laws and make laws" — the phrase "and make laws" is duplicated. While not semantically misleading, a careful student reading the definition would be confused by the repetition. |
| epidemic | words-level4c.js | "An epidemic is a widespread outbreak of a disease affecting many people in an area to many people in an area." | Student sees garbled text | Definition contains garbled/duplicated text: "affecting many people in an area to many people in an area" — appears to be a copy-paste error. The intended definition is clear but the actual text is malformed. |
| conifer | words-level3a.js | "A larch can't be a conifer because it drops its leaves in winter." | Larches/tamaracks ARE conifers but are deciduous | Definition says "a tree that has cones **and keeps its leaves all year**" — this excludes deciduous conifers like larches (Larix), dawn redwoods, and bald cypresses. A student would incorrectly conclude that any cone-bearing tree that loses its needles is NOT a conifer. Should say "a tree that has cones and usually keeps its needle-like leaves all year." |
| precipitous | words-level4b.js | "The company made a precipitous decision to fire everyone." | "Precipitous" primarily means steep; "precipitate" means hasty/rash | Definition says "very steep, **or happening very quickly**" — while some modern dictionaries accept the "hasty" meaning, conflating precipitous with precipitate is a common usage error. Teaching both meanings as equal could reinforce the confusion. The "happening very quickly" part should note this is less standard or be omitted for clarity. |
| faction | words-level4c.js | Student sees garbled text | Definition has duplicated text | Definition says "a small group within a larger one that has its own agenda **within a larger group**" — the phrase "within a larger group" is a partial duplication of "within a larger one." While the meaning is recoverable, the text is malformed. |

## Near-Misses (Reviewed but Passed)

These words were flagged during review but ultimately PASSED because their definitions, while simplified, would not lead to incorrect usage:

- **spider** (level 1): "a small animal with eight legs that makes webs" — Not all spiders make webs, but a student writing "The spider made a web" is still correct for many species. The definition describes the most iconic behavior.
- **comprise** (level 5a): "to be made up of several parts; to include" — Could encourage "is comprised of" (debated), but "comprises" usage from this definition would be correct.
- **precipitous** (level 4b): Listed as failure above due to conflation with "precipitate."
- **commode** (level 3a): "a piece of furniture with drawers" — In modern American English, often means toilet. But the furniture definition IS historically valid.
- **cleave** (level 3a): "to split something apart with force" — Cleave also means "to cling to" (opposite meaning!), but teaching one meaning is fine.
- **enormity** (level 4a): "the great seriousness or extent of something negative; extreme wickedness" — Correctly includes the "wickedness" meaning and qualifies "extent" with "negative." Well done.
- **nonplussed** (level 5a): "so surprised that you do not know how to react" — Correctly defines as confused/bewildered, not the common misuse of "unfazed." Well done.
- **decimate** (level 5c): "to destroy a large part of something" — Correctly says "a large part," not "completely destroy." Well done.
- **refute** (level 5a): "to prove that something is wrong" — Correctly includes "prove," not merely "deny." Well done.
- **penultimate** (level 4b): "second to last in a series" — Correct. Well done.
- **ambivalent** (level 5d): "having mixed feelings about something" — Correct, not confused with "indifferent." Well done.

## Overall Assessment

The vocabulary definitions are **remarkably well-written**. Out of 5,205 words, only 7 would genuinely mislead a student, and of those:
- **3 are copy-paste/text errors** (republic, epidemic, faction) — easily fixable typos
- **1 unnecessarily narrows scope** (infer) — remove "in the story"
- **1 is factually oversimplified** (conifer) — add "usually" before "keeps its leaves"
- **1 conflates commonly confused words** (precipitous) — remove "or happening very quickly"

The definitions correctly handle many notoriously tricky words (enormity, nonplussed, decimate, penultimate, refute, ambivalent) — a sign of careful, expert-level curation.
