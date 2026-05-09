# VERIFY-CLAUDE-R27-2026-05-09 — Word Street Level 1&2 (仅CRITICAL/HIGH)

> 角色：竞品公司的人，专找弱点
> 范围：words-level1.js (600词) + words-level2.js (552词)
> 标准：只报CRITICAL/HIGH，每条含词条+问题+测试用例+外部证据

---

## CRITICAL

### 1) amber — `words-level2.js`
- **词条原文**：definition: `a warm golden-yellow color` / example: `The amber stone had a tiny bug inside.`
- **具体问题**：定义改为只教"颜色"义项后，例句仍然引用物质义项（"amber stone had a tiny bug inside"指的是琥珀化石，不是颜色）。颜色不可能"have a tiny bug inside"。定义和例句严重矛盾，孩子会困惑"颜色怎么有虫子"。
- **测试用例**：问孩子"What is amber?"答"a color"→再问"Can a color have a bug inside?"孩子无法回答。
- **外部证据**：
  - 如果教颜色义项，例句应为："The traffic light turned amber before red."
  - 如果教物质义项，定义应为："a hard golden stone made from ancient tree resin" (MW: "a hard translucent fossil resin")
- **建议修复**：例句改为 `The leaves turned a beautiful amber in the fall.` 保持定义教颜色义项

---

## HIGH

### 2) act — `words-level2.js`
- **词条原文**：definition: `to perform a part in a play or show`
- **具体问题**：只教戏剧义项，但"act"最常用的意思是"做，行动"。L2学生将来读到"act quickly"会理解为"演戏quickly"。Merriam-Webster第一义项就是"to take action"，戏剧义是后面的。教低频义项给ESL学生是误导。
- **测试用例**：阅读理解题"The fireman must act fast to save the cat."孩子选"表演"而非"行动"。
- **外部证据**：
  - MW (act, verb, sense 1): "to take action : move"
  - MW (act, verb, sense 4): "to perform on the stage"
- **建议修复**：`to do something; to take action` + 例句改为 `We must act fast before the ice cream melts.`

### 3) squirrel — `words-level1.js`
- **词条原文**：definition: `a small animal with a bushy tail`
- **具体问题**：定义无法区分squirrel和fox（fox也有bushy tail）、dog品种（如Pomeranian）等。缺少关键区分特征"climbs trees"或"collects nuts"。
- **测试用例**：选择题配图4张动物（squirrel/fox/Pomeranian/cat），问"Which one is a small animal with a bushy tail?"——fox和Pomeranian都符合。
- **外部证据**：
  - OALD: "a small animal with a long bushy tail, that climbs trees and eats nuts"
  - MW: "any of various small or medium-size rodents of the family Sciuridae"
- **建议修复**：`a small animal with a bushy tail that climbs trees and collects nuts`

### 4) hollow vs empty — `words-level1.js`
- **词条原文**：
  - hollow: `with nothing in it at all`
  - empty: `with nothing inside`
- **具体问题**：两个不同词的定义几乎完全相同。选择题如果这两个词同时出现在选项里，孩子无法区分。hollow强调的是"内部是中空的"（物理结构），empty强调的是"容器里没东西了"（状态）。
- **测试用例**：quiz问"with nothing in it at all"是什么词？hollow和empty都对，无法作答。
- **外部证据**：
  - MW hollow: "having an unfilled or hollowed-out space within"
  - MW empty: "containing nothing"
  - OALD hollow: "having a hole or empty space inside"
- **建议修复**：hollow → `having a hole or empty space inside` (强调结构) / empty保持不变(强调状态)

### 5) caterpillar — `words-level1.js`
- **词条原文**：definition: `a worm-like insect that later becomes a butterfly or moth`
- **具体问题**："worm-like insect"表述矛盾——worm明确不是insect，所以"像worm的insect"会让学过worm的孩子困惑。caterpillar是insect的幼虫，说"worm-like"暗示它像worm，但又说它是insect，这两个信息冲突。
- **测试用例**：孩子学了worm（"no legs, lives in dirt"）再学caterpillar（"worm-like insect"），会问"it has legs or not? Is it a worm or an insect?"
- **外部证据**：
  - OALD: "a small creature like a worm with legs, that develops into a butterfly or moth"
  - Cambridge Kids: "a small, long animal with many legs that changes into a butterfly or moth"
- **建议修复**：`a small crawling creature with many legs that later becomes a butterfly or moth`

### 6) act (L2) vs take (L1) 歧义
- **词条**：
  - take (L1): `to get hold of something with your hands`
  - act (L2): `to perform a part in a play or show`
- **具体问题**：take的定义只教"拿取"物理义项，但L1例句中有很多"take a cookie"这种用法。更重要的是，如果act只教表演义项，那"take action"这个高频搭配两个词都教错了。
- **建议**：此项为info级，不需要修take，但act必须教action义项。

---

## 建议固化项

- 🔧 [proofcheck规则] 定义-例句一致性检查：如果definition是关于颜色("color"/"colored"在定义中)，但example中出现物理实体描述("stone"/"rock"/"gem"/"crystal"+"inside"/"contains")，标记为CRITICAL（定义-例句矛盾）。
- 🔧 [proofcheck规则] 定义唯一性检查增强：检测同level内两个词的definition Jaccard相似度>80%，当前quiz-test已有但阈值可能需要更细粒度——"with nothing in it"和"with nothing inside"应该被捕获。
- 🔧 [proofcheck规则] 动物定义区分性检查：如果定义中唯一的区分词是形容词(如"bushy")，而没有行为/栖息地/分类特征，标记为MAJOR。
- 🔧 [禁词] 在L1动物定义中禁用"worm-like"搭配"insect"（自相矛盾的分类描述）。
- 🔧 [标准更新] QA-STANDARD.md增加一条："当定义只教一个义项时，必须教该词的最高频义项（参考MW义项排序），不能只教低频义项。"
- 🔧 [新工具] 建议扩展dict-verify.mjs：增加"定义-例句语义一致性"检测——如果定义中的核心名词和例句中的核心名词属于不同语义类别，标记为异常。
