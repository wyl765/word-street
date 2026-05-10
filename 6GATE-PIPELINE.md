# Word Street 6道门质量保证流水线

## 架构总览

每个词库文件(words-levelX.js)必须依次通过6道门：

### 门1: 规则引擎 (代码, 0幻觉)
- 14个自动化工具 + 权威词典对照
- 工具: proofcheck, fk-check, cognitive-load-check, memory-interference-check, visual-collision-check, spelling-difficulty-check, prototype-check, vocab-dependency-check, dict-verify, advanced-verify, quiz-test, distractor-test, mutation-test, anchor-verify
- 通过条件: 0 CRITICAL, 0 MAJOR
- 失败: 自动修复后重跑

### 门2: N-version共识验证
- 三方AI(Claude/GPT/Gemini)各自独立写定义(不看我们的)
- 同时查权威词典(Oxford/Collins/Longman)
- 比对: 6个来源 vs 我们的定义
- 通过条件: >90%的词和多数来源语义一致
- 失败: 不一致的词标记为红旗，AI修复后重新验证

### 门3: 8项属性测试
- Test 1: 定义唯一性(给定义猜词)
- Test 2: 例句遮蔽(遮词猜义)
- Test 3: imageKeyword相关性
- Test 4: 定义可读性
- Test 5: 干扰项区分
- Test 6: 搭配自然度
- Test 7: 反向验证
- Test 8: 游戏兼容性
- 通过条件: >95%的词全部8项pass
- 失败: fail的词修复后重测

### 门4: 红队对抗攻击
- 三方AI主动攻击每个词
- 攻击维度: 误解/猜错/文化陷阱/例句攻击/图片攻击
- 校准: 预埋10个已知错误验证红队检出能力
- 通过条件: 校准检出率>80% + 所有🔴攻击已修复
- 失败: 修复后重新攻击

### 门5: Mark真实测试
- Mark每天实做20-30词
- 记录卡点回流修复
- 状态: 待Mark开始使用后启动

### 门6: J最终确认
- 所有门1-4的❌清单 + 修改方案发J
- J说OK = 定稿

## 流水线规则
- 必须按顺序: 门1→门2→门3→门4→门5→门6
- 前一道门未通过，不进入下一道门
- 每道门失败后修复→重跑→直到通过
- 状态追踪在 word-status.json

## 文件清单 (16个审校单元, 共5205词)

| 文件 | 词数 |
|------|------|
| words-level1.js | 600 |
| words-level2.js | 552 |
| words-level2a.js | 400 |
| words-level2b.js | 382 |
| words-level2c.js | 219 |
| words-level2d.js | 258 |
| words-level3a.js | 231 |
| words-level3b.js | 315 |
| words-level3c.js | 195 |
| words-level4a.js | 301 |
| words-level4b.js | 310 |
| words-level4c.js | 343 |
| words-level5a.js | 232 |
| words-level5b.js | 251 |
| words-level5c.js | 328 |
| words-level5d.js | 288 |

> 排除: words-level3.js (4词), words-level4.js (2词) — 词数≤5，不纳入流水线
