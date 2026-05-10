# Gate 4 Red Team Report: words-level3a.js

**File:** words-level3a.js
**Words:** 231
**Attacks:** 5-dimension (误解/猜错/文化陷阱/例句攻击/图片攻击)

---

## 🔴 RED — Attack Successful (Must Fix)

🔴 **punish** — "to make someone pay for breaking a rule"。"pay"对10岁ESL孩子意味着"付钱(pay money)"，会理解成"罚款"而非"惩罚"。Example用"taking away screen time"反而和定义矛盾——不是"pay"而是"take away"。定义误导性强。
→ 修复：改为 "to make something bad happen to someone because they broke a rule"

🔴 **satisfy** — "to give someone what they need or want"。对比同文件provide: "to give people what they need"。两个定义几乎一样。四选一测试中，孩子无法区分satisfy和provide。satisfy的核心是"enough/fulfilled"，定义没抓住。
→ 修复：改为 "to make someone feel they have enough and are pleased"

---

## 🟡 YELLOW — Weakness Found (Improvable)

🟡 **trace** — 定义混合两个含义"follow a path OR copy by drawing over lines"，例句只展示"追踪"含义。孩子学了"trace=追踪"后遇到"trace the letters"会困惑。不致命因为定义确实包含了两个含义。
🟡 **favor** — 只教动词"偏好"义。ESL孩子最常遇到的是名词"Can you do me a favor?"。缺少最高频义项。
🟡 **grave** — 只教形容词"严肃"义。10岁孩子更可能先学到"坟墓"义。测试中可能选错。
🟡 **settle** — "to decide or agree on something after talking"极度窄化。settle down/settle in/settle a place都是高频用法，只教一个义项。
🟡 **principal** — 教形容词"最重要的"义。ESL孩子几乎都先学"校长"义，看到"the principal reason"会困惑。
🟡 **naked** — 词本身对中国家长有文化敏感性。好在例句用"naked trees"、imageKeyword用"bare winter trees"巧妙回避。但家长看到词表可能有反应。
🟡 **badger** — 动词"纠缠"义。孩子搜"badger"只会看到獾(动物)的图片。imageKeyword用"begging child"解决了图片问题，但word-image断裂。
🟡 **batter** — 只教"面糊"义。"batter"在棒球(击球手)和日常(猛击)中更常见。
🟡 **buffet** — 只教"自助餐"义(buf-FAY)。"buffet"(BUF-it)="猛击"是另一个常见义。发音不同含义不同，只教一个OK但存在未来混淆。
🟡 **commode** — "furniture with drawers"是历史/文学用法。美国日常用语中commode=toilet。教这个义项可能导致实际交流误解。
🟡 **corona** — 后COVID时代"corona"强烈关联病毒。imageKeyword "solar corona"正确，但Google搜"corona"结果混杂病毒内容。
🟡 **broach/brooch** — 同文件两词发音近似，容易混淆。建议在学习时明确标注区别。
🟡 **dime** — US-specific。中国孩子没有美分概念，不知道"ten cents"有多少。定义准确但缺少文化锚点。
🟡 **crone** — "old woman"有贬义色彩。在fairy tale语境下OK但脱离语境使用会冒犯人。
🟡 **aright** — 极度古语/文学用词，现代英语几乎不用。L3学生的学习ROI很低。

---

## 🟢 GREEN — Attack Failed (No Misleading Scenario)

🟢 **calculate** — 定义清晰，例句具体，imageKeyword精准。无法构造误解场景。
🟢 **correct** — "to fix a mistake"简洁准确。虽然也有形容词义，但动词义教学OK。
🟢 **damage** — "to hurt or break something"清晰。例句冰雹场景生动，中国孩子能理解。
🟢 **decrease** — "to make something smaller or less"准确。温度例句直观。
🟢 **define** — "to explain what a word means"自指且清晰。无攻击面。
🟢 **discuss** — "to talk about something with others"清晰。例句场景适合L3。
🟢 **edit** — "to fix and improve writing"虽然窄化到writing，但对L3孩子足够。
🟢 **engage** — "to get involved in something"清晰。例句展示被动参与场景好。
🟢 **flee** — "to run away from danger"精准。兔子例句生动。
🟢 **forgive** — "to stop being angry at someone for what they did"完整抓住核心。例句场景贴切。
🟢 **furnish** — "to put furniture or supplies in a place"清晰。例句具体。
🟢 **intend** — "to plan or mean to do something"准确。例句日常化。
🟢 **irritate** — "to bother someone until they feel annoyed"精准。蚊子例句全球通用。
🟢 **marvel** — "to look at something with wonder and surprise"清晰。博物馆鲸鱼例句好。
🟢 **persuade** — "to convince someone to agree"简洁。小狗例句贴近孩子生活。
🟢 **postpone** — "to move something to a later time"完美定义。例句具体。
🟢 **prove** — "to show that something is really true"清晰。科学实验例句好。
🟢 **provide** — "to give people what they need"清晰。Food bank例句有教育意义。
🟢 **seek** — "to try to find or look for something"准确。小狗躲雨例句生动。
🟢 **skim** — "to read quickly looking for the main ideas"精准。例句展示学习场景。
🟢 **snatch** — "to grab something fast"清晰。海鸥例句生动有趣。
🟢 **soar** — "to fly high up in the sky"优美准确。老鹰例句画面感强。
🟢 **startle** — "to surprise someone suddenly"清晰。气球例句具体。
🟢 **strengthen** — "to become or make something stronger"完整。健康例句积极。
🟢 **terrify** — "to scare someone very badly"清晰。狮子例句有冲击力。
🟢 **translate** — "to change words from one language to another"精准。西班牙语例句贴切ESL场景。
🟢 **weaken** — "to make something less strong"清晰。木桥例句有画面感。
🟢 **apparent** — "easy to notice or figure out"准确。打哈欠例句生活化。
🟢 **artificial** — "made by people, not found in nature"完美。丝绸花例句对比强。
🟢 **automatic** — "working by itself without a person doing it"清晰。超市门例句全球通用。
🟢 **careless** — "not paying attention, making mistakes"准确。messy writing例句直观。
🟢 **casual** — "relaxed and not fancy"清晰。派对穿衣例句好。
🟢 **central** — "in the middle or most important part"准确。公园喷泉例句有画面感。
🟢 **dramatic** — "exciting and full of strong feelings"清晰。英雄救人例句吸引孩子。
🟢 **due** — "expected at a certain time"准确。图书馆例句实用。
🟢 **eventual** — "happening at the end after a long time"清晰。拼写比赛例句励志。
🟢 **excessive** — "way too much, more than needed"清晰。建筑噪音例句具体。
🟢 **exotic** — "unusual and from a faraway place"准确。热带鸟例句画面感强。
🟢 **favorable** — "good or helpful for what you want"清晰。天气例句自然。
🟢 **formal** — "following strict rules or looking very fancy"准确。正装晚宴例句好。
🟢 **gracious** — "kind and polite, especially to guests"精准。待客例句完整。
🟢 **grand** — "large and impressive"清晰。楼梯例句壮观。
🟢 **hasty** — "done too fast without thinking carefully"准确。不吃早餐例句贴切。
🟢 **historic** — "very important in history, famous from the past"清晰。历史建筑例句好。
🟢 **horizontal** — "going from side to side, flat like the ground"准确。画线例句可操作。
🟢 **hostile** — "very unfriendly, ready to fight"清晰。猫嘶叫例句生动。
🟢 **ignorant** — "not knowing about something because you never learned it"好定义，去除了贬义色彩。新生例句消解负面感。
🟢 **illegal** — "breaking the law"清晰。偷窃例句明确。
🟢 **imaginary** — "made up in your mind, not real"完美。紫色龙朋友例句吸引孩子。
🟢 **immense** — "extremely large, huge"清晰。蓝鲸心脏例句震撼。
🟢 **immune** — "protected from getting sick"清晰。疫苗例句科学准确。
🟢 **inferior** — "not as good as something else"准确。油漆对比例句好。
🟢 **infinite** — "going on for all time, having no end"准确。星空例句有哲学感。
🟢 **influential** — "having the power to change what people think or do"完整。教师例句暖心。
🟢 **interior** — "the inside part of something"清晰。洞穴例句对比好。
🟢 **isolated** — "alone and far away from others"准确。山间小屋例句有画面感。
🟢 **legal** — "following the rules of the law"清晰。骑车例句实用。
🟢 **legitimate** — "real and allowed, following the rules"准确。公交坏了例句接地气。
🟢 **literary** — "about books, authors, and writing"清晰。写作奖例句具体。
🟢 **logical** — "making sense, following clear thinking"准确。穿衣吃早餐例句简洁。
🟢 **mechanical** — "made with moving parts like a machine"清晰。钟表齿轮例句好。
🟢 **microscopic** — "so tiny you need a special tool to see it"精准。池塘水例句科学。
🟢 **mobile** — "able to move around with ease"清晰。手机例句现代化。
🟢 **moderate** — "not too much and not too little"准确。70度例句具体。
🟢 **native** — "belonging to a place by birth or origin"清晰。白头鹰例句地理化。
🟢 **naval** — "about warships and the navy"清晰。可能和navel混淆但这是拼写问题非定义问题。
🟢 **normal** — "usual and expected, nothing strange"准确。新学校紧张例句暖心。
🟢 **occasional** — "happening sometimes but not often"清晰。猫头鹰例句有氛围。
🟢 **official** — "approved by people in charge"准确。校长广播例句好。
🟢 **original** — "the first one, not a copy"清晰。原画对比例句好。
🟢 **partial** — "not complete, only part of the whole"准确。半截彩虹例句有画面感。
🟢 **personal** — "belonging to one person, private"清晰。日记例句贴切。
🟢 **political** — "about government and how a country is run"中性准确。不涉及敏感内容。
🟢 **portable** — "easy to carry from place to place"清晰。便携风扇例句实用。
🟢 **precise** — "very exact and careful about details"准确。电脑代码例句好。
🟢 **primitive** — "from a very early time, simple and basic"清晰。石器工具例句好。
🟢 **private** — "just for you, not for others"清晰。日记例句和personal相近但可区分。
🟢 **probable** — "likely to happen or be true"准确。考试例句激励学习。
🟢 **productive** — "getting a lot done in a good way"清晰。下午三件事例句具体。
🟢 **professional** — "doing something as a paid job with skill"完整。蛋糕城堡例句吸引孩子。
🟢 **profound** — "very deep and meaningful"清晰。书本感悟例句好。
🟢 **prominent** — "easy to notice, standing out"准确。红色谷仓例句有画面感。
🟢 **proper** — "correct and following the right way"清晰。握铅笔例句可操作。
🟢 **prosperous** — "doing well and having plenty"清晰。农场例句积极。
🟢 **radical** — "very different from what is normal"准确。紫色学校例句有趣。
🟢 **reckless** — "doing risky things without caring about safety"清晰。单手骑车例句警示。
🟢 **regional** — "from or about one specific area"准确。美食节例句好。
🟢 **abode** — "a place where someone lives"清晰。小屋例句温馨。
🟢 **acacia** — "a tree or bush with small leaves found in warm places"准确。长颈鹿例句好。
🟢 **adage** — "an old, well-known saying that shares wisdom"清晰。"practice makes perfect"例句完美。
🟢 **adrift** — "floating on water without being tied or steered"精准。断绳小船例句有画面感。
🟢 **afflict** — "to cause pain or suffering"清晰。感冒缺课例句贴切。
🟢 **ajar** — "slightly open"完美简洁。猫进出例句可爱。
🟢 **akin** — "similar to something else"清晰。画画和绘画例句好。
🟢 **alcove** — "a small area set into a wall or room"准确。窗边阅读角例句温馨。
🟢 **alms** — "money or food given to help poor people"清晰。慈善例句有教育意义。
🟢 **alpine** — "found in or near high mountains"准确。高山花朵例句美丽。
🟢 **amble** — "to walk slowly and in a relaxed way"清晰。公园散步看鸭子例句好。
🟢 **ambrosia** — "food that tastes wonderful, or the food of the gods"两义兼顾。水果沙拉例句亲切。
🟢 **amiable** — "friendly and pleasant"清晰。微笑店主例句好。
🟢 **amplify** — "to make a sound or signal louder or stronger"准确。音响例句实用。
🟢 **amulet** — "a small object worn for protection or good luck"清晰。中国文化也有护身符，无隔阂。
🟢 **anagram** — "a word made by mixing up the letters of another word"精准。listen/silent例句完美。
🟢 **angular** — "having sharp corners or angles"清晰。建筑例句好。
🟢 **antiquated** — "very old and no longer useful"准确。慢电脑例句孩子能共鸣。
🟢 **apex** — "the very top or highest point"清晰。登山例句经典。
🟢 **apprentice** — "a person learning a skill from an expert"准确。面包师例句好。
🟢 **arbiter** — "a person chosen to settle a fight"清晰。老师调解例句贴切校园。
🟢 **ardor** — "strong enthusiasm or passion"清晰。练钢琴例句好。
🟢 **assail** — "to attack someone with force or harsh words"清晰。暴风雨例句有力。
🟢 **atoll** — "an island shaped like a ring around a calm pool"准确。白沙蓝水例句有画面感。
🟢 **atone** — "to do something good to make up for a mistake"清晰。修花瓶买花例句好。
🟢 **atrium** — "a large open space inside a building"准确。酒店例句好。
🟢 **aura** — "a feeling or quality that seems to surround a person or place"清晰。神秘图书馆例句好。
🟢 **awning** — "a sheet of material over a door or window"准确。躲雨例句实用。
🟢 **babble** — "to talk quickly about things that do not make sense"清晰。幼儿例句可爱。
🟢 **baffle** — "to confuse someone completely"准确。魔术例句吸引孩子。
🟢 **bamboo** — "a tall, strong grass with hollow stems"清晰。中国孩子最熟悉不过。
🟢 **bane** — "something that causes great trouble"准确。蚊子露营例句共鸣强。
🟢 **banter** — "playful, friendly talk between people"清晰。朋友开玩笑例句好。
🟢 **barbecue** — "cooking food over a fire or grill outdoors"准确。中国烧烤文化相通。
🟢 **barge** — "a wide, flat boat used to carry heavy loads on rivers"清晰。运粮例句好。
🟢 **barley** — "a grain plant used to make bread, soup, and animal feed"准确。大麦丰收例句好。
🟢 **barnacle** — "a small sea creature that sticks to rocks and ship bottoms"清晰。码头例句好。
🟢 **baroque** — "a very fancy, decorated style of art from the 1600s and 1700s"清晰。金色宫殿例句壮观。
🟢 **barracks** — "buildings where soldiers live"清晰。训练后回营例句好。
🟢 **bastion** — "strong place that protects something important"清晰。图书馆比喻例句巧妙。
🟢 **bedlam** — "a scene of wild noise and confusion"清晰。仓鼠逃跑例句有趣。
🟢 **belfry** — "the part of a tower where bells hang"清晰。教堂钟楼例句好。
🟢 **berth** — "a bed on a ship or train"准确。火车上铺例句有画面感。
🟢 **billow** — "to swell out like a large wave or cloud"优美。窗帘飘动例句好。
🟢 **bistro** — "a small, casual restaurant"清晰。汤和三明治例句亲切。
🟢 **bivouac** — "a temporary camp without tents"准确。星空露营例句好。
🟢 **blazon** — "to display something boldly"清晰。球队队名例句好。
🟢 **blotch** — "an uneven patch or mark"准确。墨水渍例句具体。
🟢 **boggle** — "to be so amazed that your mind can hardly take it in"清晰。星空例句哲学化。
🟢 **boon** — "something very helpful or welcome"清晰。新公交线例句实用。
🟢 **boulder** — "a very large rock"清晰。山体滑坡挡路例句有画面感。
🟢 **brawn** — "physical strength and muscles"清晰。搬钢琴例句好。
🟢 **breadth** — "the distance from one side to the other"准确。宽河例句好。
🟢 **brim** — "the top edge of a cup or the edge of a hat"清晰。满杯热可可例句好。
🟢 **broach** — "to bring up a topic for discussion"清晰。晚餐讨论小狗例句好。和brooch发音不同(/broʊtʃ/ vs /broʊtʃ/)，但拼写相近。
🟢 **brooch** — "a decorative pin worn on clothing"清晰。蝴蝶胸针例句好。
🟢 **buccaneer** — "a pirate, especially one from long ago"清晰。海盗寻宝例句吸引孩子。
🟢 **buggy** — "a small, light vehicle pulled by a horse"清晰。乡间马车例句有画面感。
🟢 **bulge** — "to swell outward"清晰。口袋塞满橡果例句有趣。
🟢 **buoyancy** — "the ability to float in water or air"准确。救生衣例句实用。
🟢 **burgeon** — "to grow or develop quickly"优美。春雨后花开例句好。
🟢 **bustle** — "busy, noisy activity"清晰。市场熙攘例句好。
🟢 **buttress** — "a stone or brick support built against a wall"准确。大教堂例句好。
🟢 **cache** — "a hidden store of things"清晰。松鼠藏橡果例句可爱。
🟢 **cairn** — "a pile of stones used as a marker"准确。徒步路标例句实用。
🟢 **caldron** — "a large metal pot used for cooking over a fire"清晰。童话女巫例句经典。
🟢 **canter** — "a smooth run by a horse, faster than a trot but slower than a gallop"完整。草地骑马例句好。
🟢 **capsize** — "to turn over in the water"清晰。帆船翻覆例句有画面感。
🟢 **capsule** — "a small sealed container"清晰。太空舱例句吸引孩子。
🟢 **carafe** — "a wide-mouth glass bottle for serving water or juice"准确。早餐橙汁例句好。
🟢 **chaplain** — "a religious leader who works in a hospital, school, or army"准确。医院探访例句温暖。
🟢 **char** — "to burn something until it turns black"清晰。烤焦面包例句生活化。
🟢 **cherub** — "a small angel, often shown as a chubby baby with wings"清晰。绘画例句好。
🟢 **cinch** — "something that is very easy to do"清晰。拼写测试例句好。
🟢 **citadel** — "a strong fortress built to protect a city"清晰。山顶城堡例句壮观。
🟢 **clad** — "wearing or covered with something"清晰。骑士银甲例句有画面感。
🟢 **clatter** — "a loud rattling noise"清晰。锅碗掉落例句生动。
🟢 **claustrophobia** — "a fear of being in small, closed spaces"准确。电梯例句具体。
🟢 **cleave** — "to split something apart with force"清晰。伐木例句有力。
🟢 **cleft** — "a narrow crack or opening in rock"准确。石墙长植物例句好。
🟢 **clench** — "to close tightly, like a fist or teeth"清晰。赛前握拳例句好。
🟢 **cobalt** — "a bright blue color, or a hard shiny metal"清晰。蓝色颜料例句好。
🟢 **coil** — "to wind into circles or rings"清晰。水管盘好例句好。
🟢 **colander** — "a bowl with holes used to drain water from food"准确。沥面条例句具体。
🟢 **collide** — "to crash into something or each other with force"清晰。玩具车例句有趣。
🟢 **colonnade** — "a row of columns holding up a roof"准确。博物馆柱廊例句好。
🟢 **compulsion** — "a strong urge to do something that is hard to control"清晰。反复检查书包例句好。
🟢 **condiment** — "something added to food for extra flavor"清晰。番茄酱芥末例句好。中国有酱油醋等同类概念。
🟢 **conduit** — "a pipe or channel that carries water or wires"准确。地下管道例句好。
🟢 **confide** — "to tell someone a secret because you trust them"清晰。好朋友例句温暖。
🟢 **conifer** — "a tree that has cones and keeps its leaves all year"准确。松柏例句好。
🟢 **consort** — "a partner, especially of a king or queen"清晰。皇室例句好。
🟢 **contour** — "the outline or shape of something"清晰。山形轮廓例句有画面感。
🟢 **convoy** — "a group of vehicles traveling together for safety"准确。卡车运物资例句好。
🟢 **cornet** — "a small brass instrument similar to a trumpet"清晰。校园音乐会例句好。
🟢 **corsair** — "a pirate or a pirate ship"清晰。黑旗追商船例句吸引孩子。
🟢 **cosmos** — "the universe and everything in it"清晰。望远镜探索例句好。
🟢 **countenance** — "a person's face or facial expression"清晰。开朗面容例句好。
🟢 **cranny** — "a small, narrow opening or crack"准确。老鼠钻墙缝例句好。
🟢 **cringe** — "to pull back or shrink away because you feel scared or uneasy"清晰。被叫名字例句好。现代slang义("尴尬")没纳入但L3不需要。
🟢 **crock** — "a thick pot or jar made of clay"清晰。泡菜坛例句好。
🟢 **crouton** — "a small cube of toasted bread put on soup or salad"准确。凯撒沙拉例句好。
🟢 **crux** — "the most important point of a problem"清晰。课间长短争论例句好。
🟢 **crypt** — "a room below the ground, often beneath a church"准确。地下墓室例句好。
🟢 **cuisine** — "a style of cooking from a certain place"清晰。日本料理例句好。
🟢 **cupboard** — "a piece of furniture with doors, used to store things"准确。橱柜找饼干例句生活化。
🟢 **curfew** — "a time when people must be indoors"清晰。露营营规例句好。
🟢 **cursory** — "done quickly without much attention"准确。草草看作业例句贴切。
🟢 **curtsy** — "a polite bow made by bending the knees"清晰。舞台表演例句好。
🟢 **cyclone** — "a powerful spinning storm with strong winds"准确。海岸风暴例句有力。
🟢 **dale** — "a wide valley"清晰。绿谷牧羊例句优美。
🟢 **dapper** — "dressed neatly and looking stylish"清晰。西装领结例句好。
🟢 **dapple** — "patches of color or light"优美。树荫光斑例句有画面感。
🟢 **daze** — "a state of confusion or surprise"清晰。转圈晕倒例句有趣。
🟢 **decanter** — "an elegant glass bottle with a stopper"清晰。早餐倒水例句好。
🟢 **decibel** — "a unit used to measure how loud a sound is"准确。摇滚音乐会例句好。
🟢 **deft** — "skillful and quick with the hands"清晰。魔术师洗牌例句好。
🟢 **dehydrate** — "to lose water or dry out"清晰。热天喝水例句实用。
🟢 **denture** — "a set of false teeth"清晰。爷爷例句好。
🟢 **devour** — "to eat something quickly and hungrily"清晰。饿狗例句生动。
🟢 **din** — "a loud, unpleasant noise that goes on and on"准确。工地噪音例句好。
🟢 **dishevel** — "to make hair or clothing messy"清晰。大风吹乱头发例句好。
🟢 **disrepute** — "a bad reputation"清晰。餐厅差评例句具体。
🟢 **dissect** — "to cut apart with care to study the inside"准确。解剖花朵例句好（用花不用动物）。
🟢 **distraught** — "very upset and worried"清晰。找不到小猫例句好。
🟢 **ditto** — "the same thing again"清晰。冰淇淋例句直观。
🟢 **divulge** — "to tell a secret"清晰。生日礼物例句好。
🟢 **nautical** — "about ships, sailors, and the sea"清晰。航海图例句好。

---

## Summary

| Severity | Count | Rate |
|----------|-------|------|
| 🔴 Red | 2 | 0.87% |
| 🟡 Yellow | 15 | 6.49% |
| 🟢 Green | 214 | 92.64% |

**MISMATCH率 (🔴): 0.87% < 5% → 修复后可PASS**

## Fixes Required

1. **punish**: "to make someone pay for breaking a rule" → "to make something bad happen to someone because they broke a rule"
2. **satisfy**: "to give someone what they need or want" → "to make someone feel they have enough and are pleased"
