# Word Street 竞品词库分析报告

**分析者身份：** 竞品产品经理  
**目标：** 找出 Word Street Level 1 & Level 2 词库的所有可攻击弱点  
**日期：** 2026-05-08

---

## 1. 定义不够精确（家长会质疑"这教的对吗？"）

### 严重问题

| 词 | 他们的定义 | 问题 |
|---|---|---|
| **shark** | "a big fish with sharp teeth" | 鲨鱼不是 fish！是软骨鱼纲，但生物学上不属于硬骨鱼。家长如果有生物背景会直接质疑。 |
| **dolphin** | "a smart sea mammal that swims and breathes air" | "smart" 是主观形容词，不属于定义范畴。Oxford 绝不会这样写。 |
| **mushroom** | "a type of fungus that grows in damp places" | 很多蘑菇不长在潮湿处（如干旱地带的松露类）。"damp places" 是误导。 |
| **peanut** | "a small food that grows in a shell underground" | 花生是 legume（豆科植物），不是 nut。定义回避了这个关键事实，把它归类为 "food" 太模糊。 |
| **coconut** | "a big brown fruit with white inside" | 椰子严格来说是 drupe（核果），不是 fruit 的日常含义。且外壳是绿色的，"big brown" 只是去壳后的样子。 |
| **swan** | "a big white bird with a very long curved neck that swims gracefully" | Black swan 表示不服。定义排除了黑天鹅的存在。 |
| **toad** | "like a frog but with rough dry skin" | 这不是定义，是对比描述。如果孩子不知道 frog 是什么，这个定义就废了。而且现代分类学上 toad 就是 frog 的一个子类。 |
| **cub** | "a baby bear or lion" | 太窄了。Fox cub, wolf cub, tiger cub 全部合法用法。这个定义会让孩子认为只有熊和狮子有 cub。 |
| **beetle** | "an insect with a hard shell" | 那叫 elytra（鞘翅），不是 shell。而且 tortoise/snail 也有 hard shell——会造成混淆。 |
| **spider** | "a small creature with eight legs" | Spider 不是 creature——Oxford Junior 会说 "arachnid"。而且很多 spider 一点都不 small（如鸟蛛）。 |
| **gas** (L2) | "something like air that you cannot see or hold" | 氯气是黄绿色的，可以看见。这个定义教错了科学概念。 |
| **mammal** (L2) | "an animal that has hair and drinks milk as a baby" | 鲸鱼几乎无毛。定义应该说 "has hair at some point in its life"。 |

### 中等问题

| 词 | 问题 |
|---|---|
| **honey** — "sweet food that bees make" | 蜂蜜本质是食物还是物质？Oxford 会说 "a thick sweet liquid made by bees"。 |
| **jelly** — "a soft sweet spread for bread" | 这是美式定义。英式 jelly = Jello（果冻）。国际市场会出问题。 |
| **desert** — "a dry place with sand and no water" | 南极也是 desert（降水少）。"no water" 是绝对化错误。 |
| **insect** (L2) — "a small animal with six legs" | Insect 还有三段体和外骨骼，只说六条腿太简化，会把 mites 误归类。 |
| **bark** — "the sound a dog makes" | bark 还有"树皮"的意思。单一定义忽略了多义性。 |

---

## 2. 例句不自然（母语者一看就觉得奇怪）

| 词 | 例句 | 问题 |
|---|---|---|
| **sandal** | "He wore a sandal to the beach, so sand wouldn't stay in his shoe." | 单数 sandal？谁穿一只凉鞋？应该是 sandals。且 "so sand wouldn't stay in his shoe" 逻辑混乱——穿凉鞋反而更容易进沙子。 |
| **sneaker** | "She put on her sneaker before going to the playground." | 同上，单数 sneaker 极不自然。 |
| **boot** | "He wore a rain boot, so his feet stayed dry." | 又是单数！一只靴子？ |
| **slipper** | "She put on her fuzzy slipper when she got out of bed." | 模式一样——单数鞋类完全不自然。**这是系统性错误。** |
| **lace** | "She pulled the lace tight and tied a bow on her shoe." | 应该是 laces（复数）。 |
| **stomp** | "He would stomp his feet when he was angry." | "would stomp" 用了 habitual past，对 Level 1 孩子来说时态选择太复杂。 |
| **stir** | "She used a spoon to stir the soup." | 没问题，但和 pour/spill/drip 等其他烹饪词一起看，句式太重复（Subject + verb + object）。 |
| **shove** | "The wind would shove the door shut." | "Shove" 通常暗示人为的粗暴推力。风"shove"门不太自然，应该是 slam 或 push。 |
| **fetch** | "The dog ran to fetch the stick I threw." | 可以，但 "fetch" 在现代美式英语中已经偏正式/英式。美国小孩更常说 "get"。 |
| **hear** | "You can hear the crowd cheering at the basketball game from outside." | 句尾的 "from outside" 位置别扭，应该前置："From outside, you can hear..." |
| **score** (L2) | "She managed to score the winning basket just as the buzzer sounded." | Score a basket? 通常说 "score the winning point" 或 "make the winning basket"。 |
| **mention** (L2) | "Please mention your question before we line up." | 不自然。Mention 暗示顺带一提，不适用于正式提问场景。应该是 "ask your question"。 |

---

## 3. 游戏体验差（imageKeyword 问题）

### 太抽象，AI图片生成会出问题

| 词 | imageKeyword | 问题 |
|---|---|---|
| **apart** | "apart separate" | 这怎么生成图片？两个抽象形容词。 |
| **among** | "toy in box full of toys" | 还行，但很容易和 "between" 的图混淆。 |
| **perhaps** | "maybe perhaps" | 纯抽象概念，无法视觉化。 |
| **instead** | "apple chosen instead of candy" | 概念性太强，生成图要传达"选择"和"放弃"两个概念。 |
| **whether** | "child holding coat looking at sky" | 和 weather 容易混淆！拼写本来就是考点。 |
| **unless** | "child eating dinner before going outside" | 这个图其实在描述 "before"，不是 "unless"。 |
| **although** | "cold without jacket" | 和 "foolish" 的图(person walking in rain no umbrella)太像。 |
| **seldom** | "seldom rarely" | 又是两个同义词当关键词，无法视觉化。 |
| **eventually** | "seed growing into flower stages" | 和 "gradually" (L2, "color fade") 的概念太近。 |
| **certain** | "confident child pointing" | 和 "proud" 的图视觉上无法区分。 |
| **moment** | "moment" | 就一个词？这是 placeholder 忘了改吧？ |
| **while** | "while" | 同上，明显是遗漏。 |
| **often** | "often frequently" | 又是两个同义词。 |
| **sudden** | "lightning bolt surprise" | 和 "lightning"（已有专门词条）的图一模一样。 |

### 词间容易混淆的 imageKeyword

| 词对 | 问题 |
|---|---|
| **above** vs **over** (L2) | "bird flying above house" vs "plane"——还行但概念重叠 |
| **below** vs **beneath** | "below under" vs "beneath under"——几乎一样 |
| **leap** vs **jump** (L2) | "leap jump" vs "jump puddle"——图片可能几乎相同 |
| **huge** vs **enormous** vs **gigantic** | 三个大小形容词，图片传达的概念完全一样 |
| **quickly** vs **dash** | "quickly fast" vs "running fast"——同一张图 |
| **loudly** vs **loud** | "loudly" vs "loud"——同一个概念 |
| **frightened** vs **terrified** vs **scared** (L2) | 三个同义词，图片如何区分？ |
| **pile** vs **heap** | 定义几乎一样，图也会一样 |

---

## 4. 教学设计缺陷

### Level 分层不合理

**Level 1 中明显过难的词：**
- **throughout** — 这是学术词汇，CEFR B2 级别，放 Level 1？
- **although** — 连词从句概念，通常 Grade 3-4 才教
- **whether** — 同上，且和 weather 混淆是出了名的考点
- **unless** — 条件从句，Grade 3+
- **eventually** — 时间副词中最难的之一
- **perhaps** — 模态副词，比 maybe 难
- **seldom** — 文学性词汇，日常口语几乎不用
- **drought** — Level 1 孩子（假设 K-1 年级）见过旱灾？
- **spine** — 解剖学词汇放在学前？

**Level 2 中明显过简单的词：**
- **about**, **add**, **again**, **also**, **any**, **arm**, **ask** — 这些是 Kindergarten sight words！放 Level 2 是在浪费用户时间。
- **jump**, **find**, **make**, **little**, **under**, **over** — 同上，Dolch/Fry 一级高频词。
- **bicycle**, **breakfast**, **bring** — 基础生活词汇，不应该和 **fjord**, **javelin**, **parchment** 同级。

### 词的排列无逻辑

Level 1 的顺序：
- 动物 → 食物 → 身体 → 衣服 → 家具 → 邮局 → 文具 → 建筑 → 自然 → 天气 → 植物 → 动作 → 感官 → 方位 → 数量 → 情感 → 时间 → 故事元素...

看起来有主题分组，**但组内没有学习递进**。比如动物部分：
- puppy → kitten → bunny（简单）→ **fawn**（难）→ **foal**（更难）→ pony（简单）

来回跳跃，没有从 familiar → unfamiliar 的梯度。

### Level 2 的结构更混乱

Level 2 前半部分有明确学术主题（阅读术语、科学、社会、数学），后半部分突然变成按字母排列的杂词（从 about 到 rise），最后又是一堆随机的高级名词（admiral, amber, fjord...）。

**明显是三个不同来源拼接的词库，没有统一的编辑标准。**

---

## 5. 竞品对比：Oxford Junior Dictionary 会怎么做

| 维度 | Word Street | Oxford 做法 |
|---|---|---|
| **定义精确度** | 口语化但多处科学错误 | 简明但严谨，不会说 shark 是 fish |
| **例句** | 有系统性单复数错误 | 严格校对，每句都自然 |
| **分级** | Level 1/2 两级，但边界模糊 | 按年龄/年级精确分级，每级有明确语言目标 |
| **词的选择** | Level 2 混入大量 sight words | 避免收录太简单的词，每个词都有教学价值 |
| **文化适应** | 全美式视角（jelly=spread, doughnut拼写）| 标注英式/美式差异 |
| **多义词处理** | bark 只给一个义项 | 标注主要义项并交叉引用 |
| **imageKeyword** | 有遗漏（moment, while）和抽象无法视觉化的问题 | N/A（纸质词典用插画，每张都由插画师绘制） |

---

## 6. 额外发现的"可以打"的点

### 数据质量问题
1. **单数鞋类系统性错误** — sandal, sneaker, boot, slipper, mitten 全用单数。这不是风格选择，是编辑疏漏。会让 ESL 家长困惑孩子到底该用单数还是复数。
2. **imageKeyword 遗漏** — "moment", "while", "often", "seldom" 等词的 imageKeyword 就是词本身或同义词堆砌，明显是 placeholder。
3. **Level 2 有 400+ 个词 vs Level 1 有 500+ 个词** — 按学习理论，高级别应该词量更大，这里反了。

### 竞争论点总结

> "Word Street 的词库存在系统性质量问题：科学定义有多处硬伤（shark≠fish, gas可以被看见），例句有批量性语法错误（单数鞋类），分级设计混乱（Level 1 放 although/unless，Level 2 放 jump/make），且多个 imageKeyword 是明显的 placeholder 未完成状态。我们的产品在准确性、分级科学性和完成度上都有明确优势。"

---

*报告完毕。共发现 11 个定义硬伤、12+ 个不自然例句、15+ 个 imageKeyword 问题、9 个分级错误、1 个系统性语法 bug。*
