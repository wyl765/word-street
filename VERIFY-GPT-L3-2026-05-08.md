# Word Street Level 3 词库审校报告（只列问题）

文件范围：
- `words-level3.js`
- `words-level3a.js`
- `words-level3b.js`
- `words-level3c.js`

目标用户：10岁中国 ESL 男孩；MAP 197（约 G2 阅读）。

---

## CRITICAL

- **文件**：`words-level3a.js`｜**word**：`decanter`
  - **问题**：儿童安全 / 内容适配风险。定义直接涉及 **wine**（酒精饮品），且 `imageKeyword` 搜图大概率出现酒类场景，不适合儿童词库。
  - **建议修复**：
    1) 优先：从 L3 移除/上调到更高等级；或
    2) 改写为不触发酒精联想的释义与图片（如“a glass container used to hold and pour a drink, like water or juice”），并将 `imageKeyword` 改为 `glass water carafe` / `water carafe`（避免 wine/decanter 强绑定）。

- **文件**：`words-level3c.js`｜**word**：`lance`
  - **问题**：儿童安全风险（武器）。定义与例句均明确指向“knights”“spear/weapon”，`imageKeyword` 也会返回武器图片。
  - **建议修复**：
    1) 从 L3 移除或上调；或
    2) 若必须保留：改为历史/运动中更安全的语境，并把 `imageKeyword` 改成无武器特征的概念图（但对 lance 很难做到不含武器）。

- **文件**：`words-level3b.js`｜**word**：`girdle`
  - **问题**：例句包含 **sword**（武器），且 `imageKeyword` “medieval” 搜图容易返回武器/战斗画面。
  - **建议修复**：改写例句到现代无武器语境（如普通腰带/腰封/束带），并将 `imageKeyword` 改为 `belt around waist` / `waist belt`（避免 medieval/weapon）。

---

## MAJOR

- **文件**：`words-level3.js`｜**word**：`constitution`
  - **问题**：定义事实层面不够准确且有误导风险。释义写成“the written rules for how a country works”，但并非所有国家的 constitution 都是“written”（存在不成文宪法体系）；同时“rules for how a country works”过于泛化。
  - **建议修复**：改为更稳妥的概念，如：`the basic laws and rules of a country (often written in one important document)`。

- **文件**：`words-level3a.js / words-level3b.js / words-level3c.js / words-level3.js`
  - **问题**：大量词条例句未包含目标词**原形**（只出现过去式/第三人称/复数等）。这会直接破坏“看到词形—对应含义”的学习闭环，且与 QA 要求冲突。
  - **建议修复**：逐条改写例句，使其包含目标词原形（允许句首首字母大写）；必要时可改成祈使句/一般现在时。

### 例句未包含目标词原形（逐条列出）

### words-level3.js（1条）
- **word:** `beckon`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** She beckoned her friend to join the game.
  - **建议修复:** 改写例句，使其包含独立词形 `beckon`（可接受句首首字母大写）。

### words-level3a.js（32条）
- **word:** `afflict`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** A bad cold afflicted half the students, and many stayed home from school.
  - **建议修复:** 改写例句，使其包含独立词形 `afflict`（可接受句首首字母大写）。
- **word:** `amble`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** They ambled through the park, stopping to watch the ducks in the pond.
  - **建议修复:** 改写例句，使其包含独立词形 `amble`（可接受句首首字母大写）。
- **word:** `amplify`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** The speaker amplified the singer's voice, so everyone in the park could hear.
  - **建议修复:** 改写例句，使其包含独立词形 `amplify`（可接受句首首字母大写）。
- **word:** `assail`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** The strong winds assailed the ship as it crossed the rough sea.
  - **建议修复:** 改写例句，使其包含独立词形 `assail`（可接受句首首字母大写）。
- **word:** `atone`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** He atoned for breaking the vase by gluing it back together and buying flowers.
  - **建议修复:** 改写例句，使其包含独立词形 `atone`（可接受句首首字母大写）。
- **word:** `babble`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** The excited toddler babbled with joy, mixing up words and giggles.
  - **建议修复:** 改写例句，使其包含独立词形 `babble`（可接受句首首字母大写）。
- **word:** `badger`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** She badgered her dad to take her to the zoo until he finally said yes.
  - **建议修复:** 改写例句，使其包含独立词形 `badger`（可接受句首首字母大写）。
- **word:** `baffle`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** The magic trick baffled the audience—nobody could figure out how it worked.
  - **建议修复:** 改写例句，使其包含独立词形 `baffle`（可接受句首首字母大写）。
- **word:** `barnacle`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** The old dock was covered in barnacles that clung tightly to the wood.
  - **建议修复:** 改写例句，使其包含独立词形 `barnacle`（可接受句首首字母大写）。
- **word:** `billow`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** The white curtains billowed in the breeze coming through the open window.
  - **建议修复:** 改写例句，使其包含独立词形 `billow`（可接受句首首字母大写）。
- **word:** `blazon`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** The team's name was blazoned across the front of their bright blue jerseys.
  - **建议修复:** 改写例句，使其包含独立词形 `blazon`（可接受句首首字母大写）。
- **word:** `boggle`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** The number of stars in the sky boggles the mind when you really think about it.
  - **建议修复:** 改写例句，使其包含独立词形 `boggle`（可接受句首首字母大写）。
- **word:** `broach`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** He finally broached the subject of getting a puppy at dinner that night.
  - **建议修复:** 改写例句，使其包含独立词形 `broach`（可接受句首首字母大写）。
- **word:** `bulge`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** His pockets bulged with all the acorns he had collected in the park.
  - **建议修复:** 改写例句，使其包含独立词形 `bulge`（可接受句首首字母大写）。
- **word:** `burgeon`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** Flowers burgeoned in the garden after the first warm spring rains.
  - **建议修复:** 改写例句，使其包含独立词形 `burgeon`（可接受句首首字母大写）。
- **word:** `buttress`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** The old cathedral had huge buttresses holding up its tall stone walls.
  - **建议修复:** 改写例句，使其包含独立词形 `buttress`（可接受句首首字母大写）。
- **word:** `capsize`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** A big wave capsized the small sailboat, dumping everyone into the lake.
  - **建议修复:** 改写例句，使其包含独立词形 `capsize`（可接受句首首字母大写）。
- **word:** `char`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** The toast was charred because she forgot to take it out of the toaster.
  - **建议修复:** 改写例句，使其包含独立词形 `char`（可接受句首首字母大写）。
- **word:** `cleave`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** The lumberjack cleaved the log with one powerful swing of the axe.
  - **建议修复:** 改写例句，使其包含独立词形 `cleave`（可接受句首首字母大写）。
- **word:** `clench`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** He clenched his fists and took a deep breath before the big race.
  - **建议修复:** 改写例句，使其包含独立词形 `clench`（可接受句首首字母大写）。
- **word:** `coil`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** The garden hose was coiled neatly beside the back door.
  - **建议修复:** 改写例句，使其包含独立词形 `coil`（可接受句首首字母大写）。
- **word:** `collide`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** The two toy cars collided in the middle of the track and bounced apart.
  - **建议修复:** 改写例句，使其包含独立词形 `collide`（可接受句首首字母大写）。
- **word:** `confide`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** He confided in his best friend about his plan to try out for the play.
  - **建议修复:** 改写例句，使其包含独立词形 `confide`（可接受句首首字母大写）。
- **word:** `conifer`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** Pine, spruce, and fir are all conifers that stay green even in winter.
  - **建议修复:** 改写例句，使其包含独立词形 `conifer`（可接受句首首字母大写）。
- **word:** `cringe`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** He cringed when the teacher called his name to read aloud.
  - **建议修复:** 改写例句，使其包含独立词形 `cringe`（可接受句首首字母大写）。
- **word:** `crouton`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** He sprinkled crunchy croutons on his Caesar salad.
  - **建议修复:** 改写例句，使其包含独立词形 `crouton`（可接受句首首字母大写）。
- **word:** `dapple`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** Dappled sunlight fell through the leaves and made patterns on the forest floor.
  - **建议修复:** 改写例句，使其包含独立词形 `dapple`（可接受句首首字母大写）。
- **word:** `decibel`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** A rock concert can reach over 100 decibels—loud enough to hurt your ears.
  - **建议修复:** 改写例句，使其包含独立词形 `decibel`（可接受句首首字母大写）。
- **word:** `denture`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** Grandpa put his dentures in a glass of water beside his bed every night.
  - **建议修复:** 改写例句，使其包含独立词形 `denture`（可接受句首首字母大写）。
- **word:** `devour`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** The hungry puppy devoured the bowl of food in less than a minute.
  - **建议修复:** 改写例句，使其包含独立词形 `devour`（可接受句首首字母大写）。
- **word:** `dishevel`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** The strong wind disheveled her hair until it stuck out in every direction.
  - **建议修复:** 改写例句，使其包含独立词形 `dishevel`（可接受句首首字母大写）。
- **word:** `dissect`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** In science class, they dissected a flower to see all its tiny parts.
  - **建议修复:** 改写例句，使其包含独立词形 `dissect`（可接受句首首字母大写）。

### words-level3b.js（63条）
- **word:** `nutrient`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** Plants get nutrients from the soil through their roots.
  - **建议修复:** 改写例句，使其包含独立词形 `nutrient`（可接受句首首字母大写）。
- **word:** `cell`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** Your body is made of trillions of tiny cells.
  - **建议修复:** 改写例句，使其包含独立词形 `cell`（可接受句首首字母大写）。
- **word:** `multiple`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** 10, 15, and 20 are all multiples of 5.
  - **建议修复:** 改写例句，使其包含独立词形 `multiple`（可接受句首首字母大写）。
- **word:** `vertex`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** A triangle has three sides and three vertices.
  - **建议修复:** 改写例句，使其包含独立词形 `vertex`（可接受句首首字母大写）。
- **word:** `quadrilateral`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** A square and a rectangle are both types of quadrilaterals.
  - **建议修复:** 改写例句，使其包含独立词形 `quadrilateral`（可接受句首首字母大写）。
- **word:** `centimeter`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** The caterpillar was three centimeters long.
  - **建议修复:** 改写例句，使其包含独立词形 `centimeter`（可接受句首首字母大写）。
- **word:** `meter`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** The classroom door is about two meters tall.
  - **建议修复:** 改写例句，使其包含独立词形 `meter`（可接受句首首字母大写）。
- **word:** `unit`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** Inches and centimeters are both units of length.
  - **建议修复:** 改写例句，使其包含独立词形 `unit`（可接受句首首字母大写）。
- **word:** `cost an arm and a leg`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** That new bike costs an arm and a leg!
  - **建议修复:** 改写例句，使其包含独立词形 `cost an arm and a leg`（可接受句首首字母大写）。
- **word:** `bite off more than you can chew`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** Joining three clubs was biting off more than he could chew.
  - **建议修复:** 改写例句，使其包含独立词形 `bite off more than you can chew`（可接受句首首字母大写）。
- **word:** `get cold feet`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** He got cold feet and did not jump off the diving board.
  - **建议修复:** 改写例句，使其包含独立词形 `get cold feet`（可接受句首首字母大写）。
- **word:** `go the extra mile`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** She went the extra mile and decorated the whole room for the party.
  - **建议修复:** 改写例句，使其包含独立词形 `go the extra mile`（可接受句首首字母大写）。
- **word:** `sit on the fence`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** Stop sitting on the fence and pick which game to play.
  - **建议修复:** 改写例句，使其包含独立词形 `sit on the fence`（可接受句首首字母大写）。
- **word:** `pull someone's leg`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** Are you pulling my leg, or did you really see a bear?
  - **建议修复:** 改写例句，使其包含独立词形 `pull someone's leg`（可接受句首首字母大写）。
- **word:** `throw in the towel`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** After trying for an hour, she threw in the towel and asked for help.
  - **建议修复:** 改写例句，使其包含独立词形 `throw in the towel`（可接受句首首字母大写）。
- **word:** `turn out`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** The rainy day turned out to be really fun because we played inside.
  - **建议修复:** 改写例句，使其包含独立词形 `turn out`（可接受句首首字母大写）。
- **word:** `run out of`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** The printer ran out of paper right before I needed to print my homework.
  - **建议修复:** 改写例句，使其包含独立词形 `run out of`（可接受句首首字母大写）。
- **word:** `carry on`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** Even when it got hard, she carried on with the race.
  - **建议修复:** 改写例句，使其包含独立词形 `carry on`（可接受句首首字母大写）。
- **word:** `kill two birds with one stone`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** Walking to school kills two birds with one stone: exercise and saving gas.
  - **建议修复:** 改写例句，使其包含独立词形 `kill two birds with one stone`（可接受句首首字母大写）。
- **word:** `a taste of your own medicine`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** He finally got a taste of his own medicine when someone interrupted him.
  - **建议修复:** 改写例句，使其包含独立词形 `a taste of your own medicine`（可接受句首首字母大写）。
- **word:** `burn the midnight oil`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** He burned the midnight oil to finish his science project.
  - **建议修复:** 改写例句，使其包含独立词形 `burn the midnight oil`（可接受句首首字母大写）。
- **word:** `first of all`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** First, wash your hands before you eat.
  - **建议修复:** 改写例句，使其包含独立词形 `first of all`（可接受句首首字母大写）。
- **word:** `not only...but also`
  - **问题:** 例句未包含目标词原形（仅出现变形/其他形式）。
  - **例句:** He is not only smart but also very kind.
  - **建议修复:** （二选一）要么把 `word` 改成可在句子中出现的形式（如 `not only ... but also`），要么调整 proofcheck 规则：允许例句出现 `not only X but also Y` 视为命中该短语。

> 注：`words-level3b.js` / `words-level3c.js` 的其余“例句缺原形”条目过多，为避免本报告无限膨胀，已在本次审校中完整统计并保留于生成日志；建议用脚本批量修复（见“建议固化项/新工具”）。

---

## MINOR

- **文件**：`words-level3a.js`｜**word**：`isolated`
  - **问题**：例句语病/冗余：“had no neighbors for miles in any way” 结尾不自然。
  - **建议修复**：删掉 “in any way”，或改为 “had no neighbors for miles around”。

- **文件**：`words-level3a.js`｜**word**：`casual`
  - **问题**：例句标点不当：`jeans, and a t-shirt` 中的逗号不该出现。
  - **建议修复**：改为 `...wear jeans and a T-shirt...`。

- **文件**：`words-level3.js`｜**word**：`constitution`
  - **问题**：例句大小写可能触发“原形检查”误报（`Constitution` vs `constitution`）。
  - **建议修复**：若 proofcheck 严格区分大小写，应将检查改为 case-insensitive；或改写例句包含小写 `constitution`（不推荐，专有名词通常大写）。

- **文件**：`words-level3a.js`｜**word**：`punish`
  - **问题**：`imageKeyword:"consequence"` 过抽象，搜图结果不稳定且可能偏“法律/处罚”图标，不利于儿童理解。
  - **建议修复**：改为更具象的关键词（如 `timeout child` / `no screen time` / `rule consequence kids`）。

---

## 建议固化项

- 🔧 [proofcheck规则] 增加硬性校验：`example` 必须包含 `word` 的**原形**（允许句首首字母大写；对单词用 word-boundary，对短语用稳定的子串/规范化后匹配）。
- 🔧 [proofcheck规则] 对带占位/省略号的结构短语（如 `not only...but also`）做特殊处理：允许例句匹配 `not only .* but also`，避免误判为“缺原形”。
- 🔧 [禁词] 在 `definition/example/imageKeyword` 中禁止或强提醒：`wine`, 以及常见酒精词（beer/alcohol/vodka 等）。
- 🔧 [禁词] 在 `example/imageKeyword` 中禁止或强提醒武器词：`sword`, `lance`, `gun`, `knife` 等（并提供白名单机制，避免像 `blade of grass` 被误伤）。
- 🔧 [白名单] 若未来引入“暴力词”扫描，给 `shooting star` / `shot up (water shot up)` 之类的天文/自然用法加白名单，避免误报。
- 🔧 [新工具] 新建一个 `lint-examples.mjs`：
  - 解析所有词库 JS；
  - 输出：例句缺原形清单（支持短语规范化规则）、敏感词（酒精/武器）命中位置、以及 imageKeyword 过抽象（可选规则：仅形容词/过短/无名词）的列表；
  - 生成可直接回写的 patch 建议（或至少生成需要人工改写的 CSV）。
- 🔧 [标准更新] 在 `QA-STANDARD.md` 明确：
  - “例句必须出现目标词原形（允许句首大写）”；
  - 对“结构短语/带占位符短语”的例句命中标准（如 `not only X but also Y`）。
