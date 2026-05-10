# Prototype Effect Report — 2026-05-10

## Summary
- Total issues: 35

## Issues

- **berry** (L1): "berries" — imageKeyword may be too abstract for concrete noun (single word, not the word itself)
- **elbow** (L1): "arm with arrow pointing to elbow joint" — imageKeyword too verbose (7 words)
- **wrist** (L1): "hand and arm with arrow pointing to wrist" — imageKeyword too verbose (8 words)
- **ankle** (L1): "foot and leg with arrow pointing to ankle" — imageKeyword too verbose (8 words)
- **slipper** (L1): "slippers" — imageKeyword may be too abstract for concrete noun (single word, not the word itself)
- **shelf** (L1): "bookshelf" — imageKeyword may be too abstract for concrete noun (single word, not the word itself)
- **belong** (L1): "toy in a box with name tag" — imageKeyword too verbose (7 words)
- **while** (L1): "child reading while waiting at bus stop" — imageKeyword too verbose (7 words)
- **average** (L1): "medium sized cup between big and small" — imageKeyword too verbose (7 words)
- **teach** (L1): "older kid teaching younger kid to ride bike" — imageKeyword too verbose (8 words)
- **insect** (L2): "ant" — imageKeyword may be too abstract for concrete noun (single word, not the word itself)
- **mammal** (L2): "dolphin" — imageKeyword may be too abstract for concrete noun (single word, not the word itself)
- **reptile** (L2): "snake" — imageKeyword may be too abstract for concrete noun (single word, not the word itself)
- **clue** (L2): "footprint" — imageKeyword may be too abstract for concrete noun (single word, not the word itself)
- **downstairs** (L2): "shoes by door at bottom of stairs" — imageKeyword too verbose (7 words)
- **habit** (L2): "toothbrush" — imageKeyword may be too abstract for concrete noun (single word, not the word itself)
- **hint** (L2): "pointing" — imageKeyword may be too abstract for concrete noun (single word, not the word itself)
- **memory** (L2): "snowman" — imageKeyword may be too abstract for concrete noun (single word, not the word itself)
- **object** (L2): "ball" — imageKeyword may be too abstract for concrete noun (single word, not the word itself)
- **prize** (L2): "trophy" — imageKeyword may be too abstract for concrete noun (single word, not the word itself)
- **talent** (L2): "drawing" — imageKeyword may be too abstract for concrete noun (single word, not the word itself)
- **elegant** (L2): "elegant swan" — imageKeyword contains obscure modifier "elegant"
- **miniature** (L2): "miniature tiny" — imageKeyword contains obscure modifier "miniature"
- **amphibian** (L2): "frog" — imageKeyword may be too abstract for concrete noun (single word, not the word itself)
- **germ** (L2): "germs" — imageKeyword may be too abstract for concrete noun (single word, not the word itself)
- **virus** (L2): "sick" — imageKeyword may be too abstract for concrete noun (single word, not the word itself)
- **disease** (L2): "sickness" — imageKeyword may be too abstract for concrete noun (single word, not the word itself)
- **symptom** (L2): "cough" — imageKeyword may be too abstract for concrete noun (single word, not the word itself)
- **especially** (L2): "child pointing excitedly at one specific ice cream flavor" — imageKeyword too verbose (9 words)
- **baroque** (L3): "baroque palace" — imageKeyword contains obscure modifier "baroque"
- **brooch** (L3): "decorative pin" — imageKeyword contains obscure modifier "decorative"
- **invertebrate** (L3): "jellyfish" — imageKeyword may be too abstract for concrete noun (single word, not the word itself)
- **civilization** (L3): "pyramids" — imageKeyword may be too abstract for concrete noun (single word, not the word itself)
- **polygon** (L3): "hexagon" — imageKeyword may be too abstract for concrete noun (single word, not the word itself)
- **intricate** (L4): "intricate pattern" — imageKeyword contains obscure modifier "intricate"

## What This Checks
1. Concrete nouns with too-abstract imageKeyword (single word, not descriptive enough)
2. L3+ words using bare word as imageKeyword (could benefit from scene context)
3. Obscure modifiers in imageKeyword that image generators may misinterpret
4. Overly verbose imageKeywords (>6 words)
