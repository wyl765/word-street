# Gate 2+4 Results — Batch 3

## Summary
- **Gate 2:** 1094 tested, 0 wrong, 18 weak_context
- **Gate 4:** 1094 tested, 0 wrong, 42 ambiguous

## Gate 2 Failures (wrong answer or weak context)

| word | file | your_guess | correct | issue |
|------|------|-----------|---------|-------|
| advance | words-level3c.js | advance | advance | WEAK_CONTEXT — "The chess piece can only ___ one square at a time." Could be "move" — sentence doesn't uniquely select "advance" over general motion words |
| apply | words-level3c.js | apply | apply | WEAK_CONTEXT — "She learned to ___ sunscreen before going to the beach" — could be "put on" or "use"; only works if you already know "apply sunscreen" is the collocation |
| manner | words-level3c.js | manner | manner | WEAK_CONTEXT — "She spoke in a polite ___, always saying 'please' and 'thank you'" — "way" fits equally well; "manner" only works if it's in the option set |
| regulate | words-level3c.js | regulate | regulate | WEAK_CONTEXT — "A thermostat helps ___ the heat" — "control" fits equally well |
| foil | words-level3c.js | foil | foil | WEAK_CONTEXT — "Dad wrapped the leftover pizza in ___ to keep it fresh" — sentence works but "foil" is not inferrable from context alone without seeing options; could be "plastic wrap" etc. |
| hose | words-level3c.js | hose | hose | WEAK_CONTEXT — "She sprayed her brother with the garden ___" — only works with "hose" in options; sentence is fine but the blank is essentially naming the object |
| mend | words-level3c.js | mend | mend | WEAK_CONTEXT — "Grandma used a needle and thread to ___ the hole" — "fix," "repair," "sew" all fit |
| invest | words-level3c.js | invest | invest | WEAK_CONTEXT — "She chose to ___ her allowance in art supplies, so she could sell paintings later" — "spend" fits nearly as well |
| idle | words-level3c.js | idle | idle | WEAK_CONTEXT — "The swing sat ___ in the yard because all the kids were inside" — "empty," "still," "unused" all fit |
| instill | words-level3c.js | instill | instill | WEAK_CONTEXT — "The coach ___ed a sense of teamwork in every player" — "built," "created" fit; similar to "imbue" in same file |
| imbue | words-level3c.js | imbue | imbue | WEAK_CONTEXT — "The teacher ___d his students with a love of reading" — "filled," "inspired" fit; nearly identical pattern to "instill" |
| infuse | words-level3c.js | infuse | infuse | WEAK_CONTEXT — "She ___d the water with slices of lemon and mint" — "filled" fits; also very similar to imbue/instill pattern |
| hone | words-level3c.js | hone | hone | WEAK_CONTEXT — "She ___d her drawing skills by sketching every day" — "improved," "practiced" fit |
| calibration | words-level4a.js | calibration | calibration | WEAK_CONTEXT — "The ___ of the telescope allowed scientists to see distant stars clearly" — "adjustment," "alignment" fit |
| facilitation | words-level4a.js | facilitation | facilitation | WEAK_CONTEXT — "The teacher's ___ of the group talk helped all share thoughts" — "management," "leading" fit |
| obviate | words-level4b.js | obviate | obviate | WEAK_CONTEXT — "Wearing a seatbelt can ___ serious injuries during a car accident" — "prevent," "avoid" fit better and more naturally |
| calibrate | words-level4c.js | calibrate | calibrate | WEAK_CONTEXT — "You must ___ the thermometer so it shows the correct temperature" — "adjust" fits equally well |
| cogitate | words-level4c.js | cogitate | cogitate | WEAK_CONTEXT — "She sat quietly to ___ on the best solution" — "think," "reflect," "ponder" all fit |

## Gate 4 Failures (wrong guess or ambiguous)

| word | file | your_guess | correct_word | issue |
|------|------|-----------|-------------|-------|
| advance | words-level3c.js | progress / move forward | advance | AMBIGUOUS_DEF — "to move forward or make progress" equally describes "progress," "proceed" |
| apply | words-level3c.js | use | apply | AMBIGUOUS_DEF — "to use something or put it into action" — "use," "utilize," "employ" all match |
| manner | words-level3c.js | way | manner | AMBIGUOUS_DEF — "the way you do something" — "way" is the most obvious guess |
| regulate | words-level3c.js | control | regulate | AMBIGUOUS_DEF — "to control something so it works correctly" — "control" is the first guess |
| mend | words-level3c.js | fix / repair | mend | AMBIGUOUS_DEF — "to fix something that is broken or torn" — "fix" or "repair" are more common |
| hone | words-level3c.js | sharpen / improve | hone | AMBIGUOUS_DEF — "to sharpen or improve a skill" — could be "sharpen," "refine," "improve" |
| instill | words-level3c.js | imbue / instill | instill | AMBIGUOUS_DEF — "to gradually teach a thought or feeling to someone" — "instill" or "imbue" or "inculcate" all match; hard to distinguish from "imbue" in same file |
| imbue | words-level3c.js | instill / fill | imbue | AMBIGUOUS_DEF — "to fill something with a quality or feeling" — "fill," "infuse," "instill" all match |
| infuse | words-level3c.js | imbue / steep | infuse | AMBIGUOUS_DEF — "to fill something with a quality, or to soak to extract flavor" — overlaps heavily with "imbue" |
| irk | words-level3c.js | annoy | irk | AMBIGUOUS_DEF — "to mildly annoy someone" — "annoy," "bother," "irritate" all fit |
| idle | words-level3c.js | inactive | idle | AMBIGUOUS_DEF — "not doing anything or not being used" — "inactive," "unused" fit |
| leer | words-level3c.js | stare / glare | leer | AMBIGUOUS_DEF — "to look at someone in a sly or unpleasant way" — "glare" is in same file and partially overlaps |
| legible | words-level3c.js | readable | legible | AMBIGUOUS_DEF — "clear enough to be read" — "readable" is the obvious first guess |
| livelihood | words-level3c.js | living | livelihood | AMBIGUOUS_DEF — "the way someone earns money to live" — "living" or "occupation" fit |
| locale | words-level3c.js | location | locale | AMBIGUOUS_DEF — "the place where something happens" — "location," "setting," "venue" all fit |
| lucid | words-level3c.js | clear | lucid | AMBIGUOUS_DEF — "easy to understand, or thinking clearly" — "clear" is the obvious guess |
| limpid | words-level3c.js | clear / transparent | limpid | AMBIGUOUS_DEF — "perfectly clear, so you can see right through it" — "clear," "transparent" fit better |
| lineage | words-level3c.js | ancestry | lineage | AMBIGUOUS_DEF — "the direct line of family members going back through history" — "ancestry" is in same file with very similar def |
| ancestry | words-level3c.js | lineage | ancestry | AMBIGUOUS_DEF — "your family members who lived long before you" — "lineage," "heritage," "ancestors" all fit |
| alter | words-level4a.js | change / modify | alter | AMBIGUOUS_DEF — "to change something without replacing it completely" — "change," "modify" more common |
| bland | words-level4a.js | tasteless | bland | AMBIGUOUS_DEF — "having almost no taste or seasoning" — "tasteless," "flavorless" fit |
| crave | words-level4a.js | desire / want | crave | AMBIGUOUS_DEF — "to want something very badly" — "desire," "yearn," "want" fit |
| decay | words-level4a.js | rot / decompose | decay | AMBIGUOUS_DEF — "to slowly break down and rot over time" — "rot," "decompose" equally valid |
| credible | words-level4a.js | believable | credible | AMBIGUOUS_DEF — "able to be believed and trusted as true" — "believable," "trustworthy" fit |
| drain | words-level4a.js | empty | drain | AMBIGUOUS_DEF — "to remove liquid from something" — "empty," "siphon" fit |
| fatigue | words-level4a.js | exhaustion / tiredness | fatigue | AMBIGUOUS_DEF — "extreme tiredness" — "exhaustion," "weariness" fit |
| colloquial | words-level4a.js | informal | colloquial | AMBIGUOUS_DEF — "used in everyday conversation rather than formal writing" — "informal," "casual" fit |
| laconic | words-level4a.js | terse / brief | laconic | AMBIGUOUS_DEF — "using very few words" — "terse," "concise," "brief" all fit; "terse" is in level4b |
| lassitude | words-level4a.js | fatigue / weariness | lassitude | AMBIGUOUS_DEF — "a feeling of weariness and lack of energy" — "fatigue," "lethargy," "torpor" all fit; "fatigue" in same file |
| nascent | words-level4a.js | emerging / budding | nascent | AMBIGUOUS_DEF — "just starting to develop" — "emerging," "budding," "incipient" fit |
| insipid | words-level4a.js | boring / dull | insipid | AMBIGUOUS_DEF — "so boring and dull that it fails to hold your attention" — "boring," "dull," "vapid" all fit; "vapid" in level4b |
| robust | words-level4b.js | strong / sturdy | robust | AMBIGUOUS_DEF — "strong, healthy, and able to handle tough conditions" — "sturdy," "hardy" fit |
| restrain | words-level4b.js | hold back | restrain | AMBIGUOUS_DEF — "to hold back or prevent from doing something" — "hold back," "restrict," "constrain" fit |
| terse | words-level4b.js | curt / laconic | terse | AMBIGUOUS_DEF — "using very few words in a way that seems rude" — "curt," "brusque" fit; overlaps with "laconic" in 4a |
| succinct | words-level4b.js | concise / brief | succinct | AMBIGUOUS_DEF — "expressed clearly in just a few words" — "concise," "brief" more common guesses |
| torpor | words-level4b.js | lethargy / sluggishness | torpor | AMBIGUOUS_DEF — "a state of inactivity or sluggishness" — "lethargy," "sluggishness," "lassitude" fit |
| vapid | words-level4b.js | dull / boring | vapid | AMBIGUOUS_DEF — "dull and lacking any spark" — "dull," "boring," "insipid" all fit |
| frugal | words-level4c.js | thrifty | frugal | AMBIGUOUS_DEF — "careful with money; avoiding waste" — "thrifty," "economical" equally valid |
| prudent | words-level4c.js | cautious / wise | prudent | AMBIGUOUS_DEF — "showing careful judgment to avoid risks" — "cautious," "careful," "wise" fit |
| pertinent | words-level4c.js | relevant | pertinent | AMBIGUOUS_DEF — "relevant and directly related to the matter being discussed" — "relevant" is the obvious guess; "germane" in 4a also similar |
| pragmatic | words-level4c.js | practical | pragmatic | AMBIGUOUS_DEF — "dealing with things in a practical rather than idealistic way" — "practical" is the first guess |
| obdurate | words-level4c.js | stubborn / obstinate | obdurate | AMBIGUOUS_DEF — "stubbornly refusing to change one's mind or behavior" — "stubborn," "obstinate" (in 4b) fit identically |

## Cross-File Overlap Issues (Notable)

These word pairs across files have nearly identical definitions, creating confusion for both Gate 2 and Gate 4:

1. **instill** (3c) / **imbue** (3c) / **infuse** (3c) / **inculcate** (4a) — all mean "fill with quality/feeling/teaching"
2. **ancestry** (3c) / **lineage** (3c) — both about family history going back generations
3. **lucid** (3c) / **limpid** (3c) — both mean "clear" (mental vs physical clarity, but defs overlap)
4. **laconic** (4a) / **terse** (4b) / **succinct** (4b) — all "few words" with subtle tone differences not captured
5. **lassitude** (4a) / **fatigue** (4a) / **torpor** (4b) — all "tiredness/weariness"
6. **insipid** (4a) / **vapid** (4b) — both "boring and dull"
7. **obstinate** (4b) / **obdurate** (4c) — both "stubbornly refusing to change"
8. **pertinent** (4c) / **germane** (4a) — both "relevant to the topic"
9. **frugal** (4c) / **frugality** (4a) — same root, definitions nearly identical
10. **pragmatic** (4c) / **pragmatism** (4b) — same root
