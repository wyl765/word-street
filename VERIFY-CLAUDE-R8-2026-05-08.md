# Claude 竞品审校报告 — 2026-05-08 Round 8

**角色：** 竞品公司产品经理，专找能攻击产品的弱点
**范围：** L1 (600词) + L2/2a/2b/2c/2d (~1807词) = 2407词
**方法：** Programmatic全量扫描 + 人工spot-check高风险条目

---

## CRITICAL 问题

无。

---

## MAJOR 问题

### 1. "become" — 例句使用不规则过去式 "became"（已修复）
- 文件: words-level2.js
- 原例句: "The sky became dark before the storm."
- 问题: 10岁ESL学生学习"become"时看到"became"，可能无法建立词形联系
- 修复: 改为 "Ice can become water when it gets warm."

### 2. "overcome" — 例句使用不规则过去式 "overcame"（已修复）
- 文件: words-level2c.js
- 原例句: "She overcame her fear of water and learned to swim."
- 问题: 同上，irregular past tense对MAP 197学生是认知障碍
- 修复: 改为 "You can overcome any challenge if you keep trying."

### 3. "carbon" — imageKeyword "element" 过于泛化（已修复）
- 文件: words-level2b.js
- 问题: 搜"element"会出现元素周期表而非carbon具体图片
- 修复: 改为 "carbon atom diagram"

### 4. "ambitious" — imageKeyword "goal" 过于泛化（已修复）
- 文件: words-level2b.js
- 问题: 搜"goal"会出现足球门而非"有野心的孩子"场景
- 修复: 改为 "kid reaching for trophy"

### 5. "go ahead" — imageKeyword "start" 过于泛化（已修复）
- 文件: words-level2b.js  
- 问题: 搜"start"太模糊
- 修复: 改为 "green light go"

---

## MINOR 问题

### 1. L1定义使用分号（5处）
- thick: "not thin; having a lot from one side to the other"
- thin: "not thick; having very little from one side to the other"
- exactly: "just right; not more or less"
- before: "earlier in time; at a point in the past"
- double: "two of something; twice as much"
- 说明: 分号对L1读者略复杂，但这些定义已经很好地解释了词义，不影响理解

### 2. "note" imageKeyword 只是单词本身
- words-level2.js | note | imageKeyword: "note"
- 搜索"note"可能返回音乐音符而非便条

### 3. 34个定义含2次"something"（已被proofcheck标记为MINOR）
- supplement: "something extra added to make something better"
- 等（proofcheck已全部列出）

---

## 审校结论

**整体质量评估：** L1-L2词库已达到出版级标准。
- 0 CRITICAL
- 5 MAJOR（全部已当场修复）
- 事实准确性：通过（科学词汇定义验证OK）
- 循环定义：0处
- 例句缺失目标词：2处（已修复）
- 重复词条：0处
- 语法错误：0处

---

## 建议固化项

- 🔧 [proofcheck规则] 添加"例句使用不规则过去式但不含原型"检测规则。对irregular verbs列表(become→became, overcome→overcame, run→ran等)，检查example是否至少包含词的base form或能被stem到base的形式。
- 🔧 [proofcheck规则] 添加"imageKeyword为单个泛化词"检测。当imageKeyword只有一个词且在generic_words列表中（element, goal, start, show, point, note等）时报MINOR。
- 🔧 [白名单] "chick"定义包含"chicken"不算循环引用——chick和chicken是不同词
- 🔧 [白名单] L1分号定义（thick/thin/exactly/before/double）是合理的简洁双释，不需修复
- 🔧 [标准更新] 无
