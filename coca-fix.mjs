#!/usr/bin/env node
/**
 * Fix COCA-flagged definitions by replacing entire definitions.
 * Reads flagged words from coca-verify output and applies curated replacements.
 */
import { readFileSync, writeFileSync } from 'fs';

// Map: word -> new definition (entire definition replacement)
// These are manually curated to use only basic vocabulary
const DEF_FIXES = {
  // === L2 fixes ===
  'paragraph': 'a group of sentences about one idea',
  'continent': 'one of the big land areas on Earth',
  'election': 'a time when people pick who will be their leader',
  'sum': 'the answer you get when you add numbers',
  'make up': 'to think of something that is not real',
  'honest': 'always saying what is real and true',
  'adult': 'a person who is all the way grown',
  'also': 'too; as well',
  'bare': 'with nothing on top; empty',
  'bicycle': 'a thing you ride that has two round parts you turn with your feet',
  'camel': 'a big desert animal with bumps on its back',
  'cart': 'a small box on round parts that is pulled or pushed',
  'clue': 'something that helps you figure out an answer',
  'coast': 'the land right next to the sea',
  'cotton': 'a soft white plant used to make cloth',
  'course': 'a set path you must follow from start to end',
  'fence': 'a wall around a yard or field, often made of wood',
  'fork': 'a tool with sharp points on the end, used for eating',
  'frighten': 'to make someone feel afraid',
  'gentleman': 'a kind, well-behaved man',
  'learn': 'to find out something you did not know before',
  'limit': 'the most you can go or have',
  'lunch': 'a meal in the middle of the day',
  'north': 'the way toward the top of a map',
  'shade': 'a cool spot where the sun does not reach',
  'signal': 'a sound, light, or wave that tells you something',
  'stuck': 'not able to move',
  'taste': 'what food feels like in your mouth',
  'track': 'a path or loop where people race or run',
  'vote': 'to pick who or what you want by marking it down',
  'admiral': 'the top leader of a country\'s ships that fight',
  'amber': 'a warm yellow color',
  'antenna': 'a thin part on a bug\'s head used to feel things',
  'bagpipe': 'a thing you blow into, with tubes and a bag, to make music',
  'banjo': 'a round thing with strings that you pull to make music',
  'bead': 'a small round piece used to make things you wear',
  'bobsled': 'a fast thing that slides down an icy path',
  'bracelet': 'a band worn on the wrist to look nice',
  'bramble': 'a prickly plant with berries',
  'bugle': 'a small metal horn used by the army',
  'canal': 'a long path of water dug for boats',
  'canopy': 'a cover made of cloth or leaves over your head',
  'chariot': 'a thing with two round parts pulled by horses, used long ago',
  'delta': 'the flat land where a river meets the sea, shaped like a fan',
  'dome': 'a round top shaped like half a ball',
  'ember': 'a small piece of hot, glowing wood left in a fire',
  'emerald': 'a bright green stone that is worth a lot',
  'fiddle': 'a thing with strings that you play with a bow, like in old songs',
  'fresco': 'a painting done on a wet wall',
  'garnet': 'a dark red stone that is worth a lot',
  'geyser': 'a hot spring that pushes water high into the air',
  'gong': 'a big flat round metal thing that makes a deep sound when you hit it',
  'gutter': 'a long open path at the edge of a road or top of a house for water',
  'hammock': 'a cloth bed that hangs between two trees or sticks',
  'harp': 'a big thing with many strings that you pull to make music',
  'hazel': 'a light greenish-brown color',
  'hearth': 'the floor of the place where a fire burns in a house',
  'hickory': 'a tree with hard wood and nuts you can eat',
  'horseshoe': 'a curved metal piece shaped like the letter U, put on a horse\'s foot',
  'igloo': 'a round house made of hard snow',
  'jade': 'a smooth green stone used to make pretty things',
  'javelin': 'a long, thin stick you throw as far as you can in a sport',
  'kelp': 'a big sea plant that grows in the water',
  'knapsack': 'a bag with straps that you carry on your back',
  'lichen': 'a flat, dry thing that grows on rocks and trees',
  'locket': 'a small case on a chain around your neck that holds a picture',
  'lynx': 'a wild cat with pointy ears',
  'mango': 'a sweet fruit from a hot place, with orange flesh',
  'mantle': 'a shelf above the place where a fire burns in a house',
  'mast': 'a tall stick on a ship that holds the sails',
  'moat': 'a wide hole full of water around a castle',
  'mortar': 'a thick mix used to hold stones or blocks together',
  'nutmeg': 'something from a seed that adds taste to food',
  'oar': 'a long stick with a flat end used to move a boat through water',
  'olive': 'a small, egg-shaped fruit used to make oil',
  'pagoda': 'a tall tower with many layers, found in far-away lands',
  'parsley': 'a green plant used to add taste to food',
  'pelican': 'a large bird with a big bag under its beak',
  'pendant': 'a pretty thing that hangs from a chain you wear',
  // === L2a fixes (will add after checking) ===
  // === L2b fixes ===
  // === L3 fixes ===
  // === L4-5 fixes ===
};

function processFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  
  // Parse the JS file
  const arrayStart = content.indexOf('[');
  const arrayEnd = content.lastIndexOf(']');
  if (arrayStart === -1 || arrayEnd === -1) {
    console.error(`Cannot parse ${filePath}`);
    return;
  }
  
  const prefix = content.slice(0, arrayStart);
  const suffix = content.slice(arrayEnd + 1);
  
  let words;
  try {
    words = JSON.parse(content.slice(arrayStart, arrayEnd + 1));
  } catch (e) {
    console.error(`JSON parse error in ${filePath}: ${e.message}`);
    return;
  }
  
  let changed = 0;
  for (const entry of words) {
    const key = entry.word?.toLowerCase();
    if (key && DEF_FIXES[key] && entry.definition !== DEF_FIXES[key]) {
      console.log(`  ${entry.word}: "${entry.definition}" → "${DEF_FIXES[key]}"`);
      entry.definition = DEF_FIXES[key];
      changed++;
    }
  }
  
  if (changed > 0) {
    const newContent = prefix + JSON.stringify(words) + suffix;
    writeFileSync(filePath, newContent, 'utf-8');
    console.log(`✅ Fixed ${changed} definitions in ${filePath}`);
  } else {
    console.log(`No matching fixes for ${filePath}`);
  }
}

const files = process.argv.slice(2);
for (const f of files) {
  console.log(`\n=== ${f} ===`);
  processFile(f);
}
