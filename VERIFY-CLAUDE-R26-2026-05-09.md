# VERIFY-CLAUDE-R26-2026-05-09 — Word Street Level 1&2 (仅CRITICAL/HIGH)

> 角色：竞品公司的人，专找弱点
> 范围：words-level1.js (600词) + words-level2.js (552词)
> 标准：只报CRITICAL/HIGH，每条含词条+问题+测试用例+外部证据

---

## HIGH

### 1) frog — `words-level1.js`
- **词条原文**：definition: `a small green animal that jumps and lives near water`
- **具体问题**：把"green"写进定义是错误的必要条件。很多蛙类是棕色、灰色甚至红色的。孩子看到一只棕色的牛蛙会认为"不是frog"。
- **测试用例**：给孩子一张棕色牛蛙(bullfrog)照片，问"Is this a frog?" 按当前定义（green），孩子可能答No。
- **外部证据**：
  - MW: "any of various largely aquatic leaping anuran amphibians" — 无颜色
  - OALD: "a small animal with smooth skin, that lives both on land and in water" — 无颜色
- **建议修复**：`a small animal that jumps and lives near water` (去掉green)

### 2) bee — `words-level1.js`
- **词条原文**：definition: `a flying bug that makes honey`
- **具体问题**：绝大多数蜜蜂物种(约2万种)不产蜂蜜，只有honeybee产蜂蜜。把"makes honey"作为定义特征会导致孩子不认识bumblebee、carpenter bee等为bee。
- **测试用例**：孩子看到一只大黄蜂(bumblebee)，说"那不是bee，因为它不make honey"——这在科学上是错误的。
- **外部证据**：
  - MW: "any of numerous hymenopterous insects (superfamily Apoidea) that differ from the related wasps especially in the heavier hairier body" — 无honey
  - OALD: "a black and yellow flying insect that can sting" — 无honey
- **建议修复**：`a flying insect that buzzes and can sting` 或 `a small flying insect with a fuzzy body`

### 3) lizard — `words-level1.js`
- **词条原文**：definition: `a small animal with four legs and a tail`
- **具体问题**：这个定义完全无法区分lizard和其他四足动物（mouse、squirrel、cat都是"small animal with four legs and a tail"）。缺少"reptile"或"scaly skin"等区分性特征。
- **测试用例**：选择题给4张图（lizard/mouse/squirrel/cat），问"Which one matches: a small animal with four legs and a tail?" 四个选项都符合定义。
- **外部证据**：
  - MW: "any of a suborder (Lacertilia) of reptiles distinguished from the snakes by..." — 强调reptile
  - OALD: "a small reptile with a rough skin, four short legs and a long tail" — 用reptile+rough skin区分
- **建议修复**：`a small reptile with scaly skin, four legs, and a long tail`

### 4) swan — `words-level1.js`
- **词条原文**：definition: `a big white bird with a long neck that lives on water`
- **具体问题**：把"white"写进定义排除了黑天鹅(black swan)。虽然白天鹅更常见，但黑天鹅在中国和澳洲都有展出，孩子可能见过。
- **测试用例**：孩子去动物园看到黑天鹅，说"那不是swan因为它不是white"。
- **外部证据**：
  - OALD: "a large bird that is usually white and has a long thin neck" — 用"usually white"而非"white"
- **建议修复**：`a large bird with a long neck that lives on water` (去掉white)，或改为`a large bird, usually white, with a long neck that lives on water`

### 5) depend — `words-level2.js`
- **词条原文**：definition: `to need or to count on`
- **具体问题**：定义包含"or to"连接两个不同含义，违反L1-L2单义规则。"need"和"count on"是有区别的（need=需要，count on=信赖依靠）。
- **测试用例**：quiz问"depend means ___"，给选项a) need b) count on c) both — 孩子会困惑。
- **外部证据**：
  - OALD将depend的两个义项分开：1) "to rely on" 2) "to be affected by"
- **建议修复**：`to need something in order to survive or work`（只保留一个义项）

---

## 建议固化项

- 🔧 [proofcheck规则] 检测定义中包含特定颜色词(green/white/red/brown/black/blue)用于动物/自然物种定义的情况——如果颜色不是该物种的必要特征（多数情况不是），应标记为HIGH。排除明确以颜色为区分特征的词（如ladybug的red、crow的black）。
- 🔧 [proofcheck规则] 对动物定义缺少分类词的情况发出警告：如果word是已知动物(可维护一个列表)，definition中应至少包含一个分类词(reptile/mammal/insect/bird/fish/amphibian/fungus等)或具体区分性特征(scaly/feathered/furry等)，否则标记为MAJOR。
- 🔧 [标准更新] QA-STANDARD.md增加一条：动物/植物/自然物种的定义不应将非必要特征（如特定颜色）作为定义性条件。用"usually"或"often"修饰，或直接省略。
