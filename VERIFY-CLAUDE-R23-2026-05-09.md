# VERIFY-CLAUDE-R23 — Word Street L3 词库审校（竞品角色）

角色设定：竞品公司的人，专找弱点。

审校对象：Level 3（words-level3.js + words-level3a.js + words-level3b.js + words-level3c.js），共741词。
目标用户：10岁中国ESL男孩，MAP 197（约2年级阅读）。

---

## 已直接修复的问题

### 🔴 CRITICAL

1. **baroque** (L3, words-level3a.js) — example 语法错误
   - 原文: "The baroque palace had gold ceilings painted angels, and curving staircases."
   - 问题: "gold ceilings painted angels" 缺逗号，读成 "ceilings painted angels" 语义不通
   - 修复: "gold ceilings, painted angels, and curving staircases."

### 🟠 HIGH

2. **chaplain** (L3, words-level3a.js) — definition 缺逗号
   - 原文: "a religious leader who works in a hospital school, or army"
   - 问题: "hospital school" 读成复合名词，应为 "hospital, school, or army"
   - 修复: "a religious leader who works in a hospital, school, or army"

3. **gaffe** (L3, words-level3b.js) — definition 用词 "mainly" 对10岁孩子不自然
   - 修复: "an embarrassing mistake, especially in public"

4. **garb** (L3, words-level3b.js) — definition 用词 "mainly" 同上
   - 修复: "clothing, especially of a certain kind"

5. **intrigue** (L3, words-level3c.js) — definition 用 "keen" 对ESL孩子不直觉
   - 修复: "to make someone very curious and interested"

6. **6对重复imageKeyword** — 同level内imageKeyword完全相同会导致图片游戏混淆
   - normal/typical: "normal day" → typical改为 "typical school day schedule"
   - dehydrate/hydrate: "drinking water" → dehydrate改为 "dry cracked soil thirsty"
   - bastion/fortress: "stone fortress" → bastion改为 "castle defense walls"
   - ethereal/lithe: "graceful dancer" → ethereal改为 "dreamy floating dancer"
   - expel/spout: "whale spout" → expel改为 "pushing someone out door"
   - raining cats and dogs/downpour: "heavy rain" → downpour改为 "sudden rainstorm"

---

## 未发现额外CRITICAL/HIGH问题

L3词条整体质量较好。定义清晰，例句自然，用词难度合理。

---

## 建议固化项

- 🔧 [proofcheck规则] **重复imageKeyword检测**：同level内如果两个词条imageKeyword完全相同，标记为MAJOR。当前proofcheck未检测imageKeyword重复。
- 🔧 [proofcheck规则] **例句缺逗号的列举模式**：检测 "X Y, and Z" 格式中X和Y之间是否缺逗号（三项列举必须两个逗号），正则: `/(\w+)\s+(\w+),\s+and\s+(\w+)/` 对definition和example字段检查。
- 🔧 [proofcheck规则] **definition中的"mainly"**：对L1-L3定义中出现 "mainly" 标记为MINOR（建议用 "especially" 替代）。正则: `/\bmainly\b/i`
- 🔧 [白名单] "meter" 的circular detection（定义含"centimeters"不是真循环，是合法的单位定义）
- 🔧 [标准更新] 在QA-STANDARD.md中明确：同level内imageKeyword不能完全相同，必须有视觉区分度。
