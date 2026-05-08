# Claude 竞品审校报告 — 2026-05-08

**角色：** 竞品公司产品经理，专找能攻击产品的弱点
**范围：** words-level1.js, words-level2.js 全量 + 其他文件抽查

---

## CRITICAL 问题

### 1. JSON结构错误：words-level1.js 有4个空条目（bare commas）
- 行 392, 394, 478, 480 有裸逗号，说明删词后遗留的格式碎片
- 虽然JS容忍trailing commas，但这说明数据清洗不彻底
- **修复：** 删除裸逗号行

### 2. 事实错误：mushroom 定义为 "a plant"
- `mushroom` (L1): "a plant without leaves that grows in damp, dark places"
- 蘑菇是真菌(fungus)，不是植物(plant)。这是基础生物学错误。
- **修复：** "a type of fungus that grows in damp, dark places" 或更简单 "a food that grows in damp, dark places and is not a plant"

### 3. SVA错误：courtesy 例句 "you is"
- `courtesy` (L4a): 例句包含 "you is" → 应为 "you are"
- **修复：** 改正主谓一致

---

## MAJOR 问题

### 4. 搭配错误
- `blizzard` (L1): 定义 "a **big** snow storm" → 应为 "**heavy** snow storm"
- `portentous` (L4b): 例句 "**big** storm" → 应为 "**heavy** storm" 或 "**severe** storm"

### 5. 例句不含目标词（5处）
- `become` (L2): 例句用 "became" 但 proofcheck 没识别变形 — 实际上 "became" IS the past tense, 这应该算OK，proofcheck规则需要加become→became映射
- `vertex` (L3b): 例句用 "vertices"（复数）
- `dike` (L3b): 例句用 "dyke"（替代拼写）
- `communique` (L4a): 例句用 "communiqué"（带重音符）
- `cliche` (L5c): 例句用 "cliché"（带重音符）

### 6. 定义重复词：itsy
- `itsy` (L1): 定义 "really really tiny" — 重复使用 "really"
- **修复：** "very very tiny" 或 "extremely tiny"

### 7. imageKeyword含"blood"子串（医学上下文）
- `blood` (L2b): imageKeyword 是 "blood" — 直接搜会出血腥图片
- `artery` (L2b): imageKeyword "blood vessel"
- `circulate` (L2c): imageKeyword "blood flow"
- **修复：** 用更儿童友好的 imageKeyword，如 "cartoon blood cell" / "heart pumping diagram"

### 8. imageKeyword含"skill"子串（误报分析）
- 大量词条的imageKeyword含 "skillful" / "skilled" — 这些是搜索安全的，不是问题
- 但 `herbicide` (L5c) 的 imageKeyword "weed killer" 可能出农药图片 → 改为 "garden spray bottle"

### 9. cocoon 定义说 "becomes a moth" 但标题说 "before it becomes a moth"
- 定义本身OK（cocoon确实是moth用的），但例句也说 "came out as a moth"
- 与 `caterpillar` 的定义 "becomes a butterfly or moth" 一致
- ✅ 无需修改

---

## MINOR 问题

### 10. 大量1-2词定义（共50+处）
- 如 `mud` = "wet dirt", `loose` = "not tight", `glad` = "happy", `scared` = "afraid"
- 这些太简短，在选择题游戏中很难唯一标识目标词
- 但对L1基础词来说，简短定义反而适合MAP 197水平
- **建议：** L1可以接受2词定义，但L2不应该有1词定义（如 `afraid`="scared", `alive`="living"）
- **优先修复：** L2的1词定义：afraid, alive, asleep, courageous, glad, scared, little, under

### 11. 同义词循环定义
- `afraid` (L2) = "scared" 且 `scared` (L2) = "afraid"
- 这两个词互为定义，孩子如果两个都不会就死循环了
- **修复：** 至少一个要用描述性定义

### 12. coconut 分类
- 定义为 "a big brown fruit" — 严格说coconut是drupe
- 但对10岁孩子来说叫fruit可以接受
- ✅ 保持不变

---

## 建议固化项

- 🔧 [proofcheck规则] 检测裸逗号行（`/^,$/`）作为JSON碎片残留 — 这是数据清洗不彻底的信号
- 🔧 [proofcheck规则] 检测互为定义的同义词对（word A的定义是word B，且B的定义是A）— 循环定义问题
- 🔧 [proofcheck规则] become→became, vertex→vertices, 等不规则变形加入WORD_IN_EXAMPLE的允许变形表
- 🔧 [proofcheck规则] 检测带diacritical marks的词（communiqué/cliché）和无marks版本的映射
- 🔧 [proofcheck规则] mushroom/fungus事实检查 — 可以加一个FACT_CHECK数组检测已知常见事实错误（mushroom≠plant, spider≠insect, whale≠fish等）
- 🔧 [搭配规则] "big storm" → "severe storm" 或 "heavy storm"（已有 big snow → heavy snow，但storm单独也要处理）
- 🔧 [白名单] "skill"/"skillful"/"skilled" 在imageKeyword中不应该触发"kill"禁词检测
- 🔧 [白名单] coconut 作为 "fruit" 可以接受（儿童词汇常规分类）
- 🔧 [标准更新] L2的1词定义应该被标记为MAJOR而非MINOR — 1词定义在选择题中无法唯一标识
