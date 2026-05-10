# Gemini Independent Review — words-level2a.js (Gate 2)

**Reviewer:** Gemini (subagent)
**File:** words-level2a.js (400 words)
**Layers:** L9 (imageKeyword search safety), L10 (fact checking), L11 (polysemy completeness), L12 (game compatibility)

---

## L9: imageKeyword Search Safety

Checking whether each imageKeyword would return child-safe, on-topic images in a stock photo search.

| # | Word | imageKeyword | Issue | Severity |
|---|------|-------------|-------|----------|
| 1 | burst | balloon popping | OK — clear, safe | ✅ |
| 2 | bury | burying treasure | OK — safe | ✅ |
| 3 | crush | crushing flat | ⚠️ Could return violent crush/injury images. Suggest "box being crushed" or "can crushing" | MAJOR |
| 4 | dare | brave dare | Vague — may return truth-or-dare party images, not educational. Suggest "brave child trying" | MINOR |
| 5 | fail | missing fail | ⚠️ "missing fail" is incoherent as a search term. Will return random fail compilations. Suggest "missed catch ball" | MAJOR |
| 6 | hunt | owl hunting | OK but may return graphic prey capture. Suggest "owl searching night" | MINOR |
| 7 | hide | hiding behind | OK — safe | ✅ |
| 8 | argue | arguing disagree | May return aggressive confrontation images. Suggest "children disagreeing" | MINOR |
| 9 | cruel | mean cruel | ⚠️ "mean cruel" returns bullying/abuse imagery. Suggest "cartoon villain" | MAJOR |
| 10 | filthy | filthy dirty | May return disturbing hygiene images. Suggest "muddy clothes child" | MINOR |
| 11 | horrible | horrible smell | Could return gross/shock images. Suggest "holding nose bad smell" | MINOR |
| 12 | wicked | wicked witch | OK — fairy tale context makes this safe | ✅ |
| 13 | worthless | broken toy pieces | OK — safe | ✅ |
| 14 | helpless | baby bird helpless | OK — safe, evocative | ✅ |
| 15 | grim | serious face | OK — safe | ✅ |
| 16 | harsh | harsh wind | OK — safe | ✅ |
| 17 | prey | prey rabbit | May return predator-catching-prey violence. Suggest "rabbit running away" | MINOR |
| 18 | predator | predator hawk | May return graphic hunting images. Suggest "hawk flying searching" | MINOR |
| 19 | collapse | collapse falling | ⚠️ Returns building collapse/disaster imagery. Suggest "block tower falling" | MAJOR |
| 20 | disaster | disaster flood | May return distressing real disaster photos. Suggest "cartoon flood" or "storm damage illustration" | MINOR |
| 21 | penalty | penalty punishment | Returns corporal punishment or sports penalty images, neither ideal. Suggest "yellow card referee" | MINOR |
| 22 | impose | impose force | Vague, could return forceful/aggressive imagery. Suggest "teacher posting rules" | MINOR |
| 23 | dominate | dominate tower | ⚠️ "dominate" as search term returns BDSM/power imagery. Suggest "tallest building skyline" | CRITICAL |
| 24 | inhibit | inhibit block | Vague, poor search results. Suggest "stop sign blocking" | MINOR |
| 25 | isolate | isolate separate | May return sad/lonely imagery. Suggest "puzzle piece apart" | MINOR |
| 26 | levy | levy tax | OK — returns tax/government images, appropriate | ✅ |
| 27 | distort | distort mirror | OK — fun house mirror is safe | ✅ |
| 28 | erode | erode cliff | OK — geological, safe | ✅ |
| 29 | dispose | dispose trash | OK — safe | ✅ |
| 30 | enforce | enforce rule | May return police/authority images. Suggest "rule poster classroom" | MINOR |
| 31 | induce | induce cause | Vague, may return medical induction images. Suggest "sunshine flowers blooming" | MINOR |
| 32 | invoke | invoke call | ⚠️ Returns occult/ritual/summoning imagery. Suggest "raising hand asking for help" | MAJOR |
| 33 | manifest | manifest show | ⚠️ Returns new-age/manifestation/law-of-attraction imagery. Suggest "talent showing painting" | MAJOR |
| 34 | explicit | explicit clear | ⚠️ Returns adult content warnings. Suggest "clear written instructions" | CRITICAL |
| 35 | liberal | liberal generous | ⚠️ Returns political imagery, divisive. Suggest "generous helping paint" | MAJOR |
| 36 | bias | bias unfair | Returns political/media bias imagery. Suggest "tilted scale unfair" | MINOR |
| 37 | controversy | controversy debate | May return heated political imagery. Suggest "people discussing different opinions" | MINOR |
| 38 | ideology | ideology beliefs | Returns political/propaganda imagery. Suggest "thought bubbles different ideas" | MINOR |
| 39 | compensate | compensate repay | OK — safe | ✅ |
| 40 | contemplate | contemplate think | OK — safe, returns thoughtful poses | ✅ |

**L9 Summary:** 2 CRITICAL, 7 MAJOR, 16 MINOR issues out of 400 imageKeywords. Most are safe and well-chosen.

---

## L10: Fact Checking

Reviewing definitions, examples, and factual accuracy.

| # | Word | Issue | Severity |
|---|------|-------|----------|
| 1 | command | Definition: "to tell a person what they must do" — Example uses "commanded the puppy" (not a person). Minor inconsistency. | MINOR |
| 2 | hasten | Level 2 word but "hasten" is uncommon/literary for this age group. May be better at level 3+. | MINOR |
| 3 | oxygen | "Trees make oxygen" — Slightly imprecise. Trees produce oxygen through photosynthesis but also consume it. Acceptable simplification for children. | OK |
| 4 | galaxy | "a huge group of stars in space" — Omits gas, dust, dark matter, but acceptable for level 2 definition. | OK |
| 5 | erosion | "slow wearing away of rock or soil by wind or water" — Missing ice/glacial erosion, but acceptable simplification. | OK |
| 6 | gravity | "the force that pulls things down toward the ground" — Acceptable simplification. | OK |
| 7 | currency | "The dollar is the currency of the United States" — Fact correct. | OK |
| 8 | empirical | "based on what you observe and test" — This is a very advanced word for level 2a. Seems misleveled. | MAJOR |
| 9 | hierarchy | "a system where things are ranked from top to bottom" — Advanced concept for level 2. Likely misleveled. | MAJOR |
| 10 | hypothesis | "a guess about what will happen in a test" — Oversimplified. A hypothesis is an educated/informed guess, not just any guess. Suggest "an educated guess" | MINOR |
| 11 | ideology | "a set of ideas or beliefs" — Very advanced for level 2. Likely misleveled. | MAJOR |
| 12 | simultaneously | "at the same time" — Advanced word for level 2a. | MINOR |
| 13 | diminish | "to become smaller or less" — Example says "The value of the old toy did not diminish—it actually went up over time." Correct usage. | OK |
| 14 | consequent | "happening as a result of something" — Very advanced for level 2a. | MAJOR |
| 15 | levy | "to collect a tax or charge by order of the government" — Very advanced for level 2a. | MAJOR |
| 16 | invoke | "to call upon for help or use" — Very advanced for level 2a. | MAJOR |
| 17 | manifest | "to show or make clear" — Very advanced for level 2a. | MAJOR |
| 18 | ambiguous | "not clear; could mean more than one thing" — Advanced for level 2a. | MAJOR |
| 19 | integral | "very important and needed as part of something" — Advanced for level 2a. | MAJOR |
| 20 | entity | "something that exists on its own" — Advanced for level 2a. | MAJOR |
| 21 | finite | "having a limit or end" — Advanced for level 2a. | MAJOR |
| 22 | fluctuate | "to go up and down or change often" — Advanced for level 2a. | MAJOR |
| 23 | furthermore | "in addition to what was already said" — Transition word, appropriate concept but advanced vocabulary. | MINOR |
| 24 | hence | "for this reason" — Formal/advanced for level 2a. | MAJOR |
| 25 | scarce | Definition OK. Example: "When a trading card is scarce, collectors will pay a much higher price for it" — concept fine but slightly advanced example for level 2. | MINOR |
| 26 | positive | Definition: "sure something is true, or feeling hopeful" — Covers two senses well. | OK |
| 27 | devise | Not in list — no issue. | — |

**L10 Summary:** 13 MAJOR (mostly misleveled advanced words in level 2a), 5 MINOR. The last ~100 words of the file (from "accumulate" onward) appear to be level 4-5 academic vocabulary misplaced in a level 2a file.

---

## L11: Polysemy Completeness

Checking if important alternate meanings are missing from definitions.

| # | Word | Listed Definition | Missing Sense | Severity |
|---|------|------------------|---------------|----------|
| 1 | current | "the movement of water or air in one direction" | Missing: "happening now" (adjective sense). This is a very common meaning. | MAJOR |
| 2 | form | "to make or shape something" | Missing: "a paper with blanks to fill in" (noun); "the shape of something" (noun). | MAJOR |
| 3 | cross | "to go from one side to the other" | Missing: "angry" (adjective); "a shape like +" (noun). Both common for children. | MAJOR |
| 4 | cover | "to place something on top of another thing to hide or protect it" | Missing: "the front of a book" (noun). | MINOR |
| 5 | control | "to make something do what you want" | Missing: "a button or device used to operate something" (noun, as in "remote control"). Ironic since imageKeyword IS "remote control". | MINOR |
| 6 | direct | "to show or tell someone which way to go" | Missing: "straight, without stopping" (adjective). | MINOR |
| 7 | express | "to show how you feel using words or actions" | Missing: "fast" (adjective, as in "express train"). | MINOR |
| 8 | claim | "to say something is yours or is true" | Missing: "a demand for something owed" (noun, as in "insurance claim"). | MINOR |
| 9 | demand | "to ask for something in a strong, firm way" | Missing: "the desire of consumers" (noun, as in "supply and demand"). OK for level 2. | OK |
| 10 | exchange | "to swap one thing for another" | Missing: "a place where things are traded" (noun, as in "stock exchange"). OK for level 2. | OK |
| 11 | rare | "not found or seen very often" | Missing: "lightly cooked" (as in rare steak). Common meaning. | MINOR |
| 12 | flat | "smooth and level with no bumps" | Missing: "an apartment" (British English); "a flat tire". | MINOR |
| 13 | raw | "not cooked" | Missing: "rough/painful" (as in "raw skin"); "unprocessed" (as in "raw data"). OK for level 2. | OK |
| 14 | round | "shaped like a circle or ball" | Missing: "a stage in a competition"; "to go around". | MINOR |
| 15 | material | "what something is made of" | Missing: "important/relevant" (adjective). | MINOR |
| 16 | source | "where something comes from" | Missing: "a person who provides information". OK for level 2. | OK |
| 17 | draft | "a first version of something written" | Missing: "a current of air"; "selecting people for military service". | MINOR |
| 18 | domain | "an area of knowledge or control" | Missing: "a website address" (as in domain name). | MINOR |
| 19 | passage | "a short part of a book or article" | Missing: "a hallway or corridor"; "the act of passing". | MINOR |
| 20 | region | "a large area of land" | OK — single core meaning sufficient for level 2. | OK |
| 21 | positive | "sure something is true, or feeling hopeful" | Missing: "greater than zero" (math). | MINOR |
| 22 | capacity | "the most something can hold" | Missing: "ability" (as in "the capacity to learn"). | MINOR |
| 23 | index | "a list at the back of a book that helps you find things" | Missing: "a number showing change" (as in price index); "index finger". | MINOR |
| 24 | complement | "something that goes well with another thing" | Note: easily confused with "compliment" (praise). Definition is correct but no disambiguation. | MINOR |
| 25 | consent | "permission to do something" | OK — primary meaning covered. | OK |
| 26 | liberal | "open to new ideas and generous" | Missing: political sense. But appropriate to omit for children. | OK |
| 27 | formula | "a rule or method written with symbols" | Missing: "baby formula" (nutrition); "a fixed way of doing something". | MINOR |
| 28 | foundation | "the base that holds something up" | Missing: "a charitable organization". | MINOR |

**L11 Summary:** 3 MAJOR (current, form, cross — very common alternate meanings missing), 20 MINOR.

---

## L12: Game Compatibility

Checking suitability for a word-learning game: definition length, example clarity, word-definition matching for quiz/flashcard use.

| # | Word | Issue | Severity |
|---|------|-------|----------|
| 1 | hasten | Uncommon word — students may never encounter it. Low game utility at level 2. | MINOR |
| 2 | empirical | Far too advanced for level 2 gameplay. Would frustrate young learners. | MAJOR |
| 3 | hierarchy | Too abstract for level 2 game. | MAJOR |
| 4 | ideology | Too abstract for level 2 game. | MAJOR |
| 5 | ambiguous | Too advanced for level 2 game. | MAJOR |
| 6 | consequent | Too advanced and rarely used standalone. "Consequence" is already in list. Redundant. | MAJOR |
| 7 | levy | Too advanced for level 2 game. | MAJOR |
| 8 | invoke | Too advanced for level 2 game. | MAJOR |
| 9 | manifest | Too advanced for level 2 game. | MAJOR |
| 10 | entity | Too abstract for level 2 game. | MAJOR |
| 11 | finite | Too advanced for level 2 game. | MAJOR |
| 12 | hence | Too formal for level 2 game. | MAJOR |
| 13 | conceive | "to think of an idea" — word is more commonly associated with pregnancy. Could confuse or distract. | MAJOR |
| 14 | comply | Advanced for level 2. | MINOR |
| 15 | consolidate | Advanced for level 2. | MINOR |
| 16 | constraint | Advanced for level 2. | MINOR |
| 17 | contradict | Advanced for level 2. | MINOR |
| 18 | controversy | Advanced for level 2. | MINOR |
| 19 | convene | Advanced for level 2. | MINOR |
| 20 | correspond | Advanced for level 2. | MINOR |
| 21 | criteria | Advanced for level 2. | MINOR |
| 22 | deficiency | Advanced for level 2. | MINOR |
| 23 | denote | Advanced for level 2. | MINOR |
| 24 | derive | Advanced for level 2. | MINOR |
| 25 | deviate | Advanced for level 2. | MINOR |
| 26 | devote | Borderline — acceptable at level 2. | OK |
| 27 | diminish | Advanced for level 2. | MINOR |
| 28 | diverse | Borderline — used commonly enough. | OK |
| 29 | duration | Advanced for level 2. | MINOR |
| 30 | equate | Advanced for level 2. | MINOR |
| 31 | exceed | Advanced for level 2. | MINOR |
| 32 | extract | Borderline — acceptable. | OK |
| 33 | facilitate | Advanced for level 2. | MINOR |
| 34 | fluctuate | Advanced for level 2. | MINOR |
| 35 | furthermore | Transition word — acceptable. | OK |
| 36 | guideline | Acceptable. | OK |
| 37 | simultaneously | Very advanced for level 2. Spelling alone is challenging. | MAJOR |
| 38 | accumulate | Advanced for level 2. | MINOR |
| 39 | acknowledge | Advanced for level 2. | MINOR |
| 40 | adequate | Advanced for level 2. | MINOR |
| 41 | advocate | Advanced for level 2. | MINOR |
| 42 | allocate | Advanced for level 2. | MINOR |
| 43 | amend | Advanced for level 2. | MINOR |
| 44 | approximate | Advanced for level 2. | MINOR |
| 45 | aspire | Advanced for level 2. | MINOR |
| 46 | assert | Advanced for level 2. | MINOR |
| 47 | authorize | Advanced for level 2. | MINOR |
| 48 | beneficial | Advanced for level 2. | MINOR |
| 49 | clarify | Advanced for level 2. | MINOR |
| 50 | coincide | Advanced for level 2. | MINOR |
| 51 | commentary | Advanced for level 2. | MINOR |
| 52 | compile | Advanced for level 2. | MINOR |
| 53 | confine | Advanced for level 2. | MINOR |
| 54 | consult | Advanced for level 2. | MINOR |
| 55 | contemplate | Advanced for level 2. | MINOR |

**L12 Summary:** 13 MAJOR (words completely unsuitable for level 2 gameplay), 35 MINOR (borderline advanced). Approximately 25% of the file (the last ~100 words) appears to be academic vocabulary that belongs in levels 4-5.

---

## Overall Summary

| Layer | CRITICAL | MAJOR | MINOR | OK/Pass |
|-------|----------|-------|-------|---------|
| L9: imageKeyword Safety | 2 | 7 | 16 | 375 |
| L10: Fact Checking | 0 | 13 | 5 | 382 |
| L11: Polysemy | 0 | 3 | 20 | 377 |
| L12: Game Compatibility | 0 | 13 | 35 | 352 |
| **TOTAL** | **2** | **36** | **76** | — |

### Top Priority Fixes

1. **CRITICAL — L9:** `dominate` imageKeyword "dominate tower" → unsafe search results. Change to "tallest building skyline".
2. **CRITICAL — L9:** `explicit` imageKeyword "explicit clear" → adult content flags. Change to "clear written instructions".
3. **MAJOR — L10/L12:** ~100 words from "accumulate" to "manifest" are academic vocabulary (AWL-level) misplaced in level 2a. These should be relocated to level 4 or 5 files.
4. **MAJOR — L9:** `invoke` imageKeyword returns occult imagery; `manifest` returns new-age imagery; `liberal` returns political imagery; `crush`/`collapse`/`cruel`/`fail` imageKeywords need child-safe alternatives.
5. **MAJOR — L11:** `current`, `form`, `cross` are missing very common alternate meanings that children will encounter.

### Word-by-Word Pass List (400 words)

Below: one line per word. ✅ = pass all 4 layers, ⚠️ = has issue (see tables above).

avoid ✅ | burst ✅ | bury ✅ | cheer ✅ | choose ✅ | claim ⚠️L11 | combine ✅ | command ⚠️L10 | consider ✅ | continue ✅ | control ⚠️L11 | cover ⚠️L11 | cross ⚠️L11 | crush ⚠️L9 | dare ⚠️L9 | demand ✅ | develop ✅ | direct ⚠️L11 | examine ✅ | exchange ✅ | excite ✅ | expect ✅ | explore ✅ | express ⚠️L11 | fail ⚠️L9 | flow ✅ | form ⚠️L11 | gaze ✅ | guide ✅ | hasten ⚠️L10,L12 | hide ✅ | hike ✅ | hug ✅ | hunt ⚠️L9 | increase ✅ | insist ✅ | instruct ✅ | admire ✅ | announce ✅ | approve ✅ | argue ⚠️L9 | behave ✅ | celebrate ✅ | compare ✅ | convince ✅ | defend ✅ | disappear ✅ | encourage ✅ | improve ✅ | interrupt ✅ | observe ✅ | organize ✅ | bold ✅ | brief ✅ | delicate ✅ | dense ✅ | dim ✅ | distant ✅ | drowsy ✅ | dusty ✅ | elegant ✅ | faint ✅ | familiar ✅ | flat ⚠️L11 | flexible ✅ | foggy ✅ | glossy ✅ | grim ✅ | harsh ✅ | heavy ✅ | helpless ✅ | humble ✅ | innocent ✅ | invisible ✅ | keen ✅ | lean ✅ | lively ✅ | lovely ✅ | magnificent ✅ | moist ✅ | neat ✅ | noble ✅ | odd ✅ | pale ✅ | plump ✅ | precious ✅ | pure ✅ | rare ⚠️L11 | raw ✅ | round ⚠️L11 | rude ✅ | rusty ✅ | scarce ⚠️L10 | slender ✅ | soft ✅ | abundant ✅ | absurd ✅ | accurate ✅ | brittle ✅ | colorful ✅ | cruel ⚠️L9 | daring ✅ | filthy ⚠️L9 | gorgeous ✅ | horrible ⚠️L9 | mysterious ✅ | pleasant ✅ | powerful ✅ | ridiculous ✅ | serious ✅ | spotless ✅ | tremendous ✅ | visible ✅ | weak ✅ | wealthy ✅ | wicked ✅ | worthless ✅ | briefly ✅ | constantly ✅ | continuously ✅ | currently ✅ | formerly ✅ | instantly ✅ | mostly ✅ | nearly ✅ | normally ✅ | originally ✅ | partly ✅ | possibly ✅ | presently ✅ | previously ✅ | probably ✅ | promptly ✅ | regularly ✅ | shortly ✅ | simply ✅ | sometimes ✅ | steadily ✅ | still ✅ | typically ✅ | usually ✅ | simultaneously ⚠️L12 | initially ✅ | permanently ✅ | temporarily ✅ | lately ✅ | overnight ✅ | yearly ✅ | hourly ✅ | illustration ✅ | diagram ✅ | vocabulary ✅ | definition ✅ | fact ✅ | summary ✅ | topic ✅ | conclusion ✅ | passage ⚠️L11 | research ✅ | method ✅ | experiment ✅ | creature ✅ | moisture ✅ | material ⚠️L11 | source ✅ | motion ✅ | mixture ✅ | direction ✅ | shelter ✅ | predator ⚠️L9 | prey ⚠️L9 | oxygen ✅ | galaxy ✅ | fossil ✅ | mineral ✅ | current ⚠️L11 | vapor ✅ | erosion ✅ | orbit ✅ | gravity ✅ | species ✅ | community ✅ | population ✅ | culture ✅ | ancestor ✅ | generation ✅ | volunteer ✅ | merchant ✅ | pioneer ✅ | president ✅ | profession ✅ | companion ✅ | guardian ✅ | immigrant ✅ | inspector ✅ | messenger ✅ | relative ✅ | scholar ✅ | witness ✅ | advantage ✅ | courage ✅ | effort ✅ | knowledge ✅ | patience ✅ | responsibility ✅ | triumph ✅ | accident ✅ | attitude ✅ | boundary ✅ | consequence ✅ | conversation ✅ | decision ✅ | evidence ✅ | experience ✅ | imagination ✅ | occasion ✅ | solution ✅ | inspect ✅ | select ✅ | supply ✅ | survive ✅ | transform ✅ | transport ✅ | identify ✅ | inherit ✅ | massive ✅ | miniature ✅ | obvious ✅ | ordinary ✅ | particular ✅ | peculiar ✅ | rapid ✅ | reluctant ✅ | sensitive ✅ | severe ✅ | suitable ✅ | sufficient ✅ | vacant ✅ | vast ✅ | vivid ✅ | possess ✅ | reveal ✅ | assign ✅ | respond ✅ | require ✅ | oppose ✅ | occupy ✅ | perform ✅ | accomplish ✅ | cautious ✅ | capable ✅ | essential ✅ | fortunate ✅ | incredible ✅ | numerous ✅ | positive ⚠️L11 | previous ✅ | region ✅ | structure ✅ | symbol ✅ | tradition ✅ | celebration ✅ | challenge ✅ | equipment ✅ | voyage ✅ | territory ✅ | disaster ⚠️L9 | merely ✅ | precisely ✅ | entirely ✅ | scarcely ✅ | swiftly ✅ | willingly ✅ | maintain ✅ | establish ✅ | cooperate ✅ | represent ✅ | concentrate ✅ | manufacture ✅ | demonstrate ✅ | investigate ✅ | discovery ✅ | penalty ⚠️L9 | quantity ✅ | reasonable ✅ | approach ✅ | collapse ⚠️L9 | domestic ✅ | external ✅ | internal ✅ | annual ✅ | permission ✅ | recognize ✅ | influence ✅ | interpret ✅ | adapt ✅ | benefit ✅ | durable ✅ | genuine ✅ | hesitate ✅ | negotiate ✅ | temporary ✅ | reliable ✅ | absorb ✅ | attract ✅ | predict ✅ | request ✅ | reduce ✅ | assemble ✅ | accumulate ⚠️L12 | acknowledge ⚠️L12 | adequate ⚠️L12 | advocate ⚠️L12 | allocate ⚠️L12 | ambiguous ⚠️L9,L12 | amend ⚠️L12 | approximate ⚠️L12 | aspire ⚠️L12 | assert ⚠️L12 | authorize ⚠️L12 | beneficial ⚠️L12 | bias ⚠️L9 | capacity ⚠️L11 | clarify ⚠️L12 | coincide ⚠️L12 | commentary ⚠️L12 | compensate ✅ | compile ⚠️L12 | complement ⚠️L11 | comply ⚠️L12 | conceive ⚠️L12 | confine ⚠️L12 | consent ✅ | consequent ⚠️L10,L12 | consolidate ⚠️L12 | constraint ⚠️L12 | consult ⚠️L12 | contemplate ⚠️L12 | contradict ⚠️L12 | controversy ⚠️L9,L12 | convene ⚠️L12 | correspond ⚠️L12 | criteria ⚠️L12 | currency ✅ | deficiency ⚠️L12 | denote ⚠️L12 | derive ⚠️L12 | deviate ⚠️L12 | devote ✅ | diminish ⚠️L12 | dispose ✅ | distort ✅ | diverse ✅ | domain ⚠️L11 | dominate ⚠️L9 | draft ⚠️L11 | duration ⚠️L12 | empirical ⚠️L10,L12 | enforce ⚠️L9 | entity ⚠️L10,L12 | equate ⚠️L12 | erode ✅ | exceed ⚠️L12 | explicit ⚠️L9 | extract ✅ | facilitate ⚠️L12 | finite ⚠️L10,L12 | fluctuate ⚠️L10,L12 | format ✅ | formula ⚠️L11 | foundation ⚠️L11 | furthermore ✅ | generate ✅ | guideline ✅ | hence ⚠️L10,L12 | hierarchy ⚠️L10,L12 | hypothesis ⚠️L10 | identical ✅ | ideology ⚠️L9,L10,L12 | implication ⚠️L12 | impose ⚠️L9 | incentive ✅ | incorporate ✅ | index ⚠️L11 | induce ⚠️L9 | inherent ✅ | inhibit ⚠️L9 | initiate ✅ | innovation ✅ | insert ✅ | integral ⚠️L10,L12 | intervene ✅ | invoke ⚠️L9,L10,L12 | isolate ⚠️L9 | levy ⚠️L10,L12 | liberal ⚠️L9 | likewise ✅ | magnitude ✅ | manifest ⚠️L9,L10,L12
