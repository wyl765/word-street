# VERIFY-CLAUDE-R18-2026-05-08
**角色:** 竞品公司的人，专找能攻击产品的弱点
**范围:** L1 (600词) + L2 (548词)
**关注:** R17修复后残留问题 + 系统性pattern检测

## CRITICAL
无CRITICAL问题。

## HIGH

### 1. L1定义大量使用"liquid"（L2词汇）
以下6个L1词的定义都用了"liquid"，但liquid本身是L2词：
- **glue**: "a sticky liquid that holds things together"
- **pour**: "to make liquid flow out"
- **spill**: "to let liquid fall by accident"
- **drip**: "when liquid falls drop by drop"
- **melt**: "to change from hard to soft or liquid"
- **juicy**: "full of liquid inside"

建议修复：
- glue → "a sticky stuff that holds things together"
- pour → "to make water or juice flow out of something"
- spill → "to let water or juice fall by accident"
- drip → "when water falls drop by drop"
- melt → "to change from hard to soft, like ice becoming water"
- juicy → "full of juice inside"

### 2. [monster] (L1) — 用了"creature"（L2a词汇）
- 定义: "a scary creature in stories"
- 建议: "a scary thing in stories that is not real"

### 3. [glue] (L1) — 双重问题
- 除了"liquid"外，"holds things together"可能也抽象
- 建议: "a sticky stuff you use to stick things together"

## MEDIUM

### 4. [adventure] (L1) — 用了"event"
- 定义: "an exciting trip or event"
- 建议: "an exciting trip where fun things happen"

### 5. [mirror] (L2) — 用了"surface"和"reflection"
- 定义: "a surface that shows your reflection"
- 建议: "a shiny flat thing that shows your face when you look at it"

### 6. [bagpipe/banjo/harp] (L2) — 用了"instrument"
- bagpipe: "a musical instrument with pipes and a bag"
- banjo: "a round stringed instrument you pluck"
- harp: "a tall stringed instrument you pluck"
- 建议: 保持。"instrument"在这些词的语境下可以通过imageKeyword补充理解，且这些都是L2词。

### 7. [cork] (L2) — 用了"material"
- 定义: "a light material used to seal bottles"
- 建议: "a soft light thing used to close wine bottles"

## 建议固化项

- 🔧 [proofcheck规则] **L1_USES_L2_WORDS**: 自动检测L1定义中使用的L2+词汇。实现方式：加载所有level文件，建立词→level映射，然后检查每个L1定义中是否包含level≥2的词。标记为MAJOR。关键高频违规词：liquid, creature, material, surface, instrument, object, event, reflection。
- 🔧 [禁词] L1定义禁用词增加：liquid, creature, material, surface, reflection, instrument（这些都是L2+词汇）
- 🔧 [白名单] "instrument"在L2音乐词条定义中可接受（bagpipe/banjo/harp等），因为instrument本身也在L2。
- 🔧 [标准更新] QA-STANDARD.md第二节"定义标准"增加明确规则：L1定义禁止使用L2+词汇（除非该词是最基本的1000词）。
