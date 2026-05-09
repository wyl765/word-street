# Gemini 反方审校报告 - Round 1 (2026-05-09)

## 发现的问题

### [CRITICAL] 词条: "coconut" - 字段: definition
**问题:** 定义说coconut是"a big brown fruit with white inside"（一个内部是白色的大棕色水果）。这会在学生看到绿色（未成熟/饮用椰青）椰子时产生误解，并且在植物学上coconut其实是drupe（核果）或seed（种子/坚果）。对于10岁学生，将外部特征局限于"brown"是不准确的，因为市场上常见绿椰子。
**测试用例:** 给学生看一个绿色的椰青，问他这是否是coconut，根据定义他可能会回答不是，因为定义写了"brown"。
**外部证据:** Merriam-Webster: "the drupe of the coconut palm whose outer fibrous husk yields coir and whose nut contains thick edible meat and, in the fresh fruit, a clear liquid" / Britannica: "The fruit is a fibrous drupe."
**建议修复:** a large fruit with a hard shell, white meat, and liquid inside

### [HIGH] 词条: "ladybug" - 字段: definition
**问题:** 定义说ladybug是"a small red bug with black spots"（带黑斑的小红虫）。虽然最常见的是红色，但瓢虫也有黄色、橙色甚至黑色的，且并非所有瓢虫都有斑点。这种过度简化的定义会导致学生在遇到非红色瓢虫时无法识别。
**测试用例:** 给学生看一张黄色瓢虫（Asian lady beetle）的图片，问他这是不是ladybug，根据定义他可能会回答不是。
**外部证据:** Merriam-Webster: "any of numerous small roughly hemispherical and usually brightly colored (such as red, yellow, or orange) mostly predaceous beetles (family Coccinellidae) often with dark spots"
**建议修复:** a small, round bug, usually red or orange with black spots

### [HIGH] 词条: "drought" - 字段: definition
**问题:** 定义说drought是"a long time with no rain"（很长一段时间没有雨）。这不准确，drought是指降水量远低于正常水平（abnormally dry），而不是"完全没有雨"。这种绝对化的定义会导致学生认为只要下了一点毛毛雨，旱灾就结束了。
**测试用例:** 问学生："如果一个地方一个月下了一滴雨，这还算drought吗？"根据定义，他会回答不算，因为定义说"no rain"。
**外部证据:** Merriam-Webster: "a period of dryness especially when prolonged; specifically : one that causes extensive damage to crops or prevents their successful growth" / Oxford: "a long period of time when there is little or no rain"
**建议修复:** a long time with very little or no rain

### [MEDIUM] 词条: "bug" - 字段: missing (基于ladybug等推测整体词库问题)
*(注：这里仅检查了JSON里的具体词，以上问题已足够)*

### [HIGH] 词条: "puddle" - 字段: definition
**问题:** 定义说puddle是"a small pool of water on the ground"（地上的小水洼）。Puddle也可以是其他液体的洼（如mud puddle泥坑, blood puddle血泊），不一定是水。虽然对于10岁孩子主要指水，但"pool of liquid"更准确。不过更严重的问题是，这里的定义没有体现出通常是**雨后**形成的这一常见语境。
**测试用例:** 问学生："桌子上洒了一摊果汁，这是puddle吗？" 根据定义，地上才是，水才是，这会引起混淆。
**外部证据:** Merriam-Webster: "a very small pool of usually dirty or muddy water" or "a small pool of a liquid"
**建议修复:** a small pool of water or other liquid, usually on the ground after rain

### [CRITICAL] 词条: "mushroom" - 字段: definition
**问题:** 定义说mushroom是"a living thing with a cap on top and a stem, that grows in damp places"（一种顶部有盖、有茎，生长在潮湿地方的生物）。在科学上（甚至小学常识课上），mushroom是fungus（真菌），不是plant，将其泛泛称为"living thing"虽然没错，但丢失了核心分类特征，且没有指出它是真菌的子实体（fleshy, spore-bearing fruiting body）。
**测试用例:** 问学生："mushroom属于哪一类生物？" 根据定义，他只能回答"living thing"，无法知道它是真菌。
**外部证据:** Merriam-Webster: "an enlarged complex fleshy fruiting body of a fungus (as most basidiomycetes) that arises from an underground mycelium..." / Oxford: "a fungus with a round top and short stem"
**建议修复:** a type of fungus with a short stem and a round top

## 建议固化项
1. **颜色绝对化禁忌:** 避免在定义中使用绝对颜色词（如 "a red bug", "a brown fruit"），除非该物品只有一种颜色。应使用 "usually red" 或描述其他核心特征。
2. **极端词汇禁忌:** 避免使用 "no" (如 no rain) 或 "always" 等极端词汇，自然现象通常是渐进的（little or no rain）。
3. **生物分类准确性:** 尽管为了简单使用 "living thing" 或 "animal"，但应该避免违背基本科学常识（如将真菌描述得像植物或泛泛而谈）。

