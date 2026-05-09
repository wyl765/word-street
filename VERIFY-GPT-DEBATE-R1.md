# VERIFY-GPT-DEBATE-R1 — 词条“起诉书”（至少 5 个可证伪问题）

背景：Mark（10岁中国ESL，MAP≈197）使用该词典做题“全错”。以下是我在 `/tmp/debate-batch.jsonl`（200词条）里找到的**可证伪**错误/高风险误导点（每条都满足：词条+字段 / 具体误导 / 测试用例 / 外部证据）。

---

## 1) pepper — definition

1) **具体词条/字段**：`pepper` / `definition`

2) **具体问题（会导致的误解）**：词条把 *pepper* 定义成“红/绿/黄的空心脆蔬菜”（明显是在讲 *bell pepper*），会让学生在日常英语里把 *pepper*（黑胡椒粉/胡椒调味料）误解成“彩椒”。

- 误解场景：餐桌上 “Pass the pepper.” “I put pepper on my eggs.” 这时的 pepper 通常是调味料。
- 被该定义诱导后的错误：学生会以为必须是红/绿/黄的蔬菜，导致阅读理解/选择题错。

3) **测试用例（可复现实验）**：把该词条定义给学生看，然后问：

> 句子：**I sprinkled pepper on my eggs.**
> 
> 问题：这里的 *pepper* 是什么？

如果学生回答“红/绿/黄的空心蔬菜（bell pepper）”，则证明该定义对常见用法产生误导。

4) **外部证据**：Merriam‑Webster 明确把 pepper 的首要义项作为“辛辣香料/调味料”，并另列 capsicum（甜椒/辣椒）义项：

- Merriam‑Webster — *pepper*： “**either of two pungent spices** …” 且另有 “**capsicum … the hollow fruit** … (hot peppers or sweet peppers)”
  https://www.merriam-webster.com/dictionary/pepper

---

## 2) caterpillar — definition

1) **具体词条/字段**：`caterpillar` / `definition`

2) **具体问题（会导致的误解）**：定义写“会变成 butterfly”，这会让学生误以为“毛毛虫只会变成蝴蝶，不会变成蛾”。但在科学事实中，caterpillar 是**butterfly 或 moth** 的幼虫。

- 误解场景：科普文/题目 “Some caterpillars become moths.”
- 被该定义诱导后的错误：学生会判断为 False（因为他被教成只会变 butterfly）。

3) **测试用例**：给学生看词条定义后，做判断题：

> True/False：**A caterpillar can become a moth.**

如果学生选 False，则证明该定义误导（把 moth 排除掉）。

4) **外部证据**：Merriam‑Webster：caterpillar 是 “**the elongated wormlike larva of a butterfly or moth**”。

- https://www.merriam-webster.com/dictionary/caterpillar

---

## 3) cub — definition

1) **具体词条/字段**：`cub` / `definition`

2) **具体问题（会导致的误解）**：定义写成“baby bear, lion, or fox”，把 *cub* 锁死在这三种动物，会让学生在真实阅读中把 **wolf cub / tiger cub** 等常见搭配判断为“用词错误”。

- 误解场景：故事 “The wolf cub followed its mother.”
- 被该定义诱导后的错误：学生会说“wolf 的宝宝不叫 cub”，从而改错/选错。

3) **测试用例**：给学生看该定义后问：

> 句子：**The wolf cub howled at night.**
> 
> 问题：这里的 *cub* 用得对不对？

如果学生回答“不对（因为 cub 只用于 bear/lion/fox）”，则证明该定义具有排他性误导。

4) **外部证据**：Merriam‑Webster：cub 是 “**a young carnivorous mammal (such as a bear, fox, or lion)**”，并非只限这三种（“such as”=举例，不是排他列表）。

- https://www.merriam-webster.com/dictionary/cub

---

## 4) ladybug — definition

1) **具体词条/字段**：`ladybug` / `definition`

2) **具体问题（会导致的误解）**：定义写成“small red bug with black spots”。这会让学生把**非红色**的瓢虫（很多种类是黄色/橙色/甚至黑色）排除在 ladybug 之外，形成“颜色=定义条件”的错误分类。

- 误解场景：自然课图片里出现黄色/橙色瓢虫。
- 被该定义诱导后的错误：学生会回答“这不是 ladybug”。

3) **测试用例**：给学生看该定义后，出图（或描述）：

> “一个**黄色**、带斑点的半球形小甲虫。”
> 
> 问：它可以是 ladybug 吗？

如果学生回答“不能（因为 ladybug 必须是红色）”，则证明定义误导。

4) **外部证据**：Merriam‑Webster：ladybug 是 “**often brightly colored often spotted** beetles …”——“often”说明颜色/斑点是常见特征，但**不是必须为红+黑点**。

- https://www.merriam-webster.com/dictionary/ladybug

---

## 5) make up — definition

1) **具体词条/字段**：`make up` / `definition`

2) **具体问题（会导致的误解）**：该词条只给出 “to invent”。但 *make up* 还有高频义项“**和好/和解（become reconciled）**”。如果只教“invent”，学生在阅读 “They made up after the fight.” 时会误解成“他们编了个东西”。

- 误解场景：人物吵架后 “They made up.”
- 被该定义诱导后的错误：学生会把 *made up* 解释为“编造”，导致题目问“他们后来怎样了？”时答错。

3) **测试用例**：给学生看该定义后，问选择题：

> 句子：**Tom and Jack argued, but later they made up.**
> 
> A. 他们后来**和好了**  B. 他们后来**编了个故事**

如果学生选 B，则证明定义覆盖不当，导致核心义项误解。

4) **外部证据**：Merriam‑Webster 在 *make up*（intransitive verb）中明确列出： “**to become reconciled**; quarreled but later made up”。

- https://www.merriam-webster.com/dictionary/make%20up

（同时，Cambridge 也单列 *make something up* = (INVENT)，说明“invent”只是其中一个结构/义项：
https://dictionary.cambridge.org/dictionary/english/make-up?q=make%20up ）

---

## 6) come across — definition

1) **具体词条/字段**：`come across` / `definition`

2) **具体问题（会导致的误解）**：词条只给出“find by chance”，但 *come across* 还常用作“**给人某种印象/显得（come across as ...）**”。因此学生遇到 “He came across as rude.” 会把它误解成“他偶然找到了粗鲁”。

3) **测试用例**：给学生看该定义后问：

> 句子：**She came across as confident.**
> 
> 问：这句话更接近哪种意思？
> A. 她偶然发现了自信。 B. 她给人的感觉很自信。

若学生选 A，则证明词条定义导致系统性误解。

4) **外部证据**：Merriam‑Webster：

- sense 2： “**to produce an impression**; comes across as a good speaker”
- sense 3： “to meet, find, or encounter especially by chance”

https://www.merriam-webster.com/dictionary/come%20across

---

## 7) break down — definition

1) **具体词条/字段**：`break down` / `definition`

2) **具体问题（会导致的误解）**：词条只给出“stop working（机器坏了）”。但 *break down* 的常见义项还包括“**情绪崩溃/哭出来**”与“**分解/拆分（break something down）**”。这会导致学生读到 “She broke down in tears.” 时按“机器坏了”去理解。

3) **测试用例**：给学生看该定义后，问：

> 句子：**After the bad news, she broke down and cried.**
> 
> 问：这里 break down 更接近：
> A. 她停止工作/坏了。 B. 她情绪崩溃了。

若学生选 A，则证明该词条定义误导。

4) **外部证据**：Merriam‑Webster *break down* 明确列出：

- “**to divide into parts or categories**”
- “**to succumb to mental or emotional stress**”
- 以及 “to stop functioning …”

https://www.merriam-webster.com/dictionary/break%20down

---

## 8) set up — definition

1) **具体词条/字段**：`set up` / `definition`

2) **具体问题（会导致的误解）**：词条把 set up 直接等同于“get ready”。这会让学生在看到 “He was set up.”（被陷害/被设计）或 “She set herself up as a wedding planner.”（开业/建立职业）时误解为“准备好了”。

3) **测试用例**：给学生看该定义后问：

> 句子：**He was set up by his friends, and the teacher blamed him.**
> 
> 问：set up 更可能意思是：
> A. 帮他把东西准备好 B. 设计/陷害他

若学生选 A，则证明该词条定义对高频义项产生致命误导。

4) **外部证据**：Merriam‑Webster *set up* 除了 “assemble … set up a tent / put (a machine) in readiness” 外，还列出：

- “**to put in a compromising or dangerous position usually by trickery or deceit**”
- “to establish (oneself) in a business …” 等

https://www.merriam-webster.com/dictionary/set%20up

---

## 9) address — definition

1) **具体词条/字段**：`address` / `definition`

2) **具体问题（会导致的误解）**：词条把 *address* 只解释成“where someone lives”。但在学校语境里高频出现的 *address* 是动词：**处理问题/回应担忧/向…讲话**。只教“住址”会导致阅读理解偏离。

- 误解场景：校长讲话 “The principal addressed the students.”；作文题 “How can we address this problem?”
- 被该定义诱导后的错误：学生会以为是在“写住址/谈住址”。

3) **测试用例**：给学生看该定义后问：

> 句子：**We need to address the problem.**
> 
> 问：address 的意思更接近：
> A. 写出住址 B. 处理/解决（给予关注）

若学生选 A，则证明该定义误导。

4) **外部证据**：Merriam‑Webster *address*（verb）列出： “**to deal with or give attention to**; address a problem”。

- https://www.merriam-webster.com/dictionary/address

---

## 建议固化项

下面是我建议加到 `proofcheck.mjs` 的“自动删错/报警规则”（偏保守，只要命中就要求人工复核）：

1) **多义高频词过窄定义规则**：若 `word` 属于常见多义词（可维护白名单：pepper, address, etc.），但 `definition` 只覆盖某一个子义且缺少限定（如“(vegetable)”/“(spice)”），则报错。

2) **phrasal verb 覆盖面规则**：若 `word` 含空格（phrasal verb），且 `definition` 只有一个极短“to …”短语（例如 ≤4个词），则要求提供：
   - 至少一个**结构限定**（make **something** up vs make up），或
   - 至少补充一个**第二高频义项**（例如 make up=和好）。

3) **“turn(s) into a butterfly” 科学事实规则**：若 `word` 为生物学阶段词（如 caterpillar），且 `definition` 包含“turn into a butterfly”这种排他结论，则报错（需要改成 “larva of a butterfly or moth” 或至少避免排他）。

4) **颜色/图案当作必要条件规则**：若 `definition` 包含强制性的颜色/花纹（如 “red … with black spots”），则提示“可能把常见但非必要特征写成必要条件”，需人工核对（ladybug 属此类）。

5) **枚举式排他误导规则**：若 `definition` 采用 “a baby X, Y, or Z” 这种**封闭枚举**，且该词在权威词典用 “such as …” 举例（非排他），则报错（cub 属此类）。
