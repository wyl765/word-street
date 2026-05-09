# 审校报告：R28 (10岁男孩，MAP 197，二年级阅读水平)

## 问题发现 (CRITICAL & HIGH)

### 1. `solve`
- **位置：** words-level2.js, `example` 字段
- **问题：** 例句是 "I will solve the riddle by reading each clue slowly."。对于一个10岁的中国ESL孩子来说，“riddle”（谜语）和“clue”（线索）本身就非常抽象且词汇等级较高。如果孩子连 riddle 都不认识，他根本无法通过例句理解 solve。我的孩子在这个场景下会因为查 riddle 和 clue 的意思而彻底卡住，忘记他在学 solve。
- **测试用例：** 
  - ( ) I will solve the ___ to find the answer.
  - A. apple  B. sleep  C. problem (预期答案，比riddle更通用)
- **外部证据：** Merriam-Webster Learner's Dictionary 的例句："He solved the puzzle/mystery."（puzzle 更直观）。

### 2. `fragile`
- **位置：** words-level2.js, `example` 字段
- **问题：** 例句是 "The fragile glass ornament fell and cracked."。“ornament”（装饰品）对二年级阅读水平的ESL孩子来说非常难，属于高级词汇。我的孩子在这个场景下会因为读不懂 ornament 而无法体会 fragile 的语境。
- **测试用例：**
  - Which one is fragile?
  - A. A rock   B. A glass cup (比 ornament 更好懂)   C. A metal coin
- **外部证据：** Oxford Learner's Dictionaries 使用 "fragile china/glass" 作为典型搭配。

### 3. `law`
- **位置：** words-level2.js, `definition` 字段
- **问题：** 定义是 "an official rule"。“official”（官方的）是一个非常抽象且超出二年级水平的词汇。我的孩子在这个场景下会困惑什么是 official，反倒不如直接解释为 "a very important rule made by the government"。
- **测试用例：**
  - A law is a rule made by the ___.
  - A. teacher  B. government  C. baby
- **外部证据：** Merriam-Webster Word Central (Kids) 定义 law 为 "a rule of conduct or action binding on members of a society"（简明版常用 "rule made by the government"）。

### 4. `citizen`
- **位置：** words-level2.js, `example` 字段
- **问题：** 例句是 "As a citizen, my mom can vote in elections."。中国孩子对 "vote in elections"（在选举中投票）的文化背景非常陌生。我的孩子在这个场景下会完全无法代入，因为他的生活经验中没有这种日常场景。
- **测试用例：**
  - A citizen is someone who belongs to a ___.
  - A. school  B. country  C. family
- **外部证据：** Oxford Learner's Dictionary (Kids) 常侧重 "a person who has the legal right to belong to a particular country"。建议例句改为 "He is a proud citizen of his country."

### 5. `globe`
- **位置：** words-level2.js, `definition` 字段
- **问题：** 定义是 "a round model of Earth"。“model” 在这里的含义（模型）容易与“模特”混淆。我的孩子在这个场景下会把 globe 想象成一个穿着地球衣服的人。
- **测试用例：**
  - A globe looks like a ___.
  - A. flat paper  B. round ball  C. square box
- **外部证据：** Cambridge Dictionary 定义 globe 为 "a map of the world made in the shape of a ball"。使用 "a ball that shows the map of the Earth" 更适合儿童。

### 6. `pretzel`
- **位置：** words-level1.js, `definition` 字段
- **问题：** 定义是 "a hard salty snack shaped like a knot"。对于中国孩子，“pretzel” 本身就是极其陌生的欧美零食，用 “knot”（结）去解释它，我的孩子依然无法在大脑中形成画面，因为中国很少用“打结的面包”来形容食物。
- **测试用例：**
  - A pretzel tastes ___.
  - A. sweet  B. salty  C. spicy
- **外部证据：** 词典虽然也用 knot 解释，但对于 ESL 孩子，更需要图片或更直观的形状描述，例如 "twisted bread"。

## 建议固化项

- 🔧 [proofcheck规则] 添加正则检查定义和例句中是否包含 CEFR 级别远高于目标词的词汇。对于 Level 1/2 的词，定义和例句中的词汇应该限定在 Level 1/2，否则警告。
- 🔧 [禁词] 建议将 `ornament`, `official`, `election`, `riddle` 加入针对低阶词库的辅助解释禁词表。
- 🔧 [搭配规则] 无新建议。
- 🔧 [白名单] 无新建议。
- 🔧 [新工具] 建立一个 "Cultural Context Checker"，对于特定词汇（如选举、特定欧美零食如 pretzel、waffle），检查是否有足够的图像支持（imageKeyword）或是否有更贴近亚洲儿童生活的替代表达。
- 🔧 [标准更新] 在 QA-STANDARD.md 中明确："Definitions and examples must NOT contain words of a higher difficulty tier than the target word itself."

