# VERIFY-CLAUDE-R20-2026-05-09
**角色:** 竞品公司的人，专找能攻击产品的弱点
**范围:** L1 (600词) + L2 (548词)
**关注:** 系统性pattern、定义形式一致性、quiz可玩性

## CRITICAL
无CRITICAL问题。

## HIGH

### 1. 7个词使用"when..."定义形式 — quiz/flashcard不友好
以下词的definition以"when"开头，在四选一quiz中极不自然（选项是"when..."开头，但题目问的是"What does X mean?"）：

**L1:**
- **flood**: "when water covers land that is usually dry" → 建议: "water covering land that is usually dry"
- **drip**: "when water falls drop by drop" → 建议: "to fall in small drops, one at a time"
- **dawn**: "when the sun first comes up" → 建议: "the time the sun first comes up"
- **dusk**: "when the sun is going down" → 建议: "the time the sun is going down"

**L2:**
- **election**: "when people vote to choose a leader" → 建议: "a time people vote to choose a leader"
- **attention**: "when you watch and listen well" → 建议: "watching and listening carefully"
- **heal**: "when a wound or body gets better on its own" → 建议: "to get better after being hurt or sick"

### 2. 10个身体部位词imageKeyword缺少箭头指示 — 图片匹配时指代不明
elbow, wrist, ankle, heel, chin, forehead, shoulder, hip, spine, knee 的imageKeyword都只有词本身，没有"with arrow pointing to..."。在看图选词游戏中，如果图片只是一个人的照片，孩子不知道要关注哪个部位。

建议修复：
- elbow → "arm with red arrow pointing to elbow joint"
- wrist → "hand and arm with arrow pointing to wrist"
- ankle → "foot and leg with arrow pointing to ankle"
- heel → "foot with arrow pointing to heel"
- chin → "face with arrow pointing to chin"
- forehead → "face with arrow pointing to forehead"
- shoulder → "person with arrow pointing to shoulder"
- hip → "person with arrow pointing to hip"
- spine → "back with arrow pointing to spine"
- knee → "leg with arrow pointing to knee"

### 3. enormous/frightened/terrified/miserable/scattered — L1级别偏高
这些词在Biemiller/Fry词表中通常是3-4年级习得词，放在L1（最基础层）不合理：
- **enormous** — 比huge更书面，应为L2
- **frightened** — 比scared更正式，应为L2
- **terrified** — 比frightened更强烈，应为L2或L3
- **miserable** — 明确的高年级词，应为L2
- **scattered** — 书面用词，应为L2

注意：如果是有意为之（L1=基础但含部分挑战词），则忽略此条。但从竞品角度，这是可以攻击的点。

### 4. afraid(L2) vs scared(L2) — 定义几乎无区分度
- afraid: "feeling like something bad might happen"（侧重预期/担忧）
- scared: "feeling fear about something"（泛指）
- 问题：在quiz中孩子选不对。scared的定义太泛，几乎可以匹配所有恐惧类词。
- 建议 scared: "feeling fear right now about something close to you"

### 5. huge(L1) vs enormous(L1) — 同level同义定义
- huge: "so big it fills up a room or towers over you"
- enormous: "so big it is hard to believe"
- 问题：对10岁ESL孩子，这两个词是完全的同义词。同level放两个同义词且都以"so big"开头，在quiz中极易混淆。
- 建议：将enormous移到L2，或给出更有区分度的定义。

## MEDIUM

### 6. scale(L1) — 只选了鱼鳞义，忽略了最常用义
- 定义: "a flat hard piece on a fish's body"
- 问题: scale最高频义是"秤/体重计"（bathroom scale），其次是"规模"，鱼鳞是最冷僻的。对于10岁孩子，"step on the scale"比"fish scale"更常见。
- 建议: 保留观察。如果imageKeyword能准确展示fish scale，游戏中可行。

### 7. turtle vs lizard — 定义都是"animal with four legs"
- turtle: "a slow animal with four legs and a hard shell on its back"
- lizard: "a small animal with four legs and a tail"
- 区分度尚可（shell vs tail），但在快速选择时容易卡顿。

### 8. toast — 定义"bread that is cooked until brown"略有歧义
- 严格说baked bread也是"cooked until brown"
- 建议: "a slice of bread heated until crispy and brown"

## LOW

### 9. chick 定义含 "chicken" — 技术上算circular但实际合理
- "a baby chicken" — chick确实是baby chicken的意思，不需要修

### 10. dolphin vs whale — "sea animal that breathes air" 是共有特征
- whale: "a very large sea animal that breathes air"
- dolphin: "a smart sea animal that swims and breathes air"
- "breathes air"对两者都适用，区分度低。但有"very large"和"smart"区分，可接受。

---

## 建议固化项

- 🔧 [proofcheck规则] **WHEN_DEFINITION**: 检测definition以"when "开头的词条，报为MAJOR。这种形式在quiz四选一中不自然，应改为名词短语（"the time..."）或动词不定式（"to..."）。正则: `/^when\s/i`
- 🔧 [proofcheck规则] **BODY_PART_IMAGE_NO_ARROW**: 维护一个身体部位词列表（elbow,wrist,ankle,heel,chin,forehead,shoulder,hip,spine,knee,jaw,thumb,palm,rib,thigh,calf），检测其imageKeyword是否包含"arrow"或"pointing"。不包含则报MINOR。
- 🔧 [搭配规则] 无新建议
- 🔧 [禁词] 无新建议
- 🔧 [白名单] "chick"→"chicken" 的circular detection应加白名单（chick IS a baby chicken，不是循环定义）
- 🔧 [新工具] 无新建议
- 🔧 [标准更新] QA-STANDARD.md第二节"定义标准"增加：定义不得以"when"开头（改用名词短语或动词不定式）；身体部位词的imageKeyword必须包含方向指示（arrow/pointing）。
