# Claude 竞品审校报告 — 2026-05-08 Round 5

**角色：** 竞品公司产品经理，专找能攻击产品的弱点
**范围：** L3 (words-level3a/3b/3c.js) + L4 (words-level4a/4b/4c.js) + L5 (words-level5a/5b/5c/5d.js)
**方法：** programmatic扫描 + 人工抽查

---

## CRITICAL 问题

### 1. consanguinity imageKeyword含"blood" — L4c
- 文件: words-level4c.js
- imageKeyword: "family blood relation"
- 问题: 搜图可能返回血液相关图片，不适合10岁儿童APP
- 建议: 改为 "family tree generations"

### 2. chronological例句含"death" — L5d
- 文件: words-level5d.js
- 词: chronological
- 例句: "The biography tells the story in chronological order from birth to death."
- 问题: "death"出现在例句中，不适合儿童
- 建议: 改为 "...from birth to the present day." 或 "...from earliest to latest events."

---

## MAJOR 问题

### 3. L3大量词分层偏高（约70个词应归L4-L5）
以下L3词对MAP 197（2年级阅读）的10岁孩子来说明显太难：
- **文学/宗教词**: ambrosia, baroque, blazon, caldron, chaplain, consort, corsair, countenance, dogma, hallow, hackneyed, genteel, effigy
- **SAT级词**: claustrophobia, buoyancy, compulsion, cursory, distraught, divulge, elocution, effervescent, ethereal, escarpment, litany, limpid
- **科学专业词（L3b合理但定义需确认）**: photosynthesis, metamorphosis, paleontology, stratosphere

这些词的定义本身写得简单，但词本身不是L3水平。作为竞品会直接攻击"你们的分层不科学"。

**注意**: 这一条是MAJOR而非CRITICAL，因为定义本身质量OK，只是分层问题。且L3是学术词，MAP 197的孩子不一定直接学L3。

### 4. farce定义语法错误 — L3b
- 文件: words-level3b.js
- 词: farce
- 定义: "a funny play case based on silly, unlikely events"
- 问题: "play case" 不是有效英语表达，应该是 "play" 或 "play or situation"
- 建议: "a funny play based on silly, unlikely events"

### 5. communiqué拼写不一致 — L4a
- 文件: words-level4a.js
- 词: communique（word字段无accent）
- 例句: "The government issued a communiqué about..."（有accent）
- 问题: word和example拼写不一致，游戏匹配可能出错

### 6. cliché拼写不一致 — L5c
- 文件: words-level5c.js
- 词: cliche（word字段无accent）
- 例句: "Saying 'easy as pie' is a cliché that..."（有accent）
- 同样的word/example不一致问题

### 7. idiosyncrasy例句不含目标词 — L4a
- 文件: words-level4a.js
- 词: idiosyncrasy
- 例句: "One of his idiosyncrasies was always wearing mismatched socks."
- 问题: 例句用的是复数形式 idiosyncrasies，虽然是变形，但可能导致孩子搞不清原形

### 8. orthodontics例句不含目标词 — L5d
- 文件: words-level5d.js
- 词: orthodontics
- 例句: "Braces are one of the most common orthodontic treatments..."
- 问题: 例句用的是 orthodontic（形容词形式），不是 orthodontics

### 9. reckless定义语法 — L3a
- 文件: words-level3a.js
- 词: reckless
- 定义: "doing risky things with no caring about safety"
- 问题: "no caring" 应为 "no care" 或 "without caring"
- 建议: "doing risky things without caring about safety"

### 10. native定义不准 — L3a
- 文件: words-level3a.js
- 词: native
- 定义: "at first from a certain place"
- 问题: "at first from" 不自然，应为 "originally from"
- 建议: "belonging to a place by birth or origin"

### 11. capsule定义不准 — L3a
- 文件: words-level3a.js
- 词: capsule
- 定义: "a small box or jar, or a tiny case holding drug"
- 问题: "drug" 应为 "medicine"（儿童APP不宜用drug），且"small box or jar"不是capsule的主要含义
- 建议: "a small sealed container, or a tiny case holding medicine"

### 12. inverse定义语法 — L3b
- 文件: words-level3b.js
- 词: inverse
- 定义: "the opposite operation that undoes one more"
- 问题: "one more" 应为 "another" 或 "the other one"
- 建议: "the opposite operation that undoes another"

---

## MINOR 问题

1. **L3a naked** — 虽然定义和例句用的是"bare trees"，但imageKeyword应确保安全搜图。当前"bare winter trees"是安全的。
2. **L3a radical** — 定义"very unlike from what's normal"语法略awkward，"unlike"应为"different"。"very different from what's normal or expected"
3. **L3b farce** — 见MAJOR #4
4. **L3c impervious** — 定义用分号有两个含义，L3孩子可能困惑
5. **L4a erstwhile** — 定义"former or previous"，例句"returned to the competition a year away"缺少介词，应为"after a year away"
6. **L4a abstraction** — 定义提到"programming"，对10岁ESL孩子不合适
7. **L4c persona** — 定义含self-reference "the image or personality someone shows"中的personality包含了person
8. **L5a oxbow** — 需确认"a U-shaped"中a/an用法（U发音/juː/所以a是对的）
9. **L4b intellect** — 定义"being able to think"将名词定义为动词短语，应为"the ability to think..."
10. **L3b subsequently** — 对L3来说太难，应归L4

---

## 总体评估

L3-L5词库定义质量整体良好。主要问题：
1. L3分层偏高（~70个词应归L4-L5），但这不影响当前使用
2. 少数语法/用词问题（farce "play case", reckless "no caring", native "at first from", inverse "one more"）
3. 2个拼写不一致（communiqué, cliché的accent mark）
4. 1个imageKeyword安全问题（consanguinity含blood）
5. 1个例句安全问题（chronological含death）

---

## 建议固化项

- 🔧 [proofcheck规则] 检测例句中的unsafe词扩展：目前检查了定义，应同时检查example中的 death, die, kill, murder, blood, gun, shoot, stab, sex, drunk
- 🔧 [proofcheck规则] 检测定义中 "no + gerund" 错误模式（如"no caring"应为"without caring"或"no care"）
- 🔧 [proofcheck规则] 检测 word 和 example 中拼写不一致（特别是diacritical marks：word用ascii但example用unicode accent）— proofcheck已有diacritical mapping，确认是否覆盖了example检查
- 🔧 [搭配规则] "at first from" 不是标准英语搭配，加入WRONG_COLLOCATIONS
- 🔧 [禁词] "drug" 应加入L1-L3定义禁词（用medicine替代）
- 🔧 [白名单] "a U-shaped" 不是a/an错误（U发/juː/），确认已在白名单
- 🔧 [新工具] 无需新工具
- 🔧 [标准更新] 无新标准需求
