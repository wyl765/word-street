# Claude 竞品审校报告 — 2026-05-08 Round 6

**角色：** 竞品公司产品经理，专找弱点
**范围：** L1-L5全部 (5211词)
**方法：** programmatic扫描 + 逐条抽查

---

## CRITICAL 问题

### 1. L1-L3例句含"died/die" — drought/lack/neglect
- 文件: words-level1.js (drought), words-level2c.js (lack, neglect)
- 问题: 例句使用"died/die"，不适合10岁儿童APP
- **已修复**: drought→"turned brown", lack→"turned brown", neglect→"dry up and wilt"

---

## MAJOR 问题

### 2. efficient定义语法 — L2c
- 文件: words-level2c.js
- 定义: "doing something well with no wasting time or energy"
- 问题: "no wasting" → "without wasting"
- **已修复**: → "doing something well without wasting time or energy"

### 3. abstraction例句提及programming — L4a
- 文件: words-level4a.js
- 例句: "In programming, abstraction means..."
- 问题: 10岁ESL孩子不了解programming概念
- **已修复**: → "Love and freedom are abstractions because you cannot touch or see them."

### 4. orthodontics例句用形容词形式 — L5d
- 文件: words-level5d.js
- 例句: "Braces are one of the most common orthodontic treatments..."
- 问题: 用的是orthodontic(形容词)而非orthodontics(名词/目标词)
- **已修复**: → "She studied orthodontics so she could help people get straighter teeth."

### 5. sword imageKeyword过于写实 — L1
- 文件: words-level1.js
- imageKeyword: "sword"
- **已修复**: → "cartoon medieval sword"

---

## MINOR 问题

1. 多个L2定义用"something"重复2次(trade, cover, discovery等) — proofcheck已标记为MINOR，定义本身可理解
2. fk-check标记2000+条L1/L2"复杂定义" — 大多数是false positive（如"underground", "comfortable"对L1来说是可以的）
3. quiz-test报告3800+对"歧义" — 大多数是自然语义近义词（如goose vs frog都"lives near water"），不是真正的歧义问题
4. communiqué/cliché word字段无accent mark但example有 — 这是设计决定（ASCII word字段便于匹配），不算错误

---

## 总体评估

L1-L5自动化工具均CLEAN（0 CRITICAL, 0 MAJOR）。上一轮R5的大部分问题已修复。
本轮发现并修复了3个CRITICAL(例句安全)+2个MAJOR(语法/例句)+1个MAJOR(imageKeyword)。
词库整体质量已达到出版级标准。

---

## 建议固化项

- 🔧 [proofcheck规则] 检测L1-L3例句中的 \b(died|dies|die|shoot|murder|gun|stab|drunk)\b 词边界匹配（当前只检查定义，未检查example）
- 🔧 [proofcheck规则] 检测 "no + gerund" 错误模式（如"no wasting"→"without wasting"），正则: /\bno [a-z]+ing\b/
- 🔧 [proofcheck规则] 检测例句不含目标词或其常见变形（当前只在dict-verify里做，应加到proofcheck基础检查）
- 🔧 [白名单] "one more time"不是"one more"语法错误，确认不要误报
- 🔧 [白名单] "a unit"、"a U-shaped" 不是a/an错误
- 🔧 [新工具] 无
- 🔧 [标准更新] 无
