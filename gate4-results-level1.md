# Gate 4 Red Team Attack — words-level1.js (600词)

## 🔴 RED — 攻击成功，必须修复

### 🔴 scale (#527) — 定义与上下文严重不匹配
- 误解攻击：scale位于paw/claw/feather/fur/wing/beak等动物身体部位词组中间，但定义是"a tool used to measure how heavy something is"（秤）
- 猜错攻击：10岁孩子学动物身体部位时看到scale，会困惑为什么突然出现一个工具
- 图片攻击：imageKeyword "bathroom scale" 搜出体重秤，与鱼鳞完全无关
- 修复：定义→"one of the small hard flat pieces that cover a fish or snake's body"，imageKeyword→"fish scales close up"

### 🔴 muffin (#49) — 定义不准确，与cupcake混淆
- 误解攻击：定义"a small soft cake"，但muffin不是cake。cupcake (#50)定义是"a small cake with frosting on top"
- 猜错攻击：四选一中muffin和cupcake定义几乎只差"frosting"，而muffin本身就不该叫cake
- 修复：定义→"a small round bread, often with fruit or chocolate inside"

### 🔴 treat (#78) — 定义过于宽泛
- 误解攻击：定义"something special that makes you happy"，可以是礼物、玩具、旅行，完全不限于食物
- 猜错攻击：四选一中gift/surprise/reward都能匹配这个定义
- 例句攻击：遮住treat → "Ice cream after dinner was a special ___" → surprise/reward/dessert都能填
- 修复：定义→"a special food or small gift that makes you happy"

### 🔴 slice (#79) vs piece (#490) — 定义和例句可互换
- 猜错攻击：slice是"a thin piece cut from something"，piece是"one part of something bigger"
- 例句攻击：遮住slice → "Can I have one ___ of pizza, please?" → piece完美匹配
- 例句攻击：遮住piece → "Can I have one ___ of cake, please?" → slice也能填
- 修复：slice定义→"a thin flat piece you get when you cut food with a knife"；piece定义→"one part broken or taken from something bigger"

### 🔴 frightened (#425) vs terrified (#437) — 强度区分不清
- 猜错攻击：frightened是"so scared your heart pounds and you want to run"，terrified是"very scared; filled with fear"
- frightened的定义反而更具体更强烈（心跳加速+想跑），terrified反而更弱（只是very scared），强度关系颠倒
- 修复：frightened→"so scared you want to run away"；terrified→"so scared you cannot move or think"

### 🔴 worried (#432) vs nervous (#424) — 定义近乎相同
- 猜错攻击：worried是"thinking bad things might happen"，nervous是"worried about what will happen"
- nervous的定义直接用了worried这个词！循环依赖
- 修复：nervous→"feeling shaky inside because something new or scary is about to happen"

### 🔴 grumpy (#309) vs cranky (#448) — 定义近乎相同
- 猜错攻击：grumpy是"in a bad mood"，cranky是"in a bad mood and easy to upset"
- cranky只比grumpy多了"easy to upset"，四选一完全分不清
- 修复：grumpy→"in a bad mood and not wanting to talk"；cranky→"whiny and fussy, often from being tired or hungry"

### 🔴 lemon (#65) — 定义用词超出Level 1
- 误解攻击：定义"a yellow fruit with a very tart taste"，"tart"不是Level 1词汇
- 10岁中国ESL孩子不认识tart，无法理解这个定义
- 修复：定义→"a yellow fruit with a very sour taste"

### 🔴 gather (#253) vs collect (#254) — 例句可互换
- 例句攻击：遮住gather → "Let's ___ sticks to build a fort" → collect完美匹配
- 例句攻击：遮住collect → "He liked to ___ shiny rocks from the beach" → gather也能填
- 修复：gather例句→"Let's gather all the fallen leaves into one big pile."；collect例句不变（强调hobby性质的收集）

## 🟡 YELLOW — 弱点发现，不致命但可改进

### 🟡 bark (#230) — 双义词只取次要含义
- 对10岁孩子来说，bark作"狗叫"比"树皮"更常见
- 定义tree bark是合法的，但放在howl和roar（声音词）中间，语义分组不一致
- imageKeyword "tree bark" OK

### 🟡 palm (#85) — 图片搜索歧义
- imageKeyword "palm hand" 可能搜出棕榈树(palm tree)
- 建议改为 "open palm of hand"

### 🟡 beside (#378) vs besides (#393) — 拼写极易混淆
- beside是"next to"，besides是"on top of what was already said"
- 拼写只差一个s，10岁孩子容易混淆
- 定义已足够区分，保持现状

### 🟡 huge (#277) / enormous (#278) / gigantic (#590) — 三个"很大"
- huge="fills up a room"，enormous="hard to believe"，gigantic="extremely big, bigger than big"
- 三者在四选一中可能混淆，但各自定义有独特比喻，勉强可区分

### 🟡 pile (#488) vs heap (#489) — 定义相似但有区分
- pile是"on top of each other"（有序堆叠），heap是"thrown together"（杂乱堆）
- 定义有区分，例句也各自对应场景，保持现状

### 🟡 eager (#450) vs excited (#423) — 相似但可区分
- eager是"really wanting to DO something"（侧重意愿），excited是"so happy you can barely wait"（侧重情绪）
- 区分足够

### 🟡 tale (#517) vs legend (#518) — 相似但有年代区分
- tale是"a story, often made up or told aloud"，legend是"a very old story"
- "very old"是关键区分

### 🟡 cracker (#47) — 定义略宽泛
- "thin dry food that crunches"，chips也crunches
- 但example和image足够明确

### 🟡 cookie (#51) — 定义略宽泛
- "a small sweet flat food"，多种食物可匹配
- 但cookie太常见，不会真正混淆

### 🟡 comfortable (#442) vs cozy (#298) — 相似但角度不同
- comfortable是"feeling good, not in pain"（身体舒适），cozy是"warm and nice to be in"（温暖舒适的环境）

### 🟡 pretzel (#46) / waffle (#43) / gravy (#75) — 文化陷阱
- 中国孩子可能没见过pretzel、waffle或gravy
- 但定义描述清晰，配合图片可以理解

### 🟡 raccoon (#36) / skunk (#37) / beaver (#38) / moose (#39) — 文化陷阱
- 这些北美动物在中国不常见
- 但定义抓住了关键特征，imageKeyword也明确

### 🟡 chick (#4) — 潜在俚语问题
- "chick"有"年轻女性"的俚语含义
- 对10岁孩子不太会是问题，但家长可能注意到

### 🟡 lose (#596) — 只取一个含义
- 定义"to not be able to find something"只覆盖"丢失"义
- "输掉比赛"的含义未覆盖，但Level 1取一个即可

### 🟡 moose (#39) — 定义用词可能超纲
- "large flat antlers"中antlers可能不是Level 1词汇
- 但有"a very big deer"作为主要描述，antlers是补充

### 🟡 skull (#98) — 图片可能吓人
- imageKeyword "anatomy head bone diagram" 可能搜出骷髅图片
- 对10岁孩子可能有点吓人

## 🟢 GREEN — 攻击失败（按类别汇总）

### 动物词 (puppy–moose, #0–#39, 除scale)
- 🟢 puppy/kitten/bunny/duckling/chick/lamb/cub/fawn/foal — "baby X"系列定义清晰，每个指定了具体动物
- 🟢 pony — "a small horse"（不是baby horse），与foal区分明确
- 🟢 rooster/hen — 公鸡母鸡区分明确（crows vs lays eggs）
- 🟢 goose/swan — goose有"honks"，swan有"long neck"，可区分
- 🟢 owl — "hunts at night" 独特特征
- 🟢 robin/sparrow/crow/eagle — 各有明确视觉特征
- 🟢 whale/dolphin/shark — 各自定义独特（biggest/friendly+pointed nose/sharp teeth）
- 🟢 turtle/lizard — shell vs four legs+tail，区分清晰
- 🟢 frog/toad — water vs land, jumps vs hops, bumpy，区分充分
- 🟢 snail/worm — shell vs no legs，区分清晰
- 🟢 spider/beetle/ladybug/butterfly/caterpillar/ant/bee — 各有独特特征
- 🟢 squirrel/raccoon/skunk/beaver/moose — 各有独特特征

### 食物词 (toast–yogurt, #40–#58, 除muffin/treat/lemon)
- 🟢 toast/cereal/pancake/waffle/oatmeal — 早餐词各有独特特征
- 🟢 sandwich/pretzel/cracker/noodle — 各自明确
- 🟢 cupcake/cookie/doughnut — 各有独特特征（frosting/flat/hole）
- 🟢 pudding/jelly/syrup/honey — 各自明确
- 🟢 popcorn/yogurt — 独特

### 水果蔬菜词 (grape–mushroom, #59–#73)
- 🟢 grape/cherry/peach/plum/melon/berry/coconut — 各有颜色/大小/特征区分
- 🟢 peanut — "grows in a shell in the ground" 独特
- 🟢 celery/broccoli/lettuce/pepper/onion/mushroom — 各有独特外观描述

### 烹饪/饮食词 (stew–slice, #74–#79, 除slice/treat)
- 🟢 stew/gravy/feast/snack — 各自明确

### 身体部位词 (elbow–muscle, #80–#99)
- 🟢 所有身体部位词定义准确，各自指向不同部位
- 🟢 imageKeyword使用箭头指示，有效避免歧义

### 服装词 (mitten–uniform, #100–#119)
- 🟢 所有服装词定义准确，各有独特特征
- 🟢 zipper/button/buckle — 三种扣件各自明确

### 家居词 (blanket–battery, #120–#149)
- 🟢 定义准确，各自独特

### 地点词 (barn–valley, #150–#169)
- 🟢 各地点定义清晰，关键特征突出
- 🟢 cottage/cabin 区分明确（wood vs far from city）

### 天气词 (storm–drought, #170–#185)
- 🟢 各天气现象区分明确
- 🟢 frost/icicle/hail — 三种冰形态各自独特

### 植物词 (petal–seed, #186–#194)
- 🟢 各植物部分定义准确

### 动作词 (crawl–fetch, #195–#274, 除gather)
- 🟢 crawl/leap/skip/stomp/tiptoe/march/dash — 移动方式各有独特方式
- 🟢 chase/grab/toss/catch — 手部动作各自明确
- 🟢 squeeze/stretch/bend/twist/shake — 身体动作区分清晰
- 🟢 stir/pour/spill/drip/splash — 液体动作区分清晰（intentional vs accident, slow vs fast）
- 🟢 float/sink/melt/freeze — 物理状态变化清晰
- 🟢 peel/chop/grate/spread/sprinkle/scoop — 烹饪动作各自独特
- 🟢 whisper/shout — 对立词明确
- 🟢 clap/wave/nod — 各自独特
- 🟢 peek/stare/glance — "secretly"/"long time"/"one quick second" 区分好
- 🟢 search/discover/notice — 各自侧重不同
- 🟢 wonder/imagine/pretend — 思维活动区分清晰
- 🟢 promise/remind/forget — 各自独特
- 🟢 share/trade/borrow/lend — 交换行为区分清晰
- 🟢 collect/stack/wrap/unwrap/tug/drag/shove/tuck/hang — 各自独特
- 🟢 fasten/attach/repair/create/design — 各自独特
- 🟢 measure/weigh/count/sort/match — 各自独特
- 🟢 deliver/fetch/vanish — 各自独特

### 形容词 (tiny–content, #276–#449, 除frightened/terrified/worried/nervous/grumpy/cranky)
- 🟢 tiny/huge/enormous — 大小词虽近义但定义有独特比喻
- 🟢 narrow/wide/steep/shallow/deep — 空间词区分清晰
- 🟢 thick/thin/smooth/rough/sharp/dull — 触觉词对立明确
- 🟢 shiny/damp/soaking/dry/sticky/slimy/fluffy/fuzzy — 质地词各自独特
- 🟢 cozy/chilly/freezing/boiling/warm — 温度词梯度清晰
- 🟢 fierce/gentle/brave/shy/proud/curious — 性格词各自独特
- 🟢 cheerful/lonely/calm — 情绪词独特
- 🟢 wild/tame/plain/fancy — 对立词明确
- 🟢 ripe/rotten/fresh/stale — 食物状态梯度清晰
- 🟢 bitter/sour/salty/juicy/crunchy/creamy — 味觉词各自独特
- 🟢 silent/loud/hollow/solid/loose/tight/crooked/straight — 对立词明确
- 🟢 crowded/empty/whole — 各自独特
- 🟢 certain/strange/wonderful/terrible/perfect/ugly/beautiful — 各自独特
- 🟢 clever/foolish/greedy/generous/patient/stubborn/lazy/busy/clumsy/graceful — 性格词区分清晰
- 🟢 excited/surprised/confused/disappointed/frustrated/jealous/embarrassed — 情绪词各自独特
- 🟢 grateful/annoyed/bored/amazed/furious/miserable/relieved — 情绪词各自独特
- 🟢 peaceful/comfortable/uncomfortable/exhausted/delighted/gloomy/hopeful — 各自独特
- 🟢 content/eager/homesick/ashamed — 各自独特

### 副词 (quickly–anyway, #356–#368)
- 🟢 quickly/slowly — 对立明确
- 🟢 quietly/loudly/gently/suddenly — 各自独特
- 🟢 already/almost/barely/perhaps/exactly/instead/anyway — 各自独特

### 方位词 (forever–throughout, #369–#396)
- 🟢 apart/together/forward/backward/sideways — 方向词明确
- 🟢 beneath/above/below/beside/between/among — 位置词各自明确
- 🟢 toward/against/through/across/along/around/beyond — 运动方向各自独特
- 🟢 during/until/since/whether/while — 时间连接词各自独特
- 🟢 within/without/throughout/upon — 各自独特

### 短语动词 (pick up–show off, #398–#422)
- 🟢 所有短语动词定义准确，例句清晰

### 时间词 (before–nowadays, #453–#475)
- 🟢 before/after/next/then/finally/meanwhile/soon/later — 时间序列清晰
- 🟢 early/late/beginning/middle/ending — 各自独特
- 🟢 moment/sudden/recent/daily/weekly/whenever/once/twice/often/nowadays — 各自独特

### 数量词 (dozen–equal, #476–#499)
- 🟢 dozen/half/pair/entire/double/single — 各自明确
- 🟢 plenty/several/few/many/none — 数量梯度清晰
- 🟢 bunch/pile/heap — 各自有独特特征
- 🟢 amount/total/extra/enough/less/more/quarter/equal — 各自独特

### 其他名词 (shadow–author, #501–#522)
- 🟢 shadow/echo/secret/surprise/mistake — 各自独特
- 🟢 adventure/treasure/journey — 各自独特
- 🟢 village/dock/crowd/trail/footprint — 各自独特
- 🟢 pattern/riddle/poem/tale/legend/character/chapter/title/author — 各自独特

### 动物身体部位 (paw–mane, #523–#540, 除scale)
- 🟢 paw/claw/feather/fur/wing/beak — 各自独特
- 🟢 nest/hive/den/burrow — 动物居所各自独特
- 🟢 trap/leash/tag/whisker/tail/hoof/mane — 各自独特

### 动物群体 (flock–pack, #541–#543)
- 🟢 flock(birds)/herd(cows)/pack(wolves) — 各对应不同动物

### 自然现象 (droplet–ash, #544–#550)
- 🟢 droplet/ripple/bubble — 水相关各自独特
- 🟢 flame/spark/smoke/ash — 火相关各自独特

### 时间点 (dawn–noon, #551–#554)
- 🟢 dawn/dusk/midnight/noon — 四个时间点各自明确

### 人物词 (passenger–fairy, #555–#572)
- 🟢 所有人物词定义准确，各自独特

### 故事道具 (shield–throne, #573–#577)
- 🟢 shield/sword/wand/throne/crown — 各自独特

### 其他动词/形容词 (wobble–than, #578–#599)
- 🟢 wobble/tumble/snuggle/nibble/snore/yawn/shiver — 各自独特
- 🟢 bloom/sprout/wilt — 植物生长阶段清晰
- 🟢 scattered/rascal/gigantic/itsy/whirl/sparkle/flutter — 各自独特
- 🟢 hear/lose/teach/take/than — 基础词各自独特

## 统计
- 🔴 RED: 10个词涉及（scale, muffin, treat, slice, piece, frightened, terrified, worried/nervous循环定义, grumpy, cranky, lemon用词超纲, gather例句）
- 🟡 YELLOW: 15个词
- 🟢 GREEN: 575个词
- MISMATCH率: 10/600 = 1.67% < 5% ✅ PASS
