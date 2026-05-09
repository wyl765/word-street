### [严重] beneath — def
- **问题**: 定义中包含悬空代词 "it" ("right below it")，这会导致语法结构混乱。学生会误以为 "it" 是词义的一部分，从而造出 "The cat is beneath it the bed." 这种病句。
- **测试**: 让学生根据定义把 "beneath" 替换到句子中。如果他把 "beneath the bed" 理解为 "right below it the bed"，就证明定义有误。
- **证据**: Merriam-Webster Learner's Dictionary 对 beneath 的定义是 "in or to a lower position : BELOW"，绝不会在核心定义中夹带悬空宾语代词。
- **建议**: 修改为 "in a lower place than; below"。

### [严重] make up — ex
- **问题**: 例句时态不自然 ("We make up a funny story about a talking shoe.")。作为孤立例句，一般现在时通常表示习惯性动作（需配合 every day 等时间状语）。对于描述单一事件，使用一般过去时 ("made up") 或现在进行时 ("are making up") 才符合母语者习惯。
- **测试**: 把例句给母语者看，问他们是否觉得缺少了表示习惯的时间状语，或者是否感觉时态错误。
- **证据**: Cambridge Dictionary 关于 "make up (invent)" 的例句："I made up an excuse about having to look after the kids." (使用过去时描述具体事件)。
- **建议**: 修改为 "We made up a funny story about a talking shoe."

### [中度] skunk — def
- **问题**: 事实性误导 ("a black and white animal that smells bad")。臭鼬并不是自身永远发臭，而是遇到威胁时会**喷射**臭液。这样定义会让学生误解臭鼬的生物特性，认为它像垃圾一样持续散发恶臭。
- **测试**: 问学生："根据定义，如果一只臭鼬在睡觉且没有受到惊吓，它臭吗？" 如果学生回答"臭"，说明定义存在事实性误导。
- **证据**: Britannica Kids 对 skunk 的定义是 "a small black-and-white animal that defends itself by spraying a bad-smelling liquid."
- **建议**: 修改为 "a black and white animal that can spray a bad-smelling liquid."

### [中度] waffle — def
- **问题**: 几何特征描述错误 ("a breakfast food with little squares on it")。"on it" 意味着方块是放在表面的附加物（类似于披萨上的意大利香肠）。华夫饼的特征是表面有凹陷的网格（indentations/pockets）。
- **测试**: 给学生画一个表面放着几块方形饼干的煎饼，问学生："根据定义，这是waffle吗？" 学生会回答"是"。
- **证据**: Oxford Learner's Dictionaries 对 waffle 的定义是 "a crisp pancake with a pattern of deep squares in it"。重点在于 "in it"（内凹）而不是 "on it"。
- **建议**: 修改为 "a breakfast food with a pattern of deep squares in it"。

### [严重] least — def/ex mismatch
- **问题**: 定义（名词/代词词性）与例句（副词词性）不匹配。定义是 "the smallest amount"（最小的量），但例句是 "Pick the least messy paint..."（最不脏的）。学生如果把定义代入例句，会得出 "Pick the smallest amount messy paint..." 这种完全不通的逻辑。
- **测试**: 让学生用定义替换例句中的 least。如果生成的句子语法崩溃且语义不通，证明该定义无法支撑该例句。
- **证据**: Oxford Learner's Dictionary 明确区分了 least 的代词含义 ("smallest in amount") 和副词含义 ("to the smallest degree")。本例句使用的是副词含义。
- **建议**: 如果保留当前例句，应将定义修改为 "less than all others"；或者保留当前定义，将例句改为 "He has the least money."

## 建议固化项
- **悬空代词检测**: 在 `proofcheck.mjs` 中添加规则，禁止 `def` 字段以代词（如 "it", "someone", "something" 等）作为悬空结尾。
- **词性与例句一致性验证**: 添加 NLP 检测，分析 `def` 的核心词性与 `ex` 中目标词的依存句法关系是否一致（例如名代词定义不能用于副词用法的例句）。
- **孤立例句时态检查**: 针对动词短语（如 make up, stomp, sweep 等），如果例句使用的是一般现在时，检查是否包含表频率或习惯的状语（如 usually, always, every day）；若无，应标记提示人工审查是否应改为过去时或进行时。
