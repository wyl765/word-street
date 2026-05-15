import fs from 'fs';

let src = fs.readFileSync('words-level1.js','utf8');
const m = src.match(/const LEVEL1_BANK=(\[.*?\]);/s);
if (!m) { console.error('Could not parse LEVEL1_BANK'); process.exit(1); }
let bank = JSON.parse(m[1]);
console.log('Parsed', bank.length, 'words');

// 1. REMOVE words
const removeWords = ['than','itsy','whether'];
bank = bank.filter(w => !removeWords.includes(w.word));
console.log('After removing:', bank.length);

// 2. Extract words to MOVE to level 2
const moveWords = ['drought','nowadays','meanwhile','average','content','miserable','embarrassed','frustrated'];
const movedEntries = bank.filter(w => moveWords.includes(w.word)).map(w => ({...w, level: 2}));
bank = bank.filter(w => !moveWords.includes(w.word));
console.log('After moving:', bank.length, '| Moved:', movedEntries.length);

// 3. FIX definitions and examples
const fixes = {
  shark: { definition: 'a large ocean fish with sharp teeth and a pointed fin on top' },
  whale: { definition: 'a very large animal that lives in the ocean, breathes air, and can grow longer than a school bus' },
  dolphin: { definition: 'a smart gray ocean animal with a long snout that loves to jump and play in waves' },
  raccoon: { definition: 'an animal that comes out at night, with black fur around its eyes like a mask and clever front paws' },
  mushroom: { definition: 'a small living thing shaped like a little umbrella on a stem that grows in damp places' },
  lizard: { definition: 'a small animal with dry scaly skin, four legs, and a long tail that likes warm, sunny places' },
  turtle: { definition: 'a slow animal with a hard shell on its back that it can hide inside' },
  caterpillar: { definition: 'a small soft creature with many legs that eats leaves and later turns into a butterfly or moth' },
  passenger: { definition: 'a person who rides in a car, bus, train, or airplane' },
  lace: { definition: 'a pretty cloth with a pattern of tiny holes; also a string you tie on a shoe' },
  cracker: { definition: 'a thin, crispy baked snack that you can eat plain or with cheese' },
  jelly: { definition: 'a smooth, sweet spread made from fruit juice that you put on bread or toast' },
  dull: { definition: 'not sharp enough to cut; also boring and not interesting' },
  desert: { example: 'The desert was hot and sandy, with only a few cactuses here and there.' },
  shove: { example: 'He had to shove the heavy box across the floor.' },
  hear: { example: 'Can you hear the birds singing outside?' },
  coach: { example: 'The coach showed us how to kick the ball.' },
  bark: { definition: 'the sound a dog makes; also, the hard outside covering of a tree' },
  wave: { definition: 'to move your hand back and forth to say hello; also, a moving wall of water in the ocean' },
  sink: { definition: 'to go down under water; also, the bowl in a kitchen or bathroom where you wash things' },
  match: { definition: "something that looks the same as another; also, a thin stick that makes fire when you rub it" },
  scale: { definition: 'a thin flat piece on a fish or snake; also, a tool for weighing things' },
  tag: { definition: "a small label on something; also, a chasing game where you tap someone and say 'you're it!'" },
  stamp: { definition: 'a small sticker you put on a letter to mail it; also, to push your foot down hard' },
  palm: { definition: 'the flat inside part of your hand; also, a tall tropical tree with big leaves at the top' },
  lose: { definition: 'to not be able to find something; also, to not win a game' },
  skip: { definition: 'to move by hopping on one foot then the other; also, to leave something out or pass over it' },
  pancake: { definition: 'a flat, round, soft cake cooked on a pan, often eaten with syrup for breakfast' },
  honey: { definition: 'a thick, sweet, golden liquid that bees make' },
  popcorn: { definition: 'a fluffy white snack made from corn kernels that puff up when heated' },
  waffle: { definition: 'a flat breakfast food with a pattern of little squares, often eaten with syrup' },
  muffin: { definition: 'a small, round, soft cake, often with blueberries or chocolate chips inside' },
  soap: { definition: 'something you use with water to clean dirt off your hands and body' },
  vest: { definition: 'a piece of clothing with no sleeves that you wear over a shirt' },
  lamp: { definition: 'a light you can turn on in a room, often sitting on a table' },
  broom: { definition: 'a tall stick with a brush at the bottom, used for sweeping floors' },
  ladder: { definition: 'a tall tool with steps that you climb to reach high places' },
  spine: { definition: 'the row of bones down the middle of your back; your backbone' },
  skull: { definition: 'the hard bones of your head that protect your brain' },
  tongue: { definition: 'the soft, flat part inside your mouth that helps you taste food and talk' },
  goose: { definition: 'a large bird with a long neck that honks and lives near water' },
  eagle: { definition: 'a very large, strong bird that flies high in the sky and hunts other animals' },
  crow: { definition: 'a large black bird that is very smart and makes a loud caw sound' },
  swan: { definition: 'a large white bird with a long curved neck that lives on water' },
  moose: { definition: 'a very large animal with long legs, a big nose, and wide flat horns on its head' },
  sparrow: { definition: 'a small brown bird that eats seeds' },
  snail: { definition: 'a slow-moving animal with a soft body and a round shell on its back' },
  spider: { definition: 'a small creature with eight legs that often makes webs to catch bugs' },
  beetle: { definition: 'an insect with hard wing covers on its back' },
  toast: { definition: 'bread that has been heated until it turns brown and crispy' },
  yogurt: { definition: 'a thick, creamy food made from milk, often eaten with fruit' },
  noodle: { definition: 'a long, thin strip of food made from flour and water' },
  peanut: { definition: 'a small brown nut that grows underground in a shell', example: 'She cracked open the peanut shell and ate the nut inside.' },
  treat: { definition: 'something special and nice, like a favorite snack or dessert' },
  gravy: { definition: 'a thick, warm sauce made from meat juices, often poured on meat or potatoes' },
  besides: { definition: 'also; in addition to something else' },
  within: { definition: 'inside the edges of something' },
  freezing: { definition: 'so cold it feels like ice', example: 'The water was freezing, so no one wanted to swim.' },
  warm: { definition: 'a little hot in a nice way — not too hot, not too cold' },
  soaking: { definition: 'completely wet all over' },
  zipper: { definition: 'a fastener with two rows of teeth that lock together when you pull a small tab' },
  boot: { definition: 'a shoe that covers your foot and goes up above your ankle' },
  gigantic: { definition: 'extremely, amazingly big' },
  upon: { definition: "on — a word used mostly in fairy tales and stories" },
};

for (const entry of bank) {
  if (fixes[entry.word]) {
    if (fixes[entry.word].definition) entry.definition = fixes[entry.word].definition;
    if (fixes[entry.word].example) entry.example = fixes[entry.word].example;
  }
}

// 4. ADD missing core K-1 words
const newWords = [
  {word:'run',level:1,definition:'to move your legs fast to go somewhere quickly',example:'I had to run to catch the bus before it left.',imageKeyword:'child running'},
  {word:'play',level:1,definition:'to have fun doing something you enjoy',example:"'Come play with us!' called my friends from the yard.",imageKeyword:'children playing'},
  {word:'eat',level:1,definition:'to put food in your mouth and swallow it',example:'We eat lunch together every day at the big table.',imageKeyword:'child eating'},
  {word:'sleep',level:1,definition:'to close your eyes and rest your body and mind',example:'My cat can sleep all day in the sunny spot by the window.',imageKeyword:'child sleeping'},
  {word:'read',level:1,definition:'to look at words and understand what they mean',example:'Every night, Dad reads me a story before bed.',imageKeyword:'child reading book'},
];
bank.push(...newWords);

// 5. Rewrite formulaic example sentences
const exampleRewrites = {
  excited: 'She jumped up and down when she heard about the party.',
  scared: 'My heart beat so fast when I heard that noise in the dark!',
  nervous: 'His tummy did flip-flops before his first day at the new school.',
  surprised: '"Surprise!" everyone shouted when she walked through the door.',
  confused: 'Wait — which way do we go? The map has me all mixed up!',
  grumpy: '"Don\'t talk to me before breakfast," he said with a frown.',
  cheerful: 'She walked in with a big smile and said, "Good morning, everyone!"',
  proud: 'Look what I made all by myself! I could not stop smiling.',
  lonely: 'The new kid sat alone at lunch with nobody to talk to.',
  jealous: '"I wish I had a bike like that," she said, watching her friend ride by.',
  curious: '"What\'s inside that box?" she asked, standing on her tiptoes to peek.',
  brave: 'Even though the thunder was loud, she walked to the window and looked out.',
  gentle: '"Shhh, hold the baby chick like this," Mom whispered, showing me how.',
  fierce: 'The lion opened its mouth wide and let out a roar that shook the ground!',
  lazy: 'He just lay on the couch all morning while everyone else cleaned up.',
  clumsy: 'Oops — she knocked over her milk again for the second time today!',
  polite: '"Thank you so much," he said, holding the door open for the lady behind him.',
  greedy: '"That\'s mine! And that! And that too!" he said, grabbing all the candy.',
  stubborn: '"No, I will NOT wear the blue one," she said, crossing her arms.',
  peaceful: 'The lake was so still and quiet that you could hear a leaf drop.',
  gloomy: 'Gray clouds covered the sky and everything felt dark and sad.',
  cozy: 'I curled up under the blanket with a cup of cocoa and my favorite book.',
  enormous: 'The pumpkin was so big that Dad could not even lift it!',
  tiny: 'The ladybug was so small it fit right on the tip of my finger.',
  sparkle: 'After the rain, every leaf and blade of grass seemed to sparkle in the sun.',
  beetle: 'A beetle with a shell like black glass crawled right over my shoe!',
  swift: 'The fox was so fast it was gone before I could blink!',
  stroll: 'We took our time walking through the park, just looking at the flowers.',
  wobble: 'The baby took one step, wobbled, and plopped right down on her bottom!',
  terrified: 'She grabbed my hand so hard when the lights went out — I could feel her shaking!',
};

for (const entry of bank) {
  if (exampleRewrites[entry.word]) {
    entry.example = exampleRewrites[entry.word];
  }
}

// Write back
const suffix = src.slice(m.index + m[0].length);
const out = 'const LEVEL1_BANK=' + JSON.stringify(bank) + ';' + suffix;
fs.writeFileSync('words-level1.js', out);

// Save moved entries
fs.writeFileSync('/tmp/moved_to_level2.json', JSON.stringify(movedEntries, null, 2));

console.log('✅ Level 1 bank updated. Final word count:', bank.length);
console.log('Moved to level 2:', movedEntries.map(e => e.word).join(', '));
console.log('Removed:', removeWords.join(', '));
console.log('New words added: run, play, eat, sleep, read');
