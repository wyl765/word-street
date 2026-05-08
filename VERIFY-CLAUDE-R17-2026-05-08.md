# VERIFY-CLAUDE-R17-2026-05-08
**角色:** 竞品公司的人，专找能攻击产品的弱点
**范围:** L1 (600行) + L2 (548行) = 1148词
**关注:** R16已修steep/leap/dash/nod/crash/snap/cub/toad/shallow + 16个verb-def-noun-example对齐

## CRITICAL
无CRITICAL问题。

## HIGH

### 1. [whale] (L1) — 定义用了"mammal"
- 定义: "a very large sea mammal"
- 问题: "mammal"对MAP 197的10岁ESL学生太难。这是用更难的词解释简单词。
- 建议: "a very large sea animal that breathes air"

### 2. [dolphin] (L1) — 同样用了"mammal"
- 定义: "a smart sea mammal that swims and breathes air"
- 建议: "a smart sea animal that swims and breathes air"

### 3. [bucket] (L1) — 用了"container"
- 定义: "a big container you carry things in"
- 问题: "container"对L1太抽象。
- 建议: "a round open thing with a handle for carrying water or sand"

### 4. [moss] (L1) — 用了"material"
- 定义: "soft green material that grows on rocks"
- 问题: "material"太抽象，10岁孩子不一定懂。
- 建议: "a soft green plant that grows on rocks and trees"

### 5. [put down] (L1) — 用了"surface"
- 定义: "to set something on a surface"
- 问题: "surface"太书面化。
- 建议: "to set something on a table or the floor"

### 6. [plastic] (L2) — 用了"material"
- 定义: "a man-made material"
- 问题: "material"+"man-made"双重抽象。
- 建议: "a light, smooth thing used to make bottles and toys"

### 7. [mist] (L2) — 用fog定义mist，近循环
- 定义: "a light fog of tiny water drops floating in the air"
- fog在L1定义是"a cloud close to the ground"
- 建议: "very thin cloud near the ground that makes things hard to see clearly"

### 8. [action] (L2) — 定义过于模糊
- 定义: "something that is done"
- 问题: 太模糊，几乎什么词都能匹配。distractor-test也标记了此词(confusable with 8 others)。
- 建议: "a thing someone does on purpose"

### 9. [danger] (L2) — 定义过于模糊
- 定义: "something that can hurt you"
- 问题: 同上，太泛。distractor-test标记confusable with 8 others。
- 建议: "something that could hurt you or put you in trouble"

## MEDIUM

### 10. [spider] (L1) — 用了"creature"
- 定义: "a small creature with eight legs"
- 问题: "creature"不在常用1000词里。
- 建议: "a small animal with eight legs that makes webs"

### 11. [caterpillar] (L1) — 定义偏长
- 定义: "a small worm-like insect that becomes a butterfly or moth"
- 问题: "worm-like insect"有点绕。
- 建议: "a fuzzy bug that turns into a butterfly"

### 12. [crunchy] (L1) — "loud"不精确
- 定义: "making a loud sound when you bite"
- 问题: crunchy不一定loud，关键是crisp/snapping的质感。
- 建议: "making a snapping sound when you bite"

### 13. [planet] (L2) — 用了"object"
- 定义: "a big round object in space"
- 问题: "object"太书面化。
- 建议: "a big round thing in space that goes around a star"

### 14. [cocoon] (L2) — 用了"caterpillar"
- 定义: "the wrap a caterpillar makes around itself before it becomes a moth"
- 问题: 如果孩子不知道caterpillar，定义就断了。不过caterpillar也在L1，可以接受。标记为MEDIUM。

### 15. [comet] (L2) — 用了"object"
- 定义: "a bright object with a tail that flies through space"
- 建议: "a bright ball of ice with a glowing tail that flies through space"

### 16. [ceiling] (L2) — 用了"surface"
- 定义: "the top inside surface of a room"
- 建议: "the top part of a room, above your head"

### 17. [imageKeyword: "squeeze hug"] (L1) — squeeze例句已改
- 例句现在是"She squeezed the sponge"，但imageKeyword还是"squeeze hug"
- 建议: 改为 "squeezing sponge"

## LOW

### 18. [trade] (L1) — 双重"something"
- 定义: "to give something and get something back"
- 建议: "to give one thing and get a different thing back"

### 19. [mumble/whisper] 类似定义
- mumble: 不在L1/L2。跳过。

### 20. [match] (L1) — 例句用了"father"
- 例句: "Can you match the baby animal to its father?"
- 问题: 通常说"its mother"或"its parent"。
- 建议: 这是一个细节，不影响理解。保持。

## 建议固化项

- 🔧 [proofcheck规则] **ABSTRACT_DEF_WORDS**: 检测L1-L2定义中使用的抽象/书面词汇：mammal, creature, insect, substance, instrument, device, equipment, vehicle, container, structure, material, surface, object, process, event, situation, emotion, quality, characteristic。这些词在定义中出现应标MINOR警告。正则：`/\b(mammal|creature|substance|instrument|device|equipment|vehicle|container|structure|material|surface|object|process|event|situation|emotion|quality|characteristic)\b/i`，仅对L1-L2生效。
- 🔧 [proofcheck规则] **IMAGEKEYWORD_EXAMPLE_MISMATCH**: 当例句被修改后，imageKeyword可能没同步更新。检测imageKeyword与例句的关键名词是否匹配（简单字符串交集检测）。这次squeeze的imageKeyword就是遗留问题。
- 🔧 [白名单] "insect"在L2定义中可接受（因为insect本身也是L2词条，学生应该认识），但在L1定义中应标记。
- 🔧 [标准更新] QA-STANDARD.md应明确：L1定义只能用Dolch/Fry前1000词。L2定义可以用L1词+常见2000词。超出范围的定义用词应自动标记。
