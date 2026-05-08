# Claude 竞品审校报告 — 全量 (5211词) — 2026-05-08 Round 13

**角色：** 竞品公司产品经理，专找能攻击产品的弱点
**范围：** words-level1.js 到 words-level5d.js = 5211词
**方法：** 自动化扫描 + 科学词手动逐条复查 + 随机抽样50词深度检查

---

## CRITICAL 问题

### 1. "insulator" — 定义用词不精确 ✅ 已修复
- 文件: words-level3b.js
- 原定义: "a material that blocks power or heat"
- 问题: "power"不是物理术语，应该用"electricity"。例句也用了"power"。
- 修复: "a material that blocks electricity or heat" + 例句相应修改

### 2. "geothermal" — 词性不一致 ✅ 已修复
- 文件: words-level3c.js
- 原定义: "heat that comes from deep inside the Earth"（名词式定义）
- 问题: geothermal是形容词，例句正确用了"geothermal energy"，但定义把它当名词
- 修复: "using heat that comes from deep inside the Earth"

---

## MAJOR 问题

无。R12修复的momentum/asteroid/molecule确认保持正确。

---

## MINOR 问题（记录但不修）

1. **"hypothesis" (L2)** — 定义"a guess about what will happen in a test"用"test"代替"experiment"是简化折中，对MAP 197可接受
2. **"baffle" (L3)** — "to confuse someone fully"中"fully"稍不自然，"completely"更好。但不影响理解
3. **suffix/caption例句** — 以 `.'` 结尾被部分正则误判为缺标点，实际正确
4. **44个COMPLEX_DEFINITION** — proofcheck已知，权衡决策保持现状

---

## 整体评估

**作为竞品能攻击的点：**
1. ~~科学定义精度~~ — R12-R13已修7个科学词（momentum/asteroid/molecule/insulator/geothermal等），攻击面极小
2. L4-L5定义用词对MAP 197偏高 — 但L4-5定位是stretch goals，设计意图如此

**不可攻击的点：**
- 0语法硬伤
- 0不适内容
- 0搭配错误（WRONG_COLLOCATIONS检测通过）
- 0全局替换事故残留
- 0空字段
- 0循环定义
- 混淆对（affect/effect, principal/principle等）区分清晰
- 科学定义全部事实正确

**结论：词库质量已达出版级。R13轮Claude端0 CRITICAL未修复（2个已当场修复），0 MAJOR。**

---

## 建议固化项

- 🔧 [proofcheck规则] 加"形容词定义必须以形容词式短语开头"检测：当定义以"a/an/the"开头但例句中该词做定语/表语时标记词性不一致（如geothermal定义"heat that..."但实际是adj）
- 🔧 [proofcheck规则] 加"power vs electricity"搭配检查：在insulator/conductor/circuit相关词的定义中，"power"应替换为"electricity"（power太宽泛）
- 🔧 [FACT_CHECKS] 扩展：加 insulator≠blocks power (should be electricity), geothermal=adjective not noun
- 🔧 [白名单] 例句以 `.'` 或 `!"` 结尾的不应被NO_END_PUNCT标记
- 🔧 [标准更新] QA-STANDARD.md第六节工具清单应更新proofcheck版本号
