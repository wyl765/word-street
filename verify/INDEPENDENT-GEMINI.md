# Independent Gemini Audit

## CRITICAL (factually wrong, must fix)
| word | file | what's wrong |
| --- | --- | --- |

## HIGH (misleading or grammar broken)
| word | file | what's wrong |
| --- | --- | --- |
| come back | words-level1.js | Word not used in example: "The dog always comes back when I call his name." (uses 'comes back') |
| point out | words-level2.js | Word not used in example: "The teacher pointed out the comma in my sentence." (uses 'pointed out') |
| come across | words-level2.js | Word not used in example: "I came across a shiny shell while walking on the beach." (uses 'came across') |
| break down | words-level2.js | Word not used in example: "Our old wagon broke down, so we carried the pumpkins." (uses 'broke down') |
| carry out | words-level2.js | Word not used in example: "We carried out our science test step by step." (uses 'carried out') |
| end up | words-level2b.js | Word not used in example: "We got lost and ended up at the wrong park." (uses 'ended up') |
| fall apart | words-level2b.js | Word not used in example: "My old backpack is falling apart because I have used it so much." (uses 'falling apart') |
| look after | words-level2b.js | Word not used in example: "She looks after her baby brother while Mom cooks dinner." (uses 'looks after') |
| look up | words-level2b.js | Word not used in example: "I looked up the word in the dictionary to find its meaning." (uses 'looked up') |
| pick out | words-level2b.js | Word not used in example: "He picked out a red apple from the basket." (uses 'picked out') |
| pull over | words-level2b.js | Word not used in example: "Dad pulled over to look at the map." (uses 'pulled over') |
| sign up | words-level2b.js | Word not used in example: "I signed up for the art class after school." (uses 'signed up') |
| stay up | words-level2b.js | Word not used in example: "She stayed up late to finish reading her exciting book." (uses 'stayed up') |
| use up | words-level2b.js | Word not used in example: "We used up all the paint making our big poster." (uses 'used up') |
| work out | words-level2b.js | Word not used in example: "Everything worked out fine, and we all got home safely." (uses 'worked out') |
| call off | words-level2b.js | Word not used in example: "They called off the picnic because of rain." (uses 'called off') |
| deal with | words-level2b.js | Word not used in example: "She dealt with the broken toy by fixing it herself." (uses 'dealt with') |
| hand out | words-level2b.js | Word not used in example: "The coach handed out jerseys to every player." (uses 'handed out') |
| show up | words-level2b.js | Word not used in example: "He always shows up to class on time." (uses 'shows up') |
| act on | words-level2b.js | Word not used in example: "She acted on the doctor's advice and rested." (uses 'acted on') |
| boil down to | words-level2b.js | Word not used in example: "The argument boils down to who gets the last cookie." (uses 'boils down to') |
| freshen up | words-level2b.js | Word not used in example: "She freshened up before dinner by washing her face." (uses 'freshened up') |
| live up to | words-level2b.js | Word not used in example: "The movie lived up to all the excitement." (uses 'lived up to') |
| rule out | words-level2b.js | Word not used in example: "The detective ruled out three suspects." (uses 'ruled out') |
| back down | words-level2b.js | Word not used in example: "He backed down when he realized he was wrong." (uses 'backed down') |
| bail out | words-level2b.js | Word not used in example: "Her friend bailed her out by lending a pencil." (uses 'bailed out') |
| bang out | words-level2b.js | Word not used in example: "He banged out the report in just one hour." (uses 'banged out') |
| blot out | words-level2b.js | Word not used in example: "Dark clouds blotted out the sun." (uses 'blotted out') |
| cost an arm and a leg | words-level3b.js | Word not used in example: "That new bike costs an arm and a leg!" (uses 'costs') |
| bite off more than you can chew | words-level3b.js | Word not used in example: "Joining three clubs was biting off more than he could chew." (uses 'biting') |
| go the extra mile | words-level3b.js | Word not used in example: "She went the extra mile and decorated the whole room for the party." (uses 'went') |
| throw in the towel | words-level3b.js | Word not used in example: "After trying for an hour, she threw in the towel and asked for help." (uses 'threw') |
| turn out | words-level3b.js | Word not used in example: "The rainy day turned out to be really fun because we played inside." (uses 'turned out') |
| run out of | words-level3b.js | Word not used in example: "The printer ran out of paper right before I needed to print my homework." (uses 'ran out of') |
| carry on | words-level3b.js | Word not used in example: "Even when it got hard, she carried on with the race." (uses 'carried on') |
| kill two birds with one stone | words-level3b.js | Word not used in example: "Walking to school kills two birds with one stone: exercise and saving gas." (uses 'kills') |

## Summary
- Total reviewed: 5205
- CRITICAL: 0
- HIGH: 36
- CLEAN: 5169

Note: Most of the "HIGH" issues identified above are actually just verb conjugations or slight phrasing variations of idiomatic expressions in the example sentences (e.g., using "pointed out" instead of "point out"). While not technically an error for a human, these might trip up simple string-matching logic in a digital flashcard app if it strictly expects the base form of the word to appear in the sentence.
