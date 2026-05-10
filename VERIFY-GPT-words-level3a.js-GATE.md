# VERIFY-GPT-words-level3a.js-GATE

逐词专项审校（GPT侧）：L5 Mark模拟做题 / L6 例句反向测试 / L7 文化敏感度 / L8 学习路径验证

格式：编号 词 | L5(def/示例猜词) | L6(唯一性) | L7(文化) | L8(level/前置/顺序)

001 calculate | L5: def=懂; ex=勉强(会“math/answer”但未必想到这个词) | L6: 唯一(“use math”强指向) | L7: OK | L8: 偏低(更像L1-2常用学术动词)
002 correct | L5: def=懂; ex=勉强(能懂“fix mistakes”) | L6: 不唯一(也可选 fix/repair) | L7: OK | L8: 偏低
003 damage | L5: def=懂; ex=勉强(风暴+车窗) | L6: 不唯一(hurt/break也可) | L7: OK | L8: 偏低
004 decrease | L5: def=懂; ex=勉强(温度下降) | L6: 不唯一(drop/fall也可) | L7: OK | L8: 合适(基础学术)
005 define | L5: def=懂; ex=懂(字典+meaning) | L6: 相对唯一(字典场景很强) | L7: OK | L8: 合适
006 discuss | L5: def=懂; ex=勉强(围坐聊天) | L6: 不唯一(talk/share也可) | L7: OK | L8: 偏低
007 edit | L5: def=勉强(“improve writing”可懂); ex=勉强 | L6: 不唯一(fix/change也可) | L7: OK | L8: 合适
008 engage | L5: def=勉强(“get involved”抽象); ex=不能(不知道要选哪个词) | L6: 不唯一(join/involve也可) | L7: OK | L8: 合适但需前置：involve/interest
009 favor | L5: def=勉强(“support…over”结构偏难); ex=不能(更可能想到 prefer) | L6: 不唯一(prefer/like也可) | L7: OK | L8: 合适但建议与 prefer 对齐/区分
010 flee | L5: def=懂; ex=不能(知道“run away”但想不到 flee) | L6: 相对唯一(“danger/run away”) | L7: OK | L8: 合适但对MAP197偏难(词形陌生)
011 forgive | L5: def=懂; ex=勉强(道歉+不生气) | L6: 相对唯一(道歉场景) | L7: OK | L8: 合适
012 furnish | L5: def=勉强(需懂 furniture/supplies); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(fill/put也可) | L7: OK | L8: 偏高(更像L4-5; 前置：furniture)
013 intend | L5: def=懂; ex=不能(更可能想到 plan) | L6: 不唯一(plan/mean也可) | L7: OK | L8: 合适
014 irritate | L5: def=勉强(annoyed可能不熟); ex=不能(知道“bother”但词不出) | L6: 相对唯一(“mosquito near ear”) | L7: OK | L8: 合适但前置：annoy
015 marvel | L5: def=勉强(wonder/surprise可能不稳); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(amaze/like也可) | L7: OK | L8: 合适但对MAP197偏高
016 persuade | L5: def=懂; ex=不能(可懂“convince”但词不出) | L6: 相对唯一(“showing how responsible”) | L7: OK | L8: 合适
017 postpone | L5: def=懂; ex=不能(知道“later”但词不出) | L6: 相对唯一(天气导致改期) | L7: OK | L8: 合适
018 prove | L5: def=勉强(“really true”可懂); ex=不能(show也可) | L6: 不唯一(show/prove都通) | L7: OK | L8: 合适但需前置：true/experiment
019 provide | L5: def=懂; ex=勉强(给饭) | L6: 不唯一(give/offer也可) | L7: OK | L8: 偏低
020 punish | L5: def=懂; ex=勉强(拿走screen time) | L6: 相对唯一(“broke a rule”) | L7: OK(家庭管教语境) | L8: 合适
021 satisfy | L5: def=勉强(pleased/hunger抽象); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(fill/stop也可) | L7: OK | L8: 合适但对MAP197偏高
022 seek | L5: def=懂; ex=不能(更可能选 find/look for) | L6: 不唯一(look for/find也可) | L7: OK | L8: 合适
023 settle | L5: def=勉强(“decide/agree”可懂); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(solve/finish也可) | L7: OK | L8: 合适(多义需提示)
024 skim | L5: def=勉强(“main ideas”抽象); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(读得快+headings) | L7: OK | L8: 合适但前置：main idea
025 snatch | L5: def=懂; ex=不能(grab快但词不出) | L6: 相对唯一(seagull抢食) | L7: OK | L8: 合适
026 soar | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(鸟飞很高) | L7: OK | L8: 合适
027 startle | L5: def=勉强(suddenly/surprise OK); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(气球爆) | L7: OK | L8: 合适
028 strengthen | L5: def=懂; ex=不能(更可能想到 make stronger/ build) | L6: 不唯一(improve/build也可) | L7: OK | L8: 合适
029 terrify | L5: def=懂; ex=不能(scare badly但词不出) | L6: 相对唯一(“lion roar”) | L7: 注意(强烈恐惧词，家长可能不爱频繁) | L8: 合适但建议与 scare 区分
030 trace | L5: def=勉强(两义：follow/copy); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(follow/track也可) | L7: OK | L8: 合适但多义需更明确
031 translate | L5: def=懂; ex=勉强(语言转换) | L6: 相对唯一(Spanish→English) | L7: OK | L8: 合适
032 weaken | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(桥不安全) | L7: OK | L8: 合适
033 apparent | L5: def=勉强(figure out抽象); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(obvious/clear也可) | L7: OK | L8: 偏高(抽象形容词)
034 artificial | L5: def=懂; ex=不能(faux/fake也可) | L6: 不唯一(fake也可) | L7: OK | L8: 合适
035 automatic | L5: def=懂; ex=勉强(自动门) | L6: 相对唯一(doors open by themselves) | L7: OK | L8: 合适
036 careless | L5: def=懂; ex=勉强(字乱) | L6: 不唯一(sloppy也可) | L7: OK | L8: 偏低
037 casual | L5: def=懂; ex=勉强(jeans/T-shirt) | L6: 相对唯一(“not fancy”) | L7: OK | L8: 合适
038 central | L5: def=勉强(“most important part”抽象); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(middle/main都可) | L7: OK | L8: 合适
039 dramatic | L5: def=勉强(strong feelings); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(exciting/surprising也可) | L7: OK | L8: 合适
040 due | L5: def=懂; ex=勉强(归还日期) | L6: 不唯一(但语境较强) | L7: OK | L8: 注意多义(because of / owed)
041 eventual | L5: def=勉强(“end after long time”抽象); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(final/last也可) | L7: OK | L8: 偏高(抽象时间词)
042 excessive | L5: def=懂; ex=不能(更可能选 too much) | L6: 相对唯一(“impossible to hear”) | L7: OK | L8: 合适但对MAP197偏高
043 exotic | L5: def=勉强(faraway/ unusual); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(unusual/rare也可) | L7: OK | L8: 合适
044 favorable | L5: def=勉强(helpful/conditions); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(good/nice也可) | L7: OK | L8: 合适
045 formal | L5: def=懂; ex=勉强(穿正装) | L6: 相对唯一(suits/dresses) | L7: OK | L8: 合适
046 gracious | L5: def=勉强(especially to guests); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(kind/polite也可) | L7: OK | L8: 偏高(抽象性格词)
047 grand | L5: def=懂; ex=不能(big/large也可) | L6: 不唯一(impressive/huge也可) | L7: OK | L8: 合适
048 grave | L5: def=勉强(serious); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(serious/stern也可) | L7: OK | L8: 注意多义(坟墓/serious)
049 hasty | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(quick/rushed也可) | L7: OK | L8: 合适
050 historic | L5: def=勉强(“in history”抽象); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(famous/old也可) | L7: 注意(例句“first president”偏美式; 可换更通用) | L8: 合适
051 horizontal | L5: def=懂; ex=勉强(画线) | L6: 相对唯一(side to side line) | L7: OK | L8: 合适
052 hostile | L5: def=勉强(unfriendly/ready to fight); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(hiss/too close) | L7: OK | L8: 合适
053 ignorant | L5: def=勉强(never learned); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(didn’t know也可) | L7: 注意(对人评价有羞辱感; 建议强调“not knowing yet”) | L8: 合适但要软化语气
054 illegal | L5: def=懂; ex=勉强(steal/arrest) | L6: 相对唯一(law/arrest) | L7: 注意(涉及犯罪/逮捕; 但可接受) | L8: 合适
055 imaginary | L5: def=懂; ex=勉强(“made up friend”) | L6: 相对唯一(imaginary friend) | L7: OK | L8: 合适
056 immense | L5: def=懂; ex=不能(更可能选 huge) | L6: 不唯一(huge/enormous都可) | L7: OK | L8: 合适
057 immune | L5: def=勉强(vaccine/disease词可能难); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(protected/safe也可) | L7: OK | L8: 偏高(健康科学词)
058 inferior | L5: def=勉强; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(cheap vs expensive) | L7: OK | L8: 合适但对MAP197偏高
059 infinite | L5: def=勉强(“all time/no end”抽象); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(endless也可) | L7: OK | L8: 偏高(抽象概念)
060 influential | L5: def=勉强(change what people do); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(important/powerful也可) | L7: OK | L8: 偏高(抽象)
061 interior | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(inside也可) | L7: OK | L8: 合适
062 isolated | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(alone/far也可) | L7: OK | L8: 合适
063 legal | L5: def=勉强(law/traffic rules); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(allowed/permitted也可) | L7: OK | L8: 合适
064 legitimate | L5: def=勉强(allowed/real); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(valid/real也可) | L7: OK | L8: 偏高
065 literary | L5: def=勉强(authors/award); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(book/writing也可) | L7: OK | L8: 合适
066 logical | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(sensible/normal也可) | L7: OK | L8: 合适
067 mechanical | L5: def=勉强(moving parts/gears); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(machine-like也可) | L7: OK | L8: 合适
068 microscopic | L5: def=勉强(microscope词); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(need microscope) | L7: OK | L8: 合适但前置：microscope
069 mobile | L5: def=懂; ex=勉强(手机对比座机) | L6: 相对唯一(mobile phone) | L7: OK | L8: 合适
070 moderate | L5: def=勉强(“in between”可懂); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(comfortable/mild也可) | L7: OK | L8: 合适
071 naked | L5: def=懂; ex=勉强(“naked trees”) | L6: 相对唯一(树没叶子) | L7: 注意(词本身可能引发尴尬/家长敏感；例句已避开人体) | L8: 合适但建议在更低level出现
072 native | L5: def=勉强(origin/birth); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(belonging to也可) | L7: 注意(例句“bald eagle/北美”偏美式; 可改中国更熟悉物种) | L8: 合适
073 naval | L5: def=勉强(navy/warships); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(naval base/ships) | L7: 注意(军事场景) | L8: 偏高(领域词)
074 normal | L5: def=懂; ex=勉强(紧张正常) | L6: 不唯一(usual/typical也可) | L7: OK | L8: 合适
075 occasional | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(sometimes也可) | L7: OK | L8: 合适
076 official | L5: def=勉强(approved/announcement); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(important/real也可) | L7: OK | L8: 合适
077 original | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(first/real也可) | L7: OK | L8: 合适
078 partial | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(partial rainbow) | L7: OK | L8: 合适
079 personal | L5: def=懂; ex=勉强(diary private) | L6: 不唯一(private也可) | L7: OK | L8: 合适
080 political | L5: def=勉强(government); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(government-related也可) | L7: 注意(“political leaders/new rules”在中国语境可能让家长避开；可用更中性的“school council”) | L8: 偏高
081 portable | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(carry/handheld也可) | L7: OK | L8: 合适
082 precise | L5: def=勉强(exact/details); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(电脑指令) | L7: OK | L8: 合适但偏高
083 primitive | L5: def=勉强(early time/basic); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(old/simple也可) | L7: OK | L8: 合适
084 principal | L5: def=勉强(main/most important); ex=不能(易误解成校长) | L6: 不唯一(main/primary也可) | L7: OK | L8: 注意强歧义(校长vs主要); 对MAP197不友好
085 private | L5: def=懂; ex=勉强(私密日记) | L6: 不唯一(personal也可) | L7: OK | L8: 合适
086 probable | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(likely也可) | L7: OK | L8: 合适
087 productive | L5: def=勉强(getting a lot done); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(busy/effective也可) | L7: OK | L8: 合适
088 professional | L5: def=勉强(paid job/skill); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(expert也可) | L7: OK | L8: 合适
089 profound | L5: def=不能(meaningful/“think for days”对MAP197太抽象); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(deep/important也可) | L7: OK | L8: 偏高(更像L5)
090 prominent | L5: def=勉强(standing out); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(visible/noticeable也可) | L7: OK | L8: 偏高
091 proper | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(correct/right也可) | L7: OK | L8: 合适
092 prosperous | L5: def=不能(“having plenty/thriving”抽象); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(rich/successful也可) | L7: OK | L8: 偏高
093 radical | L5: def=勉强; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(crazy/very different也可) | L7: OK | L8: 偏高
094 reckless | L5: def=勉强(risky/safety); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(危险行为) | L7: OK | L8: 合适
095 regional | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(local/area也可) | L7: OK | L8: 合适
096 abode | L5: def=懂; ex=不能(词太古) | L6: 不唯一(home/house也可) | L7: OK | L8: 偏高/不合适(更像L5；建议用 home/house)
097 acacia | L5: def=勉强(bush/leaf); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(树名难唯一) | L7: OK | L8: 偏高(专名类；除非做主题“自然/非洲”)
098 adage | L5: def=勉强(wisdom抽象); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(“practice makes perfect”) | L7: OK | L8: 偏高
099 adrift | L5: def=勉强(steered/tied词); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(rope broke + boat) | L7: OK | L8: 偏高
100 afflict | L5: def=不能(pain/suffering抽象); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(cause/hit也可) | L7: OK | L8: 偏高
101 ajar | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(door slightly open) | L7: OK | L8: 合适
102 akin | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(similar to也可) | L7: OK | L8: 偏高
103 alcove | L5: def=勉强(set into wall); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(nook/space也可) | L7: OK | L8: 偏高
104 alms | L5: def=勉强(poor/charity); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(donation/charity也可) | L7: 注意(带宗教色彩词源；但例句中性) | L8: 偏高
105 alpine | L5: def=勉强(near high mountains); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(mountain也可) | L7: OK | L8: 偏高
106 amble | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(walk slowly也可) | L7: OK | L8: 合适但偏高(同义词多)
107 ambrosia | L5: def=不能(“food of the gods”+抽象比喻); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(delicious/tasty也可) | L7: 注意(“gods”神话元素; 部分家长不喜欢宗教/神祇词) | L8: 不合适(偏高/多义文化负担)
108 amiable | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(friendly/kind也可) | L7: OK | L8: 偏高
109 amplify | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(“make louder”) | L7: OK | L8: 合适
110 amulet | L5: def=勉强(protection/good luck); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(charm/necklace也可) | L7: 注意(护身符/好运物件，易被家长视作迷信；但可接受) | L8: 偏高(文化负担)
111 anagram | L5: def=不能(“mixing letters”+抽象任务); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(给listen/silent强线索) | L7: OK | L8: 偏高(需前置：spelling/letters)
112 angular | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(pointy/sharp也可) | L7: OK | L8: 合适
113 antiquated | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(old/outdated也可) | L7: OK | L8: 偏高
114 apex | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(top/peak也可) | L7: OK | L8: 合适
115 apprentice | L5: def=勉强(expert/skill); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(learner/trainee也可) | L7: OK | L8: 偏高
116 arbiter | L5: def=勉强(settle a fight); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(judge/decide也可) | L7: OK | L8: 偏高
117 ardor | L5: def=不能(enthusiasm/passion词); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(passion/love也可) | L7: OK | L8: 不合适(偏高)
118 aright | L5: def=懂; ex=不能(词太古) | L6: 不唯一(correctly/ right也可) | L7: OK | L8: 不合适(偏高/古词)
119 assail | L5: def=不能(attack/harsh words); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(hit/strike也可) | L7: 注意(攻击/暴力语义; 例句用风暴较好) | L8: 偏高
120 atoll | L5: def=不能(地理概念+ring/calm pool); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(island类很难唯一) | L7: OK | L8: 不合适(偏高/专门地理)
121 atone | L5: def=勉强(make up for); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(apologize/repair也可) | L7: OK | L8: 偏高
122 atrium | L5: def=不能(建筑词+glass roof); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(lobby/center hall也可) | L7: OK | L8: 偏高
123 aura | L5: def=不能(抽象“quality surround”); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(feeling/mood也可) | L7: OK | L8: 不合适(偏高/抽象)
124 awning | L5: def=勉强(block sun/rain); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(shop awning + rain) | L7: OK | L8: 偏高(名词较专)
125 babble | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(toddler + mixed words) | L7: OK | L8: 合适
126 badger | L5: def=懂; ex=不能(动词义不常见) | L6: 不唯一(beg/bug也可) | L7: OK | L8: 合适但需区分动物义
127 baffle | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(magic trick + can’t figure out) | L7: OK | L8: 合适
128 bamboo | L5: def=懂; ex=勉强(熊猫/中国线索) | L6: 相对唯一(pandas + eat) | L7: OK | L8: 偏低
129 bane | L5: def=不能(trouble/misery词); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(problem/annoyance也可) | L7: OK | L8: 不合适(偏高/古)
130 banter | L5: def=勉强(playful); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(joke/talk也可) | L7: OK | L8: 偏高
131 barbecue | L5: def=懂; ex=勉强(grill) | L6: 相对唯一(grill outdoors) | L7: OK | L8: 偏低
132 barge | L5: def=勉强(heavy loads/rivers); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(boat/ship也可) | L7: OK | L8: 偏高
133 barley | L5: def=勉强(grain plant); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(grain/wheat也可) | L7: OK | L8: 偏高(专名)
134 barnacle | L5: def=不能(sea creature + sticks); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(sea animal难唯一) | L7: OK | L8: 偏高
135 baroque | L5: def=不能(年代+艺术风格负担); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(fancy/decorated也可) | L7: OK | L8: 不合适(偏高)
136 barracks | L5: def=勉强(soldiers live); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(soldiers returned to…) | L7: 注意(军事主题) | L8: 偏高
137 bastion | L5: def=不能(抽象“last bastion”); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(only quiet place等) | L7: OK | L8: 不合适(偏高/抽象隐喻)
138 batter | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(pancake batter) | L7: OK | L8: 合适
139 bedlam | L5: def=不能(wild noise/confusion); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(hamster escaped) | L7: OK | L8: 偏高
140 belfry | L5: def=不能(建筑词); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(bell tower也可) | L7: 注意(教堂场景；家长可能介意宗教元素) | L8: 偏高
141 berth | L5: def=不能(两义+交通词); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(bunk/bed也可) | L7: OK | L8: 偏高
142 billow | L5: def=不能(swell out比喻); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(curtains + breeze) | L7: OK | L8: 偏高
143 bistro | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(cafe/restaurant也可) | L7: OK | L8: 偏高
144 bivouac | L5: def=不能(temporary camp without tents); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(camp) | L7: OK | L8: 不合适(偏高)
145 blazon | L5: def=不能(display boldly); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(“across jerseys”) | L7: OK | L8: 不合适(偏高)
146 blotch | L5: def=勉强(uneven patch); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(ink mark) | L7: OK | L8: 偏高
147 boggle | L5: def=不能(“mind can hardly take it in”抽象); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(amaze/stun也可) | L7: OK | L8: 不合适(偏高)
148 boon | L5: def=不能(helpful/welcome抽象); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(helpful thing) | L7: OK | L8: 不合适(偏高/古)
149 boulder | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(landslide blocked trail) | L7: OK | L8: 合适
150 brawn | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(strength/muscles也可) | L7: OK | L8: 偏高
151 breadth | L5: def=不能(distance from one side…句式难); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(width也可) | L7: OK | L8: 偏高
152 brim | L5: def=懂; ex=勉强(杯口) | L6: 相对唯一(filled to the brim) | L7: OK | L8: 合适
153 broach | L5: def=不能(topic for discussion抽象); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(bring up/start) | L7: OK | L8: 不合适(偏高)
154 brooch | L5: def=勉强(decorative pin); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(pin/jewel) | L7: OK | L8: 偏高
155 buccaneer | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(pirate) | L7: OK | L8: 偏高
156 buffet | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(serve themselves) | L7: OK | L8: 合适
157 buggy | L5: def=勉强(horse-drawn); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(carriage也可) | L7: OK | L8: 偏高
158 bulge | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(pockets bulged) | L7: OK | L8: 合适
159 buoyancy | L5: def=不能(ability to float抽象+名词形态); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(float) | L7: OK | L8: 不合适(偏高)
160 burgeon | L5: def=不能(develop quickly); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(grow/bloom) | L7: OK | L8: 不合适(偏高)
161 bustle | L5: def=不能(抽象“activity”); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(busy activity) | L7: OK | L8: 偏高
162 buttress | L5: def=不能(建筑专名); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(support/pillar) | L7: OK | L8: 不合适(偏高/专)
163 cache | L5: def=勉强(hidden store); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(hidden stash) | L7: OK | L8: 偏高
164 cairn | L5: def=不能(marker概念+专名); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(stone pile) | L7: OK | L8: 不合适(偏高/户外专词)
165 caldron | L5: def=勉强(big metal pot); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(witch + bubbling pot) | L7: 注意(巫婆/魔法元素；一般可接受但部分家长介意) | L8: 偏高
166 canter | L5: def=不能(马的步态专词); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(run) | L7: OK | L8: 不合适(偏高)
167 capsize | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(boat turned over) | L7: OK | L8: 合适
168 capsule | L5: def=勉强(两义); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(spacecraft/vehicle也可) | L7: OK | L8: 偏高(多义)
169 carafe | L5: def=不能(器皿专名+stopper); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(pitcher/bottle) | L7: OK | L8: 不合适(偏高)
170 chaplain | L5: def=不能(religious leader概念); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(comfort visitor) | L7: 风险(宗教岗位词；中国家长可能排斥或陌生) | L8: 不合适(偏高/文化负担)
171 char | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(toast turned black) | L7: OK | L8: 合适
172 cherub | L5: def=不能(angel概念); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(angel/baby) | L7: 风险(天使宗教元素) | L8: 不合适(偏高/文化负担)
173 cinch | L5: def=不能(习语/口语); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(“no trouble at all”) | L7: OK | L8: 偏高(习语)
174 citadel | L5: def=不能(fortress词); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(fortress/castle) | L7: OK | L8: 偏高
175 clad | L5: def=勉强(wearing/covered); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(wearing) | L7: OK | L8: 偏高
176 clatter | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(pots fell + noise) | L7: OK | L8: 合适
177 claustrophobia | L5: def=不能(长词+抽象心理); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(fear of small spaces) | L7: OK | L8: 不合适(偏高)
178 cleave | L5: def=不能(split with force); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(log + axe) | L7: 注意(斧头/暴力但可接受) | L8: 偏高
179 cleft | L5: def=不能(rock/ground crack); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(crack/opening) | L7: OK | L8: 偏高
180 clench | L5: def=勉强; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(clenched fists) | L7: OK | L8: 偏高
181 cobalt | L5: def=不能(金属/颜色+专名); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(blue paint) | L7: OK | L8: 不合适(偏高/专名)
182 coil | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(hose coiled) | L7: OK | L8: 合适
183 colander | L5: def=不能(器具专名); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(drain pasta) | L7: OK | L8: 偏高
184 collide | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(cars crashed) | L7: OK | L8: 合适
185 colonnade | L5: def=不能(建筑专名); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(row of columns) | L7: OK | L8: 不合适(偏高)
186 commode | L5: def=不能(词常见义=马桶；这里=家具抽屉，易误解); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(drawers/cabinet) | L7: 注意(可能联想到厕所词；家长/孩子尴尬) | L8: 不合适(歧义大；建议换 chest/dresser)
187 compulsion | L5: def=不能(urge/control抽象); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(need/urge) | L7: OK | L8: 不合适(偏高)
188 condiment | L5: def=勉强(ketchup/mustard可理解); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(ketchup/mustard) | L7: OK | L8: 偏高(名词较专)
189 conduit | L5: def=不能(pipe/channel/wires); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(pipe) | L7: OK | L8: 不合适(偏高)
190 confide | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(tell secret + trust) | L7: OK | L8: 合适
191 conifer | L5: def=不能(cones/leaf all year); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(tree type) | L7: OK | L8: 偏高
192 consort | L5: def=不能(王后配偶概念+词); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(partner/spouse) | L7: OK | L8: 不合适(偏高)
193 contour | L5: def=不能(outline/shape抽象); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(outline/shape) | L7: OK | L8: 偏高
194 convoy | L5: def=不能(vehicles for safety); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(group of trucks) | L7: OK | L8: 偏高
195 cornet | L5: def=不能(乐器专名); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(trumpet-like instrument) | L7: OK | L8: 偏高
196 corona | L5: def=不能(天文术语); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(eclipse + ring of light) | L7: 注意(“corona”会联想到新冠；但定义为日冕) | L8: 偏高
197 corsair | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(pirate ship) | L7: OK | L8: 偏高
198 cosmos | L5: def=不能(universe抽象); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(space/universe) | L7: OK | L8: 偏高
199 countenance | L5: def=不能(抽象+词形陌生); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(face/expression) | L7: OK | L8: 不合适(偏高)
200 cranny | L5: def=不能(narrow opening); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(mouse squeezed through crack) | L7: OK | L8: 偏高
201 cringe | L5: def=不能(uneasy/缩退抽象); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(shrink/feel embarrassed) | L7: OK | L8: 偏高
202 crock | L5: def=不能(clay pot/jar专物); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(jar/pot) | L7: OK | L8: 偏高
203 crone | L5: def=不能(贬义老女人词); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(old woman/witch) | L7: 风险(对老人不尊重、刻板印象) | L8: 不合适(偏高/语用风险)
204 crouton | L5: def=不能(食物专名); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(Caesar salad topping) | L7: OK | L8: 偏高
205 crux | L5: def=不能(抽象“most important point”); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(main point) | L7: OK | L8: 不合适(偏高/抽象)
206 crypt | L5: def=不能(地下墓室/教堂); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(tomb/underground room) | L7: 注意(死亡/埋葬+教堂元素) | L8: 不合适(偏高)
207 cuisine | L5: def=勉强(style of cooking); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(food style) | L7: OK | L8: 偏高
208 cupboard | L5: def=懂; ex=勉强(厨房柜子) | L6: 相对唯一(opened cupboard) | L7: OK | L8: 合适
209 curfew | L5: def=不能(规则词但概念可懂); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(by nine o’clock rule) | L7: OK | L8: 偏高
210 cursory | L5: def=不能(attention to detail抽象); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(quick glance) | L7: OK | L8: 不合适(偏高)
211 curtsy | L5: def=不能(文化礼节词); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(after performance) | L7: OK | L8: 偏高
212 cyclone | L5: def=勉强(storm/winds); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(hurricane/typhoon也可) | L7: OK | L8: 合适
213 dale | L5: def=不能(古词=valley); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(valley) | L7: OK | L8: 不合适(偏高/古)
214 dapper | L5: def=勉强(stylish/neatly); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(well dressed) | L7: OK | L8: 偏高
215 dapple | L5: def=不能(“patches of light”抽象); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(dappled sunlight) | L7: OK | L8: 偏高
216 daze | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(after spinning) | L7: OK | L8: 合适
217 decanter | L5: def=不能(器皿专名+stopper); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(carafe/pitcher也可) | L7: 注意(常用于酒；虽例句用水，但词联想可能不佳) | L8: 不合适(偏高)
218 decibel | L5: def=不能(计量单位); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(100 decibels + hurt ears) | L7: OK | L8: 偏高(科学量纲)
219 deft | L5: def=不能(skillful/quick); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(skillful) | L7: OK | L8: 偏高
220 dehydrate | L5: def=勉强(lose water); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(hot day + don’t drink) | L7: OK | L8: 合适
221 denture | L5: def=不能(false teeth); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(glass of water beside bed) | L7: OK | L8: 偏高(生活专词)
222 devour | L5: def=懂; ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(hungrily + less than a minute) | L7: OK | L8: 合适
223 dime | L5: def=不能(U.S. coin概念陌生); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(ten cents) | L7: 注意(美国货币文化; 中国孩子不熟) | L8: 不合适(偏高/文化不匹配)
224 din | L5: def=不能(不常用名词); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(construction site noise) | L7: OK | L8: 偏高
225 dishevel | L5: def=不能(untidy词); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(wind + messy hair) | L7: OK | L8: 偏高
226 disrepute | L5: def=不能(reputation抽象); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(bad reputation) | L7: OK | L8: 不合适(偏高)
227 dissect | L5: def=不能(study inside抽象); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(science class + flower parts) | L7: 注意(“cut apart”可能让部分孩子不适；但用花较温和) | L8: 偏高
228 distraught | L5: def=不能(upset/worried抽象); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(very upset) | L7: OK | L8: 偏高
229 ditto | L5: def=不能(口语用法); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(“I want… Ditto!”) | L7: OK | L8: 偏高(口语)
230 divulge | L5: def=不能(“tell a secret”但词形难); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 相对唯一(hidden present secret) | L7: OK | L8: 不合适(偏高)
231 nautical | L5: def=勉强(ships/sea可懂); ex=不能(词形陌生或线索不足，猜不出目标词) | L6: 不唯一(sea/ship-related) | L7: OK | L8: 偏高(领域词)
