# Word Street 词库审校报告

通过对 Level 1, Level 2 (含 2a/2b/2c/2d) 共 2411 个词条进行审校，发现如下关键问题：

### CRITICAL：安全与敏感问题
1. **图片安全 (imageKeyword)**
   - `spider` 的图片词为 `spider`（可能吓到怕蜘蛛的孩子）
   - `itsy` 的图片词为 `tiny spider`
   - `corner` 的图片词为 `spider corner`
   - `reptile` 的图片词为 `snake`（蛇类图片易引发恐惧）
   - `skull` 的图片词为 `skull diagram for kids`（骷髅）
   - `demonstrate` 的图片词为 `demonstrate show`（包含 `demon`，若直接匹配会触发某些严格过滤器）
   - `gravel` 的图片词为 `gravel path`（包含 `grave` 坟墓的字眼，注意图片搜索是否偏移）

2. **内容安全 (Definition/Example 包含死亡、暴力、不当行为或暗示词)**
   - `fatal`: Def 包含 "death" (causing death or very serious harm)
   - `peril`: Def 包含 "death" (great danger that could cause death or serious harm)
   - `life cycle`: Def 包含 "death" (the stages a living thing goes through from birth to death)
   - `cheek`: Def/Ex 包含 "kiss" (Grandma kissed him on the cheek) - 虽是亲情但可能触发严苛的少儿敏感词审查。
   - `sharp`: Def 包含 "knife" (That knife is very sharp) - 涉及刀具。
   - `dagger`: Def 包含 "knife" (a short pointed knife) - 武器相关。
   - `sword`: Def 包含 "weapon" / "sword" - 武器相关。
   - `germ`: Ex 包含 "kill" (Washing your hands kills germs...) - 虽然语境安全，但 `kill` 为敏感词。
   - 多处生理词如 `heart`, `organ`, `blood`, `artery`, `vein`, `pulse`, `capillary`, `circulate`：定义中频繁且直白使用 "blood"（红色液体、流血等概念，在某些国内少儿平台属审查红线）。
   - 注：有些误报是因为单词内嵌，比如 `hoodie` 例句里没有 die，但 `die` 是 hoo**die** 的后缀，脚本扫出 "die"，`audience` (au**die**nce)，`march` 的例句 "sol**die**rs" 包含 die，`diet` 包含 die。这些属于正则/匹配不严谨，但需要加入白名单或改进匹配逻辑。

### MAJOR：文化与认知障碍
1. **文化背景不适**
   - `dollar` / `deposit`: 例句或配图暗示使用了 `piggy bank`（猪猪钱罐），虽然不难，但国内孩子更熟悉微信支付或压岁钱。
   - `venture`: 例句使用了 `lemonade stand`（摆柠檬水摊），这是典型的北美儿童文化，中国男孩难以共情。

2. **定义过难 (用词复杂)**
   - `controversy` / `controversial`: 解释里用了 `disagreement` (12字母)。
   - `namely`: 解释里用了 `specifically` (12字母)。
   - `blend in`: 解释里用了 `surroundings` (12字母)。
   - `chromosome`: 解释里用了 `instructions` (12字母)。
   - `encounter`: 解释里用了 `unexpectedly` (12字母)。
   - `fault`: 解释里用了 `responsibility` (14字母)。

## 建议固化项

- 🔧 [proofcheck规则] 建议在 `proofcheck.mjs` 中增加单词全字匹配 (word boundary `\b`) 的敏感词正则，避免 `soldier` 报错含有 `die`。
- 🔧 [proofcheck规则] 在 `proofcheck.mjs` 中增加定义复杂度的长度卡点：如果 definition 中出现了长度 >= 11 且非目标词及其简单变形的单词，必须抛出 warning 要求人工确认。
- 🔧 [禁词] 将 `death`, `fatal`, `murder`, `poison`, `snake`, `spider`, `skull`, `weapon`, `sword`, `dagger` 添加到 `BANNED_WORDS`（或者严格审核名单），尤其是在 10岁级别。
- 🔧 [白名单] 将 `soldier`, `audience`, `hoodie`, `diet`, `mostly`, `study`, `technique`, `expertise`, `fundamental`, `cultivate` 加白，它们的拼写或简单例句中不经意包含了 `die` 或 `kill` 的字母组合 (如 s**kill**)。
- 🔧 [白名单] 将 `kill germs` 加白，作为卫生的合法表达；将亲人间的 `kiss` 加白。
- 🔧 [新工具] 建议新建 `culture-check.js` 脚本，专门扫描 `lemonade stand`, `tooth fairy`, `piggy bank`, `groundhog` 等北美特有文化词汇，提示策划替换为更具普适性或本地化的场景（如买玩具、打篮球、做AI项目）。
