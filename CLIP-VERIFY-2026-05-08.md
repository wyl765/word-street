# CLIP Verification - Image Keyword Quality Check

**Date:** 2026-05-08  
**Method:** Sampled 50 entries (every 12th) from 600 total in words-level1.js  
**Question:** If a 10-year-old sees the top Google Image result for `imageKeyword`, can they guess the word?

## Results

| # | WORD | imageKeyword | VERDICT | SUGGESTED FIX |
|---|------|-------------|---------|---------------|
| 1 | puppy | puppy | Yes | — |
| 2 | goose | goose | Yes | — |
| 3 | whale | whale | Yes | — |
| 4 | snail | snail | Yes | — |
| 5 | raccoon | raccoon | Yes | — |
| 6 | pancake | pancake | Yes | — |
| 7 | cookie | cookie | Yes | — |
| 8 | honey | honey jar | Yes | — |
| 9 | lemon | lemon | Yes | — |
| 10 | mushroom | mushroom | Yes | — |
| 11 | elbow | elbow | Probably | — |
| 12 | cheek | cheek face | Probably | — |
| 13 | shoulder | shoulder | Probably | `person pointing to shoulder` |
| 14 | vest | vest | Yes | — |
| 15 | buckle | belt buckle | Yes | — |
| 16 | sneaker | sneakers | Yes | — |
| 17 | hem | dress hem | Unlikely | `bottom edge of dress with hand pointing` — "hem" is too abstract for a kid to guess from just seeing a dress bottom |
| 18 | blanket | blanket | Yes | — |
| 19 | bucket | bucket | Yes | — |
| 20 | curtain | curtain | Yes | — |
| 21 | envelope | envelope | Yes | — |
| 22 | chalk | chalk | Yes | — |
| 23 | battery | battery | Yes | — |
| 24 | castle | castle | Yes | — |
| 25 | island | island | Yes | — |
| 26 | cliff | cliff | Yes | — |
| 27 | swamp | swamp | Yes | — |
| 28 | lightning | lightning | Yes | — |
| 29 | puddle | puddle | Yes | — |
| 30 | fog | fog | Yes | — |
| 31 | stem | plant stem | Probably | — |
| 32 | pinecone | pinecone | Yes | — |
| 33 | stomp | stomping foot | Probably | — |
| 34 | catch | catching ball | Yes | — |
| 35 | twist | hands twisting jar lid open | Probably | — |
| 36 | splash | splashing | Yes | — |
| 37 | freeze | freezing ice | Probably | — |
| 38 | sprinkle | sprinkling | Probably | — |
| 39 | howl | wolf howling | Yes | — |
| 40 | nod | nodding yes | Probably | — |
| 41 | wonder | wondering thinking | Unlikely | `child looking up at stars with question mark` — "wonder" is abstract; stock images of "thinking" could mean many words |
| 42 | belong | toy in a box with name tag | Unlikely | `puzzle piece clicking into place` — current image doesn't clearly convey "belong" |
| 43 | trade | kids trading lunch snacks | Yes | — |
| 44 | stack | stacking blocks | Yes | — |
| 45 | drag | child dragging heavy backpack | Probably | — |
| 46 | attach | hands taping paper to wall | Probably | — |
| 47 | measure | ruler measuring paper | Yes | — |
| 48 | deliver | mailman delivering package door | Yes | — |
| 49 | huge | huge elephant next to car | Yes | — |
| 50 | steep | steep hill | Probably | — |

## Summary

- **Yes:** 35/50 (70%) — Image clearly maps to word
- **Probably:** 12/50 (24%) — Image is reasonable, most kids would get it
- **Unlikely:** 3/50 (6%) — Image may not clearly convey the word
- **No:** 0/50 (0%)

## Issues Found

### 1. Abstract/Hard-to-Image Words (Unlikely)

| WORD | imageKeyword | Problem | Suggested Fix |
|------|-------------|---------|---------------|
| hem | dress hem | Kid sees a dress bottom, won't think "hem" | `seamstress sewing dress edge` or just accept—this word may need context clues in-game |
| wonder | wondering thinking | "Thinking" images could match dozens of words (think, imagine, dream, wonder) | `child gazing at starry sky mouth open` |
| belong | toy in a box with name tag | Concept too abstract for a single image | `puzzle piece fitting into puzzle` |

### 2. Potential Confusion Between Similar Words

- **wonder** vs **imagine** vs **pretend**: All have "thinking/dreaming" type images. Current keywords are differentiated (`wondering thinking` / `child with thought bubble dragon` / `child pretending to be superhero cape`) — imagine and pretend are okay, but wonder's is weakest.
- **beside** vs **between** vs **among**: Spatial prepositions. Current keywords (`two friends sitting on bench` / `cat sitting between two boxes` / `toy in box full of toys`) are actually well-differentiated. ✓
- **above** vs **below** vs **beneath**: (`bird flying above house` / `below under` / `beneath under`) — "below" and "beneath" have nearly identical keywords. Suggest changing `below` to `fish swimming below boat` (which is the example sentence).

### 3. Minor Notes

- **damp** (`damp`) — generic keyword, but images of damp surfaces are clear enough
- **gravy** (`gravy`) — fine for American kids, may confuse kids from other cultures
- **meanwhile** (not in sample but noted): `two things happening at same time` — very abstract, would likely produce split-screen stock images. Suggest: `split screen boy at school mom baking at home`

## Overall Assessment

**Level 1 imageKeywords are generally excellent.** The vast majority (94%) produce images a child could use to identify the word. The few problematic ones are abstract concepts (hem, wonder, belong) where any single image would struggle. The game design should account for these with additional context clues or accept slightly lower accuracy on these words.
