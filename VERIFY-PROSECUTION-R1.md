# VERIFY-PROSECUTION-R1（Round 1 / 控方）

审查范围：
- L1：`words-level1.js` 前200词
- L2：`words-level2.js` 前200词

标准：每条 finding 都包含 **可证伪性4要素**（词条+字段 / 具体误导 / 测试用例 / 外部证据）。

---

## Findings

### 1) [CRITICAL] caterpillar（L1）definition：把“caterpillar”说成一定会变成 butterfly（排除了 moth）
1) **具体词条 & 字段**：`caterpillar` / `definition`
   - 现有定义："a small animal with many legs that turns into a butterfly"
2) **具体问题（会导致的误解）**：
   - 该定义将 *caterpillar*（毛毛虫/鳞翅目幼虫）**限定为“会变成蝴蝶”**。
   - 这会让学生在自然科学/阅读理解场景中，把“毛毛虫→蛾 (moth)”判为不可能，从而答错。
3) **测试用例（可证伪）**：
   - 给学生只看该定义，问：
     - Q："A caterpillar can turn into a moth." True/False?
     - 若学生答 **False**（因为“定义只说变成 butterfly”），就证明该定义造成系统性误导。
4) **外部证据**：
   - Merriam-Webster 明确指出：caterpillar 是 **butterfly or moth** 的幼虫：
     - “the elongated wormlike larva of a **butterfly or moth**”
     - https://www.merriam-webster.com/dictionary/caterpillar

---

### 2) [CRITICAL] pepper（L1）definition+imageKeyword：把“pepper”定义成 bell pepper（蔬菜），但单词本身更常指香料/胡椒（强歧义未标注）
1) **具体词条 & 字段**：`pepper` / `definition`（以及 `imageKeyword`）
   - 现有定义："a crunchy vegetable that can be red, green, or yellow and is hollow inside"
   - 现有 imageKeyword："bell pepper"
2) **具体问题（会导致的误解）**：
   - 英语里 *pepper* 常用义之一是 **胡椒粉/胡椒粒（spice）**；同时也可指 **辣椒/彩椒（capsicum）**。
   - 该词条把 *pepper* **直接等同于 bell pepper（彩椒）**，却没有任何歧义提示（例如 “bell pepper (vegetable)” / “pepper (spice)”）。
   - 结果：学生在餐桌场景（"Pass the pepper"）会把 *pepper* 误解成“彩椒蔬菜”，从而答错。
3) **测试用例（可证伪）**：
   - 给学生只看该定义，问：
     - Q："At dinner, Dad says: 'Pass the pepper.' What does he want?"
     - 若学生回答 **a red/yellow/green vegetable**（而不是“黑胡椒/胡椒粉调味料”），就证明该定义导致误解。
4) **外部证据**：
   - Merriam-Webster 把 pepper 首义写为香料，并另列 capsicum（辣椒/彩椒）相关义项：
     - “either of two pungent **spices** …”
     - 另有 “capsicum … hot peppers or sweet peppers”
     - https://www.merriam-webster.com/dictionary/pepper

---

### 3) [HIGH] muffin（L1）definition：把 muffin 说成 cake（分类错误，会让孩子在食物分类题里答错）
1) **具体词条 & 字段**：`muffin` / `definition`
   - 现有定义："a small soft cake"
2) **具体问题（会导致的误解）**：
   - *muffin* 的核心概念是 **quick bread / 用烤盘杯模烤的面糊快手面包**，不等同于 *cake*。
   - 该定义会让学生在“muffin 属于 bread 还是 cake”的分类题里，机械选 **cake**。
3) **测试用例（可证伪）**：
   - 给学生只看该定义，问：
     - Q："Which one is closer to a muffin: bread or cake?"
     - 若学生答 **cake**（因为定义直接写 cake），就证明定义造成分类误导。
4) **外部证据**：
   - Merriam-Webster 对 muffin 的定义是 quick bread：
     - “a **quick bread** made of batter … baked in a pan having cuplike molds”
     - https://www.merriam-webster.com/dictionary/muffin

---

### 4) [HIGH] battery（L1）definition：把 battery 说成“给玩具供电的东西”（范围过窄，且会误导到“只有玩具才用 battery”）
1) **具体词条 & 字段**：`battery` / `definition`
   - 现有定义："the thing that gives power to a toy"
2) **具体问题（会导致的误解）**：
   - *battery* 作为常用义是 **电池/电芯（提供电流的装置）**，广泛用于手电筒、遥控器、手机、车等。
   - 该定义将 battery 绑定为“玩具专用”，会让学生在 "phone battery"、"car battery"、"flashlight batteries" 等常见搭配里产生错误迁移（以为不叫 battery）。
3) **测试用例（可证伪）**：
   - 给学生只看该定义，问：
     - Q："What does 'phone battery' mean?" 
     - 若学生回答 **'a toy power thing' / 或表示困惑**，就证明定义过窄导致迁移失败。
4) **外部证据**：
   - Merriam-Webster 将 battery（电学义）定义为电芯/电池组：
     - “a group of two or more cells … to furnish electric current; also: a single cell that furnishes electric current”
     - https://www.merriam-webster.com/dictionary/battery

---

### 5) [HIGH] beam（L2）definition：只给“光束”义项，忽略了更基础/高频的“梁（木梁/钢梁）”义项
1) **具体词条 & 字段**：`beam` / `definition`
   - 现有定义："a line of light"
2) **具体问题（会导致的误解）**：
   - *beam* 的核心常见名词义之一是 **建筑/结构中的梁（long piece of heavy timber / steel beam）**。
   - 该词条只教“光束”，会让学生在建筑/工程/故事阅读里看到 "a steel beam"、"ceiling beam" 时，误解为“手电筒光线”。
3) **测试用例（可证伪）**：
   - 给学生只看该定义，问：
     - Q："Builders lifted a beam into place." What is the beam?
     - 若学生回答 **flashlight light** 或类似，就证明定义缺失常用义项导致误解。
4) **外部证据**：
   - Merriam-Webster 同时列出“梁”和“光束”两大义项：
     - “a long piece of heavy … timber suitable for use in construction”
     - “a ray or shaft of light”
     - https://www.merriam-webster.com/dictionary/beam

---

### 6) [HIGH] state（L2）definition：只给“国家的一个部分”义项，忽略超高频的“状态/情况（condition）”义项
1) **具体词条 & 字段**：`state` / `definition`
   - 现有定义："a part of a country"
2) **具体问题（会导致的误解）**：
   - 在小学英语/科学/阅读里，*state* 更高频的核心义项之一是 **状态/情况（a state of … / in a … state）**，例如 "state of matter"、"in a state of shock"。
   - 该词条只教“州/国家的一部分”，会让学生在科学文本里把 "state" 误解成地理“州”，从而答错。
3) **测试用例（可证伪）**：
   - 给学生只看该定义，问：
     - Q："Water can be in a solid state." What does state mean here?
     - 若学生回答 **a part of a country / a place like Texas**，就证明定义缺失导致误解。
4) **外部证据**：
   - Merriam-Webster 将 state 首义列为“mode or condition of being（状态）”，并另列“one of the constituent units …（州）”：
     - “mode or condition of being”
     - “one of the constituent units of a nation having a federal government”
     - https://www.merriam-webster.com/dictionary/state

---

### 7) [MEDIUM] jelly（L1）definition：未标注 BrE/AmE 差异；在英式英语里 jelly 首义常指“果冻甜品”（不是抹面包的果酱）
1) **具体词条 & 字段**：`jelly` / `definition`
   - 现有定义："a soft sweet spread for bread"
2) **具体问题（会导致的误解）**：
   - 在 **British English** 中，*jelly* 常指“用 gelatin 做的摇晃甜品”（相当于 AmE 的 jello）。
   - 该词条没有任何方言标注，学生在英式教材/考试里看到 "jelly" 可能被迫选“果酱抹面包”，从而答错。
3) **测试用例（可证伪）**：
   - 给学生只看该定义，问：
     - Q："In British English, if someone says 'We had jelly for dessert', what food is it?"
     - 若学生回答 **fruit spread on bread**，就证明缺乏 BrE/AmE 标注会导致系统性误解。
4) **外部证据**：
   - Oxford Learner’s Dictionaries 明确标注：BrE 的 jelly 是 gelatin 甜品，并另外列出“果酱（无果肉的 jam）”义项：
     - “(British English) … a cold sweet transparent food, made from gelatin … that shakes …"
     - 另有：“a type of jam that does not contain any pieces of fruit”
     - https://www.oxfordlearnersdictionaries.com/definition/english/jelly?q=jelly

---

## 建议固化项
（建议加入 `proofcheck.mjs` 的自动规则，用于拦截这类“会让学生考试答错”的问题。）

1) **禁止“生物学绝对化”模板**
   - 规则：当 definition 使用“turns into a X”这类单一路径表述时，若该词在权威词典里是多分支（如 caterpillar → butterfly **or** moth），则必须包含并列项或改成更一般的描述（"larva of …"）。

2) **检测“词条=更具体子类”的暗示（hyponym leak）**
   - 规则：如果 `word` 是泛化词（pepper），但 `definition` / `imageKeyword` 明确落到子类（bell pepper），则要求：
     - 要么把 `word` 改成更具体（"bell pepper"），
     - 要么在 definition 中显式写“one meaning is … (vegetable)”并补充 spice 义项。

3) **检测“高歧义词只给单义且未标注领域”的风险**
   - 规则：对常见多义高频词（如 beam/state/jelly）若只给一个义项，必须：
     - 在 `definition` 标注领域（"in stories"/"in science"/"in buildings"/"BrE"/"AmE"），或
     - 给出至少两个高频义项（用分号/编号）。

4) **食物类定义的“错误上位类”检查（muffin≠cake）**
   - 规则：当 definition 使用明显上位类（cake/bread/fruit/vegetable）时，若与权威词典的基本分类冲突（muffin 属于 quick bread），则标红并要求人工复核。

5) **过窄定义（toy-only / kid-only）提醒**
   - 规则：若 definition 用“for a toy / for kids”这类强绑定场景描述一个通用名词（battery），提示“范围过窄”，建议改为通用功能定义（"a thing that gives electricity/power to a device"）。
