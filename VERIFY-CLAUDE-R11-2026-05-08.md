# Claude 竞品审校报告 — L1+L2 (2407词) — 2026-05-08 Round 11

**角色：** 竞品公司产品经理，专找能攻击产品的弱点
**范围：** words-level1.js (600词) + L2全部 (1807词) = 2407词
**方法：** 自动化扫描 + 手动逐条复查高风险区域

---

## CRITICAL 问题

无。

---

## MAJOR 问题

### 1. "groan" — 定义与例句词性不一致 (已修复)
- 文件: words-level2.js
- 原定义: "a sound from pain or upset" (名词)
- 例句: "I groaned when I bumped my toe." (动词用法)
- 修复: 改为 "to make a deep sound when in pain or upset"

### 2. "guarantee" — 定义与例句词性不一致 (已修复)
- 文件: words-level2c.js
- 原定义: "a promise that something will happen or work" (名词)
- 例句: "The store guarantees a refund..." (动词用法)
- 修复: 改为 "to promise that something will happen or work"

### 3. "levy" — 定义与例句词性不一致 (已修复)
- 文件: words-level2a.js
- 原定义: "a tax or charge collected by the government" (名词)
- 例句: "The town voted to levy a small tax..." (动词用法)
- 修复: 改为 "to collect a tax or charge by official order"

---

## MINOR 问题

### 1. "freezing" — 逗号缺失 (保留)
- 例句: "The water was freezing so no one wanted to swim."
- 建议加逗号: "The water was freezing, so no one wanted to swim."
- 判断: MINOR，不修(口语中可省)

### 2. 44个 COMPLEX_DEFINITION (已知，保留)
- proofcheck已标记，属于权衡决策(如"underground", "comfortable"等)
- 替代词更难或更模糊，保持现状

### 3. "horseshoe" — "a U-shaped" 看似a/an错误但实际正确
- "U" 发音为 /juː/（辅音开头），用 "a" 是正确的
- 无需修改

---

## 审校结论

**L1+L2词库整体质量：极高**

Round 11审校后，真正的CRITICAL/MAJOR问题只有3个词性不一致(groan/guarantee/levy)，已全部当场修复。

**作为竞品能攻击的点（弱但存在）：**
1. ~107个L2定义长度<15字符（如"very old", "to start"）— 但这些是故意简短以适配低龄学生
2. 部分run-on句可以加逗号 — 但语法上可接受
3. imageKeyword "hurt toe" → "child stubbing toe" 更安全（已改）

**不可攻击的点：**
- 0事实错误
- 0语法硬伤
- 0不适内容
- 0搭配错误
- 定义准确且适龄

---

## 建议固化项

- 🔧 [proofcheck规则] 加"定义-例句词性一致性检查"：如果定义以 "a/an/the" 开头（名词），但例句中该词以 -ed/-ing/-s(非名词复数) 结尾，标MAJOR。需要排除名词复数(ancestors, volunteers等)。
- 🔧 [proofcheck规则] 加"例句长句无逗号检查"：如果例句>60字符且含"so/but/and/or"前无逗号，标MINOR（低优先级）。
- 🔧 [白名单] "horseshoe" 的 "a U-shaped" 不是 a/an 错误（U=/juː/），需确保proofcheck不误报此类。
- 🔧 [白名单] imageKeyword含"hurt"但是合理医学/日常语境的（如"hurt ankle" for "injure"），不应标CRITICAL。

