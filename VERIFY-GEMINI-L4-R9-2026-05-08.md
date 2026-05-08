# Word Street Level 4 审核报告

## 审查问题列表

| 文件名 | word | 级别 | 问题描述 | 建议修复 |
| :--- | :--- | :--- | :--- | :--- |
| words-level4a.js | chamber | CRITICAL | 例句或定义可能涉及敏感/暴力内容 | 检查内容并改写 |
| words-level4a.js | alleviation | CRITICAL | 例句或定义可能涉及敏感/暴力内容 (如 drug) | 改为更安全的医疗或安慰场景 |
| words-level4a.js | communique | MAJOR | 例句完全不含目标词 | 必须在例句中使用该词 |
| words-level4a.js | idiosyncrasy | MAJOR | 例句完全不含目标词 | 必须在例句中使用该词 |
| words-level4b.js | palatable | CRITICAL | 例句或定义可能涉及敏感/暴力内容 | 检查内容并改写 |
| words-level4c.js | beneficiary | MAJOR | 例句完全不含目标词 | 必须在例句中使用该词 |
| words-level4c.js | commodity | MAJOR | 例句完全不含目标词 | 必须在例句中使用该词 |
| words-level4c.js | memoir | MAJOR | 语法/拼写错误 ('feels' should be 'feelings') | 改为 feelings |
| words-level4c.js | persona | MAJOR | 循环定义，定义里包含目标词 (persona -> personality) | 换个词解释 |
| words-level4c.js | taxonomy | MAJOR | 语法错误 ('one person species' is unnatural/wrong) | 改为 individual species |
| words-level4c.js | collude | MAJOR | 语法错误 ('act dishonest' should be 'act dishonestly') | 改为 dishonestly |
| words-level4c.js | consanguinity | CRITICAL | 例句或定义可能涉及敏感/不适内容 (如 blood) | 换一个解释或例句，如 family connection |

## 建议固化项

- 🔧 [proofcheck规则] 建议在 `proofcheck.mjs` 中添加正则：`/\bfeels\b/` (当表示名词时，捕获拼写错误 'feelings') 和 `/\bact dishonest\b/`。
- 🔧 [搭配规则] 建议将 "one person species" 加到 `WRONG_COLLOCATIONS` 数组，因为搭配极度不自然。
- 🔧 [禁词] 建议在 `BANNED_WORDS` 增加对 `sex, nude, naked, kill, murder, blood, gore, weapon, gun, suicide, rape, drug` 等敏感词的检查（应用于 imageKeyword、定义和例句）。
- 🔧 [白名单] 无。
- 🔧 [新工具] 建议编写一个工具检查例句中是否包含目标词的精确匹配，如果不包含且不是自然变形（如加 s/ed/ing），则报警。
- 🔧 [标准更新] 在 `QA-STANDARD.md` 中明确规定：“Level 4的定义中绝不能使用比目标词还难的学术词汇，且 imageKeyword 必须安全、对10岁儿童友好。”
