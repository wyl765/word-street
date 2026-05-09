# Word Street 英语词条审核报告
## CRITICAL & HIGH 风险词条 (妈妈视角审核)

### 1. `mention` (Level 2)
- **问题 (HIGH):** 定义中使用了 `briefly` 这个词，对于 MAP 197（约2年级水平）的 ESL 孩子来说，`briefly` 可能比目标词 `mention` 本身更难理解。
- **妈妈视角:** 我儿子读到 `briefly` 就会卡住，他可能不知道这个词的意思，从而无法理解 `mention` 的定义。
- **验证测试:** 让孩子读一遍定义："to talk about something briefly, without saying much about it"，问他 `briefly` 是什么意思，看他能不能说出来或者猜出来。
- **外部证据:** Merriam-Webster Kids 对 `mention` 的定义更简单："to talk about briefly : make reference to"。虽然也用了 `briefly`，但是搭配更简单。对于低幼儿童，可以用 "to talk about something in a few words" 更好懂。

### 2. `separate` (Level 2)
- **问题 (HIGH):** 例句 "We separate the laundry into whites and colors." 中使用了 `laundry` 这个词，中国孩子可能对 `laundry`（脏衣服/待洗衣物）这个概念不熟悉。
- **妈妈视角:** 儿子可能知道 `white` 和 `colors`，但不明白为什么要分 `laundry`，甚至可能不知道 `laundry` 是什么。
- **验证测试:** 问孩子什么是 `laundry`。
- **外部证据:** 可以换成更贴近孩子生活的场景，比如玩具："We separate the toys into cars and blocks."

### 3. `ancient` (Level 2)
- **问题 (HIGH):** 定义 `very old` 不够准确，例句 "We saw an ancient pot in the museum." 可能导致误解。
- **妈妈视角:** 儿子可能会认为爷爷奶奶也是 `ancient`，因为他们也 `very old`。
- **验证测试:** 问孩子："如果爷爷很老，我们可以说他 ancient 吗？"
- **外部证据:** Merriam-Webster Kids 定义："very old : having lived or existed for a very long time"。对于孩子，最好强调是 "很久很久以前的"，比如 "from a long time ago"。

### 4. `gas` (Level 2)
- **问题 (CRITICAL):** 定义 "a type of matter like air that you cannot see or hold" 有事实错误。有些气体是可见的（如氯气）。
- **妈妈视角:** 这个定义会给我儿子形成错误的科学概念，以后学到有颜色的气体会很困惑。
- **验证测试:** 问孩子："所有的气体都是看不见的吗？"
- **外部证据:** 科学定义中，气体不一定是不可见的。更好的儿童定义可以是 "something like air that is not solid or liquid"。

### 5. `energy` (Level 2)
- **问题 (HIGH):** 定义 "power to move or do work" 中使用了 `power`，可能引起歧义或增加理解难度。
- **妈妈视角:** 儿子可能会把 `energy` 和魔法力量（power）混淆，或者不理解什么是 "do work" (物理上的做功)。
- **验证测试:** 问孩子这里 "do work" 是什么意思。
- **外部证据:** Merriam-Webster Kids 给出多个定义，针对儿童更易懂的可以是 "the strength and vitality required for sustained physical or mental activity"。对于2年级，可以简化为 "what you need to run, play, and make things go"。

### 6. `citizen` (Level 2)
- **问题 (HIGH):** 定义 "a person who legally belongs to a country" 中使用了 `legally`。
- **妈妈视角:** `legally` 这个词对2年级孩子来说太抽象、太难了。
- **验证测试:** 问孩子 `legally` 是什么意思。
- **外部证据:** Merriam-Webster Kids: "a person who owes allegiance to a government and is entitled to its protection"。可以简化为 "a person who belongs to a country and has rights there"。

## 建议固化项
- 🔧 [proofcheck规则] 在定义中禁止使用副词，如 `briefly`, `legally`，因为副词通常比较抽象，增加理解难度。
- 🔧 [白名单] 无。
- 🔧 [搭配规则] 避免在例句中使用中国孩子不熟悉的文化或生活场景词汇，例如 `laundry`。建议添加规则检查例句中的名词是否在低年级常见词汇表中。
- 🔧 [标准更新] 科学概念词汇（如 gas）的定义必须绝对准确，不能为了简化而牺牲科学性（例如不能说气体都是看不见的）。需要在 QA-STANDARD.md 中增加 "科学常识准确性" 的检查项。
- 🔧 [新工具] 建立一个 "词频检查脚本"，检查 definition 和 example 中使用的词是否都在 MAP 190 以下的词库中，确保不会出现解释词比目标词更难的情况。