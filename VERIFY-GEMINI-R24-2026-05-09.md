# Word Street Level 5 Review

## 发现的严重问题 (CRITICAL/HIGH)

### 1. 同级词库内 `imageKeyword` 重复 (10岁孩子做图像匹配题时会卡死)
**具体问题**：Word Street 如果用 `imageKeyword` 去 Unsplash 取图或做题，不同单词使用完全相同的关键字会导致题目图像混淆。
**测试用例**：
- `palliate` 和 `alleviate` 都用了 `easing pain`。
- `aggravate` 和 `exacerbate` 都用了 `making worse`。
- `amalgamate` 和 `consolidation` 都用了 `merging together`。
- `appease` 和 `placate` 都用了 `calming down`。
- `comparable` 和 `juxtaposition` 都用了 `side by side`。
- `complacent` 和 `complacency` 都用了 `lazy relaxed`。
- `degradation` 和 `attrition` 都用了 `wearing down`。
- `exemplify` 和 `epitome` 都用了 `perfect example`。
- `improvise` 和 `fabricate` 都用了 `making up`。
- `supplant` 和 `supersede` 都用了 `replacing old`。
- `unwitting` 和 `oblivious` 都用了 `unaware person`。
- `affirmative` 和 `affirmation` 都用了 `thumbs up`。
- `utopia` 和 `utopian` 都用了 `perfect world`。
- `admonition` 和 `reprimand` (以及 `admonish`) 都用了 `stern warning`。
- `incriminate` 和 `implicate` 都用了 `evidence pointing`。
- `intercede` 和 `intervention` 都用了 `stepping in`。
- `introspection` 和 `contemplation` 都用了 `deep thought`。
- `principled` 和 `ethic` 都用了 `moral compass`。
- `propriety` 和 `comport` 都用了 `proper behavior`。
- `vindicate` 和 `exonerate` 都用了 `proven innocent`。
- `amicable` 和 `amicably` 都用了 `friendly handshake`。
- `lofty` 和 `daunting` 都用了 `tall mountain`。

**外部证据**：程序检索了 `/tmp/level5.json`，发现了这些精确的重复字符串匹配。

### 2. 名词定义格式错误 (使用了 "when..." 从句，中国学生会以为是副词或连词)
**具体问题**：名词定义不能用 "when..." 开头，这在英文词典学中是不规范的（应当用 "the act of..."，"the state of..." 或直接用名词短语）。10岁孩子看到 "when..." 会卡住，不知道该用作句子里的什么成分。
**测试用例**：
- `abolition`: "when a law or rule is ended permanently"
- `ambiguity`: "when something can be understood in more than one way"
- `coincidence`: "when two things happen at the same time by chance"
- `foreclosure`: "when a bank takes back a house because the owner cannot pay"
- `germination`: "when a seed begins to grow into a plant"
- `industrialization`: "when a country builds many factories and starts to produce goods on a large scale"
**外部证据**：Merriam-Webster Learner's Dictionary 规定：名词定义必须是名词短语。例如 `abolition` 定义为 "the act of officially ending or stopping something"。

### 3. `cliche` 例句大小写和音标不一致 (原形和例句变形严重不匹配)
**具体问题**：`word` 字段是 `cliche`，但例句里写的是带重音符号的 `cliché`。如果系统做精确的 substring match 来挖空，这里会匹配失败（找不到 `cliche` 这个词）。
**测试用例**：
- Word: `cliche`
- Example: "Saying 'easy as pie' is a cliché that everyone has heard before."
**外部证据**：如果用 JS 的 `.includes("cliche")` 检查该例句，结果为 false。

### 4. 目标词难度不一致与抽象性过高 (10岁ESL孩子完全无法理解的定义)
**具体问题**：Level 5 针对的是 MAP 197（约2年级水平），但一些词汇如 `mercenary`，`industrialization`，`capitalism`，`biodiversity` 的定义中包含了他们难以理解的社会学/生物学概念。
**测试用例**：
- `capitalism`: "a system where people own their own businesses". 孩子可能无法区分这和普通卖东西的区别。
- `utopia` / `utopian`: 乌托邦的概念对 10岁孩子来说过于抽象，例句缺乏具体情境。
**外部证据**：Lexile 和 MAP RIT scale 显示，涉及政治经济体制的抽象名词通常在 RIT 210+ (4-5年级) 才会出现。

### 5. 多义词处理不足导致困惑
**具体问题**：部分单词有常用多义，但只给出了最偏的或较难的一个，或者给出的定义不适合 10岁孩子的认知。
**测试用例**：
- `casualty`: 例句使用了复数 `casualties`，定义是 "a person killed or injured in a war or accident"，这涉及到死亡和战争，可能触发敏感/不适内容审查（对于较小年龄的孩子）。
**外部证据**：ESL 材料通常对 "kill" "war" 等词汇在初级读物中有规避，或用更温和的词（如 hurt）。

## 建议固化项

- 🔧 [proofcheck规则] 强制检查 `imageKeyword` 唯一性：在同 level 的所有 JSON 中，`imageKeyword` 的 Set 的大小必须等于单词总数。
- 🔧 [proofcheck规则] 名词定义正则检查：如果是名词（通过词性字典判断，或排除 "to" 开头的动词），定义绝不能以 `when ` 开头。
- 🔧 [proofcheck规则] 包含检查扩展：例句中的目标词如果带有变音符号（如 é），或者发生不规则变形（如 decry -> decried, embody -> embodies, casualty -> casualties），必须提供 fallback 的 match 规则，或者强制在数据中加一个 `lemma` / `exactMatch` 字段。
- 🔧 [禁词] 在低龄（Level 5, MAP 197）语料中，考虑将 `kill`，`war` 等过于沉重的词列入警告词表。
