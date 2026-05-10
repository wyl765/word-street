# Proofcheck Report — 2026-05-10

**Engine:** proofcheck.mjs v1.0
**Entries:** 5211
**Results:** 0 CRITICAL | 0 MAJOR | 192 MINOR

## Issues

### [MINOR] words-level1.js — "cozy" (COMPLEX_DEFINITION)
L1 definition uses complex word(s): comfortable
**Fix:** Simplify definition for young learners

### [MINOR] words-level2.js — "detail" (COMPLEX_DEFINITION)
L2 definition uses complex word(s): information
**Fix:** Simplify definition for young learners

### [MINOR] words-level2.js — "bulb" (COMPLEX_DEFINITION)
L2 definition uses complex word(s): underground
**Fix:** Simplify definition for young learners

### [MINOR] words-level2.js — "bunker" (COMPLEX_DEFINITION)
L2 definition uses complex word(s): underground
**Fix:** Simplify definition for young learners

### [MINOR] words-level2.js — "cocoon" (COMPLEX_DEFINITION)
L2 definition uses complex word(s): caterpillar
**Fix:** Simplify definition for young learners

### [MINOR] words-level2a.js — "rusty" (COMPLEX_DEFINITION)
L2 definition uses complex word(s): reddish-brown
**Fix:** Simplify definition for young learners

### [MINOR] words-level2a.js — "controversy" (COMPLEX_DEFINITION)
L2 definition uses complex word(s): disagreement
**Fix:** Simplify definition for young learners

### [MINOR] words-level2b.js — "check out" (COMPLEX_DEFINITION)
L2 definition uses complex word(s): interesting
**Fix:** Simplify definition for young learners

### [MINOR] words-level2b.js — "namely" (COMPLEX_DEFINITION)
L2 definition uses complex word(s): specifically
**Fix:** Simplify definition for young learners

### [MINOR] words-level2b.js — "notably" (COMPLEX_DEFINITION)
L2 definition uses complex word(s): interesting
**Fix:** Simplify definition for young learners

### [MINOR] words-level2b.js — "blend in" (COMPLEX_DEFINITION)
L2 definition uses complex word(s): surroundings
**Fix:** Simplify definition for young learners

### [MINOR] words-level2b.js — "chromosome" (COMPLEX_DEFINITION)
L2 definition uses complex word(s): instructions
**Fix:** Simplify definition for young learners

### [MINOR] words-level2c.js — "contest" (COMPLEX_DEFINITION)
L2 definition uses complex word(s): competition
**Fix:** Simplify definition for young learners

### [MINOR] words-level2c.js — "dimension" (COMPLEX_DEFINITION)
L2 definition uses complex word(s): measurement
**Fix:** Simplify definition for young learners

### [MINOR] words-level2c.js — "encounter" (COMPLEX_DEFINITION)
L2 definition uses complex word(s): unexpectedly
**Fix:** Simplify definition for young learners

### [MINOR] words-level2c.js — "fascinate" (COMPLEX_DEFINITION)
L2 definition uses complex word(s): interesting
**Fix:** Simplify definition for young learners

### [MINOR] words-level2c.js — "fault" (COMPLEX_DEFINITION)
L2 definition uses complex word(s): responsibility
**Fix:** Simplify definition for young learners

### [MINOR] words-level2c.js — "inquire" (COMPLEX_DEFINITION)
L2 definition uses complex word(s): information
**Fix:** Simplify definition for young learners

### [MINOR] words-level2c.js — "liable" (COMPLEX_DEFINITION)
L2 definition uses complex word(s): responsible
**Fix:** Simplify definition for young learners

### [MINOR] words-level2c.js — "notable" (COMPLEX_DEFINITION)
L2 definition uses complex word(s): interesting
**Fix:** Simplify definition for young learners

### [MINOR] words-level4a.js — "embellish" (SUBJECTIVE_DEF)
Definition contains subjective adjective "attractive": "to add details to make something more attractive or cool"
**Fix:** Remove subjective adjectives from definitions

### [MINOR] words-level4b.js — "utilitarian" (SUBJECTIVE_DEF)
Definition contains subjective adjective "attractive": "designed to be useful rather than attractive"
**Fix:** Remove subjective adjectives from definitions

### [MINOR] words-level5c.js — "calligraphy" (SUBJECTIVE_DEF)
Definition contains subjective adjective "beautiful": "the art of beautiful handwriting"
**Fix:** Remove subjective adjectives from definitions

### [MINOR] words-level5c.js — "grotesque" (SUBJECTIVE_DEF)
Definition contains subjective adjective "ugly": "very ugly or strange in a way that is unpleasant"
**Fix:** Remove subjective adjectives from definitions

### [MINOR] words-level5d.js — "captivating" (SUBJECTIVE_DEF)
Definition contains subjective adjective "attractive": "very interesting and attractive"
**Fix:** Remove subjective adjectives from definitions

### [MINOR] words-level5d.js — "ornate" (SUBJECTIVE_DEF)
Definition contains subjective adjective "pretty": "made pretty with many small details"
**Fix:** Remove subjective adjectives from definitions

### [MINOR] words-level1.js — "lemon" (CROSS_DEF_CYCLE)
Cross-definition cycle: "lemon" def contains "sour" and "sour" def contains "lemon" (both L1)
**Fix:** Break the cycle: at least one definition should not reference the other word

### [MINOR] words-level1.js — "tiny" (CROSS_DEF_CYCLE)
Cross-definition cycle: "tiny" def contains "barely" and "barely" def contains "tiny" (both L1)
**Fix:** Break the cycle: at least one definition should not reference the other word

### [MINOR] words-level1.js — "thick" (CROSS_DEF_CYCLE)
Cross-definition cycle: "thick" def contains "thin" and "thin" def contains "thick" (both L1)
**Fix:** Break the cycle: at least one definition should not reference the other word

### [MINOR] words-level1.js — "after" (CROSS_DEF_CYCLE)
Cross-definition cycle: "after" def contains "later" and "later" def contains "after" (both L1)
**Fix:** Break the cycle: at least one definition should not reference the other word

### [MINOR] words-level2.js — "country" (CROSS_DEF_CYCLE)
Cross-definition cycle: "country" def contains "nation" and "nation" def contains "country" (both L2)
**Fix:** Break the cycle: at least one definition should not reference the other word

### [MINOR] words-level2.js — "chart" (CROSS_DEF_CYCLE)
Cross-definition cycle: "chart" def contains "table" and "table" def contains "chart" (both L2)
**Fix:** Break the cycle: at least one definition should not reference the other word

### [MINOR] words-level2.js — "also" (CROSS_DEF_CYCLE)
Cross-definition cycle: "also" def contains "in addition" and "in addition" def contains "also" (both L2)
**Fix:** Break the cycle: at least one definition should not reference the other word

### [MINOR] words-level2.js — "build" (CROSS_DEF_CYCLE)
Cross-definition cycle: "build" def contains "make" and "make" def contains "build" (both L2)
**Fix:** Break the cycle: at least one definition should not reference the other word

### [MINOR] words-level2.js — "circle" (CROSS_DEF_CYCLE)
Cross-definition cycle: "circle" def contains "round" and "round" def contains "circle" (both L2)
**Fix:** Break the cycle: at least one definition should not reference the other word

### [MINOR] words-level2.js — "clue" (CROSS_DEF_CYCLE)
Cross-definition cycle: "clue" def contains "hint" and "hint" def contains "clue" (both L2)
**Fix:** Break the cycle: at least one definition should not reference the other word

### [MINOR] words-level2.js — "confuse" (CROSS_DEF_CYCLE)
Cross-definition cycle: "confuse" def contains "mix up" and "mix up" def contains "confuse" (both L2)
**Fix:** Break the cycle: at least one definition should not reference the other word

### [MINOR] words-level2.js — "find" (CROSS_DEF_CYCLE)
Cross-definition cycle: "find" def contains "locate" and "locate" def contains "find" (both L2)
**Fix:** Break the cycle: at least one definition should not reference the other word

### [MINOR] words-level2.js — "north" (CROSS_DEF_CYCLE)
Cross-definition cycle: "north" def contains "compass" and "compass" def contains "north" (both L2)
**Fix:** Break the cycle: at least one definition should not reference the other word

### [MINOR] words-level2.js — "simple" (CROSS_DEF_CYCLE)
Cross-definition cycle: "simple" def contains "complex" and "complex" def contains "simple" (both L2)
**Fix:** Break the cycle: at least one definition should not reference the other word

### [MINOR] words-level2.js — "although" (CROSS_DEF_CYCLE)
Cross-definition cycle: "although" def contains "even though" and "even though" def contains "although" (both L2)
**Fix:** Break the cycle: at least one definition should not reference the other word

### [MINOR] words-level2b.js — "as a result" (CROSS_DEF_CYCLE)
Cross-definition cycle: "as a result" def contains "because of" and "because of" def contains "as a result" (both L2)
**Fix:** Break the cycle: at least one definition should not reference the other word

### [MINOR] words-level2b.js — "despite" (CROSS_DEF_CYCLE)
Cross-definition cycle: "despite" def contains "even though" and "even though" def contains "despite" (both L2)
**Fix:** Break the cycle: at least one definition should not reference the other word

### [MINOR] words-level2.js — "make" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "to build or create something; also to cause something to happen"
**Fix:** Rephrase to be more specific

### [MINOR] words-level2a.js — "incentive" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "something that makes you want to do something"
**Fix:** Rephrase to be more specific

### [MINOR] words-level2b.js — "go through" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "to experience something, especially something difficult"
**Fix:** Rephrase to be more specific

### [MINOR] words-level2c.js — "incident" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "something that happens, often something unusual"
**Fix:** Rephrase to be more specific

### [MINOR] words-level2c.js — "launch" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "to send something up into the air or start something new"
**Fix:** Rephrase to be more specific

### [MINOR] words-level4a.js — "derivative" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "something that is based on or comes from something else"
**Fix:** Rephrase to be more specific

### [MINOR] words-level4b.js — "precursor" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "something that comes before and leads to something else"
**Fix:** Rephrase to be more specific

### [MINOR] words-level4c.js — "adjacent" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "next to or near something without something in between"
**Fix:** Rephrase to be more specific

### [MINOR] words-level4c.js — "onset" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "the start of something, especially something unpleasant"
**Fix:** Rephrase to be more specific

### [MINOR] words-level5a.js — "prerequisite" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "something needed before you can do something else"
**Fix:** Rephrase to be more specific

### [MINOR] words-level5d.js — "deterrent" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "something that prevents people from doing something"
**Fix:** Rephrase to be more specific

### [MINOR] words-level1.js — "less" (ADJ_NOUN_MISMATCH)
Word appears to be adjective but definition starts with article: "a smaller amount of something..."
**Fix:** Consider rephrasing definition to adjective form

### [MINOR] words-level2.js — "olive" (ADJ_NOUN_MISMATCH)
Word appears to be adjective but definition starts with article: "a small oval fruit used to make oil..."
**Fix:** Consider rephrasing definition to adjective form

### [MINOR] words-level2b.js — "on the contrary" (ADJ_NOUN_MISMATCH)
Word appears to be adjective but definition starts with article: "the opposite is true..."
**Fix:** Consider rephrasing definition to adjective form

### [MINOR] words-level2b.js — "graphic" (ADJ_NOUN_MISMATCH)
Word appears to be adjective but definition starts with article: "a picture or chart that explains facts..."
**Fix:** Consider rephrasing definition to adjective form

### [MINOR] words-level2c.js — "drastic" (ADJ_NOUN_MISMATCH)
Word appears to be adjective but definition starts with article: "a very big and sudden change..."
**Fix:** Consider rephrasing definition to adjective form

### [MINOR] words-level4c.js — "rubric" (ADJ_NOUN_MISMATCH)
Word appears to be adjective but definition starts with article: "a set of guidelines used for grading work..."
**Fix:** Consider rephrasing definition to adjective form

### [MINOR] words-level4c.js — "panegyric" (ADJ_NOUN_MISMATCH)
Word appears to be adjective but definition starts with article: "a speech or text that praises someone or something..."
**Fix:** Consider rephrasing definition to adjective form

### [MINOR] words-level5a.js — "ethic" (ADJ_NOUN_MISMATCH)
Word appears to be adjective but definition starts with article: "a moral principle that guides a person's behavior..."
**Fix:** Consider rephrasing definition to adjective form

### [MINOR] words-level5d.js — "agnostic" (ADJ_NOUN_MISMATCH)
Word appears to be adjective but definition starts with article: "a person who believes it is impossible to know whe..."
**Fix:** Consider rephrasing definition to adjective form

### [MINOR] words-level2.js — "attention" (WHEN_DEFINITION)
Definition starts with "when": "when you look and listen well..."
**Fix:** Use "to + verb" for verbs or "a/an + noun" for nouns instead of event description

### [MINOR] words-level2.js — "deal" (WHEN_DEFINITION)
Definition starts with "when": "when two people agree on what to do..."
**Fix:** Use "to + verb" for verbs or "a/an + noun" for nouns instead of event description

### [MINOR] words-level2b.js — "equality" (WHEN_DEFINITION)
Definition starts with "when": "when everyone is treated the same and fairly..."
**Fix:** Use "to + verb" for verbs or "a/an + noun" for nouns instead of event description

### [MINOR] words-level2b.js — "protest" (WHEN_DEFINITION)
Definition starts with "when": "when people show they disagree with something..."
**Fix:** Use "to + verb" for verbs or "a/an + noun" for nouns instead of event description

### [MINOR] words-level2b.js — "compared to" (WHEN_DEFINITION)
Definition starts with "when": "when looking at two things side by side..."
**Fix:** Use "to + verb" for verbs or "a/an + noun" for nouns instead of event description

### [MINOR] words-level2b.js — "evaporate" (WHEN_DEFINITION)
Definition starts with "when": "when liquid turns into a gas..."
**Fix:** Use "to + verb" for verbs or "a/an + noun" for nouns instead of event description

### [MINOR] words-level2b.js — "greenhouse effect" (WHEN_DEFINITION)
Definition starts with "when": "when gases trap heat around the Earth..."
**Fix:** Use "to + verb" for verbs or "a/an + noun" for nouns instead of event description

### [MINOR] words-level3b.js — "evaporation" (WHEN_DEFINITION)
Definition starts with "when": "when water turns into gas and goes into the air..."
**Fix:** Use "to + verb" for verbs or "a/an + noun" for nouns instead of event description

### [MINOR] words-level3b.js — "condensation" (WHEN_DEFINITION)
Definition starts with "when": "when water vapor turns back into liquid drops..."
**Fix:** Use "to + verb" for verbs or "a/an + noun" for nouns instead of event description

### [MINOR] words-level3b.js — "pollination" (WHEN_DEFINITION)
Definition starts with "when": "when pollen moves from one flower to another to make seeds..."
**Fix:** Use "to + verb" for verbs or "a/an + noun" for nouns instead of event description

### [MINOR] words-level3b.js — "migration" (WHEN_DEFINITION)
Definition starts with "when": "when animals travel a long way to find food or warmth..."
**Fix:** Use "to + verb" for verbs or "a/an + noun" for nouns instead of event description

### [MINOR] words-level3b.js — "weathering" (WHEN_DEFINITION)
Definition starts with "when": "when rocks break down from wind, water, or ice over time..."
**Fix:** Use "to + verb" for verbs or "a/an + noun" for nouns instead of event description

### [MINOR] words-level3b.js — "symmetry" (WHEN_DEFINITION)
Definition starts with "when": "when both sides of something look exactly the same..."
**Fix:** Use "to + verb" for verbs or "a/an + noun" for nouns instead of event description

### [MINOR] words-level3b.js — "a taste of your own medicine" (WHEN_DEFINITION)
Definition starts with "when": "when someone is treated the same bad way they treated others..."
**Fix:** Use "to + verb" for verbs or "a/an + noun" for nouns instead of event description

### [MINOR] words-level3c.js — "scarcity" (WHEN_DEFINITION)
Definition starts with "when": "when there is not enough of something that people need..."
**Fix:** Use "to + verb" for verbs or "a/an + noun" for nouns instead of event description

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

### [MINOR] words-level1.js — "grab" (SAME_LEVEL_DEF_REF)
L1 definition uses "quickly" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "toss" (SAME_LEVEL_DEF_REF)
L1 definition uses "gently" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "squeeze" (SAME_LEVEL_DEF_REF)
L1 definition uses "tight" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "bend" (SAME_LEVEL_DEF_REF)
L1 definition uses "straight" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "bark" (SAME_LEVEL_DEF_REF)
L1 definition uses "rough" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "clap" (SAME_LEVEL_DEF_REF)
L1 definition uses "together" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "peek" (SAME_LEVEL_DEF_REF)
L1 definition uses "quickly" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "glance" (SAME_LEVEL_DEF_REF)
L1 definition uses "quickly" which is also an L1 word (core position)
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

### [MINOR] words-level1.js — "thin" (SAME_LEVEL_DEF_REF)
L1 definition uses "thick" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "rough" (SAME_LEVEL_DEF_REF)
L1 definition uses "smooth" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "dull" (SAME_LEVEL_DEF_REF)
L1 definition uses "sharp" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "cozy" (SAME_LEVEL_DEF_REF)
L1 definition uses "comfortable" which is also an L1 word (core position)
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

### [MINOR] words-level1.js — "forward" (SAME_LEVEL_DEF_REF)
L1 definition uses "toward" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "backward" (SAME_LEVEL_DEF_REF)
L1 definition uses "toward" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "beneath" (SAME_LEVEL_DEF_REF)
L1 definition uses "below" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "between" (SAME_LEVEL_DEF_REF)
L1 definition uses "middle" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "among" (SAME_LEVEL_DEF_REF)
L1 definition uses "middle" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "look at" (SAME_LEVEL_DEF_REF)
L1 definition uses "toward" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "find out" (SAME_LEVEL_DEF_REF)
L1 definition uses "discover" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "nervous" (SAME_LEVEL_DEF_REF)
L1 definition uses "worried" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "amazed" (SAME_LEVEL_DEF_REF)
L1 definition uses "surprised" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "after" (SAME_LEVEL_DEF_REF)
L1 definition uses "later" which is also an L1 word (core position)
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

### [MINOR] words-level1.js — "average" (SAME_LEVEL_DEF_REF)
L1 definition uses "middle" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "pattern" (SAME_LEVEL_DEF_REF)
L1 definition uses "design" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "claw" (SAME_LEVEL_DEF_REF)
L1 definition uses "sharp" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "scale" (SAME_LEVEL_DEF_REF)
L1 definition uses "measure" which is also an L1 word (core position)
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
L1 definition uses "lizard" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "sword" (SAME_LEVEL_DEF_REF)
L1 definition uses "sharp" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "throne" (SAME_LEVEL_DEF_REF)
L1 definition uses "fancy" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "crown" (SAME_LEVEL_DEF_REF)
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

### [MINOR] words-level3b.js — "prime" (BRAND_IMAGE_COLLISION)
imageKeyword "prime number" may return brand/product images instead of the intended meaning
**Fix:** Add descriptive context to disambiguate from brand names

### [MINOR] words-level2.js — "bugle" (MILITARY_CONTEXT)
Example contains military context: "soldier"
**Fix:** Consider replacing with a neutral/civilian context

### [MINOR] words-level3b.js — "monument" (MILITARY_CONTEXT)
Example contains military context: "soldiers"
**Fix:** Consider replacing with a neutral/civilian context

### [MINOR] words-level3c.js — "homage" (MILITARY_CONTEXT)
Example contains military context: "soldiers"
**Fix:** Consider replacing with a neutral/civilian context

### [MINOR] words-level4b.js — "subordinate" (MILITARY_CONTEXT)
Example contains military context: "army"
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

### [MINOR] words-level5c.js — "ammunition" (MILITARY_CONTEXT)
Example contains military context: "soldiers"
**Fix:** Consider replacing with a neutral/civilian context

### [MINOR] words-level5c.js — "armistice" (MILITARY_CONTEXT)
Example contains military context: "soldiers"
**Fix:** Consider replacing with a neutral/civilian context

### [MINOR] words-level5c.js — "civilian" (MILITARY_CONTEXT)
Example contains military context: "soldiers"
**Fix:** Consider replacing with a neutral/civilian context

### [MINOR] words-level5c.js — "patriot" (MILITARY_CONTEXT)
Example contains military context: "army"
**Fix:** Consider replacing with a neutral/civilian context

### [MINOR] words-level5c.js — "uprising" (MILITARY_CONTEXT)
Example contains military context: "soldiers"
**Fix:** Consider replacing with a neutral/civilian context

### [MINOR] words-level5c.js — "besiege" (MILITARY_CONTEXT)
Example contains military context: "army"
**Fix:** Consider replacing with a neutral/civilian context

### [MINOR] words-level5c.js — "armament" (MILITARY_CONTEXT)
Example contains military context: "military"
**Fix:** Consider replacing with a neutral/civilian context

### [MINOR] words-level5c.js — "mobilization" (MILITARY_CONTEXT)
Example contains military context: "troops"
**Fix:** Consider replacing with a neutral/civilian context

### [MINOR] words-level5d.js — "conscription" (MILITARY_CONTEXT)
Example contains military context: "army"
**Fix:** Consider replacing with a neutral/civilian context

### [MINOR] words-level5d.js — "subjugate" (MILITARY_CONTEXT)
Example contains military context: "military"
**Fix:** Consider replacing with a neutral/civilian context

