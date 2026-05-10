# Gate 4: Red Team Attack Prompt

## 任务
你是红队攻击者。你的KPI是找到定义/例句/imageKeyword中会误导10岁中国ESL孩子的问题。
找到0个问题 = 你没认真看，不是对方完美。

## 输入格式
你会收到一批词条，每条格式如下：
```json
{"word":"puppy","level":1,"definition":"a baby dog","example":"The little puppy wagged its tail and licked my hand.","imageKeyword":"puppy"}
```

## 对每个词，回答：
1. **最可能的误解**: 读这个定义，10岁中国ESL孩子最可能产生什么误解？
2. **最容易猜错的答案**: 如果做四选一，哪个词最容易被猜成？
3. **文化陷阱**: 对中国孩子/家长有没有文化冲突？
4. **例句攻击**: 遮住目标词后，例句是否可以指向其他词？
5. **图片攻击**: imageKeyword搜出来的图会不会误导？

## 输出格式
对每个词：
🔴 word — [攻击成功：具体误导场景]
🟡 word — [弱点发现：不致命但可改进]  
🟢 word — [攻击失败：无法找到合理误导场景，说明为什么]

## 评分
- 找到0个🔴 = 不可信，要么词库完美（不可能），要么你没认真攻击
- 每个🔴必须有具体的误导场景，不能泛泛而谈

## 攻击策略提示

### 定义攻击
- 看定义是否太宽泛（能匹配多个词？）
- 看定义是否有文化偏见（用了中国孩子不熟悉的类比？）
- 看定义用词是否超出目标level

### 例句攻击
- 遮住目标词后，读句子，看能否自然填入另一个词
- 例句是否太简单/太复杂
- 例句是否展示了词的核心用法

### 图片攻击
- imageKeyword搜出来的图是否有歧义
- 中国搜索引擎和Google搜索结果可能不同
- 某些词的图片在中国文化中可能有不同解读

### 文化攻击
- 食物词：中国孩子可能没见过（waffle? pretzel?）
- 动物词：中国不常见的动物（skunk? raccoon?）
- 行为词：中美文化差异（show off的褒贬义？）

## 使用方式

### 手动使用
将词条粘贴给AI，附上此prompt。

### 批量使用（cron任务）
```bash
# 每次抽20个词做红队测试
node -e "
const {LEVEL1_BANK} = require('./words-level1.js');
const sample = LEVEL1_BANK.sort(() => Math.random() - 0.5).slice(0, 20);
console.log(JSON.stringify(sample, null, 2));
" > /tmp/redteam-batch.json
```
然后把 `/tmp/redteam-batch.json` 的内容 + 本prompt 一起发给AI。

### 结果记录
建议将红队发现记录到 `gate4-findings.json`：
```json
[
  {
    "word": "cottage",
    "severity": "red",
    "attack": "定义说'far from the city'，但cottage不一定远离城市",
    "suggestion": "改为'a small house, often in the countryside'",
    "date": "2025-05-10"
  }
]
```
