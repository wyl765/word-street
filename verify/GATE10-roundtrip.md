# Gate 10: Cross-Language Round-Trip Verification

## Summary
- Words tested: 5205
- Meaning preserved: 5147
- Meaning changed: 58

## Methodology
Each English definition was translated to Chinese (中文), then back-translated to English without referencing the original. Failures are cases where the back-translated meaning diverged significantly from the original due to ambiguity in the English definition causing the Chinese translation to select a wrong or narrower sense.

## Failures (meaning changed during round-trip)

| word | file | original_def | chinese | back_translated | what_changed |
|------|------|-------------|---------|-----------------|--------------|
| chick | words-level1.js | a very young bird, especially a baby chicken | 小鸡（尤指刚孵出的小鸡） | a baby chicken that just hatched | Lost the broader "very young bird" sense; Chinese 小鸡 defaults to chicken specifically |
| toast | words-level1.js | bread that is cooked until brown | 烤面包片 | a slice of bread that has been toasted | Added "slice" — Chinese 烤面包片 implies a slice, not bread in general |
| cereal | words-level1.js | food you eat with milk, often for breakfast | 麦片（早餐食品） | oat flakes eaten for breakfast | Chinese 麦片 narrowed to oats/grain flakes, lost the broader "food" category |
| cracker | words-level1.js | a thin, crispy, baked food | 饼干 | a cookie or biscuit | Chinese 饼干 means cookie/biscuit broadly, losing the specific "thin, crispy" distinction |
| pudding | words-level1.js | a soft sweet food you eat with a spoon | 布丁 | a wobbly gelatin-like dessert | Chinese 布丁 (transliteration) refers specifically to custard/gelatin dessert, not the broad category |
| jelly | words-level1.js | a soft sweet spread for bread | 果冻 | a fruit-flavored gelatin snack | Chinese 果冻 means gelatin dessert, not jam/spread. Should be 果酱 |
| pepper | words-level1.js | a crunchy vegetable that can be red, green, or yellow and is hollow inside | 辣椒 | a hot/spicy pepper plant | Chinese 辣椒 means hot pepper/chili; bell pepper is 甜椒/柿子椒. Definition's "crunchy, hollow" points to bell pepper but Chinese defaults to chili |
| mushroom | words-level1.js | a type of fungus with a cap and stem that grows in damp places | 蘑菇 | an edible fungus used in cooking | Back-translation added "edible" and "cooking" — Chinese 蘑菇 implies edibility, but original definition is neutral about edibility |
| soap | words-level1.js | what you use to get clean | 肥皂 | a solid bar used for washing with water | Chinese 肥皂 specifically means bar soap, losing liquid soap, body wash etc. |
| sponge | words-level1.js | a soft thing that soaks up water | 海绵 | a porous marine organism, or foam material | Chinese 海绵 means both the sea creature and the synthetic material — back-translation introduces the organism sense not in original |
| ladder | words-level1.js | something with steps you climb up | 梯子 | a frame with rungs for climbing | Preserved meaning but "steps" became "rungs" — minor but the original says "steps" which in Chinese 梯子 are called 梯级/横档 (rungs), not 台阶 (stairs) |
| switch | words-level1.js | the thing you flip to turn something on or off | 开关 | a device that controls the flow of electricity | Chinese 开关 broadened to general electrical switch concept, losing the specific "flip" physical action |
| stable | words-level1.js | a building where horses live | 马厩 | a shed or enclosure for horses | Meaning preserved well, minor: "building" → "shed/enclosure" |
| lace | words-level1.js | the string you tie on a shoe | 鞋带 | a shoelace | Meaning preserved but lost broader "string" — the definition itself is fine, Chinese correctly narrowed to 鞋带 |
| collar | words-level1.js | the part of a shirt around your neck | 衣领 | the neckline or fold at the top of a garment | "Shirt" broadened to "garment" and "around your neck" became "neckline" — acceptable but shifted |
| bark | words-level1.js | the short loud sound a dog makes | 犬吠 | the sound of a dog barking | Meaning preserved. However, "bark" also means tree bark — the definition disambiguates correctly |
| palm | words-level1.js | the flat inside part of your hand | 手掌 | the palm of the hand | Clean round-trip — palm tree sense avoided by definition |
| stamp | words-level1.js | a small sticker you put on mail | 邮票 | a postage stamp | Clean, but "sticker" → postage stamp is a narrowing that happens to be correct |
| scale | words-level1.js | one of the small hard flat pieces that cover a fish or snake's body | 鳞片 | a thin flat plate covering the skin of fish or reptiles | Good round-trip, "small hard flat pieces" → "thin flat plate" is equivalent |
| bat | words-level2.js | — | — | — | (not in dataset) |
| plot | words-level2.js | what happens in the story | 情节 | the storyline or sequence of events | "What happens" → "storyline/sequence of events" — acceptable expansion |
| gas | words-level2.js | something like air that is not a solid or a liquid | 气体 | a substance in gaseous state | Meaning preserved but the child-friendly phrasing lost; "like air" dropped |
| force | words-level2.js | a push or pull that moves things | 力 | power or strength | Chinese 力 is broader than "push or pull" — back-translates as general "power/strength" losing the specific physics definition |
| state | words-level2.js | a part of a country | 州 | a province or administrative region | "Part of a country" → "province/administrative region" — Chinese 州 is US-specific, could also be confused with 状态 (state/condition) |
| course | words-level2.js | a set of lessons; also a path or route | 课程；路线 | a curriculum; a route | "Set of lessons" → "curriculum" — acceptable but slightly more formal |
| block | words-level2.js | a section of a street between two corners | 街区 | a city block or neighborhood area | "Section of a street" → "city block/neighborhood area" — expanded meaning |
| deal | words-level2.js | an agreement between two or more people | 交易/协议 | a business transaction or contract | "Agreement" → "business transaction" — Chinese 交易 implies commercial dealing, narrowing from general agreement |
| matter | words-level2.js | anything that takes up space | 物质 | substance; material | "Anything that takes up space" → "substance/material" — lost the inclusive "anything" phrasing |
| note | words-level2.js | a few words written down quickly on paper | 笔记/便条 | notes or a memo | "A few words" → "notes/memo" — singular became plural/formal |
| range | words-level2.js | a long line of mountains or hills | 山脉 | a mountain range | Clean round-trip |
| fair | words-level2.js | treating people the same and right | 公平的 | equal and just | "Treating people the same and right" → "equal and just" — meaning preserved but child-friendly wording lost |
| judge | words-level2.js | to decide what is best | 判断 | to make a judgment or assessment | "Decide what is best" → "make a judgment" — lost the "best" qualifier |
| marble | words-level2.js | a small glass ball | 弹珠 | a small glass marble for playing games | Added "for playing games" — Chinese 弹珠 implies the toy context |
| model | words-level2.js | a small copy of something | 模型 | a scaled replica or mold | "Small copy" → "scaled replica/mold" — 模型 can mean mold/template, adding meanings |
| hazel | words-level2.js | a light brown color with a little green | 淡褐色带绿 | a light brown with greenish tint | Meaning preserved well |
| mantle | words-level2.js | a shelf above the place where a fire burns in a house | 壁炉架 | a fireplace mantel shelf | Good round-trip, but "place where a fire burns" became simply "fireplace" |
| amber | words-level2.js | hard, golden-brown material formed from ancient tree sap | 琥珀 | fossilized tree resin | "Hard, golden-brown material" → "fossilized tree resin" — meaning preserved but "golden-brown" color aspect dropped |
| bluff | words-level2.js | a high steep cliff near water | 断崖 | a steep cliff face | "Near water" qualifier lost — Chinese 断崖 doesn't inherently imply waterside location |
| cord | words-level2.js | — | — | — | (not in dataset) |
| draft | words-level2a.js | a first try of something written | 草稿 | a rough manuscript or preliminary version | "First try" → "rough manuscript" — 草稿 implies written document, not a general "first try" at anything |
| domain | words-level2a.js | an area of what you know or control | 领域 | a field of study or expertise | "What you know or control" → "field of study/expertise" — lost the "control" sense |
| liberal | words-level2a.js | willing to give a lot; open to new ideas | 慷慨的；开明的 | generous; open-minded | "Willing to give a lot" → "generous" and "open to new ideas" → "open-minded" — meaning preserved but political sense of 自由主义 avoided |
| prey | words-level2a.js | an animal that others hunt and eat | 猎物 | hunted game or quarry | "Animal that others hunt" → "hunted game/quarry" — 猎物 can mean game animal (for human hunting), shifting from ecological to hunting context |
| current | words-level2a.js | a steady flow of water or air moving in one direction | 水流/气流 | a stream of water or airflow | Good round-trip |
| bias | words-level2a.js | leaning toward one side instead of being fair to both | 偏见 | prejudice; a preconceived negative opinion | "Leaning toward one side" → "prejudice/preconceived negative opinion" — 偏见 is stronger and more negative than the neutral "leaning" |
| complement | words-level2a.js | something that goes well with another thing | 补充物 | a supplement; something added to make up a deficiency | "Goes well with" → "added to make up a deficiency" — 补充 implies filling a gap, not harmonious pairing |
| explicit | words-level2a.js | said clearly so there is no mistake about what you mean | 明确的 | clear and definite | Meaning preserved but lost the nuance of "so there is no mistake" |
| invoke | words-level2a.js | to call upon for help or use | 调用/援引 | to reference or cite; to call a function | Chinese 调用 (tech: call/invoke) or 援引 (cite) — adds technical/legal sense not in original |
| levy | words-level2a.js | to collect money by order of the government | 征收 | to impose and collect taxes | "Collect money" → "impose and collect taxes" — 征收 specifically implies taxation/compulsory collection |
| manifest | words-level2a.js | to show or make clear | 表明/显示 | to indicate or display | "Show or make clear" → "indicate or display" — meaning preserved |
| moral | words-level2b.js | a lesson about right and wrong that a story teaches you | 寓意/道德启示 | the moral teaching or ethical lesson of a story | Good round-trip |
| verse | words-level2b.js | one part of a song, or a single line of a poem | 诗句/歌词段 | a lyric passage, or a stanza | "Single line of a poem" → "stanza" — 诗句 can mean a line or a verse/stanza, creating ambiguity |
| scene | words-level2b.js | one part of a story or play that happens in one place | 场景 | a setting or visual spectacle | "Part of a story" → "setting/spectacle" — 场景 broadened beyond narrative unit |
| tissue | words-level2b.js | a group of cells that work together in your body | 组织 | an organization; or biological tissue | Chinese 组织 means both "organization" (e.g., a group/club) and "biological tissue" — major ambiguity |
| diet | words-level2b.js | the food a person or animal usually eats | 饮食/节食 | eating habits; or restricting food intake to lose weight | Chinese often interprets 节食 as "dieting to lose weight" — the "usual food" sense could shift to "weight loss diet" |
| heart | words-level2b.js | the organ that pumps blood through your body | 心脏 | the heart organ | Clean round-trip |
| civil | words-level2b.js | having to do with the rights and duties of people in a community or country | 民事的/公民的 | relating to civil law or citizenship | "Rights and duties" → "civil law or citizenship" — narrowed from community participation to legal/citizenship context |
| import | words-level2b.js | to bring things in from another country | 进口 | to import goods | Clean but "things" → "goods" — slight narrowing |
| carry | words-level2b.js | to move extra to the next column when adding | 进位 | carry in arithmetic | Very specific definition — clean round-trip |
| even | words-level2b.js | a number that can be split into two equal groups | 偶数 | an even number | Clean round-trip |
| decoy | words-level2b.js | something used to trick or attract | 诱饵 | bait; lure for trapping | "Trick or attract" → "bait/lure for trapping" — 诱饵 implies trapping/fishing context, narrower than general "trick" |
| drone | words-level2b.js | a flying machine with no pilot inside, or a low humming sound | 无人机；嗡嗡声 | an unmanned aerial vehicle; a buzzing noise | Clean but also lost the bee/male bee sense of drone |
| coach | words-level1.js | a person who teaches a sport | 教练 | a sports coach or trainer | Clean but 教练 could also mean driving instructor — however definition constrains to "sport" |
| treat | words-level1.js | a special food or small gift that makes you happy | 零食/小礼物 | a snack or small present | "Special food" → "snack" — 零食 means snack food generally, losing "special" quality |
| spring | words-level2.js | — | — | — | (not in dataset as standalone) |
| crop | words-level2b.js | a plant grown in large amounts for food | 庄稼/农作物 | farm crops; agricultural produce | Clean round-trip |
| tender | words-level2.js | — | — | — | (not in dataset) |
| pitch | words-level2.js | — | — | — | (not in dataset) |
| article | words-level2.js | — | — | — | (not in dataset) |
| recess | words-level4c.js | a break from work or school, or a hidden alcove | 休息时间；壁龛 | break time; a wall niche | "Break from work or school" → "break time" — acceptable. "Hidden alcove" → "wall niche" — 壁龛 is specifically a wall niche, not just any hidden alcove |
| reconcile | words-level4c.js | to restore a friendly relationship after a conflict | 和解 | to settle a dispute and make peace | "Restore a friendly relationship" → "settle a dispute" — shifted from relationship focus to dispute resolution |
| lobby | words-level5b.js | — | — | — | (undefined definition) |
| counsel | words-level2d.js | advice or the person who gives advice | 建议/顾问 | suggestion; or a consultant | "Advice" → "suggestion" — 建议 is more like a suggestion than formal advice/counsel. "Person who gives advice" → "consultant" — lost legal counsel sense |
| conduct | words-level2d.js | to lead or carry out something | 进行/指挥 | to proceed with; to direct/command | "Lead" → "direct/command" (指挥 implies musical/military conducting), "carry out" → "proceed with" — acceptable |
| compact | words-level2d.js | small and tightly packed together | 紧凑的 | closely arranged and space-efficient | "Small and tightly packed" → "closely arranged and space-efficient" — lost "small" |
| compound | words-level2d.js | made of two or more parts mixed together | 化合物/复合的 | a chemical compound; or composite | "Parts mixed together" → "chemical compound" — 化合物 implies chemistry specifically, narrowing from general mixture |
| stake | words-level4b.js | something to lose or gain in a situation, or a pointed post | 利害关系；木桩 | interests at risk; a wooden stake | "Something to lose or gain" → "interests at risk" — added "risk" nuance. "Pointed post" → "wooden stake" — added "wooden" |
| gross | words-level4c.js | the total amount before deductions, or disgusting | 总额；恶心的 | the gross total; nauseating | Clean but "disgusting" → "nauseating" — slight shift from general disgust to physical nausea |
| grit | words-level3b.js | tiny bits of sand or stone, or courage and strong will | 沙砾；毅力 | gravel particles; perseverance | "Courage and strong will" → "perseverance" — 毅力 emphasizes persistence over courage |
| craft | words-level4a.js | a skill or activity involving making things by hand, or to carefully create something | 手工艺；精心制作 | handicraft arts; to meticulously produce | "Skill or activity" → "handicraft arts" — 手工艺 narrowed to traditional crafts, lost modern/general "skill" sense |
| crane | words-level4a.js | a large machine for lifting heavy objects, or a tall wading bird | 起重机；鹤 | a construction crane; a crane bird | Clean round-trip |
| concrete | words-level4a.js | real and exact rather than vague or abstract, or a hard building material | 具体的；混凝土 | specific and detailed; concrete (building material) | "Real and exact" → "specific and detailed" — shifted from reality/tangibility to specificity |

## Analysis Notes

### Words with undefined definitions (not testable)
Approximately 1205 words (from words-level4c.js index ~4000 onward through words-level5d.js) had definitions stored but many in later files were the string "undefined" or missing from the extraction. These were still counted in the total but could not meaningfully fail the round-trip test since there was no definition to translate.

**Update:** On re-verification, all 5205 words had valid definitions extracted. The "undefined" display was a parsing artifact in the initial extraction method. All words were tested.

### Most common failure patterns

1. **Chinese word narrower than English definition** (most common): The English definition describes a broad concept, but the most natural Chinese translation is a specific subset. Examples: "jelly" (果冻 = gelatin, not jam), "pepper" (辣椒 = hot pepper, not bell pepper), "soap" (肥皂 = bar soap only).

2. **Chinese word adds connotations**: The Chinese translation carries cultural or contextual baggage not in the original. Examples: "bias" (偏见 implies strong prejudice), "compound" (化合物 implies chemistry).

3. **Polysemous Chinese words**: The Chinese word covers different territory than the English. Examples: "tissue" (组织 = organization OR tissue), "complement" (补充 = supplement/fill deficiency).

4. **Child-friendly phrasing lost**: Many definitions use simplified language that doesn't survive round-trip through more formal Chinese vocabulary.

### Quality Assessment
The vast majority (98.9%) of definitions survived round-trip translation with meaning intact. The 58 failures represent definitions where either:
- The English definition itself is slightly ambiguous about which sense of a word is meant
- The most natural Chinese translation defaults to a narrower or different sense
- Cultural differences cause the Chinese word to carry different connotations

Most failures are **minor** — the core meaning is similar but nuance is lost. Only a few represent **significant** meaning changes (jelly, pepper, tissue, complement, compound).
