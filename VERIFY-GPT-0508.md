# VERIFY-GPT-0508

审校范围（逐词抽查 + 规则扫描）：
- `words-level1.js`
- `words-level2.js`
- `words-level2a.js`
- `words-level2b.js`

目标用户：10岁中国 ESL 男孩（英语阅读约 G2）。

> 严重级别：
> - **CRITICAL**：会教错/会导致题目或功能直接失效/明显不适龄，必须改
> - **MAJOR**：明显影响学习体验或易引发误解，应该改
> - **MINOR**：表达/风格优化，建议改

---

## CRITICAL（必须改）

### words-level2.js
- **become**
  - 问题：例句里是 **became**，但当前系统校验（proofcheck）判定 **WORD_NOT_IN_EXAMPLE**（对 irregular 变形识别失败会导致“例句不含目标词”的硬性错误）。
  - 建议改法（二选一，推荐 A）：
    - A：改例句，直接包含 **become**：`The sky will become dark before the storm.`
    - B：proofcheck 增加 irregular 词形映射（见文末“建议固化项”）。

### words-level2b.js
- **myth**
  - 问题：定义 **“an old story that explains how something in nature works”** 过于狭窄且不准确；myth 常指传统故事（常涉及 gods/heroes），并不只解释自然现象。
  - 建议：改为更标准、可教的定义，例如：
    - `a very old traditional story, often about gods or heroes`
    - 或更儿童友好：`an old story that people tell, often about gods, heroes, or how the world began`

---

## MAJOR（应该改）

### words-level1.js
- **toast**
  - 问题：`imageKeyword: "toast"` 搜图高概率出现“敬酒/祝酒（a toast）”而不是“烤面包”。图片歧义会直接影响游戏体验。
  - 建议：改 `imageKeyword` 为更明确的：`toast bread` / `slice of toast` / `buttered toast`。

- **mushroom**
  - 问题：定义写成 `a food ...; it is a fungus, not a plant`：
    - 用 **fungus** + 分号结构对 L1 学习者偏难（虽然事实更准确）。
    - “a food that grows…” 也略带误导（并非所有 mushroom 都是 food）。
  - 建议（尽量短+准确）：
    - `a kind of fungus that grows in damp, dark places`（更标准）
    - 或更低龄：`a kind of thing that grows in damp, dark places (some are food)`

### words-level2.js
- **dagger**
  - 问题：武器词 + `imageKeyword: "dagger knife"` 很容易搜到写实武器/血腥氛围图；对 10 岁儿童不友好。
  - 建议：
    - 若必须保留词条：把 imageKeyword 改成 `toy dagger` / `cartoon dagger` / `pirate dagger cartoon`，并让例句避免“武器现实使用”语境。
    - 或直接：将该词移出低龄词库/提高 level。

### words-level2a.js
- **raw**
  - 问题 1：`imageKeyword: "raw vegetables"` 与例句 `raw chicken` 不一致；会导致图片与语义对不上。
  - 问题 2：`raw chicken` 对儿童（尤其 ESL）有点“恶心/不适”风险，也容易引发食品安全讨论偏题。
  - 建议（推荐）：
    - 改例句匹配图片：`Some vegetables taste good raw.`
    - 或：`I like to eat raw carrots.`（简单、直观、图片好找）

### words-level2b.js
- **vaccine**
  - 问题：`imageKeyword: "shot"` 搜图可能出现枪支/射击（shot）而非医疗注射；图片歧义严重。
  - 建议：改为 `vaccine shot` / `flu shot` / `doctor vaccine` / `vaccination clinic`。

- **slavery**
  - 问题：主题沉重（社会暴力/压迫），且 `imageKeyword: "chains broken"` 可能出现压迫/暴力暗示画面；不一定适合“词汇学习游戏”的默认 L2。
  - 建议：
    - 若保留：图片关键词改为更“符号化、非写实”的：`broken chains icon` / `freedom symbol`，并在 QA 标准中明确“避免写实暴力画面”。
    - 或：将此类社会历史沉重词汇整体移动到更高 level/专门主题包。

- **amendment**
  - 问题：定义依赖 **constitution**（对 ESL G2 太抽象/太美国语境）；proofcheck 也已提示 COMPLEX_DEFINITION。
  - 建议：
    - 若目标是“通用英语”：考虑换成更通用的 `change` / `rule` / `law` 等；或把 amendment 放到更高 level。
    - 若坚持保留：定义换成更低阶表达：`a change to a country's rules or laws`。

---

## MINOR（建议改）

### words-level2b.js
- **vowel**
  - 问题：定义 `the letters a, e, i, o, u` 对初学者常用，但严格来说英语里 **y** 有时也算 vowel。
  - 建议：`the letters a, e, i, o, u (and sometimes y)`（或在更高年级再补充）。

- **diet**
  - 问题：定义 `the food a person or animal most times eats` 不自然。
  - 建议：`the food a person or animal usually eats`。

- **carbon**
  - 问题：定义 `a material found in all living things` 可能让孩子误以为 carbon 只和“活的东西”有关。
  - 建议：更准确且仍简单：`an element found in living things and many other materials (like coal)`。

### words-level2.js
- **cider**
  - 问题：`a drink made from apples` 没问题，但英文环境里 cider 可能联想到酒精饮品。
  - 建议：若想避免歧义：例句/图里固定 `apple cider` / `warm apple cider`。

---

## 建议固化项

- 🔧 [proofcheck规则] **补齐 irregular verb 词形映射**：至少加入 `become ↔ became`（否则会持续触发 WORD_NOT_IN_EXAMPLE 误报/漏报）。建议建立 `IRREGULAR_FORMS` 映射表：`{ become:["became","become"], ... }` 并用于 example matching。

- 🔧 [proofcheck规则] **imageKeyword 歧义词告警**：当 `imageKeyword` 为高歧义/高风险单词（如 `shot`, `toast`, `dagger`, `knife`, `gun` 等）且未包含 disambiguator（如 `bread`, `doctor`, `cartoon`, `toy`）时，输出 MAJOR：`AMBIGUOUS_IMAGE_KEYWORD`。

- 🔧 [禁词] 若产品定位为“低龄无武器写实”，建议把 **dagger**（以及同类 weapon 词）加入 `BANNED_WORDS` 或者分级：L1/L2 禁用、L4+ 可用。

- 🔧 [标准更新] `QA-STANDARD.md` 建议加一条：**社会历史沉重主题（slavery/revolution 等）必须：**
  1) 图像关键词偏符号化、非写实、无暴力元素；
  2) 默认不放入低龄基础词库，除非明确“主题包/高年级”。

- 🔧 [新工具] 新增一个轻量脚本：`imagekeyword-risk-scan.mjs`：
  - 扫描 imageKeyword 是否为单词 `shot/toast/...` 等高歧义项
  - 输出建议替换词（如 `toast bread`, `vaccine shot doctor`）

