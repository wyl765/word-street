# Word Street 词库审查报告（R1 Prosecution / GPT）

> 说明：本次审查基于你提供的词条列表片段（以 `waterfall` 结尾）。我逐条通读并只记录**可证伪**的“真问题”（满足：具体词条+具体问题+测试用例+权威外部证据）。

---

### [严重] bend — definition/example 不一致
- **具体词条**：`bend` — **definition**（当前："to make something not straight"）+ **example**（"You need to bend down to pick up the toy.")
- **问题**：当前定义只覆盖“把某物掰弯/弄弯（bend a pipe）”，但例句使用的是**人体动作**义项（bend down = 弯下身/弯腰）。这会导致学生把 *bend down* 误解为“把某个东西向下掰弯”，从而在阅读理解/句意选择题中选错。
- **测试**：给学生看当前定义，然后问：
  - Q："You need to bend down to pick up the toy" 这句话是什么意思？
  - 若学生回答："你需要把玩具掰弯/把什么东西向下掰"（而不是“弯腰/弯下身去捡玩具”），即可证伪该定义覆盖不足。
- **证据**：Merriam‑Webster 对 *bend* 的 intransitive 用法明确包含“弯下身”的义项与例子："The road bends... **bent down to pick up a piece of paper**"（bend, intransitive verb: "to curve out of a straight line or position"；例句含 *bent down to pick up...*）。
  - 来源：Merriam‑Webster, *bend*：https://www.merriam-webster.com/dictionary/bend （Accessed 2026-05-09）
- **建议**：把 definition 拆成两条或改写为能覆盖人体动作：
  - 建议定义："to move your body so it is not straight (bend down/bend over)" 或 “to make something or your body not straight by curving it”。
  - 例句保留 *bend down* 时，定义必须包含“弯腰/弯下身”。

### [严重] tunnel — definition 事实性过窄（把 tunnel 限定成“山里的公路”）
- **具体词条**：`tunnel` — **definition**（当前："a road that goes through a mountain"）
- **问题**：该定义把 tunnel 错误地限制为“穿过山的公路”，会让学生以为：
  1) 只有“山里”才有 tunnel；
  2) tunnel 必须是 road（而不是 railway/foot tunnel/underground passage）。
  这会导致学生在看到“地铁隧道/过江隧道/海底隧道”时判断为“不是 tunnel”。
- **测试**：给学生看当前定义，然后给出场景：
  - 场景："a subway tunnel under the city"（城市地下的地铁隧道）。
  - Q：这是 tunnel 吗？
  - 若学生回答“不算，因为不在山里/不是公路”，即可证伪该定义错误。
- **证据**：Oxford Advanced Learner’s Dictionary 将 tunnel 定义为："**a passage built underground**, for example to allow a road or railway to go through a hill, **under a river**, etc."（强调 underground passage；可在山下、河下等，不限“mountain road”）。
  - 来源：OALD, *tunnel*：https://www.oxfordlearnersdictionaries.com/definition/english/tunnel_1 （Accessed 2026-05-09）
- **建议**：改为更通用且适合儿童 ESL 的表述：
  - "a passage underground that people, cars, or trains can go through"（可补充："through a hill/mountain or under a river"）。

### [中等] inventor — definition 过宽，会把“创造/制作”误当“发明”
- **具体词条**：`inventor` — **definition**（当前："a person who makes new things"）
- **问题**："makes new things"（做出新东西）覆盖面太大，会把“制作新菜谱/做手工/写新故事”的人都误判为 inventor；但 inventor 的核心是 **invent（发明）**：创造出新的装置/方法/东西（通常是以前不存在的、可被认为是 invention）。定义过宽会导致词义边界错误，考试题（人物职业匹配/词义选择）容易全错。
- **测试**：给学生看当前定义，然后问：
  - Q："A chef makes a new sandwich." 这个 chef 是 inventor 吗？
  - 若学生回答“是”（仅因为“做了新东西”），即可证伪该定义过宽。
- **证据**：OALD 对 inventor 的定义是："**a person who has invented something** or whose job is **inventing** things"（强调 invent/发明，而非泛泛的 make new things）。
  - 来源：OALD, *inventor*：https://www.oxfordlearnersdictionaries.com/definition/english/inventor （Accessed 2026-05-09）
- **建议**：把 definition 改为围绕 invent：
  - "a person who invents something new" / "someone who creates a new machine/idea and is the first to make it"（面向 10 岁可保留 machine/gadget 例子）。

### [严重] make up — definition 漏掉高频义项，导致句意反向
- **具体词条**：`make up` — **definition**（当前："to invent"）
- **问题**：*make up* 是高多义（polysemy）短语动词。你当前只给了“编造/虚构（invent）”，但常见场景中 *make up* 也表示“**和好/和解**”。如果学生在阅读里看到 "They argued, but they made up."，用当前词典会把句意误解成“他们编造了（什么）”。这是**直接导向选项相反**的错误。
- **测试**：给学生看当前定义，然后问：
  - Q："Tom and Mark quarreled, but later they made up." 这句话是什么意思？
  - 若学生回答“他们后来编造了（一个故事/借口）”，而不是“他们和好了”，即可证伪该词条定义不完整且会误导。
- **证据**：Merriam‑Webster 明确给出 *make up* 的 intransitive 义项："**to become reconciled** — *quarreled but later made up*"（同时也存在“编造借口”等 invent 用法）。
  - 来源：Merriam‑Webster, *make up / makeup*：https://www.merriam-webster.com/dictionary/make%20up （Accessed 2026-05-09）
- **建议**：
  - 若保留词条为 `make up`，建议拆分或标注：
    1) make up (a story/excuse) = invent
    2) make up (after an argument) = become friends again
  - 或把词条改成更单义的：`make up a story`。

### [中等] bored — definition 语义类型缺失（“感觉” vs “性质”），易与 boring 混淆
- **具体词条**：`bored` — **definition**（当前："not interested, nothing to do"）
- **问题**：当前定义没有明确 bored 是一种“**感受/状态**”（feeling of boredom），容易让学生把 bored 当成“事物的性质（= boring）”。典型错误是把主语用错：*The movie was bored.* 或者在选择题里把 “I’m bored” 和 “It’s boring” 混为一谈。
- **测试**：给学生看当前定义，然后出二选一：
  - A: "I am bored."  B: "The movie is bored."
  - 若学生选择 B 或认为 A/B 都对（因为把 bored 理解成“不有趣”这个性质），即可证伪该定义未区分“人感到无聊”与“事物令人无聊”。
- **证据**：Merriam‑Webster 对 bored 的定义是："**filled with or characterized by boredom**"（即处于无聊状态/感到无聊）。
  - 来源：Merriam‑Webster, *bored*：https://www.merriam-webster.com/dictionary/bored （Accessed 2026-05-09）
- **建议**：把 definition 改成“感受型”表述：
  - "feeling bored because you have nothing to do or something is not interesting"（并可在同组词里补上 boring 的对照）。

---

## 建议固化项
建议把以下 pattern 加进 `proofcheck.mjs` 自动检测（可大幅减少“用词典害惨学生”的系统性错误）：

1. **Definition–Example 一致性检查**：
   - 若例句含固定搭配/短语（如 *bend down*），definition 必须覆盖该义项；否则标红。

2. **过窄定义（overly narrow by location/object）检测**：
   - 出现 "through a mountain"、"only old roads" 这类限定语时，提示核对权威词典是否允许 "under a river/city" 等更广泛场景。

3. **多义短语动词/多词条（phrasal verb polysemy）检测**：
   - 词条为 *make up / take off / turn on* 等时，若只给单一义项，提示至少标注“本词条限定语境（make up a story）”或拆分多义。

4. **过宽定义（hypernym too broad）检测**：
   - 如把 inventor 定义成 "make new things" 这类过泛上位词时，提示核对是否应回到核心动词（invent）。

5. **-ed/-ing 形容词语义类型提醒**：
   - bored/boring、excited/exciting 等，definition 必须明确是“人的感受”还是“事物的性质”，否则提示补充对照或改写。
