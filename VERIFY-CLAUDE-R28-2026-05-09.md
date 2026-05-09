# VERIFY-CLAUDE-R28-2026-05-09 — Word Street Level 1&2 (仅CRITICAL/HIGH)

> 角色：竞品公司的人，专找弱点
> 范围：words-level1.js (600词) + words-level2.js (552词)
> 标准：只报CRITICAL/HIGH，每条含词条+问题+测试用例+外部证据

---

## CRITICAL

无新CRITICAL发现。R27的gas/angle/amber定义-例句矛盾已全部修复。

---

## HIGH

### 1) scale — `words-level1.js`
- **词条原文**：definition: `a flat hard piece on a fish's body`
- **具体问题**：只教"鱼鳞"义项。但"scale"在L1-L2数学/科学语境中最常见的是"秤/刻度"——"a bathroom scale weighs you"、"a scale from 1 to 10"。如果标准化考试出现"Use a scale to weigh the object"，孩子会理解为"用鱼鳞称东西"。
- **测试用例**：题干："The nurse used a scale to check my weight." 选项：A. a tool for measuring weight  B. a flat hard piece on a fish  → 孩子选B
- **外部证据**：
  - MW Kids (scale): 第一义项 "a device for weighing"，鱼鳞义项排第四
  - https://www.merriam-webster.com/dictionary/scale
- **建议修复**：改为教"weighing"义项：`a tool used to measure how heavy something is` + 例句改为 "We stood on a scale to see how much we weighed."

### 2) close — `words-level2.js`
- **词条原文**：definition: `to shut`
- **具体问题**：只教"关闭"动词义项。但"close"作形容词("near")在L2阅读中极高频——"Stay close to me"、"a close friend"。如果阅读理解出"We are very close"，孩子会困惑"我们很关闭？"
- **测试用例**：题干："My grandma lives close to us." 选项：A. shut  B. near  → 孩子按词库选A
- **外部证据**：
  - OALD (close adj): "near in space or time"
  - https://www.oxfordlearnersdictionaries.com/definition/english/close_1
- **建议修复**：因为L2已有"near"，可以保留教"shut"义项但在定义里加消歧："to shut something like a door or window"

### 3) block — `words-level2.js`
- **词条原文**：definition: `a hard piece of wood, stone, or other material`
- **具体问题**：只教物理"块"义项。但"block"在美国校园/社区语境中最常见的是"街区"——"walk two blocks"、"around the block"。对将来在美国学习的Mark来说，不教街区义项是重大遗漏。
- **测试用例**：题干："The store is two blocks from our school." 选项：A. pieces of wood  B. sections of a street  → 孩子选A
- **外部证据**：
  - MW Kids (block): "a section of a city enclosed by streets" 列为重要义项
  - https://www.merriam-webster.com/dictionary/block
- **建议修复**：改定义为 `a section of a street between two corners` 或教更常用的"街区"义项

### 4) model — `words-level2.js`
- **词条原文**：definition: `a small copy of something`
- **具体问题**：只教"模型/缩小版"义项。但在学术语境中"model"更常见的是"榜样/示范"——"a role model"、"model behavior"。例句是做太阳系模型，这没问题，但如果阅读出现"She is a model student"孩子会困惑。
- **测试用例**：题干："He is a model student." 选项：A. a small copy  B. an example to follow  → 孩子选A
- **外部证据**：
  - OALD (model): "a person or thing that is considered an excellent example"
- **建议修复**：当前义项不算错，但建议在定义里明确场景："a small copy of a real thing" (加"real"让定义更精确)

### 5) about — `words-level2.js`（重新评估R27遗留项）
- **词条原文**：definition: `on the subject of`
- **评估**：R27 GPT提出"approximately"高频义项缺失。我重新评估：对MAP 197学生，"about 10 minutes"这种用法确实在数学应用题中极其常见。但L2同时教两个义项会增加认知负荷。**保留现状**，理由：例句清晰消歧，且L2已有其他表示"大约"的词汇铺垫（如"almost"在L1）。
- **判定**：不需要修改。

---

## 建议固化项

- 🔧 [proofcheck规则] 增加"高频多义词主义项检查"：维护一个 `PRIMARY_SENSE_MAP` 数据结构（如 `{scale: "weighing device", close: "near/shut", block: "city block/piece"}`），当词库中的definition明显教的是次要义项时，标记为 HIGH 提示。
- 🔧 [标准更新] QA-STANDARD.md 增加规则："对高频多义词，如果只教一个义项，必须教MW/OALD排序中的第一义项，除非有明确教学理由教其他义项（需在注释中说明）"
- 🔧 [白名单] `about` 保留"on the subject of"，属于有意教学选择（L1已有"almost"覆盖近似义项）
- 🔧 [白名单] `bark` 已改为"tree bark"（R28修复），属于有意选择——tree bark是名词义项，在自然科学阅读中比动词义项更重要

无新建议用于搭配规则、禁词、新工具。
