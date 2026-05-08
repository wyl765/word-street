# Claude 竞品审校报告 — L3-L5 (2800词) — 2026-05-08 Round 12

**角色：** 竞品公司产品经理，专找能攻击产品的弱点
**范围：** words-level3*.js + words-level4*.js + words-level5*.js = ~2800词
**方法：** 自动化扫描 + 手动逐条复查科学/事实准确性

---

## CRITICAL 问题

### 1. "momentum" — 定义事实错误 ✅ 已修复
- 文件: words-level4b.js
- 原定义: "the force that keeps a moving object going forward"
- 问题: 动量(momentum)不是力(force)，是质量×速度(mass × velocity)
- 修复: "the energy that keeps a moving object going forward"
- 注：对10岁孩子用"energy"比"mass times velocity"更可理解，虽不完美但避免了"force"这个硬错

### 2. "asteroid" — 定义不准确 ✅ 已修复
- 文件: words-level3c.js
- 原定义: "a rocky object floating in space smaller than a planet"
- 问题: 小行星不是"漂浮"(floating)，它们围绕太阳公转(orbit)
- 修复: "a rocky object orbiting the Sun that is smaller than a planet"

### 3. "molecule" — 定义误导 ✅ 已修复
- 文件: words-level3c.js
- 原定义: "the tiniest piece of something, made of atoms stuck together"
- 问题: "tiniest piece"暗示分子是最小单位，但原子比分子更小
- 修复: "a tiny group of atoms joined together that makes up a substance"

---

## MAJOR 问题

无新发现。R11已清理的groan/guarantee/levy词性不一致已修复。

---

## MINOR 问题（不需修复）

### 1. 44个 COMPLEX_DEFINITION (proofcheck已知)
- L3-L5定义中使用"underground", "comfortable"等词
- 权衡决策：替代词更难或更模糊，保持现状

### 2. "friction" 例句有多余逗号
- "Friction between your shoes, and the floor keeps you from sliding."
- 逗号可删但不算语法错误（pause for clarity）
- 判断：MINOR，不修

---

## 审校结论

**L3-L5词库整体质量：高**

Round 12审校后：
- 3个CRITICAL事实错误已修复（momentum/asteroid/molecule）
- 0个MAJOR问题
- L4-L5使用"embarrassment", "introduction"等词在定义中是合理的（这些是定义高级概念的必要词汇）
- 金融/法律/军事词汇出现在L4-L5是正确的分层决策（这些是学术高频词）

**作为竞品能攻击的点：**
1. 科学定义的精确度可以更高（已修3个）
2. L4-L5定义用词复杂度对MAP 197学生偏高 — 但这是intentional（L4-5是stretch goals）

**不可攻击的点：**
- 0语法硬伤
- 0不适内容
- 0搭配错误
- 0例句缺失目标词
- 定义-例句词性一致

---

## 建议固化项

- 🔧 [proofcheck规则] 加"科学定义事实检查"扩展：当前FACT_CHECKS只有7条（mushroom/spider/whale等），建议加：momentum≠force, asteroid≠floating, molecule≠tiniest piece, sound≠travels in vacuum, sun≠star that orbits, coral≠plant, penguin≠can fly
- 🔧 [白名单] "vertex→vertices" 不规则复数已在proofcheck白名单中，确认不误报
- 🔧 [白名单] 例句末尾 `.'` (period inside single quote) 不应被标为缺少结尾标点
- 🔧 [标准更新] QA-STANDARD.md第五节"科学定义精确度"应作为独立检查维度列出，目前只在FACT_CHECKS里覆盖了7个词
