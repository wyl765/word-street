# Word Street 词库复检（GPT-R1）— Level 1 & Level 2

目标：在“10 轮修复”之后，专门找**修复过程中可能引入的新问题**（而不是重复旧问题）。

> 复检文件：
> - `words-level1.js`
> - `words-level2.js`

---

## 结论速览

- ✅ **JS/JSON 结构未被破坏**：两份文件均可被 Node `vm` 正常执行并取出数组；对象字段齐全；未发现语法错误/缺字段。
- ✅ **word 字段无重复**：L1=604、L2=548，`word` 全部唯一。
- ⚠️ **Level 2 存在 imageKeyword 重复（2 组）**：会影响出图多样性/检索一致性。
- ⚠️ **少数词条在“简化定义/改 keyword”后变得过于模糊或不匹配**：不至于 crash，但会影响教学/测验质量。

---

## 1) imageKeyword 重复（Level 2）【需要处理】

### A. `imageKeyword:"raise hand"` 重复
- L2:48 `rule` → imageKeyword: **raise hand**
- L2:322 `raise` → imageKeyword: **raise hand**

**问题**：`raise` 用“举手”非常贴切；但 `rule` 用“举手”只是例句里的一个规则，导致：
- keyword 重复（已违反你要求的“改完后不重复”）
- `rule` 的图像语义被缩成“举手”，偏题

**建议**：
- `rule` 用更泛化的 keyword（如：`classroom rules poster` / `rules list` / `no running sign`）
- `raise` 保持 `raise hand`。

### B. `imageKeyword:"note"` 重复
- L2:283 `message` → imageKeyword: **note**
- L2:298 `note` → imageKeyword: **note**

**问题**：`note` 词条用 `note` 合理；`message` 用 `note` 会与 `note` 词条完全撞图。

**建议**：
- `message` 改成更贴合的 keyword（如：`phone message` / `text message` / `sticky note message on fridge`）
- `note` 保持 `note`。

---

## 2) 定义/例句在简化后出现“教学风险点”

> 这里不是说“语法错”，而是说：对 10 岁孩子而言，**区分度/准确度下降**，会导致同义词、近义词、同类概念更难分清。

### A. `rule` 定义过于抽象
- L2:48 `rule` definition: **"something you must follow"**

**问题**：太泛，和 `law`（L2:47 "an official rule"）只差一个 official。孩子容易理解成“rule=law=规定”。

**建议方向**：强调 rule 常见于**游戏/课堂/家庭**，不一定是法律。

### B. `citizen` 定义不够准确
- L2:45 `citizen` definition: **"a person who belongs to a place"**

**问题**："belongs" 语义模糊（像居民/住在这里的人）。`citizen` 更接近“某国合法成员/国民”。

**建议方向**：可简化但要保留“country/town 的正式成员（国民/公民）”的味道。

### C. 过度泛化的“模板定义”（会降低区分能力）
- L2:98 `action` definition: **"something that is done"**
- L2:163 `choice` definition: **"something you pick"**
- L2:31 `cause` definition: **"why something happens"**

这些都能用，但在题库/测验里会出现“多个选项都像”——尤其当 distractors 也是抽象词时。

**建议方向**：给一个更具体但仍适龄的关键点，比如：
- action：你做的事（常强调“动作/行为”）
- choice：从两个或更多选项里选一个
- cause：事情发生的原因（reason）

---

## 3) 例句与目标词脱钩（Level 2 有 1 处明显）

### `magic` 例句未出现 magic
- L2:277 `magic` example: **"The magician pulled a coin from my ear."**

**问题**：例句出现了 `magician`，但没有出现目标词 `magic`。
- 对词卡/背诵：降低“词形-语义”绑定
- 对测验：如果要求“在例句中找单词”，会直接失败

**建议**：改成包含 `magic` 的句子，例如：
- “The magician did magic and pulled a coin from my ear.”
- 或“His magic trick surprised everyone.”（但要确保仍是 magic 而不是 trick）

---

## 4) imageKeyword 与例句内容不一致（Level 1 发现 1 处）

### `borrow` 的 keyword 指向 book，但例句是 pencil
- L1:252 `borrow` example: **borrow your pencil**
- L1:252 `borrow` imageKeyword: **"handing a book to friend"**

**问题**：不算“错”，但属于修复/替换 keyword 时容易引入的“图文不对齐”。

**建议**：keyword 与例句对齐（如：`borrow pencil` / `borrowing pencil from friend`）。

---

## 5) 可能“修过头”的点：把多个义项硬塞进一条定义（Level 2 较明显）

这些不一定是错误，但会让 10 岁孩子在初学阶段更困惑，尤其当例句只覆盖其中一个义项。

- L2:138 `block` definition: **"a solid piece or a city section"**（例句只讲 wood block）
- L2:186 `deal` definition: **"an agreement or a lot"**（例句只讲 agreement；"a lot" 更像短语 *a good deal* 的用法）
- L2:144 `course` definition: **"a path or a class"**（例句只讲 obstacle course）

**建议方向**：
- 初学阶段优先保留**最常用、最可画、最可举例**的义项；其他义项要么拆词条、要么换到更高 level。

---

## 附：我做过的硬性校验（供你放心）

- `vm.runInNewContext` 执行两份 JS，成功取到 `LEVEL1_BANK` / `LEVEL2_BANK`
- 字段完整性检查：每条均包含 `word/level/definition/example/imageKeyword`
- 重复检查：
  - L1：`word` 0 重复，`imageKeyword` 0 重复
  - L2：`word` 0 重复，`imageKeyword` 2 组重复（已在上文列出）

---

## 总评

上一位审校员说“0 CRITICAL”从**语法/结构**角度基本成立；但我认为仍有 **4 类值得马上修的小问题**：
1) L2 keyword 重复（raise hand / note）
2) `magic` 例句未出现目标词
3) `borrow` keyword 与例句不对齐
4) 少数定义简化过度（rule/citizen/action/choice/cause），会削弱同义/同类概念区分度
