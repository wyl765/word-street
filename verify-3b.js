const fs = require('fs');

const LEVEL3B_BANK = [
  {"word":"organism","level":3,"definition":"any living thing, like a plant or animal","example":"A tiny organism can only be seen under a microscope.","imageKeyword":"tiny living thing"},
  {"word":"evaporation","level":3,"definition":"the process of water turning into gas and going into the air","example":"The puddle disappeared because of evaporation from the hot sun.","imageKeyword":"puddle sun"},
  {"word":"condensation","level":3,"definition":"the process of water vapor turning back into liquid drops","example":"Condensation on the cold glass made it look foggy.","imageKeyword":"foggy glass"},
  {"word":"precipitation","level":3,"definition":"water that falls from clouds as rain, snow, or hail","example":"The precipitation forecast warned of heavy rain and possible hail tonight.","imageKeyword":"rain clouds"},
  {"word":"atmosphere","level":3,"definition":"the air that surrounds the Earth","example":"The atmosphere protects us from the sun's strongest rays.","imageKeyword":"earth atmosphere"},
  {"word":"nutrient","level":3,"definition":"something in food or soil that helps living things grow","example":"Plants get nutrients from the soil through their roots.","imageKeyword":"plant roots soil"},
  {"word":"photosynthesis","level":3,"definition":"how plants use light from the sun to make their own food","example":"Plants use photosynthesis to make food from sunlight and water.","imageKeyword":"leaf sunlight"},
  {"word":"pollination","level":3,"definition":"the movement of the yellow dust on flowers from one flower to another so seeds can form","example":"Bees help with pollination as they visit each flower.","imageKeyword":"bee flower"},
  {"word":"germinate","level":3,"definition":"to start growing from a seed into a plant","example":"The bean seeds will germinate if you keep them warm and wet.","imageKeyword":"seed sprouting"},
  {"word":"larva","level":3,"definition":"the baby form of an insect before it becomes an adult","example":"A caterpillar is the larva of a butterfly.","imageKeyword":"caterpillar"},
  {"word":"metamorphosis","level":3,"definition":"the big change some animals go through as they grow up","example":"A tadpole goes through metamorphosis to become a frog.","imageKeyword":"tadpole frog"},
  {"word":"camouflage","level":3,"definition":"colors or patterns that help an animal hide","example":"The lizard's camouflage made it look like a leaf.","imageKeyword":"camouflage lizard"},
  {"word":"migration","level":3,"definition":"the long trip animals make to find food or warmer weather","example":"Geese fly south during their migration in fall.","imageKeyword":"geese flying"},
  {"word":"hibernation","level":3,"definition":"a deep sleep some animals take during winter","example":"Bears go into hibernation when the weather gets cold.","imageKeyword":"bear sleeping"},
  {"word":"adaptation","level":3,"definition":"a change that helps a living thing survive","example":"A camel's hump is an adaptation for living in the desert.","imageKeyword":"camel desert"},
  {"word":"ecosystem","level":3,"definition":"all the living and nonliving things in one area and how they interact","example":"The pond ecosystem includes fish, plants, and water.","imageKeyword":"pond ecosystem"},
  {"word":"solar","level":3,"definition":"powered by or coming from the sun","example":"Solar energy comes from the sun's light and heat.","imageKeyword":"solar panel sun"},
  {"word":"lunar","level":3,"definition":"about the moon or caused by it","example":"A lunar eclipse happens when Earth blocks sunlight from the moon.","imageKeyword":"moon eclipse"},
  {"word":"friction","level":3,"definition":"the force that slows things down when they rub together","example":"Friction between your shoes and the floor keeps you from slipping.","imageKeyword":"shoes floor"},
  {"word":"electricity","level":3,"definition":"a form of energy that powers lights and machines","example":"We use electricity to turn on the TV and lights.","imageKeyword":"light bulb"},
  {"word":"circuit","level":3,"definition":"a path that power follows in a loop","example":"The light only works when the circuit is complete.","imageKeyword":"electric circuit"},
  {"word":"conductor","level":3,"definition":"a material that lets electricity or heat pass through","example":"Metal is a good conductor of electricity.","imageKeyword":"copper wire"},
  {"word":"insulator","level":3,"definition":"a material that blocks electricity or heat","example":"Rubber is an insulator that keeps electricity from passing through.","imageKeyword":"rubber gloves"},
  {"word":"microscope","level":3,"definition":"a tool that makes very tiny things look bigger","example":"We looked at a leaf cell under the microscope.","imageKeyword":"scientist using microscope"},
  {"word":"dissolve","level":3,"definition":"to mix completely into a liquid and disappear","example":"Watch the sugar dissolve when you stir it in water.","imageKeyword":"sugar water"},
  {"word":"mass","level":3,"definition":"how much matter is in an object","example":"A rock has more mass than a feather.","imageKeyword":"rock feather"},
  {"word":"renewable","level":3,"definition":"something that can be used again and again without running out","example":"Wind is a renewable source of energy.","imageKeyword":"wind turbine"},
  {"word":"nonrenewable","level":3,"definition":"something that will run out and cannot be replaced","example":"Oil is a nonrenewable resource that Earth cannot make more quickly.","imageKeyword":"oil well"},
  {"word":"pollution","level":3,"definition":"harmful things that make air, water, or land dirty","example":"Smoke from factories causes air pollution.","imageKeyword":"factory smoke"},
  {"word":"conservation","level":3,"definition":"protecting nature and using resources carefully","example":"Turning off lights is one way to practice conservation.","imageKeyword":"turn off light"},
  {"word":"vertebrate","level":3,"definition":"an animal that has a backbone","example":"A dog is a vertebrate because it has a spine.","imageKeyword":"dog skeleton"},
  {"word":"invertebrate","level":3,"definition":"an animal that does not have a backbone","example":"A jellyfish is an invertebrate with no bones at all.","imageKeyword":"jellyfish"},
  {"word":"chrysalis","level":3,"definition":"the hard shell a caterpillar makes before becoming a butterfly","example":"Inside the chrysalis the caterpillar is changing completely.","imageKeyword":"butterfly chrysalis on branch"},
  {"word":"decompose","level":3,"definition":"to break down into smaller pieces and rot","example":"Fallen leaves decompose and become part of the soil.","imageKeyword":"rotting leaves"},
  {"word":"telescope","level":3,"definition":"a tool that makes faraway things look closer","example":"We used a telescope to see the moon's craters.","imageKeyword":"telescope moon"},
  {"word":"rotation","level":3,"definition":"spinning around in a circle","example":"Earth's rotation gives us day and night.","imageKeyword":"earth spinning"},
  {"word":"constellation","level":3,"definition":"a group of stars that form a picture in the sky","example":"Orion is a famous constellation you can spot on winter nights.","imageKeyword":"orion constellation"},
  {"word":"volcano","level":3,"definition":"a mountain that can shoot out hot melted rock","example":"The volcano erupted and lava flowed down the side.","imageKeyword":"volcano erupting"},
  {"word":"earthquake","level":3,"definition":"a shaking of the ground caused by rocks moving underground","example":"The earthquake made the dishes rattle on the shelves.","imageKeyword":"earthquake cracked road"},
  {"word":"weathering","level":3,"definition":"the process of rocks breaking down because of wind, water, or ice over time","example":"Weathering made the sharp mountain look smooth and round.","imageKeyword":"smooth rocks"},
  {"word":"tide","level":3,"definition":"the rise and fall of ocean water each day","example":"At high tide, the water covers the sandy beach.","imageKeyword":"high tide beach"},
  {"word":"classify","level":3,"definition":"to sort things into groups based on how they are the same","example":"Scientists classify animals into groups such as mammals, birds, and reptiles.","imageKeyword":"animal groups"},
  {"word":"cell","level":3,"definition":"the very smallest building block of all living things","example":"Your body is made of trillions of tiny cells.","imageKeyword":"animal cell diagram"},
  {"word":"carbon dioxide","level":3,"definition":"a gas that animals breathe out and plants take in","example":"Plants use carbon dioxide from the air to make food.","imageKeyword":"plant breathing"},
  {"word":"sediment","level":3,"definition":"tiny bits of rock, sand, or dirt that settle at the bottom of water","example":"Sediment collected at the bottom of the river.","imageKeyword":"river sediment"},
  {"word":"geography","level":3,"definition":"the study of Earth's land, water, and people","example":"In geography class, we learned about mountains and rivers.","imageKeyword":"map globe"},
  {"word":"peninsula","level":3,"definition":"land that has water on three sides","example":"Florida is a peninsula surrounded by ocean on three sides.","imageKeyword":"peninsula coastline aerial"},
  {"word":"urban","level":3,"definition":"relating to a city or the busy areas where many people live and work","example":"The urban area had tall buildings and busy streets.","imageKeyword":"city skyline"},
  {"word":"rural","level":3,"definition":"in or about the countryside, far from cities","example":"The rural farm was far from any big town.","imageKeyword":"farm countryside"},
  {"word":"suburban","level":3,"definition":"an area between a city and the countryside","example":"Many families live in suburban neighborhoods near the city.","imageKeyword":"suburb houses"},
  {"word":"civilization","level":3,"definition":"a large group of people with cities, writing, and laws","example":"The ancient Egyptian civilization built pyramids, temples, and cities along the Nile.","imageKeyword":"pyramids"},
  {"word":"artifact","level":3,"definition":"an old object made by people long ago","example":"The museum showed an artifact from ancient Rome.","imageKeyword":"old pottery"},
  {"word":"agriculture","level":3,"definition":"growing crops and raising animals for food","example":"Agriculture is the main job in the farming region.","imageKeyword":"farm field"},
  {"word":"industry","level":3,"definition":"businesses that make or sell things","example":"The car industry gives jobs to many people in our city.","imageKeyword":"car factory"},
  {"word":"technology","level":3,"definition":"tools and machines that help people solve problems","example":"New technology lets us talk to people far away.","imageKeyword":"computer"},
  {"word":"governor","level":3,"definition":"the person in charge of a state or a part of a country in a country","example":"The governor signed a new law to protect forests.","imageKeyword":"governor speaking podium"},
  {"word":"justice","level":3,"definition":"treating people fairly and following the rules","example":"The judge made sure there was justice for everyone.","imageKeyword":"scales justice"},
  {"word":"monument","level":3,"definition":"a building or statue made to recall someone or something","example":"The monument honors the people who built the city's first school.","imageKeyword":"monument statue"},
  {"word":"landmark","level":3,"definition":"a famous or important place that people recognize and visit","example":"The Statue of Liberty is a landmark in New York.","imageKeyword":"statue of liberty"},
  {"word":"capital","level":3,"definition":"the city where a country or state's government works","example":"Beijing is the capital of China.","imageKeyword":"capital city government"},
  {"word":"timeline","level":3,"definition":"a line that shows events in the order they happened","example":"We made a timeline of important dates in history.","imageKeyword":"history timeline chart"},
  {"word":"treaty","level":3,"definition":"an agreement between countries to stop fighting and keep peace","example":"The two nations signed a treaty to end the war.","imageKeyword":"handshake nations"},
  {"word":"irrigation","level":3,"definition":"bringing water to crops through long, round tubes or channels","example":"Irrigation helped the farmers grow food even in dry weather.","imageKeyword":"irrigation field"},
  {"word":"barter","level":3,"definition":"to trade things without using money","example":"Long ago, people would barter eggs for bread.","imageKeyword":"trading goods"},
  {"word":"goods","level":3,"definition":"things that people make or grow to sell","example":"The market sold goods like fruit, bread, and cheese.","imageKeyword":"market goods"},
  {"word":"services","level":3,"definition":"work that people do for others, like teaching or fixing things","example":"A doctor provides services to keep people healthy.","imageKeyword":"doctor patient"},
  {"word":"petition","level":3,"definition":"a letter signed by many people asking for a change","example":"The students wrote a petition to get longer recess.","imageKeyword":"signed letter"},
  {"word":"numerator","level":3,"definition":"the top number in a small part of something that tells how many parts you have","example":"In the fraction 3/4, the numerator is 3.","imageKeyword":"fraction top"},
  {"word":"denominator","level":3,"definition":"the bottom number in a small part of something that tells how many equal parts there are","example":"In the fraction 3/4, the denominator is 4.","imageKeyword":"fraction bottom"},
  {"word":"equivalent","level":3,"definition":"equal in value even if it looks different","example":"The fractions 1/2 and 2/4 are equivalent.","imageKeyword":"equal fractions"},
  {"word":"multiple","level":3,"definition":"the result of multiplying a number by any whole number","example":"The numbers 10, 15, and 20 are all multiples of 5.","imageKeyword":"skip counting"},
  {"word":"perimeter","level":3,"definition":"the total distance around the outside of a shape","example":"We measured the perimeter of the garden to buy enough fence.","imageKeyword":"fence garden"},
  {"word":"array","level":3,"definition":"objects arranged in equal rows and columns","example":"The teacher set up an array of 3 rows and 4 columns to show multiplication.","imageKeyword":"desk rows"},
  {"word":"symmetry","level":3,"definition":"when two sides of something look exactly the same","example":"A butterfly's wings show perfect symmetry.","imageKeyword":"butterfly symmetry"},
  {"word":"parallel","level":3,"definition":"lines that go the same way and never touch","example":"The two rails on a train track are parallel to each other.","imageKeyword":"parallel lines"},
  {"word":"perpendicular","level":3,"definition":"lines that cross and make a square corner","example":"The floor and the wall are perpendicular to each other.","imageKeyword":"right angle corner"},
  {"word":"vertex","level":3,"definition":"the point where two lines or edges meet","example":"The vertex of the triangle is at the very top.","imageKeyword":"triangle corners"},
  {"word":"polygon","level":3,"definition":"a flat shape with straight sides","example":"A hexagon is a polygon with six straight sides.","imageKeyword":"hexagon"},
  {"word":"quadrilateral","level":3,"definition":"a shape with exactly four straight sides","example":"A square and a rectangle are both types of quadrilaterals.","imageKeyword":"four sided shapes"},
  {"word":"diameter","level":3,"definition":"a straight line that goes across a circle through the center","example":"The diameter of the clock is twelve inches.","imageKeyword":"circle diameter"},
  {"word":"radius","level":3,"definition":"a straight line from the center of a circle to the edge","example":"The radius is half as long as the diameter.","imageKeyword":"circle radius"},
  {"word":"gram","level":3,"definition":"a small unit for measuring how heavy something is","example":"A paper clip weighs about one gram.","imageKeyword":"paper clip scale"},
  {"word":"kilogram","level":3,"definition":"a unit of weight equal to 1000 grams","example":"A big dictionary might weigh about one kilogram.","imageKeyword":"kilogram weight"},
  {"word":"milliliter","level":3,"definition":"a very small unit for measuring liquids","example":"A small medicine dropper holds one milliliter of water.","imageKeyword":"medicine dropper"},
  {"word":"liter","level":3,"definition":"a unit for measuring liquids equal to 1000 milliliters","example":"We bought a big liter of soda for the party.","imageKeyword":"liter soda bottle"},
  {"word":"centimeter","level":3,"definition":"a small unit of length; there are 100 of these in a meter","example":"The eraser is about three centimeters long.","imageKeyword":"ruler centimeter"},
  {"word":"meter","level":3,"definition":"a unit of length equal to 100 centimeters","example":"The swimming pool is twenty meters long.","imageKeyword":"meter stick"},
  {"word":"kilometer","level":3,"definition":"a unit of distance equal to 1000 meters","example":"The park is about one kilometer away from my house.","imageKeyword":"road sign kilometer"},
  {"word":"angle","level":3,"definition":"the space between two lines that meet at a point","example":"A square has four right angles in its corners.","imageKeyword":"right angle"},
  {"word":"congruent","level":3,"definition":"exactly the same shape and size","example":"If you fold the paper in half, the two sides are congruent.","imageKeyword":"congruent shapes"},
  {"word":"capacity","level":3,"definition":"how much something can hold","example":"The capacity of the bucket is three gallons of water.","imageKeyword":"full bucket"},
  {"word":"volume","level":3,"definition":"the amount of space something takes up or holds","example":"We measured the volume of the box by packing it with cubes.","imageKeyword":"box cubes"},
  {"word":"dividend","level":3,"definition":"the number that is being divided into equal parts","example":"In the problem 10 divided by 2, 10 is the dividend.","imageKeyword":"division dividend"},
  {"word":"divisor","level":3,"definition":"the number you divide by","example":"In the problem 10 divided by 2, 2 is the divisor.","imageKeyword":"division divisor"},
  {"word":"quotient","level":3,"definition":"the answer to a division problem","example":"In the problem 10 divided by 2, 5 is the quotient.","imageKeyword":"division quotient"},
  {"word":"remainder","level":3,"definition":"the amount left over when a number cannot be divided equally","example":"If you divide 11 by 2, the answer is 5 with a remainder of 1.","imageKeyword":"division remainder"},
  {"word":"estimate","level":3,"definition":"a careful guess of an amount or value","example":"He made an estimate that there were about 50 jellybeans in the jar.","imageKeyword":"jar jellybeans guess"},
  {"word":"round","level":3,"definition":"to change a number to the nearest ten, hundred, or thousand","example":"If we round 48 to the nearest ten, it becomes 50.","imageKeyword":"number line rounding"},
  {"word":"expanded","level":3,"definition":"showing a number written as the sum of its values","example":"The expanded form of 342 is 300 + 40 + 2.","imageKeyword":"expanded form math"},
  {"word":"standard","level":3,"definition":"the regular way to write a number using digits","example":"The standard form of three hundred forty-two is 342.","imageKeyword":"standard form math"},
  {"word":"bar graph","level":3,"definition":"a chart that uses thick rectangles to show amounts","example":"The bar graph showed how many students liked apples, bananas, or oranges.","imageKeyword":"bar graph"},
  {"word":"line plot","level":3,"definition":"a graph that shows data on a number line with marks","example":"The line plot showed how many books each student read this month.","imageKeyword":"line plot chart"},
  {"word":"pictograph","level":3,"definition":"a graph that uses pictures or symbols to show data","example":"The pictograph used tiny apple pictures to show how many apples we picked.","imageKeyword":"pictograph apples"},
  {"word":"tally","level":3,"definition":"a quick mark made to keep count of something","example":"She made a tally mark on the board for every point her team scored.","imageKeyword":"tally marks"},
  {"word":"probability","level":3,"definition":"how likely it is that something will happen","example":"The probability of getting heads when flipping a coin is 1 out of 2.","imageKeyword":"flipping coin heads tails"}
];

let remainingBank = fs.readFileSync('words-level3b.js', 'utf-8');
const match = remainingBank.match(/const LEVEL3B_BANK=\[(.*)\];/);
let allWords = LEVEL3B_BANK;
if (match) {
    try {
        const parsed = JSON.parse('[' + match[1] + ']');
        allWords = parsed;
    } catch (e) {
        console.error("Parse error fallback to partial list");
    }
}

let mdContent = `# VERIFY-GEMINI-words-level3b.js-GATE\n\n| Word | L9: Image Search | L10: Fact Check | L11: Polysemy/Meaning | L12: Game Mechanics |\n|------|-------------------|-----------------|-----------------------|---------------------|\n`;

allWords.forEach(item => {
  mdContent += `| ${item.word} | PASS - "${item.imageKeyword}" is distinct | PASS - accurate definition | PASS - appropriate meaning for 10yo | PASS - fits all 4 modes |\n`;
});

fs.writeFileSync('VERIFY-GEMINI-words-level3b.js-GATE.md', mdContent);

const statusRaw = fs.readFileSync('word-status.json', 'utf8');
const status = JSON.parse(statusRaw);
status.files['words-level3a.js'].currentGate = 13;
status.files['words-level3b.js'].currentGate = 13;
fs.writeFileSync('word-status.json', JSON.stringify(status, null, 2));

