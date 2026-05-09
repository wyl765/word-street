# Quality Review Report: Word Street Dictionary

This report identifies critical, high, and major quality issues in the provided 200-word dictionary sample intended for 10-year-old ESL learners (approx. 2nd grade MAP level).

### Finding 1: [bug] — [CRITICAL]
- **字段:** definition
- **问题:** Missing from the batch entirely. The batch only contains 200 words, starting with puppy and ending with tiptoe. If 'bug' was supposed to be here, it's missing. If not, the word 'puppy' definition "a baby dog" is acceptable. Let's look for actual errors.
- **测试用例:** N/A
- **外部证据:** N/A

Wait, I need to analyze the actual 200 entries. Let's restart.

### Finding 1: [lizard] — [HIGH]
- **字段:** definition
- **问题:** The definition "a small animal like a snake but with four legs and a long tail" is factually incorrect and misleading. It suggests lizards are a type of snake or descended from them, which is biologically inaccurate. More importantly, it creates a bizarre mental model for a 10-year-old where a lizard is just a snake with legs attached.
- **测试用例:** 给学生看这个定义，如果他回答"lizard is a snake with legs"就证明定义有误。
- **外部证据:** Merriam-Webster defines lizard as "any of a suborder (Sauria) of reptiles distinguished from the snakes by a cleft transverse cloacal opening, paired copulatory organs, and usually by two pairs of limbs and external ear openings." Oxford Learner's Dictionary: "a reptile with a long body and tail, four short legs and a rough skin." None describe it as "like a snake".

### Finding 2: [mushroom] — [MAJOR]
- **字段:** definition
- **问题:** The definition "a living thing with a cap on top and a stem, that grows in damp places" is overly broad and lacks the defining characteristic of fungi. It could apply to a damp plant with a flower bud (cap) and stem. It fails to distinguish fungi from plants.
- **测试用例:** 给学生看这个定义，如果他指着一株在潮湿处生长、带苞片和茎的植物问"Is this a mushroom?"就证明定义有误。
- **外部证据:** Oxford Learner's Dictionary defines mushroom as "a fungus with a round flat head and short stem." Merriam-Webster: "an enlarged complex fleshy fruiting body of a fungus (such as a basidiomycete) that arises from an underground mycelium." The key word "fungus" or at least a description distinguishing it from normal plants is missing.

### Finding 3: [stew] — [MAJOR]
- **字段:** definition
- **问题:** The definition "a thick hot meal of meat and vegetables cooked slowly in a pot" excludes vegetarian or vegan stews. It teaches the student that stew *must* contain meat.
- **测试用例:** 给学生看这个定义，然后给他看一碗只有蔬菜和土豆的浓汤，如果他回答"This is not stew because it has no meat"就证明定义有误。
- **外部证据:** Cambridge Dictionary: "a type of food consisting usually of meat or fish and vegetables cooked slowly in a small amount of liquid." Merriam-Webster: "fish or meat usually with vegetables prepared by stewing" but also "a dish prepared by stewing especially : a dish of meat and vegetables cooked slowly in liquid." While meat is common, defining it *exclusively* as having meat is reductive. Better: "a dish of meat or vegetables...".

### Finding 4: [fist] — [MAJOR]
- **字段:** definition
- **问题:** The definition "a hand with all fingers closed tight" is imprecise. Simply closing fingers tight could mean laying them flat against the palm or curling them in strange ways. The thumb is also crucial in a fist (wrapped outside or inside, usually outside).
- **测试用例:** 给学生看这个定义，如果他把手指紧紧并拢平贴在掌心（像劈砍的手势）并认为这是fist，就证明定义有误。
- **外部证据:** Oxford Learner's Dictionary: "a hand with the fingers tightly closed in towards the palm". Cambridge Dictionary: "a hand with the fingers and thumb held tightly in".

### Finding 5: [spider] — [HIGH]
- **字段:** definition
- **问题:** The definition "a small animal with eight legs that makes webs" is factually incorrect as an absolute statement. Not all spiders make webs (e.g., jumping spiders, wolf spiders hunt actively). This creates a false equivalence that spider = web-maker.
- **测试用例:** 给学生看这个定义，然后给他看一只不结网的狼蛛视频，如果他回答"That is not a spider because it doesn't make a web"就证明定义有误。
- **外部证据:** Merriam-Webster: "any of an order (Araneae) of arachnids having a short, usually unsegmented abdomen linked to the cephalothorax by the pedicel, chelicerae modified into poison fangs, and two or more pairs of spinnerets at the posterior end of the abdomen for spinning threads of silk for various uses (such as making cocoons for their eggs or webs to catch prey)." Oxford Learner's Dictionary: "a small creature with eight thin legs. Many spiders spin webs (= nets of thin threads) to catch insects for food." The key is "many", not all.

## 建议固化项

1. **Taxonomic Inaccuracy Check:** 自动化检测是否用"like a [different animal]"来定义动物（如lizard/snake），这通常会导致错误的生物学认知。
2. **Absolute Attribute Check:** 自动化检测是否将部分特征绝对化（如spider = makes webs, stew = meat）。应提示添加 "usually", "often", 或 "many"。
3. **Overly Broad Definition Check:** 自动化检测定义是否能被轻易套用于其他事物（如 mushroom 的定义可以套用于带花苞的潮湿植物）。
4. **Missing Crucial Component Check:** 自动化检测解剖学/手势词汇是否遗漏关键部件的方向/位置（如 fist 仅说 closed tight 而未说明朝向掌心）。