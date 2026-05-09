# Word Street 词库审校报告

## CRITICAL & HIGH 问题

### 1. 词条: puppy (Level 1, definition)
- **具体问题**: 定义为 "a baby dog"。虽然简单，但严格来说狗的幼崽叫 puppy。但更关键的问题在于，定义并没有唯一标识。如果后续有其他小动物，"a baby dog" 也能算是一个通用描述。但这里最大的问题是例句中的 "licked my hand"，对于2年级ESL孩子，"licked" 可能超纲。
- **测试用例**: 给孩子句子 "The little puppy wagged its tail and licked my hand." 问他 licked 是什么意思。
- **外部证据**: Oxford Learner's Dictionary: "a young dog". (lick 属于更高阶词汇)
- **建议修订文本**: 例句改为: "The little puppy wagged its tail and played with me."

### 2. 词条: caterpillar (Level 1, definition)
- **具体问题**: 定义为 "a worm-like insect that later becomes a butterfly or moth"。这里 "worm-like", "insect", "moth" 对二年级ESL孩子来说都比较难，尤其是 "moth" (飞蛾) 可能不认识，导致定义比目标词还难。
- **测试用例**: 让孩子读定义，问他 moth 是什么，worm-like 是什么意思。
- **外部证据**: Merriam-Webster Kids: "a small creature like a worm with many legs that turns into a butterfly or moth." 建议简化。
- **建议修订文本**: 定义改为: "a small animal like a worm that turns into a butterfly."

### 3. 词条: spider (Level 1, definition)
- **具体问题**: 定义为 "a small animal with eight legs that makes webs"。蜘蛛不是 "animal" 而是 arachnid，但对于小孩可以说 small creature/bug。用 "animal" 可能会误导认知。
- **测试用例**: 问孩子蜘蛛是不是动物(animal)。
- **外部证据**: Cambridge Dictionary: "a small creature with eight legs..." 
- **建议修订文本**: 定义改为: "a small bug with eight legs that makes webs."

### 4. 词条: skeleton (Level 2 假设存在，或类似解剖学词汇如 skull)
- **具体问题**: 词条 "skull" (Level 1) 的定义为 "the bone that covers your brain"。涵盖大脑的骨头，"covers" 在这里可能不太准确，通常说 "protects" 或 "holds"。例句 "Helmets protect your skull if you fall." 中 "Helmets" 对2年级ESL可能也是生词。
- **测试用例**: 让孩子读例句，问 Helmets 是什么。
- **外部证据**: Oxford: "the bone structure that forms the head and surrounds and protects the brain."
- **建议修订文本**: 例句改为: "A hard hat protects your skull if you fall."

### 5. 词条: feast (Level 1, definition)
- **具体问题**: 定义为 "a very big special meal"。比较含糊，可能和 "banquet" 等词混淆。"special" 这个词比较主观。
- **测试用例**: 问孩子吃很多披萨算不算 feast。
- **外部证据**: Merriam-Webster: "a large and special meal."
- **建议修订文本**: 定义改为: "a very big meal for a special day."

## 建议固化项

- 🔧 [proofcheck规则] 添加规则检查定义中是否包含超过目标词等级的复杂词汇（如 moth, worm-like）。可以通过建立每个Level的允许词表来实现。
- 🔧 [搭配规则] 添加规则检查例句中的动词搭配是否过于生僻（如 licked my hand 可在低级被拦截）。
- 🔧 [禁词] 建议将 "moth", "worm-like" 等明显超出Level 1 ESL孩子认知的词加入BANNED_WORDS (对于低级别定义)。
- 🔧 [白名单] 无新建议。
- 🔧 [新工具] 创建一个脚本，提取所有定义和例句中的单词，与常见的二年级ESL词表（如Dolch/Fry前几百词）进行对比，标记出超纲词汇供人工审查。
- 🔧 [标准更新] 在 QA-STANDARD.md 中明确："定义和例句中使用的所有单词，其难度必须低于或等于目标单词所在的等级。"
