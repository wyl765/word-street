import fs from 'fs';
import path from 'path';

const DIR = '/Users/percy/.openclaw/workspace/projects/word-street';

// === "I'd use this word wrong" fixes ===
// These definitions either start with "not" (negative-only) or are too short.
// We rewrite them to be positive/descriptive.

const misuseFixes = {
  // "not X" definitions that need positive rewriting
  'shallow': 'having only a little water or space from top to bottom',
  'thin': 'very flat and narrow from one side to the other, like a piece of paper',
  'dull': 'having a flat, worn edge that cannot cut',
  'brave': 'willing to face scary things even when your heart is pounding',
  'wild': 'living free in nature without any human care',
  'plain': 'simple, with nothing extra added to it',
  'loose': 'fitting with extra room so it can wiggle or slide around',
  'crooked': 'bent or curved when it should be straight',
  'ugly': 'looking bad or unpleasant',
  'foolish': 'silly in a bad way, doing things without thinking',
  'lazy': 'wanting to sit around and do nothing instead of working',
  'slowly': 'taking a long time; moving in no hurry',
  'apart': 'away from each other, with space in between',
  'without': 'having none of something; missing it completely',
  'confused': 'mixed up and unsure what is happening',
  'bored': 'feeling dull because there is nothing fun to do',
  'uncomfortable': 'feeling uneasy or bothered in your body',
  'few': 'a small number; only some',
  'none': 'zero; nothing at all',
  'average': 'in the middle, the usual amount — like most others',
  'recently': 'a short time ago; just before now',
  'occasionally': 'once in a while; happening some times but not all the time',
  'courageous': 'brave; willing to do hard or scary things',
  'determined': 'keeping on trying no matter what gets in the way',
  'alive': 'living; breathing and growing',
  'asleep': 'in a state of sleep, with eyes closed and body resting',
  'attempt': 'a try; when you give something a shot',
  'awake': 'having your eyes open and your mind working; done sleeping',
  'begin': 'to start something; to do the first step',
  'center': 'the middle point, the same distance from every edge',
  'close': 'to shut something so it is no longer open',
  'far': 'a long way away; you would need a lot of steps to get there',
  'finish': 'to end something; to get to the last part and be done',
  'glad': 'happy; feeling good inside',
  'glitter': 'to sparkle and flash with tiny bits of light',
  'hidden': 'put somewhere hard to find; tucked away out of sight',
  'never': 'at no time; it will not happen, ever',
  'outside': 'in the open air, beyond the walls of a building',
  'raise': 'to lift something up higher',
  'safe': 'protected from harm; in a place where nothing bad can happen',
  'stuck': 'held in place and unable to move',
  'little': 'small in size; tiny',
  'under': 'below something; lower than it',
  'bold': 'willing to take risks and do big things without fear',
  'dim': 'having only a small amount of light; hard to see in',
  'helpless': 'weak and unable to do anything on your own',
  'humble': 'quiet about your own skills; letting actions speak instead of bragging',
  'innocent': 'having done nothing wrong; free of blame',
  'invisible': 'impossible to see, as if it were not there',
  'rare': 'very hard to find because there are so few',
  'raw': 'still in its natural state, with no cooking or heat used',
  'rude': 'saying or doing mean things that hurt people\'s feelings',
  'soft': 'easy to press or squeeze; gentle to the touch, like a pillow',
  'serious': 'meaning what you say; focused and not joking around',
  'weak': 'having little strength or power',
  'partly': 'to some degree; only a piece of the whole, with more left over',
  'ordinary': 'plain and usual, just like everything else around it',
  'reluctant': 'slow to act because of doubt; unsure and holding back',
  'temporary': 'lasting only a short while, then going away',
  'ambiguous': 'unclear because it could mean more than one thing',
  'deficiency': 'a lack; when you have less of something than you need',
  'forgiving': 'ready to let go of anger when someone says sorry',
  'impatient': 'wanting things right now and finding it hard to wait',
  'mean': 'saying or doing hurtful things to others on purpose',
  'modest': 'quiet about yourself; choosing to keep your wins to yourself instead of bragging',
  'except': 'leaving one thing out; everything else but this one',
  'neutral': 'staying in the middle and choosing neither side in a fight',
  'passive': 'sitting back and letting things happen instead of acting',
  'biased': 'favoring one side over the other; unfair',
  'careless': 'rushing and making mistakes because you skip paying attention',
  'ignorant': 'lacking knowledge about something because you never learned it',
  'inferior': 'lower in quality when compared to something else',
  'moderate': 'in between; neither too much nor too little',
  'naked': 'bare; with no clothes or covering at all',
  'partial': 'only a part of the whole, with pieces still missing',
  'affordable': 'cheap enough that you can pay for it without worry',
  'idle': 'doing nothing at all; sitting still with no task',
  'impervious': 'completely sealed so nothing can get through; also, unbothered by something',
  'extraneous': 'extra and unneeded; having nothing to do with the main idea',
  'immutable': 'fixed forever; impossible to change',
  'innocuous': 'harmless and unlikely to bother anyone',
  'mendacious': 'full of lies; tending to say things that are untrue',
  'oblique': 'indirect and unclear in meaning; coming at an angle',
  'precarious': 'shaky and dangerous; likely to fall or fail at any moment',
  'irrational': 'going against reason or logic; making no sense',
  'nonpartisan': 'open to all sides and tied to no single political party',
  'obscure': 'little-known and hard to understand',
  'opaque': 'solid enough that you cannot see through it; also, hard to understand',
  'stagnant': 'still and unmoving, with no flow or change',
  'inconclusive': 'ending without a clear answer or result',
  'inauspicious': 'showing signs that things may go badly',
  'abiotic': 'relating to the non-living parts of nature, like rocks, water, and air',
  'tentative': 'unsure and subject to change; done with caution',
  'illicit': 'against the law or the rules; forbidden',
  'reticent': 'quiet and slow to share thoughts or feelings',
  'unassuming': 'quiet and modest, blending in rather than standing out',
  'unobtrusive': 'staying in the background and drawing little attention',
  'untenable': 'too weak to hold up or defend',
  'unwitting': 'unaware of what is happening; doing something by accident',
  'benign': 'harmless and gentle; kind',
  'neutrality': 'the state of staying in the middle and choosing no side in a fight',
  'illegitimate': 'against the law or rules; having no right to be there',
  'frivolous': 'silly and unimportant; lacking a serious purpose',
  'inadvertent': 'done by accident, without meaning to',
  'lenient': 'easy-going when it comes to punishment; giving second chances',
  'redundant': 'extra and unneeded because it has already been said or done',
};

// === "Too hard" definitions — replace hard words with easier ones ===
const wordReplacements = [
  // Common hard words found in L1-L2 definitions
  [/\bvehicle\b/g, 'thing with wheels that moves people or stuff'],
  [/\bregion\b/g, 'area'],
  [/\bsection\b/g, 'part'],
  [/\bremove\b/g, 'take away'],
  [/\bprocess\b/g, 'the way'],
  [/\bdisplay\b/g, 'show'],
  [/\bperiod\b/g, 'time'],
  [/\benergy\b/g, 'power'],
  [/\bsimilar\b/g, 'alike'],
  [/\bsymbol\b/g, 'sign'],
  [/\bphysical\b/g, 'body'],
  [/\bextreme\b/g, 'very strong'],
  [/\bnormal\b/g, 'usual'],
  [/\bsource\b/g, 'place it comes from'],
  [/\bobserve\b/g, 'watch and see'],
  [/\bmethod\b/g, 'way'],
  [/\bstructure\b/g, 'frame or shape that holds things up'],
  [/\bparagraph\b/g, 'group of sentences'],
  [/\bconflict\b/g, 'fight or problem'],
  [/\bfeature\b/g, 'thing about you'],
  [/\binteract\b/g, 'work together'],
  [/\bflexible\b/g, 'bendy'],
  [/\bdevice\b/g, 'tool or machine'],
  [/\btemporary\b/g, 'short-time'],
  [/\bovercome\b/g, 'get past'],
  [/\bextract\b/g, 'pull out'],
  [/\bseries\b/g, 'row or chain'],
  [/\bproject\b/g, 'plan or task'],
  [/\bcommunicate\b/g, 'share or tell'],
  [/\bfundamental\b/g, 'basic'],
  [/\bchannel\b/g, 'path'],
  [/\breveal\b/g, 'tell or show'],
  [/\baspect\b/g, 'part'],
  [/\btheory\b/g, 'ideas in your head'],
  [/\bsurvive\b/g, 'stay alive'],
  [/\bfunction\b/g, 'work'],
  [/\brelevant\b/g, 'related'],
  [/\bexcessive\b/g, 'too much'],
  [/\bunique\b/g, 'one of a kind'],
  [/\binsight\b/g, 'understanding'],
  [/\binsert\b/g, 'put in'],
  [/\bcomplex\b/g, 'hard'],
  [/\bpolicy\b/g, 'rules'],
  [/\btransfer\b/g, 'move'],
  [/\bsequence\b/g, 'order'],
  [/\bwidespread\b/g, 'found in many places'],
  [/\bresearch\b/g, 'study'],
  [/\bprofessional\b/g, 'paid expert'],
  [/\btradition\b/g, 'what people have always done'],
  [/\benvironment\b/g, 'the world around them'],
  [/\bversion\b/g, 'form'],
  [/\bintense\b/g, 'very strong'],
  [/\bmental\b/g, 'brain or thinking'],
  [/\bsevere\b/g, 'very bad'],
  [/\bobjective\b/g, 'fair and open'],
  [/\bneglect\b/g, 'care nobody gave'],
  [/\bconduct\b/g, 'acts'],
  [/\bvisible\b/g, 'that you can see'],
  [/\bsurvey\b/g, 'set of questions'],
  [/\bcontradict\b/g, 'go against'],
  [/\bsecure\b/g, 'safe'],
  [/\bpredict\b/g, 'guess what will happen'],
  [/\bpersuade\b/g, 'talk someone into'],
  [/\bdecline\b/g, 'going down'],
  [/\breluctant\b/g, 'not eager'],
  [/\bemphasis\b/g, 'making it stand out'],
  [/\bgenuine\b/g, 'real'],
  [/\bprinciple\b/g, 'belief or rule'],
  [/\bphilosophy\b/g, 'way of thinking'],
  [/\bfoundation\b/g, 'base'],
  [/\bdocument\b/g, 'paper'],
  [/\bdeceive\b/g, 'trick'],
  [/\bcommit\b/g, 'promise'],
  [/\breject\b/g, 'say no to'],
  [/\brandom\b/g, 'without any plan'],
  [/\bgovern\b/g, 'run or rule'],
  [/\bmutual\b/g, 'shared'],
  [/\bincome\b/g, 'money earned'],
  [/\bsubstitute\b/g, 'fill-in'],
  [/\bjournal\b/g, 'paper with news'],
  [/\bessential\b/g, 'must-have'],
  [/\bprofit\b/g, 'money you earn'],
  [/\bcurrency\b/g, 'the money a country uses'],
  [/\brequire\b/g, 'need'],
  [/\bemotion\b/g, 'feeling'],
];

// Track which words from "too hard" we actually need to fix per level
const tooHardWords = new Set([
  'passenger','area','bicycle','block','cart','chariot','temporarily','incredible','correspond','derive',
  'empirical','extract','formula','framework','stanza','resolution','nutrition','trait','cut off',
  'get rid of','take away','take off','cross out','phase','bout','century','decade','division',
  'efficient','eliminate','exhibit','intense','practical','process','segment','venture','virtual',
  'withdraw','convey','radical','akin','bivouac','blazon','brawn','buggy','conduit','cornet',
  'evaporation','condensation','adaptation','ecosystem','electricity','weathering','governor','variable',
  'let the cat out of the bag','two peas in a pod','facet','gadget','typical','hose','digestive',
  'preamble','specimen','respiration','hornet','hurdle','icon','infuse','limber','listless','litany',
  'lithe','lull','arctic','atom','category','characteristic','client','customary','disclose','discount',
  'drain','dynamic','ecology','edition','enterprise','episode','era','fatigue','frequency','abate',
  'aberration','abstraction','alleviation','anomalous','assimilation','conveyance','debilitation',
  'decadence','detachment','devolution','dilapidation','draconian','emanate','enormity','equanimity',
  'exaltation','exuberance','fanaticism','felicity','fortification','fruition','germane','hubris',
  'idiosyncrasy','incisive','interpolate','interregnum','lassitude','malfeasance',
  'intellect','labor','landscape','metabolism','ministry','nuclear','oblige','outrage','plead','poll',
  'pollinate','prevalent','refer','scenario','sector','statistic','terrain','threat','transition',
  'ultimate','obviate','paradoxical','penultimate','precarious','prognosticate','proselytize',
  'provisional','pulchritude','reclamation','reconciliation','reiterate','resurgent','reticence',
  'rigmarole','sanguine','spurious','tenet','underpinning','waiver','zealot','anachronism','chicanery',
  'undertake','veto','via','withstand','abstract','arbitrary','aspect','assault','autonomous',
  'bureaucracy','censor','cognitive','collaborate','confederation','demographic','deputy','electrode',
  'epidemic','fortify','gazette','geologist','infrastructure','input','intrinsic','kinetic','lapse',
  'lucrative','millennium','monetary','moratorium','partisan','pedagogy','pertinent','petroleum',
  'procurement','prospectus','province'
]);

let totalFixes = 0;

// Process each word file
const wordFiles = fs.readdirSync(DIR).filter(f => f.startsWith('words-level') && f.endsWith('.js'));

for (const file of wordFiles) {
  const filePath = path.join(DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Parse the JSON array from the file
  const match = content.match(/^(const \w+=)(\[.*\])(;.*)?$/s);
  if (!match) {
    console.log(`Skipping ${file} - couldn't parse`);
    continue;
  }
  
  const prefix = match[1];
  const suffix = match[3];
  let words = JSON.parse(match[2]);
  let fileFixCount = 0;
  
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    const wordKey = w.word;
    
    // Check misuse fixes first (exact replacement)
    if (misuseFixes[wordKey]) {
      const oldDef = w.definition;
      w.definition = misuseFixes[wordKey];
      if (oldDef !== w.definition) {
        fileFixCount++;
      }
      continue; // Don't also apply word replacements
    }
    
    // Check "too hard" words — apply word replacements
    if (tooHardWords.has(wordKey)) {
      const oldDef = w.definition;
      let newDef = w.definition;
      
      // Determine level from filename
      const levelMatch = file.match(/level(\d)/);
      const level = levelMatch ? parseInt(levelMatch[1]) : 5;
      
      // For L1-L2: always simplify. L3: should simplify. L4-L5: only if easy.
      if (level <= 3) {
        for (const [regex, replacement] of wordReplacements) {
          newDef = newDef.replace(regex, replacement);
        }
      } else {
        // L4-L5: still apply but be more selective — apply all for now since
        // the audit flagged these specifically
        for (const [regex, replacement] of wordReplacements) {
          newDef = newDef.replace(regex, replacement);
        }
      }
      
      if (newDef !== oldDef) {
        w.definition = newDef;
        fileFixCount++;
      }
    }
  }
  
  if (fileFixCount > 0) {
    const newContent = prefix + JSON.stringify(words) + (suffix || '');
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`${file}: ${fileFixCount} fixes`);
    totalFixes += fileFixCount;
  }
}

console.log(`\nTotal fixes: ${totalFixes}`);
