# Word Street词库审校报告

## 发现的严重问题 (CRITICAL & HIGH)

### realize (CRITICAL)
- **File**: words-level2.js
- **问题**: Realize (become aware of a fact) is defined as understand (comprehend meaning/nature), leading to misusage like "I realize the math problem".
- **测试用例**: I _____ that I forgot my keys. vs I _____ this math concept.
- **外部证据**: Oxford Learner's Dictionary: realize = "to become aware of a particular fact or situation". understand = "to know or realize the meaning of words, a language, what somebody says, etc."

### describe (HIGH)
- **File**: words-level2.js
- **问题**: Definition "to tell what something is like" is not grammatically substitutable and may cause wrong usage like "I will describe about the puppy".
- **测试用例**: Fill in the blank: Please ______ the picture.
- **外部证据**: Cambridge Dictionary: "to say or write what someone or something is like". "Tell what" creates a noun clause, breaking direct object substitution.

### arrange (HIGH)
- **File**: words-level2.js
- **问题**: Definition "to put things in order" conflates arrange (positioning) with sort/order (sequencing), leading to "arrange the numbers from 1 to 10" instead of "order".
- **测试用例**: Test: Please _____ the chairs in a circle (arrange) vs _____ these numbers (order).
- **外部证据**: Cambridge: arrange = "to put a group of objects in a particular order".

### suppose (HIGH)
- **File**: words-level2.js
- **问题**: Definition "to guess that something might be true" fails to capture the assuming/expecting meaning and conflates it with guessing, which are distinct in ESL.
- **测试用例**: Test: You are supposed to be here at 8.
- **外部证据**: Merriam-Webster: suppose = "to assume to be true or to expect".

### complete (HIGH)
- **File**: words-level2.js
- **问题**: Definition "to finish all the parts" implies multi-part objects only. Kids will think they cannot "complete" a simple singular action.
- **测试用例**: Test: I completed the race.
- **外部证据**: Merriam-Webster: complete = "to finish making or doing".

## 建议固化项

- 🔧 [proofcheck规则] 添加对释义可替换性(substitutability)的正则检查：名词的释义不能以动词开头，动词的释义需要以to开头并且能直接替换原词的句法位置（如不能把及物动词解释为带有从句的短语）。
- 🔧 [白名单] 无新建议
- 🔧 [禁词] 避免在释义中使用 "guess" 来解释 "suppose" 等认识情态动词(epistemic verbs)。
- 🔧 [标准更新] QA-STANDARD.md 需要增加"词性及句法功能替换测试"：每个definition都必须能在example句子里直接替换word并保持基本语法正确。
