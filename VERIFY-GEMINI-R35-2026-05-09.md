# Gemini审校报告 R35 — 法务视角
日期: 2026-05-10
角色: Oxford University Press法务
范围: words-level1.js + words-level2.js

## 发现的问题

### [CRITICAL] 词条: bark
- **字段**: definition
- **问题**: 将名词（树皮）和动词/名词（狗叫）强行合并在一个词条的definition中。这违反了词典编纂的基本原则（不同词性的同形异义词应分列，或明确区分词性），会导致学生在阅读遇到“狗在bark”时，产生“狗在发出树皮的声音”或类似语法和语义混乱的误解。
- **测试用例**: 给学生看这个定义“the outer covering of a tree; also the loud sound a dog makes”，然后问“What is the bark doing?”，由于合并定义，学生无法区分其作为动词或不同名词的应用场景。
- **外部证据**: Oxford Learner's Dictionary 明确区分了 bark (noun): "the hard outer covering of a tree" 和 bark (verb): "to make a short loud sound" 并且将其作为独立词条或明确分项。

### [CRITICAL] 词条: match
- **字段**: definition
- **问题**: 同样将动词“匹配”和名词“比赛”在同一句定义中并列合并（"to find two things that are the same; also a game between two sides"）。会导致学生在造句时混淆词性，比如写出 "I will match the game" 或误认为"to find..."可以直接指代"a game"。
- **测试用例**: 让学生根据该定义造句，学生极易因为前段是"to..."（动词特征）后段是"also a game..."（名词特征）而产生语法混淆。
- **外部证据**: Merriam-Webster 将 match 作为动词 (to set in competition with) 和名词 (a contest between two or more parties) 严格分条列出，且给出对应词性。

### [HIGH] 词条: passenger
- **字段**: definition
- **问题**: Level 1词汇的定义中出现了难度显著高于目标词的 "vehicle"。Level 1对应约2年级水平，而"vehicle"在常规分级中属于更高阶词汇，会导致学生在查阅"passenger"时被"vehicle"卡住，完全无法理解定义。
- **测试用例**: 给10岁ESL学生看这个定义，问“What is a vehicle?”，如果学生不知道，他将无法理解 passenger 的含义。
- **外部证据**: Cambridge Dictionary (Learner's) 对初阶学习者的解释通常避开难词，如 "a person who is travelling in a car, bus, train, plane or ship and who is not driving it or working on it"，避免使用"vehicle"。

### [HIGH] 词条: shiny
- **字段**: definition
- **问题**: 定义 "bright and reflecting light" 中使用了 "reflecting" 这一高级且偏物理概念的词汇。目标词属于Level 1，而"reflect"属于Level 2或更高阶的词汇，会导致学生无法直接理解。
- **测试用例**: 给学生看该定义并要求解释，学生大概率会被 "reflecting" 阻碍，无法理解 "shiny" 的本意只是“闪闪发光的”。
- **外部证据**: Oxford Learner's Dictionary 基础版对 shiny 的定义是 "smooth and bright; reflecting the light"，但针对儿童或初学者，通常简化为 "bright and smooth" 避免使用 reflecting。

### [MEDIUM] 词条: bellows
- **字段**: imageKeyword / Level分配
- **问题**: "bellows" (风箱) 是非常生僻且过时的词汇，不应该出现在2年级英语水平（MAP 197）的词库中，且作为Level 2词汇难度过大。它会导致学生把宝贵的学习时间浪费在非高频词汇上，不符合ESL教育标准。
- **测试用例**: 抽取100名对应水平的ESL学生，测试他们对 "bellows" 的认知度，绝大多数将无法认知，证明其超出了该年龄段和MAP分数的合理范围。
- **外部证据**: COCA词频数据显示 "bellows" 的使用频率极低，属于中低频词汇，绝不属于2年级英语阅读的核心词汇范畴。

### [MEDIUM] 词条: whether
- **字段**: imageKeyword
- **问题**: "whether" 作为一个抽象连词，其 imageKeyword 设置为 "child holding coat looking at sky"，高度具象化但表意不清。会导致学生在看图猜词时将其误解为 "weather"（天气）或 "cold"，完全无法传达 "whether" 作为条件连词的本质含义。
- **测试用例**: 给学生展示 "child holding coat looking at sky" 的图片并要求写出对应单词，学生绝大部分会写出 "weather"、"sky" 或 "cold"，从而证明该图片检索词会产生严重误导。
- **外部证据**: Cambridge Dictionary 对 "whether" 的分类为 grammar/conjunction，通常建议此类抽象功能词避免使用易与同音词（weather）混淆的具象图片。

## 统计
- CRITICAL: 2
- HIGH: 2
- MEDIUM: 2
- LOW: 0

## 建议固化项
1. **同形多词性合并禁止规则**:
   - 描述：禁止在一个词条的 definition 中使用 "also a..." 或 "also to..." 来合并不同词性或完全不同含义的释义。
   - 检查逻辑：正则表达式检查 `definition` 字段中是否包含 `; also ` 或 `, also `。
   - 为什么需要：合并定义会导致学生语法混淆，无法区分词性。
2. **定义词汇降级规则**:
   - 描述：Level 1 的 definition 中不允许出现 Level 2 或更高级别的高频难词（如 vehicle, reflecting, substance）。
   - 检查逻辑：编写校验脚本，将 definition 分词后，去停用词，检查是否存在不在基础 500 词白名单中的词。
   - 为什么需要：避免用难词解释简单词，失去词典的释义功能。
3. **功能词抽象图片警告规则**:
   - 描述：对于连词、介词等功能词（如 whether, although），避免使用可能指向同音名词的具象 imageKeyword。
   - 检查逻辑：建立功能词库表，如果词语属于功能词，其 imageKeyword 包含具体的物理实体名词（如 coat, sky），则报警。
   - 为什么需要：防止发音相似（whether/weather）带来的视觉误导。
