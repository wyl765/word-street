# VERIFY-CLAUDE-R19-2026-05-09
**角色:** 竞品公司的人，专找能攻击产品的弱点
**范围:** L1 (600词) + L2 (548词)
**关注:** 定义准确性、交叉冲突、多义词处理

## CRITICAL
无CRITICAL问题。

## HIGH

### 1. [wand] (L1) — 例句使用"coach"的古义（马车），与L1中"coach"定义冲突
- 例句: "She waved her wand and the pumpkin became a coach."
- 问题: L1词库中"coach"定义为"a person who teaches a sport"。10岁孩子如果先学了coach=教练，看到这个例句会完全困惑。"coach"的马车义是极冷僻义。
- 建议: "She waved her wand and made the pumpkin turn into a golden carriage."

### 2. [cub] (L1) — 定义过窄，事实性偏差
- 定义: "a baby bear"
- 问题: cub不仅指baby bear，也指lion cub, wolf cub, fox cub等。定义将其限定为bear是不准确的。Oxford定义: "a young bear, lion, fox, etc."
- 建议: "a baby bear, lion, or wolf"

### 3. [numerous] (L2a) — 定义使用了错误的句法形式
- 定义: "a very large number of something"
- 问题: "numerous"是形容词，但定义是名词短语形式。孩子会以为"numerous"是名词。应该用形容词形式定义。
- 建议: "very many"

### 4. [afraid] (L2) vs [frightened] (L1) vs [scared] (L2) vs [terrified] (L1) — 四词定义缺乏梯度区分
- afraid (L2): "feeling like something bad might happen"
- scared (L2): "feeling fear about something"  
- frightened (L1): "so scared your heart pounds and you want to run"
- terrified (L1): "so scared you cannot move"
- 问题: afraid和scared几乎无区分。且L1词比L2词更难(frightened/terrified比afraid/scared更高级)，level分配有问题。
- 建议: 将frightened和terrified调到L2，将afraid调到L1（afraid比frightened更基础）

### 5. [silent] (L1) vs [quiet] (L2) — Level分配反直觉
- silent (L1): "making no sound at all"
- quiet (L2): "with little noise"
- 问题: "quiet"是比"silent"更基础的词。5岁孩子都说"be quiet"，但"silent"是更书面的词。Level应互换。
- 建议: quiet→L1, silent→L2

### 6. [calm] (L1) vs [peaceful] (L1) — 同level定义高度重叠
- calm: "quiet and not upset"
- peaceful: "calm and quiet with no problems"
- 问题: peaceful定义直接使用了"calm"这个同level词做定义（循环定义）。且两个定义都以quiet为核心，在quiz中极易混淆。
- 建议: peaceful → "feeling safe and happy, with nothing to worry about"

## MEDIUM

### 7. [less] (L1) — 形容词/限定词用名词短语定义
- 定义: "a smaller amount"
- 问题: "less"是determiner/adjective，定义用了名词短语。应该用形容词形式。
- 建议: "not as much"

### 8. [badge] (L2) — 定义过于宽泛
- 定义: "a small pin or tag that shows who you are"
- 问题: distractor-test已标记此词confusable with 9 others。"小pin或tag显示你是谁"可以描述name tag、ID card等太多东西。
- 建议: "a small metal pin that police or scouts wear to show their job"

### 9. [olive] (L2) — ADJ_NOUN_MISMATCH误报？
- 定义: "a small oval fruit used to make oil"
- 问题: olive既是名词(果实)也是形容词(橄榄色)。当前只覆盖名词义，但作为颜色形容词也很常用。对于L2这没问题（单义优先），但proofcheck的ADJ_NOUN_MISMATCH规则误报了它。
- 建议: 加白名单，olive作为noun定义是正确的。

### 10. [desert] (L1) — "no water"是事实错误
- 定义: "a dry place with sand and no water"
- 问题: 沙漠不是"没有水"，是极少水。很多沙漠有绿洲、地下水。说"no water"是事实性偏差。
- 建议: "a dry place with lots of sand and very little rain"

### 11. [content] (L1) — Level可能过高且多义词
- 定义: "happy with what you have"
- 问题: "content"作形容词意思是满足的，但作名词(contents)更常见于低年级。在L1里10岁孩子可能没见过adjective用法。不过定义本身准确。保留观察。

### 12. [scale] (L1) — 只选了一个冷僻义
- 定义: "a flat hard piece on a fish's body"
- 问题: scale最常见的义是"秤"（weigh→L1里有weigh），其次是"规模/比例"。鱼鳞义是最冷僻的。对于10岁孩子，scale=秤/体重计更实用。
- 建议: 考虑改为"a tool used to weigh things"或增加注明这是其中一个义

## LOW

### 13. [coach] (L1) — 定义遗漏重要义
- 定义: "a person who teaches a sport"
- 问题: coach也可以不是sport（life coach, academic coach），但对L1来说sport义最重要，可以接受。

### 14. [wilt] (L1) — 拼写/发音易与"will"混淆
- 对中国ESL孩子可能在听音选词时造成困扰，但不是bug，观察。

## 建议固化项

- 🔧 [proofcheck规则] **CROSS_REF_CONFLICT**: 检测例句中使用的词是否在同level有不同定义。pattern: 遍历每个entry的example，提取其中出现的其他同file词，检查是否存在歧义用法（如wand例句中coach=carriage，但coach在L1=教练）
- 🔧 [proofcheck规则] **CIRCULAR_DEFINITION_SAME_LEVEL**: 检测定义中直接使用同level另一个词的word字段。当前只有SYNONYM_CYCLE检测互为定义，但没检测单向引用（如peaceful用了"calm"，而calm也在L1）
- 🔧 [proofcheck规则] **ADJ_AS_NOUN_DEF**: 检测形容词词条的定义以"a/an"开头（当前有ADJ_NOUN_MISMATCH但只看POS tag，不够准确）。改进：用更完整的adjective清单（-ous, -ful, -ive, -less, -ly结尾 + 已知形容词列表）
- 🔧 [白名单] olive, graphic, rubric的ADJ_NOUN_MISMATCH应标记为false positive（这些词的主要用法是名词）
- 🔧 [标准更新] QA-STANDARD.md定义标准增加：L1中的恐惧类词（afraid/scared/frightened/terrified）需要明确梯度区分，定义不能高度重叠
