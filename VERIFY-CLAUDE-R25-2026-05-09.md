# VERIFY-CLAUDE-R25 — Word Street L1+L2 词库审校（竞品角色）

**角色设定：** 竞品公司的人，专找弱点来攻击产品。
**审校范围：** Level 1 (600词) + Level 2 (548词) = 1148词
**日期：** 2026-05-09 04:30 CST

---

## 发现概览

经过R19-R24共6轮L1/L2审校+修复，词库质量已大幅提升。本轮重点找残留的结构性问题。

- CRITICAL：0 条
- HIGH：3 条

---

## HIGH 问题

### 1) pile / heap — 循环定义（学生无法从定义中学到新知识）
- **词条：** `pile` (words-level1.js) + `heap` (words-level1.js)
- **字段：** definition
- **当前：**
  - pile = "a messy heap of things on top of each other"
  - heap = "a big messy pile"
- **问题（可证伪）：** 两个词的定义互相引用对方。一个MAP 197学生如果不认识"pile"，看定义会遇到"heap"（也不认识）；反过来也一样。循环定义让两个词都无法从定义中独立理解。
- **测试用例：** 给不认识pile和heap的学生依次展示两个定义卡片。学生无法从中获取新信息——第一张卡用了第二张卡的词，第二张卡又用了第一张卡的词。
- **外部证据：** Merriam-Webster:
  - pile = "a quantity of things heaped together" (uses "heaped" but also has standalone meaning)
  - heap = "a collection of things thrown one on another: PILE" (directly circular in MW too, but they have multiple senses)
  - https://www.merriam-webster.com/dictionary/pile / https://www.merriam-webster.com/dictionary/heap
- **建议改法：**
  - pile: "a lot of things on top of each other" (去掉heap)
  - heap: "a big messy group of things thrown together" (去掉pile)

---

### 2) sour / lemon — 软循环定义（两个L1词互相引用）
- **词条：** `sour` (words-level1.js) + `lemon` (words-level1.js)
- **字段：** definition
- **当前：**
  - sour = "a sharp taste like lemon"
  - lemon = "a sour yellow fruit"
- **问题（可证伪）：** 如果学生不认识"sour"，看lemon的定义会遇到"sour"（不认识）；而sour的定义又指向"lemon"。虽然比pile/heap轻（因为sour定义有"sharp taste"作为独立解释），但lemon定义中的"sour"对ESL学生来说仍是一个未知词依赖。
- **测试用例：** 假设学生先抽到"lemon"卡。定义说"a sour yellow fruit"。如果不认识sour，学生只知道"一个黄色的fruit"，缺失了核心语义信息（味道）。
- **外部证据：** Oxford Learner's: lemon = "a yellow citrus fruit with a lot of sour juice" — 也用sour，但Oxford面向的读者已有基础词汇。ESL L1不应假设学生知道sour。
  - https://www.oxfordlearnersdictionaries.com/definition/english/lemon
- **建议改法：**
  - lemon: "a yellow fruit that tastes sharp and not sweet" (去掉sour，用L1-safe的描述)

---

### 3) mushroom — 定义中"wet, dark places"过度限定（事实不够准确）
- **词条：** `mushroom` (words-level1.js)
- **字段：** definition
- **当前：** "a soft thing with a round top that grows in wet, dark places"
- **问题（可证伪）：** 许多常见蘑菇生长在草地（field mushrooms）、林间阳光处（chanterelles）、甚至枯木上（shiitake）。"wet, dark places"是一个常见误解。如果学生在草地上看到蘑菇，会因为定义说"wet, dark places"而认为那不是mushroom。
- **测试用例：**
  - Q: You see a mushroom growing in a sunny field. Is it a real mushroom?
  - 按当前定义，学生可能答"No, because mushrooms grow in wet, dark places"。但答案是Yes。
- **外部证据：** Merriam-Webster: mushroom = "an enlarged complex aboveground fleshy fruiting body of a fungus" — 不限定生长环境。
  - https://www.merriam-webster.com/dictionary/mushroom
  - 实际上，button mushroom (最常见的食用菇) 虽起源于堆肥，但超市里孩子看到的蘑菇并不在"wet, dark places"
- **建议改法：** "a soft thing with a stem and a round top that is not a plant" 或 "a living thing shaped like an umbrella that grows on the ground or on trees"

---

## 建议固化项

- 🔧 [proofcheck规则] SYNONYM_CYCLE检测应覆盖同level内的软循环（A定义包含B、B定义包含A），当前可能只检测完全相同定义。建议加一条：同level内，如果word A的definition包含word B，且word B的definition包含word A，报HIGH。
- 🔧 [白名单] proofcheck的CULTURE_SPECIFIC对"prom"的检测产生大量误报——任何包含"prom"子串的词（promise, promote, prompt, promptly, compromise等）都被标记。建议将子串匹配改为全词匹配（word boundary `\bprom\b`），或者将这些词加入白名单。当前163 MINOR里有约10条是这个误报。
- 🔧 [标准更新] QA-STANDARD.md六B中提到的register-check.mjs、sense-frequency-check.mjs等"待建"工具，应标注优先级和计划日期，避免每次审校都提到但没人建。

---

*审校完成。L1+L2经过多轮修复后，硬伤已基本清除。剩余问题为结构性循环定义和一条事实精度问题。*
