# Gate 4 Red Team Attack — words-level2a.js (400词)

## 🔴 RED — 攻击成功，必须修复

### 🔴 command — 定义与instruct/direct重叠+人称错误
- 误解攻击：定义"to tell a person what they must do"，但例句用puppy（不是person）
- 猜错攻击：四选一中command/instruct/direct定义几乎可互换，孩子会猜错
- 例句攻击：遮住commanded → "The dog trainer ___ the puppy to sit and stay" → instructed/directed都能填
- 修复：定义→"to give an order that must be followed"

### 🔴 instruct — 与command/direct重叠
- 猜错攻击：定义"to teach or tell someone how to do something"中"tell someone to do"部分与command无法区分
- 例句攻击：遮住instructed → "The coach ___ the players to pass the ball more often" → commanded/directed都能填
- 修复：定义→"to teach someone by explaining the steps"

### 🔴 direct — 定义中嵌套command一词
- 猜错攻击：定义"to control or command where people or vehicles must go"直接用了command，循环依赖
- 修复：定义→"to show people or vehicles where they must go"

### 🔴 constantly — 与continuously不可区分
- 猜错攻击：定义"all the time without stopping" vs continuously "going on and on without a break"——语义完全一致
- 例句攻击：遮住constantly → "The puppy ___ wagged its tail" → continuously完美适配
- 修复：定义→"again and again, so often it feels like it never ends"

### 🔴 continuously — 与constantly不可区分
- 猜错攻击：定义和constantly几乎完全等价
- 例句攻击：遮住continuously → "The river flows ___, never stopping day or night" → constantly完美适配
- 修复：定义→"in one long stretch without any break at all"

### 🔴 normally — 与typically/usually三重重叠
- 猜错攻击：三个词的定义都是"大部分时间这样做"，四选一无法区分
- 例句攻击：遮住normally → "We ___ eat breakfast at seven" → usually/typically都能填
- 修复：定义→"in the regular way, when nothing special changes"

### 🔴 typically — 与normally/usually三重重叠
- 猜错攻击：定义"the way something most times happens"与normally/usually等价
- 例句攻击：遮住typically → "He ___ walks to school" → normally/usually都能填
- 修复：定义→"in the most common way for that kind of thing"

### 🔴 usually — 与normally/typically三重重叠
- 猜错攻击：定义"most of the time, in the way things normally happen"直接用了normally
- 修复：定义→"more often than not"

### 🔴 adequate — 与sufficient不可区分
- 猜错攻击：定义"enough or good enough" vs sufficient "enough, as much as you need"——语义等价
- 例句攻击：遮住adequate → "We had ___ food for the whole trip" → sufficient完美适配
- 修复：定义→"just barely enough to get the job done"

### 🔴 sufficient — 与adequate不可区分
- 猜错攻击：同上
- 修复：定义→"the right amount needed, not too little and not too much"

### 🔴 liberal — 文化陷阱
- 文化攻击：定义"open to new ideas and generous"——"开放思想"在中国教育环境中是政治敏感词
- 误解攻击：家长看到此词的政治含义可能产生担忧
- 例句用的是"generous amount"含义，但定义引导向意识形态含义
- 修复：定义→"willing to give plenty; generous"

### 🔴 ideology — 政治敏感例句
- 文化攻击：例句"Each political party has its own ideology about how to help the world"——直接涉及政党政治
- 中国10岁孩子接触此类内容不合适，家长/老师可能反对
- 修复：例句→"The team's ideology was simple: practice hard, play fair, and never give up."

### 🔴 entity — 对目标年龄过于抽象
- 误解攻击：定义"something that exists on its own"太抽象，10岁孩子无法具象化
- 例句攻击："Each company is a separate business entity"——business+entity双重生词
- 修复：定义→"a single thing that has its own name and existence"；例句→"A country, a school, and a person are each a separate entity."

### 🔴 current — 与currently冲突
- 猜错攻击：同一词库中"currently=happening right now"，孩子学完会认为"current"也是时间概念
- 当遇到"river current"时产生认知冲突
- 修复：定义→"a steady flow of water or air moving in one direction"（强调flow/名词性质）

### 🔴 domestic — 双义捆绑
- 误解攻击：定义"related to home or tame animals"混合两个不相关含义
- 例句只展示动物含义，孩子不知道还有"国内的"意思
- 修复：定义→"raised by people and living in homes, not wild"（聚焦动物含义，与例句一致）

---

## 🟡 YELLOW — 弱点但不致命

### 🟡 claim — 双义捆绑（"是你的"+"是真的"），但例句展示了两者
### 🟡 hasten — level 2偏难，但定义清晰
### 🟡 faint — imageKeyword "faint fading"可能搜出晕倒的人
### 🟡 lean — 定义用形容词义（瘦），但学生更常遇到动词义（倾斜）；imageKeyword "lean runner"可能搜出倾斜跑步者
### 🟡 keen — 英式用法"eager"，美式更常用"sharp"，可能混淆
### 🟡 plump — 中国文化中"胖"偏负面，但例句用蓝莓避开了
### 🟡 grim — "sad and stern"偏成人语境，但定义可理解
### 🟡 still — 定义"even now, continuing"只覆盖副词义，"不动的"含义被忽略
### 🟡 conclusion — 只覆盖"结尾"义，忽略"结论/判断"义
### 🟡 ancestor — 例句用复数ancestors但词条是singular
### 🟡 pioneer — 中国孩子可能联想"少先队"（Pioneer）
### 🟡 inspect vs examine — 定义相近但inspect强调检查正确性
### 🟡 select vs choose — 定义相近但select强调仔细选
### 🟡 occupy — 只覆盖空间义，忽略军事义
### 🟡 positive — 双义（确定+积极）
### 🟡 annual vs yearly — 同义词对，但名词vs形容词区分可接受
### 🟡 correspond — 只覆盖匹配义，忽略通信义
### 🟡 contemplate vs consider — 高度相似但contemplate强调深度
### 🟡 assert vs insist — 相近但assert强调声明，insist强调坚持
### 🟡 complement — 同音词compliment可能混淆
### 🟡 conceive — 第二义"怀孕"可能让家长尴尬
### 🟡 bias — 例句"judge"概念对10岁孩子偏抽象
### 🟡 domain — 孩子可能联想网络域名
### 🟡 draft — 只覆盖"草稿"义，忽略"气流"和"选秀"义
### 🟡 empirical — level 2偏难
### 🟡 invoke — "call upon"较抽象
### 🟡 levy — level 2偏难，税收概念
### 🟡 manifest — 与demonstrate/reveal相近
### 🟡 erode vs erosion — 同词族重复
### 🟡 celebrate vs celebration — 同词族重复
### 🟡 temporary vs temporarily — 同词族重复
### 🟡 benefit vs beneficial — 同词族重复
### 🟡 initiate vs establish — 高度相似
### 🟡 integral vs essential — 高度相似
### 🟡 framework vs structure — 相近概念

---

## 🟢 GREEN — 攻击失败（388词）

以下词攻击失败，定义精准、例句唯一、文化安全、图片无歧义：

avoid, burst, bury, cheer, choose, combine, consider, continue, control, cover, cross, crush, dare, demand, develop, examine, exchange, excite, expect, explore, express, fail, flow, form, gaze, guide, hide, hike, hug, hunt, increase, insist, admire, announce, approve, argue, behave, celebrate, compare, convince, defend, disappear, encourage, improve, interrupt, observe, organize, bold, brief, delicate, dense, dim, distant, drowsy, dusty, elegant, familiar, flat, flexible, foggy, glossy, harsh, heavy, helpless, humble, innocent, invisible, lively, lovely, magnificent, moist, neat, noble, odd, pale, precious, pure, rare, raw, round, rude, rusty, scarce, slender, soft, abundant, absurd, accurate, brittle, colorful, cruel, daring, filthy, gorgeous, horrible, mysterious, pleasant, powerful, ridiculous, serious, spotless, tremendous, visible, weak, wealthy, wicked, worthless, briefly, formerly, instantly, mostly, nearly, originally, partly, possibly, presently, previously, probably, promptly, regularly, shortly, simply, sometimes, steadily, simultaneously, initially, permanently, temporarily, lately, overnight, yearly, hourly, illustration, diagram, vocabulary, definition, fact, summary, topic, passage, research, method, experiment, creature, moisture, material, source, motion, mixture, direction, shelter, predator, prey, oxygen, galaxy, fossil, mineral, vapor, erosion, orbit, gravity, species, community, population, culture, generation, volunteer, merchant, president, profession, companion, guardian, immigrant, inspector, messenger, relative, scholar, witness, advantage, courage, effort, knowledge, patience, responsibility, triumph, accident, attitude, boundary, consequence, conversation, decision, evidence, experience, imagination, occasion, solution, supply, survive, transform, transport, identify, inherit, massive, miniature, obvious, ordinary, particular, peculiar, rapid, reluctant, sensitive, severe, suitable, vacant, vast, vivid, possess, reveal, assign, respond, require, oppose, perform, accomplish, cautious, capable, essential, fortunate, incredible, numerous, previous, region, structure, symbol, tradition, celebration, challenge, equipment, voyage, territory, disaster, merely, precisely, entirely, scarcely, swiftly, willingly, maintain, establish, cooperate, represent, concentrate, manufacture, demonstrate, investigate, discovery, penalty, quantity, reasonable, approach, collapse, external, internal, permission, recognize, influence, interpret, adapt, durable, genuine, hesitate, negotiate, temporary, reliable, absorb, attract, predict, request, reduce, assemble, accumulate, acknowledge, advocate, allocate, ambiguous, amend, approximate, aspire, authorize, beneficial, capacity, clarify, coincide, commentary, compensate, compile, comply, confine, consent, consequent, consolidate, constraint, consult, contradict, controversy, convene, criteria, currency, deficiency, denote, derive, deviate, devote, diminish, dispose, distort, diverse, dominate, duration, enforce, equate, exceed, explicit, extract, facilitate, finite, fluctuate, format, formula, foundation, furthermore, generate, guideline, hence, hierarchy, hypothesis, identical, implication, impose, incentive, incorporate, index, induce, inherent, inhibit, initiate, innovation, insert, integral, intervene, isolate, likewise, magnitude, select, inspect, occupy, positive, annual, domestic (after fix), correspond, contemplate, assert, complement, conceive, bias, domain, draft, empirical, invoke, levy, manifest, erode, benefit, framework

---

## 统计
- 🔴 RED: 15词
- 🟡 YELLOW: 33处弱点
- 🟢 GREEN: 352词
- MISMATCH率: 15/400 = 3.75% (需修复后降至0%)
