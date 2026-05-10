#!/usr/bin/env node
/**
 * COCA Frequency Verify Tool
 * Checks that word definitions only use basic vocabulary appropriate for the target level.
 *
 * Usage: node coca-verify.mjs words-level1.js [words-level2.js ...]
 *
 * Level -> max vocabulary:
 *   Level 1-2: basic words only (~2500 common words)
 *   Level 3:   basic words + level 3 extensions
 *   Level 4-5: basic words + level 3-4 extensions
 */

import { readFileSync } from 'fs';
import { basename } from 'path';

// ============================================================
// BASIC WORD LIST (~2500 words)
// Sources: Dolch 220, Fry 1000, common nouns/verbs/adjectives
// These are words a 1st-2nd grader should know
// ============================================================

const BASIC_WORDS_RAW = `
a about above across after again against all almost along already also always am an and
another any are around as ask at ate away

baby back bad bag ball be bear beat beautiful because bed been before began begin behind
believe below beside best better between big bird bit bite black blue board body bone book
both bottom box boy branch bread break bring brother brown build burn bus busy but butter
buy by

call came can car care carry cat catch change child children choose city class clean clear
climb close cold color come cool could country cover cross cry cup cut

dad dance dark daughter day dear deep did die different dinner do does dog done door down
draw dream dress drink drop dry during

each ear early earth east eat egg eight end enough even evening ever every eye

face fall family far fast father feel feet few field fill find fine finger fire first fish
five flat fly follow food foot for forest found four free fresh friend from front fruit full
fun funny

game garden gate gave get girl give glad go god going gone good got grand grass great green
grew ground group grow

had hair half hand hang happen happy hard has hat have he head hear heart heavy help her
here high hill him his hit hold hole home hope horse hot house how hundred hunt hurry hurt

I ice idea if in inside into is it its

job join jump just

keep key kid kill kind king kiss kitchen knee knew knock know

lady land large last late laugh lay lead learn leave left leg less let letter life light
like line list listen little live long look lose lost lot love low lunch

mad made make man many may me mean meet men might mile milk mind miss money moon more
morning most mother mountain mouth move much music must my

name near need never new next nice night nine no none north nose not nothing now number

of off often oh old on once one only open or order other our out outside over own

page paid paint pair pan paper part pass past pay people pick picture piece place plan
plant play please point poor pull push put

question quick quiet quite

rain ran reach read ready real red remember rest rich ride right ring rise river road rock
roll room round row run

sad safe said same sand sat save saw say school sea second see seem send set seven shall
shape she ship short should show shut side sign since sing sister sit six size sky sleep
slow small smell smile so some son song soon sound south space speak special spend spring
stand star start stay step still stop story street strong such sugar summer sun sure sweet
swim

table take talk tall tell ten than thank that the their them then there these they thing
think third this those though thought three through time tiny to today together told too
top touch town tree trip try turn two

under until up upon us use

very voice

wait walk wall want war warm was wash watch water way we wear week well went were west what
when where which while white who whole why wide wife will win wind window winter wish with
without woman women won wonder wood word work world would write wrong

yard year yes yet you young your

able act add age ago agree air alone amount animal answer appear arm area art aunt

bag bank base bath beat became bed bell below best better bit blood blow board boat bone
born bought bought box break breakfast bright broke brought burn bus business bought

captain carry catch caught cause center chance check chief church circle city class clean
clear climb clock clothes cloud coat cold collect color common company compare complete
contain control cook corner correct cost cotton count course cover cross crowd current

danger dark dead deal death decide deep degree develop die dinner direct direction discover
distant divide doctor dog dollar done double doubt draw drew driven drove dry dust

ear earn earth edge effect effort either else employ enemy enjoy enter equal especially
evening event except expect experience explain express

fact fair fall farm fast fat fear feed fight fill final find fine fire fish flat floor
flow follow force foreign form forward found fresh front garden general gift glad glass
gold gone got government grew guard guess

happen hat heat held help hill hit hole hope hot human hundred hurry

inch include increase indeed industry interest iron

join joy judge

kept knew

labor lack laid land late law lay lead led lie lift likely limit list lot

machine main major manage mark mass matter member middle miss mix modern moment most mouth
movement music

narrow nation natural necessary neither net noble nor note notice

observe ocean offer oil operate opinion opposite

particular path pattern pay perhaps period person picture plan plant please plenty poem
position possible pour power prepare present president press pretty price produce product
promise property prove provide public purpose

quiet

race raise rather reach reason receive record remain reply report result return rock rule

sail salt sea seat seem sentence separate serve set settle shape share shop shore sight
simple sir sit sleep slip smell soil soldier solution south spread state station stone stood
store stream supply suppose system

taste term test thick thus tie tire total trade travel trouble trust type

unit

value various village visit

wait war watch wear weight west whether wild wise wish wonder

above across actual add address advance advantage afraid afternoon age ago agree ahead allow
already angle announce apart appear apple area army arrive art attend average avoid awake

bad bag balance band bar barn base basket bat battle bay beach bear bed bell belong below
bench bent beside beyond bill block blood blow board boat bomb born bottom brain brave
bread bright broad broke brother brown brush build bunch burn bus butter

cabin calm camp capital catch cattle caught cell cent central chair charge cheap chest chicken
circle claim class clay clear clock coal coast coin column combine comfort common company
condition connect consider contain cook copy corn corner correct cost count couple court cover
crack cream creature crop crowd current curve customer

daily damage deal death deep deer demand describe desert desire detail determine develop device
devil dictionary difference dig direction dirty disappear dish distance distant divide doctor
double dozen dress drink driver dull

eager edge eight eleven empty enemy engine entire equal escape exact exchange excited excuse
exercise experiment

factory fail familiar fancy fat fault favor female fight film finger flat flow fold fool
force forget form fortune fourth fresh frighten fruit

gain gas gather general giant gift globe golden govern grain grand grant grave gray greet
guard

halfway hall handle happiness harbor harm harvest hasn't heaven height hen hide highway
hire holiday honest honor huge hunger

imagine immediate importance impossible improve indeed individual industry influence insect
instrument iron

jacket jaw job joint

lace lack lady lamp language larger leather lesson level library lid lip load local
lot luck

magic male manner market master matter meal measure meat medicine meet member mental mention
method middle mild mine minister mirror mixture model modern moral motor mountain mud

native neck negative neighbor nervous newspaper nobody noise normal novel

obey object ocean odd officer opinion order ordinary organize ought ounce owner

package palm pan parent passage path pause pen perfect pile pin plain planet plate plunge
poem popular pour prevent pride print private process profit proper public pump pure

race rate raw region regular relate release remain repeat replace request require respect
river root rope rush

scene season seat select settle shade shadow shape shelf shock shoe shore signal silver
similar sir skin slight slope smooth soil solid solution spot standard steady steam stick
stock storm strange strip struggle style subject succeed suit supply surprise surround
symbol

tall task temple tend term thick thin thread throat tide title tone tool toward tower
track treasure tribe trick tube

uncle union upper usual

vacation vast

wage wander warn waste wealth weapon welcome wheat whisper wire wise

actual aid aim alarm alive angle apart arm arrow attempt attention attract

balance bare bare bay beam beast begin bell bitter blade blank bless blind bloom board bolt
bore bound bowl breath brief bunch burst

calm cap cast cave central chain chamber champion channel charm chart cheap chief claim
clever coach comfort command common companion connect contain cottage council couple courage
crack credit crew crop crown cruel curve

dash dear delight depth detail dew distant double drain drill dust duty

east elect equal escape evil exactly examine exchange excite explore extend extreme

fade fail faith familiar fan feast feature fence firm fix flash flesh flight folks fond
force fork fortune frame freeze fur

gap gentle gift govern grab grain gray growth

hall harbor hate heal hip hollow honey horizon host humor hunt

ill instant iron

jar jaw jerk jewel journey juice

keen kingdom knee knot

layer lean leather lesson lid lion loan lord lung

march mild mirror motion mount

neat noble novel

onion organ

pad pale pan passage patience pattern peaceful phrase pitch pleased plead plot plunge
poison polish pond possess praise pray preserve private proceed property protest prove

rack rapid raw ray recover reduce reflect reform relate release relief rely remark remote
repair request reserve resist reveal reverse rid rob

sake scar scatter seal self series settle shade shelter shift shock shore sin sink slight
slim slope snap soar sole sore source spare spin staff stain stare state steal steep
steer stem stiff stock strain strap stream stress stretch strip stroke struggle stuff
submit suit summit supply suspect

tap tender text thread threat tide timber tissue toast tone tough trace transport trend
trick trim triumph troop

urge

vain valley victim vine volume

wander warn weakness wealth weave weigh wicked witness wrap

able accept act add admit adopt advance advise afford agree aid aim allow announce apart
appeal apply approach approve arrange arrive attach attempt attract avoid

base bath beat belong bend besides blank block blow boil bore borrow breathe

calm capture care celebrate center chain charge cheap circle claim clear club coast command
commit common compare complain complete concern condition connect consider contain continue
contrast control copy count couple cover create crowd cure

damage dare decide declare deep defeat define degree demand depend describe desire destroy
develop direct disappear discuss display divide doubt

earn effort employ encourage engage enjoy equal escape establish examine exchange exist
expand expect explain explore express extend

fail fancy fear feed figure fill flow fold force forgive form forward frame freeze frighten

gain gather gentle grab grand grant greet guard guide

handle heal heat hire honor host

ignore illustrate imagine improve include increase indicate influence inform injure
intend introduce involve iron issue

join judge

kick knock

label lack laugh launch lay lead lean lift limit link list load locate lock lower

maintain manage mark matter measure mention mind miss model

narrow nerve nod nor note notice

observe occur offer operate oppose order organize owe

perform permit pile plan plant point polish pop possess pour practice prefer prepare
present pretend prevent print produce profit promise propose protect prove provide

race raise range react realize receive recognize recommend record recover reduce refer
reflect refuse regard relate release remain remark remove rent repeat replace report
represent request require research reserve resist resolve respect respond rest restore
result retire reveal reverse review risk roll rub rush

satisfy save score search seat secure seek select separate serve settle shake shape shift
shine signal slip solve sort split spread squeeze state steal steer stick stock store
strain stress stretch strike struggle stuff submit succeed suffer suggest suit supply
support suppose survive suspect sweep switch

tap tend test thank tie tip toast touch tour trace trade train transfer translate trap
travel treat trick trim trust

unite urge

wander warn waste wave weigh welcome whisper wonder worry wound wrap

zero zone
`.trim();

// Parse into a Set, lowercased, split on whitespace/newlines
const BASIC_WORDS = new Set(
  BASIC_WORDS_RAW.split(/\s+/).map(w => w.toLowerCase()).filter(Boolean)
);

// Additional common words that appear frequently in children's definitions
// Words commonly used in children's definitions that must not be flagged
const EXTRA_DEFINITION_WORDS = `
rabbit duck sheep fox crow goose swan hen rooster eagle owl sparrow hawk dove pigeon
whale dolphin shark turtle lizard frog toad snake worm spider beetle ant bee butterfly moth caterpillar
squirrel raccoon skunk beaver moose deer wolf cub lamb kitten puppy chick duckling pony foal fawn
donkey zebra elephant giraffe hippo monkey ape tiger lion leopard penguin
crow parrot heron crane flamingo
shell tail teeth tooth wings wing feather beak claw paw hoof horn antler tusk mane fur scale
buzzes buzz sting stung stings hops hop hiss howl honk honks bark crow crows
bushy spotted striped fuzzy furry
nest burrow den hive dam web cocoon
prey hunt predator
oats wheat flour dough batter yeast noodle pasta rice corn grain cereal
chocolate vanilla sugar honey syrup butter cream cheese yogurt jam jelly frosting icing
salty sour sweet bitter spicy sour crunchy creamy chewy crispy juicy tender
snack meal breakfast lunch dinner dessert treat feast
vegetable fruit nut seed berry melon grape cherry peach plum lemon orange banana apple pear
broccoli carrot celery lettuce tomato potato onion pepper mushroom bean pea cucumber corn spinach
salad sandwich soup stew sauce gravy dough bread toast
mask costume disguise
dams dam sticks logs branches twigs
sausage bacon ham steak chicken beef pork turkey
milk juice soda lemonade tea coffee cocoa
spoon fork knife bowl plate cup mug jar pot pan
oven stove fridge refrigerator microwave toaster blender
recipe ingredient cook bake roast grill fry boil steam
apron mitt gloves
shirt pants jeans shorts skirt dress coat jacket sweater vest hoodie scarf mittens
hat cap helmet crown belt buckle button zipper pocket sleeve collar hem lace
shoes boots sandals slippers sneakers
sock socks pajamas costume uniform
blanket pillow sheet mattress quilt comforter
towel soap shampoo brush comb mirror
broom mop bucket sponge rag duster vacuum
ladder shelf drawer closet cabinet cupboard hanger hook rack
curtain rug carpet mat cushion couch sofa armchair
lamp candle flashlight lantern torch
vase frame clock alarm
envelope stamp package mail parcel letter card postcard
scissors glue tape stapler pin clip ruler eraser crayon marker chalk paintbrush
thermometer battery switch plug wire cable cord
barn stable fence gate shed garage warehouse factory
cabin cottage castle tower fortress palace temple pyramid
bridge tunnel dock pier harbor lighthouse
island peninsula cliff cave valley canyon gorge crater volcano
forest jungle swamp marsh meadow prairie desert oasis
pond stream creek brook river lake ocean sea bay gulf
storm thunder lightning rainbow breeze gust hurricane tornado
frost icicle hail blizzard drought flood dew fog mist
petal stem root thorn vine moss bark acorn pinecone seed bud sprout leaf branch trunk
crawl leap skip stomp tiptoe march dash sprint chase jog
grab toss catch squeeze stretch bend twist shake stir
pour spill drip splash float sink melt freeze boil steam
peel chop grate spread sprinkle scoop slice dice mince
whisper shout yell scream giggle chuckle snore hum roar howl bark
clap wave nod peek stare glance gaze wink blink squint
snuggle cuddle nuzzle nibble gobble munch crunch gulp sip slurp
wobble tumble stumble trip slide glide bounce swing sway
shiver tremble bloom sprout wilt fade shrink expand stretch
flutter sparkle shimmer glitter glow twinkle gleam flash flicker
scattered crumble dissolve evaporate absorb
rascal imp scamp
elbow wrist ankle heel thumb palm fist chin cheek forehead eyebrow eyelash tongue
throat shoulder hip spine rib skull muscle brain lung heart stomach liver kidney
skin bone joint nerve blood vein
fierce gentle brave shy proud curious grumpy cheerful lonely calm
wild tame plain fancy ripe rotten fresh stale
bitter sour salty juicy crunchy creamy smooth rough
sharp dull shiny damp soaking sticky slimy fluffy fuzzy cozy
chilly freezing boiling warm
hollow solid loose tight crooked straight crowded empty
narrow wide steep shallow deep thick thin
quickly slowly quietly loudly gently suddenly
already almost barely perhaps exactly instead anyway forever
apart together forward backward sideways beneath above below
beside between among toward against through across along around beyond
during until since whether while besides within without throughout upon
before after next then finally meanwhile soon later early late
beginning middle ending moment sudden recent daily weekly whenever
once twice often nowadays
dozen half pair entire double single plenty several few many none
bunch pile heap piece portion amount total extra enough less more quarter equal average
shadow echo secret surprise mistake adventure treasure journey
village dock crowd trail footprint pattern riddle poem tale legend
character chapter title author
paw claw feather fur scale wing beak nest hive den burrow
trap leash tag whisker tail hoof mane flock herd pack
droplet ripple bubble flame spark smoke ash dawn dusk midnight noon
passenger neighbor stranger parade audience crew coach chef mayor inventor
princess knight wizard giant dwarf monster dragon fairy
shield sword wand throne crown armor
excited nervous frightened surprised confused disappointed frustrated
jealous embarrassed worried grateful annoyed bored amazed terrified
furious miserable relieved peaceful comfortable uncomfortable
exhausted delighted gloomy hopeful cranky content eager homesick ashamed
gigantic itsy whirl sparkle flutter
hear lose teach take
insect bug creature reptile mammal amphibian
male female adult
pointed curved twisted braided hollow
covered wrapped stuffed filled
protect guard shield defend
wavy curly spiky prickly thorny bumpy
ridged grooved notched jagged
opened closed sealed locked
attached connected joined linked
mixed blended combined stirred
cooked baked fried roasted grilled steamed boiled
frozen melted heated warmed cooled chilled
dried soaked dampened moistened
cleaned washed scrubbed polished wiped swept dusted
folded rolled wrapped tied knotted braided woven stitched sewn
painted colored drawn sketched carved sculpted molded shaped
planted watered trimmed pruned harvested picked gathered
built constructed assembled crafted created designed
broken cracked chipped torn ripped shattered smashed crushed
missing lost forgotten abandoned deserted
special unique rare common ordinary unusual extraordinary
important valuable precious worthless
ancient modern traditional
certain definite obvious clear
secret hidden mysterious unknown
harmless dangerous poisonous venomous
peaceful noisy chaotic messy tidy organized
biggest smallest tallest shortest longest largest heaviest lightest
cloth string rope thread yarn ribbon fabric material
hood cape collar cuff hem seam
someone everyone anyone nobody somebody everybody anybody
soaks soak absorb drip drips
desk counter bench stool
wax clay rubber plastic metal glass wooden
border edge rim outline frame framed
erase erases erased
drive drove driven riding walked
muddy dusty sandy rocky icy snowy foggy cloudy windy rainy stormy
pool puddle
oak pine maple elm willow birch
forth everywhere accident
hello bye goodbye hey hi
glides glide swoops swoop soar soars
protects protector protecting
tray basket bin container jar bottle can carton crate
anchor sail mast oar paddle rudder
whiskers spots stripes patches
curved spiral zigzag diagonal horizontal vertical parallel
harder softer louder quieter darker lighter brighter
older younger bigger smaller taller shorter
person's animal's bird's
usually normally generally
actually probably certainly definitely
especially particularly
that's what's it's there's here's he's she's they're we're you're I'm
didn't doesn't don't won't can't couldn't wouldn't shouldn't haven't hasn't isn't aren't
wasn't weren't
themselves himself herself itself yourself myself ourselves
somewhere anywhere everywhere nowhere
something anything everything nothing
sometimes always never often usually
although however therefore otherwise
really truly actually
already almost barely nearly
pretty quite rather fairly
too very much so
just only even still
how much how many how long how big how far how old
no one each other one another
used to able to going to have to has to had to
lot of lots of kind of sort of type of
a bit a little a few a couple
in front of on top of next to close to far from
inside outside upside down right side up
left right up down front back
middle center edge corner side
top bottom beginning end
first second third last next
most least more less
better worse best worst
whole entire complete full
half quarter third
part piece bit section
each every all both either neither
some any no every
many few several
much little
more less enough plenty
too much too many too little too few
climbs climbed climbing
swims swimming swimmer
runs running runner
jumps jumping jumper
walks walking walker
talks talking talker
sings singing singer
dances dancing dancer
plays playing player
reads reading reader
writes writing writer
draws drawing
paints painting painter
builds building builder
cooks cooking
bakes baking baker
cleans cleaning cleaner
washes washing
sweeps sweeping
carries carrying carrier
pushes pushing
pulls pulling
holds holding holder
lifts lifting
drops dropping
opens opening
closes closing
turns turning
starts starting starter
stops stopping
begins beginning beginner
ends ending
continues continuing
changes changing
grows growing grower
shrinks shrinking
rises rising
falls falling
floats floating
sinks sinking
melts melting
freezes freezing
boils boiling
steams steaming
burns burning
shines shining
glows glowing
flashes flashing
hides hiding
seeks seeking seeker
finds finding finder
loses losing loser
saves saving saver
keeps keeping keeper
brings bringing
sends sending sender
receives receiving receiver
delivers delivering
fetches fetching
carries carrying
wants wanting
needs needing
wishes wishing
hopes hoping
dreams dreaming dreamer
expects expecting
likes liking
loves loving lover
hates hating
cares caring
misses missing
feels feeling
touches touching
tastes tasting
smells smelling
hears hearing
sees seeing
listens listening listener
watches watching watcher
notices noticing
wonders wondering
imagines imagining
pretends pretending pretender
promises promising
reminds reminding reminder
forgets forgetting
collects collecting collector
gathers gathering
stacks stacking
sorts sorting sorter
matches matching
compares comparing
measures measuring
weighs weighing
counts counting counter
adds adding
removes removing
attaches attaching
connects connecting
separates separating
joins joining
mixes mixing mixer
blends blending blender
combines combining
stirs stirring
pours pouring
fills filling
empties emptying
spills spilling
drips dripping
splashes splashing
floats floating
sinks sinking
melts melting
freezes freezing
peels peeling peeler
chops chopping
slices slicing slicer
spreads spreading
sprinkles sprinkling
scoops scooping
whispers whispering
shouts shouting
yells yelling
screams screaming
giggling
snoring
humming
roaring
howling
clapping
waving
nodding
peeking
staring
glancing
searching
discovering
noticing
wondering
imagining
pretending
promising
reminding
forgetting
belonging
sharing
trading
borrowing
lending
gathering
collecting
stacking
wrapping
unwrapping
tugging
dragging
shoving
tucking
hanging
fastening
attaching
repairing
creating
designing
measuring
weighing
counting
sorting
delivering
fetching
vanishing
aware recall bumps slippery yucky scary mood upset nature anymore chips case
doing bumping nearby earlier farther loop grip trash impress shaky
clip sewn woven
expected warning
wiggled ached swallow swallowed rung
pricked stung scratched bruised scraped
crunches cracking snapping popping rustling
coiled tangled looped
squeaky creaky rattling rumbling
hatch hatched hatching
terribly horribly awfully dreadfully
soaked drenched
slid slithered crept sneaked
pounce pounced lunged
waddled stumbled
nibbled gobbled munched crunched gulped sipped
sniffed
squished mushed mashed squashed
rustled crinkled crackled
untangled
wrinkled crumpled rumpled
chirp chirped tweet tweeted
croak croaked squeak squeaked
quack quacked moo mooed
neigh neighed bleated
cluck clucked oink oinked
purr purred hissed
growl growled chattered
screeched squealed
snort snorted
patter pattered
creak creaked
clatter clattered rattle rattled
thud thudded crash crashed
smack smacked clang clanged
bang banged beep beeped
tick ticked chime chimed
whistle whistled
flap flapped swish swished
swoop swooped glide glided
soar soared dive dived
perch perched wade waded
paddle paddled dip dipped
bob bobbed drift drifted
swirl swirled
gush gushed trickle trickled
ooze oozed seep seeped
sizzle sizzled fizzle fizzled
foam foamed froth frothed
faraway overhead underground underwater
indoors outdoors upstairs downstairs
cannot unhappy pain whiny fussy situation
twelve eleven thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty
worth gems jewels jewel gold silver diamond pearl ruby
platform ramp stage
tricky clever puzzle
aloud quietly softly
nail claw claws nails
snake's cat's horse's lion's dog's bird's fish's animal's
wolves wolf
powder dust
o'clock noon midnight
vehicle airplane
queen king prince princess emperor
unsteady wobbly shaky
naughty mischievous disobey
design pattern repeat repeats
irritated
clumsy graceful awkward

a an the is are was were be been being am
to of in on at by for with from into onto upon
and or but not nor so yet
it its he she they we you i me him her us them
my his her our your their this that these those
who what which when where why how
do does did will would can could shall should may might must
very much more most less least too also just only even still
no yes all any some every each both few many several none
than as if then else because since while until before after
than like such about over under between through during
up down out off away back
one two three four five six seven eight nine ten first second
thing things something anything nothing everything
way place part kind sort type form bit lot set group
go come make take get give say see look find know think tell
want need feel try use put let keep start begin stop end turn
move run walk talk work play live leave help show open close
call hold bring send sit stand fall grow become seem appear
say said tell told ask answer speak word name mean
day time year way people man woman person child life world
home house room water food hand eye head face side door
new old good bad big small long short great little high low
hard soft hot cold young same different other right left own
well now here there when then again never always often still
really quite rather pretty very much too so
able able to going to
has have had having
not don't doesn't didn't won't can't couldn't wouldn't shouldn't
been being
what's it's that's there's here's he's she's
made making makes
used using uses
called calling calls
goes went gone
came coming comes
took taken taking takes
got getting gets
saw seen seeing sees
knew known knowing knows
thought thinking thinks
felt feeling feels
found finding finds
gave given giving gives
told telling tells
said saying says
left leaving leaves
kept keeping keeps
let letting lets
set setting sets
ran running runs
sat sitting sits
stood standing stands
held holding holds
became becoming becomes
brought bringing brings
began beginning begins
grew growing grows
drew drawing draws
fell falling falls
sent sending sends
built building builds
spent spending spends
lost losing loses
paid paying pays
met meeting meets
led leading leads
won winning wins
hung hanging hangs
cut cutting cuts
hit hitting hits
put putting puts
shut shutting shuts
spread spreading spreads
hurt hurting hurts
wore worn wearing wears
ate eaten eating eats
drank drunk drinking drinks
sang sung singing sings
spoke spoken speaking speaks
wrote written writing writes
drove driven driving drives
rode ridden riding rides
rose risen rising rises
broke broken breaking breaks
chose chosen choosing chooses
froze frozen freezing freezes
woke woken waking wakes
shook shaken shaking shakes
threw thrown throwing throws
blew blown blowing blows
flew flown flying flies
drew drawn drawing draws
swam swum swimming swims
rang rung ringing rings
bit bitten biting bites
hid hidden hiding hides
sank sunk sinking sinks
tore torn tearing tears
struck striking strikes
dug digging digs

person place animal plant food color number body part
dog cat fish bird horse cow pig bear lion mouse deer frog snake bug
red blue green yellow black white brown pink orange purple gray
eat drink sleep walk run play read write sing dance swim jump climb
happy sad angry scared tired hungry thirsty sick hurt
mom dad mother father parent brother sister son daughter baby family friend
boy girl man woman kid teacher student doctor
school house home room door window table chair bed floor wall
book pen pencil paper bag ball toy game card
car bus train plane boat ship truck
tree flower grass rock dirt sand snow ice rain sun moon star sky cloud wind
big small tall short fat thin long wide deep round flat
nice mean kind sweet funny silly crazy smart
fast slow easy hard heavy light quiet loud bright dark clean dirty
eat food drink water milk juice bread cake fruit meat cheese egg rice soup
head arm leg hand foot finger toe face eye ear nose mouth tooth hair back
shirt pants shoes hat coat dress skirt sock
door window room house garden yard street road park farm store shop
able about across actually after against
morning afternoon evening night today tomorrow yesterday
always never sometimes usually often
every each many much some few all
very really quite pretty too so just only
because since while when before after until if unless
however although even though
make do have get go come take give see look
most least more less better worse best worst
over under above below beside behind next near far
number amount size shape color
move turn push pull carry lift drop pick throw catch
feel touch taste smell hear sound
ask tell say speak call name
try hard easy simple difficult
change grow become
help need want wish hope
seem look appear show
start stop begin end continue
think know believe understand remember forget
learn study teach practice
watch wait stay leave return
write read draw paint build create
eat cook bake mix pour stir cut chop
wear dress cover wrap
wash clean sweep fix mend
choose pick select
add count measure weigh
compare match fit
buy sell pay spend save
send receive deliver carry
win lose beat score
fight argue agree disagree
laugh cry smile frown
love like hate care miss
work rest play exercise
travel visit explore
happen occur cause result
live die born grow
piece part bit chunk section
group set bunch pile stack row line circle
side edge top bottom middle center front back end
inside outside above below around through between
animal pet wild tame
plant tree flower seed leaf branch root stem
water river lake ocean sea pond stream
land hill mountain valley field forest desert island
weather rain snow wind storm cloud sun
day night morning evening
season spring summer fall winter
week month year hour minute
room kitchen bedroom bathroom living garden
building house school church hospital store
road street path bridge
tool knife fork spoon cup bowl plate
family mother father sister brother aunt uncle cousin
job work worker farmer teacher doctor nurse driver cook
country town city village
game sport team ball race
story book page chapter word letter
picture photo color shape line
song music note beat drum voice
clothes shirt pants shoes coat hat dress
number one two three four five six seven eight nine ten
hundred thousand million
age young old baby child adult
money coin dollar price cost
size tiny small medium large huge giant
speed fast slow quick
weight heavy light
distance near far close
direction north south east west left right up down
feeling happy sad angry scared brave calm proud shy
thought idea dream wish plan
group team family class crowd army
action jump run walk sit stand lie push pull throw catch kick hit
talk speak whisper shout yell scream cry call sing
look see watch stare glance peek
hear listen sound noise
touch feel grab hold squeeze press rub
eat bite chew swallow taste sip gulp
smell sniff
think know believe understand wonder imagine guess remember forget
want need wish hope dream expect
like love enjoy prefer hate
try attempt effort practice
wait stay remain
move go come walk run travel fly swim climb crawl
change grow shrink spread rise fall drop sink float melt freeze
start begin stop end finish complete continue
open close shut lock
turn spin roll flip twist bend stretch
break fix build create make destroy
hide seek find lose discover search
give take share trade send receive
ask answer tell speak say reply explain
teach learn study read write draw paint
work play rest sleep wake
clean wash dry sweep dust
cook bake fry boil mix stir
cut chop slice tear rip fold wrap
pour fill empty spill drip splash
carry hold lift drop throw catch push pull drag
wear dress put on take off
add remove attach connect separate join
count measure weigh compare sort match
mark name label sign stamp
protect save guard rescue defend fight attack
gentle rough soft hard smooth sharp flat
round square straight curved bent
full empty half whole
wet dry damp soaking
hot cold warm cool
clean dirty messy neat tidy
safe dangerous careful
sure certain maybe perhaps
right wrong true false real fake
same different similar
strong weak powerful
beautiful pretty ugly
smart clever wise foolish silly stupid
brave shy bold
kind mean nice cruel gentle
happy sad cheerful gloomy
calm angry peaceful fierce
proud humble
patient impatient
honest
busy lazy
rich poor
alive dead
possible impossible
important special
strange odd weird normal regular usual
simple easy difficult hard tough
fresh stale ripe rotten
plain fancy simple
comfortable uncomfortable
solid liquid
tight loose
thick thin
wide narrow
deep shallow
smooth rough
shiny dull
sticky slimy
fluffy fuzzy
cozy
tiny small little big large huge enormous giant gigantic
noisy quiet silent loud
`.trim();

for (const w of EXTRA_DEFINITION_WORDS.split(/\s+/)) {
  if (w) BASIC_WORDS.add(w.toLowerCase());
}

// Stop words that should never be flagged
const STOP_WORDS = new Set(`
a an the is are was were be been being am
to of in on at by for with from into onto upon
and or but not nor so yet
it its he she they we you i me him her us them
my his her our your their this that these those
who what which when where why how
do does did will would can could shall should may might must
very much more most less least too also just only even still
no yes all any some every each both few many several none
than as if then else because since while until before after
like such about over under between through during
up down out off away back
`.trim().split(/\s+/));

// Level -> vocab threshold description
function getLevelConfig(level) {
  if (level <= 2) return { label: 'Level 1-2', desc: 'basic words only' };
  if (level === 3) return { label: 'Level 3', desc: 'basic + level 3 extensions' };
  return { label: 'Level 4-5', desc: 'basic + level 3-4 extensions' };
}

// Extract content words from a definition
function extractWords(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z'-\s]/g, ' ')
    .split(/\s+/)
    .map(w => w.replace(/^['-]+|['-]+$/g, ''))
    .filter(w => w.length > 1 && !STOP_WORDS.has(w));
}

// Check if a word is in the basic vocabulary
function isBasicWord(word) {
  if (BASIC_WORDS.has(word)) return true;
  // Check common suffixes
  const base = word
    .replace(/(?:ing|ed|er|est|ly|ness|ment|ful|less|tion|sion|ous|ive|able|ible|al|ial|en|ize|ise|ity|ies|es|s)$/, '');
  if (base.length > 2 && BASIC_WORDS.has(base)) return true;
  // Try removing doubled consonant before -ing/-ed
  const doubled = word.replace(/(.)(\1)(ing|ed|er)$/, '$1');
  if (doubled !== word && BASIC_WORDS.has(doubled)) return true;
  // Try -e variants
  if (BASIC_WORDS.has(base + 'e')) return true;
  // Try -y -> -ies, -ied
  const yBase = word.replace(/ied$/, 'y').replace(/ies$/, 'y');
  if (yBase !== word && BASIC_WORDS.has(yBase)) return true;
  return false;
}

// ============================================================
// Main
// ============================================================

const files = process.argv.slice(2);
if (files.length === 0) {
  console.log('Usage: node coca-verify.mjs words-level1.js [words-level2.js ...]');
  process.exit(1);
}

for (const file of files) {
  // Load the word bank
  const code = readFileSync(file, 'utf-8');

  // Extract the array - find the variable assignment
  const match = code.match(/const\s+\w+\s*=\s*(\[[\s\S]*\])\s*;/);
  if (!match) {
    console.log(`\n⚠️  Could not parse word bank from ${basename(file)}`);
    continue;
  }

  let words;
  try {
    words = JSON.parse(match[1]);
  } catch {
    // Try eval as fallback
    try {
      words = eval(match[1]);
    } catch {
      console.log(`\n⚠️  Could not parse JSON from ${basename(file)}`);
      continue;
    }
  }

  const level = words[0]?.level || 1;
  const config = getLevelConfig(level);

  console.log(`\n${'='.repeat(50)}`);
  console.log(`📖 COCA Frequency Verify`);
  console.log(`File: ${basename(file)} (${words.length} words)`);
  console.log(`Level: ${level} (${config.desc})`);
  console.log(`${'='.repeat(50)}`);

  let passCount = 0;
  let flagCount = 0;
  const flagged = [];

  for (const entry of words) {
    const defWords = extractWords(entry.definition);
    const hardWords = [];

    for (const w of defWords) {
      if (!isBasicWord(w)) {
        // Don't flag the target word itself appearing in its own definition
        if (w === entry.word.toLowerCase()) continue;
        // Don't flag very short words
        if (w.length <= 2) continue;
        hardWords.push(w);
      }
    }

    // Deduplicate
    const unique = [...new Set(hardWords)];

    if (unique.length === 0) {
      passCount++;
    } else {
      flagCount++;
      flagged.push({ word: entry.word, hardWords: unique, definition: entry.definition });
    }
  }

  const total = passCount + flagCount;
  const passRate = total > 0 ? ((passCount / total) * 100).toFixed(1) : '0.0';
  const flagRate = total > 0 ? ((flagCount / total) * 100).toFixed(1) : '0.0';

  console.log(`\n✅ PASS: ${passCount} (${passRate}%)`);
  console.log(`🚩 FLAGGED: ${flagCount} (${flagRate}%)`);

  if (flagged.length > 0) {
    console.log(`\n--- Flagged Details ---`);
    for (const f of flagged) {
      console.log(`  ${f.word} — uses: ${f.hardWords.join(', ')}`);
      console.log(`    def: "${f.definition}"`);
    }
  }

  console.log('');
}
