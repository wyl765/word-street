# Independent Claude Audit

## CRITICAL (factually wrong or severely garbled text — must fix)

| word | file | what's wrong |
|------|------|-------------|
| trait | words-level2b.js | Definition garbled: "a thing about **you you** get from your parents" — "you" duplicated |
| fruition | words-level4a.js | Definition garbled: "the point at which a **plan or plan or task** becomes real" — phrase doubled |
| frequency | words-level4a.js | Definition garbled: "how often something happens in a given **time time**" — "time" duplicated |
| fatigue | words-level4a.js | Definition garbled: "very strong tiredness after **body or brain or thinking** effort" — broken enumeration (AI placeholder leak) |
| gadget | words-level3b.js | Definition garbled: "a small, clever **tool or tool or** machine" — "tool" duplicated |
| tenet | words-level4b.js | Definition garbled: "a **belief or rule or belief** that is an important part…" — "belief" duplicated |
| labor | words-level4b.js | Definition garbled: "hard **body or brain or thinking** work" — broken enumeration (AI placeholder leak) |
| terrain | words-level4b.js | Definition garbled: "the **body features** of a stretch of land" — should be "physical features" |
| pulchritude | words-level4b.js | Definition garbled: "**great body beauty**" — should be "great physical beauty" |
| anachronism | words-level4b.js | Definition garbled: "something that belongs to a different **time time**" — "time" duplicated |
| undertake | words-level4c.js | Definition garbled: "to **promise to doing** a task or **plan or task**" — grammar broken AND phrase doubled |
| withstand | words-level4c.js | Definition garbled: "to be strong enough to **stay alive something** without being damaged" — incoherent |
| abstract | words-level4c.js | Definition garbled: "existing as an idea rather than **something body** that you can touch" — stray word "body" |
| arbitrary | words-level4c.js | Definition garbled: "based on **without any plan choice** rather than any reason or system" — incoherent |
| assault | words-level4c.js | Definition garbled: "a **violent body attack** on someone" — stray word "body" |
| epidemic | words-level4c.js | Definition garbled: "**a found in many places** outbreak of a disease…" — garbled phrase inserted |
| geologist | words-level4c.js | Definition garbled: "a scientist who studies rocks, minerals, and **Earth's frame or shape that holds things up**" — wrong filler phrase appended |
| framework | words-level2a.js | Definition garbled: "a basic **frame or shape that holds things up** that supports or organizes something" — filler phrase leaked in |
| fortification | words-level4a.js | Definition garbled: "a strong wall **or frame or shape that holds things up** built for keeping safe…" — same filler phrase leaked in |
| partisan | words-level4c.js | Definition garbled: "strongly supporting one side in a fight **or problem or political party**" — unclear/incoherent enumeration |
| momentum | words-level4b.js | **Factually wrong**: "the power a moving object has because of its **weight** and speed" — momentum is mass × velocity; "power" is wrong (power is energy/time); "weight" should be "mass." Teaches children an incorrect physics definition. |
| litany | words-level3c.js | Definition garbled: "a long, repetitive **list or row or chain** of things" — "row or chain" are AI filler synonyms, not correct; litany is specifically a long list of complaints or items, not rows or chains |
| reticence | words-level4b.js | Definition garbled: "being not eager to speak **or tell or show** feelings" — clunky/garbled synonyms |

## HIGH (misleading, non-standard phrasing, or grammar issues)

| word | file | what's wrong |
|------|------|-------------|
| frequently | words-level2.js | Definition "many times" is incomplete — "frequently" means "often; regularly," not merely "many times." A child could think "I sneezed many times" = "I sneezed frequently" without grasping the regularity aspect. |
| correspond | words-level2a.js | Definition "to match or **be alike to**" — "alike to" is non-standard English; should be "similar to" or just "match" |
| akin | words-level3a.js | Definition "**alike to** something else" — "alike to" is non-standard; standard is "similar to" |
| cornet | words-level3a.js | Definition "a small shiny metal instrument **alike to** a trumpet" — "alike to" non-standard; should be "similar to" |
| digestive | words-level3c.js | Definition "breaks down food into **power** it can use" — should be "energy," not "power" (misleading for science) |
| metabolism | words-level4b.js | Definition "converts food into **power**" — should be "energy"; "power" is a different physics concept, confusing for children |
| devolution | words-level4a.js | Definition "the **move** of power from a central to a local government" — should be "transfer" not "move"; grammatically awkward |
| chicanery | words-level4b.js | Definition redundant: "the use of dishonest **tricks** to **trick** people" — "trick/tricks" used twice; should be "the use of deceit or clever tricks to mislead people" |
| convey | words-level2d.js | Definition "to share **or tell or** express a message" — clunky triple synonyms; "tell" and "share" overlap confusingly |
| prevalent | words-level4b.js | Definition "common and **found in many places** in a certain place or time" — garbled partial duplicate ("found in many places in a certain place") contradicts itself |
| clarification | words-level5c.js | Example "I asked for clarification." — 4 words, no context, teaches nothing; extremely weak |
| arithmetic | words-level5c.js | Example "She practiced arithmetic problems." — 4 words, no context; extremely weak |
| accreditation | words-level5c.js | Example "The program earned accreditation." — 4 words, no context; extremely weak |
| defamation | words-level5c.js | Example "He sued for defamation." — 4 words, no context; extremely weak |

## Summary

- Total reviewed: 5205
- **CRITICAL: 23** (garbled machine text leaked into definitions, or factually wrong definition)
- **HIGH: 14** (misleading, non-standard phrasing, inaccurate word choice, or near-empty examples)
- **CLEAN: 5168** (no significant issues found)

---

### Notes on audit methodology

- All 16 files scanned programmatically for duplicate words within definitions, garbled phrase patterns, and specific red-flag strings.
- All 5205 words checked to verify the target word (or an inflected form) appears in its example sentence.
- Factual accuracy spot-checked for science, math, and social-studies terms.
- "CRITICAL" = definition is broken/incomprehensible or factually incorrect; a child using this definition would learn the wrong thing.
- "HIGH" = definition or example is misleading, uses non-standard English, or example is too thin to be useful.
- Many `words-level5c.js` entries have placeholder-quality examples (4–6 words with no context); the 4 worst are listed. Others in the same file are borderline.
