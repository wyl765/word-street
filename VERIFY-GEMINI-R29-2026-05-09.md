# 词典质量审查报告

目标用户：10岁中国ESL男孩，MAP 197（约2年级英语阅读水平）

## CRITICAL 级别问题

### 1. 定义用词（"liquid", "gas", "solid"）存在循环定义且超纲
- **具体词条**: `solid` (words-level1.js, definition), `gas` (words-level2.js, definition), `liquid` (words-level2.js, definition)
- **具体问题**: MAP 197 的孩子在查 "solid" 时，定义是 "not a liquid or a gas; keeps its shape"。孩子不仅不知道 "liquid" 和 "gas" 是什么（这两个词分别在 level 2，且抽象），还需要同时理解两个更难的否定词汇才能理解本词。这会直接卡住孩子。
- **测试用例**:
  What is a solid?
  A. Something that flows like water
  B. Something like air
  C. Not a liquid or a gas
  D. A shape
  *孩子如果不懂 liquid 和 gas，根本无法判断 A B C 选项的含义。*
- **外部证据**: Merriam-Webster Kids 定义 "solid": "having no inside space : not hollow" 或 "firm and hard : not like a liquid or gas"。但在我们的场景下，直接引入未学的 "liquid" 和 "gas" 是教学上的严重失误。

### 2. 定义用词超出目标词汇本身难度 ("fungus", "bristles")
- **具体词条**: `mushroom` (words-level1.js, definition), `broom` (words-level1.js, definition)
- **具体问题**: 
  - `mushroom` 的定义是 "a type of fungus with a round top and a short stem"。"fungus" 这个词对 MAP 197 的 10岁 ESL 孩子来说，绝对比 "mushroom" 本身难得多。孩子查 "mushroom"，却遇到更生僻的 "fungus"。
  - `broom` 的定义是 "a long stick with bristles for sweeping"。"bristles" 这个词同样远超目标受众水平。
- **测试用例**:
  Which of these has bristles?
  A. A broom
  B. A spoon
  C. A ball
  *孩子不知道 bristles 是什么，会随意盲猜。*
- **外部证据**: Merriam-Webster Kids 对 mushroom 的定义是 "a part of a fungus that grows above ground"。对于 ESL 二年级水平，Cambridge Learner's Dictionary 定义 mushroom 为 "a fungus with a round top and short stem"。但对于 MAP 197 ESL 儿童，应使用更简单的 "a plant-like thing that grows in the ground or on wood..."。

### 3. 文化背景脱节与词汇狭隘 ("pudding", "cereal")
- **具体词条**: `pudding` (words-level1.js, definition: "a soft sweet food you eat with a spoon")
- **具体问题**: 中国孩子认知的 "布丁" 通常是果冻状的（Jelly-like），而在英美文化中，"pudding" 可能指的是泥状甜点甚至咸味布丁（Yorkshire pudding）。这里的定义 "a soft sweet food you eat with a spoon" 对中国孩子来说，很容易误认为是酸奶 (yogurt) 或冰淇淋 (ice cream)。
- **测试用例**:
  Which is a soft sweet food you eat with a spoon?
  A. Pudding
  B. Ice cream
  C. Yogurt
  D. All of the above
  *由于定义不精准，孩子会选 D，但词典希望他选 A。*
- **外部证据**: Cambridge Dictionary: "a sweet, soft food made from milk, sugar, eggs, and flavouring, eaten cold"。

### 4. 定义抽象或生僻 ("arc")
- **具体词条**: `rainbow` (words-level1.js, definition: "a colorful arc in the sky after rain")
- **具体问题**: "arc" 这个词对二年级英语水平的孩子非常抽象，且难度高于 "rainbow" 本身。孩子读到 "colorful arc" 时会卡在这个几何词汇上。
- **测试用例**:
  What shape is a rainbow?
  A. A circle
  B. An arc
  C. A square
  *如果孩子不懂 arc，这题会选错。*
- **外部证据**: Merriam-Webster Kids 定义 arc: "a curved line or shape"。Rainbow的定义应替换为 "a colorful curve" 或 "a curved band of colors"。

## HIGH 级别问题

### 5. 多义词的极度狭隘化导致其他语境误判 ("toast")
- **具体词条**: `toast` (words-level1.js, definition: "bread that is cooked until brown")
- **具体问题**: 在日常英语或绘本中，"toast" 还有 "干杯" (propose a toast) 的常见意思。对10岁孩子来说，只给 "bread that is cooked until brown" 会导致他们在读到 "let's toast to our success" 时完全懵掉。
- **测试用例**:
  Read this sentence: "At the wedding, they raised their glasses for a toast." What does "toast" mean here?
  A. Brown bread
  B. Cooked food
  C. A short speech before drinking
  *基于现有词典，孩子必选 A 或 B，从而误解全文。*
- **外部证据**: Oxford Learner's Dictionaries 列出了这两个最常用的含义。虽然是 Level 1，但不应排除极其常见且孩子会接触到的第二含义。

### 6. 误导性的过度简化 ("turtle" vs "tortoise")
- **具体词条**: `toad` (words-level1.js, definition: "a small bumpy animal that hops and lives on land")
- **具体问题**: 词典里有 `frog` ("jumps and lives near water") 和 `toad` ("hops and lives on land")。但对很多两栖动物来说，这种绝对的二分法会导致常识性认知错误。更严重的是，定义中使用了 "bumpy animal"，孩子可能会把有疙瘩的其他动物误认为 toad。
- **测试用例**:
  What kind of animal is bumpy and hops?
  A. A frog
  B. A toad
  *定义不够精准区分*
- **外部证据**: Britannica Kids 对 toad 的描述区分不仅在于栖息地，还有皮肤质地。

## 建议固化项

- 🔧 [proofcheck规则] 添加定义难度检查：`definition` 中的单词必须在目标词的同级别或更低级别词库中。如果 `word` 是 Level 1，其 `definition` 中的词必须也存在于 Level 1 词库或最基础的 100 词表中（如 Dolch sight words）。
- 🔧 [proofcheck规则] 循环定义检查：检查 `definition` 中是否包含了尚未在当前或更低级别定义的学术/抽象词汇（如 solid 的定义中包含 liquid 和 gas）。
- 🔧 [禁词] 在 Level 1 和 Level 2 的定义中禁用：`fungus`, `bristles`, `arc`, `substance`, `material` 等超出 MAP 197 认知的高频生僻词（建议建立 BANNED_DEF_WORDS 数组）。
- 🔧 [新工具] 建立 `check-cultural-bias.mjs`，通过预设的 "中国学生易混淆概念列表"（如 pudding/jelly/gelatin，dragon/dinosaur），扫描定义字段是否充分排除了文化歧义。
