
# Word Street 词库审查报告 (Level 1 & 2)

## CRITICAL（孩子完全无法理解）

- **word**: `feast` (Level 1)
  - **当前定义**: a very big special meal
  - **问题描述**: 10岁孩子可能不理解 feast 和 big meal 的区别，且在 L1 出现过早（属于低频词）。
  - **修复建议**: 移至 Level 2，或者修改例句增加具体情境（如感恩节）。

- **word**: `spine` (Level 1)
  - **当前定义**: the bones down your back that help you stand straight
  - **问题描述**: bones, straight 对部分L1水平孩子仍有难度，概念较抽象。
  - **修复建议**: the bone in the middle of your back.

- **word**: `pretzel` (Level 1)
  - **当前定义**: a twisted baked snack
  - **问题描述**: twisted, baked 对 L1 来说是超纲词。用词比原词还难！
  - **修复建议**: a salty snack shaped like a knot. (如果 knot 也不认识，可以直接用 a hard, salty bread snack)

## HIGH（孩子会很困惑）

- **word**: `mushroom` (Level 1)
  - **当前定义**: a soft thing with a round top that grows in damp, dark places
  - **问题描述**: damp 是绝对的超纲词，L1的孩子肯定不认识。
  - **修复建议**: a plant shaped like an umbrella that you can eat.

- **word**: `gravy` (Level 1)
  - **当前定义**: a thick sauce you pour on meat
  - **问题描述**: sauce, pour 存在一定难度。
  - **修复建议**: a brown soup you put on meat and potatoes.

## MEDIUM（可以改得更好）

- **word**: `swan` (Level 1)
  - **当前定义**: a big white bird with a very long curved neck that floats on lakes
  - **问题描述**: curved neck 偏复杂。
  - **修复建议**: a big white bird with a long neck that lives on water.

- **word**: `syrup` (Level 1)
  - **当前定义**: a thick sweet stuff you pour on food
  - **问题描述**: stuff 过于口语化/不严谨，pour 可能不认识。
  - **修复建议**: sweet, sticky liquid for pancakes.

## 建议固化项

- 🔧 [proofcheck规则] 检查定义中是否包含 `twisted`, `damp`, `curved` 等典型的 L3+ 级别词汇。建议引入一个 ESL 2000 基础词表，定义中的词必须100%在这个词表内。
- 🔧 [搭配规则] 无新建议
- 🔧 [禁词] 将 `damp`, `twisted` 加入定义禁词。
- 🔧 [白名单] 无新建议
- 🔧 [新工具] 创建一个 `check-def-vocab.js` 脚本，利用基础词库交叉比对，输出定义中所有超纲词。
- 🔧 [标准更新] QA-STANDARD.md 中需明确：Level 1 的 definition 长度不能超过 10 个单词，不能包含多从句。
