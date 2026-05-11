# Proofcheck Report — 2026-05-11

**Engine:** proofcheck.mjs v1.0
**Entries:** 5205
**Results:** 0 CRITICAL | 0 MAJOR | 135 MINOR

## Issues

### [MINOR] words-level1.js — "peanut" (COMPLEX_DEFINITION)
L1 definition uses complex word(s): underground
**Fix:** Simplify definition for young learners

### [MINOR] words-level2.js — "amber" (COMPLEX_DEFINITION)
L2 definition uses complex word(s): golden-brown
**Fix:** Simplify definition for young learners

### [MINOR] words-level2.js — "cork" (COMPLEX_DEFINITION)
L2 definition uses complex word(s): lightweight
**Fix:** Simplify definition for young learners

### [MINOR] words-level2a.js — "absurd" (COMPLEX_DEFINITION)
L2 definition uses complex word(s): unreasonable
**Fix:** Simplify definition for young learners

### [MINOR] words-level2b.js — "homophone" (COMPLEX_DEFINITION)
L2 definition uses complex word(s): differently
**Fix:** Simplify definition for young learners

### [MINOR] words-level2c.js — "champion" (COMPLEX_DEFINITION)
L2 definition uses complex word(s): competition
**Fix:** Simplify definition for young learners

### [MINOR] words-level2c.js — "dispute" (COMPLEX_DEFINITION)
L2 definition uses complex word(s): disagreement
**Fix:** Simplify definition for young learners

### [MINOR] words-level2c.js — "division" (COMPLEX_DEFINITION)
L2 definition uses complex word(s): organization
**Fix:** Simplify definition for young learners

### [MINOR] words-level2c.js — "fascinate" (COMPLEX_DEFINITION)
L2 definition uses complex word(s): interesting
**Fix:** Simplify definition for young learners

### [MINOR] words-level2c.js — "fault" (COMPLEX_DEFINITION)
L2 definition uses complex word(s): responsibility
**Fix:** Simplify definition for young learners

### [MINOR] words-level2d.js — "convey" (COMPLEX_DEFINITION)
L2 definition uses complex word(s): communicate
**Fix:** Simplify definition for young learners

### [MINOR] words-level2d.js — "debris" (COMPLEX_DEFINITION)
L2 definition uses complex word(s): destruction
**Fix:** Simplify definition for young learners

### [MINOR] words-level2.js — "jade" (SUBJECTIVE_DEF)
Definition contains subjective adjective "pretty": "a smooth green stone used to make pretty things"
**Fix:** Remove subjective adjectives from definitions

### [MINOR] words-level2.js — "pendant" (SUBJECTIVE_DEF)
Definition contains subjective adjective "pretty": "a pretty thing that hangs from a chain you wear"
**Fix:** Remove subjective adjectives from definitions

### [MINOR] words-level4a.js — "embellish" (SUBJECTIVE_DEF)
Definition contains subjective adjective "attractive": "to add extra details to make something more attractive or interesting"
**Fix:** Remove subjective adjectives from definitions

### [MINOR] words-level5c.js — "grotesque" (SUBJECTIVE_DEF)
Definition contains subjective adjective "ugly": "very strange and ugly in a way that looks distorted"
**Fix:** Remove subjective adjectives from definitions

### [MINOR] words-level1.js — "lemon" (CROSS_DEF_CYCLE)
Cross-definition cycle: "lemon" def contains "sour" and "sour" def contains "lemon" (both L1)
**Fix:** Break the cycle: at least one definition should not reference the other word

### [MINOR] words-level2.js — "area" (CROSS_DEF_CYCLE)
Cross-definition cycle: "area" def contains "region" and "region" def contains "area" (both L2)
**Fix:** Break the cycle: at least one definition should not reference the other word

### [MINOR] words-level2b.js — "despite" (CROSS_DEF_CYCLE)
Cross-definition cycle: "despite" def contains "even though" and "even though" def contains "despite" (both L2)
**Fix:** Break the cycle: at least one definition should not reference the other word

### [MINOR] words-level2c.js — "expose" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "to uncover something hidden or show something to the open air"
**Fix:** Rephrase to be more specific

### [MINOR] words-level4c.js — "onset" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "the start of something, especially something unpleasant"
**Fix:** Rephrase to be more specific

### [MINOR] words-level5d.js — "deterrent" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "something that discourages people from doing something wrong"
**Fix:** Rephrase to be more specific

### [MINOR] words-level1.js — "less" (ADJ_NOUN_MISMATCH)
Word appears to be adjective but definition starts with article: "a smaller amount of something..."
**Fix:** Consider rephrasing definition to adjective form

### [MINOR] words-level2.js — "olive" (ADJ_NOUN_MISMATCH)
Word appears to be adjective but definition starts with article: "a small round fruit used to make oil..."
**Fix:** Consider rephrasing definition to adjective form

### [MINOR] words-level2b.js — "on the contrary" (ADJ_NOUN_MISMATCH)
Word appears to be adjective but definition starts with article: "the opposite is true..."
**Fix:** Consider rephrasing definition to adjective form

### [MINOR] words-level2b.js — "graphic" (ADJ_NOUN_MISMATCH)
Word appears to be adjective but definition starts with article: "a picture or chart that explains facts..."
**Fix:** Consider rephrasing definition to adjective form

### [MINOR] words-level3b.js — "distributive" (ADJ_NOUN_MISMATCH)
Word appears to be adjective but definition starts with article: "a rule that lets you break a multiplication proble..."
**Fix:** Consider rephrasing definition to adjective form

### [MINOR] words-level4c.js — "rubric" (ADJ_NOUN_MISMATCH)
Word appears to be adjective but definition starts with article: "a set of guidelines used for grading work..."
**Fix:** Consider rephrasing definition to adjective form

### [MINOR] words-level4c.js — "panegyric" (ADJ_NOUN_MISMATCH)
Word appears to be adjective but definition starts with article: "a speech or text that praises someone or something..."
**Fix:** Consider rephrasing definition to adjective form

### [MINOR] words-level5a.js — "ethic" (ADJ_NOUN_MISMATCH)
Word appears to be adjective but definition starts with article: "a moral rule or principle that guides behavior..."
**Fix:** Consider rephrasing definition to adjective form

### [MINOR] words-level5d.js — "agnostic" (ADJ_NOUN_MISMATCH)
Word appears to be adjective but definition starts with article: "a person who believes it is impossible to know whe..."
**Fix:** Consider rephrasing definition to adjective form

### [MINOR] words-level3b.js — "symmetry" (WHEN_DEFINITION)
Definition starts with "when": "when two sides of something look exactly the same..."
**Fix:** Use "to + verb" for verbs or "a/an + noun" for nouns instead of event description

### [MINOR] words-level1.js — "ladybug" (SAME_LEVEL_DEF_REF)
L1 definition uses "beetle" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "pretzel" (SAME_LEVEL_DEF_REF)
L1 definition uses "salty" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "jelly" (SAME_LEVEL_DEF_REF)
L1 definition uses "spread" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "syrup" (SAME_LEVEL_DEF_REF)
L1 definition uses "thick" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "yogurt" (SAME_LEVEL_DEF_REF)
L1 definition uses "thick" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "peach" (SAME_LEVEL_DEF_REF)
L1 definition uses "fuzzy" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "plum" (SAME_LEVEL_DEF_REF)
L1 definition uses "smooth" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "berry" (SAME_LEVEL_DEF_REF)
L1 definition uses "juicy" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "celery" (SAME_LEVEL_DEF_REF)
L1 definition uses "crunchy" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "pepper" (SAME_LEVEL_DEF_REF)
L1 definition uses "crunchy" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "stew" (SAME_LEVEL_DEF_REF)
L1 definition uses "thick" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "gravy" (SAME_LEVEL_DEF_REF)
L1 definition uses "thick" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "slice" (SAME_LEVEL_DEF_REF)
L1 definition uses "piece" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "elbow" (SAME_LEVEL_DEF_REF)
L1 definition uses "middle" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "thumb" (SAME_LEVEL_DEF_REF)
L1 definition uses "thick" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "forehead" (SAME_LEVEL_DEF_REF)
L1 definition uses "above" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "eyebrow" (SAME_LEVEL_DEF_REF)
L1 definition uses "above" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "boot" (SAME_LEVEL_DEF_REF)
L1 definition uses "ankle" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "glue" (SAME_LEVEL_DEF_REF)
L1 definition uses "sticky" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "tape" (SAME_LEVEL_DEF_REF)
L1 definition uses "sticky" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "ruler" (SAME_LEVEL_DEF_REF)
L1 definition uses "straight" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "jungle" (SAME_LEVEL_DEF_REF)
L1 definition uses "thick" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "thunder" (SAME_LEVEL_DEF_REF)
L1 definition uses "storm" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "lightning" (SAME_LEVEL_DEF_REF)
L1 definition uses "storm" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "breeze" (SAME_LEVEL_DEF_REF)
L1 definition uses "gentle" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "icicle" (SAME_LEVEL_DEF_REF)
L1 definition uses "piece" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "mud" (SAME_LEVEL_DEF_REF)
L1 definition uses "sticky" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "blizzard" (SAME_LEVEL_DEF_REF)
L1 definition uses "storm" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "petal" (SAME_LEVEL_DEF_REF)
L1 definition uses "piece" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "thorn" (SAME_LEVEL_DEF_REF)
L1 definition uses "sharp" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "tiptoe" (SAME_LEVEL_DEF_REF)
L1 definition uses "quietly" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "chase" (SAME_LEVEL_DEF_REF)
L1 definition uses "catch" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "grab" (SAME_LEVEL_DEF_REF)
L1 definition uses "quickly" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "toss" (SAME_LEVEL_DEF_REF)
L1 definition uses "gently" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "squeeze" (SAME_LEVEL_DEF_REF)
L1 definition uses "tight" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "clap" (SAME_LEVEL_DEF_REF)
L1 definition uses "together" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "borrow" (SAME_LEVEL_DEF_REF)
L1 definition uses "later" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "gather" (SAME_LEVEL_DEF_REF)
L1 definition uses "together" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "drag" (SAME_LEVEL_DEF_REF)
L1 definition uses "along" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "fasten" (SAME_LEVEL_DEF_REF)
L1 definition uses "attach" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "thick" (SAME_LEVEL_DEF_REF)
L1 definition uses "narrow" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "thin" (SAME_LEVEL_DEF_REF)
L1 definition uses "thick" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "rough" (SAME_LEVEL_DEF_REF)
L1 definition uses "smooth" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "dull" (SAME_LEVEL_DEF_REF)
L1 definition uses "sharp" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "gentle" (SAME_LEVEL_DEF_REF)
L1 definition uses "rough" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "shy" (SAME_LEVEL_DEF_REF)
L1 definition uses "nervous" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "plain" (SAME_LEVEL_DEF_REF)
L1 definition uses "fancy" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "stale" (SAME_LEVEL_DEF_REF)
L1 definition uses "fresh" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "sour" (SAME_LEVEL_DEF_REF)
L1 definition uses "sharp" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "creamy" (SAME_LEVEL_DEF_REF)
L1 definition uses "smooth" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "loose" (SAME_LEVEL_DEF_REF)
L1 definition uses "tight" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "crooked" (SAME_LEVEL_DEF_REF)
L1 definition uses "straight" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "spare" (SAME_LEVEL_DEF_REF)
L1 definition uses "extra" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "suddenly" (SAME_LEVEL_DEF_REF)
L1 definition uses "quickly" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "forever" (SAME_LEVEL_DEF_REF)
L1 definition uses "ending" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "apart" (SAME_LEVEL_DEF_REF)
L1 definition uses "together" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "forward" (SAME_LEVEL_DEF_REF)
L1 definition uses "toward" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "backward" (SAME_LEVEL_DEF_REF)
L1 definition uses "toward" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "beneath" (SAME_LEVEL_DEF_REF)
L1 definition uses "below" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "among" (SAME_LEVEL_DEF_REF)
L1 definition uses "middle" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "until" (SAME_LEVEL_DEF_REF)
L1 definition uses "certain" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "look at" (SAME_LEVEL_DEF_REF)
L1 definition uses "toward" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "find out" (SAME_LEVEL_DEF_REF)
L1 definition uses "discover" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "amazed" (SAME_LEVEL_DEF_REF)
L1 definition uses "surprised" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "half" (SAME_LEVEL_DEF_REF)
L1 definition uses "equal" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "pair" (SAME_LEVEL_DEF_REF)
L1 definition uses "together" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "double" (SAME_LEVEL_DEF_REF)
L1 definition uses "twice" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "bunch" (SAME_LEVEL_DEF_REF)
L1 definition uses "together" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "portion" (SAME_LEVEL_DEF_REF)
L1 definition uses "amount" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "total" (SAME_LEVEL_DEF_REF)
L1 definition uses "together" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "less" (SAME_LEVEL_DEF_REF)
L1 definition uses "amount" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "more" (SAME_LEVEL_DEF_REF)
L1 definition uses "amount" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "quarter" (SAME_LEVEL_DEF_REF)
L1 definition uses "equal" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "equal" (SAME_LEVEL_DEF_REF)
L1 definition uses "amount" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "pattern" (SAME_LEVEL_DEF_REF)
L1 definition uses "design" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "poem" (SAME_LEVEL_DEF_REF)
L1 definition uses "piece" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "claw" (SAME_LEVEL_DEF_REF)
L1 definition uses "sharp" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "hive" (SAME_LEVEL_DEF_REF)
L1 definition uses "honey" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "trap" (SAME_LEVEL_DEF_REF)
L1 definition uses "catch" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "parade" (SAME_LEVEL_DEF_REF)
L1 definition uses "together" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "dragon" (SAME_LEVEL_DEF_REF)
L1 definition uses "fierce" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "sword" (SAME_LEVEL_DEF_REF)
L1 definition uses "sharp" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "throne" (SAME_LEVEL_DEF_REF)
L1 definition uses "fancy" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "shiver" (SAME_LEVEL_DEF_REF)
L1 definition uses "shake" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "scattered" (SAME_LEVEL_DEF_REF)
L1 definition uses "spread" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "flutter" (SAME_LEVEL_DEF_REF)
L1 definition uses "quickly" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "hear" (SAME_LEVEL_DEF_REF)
L1 definition uses "notice" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "echo" (BRAND_IMAGE_COLLISION)
imageKeyword "echo cave" may return brand/product images instead of the intended meaning
**Fix:** Add descriptive context to disambiguate from brand names

### [MINOR] words-level1.js — "nest" (BRAND_IMAGE_COLLISION)
imageKeyword "bird nest" may return brand/product images instead of the intended meaning
**Fix:** Add descriptive context to disambiguate from brand names

### [MINOR] words-level1.js — "flame" (BRAND_IMAGE_COLLISION)
imageKeyword "flame fire" may return brand/product images instead of the intended meaning
**Fix:** Add descriptive context to disambiguate from brand names

### [MINOR] words-level1.js — "spark" (BRAND_IMAGE_COLLISION)
imageKeyword "spark" may return brand/product images instead of the intended meaning
**Fix:** Add descriptive context to disambiguate from brand names

### [MINOR] words-level2.js — "edge" (BRAND_IMAGE_COLLISION)
imageKeyword "pool edge" may return brand/product images instead of the intended meaning
**Fix:** Add descriptive context to disambiguate from brand names

### [MINOR] words-level2.js — "surface" (BRAND_IMAGE_COLLISION)
imageKeyword "water surface" may return brand/product images instead of the intended meaning
**Fix:** Add descriptive context to disambiguate from brand names

### [MINOR] words-level2.js — "bugle" (MILITARY_CONTEXT)
Example contains military context: "soldier"
**Fix:** Consider replacing with a neutral/civilian context

### [MINOR] words-level3c.js — "homage" (MILITARY_CONTEXT)
Example contains military context: "soldiers"
**Fix:** Consider replacing with a neutral/civilian context

### [MINOR] words-level4c.js — "commemorate" (MILITARY_CONTEXT)
Example contains military context: "soldiers"
**Fix:** Consider replacing with a neutral/civilian context

### [MINOR] words-level4c.js — "fortify" (MILITARY_CONTEXT)
Example contains military context: "soldiers"
**Fix:** Consider replacing with a neutral/civilian context

### [MINOR] words-level4c.js — "garrison" (MILITARY_CONTEXT)
Example contains military context: "soldiers"
**Fix:** Consider replacing with a neutral/civilian context

### [MINOR] words-level4c.js — "propaganda" (MILITARY_CONTEXT)
Example contains military context: "troops"
**Fix:** Consider replacing with a neutral/civilian context

### [MINOR] words-level5b.js — "coup" (MILITARY_CONTEXT)
Example contains military context: "military"
**Fix:** Consider replacing with a neutral/civilian context

### [MINOR] words-level5b.js — "renegade" (MILITARY_CONTEXT)
Example contains military context: "soldier"
**Fix:** Consider replacing with a neutral/civilian context

### [MINOR] words-level5d.js — "conscription" (MILITARY_CONTEXT)
Example contains military context: "army"
**Fix:** Consider replacing with a neutral/civilian context

### [MINOR] words-level5d.js — "subjugate" (MILITARY_CONTEXT)
Example contains military context: "military"
**Fix:** Consider replacing with a neutral/civilian context

### [HIGH] words-level2.js — "state" (MULTI_MEANING)
L2 definition has multiple distinct meanings: "a part of a country; also the condition something is in"
**Fix:** L1-L2 definitions should have a single meaning. Pick the most common/useful one.

### [HIGH] words-level2.js — "amber" (MULTI_MEANING)
L2 definition has multiple distinct meanings: "a warm golden-brown color; also hard material formed from ancient tree sap"
**Fix:** L1-L2 definitions should have a single meaning. Pick the most common/useful one.

### [HIGH] words-level2.js — "mantle" (MULTI_MEANING)
L2 definition has multiple distinct meanings: "a loose cloak worn over the shoulders; also a layer of the Earth beneath the crust"
**Fix:** L1-L2 definitions should have a single meaning. Pick the most common/useful one.

### [HIGH] words-level2a.js — "inherit" (MULTI_MEANING)
L2 definition has multiple distinct meanings: "to receive something from a family member who has died, or to get traits passed down from parents"
**Fix:** L1-L2 definitions should have a single meaning. Pick the most common/useful one.

### [HIGH] words-level2b.js — "turn down" (MULTI_MEANING)
L2 definition has multiple distinct meanings: "to make the sound or heat lower, or to say no to something"
**Fix:** L1-L2 definitions should have a single meaning. Pick the most common/useful one.

### [HIGH] words-level2b.js — "go along with" (MULTI_MEANING)
L2 definition has multiple distinct meanings: "to agree or to work together with"
**Fix:** L1-L2 definitions should have a single meaning. Pick the most common/useful one.

### [HIGH] words-level2d.js — "physical" (MULTI_MEANING)
L2 definition has multiple distinct meanings: "about the body; also real and solid, something you can touch"
**Fix:** L1-L2 definitions should have a single meaning. Pick the most common/useful one.

### [HIGH] words-level2d.js — "reflect" (MULTI_MEANING)
L2 definition has multiple distinct meanings: "to bounce back light or sound, or to think carefully about something"
**Fix:** L1-L2 definitions should have a single meaning. Pick the most common/useful one.

