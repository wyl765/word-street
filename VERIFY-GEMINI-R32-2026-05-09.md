# 英语词典质量审校报告

## CRITICAL: 定义对10岁孩子太难

**1. "lizard" (Level 1)**
- **文件与位置:** words-level1.js (搜 "lizard")
- **问题分析:** 定义是 "a small reptile with scaly skin, four legs, and a long tail"。对于2年级的中国ESL孩子来说，"reptile" (爬行动物) 和 "scaly" (有鳞的) 是生僻词，极大地增加了认知负担。孩子会被定义里的词卡住，反而学不会原词。
- **测试用例:** What kind of animal is a lizard? (孩子会因为不懂 reptile 而无法选择)
- **外部证据:** Merriam-Webster Kids定义: "a small cold-blooded animal with a long body and tail and four legs." 或用更基础的词 "an animal like a snake with four legs."

## HIGH: 图片提示词无法准确表意 (imageKeyword Ambiguity)

**2. "puppy", "kitten" 等 (Level 1)**
- **文件与位置:** words-level1.js
- **问题分析:** 这些词的 `imageKeyword` 仅仅是单词本身（例如 "puppy"）。AI画图时如果没有上下文，可能会画出成年狗。更严重的是，无法在图上向孩子传达“这是幼崽”的概念。
- **测试用例:** 给孩子看一张只有一只普通狗的图，问 "Is this a dog or a puppy?" 孩子难以区分。
- **外部证据:** 柯林斯儿童词典通常配图会有对比（如一只大狗旁边一只小狗，指示箭头指向小狗）。

## CRITICAL: 例句/定义可能包含复杂从句或超出认知

**3. "than" (Level 1)**
- **文件与位置:** words-level1.js 倒数第一行
- **问题分析:** 定义 "a word used to compare two things"。对于一个连语法术语都还没建立的10岁孩子来说，这种元语用学（meta-pragmatics）的解释非常抽象。例句 "She scored more points than anyone else on the basketball team." 对 Level 1 的孩子来说句子过长。
- **测试用例:** 问孩子: What does "compare" mean?
- **外部证据:** Oxford First Dictionary 往往直接给例子或非常简化的翻译，或者定义为 "used when you are looking at how things are different."

**4. "gigantic" (Level 1)**
- **文件与位置:** words-level1.js 第2行
- **问题分析:** 定义 "extremely big, bigger than big"。"bigger than big" 是一种修辞手法，ESL孩子可能难以处理这种嵌套逻辑（"比大还要大"），或者会误以为是一种新语法。
- **测试用例:** How big is gigantic? A. Big B. Very very big (孩子可能会疑惑为什么是 bigger than big)
- **外部证据:** Macmillan Dictionary for Children: "very, very large."

**5. "eventually" (Level 2)**
- **文件与位置:** words-level2.js 倒数第一行
- **问题分析:** 定义 "after a long time"。这个定义不完全准确，eventually 强调的是“最终，终于（尤其是在很多延迟或问题之后）”。"after a long time" 只是时间上的，丢失了逻辑递进，会跟 "later" 或 "in the future" 混淆。
- **测试用例:** "I waited ______, and then he came." (A. a long time B. eventually) - 用现在的定义孩子会选错。
- **外部证据:** Cambridge Learner's Dictionary: "in the end, especially after a long time or a lot of effort, problems, etc."

## 建议固化项

- 🔧 [proofcheck规则] 添加规则：Level 1 的 definition 中不能包含长度超过 7 个字母的复杂词汇（除非是常用词），需拦截如 "reptile", "scaly"。
- 🔧 [搭配规则] 无新建议
- 🔧 [禁词] 无新建议
- 🔧 [白名单] 无新建议
- 🔧 [新工具] 建立一个 `check_image_keyword.js` 脚本，强制校验 `imageKeyword` 不能与 `word` 完全相同。
- 🔧 [标准更新] QA-STANDARD.md 中补充："对于语法词/虚词（如 than），定义必须极度具象化，避免使用 'used to' 加语法术语。"
