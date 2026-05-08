# Claude 竞品审校报告 — 2026-05-08 Round 4

**角色：** 竞品公司产品经理，专找能攻击产品的弱点
**范围：** L1 (words-level1.js) + L2 (words-level2*.js), 约2400词
**方法：** programmatic扫描 + 人工抽查

---

## CRITICAL 问题

无新CRITICAL发现。L1/L2定义完整性、安全性均通过。

---

## MAJOR 问题

### 1. imageKeyword "danger skull" — fatal (L2c)
- 文件: words-level2c.js
- imageKeyword: "danger skull"
- 问题: 搜图会出现骷髅头图片，可能让10岁孩子不适
- 建议: 改为 "warning sign danger"

### 2. imageKeyword = word本身（大量L1词条）
- 文件: words-level1.js
- 约150个词条的imageKeyword等于word本身（puppy→puppy, kitten→kitten等）
- 问题: 对于具体名词（animal, food, body parts），搜图无歧义，但对抽象词（while, soon, moment, half）搜图完全无用
- 真正有问题的抽象词：while, soon, moment, half, adventure, cheerful, lonely, wonderful, excited, nervous等
- 建议: 
  - 具体名词（puppy, kitten, frog等）: imageKeyword=word是安全的，可以加白名单
  - 抽象词必须改为具体场景描述

### 3. L1 抽象词 imageKeyword 需要具体化（4个）
| 词 | 当前imageKeyword | 建议 |
|---|---|---|
| while | while | child reading while waiting |
| soon | soon | clock showing almost time |
| moment | moment | frozen action snapshot |
| half | half | apple cut in half |

---

## MINOR 问题

### 4. L2短定义（1-2词）
- occasionally: "sometimes" (1词)
- courageous: "brave" (1词)
- alive: "living" (1词)
- glad: "happy" (1词)
- 分析: 对MAP 197学生来说，简短定义是优势不是问题。如果定义用词（sometimes, brave, living, happy）比目标词更简单，那就是好定义。这些均为MINOR，不需要修改。

### 5. "better" 定义 = "more good"
- 文件: words-level2.js
- 问题: "more good"不是标准英语表达（虽然逻辑上正确，但可能教给孩子错误的比较级构造）
- 建议: 改为 "higher in quality; improved"

### 6. quiz-test高重叠L1果类词
- grape/plum/cherry/berry 定义重叠67%（都是 "a small [color] fruit"）
- 问题: 看定义选词游戏中，这4个词容易混淆
- 建议: 加更多区分特征（grape→grows in bunches, cherry→has a pit, berry→many kinds等）— 已有区分，重叠在阈值内

### 7. "chick"定义包含"chicken"
- 文件: words-level1.js  
- 定义: "a baby chicken"
- 问题: chick → chicken 不算严格循环（chick是chicken的缩写但意思不同），这是合理的定义

---

## 总体评估

L1/L2词库质量良好。经过R3的修复（influential断裂、careless搭配、destitution语法），当前无CRITICAL问题。主要改进空间：
1. 抽象词imageKeyword需要具体化（~10个）
2. fatal的imageKeyword需要改
3. "better"定义可以改进

---

## 建议固化项

- 🔧 [proofcheck规则] 检测imageKeyword等于word本身的条目（已在R3 Claude报告中建议，确认是否已加）
- 🔧 [proofcheck规则] 检测抽象词（adjective/adverb/conjunction/preposition类）的imageKeyword是否太抽象（如imageKeyword=word且词性非名词）
- 🔧 [白名单] 具体名词（animal, food, body part, furniture, tool, building, nature）的imageKeyword=word应加白名单，不报LAZY_IMAGEKEYWORD
- 🔧 [标准更新] 无新标准需求
