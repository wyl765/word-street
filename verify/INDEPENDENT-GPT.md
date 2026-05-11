# Independent GPT Audit

Scope: 16× `words-level*.js` (5205 entries). Checked for factual errors, broken grammar, example/definition mismatch, circular or misleading definitions, and obvious machine-generated filler.

## CRITICAL (factually wrong, must fix)
| word | file | what's wrong |
|---|---|---|
| _none found_ |  | No clear factually-wrong definitions/examples surfaced in this pass. |

## HIGH (misleading or grammar broken)
| word | file | what's wrong |
|---|---|---|
| take away | words-level2b.js | **Circular / non-definition.** Definition is literally “to take away something from a place” — it explains nothing and teaches no usable meaning. |
| lemon | words-level1.js | **Cross-definition cycle with “sour”.** “lemon” is defined using “sour”, and “sour” is defined using “lemon” → a child can’t learn either word reliably from the set. |
| sour | words-level1.js | **Cross-definition cycle with “lemon”.** Defined as “a sharp taste like lemon” while “lemon” is defined as “a … fruit with a very sour taste”. |
| narrow | words-level1.js | **Cross-definition cycle with “thin”.** “narrow” defined using “thin”, while “thin” defined using “narrow” → circular and confusing. |
| thin | words-level1.js | **Cross-definition cycle with “narrow”.** “thin” defined using “narrow”, while “narrow” defined using “thin”. |
| area | words-level2.js | **Cross-definition cycle with “region”.** “area” is defined as “a region or place…”, while “region” is defined as “a large area of land”. |
| region | words-level2a.js | **Cross-definition cycle with “area”.** Defined as “a large area of land” while “area” is defined as “a region or place”. |
| despite | words-level2b.js | **Cross-definition cycle with “even though”.** “despite” defined as “even though…”, while “even though” defined using “despite”. |
| even though | words-level2b.js | **Cross-definition cycle with “despite”.** “even though” defined as “although; despite the fact that” while “despite” defined as “even though; in spite of”. |
| bunny | words-level1.js | **Misleading definition.** “a rabbit, especially one that is cute or friendly” smuggles in subjective traits (“cute”, “friendly”) that are not part of the meaning; “bunny” is just an informal word for a rabbit (often small/young), not “a friendly rabbit”. |
| jade | words-level2.js | **Vague / subjective definition.** “used to make pretty things” is subjective and unhelpful. Should define jade as a type of hard green stone/gem used for jewelry/carvings. |
| pendant | words-level2.js | **Vague / subjective definition.** “a pretty thing that hangs from a chain” is sloppy; a pendant is a piece of jewelry/ornament that hangs from a chain/necklace (not necessarily “pretty”). |
| expose | words-level2c.js | **Awkward / misleading phrasing.** “to uncover something hidden or show something to the open air” is clunky and teaches a weird literal sense (“show to the open air”). Better: “to uncover / make visible; to leave unprotected.” |
| symmetry | words-level3b.js | **Broken definition form.** “when two sides…” is an event description, not a definition. Better noun-form: “the quality of having two matching sides” (or “both sides look the same”). |
| deterrent | words-level5d.js | **Vague / circular structure.** “something that discourages people from doing something wrong” repeats “something” and bakes in a moral judgment (“wrong”) that isn’t part of the core meaning. Better: “something that discourages an action.” |

## Summary
- Total reviewed: 5205
- CRITICAL: 0
- HIGH: 15
- CLEAN: 5190
