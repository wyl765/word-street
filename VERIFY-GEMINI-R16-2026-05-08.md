# Word Street L1 & L2 审校报告

## 发现的问题 (严重程度分类)

### HIGH: 孩子可能看不懂的定义 / 词性不一致 / 多义项违规
*这部分需要人工重点复核。*

1. **[L1] whale / dolphin** - 定义中使用了 "mammal" (哺乳动物)。对于2年级(MAP 197)的ESL学生来说，"mammal" 可能是一个生词，导致定义本身比单词更难懂。建议改为 "sea animal"。
2. **[L1] beetle / butterfly / caterpillar / antenna(L2)** - 定义中使用了 "insect" (昆虫)。虽然常见，但对于低龄ESL，"bug" 可能更直观。
3. **[L1] spider / monster** - 定义中使用了 "creature"。可以考虑用 "animal" 或直接描述（例如 "a scary thing in stories"）。
4. **[L1] bucket** - "a big container you carry things in"。 "container" 可能偏难。建议改为 "something you use to hold water or sand"。
5. **[L1] put down** - "to set something on a surface". "surface" 太抽象。建议改为 "to put something on a table or the floor".
6. **[L1] moss** - "soft green material that grows on rocks". "material" 太抽象。建议改为 "a soft green plant that..."。
7. **[L2] plastic** - "a man-made material". "material" 难以理解。建议通过例子定义："like what toy blocks or water bottles are made of"。
8. **[L2] instrument (bagpipe, banjo, harp)** - 涉及乐器的定义大量使用了 "instrument"。建议用 "something you play to make music"。

### MEDIUM: 定义偏难或有轻微瑕疵
1. **[L1] portion / less / more / equal / least(L2) / limit(L2)** - 大量使用 "amount"。表示数量时，"amount" 对小读者较为抽象。可以考虑用 "how much" 来改写，例如 less -> "not as much as"。
2. **[L2] planet / comet** - 使用了 "object"。"a big round object in space" (planet) 和 "a bright object..." (comet)。"object" 对2年级偏书面语，可以考虑改为 "a big round thing in space"。
3. **[L2] ceiling / mirror** - 使用了 "surface"。"surface" 比较抽象。

*(注：本次抽查通过脚本筛选了定义中常见的高阶/抽象词汇，如 mammal, insect, creature, container, material, surface, amount, event, object, instrument 等。)*

## 建议固化项

- 🔧 [proofcheck规则] 增加正则检查定义中是否包含抽象名词：\b(mammal|creature|insect|substance|instrument|device|equipment|vehicle|container|structure|material|surface|object|process|event|situation|emotion|quality|characteristic|amount|degree|extent)\b。如果包含，发出警告，提示可能超出2年级ESL理解水平。
- 🔧 [禁词] 建议将上述抽象词加入定义用词的 BANNED_WORDS 或 WARNING_WORDS 列表（仅针对定义字段）。
- 🔧 [新工具] 建议编写一个基于频次词典的定义难度检查工具。如果定义字段 `definition` 中出现了不在 "常用1000词" (或2年级Sight Words/Dolch Words) 列表中的词，高亮提示作者重新措辞。
- 🔧 [标准更新] 在 QA-STANDARD.md 中明确：为低龄儿童写定义时，必须用"简单词解释复杂词"，绝对禁止在定义中引入比目标词更难的词汇（如用 mammal 解释 whale）。