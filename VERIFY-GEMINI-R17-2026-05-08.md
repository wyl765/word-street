## Level 1 词库问题报告

### 发现的问题

#### CRITICAL (严重问题)
- `mushroom`: 定义为 "a living thing with a round top and stem that grows in wet, shady places" 过于复杂且学究气。"living thing", "shady places" 对二年级ESL学生偏难，不够直观。
- `enormous`: 定义 "so big you can hardly believe it" 中的 "hardly believe it" 对L1太抽象。

#### HIGH (高优先级)
- `caterpillar`: 定义 "a small worm-like insect that becomes a butterfly or moth" 包含 "moth"。L1学生通常不知道 "moth"。
- `syrup`: 定义 "a thick sweet liquid"，"liquid" 偏难。
- `spine`: 定义 "the bones down your back that help you stand straight"，"spine", "bones" 稍难，但解释中的 "curved" (So your spine is not curved) 会造成困扰。
- `skull`: 定义 "the bone that covers your brain"，"skull" 对L1偏难，定义尚可但偏生硬。
- `vanish`: 词汇本身可能超出L1，"magician made the coin vanish!" 偏难。

#### MEDIUM (中等优先级)
- `drought`: 词汇偏难。定义 "a long time with no rain" 尚可，但词汇本身超纲。
- `blizzard`: 词汇偏难。
- `steep`: "sharply" 偏难。
- `fetch`: 虽常用，但L1多用 `get`。

#### LOW (低优先级)
- `tuck`: "push edges in to make neat" 偏难。
- `glance`: 词汇略偏难。
- `stomp`: 解释 "step down very hard" 尚可。
- `discover`: 词汇略偏难，"find something new" 尚可。

## 建议固化项

- 🔧 [proofcheck规则] 自动检查定义中是否包含超出当前Level的单词。如L1中出现 `moth`, `liquid`, `sharply`, `magician`, `curved` 等。
- 🔧 [禁词] 禁词表应包括：科学术语（如 `living thing` 用于解释蘑菇）、抽象程度副词（如 `hardly`, `sharply`）、未在当前或更低级别学习过的词汇（如 `moth`）。
