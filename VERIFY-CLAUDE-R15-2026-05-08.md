# VERIFY-CLAUDE-R15 — L1+L2 审校报告

**角色:** 竞品公司的人，专找能攻击产品的弱点
**范围:** words-level1.js (600词) + words-level2.js (552词)
**时间:** 2026-05-08 21:15

---

## CRITICAL

无。

---

## HIGH

1. **lose** (words-level1.js) — 定义包含两个不同义项："to not be able to find something, or to not win"。违反QA标准"L1-L2不塞多个意思"。对10岁ESL学生来说，做选择题时会混淆到底考哪个意思。
   - 建议修复: 只保留一个义项。推荐: "to not win a game or contest"（更常见于孩子语境）

2. **hold on** (words-level1.js) — 定义包含两个不相关义项："to grip tight or to wait"。一个是物理动作，一个是时间概念，对孩子会造成混淆。
   - 建议修复: 只保留一个义项。推荐: "to grip something tightly so you don't fall"

---

## MEDIUM

1. **stable** (words-level1.js) — 被proofcheck标记为ADJ_NOUN_MISMATCH（词尾-ble看似形容词但实际是名词）。这是工具误报，不是词库问题，但需要加白名单。

2. **L2中有11个极基础词**（make, dark, find, grow, hurt, jump, move, near, over, little, under）— 这些是Dolch/Fry词表中的high-frequency words，通常K-1年级就掌握。作为竞品，可以攻击"词库分级不精准"。但这些词在游戏中有功能价值（简单词穿插难词，降低挫败感），属于设计选择。

3. **lose** 的例句 "Our team didn't want to lose the basketball game, so we practiced every day." — 如果改定义为单义"to not win"，例句无需改。

4. **trade** (words-level1.js) — 定义"to give something and get something back"被proofcheck标为VAGUE（用了两次"something"），但这对L1来说是合理的简化。

5. **caterpillar** (words-level1.js) — 定义"a small worm-like insect that becomes a butterfly or moth"严格来说是双义（butterfly or moth），但这里是同一个概念的完整表述，不算违反单义原则。

---

## 建议固化项

- 🔧 [proofcheck规则] 加"多义项检测"：当L1-L2定义中出现 `, or to ` 或包含两个独立动词短语用 `or` 连接时，标记为 HIGH（`MULTI_MEANING`）。正则: `/,?\s+or\s+to\s+/` 对level 1-2
- 🔧 [白名单] `stable` 应加入 ADJ_NOUN_MISMATCH 白名单（实际是名词，不是形容词）
- 🔧 [白名单] 定义中"X or Y"如果是同一概念的并列（如"butterfly or moth"、"bear or lion"）不应触发多义项规则。建议白名单: 动物并列、同义词并列
- 🔧 [标准更新] QA-STANDARD.md 应明确：什么算"多义"vs"同一概念的完整表述"。建议标准：两个义项是否需要不同的例句来展示？如果是，就算多义。

---

## 整体评估

L1+L2词库质量在出版级水平。600+552=1152词中只发现2个HIGH（多义项违规），0 CRITICAL。定义简洁、例句自然、语法正确。作为竞品能攻击的主要弱点：
1. 2个多义项违规（容易修复）
2. L2含少量过于基础的词（设计选择，不算硬伤）
3. proofcheck的MINOR误报（ADJ_NOUN_MISMATCH对-ary/-ory/-ble等实际名词后缀）

**结论：修复2个HIGH后，L1+L2达到连续CLEAN标准。**
