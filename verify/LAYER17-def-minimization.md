# Layer 17: Definition Minimization Test

## Summary
- Words tested: 300 (evenly sampled across all 16 files, from 5205 total)
- Overly verbose (3+ removable words): 26
- Core meaning exposed as weak after minimization: 3

## Verbose Definitions (could be tighter)

| word | file | current_def | minimal_def | words_removed |
|------|------|-------------|-------------|---------------|
| passenger | words-level1.js | a person riding in a vehicle like a car, bus, train, or airplane | a person riding in a vehicle | 7 (trailing examples) |
| ivory | words-level3c.js | a hard, pale white material from elephant tusks, or the soft white color named after it | a hard, pale white material from elephant tusks | 9 (second meaning crammed in) |
| donkey | words-level2.js | an animal like a small horse with long ears | an animal with long ears, smaller than a horse | 4 (restructured comparison) |
| consort | words-level3a.js | a spouse or companion, especially of a king or queen | a spouse, especially of a ruler | 4 (companion redundant with spouse; king or queen → ruler) |
| regime | words-level4b.js | a government or ruling system, especially one that uses strict control | a government, especially one with strict control | 4 ("ruling system" redundant; "that uses" → "with") |
| cumulus | words-level4c.js | white, fluffy clouds that look like cotton balls in the sky | white, puffy, heaped clouds | 7 (simile unnecessary in definition) |
| grassland | words-level4c.js | a large area of land covered especially with grass rather than trees | a large area covered mainly with grass | 4 ("of land" implicit; "rather than trees" unnecessary) |
| environment | words-level2c.js | everything around you, like air, water, and land | everything around you | 5 (trailing examples) |
| drone | words-level3b.js | a flying machine with no pilot inside, or a low humming sound | a pilotless flying machine | 7 ("or a low humming sound" = second meaning crammed in) |
| contract | words-level4a.js | a written agreement between people, or to shrink in size | a written agreement between people | 5 (second meaning crammed in) |
| unfold | words-level4c.js | to open up gradually, or to come to light | to open up gradually | 6 (second meaning crammed in) |
| broccoli | words-level1.js | a green vegetable that looks like a tiny tree | a green vegetable with thick stalks and florets | 4 (simile not a definition) |
| circle | words-level2.js | a shape like the letter O | a round shape with all points equal distance from center | 3 (simile not a definition; but original is concise — borderline) |
| manipulate | words-level3c.js | to handle or control something skillfully, or to trick someone | to handle or control skillfully | 4 (second meaning crammed in) |
| mobilization | words-level5c.js | preparing and organizing people for action, especially in an emergency | preparing and organizing people for action | 4 (trailing example) |
| consonant | words-level2b.js | any letter that is not a vowel — not a, e, i, o, or u | a letter that is not a vowel | 8 (the dash-list is redundant with "not a vowel") |
| clout | words-level5a.js | influence or power, especially in politics | influence or power | 3 (trailing example) |
| delicacy | words-level5c.js | a rare or expensive food; also the quality of being gentle and careful | a rare or expensive food | 8 (second meaning crammed in + "the quality of being") |
| globalization | words-level5c.js | the process of the world becoming more connected through trade, communication, and cultural exchange | the world becoming more connected through trade and culture | 5 ("the process of" + simplification) |
| foolish | words-level1.js | not smart, silly in a bad way | silly; lacking good sense | 3 ("in a bad way" redundant — silly already implies negative) |
| toward | words-level1.js | moving closer and closer to a person, place, or thing | in the direction of | 8 (entire rewrite — "closer and closer" is redundant; "person, place, or thing" is filler) |
| opacity | words-level4b.js | the quality of being hard to see through or understand | being hard to see through | 4 ("the quality of" + "or understand" = second meaning) |
| consanguinity | words-level4c.js | the state of being related by blood | being related by blood | 3 ("the state of" removable) |
| litigation | words-level5b.js | the process of taking legal action in court | taking legal action in court | 3 ("the process of" removable) |
| liberation | words-level5d.js | the act of setting someone or something free | setting free | 5 ("the act of" + "someone or something" can just be implied) |
| constituent | words-level5b.js | a person who votes in a certain district; also a part of something bigger | a voter in a political district | 8 (second meaning crammed in; simplified) |

## Weak Core (minimization reveals problem)

| word | file | current_def | minimal_def | problem |
|------|------|-------------|-------------|---------|
| circle | words-level2.js | a shape like the letter O | like the letter O | Relies entirely on a simile — not a geometric definition. After removing "a shape", the core is just a visual comparison. Kids might not know what letter O looks like in all fonts. Better: "a perfectly round shape" |
| foolish | words-level1.js | not smart, silly in a bad way | not smart, silly | "Not smart" and "silly" overlap heavily. After removing the filler "in a bad way," you see the core is two near-synonyms stacked. Better: "lacking good sense" |
| toward | words-level1.js | moving closer and closer to a person, place, or thing | moving closer to | Minimization strips almost everything. The core definition confuses a preposition with a verb ("moving"). "Toward" doesn't mean "moving" — it describes direction. Better: "in the direction of" |

## Observations

### Patterns Found
1. **Crammed multi-meaning definitions** (9 entries): Using "or" to stuff 2+ meanings into one definition (drone, contract, unfold, manipulate, ivory, delicacy, constituent, opacity, unfold). These should be separate senses or pick the primary one.
2. **"The [process/act/state/quality] of"** (5 entries): A common verbose wrapper that adds no meaning (liberation, litigation, globalization, consanguinity, opacity).
3. **Trailing examples as definition** (7 entries): "like a car, bus, train..." embedded in the definition rather than the example field (passenger, environment, clout, mobilization, consonant, grassland, regime).
4. **Simile-as-definition** (3 entries): Using "like X" instead of actual defining characteristics (broccoli, circle, cumulus).

### Overall Assessment
The definitions are **generally well-written for the target audience** (children/learners). Most of the 300 sampled definitions are appropriately concise. The ~9% verbose rate is reasonable for a learning app where some redundancy aids comprehension. The most actionable findings are:
- **Multi-meaning cramming** should be separated or the primary meaning chosen
- **"The process/act/state of"** wrappers are pure noise
- **Simile-only definitions** (especially "circle") should have a real definition with the simile as supplement
