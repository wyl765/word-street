# Word Street Level 3 审校报告

作为一个10岁男孩（爱好投资、C++、篮球、AI，阅读水平MAP 197）的妈妈，我审查了 Level 3 词库中可能让孩子卡住、误解或感到不适的内容。

## CRITICAL（必须修改：安全/学错风险）

- **文件**: words-level3a.js
  - **词条**: `naked`
  - **问题**: 安全/不当。尽管定义和例句（树木没有叶子）试图中和这个词，但 `imageKeyword` 是 "bare winter trees"。这个词本身对于儿童应用来说容易引起家长担忧，或者如果搜图API出问题，可能会出现不适当的图片。
  - **建议**: 对于10岁孩子，建议将此词替换为 `bare`，或者完全从词库中删除以避免安全风险。

- **文件**: words-level3a.js
  - **词条**: `terrify`
  - **问题**: 词汇定义和例句可能引发轻微的不适（lion roaring, terrify visitors），但更大的问题是 `imageKeyword: "terrifying roar"` 可能会搜出可怕的图片。
  - **建议**: 修改 `imageKeyword`，确保图片安全（比如卡通狮子或只是惊讶的表情），或者将例句改得更温和一些。

- **文件**: words-level3b.js
  - **词条**: `kill two birds with one stone`
  - **问题**: 安全/文化。虽然是常见习语，但包含 "kill" 可能会在一些敏感的安全过滤器中被拦截，且字面意义略显残忍。
  - **建议**: 考虑是否有更儿童友好的习语替代，或者修改 `imageKeyword` 确保只出现安全的“效率”概念图片（目前是 "multitasking efficiency"，挺好，但要确保不出现带武器的图）。

- **文件**: words-level3c.js
  - **词条**: `leech`
  - **问题**: 安全/不适。定义 "a worm-like creature that sucks blood" 包含 "sucks blood"。这可能会吓到孩子或引起不适。
  - **建议**: 可以稍微柔和一点，例如 "a small creature that lives in water and attaches to animals"。

- **文件**: words-level3c.js
  - **词条**: `inquest`
  - **问题**: 过于沉重/成人化。定义 "an official search, especially into a death" 提到了 death。这对10岁孩子来说过于沉重。
  - **建议**: 删除 "especially into a death"，改为 "an official search to find out facts about a situation"。

- **文件**: words-level3c.js
  - **词条**: `knell`
  - **问题**: 过于沉重。定义 "the sound of a bell rung slowly, often for a death" 包含 death。
  - **建议**: 修改为 "the sound of a bell rung slowly and seriously"。

## MAJOR（建议修改：孩子会卡住或无感）

- **文件**: words-level3a.js
  - **词条**: `barracks`
  - **问题**: 兴趣相关性低。军营对孩子来说比较遥远。
  - **建议**: 既然孩子喜欢C++和AI，也许可以把例句改成跟基地建设游戏相关的（比如星际争霸里的barracks）。

- **文件**: words-level3b.js
  - **词条**: `elocution`
  - **问题**: 过于学术/晦涩。MAP 197 的孩子不需要学这么古老/正式的词，日常极少用到。
  - **建议**: 建议替换为更实用的词，如 `presentation`，可以和投资/项目路演结合。

- **文件**: words-level3b.js
  - **词条**: `fumigate`
  - **问题**: 词汇过于专业/冷门。
  - **建议**: 替换为更常见的词。

- **文件**: words-level3c.js
  - **词条**: `homage`
  - **问题**: 对10岁孩子来说太抽象。
  - **建议**: 可以结合体育（篮球）来造句，比如 "The basketball player wore number 24 as a homage to his hero." 这样孩子一秒就能get到。

## MINOR（体验优化）

- **文件**: words-level3a.js
  - **词条**: `calculate`
  - **问题**: 例句太普通。
  - **建议**: 既然孩子喜欢编程和AI，例句可以改成 "He wrote a C++ program to calculate the scores of his basketball team."，直接打中兴趣点！

- **文件**: words-level3a.js
  - **词条**: `predict` (未在此次重点搜索中列出，但假设有)
  - **建议**: 可以和AI或投资结合，如 "The AI tried to predict the stock market."

## 建议固化项

- 🔧 [proofcheck规则] 建议在 `proofcheck.mjs` 中添加对 `death`, `blood`, `naked`, `kill` 等潜在敏感词的正则检测（`/death|blood|naked|kill/i`），如果出现在定义或例句中，抛出警告，需要人工确认。
- 🔧 [搭配规则] 无新建议。
- 🔧 [禁词] 建议将 `naked`, `leech` (含吸血定义的) 考虑加入 `BANNED_WORDS` 或降级。
- 🔧 [白名单] `kill two birds with one stone` 如果保留，需要将其加入习语白名单，并在图片搜索关键词中强制屏蔽暴力词汇。
- 🔧 [新工具] 无新建议。
- 🔧 [标准更新] 在 `QA-STANDARD.md` 中添加“儿童友好度”检查项：避免在例句和定义中使用涉及死亡、流血、裸露等成人化或引人不适的概念。对于兴趣，鼓励加入科技（AI、编程）和运动（篮球）相关的例句。