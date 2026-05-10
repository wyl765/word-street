# Proofcheck Report — 2026-05-10

**Engine:** proofcheck.mjs v1.0
**Entries:** 1040
**Results:** 0 CRITICAL | 0 MAJOR | 10 MINOR

## Issues

### [MINOR] words-level2b.js — "as a result" (CROSS_DEF_CYCLE)
Cross-definition cycle: "as a result" def contains "because of" and "because of" def contains "as a result" (both L2)
**Fix:** Break the cycle: at least one definition should not reference the other word

### [MINOR] words-level2b.js — "despite" (CROSS_DEF_CYCLE)
Cross-definition cycle: "despite" def contains "even though" and "even though" def contains "despite" (both L2)
**Fix:** Break the cycle: at least one definition should not reference the other word

### [MINOR] words-level2b.js — "go through" (VAGUE_DEFINITION)
Definition uses "something" 2 times: "to experience something, especially something difficult"
**Fix:** Rephrase to be more specific

### [MINOR] words-level2b.js — "on the contrary" (ADJ_NOUN_MISMATCH)
Word appears to be adjective but definition starts with article: "the opposite is true..."
**Fix:** Consider rephrasing definition to adjective form

### [MINOR] words-level2b.js — "graphic" (ADJ_NOUN_MISMATCH)
Word appears to be adjective but definition starts with article: "a picture or chart that explains facts..."
**Fix:** Consider rephrasing definition to adjective form

### [MINOR] words-level2b.js — "equality" (WHEN_DEFINITION)
Definition starts with "when": "when everyone is treated the same and fairly..."
**Fix:** Use "to + verb" for verbs or "a/an + noun" for nouns instead of event description

### [MINOR] words-level2b.js — "protest" (WHEN_DEFINITION)
Definition starts with "when": "when people show they disagree with something..."
**Fix:** Use "to + verb" for verbs or "a/an + noun" for nouns instead of event description

### [MINOR] words-level2b.js — "compared to" (WHEN_DEFINITION)
Definition starts with "when": "when looking at two things side by side..."
**Fix:** Use "to + verb" for verbs or "a/an + noun" for nouns instead of event description

### [MINOR] words-level2b.js — "evaporate" (WHEN_DEFINITION)
Definition starts with "when": "when liquid turns into a gas..."
**Fix:** Use "to + verb" for verbs or "a/an + noun" for nouns instead of event description

### [MINOR] words-level2b.js — "greenhouse effect" (WHEN_DEFINITION)
Definition starts with "when": "when gases trap heat around the Earth..."
**Fix:** Use "to + verb" for verbs or "a/an + noun" for nouns instead of event description

