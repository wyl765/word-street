# Word Street Level 3 审校报告 (Gemini R23)

## 发现的严重问题

### [HIGH] baroque
- **字段**: `a very fancy, decorated style of art from the 1600s and 1700s` / `The baroque palace had gold ceilings painted angels, and curving staircases.` / `baroque palace`
- **文件**: /Users/percy/.openclaw/workspace/projects/word-street/words-level3a.js
- **具体问题**: 我儿子在这里会卡住因为Baroque（巴洛克）对于10岁中国男孩太抽象了，'a very fancy, decorated style of art' 很难形成具体的心理画面，且这个词在10岁年龄段属于超纲文化词汇，超出了他们的背景知识（schema）。
- **测试用例**: 问10岁孩子'什么是巴洛克风格'，他只能想象'很花哨'，但无法区分它和普通'fancy'的区别。
- **外部证据**: Oxford Learner's Dictionary: baroque is often introduced at higher levels (C1) and requires historical context.

### [HIGH] corsair
- **字段**: `a pirate or a pirate ship` / `The corsair flew a black flag as it chased merchant ships across the sea.` / `pirate flag`
- **文件**: /Users/percy/.openclaw/workspace/projects/word-street/words-level3a.js
- **具体问题**: 我儿子在这里会卡住因为10岁孩子知道pirate，但corsair是一个非常生僻的近义词（通常指特定历史时期的海盗）。定义'a pirate or a pirate ship'没有体现出区分度，且对目标用户来说没有实用价值，增加了无谓的认知负荷。
- **测试用例**: 测试孩子corsair和pirate的区别，他完全无法区分，因为定义里本身就写着pirate。
- **外部证据**: Oxford Dictionary: corsair is literary/historical, not typical for MAP 197 reading level.

### [HIGH] fallow
- **字段**: `farmland left unplanted for a season to rest the soil` / `The farmer left the south field fallow this year, so the soil could recover.` / `empty field`
- **文件**: /Users/percy/.openclaw/workspace/projects/word-street/words-level3b.js
- **具体问题**: 我儿子在这里会卡住因为中国城市里的10岁男孩根本没有农田休耕（fallow）的概念。定义'farmland left unplanted for a season to rest the soil' 虽然准确，但场景离他们太远，很难产生共鸣和长期记忆。
- **测试用例**: 给孩子看图片，问他'为什么这块地没种东西'，他想不到是'为了让土壤休息'。
- **外部证据**: Merriam-Webster: fallow is often related to agricultural practices not common in everyday urban vocabulary.

### [HIGH] hackneyed
- **字段**: `used so often that it is no longer interesting` / `The hackneyed phrase 'time flies' appeared in almost every student's essay.` / `overused words`
- **文件**: /Users/percy/.openclaw/workspace/projects/word-street/words-level3b.js
- **具体问题**: 我儿子在这里会卡住因为10岁孩子连中文的'陈词滥调'都不一定懂，英文的hackneyed就更无法理解了。定义'used so often that it is no longer interesting'对于这个年龄段过于抽象。
- **测试用例**: 让孩子解释一个hackneyed phrase，他可能会举出错误例子，因为他不理解'因为用太多而变得无趣'这种抽象的语言学现象。
- **外部证据**: Cambridge Dictionary: 'hackneyed' is marked as C2 level, way beyond a 10-year-old's MAP 197 reading level.

### [HIGH] deciduous
- **字段**: `losing all leaves in autumn and growing new ones in spring` / `The deciduous oak tree dropped every leaf by November leaving bare branches against the sky.` / `bare autumn tree`
- **文件**: /Users/percy/.openclaw/workspace/projects/word-street/words-level3c.js
- **具体问题**: 我儿子在这里会卡住因为这个词本身拼写和发音极其困难，且在10岁中国男生的日常生活中属于冷门学术词汇，FK评分可能过高。定义'losing all leaves in autumn and growing new ones in spring'虽然直白，但词汇本身超纲。
- **测试用例**: 让孩子读这个词，大概率发音错误，且无法将其与日常的'落叶树'联系起来。
- **外部证据**: Biemiller's Words Worth Teaching: 'deciduous' is often introduced later in science curriculum (Grade 4-5 in native speakers, higher for ESL).

## 建议固化项

- 🔧 [proofcheck规则] 将 "a pirate or a pirate ship" 这种用近义词直接作为定义的模式加入检测，如果定义包含且仅包含近义词的简单说明，需报WARNING提示区分度不够。
- 🔧 [禁词] 建议将 `baroque`, `corsair`, `hackneyed` 加到BANNED_WORDS或降级到更高的Level（如Level 5+），因为它们超出了10岁ESL儿童的认知schema和词频需要。
- 🔧 [白名单] 无。
- 🔧 [新工具] 建议新建 `schema-check.mjs`，对接COCA的文化强相关词汇库或学术词汇表，自动标记那些10岁中国儿童完全没有生活经验的词（如特定历史时期艺术流派、专业农业术语）。
- 🔧 [标准更新] 在 QA-STANDARD.md 中增加“脱离中国10岁儿童日常经验的冷门专业词汇（如农耕术语、冷门历史名词）不得出现在 L1-L3” 的硬性标准。
