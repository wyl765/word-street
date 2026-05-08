# Claude 竞品审校报告 — 2026-05-08 Round 7

**角色：** 竞品公司产品经理，专找能攻击产品的弱点
**范围：** L1 (600词) + L2/2a/2b/2c/2d (~1807词)
**方法：** 逐条通读 + programmatic pattern扫描

---

## CRITICAL 问题

无新增CRITICAL。

---

## MAJOR 问题

### 1. "fierce" imageKeyword与例句不一致 — L1
- 文件: words-level1.js
- 定义: "very strong and scary, ready to attack"
- 例句: "The fierce **lion** roared and showed its sharp teeth."
- imageKeyword: "fierce **tiger**"
- 问题: 例句用lion,图片搜tiger,学生可能困惑——看到老虎图片但文字说狮子
- 建议: imageKeyword改为 "fierce lion roaring" 保持一致

### 2. "civil" 定义过于模糊 — L2b
- 文件: words-level2b.js
- 定义: "about citizens and their rights"
- 问题: 定义太抽象,10岁ESL孩子读完不知道civil具体指什么。且"citizens"本身是L2词(可能不认识)。例句"Civil rights mean that all people should be treated equally."也在用目标词解释概念。
- 建议: 改为 "having to do with people living together in a community" 或类似

### 3. "end" 定义过窄 — L2b
- 文件: words-level2b.js
- 定义: "the last part of a story"
- 问题: "end"不只用于故事。"the end of the road", "the end of the day"都很常见。定义限定在story太窄。
- 建议: 改为 "the last part of something"

### 4. "lean" 定义与常用义不符 — L2a
- 文件: words-level2a.js
- 定义: "thin and healthy looking"
- 问题: "lean"最常见的义项是"to tilt/bend toward something"(如"lean against the wall")。形容词义"thin and healthy"虽然存在,但不是孩子最常遇到的用法。对MAP 197学生来说,学动词义更实用。
- 建议: 改定义为 "to bend your body toward something" 或保留形容词义但加注是adjective

### 5. "tissue" 定义可能与常见义混淆 — L2b
- 文件: words-level2b.js
- 定义: "a group of cells that work together in your body"
- 问题: 10岁孩子想到"tissue"首先是纸巾(Kleenex)。生物学义("body tissue")虽然是CCSS对齐的,但如果quiz给出这个定义,孩子可能选不对——因为他们认知中tissue=纸巾。imageKeyword "body cells"不会帮助。
- 建议: 保留生物义,但例句或定义加一句区分。或者如果是vocab game,确保干扰项不包含"paper towel"类词。

---

## MINOR 问题

### 6. 部分L2d词对MAP 197偏难
- "philosophy", "phenomenon", "prejudice", "presume", "proclaim"
- 这些更像L3-L4词汇。虽然是Tier 2学术词,但MAP 197(2年级阅读水平)学生不太可能在日常阅读中遇到。
- 不算错,但竞品可以攻击"分层不合理"

### 7. "dagger" 在L2 — weapons in kids app
- 文件: words-level2.js
- imageKeyword: "cartoon pirate dagger"
- "cartoon"前缀已经减轻了风险,但家长如果看到孩子APP里有"dagger"可能有concern
- 建议: 接受,因为出现在许多儿童故事(海盗/奇幻)中

### 8. "slavery" 处理得当但需注意
- 文件: words-level2b.js
- imageKeyword: "freedom symbol broken chains icon" — 用了正面象征而非负面图片,处理得当
- 定义和例句都appropriate
- 保持不变

---

## 总体评估

L1-L2整体质量很高。R6修复后的die/died/gun问题已清除。主要弱点在于：
1. 个别imageKeyword与例句不一致(fierce)
2. 几个定义过窄或选了非最常见义项(end, lean, civil)
3. L2d分层有些词偏难(但不算错误)

---

## 建议固化项

- 🔧 [proofcheck规则] 检测imageKeyword中的动物/物体是否与example中提到的动物/物体一致。正则难做,但可以提取example中的名词与imageKeyword比较——如果example明确提到"lion"但imageKeyword是"tiger",标记为MISMATCH。可用简单keyword extraction实现。
- 🔧 [proofcheck规则] 检测定义过窄问题:如果定义包含"in a story"/"of a story"但目标词不是文学术语(如plot/theme/setting),标记为NARROW_DEFINITION警告。
- 🔧 [白名单] "tissue"的生物义是设计决定,不需要改。
- 🔧 [标准更新] 无
- 🔧 [新工具] 无
- 🔧 [禁词] 无
- 🔧 [搭配规则] 无
