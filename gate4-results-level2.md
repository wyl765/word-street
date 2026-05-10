# Gate 4 Red Team Attack — words-level2.js (552词)

## 🔴 RED — 攻击成功，必须修复

### 🔴 scared — 循环定义：用afraid定义scared
- 定义"afraid; feeling fear"直接用了同库词afraid，循环依赖
- 四选一中scared/afraid不可区分
- 例句攻击：遮住scared → "I felt ___ during the thunder" → afraid完美适配
- 修复：定义→"feeling that something will hurt you"

### 🔴 afraid — 与scared语义等价
- 定义"feeling fear"与scared几乎等价
- 四选一中afraid/scared不可区分
- 例句攻击：遮住afraid → "I was ___ in the dark" → scared完美适配
- 修复：定义→"not wanting to do something because you feel it might be dangerous"

### 🔴 hint — 循环定义：用clue定义hint
- 定义"a small clue"直接用了同库词clue (#166)，循环依赖
- 四选一中hint/clue不可区分
- 例句攻击：遮住hint → "She gave me a ___ by pointing" → clue完美适配
- 修复：定义→"a small piece of help that does not give the full answer"

### 🔴 clue — 与hint几乎等价
- 定义"a small sign that helps you figure something out"
- 与hint修复后仍需区分：clue侧重于发现/线索
- 例句攻击：遮住clue → "A muddy footprint was a ___" → hint也能填
- 修复：定义→"something you find that helps you solve a puzzle or mystery"

### 🔴 seldom — 循环定义：用rarely定义seldom
- 定义"not often; rarely"直接用了同库词rarely (#76)
- 四选一中seldom/rarely不可区分
- 例句攻击：遮住seldom → "Snow ___ falls in this warm town" → rarely完美适配
- 修复：定义→"almost never"

### 🔴 rarely — 与seldom几乎等价
- 定义"not often"与seldom原定义等价
- 例句攻击：遮住rarely → "We ___ see snow" → seldom完美适配
- 修复：定义→"happening only a few times, much less than usual"

### 🔴 suppose — 循环定义：用guess定义suppose
- 定义"to guess that something might be true"直接用了同库词guess (#237)
- 四选一中suppose/guess不可区分
- 修复：定义→"to think something is probably true without being sure"

### 🔴 knapsack — 与backpack定义几乎相同
- knapsack定义"a bag carried on the back"
- backpack定义"a bag you wear on your back"
- 四选一中knapsack/backpack不可区分
- 修复：knapsack定义→"a simple bag with straps that you carry on your back, often for hiking"

### 🔴 law — 循环定义：用rule定义law
- 定义"a rule made by the government"直接用了同库词rule (#47)
- 例句攻击：遮住law → "A ___ says we must stop at a red light" → rule也能填
- 修复：定义→"something the government says everyone must do, or they may get in trouble"

### 🔴 track — 循环定义：用path定义track
- 定义"a path or a place to run"直接用了同库词path (#307)
- 例句足够区分（running track），但定义不行
- 修复：定义→"a special loop or lane where people race or run"

### 🔴 course — 循环定义链：用path和track定义course
- 定义"a path or track to follow"用了两个同库词
- 例句攻击：遮住course → "The obstacle ___ had cones" → track也能填
- 修复：定义→"a set route with steps or turns that you must follow to the end"

### 🔴 note — 循环定义：用message定义note
- 定义"a short written message"直接用了同库词message (#282)
- 例句攻击：遮住note → "I wrote a ___ to my teacher" → message也能填
- 修复：定义→"a few words written down quickly on paper"

### 🔴 act — 与action几乎循环
- act定义"to do something"
- action定义"a thing someone does"
- 四选一中act/action定义可互换
- 修复act：定义→"to do something right away instead of waiting"
- 修复action：定义→"one thing a person does that others can see"

### 🔴 shore — 与coast/beach三重重叠
- shore定义"land next to water"
- coast定义"land next to the ocean" — shore是coast的超集
- beach定义"sandy land by the ocean"
- 四选一中三个词难以区分
- 修复shore：定义→"the strip of ground right at the edge of a lake, river, or sea"
- 修复coast：定义→"a long stretch of land along the ocean, often seen on a map"
- beach不需改（已有sandy特征）

### 🔴 unless — 与otherwise都含"if not"
- unless定义"except if; if not"
- otherwise定义"or else; if not"
- 四选一中unless/otherwise不可区分
- 修复unless：定义→"except if something happens first"
- 修复otherwise：定义→"if you do not do that, then this will happen"

### 🔴 brilliant — imageKeyword与定义不匹配
- 定义"very smart or impressive"
- imageKeyword是"flashlight"——手电筒和"聪明"没有直观联系
- 中国10岁孩子看到手电筒不会联想到"brilliant"的核心含义
- 修复：imageKeyword→"lightbulb over head idea"

### 🔴 rise — 与raise易混淆
- rise定义"to go up or get higher"
- raise定义"to lift"
- 中国ESL孩子经常混淆rise/raise（中文都是"升/举"）
- 例句攻击：遮住rise → "We watched the sun ___" → raise也能填（虽然语法不同）
- 修复rise：定义→"to go up on its own, without being pushed or pulled"

### 🔴 globe — 循环定义：用map定义globe
- 定义"a ball-shaped map of Earth"直接用了同库词map (#48)
- 修复：定义→"a round model of Earth that you can spin"

### 🔴 atlas — 循环定义：用maps定义atlas
- 定义"a book of maps"直接用了同库词map
- 修复：定义→"a big book full of pictures that show where countries and oceans are"

## 🟡 YELLOW — 弱点发现，可改进

### 🟡 graph vs chart — 语义接近但可区分
- graph: "a picture that shows numbers" — 侧重数字
- chart: "a drawing or list that shows facts" — 侧重事实
- 例句能区分（bar graph vs class chart），可接受
- 建议：保持现状，但graph可加"using bars or lines"

### 🟡 frequently vs occasionally — 频率词对但可区分
- frequently: "many times" 
- occasionally: "sometimes"
- 区分度尚可，但中国孩子不一定理解频率差异
- 建议：保持现状

### 🟡 close — 多义词风险
- 定义"to shut"，但close也有"near"的意思
- 与near (#292)在孩子头脑中可能混淆
- 但作为动词vs形容词区分明确，暂不改

### 🟡 fair — 多义词风险
- 定义"treating people the same and right"
- 但fair也可指集市/游乐场
- 例句明确，暂不改

### 🟡 biscuit — 文化陷阱
- 定义"a small, soft bread roll"是美式含义
- 英式biscuit=cookie/饼干，中国孩子可能已接触英式含义
- 例句明确，暂不改但需注意

### 🟡 kindle — 可能与Amazon Kindle混淆
- 定义"to start a fire"清晰
- 但10岁孩子可能先想到Kindle阅读器
- 例句明确，暂不改

### 🟡 believe vs suppose — 修复后仍需关注
- believe: "to think something is true"
- suppose修复后: "to think something is probably true without being sure"
- 有足够区分度（believe更确定），可接受

### 🟡 plot — imageKeyword "missing map"可能与map词条混淆
- 但例句和定义明确指向故事
- 建议imageKeyword改为"story events diagram"

### 🟡 forge vs blacksmith — 相关词但可区分
- forge: 地方（place），blacksmith: 人（person）
- forge的imageKeyword "forge blacksmith"有点混淆
- 建议forge的imageKeyword改为"hot metal workshop"

### 🟡 backpack vs knapsack — 修复后仍是近义词
- 修复后knapsack加了"hiking"和"simple"来区分
- 但仍然是同类物品，需要在四选一中注意不要同时出现

### 🟡 muzzle — imageKeyword含"snout"
- imageKeyword "dog snout nose close up"中snout不是目标词
- 图片搜索可能聚焦snout而非muzzle
- 建议imageKeyword改为"dog muzzle close up"

### 🟡 usual — 与frequently/occasionally/seldom同域
- 定义"what happens most of the time"与frequently有重叠
- 但usual是形容词，其他是副词，语法区分明确

### 🟡 earn vs win — earn定义中暗含"work"
- "to get by working"清晰
- 但中国孩子可能与win混淆（都是"获得"）
- 例句明确（earn a sticker when I help），可接受

## 🟢 GREEN — 攻击失败

### 🟢 describe (0) — 攻击失败
- 定义"to tell what something is like"与explain "to tell how or why"有足够区分
- describe=描述外观/特征，explain=解释原因/方法
- 例句明确，无歧义

### 🟢 solve (2) — 攻击失败
- "to find the answer"清晰唯一，例句"solve the math problem"无歧义

### 🟢 complete (3) — 攻击失败
- "to finish all the parts"与finish (#215)虽相近，但complete强调"all the parts"
- 例句区分明确

### 🟢 arrange (4) — 攻击失败
- "to put things in order"独特，例句清晰

### 🟢 decide (5) — 攻击失败
- "to choose after thinking"与choose区分明确（decide强调思考过程）

### 🟢 mention (7) — 攻击失败
- "to talk about something in just a few words"独特，强调brevity

### 🟢 realize (8) — 攻击失败
- "to understand suddenly"有"突然"的区分度

### 🟢 repeat (9) — 攻击失败
- "to say or do again"清晰唯一

### 🟢 separate (10) — 攻击失败
- "to put into different groups"清晰

### 🟢 struggle (11) — 攻击失败
- "to try hard when something is difficult"独特

### 🟢 succeed (12) — 攻击失败
- "to do something you tried to do"清晰

### 🟢 surround (13) — 攻击失败
- "to be all around"独特

### 🟢 wander (14) — 攻击失败
- "to walk without a plan"独特

### 🟢 ancient (15) — 攻击失败
- "from a very long time ago"与old/modern明确区分

### 🟢 modern (16) — 攻击失败
- "of the present time; not old"清晰

### 🟢 fragile (18) vs sturdy (19) — 攻击失败
- 反义词对，定义互补，不会混淆

### 🟢 swift (20) — 攻击失败
- "very fast"清晰

### 🟢 anxious (21) — 攻击失败
- "feeling worried that something bad might happen"与afraid/scared有enough区分（worried vs fear）

### 🟢 setting (22) — 攻击失败
- "where and when a story happens"是文学术语，独特

### 🟢 paragraph (24) vs sentence (25) — 攻击失败
- 一个是句子组，一个是完整句，区分明确

### 🟢 fiction (26) vs nonfiction (27) — 攻击失败
- 反义词对，定义互补

### 🟢 main idea (28) vs detail (29) — 攻击失败
- 一大一小，区分明确

### 🟢 cause (30) vs effect (31) — 攻击失败
- 因果对，定义互补

### 🟢 habitat (32) — 攻击失败
- "the place where an animal lives"独特

### 🟢 insect (33) — 攻击失败
- "a small animal with six legs"有六腿特征

### 🟢 mammal (34) — 攻击失败
- "an animal that has hair and drinks milk as a baby"有清晰特征

### 🟢 reptile (35) — 攻击失败
- "an animal with dry skin and scales like a snake"有清晰特征

### 🟢 liquid (36) vs gas (37) — 攻击失败
- 物态区分明确

### 🟢 energy (38) — 攻击失败
- "what your body needs to move, play, and do things"清晰

### 🟢 force (39) — 攻击失败
- "a push or pull that moves things"独特

### 🟢 magnet (40) — 攻击失败
- "something that pulls some metals"独特

### 🟢 soil (41) — 攻击失败
- "dirt that plants grow in"清晰

### 🟢 climate (42) vs weather (381) vs season (43) — 攻击失败
- climate=通常天气，weather=当前天气，season=季节，区分足够

### 🟢 citizen (44) — 攻击失败
### 🟢 government (45) — 攻击失败
### 🟢 map (48) — 攻击失败
### 🟢 continent (50) — 攻击失败
### 🟢 country (51) — 攻击失败
### 🟢 state (52) — 攻击失败
### 🟢 city (53) — 攻击失败
### 🟢 border (54) — 攻击失败
### 🟢 freedom (55) — 攻击失败
### 🟢 election (56) — 攻击失败
### 🟢 subtract (57) — 攻击失败
### 🟢 multiply (58) — 攻击失败
### 🟢 divide (59) — 攻击失败
### 🟢 sum (60) — 攻击失败
### 🟢 data (63) — 攻击失败
### 🟢 length (64) vs width (65) vs height (66) — 攻击失败
- 三维测量，定义各有特征词（long/side-to-side/tall）
### 🟢 shape (68) — 攻击失败
### 🟢 angle (69) — 攻击失败
### 🟢 triple (70) — 攻击失败
### 🟢 gradually (71) — 攻击失败
### 🟢 immediately (72) — 攻击失败
### 🟢 afterward (73) — 攻击失败
### 🟢 recently (74) — 攻击失败
### 🟢 however (78) — 攻击失败
### 🟢 therefore (79) — 攻击失败
### 🟢 turn into (81) — 攻击失败
### 🟢 look forward to (82) — 攻击失败
### 🟢 make up (83) — 攻击失败
### 🟢 point out (84) — 攻击失败
### 🟢 come across (85) — 攻击失败
### 🟢 break down (86) — 攻击失败
### 🟢 carry out (87) — 攻击失败
### 🟢 set up (88) — 攻击失败
### 🟢 courageous (89) — 攻击失败
### 🟢 honest (90) — 攻击失败
### 🟢 loyal (91) — 攻击失败
### 🟢 selfish (92) — 攻击失败
### 🟢 thoughtful (93) — 攻击失败
### 🟢 determined (94) — 攻击失败
### 🟢 about (95) — 攻击失败
### 🟢 add (98) — 攻击失败
### 🟢 address (99) — 攻击失败
### 🟢 adult (100) — 攻击失败
### 🟢 again (102) — 攻击失败
### 🟢 agree (103) — 攻击失败
### 🟢 alive (104) — 攻击失败
### 🟢 alone (105) — 攻击失败
### 🟢 also (106) — 攻击失败
### 🟢 always (107) — 攻击失败
### 🟢 any (108) — 攻击失败
### 🟢 appear (109) — 攻击失败
### 🟢 arm (110) — 攻击失败
### 🟢 arrive (111) — 攻击失败
### 🟢 ask (112) — 攻击失败
### 🟢 asleep (113) vs awake (117) — 攻击失败，反义词对
### 🟢 attack (114) — 攻击失败
### 🟢 attempt (115) — 攻击失败
### 🟢 attention (116) — 攻击失败
### 🟢 balance (119) — 攻击失败
### 🟢 balloon (120) — 攻击失败
### 🟢 bare (121) — 攻击失败
### 🟢 bargain (122) — 攻击失败
### 🟢 base (123) — 攻击失败
### 🟢 basic (124) — 攻击失败
### 🟢 battle (125) — 攻击失败
### 🟢 beach (126) — 攻击失败（有sandy特征区分shore/coast）
### 🟢 beam (127) — 攻击失败
### 🟢 because (128) — 攻击失败
### 🟢 become (129) — 攻击失败
### 🟢 beg (130) — 攻击失败
### 🟢 begin (131) — 攻击失败
### 🟢 behavior (132) — 攻击失败
### 🟢 believe (133) — 攻击失败（与suppose修复后有enough区分）
### 🟢 better (134) — 攻击失败
### 🟢 bicycle (135) — 攻击失败
### 🟢 blink (136) — 攻击失败
### 🟢 block (137) — 攻击失败
### 🟢 blossom (138) — 攻击失败
### 🟢 bossy (139) — 攻击失败
### 🟢 bounce (140) — 攻击失败
### 🟢 breakfast (141) — 攻击失败
### 🟢 breathe (142) — 攻击失败
### 🟢 bright (143) — 攻击失败
### 🟢 bring (144) — 攻击失败
### 🟢 broad (145) — 攻击失败
### 🟢 build (146) — 攻击失败
### 🟢 bundle (147) — 攻击失败
### 🟢 butter (148) — 攻击失败
### 🟢 cactus (149) — 攻击失败
### 🟢 calendar (150) — 攻击失败
### 🟢 camel (151) — 攻击失败
### 🟢 camp (152) — 攻击失败
### 🟢 capture (153) — 攻击失败
### 🟢 careful (154) — 攻击失败
### 🟢 carpet (155) — 攻击失败
### 🟢 cart (156) — 攻击失败
### 🟢 carve (157) — 攻击失败
### 🟢 ceiling (158) — 攻击失败
### 🟢 center (159) — 攻击失败
### 🟢 chance (160) — 攻击失败
### 🟢 change (161) — 攻击失败
### 🟢 choice (162) — 攻击失败
### 🟢 circle (163) — 攻击失败
### 🟢 climb (164) — 攻击失败
### 🟢 comfort (168) — 攻击失败
### 🟢 common (169) — 攻击失败
### 🟢 complain (170) — 攻击失败
### 🟢 confuse (171) — 攻击失败
### 🟢 connect (172) — 攻击失败
### 🟢 corner (173) — 攻击失败
### 🟢 cost (174) — 攻击失败
### 🟢 cotton (175) — 攻击失败
### 🟢 crash (177) — 攻击失败
### 🟢 make (178) — 攻击失败
### 🟢 crumble (179) — 攻击失败
### 🟢 cuddle (180) — 攻击失败
### 🟢 custom (181) — 攻击失败
### 🟢 cycle (182) — 攻击失败
### 🟢 danger (183) — 攻击失败
### 🟢 dark (184) — 攻击失败
### 🟢 deal (185) — 攻击失败
### 🟢 delay (186) — 攻击失败
### 🟢 delight (187) — 攻击失败
### 🟢 deny (188) — 攻击失败
### 🟢 depend (189) — 攻击失败
### 🟢 destroy (190) — 攻击失败
### 🟢 dig (191) — 攻击失败
### 🟢 dinner (192) — 攻击失败
### 🟢 find (193) — 攻击失败
### 🟢 distance (194) — 攻击失败
### 🟢 dizzy (195) — 攻击失败
### 🟢 dollar (196) — 攻击失败
### 🟢 donate (197) — 攻击失败
### 🟢 doorway (198) — 攻击失败
### 🟢 downstairs (199) vs upstairs (372) — 攻击失败
### 🟢 drift (200) — 攻击失败
### 🟢 drown (201) — 攻击失败
### 🟢 earn (202) — 攻击失败
### 🟢 earth (203) — 攻击失败
### 🟢 edge (204) — 攻击失败
### 🟢 enter (205) — 攻击失败
### 🟢 escape (206) — 攻击失败
### 🟢 exact (207) — 攻击失败
### 🟢 famous (209) — 攻击失败
### 🟢 far (210) — 攻击失败
### 🟢 farm (211) — 攻击失败
### 🟢 fence (212) — 攻击失败
### 🟢 field (213) — 攻击失败
### 🟢 fill (214) — 攻击失败
### 🟢 finish (215) — 攻击失败
### 🟢 fit (216) — 攻击失败
### 🟢 flour (217) — 攻击失败
### 🟢 foam (218) — 攻击失败
### 🟢 fold (219) — 攻击失败
### 🟢 follow (220) — 攻击失败
### 🟢 fork (221) — 攻击失败
### 🟢 friendship (222) — 攻击失败
### 🟢 frighten (223) — 攻击失败
### 🟢 front (224) — 攻击失败
### 🟢 frozen (225) — 攻击失败
### 🟢 gentleman (226) — 攻击失败
### 🟢 glad (227) — 攻击失败
### 🟢 glide (228) — 攻击失败
### 🟢 glitter (229) — 攻击失败
### 🟢 goal (230) — 攻击失败
### 🟢 grasp (231) — 攻击失败
### 🟢 greet (232) — 攻击失败
### 🟢 grin (233) — 攻击失败
### 🟢 groan (234) — 攻击失败
### 🟢 grow (235) — 攻击失败
### 🟢 guard (236) — 攻击失败
### 🟢 guess (237) — 攻击失败（与suppose修复后有enough区分）
### 🟢 habit (238) — 攻击失败
### 🟢 hallway (239) — 攻击失败
### 🟢 handful (240) — 攻击失败
### 🟢 harm (241) — 攻击失败
### 🟢 harvest (242) — 攻击失败
### 🟢 heal (243) — 攻击失败
### 🟢 hidden (244) — 攻击失败
### 🟢 history (246) — 攻击失败
### 🟢 holiday (247) — 攻击失败
### 🟢 hop (248) — 攻击失败
### 🟢 horizon (249) — 攻击失败
### 🟢 hurt (250) — 攻击失败
### 🟢 hurry (251) — 攻击失败
### 🟢 idea (252) — 攻击失败
### 🟢 ignore (253) — 攻击失败
### 🟢 include (254) — 攻击失败
### 🟢 inside (255) — 攻击失败
### 🟢 invite (256) — 攻击失败
### 🟢 jacket (257) — 攻击失败
### 🟢 judge (258) — 攻击失败
### 🟢 jump (259) — 攻击失败
### 🟢 key (260) — 攻击失败
### 🟢 kind (261) — 攻击失败
### 🟢 knee (262) vs kneel (263) — 攻击失败（名词vs动词，区分明确）
### 🟢 knock (264) — 攻击失败
### 🟢 lantern (265) — 攻击失败
### 🟢 laugh (266) — 攻击失败
### 🟢 leaf (267) — 攻击失败
### 🟢 leak (268) — 攻击失败
### 🟢 learn (269) — 攻击失败
### 🟢 least (270) — 攻击失败
### 🟢 library (271) — 攻击失败
### 🟢 limit (272) — 攻击失败
### 🟢 listen (273) — 攻击失败
### 🟢 lunch (274) — 攻击失败
### 🟢 machine (275) — 攻击失败
### 🟢 magic (276) — 攻击失败
### 🟢 major (277) — 攻击失败
### 🟢 marble (278) — 攻击失败
### 🟢 mask (279) — 攻击失败
### 🟢 matter (280) — 攻击失败
### 🟢 memory (281) — 攻击失败
### 🟢 message (282) — 攻击失败（note修复后区分度足够）
### 🟢 minute (283) — 攻击失败
### 🟢 mirror (284) — 攻击失败
### 🟢 mist (285) — 攻击失败
### 🟢 mix (286) — 攻击失败
### 🟢 model (287) — 攻击失败
### 🟢 mood (288) — 攻击失败
### 🟢 move (289) — 攻击失败
### 🟢 mystery (290) — 攻击失败
### 🟢 nature (291) — 攻击失败
### 🟢 near (292) — 攻击失败
### 🟢 neatly (293) — 攻击失败
### 🟢 never (294) — 攻击失败
### 🟢 noisy (295) — 攻击失败
### 🟢 north (296) — 攻击失败
### 🟢 object (298) — 攻击失败
### 🟢 ocean (299) — 攻击失败
### 🟢 offer (300) — 攻击失败
### 🟢 opinion (301) — 攻击失败
### 🟢 opposite (302) — 攻击失败
### 🟢 order (303) — 攻击失败
### 🟢 outside (304) — 攻击失败
### 🟢 over (305) — 攻击失败
### 🟢 palace (306) — 攻击失败
### 🟢 path (307) — 攻击失败（独立定义清晰）
### 🟢 pause (308) — 攻击失败
### 🟢 picnic (309) — 攻击失败
### 🟢 planet (310) — 攻击失败
### 🟢 plastic (311) — 攻击失败
### 🟢 playground (312) — 攻击失败
### 🟢 polite (313) — 攻击失败
### 🟢 praise (314) — 攻击失败
### 🟢 prepare (315) — 攻击失败
### 🟢 price (316) vs cost (174) — 攻击失败（price是标签价格，cost是花费金额）
### 🟢 prize (317) — 攻击失败
### 🟢 protect (318) — 攻击失败
### 🟢 quiet (319) — 攻击失败
### 🟢 quiz (320) — 攻击失败
### 🟢 raise (321) — 攻击失败（与rise修复后区分明确）
### 🟢 range (322) — 攻击失败
### 🟢 reach (323) — 攻击失败
### 🟢 recycle (324) — 攻击失败
### 🟢 refund (325) — 攻击失败
### 🟢 relax (326) — 攻击失败
### 🟢 rescue (327) — 攻击失败
### 🟢 respect (328) — 攻击失败
### 🟢 result (329) — 攻击失败
### 🟢 return (330) — 攻击失败
### 🟢 river (331) — 攻击失败
### 🟢 role (332) — 攻击失败
### 🟢 route (333) — 修复后区分度足够
### 🟢 safe (334) — 攻击失败
### 🟢 sail (335) — 攻击失败
### 🟢 save (336) — 攻击失败
### 🟢 scatter (338) — 攻击失败
### 🟢 score (339) — 攻击失败
### 🟢 shade (340) — 攻击失败
### 🟢 signal (342) — 攻击失败
### 🟢 simple (343) — 攻击失败
### 🟢 slippery (344) — 攻击失败
### 🟢 smell (345) — 攻击失败
### 🟢 snap (346) — 攻击失败
### 🟢 soak (347) — 攻击失败
### 🟢 special (348) — 攻击失败
### 🟢 store (349) — 攻击失败
### 🟢 strong (350) — 攻击失败
### 🟢 stuck (351) — 攻击失败
### 🟢 suggest (352) — 攻击失败
### 🟢 support (353) — 攻击失败
### 🟢 surface (354) — 攻击失败
### 🟢 swallow (355) — 攻击失败
### 🟢 sweep (356) — 攻击失败
### 🟢 sweet (357) — 攻击失败
### 🟢 talent (358) — 攻击失败
### 🟢 taste (359) — 攻击失败
### 🟢 team (360) — 攻击失败
### 🟢 tease (361) — 攻击失败
### 🟢 temperature (362) — 攻击失败
### 🟢 tend (363) — 攻击失败
### 🟢 tightly (364) — 攻击失败
### 🟢 little (365) — 攻击失败
### 🟢 travel (367) — 攻击失败
### 🟢 trick (368) — 攻击失败
### 🟢 trust (369) — 攻击失败
### 🟢 turn (370) — 攻击失败
### 🟢 under (371) — 攻击失败
### 🟢 visit (374) — 攻击失败
### 🟢 voice (375) — 攻击失败
### 🟢 vote (376) — 攻击失败
### 🟢 wait (377) — 攻击失败
### 🟢 warmth (378) — 攻击失败
### 🟢 warn (379) — 攻击失败
### 🟢 waterfall (380) — 攻击失败
### 🟢 weather (381) — 攻击失败
### 🟢 wheel (382) — 攻击失败
### 🟢 yesterday (383) — 攻击失败
### 🟢 admiral (384) — 攻击失败
### 🟢 album (385) — 攻击失败
### 🟢 alley (386) — 攻击失败
### 🟢 amber (387) — 攻击失败
### 🟢 antenna (388) — 攻击失败
### 🟢 applause (389) — 攻击失败
### 🟢 apricot (390) — 攻击失败
### 🟢 arch (391) — 攻击失败
### 🟢 avalanche (393) — 攻击失败
### 🟢 badge (394) — 攻击失败
### 🟢 bagpipe (395) — 攻击失败
### 🟢 balcony (396) — 攻击失败
### 🟢 banjo (397) — 攻击失败
### 🟢 banner (398) — 攻击失败
### 🟢 basin (399) — 攻击失败
### 🟢 bay (400) — 攻击失败
### 🟢 beacon (401) — 攻击失败
### 🟢 bead (402) — 攻击失败
### 🟢 beeswax (403) — 攻击失败
### 🟢 bellows (404) — 攻击失败
### 🟢 binoculars (405) — 攻击失败
### 🟢 birch (406) — 攻击失败
### 🟢 blacksmith (408) — 攻击失败
### 🟢 blaze (409) — 攻击失败
### 🟢 blueprint (410) — 攻击失败
### 🟢 bluff (411) — 攻击失败
### 🟢 bobsled (412) — 攻击失败
### 🟢 bolt (413) — 攻击失败
### 🟢 bonfire (414) — 攻击失败
### 🟢 bookshelf (415) — 攻击失败
### 🟢 bracelet (416) — 攻击失败
### 🟢 bramble (417) — 攻击失败
### 🟢 brass (418) — 攻击失败
### 🟢 bridle (419) — 攻击失败
### 🟢 broth (420) — 攻击失败
### 🟢 bugle (421) — 攻击失败
### 🟢 bulb (422) — 攻击失败
### 🟢 bulletin (423) — 攻击失败
### 🟢 bunker (424) — 攻击失败
### 🟢 buoy (425) — 攻击失败
### 🟢 canal (426) — 攻击失败
### 🟢 canopy (427) — 攻击失败
### 🟢 caribou (428) — 攻击失败
### 🟢 carousel (429) — 攻击失败
### 🟢 cartwheel (430) — 攻击失败
### 🟢 cashew (431) — 攻击失败
### 🟢 cedar (432) — 攻击失败
### 🟢 cellar (433) — 攻击失败
### 🟢 chapel (434) — 攻击失败
### 🟢 chariot (435) — 攻击失败
### 🟢 chestnut (436) — 攻击失败
### 🟢 chisel (437) — 攻击失败
### 🟢 chord (438) — 攻击失败
### 🟢 cider (439) — 攻击失败
### 🟢 clam (440) — 攻击失败
### 🟢 cloak (441) — 攻击失败
### 🟢 cobblestone (442) — 攻击失败
### 🟢 cocoon (443) — 攻击失败
### 🟢 comet (444) — 攻击失败
### 🟢 cork (445) — 攻击失败
### 🟢 corral (446) — 攻击失败
### 🟢 cradle (447) — 攻击失败
### 🟢 crest (448) — 攻击失败
### 🟢 crumb (449) — 攻击失败
### 🟢 cuff (450) — 攻击失败
### 🟢 cypress (451) — 攻击失败
### 🟢 dagger (452) — 攻击失败
### 🟢 dandelion (453) — 攻击失败
### 🟢 deck (454) — 攻击失败
### 🟢 delta (455) — 攻击失败
### 🟢 dinghy (456) — 攻击失败
### 🟢 dome (457) — 攻击失败
### 🟢 donkey (458) — 攻击失败
### 🟢 doorbell (459) — 攻击失败
### 🟢 drawbridge (460) — 攻击失败
### 🟢 drumstick (461) — 攻击失败
### 🟢 dune (462) — 攻击失败
### 🟢 easel (463) — 攻击失败
### 🟢 elm (464) — 攻击失败
### 🟢 ember (465) — 攻击失败
### 🟢 emerald (466) — 攻击失败
### 🟢 falcon (467) — 攻击失败
### 🟢 fiddle (468) — 攻击失败
### 🟢 fig (469) — 攻击失败
### 🟢 fjord (470) — 攻击失败
### 🟢 flint (471) — 攻击失败
### 🟢 forge (472) — 攻击失败
### 🟢 fresco (473) — 攻击失败
### 🟢 gale (474) — 攻击失败
### 🟢 galley (475) — 攻击失败
### 🟢 garnet (476) — 攻击失败
### 🟢 gazelle (477) — 攻击失败
### 🟢 geyser (478) — 攻击失败
### 🟢 gong (479) — 攻击失败
### 🟢 granite (480) — 攻击失败
### 🟢 grapevine (481) — 攻击失败
### 🟢 gravel (482) — 攻击失败
### 🟢 griddle (483) — 攻击失败
### 🟢 grove (484) — 攻击失败
### 🟢 gutter (485) — 攻击失败
### 🟢 hammock (486) — 攻击失败
### 🟢 harp (487) — 攻击失败
### 🟢 hazel (488) — 攻击失败
### 🟢 hearth (489) — 攻击失败
### 🟢 heron (490) — 攻击失败
### 🟢 hickory (491) — 攻击失败
### 🟢 hilltop (492) — 攻击失败
### 🟢 holly (493) — 攻击失败
### 🟢 honeycomb (494) — 攻击失败
### 🟢 horseshoe (495) — 攻击失败
### 🟢 hourglass (496) — 攻击失败
### 🟢 husk (497) — 攻击失败
### 🟢 ibis (498) — 攻击失败
### 🟢 igloo (499) — 攻击失败
### 🟢 ivy (500) — 攻击失败
### 🟢 jade (501) — 攻击失败
### 🟢 javelin (502) — 攻击失败
### 🟢 kelp (503) — 攻击失败
### 🟢 kennel (504) — 攻击失败
### 🟢 kindle (505) — 攻击失败
### 🟢 kingfisher (506) — 攻击失败
### 🟢 knapsack (507) — 修复后区分度足够
### 🟢 lagoon (508) — 攻击失败
### 🟢 latch (509) — 攻击失败
### 🟢 lava (510) — 攻击失败
### 🟢 levee (511) — 攻击失败
### 🟢 lichen (512) — 攻击失败
### 🟢 locket (513) — 攻击失败
### 🟢 loom (514) — 攻击失败
### 🟢 lynx (515) — 攻击失败
### 🟢 mango (516) — 攻击失败
### 🟢 mantle (517) — 攻击失败
### 🟢 maple (518) — 攻击失败
### 🟢 marsh (519) — 攻击失败
### 🟢 mast (520) — 攻击失败
### 🟢 moat (521) — 攻击失败
### 🟢 mortar (522) — 攻击失败
### 🟢 mosaic (523) — 攻击失败
### 🟢 mulberry (524) — 攻击失败
### 🟢 nectar (526) — 攻击失败
### 🟢 nettle (527) — 攻击失败
### 🟢 nozzle (528) — 攻击失败
### 🟢 nutmeg (529) — 攻击失败
### 🟢 oar (530) — 攻击失败
### 🟢 oasis (531) — 攻击失败
### 🟢 olive (532) — 攻击失败
### 🟢 ore (533) — 攻击失败
### 🟢 otter (534) — 攻击失败
### 🟢 pagoda (535) — 攻击失败
### 🟢 parchment (536) — 攻击失败
### 🟢 parsley (537) — 攻击失败
### 🟢 pasture (538) — 攻击失败
### 🟢 pebble (539) — 攻击失败
### 🟢 pelican (540) — 攻击失败
### 🟢 pendant (541) — 攻击失败
### 🟢 pier (542) — 攻击失败
### 🟢 pigment (543) — 攻击失败
### 🟢 carefully (544) — 攻击失败
### 🟢 accept (545) — 攻击失败
### 🟢 quite (546) — 攻击失败
### 🟢 although (548) — 攻击失败
### 🟢 eventually (551) — 攻击失败

## 统计
- 🔴 RED: 19个词需修复（涉及24个定义/imageKeyword修改）
- 🟡 YELLOW: 14个词有弱点，暂不致命
- 🟢 GREEN: 519个词攻击失败
- MISMATCH率: 19/552 = 3.4%
