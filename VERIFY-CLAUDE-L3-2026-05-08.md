# Claude 竞品审校报告 — L3 — 2026-05-08

**角色：** 竞品公司产品经理，专找能攻击产品的弱点
**范围：** L3 (4词) + L3a (228词) + L3b (315词) + L3c (195词) = ~742词
**方法：** 逐条通读 + pattern扫描

---

## CRITICAL 问题

### 1. "leech" 定义包含 "blood" — L3c
- 文件: words-level3c.js
- 定义: "a worm-like creature that **sucks blood**"
- 问题: "blood"是L1-L3禁词（按R7标准）。直接出现在定义中。
- 建议: 改为 "a worm-like creature that attaches to skin and feeds on body fluids"

### 2. "knell" 定义包含 "death" — L3c
- 文件: words-level3c.js
- 定义: "the sound of a bell rung slowly, often for a **death**"
- 问题: "death"是L1-L3禁词。
- 建议: 改为 "the sound of a bell rung slowly for a sad or serious event"

### 3. "inquest" 定义包含 "death" — L3c
- 文件: words-level3c.js
- 定义: "an official search, especially into a **death**"
- 问题: "death"出现在定义中。
- 建议: 改为 "an official search to find out what happened"

### 4. "kill two birds with one stone" 例句包含 "kills" — L3b
- 文件: words-level3b.js
- 例句: "Walking to school **kills** two birds with one stone: exercise and saving gas."
- 问题: kills是禁词变形。虽然是习语，但文字匹配会触发。
- 建议: 例句可以改成不重复习语的写法: "By walking to school, you kill two birds with one stone: you get exercise and save gas." — 但仍然有kill。建议在禁词白名单中加入此习语，或改例句为第一人称: "I can kill two birds with one stone by studying math while waiting for the bus."
- 实际判断: 这是习语本身的词条，无法避免kill。应该加白名单。

### 5. "fatal" / "peril" 概念 — 检查L3是否有
- 在L3文件中未发现fatal/peril（它们在L2）。L3 CLEAN。

---

## MAJOR 问题

### 6. 大量例句不含目标词原形（系统性问题）
以下L3词条的例句只出现了屈折变化（过去式/复数/三单/现在分词），不包含word字段的原形：

**words-level3a.js (约55条):**
- beckon → "beckoned"
- afflict → "afflicted"
- assail → "assailed" (stormy ship上下文)
- atone → "atoned"
- babble → "babbled"
- badger → "badgered"
- baffle → "baffled"
- billow → "billowed"
- blazon → "blazoned"
- boggle → "boggles" (三单)
- broach → "broached"
- bulge → "bulged"
- burgeon → "burgeoned"
- capsize → "capsized"
- char → "charred"
- cleave → "cleaved"
- clench → "clenched"
- coil → "coiled"
- collide → "collided"
- confide → "confided"
- cringe → "cringed"
- devour → "devoured"
- dishevel → "disheveled"
- dissect → "dissected"
- divulge → "divulge" ✓ (这个OK)
- elate → "elated"
- elude → "eluded"
- emboss → "embossed"
- encrust → "encrusted"
- engross → "engrossed"
- enshroud → "enshrouded"
- enthrall → "enthralled"
- entreat → "entreated"
- feign → "feigned"
- festoon → "festooned"
- fidget → "fidgeted"
- garner → "garnered"
- hallow → "hallowed"

**words-level3b.js (约30条):**
- dodder → "doddered"
- dole → "doled"
- dote → "doted"
- drape → "draped"
- drench → "drenched"
- droop → "drooped"
- dub → "dubbed"
- earmark → "earmarked"
- elapse → "elapsed"
- elongate → "elongated"
- expel → "expels" (三单)
- falter → "faltered"
- flounce → "flounced"
- flout → "flouted"
- grumble → "grumbled"
- gulp → "gulped"
- graft → "grafted"
- gouge → "gouged"
- grovel → "groveled"

**words-level3c.js (约25条):**
- heed → "heeded"
- hew → "hewed"
- hoard → "hoarded"
- hobble → "hobbled"
- hoist → "hoisted"
- hone → "honed" (已在之前审过)
- huddle → "huddled"
- hurl → "hurled"
- imbue → "imbued"
- impound → "impounded"
- indent → "indented"
- infuse → "infused"
- instill → "instilled"
- intrigue → "intrigued"
- inundate → "inundated"
- irk → "irked"
- jettison → "jettisoned"
- jostle → "jostled"
- knead → "kneaded"
- lunge → "lunged" (actually not in text, need to check)

这是**系统性问题**，影响学习效果。孩子在例句中看不到目标词原形，无法做pattern matching。

### 7. "assail" 定义含暴力 — L3a
- 定义: "to **attack** someone with force or harsh words"
- 问题: "attack"虽然不在禁词列表里，但语义是暴力的。L3是否允许这类词需要明确。
- 建议: 保留（attack不在禁词列表），但标注为MINOR。

### 8. "harpoon" — L3c
- 定义: "a long spear used for catching large fish or **whales**"
- 问题: 捕鲸在现代被认为不道德，可能引起环保意识较强的家长质疑。
- 建议: 改例句场景为历史/博物馆: "In the museum, there was an old harpoon that fishermen used long ago."

### 9. "dragnet" — L3b
- 定义: "a wide search by police to catch criminals"
- 例句: "The police set up a dragnet to catch the **thieves** who **robbed** the bank."
- 问题: 犯罪场景（robbery）对10岁孩子是否合适？
- 建议: 改为更温和的: "The rangers set up a dragnet to find the lost hiker in the forest."

### 10. "crone" — L3a
- 定义: "an old woman, often in fairy tales"
- 问题: "crone"本身有贬义（ugly old woman），可能被认为是ageist/sexist。
- 建议: 保留但确保定义和例句是中性的。当前处理OK。

### 11. "dolt" — L3b
- 定义: "a person who is slow to understand things"
- 例句: "He felt like a dolt when he could not solve the simple puzzle."
- 问题: 这个词基本上是在侮辱智力。教给10岁孩子一个贬低他人智力的词是否合适？
- 建议: 保留（是真实英语词汇），但不是优先学习词。

### 12. "girdle" — L3b
- 定义: "a belt or band worn around the waist"
- 问题: 现代英语中girdle通常指女性塑身内衣，对10岁孩子不合适。当前定义用的是古义（腰带），但如果孩子Google这个词会看到内衣图片。
- 建议: imageKeyword需要明确是"medieval belt" 或 "knight leather belt"

### 13. "leer" — L3c
- 定义: "to look at someone in a **sly or unpleasant way**"
- 例句: "The villain in the movie leered at the hero with a **wicked** grin."
- 问题: "sly"+"unpleasant"+"wicked"堆积了不少负面词。
- 建议: 保留，是文学常见词。

---

## MINOR 问题

### 14. "commode" — L3a
- 定义: "a piece of furniture with drawers for storing things"
- 问题: 在美式英语中commode更常指马桶/坐便器。孩子可能混淆。
- 建议: 加注或改imageKeyword为"antique dresser"而非"wooden cabinet"

### 15. "dime" 文化特定 — L3a
- 定义: "a small U.S. coin worth ten cents"
- 问题: 中国孩子不熟悉美国硬币体系。
- 建议: 保留（需要了解美国文化），但不是优先L3词。

### 16. "caldron" 拼写 — L3a
- 定义OK，但标准拼写是"cauldron"。"caldron"是可接受的变体但不常见。
- 建议: 改为"cauldron"或添加注释。

### 17. 部分L3词偏难（应为L4-L5）
以下词汇对MAP 197学生来说可能过难:
- claustrophobia, effervescent, elocution, escarpment, ethereal, hackneyed
- archipelago, stratosphere, paleontology, sedimentary, geothermal
- 这些更像L4-L5词汇。但如果L3定位是"3年级学术词"则可以。
- 建议: 不算错误，但竞品可以攻击分层。

### 18. "naked" — L3a
- 定义: "not wearing any clothes or covering"
- 例句: "The naked trees in winter show their branches clearly against the gray sky."
- 问题: 定义本身可能让孩子联想到人体裸露。例句用的是树（好），但定义说"not wearing any clothes"。
- 建议: 改定义为 "not covered; without any covering" 以去除clothes的联想。

### 19. "dike" 拼写不一致 — L3b
- word字段: "dike"
- 例句: "The **dyke** along the river..."
- 问题: word是dike但例句用了dyke（英式拼写）。不一致。
- 建议: 统一为dike（美式，更常用于词汇教学）。

### 20. "hostile" — L3a
- 定义: "very unfriendly, ready to fight"
- 问题: "ready to fight"有攻击性。
- 建议: 改为 "very unfriendly and showing anger"

---

## 总体评估

L3词库质量中等偏上。主要问题：
1. **系统性**：例句不含目标词原形（~110条），这是跨level的老问题
2. **禁词泄漏**：blood/death/kills出现在L3（leech/knell/inquest/kill two birds）
3. **个别词文化/年龄不适配**：commode/girdle/dolt/dime
4. **拼写不一致**：dike/dyke, caldron/cauldron

---

## 建议固化项

- 🔧 [proofcheck规则] 扩展禁词检查范围到L3文件（当前可能只检查L1-L2？）。确保death/blood/kill/dead在L1-L3的definition/example/imageKeyword中都被检查。
- 🔧 [proofcheck规则] 添加word与example拼写一致性检查：如果word是"dike"但example包含"dyke"（不同拼写），标记为SPELLING_MISMATCH。
- 🔧 [proofcheck规则] 添加例句包含目标词原形检查（GPT R7也建议了这个）：对每条entry检查example是否包含word字段原样字符串（大小写不敏感）。不包含则MAJOR。这是本轮最大的系统性发现。
- 🔧 [禁词] 确认BANNED_WORDS包含: death, blood, kill, kills, killed, killing, dead, shot, weapon, murder, poison。并确认L3文件也在检查范围内。
- 🔧 [白名单] "kill two birds with one stone" 作为习语词条本身，例句中出现kill应该白名单。同理其他习语词条。
- 🔧 [白名单] "caldron" 作为cauldron的变体拼写，不算拼写错误。
- 🔧 [标准更新] QA-STANDARD.md需要明确：(1) 禁词检查覆盖L1-L3还是全部level？(2) 例句必须包含目标词原形，这一条要加入通过标准。
- 🔧 [新工具] 无需新工具，但需要扩展proofcheck.mjs的检查范围和规则。
