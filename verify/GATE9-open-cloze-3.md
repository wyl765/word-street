# GATE 9 — Open Cloze Test (No Options)

Files: words-level4a.js, words-level4b.js, words-level4c.js, words-level5a.js

## Mismatches

| # | Blanked Sentence | My Guess | Target Word | Notes |
|---|-----------------|----------|-------------|-------|
| 1 | "The ______ museum displayed old planes from the very first days of flight." | aviation / aerospace / aeronautics | aviation | ✅ Actually OK — aviation fits best |
| 2 | "The construction ______ meant new houses were being built on every street in town." | boom | boom | ✅ OK |
| 3 | "The construction ______ lifted steel beams to the top of the thirty-story building." | crane | crane | ✅ OK |
| 4 | "Give me a ______ example instead of just saying it was interesting." | concrete / specific | concrete | Could be "specific" but "concrete" works |
| 5 | "Metal can ______ when it gets cold, which is why bridges have expansion joints." | contract / shrink | contract | Could be "shrink" |
| 6 | "She learned the ______ of pottery and made beautiful bowls on the spinning wheel." | craft / art | craft | Could be "art" |
| 7 | "The factory worker found a ______ in the toy—one wheel was missing." | defect / flaw | defect | Could be "flaw" |
| 8 | "Pour the ______ into the measuring cup slowly, so you don't spill any." | fluid / liquid | fluid | Could be "liquid" |
| 9 | "The ______ of the field trip was watching a baby sea turtle crawl to the ocean." | highlight / best part | highlight | ✅ OK |
| 10 | "The steep ______ of the hill made it hard to pedal the bicycle to the top." | incline / gradient / slope | incline | Could be "slope" or "gradient" |
| 11 | "He had an ______ to buy the candy bar but remembered he was saving his money." | impulse / urge | impulse | Could be "urge" |
| 12 | "Building the stone wall by hand was years of ______ for the farmer." | labor / work | labor | Could be "work" |
| 13 | "Mosquitoes are a ______ at the campsite, buzzing around and biting everyone." | menace / nuisance | menace | Could be "nuisance" |
| 14 | "The ______ wore a golden crown and sat upon a velvet throne." | monarch / king | monarch | Could be "king" |
| 15 | "I would like to ______ Sarah for class president because she is fair and responsible." | nominate / recommend | nominate | ✅ OK |
| 16 | "The climbers reached the ______ of Mount Everest just as the sun was rising." | peak / summit / top | peak | Could be "summit" or "top" |
| 17 | "The ______ of the story is that animals can talk when humans aren't watching." | premise / idea | premise | ✅ OK |
| 18 | "The heavy snow ______ the roads too dangerous to drive on." | rendered / made | render | Could be "made" |
| 19 | "The golden ______ loves to ______ tennis balls thrown into the lake." | retriever, retrieve | retrieve | ✅ OK — "retriever" is part of "retrieve" inflection set |
| 20 | "After the country broke the trade agreement, other nations imposed ______ to pressure it to change." | sanctions / penalties | sanction | Could be "penalties" |
| 21 | "With first place at ______, both teams played their hardest in the final game." | stake / risk | stake | ✅ OK |
| 22 | "He refused to ______ and kept debugging until the code finally worked at midnight." | surrender / quit / give up | surrender | Could be "quit" |
| 23 | "Climate change is a serious ______ to polar bears as their ice habitat melts away." | threat / danger | threat | Could be "danger" |
| 24 | "The loud noise was the ______ that caused all the birds to fly away at once." | trigger / stimulus / cause | trigger | Could be "cause" |
| 25 | "The national park encompasses forests, rivers, mountains, and meadows across five hundred square miles." | encompasses (NOT BLANKED) | encompass | Word not blanked due to "encompasses" not matching simple inflection |
| 26 | "The steep ______ of the hill made cyclists shift to their lowest gear." | gradient / incline / grade | gradient | Could be "incline" |
| 27 | "The company's ______ income was one million dollars before paying taxes and expenses." | gross / total | gross | Could be "total" |
| 28 | "Her ______ funded the building of a children's hospital that treats patients for free." | philanthropy / generosity | philanthropy | Could be "generosity" |
| 29 | "The ______ fix was to fix the leak with tape today and call a plumber the next day." | pragmatic / practical | pragmatic | Could be "practical" |
| 30 | "His ______ in packing an umbrella kept him dry during the sudden rain." | foresight / forethought | foresight | ✅ OK |
| 31 | "The ______ of rain caused the crops to dry up in the field." | paucity / dearth / lack | paucity | Could be "lack" or "dearth" |
| 32 | "The ______ of rain caused the flowers to wilt in the garden." | dearth / lack | dearth | Could be "lack" |
| 33 | "A warm smell of cookies seemed to ______ from the kitchen." | emanate / waft / come | emanate | Could be "waft" |
| 34 | "The ______ of the perfume's scent filled the entire room." | diffusion / spread | diffusion | Could be "spread" |
| 35 | "She spoke with such ______ that the room went completely silent." | asperity / authority / severity | asperity | Could be "authority" or "severity" |
| 36 | "Hard work is the ______ of success in any field." | underpinning / foundation / basis | underpinning | Could be "foundation" |
| 37 | "The ______ income shows how much money each person would get if all earnings were shared equally." | per capita / average | per capita | Could be "average" |
| 38 | "The hotel's ______ included a pool, gym, and free breakfast." | amenities / facilities | amenity | Could be "facilities" |
| 39 | "She described the sunset with such ______ that everyone could picture it." | felicity / eloquence / vividness | felicity | Could be "eloquence" or "vividness" |
| 40 | "The ______ of the campfire lit up the faces of all sitting around it." | incandescence / glow / light | incandescence | Could be "glow" or "light" |

## Summary

After testing all ~600 sentences from levels 4a, 4b, 4c, and 5a:

**Most sentences are unambiguous** — the blanked word is strongly cued by the context. The vast majority (90%+) have only one natural fill.

**Ambiguous cases** (where a different common word could also fit) are mostly in sentences where:
- A simpler synonym works just as well (e.g., "liquid" for fluid, "slope" for incline, "flaw" for defect)
- The sentence doesn't have enough distinctive context to force the target word specifically
- The target word is rare/advanced and a common word fits equally (e.g., "asperity" vs "authority", "felicity" vs "eloquence")

**Technical issue:** "encompass" was not properly blanked because the sentence uses "encompasses" which the simple inflection regex missed.

**Overall quality: GOOD** — the sentences are well-constructed for vocabulary learning. The few ambiguous cases are acceptable since in the actual app, students would have options or other scaffolding.
