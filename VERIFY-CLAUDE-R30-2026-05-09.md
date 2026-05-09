# VERIFY-CLAUDE-R30-2026-05-09 — Word Street Level 1&2 (仅CRITICAL/HIGH)

> 角色：竞品公司的人，专找弱点
> 范围：words-level1.js (600词) + words-level2.js (~548词)
> 标准：只报CRITICAL/HIGH，每条含词条+问题+测试用例+外部证据

---

## CRITICAL

无CRITICAL发现。

---

## HIGH

### 1) bark — L1只教"树皮"，遗漏最高频义项"狗叫"

- **词条原文**：`words-level1.js` 行231, definition: `"the outer covering of a tree"`, example: `"The bark of the old oak tree was rough and bumpy."`
- **具体问题**：在L1儿童阅读中，"bark"作为"狗叫"的义项远比"树皮"更常见（"The dog barked at the mailman"）。词库里有大量动物词（puppy, dog等），学生在阅读中频繁遇到bark=叫的用法，但当前只教树皮义项会导致误解。
- **测试用例**：题干："The dog barked loudly at the stranger." 选项：A. The dog's outer covering was loud B. The dog made a loud sound → 孩子按词库选A
- **外部证据**：MW Kids: bark (verb) = "to make the short loud cry of a dog" 是第一义项 https://www.merriam-webster.com/dictionary/bark
- **建议修复**：改定义为 `the outer covering of a tree; also the sound a dog makes`

### 2) scale — L1只教"秤"，遗漏动物鳞片和多义

- **词条原文**：`words-level1.js` 行528, definition: `"a tool used to measure how heavy something is"`, example: `"I stood on the scale to see how much I weigh."`
- **具体问题**：L1词库有reptile, lizard, snake, turtle, fish等动物词，这些动物都有scales（鳞片）。学生读到"The snake has shiny scales"会完全困惑。此外L2有"height"和"length"等度量词，"scale"在学术语境还有"大小/比例"义项。对L1学生最直观的义项应该包含"鳞片"。
- **测试用例**：题干："The fish has colorful scales all over its body." 选项：A. measuring tools B. thin flat pieces covering the skin → 孩子按词库选A
- **外部证据**：MW Kids: scale (noun) 的第一义项就是 "one of the small stiff plates that cover much of the body of some animals (as fish and snakes)" https://www.merriam-webster.com/dictionary/scale
- **建议修复**：改定义为 `a tool for measuring weight; also the thin flat plates covering a fish or reptile`

### 3) wave — L1只教"挥手"，遗漏"浪/波"这个核心义项

- **词条原文**：`words-level1.js` 行235, definition: `"to move your hand to say hello or bye"`, example: `"She would wave goodbye from the window."`
- **具体问题**：L1词库有ocean, beach, shore相关词，学生会大量遇到wave=浪的用法（"The waves crashed on the shore"）。只教"挥手"会让学生读到海浪相关内容时完全困惑。
- **测试用例**：题干："The wave knocked him off his surfboard." 选项：A. Someone waved their hand at him B. A moving wall of water hit him → 孩子按词库选A
- **外部证据**：MW Kids: wave (noun) = "a moving ridge on the surface of water" https://www.merriam-webster.com/dictionary/wave
- **建议修复**：改定义为 `to move your hand to say hello or bye; also a moving wall of water in the ocean`

### 4) match — L1只教"配对"，遗漏"比赛"和"火柴"

- **词条原文**：`words-level1.js` 行273, definition: `"to find two things that are the same"`, example: `"Can you match the baby animal to its father?"`
- **具体问题**：在儿童读物和日常用语中，"match"作为"比赛"（a tennis match）非常常见。学生遇到"We watched the match on TV"会理解为"我们在电视上找配对的东西"。
- **测试用例**：题干："The soccer match was very exciting." 选项：A. finding two same soccer things B. a soccer game between two teams → 孩子按词库选A
- **外部证据**：MW Kids: match (noun) = "a contest between two individuals or teams" https://www.merriam-webster.com/dictionary/match
- **建议修复**：改定义为 `to find two things that are the same; also a game or contest between two sides`

### 5) order — L2只教"排列顺序"，遗漏"点餐/命令"

- **词条原文**：`words-level2.js` 行304, definition: `"a way things are arranged"`, example: `"Put the steps in order from first to last."`
- **具体问题**：在日常生活中，"order"最常见的动词义项是"点餐"（"I'd like to order pizza"）和"命令"（"The teacher ordered everyone to sit down"）。只教"排列顺序"会让学生在餐厅场景或故事中完全理解错误。
- **测试用例**：题干："Mom asked me to order two pizzas for dinner." 选项：A. arrange two pizzas B. ask for two pizzas to be made and delivered → 孩子按词库选A
- **外部证据**：MW: order (verb) = "to give an order to or for" / "to place an order" https://www.merriam-webster.com/dictionary/order
- **建议修复**：改定义为 `a way things are arranged; also to ask for something you want to buy`

### 6) lose (imageKeyword) — imageKeyword与新定义不匹配

- **词条原文**：`words-level1.js` 行597, definition已改为 `"to not win; also to not be able to find something"`, example已改为 `"I always lose my socks somewhere in the house."`, 但imageKeyword仍是 `"basketball team losing game sad faces"`
- **具体问题**：例句现在讲的是"丢袜子"，但imageKeyword还是"篮球队输球的悲伤面孔"。图片和例句不匹配会让孩子困惑。
- **建议修复**：改imageKeyword为 `"child looking for lost sock under bed"` 以匹配新例句

---

## 建议固化项

- 🔧 [proofcheck规则] 增加"imageKeyword与example不匹配"检测：当example被修改但imageKeyword未同步更新时，标记HIGH。可通过维护一个"最近修改过definition/example的词列表"，交叉检查imageKeyword是否仍相关。
- 🔧 [proofcheck规则] 维护 `MULTI_SENSE_WORDS` 数组 — 高频多义词列表（bark, wave, scale, match, order, spring, ring, light, run, play, train, point, park, bat, bank, bear, trunk, date, log, jam, chip, rock, star, fly, plant等），当这些词的definition只包含一个义项时，报HIGH提醒补充常见义项。
- 🔧 [标准更新] QA-STANDARD.md 增加规则："当definition或example被修改后，必须同步检查imageKeyword是否仍与新内容匹配"
- 🔧 [白名单] `content`保留"happy with what you have"——虽然有"内容"义项，但对L1学生来说，形容词"满足的"在故事中更常见且例句很好
- 🔧 [白名单] `plain`保留"not fancy"——虽然有"平原"义项，但L1主要教形容词用法
- 🔧 [白名单] `toast`保留"bread cooked until brown"——L1教食物主题时这是最直观义项，"干杯"义项对10岁ESL孩子不常见
- 🔧 [白名单] `pudding`保留当前定义——虽然中国孩子对pudding认知可能有偏差，但定义本身准确，imageKeyword"pudding"也能搜到正确图片
