# Gate 5: Mark真实测试协议

## 目标
验证词库定义/例句/imageKeyword对10岁ESL孩子（MAP 197）是否真正有效。
AI模拟不可替代真人。这是出版社field testing的等价物。

## 工具
- `generate-mark-test.mjs` — 自动生成测试题
- `score-mark-test.mjs` — 自动评分+分析卡点

## 生成测试
```bash
node generate-mark-test.mjs words-level1.js --count 30 --output mark-test-L1-batch1.md
```

## 评分
```bash
node score-mark-test.mjs mark-test-L1-batch1.md --answers "B,A,C,D,B,..."
```

## 执行标准
- 每天让Mark做1-2组测试（每组20-30题，10-15分钟）
- 不提示、不解释，让Mark独立完成
- 记录：答案、用时、表情/反应、主动提的问题
- 做完后问Mark："哪些词你觉得最难？哪个题看不懂？"

## 通过标准（参考MAP测试标准）
| Level | 最低正确率 | 说明 |
|-------|-----------|------|
| Level 1 | ≥85% | 最基础的词 |
| Level 2 | ≥75% | 基础词汇 |
| Level 3 | ≥65% | 中级词汇 |
| Level 4-5 | ≥55% | 超纲词，测试目的是看能不能学会 |

## 卡点处理
- 正确率 < 通过标准 → 分析卡点 → 修定义/例句 → 重测
- 单个词错误率 > 50%（多次测试）→ 定义有问题，必须改
- Mark说"看不懂" → 定义超纲，必须简化

## 回流机制
- 每次测试的卡点自动记录到 `mark-test-results.json`
- 卡点词加入下一轮Gate 2-4重审
- 连续3次测试同一个词都对 → 该词Gate 5 PASS

## 测试进度追踪
在 `word-status.json` 中更新各文件的 gate5 状态：
- `pending` — 未测试
- `testing` — 测试进行中
- `pass` — 达到通过标准
- `fail` — 未达标，需修改后重测
