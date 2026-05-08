# VERIFY-CLAUDE-R16-2026-05-08
**角色:** 竞品公司的人，专找能攻击产品的弱点
**范围:** L1 (600行) + L2 (548行) = 1152词

## CRITICAL
无CRITICAL问题。

## HIGH

### 1. [steep] (L1) — 定义词性错误 + 用词不准
- 定义: "a hill that goes up fast"
- 例句: "The hill was so steep they had to crawl up it." (形容词用法 ✅)
- 问题: steep是形容词，但定义写成名词形式("a hill...")。而且"goes up fast"是错误描述——steep指角度陡峭(sharp angle)，不是速度快(fast)。
- 建议: "rising or falling at a sharp angle" 或 "going up very sharply, hard to climb"

### 2. [leap] (L1) — 动词定义，名词例句
- 定义: "to jump far" (动词)
- 例句: "The frog made a big **leap** across the pond." (名词用法)
- 建议: 例句改为 "The frog leaped across the pond." 或定义改为 "a big jump"

### 3. [dash] (L1) — 动词定义，名词例句
- 定义: "to run very fast" (动词)
- 例句: "He made a quick **dash** to the door before it closed." (名词用法)
- 建议: 例句改为 "He dashed to the door before it closed."

### 4. [nod] (L1) — 动词定义，名词例句
- 定义: "to move your head up and down for yes" (动词)
- 例句: "He gave a **nod** to show he understood." (名词用法)
- 建议: 例句改为 "He nodded to show he understood."

### 5. [crash] (L2) — 动词定义，名词例句
- 定义: "to hit with a loud noise" (动词)
- 例句: "The wave made a **crash** on the rocks." (名词用法)
- 建议: 例句改为 "The wave crashed against the rocks."

### 6. [snap] (L2) — 动词定义，名词例句
- 定义: "to break with a quick sound" (动词)
- 例句: "The twig made a **snap** under my shoe." (名词用法)
- 建议: 例句改为 "The twig snapped under my shoe."

## MEDIUM

### 7. [toad] (L1) — 用另一个词来定义
- 定义: "like a frog but with rough dry skin"
- 问题: 用"like a frog"比较式定义，依赖孩子先懂frog。虽然frog也在L1，但比较式定义是弱模式——竞品可以攻击"你的定义不独立"。
- 建议: "a small animal with rough dry skin that hops" (不依赖frog)

### 8. [shallow] (L1) — 定义过于狭窄
- 定义: "with water that only reaches your ankles or knees"
- 问题: shallow不仅用于水(shallow bowl, shallow hole, shallow breath)。而且"ankles or knees"太具体，shallow end of a pool可能到腰部。
- 建议: "not deep" 或 "not going far down"

### 9. [cub] (L1) — 多动物并列
- 定义: "a baby bear or lion"
- 问题: 违反L1单义项原则(不用"or"列举多种)。且cub还可以是tiger/wolf/fox的幼崽，定义过窄。
- 建议: "a baby of a big wild animal" 或直接 "a baby bear"

## LOW

### 10. [mist] (L2) — 用fog定义mist，近循环
- 定义: "a light fog of tiny water drops floating in the air"
- fog在L1定义是"a cloud close to the ground"
- 建议: "very thin cloud near the ground that makes things hard to see"

### 11. [crunchy] (L1) — "loud"不准确
- 定义: "making a loud sound when you bite"
- 问题: crunchy不一定loud，轻轻咬也有crunchy的声音。
- 建议: "making a snapping sound when you bite"

## 建议固化项

- 🔧 [proofcheck规则] **VERB_NOUN_POS_MISMATCH**: 检测定义以"to "开头(动词式定义)但例句中目标词被用作名词(常见模式: "made a [word]", "gave a [word]", "a big/quick/loud [word]")。这是bark/roar问题的扩展版——R15修了bark/roar但漏了leap/dash/nod/crash/snap。程序可以匹配: 定义匹配`/^to\s/` + 例句匹配`/(a|an|the|big|quick|loud|his|her|my)\s+WORD(?!\w)/i`。
- 🔧 [proofcheck规则] **ADJ_AS_NOUN_DEF**: 检测词库中形容词(可通过已有POS标注或通过定义以"a/an/the"开头判断)的定义写成名词形式。steep的"a hill that..."是典型模式。
- 🔧 [proofcheck规则] **COMPARISON_DEF**: 检测定义以"like a [word]"开头的比较式定义。这种依赖其他词的定义模式应该被标记review。
- 🔧 [白名单] MULTI_MEANING检测的synonymWhitelist可能需要检查是否覆盖了所有合理的"or"用法(如"X or Y"表示同类而非多义)。
