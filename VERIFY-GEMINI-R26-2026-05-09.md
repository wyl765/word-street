# Word Street Level 1 & 2 审核报告 (妈妈视角)

## 问题列表 (CRITICAL & HIGH)

### Level 1

- **CRITICAL [gas]** (定义)
  - 问题：定义 "a kind of matter like air that is not a solid or a liquid" 包含太难的抽象词汇 "solid" 和 "liquid"。
  - 测试用例：让孩子解释什么是 gas，他可能会卡在 "什么是 solid" 上，完全忽略 gas 本身的意思。
  - 外部证据：Merriam-Webster Kids 定义为 "an airlike substance"（尽管 substance 也有点难，但这里把固液气三个概念混在一起对二年级孩子太复杂）。

- **CRITICAL [block]** (定义)
  - 问题：定义 "a solid piece of wood, stone, or plastic" 中的 "solid" 在这里作形容词，对 ESL 孩子来说，"solid" 比 "block" 还难。
  - 测试用例：孩子读到 solid 就卡住了，其实可以直接说 "a hard piece..."。
  - 外部证据：Oxford Learner's Dictionaries (A1) 常用 "a hard piece of material"。

- **CRITICAL [leak]** (定义)
  - 问题：定义 "to let liquid out through a hole" 中的 "liquid"。
  - 测试用例：不如直接用 "water or juice"。
  - 外部证据：Merriam-Webster Kids: "to let something (such as a liquid or gas) out or in by accident"。

- **CRITICAL [bagpipe / banjo / harp]** (定义)
  - 问题：定义使用了 "instrument"。对于10岁刚学英语的孩子，"instrument" 是个长难词（Level 3+ 的词）。
  - 测试用例：孩子根本不会读 instrument，更不知道它是什么，导致整个句子看不懂。可以直接用 "a thing for making music"。
  - 外部证据：可以用 "a tool for making music" 等更简化的表达。

- **HIGH [chick]** (定义)
  - 问题：定义 "a baby chicken" 包含了衍生词。孩子如果不认识 chicken 就不认识 chick，但好在 chicken 很常见，但有循环定义之嫌。
  - 测试用例：问孩子 chick 是什么，他会以为跟 chicken 一模一样，没区分 baby。
  - 外部证据：Merriam-Webster Kids: "a young chicken"。

### Level 2

- **HIGH [accept]** (例句)
  - 问题：例句 "I decided to accept the trade and swap my rare card for two common ones." 太长（15词），且结构复杂 ("decided to", "swap... for...")。
  - 测试用例：二年级 ESL 孩子读到一半就忘了前面，且 "swap my rare card" 的语境对有些孩子可能不熟悉。
  - 外部证据：儿童词典通常使用更短的例句，如 "He accepted the gift."

- **CRITICAL [nectar]** (定义)
  - 问题：定义 "sweet liquid inside flowers that bees collect" 再次使用 "liquid"。
  - 测试用例：直接用 "sweet water" 会让孩子瞬间秒懂。

## 建议固化项

- 🔧 [proofcheck规则] 在 `proofcheck.mjs` 中增加对长单词（>10个字母，如 instrument）和学术词（solid, liquid, matter, substance, device）在 Level 1/2 定义中的拦截规则。
- 🔧 [搭配规则] 无新建议。
- 🔧 [禁词] 建议将 `instrument`, `solid`, `liquid` 加到 Level 1/2 的 BANNED_WORDS 列表中（在定义中禁用，除非是目标词本身）。
- 🔧 [白名单] 无新建议。
- 🔧 [新工具] 建议新建一个脚本 `check-sentence-length.js`，强制 Level 1/2 的例句长度不超过 12 个单词，超过则报警告。
- 🔧 [标准更新] 在 QA-STANDARD.md 中增加："Level 1和2的定义中，绝对不能使用比目标词本身更长、更难的解释词汇（如用 instrument 解释 harp）。例句结构必须是简单句，禁止使用含有复杂从句或超过12个单词的长句。"