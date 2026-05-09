# OUP 法务审查报告：L1+L2 词库质量审查 (Batch 1)

**审查目标：** 寻找并记录 `debate-batch-1.json` 词库中可起诉的质量问题。
**目标用户：** 10岁中国ESL男孩，英语阅读MAP 197（约2年级）
**审查基准：** Oxford Learner's Dictionary 级别的高质量ESL出版物标准

经过审查，发现了以下严重的质量缺陷，这些缺陷足以对学习者产生误导，并在教育产品中构成法律风险。

## 发现的严重问题 (CRITICAL / HIGH)

### 1. **词条：mushroom**
*   **出处字段：** definition ("a living thing with a cap on top and a stem, that grows in damp places")
*   **具体问题 (CRITICAL)：** 定义在科学事实上不严谨，且过于宽泛。虽然描述了蘑菇的典型外观，但没有明确指出它是 fungi (真菌)，而不是 plant (植物) 或 animal (动物)。"living thing" 过于模糊。对于10岁、MAP 197（接触过基础科学）的学生来说，这是不可接受的分类缺失。
*   **测试用例：** 给学生看这个定义，问他 "Is a mushroom a kind of plant, animal, or something else?" 如果学生根据 "living thing that grows" 推断它是植物（最常见的错误），或者无法回答，就证明该定义未能提供关键的分类信息。
*   **外部证据：**
    *   *Oxford Learner's Dictionaries*: "a fungus with a round flat head and short stem." (明确指出是 fungus)
    *   *Merriam-Webster*: "an enlarged complex aboveground fleshy fruiting body of a fungus (such as a basidiomycete) that consists typically of a stem bearing a pileus" (明确指出是 fungus)

### 2. **词条：spider**
*   **出处字段：** definition ("a small animal with eight legs that makes webs")
*   **具体问题 (CRITICAL)：** 事实错误/过度概括。声称蜘蛛 "makes webs" (制造网) 是不准确的。只有部分种类的蜘蛛结网捕食（如结网蛛），许多种类的蜘蛛（如狼蛛 wolf spiders, 蝇虎 jumping spiders, 捕鸟蛛 tarantulas）是主动狩猎或伏击，并不结网。这种定义会向学生灌输错误的生物学知识。
*   **测试用例：** 给学生看这个定义，然后给他看一个不结网的捕鸟蛛 (tarantula) 的视频，问他 "Is this a spider according to the definition?"，如果学生因为该动物不结网而回答 "No"，则证明定义在生物学事实上具有误导性。
*   **外部证据：**
    *   *Oxford Learner's Dictionaries*: "a small creature with eight thin legs. Many spiders spin webs (= nets of thin threads) to catch insects for food." (使用了 "Many spiders..."，而不是绝对的说法)
    *   *National Geographic*: "Not all spiders spin webs."

### 3. **词条：pepper**
*   **出处字段：** definition ("a crunchy vegetable that can be red, green, or yellow and is hollow inside")
*   **具体问题 (HIGH)：** 定义存在显著的植物学事实错误。在植物学上，pepper (如 bell pepper) 含有种子，是由花发育而来的，因此它是 fruit (果实/水果)，而不是 vegetable (蔬菜)。（尽管在烹饪中常被称为蔬菜）。对于一本需要保证事实正确性的字典，应该指出其植物学属性，或者更严谨地表述为 "often eaten as a vegetable" 或明确区分。
*   **测试用例：** 在科学课测试中，题目问 "Which of the following is scientifically a fruit? A. Carrot B. Celery C. Bell Pepper D. Potato"。如果学生学习了这个字典的定义，他会因为字典说 pepper 是 "vegetable" 而选错。
*   **外部证据：**
    *   *Merriam-Webster*: "a hollow edible fruit..." / "the usually green, red, or yellow variously shaped fruit of a pepper..."
    *   *Oxford Learner's Dictionaries*: "a hollow fruit, usually red, green or yellow, eaten as a vegetable..."

### 4. **词条：turtle**
*   **出处字段：** definition ("a reptile with a hard shell that covers its body")
*   **具体问题 (HIGH)：** 描述过于简略，导致无法与类似物种（如 tortoise）区分，且存在生物学上的不精确。"covers its body" (覆盖其身体) 这种表述暗示壳是像衣服一样穿在外面，但实际上龟壳是其骨骼（肋骨和脊椎）的一部分。
*   **测试用例：** 给学生看这个定义，然后问他："Can a turtle take off its shell like a jacket?" 如果学生根据 "covers its body" 认为壳是外加的覆盖物，从而回答 "Yes"，则证明该定义未能准确传达龟壳的生物学本质。
*   **外部证据：**
    *   *Oxford Learner's Dictionaries*: "a large reptile with a hard round shell, that lives in the sea" (注意 Oxford 强调了 sea，以区分 tortoise，或者至少说明壳与骨骼的联系)。
    *   *Merriam-Webster*: "any of an order (Testudines) of land, freshwater, and marine reptiles that have a toothless horny beak and a shell of bony dermal plates enclosing the trunk and into which the head, limbs, and tail usually may be withdrawn."

### 5. **词条：lake / pond (这里针对词库中的 pond, 但涉及对比概念缺失)**
*   **出处字段：** definition for pond ("a small body of water")
*   **具体问题 (HIGH)：** 定义极度缺乏区分度。 "a small body of water" 完全没有指明它是淡水(freshwater)还是咸水，也没有指明它是被陆地包围的 (surrounded by land)。一个水坑 (puddle) 也是 small body of water，一小片海水也可以是。这导致定义失效。
*   **测试用例：** 给学生看这个定义，问："Is a puddle on the street after rain a pond?" 或者 "Is a small pool of ocean water on the beach a pond?"，如果学生根据定义回答 "Yes"，证明该定义完全失去了概念界定能力。
*   **外部证据：**
    *   *Oxford Learner's Dictionaries*: "a small area of still water, especially one that is artificial"
    *   *Cambridge Dictionary*: "an area of water smaller than a lake, often artificially made" (强调了 smaller than a lake 和 frequently artificial/still 等关键特征)。

---

## 建议固化项

为防止未来批次出现类似严重质量问题，建议将以下审查模式固化为自动化检测规则：

1.  **生物学分类绝对化检查 (Absolute Biology Claims)：** 检查涉及动植物的定义是否使用了绝对化的动词或断言（例如，"[animal] makes [thing]"，"[animal] eats [thing]"）。应该强制要求在此类描述中添加 "many", "most", 或 "often" 等限定词，以避免科学事实错误（如 "spider makes webs" 错误）。
2.  **果实/蔬菜植物学混淆检查 (Botanical vs. Culinary Confusion)：** 对所有常识中被认为是“蔬菜”，但在植物学上是“果实”（如番茄、辣椒、黄瓜、南瓜等）的词条，强制要求定义中不能单纯断言为 "a vegetable"，必须提及 "fruit" 或使用 "eaten as a vegetable" 的复合描述。
3.  **宽泛分类词检测 (Overly Broad Classifiers)：** 检查定义中心词。如果生物类词条使用了 "living thing" 或 "creature" 作为首要中心词，必须触发警告。要求具体到 "animal", "plant", "fungus", "insect", "bird", "reptile" 等更精确的生物学分类，特别是在 L2+ 级别或针对特定科学词汇（如 mushroom）时。
4.  **必要界定条件缺失检测 (Missing Bounding Conditions)：** 对于地理或自然环境词汇（如 pond, lake, sea, island），强制检查定义是否包含边界条件（例如，"surrounded by land", "salt water", "still water", "larger than X"）。拒绝类似 "a body of water" 这种完全没有界定作用的描述。
