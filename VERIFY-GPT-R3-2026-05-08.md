# VERIFY-GPT-R3-2026-05-08 — Word Street L3/L4 词库审校（GPT Round 3）

目标用户：10岁中国ESL男孩（MAP 197，约2年级英语阅读）  
审校范围：words-level3.js, words-level3a.js, words-level3b.js, words-level3c.js, words-level4.js, words-level4a.js, words-level4b.js, words-level4c.js  

> 说明：词库量很大，我优先用“可规模化复现”的问题做抽检（如：example 是否包含目标词、definition 是否断裂/重复、明显语法错误、明显文化/年龄不适配、imageKeyword 搜图歧义/暴力风险、以及 Level 与 MAP197 的匹配）。每个文件至少列出 3 个问题（铁律）。

---

## words-level3.js

### 1) constitution（CRITICAL / MAJOR）
- 位置：words-level3.js（第1条）
- 问题维度：定义准确性、文化适配、定义难度
- 现状：definition = “the written rules for how a country works”；example = “The Constitution …”
- 问题：
  - 定义过窄：constitution 不只用于“country”（也可用于 organization/company）。
  - example 的 “The Constitution” 强烈指向美国宪法（US-specific），对中国ESL孩子容易形成错误默认。
- 建议修改：
  - definition：`the set of basic rules (laws) that a country or organization is built on`
  - example（更中性）：`The country’s constitution says what the government can and cannot do.`
  - imageKeyword：避免过泛“old document”，可更具体但中性：`constitution document` 或 `law book`。

### 2) rivulet（MAJOR）
- 位置：words-level3.js（第3条）
- 问题维度：例句质量、搭配正确性
- 现状：`A tiny rivulet of rain ran down the window.`
- 问题：
  - collocation 不自然：“rivulet of rain” 很别扭；rain 本身不“run down”，通常是 water / sweat / mud。
  - 例句场景与定义“stream of water”不匹配。
- 建议修改：
  - example：`After the storm, a tiny rivulet of water ran down the window.`
  - imageKeyword：`small stream` / `rivulet of water`。

### 3) incubate（MAJOR）
- 位置：words-level3.js（第4条）
- 问题维度：定义准确性（过窄）
- 现状：`to keep eggs warm so they can hatch`
- 问题：incubate 也可用于“细菌/病毒培养”“想法酝酿”等（虽然可按 Level 简化，但不能教成“只等于孵蛋”）。
- 建议修改：
  - definition：`to keep eggs warm so they can hatch; to keep something in the right conditions so it can grow`
  - example 可保持鸡蛋，但建议 definition 至少留一个更泛的半句。

---

## words-level3a.js

### 1) influential（CRITICAL）
- 位置：words-level3a.js:60
- 问题维度：定义准确性/完整性（功能失效）
- 现状：definition = `having the power to change opinions or do`
- 问题：definition 断裂（句子未完成），会直接教错/无法理解。
- 建议修改：
  - definition：`having the power to change what people think or do`

### 2) careless（MAJOR）
- 位置：words-level3a.js:36
- 问题维度：定义用词难度/英文自然度
- 现状：`not paying focus, making mistakes`
- 问题：英语不地道；“paying focus”错误搭配，应为 “paying attention”。
- 建议修改：
  - definition：`not paying attention; making mistakes because you are not careful`

### 3) immune（MAJOR）
- 位置：words-level3a.js:57
- 问题维度：事实准确性、例句质量
- 现状：`After getting the shot, his body became immune to the flu...`
- 问题：对疫苗效果表述过“绝对”（immunity 并不保证整个冬天不生病），易造成事实误导。
- 建议修改：
  - example：`After getting the shot, he was more protected from the flu that winter.`
  - 或：`The vaccine helped his body become more immune to the flu.`（保留“help”缓冲）

### 4) 系统性问题：example 未包含“目标词原形”（MAJOR）
- 位置：words-level3a.js 多处（抽样：afflict:100, amble:101, amplify:102 …）
- 问题维度：例句质量（包含目标词）、学习可迁移性
- 现象：词条 word 用原形，但 example 常只出现变形（例如 afflict → afflicted，amble → ambled）。
- 风险：
  - 对 MAP197 学生，可能无法稳定把词形变化映射回词条；也会影响“高亮/点击词条”等产品功能（若依赖字符串匹配）。
- 建议：
  - 规则：example 优先包含目标词原形（必要时用现在时/不定式改写），或在例句中同时出现原形+变形（不推荐）。
  - 例：`A bad cold can afflict many students in winter.`

### 5) 分层合理性（MAJOR）
- 位置：words-level3a.js 多处（如 buttress, blazon, broach, burgeon, cleave 等）
- 问题维度：分层合理性
- 问题：这些词频很低、语义抽象或偏文学/历史建筑，明显高于“10岁MAP197”的可学习负荷；即使作为“challenge words”，也不应与常用学术词混在 L3 主层。
- 建议：
  - 下放到更高 Level（L5+）或移入“扩展词/选学词”子集。

---

## words-level3b.js

### 1) conductor（MAJOR）
- 位置：words-level3b.js:22
- 问题维度：定义准确性、搭配正确性、例句自然度
- 现状：definition = `a material that lets power or heat pass through`; example = `Metal is a good conductor of power.`
- 问题：
  - “conductor of power”不地道且意义偏差；应强调 electricity/heat。
- 建议修改：
  - definition：`a material that lets electricity or heat pass through easily`
  - example：`Metal is a good conductor of electricity.`

### 2) nonrenewable（MAJOR）
- 位置：words-level3b.js:28
- 问题维度：例句语法、大小写
- 现状：`Oil is a nonrenewable resource earth cannot make more quickly.`
- 问题：缺少连词/关系词；Earth 需大写。
- 建议修改：
  - example：`Oil is a nonrenewable resource that Earth cannot make quickly.`

### 3) capital（MAJOR）
- 位置：words-level3b.js:60
- 问题维度：文化适配、例句标点
- 现状：`Washington, D. C is the capital of the United States.`
- 问题：US-centric；且 D.C. 写法不规范。
- 建议修改（更适配中国ESL）：
  - example：`Beijing is the capital of China.`
  - 或中性：`The capital is the city where a country’s government works.`（例句可换任意国家）

### 4) fiesta（MAJOR）
- 位置：words-level3b.js:235
- 问题维度：定义准确性/措辞
- 现状：`a lively party or party, mainly in Spanish-speaking countries`
- 问题：definition 明显错误重复（party or party）；且“Spanish-speaking”对该年龄可能偏难。
- 建议修改：
  - definition：`a lively festival or celebration (often with music and dancing)`
  - example 可保留，但建议避免“Spanish-speaking countries”这种元语言描述。

（额外 MINOR）friction 例句有多余逗号：`Friction between your shoes, and the floor...`（words-level3b.js:19）

---

## words-level3c.js

### 1) tension（MAJOR）
- 位置：words-level3c.js:22
- 问题维度：定义用词难度/语法
- 现状：`a feeling of worry tightness...`
- 问题：缺少连接词；表达不自然。
- 建议修改：
  - definition：`a feeling of worry and tightness, like something is about to happen`

### 2) preamble（MAJOR）
- 位置：words-level3c.js:73
- 问题维度：文化适配、分层合理性
- 现状：例句引用美国宪法 “We the People”。
- 问题：
  - 强 US-specific；对中国ESL学生不友好。
  - preamble 本身对 MAP197 来说偏抽象/学术，放在 L3 压力大。
- 建议修改：
  - example（中性）：`The preamble introduces the main ideas of the document.`
  - 或将该词上调到 L4/L5。

### 3) Level 明显过高（MAJOR）
- 位置：words-level3c.js 多处（示例：chlorophyll:54, stratosphere:72, paleontology:83, isthmus:88）
- 问题维度：分层合理性
- 问题：这些学科词对 2nd-grade reading 的 ESL 学习者明显过难，且 definition 本身包含大量更难词（ozone layer, meteorology-like 描述）。
- 建议：
  - 将此类词移入更高 Level 或作为“学科主题包”（Science Pack）而非 L3 主词库。

### 4) imageKeyword / 内容风险：harpoon（MAJOR）
- 位置：words-level3c.js:100
- 问题维度：imageKeyword（搜图暴力/血腥风险）、文化适配
- 现状：`harpoon` 的图很可能出现刺入动物的画面；对 10 岁儿童可能偏刺激。
- 建议：
  - imageKeyword：`harpoon tool` / `harpoon fishing tool`（尽量规避血腥画面）
  - 或更换为更儿童友好词条。

---

## words-level4.js

### 1) Level/主题不适配（MAJOR）
- 位置：words-level4.js（income, finance）
- 问题维度：分层合理性、文化/年龄适配
- 问题：对 10 岁孩子，“income/finance”若做生活化可以，但当前表达明显成人化（investments, budgeting），并不贴近孩子经验。

### 2) income（MAJOR）
- 位置：words-level4.js（第1条）
- 问题维度：定义用词难度、例句适配
- 现状：definition 含 investments；example：`His monthly income from investments...`
- 问题：
  - “investments”对目标用户太难。
  - 例句成人世界场景，不利于孩子迁移。
- 建议修改：
  - definition：`the money a person gets from working (or from a business)`
  - example：`Her income comes from her job at the store.`（或更孩子化：`His parents’ income helps pay for the family’s needs.`）

### 3) finance（MAJOR）
- 位置：words-level4.js（第2条）
- 问题维度：定义用词难度
- 现状：`the management of money, including saving and investing`
- 问题：“management / investing”可能比 finance 更难。
- 建议修改：
  - definition：`planning how to use money (saving, spending, and investing)`（把“planning”作为更易词）

---

## words-level4a.js

### 1) assess（MAJOR）
- 位置：words-level4a.js:12
- 问题维度：例句语法
- 现状：`... assess the injured bird deciding ...`
- 问题：缺少连词/标点，读起来像断句。
- 建议修改：
  - example：`The veterinarian needed to assess the injured bird and decide how to help it.`

### 2) inaugurate（MAJOR）
- 位置：words-level4a.js:120
- 问题维度：文化适配、搭配/语法
- 现状：`inaugurated each four years ... at the Capitol`
- 问题：
  - “each four years”应为 “every four years”。
  - “the Capitol”高度美国化；对中国ESL孩子不友好。
- 建议修改：
  - example（中性）：`A new leader is inaugurated in an official ceremony.`

### 3) bizarre（MAJOR）
- 位置：words-level4a.js:18
- 问题维度：事实准确性、内容适配
- 现状：`... transparent head, so you could see its brain inside.`
- 问题：
  - “see its brain”可能不准确/偏猎奇，且对儿童不必要地“重口”。
- 建议修改：
  - example：`The bizarre fish had a transparent head, so you could see inside it.`

### 4) Level 过高样例（MAJOR）
- 位置：words-level4a.js:260（idiosyncrasy）
- 问题维度：分层合理性
- 问题：idiosyncrasy 对 MAP197 远超负荷，建议上调 Level 或移出核心词库。

---

## words-level4b.js

### 1) retail（CRITICAL）
- 位置：words-level4b.js:78
- 问题维度：定义语法（直接失效）
- 现状：`the selling of goods right at to customers in stores`
- 问题：明显语法错误（right at to）。
- 建议修改：
  - definition：`the selling of goods to customers in stores`

### 2) sovereign（CRITICAL）
- 位置：words-level4b.js:95
- 问题维度：定义准确性/措辞
- 现状：`having supreme power and power; free`
- 问题：重复且不通顺。
- 建议修改：
  - definition：`having the highest power to rule itself; independent`

### 3) terminal（MAJOR）
- 位置：words-level4b.js:120
- 问题维度：例句语法
- 现状：`... arrived ... two hours our flight ...`
- 问题：缺少 before。
- 建议修改：
  - example：`We arrived at the airport terminal two hours before our flight was scheduled to leave.`

### 4) mimic（MAJOR）
- 位置：words-level4b.js:27
- 问题维度：定义准确性（重复）
- 现状：`to copy or copy ...`
- 建议修改：`to copy someone’s actions or sounds`

### 5) Level/文化（MAJOR）
- 位置：words-level4b.js 多处（如 senate / Supreme Court / anathema 等）
- 问题：
  - 大量美国政府体系词条与例句（state, Senate, Supreme Court），对中国ESL孩子不是“语言难度”而是“背景知识门槛”。
  - anathema 等词频极低，明显高于 L4。

---

## words-level4c.js

### 1) vegetation 例句含武器词（CRITICAL / MAJOR）
- 位置：words-level4c.js:4
- 问题维度：文化/年龄适配、imageKeyword 搜图风险、例句用词难度
- 现状：`... impossible to walk without a machete.`
- 问题：machete 属于刀具/武器词；对 10 岁不合适，且搜图容易出现刀具/暴力画面。
- 建议修改：
  - example：`Thick green vegetation covered the jungle floor, making it hard to walk through.`
  - imageKeyword 可保留 `dense vegetation`。

### 2) archive（MAJOR）
- 位置：words-level4c.js:30
- 问题维度：例句语法
- 现状：`... from over century ago.`
- 问题：缺少冠词 a。
- 建议修改：`... from over a century ago.`

### 3) requisite（CRITICAL）
- 位置：words-level4c.js:254
- 问题维度：定义准确性（重复导致失效）
- 现状：`needed or needed for a specific purpose`
- 建议修改：`needed for a specific purpose`

### 4) stagnant（CRITICAL）
- 位置：words-level4c.js:278
- 问题维度：定义准确性（重复/矛盾）
- 现状：`not flowing or moving; not growing or growing`
- 问题：后半句自相矛盾。
- 建议修改：
  - definition：`not moving or flowing; not changing or growing`

### 5) consanguinity（MAJOR）
- 位置：words-level4c.js:315
- 问题维度：分层合理性、内容适配
- 问题：该词极罕见且偏“血缘关系/法医/家谱学”语域，不适合作为 L4 核心词汇；imageKeyword 含 blood 可能引导到医学/血液图。
- 建议：移出核心词库（或至少上调到更高 Level，并改 imageKeyword 为 `family relation`）。

### 6) 强 US-specific（MAJOR）
- 位置：allegiance:22（Pledge of Allegiance）、ally:24（American colonies / Revolutionary War）、via:8（NY/LA/Chicago）
- 建议：替换为更普适的例句或使用中国/全球更熟悉的背景。

---

## 建议固化项

- 🔧 [proofcheck规则] 增加“example 必须包含目标词原形（case-insensitive）”检查：若只出现屈折变化（如 afflict→afflicted / kill two birds...→kills），给出 warning（允许配置为可忽略/可接受）。
- 🔧 [proofcheck规则] 增加 definition 重复词/坏片段检查：
  - `\b(\w+)\s+(and|or)\s+\1\b`（如 `power and power`, `copy or copy`）
  - `\bparty\s+or\s+party\b` 这类明显重复
  - 对 `not growing or growing` 这类“否定 + or + 同词”给 CRITICAL。
- 🔧 [proofcheck规则] 增加常见语法碎片/拼接错误正则：例如 `\bright at to\b`（retail），`\bover\s+century\b`（archive）等。
- 🔧 [搭配规则] 将明显错误搭配加入 WRONG_COLLOCATIONS（或做替换建议）：
  - `conductor of power` → `conductor of electricity`
  - `rivulet of rain` → `rivulet of water`
  - `paying focus` → `paying attention`
  - `each four years` → `every four years`
- 🔧 [禁词] 将例句/definition 中的武器词加入 BANNED_WORDS（用于儿童模式）：如 `machete`（并建议同时覆盖 knife/weapon 子集，可按 strictness 配置）。
- 🔧 [白名单] 对“合法重复短语”加白名单，避免误报：`again and again`, `more and more` 等（当前重复词检测会误抓）。
- 🔧 [新工具] 新增 `leveling-lint.mjs`：基于词频/COCA（项目内已有 coca_5000.csv）或简化 CEFR 列表，自动标记超出 MAP197/Level 预期的低频词（如 consanguinity, idiosyncrasy, anathema, buttress…），输出“建议升降级/移出核心词库”的清单。
- 🔧 [标准更新] QA-STANDARD.md 建议补充：
  - 例句必须包含目标词（明确是否允许屈折变化；推荐“必须出现原形”以匹配高亮/测验系统）。
  - 文化本地化：避免默认美国政治/地理专有名词（Capitol, Pledge of Allegiance, Washington D.C. 等），除非该词条本身需要。
  - 儿童安全：例句避免武器/暴力工具词；imageKeyword 需要“safe search”导向（如 harpoon/assault/battalion 等给出更安全的 keyword）。
