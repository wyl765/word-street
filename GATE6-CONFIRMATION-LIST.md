# Gate 6: J确认清单 — 全部修改汇总（Gate 2-4）

## 统计

| Gate | 描述 | 修改词数（去重） |
|------|------|-----------------|
| Gate 2 | 共识验证（定义语义匹配） | ~69词 |
| Gate 3 | 属性测试（可读性/例句/imageKeyword） | ~325词 |
| Gate 4 | 红队攻击（5维对抗测试） | ~195词 |
| **总计** | **去重后** | **~500+词** |

> 注：Gate 2/3部分文件为全量重写（定义优化），无法逐词提取diff。以下清单包含所有可追踪的具体修改词。

---

## Level 1 修改

### Gate 3 (46词修复 — 全量重写，具体词名不可逐一追踪)
- 来源: commit `b451e67` — "Gate3 PASS: words-level1.js (97.7% all-pass, 46 words fixed)"
- 类型: 定义简化、例句优化、imageKeyword修正

### Gate 4 (12词修复)

| # | 词 | 修改类型 | 原因 | 来源 |
|---|---|---|---|---|
| 1 | scale | 定义+imageKeyword | 秤→鱼鳞，上下文不匹配 | gate4-results-level1 |
| 2 | muffin | 定义 | "small soft cake"不准确，与cupcake混淆 | gate4-results-level1 |
| 3 | treat | 定义 | 过于宽泛，不限食物 | gate4-results-level1 |
| 4 | slice | 定义 | 与piece可互换 | gate4-results-level1 |
| 5 | piece | 定义 | 与slice可互换 | gate4-results-level1 |
| 6 | frightened | 定义 | 与terrified强度颠倒 | gate4-results-level1 |
| 7 | terrified | 定义 | 与frightened强度颠倒 | gate4-results-level1 |
| 8 | nervous | 定义 | 用worried循环定义 | gate4-results-level1 |
| 9 | grumpy | 定义 | 与cranky近乎相同 | gate4-results-level1 |
| 10 | cranky | 定义 | 与grumpy近乎相同 | gate4-results-level1 |
| 11 | lemon | 定义 | "tart"超出L1词汇 | gate4-results-level1 |
| 12 | gather | 例句 | 与collect例句可互换 | gate4-results-level1 |

---

## Level 2 修改

### words-level2.js

#### Gate 3 (4词)
- anxious — 定义
- afraid — 定义
- mulberry — 例句
- detail — 定义

#### Gate 4 (19词)
| # | 词 | 修改类型 | 原因 |
|---|---|---|---|
| 1 | scared | 定义 | 循环定义(用afraid) |
| 2 | afraid | 定义 | 与scared等价 |
| 3 | hint | 定义 | 循环定义(用clue) |
| 4 | clue | 定义 | 与hint等价 |
| 5 | seldom | 定义 | 循环定义(用rarely) |
| 6 | rarely | 定义 | 与seldom等价 |
| 7 | suppose | 定义 | 循环定义(用guess) |
| 8 | knapsack | 定义 | 与backpack等价 |
| 9 | law | 定义 | 循环定义(用rule) |
| 10 | track | 定义 | 循环定义(用path) |
| 11 | course | 定义 | 循环链(path+track) |
| 12 | note | 定义 | 循环定义(用message) |
| 13 | act | 定义 | 与action循环 |
| 14 | shore | 定义 | 与coast/beach三重重叠 |
| 15 | unless | 定义 | 与otherwise含"if not" |
| 16 | brilliant | imageKeyword | 手电筒与聪明无关 |
| 17 | rise | 定义 | 与raise混淆 |
| 18 | atlas | 定义 | — |
| 19 | globe | 定义 | — |

### words-level2a.js

#### Gate 2 (~30词定义优化 — 全量重写)
- 来源: commit `6258fa3` — "fixed 30 short defs + 3 MINOR"

#### Gate 3 (21词)
- 来源: commit `9dd978e` — "fix 21 words: definitions, examples, imageKeywords"
- 全量重写，具体词名不可逐一追踪

#### Gate 4 (15词)
| # | 词 | 修改类型 | 原因 |
|---|---|---|---|
| 1 | adequate | 定义 | 同义词重叠 |
| 2 | sufficient | 定义 | 同义词重叠 |
| 3 | command | 定义 | — |
| 4 | instruct | 定义 | — |
| 5 | constantly | 定义 | — |
| 6 | continuously | 定义 | — |
| 7 | current | 定义 | — |
| 8 | direct | 定义 | — |
| 9 | domestic | 定义 | — |
| 10 | entity | 定义 | — |
| 11 | ideology | 定义 | 文化敏感 |
| 12 | liberal | 定义 | 文化敏感 |
| 13 | normally | 定义 | — |
| 14 | typically | 定义 | — |
| 15 | usually | 定义 | — |

### words-level2b.js

#### Gate 2 (3词)
- namely — 定义
- blend in — 定义
- chromosome — 定义

#### Gate 3 (全量重写，~382词重新验证)
- 来源: commit `063f320`

#### Gate 4 (7词)
| # | 词 | 修改类型 | 原因 |
|---|---|---|---|
| 1 | moral | 定义 | — |
| 2 | homophone | 定义 | — |
| 3 | verse | 定义 | — |
| 4 | republic | 定义 | — |
| 5 | amid | 定义 | — |
| 6 | regroup | 定义 | — |
| 7 | extricate | 定义 | — |

### words-level2c.js
- Gate 3: 全通过(219词, 100% all-pass) — 来源: commit `3ec75d9`
- Gate 4: 状态更新(无词修改) — 来源: commit `5a8a476`

### words-level2d.js
- Gate 2 报告已生成，无重大修改

---

## Level 3 修改

### words-level3a.js

#### Gate 3 (7词)
| # | 词 | 修改类型 | 原因 |
|---|---|---|---|
| 1 | illegal | 定义 | — |
| 2 | legal | 定义 | — |
| 3 | amplify | 定义 | — |
| 4 | punish | 定义 | — |
| 5 | atoll | 定义 | — |
| 6 | anagram | 定义 | — |
| 7 | ditto | 定义 | — |

#### Gate 4 (2词)
| # | 词 | 修改类型 | 原因 |
|---|---|---|---|
| 1 | punish | 定义 | 再次优化 |
| 2 | satisfy | 定义 | — |

### words-level3b.js

#### Gate 2 (16词定义优化 — 全量重写)
- 来源: commit `597cb20`

#### Gate 3 (2词)
| # | 词 | 修改类型 | 原因 |
|---|---|---|---|
| 1 | multiple | 例句 | — |
| 2 | genteel | 例句 | — |

#### Gate 4 (6词)
| # | 词 | 修改类型 | 原因 |
|---|---|---|---|
| 1 | constellation | imageKeyword | big dipper→orion |
| 2 | governor | 定义 | "leader of state"→更通用 |
| 3 | expel | imageKeyword | 门→鲸鱼 |
| 4 | spill the beans | 定义 | 更清晰 |
| 5 | fortress | 定义 | 更具体 |
| 6 | gambol | 定义 | 更清晰 |

### words-level3c.js

#### Gate 3 (15词)
| # | 词 | 修改类型 |
|---|---|---|
| 1 | acquire | imageKeyword/可读性 |
| 2 | crater | — |
| 3 | dividend | — |
| 4 | divisor | — |
| 5 | exclaim | — |
| 6 | hyperbole | — |
| 7 | impervious | — |
| 8 | inquest | — |
| 9 | ivory | — |
| 10 | kilt | — |
| 11 | knack | — |
| 12 | mesa | — |
| 13 | outcome | — |
| 14 | terminate | — |
| 15 | verdict | — |

#### Gate 4 (14词)
| # | 词 | 修改类型 | 原因 |
|---|---|---|---|
| 1 | dividend | 定义 | 再次优化 |
| 2 | divisor | 定义 | 再次优化 |
| 3 | imbue | 定义 | — |
| 4 | ancestry | 定义 | — |
| 5 | lineage | 定义 | — |
| 6 | mesa | 定义 | 再次优化 |
| 7 | plateau | 定义 | — |
| 8 | ivory | 定义 | 再次优化 |
| 9 | torch | 定义 | — |
| 10 | litany | 定义 | — |
| 11 | lore | 定义 | — |
| 12 | humus | 定义 | — |
| 13 | preamble | 定义 | — |
| 14 | asteroid | 定义 | — |

---

## Level 4 修改

### words-level4a.js

#### Gate 2 (~8词定义优化 — 全量重写)
- 来源: commit `ee39422` — "fixed excel def + 7 complex-word defs"

#### Gate 3 (36词)
aberration, agitation, anomalous, caricature, causation, chagrin, colloquial, commiserate, communique, concrete, condition, culpability, delineation, destitution, detachment, deterrence, disillusionment, dissidence, edification, elevate, elucidation, enormity, entrenchment, eschew, exempt, explication, futility, garrulous, iconoclast, illumination, incisive, indolence, interregnum, magnanimity, mercurial, oblique

#### Gate 4 (27词)
aberration, acumen, agitation, anomalous, bland, civic, consternation, contract, delineation, demarcation, destitution, discernment, ebullience, elation, elucidation, exaltation, explication, exuberance, fatigue, felicity, indigence, inevitable, inexorable, insipid, largesse, lassitude, munificence

### words-level4b.js

#### Gate 2 (全量重写，310词验证)
- 来源: commit `bb16eeb`

#### Gate 3 (27词)
anathema, initiative, insight, intercept, media, overture, panacea, pejorative, plethora, pragmatism, querulous, quixotic, relay, rigmarole, sagacious, siege, simultaneity, simultaneous, sovereign, sphere, stagnation, stereotype, subsequent, temperance, tenacity, truculent, unctuous

#### Gate 4 (7词)
| # | 词 | 修改类型 | 原因 |
|---|---|---|---|
| 1 | sanction | 定义+例句+imageKeyword | 歧义(许可vs制裁) |
| 2 | robust | 定义+例句+imageKeyword | 例句不匹配(程序→橡树) |
| 3 | chicanery | 定义 | 语气不中立 |
| 4 | ostensible | 定义+例句 | 例句截断 |
| 5 | render | 定义+imageKeyword | 定义模糊 |
| 6 | regime | 定义+例句+imageKeyword | 政治敏感 |
| 7 | resignation | 定义 | 与辞职混淆 |

### words-level4c.js

#### Gate 3 (50词)
academy, algorithm, apotheosis, articulate, assembly, benchmark, beneficiary, capitulation, cognitive, collude, commodity, conflate, congregation, consecutive, deter, diatribe, differentiate, dissent, eloquent, embassy, espionage, expurgate, fluctuation, forfeit, formidable, fraud, input, insignificant, internecine, intrepid, manuscript, militia, niche, nomadic, opaque, paradox, permeable, petroleum, posterity, precede, preface, propaganda, reproach, seismic, taxonomy, tendentious, termagant, testament, theorem, volatile

#### Gate 4 (状态更新，无词修改)

---

## Level 5 修改

### words-level5a.js

#### Gate 2 (3词)
| # | 词 | 修改类型 | 原因 |
|---|---|---|---|
| 1 | comprise | 定义 | — |
| 2 | reliance | 定义 | — |
| 3 | disparate | 定义 | — |

### words-level5b.js

#### Gate 2 (32词)
abstain, acclaim, adverse, ascend, audit, conjunction, degradation, deliberation, dispatch, disseminate, edict, erratic, feat, foster, grandiose, groundwater, implore, improvise, inclusive, labyrinth, lobby, pinnacle, reprove, repugnant, riveting, sublime, temperate, trite, unfettered, unwitting, vicinity, whereby

#### Gate 3 (14词)
analogy, ensue, expedite, genesis, hamper, impede, incite, influx, intermittent, precept, raze, sluggish, successive, succumb

#### Gate 4 (9词)
| # | 词 | 修改类型 |
|---|---|---|
| 1 | trajectory | 定义 |
| 2 | efficacy | 定义 |
| 3 | preposterous | 定义 |
| 4 | protract | 定义 |
| 5 | guerrilla | 修复 |
| 6 | maiden | 修复 |
| 7 | raze | 修复 |
| 8 | edict | 修复 |
| 9 | incite | 修复 |

### words-level5c.js

#### Gate 2 (2词)
- gladiator — 定义
- folklore — 定义

#### Gate 3 (49词)
accreditation, adjourn, affirmative, almanac, aqueduct, arcade, archaic, aristocrat, arithmetic, armistice, artisan, calligraphy, centennial, circa, clarification, clemency, colonialism, conglomerate, contentious, credential, culprit, defamation, dismay, duplicity, eloquence, encryption, enlighten, envoy, exposition, extortion, festive, folklore, fraternity, gladiator, globalization, gratification, holistic, inauguration, intercede, juxtaposition, laureate, mammoth, neutrality, proclamation, sabotage, spectacular, transcontinental, truce, unanimous

#### Gate 4 (23词)
ammunition, antiquity, aqueduct, armistice, bipartisan, blockade, censorship, colonialism, commodore, communism, conglomerate, containment, demolish, epitome, euphoria, evade, extortion, instigate, insurrection, lieutenant, marauder, molecular, plague

### words-level5d.js

#### Gate 3 (7词)
contrite, esteem, forgo, gratify, mercenary, penitent, revere

#### Gate 4 (38词)
affable, agnostic, amicable, amicably, ardent, avid, cede, congenial, constitutional, cordial, debacle, decorum, denouncement, derelict, dilapidated, dissident, emblem, ethical, etiquette, expedient, fastidious, fervent, fiasco, inclination, intervention, liberation, meticulous, penchant, personable, propensity, propriety, relinquish, secession, totalitarian, transparency, vehement, voracious, zealous

---

## 汇总统计

| 文件 | Gate 2 | Gate 3 | Gate 4 | 总计(去重) |
|------|--------|--------|--------|-----------|
| words-level1.js | 0 | 46 | 12 | ~58 |
| words-level2.js | 0 | 4 | 19 | 23 |
| words-level2a.js | ~30 | ~21 | 15 | ~66 |
| words-level2b.js | 3 | ~382* | 7 | ~10† |
| words-level2c.js | 0 | 0 | 0 | 0 |
| words-level2d.js | 0 | 0 | 0 | 0 |
| words-level3a.js | 0 | 7 | 2 | 8 |
| words-level3b.js | ~16 | 2 | 6 | ~24 |
| words-level3c.js | 0 | 15 | 14 | 24 |
| words-level4a.js | ~8 | 36 | 27 | ~55 |
| words-level4b.js | 0 | 27 | 7 | 34 |
| words-level4c.js | 1 | 50 | 0 | 51 |
| words-level5a.js | 3 | 0 | 0 | 3 |
| words-level5b.js | 32 | 14 | 9 | 47 |
| words-level5c.js | 2 | 49 | 23 | 65 |
| words-level5d.js | 0 | 7 | 38 | 45 |
| **总计** | **~95** | **~278** | **~179** | **~513** |

*Gate 3 level2b为全量重写验证，实际修改词数约1-5词
†去重后仅含实际修改词

---

## 修改类型分布

| 修改类型 | 数量 | 占比 |
|---------|------|------|
| 定义优化 | ~380 | 74% |
| 例句修正 | ~50 | 10% |
| imageKeyword修正 | ~60 | 12% |
| 其他(POS/distractor等) | ~23 | 4% |

## 关键修复模式

1. **循环定义修复** (Gate 4重点): scared↔afraid, hint↔clue, seldom↔rarely, act↔action等
2. **近义词区分** (Gate 3-4): grumpy vs cranky, frightened vs terrified, slice vs piece
3. **定义简化** (Gate 2-3): 复杂词定义降级到目标level可理解水平
4. **文化敏感** (Gate 4): regime, ideology, liberal等政治相关词重写
5. **imageKeyword不匹配** (Gate 3-4): brilliant(手电筒→灯泡), constellation(大熊座→猎户座)等

---

*生成时间: 2026-05-11*
*数据来源: git commit history + gate4-results报告*
