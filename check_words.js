const fs = require('fs');

const files = fs.readdirSync(__dirname).filter(f => f.startsWith('words-level') && f.endsWith('.js'));
const critical = [];
const high = [];
let totalCount = 0;

files.forEach(f => {
    const content = fs.readFileSync(__dirname + '/' + f, 'utf8');
    // Simple eval to avoid module.exports issues
    let jsonMatch = content.match(/\[\s*\{.*\}\s*\]/s);
    if (!jsonMatch) {
      console.log("No JSON found in", f);
      return;
    }
    let words = [];
    try {
        words = eval(jsonMatch[0]);
    } catch (e) {
        console.log("Parse error in", f, e);
        return;
    }
    
    totalCount += words.length;
    
    words.forEach(w => {
        // 1. Definition factually WRONG / 5. Misleading
        if (w.word === 'breathe' && w.definition.includes('take food')) {
             critical.push({word: w.word, file: f, issue: "Definition says 'take food' for breathe"});
        }
        if (w.word === 'listen' && w.definition.includes('eyes')) {
             critical.push({word: w.word, file: f, issue: "Definition says 'with your eyes' for listen"});
        }
        // 2. Definition grammatically broken / Machine generated garbage
        if (w.definition && w.definition.includes('lorem ipsum')) {
             critical.push({word: w.word, file: f, issue: "Definition contains 'lorem ipsum'"});
        }
        if (w.definition && w.definition.includes('is when you doing the')) {
             high.push({word: w.word, file: f, issue: "Grammatically broken definition 'is when you doing the'"});
        }
        // 3. Example doesn't match definition
        if (w.example && !w.example.toLowerCase().includes(w.word.toLowerCase()) && !w.example.toLowerCase().includes(w.word.substring(0, w.word.length-1).toLowerCase()) && !w.example.toLowerCase().includes(w.word.substring(0, w.word.length-2).toLowerCase())) {
            // Check if root word is in example (crude check)
             let found = false;
             let root = w.word;
             if (root.endsWith('y')) root = root.substring(0, root.length-1);
             if (root.endsWith('e')) root = root.substring(0, root.length-1);
             
             if (w.example.toLowerCase().includes(root.toLowerCase())) found = true;
             
             // special cases
             if (w.word === 'teach' && w.example.toLowerCase().includes('taught')) found = true;
             if (w.word === 'hear' && w.example.toLowerCase().includes('heard')) found = true;
             if (w.word === 'take' && w.example.toLowerCase().includes('took')) found = true;
             
             if (!found && w.word.length > 3) {
                 high.push({word: w.word, file: f, issue: "Word not used in example: " + w.example});
             }
        }
        // 4. Example has grammar errors
        if (w.example && (w.example.includes('is went') || w.example.includes('are goes'))) {
            high.push({word: w.word, file: f, issue: "Grammatically broken example"});
        }
        
        // Let's do a more robust check using an AI script to analyze a sample if needed, but since we are the AI, we can write a script to just dump questionable ones.
        
        // Known bad words from typical data issues
        if (w.definition.match(/^[a-z]/)) {
           // not starting with capital? Maybe ok for definition, usually definitions don't have to.
        }
        
        if (w.definition.length < 5) {
            critical.push({word: w.word, file: f, issue: "Definition too short/missing: " + w.definition});
        }
        
        if (w.example.length < 10) {
            high.push({word: w.word, file: f, issue: "Example too short/missing: " + w.example});
        }
        
        if (w.example.includes("http") || w.example.includes(".com")) {
            critical.push({word: w.word, file: f, issue: "Example contains URL/machine generated garbage"});
        }
    });
});

console.log(JSON.stringify({totalCount, critical, high}, null, 2));
