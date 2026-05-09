# VERIFY R1 — GPT审查报告（prosecution mode）

目标用户：10岁中国ESL男孩（MAP 197 ~ G2）

> 说明：以下每条都给出可证伪的误导路径（学生会在什么场景下答错）、可复现实验（测试用例）、以及外部词典证据（Merriam‑Webster）。

---

### Finding [1]: pepper — [severity: CRITICAL]
- **字段:** definition / imageKeyword
- **问题:** 词条把 **pepper** 定义成“红/绿/黄、空心的脆蔬菜”，这实际上是在讲 **bell pepper**（甜椒/彩椒）。对ESL孩子会造成**系统性误解**：看到“pepper”会以为一定是蔬菜，从而在考试里把 **salt and pepper**（盐和胡椒粉）或 “black pepper” 题目做错。
- **测试用例:** 给学生看该定义后问：
  1) “Pepper on the table is a ___ (spice/vegetable)?” 如果他答 **vegetable**，说明定义导致错误；
  2) 给两张图（胡椒粉/彩椒）问“Which is pepper?” 如果他只选彩椒，说明被误导。
- **外部证据:** Merriam‑Webster 对 *pepper* 的首要义项是香料："either of two pungent spices ... (Piper nigrum)"（黑/白胡椒等），并非特指彩椒。https://www.merriam-webster.com/dictionary/pepper

### Finding [2]: mitten — [severity: HIGH]
- **字段:** definition
- **问题:** 词条写“a warm cover for your hand **with no fingers**”。这会让孩子以为 mitten 像“袋子”一样**完全没有拇指分隔**，从而把 **mitten** 和 **glove** 的区别学反。
- **测试用例:** 给学生看定义后问：“Does a mitten have a place for the thumb?” 如果他答 **no**，就是定义造成的错误。
- **外部证据:** Merriam‑Webster："a covering for the hand and wrist having a **separate section for the thumb only**"（只有拇指单独一格）。https://www.merriam-webster.com/dictionary/mitten

### Finding [3]: caterpillar — [severity: HIGH]
- **字段:** definition
- **问题:** 定义写“turns into a **butterfly**”。这是**事实性错误/以偏概全**：很多 caterpillar 会变成 **moth（飞蛾）**，不是 butterfly。孩子会在“butterfly or moth”类选择题里答错。
- **测试用例:** 给学生看定义后问：“Can a caterpillar become a moth?” 如果他答 **no**，证明定义会导致错误。
- **外部证据:** Merriam‑Webster："the elongated wormlike larva of a **butterfly or moth**"。https://www.merriam-webster.com/dictionary/caterpillar

### Finding [4]: hoodie — [severity: MAJOR]
- **字段:** definition
- **问题:** 定义写“a **shirt** with a hood on the back”。hoodie 通常指 **hooded sweatshirt（连帽卫衣）**，不是泛指 shirt；而且“hood on the back”措辞会让孩子以为帽子固定在背后，不是用来罩头的。
- **测试用例:** 给学生看定义后问：
  1) “Is a hoodie a sweatshirt or a shirt?” 若答 **shirt**，被误导；
  2) “Can you pull the hood over your head?” 若答 **no**，被误导。
- **外部证据:** Merriam‑Webster：hoodie = "a **hooded sweatshirt**"。https://www.merriam-webster.com/dictionary/hoodie

### Finding [5]: cracker — [severity: MAJOR]
- **字段:** definition
- **问题:** 定义“thin dry food that crunches”过于宽泛，会把 **chips、toast、dry cookie** 都误归为 cracker。对ESL孩子会造成词义边界错误：题目问“Which one is a cracker?”时，他可能选薯片或烤面包。
- **测试用例:** 给学生看定义后给三张图（saltine cracker / potato chips / toast）问“Which is a cracker?” 如果他选 chips/toast，说明定义导致误判。
- **外部证据:** Merriam‑Webster 的食物义项："a **dry thin crispy baked bread product**"，强调 baked bread product（烘焙的薄脆面包制品）。https://www.merriam-webster.com/dictionary/cracker

### Finding [6]: jelly — [severity: MAJOR]
- **字段:** definition
- **问题:** 定义写成“a soft sweet spread for bread”。这会让孩子把任何“甜的抹酱”（如 chocolate spread / frosting）都当作 jelly；同时忽略 jelly 的关键特征（由果汁+糖煮成/或 gelatin/pectin 凝成）。在“jelly is made from …”或“Which food is jelly?”类题型会答错。
- **测试用例:** 给学生看定义后问：“Is Nutella jelly?” 如果他答 **yes**，说明定义把 jelly 泛化成“任何甜抹酱”。
- **外部证据:** Merriam‑Webster：jelly 是 "a soft somewhat elastic food product made usually with **gelatin or pectin**; especially: a fruit product made by boiling **sugar and the juice of fruit**"。https://www.merriam-webster.com/dictionary/jelly

### Finding [7]: ladybug — [severity: MAJOR]
- **字段:** definition
- **问题:** 定义写“a small **red bug** with black spots”。两个问题会误导：
  1) ladybug 不是“bug（半翅目真虫）”的泛称，而是 **beetle（甲虫）**；
  2) 颜色不一定是红色（存在橙色、黄色、黑色等），孩子会把非红色瓢虫判为“not a ladybug”。
- **测试用例:** 给学生看定义后给两张图（红色瓢虫/黄色或黑色瓢虫）问“Which is a ladybug?” 若他只选红色那只，说明被误导。
- **外部证据:** Merriam‑Webster："often brightly colored often spotted **beetles (family Coccinellidae)**"（强调是 beetle，且颜色多样）。https://www.merriam-webster.com/dictionary/ladybug

### Finding [8]: lizard — [severity: MAJOR]
- **字段:** definition
- **问题:** 定义写“like a snake but with **four legs**”。这会让孩子形成“蜥蜴=一定四条腿”的错误概念；现实中存在 **limbless lizards**（无肢蜥蜴/掘穴型肢体退化）。如果题目出现“some lizards have no legs”判断题，孩子会被带偏。
- **测试用例:** 给学生看定义后问：“Can a lizard have no legs?” 若答 **no**，说明定义导致错误。
- **外部证据:** Merriam‑Webster 在定义中明确：lizards 的 limbs "may be **lacking in burrowing forms**"（某些掘穴型可能没有肢体）。https://www.merriam-webster.com/dictionary/lizard

### Finding [9]: zipper — [severity: MAJOR]
- **字段:** definition
- **问题:** 定义写“something that opens and closes your **jacket**”。这会把 zipper 误学成“夹克专用”，导致孩子在 “zipper on a backpack/suitcase” 场景下不敢用 zipper 这个词。
- **测试用例:** 给学生看定义后问：“Does a suitcase have a zipper?” 若答 **no**，说明被误导。
- **外部证据:** Merriam‑Webster：zipper 是一种结构性定义："a **fastener** consisting of two rows of ... teeth ... and a sliding piece"，并不限定在 jacket。https://www.merriam-webster.com/dictionary/zipper

### Finding [10]: muffin — [severity: MAJOR]
- **字段:** definition
- **问题:** 定义写“a small soft **cake**”。这会让孩子把 muffin 和 cupcake 混为一谈；在“Which one is a muffin?”（muffin vs cupcake）题里可能因为“cake with frosting”也符合“cake”而误选。
- **测试用例:** 给学生看定义后给两张图（plain blueberry muffin / frosted cupcake）问“Which is a muffin?” 若他选 cupcake，说明定义导致混淆。
- **外部证据:** Merriam‑Webster：muffin = "a **quick bread** made of batter ... baked in a pan having cuplike molds"（强调 quick bread）。https://www.merriam-webster.com/dictionary/muffin

---

## 建议固化项
把下面这些“可自动检测”的问题类型加入自动化检测工具（lint/QA）：

1) **超窄义项冒充全义项**：如 *pepper* 实际写成 *bell pepper*（可用规则：definition/example/imageKeyword 是否强烈指向某一子义但 headword 未标注限定词）。
2) **绝对化措辞导致事实错误**：出现 "always/only/no" 或“唯一结果”（如 caterpillar → butterfly only；mitten → no fingers）。
3) **上位词过宽导致类别漂移**：cracker 被写成“任何会脆的薄食物”；应检测是否缺少关键区别特征（例如 baked bread product）。
4) **物种/类别术语错误**：ladybug 写成 bug 而非 beetle；建议建立小型知识表（常见动物/昆虫的正确上位类别）。
5) **定义过度绑定单一典型场景/物品**：zipper 绑定 jacket；应检测 definition 是否包含不必要的单一物品限定。
6) **衣物类名词的基本类型误标**：hoodie 被写成 shirt；可用小词表校验（hoodie≈sweatshirt）。

