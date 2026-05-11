# PEDANT Round 2: Verification

## Previous False Claims — Status

| word | old issue | fixed? | notes |
|------|-----------|--------|-------|
| spider | "catches insects in a web" (not all spiders use webs) | ✅ YES | Now "catches insects for food" — removes web claim |
| worm | called "insect" | ✅ YES | Now "a soft animal with a long body and no legs" |
| snail | missing shell mention | ✅ YES | Now mentions "spiral shell on its back" |
| moose | was vague | ✅ YES | Now "the largest kind of deer, with long legs and a broad nose; males grow large flat antlers" — excellent |
| ladybug | called "insect" only | ✅ YES | Now "a small round beetle" — correctly identifies as beetle |
| caterpillar | vague | ✅ YES | Now "the young form of a butterfly or moth" — accurate |
| mushroom | called "vegetable" | ✅ YES | Now "a type of fungus with a cap and stem" — correct |
| cottage | was "a house in the country" | ✅ YES | Now "a small cozy house" — acceptable |
| desert | had "sand" emphasis | ✅ YES | Now "a very dry place with very little rain" — correct definition |
| enormous | was tautological | ✅ YES | Now "very, very big" — simple but acceptable for L1 |
| gigantic | was tautological | ✅ YES | Now "extremely big, like a giant" — connects to etymology |
| pepper | was too narrow or broad | ✅ YES | Now "a crunchy vegetable that can be red, green, or yellow with seeds inside" — clearly bell pepper |
| celery | vague | ✅ YES | Now "a long crunchy vegetable with crisp stalks" — fine |
| domestic | was incomplete | ✅ YES | Now "relating to the home or one's own country; also raised by people, not wild" — covers both senses |
| bunny | was identical to rabbit | ✅ YES | Now "a rabbit, especially one that is cute or friendly" — distinguishes register |
| robin | missing color detail | ✅ YES | Now "a songbird with a red or orange chest" — good |
| adequate | vague | ✅ YES | Now "enough to meet the need" — precise |
| levy | was unclear | ✅ YES | Now "to officially impose a tax or fee" — correct |
| average | was confusing | ✅ YES | Now "in the middle, the usual amount — like most others" — good for L1 |
| chord | was unclear | ✅ YES | Now "three or more musical notes played together" — accurate |

**Score: 20/20 fixed**

## Previous Omissions — Status

| word | missing feature | now present? | notes |
|------|----------------|--------------|-------|
| dolphin | mammal | ✅ YES | "a gray sea mammal" |
| owl | nocturnal | ✅ YES | "hunts at night" (implies nocturnal without jargon) |
| turtle | reptile | ✅ YES | "a reptile with a hard shell" |
| whale | mammal | ❌ NO | Says "a very large animal that lives in the ocean and breathes air" — "breathes air" hints at it but doesn't say mammal |
| frog | amphibian | ❌ NO | Says "smooth-skinned animal... lives near water" — no "amphibian" |
| toad | amphibian | ❌ NO | Says "an animal like a frog but with dry bumpy skin" — no "amphibian" |
| shark | fish (cartilaginous) | ✅ YES | "a large ocean fish with sharp teeth and a skeleton made of cartilage" — excellent |
| spider | not an insect / arachnid | ✅ YES | "an animal with eight legs" — correctly avoids calling it insect |
| moose | deer family | ✅ YES | "the largest kind of deer" |
| ladybug | beetle | ✅ YES | "a small round beetle" |
| caterpillar | larval stage | ✅ YES | "the young form of a butterfly or moth" |
| mushroom | fungus | ✅ YES | "a type of fungus" |
| eagle | raptor/bird of prey | ✅ YES | "hunts other animals" (implies raptor) |
| lizard | reptile | ✅ YES | "a dry-skinned reptile with scales" |
| bee | makes honey / pollinates | ⚠️ PARTIAL | "a small flying insect that buzzes and can sting" — no mention of honey or pollination |
| worm | invertebrate/lives in soil | ✅ YES | "lives in the ground" |
| peanut | legume (not true nut) | ✅ YES | "a small nut-like seed that grows in a shell underground" — "nut-like seed" is accurate |

**Score: 14/17 fixed** (whale still missing mammal, frog/toad still missing amphibian)

## NEW Problems (introduced by simplification)

| # | word | file | what went wrong |
|---|------|------|-----------------|
| 1 | whale | words-level1.js | Missing "mammal" — says "animal that breathes air." Dolphin correctly says "sea mammal" but whale doesn't. Inconsistent and taxonomically important. |
| 2 | mammal | words-level2.js | "an animal that has hair and drinks milk as a baby" — AMBIGUOUS. Reads as if the mammal itself drinks milk as a baby. Should say "feeds milk to its babies" or "an animal whose babies drink their mother's milk." |
| 3 | hornet | words-level3c.js | "a large stinging insect alike to a wasp" — "alike to" is not standard English. Should be "similar to" or "like." |
| 4 | insect | words-level2.js | "a small animal with six legs" — missing "three body parts" (head, thorax, abdomen) which distinguishes insects from other six-legged arthropods. Also, not all insects are small (some beetles are 15+ cm). |
| 5 | comet | words-level2.js | "a bright ball of ice with a glowing tail" — comets are only bright/glowing when near the sun. Most of their orbit they're dark. Also made of ice AND dust/rock ("dirty snowball"). Minor but imprecise. |
| 6 | equator | words-level2b.js | "a pretend line around the middle of the Earth" — "pretend" implies fictional/make-believe. Standard term is "imaginary." The equator is a real geographical concept, not pretend. |
| 7 | amphibian | words-level2b.js | "an animal that lives in water and on land" — too broad. Otters, seals, and beavers also live in water and on land. Should mention "cold-blooded" or "starts life in water with gills, then develops lungs" or at minimum "like frogs and salamanders." |
| 8 | pelican | words-level2.js | "a large bird with a big bag under its beak" — it's a throat pouch, not a "bag." The simplification is acceptable for children but "pouch" would be equally simple and more accurate. |
| 9 | bee | words-level1.js | "a small flying insect that buzzes and can sting" — this describes wasps equally well. Missing the defining feature: makes honey / collects pollen / lives in a hive. Many bees don't sting (male bees, many solitary species). |
| 10 | carbon | words-level2b.js | "a simple building block found in plants, animals, and things like coal" — carbon is a chemical element, not a "simple building block." The phrasing could confuse with Lego-like physical blocks. "A basic element" would be clearer. |
| 11 | latitude | words-level2b.js | "lines on a map that go side to side" — technically they measure position north-south (distance from equator). They RUN east-west but MEASURE north-south. This is a common confusion the definition reinforces rather than clarifies. |

## Verdict

- **False claims fixed: 20/20** ✅ — All previous false-claim issues are resolved.
- **Omissions fixed: 14/17** — whale (mammal), frog (amphibian), toad (amphibian) still missing key taxonomic terms.
- **New problems found: 11** — Mostly precision losses from over-simplification. The most concerning are: mammal (ambiguous subject), amphibian (too broad), equator ("pretend" vs "imaginary"), and bee (indistinguishable from wasp).

### Severity Assessment
- **High priority (factual/taxonomic):** whale, mammal definition, amphibian definition, bee (4 issues)
- **Medium priority (imprecise but not wrong):** insect, comet, carbon, latitude (4 issues)  
- **Low priority (style/wording):** hornet "alike to", equator "pretend", pelican "bag" (3 issues)

### Overall Grade: B+
The simplification pass was largely successful — 20/20 false claims fixed is excellent. However, it introduced ~11 new imprecision issues, mostly in scientific/taxonomic definitions where simplification inherently trades accuracy for accessibility. The 3 unfixed omissions (whale/frog/toad missing taxonomic class) are easy one-word fixes.
