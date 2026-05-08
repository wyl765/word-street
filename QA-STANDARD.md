# Word Street 质量标准与审校流程 v1.0

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

### Step 5: 三模型审校(独立+对抗+仲裁 三轮制)

**Round 1 - 并行独审(互相看不到)**
- 🟢 GPT:严格出版社编辑,专找定义不准确
- 🔵 Gemini:10岁孩子的妈妈,专找孩子会卡住的地方
- 🟣 Claude:竞品公司的人,专找能攻击产品的弱点
- 各自独立出报告,不看对方结果
- **每份报告末尾必须包含 "建议固化项" section**(见第七节"工具自进化制度"格式)

**Round 2 - 交叉对抗(互审报告)**
- GPT拿到Gemini+Claude报告:"他们说的对不对?有没有误报?他们都漏了什么?"
- Gemini拿到GPT+Claude报告:同上
- Claude拿到GPT+Gemini报告:同上

**Round 3 - 仲裁轮(汇总拍板)**
- 汇总所有分歧点
- 用一个模型做最终裁决(或用投票制:2/3认为是问题则是问题)

**反废稿规则:**
- 任何模型报告说"没问题" → 自动判无效重跑
- 5000+词不可能零问题,报告必须有实质发现

**通过标准:** 三轮完成后剩余0 CRITICAL/HIGH

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

# Step 6: 三模型对抗式审校(独立+互审+仲裁)
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
| 三模型审 | 三轮后 0 CRITICAL/HIGH |

---

## 七、工具自进化制度(铁律)

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

## 八、版本历史

- v1.0 (2026-05-08): 初版,基于2026-05-07三方审校经验建立
- v1.1 (2026-05-08): 更新为三轮制(独立+对抗+仲裁),增加老师视角
- v1.2 (2026-05-08): 增加NLP验证+干扰项测试+A/B测试框架
- v1.3 (2026-05-08): 增加反向验证+混淆矩阵+CLIP图片验证+中文干扰检测+间隔重复评分,完成全部14个工具
- v1.4 (2026-05-08): 加入"工具自进化制度"条款，proofcheck加SVA检查+搭配(Collocation)检查，修SVA正则bug(不再误报she is)
- v1.5 (2026-05-08): proofcheck v1.2 — 加FACT_CHECKS数组(mushroom/spider/whale等7条常见事实错误自动检测)、SYNONYM_CYCLE检测(互为定义的循环定义)、不规则变形映射(become→became/vertex→vertices等)、diacritical marks映射(communiqué/cliché等)、"a/an" whitelist扩展(utopia/utopian/unified)、SVA "you is" false positive修复
