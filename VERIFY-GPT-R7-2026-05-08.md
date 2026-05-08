# VERIFY-GPT-R7-2026-05-08 — Word Street L1/L2（含2a/2b/2c/2d）审校报告（找茬模式）

目标读者：10岁中国 ESL 男孩（MAP 197；约2年级阅读）。以下只报我确定的真问题；不做表扬、不做泛泛建议。

> 审校范围：
> - words-level1.js
> - words-level2.js
> - words-level2a.js
> - words-level2b.js
> - words-level2c.js
> - words-level2d.js

---

## 总览（高优先级风险）

1) **儿童安全禁词违规（CRITICAL）**：出现 *dead / kills / shot / blood*（例句、定义、imageKeyword）。按你给的规则，这类内容在 L1–L2 必须清零。

2) **大量词条例句不含目标词本体（MAJOR）**：例句只出现屈折变化（过去式/复数/三单等），导致孩子无法在例句中“看到并匹配”该词。

- Level1：12 条
- Level2：24 条
- Level2a：88 条
- Level2b：70 条
- Level2c：55 条
- Level2d：76 条

3) **确定的事实/概念不准确（MAJOR）**：如 *carbon* 的定义与例句表达不准确（把“二氧化碳/含碳物质”说成“carbon”）。

---

## CRITICAL

### 1) 禁词：dead（L1 / L2d / L2b）

- **words-level1.js — battery**
  - 现例句：`The toy stopped working because the battery was dead.`
  - 问题：出现 **dead**（禁词）。
  - 建议：改为 `... because the battery ran out.` / `... because the battery had no power left.`

- **words-level2d.js — replace**
  - 现例句：`We need to replace the dead batteries in the remote.`
  - 问题：出现 **dead**（禁词）。
  - 建议：`... replace the old batteries ...` / `... replace the batteries because they ran out.`

- **words-level2b.js — cut off**
  - 现例句：`She cut off the dead branch from the tree.`
  - 问题：出现 **dead**（禁词）。
  - 建议：`... cut off the broken branch ...` / `... cut off the dry branch ...`

### 2) 禁词：kill/kills（L2b）

- **words-level2b.js — germ**
  - 现例句：`Washing your hands kills germs, so you stay healthy.`
  - 问题：出现 **kills**（属于 kill 词族；按禁词意图应禁止）。
  - 建议：`Washing your hands helps stop germs from spreading, so you stay healthy.`

### 3) 禁词：shot（L2b）

- **words-level2b.js — vaccine**
  - 现定义：`a shot that helps your body fight sickness`
  - 问题：出现 **shot**（禁词）。
  - 建议：`a medicine that helps protect you from a disease`（必要时在更高 level 再讲 “shot”）

### 4) 禁词：blood（L2b / L2c）

> 这些词条（blood/artery/vein/capillary/pulse/heart/organ/circulate）在当前写法下**无法避免 blood**，与 L1–L2 禁词规则直接冲突。

- **words-level2b.js — heart**
  - 现定义：`the organ that pumps blood through your body`
  - 问题：blood（禁词）。
  - 建议：改为不含 blood 的可用释义，例如 `the organ in your chest that beats to move blood around your body` ——但仍会触发 blood；若禁词必须严格执行，则建议**整体迁移这些“血液循环系统”词到更高 level**或调整禁词策略。

- **words-level2b.js — organ（例句）**
  - 现例句：`The heart is an organ that pumps blood.`（blood 禁词）

- **words-level2b.js — blood（定义+例句+imageKeyword）**
  - 现定义：`the red liquid that moves through your body`
  - 现例句：`Blood carries oxygen ...`
  - 现 imageKeyword：`red cells body`
  - 问题：blood 本体出现；此外 imageKeyword 可能拉到不适图（真实血液/伤口）。

- **words-level2b.js — artery / vein / pulse / capillary（定义/例句）**
  - 多处定义或例句含 blood；capillary 定义 `a tiny blood vessel` 也含 blood。

- **words-level2c.js — circulate（例句）**
  - 现例句：`Blood circulates through your body and back to your heart.`
  - 问题：blood 禁词。
  - 建议：换非人体语境：`Warm air circulates around the room.` / `Water circulates in the fountain.`

---

## MAJOR

### A) 例句不含目标词本体（只出现屈折变化）

这不是“风格问题”，而是**学习机制问题**：词汇游戏里孩子通常需要在例句中直接匹配/定位目标词；只给 *cookies/decided/participated* 会显著降低可学性。

下面清单均为“例句中找不到 word 字段原样字符串”（大小写不敏感）。

#### words-level1.js（12条）
- cookie — `Grandma baked chocolate chip cookies for us.`（只有 *cookies*）
- hip — `... his hips ...`（只有 *hips*）
- rib — `... his ribs ...`（只有 *ribs*）
- muscle — `... his muscles.`（只有 *muscles*）
- slipper — `... her fuzzy slippers ...`（只有 *slippers*）
- sandal — `He wore sandals ...`（只有 *sandals*）
- sneaker — `... her sneakers ...`（只有 *sneakers*）
- boot — `... rain boots ...`（只有 *boots*）
- stare — `... stop staring ...`（只有 *staring*）
- come back — `... comes back ...`（只有 *comes back*）
- wake up — `He woke up ...`（只有 *woke up*）
- run out — `We ran out ...`（只有 *ran out*）

#### words-level2.js（24条）
- decide — `I decided ...`
- realize — `I realized ...`
- succeed — `I succeeded ...`
- point out — `The teacher pointed out ...`
- come across — `I came across ...`
- break down — `... broke down ...`
- carry out — `We carried out ...`
- become — `... became dark ...`
- beg — `... begged ...`
- blink — `I blinked ...`
- camp — `We camped ...`
- carve — `We carved ...`
- climb — `I climbed ...`
- cuddle — `I cuddled ...`
- drift — `... drifted ...`
- grasp — `I grasped ...`
- groan — `I groaned ...`
- guard — `The dog guards ...`（只有 *guards*）
- pause — `I paused ...`
- support — `The beam supports ...`（只有 *supports*）
- swallow — `I swallowed ...`
- warn — `I warned ...`
- chestnut — `... roasted chestnuts ...`（只有 *chestnuts*）
- mulberry — `... picked mulberries ...`（只有 *mulberries*）

#### words-level2a.js（88条）
> 数量过大，建议用程序批改（见“建议固化项”）。此处逐条列出以便直接定位。

- crush — `... crushed ...`
- dare — `... dared ...`
- demand — `... demanded ...`
- direct — `... directed ...`
- examine — `... examined ...`
- exchange — `... exchanged ...`
- excite — `... excited ...`
- explore — `We explored ...`
- express — `She expressed ...`
- fail — `He failed ...`
- flow — `... flows ...`（只有 *flows*）
- gaze — `... gazed ...`
- guide — `... guided ...`
- hasten — `... hastened ...`
- hunt — `... hunts ...`（只有 *hunts*）
- increase — `... increased ...`
- insist — `... insisted ...`
- instruct — `... instructed ...`
- announce — `... announced ...`
- approve — `... approved ...`
- argue — `... argued ...`
- celebrate — `We celebrated ...`
- convince — `... convinced ...`
- defend — `... defended ...`
- encourage — `... encouraged ...`
- improve — `... improved ...`
- observe — `We observed ...`
- organize — `She organized ...`
- ancestor — `Her ancestors ...`（只有 *ancestors*）
- generation — `... generations.`（只有 *generations*）
- volunteer — `Volunteers helped ...`（只有 *Volunteers*）
- pioneer — `The pioneers ...`（只有 *pioneers*）
- immigrant — `Many immigrants ...`（只有 *immigrants*）
- inspect — `... inspected ...`
- supply — `... supplies ...`（只有 *supplies*）
- survive — `... survived ...`
- inherit — `... inherited ...`
- require — `... requires ...`（只有 *requires*）
- oppose — `... opposed ...`
- occupy — `... occupied ...`
- accomplish — `... accomplished ...`
- establish — `... established ...`
- represent — `... represents ...`（只有 *represents*）
- manufacture — `... manufactures ...`（只有 *manufactures*）
- demonstrate — `... demonstrated ...`
- investigate — `... investigated ...`
- approach — `... approached ...`
- collapse — `... collapsed ...`
- interpret — `... interpreted ...`
- hesitate — `... hesitated ...`
- negotiate — `... negotiated ...`
- assemble — `We assembled ...`
- advocate — `He advocates ...`（只有 *advocates*）
- amend — `... amended ...`
- aspire — `... aspires ...`（只有 *aspires*）
- assert — `... asserted ...`
- authorize — `... authorized ...`
- clarify — `... clarified ...`
- compensate — `... compensated ...`
- compile — `... compiled ...`
- conceive — `... conceived ...`
- confine — `... was confined ...`
- consolidate — `... consolidated ...`
- consult — `... consulted ...`
- contemplate — `... contemplated ...`
- contradict — `... contradicted ...`
- convene — `... convened ...`
- denote — `... denotes ...`（只有 *denotes*）
- deviate — `... deviated ...`
- devote — `... devoted ...`
- distort — `... distorted ...`
- dominate — `... dominated ...`
- enforce — `... enforced ...`
- erode — `... eroded ...`
- exceed — `... exceeded ...`
- extract — `... extracted ...`
- facilitate — `... facilitates ...`（只有 *facilitates*）
- fluctuate — `... fluctuates ...`（只有 *fluctuates*）
- guideline — `... guidelines ...`（只有 *guidelines*）
- impose — `... imposed ...`
- incorporate — `... incorporated ...`
- induce — `... induced ...`
- initiate — `... initiated ...`
- insert — `... inserted ...`
- intervene — `... intervened ...`
- invoke — `... invoked ...`
- isolate — `... was isolated ...`
- manifest — `... manifested ...`

#### words-level2b.js（70条）
- stanza — `... stanzas ...`
- syllable — `... syllables ...`
- synonym — `... synonyms ...`
- antonym — `... antonyms ...`
- homophone — `... homophones ...`
- lung — `... lungs ...`
- germ — `... kills germs ...`
- symptom — `... symptoms ...`
- vein — `... veins ...`
- settler — `The settlers ...`
- digit — `... digits ...`
- bring up — `... brought up ...`
- end up — `... ended up ...`
- fall apart — `... falling apart ...`
- go through — `... went through ...`
- look after — `... looks after ...`
- look up — `... looked up ...`
- pick out — `... picked out ...`
- pull over — `... pulled over ...`
- run into — `... ran into ...`
- sign up — `... signed up ...`
- stay up — `... stayed up ...`
- take apart — `... took apart ...`
- take away — `... took away ...`
- take over — `... took over ...`
- use up — `... used up ...`
- wear out — `... wore out ...`
- work out — `... worked out ...`
- build up — `... built up ...`
- call off — `... called off ...`
- chromosome — `... chromosomes ...`
- deal with — `... dealt with ...`
- emit — `... emits ...`
- hand out — `... handed out ...`
- lay out — `... laid out ...`
- show up — `... shows up ...`
- account for — `... accounts for ...`
- act on — `... acted on ...`
- boil down to — `... boils down to ...`
- catch on — `... caught on ...`
- come down to — `... came down to ...`
- commute — `... commutes ...`
- descend — `... descended ...`
- freshen up — `... freshened up ...`
- get by — `... got by ...`
- landform — `... landforms ...`
- live up to — `... lived up to ...`
- rule out — `... ruled out ...`
- amass — `... amassed ...`
- back down — `... backed down ...`
- balk — `... balked ...`
- bang out — `... banged out ...`
- bask — `... basked ...`
- bestow — `... bestowed ...`
- blot out — `... blotted out ...`
- bristle — `... bristles ...`
- bumble — `... bumbled ...`
- capillary — `Blood flows through capillaries ...`
- dilute — `... diluted ...`
- dwindle — `... dwindled ...`
- engulf — `... engulfed ...`
- extricate — `... extricated ...`
- morph — `... morphed ...`
- scour — `... scoured ...`
- spore — `... spores ...`
- submerge — `... submerged ...`
- unearth — `... unearthed ...`

#### words-level2c.js（55条）
（同类问题，略去重复解释；逐条如下）
- adjust, amaze, applaud, assist, assure, ban, circulate, circumstance, commit, compete, conquer, consist, construct, contain, contribute, dedicate, deposit, deserve, dimension, display, distribute, dread, embarrass, emerge, enable, encounter, endure, exaggerate, expand, expose, fascinate, forbid, fragment, fulfill, fund, guarantee, illustrate, imply, impress, indicate, inform, injure, inquire, inspire, integrate, invade, involve, justify, launch, layer, manage, modify, obtain, option, overcome

#### words-level2d.js（76条）
- participate, peer, perceive, permit, persist, plunge, polish, pose, preserve, proclaim, produce, prohibit, promote, propose, prosper, provision, publish, pursue, quote, rebel, reflect, reform, refuse, regret, reinforce, reject, release, renew, resemble, reserve, resolve, restore, restrict, retire, retreat, reverse, revise, revolt, rival, ruin, sacrifice, seize, shift, simplify, suspend, threaten, tolerate, transfer, unite, violate, withdraw, yield, abolish, accelerate, appoint, betray, boast, cease, certify, cite, commission, compel, condemn, conduct, confront, constrain, contend, convert, convey, coordinate, cultivate, delegate, depict, designate, deteriorate, dictate

> 注：2c/2d 这里的“缺词”同样是因为例句用了过去式/三单/复数，导致原形不出现；可用脚本批量修复。

### B) 事实/概念不准确（确定）

- **words-level2b.js — carbon**
  - 现定义：`a material found in all living things`
  - 现例句：`Carbon is in the air we breathe out and in things like coal.`
  - 问题（确定）：
    1) “呼出气体里有 carbon” 这句话在科学表达上不准确：呼出的是 **carbon dioxide**；而不是“carbon（元素）”直接在空气里。
    2) 定义把 carbon 当作“material”也不严谨（carbon 是 chemical element；且并非只存在于 living things）。
  - 建议（取其一，按目标难度选）：
    - 更准确但仍儿童化：`a chemical element found in things like plants, animals, and coal`；例句：`Plants and animals are made of carbon.`
    - 若要避免 element：把该词移到更高 level；或改成与孩子科学课一致的表述，并避免误导。

### C) 主题/语境不够儿童友好（可避免的战争语境）

这类不是“禁词硬雷”，但属于明显可替换且更适合儿童的写法。

- **words-level2d.js — retreat**
  - 现例句：`The army retreated when they saw the enemy was too strong.`
  - 问题：战争语境（army/enemy）不必要，且会带出更多敏感词延伸。
  - 建议：`The hikers retreated when the storm got worse.` / `We retreated into the house when it started to hail.`

- **words-level2a.js — hierarchy**
  - 现例句：`In the army, there is a clear hierarchy of ranks.`
  - 建议：改成学校/公司语境（更贴近日常且更安全）：`In a school, there is a hierarchy: principal, teachers, and students.`

---

## MINOR（但建议改）

- **words-level2b.js — vowel**
  - 现定义：`the letters a, e, i, o, u`
  - 问题：严格来说 vowel 是“语音/元音音素”，不是“字母”；且有时 y 也算元音。
  - 建议：面向孩子可改成更稳妥的口径：`a letter like a, e, i, o, u (and sometimes y)` 或 `a speech sound like the sound in 'a' or 'e'`（按课程取舍）。

- **words-level2b.js — 可分离短语动词（实现相关）**
  - 词条：`take into account` / `leave behind` / `bail out`
  - 现例句均为自然英语，但属于 **separable phrasal verb**：`take + object + into account`、`leave + object + behind`、`bail + object + out`。
  - 影响：如果你的“例句包含目标词”检查/题目匹配是按**连续字符串**做的，会被判定“缺词”。
  - 建议：二选一
    1) **改例句为连续出现**（例如 `Please take into account the cost ...` / `Don't leave behind your jacket ...` / `Her friend will bail out her classmate ...`）；或
    2) **匹配规则允许中间插入宾语**（按短语动词词典规则做容错）。

---

## 建议固化项

- 🔧 [proofcheck规则] **例句必须包含目标词原样字符串（大小写不敏感）**：对每条 entry 检查 `example` 是否含 `word`（作为完整词/短语）。若缺失，直接报 MAJOR。
  - 备注：这会把过去式/复数/三单全部抓出来（本次大量问题的根因）。

- 🔧 [禁词] 扩展禁词词形覆盖：除了 `kill` 还要覆盖 `kills/killing/killed`；同理对 `die` 等做词形展开；并对首字母大写（`Blood`）同样命中。

- 🔧 [禁词] **禁词检查应覆盖 definition / example / imageKeyword 三个字段**（本次 blood/shot/dead 都在不同字段出现）。

- 🔧 [白名单] 若已有“a/an”自动检查：`a U-shaped ...` 应加入白名单（读音以 /juː/ 开头，不用 an）。

- 🔧 [新工具] 建议新增 `scan-example-contains-word.mjs`（或并入现有 verify/qa 脚本）：
  - 输出缺失清单 + 自动建议（例如把 `I decided` 改写为 `I will decide` / `I decide` 的模板化修复）。

- 🔧 [标准更新] QA-STANDARD.md：明确两点
  1) L1–L2 是否允许医学/人体词（blood/artery…）。若 **blood 必禁**，则这些词条必须移出 L1–L2 或换主题；否则就是规则冲突。
  2) “例句包含目标词”是否要求 **word 字段原形原样出现**（建议是：必须出现；屈折变化不算）。
