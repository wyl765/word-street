# Word Street 词库审查报告 (Level 1 & 2)

作为二年级（MAP 197）孩子的妈妈，我仔细检查了 Level 1 和 Level 2 的词汇。以下是我发现孩子学习时会卡住的严重问题：

## CRITICAL 严重问题

- **portion** (Level 1): 定义中使用了可能不认识的抽象/难词 "amount" (定义: the amount of food for one person)
- **less** (Level 1): 定义中使用了可能不认识的抽象/难词 "amount" (定义: a smaller amount)
- **more** (Level 1): 定义中使用了可能不认识的抽象/难词 "amount" (定义: a bigger amount)
- **equal** (Level 1): 定义中使用了可能不认识的抽象/难词 "amount" (定义: the same size or amount)

## HIGH 高优先级问题

- **describe** (Level 2): imageKeyword 太复杂，可能搜不出直观的图 (imageKeyword: child talking about picture)
- **explain** (Level 2): imageKeyword 太复杂，可能搜不出直观的图 (imageKeyword: dad explaining sunset to child)
- **separate** (Level 2): imageKeyword 太复杂，可能搜不出直观的图 (imageKeyword: sorting colored blocks into groups)
- **paragraph** (Level 2): imageKeyword 太复杂，可能搜不出直观的图 (imageKeyword: paragraph of text on paper)
- **determined** (Level 2): imageKeyword 太复杂，可能搜不出直观的图 (imageKeyword: determined child working hard)
- **attention** (Level 2): imageKeyword 太复杂，可能搜不出直观的图 (imageKeyword: child listening with hand on ear)
- **awake** (Level 2): imageKeyword 太复杂，可能搜不出直观的图 (imageKeyword: child awake in bed at night)
- **behavior** (Level 2): imageKeyword 太复杂，可能搜不出直观的图 (imageKeyword: two kids sharing pizza slice)
- **bossy** (Level 2): imageKeyword 太复杂，可能搜不出直观的图 (imageKeyword: child pointing finger at others)
- **center** (Level 2): imageKeyword 太复杂，可能搜不出直观的图 (imageKeyword: star in middle of flag)
- **confuse** (Level 2): imageKeyword 太复杂，可能搜不出直观的图 (imageKeyword: confused child looking at two doors)
- **cost** (Level 2): imageKeyword 太复杂，可能搜不出直观的图 (imageKeyword: three dollar toy price)
- **find** (Level 2): imageKeyword 太复杂，可能搜不出直观的图 (imageKeyword: child searching for lost book)
- **downstairs** (Level 2): imageKeyword 太复杂，可能搜不出直观的图 (imageKeyword: shoes by door at bottom of stairs)
- **exact** (Level 2): imageKeyword 太复杂，可能搜不出直观的图 (imageKeyword: correct checkmark on paper)
- **fair** (Level 2): imageKeyword 太复杂，可能搜不出直观的图 (imageKeyword: equal sharing among kids)
- **kind** (Level 2): imageKeyword 太复杂，可能搜不出直观的图 (imageKeyword: child offering seat to friend)
- **listen** (Level 2): imageKeyword 太复杂，可能搜不出直观的图 (imageKeyword: ear hearing bell ring)
- **message** (Level 2): imageKeyword 太复杂，可能搜不出直观的图 (imageKeyword: sticky note on fridge)
- **scared** (Level 2): imageKeyword 太复杂，可能搜不出直观的图 (imageKeyword: scared child under blanket)
- **strong** (Level 2): imageKeyword 太复杂，可能搜不出直观的图 (imageKeyword: thick strong rope pulling sled)
- **turn** (Level 2): imageKeyword 太复杂，可能搜不出直观的图 (imageKeyword: turning key in lock)
- **upstairs** (Level 2): imageKeyword 太复杂，可能搜不出直观的图 (imageKeyword: backpack in bedroom upstairs)
- **carefully** (Level 2): imageKeyword 太复杂，可能搜不出直观的图 (imageKeyword: hands carefully stacking blocks)
- **accept** (Level 2): imageKeyword 太复杂，可能搜不出直观的图 (imageKeyword: two kids trading cards shaking hands)
- **quite** (Level 2): imageKeyword 太复杂，可能搜不出直观的图 (imageKeyword: kid thinking hard at computer screen)
- **unless** (Level 2): imageKeyword 太复杂，可能搜不出直观的图 (imageKeyword: child eating dinner before going outside)
- **eventually** (Level 2): imageKeyword 太复杂，可能搜不出直观的图 (imageKeyword: seed growing into flower stages)

## 建议固化项
- 🔧 [proofcheck规则] `WORDS_RESTRICTION` 规则：L1定义中禁止使用以下抽象词/集合名词：`equipment, appliance, instrument, substance, vehicle, container, structure, surface, material, quality, condition, device`。
- 🔧 [proofcheck规则] `DEF_LENGTH_LIMIT` 规则：L1定义长度应限制在 70 字符以内，避免冗长的从句（如 "someone who...", "something that..." 等组合）。
- 🔧 [proofcheck规则] `ABSTRACT_PATTERN` 规则：禁止在L1/L2中使用 "a condition of", "the state of", "the quality of" 这种高度抽象的解释方式。
- 🔧 [新工具] 编写 `check-synonyms.js`：自动提取同义词对（如 huge/enormous, calm/peaceful），检测它们的 `definition` 和 `imageKeyword` 是否有明显的区分度，防止在四选一 Quiz 中产生歧义。