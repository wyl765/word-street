# Gemini 妈妈视角审校报告 — 2026-05-08 Round 6
**角色：** 10岁孩子的妈妈
**范围：** L1-L5全部

## CRITICAL 问题
### 1. [定义超出认知范围]
- 文件: words-level1.js
- 词: spine
- 问题: "the bones down your back that help you stand straight" - 这个定义本身没大错，但对于一个基础词库，"bones down your back" 有点抽象。
- 建议: 改为 "the row of bones in the middle of your back" 

### 2. [图片搜索可能不当]
- 文件: words-level1.js
- 词: skull
- 问题: imageKeyword 是 "head bone helmet"。如果你直接搜 "skull"，可能会出来恐怖的骷髅图片，这会吓到10岁的孩子。虽然这里加了 helmet，但风险还在。
- 建议: imageKeyword 改为 "skull bone diagram for kids" 或者 "x-ray skull".

## MAJOR 问题
### 1. [例句无聊]
- 文件: words-level1.js
- 词: muscle
- 问题: "He flexed his arm to show his muscles." - 这太老套了，男孩不会觉得有趣。
- 建议: 换成和他们生活相关的，比如："The superhero used his big muscles to lift the car." 或者 "Playing basketball helps you build strong muscles."

### 2. [定义太复杂]
- 文件: words-level1.js
- 词: mushroom
- 问题: "a living thing with a cap and stem that grows in damp, dark places" - 对于 level 1，"damp" 这个词可能比 "mushroom" 还难。
- 建议: 改为 "a small plant with a round top that grows in the dirt or on old wood"

## MINOR 问题
### 1. [例句可以更有趣]
- 文件: words-level1.js
- 词: shark
- 问题: "The shark swam fast through the dark water." - 还可以，但可以更吸引人。
- 建议: "The great white shark showed its sharp teeth as it swam."

## 建议固化项
- 🔧 [禁词] 描述什么词应该加到BANNED_WORDS: `damp`, `dismal`, `gore`, 等超出当前level理解或可能引起不适的词。
- 🔧 [proofcheck规则] 描述什么pattern应该加到proofcheck.mjs正则里: 检查 `imageKeyword` 里是否包含可能搜出恐怖/血腥图片的词（如 `skull`, `blood`, `wound`），必须带有 `kids`, `diagram`, `cartoon` 等安全后缀。
