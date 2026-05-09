# VERIFY-CLAUDE-R29-2026-05-09 — Word Street Level 1&2 (仅CRITICAL/HIGH)

> 角色：竞品公司的人，专找弱点
> 范围：words-level1.js (600词) + words-level2.js (~548词)
> 标准：只报CRITICAL/HIGH，每条含词条+问题+测试用例+外部证据

---

## CRITICAL

无CRITICAL发现。

---

## HIGH

### 1) force — `words-level2.js`
- **词条原文**：definition: `a push or a pull`, example: `A force makes the swing move forward.`
- **具体问题**：只教物理学"力"的定义。但"force"在L2阅读中极高频的是"强迫"义——"Don't force me to eat broccoli"、"He was forced to stay inside"。如果学生读到"No one can force you to do it"，按当前定义会理解为"没有人能推或拉你去做它"，完全错误。
- **测试用例**：题干："My mom tried to force me to eat my vegetables." 选项：A. push or pull me B. make me do it even though I didn't want to → 孩子按词库选A
- **外部证据**：MW Kids: force (verb) = "to make (someone) do something" https://www.merriam-webster.com/dictionary/force — 动词义项在日常使用中远高于名词物理义项
- **建议修复**：改定义为 `a push or pull; also to make someone do something they don't want to do`，或优先教动词义项

### 2) act — `words-level2.js`
- **词条原文**：definition: `to do something or take action`, example: `We must act fast before the ice cream melts.`
- **具体问题**：定义用了"action"（act的派生词），构成轻度循环引用。对ESL学生，如果不知道act就更不知道action。此外，"act"在学校语境中最常见的义项是"表演"（act in a play），当前定义完全不覆盖。
- **测试用例**：题干："She will act as the queen in the school play." 选项：A. do something B. pretend to be → 孩子按词库选A
- **外部证据**：MW Kids: act = "to perform in a play or movie" 是主要义项之一 https://www.merriam-webster.com/dictionary/act
- **建议修复**：改定义为 `to do something; also to perform a part in a play`，删除"take action"避免循环

### 3) block — `words-level2.js`
- **词条原文**：definition: `a hard piece of wood, stone, or other material`, example: `I used a block of wood to prop the door open.`
- **具体问题**：只教物理"块"义项。"block"在美国日常生活中最常用的是"街区"——"walk two blocks"、"around the block"。对将来在美国读书的Mark来说，"the school is three blocks away"这种说法每天都会遇到。此外"block"还有"阻挡"的动词义项（"block the ball"）也很常见。
- **测试用例**：题干："The park is two blocks from my house." 选项：A. two pieces of wood B. two sections of street → 孩子选A
- **外部证据**：MW Kids: "a section of a city enclosed by streets" 是主要义项 https://www.merriam-webster.com/dictionary/block
- **建议修复**：改定义为 `a piece of something hard; also a section of a street between two corners`

### 4) close — `words-level2.js`
- **词条原文**：definition: `to shut`, example: `Please close the door, so it stays quiet.`
- **具体问题**：只教"关闭"动词义项。但"close"作形容词("near")在L2阅读中极其高频——"Stay close to me"、"a close friend"、"close to the school"。学生读到"We are very close"会困惑。而且L2已经有"near"和"shut"，如果close只教shut，那就和shut完全同义，浪费词库位置。
- **测试用例**：题干："My grandma lives close to us." 选项：A. shuts to us B. near us → 孩子按词库选A
- **外部证据**：OALD: close (adj) = "near in space or time" 是主要义项 https://www.oxfordlearnersdictionaries.com/definition/english/close_1
- **建议修复**：改定义为 `to shut; also near`，或改为教"near"义项以避免与"shut"同义

### 5) notice — `words-level1.js`
- **词条原文**：definition: `to see something for the first time`, example: `Did you notice the bird sitting on the fence?`
- **具体问题**："for the first time"过度限制了notice的含义。Notice的核心是"pay attention to / become aware of"，不要求是第一次。"I noticed you look tired today"——不是第一次看到这个人，只是注意到了某个状态。
- **测试用例**：题干："I noticed the teacher was wearing a new hat." 选项：A. I saw it for the first time (implies I never saw the teacher before) B. I became aware of it → 更准确答案是B
- **外部证据**：MW: notice = "to become aware of" https://www.merriam-webster.com/dictionary/notice — 不含"for the first time"
- **建议修复**：改定义为 `to see or become aware of something`

---

## 建议固化项

- 🔧 [proofcheck规则] 增加"定义循环引用"检查升级：不仅检查完全相同的词，还检查词干相同的派生词（act/action, create/creation, explain/explanation等）
- 🔧 [proofcheck规则] 维护 `PRIMARY_SENSE_MAP` — 高频多义词的主义项映射表，当词库教的义项与主义项不一致时报HIGH
- 🔧 [标准更新] QA-STANDARD.md 增加："对多义词，定义必须覆盖至少最高频的义项。如果只教一个义项，必须是MW/OALD的第一义项，除非有注释说明教学理由"
- 🔧 [白名单] `model`保留"a small copy of something"——对L2学生这是最具体可理解的义项，"role model"对10岁ESL孩子不如物理模型直观
- 🔧 [白名单] `matter`保留"anything that takes up space"——科学义项是CCSS重点，且例句很好
