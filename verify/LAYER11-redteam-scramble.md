# Layer 11: Red Team Scramble Test

## Methodology

### Test Design
For each of 200 sampled words (across all 16 level files, ~13 per file):
1. **Scramble**: Randomly assign each definition to a WRONG word in a pool of 10 same-level words
2. **Student test**: Given ONLY the example sentence and imageKeyword (NOT the definition), try to figure out which word the entry actually belongs to
3. **Matching strategies**: exact word match in example/imageKeyword, stem/conjugation match (e.g., "staring" → "stare"), partial word match for phrasal verbs

### Full Corpus Verification
Additionally verified all 5,205 words across the complete dataset for systematic weaknesses.

## Summary
- Words tested: 200 (sample) + 5,205 (full verification)
- Successfully re-matched: 200/200 (100%)
- Failed to re-match: 0 (zero entries where example+imageKeyword are insufficient)

### Why 100% Match Rate?
**Every single example sentence contains the target word (or a direct conjugation/stem).** This means the example alone is always sufficient to identify the word — the scramble test cannot defeat the dataset.

This is actually **by design** for a vocabulary app — examples should use the word. But it means the definition, example, and imageKeyword form a highly redundant triple where any single element can identify the entry.

## Deeper Analysis: imageKeyword Independence

While examples always contain the word, many imageKeywords do NOT contain the word or any stem. This means if a student relied ONLY on the image (not the example sentence), matching would be harder.

### imageKeyword Statistics
- **Words where imageKeyword contains the word/stem**: 1,891 / 5,205 (36.3%)
- **Words where imageKeyword does NOT contain the word**: 3,314 / 5,205 (63.7%)

### imageKeyword Independence by File
| File | Words with word absent from imageKeyword | Total | % Absent |
|------|----------------------------------------|-------|----------|
| level1 | 97 | 600 | 16.2% |
| level2 | 254 | 552 | 46.0% |
| level2a | 76 | 400 | 19.0% |
| level2b | 172 | 382 | 45.0% |
| level2c | 179 | 219 | 81.7% |
| level2d | 215 | 258 | 83.3% |
| level3a | 142 | 231 | 61.5% |
| level3b | 227 | 315 | 72.1% |
| level3c | 116 | 195 | 59.5% |
| level4a | 241 | 301 | 80.1% |
| level4b | 231 | 310 | 74.5% |
| level4c | 279 | 343 | 81.3% |
| level5a | 220 | 232 | 94.8% |
| level5b | 251 | 251 | 100.0% |
| level5c | 326 | 328 | 99.4% |
| level5d | 288 | 288 | 100.0% |

**Pattern**: Higher-level words have increasingly abstract/descriptive imageKeywords that don't contain the word itself (e.g., "mercenary" → "hired soldier", "amenity" → "hotel pool"). This is expected — advanced words are harder to depict literally.

## Failures
| word | file | imageKeyword | why_cant_rematch |
|------|------|-------------|-----------------|
| *(none)* | — | — | All 200 sampled words can be re-matched via example sentence |

## Edge Cases Worth Noting

These 9 words (from full corpus scan) have the word absent from example when matched literally, but stems still work:

| word | file | issue | resolution |
|------|------|-------|-----------|
| stare | level1 | Example uses "staring" | Stem match works |
| certify | level2d | Example uses "certified" | Stem match works |
| carry on | level3b | Example uses "carried on" | Stem match works |
| embody | level5a | Example uses "embodies" | Stem match works |
| amenity | level5a | Example uses "amenities" | Stem match works |
| decry | level5a | Example uses "decried" | Stem match works |
| discriminate | level5b | Example uses "discriminating" | Stem match works |
| mercenary | level5d | Example uses "mercenaries" | Stem match works |
| gratify | level5d | Example uses "gratified" | Stem match works |

## Conclusion

**The dataset has excellent redundancy.** 100% of entries can be re-matched to their correct word using only the example sentence (without the definition or imageKeyword). The example sentences consistently embed the target word or a transparent conjugation.

**imageKeywords provide supplementary but not independent identification** — at higher levels, they describe the concept rather than naming the word, which is appropriate for image search purposes but means they couldn't substitute for the example sentence in a scramble test.

**No entries have weak redundancy.** The adversarial scramble test cannot defeat the current dataset.
