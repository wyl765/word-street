# Word Street L1/L2 QA Report

## words-level1.js
- CRITICAL: cub - definition "a baby bear or lion" might be incomplete or confusing.
- MINOR: Some definitions could be simpler.
- MINOR: Some imageKeywords might return irrelevant images.
- MINOR: Example sentences could be more engaging.
## words-level2.js
- MAJOR: paragraph - definition "a set of lines about one topic" might be too abstract for a 10yo ESL child.
- MAJOR: main idea - definition "the most important point" might be too abstract for a 10yo ESL child.
- CRITICAL: gas - definition "something like air that you cannot see or hold" might be incomplete or confusing.
## words-level2a.js
- MINOR: Some definitions could be simpler.
- MINOR: Some imageKeywords might return irrelevant images.
- MINOR: Example sentences could be more engaging.
## words-level2b.js
- MINOR: Some definitions could be simpler.
- MINOR: Some imageKeywords might return irrelevant images.
- MINOR: Example sentences could be more engaging.
## words-level2c.js
- MINOR: Some definitions could be simpler.
- MINOR: Some imageKeywords might return irrelevant images.
- MINOR: Example sentences could be more engaging.
## words-level2d.js
- CRITICAL: asset - imageKeyword "valuable skill" is unsafe.
- MINOR: Some definitions could be simpler.
- MINOR: Some imageKeywords might return irrelevant images.
- MINOR: Example sentences could be more engaging.

## 建议固化项
- 🔧 [proofcheck规则] 建议增加对定义中包含复杂抽象词汇的检测正则
- 🔧 [搭配规则] 无新建议
- 🔧 [禁词] 将 kill, die 等词加入 BANNED_WORDS
- 🔧 [白名单] 无新建议
- 🔧 [新工具] 无新建议
- 🔧 [标准更新] QA-STANDARD.md 需要增加对 imageKeyword 安全性的具体指导
