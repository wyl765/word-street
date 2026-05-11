# Gate 2+4 Results — Batch 1

## Summary
- **Gate 2 (Reverse Cloze):** 1700 tested, 0 wrong, 23 weak_context
- **Gate 4 (Back-Translation):** 1700 tested, 0 wrong, 31 ambiguous

Note: No per-word options field exists in these files; each word was tested against all words in its level as the candidate pool. For Gate 2, "WEAK_CONTEXT" means the blanked sentence doesn't uniquely identify the word — multiple words from the level could plausibly fill the blank. For Gate 4, "AMBIGUOUS_DEF" means the definition describes a synonym equally well.

---

## Gate 2 Failures (wrong answer or weak context)

| word | file | your_answer | correct | issue |
|------|------|-------------|---------|-------|
| kitten | words-level1.js | puppy/kitten | kitten | WEAK_CONTEXT — "The soft ___ curled up in my lap and purred." — purring narrows it, but "puppy" could curl up in a lap too. Marginal. |
| duckling | words-level1.js | duckling/chick | duckling | WEAK_CONTEXT — "The fuzzy yellow ___ followed its mother to the pond." — could be chick or duckling without "pond" being decisive enough since both go to ponds. Actually pond helps. Borderline pass. |
| hear | words-level1.js | hear/listen | hear | WEAK_CONTEXT — "You can ___ the crowd cheering at the basketball game from outside." — both "hear" and "listen" could fit, though "hear" is more natural with "can". |
| lose | words-level1.js | lose/find | lose | WEAK_CONTEXT — "Be careful not to ___ your keys at the park." — "lose" is clear from "Be careful not to". Pass on reflection. |
| take | words-level1.js | take/grab | take | WEAK_CONTEXT — "Please ___ a cookie from the plate." — "take" or "grab" both fit. |
| appear | words-level2.js | appear/arrive | appear | WEAK_CONTEXT — "A rainbow can ___ after a storm." — "appear" is strongly favored since rainbows don't "arrive". Actually clear. |
| close | words-level2.js | close/shut | close | WEAK_CONTEXT — if "shut" were in the level, ambiguous. Both are present-ish but "close" definition says "to shut" so circular. |
| glide | words-level2.js | glide/drift | glide | WEAK_CONTEXT — "The ice skater could ___ without falling." — "glide" is clear for skating context. |
| drift | words-level2.js | drift/glide/float | drift | WEAK_CONTEXT — "The leaf ___ down onto the pond." — "drifted" works but "floated" or "glided" could also fit. |
| mist | words-level2.js | mist/fog | mist | WEAK_CONTEXT — "Morning ___ made the grass look shiny." — both "mist" and "fog" could fit, but level has both? Only "mist" is in level2. Marginal. |
| continue | words-level2a.js | continue/last | continue | WEAK_CONTEXT — "The rain will ___ all day, so bring your umbrella." — "continue" and "last" both fit. |
| cover | words-level2a.js | cover/hide | cover | WEAK_CONTEXT — "Please ___ the food, so the flies don't land on it." — "cover" is clearer than "hide" here. Marginal pass. |
| form | words-level2a.js | form/shape | form | WEAK_CONTEXT — "We used clay to ___ little animals for our art project." — "form" or "shape" both work. |
| flow | words-level2a.js | flow/run | flow | WEAK_CONTEXT — "The river ___ quickly over the rocks and down the hill." — "flows" is natural but "runs" also works for rivers. |
| soft | words-level2a.js | soft/delicate | soft | WEAK_CONTEXT — "The ___ kitten fur felt like a cloud when she petted it." — "soft" is strongly favored. Actually clear. |
| presently | words-level2a.js | presently/currently | presently | WEAK_CONTEXT — "He is ___ working on his art project in the other room." — both "presently" and "currently" fit perfectly. Both are in level2a. |
| currently | words-level2a.js | currently/presently | currently | WEAK_CONTEXT — "She is ___ reading a book about dinosaurs." — same issue, both words in same level. |
| nearly | words-level2a.js | nearly/almost | nearly | WEAK_CONTEXT — "She ___ finished the race but tripped right before the finish line." — "nearly" and "almost" identical. "almost" not in level though. |
| briefly | words-level2a.js | briefly/shortly | briefly | WEAK_CONTEXT — "She ___ explained the rules, then we started the game." — both could work, both in level2a. |
| shortly | words-level2a.js | shortly/soon | shortly | WEAK_CONTEXT — "The movie will start ___, so find your seat now." — "shortly" and "soon" fit but "soon" isn't in level. Clear enough. |
| end | words-level2b.js | end/conclusion | end | WEAK_CONTEXT — "At the ___ of the story, everyone lived happily ever after." — both "end" and "conclusion" fit. Both in level2b. |
| nevertheless | words-level2b.js | nevertheless/nonetheless | nevertheless | WEAK_CONTEXT — "It was very hot; ___, they finished the race." — "nevertheless" and "nonetheless" are interchangeable. Both in level2b. |
| nonetheless | words-level2b.js | nonetheless/nevertheless | nonetheless | WEAK_CONTEXT — "He was tired; ___, he kept running until the end." — same issue as above. |

## Gate 4 Failures (wrong guess or ambiguous)

| word | file | your_guess | correct_word | issue |
|------|------|-----------|--------------|-------|
| hear | words-level1.js | listen | hear | AMBIGUOUS_DEF — "to notice sounds with your ears" could be "listen" or "hear". |
| take | words-level1.js | grab | take | AMBIGUOUS_DEF — "to get hold of something with your hands" equally describes "grab", "grasp", "take". |
| than | words-level1.js | more | than | AMBIGUOUS_DEF — "a word used to compare two things" — could be "than", "like", or "versus". Unusual word to define. |
| itsy | words-level1.js | tiny | itsy | AMBIGUOUS_DEF — "very very tiny; so small" — first guess is "tiny" or "teeny", not "itsy". |
| close | words-level2.js | shut | close | AMBIGUOUS_DEF — "to shut" → first guess is "shut" itself, not "close". Circular definition. |
| about | words-level2.js | regarding | about | AMBIGUOUS_DEF — "on the subject of" → "regarding" or "about" both fit. |
| act | words-level2.js | do | act | AMBIGUOUS_DEF — "to do something" → "do" is the most natural guess. |
| add | words-level2.js | combine | add | AMBIGUOUS_DEF — "to put together" → "combine", "mix", "join" all fit equally. |
| also | words-level2.js | too | also | AMBIGUOUS_DEF — "too; as well" → "too" is the first guess, not "also". |
| any | words-level2.js | some | any | AMBIGUOUS_DEF — "one or more, no matter which" → hard to guess "any" from this. |
| little | words-level2.js | small | little | AMBIGUOUS_DEF — "small" → first guess is "small", not "little". |
| make | words-level2.js | create | make | AMBIGUOUS_DEF — "to create or put together" → "create" is equally valid. |
| find | words-level2.js | locate | find | AMBIGUOUS_DEF — "to see or get something you were looking for" → "locate" or "find". |
| near | words-level2.js | close | near | AMBIGUOUS_DEF — "close by" → "close" is the first guess. |
| over | words-level2.js | above | over | AMBIGUOUS_DEF — "above or across" → "above" is first guess. |
| rise | words-level2.js | ascend | rise | AMBIGUOUS_DEF — "to go up on its own" → "ascend" or "rise" both work. |
| although | words-level2.js | but | although | AMBIGUOUS_DEF — "but; yet" → first guess is "but" or "yet", not "although". |
| unless | words-level2.js | until | unless | AMBIGUOUS_DEF — "except if something happens first" → tricky; could be confused. |
| still | words-level2a.js | yet | still | AMBIGUOUS_DEF — "even now, continuing" → "yet" or "still" both work. |
| sometimes | words-level2a.js | occasionally | sometimes | AMBIGUOUS_DEF — "now and then, not always" → "occasionally" fits equally. Both "occasionally" is in level2. |
| usually | words-level2a.js | normally | usually | AMBIGUOUS_DEF — "more often than not" → "normally", "typically", "usually" all fit. |
| mostly | words-level2a.js | mainly | mostly | AMBIGUOUS_DEF — "almost all, but not completely" → "mainly" or "mostly". |
| simply | words-level2a.js | easily | simply | AMBIGUOUS_DEF — "without much work, nothing more" → "easily" fits. |
| round | words-level2a.js | circular | round | AMBIGUOUS_DEF — "shaped like a circle or ball" → "circular" or "spherical" first. |
| flat | words-level2a.js | level | flat | AMBIGUOUS_DEF — "smooth and level with no bumps" → "level" or "flat". |
| lean | words-level2a.js | slim | lean | AMBIGUOUS_DEF — "thin and strong and well looking" → "slim", "fit", "lean" all work. |
| neat | words-level2a.js | tidy | neat | AMBIGUOUS_DEF — "clean and in good order" → "tidy" is first guess. |
| odd | words-level2a.js | strange | odd | AMBIGUOUS_DEF — "strange or unusual" → "strange", "weird", "odd" all fit. |
| end | words-level2b.js | finish | end | AMBIGUOUS_DEF — "the last part of something" → "finish" or "end". |
| moral | words-level2b.js | lesson | moral | AMBIGUOUS_DEF — "a lesson about right and wrong that a story teaches you" → "lesson" is first guess. |
| mean | words-level2b.js | cruel/unkind | mean | AMBIGUOUS_DEF — "not nice to others on purpose" → "cruel", "unkind", or "mean" all fit. |

---

## Notes

1. **No options arrays found** — The word files have no `options` field. Gate 2 was tested against all words in the same level file as candidates.

2. **Level 1** (words-level1.js): ~366 words. Very basic vocabulary (puppy, kitten, etc.). Definitions and examples are generally strong. Few issues.

3. **Level 2** (words-level2.js): 552 words. Mix of everyday words and concrete nouns (bagpipe, fjord, etc.). The concrete/unique nouns (fjord, carousel, etc.) have excellent definitions and examples. Common verbs/adverbs (close, also, make) have more ambiguous definitions.

4. **Level 2a** (words-level2a.js): 400 words. Good quality overall. Some synonym pairs (presently/currently, nearly/almost-like) create Gate 2 ambiguity. Academic vocabulary at the end (AWL-style: consolidate, facilitate, etc.) is well-defined.

5. **Level 2b** (words-level2b.js): 382 words. Strong thematic organization (body, government, math, phrasal verbs). The nevertheless/nonetheless pair is the most problematic — nearly identical definitions and usage.

### Key Findings
- **Worst Gate 2 issue:** `nevertheless` vs `nonetheless` — both in same level with near-identical meaning, definitions, and example patterns. Consider keeping only one or differentiating examples more.
- **Worst Gate 4 issue:** Basic function words (`also`, `any`, `than`, `about`) have definitions that map more naturally to other words. This is inherent to defining common words — not necessarily a problem for learners who see the word alongside the definition.
- **`presently` vs `currently`** (level2a): Both in same level, same meaning, same definition pattern. Learners may confuse them in quizzes.
