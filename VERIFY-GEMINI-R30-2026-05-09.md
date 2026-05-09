## Level 1 & 2 Dictionary Review

**Reviewer Focus**: ESL Child (MAP 197 / ~2nd Grade Reading Level)
**Criteria**: CRITICAL and HIGH issues only.

### 1. File: words-level1.js

*   **Line 135:** `{"word":"breeze","level":1,"definition":"a gentle soft wind","example":"The light breeze made the leaves dance.","imageKeyword":"breeze wind"}`
    *   **问题 (HIGH):** 抽象定义。 "breeze wind" 的图片搜索结果可能只是一般的风或者风景，无法直观展现 "微风" 的概念，或者会与 "wind" 的图片混淆。孩子难以形成清晰画面。
    *   **测试用例:** "The trees are moving just a little bit. What is blowing?" a) storm b) breeze c) tornado d) hurricane. (孩子如果看到强风图片，可能会选错)。
    *   **外部证据:** Collins Cobuild (for kids) "A breeze is a gentle wind." 建议 imageKeyword 改为 "gentle breeze moving leaves slightly" 或类似更具体的描述。

*   **Line 158:** `{"word":"discover","level":1,"definition":"to find something new","example":"She was excited to discover a frog under the log.","imageKeyword":"child finding frog under log"}`
    *   **问题 (CRITICAL):** "discover" 在小学阶段经常用于 "科学发现" 或 "探索未知"，定义 "to find something new" 太宽泛。如果孩子丢了铅笔又找到了，也是 "find something new (to their current situation)"，但这不叫 discover。这会导致过度泛化。
    *   **测试用例:** "I lost my toy yesterday, but today I _____ it under my bed." a) discovered b) found c) searched d) saw. (孩子按定义可能会选 discovered)。
    *   **外部证据:** Merriam-Webster Learner's Dictionary: "to see, find, or become aware of (something) for the first time". 必须强调 "for the first time" 或者 "learn about something you didn't know before".

### 2. File: words-level2.js

*   **Line 22:** `{"word":"setting","level":2,"definition":"where and when a story happens","example":"The setting is a snowy mountain at night.","imageKeyword":"snowy mountain"}`
    *   **问题 (HIGH):** imageKeyword "snowy mountain" 只展示了 "where"，完全没有体现 "when" (at night)，而且过于具象，无法表达 "setting" 作为一个文学概念。孩子看图可能会认为 setting 就是指山。
    *   **测试用例:** "Which of these describes the setting of a story?" a) a brave knight b) in a castle during a storm c) the knight fights a dragon d) they lived happily ever after. (孩子如果只理解为特定地点，可能无法选全)。
    *   **外部证据:** "Setting" 是抽象概念，图片难以直接表达。建议例句和图片更强调概念本身，或者 imageKeyword 更改以体现时间+地点的组合，例如 "storybook showing a castle at night".

*   **Line 39:** `{"word":"force","level":2,"definition":"a push or pull; also to make someone do something","example":"A force makes the swing move forward.","imageKeyword":"swing"}`
    *   **问题 (CRITICAL):** 包含了两个完全不同领域的含义 (物理概念 vs. 强迫)。对于2年级 ESL 孩子，"force" 作为科学词汇 (a push or pull) 是教学重点，把 "to make someone do something" 放在一起极其困惑，而且例句只覆盖了第一个意思。
    *   **测试用例:** "My mom used _____ to make me eat my vegetables." (如果孩子按物理定义理解，会觉得这是说妈妈在推/拉他)。
    *   **外部证据:** 针对低年级，词典通常将这两个意思分列词条。建议拆分，或只保留符合当前 grade level 科学大纲的定义 (a push or pull)。

## 建议固化项

- 🔧 [白名单] 无新建议。
- 🔧 [禁词] 建议在定义中禁用过于宽泛的解释，如对 discover 使用 find (without qualifying 'first time')。
- 🔧 [搭配规则] 建议将 "discover a lost item" 加入 WRONG_COLLOCATIONS，帮助测试脚本捕捉泛化错误。
- 🔧 [proofcheck规则] 检查 imageKeyword 是否过于具体而偏离了词汇本身的抽象或泛化含义（如 setting -> snowy mountain）。可以添加规则检查抽象名词的 imageKeyword 是否只对应了某一具体实例。
