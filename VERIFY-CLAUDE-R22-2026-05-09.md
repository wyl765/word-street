# VERIFY-CLAUDE-R22-2026-05-09
**角色:** 竞品公司的人，专找能攻击产品的弱点
**范围:** L1 (600词) + L2 (548词)
**关注:** 定义准确性、同义词区分度、跨词引用循环、词性一致性

## CRITICAL
无CRITICAL问题。

## HIGH

### 1. guard(L2) 定义使用同级词 protect — 循环引用
- **当前:** guard = "to watch and protect"; protect = "to keep safe"
- **问题:** 学生先学到guard用protect解释,但protect也是L2。如果先遇到guard,定义里的protect也不认识。且guard和protect在quiz四选一中选项极易混淆。
- **外部证据:** Oxford Learner's: guard = "to watch over somebody/something in order to protect them or to prevent them from escaping"
- **测试用例:** 四选一: "to watch and protect" → guard vs protect 混淆率极高
- **建议:** guard → "to watch over and keep safe from danger"

### 2. path(L2) vs route(L2) — 定义几乎同义无法区分
- **当前:** path = "a way to walk"; route = "the way to go"
- **问题:** "a way to walk" vs "the way to go" — 在quiz中不可能区分。path侧重物理小路,route侧重路线/方向。
- **外部证据:** Merriam-Webster: path = "a trodden way"; route = "an established or selected course of travel"
- **测试用例:** 定义"a way to walk"时,学生选path还是route? → 随机
- **建议:** path → "a narrow trail for walking"; route → "the road or direction you take to get somewhere"

### 3. afraid(L2) vs scared(L2) — 区分度仍不足
- **当前:** afraid = "feeling like something bad might happen"; scared = "feeling fear about something"
- **问题:** scared的定义太宽泛,几乎涵盖所有恐惧类词(afraid/frightened/terrified)。afraid侧重预期焦虑,scared侧重即时反应。
- **外部证据:** Cambridge: afraid = "feeling fear, or feeling anxiety about the possible results of a situation"; scared = "frightened or worried"
- **测试用例:** 定义"feeling fear about something" → afraid/scared/frightened都能匹配
- **建议:** scared → "feeling sudden fear, wanting to run or hide"

### 4. complete(L2) 定义用同级词 finish — 循环引用
- **当前:** complete = "to finish all the parts"
- **问题:** finish也是L2词(def: "to end")。如果student不认识finish, complete的定义就无法理解。
- **外部证据:** Oxford Learner's: complete = "to do or make the whole of something so that it is full"
- **建议:** complete → "to do all the parts until nothing is left"

### 5. scale(L1) — 只选鱼鳞义,忽略最高频义
- **当前:** "a flat hard piece on a fish's body"
- **问题:** scale最高频义是"秤/体重计"(bathroom scale)和"规模"(on a large scale)。鱼鳞是最低频义。一个10岁孩子日常说"step on the scale"远多于"fish scale"。从竞品角度,这是明显的词义选择错误。
- **外部证据:** COCA词频: scale(秤/规模) >> scale(鱼鳞); Merriam-Webster将weighing device列为义项1
- **建议:** 保留观察(如果imageKeyword"fish scale"能搜出清晰图,游戏中仍可行),但标记为设计决策而非错误

### 6. enormous/gigantic/huge 三词同在L1 — 区分度不足
- **当前:** huge = "so big it fills up a room or towers over you"; enormous = "so big it is hard to believe"; gigantic = "extremely big, bigger than big"
- **问题:** 三个同义词都在L1,都以"big"为核心,quiz中极易混淆。竞品只需要放一个(huge),其余放L2。
- **测试用例:** 定义"so big it is hard to believe" vs "extremely big, bigger than big" → 10岁孩子分不出
- **建议:** 将enormous和gigantic移到L2,L1只保留huge和giant(giant有故事中的巨人义,可区分)

## MEDIUM

### 7. horseshoe(L1) — "a U-shaped" 中 a/an 正确但视觉上可能触发误报
- 当前: "a U-shaped metal piece nailed to a horse's hoof"
- 判定: 正确(U发音/juː/,辅音开头)。无需修改。

### 8. mulberry(L2) — 例句用 mulberries 但不含 mulberry 原形
- 当前: "We picked mulberries from the tree in the yard."
- 判定: 包含变形mulberries,可接受。

---

## 建议固化项

- 🔧 [proofcheck规则] **同级循环引用检测增强**: 当前SAME_LEVEL_CIRCULAR检查应扩展为检查"定义中使用同级别其他词的word字段"(如guard用protect,complete用finish)。应该检查定义中每个>3字母的词是否是同level的另一个word。
- 🔧 [proofcheck规则] **同级同义词定义相似度检查**: path/route这类定义Jaccard重叠>60%的同级词对应标记HIGH。当前quiz-test只检查80%+,应降到60%对同义词组。
- 🔧 [proofcheck规则] **"feeling"开头的L2恐惧类词检查**: 当definition匹配`/^feeling (fear|scared|afraid)/`时,标记需要与同类词(afraid/scared/frightened/terrified)做区分度检查。
- 🔧 [标准更新] QA-STANDARD.md应增加:"同level不应有3个以上共享核心含义的同义词(如big系列),超过2个应分散到不同level。"
