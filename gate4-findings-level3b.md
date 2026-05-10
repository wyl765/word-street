# Gate 4 Red Team Report: words-level3b.js (315 words)

## 🔴 RED — Attack Successful (Fixed)

1. 🔴 **constellation** — imageKeyword was "big dipper stars" but the word/example references Orion. Chinese kids know 北斗七星 (Big Dipper), showing that image would confuse the word-image link. → Fixed: "orion constellation"

2. 🔴 **governor** — definition "the leader of a state" is ambiguous for Chinese kids. In Chinese, "state" (州) vs "国家" (country) is confusing. 10岁中国孩子会理解为"国家领导人" → Fixed: "the person in charge of a state or province in a country"

3. 🔴 **expel** — imageKeyword "pushing someone out door" is misleading. The example uses a whale, but the image suggests punishment/school expulsion. A Chinese kid sees 被开除 (school expulsion). → Fixed: "whale spout blowhole"

4. 🔴 **spill the beans** — definition "to let a secret slip out" implies accidental revealing. But "spill the beans" can be deliberate too. Combined with "let the cat out of the bag" (accidentally reveal), kids confuse the two. → Fixed: "to tell a secret that you were supposed to keep"

5. 🔴 **fortress** — definition nearly identical to "fort" ("a strong building made to defend against attacks" vs "a large, strong building or place built for defense"). In a quiz, impossible to distinguish. → Fixed: "a very large, heavily defended place with thick walls and towers"

6. 🔴 **gambol** — definition "to run and jump around playfully" near-identical to **frolic** "to play and run around happily". Quiz killer. → Fixed: "to jump and skip around in a happy, playful way" (emphasizes jumping/skipping vs frolic's general play)

## 🟡 YELLOW — Weaknesses Found (Not Fatal)

7. 🟡 **dreary** vs **drab** — both mean "dull" but dreary = emotional/weather, drab = visual. Definitions differentiate adequately ("dark, making you feel sad" vs "not interesting to look at"). OK.
8. 🟡 **glimmer** vs **gleam** vs **glint** vs **flicker** — four light words. Definitions differentiate: glimmer=faint, gleam=steady, glint=tiny flash, flicker=unsteady. Close but testable.
9. 🟡 **donjon** vs **dungeon** — Chinese kids may confuse. But definitions differ: donjon=strongest tower, dungeon=underground prison. Examples help.
10. 🟡 **dosage** — "one spoonful twice a day" — Chinese medicine culture uses 剂量, concept is familiar. OK.
11. 🟡 **peninsula** — "Florida" example — Chinese kids may not know Florida. But definition is clear enough on its own.
12. 🟡 **capital** — good call using "Beijing" — culturally appropriate for Chinese ESL kids.
13. 🟡 **fiesta** — Spanish cultural word. Chinese kids won't have direct experience but definition is clear.
14. 🟡 **furlong** — obsolete unit. But definition self-explanatory.
15. 🟡 **barter** — concept exists in Chinese culture (以物易物). OK.
16. 🟡 **genteel** — level 3 word but concept may be abstract for 10yo. Definition is accessible.
17. 🟡 **hackneyed** — advanced for level 3. But definition "used so often that it is no longer fresh or original" is clear.
18. 🟡 **effigy** — might be culturally sensitive (burning effigies). But example uses museum context. OK.
19. 🟡 **chrysalis** vs **larva** — both are insect stages. Definitions clearly differentiate.
20. 🟡 **errant** — could confuse with "errand" (one letter difference). But definitions are completely different.

## 🟢 GREEN — Attack Failed

All remaining ~290 words passed red team validation. Key categories:

**Science words (organism through conservation):** Clear, accurate, well-differentiated. Chinese science curriculum overlaps well.

**Math words (numerator through probability):** Precise, testable definitions. Math is universal — no cultural issues.

**Idioms (break the ice through pull someone's leg):** Well-explained for ESL kids. imageKeywords avoid literal interpretation traps.

**Transition words (on the other hand through to put it simply):** Functional, clear. These are used similarly in Chinese academic writing.

**D-H vocabulary words:** Well-crafted definitions with good examples. No critical overlaps after fixes.

## Summary
- Total words: 315
- 🔴 Found & Fixed: 6
- 🟡 Weak but acceptable: 14
- 🟢 Clean: 295
- MISMATCH rate after fixes: 0%
- **VERDICT: PASS**
