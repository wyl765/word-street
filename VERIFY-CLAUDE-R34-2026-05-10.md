# VERIFY-CLAUDE-R34 — 2026-05-10

**Round:** R34 (三角色深度审)
**Model:** Claude Opus 4.6
**Scope:** words-level1.js (336 words), words-level2.js (369 words)
**Date:** 2026-05-10 01:15 CST

---

## 自动化工具结果

| 工具 | 结果 |
|------|------|
| proofcheck.mjs | ✅ 0 CRITICAL, 0 MAJOR, 212 MINOR |
| anchor-verify.mjs --sample 200 | ✅ PASS — 0 CRITICAL |
| mutation-test.mjs | ✅ PASS — 96.7% (29/30), 1 replace_accident undetected |

---

## 角色1：愤怒家长

> "我儿子用你这本词典学了'lose'，结果考试遇到'I lost my keys'以为是'我没赢我的钥匙'。你们赔我学费！"

### 发现1 — "lose" L1 定义教错主义
- **词条:** lose (L1)
- **问题:** 定义为"to not win"，但10岁ESL儿童日常最高频接触的是"to be unable to find"（I lost my toy / Don't lose your homework）。Merriam-Webster第一义项是"to miss from one's possession"，"fail to win"排在4b。
- **测试用例:** 给学生看"I lost my keys"，按当前定义会理解为"我的钥匙没赢"→完全错误
- **外部证据:** Merriam-Webster: lose 义项1 = "to miss from one's possession"; Oxford Learner's: 第一义 = "to be unable to find sth"
- **严重度:** 🔴 CRITICAL — 定义教了次要义项，漏了主要义项

### 发现2 — "caterpillar" L1 事实遗漏
- **词条:** caterpillar (L1)
- **问题:** 定义"a small animal with many legs that turns into a butterfly"——但caterpillar也变成moth（蛾）。Merriam-Webster明确写"the elongated wormlike larva of a butterfly or moth"。L2有"cocoon"词条写的是"before it becomes a moth"，与L1的caterpillar定义矛盾。
- **测试用例:** 学生学了caterpillar→butterfly后遇到L2 cocoon→moth，会困惑："caterpillar不是只变butterfly吗？"
- **外部证据:** Merriam-Webster: caterpillar = "larva of a butterfly **or moth**"
- **严重度:** 🟡 MAJOR — 事实遗漏，导致L1/L2知识矛盾

### 发现3 — "take" L1 定义过窄
- **词条:** take (L1)
- **问题:** 定义"to get hold of something with your hands"只覆盖物理抓取义。但take是英语最高频动词之一，10岁儿童日常说"take a bath / take a turn / take time"。当前定义让学生遇到这些搭配时无法理解。
- **测试用例:** "It will take 10 minutes"→按当前定义无法理解
- **外部证据:** COCA rank: take #49; Oxford Learner's列出30+义项，物理抓取不是最高频
- **严重度:** 🟡 MAJOR — 高频词的定义覆盖不足

---

## 角色2：Oxford法务

> "以下违反了贵方自行制定的QA-STANDARD §2.2 '单一词义(L1-L2不塞多个意思)'条款。"

### 发现4 — L1多义定义违反标准（3处）
- **词条:** bark, wave, match (全部L1)
- **问题:** 这三个词的定义都用了"also"塞入第二义项：
  - bark: "the outer covering of a tree; **also** the loud sound a dog makes"
  - wave: "to move your hand to say hello or bye; **also** a wall of water in the ocean"
  - match: "to find two things that are the same; **also** a game between two sides"
- **测试用例:** 多选题中同时出现两个义项的干扰项，学生两个都选→错
- **外部证据:** QA-STANDARD.md §2.2: "单一词义(L1-L2不塞多个意思)"
- **严重度:** 🟡 MAJOR — 违反自定标准

### 发现5 — L2多义定义违反标准（9处）
- **词条:** force, chance, close, fair, kind, turn, make, order, find (全部L2)
- **问题:** 全部使用"also"或分号引入第二义项：
  - force: "a push or pull; **also** to make someone do something"
  - chance: "a time when you can try something; **also** how likely something is to happen"
  - close: "to shut; **also** near"
  - fair: "treating people the same and right; **also** an event with rides and games"
  - kind: "nice and caring; **also** a type or sort"
  - turn: "to spin or change direction; **also** a chance to do something"
  - make: "to build or create something; **also** to cause something to happen"
  - order: "a way things are arranged; **also** to ask for something you want to buy"
  - find: "to locate something" (OK, single meaning — actually this one is fine)
- **测试用例:** Quiz题"What does 'close' mean?" → 同时出"near"和"shut"选项都对→测试失效
- **外部证据:** QA-STANDARD.md §2.2
- **严重度:** 🟡 MAJOR — 系统性标准违反（8处确认）

### 发现6 — "itsy" 非标准独立词
- **词条:** itsy (L1)
- **问题:** Merriam-Webster收录的是"itsy-bitsy"（连字符复合词），不收录"itsy"单独使用。教孩子"itsy"是一个独立词汇会导致写作时错误使用。
- **测试用例:** 学生写作"The itsy spider climbed up"→语法不自然，应该是"itsy-bitsy"
- **外部证据:** MW只收录itsy-bitsy/itty-bitty；Cambridge Dictionary同样无"itsy"独立词条
- **严重度:** 🟢 MINOR — 来自著名童谣，理解上下文可接受但不标准

---

## 角色3：法官裁决

| # | 词条 | 问题 | 裁决 | 理由 |
|---|------|------|------|------|
| 1 | lose | 定义教次要义项 | ✅ **修改** | MW/Oxford一致：主义为"unable to find"。10岁儿童encounter频率远高于"not win" |
| 2 | caterpillar | 遗漏moth | ✅ **修改** | MW明确"butterfly or moth"，且与L2 cocoon矛盾 |
| 3 | take | 定义过窄 | ❌ **保留** | L1词库用物理义是合理简化；抽象义太多难收 |
| 4 | bark/wave/match | L1多义 | ⚠️ **标记不修** | 设计权衡：这三个词两个义都是L1常见义，去掉任一都会造成知识缺口。建议未来改game mechanic支持多义卡 |
| 5 | L2多义(8处) | 违反标准 | ⚠️ **标记不修** | 同上，高频多义词的折中。但应在QA-STANDARD中增加多义词豁免条款 |
| 6 | itsy | 非标准独立词 | ❌ **保留** | 来自Itsy Bitsy Spider童谣，文化辨识度极高，ESL教学可接受 |

---

## 修改清单

### Fix 1: lose (L1)
```
旧: "to not win"
新: "to not be able to find something"
旧example: "Our team tried hard but we still lost the game."
新example: "She lost her favorite toy and looked everywhere for it."
旧imageKeyword: "basketball team losing game sad faces"
新imageKeyword: "child searching for lost toy"
```

### Fix 2: caterpillar (L1)
```
旧: "a small animal with many legs that turns into a butterfly"
新: "a small animal with many legs that turns into a butterfly or moth"
```

---

## 固化检查

- [ ] 新错误pattern需固化? → 否（多义问题是设计级，不适合regex检测）
- [ ] 新检查维度? → 建议: proofcheck加"multi-meaning detection"（检测定义中的"also"/";"双义模式）→ 作为MINOR提醒
- [x] proofcheck重跑? → 修后重跑确认
- [ ] QA-STANDARD需更新? → 建议增加"高频多义词豁免条款"（bark/wave等）

---

## mutation-test漏检分析

1个replace_accident未检出: "go the extra mile" example中"importants"替换。建议proofcheck加强对非英语词的检测。当前不紧急（96.7%>90%通过线）。
