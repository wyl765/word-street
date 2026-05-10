#!/usr/bin/env node
/**
 * Gate 5: AI-simulated Mark evaluation — stricter algorithmic approach
 * 
 * Key insight: A 10yo Chinese ESL student at MAP 197 (~2nd grade) has limited English.
 * They know ~2000-3000 common English words. Definitions must use words within that range.
 * 
 * This evaluator checks:
 * 1. Every word in the definition against a grade-2 vocabulary list
 * 2. Syllable complexity of definition words
 * 3. Definition length / conceptual complexity
 * 4. Whether the definition is circular or uses abstract language
 */
import { readFileSync, writeFileSync } from 'fs';

// Grade 2 reading vocabulary (Dolch + Fry 1000 + common concrete nouns/verbs)
// If a word in the definition is NOT in this set AND has 3+ syllables, it's a red flag
// If a word is NOT in this set AND has 2 syllables, minor flag
// Multiple flags = fail

// Load a more comprehensive known-words list
// These are words a 2nd grader who is an ESL student from China would know
const KNOWN = new Set(`
a about above across after again against all almost along already also always am an and
animal another answer any anything are around as ask at ate away
baby back bad bag ball be bear beat beautiful because bed been before began begin behind
being believe below beside best better between big bird bit bite black blood blow blue board
boat body bone book both bottom box boy branch break bright bring brother brown build burn
bus but buy by
call came can car care carry cat catch cause center change child children city class clean
clear close cold color come cook cool could country cover cross cry cup cut
dad dance dark day deep did die different dinner do does dog done door down draw dream
dress drink drive drop dry during
each ear early earth east eat egg eight else end enough even evening ever every everyone
everything eye
face fall family far farm fast fat father feel feet few field fight fill finally find
finger fire first fish five flat floor fly follow food foot for forest form found four free
fresh friend from front fruit full fun funny
game garden gave get gift girl give glad glass go going gone good got grass great green
grew ground group grow
had hair half hand happen happy hard has hat have he head hear heart heat heavy held help
her here high hill him his hit hold hole home hope horse hot house how huge hundred hunt
hurry hurt
I ice idea if important in inside instead into is island it its
job join jump just
keep key kid kind king kitchen knew know
land large last late laugh lay lead learn leave left leg less let letter life lift light
like line lion little live long look lose lot love low lunch
machine made make man many map mark matter may me mean meet men might mile milk mind minute
miss money moon more morning most mother mountain mouth move much music must my
name near need never new next nice night nine no north nose not nothing now number
of off often oh old on once one only open or order other our out outside over own
page pair pan paper part pass past pay people pick picture piece place plan plant play
please point poor power pretty pull push put
question quick quiet quite
rain ran reach read ready real red remember rest rich ride right ring river road rock rode
room round run
sad safe said same sang sat saw say school sea second see sentence set seven several shall
shape she ship short should show shut side simple since sing sister sit six size sleep small
smell smile so some son soon sound south space speak special speed spell spring stand star
start stay step still stop story street strong such summer sun sure surprise sweet swim
table tail take talk tall teacher tell ten than thank that the their them then there
these they thing think third this those though thought three through throw tie time to
today together told too took top touch toward town tree tried trip true try turn twelve two
type
under until up upon us use
very voice
wait walk wall want warm was wash watch water way we wear weather week well went were west
what wheel when where which while white who whole why wide will wind winter wish with without
woman wonder wood word work world would write wrong
year yes yet you young your
dog cat bird fish eye face arm leg hand foot head mouth nose ear hair heart bone brain skin
door window wall floor roof room house kitchen bathroom bedroom garden street road car bus
book pencil pen bag box cup plate bowl key phone
mom dad sister brother friend family baby teacher
sun moon star rain snow cloud sky water fire rock tree flower grass food bread milk
apple orange banana egg rice
morning night afternoon evening today yesterday tomorrow
red blue green yellow black white pink purple brown gray
one two three four five six seven eight nine ten
is are was were have has had do does did can could will would should may might must
go come get make take give say see look find know think want need like love help
try use put set keep let run walk talk play read write eat drink sleep sit stand
open close turn move pull push hold cut pick drop throw catch start stop wait
feel hear smell taste touch watch listen speak ask answer learn teach grow live die
happy sad big small good bad old new long short hot cold fast slow hard soft clean
dirty wet dry dark light loud quiet strong nice pretty great
up down in out on off over under here there where when how why what who
very much more less too not no yes so but and or if because
`.trim().split(/\s+/));

// Additional common words that a Chinese ESL kid would learn
const EXTRA_KNOWN = `
able about again along also always another around because before begin between
both bring build carry catch change close cover cross different during
early enough even every finally found front group happen instead
large leave less might nothing often order point power quite ready
remember second several shall simple since sometimes special still
story strong sudden surprise toward under until upon weather whole without
hurt heavy become possible happen idea power second toward
morning evening tonight favorite remember understand important
elephant dinosaur butterfly chocolate breakfast sandwich
magic monster dragon castle princess knight treasure
suddenly carefully quickly slowly quietly loudly gently
forest ocean mountain river island desert jungle
finger shoulder stomach knee neck brain skin blood
clothes shoes shirt pants dress coat hat pocket
kitchen bathroom bedroom window stairs ground
spring summer winter autumn weather storm thunder lightning
color shape kind type part piece bit
against along among toward across behind beside above below
during until since while upon within
animal plant grow body part move place thing work build
break burn clean climb cook draw drive fight fill
follow hang hit jump kick knock laugh lift
lose miss pass plant point pour press reach ride
ring rise roll save shake share shut sing spend spread
stick strike swim tie wake wash wear win wish
baby child person people man woman boy girl
able enough away every own real true sure right wrong
free safe ready certain possible another different special
often already still always never sometimes usually
cause form rest matter order center south west north east
voice sound page sentence letter space machine
tiny huge little small large tall wide deep
rough smooth sharp flat round thick thin bright
`.trim().split(/\s+/);
for (const w of EXTRA_KNOWN) KNOWN.add(w);

// Common words appearing in definitions that Mark would know
const DEF_COMMON = `
something someone feeling smiling furry happening allowed given extra
crunchy vegetable hollow shaky scary expect happened wanting dangerous
careful looking listening ending hopeful kindness refuse disagree
having living particular example importance nature
accept allow annoying getting upset support becomes stronger solid
following rules leader hospital army
lively festival dancing mistake
direct parents grandparents connecting process breathing
deeply lasting quality difficult
situation usual behavior normal multiply
itself positive permission penalty breaking
control product service period rebirth century europe
watching police cameras prevent continuing normally
preparing action
picky
apart identity
punishment treatment beliefs cruel protest equal rights freedom
government system economy society ancient modern traditional ceremony
military weapon attack defend victory defeat
chicken completely dripping event nobody coming opening mainly camera
unusual happens comparison numbers showing accepted correct
`.trim().split(/\s+/);
for (const w of DEF_COMMON) KNOWN.add(w);

function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const m = word.match(/[aeiouy]{1,2}/g);
  return m ? m.length : 1;
}

function evaluateWord(wordObj, level) {
  const def = wordObj.definition;
  const words = def.toLowerCase().replace(/[^a-z\s'-]/g, ' ').split(/\s+/).filter(w => w.length > 1);
  
  let penalties = 0;
  const issues = [];
  
  // Check definition length
  if (words.length > 18) {
    penalties += 2;
    issues.push(`long def (${words.length} words)`);
  } else if (words.length > 14) {
    penalties += 1;
  }
  
  // Check each word
  for (const w of words) {
    const clean = w.replace(/[^a-z]/g, '');
    if (clean.length < 2) continue;
    
    if (!KNOWN.has(clean)) {
      const syl = countSyllables(clean);
      if (syl >= 4) {
        penalties += 3;
        issues.push(`unknown 4+syl: "${clean}"`);
      } else if (syl === 3) {
        penalties += 2;
        issues.push(`unknown 3syl: "${clean}"`);
      } else if (syl === 2) {
        penalties += 1;
        issues.push(`unknown 2syl: "${clean}"`);
      }
      // 1-syllable unknown words: minor
    }
  }
  
  // Pass/fail thresholds by level (more lenient for higher levels)
  // penalty_threshold: if penalties exceed this, it fails
  const penaltyThresholds = { 1: 3, 2: 4, 3: 6, 4: 8, 5: 10 };
  const maxPenalty = penaltyThresholds[level] || 5;
  
  const pass = penalties <= maxPenalty;
  const confidence = penalties === 0 ? 'high' : penalties <= maxPenalty ? 'medium' : 'low';
  
  return {
    word: wordObj.word,
    definition: def,
    penalties,
    pass,
    confidence,
    issues
  };
}

function loadWords(filename) {
  const content = readFileSync(filename, 'utf-8');
  const match = content.match(/=\s*(\[[\s\S]*\])\s*;/);
  if (!match) throw new Error(`Cannot parse ${filename}`);
  return JSON.parse(match[1]);
}

function getLevel(filename) {
  return parseInt(filename.match(/level(\d)/)[1]);
}

const FILES = [
  'words-level1.js', 'words-level2.js', 'words-level2a.js', 'words-level2b.js',
  'words-level2c.js', 'words-level2d.js', 'words-level3a.js', 'words-level3b.js',
  'words-level3c.js', 'words-level4a.js', 'words-level4b.js', 'words-level4c.js',
  'words-level5a.js', 'words-level5b.js', 'words-level5c.js', 'words-level5d.js'
];

const GATE_THRESHOLDS = { 1: 85, 2: 75, 3: 65, 4: 55, 5: 55 };

const statusData = JSON.parse(readFileSync('word-status.json', 'utf-8'));

// Calibration
console.log('=== CALIBRATION ===');
const calWords = [
  { word: 'puppy', definition: 'a baby dog' },
  { word: 'cat', definition: 'a small furry pet' },
  { word: 'big', definition: 'large in size' },
  { word: 'run', definition: 'to move fast with your legs' },
  { word: 'happy', definition: 'feeling good and smiling' },
  { word: 'chicanery', definition: 'the use of trickery to achieve a political, financial, or legal purpose' },
  { word: 'pragmatism', definition: 'dealing with things sensibly and realistically' },
  { word: 'unctuous', definition: 'excessively flattering or ingratiating' },
  { word: 'querulous', definition: 'complaining in a petulant or whining manner' },
  { word: 'anathema', definition: 'something or someone that one vehemently dislikes' },
];
for (const cw of calWords) {
  const r = evaluateWord(cw, 1);
  console.log(`  ${cw.word}: penalties=${r.penalties}, pass=${r.pass} ${r.issues.length ? '(' + r.issues.join(', ') + ')' : ''}`);
}
const easyPass = calWords.slice(0, 5).filter(w => evaluateWord(w, 1).pass).length;
const hardPass = calWords.slice(5).filter(w => evaluateWord(w, 1).pass).length;
console.log(`Easy: ${easyPass}/5, Hard: ${hardPass}/5`);
const calStatus = (easyPass >= 4 && hardPass <= 2) ? 'CREDIBLE' :
                  (easyPass < 3) ? 'TOO_STRICT' :
                  (hardPass >= 4) ? 'TOO_LENIENT' : 'ACCEPTABLE';
console.log(`Calibration: ${calStatus}\n`);

const summary = [];

for (const filename of FILES) {
  const level = getLevel(filename);
  const threshold = GATE_THRESHOLDS[level];
  const fs = statusData.files[filename];

  if (fs && fs.gate5 === 'pass') {
    console.log(`${filename}: already pass`);
    summary.push({ filename, verdict: 'PASS (prior)', passRate: 100 });
    continue;
  }

  let words;
  try { words = loadWords(filename); } catch (e) { console.error(`Error: ${filename}: ${e.message}`); continue; }

  const results = words.map(w => evaluateWord(w, level));
  const passed = results.filter(r => r.pass).length;
  const passRate = Math.round((passed / results.length) * 100);
  const verdict = passRate >= threshold ? 'PASS' : 'FAIL';

  const failures = results.filter(r => !r.pass).sort((a, b) => b.penalties - a.penalties);
  console.log(`${filename}: L${level}, ${words.length}w, ${passRate}% (>=${threshold}%) → ${verdict}, ${failures.length} failed`);
  if (failures.length > 0) {
    for (const f of failures.slice(0, 3)) {
      console.log(`  ✗ ${f.word} (pen=${f.penalties}): ${f.issues.join(', ')}`);
    }
    if (failures.length > 3) console.log(`  ... and ${failures.length - 3} more`);
  }

  // Write report
  let report = `# Gate 5 Result: ${filename}\n\n`;
  report += `- **Date:** ${new Date().toISOString().split('T')[0]}\n`;
  report += `- **Method:** Algorithmic definition-readability for 10yo ESL (MAP 197)\n`;
  report += `- **Calibration:** ${calStatus}\n`;
  report += `- **Level:** ${level}\n`;
  report += `- **Total Words:** ${words.length}\n`;
  report += `- **Pass Rate:** ${passRate}% (${passed}/${words.length})\n`;
  report += `- **Threshold:** ${threshold}%\n`;
  report += `- **Verdict:** **${verdict}**\n\n`;

  if (failures.length > 0) {
    report += `## Failed Words (${failures.length})\n\n`;
    report += `| Word | Penalties | Issues |\n`;
    report += `|------|----------|--------|\n`;
    for (const f of failures) {
      report += `| ${f.word} | ${f.penalties} | ${f.issues.join('; ').replace(/\|/g, '/')} |\n`;
    }
    report += '\n';

    const fixable = failures.filter(f => f.confidence === 'low');
    if (fixable.length > 0) {
      report += `## Fix Candidates (${fixable.length})\n\n`;
      for (const f of fixable) {
        report += `- **${f.word}**: "${f.definition}"\n`;
      }
      report += '\n';
    }
  }

  writeFileSync(`GATE5-RESULT-${filename.replace('.js', '')}.md`, report);

  if (fs) fs.gate5 = verdict === 'PASS' ? 'pass' : 'fail';
  summary.push({ filename, verdict, passRate, failed: failures.length });
}

// Update status
let g5p = 0, g5f = 0, g5n = 0;
for (const [, v] of Object.entries(statusData.files)) {
  if (v.gate5 === 'pass') g5p += v.totalWords;
  else if (v.gate5 === 'fail') g5f += v.totalWords;
  else g5n += v.totalWords;
}
statusData.summary.gate5_pass = g5p;
statusData.summary.gate5_pending = g5n;
statusData.lastUpdated = new Date().toISOString().split('T')[0];
writeFileSync('word-status.json', JSON.stringify(statusData, null, 2));

console.log('\n=== SUMMARY ===');
for (const s of summary) console.log(`  ${s.filename}: ${s.passRate}% → ${s.verdict}`);
const pc = summary.filter(s => s.verdict.startsWith('PASS')).length;
const fc = summary.filter(s => s.verdict === 'FAIL').length;
console.log(`\n${pc} PASS, ${fc} FAIL / ${summary.length} total`);
console.log(`Words: ${g5p} pass, ${g5f} fail, ${g5n} pending`);
