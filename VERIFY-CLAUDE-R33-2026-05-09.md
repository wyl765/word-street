# VERIFY-CLAUDE-R33 — 法官裁决

**角色**: 法官。只看证据判案。对任何没有证据的指控零容忍。
**日期**: 2026-05-09

---

## 裁决

### 1. bridge — "a road over water or a valley" → **反方赢，修改**
**判决**: 双方一致认为bridge≠road，且都引用了MW/Cambridge/Oxford作为证据。Bridge是structure，不是road。这是事实性错误，必须修改。
**修改方案**: "a thing built over water so people can walk or drive across" (保持L1简单)

### 2. tunnel — "a road that goes through a mountain" → **反方赢，修改**
**判决**: 与bridge同类错误。Tunnel是passage，不是road。且"through a mountain"过窄，排除了地铁隧道等常见场景。双方都提供了词典证据。
**修改方案**: "a long path dug under the ground or through a hill" (保持L1简单，扩大范围)

### 3. lemon — "sharp and not sweet" → **双方赢，修改**
**判决**: 双方都引用了三大词典，没有一个用"sharp"描述lemon味道，全部用sour/acid。"Sharp"作味觉描述虽然在英语中技术上成立，但对ESL学生有多义歧义风险。"Sour"更简单、更标准。
**修改方案**: 将"sharp"改为"sour"

### 4. vest — "a jacket with no sleeves" → **反方赢，修改**
**判决**: Vest的genus不是jacket。MW和Cambridge都不用jacket来定义vest。对L1学生来说，可以简化但不能错分类。
**修改方案**: "clothes with no sleeves that you wear over a shirt"

### 5. cottage — "a small pretty house" → **反方赢，修改**
**判决**: "Pretty"是主观词，不适合词典定义。三大词典均不使用。
**修改方案**: "a small house, usually in the countryside"

### 6. desert — 冗余 → **正方赢（保留）**
**判决**: 正方提出冗余但评为MINOR。对L1学生来说，"very dry"和"very little rain"虽然冗余，但提供了两种理解路径，实际上对ESL学生有帮助。保留。

### 7. tunnel → 已在#2裁决

### 8. collar — 选义偏差 → **正方赢（保留）**
**判决**: 正方论证选了shirt collar而非dog collar。但QA标准允许L1-L2单一词义，且例句("The tag on his collar was itchy")和imageKeyword清楚指向衣领。学生日后会学到其他含义。保留。

### 9. coconut — "a big brown fruit" → **正方赢（保留）**
**判决**: 虽然未剥壳的椰子是绿色，但超市里常见的处理后椰子确实是棕色。对L1简化定义可接受。"Fruit"虽不是植物学精确分类(drupe)，但日常英语中coconut is called a fruit。保留。

### 10. harbor — "boats park" → **反方赢，修改**
**判决**: 反方引用COCA数据指出"park"不与boats搭配。虽然L1需要简单，但"stay"同样简单且不会教错误搭配。
**修改方案**: "a safe place where boats stay"

### 11. heel — 解剖学精度 → **正方赢（保留）**
**判决**: 反方论证有道理但对L1过于严格。"The back part of your foot"足够让10岁孩子理解。MW的"below the ankle"精度在L1不必要。

### 12. spine — 功能描述 → **反方赢，修改**
**判决**: "Help you stand straight"暗示spine只用于posture，排除了四足动物。对L1来说，"hold your body up"比"stand straight"更准确且同样简单。
**修改方案**: "the bones down your back that hold your body up"

---

## 汇总

| 词条 | 裁决 | 操作 |
|------|------|------|
| bridge | 修改 | "a thing built over water so people can walk or drive across" |
| tunnel | 修改 | "a long path dug under the ground or through a hill" |
| lemon | 修改 | "sharp"→"sour" |
| vest | 修改 | "clothes with no sleeves that you wear over a shirt" |
| cottage | 修改 | "a small house, usually in the countryside" |
| desert | 保留 | 冗余但有教学价值 |
| collar | 保留 | 单一词义策略可接受 |
| coconut | 保留 | 日常用法可接受 |
| harbor | 修改 | "park"→"stay" |
| heel | 保留 | L1精度足够 |
| spine | 修改 | "stand straight"→"hold your body up" |

**需修改: 7项 | 保留: 4项**

## 建议固化项

1. **proofcheck新规则**: 检测定义中 "a road that" pattern（bridge/tunnel类错误——把structure误称为road）
2. **proofcheck新规则**: 检测定义中主观形容词（pretty, beautiful, ugly等）不应出现在定义中
3. **proofcheck新规则**: 检测"park"与非车辆名词的搭配（boats park → bad collocation）
