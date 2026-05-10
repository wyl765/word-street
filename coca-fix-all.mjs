#!/usr/bin/env node
/**
 * Interactive COCA fixer - reads flagged output and applies fixes.
 * Usage: node coca-fix-all.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

// ALL definition fixes keyed by word
const FIXES = {
  // === words-level2a.js ===
  'exchange': 'to give one thing and get another back',
  'excite': 'to make someone feel very happy and full of life',
  'approve': 'to say yes or agree that something is all right',
  'drowsy': 'feeling very tired and ready to sleep',
  'familiar': 'something you have seen or know about already',
  'flexible': 'able to bend without breaking',
  'grim': 'sad and very serious looking',
  'harsh': 'rough and not nice',
  'helpless': 'not able to do anything to help yourself',
  'invisible': 'not able to be seen',
  'lean': 'thin and fit looking',
  'lively': 'full of life and fun',
  'rude': 'not kind; saying or doing mean things',
  'rusty': 'covered in a rough, dark brown layer that forms when metal gets wet',
  'absurd': 'very silly, making no sense at all',
  'filthy': 'very, very dirty all over',
  'horrible': 'very bad; not nice at all',
  'powerful': 'having great power',
  'serious': 'not playing around; meaning what you say',
  'weak': 'not strong; having little power',
  'instantly': 'right away, with no waiting',
  'simply': 'in a way that is not hard; nothing more',
  'passage': 'a short part of a book or story',
  'moisture': 'wetness; tiny drops of water you can feel in the air',
  'inspector': 'a person who checks that things are done right',
  'messenger': 'a person who carries news from one place to another',
  'triumph': 'a great win',
  'decision': 'what you pick after thinking about it',
  'evidence': 'something that shows you what is true',
  'solution': 'the answer to something hard',
  'survive': 'to stay alive through something hard or scary',
  'particular': 'one certain thing out of many',
  'sensitive': 'quick to feel hurt or to notice small things',
  'severe': 'very bad or very strong',
  'fortunate': 'having good things happen to you',
  'incredible': 'so great it is hard to believe',
  'celebration': 'a time when people come together to be happy',
  'challenge': 'something that is hard to do',
  'investigate': 'to look into something to find out what happened',
  'penalty': 'what you must pay or do when you break a rule',
  'reasonable': 'fair and making good sense',
  'request': 'to ask nicely for something',
  'allocate': 'to set apart for a certain use',
  'authorize': 'to say that someone is allowed to do something',
  'bias': 'leaning toward one side in a way that is not fair',
  'clarify': 'to say something again so it is not hard to understand',
  'coincide': 'to happen at the same time as something else, by chance',
  'consent': 'saying yes; letting something happen',
  'consult': 'to ask someone who knows a lot for help',
  'controversy': 'a big argument among people about something important',
  'domain': 'an area that someone controls or knows a lot about',
  'draft': 'a first try at writing something',
  'entity': 'a single thing that has its own name',
  'explicit': 'said very clearly so there is no mix-up',
  'facilitate': 'to help make something happen more smoothly',
  'framework': 'a plan or set of rules that holds something together',
  'furthermore': 'and also; on top of that',
  'hierarchy': 'a system where things go from top to bottom by how important they are',
  'ideology': 'a set of ideas about how things should be',
  'implication': 'something that is meant but not said out loud',
  'incentive': 'something that makes you want to try harder',
  'innovation': 'a new idea or a new way of doing something',
  'levy': 'to collect money by order of the government',
  'liberal': 'willing to give a lot; open to new ideas',

  // === words-level2b.js (will be populated after checking) ===
  // === words-level2c.js ===
  // === words-level2d.js ===
  // === words-level3a.js ===
  // === words-level3b.js ===
  // === words-level3c.js ===
  // === words-level4a.js ===
  // === words-level4b.js ===
  // === words-level4c.js ===
  // === words-level5a-d.js ===
};

function fixFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const s = content.indexOf('['), e = content.lastIndexOf(']');
  if (s === -1 || e === -1) { console.error(`Cannot parse ${filePath}`); return; }
  
  let words = JSON.parse(content.slice(s, e + 1));
  let changed = 0;
  
  for (const w of words) {
    const key = w.word?.toLowerCase();
    if (key && FIXES[key] && w.definition !== FIXES[key]) {
      w.definition = FIXES[key];
      changed++;
    }
  }
  
  if (changed > 0) {
    writeFileSync(filePath, content.slice(0, s) + JSON.stringify(words) + content.slice(e + 1));
    console.log(`✅ Fixed ${changed} in ${filePath}`);
  }
}

const files = process.argv.slice(2);
for (const f of files) fixFile(f);
