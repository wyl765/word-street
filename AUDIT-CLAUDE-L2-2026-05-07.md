# Level 2 Audit — Claude Strictest Mode
**Date:** 2026-05-07  
**File:** `words-level2.js` (548 words)  
**Target:** Mark, 10yo Chinese ESL boy, MAP 197

---

## 🔴 CRITICAL — Must Fix

### 1. Typo / Punctuation Errors
| Word | Issue |
|------|-------|
| `also` | Definition: `"in addition,; as well"` — stray `,;` typo. Should be `"in addition; as well"` or just `"too; as well"` |
| `repeat` | Example ends with `?` — flagged as no-period but it's actually fine (question). However inconsistent with every other entry using declarative examples. |
| `any` | Same: example ends with `?` |

### 2. Definition Accuracy Errors
| Word | Current Definition | Problem |
|------|-------------------|---------|
| `deny` | "to say no" | **Wrong meaning.** "Deny" = to say something is not true. "Refuse" = to say no. Example uses the correct sense ("I could not deny it") but the definition teaches the wrong word. |
| `exact` | "perfectly; not off" | These are adverbs. "Exact" is an adjective. Should be: "with no mistakes; perfectly right" or "completely correct" |
| `message` | "facts someone sends" | Messages aren't necessarily facts. Should be: "words someone sends to another person" |
| `liquid` | "a wet thing that can pour" | A liquid is not "a thing." Should be: "something that flows and takes the shape of its container, like water" |
| `careful` | "paying close focus" | Grammatically wrong. "Paying close attention" or "trying not to make mistakes" |
| `modern` | "new and from today" | "From today" is misleading — "modern" doesn't mean literally today. Should be: "of the present time; not old" |
| `act` | "to do something" | Definition and example mismatch. Example: "I will act like a lion in the play" = pretend/perform. Definition describes generic action. Pick one meaning. |
| `score` | "points in a game" | Noun definition, but example uses "score" as a verb ("She managed to score the winning basket"). Mismatch. |
| `tend` | "to take care of" | This is a minor/archaic meaning. Primary meaning for a 10yo: "to usually do something." Example uses the gardening sense, but Mark will encounter "tend to" far more often. |
| `cocoon` | mentions "moth" | imageKeyword says "cocoon butterfly" — cocoons → moths; chrysalis → butterflies. Technically inaccurate imageKeyword. |

### 3. `key` → `important` Residual Check
- `key` definition: "something that opens a lock" ✅ No residual `important` meaning.
- Words with "important" in definition: `main idea`, `basic`, `major` — all appropriate uses, not residual errors.

---

## 🟠 SERIOUS — Should Fix

### 4. Definition-Example Mismatches
| Word | Issue |
|------|-------|
| `mention` | Def: "to talk about something quickly." Example: "Please mention your question before we line up." — You don't "mention a question." You mention a topic/fact. Better: "He mentioned that the library closes early today." |
| `triple` | Def: "three times as much" (adjective/noun). Example uses it as a verb: "The recipe needs to triple the sugar." Pick one POS. |
| `deal` | Def: "an agreement or a lot" — cramming two meanings. Example only covers "agreement." Drop "or a lot" or split. |
| `course` | Def: "a path or a class" — two meanings. Example: "obstacle course." Definition should match the example meaning. |
| `battle` | Example: "The knights had a battle in our pretend game" — trivializes the word. A pretend battle ≠ learning what "battle" means. |

### 5. imageKeyword Problems
| Word | imageKeyword | Problem |
|------|-------------|---------|
| `find` | `ladybug leaf` | Completely unrelated to "find" or the example (lost library book). Should be: `searching book` |
| **11 duplicate imageKeywords** | `raise hand` (rule, mention), `puzzle` (solve, determined), `two kids sharing pizza slice` (behavior, kind), `listening` (attention, respect), `note` (message, note), `price tag` (cost, price), `thunder` (scared, awake), `popcorn` (smell, handful), `rope` (length, strong), `taking turns` (fair, turn), `stairs` (downstairs, upstairs) | Will generate identical images. Each needs a unique keyword. |

### 6. Self-Referential / Circular Definitions
| Word | Definition | Problem |
|------|-----------|---------|
| `handful` | "as much as your hand can hold" | Uses "hand" to define "handful" — circular for ESL |
| `tightly` | "in a tight way" | Circular. Should be: "holding or pressing very firmly" |

---

## 🟡 MODERATE — Consider Fixing

### 7. Cognitive Load: Words Too Obscure for 10yo ESL at MAP 197
These words are more suited to Level 3+ or a specialized vocabulary unit. A 10yo ESL learner at MAP 197 (≈ US grade 3-4 reading) will not encounter these in typical reading and they add cognitive load without utility:

`admiral`, `bagpipe`, `banjo`, `bellows`, `birch`, `blacksmith`, `bluff`, `bobsled`, `bramble`, `bridle`, `broth`, `bugle`, `buoy`, `caribou`, `cedar`, `cellar`, `chariot`, `chisel`, `chord`, `cider`, `cloak`, `cobblestone`, `corral`, `cradle`, `crest`, `cuff`, `cypress`, `dagger`, `delta`, `dinghy`, `drawbridge`, `drumstick`, `easel`, `elm`, `ember`, `falcon`, `fiddle`, `fig`, `fjord`, `flint`, `forge`, `fresco`, `gale`, `galley`, `garnet`, `gazelle`, `geyser`, `gong`, `granite`, `griddle`, `grove`, `hearth`, `heron`, `hickory`, `holly`, `honeycomb`, `hourglass`, `husk`, `ibis`, `igloo`, `ivy`, `jade`, `javelin`, `kelp`, `kennel`, `kindle`, `kingfisher`, `knapsack`, `lagoon`, `latch`, `lava`, `levee`, `lichen`, `locket`, `loom`, `lynx`, `mantle`, `mast`, `moat`, `mortar`, `mosaic`, `mulberry`, `muzzle`, `nectar`, `nettle`, `nozzle`, `nutmeg`, `oar`, `oasis`, `ore`, `otter`, `pagoda`, `parchment`, `parsley`, `pelican`, `pendant`, `pier`, `pigment`

That's **~88 words** (~16% of the bank) that are essentially "vocabulary museum pieces." They'll make Mark feel like he's studying a nature encyclopedia, not learning usable English.

### 8. Words Too Easy for MAP 197
These 26 words are kindergarten/Grade 1 level — a 10yo with MAP 197 already knows them. They waste quiz slots:

`add`, `arm`, `ask`, `close`, `dark`, `dinner`, `far`, `fill`, `find`, `front`, `grow`, `jump`, `key`, `knee`, `laugh`, `learn`, `little`, `lunch`, `make`, `move`, `near`, `over`, `smell`, `turn`, `under`, `wait`

### 9. Age Appropriateness Concerns
| Word | Issue |
|------|-------|
| `drown` | Def: "to die in water" — blunt death reference. Consider: "to be unable to breathe in water" |
| `dagger` | Weapon in a pirate context. Borderline for 10yo but acceptable in adventure/fiction framing. |
| `bunker` | "The soldiers hid in the bunker during the storm" — military violence context. The example softens it (storm, not battle), but the word choice is odd for Level 2. |
| `attack` | Example ("goose attacked my sandwich") is humorous and age-appropriate. ✅ OK. |

### 10. Grammar Issues in Definitions
| Word | Definition | Fix |
|------|-----------|-----|
| `careful` | "paying close focus" | "paying close attention" |
| `also` | "in addition,; as well" | Remove stray comma |

---

## 📊 Summary

| Category | Count |
|----------|-------|
| 🔴 Critical (must fix) | 12 issues |
| 🟠 Serious (should fix) | 17 issues (incl. 11 duplicate imageKeywords) |
| 🟡 Moderate (consider) | ~116 words misleveled (88 too hard + 26 too easy) + 2 age concerns |

**Overall:** The core ~350 mid-range words are solid. The bank is dragged down by (a) a long tail of obscure nouns that belong in a nature/history glossary rather than an ESL vocab builder, (b) ~26 words so easy they waste time, and (c) a dozen definition accuracy/grammar errors that would cause Mark to learn wrong meanings.
