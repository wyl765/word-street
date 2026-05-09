# VERIFY-CLAUDE-R32-2026-05-09 — Word Street Level 1&2 (仅CRITICAL/HIGH)

> 角色：竞品公司的人，专找弱点
> 范围：words-level1.js (600词) + words-level2.js (~548词)
> 标准：只报CRITICAL/HIGH，每条含词条+问题+测试用例+外部证据

---

## HIGH 1 — kindle (L2): imageKeyword "kindle fire" 会返回Amazon Kindle Fire平板电脑图片

- 词条定位：`words-level2.js` — **kindle**
- 具体问题：
  - 当前 `imageKeyword:"kindle fire"` 在Google Images搜索时，前10+结果几乎全是**Amazon Kindle Fire平板电脑**，不是"生火/点火"。
  - 10岁孩子看到平板电脑图片无法理解"to start a fire"的词义。
  - 这是imageKeyword与实际搜索结果严重不匹配。
- 测试用例：
  - 搜索"kindle fire" → 结果：Amazon产品图 ❌
  - 搜索"kindling campfire" → 结果：生火场景 ✅
- 外部证据：
  - Merriam-Webster: "to start (a fire) burning" https://www.merriam-webster.com/dictionary/kindle
- **修复建议：** imageKeyword改为 "lighting campfire with sticks"

---

## HIGH 2 — muzzle (L2): imageKeyword "dog muzzle" 返回的是口罩/嘴套（restraint device），不是身体部位

- 词条定位：`words-level2.js` — **muzzle**
- 具体问题：
  - 定义是"the nose and mouth area of an animal"（解剖学意义）
  - 但 `imageKeyword:"dog muzzle"` 在Google Images搜索结果中，**绝大多数图片是狗嘴套/口罩**（restraint device），不是指向"鼻口区域"的解剖标注图。
  - 孩子看到嘴套图片会以为muzzle是"一种绑在狗嘴上的东西"，完全偏离定义。
- 测试用例：
  - 搜索"dog muzzle" → 结果：嘴套产品图 ❌
  - 搜索"dog snout close up" → 结果：狗鼻口特写 ✅
- 外部证据：
  - Merriam-Webster: "the projecting jaws and nose of an animal: SNOUT" https://www.merriam-webster.com/dictionary/muzzle
  - Cambridge: "the mouth and nose of an animal, especially a dog" https://dictionary.cambridge.org/dictionary/english/muzzle
- **修复建议：** imageKeyword改为 "dog snout nose close up"

---

## HIGH 3 — pepper (L1): 定义只覆盖bell pepper，缺失高频"胡椒/调味料"义项

- 词条定位：`words-level1.js` — **pepper**
- 具体问题：
  - 当前定义："a crunchy vegetable that can be red, green, or yellow and is hollow inside"，只描述bell pepper。
  - 但"pepper"在日常英语中最高频的用法之一是**调味料/香料**（salt and pepper）。孩子学了这个定义后遇到"salt and pepper"会完全懵。
  - L1单一义项原则下，应该选择孩子最常遇到的义项，或至少用"bell pepper"而不是"pepper"作为词条名以避免歧义。
- 测试用例：
  - Q: "Dad put salt and pepper on his food." What does "pepper" mean here?
    - A. a crunchy hollow vegetable
    - B. a spice that tastes hot ✅
    - → 学了当前定义的孩子会选A，答错
- 外部证据：
  - Merriam-Webster列出pepper第一义项就是调味料: "a pungent condiment" https://www.merriam-webster.com/dictionary/pepper
  - COCA词频：pepper作为spice的用频 > pepper作为vegetable
- **修复建议：** 定义改为涵盖两个义项的简单版，或将词条名改为"bell pepper"

---

## HIGH 4 — admiral (L2): 例句事实不准确——海军上将不"sail ships"

- 词条定位：`words-level2.js` — **admiral**
- 具体问题：
  - 例句："The admiral sailed the ship across the ocean."
  - 海军上将（admiral）**指挥舰队**，不是亲自操帆驾船。这个例句暗示admiral = 船长/水手，会导致词义理解偏差。
  - 对10岁孩子来说，如果他后来学captain（船长），会和admiral混淆。
- 测试用例：
  - Q: What does an admiral do?
    - A. Steers a ship across the sea（当前例句暗示）
    - B. Commands many ships and sailors ✅
    - → 学了当前例句的孩子会选A
- 外部证据：
  - Merriam-Webster: "a commissioned officer in the navy or coast guard who ranks above a vice admiral" — 强调的是军衔/指挥角色
  - Cambridge: "an officer of very high rank in the navy"
- **修复建议：** 例句改为 "The admiral gave orders to all the ships in the fleet."

---

## HIGH 5 — bolt (L2): imageKeyword "metal bolt" 搜索结果混入lightning bolt图片

- 词条定位：`words-level2.js` — **bolt**
- 具体问题：
  - 定义是"a metal pin used to hold things together"（五金螺栓）
  - `imageKeyword:"metal bolt"` 虽然加了"metal"前缀，但Google搜索仍常混入"lightning bolt"图片和"bolt"品牌产品图。
  - "bolt"是高歧义词（螺栓/闪电/门闩/逃跑），imageKeyword应更精确。
- 测试用例：
  - 搜索"metal bolt" → 结果：大部分是螺栓但混有闪电bolt图标
  - 搜索"metal bolt and nut hardware" → 结果：纯五金螺栓 ✅
- 外部证据：
  - Merriam-Webster列出bolt 6个义项，视觉歧义极高 https://www.merriam-webster.com/dictionary/bolt
- **修复建议：** imageKeyword改为 "bolt and nut hardware"

---

## HIGH 6 — bunker (L2): 例句含军事语境，不符合"避免暴力/军事内容"的标准

- 词条定位：`words-level2.js` — **bunker**
- 具体问题：
  - 例句："The soldiers hid in the bunker during the storm."
  - 虽然bunker本身可以是中性词（高尔夫球场的bunker），但定义"a strong shelter built underground"加上"soldiers"的例句，把场景完全推向军事化。
  - imageKeyword "bunker shelter" 也可能返回军事掩体图片。
- 测试用例：
  - Q: A bunker is:
    - A. a place where soldiers hide during fighting
    - B. a strong underground shelter ✅
    - → 当前例句会让孩子把bunker和战争绑定
- 外部证据：
  - Cambridge: bunker有golf bunker义项，完全中性 https://dictionary.cambridge.org/dictionary/english/bunker
- **修复建议：** 例句改为 "We hid in the bunker when the big storm came." 去掉soldiers。

---

## 建议固化项

- 🔧 [proofcheck规则] 增加 **BRAND_NAME_IMAGE_COLLISION** 检测：维护一个品牌名/产品名列表（kindle, echo, siri, alexa, dash, prime, uber等），当imageKeyword包含这些词时报HIGH，要求加消歧修饰词。
- 🔧 [proofcheck规则] 增加 **BODY_PART_IMAGE_CHECK**：当定义含"part of"/"area of"等身体部位描述时，检查imageKeyword是否包含该身体部位的正确搜索关键词（不能用会返回器具/设备的关键词）。
- 🔧 [搭配规则] 将 "admiral + sailed" 加入 WRONG_COLLOCATIONS —— admiral指挥，不操帆。
- 🔧 [proofcheck规则] 增加 **MILITARY_CONTEXT** 扫描：如果 example 命中 `(soldier|army|military|troops|battle|warfare|barracks)` 且目标词不是军事词汇本身，报 MINOR 建议替换为中性语境。
- 🔧 [标准更新] QA-STANDARD.md 增加：imageKeyword 必须避免与知名品牌/产品名称碰撞（Amazon Kindle, Google Nest, Apple Watch等），每次新增词条需检查imageKeyword是否有品牌碰撞。
- 🔧 [白名单] pepper 的 POLYSEMY 检查：如果最终决定保留单一义项（bell pepper），应在imageKeyword中明确加"bell"前缀。
