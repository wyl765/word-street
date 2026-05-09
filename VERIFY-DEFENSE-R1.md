# Dictionary Defense Report (Round 1)

## Findings

**1. Word:** `whale` (Level 1)
- **Field:** definition
- **Issue:** The definition states "a very large sea animal that breathes air". This is factually inaccurate as it fails to classify the whale as a mammal, creating a significant pedagogical risk for 10-year-old ESL students who might classify it as a fish.
- **Test Case:** Give the student the definition and ask: "Is a whale a mammal or a fish?" If the student says "fish" or is unsure because the definition only says "sea animal," the definition has failed to provide a crucial distinguishing characteristic.
- **Severity:** HIGH
- **External Evidence:** Merriam-Webster defines whale as "any of an order (Cetacea) of aquatic mostly marine **mammals**..." (emphasis added). Oxford Dictionary also explicitly uses the word "mammal" in its definition.

**2. Word:** `dolphin` (Level 1)
- **Field:** definition
- **Issue:** The definition states "a smart sea animal that swims and breathes air". Similar to `whale`, this omits the essential classification of a dolphin as a mammal. Furthermore, "smart" is subjective and not a definitive classifying characteristic.
- **Test Case:** Ask the student: "Based on this definition, is a dolphin a mammal, a fish, or something else?" If the student doesn't know it's a mammal, the definition is flawed.
- **Severity:** HIGH
- **External Evidence:** Merriam-Webster defines dolphin as "any of various small toothed **whales** (family Delphinidae)..." which are mammals.

**3. Word:** `snail` (Level 1)
- **Field:** definition
- **Issue:** The definition states "a tiny animal with a shell that moves slowly". The word "tiny" is misleading. While some snails are tiny, many common land snails and sea snails are not "tiny" (e.g., Giant African Land Snail). "Small" would be more accurate than "tiny," but even that is relative.
- **Test Case:** Show the student a picture of a regular garden snail (about 1-2 inches) or a larger snail and ask: "Is this animal 'tiny' like an ant or a grain of sand?" If the student says no, the definition is inaccurate.
- **Severity:** MEDIUM
- **External Evidence:** Merriam-Webster defines snail as "a gastropod mollusk especially when having an external enclosing spiral shell". No size constraint like "tiny" is included.

**4. Word:** `worm` (Level 1)
- **Field:** definition
- **Issue:** The definition states "a tiny soft animal with no legs that lives in dirt". The word "tiny" is again incorrect. Earthworms are frequently several inches long, and some worms are massive (e.g., Giant Gippsland earthworm). Furthermore, many worms do not live in dirt (e.g., tapeworms, marine worms).
- **Test Case:** Show a 6-inch earthworm and ask: "Does this animal fit the definition of 'tiny'?" or ask "Do all animals that fit this description live in dirt?"
- **Severity:** HIGH
- **External Evidence:** Merriam-Webster defines worm broadly (e.g., "any of numerous relatively small elongated usually naked and soft-bodied animals"). It does not restrict them to being "tiny" or living exclusively in "dirt."

**5. Word:** `spider` (Level 1)
- **Field:** definition
- **Issue:** The definition states "a small animal with eight legs that makes webs". This is factually incorrect because not all spiders make webs (e.g., wolf spiders, jumping spiders, trapdoor spiders). This creates a false universal characteristic.
- **Test Case:** Show a student a video of a jumping spider hunting (not using a web) and ask: "Is this a spider according to your dictionary?" If they say no because it didn't make a web, the definition is flawed.
- **Severity:** HIGH
- **External Evidence:** Merriam-Webster defines spider as an arachnid with a body divided into two parts, eight legs, etc., and notes they "often spin webs" or have spinnerets, but does not state that *all* spiders "make webs" as a defining universal trait.

**6. Word:** `jungle` (Level 1)
- **Field:** definition
- **Issue:** The definition states "a thick forest with many plants". This fails to distinguish a jungle from any dense forest (e.g., a thick temperate forest). A jungle specifically implies a tropical or subtropical environment.
- **Test Case:** Show a picture of a dense, thick pine forest in Canada and ask: "Is this a jungle?" If the student says yes based on the definition, the definition lacks necessary geographical/climatic context.
- **Severity:** MEDIUM
- **External Evidence:** Merriam-Webster defines jungle as "an impenetrable thicket or tangled mass of tropical vegetation." The word "tropical" is key.

**7. Word:** `blizzard` (Level 1)
- **Field:** definition
- **Issue:** The definition states "a heavy snow storm with strong wind". A blizzard is defined by specific criteria involving low visibility due to blowing snow and sustained wind speeds, not just "heavy snow". Often, blizzards can occur with little to no *falling* snow if wind blows loose snow around (a ground blizzard).
- **Test Case:** Ask the student: "If it is snowing heavily and windy, is it definitely a blizzard?" The definition implies yes, but meteorological definitions require specific visibility and wind thresholds.
- **Severity:** MEDIUM
- **External Evidence:** The National Weather Service (and Merriam-Webster) defines a blizzard based on wind speeds (35 mph or more) and visibility (1/4 mile or less) for a prolonged period, not just "heavy snow."

## 建议固化项

- **Taxonomic Accuracy Rule:** When defining animals, basic taxonomic classifications (e.g., mammal, reptile, insect) must be accurate or omitted, rather than using generic terms like "sea animal" that could mislead a student about the animal's fundamental nature.
- **Avoid False Universals:** Do not use traits that only apply to a subset of a category as a defining feature for the whole category (e.g., "makes webs" for all spiders, "lives in dirt" for all worms). Use qualifiers like "often" or "many" if necessary, or omit the non-universal trait.
- **Relative Size Adjectives Check:** Strictly review the use of words like "tiny" or "huge." "Tiny" should be reserved for things that are truly microscopic or exceptionally small compared to normal human scale (like an ant), not just "small" (like a garden snail).
