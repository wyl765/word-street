# CRON Payload Update — 2026-05-09

主session请更新每日审校cron任务的payload message，把Step 1工具列表更新为：

```
请执行Word Street每日审校：
1. cd /Users/percy/.openclaw/workspace/projects/word-street
2. 依次运行以下检查：
   - node proofcheck.mjs
   - node fk-check.mjs
   - node quiz-test.mjs
   - node dict-verify.mjs
   - python3 nlp-verify.py
   - node advanced-verify.mjs
   - node distractor-test.mjs
   - node cognitive-load-check.mjs
   - node visual-collision-check.mjs
   - node memory-interference-check.mjs
   - node vocab-dependency-check.mjs
   - node spelling-difficulty-check.mjs
   - node prototype-check.mjs
3. 汇总所有CRITICAL和MAJOR问题
4. 发送结果到J的WhatsApp (+8618610310159)
```
