# GATE 9 — Open Cloze Test (Batch 2)

Files: words-level2c.js, words-level2d.js, words-level3a.js, words-level3b.js, words-level3c.js
Total words tested: 1218

## Mismatches

| # | Target Word | My Guess | Blanked Sentence | Issue |
|---|-------------|----------|------------------|-------|
| 1 | **alarm** | bell / siren | "The fire ______ rang, and everyone walked outside calmly." | "fire bell" or "fire siren" also work |
| 2 | **appeal** | spoke | "The teacher ______ to everyone to be kind to the new student." | Could be "spoke" or "talked" |
| 3 | **ban** | banned | "The park ______ skateboarding near the playground." | Guessed "banned" (past tense); blanking regex got it but "banned" is the natural inflection — actually this works since "ban" can be present tense. OK on reflection. |
| 4 | **caution** | care | "Use ______ when you pour hot soup into the bowl." | "care" fits equally well |
| 5 | **circumstance** | circumstances | "Under the ______ of heavy rain, the teacher called off the field trip." | Would naturally say "circumstances" (plural) |
| 6 | **core** | center | "The ______ of the apple has seeds inside." | "center" fits perfectly |
| 7 | **credit** | praise | "The teacher gave him ______ for helping clean the classroom." | "praise" fits equally |
| 8 | **critical** | essential / important | "Drinking water is ______ for staying healthy." | Multiple adjectives work |
| 9 | **definite** | clear | "We have a ______ plan to leave at eight in the morning." | "clear" or "solid" also work |
| 10 | **deposit** | put / placed | "She ______ her coins in the piggy bank every week." | "put" or "placed" fit naturally |
| 11 | **desire** | wish / dream | "His greatest ______ was to see the ocean for the first time." | "wish" or "dream" work |
| 12 | **dimension** | dimensions | "The ______ of the box are ten inches long and five inches wide." | Plural "dimensions" expected with "are" |
| 13 | **display** | displayed | "The museum ______ dinosaur bones in a big glass case." | Past tense "displayed" — but wait, the regex should have caught this. Checking: target is "display", sentence uses "displayed". The regex pattern includes "displayed". So it should be blanked. This is fine. |
| 14 | **dispute** | argument / disagreement | "The neighbors had a ______ about where the fence should go." | "argument" or "disagreement" fit |
| 15 | **doubt** | doubt | ✓ OK — "doubt" is the clear answer |
| 16 | **elaborate** | ornate / fancy | "The ______ cake had five layers and was covered in flowers." | "fancy" or "ornate" fit |
| 17 | **error** | mistake | "He found an ______ in his math and fixed it before turning it in." | "mistake" is more natural |
| 18 | **evident** | obvious / clear | "It was ______ from his smile that he was happy about the surprise." | "obvious" or "clear" work |
| 19 | **excess** | extra / leftover | "We had ______ paint left over after finishing the mural." | "extra" fits |
| 20 | **expense** | cost | "The biggest ______ for the party was the food." | "cost" works equally |
| 21 | **expose** | revealed / uncovered | "The wind blew away the sand and ______ a buried shell." | "revealed" or "uncovered" fit |
| 22 | **factor** | factor | ✓ OK |
| 23 | **fatal** | dangerous | "A snakebite can be ______ if you do not get help quickly." | "dangerous" or "deadly" — "deadly" is closest synonym but "fatal" is clear enough |
| 24 | **fault** | fault | ✓ OK |
| 25 | **ferry** | ferry / boat | "We took the ______ across the river to get to the island." | "boat" also works |
| 26 | **fortune** | treasure | "Finding that rare coin was like finding a ______." | "treasure" fits |
| 27 | **frontier** | frontier | ✓ OK — classic phrase "final frontier" |
| 28 | **fund** | funds / money | "The class raised ______ by selling lemonade for the field trip." | "money" fits equally |
| 29 | **grace** | grace / elegance | "The dancer moved with ______ across the stage." | "elegance" or "poise" fit |
| 30 | **image** | picture | "The ______ on the screen showed a map of the whole country." | "picture" fits |
| 31 | **instance** | instance / example | "This is one ______ where being patient really helped." | "example" or "case" fit |
| 32 | **item** | item | ✓ OK |
| 33 | **lack** | lacked | "The plants ______ water and turned brown in the hot summer." | Past tense — regex should catch "lacked". Fine. |
| 34 | **lecture** | talk / presentation | "The scientist gave a ______ about how volcanoes work." | "talk" or "presentation" fit |
| 35 | **link** | connection | "There is a ______ between eating healthy food and feeling strong." | "connection" fits |
| 36 | **luxury** | luxury | ✓ OK — "luxury, not a necessity" is the phrase |
| 37 | **manage** | manages | "She ______ the school garden by watering and weeding each week." | Present tense with "she" → "manages" expected, but regex blanks it. Fine. |
| 38 | **mature** | ripe | "The ______ apple fell off the tree and was ready to eat." | "ripe" is more natural for apples |
| 39 | **mental** | mental | ✓ OK — "mental exercise" is the phrase |
| 40 | **novel** | novel / new / creative | "His ______ idea for the science fair surprised all." | "new" or "creative" fit |
| 41 | **option** | options | "For lunch, your ______ are pizza, soup, or a sandwich." | Plural matches "are" |
| 42 | **owe** | owe | ✓ OK |
| 43 | **passive** | calm / still | "The cat was ______ and just watched the mouse run by." | "calm" or "still" fit |
| 44 | **peer** | peers / classmates | "He shared his story with his ______ in a reading circle." | "classmates" or "friends" fit |
| 45 | **plea** | cry | "The lost kitten made a ______ for help with its loud meowing." | "cry" fits |
| 46 | **provision** | provisions / supplies | "They packed ______ for the hike including food and water." | "supplies" fits |
| 47 | **realm** | world / field | "In the ______ of science, she was the top student." | "world" or "field" fit |
| 48 | **reference** | reference | ✓ OK |
| 49 | **revenue** | money / funds | "The bake sale brought in enough ______ to buy new books." | "money" fits better for kids |
| 50 | **routine** | routine | ✓ OK |
| 51 | **scope** | scope | ✓ OK |
| 52 | **series** | series / collection | "She read the whole ______ of books about the magical school." | "collection" or "set" fit |
| 53 | **slight** | gentle / light | "There was a ______ breeze that barely moved the leaves." | "gentle" or "light" fit |
| 54 | **sole** | only | "She was the ______ person who finished the puzzle." | "only" is more natural |
| 55 | **standard** | requirement / bar | "The ______ for passing the test is seventy percent correct." | "requirement" fits |
| 56 | **status** | status | ✓ OK |
| 57 | **stock** | supply / stock | "The store keeps a large ______ of pencils for back-to-school season." | "supply" fits equally |
| 58 | **strategy** | plan | "Coach drew up a ______ on the whiteboard to beat their zone defense." | "plan" works, though "strategy" is strongly cued by context |
| 59 | **adequate** — N/A | | | |
| 60 | **counsel** | advice | "The school counselor offered ______ on dealing with bullies." | "advice" fits equally |
| 61 | **asset** | asset | ✓ OK |
| 62 | **compound** | compound | ✓ OK |
| 63 | **conifer** | conifers | "Pine, spruce, and fir are all ______ that stay green even in winter." | "conifers" (plural) or "evergreens" fit |
| 64 | **errand** | errand | ✓ OK |
| 65 | **errant** | stray | "An ______ baseball flew over the fence and landed in the neighbor's yard." | "stray" fits |
| 66 | **forte** | strength / forte | "Singing is her ______—she wins every talent show at school." | "strength" fits |
| 67 | **flank** | side | "A deer stood on the ______ of the mountain, looking down at the valley." | "side" fits |
| 68 | **ardor** | passion / enthusiasm | "She practiced piano with such ______ that she learned three songs in one week." | "passion" or "enthusiasm" fit |
| 69 | **aright** | correctly | "Let me read the instructions again to make sure I understand them ______." | "correctly" is much more natural |
| 70 | **mass** | weight | "A rock has more ______ than a feather." | "weight" is the common guess |
| 71 | **unit** | units | "Inches and centimeters are both ______ of length." | "units" (plural) or "measures" fit |
| 72 | **multiple** | multiples | "The numbers 10, 15, and 20 are all ______ of 5." | "multiples" (plural) fits |
| 73 | **inverse** | opposite | "Subtraction is the ______ of addition." | "opposite" fits |
| 74 | **expression** | expression / equation | "The ______ 5 + 2 tells us to add five and two." | "equation" could work |
| 75 | **operation** | method | "Addition is the ______ we use to find a total." | "method" or "tool" fit |
| 76 | **impervious** | resistant | "The waterproof jacket was ______ to rain-not a single drop got through." | "resistant" fits |
| 77 | **homage** | tribute | "The statue was built as ______ to the brave soldiers who served the country." | "tribute" is more natural |
| 78 | **livelihood** | income | "Fishing was the main ______ for people in the small coastal village." | "income" or "occupation" fit |
| 79 | **lore** | stories / tales | "The village elder shared the ______ of their people around the evening campfire." | "stories" or "tales" fit |

## Clean Mismatches (filtered — strong alternative clearly beats target)

| # | Target | Likely Guess | Sentence | Why |
|---|--------|-------------|----------|-----|
| 1 | **core** | center | "The ______ of the apple has seeds inside." | "center" is more natural for apple anatomy |
| 2 | **error** | mistake | "He found an ______ in his math and fixed it before turning it in." | "mistake" is the default kid word |
| 3 | **mature** | ripe | "The ______ apple fell off the tree and was ready to eat." | "ripe" is the standard word for apples |
| 4 | **novel** | new | "His ______ idea for the science fair surprised all." | "new" is simplest fit |
| 5 | **sole** | only | "She was the ______ person who finished the puzzle." | "only" is far more common |
| 6 | **passive** | calm | "The cat was ______ and just watched the mouse run by." | "calm" or "lazy" fit |
| 7 | **aright** | correctly | "Let me read the instructions again to make sure I understand them ______." | "correctly" is the modern word |
| 8 | **inverse** | opposite | "Subtraction is the ______ of addition." | "opposite" is simpler |
| 9 | **mass** | weight | "A rock has more ______ than a feather." | "weight" is the common guess |
| 10 | **homage** | tribute | "The statue was built as ______ to the brave soldiers who served the country." | "tribute" is more natural |
| 11 | **flank** | side | "A deer stood on the ______ of the mountain, looking down at the valley." | "side" is the common word |
| 12 | **errant** | stray | "An ______ baseball flew over the fence and landed in the neighbor's yard." | "stray" fits perfectly |
| 13 | **deposit** | put | "She ______ her coins in the piggy bank every week." | "put" is more natural |
| 14 | **fund** | money | "The class raised ______ by selling lemonade for the field trip." | "money" is simpler |
| 15 | **revenue** | money | "The bake sale brought in enough ______ to buy new books." | "money" is simpler |
| 16 | **forte** | strength | "Singing is her ______—she wins every talent show at school." | "strength" fits |
| 17 | **plea** | cry | "The lost kitten made a ______ for help with its loud meowing." | "cry" fits with "loud meowing" |
| 18 | **ardor** | passion | "She practiced piano with such ______ that she learned three songs in one week." | "passion" or "enthusiasm" |
| 19 | **dimension** | dimensions | "The ______ of the box are ten inches long and five inches wide." | Subject-verb mismatch: "dimension...are" needs plural |
| 20 | **circumstance** | circumstances | "Under the ______ of heavy rain..." | Plural more natural |
| 21 | **slight** | gentle | "There was a ______ breeze that barely moved the leaves." | "gentle" fits equally |
| 22 | **image** | picture | "The ______ on the screen showed a map of the whole country." | "picture" is simpler |
| 23 | **counsel** | advice | "The school counselor offered ______ on dealing with bullies." | "advice" is more common |
| 24 | **provision** | supplies | "They packed ______ for the hike including food and water." | "supplies" is more common |
| 25 | **realm** | world | "In the ______ of science, she was the top student." | "world" or "field" fit |
| 26 | **elaborate** | fancy | "The ______ cake had five layers and was covered in flowers." | "fancy" is simpler |
| 27 | **evident** | obvious | "It was ______ from his smile that he was happy about the surprise." | "obvious" or "clear" fit |
| 28 | **caution** | care | "Use ______ when you pour hot soup into the bowl." | "care" fits |
| 29 | **appeal** | spoke | "The teacher ______ to everyone to be kind to the new student." | "spoke" fits |
| 30 | **expose** | revealed | "The wind blew away the sand and ______ a buried shell." | "revealed" is natural |
| 31 | **lore** | stories | "The village elder shared the ______ of their people around the evening campfire." | "stories" is simpler |
| 32 | **livelihood** | income | "Fishing was the main ______ for people in the small coastal village." | "income" or "occupation" |

---

**Summary**: 32 mismatches out of 1218 words (2.6% mismatch rate). Most are cases where a simpler synonym fits equally well. The sentences are generally well-crafted — the vast majority uniquely point to the target word.

**Grammar issue**: "dimension" sentence uses "are" (plural verb) with singular blank — should be "dimensions".
