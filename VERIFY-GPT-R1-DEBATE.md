# GPT 正方审校报告 - Round 1 (2026-05-09)

## 发现的问题

### [CRITICAL] 词条: "pepper" - 字段: definition
**问题:** 该定义把 *pepper* 只解释成 “彩椒/甜椒（bell pepper）”，会导致学生把 **salt and pepper** 里的 *pepper* 误解成“红绿黄的空心蔬菜”。在真实阅读/考试中，*pepper* 最常见的高频义项之一是“胡椒粉/胡椒（调味料）”。

**测试用例:** 给学生看当前定义 “a crunchy vegetable that can be red, green, or yellow and is hollow inside”。问：
- “In ‘Please pass the pepper’, pepper 是红黄绿的蔬菜吗？”
如果学生回答 “Yes（是彩椒）”，则证明该定义会把调味料义项误导成蔬菜义项。

**外部证据:** Oxford Learner’s Dictionaries（pepper）：
- “**a powder made from dried berries (called peppercorns), used to give a hot, spicy taste to food**”
- 另有蔬菜义项：“(also sweet pepper … bell pepper) **a hollow fruit, usually red, green or yellow, eaten as a vegetable**”
来源：https://www.oxfordlearnersdictionaries.com/definition/english/pepper_1

**建议修复:**
- 若目标是蔬菜：把 headword 改为 **bell pepper** 或 **sweet pepper**，并在 definition 里出现 “bell pepper”。
- 若保留 headword=pepper：definition 改成双义项且显式区分（spice vs vegetable），并给两个例句分别覆盖。

---

### [HIGH] 词条: "lace" - 字段: definition / imageKeyword
**问题:** 当前把 *lace* 只讲成“鞋带”，会导致学生在常见搭配（lace dress / lace curtains / lace gloves）里把 *lace* 误解成“鞋带材料/鞋带”，从而做题错误。对 L1/低龄 ESL 来说，*lace* 更常见、更“可考”的义项往往是“蕾丝（带孔花纹布料）”。另外 imageKeyword="shoe lace" 会进一步固化“鞋带”单一义项。

**测试用例:** 给学生看当前定义 “the string you tie on a shoe”。问：
- “In ‘She wore a lace dress’, lace 是鞋带吗？”
如果学生回答 “Yes（是鞋带）”，则证明该定义会把句子里的“蕾丝”误导为“鞋带”。

**外部证据:** Oxford Learner’s Dictionaries（lace）：
- “[uncountable] **a very thin material … made into a pattern with holes** (… lace curtains)”
- 鞋带义项在 Oxford 中是另外一条并明确标注：“(also **shoelace**) … used to fasten it”
来源：https://www.oxfordlearnersdictionaries.com/definition/english/lace_1

**建议修复:**
- 方案 A（更清晰）：把“鞋带”单独做成 **shoelace** 词条；lace 主义项用 “thin patterned material (lace)”（蕾丝），并可在次义项补充 “laces (on shoes)”。
- 方案 B：保留双义项，但在 definition 中显式写出 “lace (material)” vs “laces (on shoes)”。
- imageKeyword 按义项拆分：material → "lace fabric"；鞋带 → "shoelaces"。

---

### [HIGH] 词条: "vest" - 字段: definition
**问题:** 当前定义 “a jacket with no sleeves” 不仅用词不准（vest 不等于 jacket），还忽略了英美差异：在 British English 里 *vest* 常指“贴身背心/内衣（undershirt）”，而 North American English 里才常指“马甲/背心（waistcoat 类）”。会导致学生在英式语境里把 *vest* 误解成外套。

**测试用例:** 给学生看当前定义 “a jacket with no sleeves”。问：
- “In British English sentence ‘He was standing there in his vest’, 这里的 vest 是外面的无袖夹克吗？”
如果学生回答 “Yes”，则证明该定义在英式语境中会造成系统性误解。

**外部证据:** Oxford Learner’s Dictionaries（vest）：
- “(British English) … **a piece of underwear worn under a shirt** …”
- “(North American English) … (British English waistcoat) **a short piece of clothing … usually worn over a shirt and under a jacket** …”
来源：https://www.oxfordlearnersdictionaries.com/definition/english/vest_1

**建议修复:**
- 若面向国际/中国教材：在 definition 里显式标注 BrE vs AmE。
- 或拆词条：BrE 用 **vest (undershirt)**；外穿用 **waistcoat** / **vest (AmE)**。

---

### [MEDIUM] 词条: "jelly" - 字段: definition
**问题:** 当前定义只覆盖“抹面包的果酱（jelly=jam without fruit pieces）”这一义项，会导致学生在英式常见义项（果冻甜品）里误解。例如 UK 语境 “jelly and ice cream” 指果冻甜品而不是面包抹酱。

**测试用例:** 给学生看当前定义 “a soft sweet spread for bread”。问：
- “In ‘We had jelly and ice cream’, jelly 是抹在面包上的果酱吗？”
如果学生回答 “Yes”，则证明该定义会把常见英式义项误导为面包抹酱。

**外部证据:** Oxford Learner’s Dictionaries（jelly）：
- “(British English) … **a cold sweet transparent food, made from gelatin, sugar and fruit juice, that shakes when it is moved**”
- 另有果酱义项：“**a type of jam that does not contain any pieces of fruit**”
来源：https://www.oxfordlearnersdictionaries.com/definition/english/jelly_1

**建议修复:**
- 在 definition 中加入地域标签：BrE=果冻甜品；另列“jelly (US)=fruit spread”。
- 或根据目标教材选择单一义项，但要把 headword 改成更不歧义的：例如 **jello/jell-o**（美式果冻）或 **fruit jelly**（果酱）。

---

### [MEDIUM] 词条: "caterpillar" - 字段: definition
**问题:** 当前定义说 “turns into a butterfly”，忽略了很多 caterpillar 最终会变成 **moth（飞蛾）**。这会让学生形成错误的“所有毛毛虫都会变成蝴蝶”的事实性认知，在科学类阅读/题目中出错。

**测试用例:** 给学生看当前定义 “a small animal with many legs that turns into a butterfly”。问：
- “All caterpillars become butterflies. True or false?”
如果学生回答 “True”，则证明该定义导致事实错误。

**外部证据:** Oxford Learner’s Dictionaries（caterpillar）：
- “a small creature … that **develops into a butterfly or moth**”
来源：https://www.oxfordlearnersdictionaries.com/definition/english/caterpillar

**建议修复:** definition 改为 “develops into a butterfly **or moth**”，并可加一个更儿童友好的括注：moth=像蝴蝶的夜间昆虫。

## 建议固化项

1. **高歧义词（多义且都常见）必须显式标注义项或替换为更不歧义 headword**
   - 例：pepper（spice vs bell pepper）、jelly（BrE dessert vs fruit spread）、vest（BrE underwear vs AmE waistcoat）。

2. **当词条只覆盖次义项时，必须在 definition 里写出“这是哪一种”**
   - 例：lace（material vs shoelace）。

3. **事实类定义避免绝对化（all/always/only）**
   - 例：caterpillar “turns into a butterfly” → “butterfly or moth”。

4. **imageKeyword 必须与定义义项一致；若词有多义项，建议按 sense 拆 imageKeyword**
   - 例：lace："lace fabric" vs "shoelaces"。
