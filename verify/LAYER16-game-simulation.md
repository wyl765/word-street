# Layer 16: Game Mode Simulation

## Summary
| Mode | Tested | Correct | Wrong | Accuracy |
|------|--------|---------|-------|----------|
| Definition Match | 200 | 200 | 0 | 100.0% |
| Example Fill | 200 | 200 | 0 | 100.0% |
| Image Match | 200 | 200 | 0 | 100.0% |
| Reverse Definition | 200 | 200 | 0 | 100.0% |

## Total Words Per Group
| Group | Count |
|-------|-------|
| L1 | 600 |
| L2 | 1811 |
| L3-4 | 1352 |
| L5 | 1099 |
| **Total** | **4862** |

## Definition Match Failures
None found in sampled set.

## Example Fill Failures
None found in sampled set.

## Image Match Failures
None found in sampled set.

## Reverse Definition Failures
None found in sampled set.

---

## Systematic Issues (Full Corpus Scan of 4862 words)

### Words Not Found in Their Example (48)
These words don't appear in their example sentence (even checking common inflections), which breaks Example Fill mode.

| word | example |
|------|--------|
| come back | The dog always comes back when I call his name. |
| point out | The teacher pointed out the comma in my sentence. |
| come across | I came across a shiny shell while walking on the beach. |
| break down | Our old wagon broke down, so we carried the pumpkins. |
| carry out | We carried out our science test step by step. |
| end up | We got lost and ended up at the wrong park. |
| fall apart | My old backpack is falling apart because I have used it so much. |
| look after | She looks after her baby brother while Mom cooks dinner. |
| look up | I looked up the word in the dictionary to find its meaning. |
| pick out | He picked out a red apple from the basket. |
| pull over | Dad pulled over to look at the map. |
| sign up | I signed up for the art class after school. |
| stay up | She stayed up late to finish reading her exciting book. |
| use up | We used up all the paint making our big poster. |
| work out | Everything worked out fine, and we all got home safely. |
| call off | They called off the picnic because of rain. |
| deal with | She dealt with the broken toy by fixing it herself. |
| hand out | The coach handed out jerseys to every player. |
| show up | He always shows up to class on time. |
| take into account | Take the cost into account before buying. |
| account for | Bad weather accounts for most flight delays. |
| act on | She acted on the doctor's advice and rested. |
| boil down to | The argument boils down to who gets the last cookie. |
| freshen up | She freshened up before dinner by washing her face. |
| leave behind | Don't leave your jacket behind when we go. |
| live up to | The movie lived up to all the excitement. |
| rule out | The detective ruled out three suspects. |
| back down | He backed down when he realized he was wrong. |
| bail out | Her friend bailed her out by lending a pencil. |
| bang out | He banged out the report in just one hour. |
| blot out | Dark clouds blotted out the sun. |
| certify | The inspector certified that the playground was safe for children to use. |
| cost an arm and a leg | That new bike costs an arm and a leg! |
| bite off more than you can chew | Joining three clubs was biting off more than he could chew. |
| get cold feet | He got cold feet and did not jump off the diving board. |
| go the extra mile | She went the extra mile and decorated the whole room for the party. |
| sit on the fence | Stop sitting on the fence and pick which game to play. |
| pull someone's leg | Are you pulling my leg, or did you really see a bear? |
| throw in the towel | After trying for an hour, she threw in the towel and asked for help. |
| turn out | The rainy day turned out to be really fun because we played inside. |
| run out of | The printer ran out of paper right before I needed to print my homework. |
| carry on | Even when it got hard, she carried on with the race. |
| kill two birds with one stone | Walking to school kills two birds with one stone: exercise and saving gas. |
| a taste of your own medicine | He finally got a taste of his own medicine when someone interrupted him. |
| burn the midnight oil | He burned the midnight oil to finish his science project. |
| not only...but also | He is not only smart but also very kind. |
| decry | Environmental groups decried the plan to cut down the old forest. |
| gratify | It gratified the teacher to see her students succeed on the exam. |

### Words Using Inflected Form in Example (5)
The example uses an inflected form (e.g. plural, past tense) rather than the base word. Example Fill may show the inflected blank, giving extra clues or confusing players.

| word | inflection_found | example |
|------|-----------------|--------|
| stare | staring | He could not stop staring at the huge cake. |
| embody | embodies | The statue embodies the spirit of freedom and courage. |
| amenity | amenities | The hotel's amenities included a pool, gym, and free breakfast. |
| discriminate | discriminating | Laws exist to prevent companies from discriminating against people bas... |
| mercenary | mercenaries | The king hired mercenaries to fight in the war. |

### Missing imageKeyword
None found — all words have imageKeyword.

## Methodology Notes
- 50 words sampled randomly per level group (L1, L2, L3-4, L5) = 200 total per mode
- 3 distractors chosen randomly from the same level group
- "Correct" means the AI simulation could reliably pick the right answer
- "Wrong" means a structural issue was detected (duplicate definitions, missing words in examples, ambiguous image keywords, etc.)
- Full corpus scan checks ALL words for systematic issues regardless of sampling
- Inflection detection covers: -s, -es, -ed, -ing, -d, -ies, consonant doubling
