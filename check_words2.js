const fs = require('fs');

const files = fs.readdirSync(__dirname).filter(f => f.startsWith('words-level') && f.endsWith('.js'));
const critical = [];
const high = [];
let totalCount = 0;

files.forEach(f => {
    const content = fs.readFileSync(__dirname + '/' + f, 'utf8');
    let jsonMatch = content.match(/\[\s*\{.*\}\s*\]/s);
    if (!jsonMatch) return;
    
    let words = [];
    try {
        words = eval(jsonMatch[0]);
    } catch (e) {
        return;
    }
    
    totalCount += words.length;
    
    words.forEach(w => {
        // More checks:
        if (w.definition && w.definition.toLowerCase().includes("is when")) {
            high.push({word: w.word, file: f, issue: "Definition uses poor grammar 'is when'"});
        }
        if (w.definition && w.definition.toLowerCase().includes("lorem ipsum")) {
            critical.push({word: w.word, file: f, issue: "Definition contains dummy text"});
        }
        
        // Let's do a strict check for machine generated text patterns
        if (w.definition && w.definition.includes("[") || w.definition.includes("]")) {
            critical.push({word: w.word, file: f, issue: "Definition contains brackets, likely machine generated artifact"});
        }
        if (w.example && (w.example.includes("[") || w.example.includes("]"))) {
            critical.push({word: w.word, file: f, issue: "Example contains brackets"});
        }
        if (w.definition && w.definition.toLowerCase().startsWith("this word means")) {
            high.push({word: w.word, file: f, issue: "Definition has poor structure 'This word means'"});
        }
    });
});

console.log(JSON.stringify({critical, high}, null, 2));
