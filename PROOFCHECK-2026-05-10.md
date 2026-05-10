# Proofcheck Report — 2026-05-10

**Engine:** proofcheck.mjs v1.0
**Entries:** 5205
**Results:** 0 CRITICAL | 0 MAJOR | 177 MINOR

## Issues

### [MINOR] words-level2d.js — "scope" (ARTICLE_ERROR)
Possible "a/an" error: "a idea"
**Fix:** Consider "an idea"

### [MINOR] words-level3a.js — "broach" (ARTICLE_ERROR)
Possible "a/an" error: "a idea"
**Fix:** Consider "an idea"

### [MINOR] words-level3b.js — "emboss" (ARTICLE_ERROR)
Possible "a/an" error: "a outside"
**Fix:** Consider "an outside"

### [MINOR] words-level3b.js — "encrust" (ARTICLE_ERROR)
Possible "a/an" error: "a outside"
**Fix:** Consider "an outside"

### [MINOR] words-level3c.js — "torch" (ARTICLE_ERROR)
Possible "a/an" error: "a easy"
**Fix:** Consider "an easy"

### [MINOR] words-level4a.js — "browse" (ARTICLE_ERROR)
Possible "a/an" error: "a easy"
**Fix:** Consider "an easy"

### [MINOR] words-level4b.js — "texture" (ARTICLE_ERROR)
Possible "a/an" error: "a outside"
**Fix:** Consider "an outside"

### [MINOR] words-level4b.js — "polemic" (ARTICLE_ERROR)
Possible "a/an" error: "a idea"
**Fix:** Consider "an idea"

### [MINOR] words-level4c.js — "stimulus" (ARTICLE_ERROR)
Possible "a/an" error: "a an"
**Fix:** Consider "an an"

### [MINOR] words-level4c.js — "abjure" (ARTICLE_ERROR)
Possible "a/an" error: "a idea"
**Fix:** Consider "an idea"

### [MINOR] words-level5a.js — "embody" (ARTICLE_ERROR)
Possible "a/an" error: "a able"
**Fix:** Consider "an able"

### [MINOR] words-level5a.js — "espouse" (ARTICLE_ERROR)
Possible "a/an" error: "a idea"
**Fix:** Consider "an idea"

### [MINOR] words-level5c.js — "heresy" (ARTICLE_ERROR)
Possible "a/an" error: "a idea"
**Fix:** Consider "an idea"

### [MINOR] words-level5d.js — "elicit" (ARTICLE_ERROR)
Possible "a/an" error: "a an"
**Fix:** Consider "an an"

### [MINOR] words-level2.js — "jade" (SUBJECTIVE_DEF)
Definition contains subjective adjective "pretty": "a smooth green stone used to make pretty things"
**Fix:** Remove subjective adjectives from definitions

### [MINOR] words-level2.js — "pendant" (SUBJECTIVE_DEF)
Definition contains subjective adjective "pretty": "a pretty thing that hangs from a chain you wear"
**Fix:** Remove subjective adjectives from definitions

### [MINOR] words-level4b.js — "pulchritude" (SUBJECTIVE_DEF)
Definition contains subjective adjective "pretty": "great about the body being pretty to look at"
**Fix:** Remove subjective adjectives from definitions

### [MINOR] words-level5b.js — "aesthetic" (SUBJECTIVE_DEF)
Definition contains subjective adjective "pretty": "about being pretty to look at, design, and good taste"
**Fix:** Remove subjective adjectives from definitions

### [MINOR] words-level5b.js — "sublime" (SUBJECTIVE_DEF)
Definition contains subjective adjective "pretty": "of the highest being pretty to look at or greatness"
**Fix:** Remove subjective adjectives from definitions

### [MINOR] words-level5d.js — "adornment" (SUBJECTIVE_DEF)
Definition contains subjective adjective "pretty": "a made to look nice a thing added for being pretty to look at"
**Fix:** Remove subjective adjectives from definitions

### [MINOR] words-level1.js — "lemon" (CROSS_DEF_CYCLE)
Cross-definition cycle: "lemon" def contains "sour" and "sour" def contains "lemon" (both L1)
**Fix:** Break the cycle: at least one definition should not reference the other word

### [MINOR] words-level2a.js — "evidence" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "something that shows it is true that shows something is true"
**Fix:** Rephrase to be more specific

### [MINOR] words-level2b.js — "infer" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "to figure something out from things that help you figure something out in the story"
**Fix:** Rephrase to be more specific

### [MINOR] words-level2c.js — "evaluate" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "to look at something carefully to decide how good something is"
**Fix:** Rephrase to be more specific

### [MINOR] words-level2c.js — "expose" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "to to find something that was hidden or show something to the open air"
**Fix:** Rephrase to be more specific

### [MINOR] words-level2c.js — "fault" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "the to say someone did something wrong for something that went wrong"
**Fix:** Rephrase to be more specific

### [MINOR] words-level2c.js — "feature" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "an important part or how good something is of something"
**Fix:** Rephrase to be more specific

### [MINOR] words-level2d.js — "potential" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "the how well you can do something to become something great in the time that has not come yet"
**Fix:** Rephrase to be more specific

### [MINOR] words-level2d.js — "presume" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "to believe something is true without something that shows it is true"
**Fix:** Rephrase to be more specific

### [MINOR] words-level3b.js — "centimeter" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "a small unit for measuring how long something is about the how wide something is of a fingertip"
**Fix:** Rephrase to be more specific

### [MINOR] words-level3c.js — "imbue" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "to fill something with a how good something is or feeling"
**Fix:** Rephrase to be more specific

### [MINOR] words-level3c.js — "infuse" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "to fill something with a how good something is, or to soak to to take out taste"
**Fix:** Rephrase to be more specific

### [MINOR] words-level4a.js — "characteristic" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "a feature or how good something is that makes something easy to notice"
**Fix:** Rephrase to be more specific

### [MINOR] words-level4a.js — "defect" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "a something wrong; a weak spot or weakness in something"
**Fix:** Rephrase to be more specific

### [MINOR] words-level4a.js — "defy" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "to refuse to obey or to something hard to do something boldly"
**Fix:** Rephrase to be more specific

### [MINOR] words-level4a.js — "enhance" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "to improve the how good something is or value of something"
**Fix:** Rephrase to be more specific

### [MINOR] words-level4a.js — "appraisal" (VAGUE_DEFINITION)
Definition uses "something" 3 times: "an judging how good something is of the value or how good something is of something"
**Fix:** Rephrase to be more specific

### [MINOR] words-level4a.js — "delineation" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "a detailed drawing or telling what something is like that shows the exact shape of something"
**Fix:** Rephrase to be more specific

### [MINOR] words-level4a.js — "impugn" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "to question or something hard to do the what is real of something"
**Fix:** Rephrase to be more specific

### [MINOR] words-level4a.js — "interpolate" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "to to put something in something between existing things"
**Fix:** Rephrase to be more specific

### [MINOR] words-level4b.js — "menace" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "something or someone that says something bad will happen to cause harm"
**Fix:** Rephrase to be more specific

### [MINOR] words-level4b.js — "stimulate" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "to encourage something you do or make something more active"
**Fix:** Rephrase to be more specific

### [MINOR] words-level4b.js — "provenance" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "the place of where something comes from or what happened long ago of something"
**Fix:** Rephrase to be more specific

### [MINOR] words-level4b.js — "reiterate" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "to say or do something again for putting more weight on something"
**Fix:** Rephrase to be more specific

### [MINOR] words-level4b.js — "semblance" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "an how someone or something looks or toward the outside form of something"
**Fix:** Rephrase to be more specific

### [MINOR] words-level4b.js — "substantiation" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "something that shows what happened that proves something is true"
**Fix:** Rephrase to be more specific

### [MINOR] words-level4b.js — "underpinning" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "the what something is built on or simple support for something"
**Fix:** Rephrase to be more specific

### [MINOR] words-level4c.js — "periphery" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "the outer edge or the line where something ends of something"
**Fix:** Rephrase to be more specific

### [MINOR] words-level4c.js — "stimulus" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "something that things that start something a an answer back"
**Fix:** Rephrase to be more specific

### [MINOR] words-level4c.js — "substantiate" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "to provide something that shows what happened that proves something is true"
**Fix:** Rephrase to be more specific

### [MINOR] words-level4c.js — "adulterate" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "to make something less pure by adding lower how good something is kinds of stuff"
**Fix:** Rephrase to be more specific

### [MINOR] words-level5a.js — "deplore" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "to feel strong not being happy with something of something"
**Fix:** Rephrase to be more specific

### [MINOR] words-level5b.js — "appraise" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "to assess the value or how good something is of something"
**Fix:** Rephrase to be more specific

### [MINOR] words-level5b.js — "attribute" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "a how good something is or feature of something"
**Fix:** Rephrase to be more specific

### [MINOR] words-level5b.js — "collateral" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "something said you will do something as security for a loan; also more; extra or secondary"
**Fix:** Rephrase to be more specific

### [MINOR] words-level5b.js — "constituent" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "a person who picks in a certain district; also a part of something bigger of something"
**Fix:** Rephrase to be more specific

### [MINOR] words-level5b.js — "endow" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "to provide with a how good something is or something of value"
**Fix:** Rephrase to be more specific

### [MINOR] words-level5b.js — "essence" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "the most important how good something is of something"
**Fix:** Rephrase to be more specific

### [MINOR] words-level5b.js — "foreclose" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "to take something that is yours of land when money given for something aren't made"
**Fix:** Rephrase to be more specific

### [MINOR] words-level5b.js — "genesis" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "the where something comes from or start of something"
**Fix:** Rephrase to be more specific

### [MINOR] words-level5b.js — "protract" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "to extend the how long something lasts of something"
**Fix:** Rephrase to be more specific

### [MINOR] words-level5c.js — "blemish" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "a small mark or something wrong; a weak spot that things taken after a win something"
**Fix:** Rephrase to be more specific

### [MINOR] words-level5c.js — "debut" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "the first public how someone or something looks of something or someone"
**Fix:** Rephrase to be more specific

### [MINOR] words-level5c.js — "enrich" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "to improve how good something is or add value to something"
**Fix:** Rephrase to be more specific

### [MINOR] words-level5d.js — "condemnation" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "strong not being happy with something or declaring something is wrong"
**Fix:** Rephrase to be more specific

### [MINOR] words-level5d.js — "depiction" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "a drawing, painting, or telling what something is like of something"
**Fix:** Rephrase to be more specific

### [MINOR] words-level5d.js — "fledgling" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "a young bird learning to fly; also something new and not having done something before"
**Fix:** Rephrase to be more specific

### [MINOR] words-level5d.js — "deprecate" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "to express not being happy with something of something"
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

### [MINOR] words-level2c.js — "drastic" (ADJ_NOUN_MISMATCH)
Word appears to be adjective but definition starts with article: "a very big and sudden change..."
**Fix:** Consider rephrasing definition to adjective form

### [MINOR] words-level4c.js — "rubric" (ADJ_NOUN_MISMATCH)
Word appears to be adjective but definition starts with article: "a set of guidelines used for grading work..."
**Fix:** Consider rephrasing definition to adjective form

### [MINOR] words-level4c.js — "panegyric" (ADJ_NOUN_MISMATCH)
Word appears to be adjective but definition starts with article: "a talking in front of people or text that praises ..."
**Fix:** Consider rephrasing definition to adjective form

### [MINOR] words-level5a.js — "ethic" (ADJ_NOUN_MISMATCH)
Word appears to be adjective but definition starts with article: "a moral a rule you live by that guides a person's ..."
**Fix:** Consider rephrasing definition to adjective form

### [MINOR] words-level5b.js — "comparable" (ADJ_NOUN_MISMATCH)
Word appears to be adjective but definition starts with article: "the same enough to be compared..."
**Fix:** Consider rephrasing definition to adjective form

### [MINOR] words-level5d.js — "agnostic" (ADJ_NOUN_MISMATCH)
Word appears to be adjective but definition starts with article: "a person who believes it is impossible to know whe..."
**Fix:** Consider rephrasing definition to adjective form

### [MINOR] words-level5a.js — "petulant" (COMPARISON_DEF)
Definition depends on comparison: "like a little kid bad-tempered and sulky..."
**Fix:** Consider an independent definition that does not rely on knowing another word

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

### [MINOR] words-level1.js — "average" (SAME_LEVEL_DEF_REF)
L1 definition uses "middle" which is also an L1 word (core position)
**Fix:** Avoid using same-level vocabulary in the core of definitions

### [MINOR] words-level1.js — "pattern" (SAME_LEVEL_DEF_REF)
L1 definition uses "design" which is also an L1 word (core position)
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

### [HIGH] words-level2b.js — "go along with" (MULTI_MEANING)
L2 definition has multiple distinct meanings: "to agree or to work together with"
**Fix:** L1-L2 definitions should have a single meaning. Pick the most common/useful one.

