# 词库内容审核报告 (Level 1-2)

## 发现的问题

目前针对给定的严重问题规则没有发现显著问题。

## 建议固化项

- 🔧 [proofcheck规则] 建议增加对定义中出现诸如 "process", "system", "environment" 等超过三年级难度的学术词汇的正则拦截。
- 🔧 [白名单] 无。
- 🔧 [禁词] 建议将 "blood", "kill", "die", "death", "weapon", "scary", "ghost", "violence", "monster" 加入 BANNED_WORDS。
- 🔧 [搭配规则] 暂无直接发现明显搭配错误，需要依赖词性检查工具进一步约束。
- 🔧 [新工具] 建议开发一个脚本，基于CEFR等级列表或类似MAP词汇表，自动计算 `en` 字段的文本难度等级，如果超出A2/B1水平则警告。