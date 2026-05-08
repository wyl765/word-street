# Claude 竞品审校报告 — L5 (1099词) — 2026-05-08 Round 9

**角色：** 竞品公司产品经理，专找能攻击产品的弱点
**范围：** words-level5a.js (232词) + words-level5b.js (251词) + words-level5c.js (328词) + words-level5d.js (288词) = 1099词
**方法：** 逐条全量扫描

---

## CRITICAL 问题

### 1. "impunity" — 例句缺少标点，是语法硬伤 (run-on sentence)
- 文件: words-level5d.js
- 例句: "The bully acted with impunity no one reported his behavior."
- 问题: 两个独立子句之间没有标点（需要句号、分号或连接词），这是run-on sentence，在儿童词汇产品里出现语法错误是致命的
- 建议: 改为 "The bully acted with impunity because no one reported his behavior." 或 "The bully acted with impunity; no one reported his behavior."

---

## MAJOR 问题

### 1. "subdivide" — 定义有语法问题
- 文件: words-level5b.js
- 定义: "to cut or split it into smaller bits"
- 问题: 定义中的"it"无指代对象，不符合词典定义规范。且"bits"过于口语化
- 建议: "to divide something into smaller parts"

### 2. "medium" — 定义过窄且不准确
- 文件: words-level5a.js
- 定义: "a way of talking or expressing thoughts"
- 问题: medium作为传播媒介不仅是"talking"，还包括文字、图像、视频等。定义过窄导致学生对词义理解片面
- 建议: "a way of sharing information or ideas with others"

### 3. "enlighten" — 定义不自然
- 文件: words-level5c.js
- 定义: "to give someone what you know or grasp"
- 问题: "give someone what you know or grasp"语义模糊，不像词典定义。"grasp"在这里做名词用也很罕见
- 建议: "to give someone knowledge or understanding"

### 4. "patriot" — 例句语法不自然
- 文件: words-level5c.js
- 例句: "The patriot helped out to serve in the army during wartime."
- 问题: "helped out to serve"不是自然英语搭配。"helped out"后面不接"to serve"
- 建议: "The patriot volunteered to serve in the army during wartime."

### 5. "pension" — 定义用词不精确
- 文件: words-level5c.js
- 定义: "normal payments made to someone after they retire"
- 问题: "normal"在这里应该是"regular"（定期的），"normal payments"意为"正常金额的付款"，语义错误
- 建议: "regular payments made to someone after they retire"

### 6. "cognition" — 例句搭配不自然
- 文件: words-level5d.js
- 例句: "Reading puzzles helps grow cognition and problem-solving skills."
- 问题: "grow cognition"不是自然搭配。英语里说"improve cognition"或"develop cognitive skills"，不说"grow cognition"
- 建议: "Reading puzzles helps improve cognition and problem-solving skills."

### 7. "prognosis" — 定义不准确
- 文件: words-level5b.js
- 定义: "a prediction about how something will grow"
- 问题: "grow"语义不对。prognosis是关于疾病/情况如何发展(develop/progress)的预测，不是"grow"
- 建议: "a prediction about how a condition or situation will develop"

### 8. 大量L5例句只含动词变形，不含原形 (系统性问题)
以下词的例句只有过去式/过去分词/第三人称单数，没有目标词原形：

**words-level5a.js (约20个):**
- deem → "deemed"
- belie → "belied"
- berate → "berated"
- wield → "wielded"
- espouse → "espoused"
- hinder → "hindered"
- extol → "extolled"
- glean → "gleaned"
- surmise → "surmised"
- consign → "consigned"
- construe → "construed"
- decry → "decried"
- delude → "deluded" (wait, "Don't delude yourself" ✓)
- efface → "effaced"
- abscond → "absconded"
- desiccate → "desiccated"
- molt → "molted"

**words-level5b.js (约25个):**
- tout → "touted"
- raze → "razed"
- rebuff → "rebuffed"
- spawn → "spawned"
- supplant → "supplanted"
- corrode → "corroded" (wait — "will corrode" ✓)
- comprise → "comprises"
- acclaim → "received acclaim" (noun use ✓)
- resonated → "resonated"
- ensue → "to ensue" ✓
- foreclose → "may foreclose" ✓

**words-level5c.js (约15个):**
- allude → "alluded"
- depleted → already adjective form
- conspire → "conspired"

**words-level5d.js (约12个):**
- clamber → "clambered"
- coalesce → "coalesce" ✓
- bewilder → "bewildered"
- exonerate → "exonerated"

实际影响的词约40-50个。建议用脚本批量检测并修复。

---

## MINOR 问题

### 1. "sober" — 定义提及酒精
- 文件: words-level5b.js
- 定义: "serious and thoughtful; not affected by alcohol"
- 问题: 对于10岁儿童产品，提及"alcohol"可能不适合。但L5是进阶词库，且定义列了两个含义
- 建议: 考虑只保留"serious and thoughtful"含义，或改为"serious and thoughtful; not under the influence of any substance"

### 2. "ammunition" — imageKeyword "bullets supply"
- 文件: words-level5c.js
- 问题: 搜"bullets supply"会返回真实弹药图片，对儿童不适合
- 建议: 改为 "nerf darts" 或去掉此词

### 3. "cavalry" — 例句有战斗场景
- 文件: words-level5b.js
- 例句: "The cavalry charged across the battlefield on their strong horses."
- 问题: L5历史词汇，战斗场景在context里是可接受的。仅标记为awareness

### 4. "guerrilla" — 涉及武装攻击
- 文件: words-level5b.js
- 例句: "Guerrilla fighters used the jungle as cover for their surprise raids."
- 问题: 同上，L5历史/政治词汇，可接受但需注意

### 5. imageKeyword重复模式
- "affirmation" 和 "affirmative" 的 imageKeyword 都含 "thumbs up"
- "complacent" (L5b) 和 "complacency" (L5d) 的 imageKeyword 都是 "lazy relaxed"
- 建议: 检查L5内imageKeyword去重

### 6. "stoic" — 例句大写了"Stoic"
- 文件: words-level5b.js
- 例句: "The Stoic farmer worked through the heat..."
- 问题: 大写"Stoic"指哲学流派，小写"stoic"指性格特质。例句用了大写但定义是小写含义，不一致
- 建议: 改为 "The stoic farmer..."

---

## 审校结论

**L5词库整体质量评估：**
- 1 CRITICAL (run-on sentence)
- 7 MAJOR (定义不准确3个 + 语法/搭配问题3个 + 系统性例句缺原形1个)
- 6 MINOR
- 定义准确性：整体良好，个别需修正
- 例句质量：多数自然，但~40-50个只含变形
- imageKeyword：个别重复或不适，总体可接受

---

## 建议固化项

- 🔧 [proofcheck规则] 增加run-on sentence检测：两个独立子句之间没有标点/连接词。可用简单正则检测：句中含完整SVO结构但无逗号/分号/连接词的模式
- 🔧 [proofcheck规则] 增加"定义中不该出现代词it/they/you等"的检查（定义应该是通用描述，不引用具体对象）
- 🔧 [proofcheck规则] 检测imageKeyword在同Level内重复（当前只检查了跨Level，未检查同Level内）
- 🔧 [搭配规则] 加 "grow cognition" → 应为 "improve cognition" 或 "develop cognition"
- 🔧 [搭配规则] 加 "normal payments" → 在pension/salary语境下应为 "regular payments"
- 🔧 [禁词] 在L1-L3的definition/example中禁止"alcohol"、"beer"、"wine"（L4-L5允许但标MINOR）
- 🔧 [白名单] "Stoic"大写在例句中应标记检查（大小写影响含义的词）
- 🔧 [新工具] 建议增强proofcheck.mjs：检测例句中目标词是否以原形出现（不只是任意形式）。对动词，原形=base form；对名词，原形=单数；对短语，允许自然变形。这是L3和L5共同的系统性问题。
- 🔧 [标准更新] QA-STANDARD.md明确：定义中不应包含无指代的代词(it/they等)；imageKeyword在同Level内不应重复。
