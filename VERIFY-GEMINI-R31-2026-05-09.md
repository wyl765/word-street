# Word Street L1-L2 Quality Report (Mother's Perspective)

## ❌ CRITICAL & HIGH Issues

1. **`words-level1.js` | L33 | "caterpillar"**
   - **问题:** 定义过难，FK 7.6。"a small crawling creature with many legs that later becomes a butterfly or moth"，对10岁孩子来说，"creature", "later becomes", "moth" 认知负担重，长句结构复杂，像百科全书而不是妈妈的解释。
   - **测试用例:** A small crawling ___ with many legs that ___ ___ a butterfly or moth. (A) animal / turns into (B) creature / later becomes -> 10岁孩子会选(A)，(B)是超纲表达。
   - **外部证据:** Oxford Learner's Dictionaries定义更简单: "a small animal like a worm with many legs". (FK 2.8)

2. **`words-level1.js` | L440 | "miserable"**
   - **问题:** R30号称修复，但定义仍然过难，FK 18.4。"very unhappy or uncomfortable" 中 "uncomfortable" 音节多，对2年级阅读水平的孩子来说不直观。
   - **测试用例:** Which word means "very unhappy or uncomfortable"? (A) sad (B) miserable -> "uncomfortable"的干扰会导致孩子无法把词和"惨"关联。
   - **外部证据:** Cambridge Dictionary给出"very unhappy"就足够了。

3. **`words-level1.js` | L570 | "dwarf"**
   - **问题:** L1包含复杂多义项，FK 8.8。"a very small person or creature; also something much smaller than usual"。第二释义对10岁孩子完全没必要，且干扰核心幻想角色认知。
   - **测试用例:** What is a dwarf? (A) a small person in stories (B) a person or creature or something smaller than usual -> L1孩子只能记住(A)。
   - **外部证据:** 童书（如Snow White）里dwarf只指故事角色，Biemiller词表建议初级阶段只教具体名词义。

4. **`words-level2.js` | L117 | "attention"**
   - **问题:** 定义模糊，FK 15.5。"watching and listening carefully"，少了一个核心的"paying"或"giving"动作意味。10岁孩子经常听到"Pay attention"，但只看这个定义很难理解为什么不是动词。
   - **测试用例:** What does "attention" mean? (A) listening carefully (B) the act of listening carefully -> 词性不匹配容易导致造句错误 "I attention you."
   - **外部证据:** Merriam-Webster Kids: "the act or power of carefully thinking about, listening to, or watching someone or something".

5. **`words-level1.js` | L430 | "frustrated"**
   - **问题:** 定义过难，FK 7.6。"upset because something is hard"。情绪颗粒度对L1略显复杂，10岁男孩更能共情的是"生气+无能为力"。
   - **测试用例:** When do you feel frustrated? (A) when you drop ice cream (B) when you can't beat a game level -> (A)是sad/upset, (B)才是frustrated，定义没分清。
   - **外部证据:** MW Kids: "angry or annoyed because of being unable to do something". "because something is hard"不够精确。

6. **`words-level1.js` | L528 | "scale"**
   - **问题:** R30修过，但L1词条依然塞了完全不相干的两个释义："a tool for measuring weight; also the thin flat plates covering a fish or reptile"。L1孩子极难同时掌握称和鱼鳞，认知超载。
   - **测试用例:** The fish has green scales. Which definition matches? -> 导致孩子每次看到scale都要在两极跳跃。
   - **外部证据:** CCSS要求低年级避免同形异义词的生硬合并，应分级教或只教最常见词义（称重工具）。

## 建议固化项

- 🔧 [proofcheck规则] 添加规则：禁止L1词条的定义中出现 "also"，强迫拆分多义词，或只保留儿童语境最常见释义。
- 🔧 [新工具] 建立词性一致性检查脚本 `pos-match-check.mjs`，检测名词定义的起始结构（如是否以a/the/act of开头），防止类似"attention"（名词）定义为"watching..."（动名词/动词进行时形式）的词性混淆。
- 🔧 [禁词] 将 "creature" 加入L1禁词（或标记为需简化词），改为 "animal"。
- 🔧 [proofcheck规则] 修复过的词必须标记为 `// [R30 FIXED]` 并被后续的 `regression-test.mjs` 锁定，确保FK不会反弹。
- 🔧 [标准更新] QA-STANDARD.md 明确规定，如果一个词是形容词（如miserable），不能用音节超过3的非基础形容词（如uncomfortable）去解释它。
