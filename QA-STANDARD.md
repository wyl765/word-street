# Word Street 质量标准与审校流程 v1.8

**创建日期:** 2026-05-08
**标准:** 等同或超过顶级出版社(Oxford/Cambridge/Scholastic)
**目标用户:** 10岁中国ESL男孩,MAP 197(~2年级英语阅读)

---

## 一、质量标准(必须全部达标才能发布)

### 1. 零容忍项(任一存在即不可发布)
- [ ] 暴力/成人/NSFW内容
- [ ] 全局替换事故残留
- [ ] 定义事实错误
- [ ] 语法/拼写硬伤
- [ ] 空字段
- [ ] JSON parse失败

### 2. 定义标准
- 定义用词不能比目标词更难(FK评分不超过level+2)
- 不能循环引用(定义里不能出现目标词本身)
- 同level内不能有两个词定义相同(歧义对Jaccard < 50%)
- 单一词义(L1-L2不塞多个意思)
- 定义必须能唯一标识目标词

### 3. 例句标准
- 必须包含目标词(或常见变形)
- 语法正确、自然
- 能帮助推断词义
- 不含金融/AI/编程/成人内容(L1-L3)
- FK评分适合目标level

### 4. imageKeyword标准
- 具体场景描述(非抽象单词)
- 同level内不能重复
- Google搜索能返回清晰、无歧义的图片
- 不会返回NSFW结果

### 5. 分层标准
- Level与儿童实际词汇习得阶段匹配
- 不能有GRE/SAT词混入L1-L3
- 参照Dolch/Fry/CCSS/Biemiller权威词表

---

## 二、审校流程(每次修改后必须执行)

### Step 1: 自动化检查(10秒)
```bash
node proofcheck.mjs    # 格式/语法/禁词/替换事故
```
**通过标准:** 0 CRITICAL, 0 real MAJOR

### Step 2: 可读性检查
```bash
node fk-check.mjs     # FK评分超标检测
```
**通过标准:** L1定义FK < 6, L2 < 7

### Step 3: 歧义检测
```bash
node quiz-test.mjs    # 同义词/相似定义检测
```
**通过标准:** 同level内0对80%+重叠

### Step 4: 词典模式检查
```bash
node dict-verify.mjs  # 定义残缺/循环/多义
```
**通过标准:** 0 HIGH

### Step 5: 结构化辩论审校（正反方对立+交叉质证+法官裁决）

> 详见 `debate-protocol.md` 完整协议

**Round 1 - 正反方对立（不允许中立）**
每组200词，分配角色：
- **正方（GPT）**：必须论证“这200个词条全部正确，不需要改”
- **反方（Gemini）**：必须论证“这200个词条有致命缺陷”
- 关键：正反方是强制对立的

**Round 2 - 交叉质证**
- 反方的每条批评，正方必须正面回应（不能说“我同意”）
- 正方的每条辩护，反方必须反驳或承认自己错了
- Claude做法官：只看论据质量

**Round 3 - 法官裁决**
- Claude读双方所有论据
- 对每个争议词条判定：正方赢（保留）or 反方赢（修改）
- 必须给出判决理由

**可证伪性要求：**每条批评必须包含：具体词条、具体问题、测试用例、外部证据

**防客气检查清单：**
- [ ] 三方是否都报了≥5个真问题？
- [ ] 有没有“我同意对方”的无效回应？
- [ ] 每条批评是否都有外部证据+测试用例？
- [ ] Round 2交叉质证是否真的执行了？

**通过标准：** 三轮完成后剩0 CRITICAL/HIGH，每条批评有证据+测试用例

### Step 6: 回归验证
修复后必须重新跑Step 1-4,确认没有引入新问题。

### Step 7: 发布
```bash
git add && git commit && git push
```

---

## 三、铁律(不可违反)

1. **Claude必须参与每次审校,绝对不能偷懒**
2. **每次改完跑proofcheck,不能跳过**
3. **分层后必须再审一轮**
4. **不主动说"定稿"--J说OK才是定稿**
5. **改了不验证 = 没改**
6. **AI审AI有确认偏差--程序检查是底线**
7. **人不可靠,机器可靠--能用程序的不用人**

---

## 四、每日审校cron任务

- 时间:每天09:00北京时间
- 范围:全部5211词
- 流程:Step 1-5自动执行
- 结果:发送到J的WhatsApp
- 标准:连续两轮三方零CRITICAL才算CLEAN

---

## 五、已知盲区及对策

| 盲区 | 对策 |
|------|------|
| AI审AI确认偏差 | 规则引擎程序化检查 |
| 全局替换事故 | proofcheck正则检测 |
| 改完引入新bug | 改后必跑proofcheck |
| 定义太难 | FK评分自动标记 |
| 同义词混淆 | quiz-test检测Jaccard |
| imageKeyword出错图 | 具体场景描述+负面清单 |
| 词频≠适合年龄 | 用儿童词表而非COCA |
| 真人审校不可靠 | 程序+数据+多模型投票替代 |

---

## 六、工具清单

| 工具 | 用途 | 文件 | 版本 |
|------|------|------|------|
| proofcheck.mjs | 格式/语法/禁词/事故检测 | v1.0 | Node |
| fk-check.mjs | 可读性评分 | v1.0 | Node |
| quiz-test.mjs | 定义歧义检测 | v1.0 | Node |
| dict-verify.mjs | 定义模式检查 | v1.0 | Node |
| nlp-verify.py | WordNet语义验证+Dale-Chall复杂度+语义重复检测 | v1.0 | Python |
| distractor-test.mjs | 干扰项测试(定义能否唯一标识目标词) | v1.0 | Node |
| ab-test.mjs | A/B测试框架+问题词预测 | v1.0 | Node |
| advanced-verify.mjs | 中文L1干扰+间隔重复难度+例句自然度 | v1.0 | Node |
| tracking-config.json | 游戏前端埋点配置 | v1.0 | 配置 |
| 反向验证(AI subagent) | 只看定义猜词测试 | 每次审校跑 | GPT |
| 混淆矩阵(AI subagent) | 模拟选择题测试 | 每次审校跑 | Gemini |
| CLIP图片验证(AI subagent) | imageKeyword出图匹配度 | 每次审校跑 | Claude |
| cognitive-load-check.mjs | 定义超纲词检测（认知负荷） | v1.0 | Node |
| visual-collision-check.mjs | 同level imageKeyword视觉混淆检测 | v1.0 | Node |
| memory-interference-check.mjs | 同level记忆干扰词对预测 | v1.0 | Node |
| vocab-dependency-check.mjs | 词汇依赖图+依赖倒挂检测 | v1.0 | Node |
| spelling-difficulty-check.mjs | 拼写难度评分（看图拼词模式） | v1.0 | Node |
| prototype-check.mjs | imageKeyword原型效应检查 | v1.0 | Node |
| mutation-test.mjs | 变异测试（注入已知错误测漏检率） | v1.0 | Node |
| debate-protocol.md | 结构化辩论协议文档 | v1.0 | 文档 |
| coca_5000.csv | 词频数据 | COCA | 数据 |

### 完整检查命令序列(每次修改后必跑)
```bash
# Step 1: 基础规则检查
node proofcheck.mjs

# Step 2: 可读性
node fk-check.mjs

# Step 3: 歧义检测
node quiz-test.mjs

# Step 4: 定义模式
node dict-verify.mjs

# Step 5: NLP深度验证(WordNet+Dale-Chall+语义相似度)
python3 nlp-verify.py

# Step 6: 认知负荷检测
node cognitive-load-check.mjs

# Step 7: 视觉混淆检测
node visual-collision-check.mjs

# Step 8: 记忆干扰预测
node memory-interference-check.mjs

# Step 9: 词汇依赖图
node vocab-dependency-check.mjs

# Step 10: 拼写难度评分
node spelling-difficulty-check.mjs

# Step 11: 原型效应检查
node prototype-check.mjs

# Step 12: 三模型对抗式审校(独立+互审+仲裁)
```

### 通过标准
| 工具 | 通过条件 |
|------|----------|
| proofcheck | 0 CRITICAL, 0 real MAJOR |
| fk-check | L1定义FK<6, L2<7 |
| quiz-test | 同level内 0对80%+真歧义重叠 |
| dict-verify | 0 HIGH |
| 反向验证 | 只看定义猜词正确率≥70% |
| 混淆矩阵 | 模拟选择题正确率≥90% |
| CLIP图片验证 | imageKeyword匹配度≥80%(Yes+Probably) |
| 中文干扰检测 | 所有干扰词定义已标注区分 |
| distractor-test | L1-L2定义可混淆词<5%(当前3%) |
| nlp-verify | 0对未区分的语义重复对 |
| cognitive-load-check | 定义中0 CRITICAL(≥5超纲词), MAJOR<10 |
| visual-collision-check | 0 CRITICAL(同一imageKeyword), 0 MAJOR |
| memory-interference-check | HIGH risk词对已标记不同时出现 |
| vocab-dependency-check | 依赖倒挂<5%, 形态学顺序正确 |
| spelling-difficulty-check | L1-L2 warnings<5% |
| prototype-check | 0 obscure modifier issues |
| mutation-test | 检出率≥90% |
| 结构化辩论 | Round 1-3全部完成，每条批评有证据+测试用例 |
| 三模型审 | 三轮后 0 CRITICAL/HIGH |

---

## 六B、深度验证维度（超越文本审校）

### 1. COCA词频对照验证
- **目的**：验证每个词的level分配是否与实际语料频率匹配
- **方法**：用 coca_5000.csv 对照，标记“频率排名>3000但放在L1-L2”的词
- **工具**：写 coca-level-check.mjs
- **通过标准**：L1词应在COCA前2000，L2在前3000，L3在前5000

### 2. 真实Google Images验证
- **目的**：确认imageKeyword搜出来的图片是否真的能帮助猜词
- **方法**：用browser工具自动搜索每个imageKeyword，截图前3个结果，AI判断是否匹配
- **工具**：写 image-search-verify.mjs（自动化browser搜索+截图+判断）
- **通过标准**：90%的imageKeyword搜索结果能让10岁孩子猜到词义

### 3. 真人Learner测试（Mark试做）
- **目的**：发现AI永远找不到的真实学习卡点
- **方法**：从每个level随机抽20题生成选择题PDF，让Mark做，记录错题和犹豫项
- **工具**：写 generate-quiz-pdf.mjs（随机抽题+生成PDF）
- **频率**：每周一次，每次20题
- **标准**：正确率≥80%为该level达标，<60%需要调整定义或换词

### 4. 跨文化场景审查
- **目的**：识别中国学生完全没有文化背景的场景
- **方法**：标记所有含有西方特定文化场景（Thanksgiving, Halloween, prom, yearbook等）的例句
- **工具**：加到 proofcheck.mjs 的 CULTURE_SPECIFIC_PATTERNS
- **标准**：L1-L2不能用中国学生没有schema的文化场景作为唯一例句

### 5. 防客气措施
- **硬性quota**：5000+词库每轮三方审校必须报≥5个真问题，否则换seed/角度重跑
- **随机抽检**：从“无问题”词条里随机抽10个，让另一个模型专门攻击
- **分批审**：每次只给200词，不给全量（防止走马观花）
- **Round 2不能跳过**：超时也要在下一轮补上交叉对抗

### 6. 搭配频率验证
- **目的**：确认例句里的搭配（verb+noun, adj+noun）在真实语料中自然出现
- **方法**：用COCA搭配数据或web搜索验证频率
- **标准**：例句搭配必须在COCA中出现≥10次，否则标记为不自然

---


### 原则
每次审校发现新问题类型、新方法、新工具,**必须在当次session结束前固化到本文档和对应脚本中**。否则下次醒来等于没学过。

### 固化流程
1. **发现新问题类型** → 立刻加到proofcheck.mjs规则里(如搭配检查、SVA检查)
2. **发现新审校方法** → 写成脚本或加到advanced-verify.mjs,更新本文档工具清单
3. **发现工具自身bug** → 当场修,在版本历史记录修了什么
4. **AI审校发现的pattern** → 抽象成正则/规则加入proofcheck,不能只停留在报告里
5. **每次审校结束** → 检查是否有新发现需要固化,没固化不算完成

### 禁止事项
- ❌ 只写报告不改工具(报告是一次性的,工具是永久的)
- ❌ "下次再加" - 没有下次,当场加
- ❌ 手动跑一次就忘 - 必须进入自动化流程
- ❌ 新session不读QA-STANDARD就开始审校

### 检查清单(每次审校结束前过一遍)
- [ ] 有没有新发现的错误pattern?→ 加proofcheck正则
- [ ] 有没有新的检查维度?→ 加工具或加advanced-verify
- [ ] 有没有误报需要修?→ 改正则/加白名单
- [ ] 有没有新的通过标准?→ 更新本文档通过标准表
- [ ] proofcheck跑过了?→ 确认新规则没引入误报

---

## 六C、对抗式审校方法论

### 1. 结构化辩论流程
参见 `debate-protocol.md`。核心：Round 1正反方强制对立→Round 2交叉质证→Round 3法官裁决。

### 2. 可证伪性要求
每条批评必须包含：
1. 具体词条（哪个词、哪个字段）
2. 具体问题（不能说“不太精确”，必须说“会导致学生在X场景下误解为Y”）
3. 测试用例（一个可以验证的测试）
4. 外部证据（至少引用一个外部来源）

不符合以上4条的批评 = 无效，自动删除。

### 3. 强制分歧规则
- 说“我同意对方结论” = 自动判无效重跑
- 必须找到至少3个对方漏掉的问题
- 任务：不是“对方说得对不对”，而是“对方漏了什么你没漏的？”

### 4. 外部锚定要求
允许的外部来源（按权威度排序）：
1. Merriam-Webster Dictionary
2. Oxford Learner’s Dictionary
3. Cambridge Dictionary
4. COCA语料库频率数据
5. Biemiller/Nation词表
6. CCSS标准
7. 学术论文（需给出作者+年份）

“我认为”/“我觉得” = 无效。必须引用来源。

### 5. 人格极端化设定
- **GPT角色**：“你是一个被这本词典害惨的家长。你儿子用了这本词典考试全错。每找到一个错误你的律师费报销一万。”
- **Gemini角色**：“你是Oxford University Press的法务，在找任何可以起诉这本词典的质量问题。每找到一个可以起诉的问题，你的律所多收一万。”
- **Claude角色**：“你是法官。你收了双方各100万的贿赂但你是个正直的法官，只看证据判案。”

### 6. 防客气检查清单
每轮审校结束时，编排者必须检查：
- [ ] 三方是否都报了≥5个真问题？（否则换角度重跑）
- [ ] 有没有“我同意对方”的无效回应？（有则重跑该方）
- [ ] 每条批评是否都有外部证据？（没有的删除）
- [ ] 每条批评是否都有测试用例？（没有的删除）
- [ ] Round 2交叉质证是否真的执行了？

### 7. 变异测试流程
- 频率：每周一次
- 流程：注入30个已知错误（事实错误/禁词/搭配错误/空字段/替换事故/语法错误各5个）
- 工具：`node mutation-test.mjs`
- 通过标准：检出率≥90%
- 不通过则必须加强相应检测规则

---

## 六D、测量科学与工业级质量

### 1. 词族一致性（Word Family Consistency）
- 用Nation’s BNC/COCA word family lists验证
- beauty/beautiful/beautifully应在相邻evel
- 工具：vocab-dependency-check.mjs已部分覆盖

### 2. 语域匹配（Register Matching）
- 每个词标注formal/informal/neutral/academic
- L1-L2不应有formal语域词（commence, endeavor等）
- 工具：待建 register-check.mjs

### 3. 词频-义频分离（Sense Frequency）
- 多义词检查我们教的是高频义项还是低频义项
- “run”的高频义=跑，低频义=经营
- 工具：待建 sense-frequency-check.mjs

### 4. 形态透明度（Morphological Transparency）
- unhappy可从un+happy推导（透明），island不可（不透明）
- 透明词可教构词规则，不透明词需更多scaffold
- 工具：待建 morphology-check.mjs

### 5. Golden Set回归测试
- 人工确认50个“100%正确”的标杆词条
- 每次改词库后检查golden set有没有被意外改坏
- 工具：待建 golden-set-regression.mjs

### 6. CEFR对标
- 我们的L1-L5与CEFR A1-C2的对应关系
- 验证是否有A1词放在了L3+
- 工具：待建 cefr-alignment-check.mjs

### 7. 标准化考试覆盖率
- TOEFL Primary / Cambridge YLE词表覆盖率
- Mark将来考这些考试，我们覆盖多少？
- 工具：待建 exam-coverage-check.mjs

---

## 八、版本历史

- v1.0 (2026-05-08): 初版,基于2026-05-07三方审校经验建立
- v1.1 (2026-05-08): 更新为三轮制(独立+对抗+仲裁),增加老师视角
- v1.2 (2026-05-08): 增加NLP验证+干扰项测试+A/B测试框架
- v1.3 (2026-05-08): 增加反向验证+混淆矩阵+CLIP图片验证+中文干扰检测+间隔重复评分,完成全部14个工具
- v1.4 (2026-05-08): 加入"工具自进化制度"条款，proofcheck加SVA检查+搭配(Collocation)检查，修SVA正则bug(不再误报she is)
- v1.5 (2026-05-08): proofcheck v1.2 — 加FACT_CHECKS数组(mushroom/spider/whale等7条常见事实错误自动检测)、SYNONYM_CYCLE检测(互为定义的循环定义)、不规则变形映射(become→became/vertex→vertices等)、diacritical marks映射(communiqué/cliché等)、"a/an" whitelist扩展(utopia/utopian/unified)、SVA "you is" false positive修复
- v1.6 (2026-05-09): 增加深度验证维度（COCA词频/真实图片搜索/真人测试/跨文化/防客气/搭配频率），覆盖unknown unknowns
- v1.7 (2026-05-09): 新增6个深度检测工具(cognitive-load/visual-collision/memory-interference/vocab-dependency/spelling-difficulty/prototype-check)，中文母语干扰列21→70词对
- v1.8 (2026-05-09): Step 5升级为结构化辩论流程（正反方+交叉质证+法官裁决），新增六C对抗式审校方法论（可证伪性/强制分歧/外部锚定/人格极端化/防客气/变异测试），新增六D测量科学与工业级质量（7个维度），新增mutation-test.mjs和debate-protocol.md
