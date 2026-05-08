# Word Street 词库审校报告 (Level 3 & 5)

## 总体评价
总体来看，Level 3 适合二年级水平，Level 5 稍微有些超纲，需要适度调整。作为10岁孩子的妈妈，我挑出了一些会让孩子困惑、卡住或搜图不安全的内容。

## 问题详情

### words-level3 系列
1. **CRITICAL: "abysmal" (level 3)**
   - 定义: "extremely bad or severe"
   - 问题: 这个词太难了，10岁孩子学个 "terrible" 或 "awful" 足够了，不需要学 "abysmal"。而且例句可能会很负面。

2. **MAJOR: "benevolent" (level 3)**
   - 定义: "well meaning and kindly"
   - 问题: 对于二年级阅读水平的孩子来说，词长太长，拼写困难。建议移到 level 4 或 5。

3. **MAJOR: "clandestine" (level 3)**
   - 例句: "The clandestine meeting happened at midnight."
   - 问题: 对于10岁孩子，"clandestine" (秘密的/暗中的) 有点难，且例句氛围稍显沉重。

4. **MINOR: "dichotomy" (level 3)**
   - 定义: "a division or contrast between two things"
   - 问题: 这个概念太抽象，10岁的孩子很难理解。建议换成更具体的词汇。

### words-level5 系列
1. **CRITICAL: "alacrity" (level 5)**
   - 定义: "brisk and cheerful readiness"
   - 例句: "She accepted the invitation with alacrity."
   - 问题: "brisk" 和 "alacrity" 对10岁孩子都比较生僻。可以解释得更简单，比如 "being quick and eager"。

2. **MAJOR: "ascendancy" (level 5)**
   - 定义: "a position of growing power or sway"
   - 问题: "power or sway" 这种概念比较政治化或成人化。建议解释为 "becoming the strongest or most popular"。

3. **MAJOR: "orthodontics" (level 5)**
   - imageKeyword: "dental braces"
   - 问题: 虽然词汇本身没问题，但 "dental braces" 的图片有时会引起一些孩子的牙医恐惧症。建议关键词加上 "smiling" 或者 "cartoon"。

4. **MINOR: "arbitrate" (level 5)**
   - 定义: "to act as a neutral judge in a disagreement"
   - 问题: "neutral judge" 和 "disagreement" 都可以，但可能更适合用 "referee" 等词来类比。

## 建议固化项

- 🔧 [禁词] 描述什么词应该加到BANNED_WORDS: `abysmal`, `clandestine`, `dichotomy` (太生僻或太抽象)
- 🔧 [搭配规则] 描述什么搭配错误应该加到WRONG_COLLOCATIONS数组: 无
- 🔧 [proofcheck规则] 描述什么pattern应该加到proofcheck.mjs正则里: imageKeyword 过滤，避免牙医相关引起恐惧。
- 🔧 [白名单] 描述什么误报应该加白名单: 无
- 🔧 [新工具] 描述需要新建什么检查脚本: 检查图片关键词是否包含可能引起恐惧的词。
- 🔧 [标准更新] QA-STANDARD.md需要改什么: 添加 "避免使用过于抽象的学术词汇 (如 dichotomy)" 和 "图片关键词需规避童年常见恐惧症源头"。
