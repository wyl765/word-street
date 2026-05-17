# Image Keyword Review Task

You are reviewing imageKeyword values for a children's vocabulary learning app (ages 8-12).

Each word has:
- `word`: the vocabulary word
- `level`: difficulty level (1-5)
- `definition`: what the word means
- `example`: example sentence
- `imageKeyword`: current search keyword used to find an image on Wikimedia Commons

## Your Job

For EACH word, evaluate whether the `imageKeyword` will produce a **clear, child-appropriate, and accurate** image when searched on Wikimedia Commons.

### Rules:
1. The image should clearly illustrate the word's **definition** (not just be tangentially related)
2. Must be concrete and specific enough to return a good photo (not abstract concepts)
3. For abstract words (e.g. "freedom", "justice"), use a concrete visual metaphor that children would understand
4. Avoid keywords that could return inappropriate, scary, or confusing images
5. Avoid keywords that are too generic (e.g. just "person" or "thing")
6. Prefer keywords that would return PHOTOS (not diagrams, logos, or text)
7. Keep keywords SHORT (2-4 words max)

### Output Format:
Return a JSON array. For EACH word, output:
```json
{"word": "example", "imageKeyword": "your recommended keyword", "changed": true/false, "reason": "brief reason if changed"}
```

If the current imageKeyword is already good, set `changed: false` and keep the same imageKeyword.

Only output the JSON array, no other text.
