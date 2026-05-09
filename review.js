const fs = require('fs');
const l1 = require('./temp1.js');
const l2 = require('./temp2.js');
const allWords = l1.concat(l2);

let problems = [];

allWords.forEach(w => {
    let def = w.definition.toLowerCase();
    
    // Abstract / Hard words in definitions
    let hardWords = ['device', 'instrument', 'substance', 'organism', 'structure', 'apparatus', 'mechanism', 'particle', 'fluid', 'solid', 'liquid', 'gas', 'object', 'material', 'equipment'];
    hardWords.forEach(hw => {
        if (def.includes(` ${hw}`) || def.startsWith(`${hw} `)) {
            problems.push(`- **CRITICAL** [${w.word}]: Definition "${w.definition}" uses overly academic word "${hw}". (Test case: Child won't know what a '${hw}' is. Merriam-Webster Kids uses simpler terms).`);
        }
    });

    if (def.includes('state of') || def.includes('act of') || def.includes('process of') || def.includes('relating to')) {
         problems.push(`- **HIGH** [${w.word}]: Definition "${w.definition}" is too abstract. (Test case: Cannot form a mental picture).`);
    }
    
    // Circular
    let root = w.word.toLowerCase();
    if (root.length > 3 && def.includes(root)) {
        problems.push(`- **HIGH** [${w.word}]: Circular definition uses the word itself in "${w.definition}".`);
    }

    // Example length / complexity
    if (w.example.split(' ').length > 14) {
        problems.push(`- **HIGH** [${w.word}]: Example is very long (${w.example.split(' ').length} words): "${w.example}". (Test case: Child loses track of meaning by the end of the sentence).`);
    }
});

fs.writeFileSync('problems.md', problems.join('\n'));
