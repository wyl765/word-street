# Claude 竞品审校报告 — 2026-05-08 Round 3

**角色：** 竞品公司产品经理，专找能攻击产品的弱点
**范围：** words-level3*.js, words-level4*.js, words-level5*.js (L3-L5, 约2800词)
**方法：** 逐文件programmatic扫描 + 定义/例句人工抽查

---

## CRITICAL 问题

### 1. 定义语法错误：destitution
- 文件：words-level4a.js
- 原始定义："extreme being poor without money or possessions"
- 问题："extreme being poor"语法不通，应为名词短语
- **已修复：** 改为"the state of having no money or possessions"

### 2. 定义用词不当：expediency 
- 文件：words-level4a.js
- 原始定义："the quality of being convenient and hands on rather than fair"
- 问题："hands on"缺连字符（应为"hands-on"），且含义偏差——expediency更强调"实用/权宜"而非"动手"
- **已修复：** 改为"the quality of being quick and practical rather than fair"

---

## MAJOR 问题

### 3. imageKeyword搜图歧义：inoculate
- 文件：words-level4c.js
- 原始imageKeyword："vaccination shot"
- 问题："shot"搜图可能出现枪支/射击
- **已修复：** 改为"doctor giving vaccine"

### 4. 例句未包含目标词变形（已知白名单）
以下词条例句使用了变形但proofcheck已有映射，确认无误：
- communique → communiqué（重音符）
- idiosyncrasy → idiosyncrasies（复数）
- cliche → cliché（重音符）
- beneficiary → beneficiaries（复数）
- commodity → commodities（复数）
- amenity → amenities（复数）
- casualty → casualties（复数）
- orthodontics → orthodontic（形容词形式）

### 5. 定义过于模糊（双重"something"）
- `derivative` (L4): "something that is based on or comes from something else"
- `precursor` (L4): "something that comes before and leads to something else"
- `adjacent` (L4): "next to or near something without something in between"
- `deterrent` (L5): "something that prevents people from doing something"
- `prerequisite` (L5): "something needed before you can do something else"
这些定义虽然简单易懂，但连续使用"something...something"显得词典水平偏低。L4/L5应更精确。

### 6. L5定义过短（2词定义不适合高级词汇）
- `hapless` (L5): "unlucky; unfortunate" — 仅2词
- `rampant` (L5): "spreading uncontrollably" — 仅2词
- `bliss` (L5): "perfect happiness" — 仅2词
- `eternal` (L5): "lasting forever" — 仅2词
这些在L1可接受，但L5学生应看到更完整的定义。

### 7. imageKeyword过于简陋（直接等于单词本身）
- microscope, chrysalis, earthquake, cell, peninsula, governor, timeline (全在L3b)
- 这些单词搜图虽然安全，但imageKeyword应该是具体场景描述而非单词本身。
  - microscope → "scientist using microscope"
  - chrysalis → "butterfly chrysalis on branch"
  - earthquake → "earthquake cracked road"
  - cell → "animal cell diagram"
  - peninsula → "peninsula coastline aerial"
  - governor → "governor speaking podium"
  - timeline → "history timeline chart"

---

## MINOR 问题

### 8. L3多义词定义含分号（可能造成混淆）
- ditto: "the same thing again; used to avoid repeating"
- subsequently: "after that; next"
- impervious: "not affected by something; unable to pass through"
- insular: "cut off from others; narrow in thinking"
L3学生可能被分号后的第二义干扰。建议L3保持单一含义。

### 9. persona定义包含"personality"（循环）
- 文件：words-level4c.js
- 定义："the image or personality someone shows to the world"
- "personality"包含"persona"的词根，虽然不算严格循环，但不够ideal

---

## 总体评估

- **L3文件：** 质量良好，idiom类(L3b)整体高质量，少量imageKeyword过于简陋
- **L4文件：** 2个语法/定义CRITICAL已修复，部分定义用"something"过多
- **L5文件：** 部分定义过短(2词)，不符合高级词汇的词典标准
- **无事实错误发现**
- **无搭配错误发现**
- **无NSFW/暴力内容**

## 建议固化项

- 🔧 [proofcheck规则] 检测定义中出现2次及以上"something"的条目，标记为VAGUE_DEFINITION
- 🔧 [proofcheck规则] 检测imageKeyword等于word本身的条目，标记为LAZY_IMAGEKEYWORD
- 🔧 [proofcheck规则] 检测L4/L5定义仅2词或以下的条目，标记为SHORT_DEF_ADVANCED（L1-L2的2词定义可接受，L4/L5不行）
- 🔧 [proofcheck规则] 检测定义中"extreme + gerund"等语法不通的pattern
- 🔧 [白名单] 以下plural形式需要加入proofcheck不规则变形映射：idiosyncrasy→idiosyncrasies, beneficiary→beneficiaries, commodity→commodities, amenity→amenities, casualty→casualties
- 🔧 [白名单] orthodontics→orthodontic (形容词形式) 需要加入映射
- 🔧 [搭配规则] 无新增
- 🔧 [禁词] 无新增
- 🔧 [新工具] 无需新建
- 🔧 [标准更新] 增加：L4/L5定义最少4词，imageKeyword不能等于word本身
