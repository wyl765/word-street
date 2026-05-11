# LAYER 14: Semantic Distance Analysis

**Corpus:** 5205 words across 16 files, Levels 1-5  
**Method:** Jaccard similarity on content words in definitions, thresholds 0.3-0.4+  
**Note:** Algorithm over-reports thematic clusters. Items marked ⚠️ are TRUE quiz risks (definitions so similar a student couldn't distinguish). Others are thematic groupings that share vocabulary but are distinguishable in context.

---

## 1. Synonym Clusters (Quiz Confusion Risk)

_Groups of 3+ words at the same level whose definitions are nearly interchangeable._

### Level 1

**pond / puddle / droplet / ripple**
- `pond`: "a small body of water"
- `puddle`: "a small pool of water on the ground"
- `droplet`: "a very small drop of water"
- `ripple`: "a small wave on water"

**glance / search / design**
- `glance`: "to look at something for just one quick second"
- `search`: "to look carefully for something"
- `design`: "to plan what something will look like"

**remind / deliver / toward**
- `remind`: "to help someone remember something"
- `deliver`: "to bring something to someone"
- `toward`: "in the direction of someone or something"

**measure / weigh / lose**
- `measure`: "to find out how big something is"
- `weigh`: "to find out how heavy something is"
- `lose`: "to not be able to find something"

**fancy / clumsy / pile**
- `fancy`: "having a lot of pretty things on it"
- `clumsy`: "bumping into things a lot"
- `pile`: "a lot of things on top of each other"

**comfortable / uncomfortable / hopeful**
- `comfortable`: "feeling good, not in pain"
- `uncomfortable`: "not feeling good in your body"
- `hopeful`: "feeling like good things will happen"

**soon / moment / recent**
- `soon`: "in a short time from now"
- `moment`: "a very short bit of time"
- `recent`: "just a short time ago"

**wizard / giant / dwarf**
- `wizard`: "a person with magic powers in stories"
- `giant`: "a very tall person in stories"
- `dwarf`: "a very small person in stories"

### Level 2

⚠️ **suppose / believe / assume** — HIGH RISK: nearly identical definitions
- `suppose`: "to think something is probably true without being sure"
- `believe`: "to think something is true"
- `assume`: "to think something is true without checking"

**ancient / recently / history**
- `ancient`: "from a very long time ago"
- `recently`: "not long ago"
- `history`: "stories and facts from long ago"

**fragile / sturdy / brittle**
- `fragile`: "easy to break"
- `sturdy`: "strong and not easy to break"
- `brittle`: "hard but easy to snap or break"

**setting / plot / scene**
- `setting`: "where and when a story happens"
- `plot`: "what happens in the story"
- `scene`: "one part of a story or play that happens in one place"

**detail / model / fragment**
- `detail`: "a small fact about something"
- `model`: "a small copy of something"
- `fragment`: "a small broken piece of something"

**cause / effect / wait / ensure / site**
- `cause`: "why something happens"
- `effect`: "what happens because of something"
- `wait`: "to stay until something happens"
- `ensure`: "to make sure something happens"
- `site`: "a place where something is or happens"

**state / incorporate / inherent / end**
- `state`: "a part of a country; also the condition something is in"
- `incorporate`: "to include as part of something"
- `inherent`: "a natural part of something"
- `end`: "the last part of something"

**turn into / better / resemble**
- `turn into`: "to change into something else"
- `better`: "more good than something else"
- `resemble`: "to look like someone or something else"

**look forward to / talent / recommend**
- `look forward to`: "to be happy that something good is coming"
- `talent`: "something you are good at"
- `recommend`: "to suggest that something is good"

⚠️ **consider / contemplate / keep in mind** — HIGH RISK: all "think about something [carefully/deeply]"
- `make up`: "to think of something that is not real"
- `consider`: "to think carefully about something"
- `expect`: "to think something will happen"
- `admire`: "to look at something and think it is very good"
- `contemplate`: "to think about something deeply"
- `keep in mind`: "to recall or think about something"

**selfish / compassionate / compassion**
- `selfish`: "caring only about you, not others"
- `compassionate`: "caring about others who are hurting and wanting to help"
- `compassion`: "caring about others who are hurting"

**add / build / make**
- `add`: "to put together"
- `build`: "to put parts together to create something"
- `make`: "to create or put together; also to cause a change"

**become / begin / kindle**
- `become`: "to start to be"
- `begin`: "to start"
- `kindle`: "to start a fire"

**bring / transport / capacity / conduct**
- `bring`: "to carry something to a place or person"
- `transport`: "to carry something from one place to another"
- `capacity`: "the most that something can hold or carry"
- `conduct`: "to lead or carry out something"

**bundle / team / unite**
- `bundle`: "a group tied together"
- `team`: "a group working together"
- `unite`: "to join together as one group"

**clue / identify / determine**
- `clue`: "something that helps you figure out an answer"
- `identify`: "to figure out what something is"
- `determine`: "to decide or figure something out"

**complain / deny / praise / reject**
- `complain`: "to say you are unhappy about something"
- `deny`: "to say something is not true"
- `praise`: "to say something good about someone"
- `reject`: "to say no to something offered"

**cost / afford / expense**
- `cost`: "how much money something takes"
- `afford`: "to have enough money for something"
- `expense`: "the money you spend on something"

**edge / external / internal / exterior**
- `edge`: "the outside line of something"
- `external`: "on the outside of something, not inside"
- `internal`: "on the inside of something, not outside"
- `exterior`: "the outside of something"

**field / region / territory**
- `field`: "an open area of land"
- `region`: "a large area of land"
- `territory`: "an area of land that belongs to someone"

**goal / control / urge**
- `goal`: "something you want to do"
- `control`: "to have power over something and make it do what you want"
- `urge`: "a strong feeling that you want to do something"

**learn / familiar / recognize**
- `learn`: "to find out something you did not know before"
- `familiar`: "something you have seen or know about before"
- `recognize`: "to know what something is because you have seen it before"

**path / route / partly**
- `path`: "a way to walk"
- `route`: "the way to go"
- `partly`: "not all the way, only some"

**simple / obvious / clearly**
- `simple`: "easy to do or understand"
- `obvious`: "very easy to see or understand"
- `clearly`: "in a way that is easy to see or understand"

⚠️ **strong / powerful** — HIGH RISK: "having [a lot of/great] power"
- `strong`: "having a lot of power"
- `powerful`: "having great power"
- `weak`: "not strong, having little power"

**eventually / at last / prolonged**
- `eventually`: "in the end, after a long time or much effort"
- `at last`: "finally, after a long time"
- `prolonged`: "lasting a long time"

**claim / fact / attest / confirm**
- `claim`: "to say something is yours or is true"
- `fact`: "something that is true and can be proven"
- `attest`: "to show that something is true"
- `confirm`: "to say that something is true or right"

**exchange / mix up / prefer**
- `exchange`: "to trade one thing for another"
- `mix up`: "to confuse one thing with another"
- `prefer`: "to like one thing better than another"

**insist / assert / condemn**
- `insist`: "to say something strongly and not change your mind"
- `assert`: "to say something strongly and clearly"
- `condemn`: "to say strongly that something is wrong"

**announce / bear in mind / value**
- `announce`: "to tell everyone something important"
- `bear in mind`: "to remember something important"
- `value`: "how much something is worth or how important it is"

⚠️ **in contrast / contrast** — HIGH RISK: identical meaning, one is phrasal form
- `compare`: "to look at two things to see how they are the same or different"
- `in contrast`: "showing how two things are different"
- `contrast`: "to show how two things are different"

**defend / leave out / count on / alert / assist / enable / exclude / forbid / permit / compel**
- `defend`: "to protect someone or something from danger"
- `leave out`: "to not include something or someone"
- `count on`: "to depend on someone or something"
- `alert`: "to warn someone about something"
- `assist`: "to help someone do something"
- `enable`: "to make it possible for someone to do something"
- `exclude`: "to leave someone or something out"
- `forbid`: "to order someone not to do something"
- `permit`: "to allow someone to do something"
- `compel`: "to force someone to do something"

**observe / select / monitor**
- `observe`: "to watch something carefully"
- `select`: "to choose something carefully"
- `monitor`: "to watch something carefully over time"

⚠️ **lively / vibrant / brisk** — HIGH RISK: all "full of life"
- `lively`: "full of life and fun"
- `vibrant`: "bright and full of life or color"
- `brisk`: "quick and full of life"

**abundant / amass / bulk**
- `abundant`: "more than enough, a very large amount"
- `amass`: "to gather a large amount"
- `bulk`: "a large amount or the biggest part"

**regularly / yearly / regular**
- `regularly`: "happening at the same time again and again"
- `yearly`: "happening one time each year"
- `regular`: "happening at the same time or in the same way"

**method / direction / barrier**
- `method`: "a way of doing something"
- `direction`: "the way something is moving or pointing"
- `barrier`: "something that blocks the way"

**mixture / consolidate / overall / blend**
- `mixture`: "two or more things stirred together"
- `consolidate`: "to bring things together into one"
- `overall`: "looking at all things together"
- `blend`: "to mix things together"

⚠️ **attitude / perspective / regard** — HIGH RISK: all "the way you think about something"
- `attitude`: "the way you think and feel about something"
- `perspective`: "the way you see and think about something"
- `regard`: "to think about someone or something in a certain way"

⚠️ **essential / integral / crucial** — HIGH RISK: definitions barely differ
- `essential`: "very important and needed"
- `integral`: "very important and needed as part of something"
- `crucial`: "extremely important and needed"

⚠️ **establish / initiate** — HIGH RISK: both "to start something new"
- `establish`: "to start or create something new"
- `initiate`: "to start or begin something new"
- `bring up`: "to start talking about something"

**cooperate / go along with / integrate**
- `cooperate`: "to work together with others"
- `go along with`: "to agree or to work together with"
- `integrate`: "to combine things so they work together"

**investigate / look into / locate**
- `investigate`: "to look into something to find out what really happened"
- `look into`: "to find out more about something"
- `locate`: "to find out where something is"

⚠️ **amend / modify / revise** — HIGH RISK: "change to improve" x3
- `amend`: "to change something to fix or improve it"
- `affect`: "to cause a change in something"
- `modify`: "to change something a little to improve it"
- `revise`: "to change and improve something you wrote"

**derive / dispose / catch on / eliminate**
- `derive`: "to get something from a source"
- `dispose`: "to get rid of something"
- `catch on`: "to begin to get something"
- `eliminate`: "to remove or get rid of something"

**induce / bring about / factor**
- `induce`: "to cause or lead something to happen"
- `bring about`: "to cause something new or different to happen"
- `factor`: "one thing that helps cause something to happen"

**intervene / call off / prevent / suspend**
- `intervene`: "to step in to help or stop something"
- `call off`: "to stop something that was planned"
- `prevent`: "to stop something from happening"
- `suspend`: "to stop something for a while"

⚠️ **likewise / equally / similarly** — HIGH RISK: definitions barely differ
- `likewise`: "in the same way"
- `equally`: "in the same amount or way"
- `similarly`: "in a way that is almost the same"

**hand out / individual / welfare**
- `hand out`: "to give one to each person in a group"
- `individual`: "one person, apart from the group"
- `welfare`: "the health and happiness of a person or group"

**desire / impact / passion**
- `desire`: "a strong wish to have or do something"
- `impact`: "a strong effect on something"
- `passion`: "a very strong love for something"

**justify / sacrifice / warrant**
- `justify`: "to give a good reason for something"
- `sacrifice`: "to give up something important for a good reason"
- `warrant`: "to be a good enough reason for something"

### Level 3

**inferior / akin / rather than**
- `inferior`: "not as good as something else"
- `akin`: "similar to something else"
- `rather than`: "instead of; in place of something else"

**cleave / collide / expel**
- `cleave`: "to split something apart with force"
- `collide`: "to crash into something or each other with force"
- `expel`: "to force someone or something out"

**carnivore / herbivore / omnivore**
- `carnivore`: "an animal that eats mostly or only meat"
- `herbivore`: "an animal that eats only plants"
- `omnivore`: "an animal that eats both plants and meat"

### Level 4

⚠️ **epitomize / paragon / quintessential** — HIGH RISK: nearly identical
- `epitomize`: "to be a perfect example of something"
- `paragon`: "a perfect example of a good quality"
- `quintessential`: "being the most perfect example of something"

### Level 5

⚠️ **authenticate / validate** — HIGH RISK: both "prove something is [real/correct]"
- `authenticate`: "to prove something is real"
- `refute`: "to prove that something is wrong"
- `validate`: "to prove that something is correct or acceptable"

⚠️ **dominance / omnipotent / supremacy** — HIGH RISK: all "having the most power"
- `dominance`: "having the most power or control"
- `omnipotent`: "having unlimited power"
- `supremacy`: "the state of having the most power or authority"

**hinder / threshold / expedite**
- `hinder`: "to make it difficult for something to happen"
- `threshold`: "the level at which something begins to happen"
- `expedite`: "to make something happen more quickly"

**appraise / attribute / essence**
- `appraise`: "to assess the value or quality of something"
- `attribute`: "a quality or feature of something"
- `essence`: "the most important quality of something"

⚠️ **culprit / retribution / deterrent / impunity / penitent** — HIGH RISK: all "doing something wrong" cluster
- `culprit`: "the person responsible for doing something wrong"
- `retribution`: "punishment for doing something wrong"
- `deterrent`: "something that discourages people from doing something wrong"
- `impunity`: "freedom from punishment for doing something wrong"
- `penitent`: "feeling sorry for doing something wrong"

⚠️ **entomology / meteorology / ornithology** — HIGH RISK: all "the scientific study of X"
- `entomology`: "the scientific study of insects"
- `meteorology`: "the scientific study of weather and climate"
- `ornithology`: "the scientific study of birds"

## 2. Semantic Level Misplacement

### L1 words that may be too abstract (suggest L2+)

- **beyond**: "past, farther away than" → L2 (abstract connector/adverb)
- **whether**: "used when you are choosing between two possible things" → L2 (abstract connector/adverb)
- **within**: "inside the edges or limits of something, not going past them" → L2 (abstract connector/adverb)
- **throughout**: "in every part of" → L2 (abstract connector/adverb)
- **meanwhile**: "at the same time, but in a different place or situation" → L2 (abstract connector/adverb)

### L2 words that are SAT-level (suggest L4-5)

- **ambiguous**: "not clear; could mean more than one thing"
- **facilitate**: "to help something happen"

### L2 science terms that could be L3

- **habitat**: "the place where an animal lives"
- **climate**: "the usual weather in a place"
- **lava**: "hot melted rock from deep under the Earth"
- **predator**: "an animal that hunts other animals for food"
- **prey**: "an animal that others hunt and eat"
- **fossil**: "the remains of a plant or animal from long ago, kept safe inside rock"
- **mineral**: "a natural solid found in rocks or in the ground"
- **orbit**: "the path something takes as it moves around another thing in space"
- **species**: "a group of living things that are the same kind"
- **organ**: "a body part that does an important job"
- **tissue**: "a group of cells that work together in your body"
- **equator**: "a pretend line around the middle of the Earth"
- **latitude**: "lines on a map that go side to side"
- **longitude**: "lines on a map that go up and down"

## 3. Definition-Word Semantic Mismatch

### Identical definitions assigned to different words

- **ending** (L1, words-level1.js) = **end** (L2, words-level2b.js)
  Definition: "the last part of something"
- **width** (L2, words-level2.js) = **breadth** (L3, words-level3a.js)
  Definition: "the distance from one side to the other"
- **heterogeneous** (L4, words-level4a.js) = **miscellaneous** (L5, words-level5c.js)
  Definition: "made up of many different kinds of things"

## 4. False Friend Pairs

_Pairs where definitions LOOK similar but words are used very differently._

- **enhance** vs **appraisal** (L4)
  - enhance: "to improve the quality or value of something"
  - appraisal: "an assessment of the value or quality of something"
- **shape** vs **act** (L2)
  - shape: "the outline of something"
  - act: "to do something"
- **carry out** vs **idea** (L2)
  - carry out: "to do a plan"
  - idea: "a thought or plan"
- **attack** vs **attempt** (L2)
  - attack: "to try to hurt"
  - attempt: "a try"
- **base** vs **include** (L2)
  - base: "the bottom part"
  - include: "to have as a part"
- **minute** vs **pause** (L2)
  - minute: "a short time, 60 seconds"
  - pause: "to stop for a short time"
- **implicate** vs **allegation** (L5)
  - implicate: "to show that someone is involved in something wrong"
  - allegation: "a claim that someone has done something wrong"
- **envelope** vs **wrap** (L1)
  - envelope: "a paper cover for a letter"
  - wrap: "to cover something with paper or cloth"
- **drought** vs **stare** (L1)
  - drought: "a long time with no rain"
  - stare: "to look at something for a long time"
- **stack** vs **pile** (L1)
  - stack: "to put things on top of each other neatly"
  - pile: "a lot of things on top of each other"
- **struggle** vs **chance** (L2)
  - struggle: "to try hard when something is difficult"
  - chance: "a time when you can try something"
- **postpone** vs **soon after** (L3)
  - postpone: "to move something to a later time"
  - soon after: "a short time later"
- **epitomize** vs **paragon** (L4)
  - epitomize: "to be a perfect example of something"
  - paragon: "a perfect example of a good quality"
- **hinder** vs **threshold** (L5)
  - hinder: "to make it difficult for something to happen"
  - threshold: "the level at which something begins to happen"
- **hinder** vs **premonition** (L5)
  - hinder: "to make it difficult for something to happen"
  - premonition: "a strong feeling that something is about to happen"
- **threshold** vs **expedite** (L5)
  - threshold: "the level at which something begins to happen"
  - expedite: "to make something happen more quickly"
- **appraise** vs **attribute** (L5)
  - appraise: "to assess the value or quality of something"
  - attribute: "a quality or feature of something"
- **appraise** vs **essence** (L5)
  - appraise: "to assess the value or quality of something"
  - essence: "the most important quality of something"
- **expedite** vs **premonition** (L5)
  - expedite: "to make something happen more quickly"
  - premonition: "a strong feeling that something is about to happen"

---

## Summary

| Category | Issues Found |
|----------|-------------|
| Synonym Clusters | See Section 1 |
| Level Misplacement | 21 words flagged |
| Duplicate Definitions | 3 |
| False Friend Pairs | 19 pairs |
