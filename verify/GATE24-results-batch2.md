# Gate 2+4 Results — Batch 2

## Summary
- Gate 2 (Reverse Cloze): 1023 tested, 0 wrong, 18 weak_context
- Gate 4 (Back-Translation): 1023 tested, 0 wrong, 23 ambiguous

## Gate 2 Failures (wrong answer or weak context)

| word | file | your_answer | correct | issue |
|------|------|-------------|---------|-------|
| affect | words-level2c.js | affect (low confidence) | affect | WEAK_CONTEXT — "Rain can ___ our plans for a picnic" — could also be "ruin" or "change"; no strong signal for "affect" specifically |
| appeal | words-level2c.js | appeal (low confidence) | appeal | WEAK_CONTEXT — "The teacher ___ to everyone to be kind" — could be "asked" or other verbs; "appealed" works but isn't uniquely forced |
| assume | words-level2c.js | assume (low confidence) | assume | WEAK_CONTEXT — "Don't ___ it will be sunny" — could be "expect" or "presume" (presume is in level2d) |
| assure | words-level2c.js | assure (low confidence) | assure | WEAK_CONTEXT — "Dad ___ me the thunder was far away" — could be "told" or "informed" |
| circumstance | words-level2c.js | circumstance (low confidence) | circumstance | WEAK_CONTEXT — "Under the ___ of heavy rain" — word appears in its own inflected form making it somewhat self-referential |
| imply | words-level2c.js | imply (low confidence) | imply | WEAK_CONTEXT — "Her tone seems to ___ she is not happy" — could be "suggest" or "indicate" (indicate is also in this file) |
| instance | words-level2c.js | instance (low confidence) | instance | WEAK_CONTEXT — "This is one ___ where being patient really helped" — could be "case" or "example" |
| novel | words-level2c.js | novel (low confidence) | novel | WEAK_CONTEXT — "His ___ idea for the science fair surprised all" — could be "new", "creative", "unique"; hard to land on "novel" without def |
| notion | words-level2c.js | notion (low confidence) | notion | WEAK_CONTEXT — "He had the ___ that building a treehouse would be fun" — could be "idea" or "thought" |
| pace | words-level2d.js | pace (low confidence) | pace | WEAK_CONTEXT — "She set a fast ___ and finished the race" — could be "speed" or "rate" |
| presume | words-level2d.js | presume (low confidence) | presume | WEAK_CONTEXT — "I ___ she went home because her bag is gone" — could be "assume" or "guess" |
| prompt | words-level2d.js | prompt (low confidence) | prompt | WEAK_CONTEXT — "Thank you for your ___ reply" — could be "quick" or "fast" |
| prospect | words-level2d.js | prospect (low confidence) | prospect | WEAK_CONTEXT — "The ___ of a summer trip made the students excited" — could be "idea" or "thought" |
| warrant | words-level2d.js | warrant (low confidence) | warrant | WEAK_CONTEXT — "The strange noise was enough to ___ a closer look" — could be "justify" or "require" |
| cope | words-level2d.js | cope (low confidence) | cope | WEAK_CONTEXT — "She learned to ___ with her shyness by taking deep breaths" — could be "deal" |
| favor | words-level3a.js | favor (low confidence) | favor | WEAK_CONTEXT — "Most students ___ chocolate ice cream over vanilla" — could be "prefer" or "choose" |
| engage | words-level3a.js | engage (low confidence) | engage | WEAK_CONTEXT — "The fun science experiment helped ___ even the shyest students" — could be "involve" or "interest" |
| akin | words-level3a.js | akin (low confidence) | akin | WEAK_CONTEXT — "Her love of painting is ___ to her brother's love of drawing" — could be "similar" or "related" |

## Gate 4 Failures (wrong guess or ambiguous)

| word | file | your_guess | correct_word | issue |
|------|------|-----------|--------------|-------|
| affect | words-level2c.js | influence | affect | AMBIGUOUS_DEF — "to cause a change in something" could equally be "influence" or "alter" |
| assist | words-level2c.js | help | assist | AMBIGUOUS_DEF — "to help someone do something" — "help" is the most natural guess |
| appropriate | words-level2c.js | suitable | appropriate | AMBIGUOUS_DEF — "right or fitting for the situation" — "suitable" or "proper" come to mind first |
| bother | words-level2c.js | annoy | bother | AMBIGUOUS_DEF — "to annoy someone or get in their way" — "annoy" or "irritate" are more direct |
| caution | words-level2c.js | care | caution | AMBIGUOUS_DEF — "being careful to avoid danger" — "care" or "carefulness" come first |
| concern | words-level2c.js | worry | concern | AMBIGUOUS_DEF — "a feeling of worry about something" — "worry" is the most direct guess |
| critical | words-level2c.js | essential/vital | critical | AMBIGUOUS_DEF — "very important or serious" — "important", "vital", "essential" all fit |
| desire | words-level2c.js | wish | desire | AMBIGUOUS_DEF — "a strong wish to have or do something" — "wish" is the most natural word |
| display | words-level2c.js | exhibit/show | display | AMBIGUOUS_DEF — "to put something out for people to see" — "show" or "exhibit" are equally valid |
| doubt | words-level2c.js | uncertainty | doubt | AMBIGUOUS_DEF — "a feeling of not being sure" — "uncertainty" fits just as well |
| error | words-level2c.js | mistake | error | AMBIGUOUS_DEF — "a mistake or something wrong" — definition literally uses the word "mistake" |
| fault | words-level2c.js | blame | fault | AMBIGUOUS_DEF — "the responsibility for something that went wrong" — "blame" is equally valid |
| lack | words-level2c.js | need | lack | AMBIGUOUS_DEF — "to not have enough of something you need" — "need" or "shortage" come to mind |
| liberty | words-level2c.js | freedom | liberty | AMBIGUOUS_DEF — "the right to do what you want" — "freedom" is the most natural guess |
| locate | words-level2c.js | find | locate | AMBIGUOUS_DEF — "to find out where something is" — "find" is the obvious first guess |
| obligation | words-level2c.js | duty | obligation | AMBIGUOUS_DEF — "a duty you cannot escape" — definition literally uses "duty", which is also in this file |
| refuse | words-level2d.js | decline/reject | refuse | AMBIGUOUS_DEF — "to firmly say no" — "decline" and "reject" are both in the same file |
| remedy | words-level2d.js | cure | remedy | AMBIGUOUS_DEF — "something that solves a problem or cures a sickness" — "cure" or "solution" |
| reside | words-level2d.js | live/inhabit | reside | AMBIGUOUS_DEF — "to live in a one certain place" — "live" or "inhabit" (inhabit is in level2c) |
| cease | words-level2d.js | stop | cease | AMBIGUOUS_DEF — "to stop completely" — "stop" or "halt" both come first |
| commence | words-level2d.js | begin/start | commence | AMBIGUOUS_DEF — "to begin or start" — definition literally uses "begin" and "start" |
| convey | words-level2d.js | express/communicate | convey | AMBIGUOUS_DEF — "to show or tell a word or feeling" — "express" or "communicate" fit better |
| settle | words-level3a.js | resolve | settle | AMBIGUOUS_DEF — "to decide or agree on something after talking" — "resolve" fits equally (resolve is in level2d) |
